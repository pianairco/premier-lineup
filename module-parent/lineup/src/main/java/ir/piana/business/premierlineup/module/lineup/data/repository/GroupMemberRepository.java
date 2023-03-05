package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupMemberRepository extends JpaRepository<UserEntity, Long> {
    @Query(value = "SELECT u.* FROM users u, groups g, groups_member gm WHERE g.uuid = :uuid" +
            " and g.id = gm.group_id and u.id = gm.user_id",
            nativeQuery = true)
    List<UserEntity> findAllMembers(@Param("uuid") String uuid);
}
