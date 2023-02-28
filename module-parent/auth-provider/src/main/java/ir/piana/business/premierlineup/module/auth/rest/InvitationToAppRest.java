package ir.piana.business.premierlineup.module.auth.rest;

import com.kavenegar.sdk.KavenegarApi;
import com.kavenegar.sdk.excepctions.ApiException;
import com.kavenegar.sdk.excepctions.HttpException;
import com.kavenegar.sdk.models.SendResult;
import ir.piana.business.premierlineup.common.exceptions.HttpCommonRuntimeException;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.action.AuthAction;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.entity.UserRolesEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRolesRepository;
import ir.piana.business.premierlineup.module.auth.model.AppInfo;
import ir.piana.business.premierlineup.module.auth.model.ConfirmInfo;
import ir.piana.business.premierlineup.module.auth.model.LoginInfo;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.auth.service.UserDetailsServiceImpl;
import ir.piana.business.premierlineup.module.auth.wssupport.SmsClient;
import nl.captcha.Captcha;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/modules/auth")
public class InvitationToAppRest {
    @Autowired
    private AuthAction authAction;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRolesRepository userRolesRepository;

    @Value("${login.redirect.url}")
    private String loginRedirect;

    private Pattern mobileMatcher;

    @Autowired
    private Environment env;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private KavenegarApi kavenegarApi;

    @PostConstruct
    public void init() {
        System.out.println(loginRedirect);
        mobileMatcher = Pattern.compile("09[0-4]{1}[0-9]{8}");
        kavenegarApi = new KavenegarApi("6B6773663258696B304F65576F4433516739573856513D3D");
    }

    @PreAuthorize("hasRole('ROLE_AUTHENTICATED')")
    @PostMapping(path = "invite",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity invite(
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

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginInfo.getMobile());
        UserEntity byMobile = ((UserModel) userDetails).getUserEntity();
//        UserEntity byMobile = userRepository.findByMobile(loginInfo.getMobile());
        if(CommonUtils.isNull(byMobile))
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());

        return ResponseEntity.ok(ResponseModel.builder().code(0).data("appInfo").build());
    }
}
