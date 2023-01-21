package ir.piana.business.premierlineup.module.auth.service;

import ir.piana.business.premierlineup.common.exceptions.HttpCommonRuntimeException;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity appUserEntity = userRepository.findByMobile(username);
        if (appUserEntity == null) {
            throw new HttpCommonRuntimeException(HttpStatus.OK, 1, "نام کاربری ثبت نام نشده");//UsernameNotFoundException(username);
        }
//        List<GrantedAuthority> authorities = new ArrayList<>();
        List<GrantedAuthority> authorities = appUserEntity.getUserRolesEntities().stream()
                .map(e -> new SimpleGrantedAuthority(e.getRoleName())).collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_AUTHENTICATED"));
        return new UserModel(appUserEntity.getUsername(),
                appUserEntity.getPassword(),
                authorities, appUserEntity);
    }
}
