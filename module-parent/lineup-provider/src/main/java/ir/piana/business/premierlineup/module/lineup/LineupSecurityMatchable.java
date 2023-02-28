package ir.piana.business.premierlineup.module.lineup;

import ir.piana.business.premierlineup.common.security.PermissionDto;
import ir.piana.business.premierlineup.common.security.PermissionRoleType;
import ir.piana.business.premierlineup.common.security.SecurityMatchable;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class LineupSecurityMatchable extends SecurityMatchable {
    @Override
    protected List<PermissionDto> provideMatches() {
        return Arrays.asList(PermissionDto.builder()
                .httpMethod(HttpMethod.POST)
                .paths(Arrays.asList("/api/modules/lineup/group/**"))
                .permissionRoleType(PermissionRoleType.PERMIT_ALL)
                .build());
    }
}
