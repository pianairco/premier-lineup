package ir.piana.business.premierlineup.module.auth.data.repository;

import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.entity.UserRolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRolesRepository extends JpaRepository<UserRolesEntity, Long> {
    UserRolesEntity findByRoleName(String roleName);
}
