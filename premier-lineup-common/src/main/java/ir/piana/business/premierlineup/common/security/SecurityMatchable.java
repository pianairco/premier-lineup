package ir.piana.business.premierlineup.common.security;

import java.util.ArrayList;
import java.util.List;

public abstract class SecurityMatchable {
    protected List<PermissionDto> matches = new ArrayList<>();

    protected SecurityMatchable() {
        matches = provideMatches();
        matches.stream().forEach(dto -> dto.setSecurityMatchableClass(this.getClass().getSimpleName()));
    }

    protected abstract List<PermissionDto> provideMatches();

    public List<PermissionDto> getMatches() {
        return matches;
    }
}
