package ir.piana.business.premierlineup.common.security;

import ir.piana.business.premierlineup.common.util.CommonUtils;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;

public class SecurityUtils {
    public static HttpSecurity antMatchers(HttpSecurity http, PermissionDto permissionDto)
            throws RuntimeException {
        try {
            if (CommonUtils.isNullOrEmpty(permissionDto.getPaths())) {
                throw new RuntimeException(String.format(
                        "permission is wrong : %s (Paths is empty)",
                        permissionDto.getSecurityMatchableClassName()));
            }
            ExpressionUrlAuthorizationConfigurer<HttpSecurity>.AuthorizedUrl authorizedUrl = null;
            if (permissionDto.getHttpMethod() == null) {
                authorizedUrl = http
                        .authorizeRequests().antMatchers(permissionDto.getPaths().toArray(new String[0]));
            } else {
                authorizedUrl = http.authorizeRequests().antMatchers(permissionDto.getHttpMethod(),
                        permissionDto.getPaths().toArray(new String[0]));
            }
            if (permissionDto.getPermissionRoleType() == PermissionRoleType.PERMIT_ALL)
                return authorizedUrl.permitAll().and();
            else if (permissionDto.getPermissionRoleType() == PermissionRoleType.AUTHENTICATED)
                return authorizedUrl.authenticated().and();
            else if (permissionDto.getPermissionRoleType() == PermissionRoleType.HAS_ROLE)
                return authorizedUrl.hasAnyRole(permissionDto.getRoles().toArray(new String[0])).and();
            else {
                throw new RuntimeException(String.format(
                        "permission is wrong Role (PermissionRoleType is not defined!): %s",
                        permissionDto.getSecurityMatchableClassName()));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
