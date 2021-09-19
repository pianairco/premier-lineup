package ir.piana.business.premierlineup.module.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.action.AuthAction;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import ir.piana.business.premierlineup.module.auth.model.AppInfo;
import ir.piana.business.premierlineup.module.auth.model.ConfirmInfo;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class PianaAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private AuthenticationManager authenticationManager;
    private AuthAction authAction;
    private PianaCacheService pianaCacheService;
    private UserRepository userRepository;

    public PianaAuthenticationFilter(
            String loginUrl,
            AuthenticationManager authenticationManager,
            AuthAction authAction,
            UserRepository userRepository,
            PianaCacheService pianaCacheService) {
        super(new AntPathRequestMatcher(loginUrl));
        this.authAction = authAction;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.pianaCacheService = pianaCacheService;
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse res) throws AuthenticationException {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if(authentication != null && authentication.isAuthenticated())
                return authentication;

            if(request.getContentType() != null &&
                    (request.getContentType().startsWith("APPLICATION/JSON") ||
                            request.getContentType().startsWith("application/json"))) {
                ConfirmInfo signinInfo = new ObjectMapper().readValue(request.getInputStream(), ConfirmInfo.class);

                if(signinInfo != null && !CommonUtils.isNull(signinInfo.getType()) &&
                        signinInfo.getType().equalsIgnoreCase("otp")) {
                    UserEntity userEntity = (UserEntity) pianaCacheService.getValue(signinInfo.getUuid());
                    if(userEntity == null)
                        throw new RuntimeException();
                    else if(!userEntity.getOtp().equalsIgnoreCase(signinInfo.getOtp()))
                        throw new RuntimeException();

                    UserEntity saved = userRepository.save(userEntity);

                    return authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    saved.getMobile(),
                                    saved.getPassword(),
                                    new ArrayList<>()));
                } else {
                    throw new RuntimeException();
                }
            }
            throw new RuntimeException();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(auth);
        UserEntity userEntity = ((UserModel)auth.getPrincipal()).getUserEntity();
        String token = JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 864_000_000))
                .sign(Algorithm.HMAC512("SecretKeyToGenJWTs".getBytes()));
        request.getSession().setAttribute("jwt-token", token);
        request.getSession().setAttribute("authentication", auth.getPrincipal());
        request.getSession().setAttribute("authorization", ((User) auth.getPrincipal()).getUsername());
        request.getSession().setAttribute("user", userEntity);

        Optional<? extends GrantedAuthority> role_owner = null;
        String title = "سامانه ISMS";

        request.getSession().setAttribute("fund-schema-title", title);
        AppInfo appInfo = authAction.createAppInfo(request);
        res.setStatus(HttpStatus.OK.value());
        res.setContentType("application/json;charset=UTF-8");
        res.getWriter().print(new ObjectMapper().writeValueAsString(appInfo));
        res.getWriter().flush();
    }
}
