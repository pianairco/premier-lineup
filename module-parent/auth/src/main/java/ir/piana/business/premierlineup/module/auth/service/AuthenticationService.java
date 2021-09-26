package ir.piana.business.premierlineup.module.auth.service;

import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public interface AuthenticationService {
    default UserModel getIfAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!CommonUtils.isNull(authentication.getPrincipal()) &&
                !(authentication.getPrincipal() instanceof String &&
                        authentication.getPrincipal().toString().equalsIgnoreCase("anonymousUser"))) {
            return (UserModel) authentication.getPrincipal();
        }
        return null;
    }
}
