package ir.piana.business.premierlineup.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().disable().csrf().disable()
                .authorizeRequests()
                /*.antMatchers(HttpMethod.POST,
                        "/api/sign-in",
                        "/api/sign-in/sub-domain",
                        "/api/sign-in/sub-domain/set-token",
                        "/api/sign-in/sub-domain/set-login-info",
                        "/api/sign-in/sub-domain/set-principal",
                        "/api/sign-up",
                        "/api/app-info"*//*,
                        "/h2/console/**"*//*)*/
                .anyRequest().permitAll()
                .and()
                .headers().frameOptions().disable()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
    }
}
