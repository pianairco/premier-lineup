package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberOfGroupRepository extends JpaRepository<UserEntity, Long> {
    /*@Query(value = "SELECT u.username, u.mobile, u.picture_url FROM users u, groups g, groups_member gm WHERE g.uuid = :uuid" +
            " and g.id = gm.group_id and u.id = gm.user_id",
            nativeQuery = true)*/
    @Query(value = "SELECT new ir.piana.business.premierlineup.module.auth.data.entity.UserEntity(u.username, u.mobile, u.pictureUrl)" +
            " FROM UserEntity u, GroupsEntity g, GroupsMemberEntity gm WHERE g.uuid = :uuid" +
            " and g.id = gm.groupId and u.id = gm.userId")
    List<UserEntity> findAllMembers(@Param("uuid") String uuid);
}
