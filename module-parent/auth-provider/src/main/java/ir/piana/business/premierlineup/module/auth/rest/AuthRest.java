package ir.piana.business.premierlineup.module.auth.rest;

import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.module.auth.action.AuthAction;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import ir.piana.business.premierlineup.module.auth.model.AppInfo;
import ir.piana.business.premierlineup.module.auth.model.LoginInfo;
import ir.piana.business.premierlineup.module.auth.wssupport.SmsClient;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/auth")
public class AuthRest {
    @Autowired
    private AuthAction authAction;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${login.redirect.url}")
    private String loginRedirect;

    private Pattern mobileMatcher;

    @PostConstruct
    public void init() {
        System.out.println(loginRedirect);
        mobileMatcher = Pattern.compile("09[0-4]{1}[0-9]{8}");
    }

    @GetMapping(path = "test")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("hello test!");
    }

//    private KavenegarApi api;

    @Autowired
    private PianaCacheService pianaCacheService;

    @PostMapping(path = "otp",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> requestOtp(
            @RequestBody LoginInfo loginInfo, HttpServletRequest request, HttpSession session)
            throws IOException {
        Matcher matcher = mobileMatcher.matcher(loginInfo.getMobile());
        if(!matcher.find()) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        UserEntity byMobile = userRepository.findByMobile(loginInfo.getMobile());
        if(byMobile != null) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }

        loginInfo.setOtp(RandomStringUtils.randomNumeric(4));

        /*SendResult send = api.send("1000596446", loginInfo.getMobile(),
                String.format("یکبار رمز\n%s", loginInfo.getOtp()));*/

        Long aLong = SmsClient.SendMessageWithCode("09128855402", "1234");

        Object uuid = pianaCacheService.put(loginInfo);
        Map<String, String> res = Collections.singletonMap("uuid", uuid.toString());

        return ResponseEntity.ok(ResponseModel.builder().code(0).data(res).build());
    }

    @PostMapping(path = "sign-out",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AppInfo> signOut(
            @RequestBody Map map, HttpServletRequest request, HttpSession session) throws IOException {
        session.invalidate();
//        SecurityContext sc = SecurityContextHolder.getContext();
//        sc.setAuthentication(authenticate);
        String host = (String) request.getAttribute("host");

        return authAction.appInfo.apply(request, map);
//        AppInfo appInfo = AppInfo.builder().isLoggedIn(false)
//                .isAdmin(false).build();
//        return ResponseEntity.ok(appInfo);
    }

    @CrossOrigin
    @PostMapping(path = "app-info",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AppInfo> getAppInfo(HttpServletRequest request,
                                              @RequestBody Map<String, Object> body,
                                              HttpSession session) {
        return authAction.appInfo.apply(request, body);
    }
}
