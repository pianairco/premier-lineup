package ir.piana.business.premierlineup.common.security;

import lombok.*;
import org.springframework.http.HttpMethod;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PermissionDto {
    @Setter(AccessLevel.NONE)
    private String securityMatchableClassName;
    private HttpMethod httpMethod;
    private PermissionRoleType permissionRoleType;
    private List<String> paths;
    private List<String> roles;

    void setSecurityMatchableClass(String className) {
        this.securityMatchableClassName = className;
    }
}
