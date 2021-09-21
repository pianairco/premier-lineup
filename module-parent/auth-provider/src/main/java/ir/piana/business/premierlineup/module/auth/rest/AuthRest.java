package ir.piana.business.premierlineup.module.auth.rest;

import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.action.AuthAction;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.entity.UserRolesEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRolesRepository;
import ir.piana.business.premierlineup.module.auth.model.*;
import ir.piana.business.premierlineup.module.auth.service.UserDetailsServiceImpl;
import ir.piana.business.premierlineup.module.auth.wssupport.SmsClient;
import nl.captcha.Captcha;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthRest {
    @Autowired
    private AuthAction authAction;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRolesRepository userRolesRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${login.redirect.url}")
    private String loginRedirect;

    private Pattern mobileMatcher;

    @Autowired
    private Environment env;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

//    private KavenegarApi api;

    @Autowired
    private PianaCacheService pianaCacheService;

    @PostConstruct
    public void init() {
        System.out.println(loginRedirect);
        mobileMatcher = Pattern.compile("09[0-4]{1}[0-9]{8}");
    }

    @GetMapping(path = "test")
    public ResponseEntity<String> getTest() {
        return ResponseEntity.ok("hello test!");
    }

    @PostMapping(path = "request-otp",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> requestOtp(
            @RequestBody LoginInfo loginInfo, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        Matcher matcher = mobileMatcher.matcher(loginInfo.getMobile());
        if(!matcher.find()) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        UserEntity byMobile = userRepository.findByMobile(loginInfo.getMobile());
        if(byMobile != null) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }

        if(CommonUtils.isNull(loginInfo.getPassword())) {
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());
        } else if(loginInfo.getPassword().length() < 8 || loginInfo.getPassword().length() > 16) {
            return ResponseEntity.ok(ResponseModel.builder().code(4)
                    .data("کلمه عبور باید بین 8 تا 16 رقم باشد").build());
        }

        if(!Arrays.stream(env.getActiveProfiles()).anyMatch(p -> "develop".matches(p))) {
            Captcha sessionCaptcha = (Captcha)request.getSession().getAttribute("simpleCaptcha");
            if(CommonUtils.isNull(loginInfo.getCaptcha()))
                return ResponseEntity.ok(ResponseModel.builder().code(4).build());
            else if(!sessionCaptcha.isCorrect(loginInfo.getCaptcha())) {
                return ResponseEntity.ok(ResponseModel.builder().code(5).build());
            }
        }

        String otp = RandomStringUtils.randomNumeric(4);
        loginInfo.setOtp(otp);
        System.out.println(otp);
//        SendResult send = api.send("1000596446", loginInfo.getMobile(),
//                String.format("یکبار رمز\n%s", loginInfo.getOtp()));
        Long aLong = SmsClient.SendMessageWithCode(loginInfo.getMobile(),
                String.format("یکبار رمز\n%s", loginInfo.getOtp()));
        if (aLong == 8) {
            return ResponseEntity.ok(ResponseModel.builder().code(6)
                    .data("شماره ارسال پیامک موقتا غیر فعال شده. لطفا مجددا تست نمایید.").build());
        }

        Object uuid = pianaCacheService.put(UserEntity.builder()
                .otp(otp)
                .mobile(loginInfo.getMobile())
                .password(loginInfo.getPassword())
                .username(loginInfo.getMobile()).build());
        Map<String, String> res = Collections.singletonMap("uuid", uuid.toString());

        return ResponseEntity.ok(ResponseModel.builder().code(0).data(res).build());
    }

    @PostMapping(path = "confirm-otp",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> confirmOtp(
            @RequestBody ConfirmInfo confirmInfo, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(CommonUtils.isNull(authentication.getPrincipal()) ||
                !(authentication.getPrincipal() instanceof String &&
                authentication.getPrincipal().toString().equalsIgnoreCase("anonymousUser"))) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }

        if(CommonUtils.isNull(confirmInfo) || CommonUtils.isNull(confirmInfo.getOtp()) ||
                CommonUtils.isNull(confirmInfo.getUuid())) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }

        UserEntity userEntity = (UserEntity) pianaCacheService.getValue(confirmInfo.getUuid());
        if(CommonUtils.isNull(userEntity)) {
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());
        }

        UserEntity byMobile = userRepository.findByMobile(userEntity.getMobile());
        if(!CommonUtils.isNull(byMobile))
            return ResponseEntity.ok(ResponseModel.builder().code(4).build());
        else if(!userEntity.getOtp().equalsIgnoreCase(confirmInfo.getOtp()))
            return ResponseEntity.ok(ResponseModel.builder().code(5).build());

        String rawPassword = userEntity.getPassword();
        userEntity.setPassword(passwordEncoder.encode(rawPassword));
        UserEntity saved = userRepository.save(userEntity);
        userEntity.setUserRolesEntities(Collections.singletonList(
                UserRolesEntity.builder()
                        .userId(saved.getId())
                        .roleName("ROLE_USER").build()));
        userRepository.save(userEntity);

        this.loginComplete(saved, request, response);
        return getAppInfo();
    }

    @PreAuthorize("!hasRole('ROLE_AUTHENTICATED')")
    @PostMapping(path = "login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> login(
            @RequestBody LoginInfo loginInfo, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(CommonUtils.isNull(authentication.getPrincipal()) ||
                !(authentication.getPrincipal() instanceof String &&
                        authentication.getPrincipal().toString().equalsIgnoreCase("anonymousUser"))) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }

        if(CommonUtils.isNull(loginInfo) || CommonUtils.isNull(loginInfo.getMobile())) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }

        UserEntity byMobile = userRepository.findByMobile(loginInfo.getMobile());
        if(CommonUtils.isNull(byMobile))
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());

        if(Arrays.stream(env.getActiveProfiles()).anyMatch(p -> "develop".matches(p))) {
            this.loginComplete(byMobile, request, response);
        } else {
            if(CommonUtils.isNull(loginInfo.getPassword()) ||
                    CommonUtils.isNull(loginInfo.getCaptcha())) {
                return ResponseEntity.ok(ResponseModel.builder().code(4).build());
            } else {
                Captcha sessionCaptcha = (Captcha)request.getSession().getAttribute("simpleCaptcha");
                if(!CommonUtils.isNull(loginInfo.getCaptcha()) || sessionCaptcha.isCorrect(loginInfo.getCaptcha()))
                    return ResponseEntity.ok(ResponseModel.builder().code(5).build());
                if(!passwordEncoder.matches(loginInfo.getPassword(), byMobile.getPassword())) {
                    return ResponseEntity.ok(ResponseModel.builder().code(6).build());
                }
                this.loginComplete(byMobile, request, response);
            }
        }

        return getAppInfo();
    }

    @CrossOrigin
    @PostMapping(path = "app-info",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> getAppInfo()
            throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppInfo appInfo = null;
        if(authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserModel) {
            UserEntity userEntity = ((UserModel) authentication.getPrincipal()).getUserEntity();
            appInfo = AppInfo.builder()
                    .isLoggedIn(true)
                    .isAdmin(authentication.getAuthorities().stream()
                            .filter(e -> e.getAuthority().equalsIgnoreCase("ROLE_ADMIN"))
                            .map(e -> true).findFirst().orElse(false))
                    .username(userEntity.getUsername())
                    .build();
        } else {
            appInfo = AppInfo.builder()
                    .isLoggedIn(false)
                    .isAdmin(false)
                    .username("unknown")
                    .build();
        }
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(appInfo).build());
    }

    private void loginComplete(UserEntity userEntity, HttpServletRequest request, HttpServletResponse response) {
        List<GrantedAuthority> authorities = userEntity.getUserRolesEntities().stream()
                .map(e -> new SimpleGrantedAuthority(e.getRoleName())).collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_AUTHENTICATED"));

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userEntity.getMobile(),
                        userEntity.getPassword(),
                        authorities));
        SecurityContextHolder.getContext().setAuthentication(
                authenticate);
    }

    @PostMapping(path = "logout",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> signOut(
            @RequestBody Map map, HttpServletRequest request, HttpSession session) throws IOException {
        session.invalidate();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.setAuthenticated(false);
        return getAppInfo();
    }

    /*@CrossOrigin
    @PostMapping(path = "app-info",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AppInfo> getAppInfo(HttpServletRequest request,
                                              @RequestBody Map<String, Object> body,
                                              HttpSession session) {
        return authAction.appInfo.apply(request, body);
    }*/
}
