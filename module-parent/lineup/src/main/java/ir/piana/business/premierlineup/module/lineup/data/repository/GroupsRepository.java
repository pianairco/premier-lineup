package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GroupsRepository extends JpaRepository<GroupsEntity, Long> {
    /*@Query(value = "SELECT ua.* FROM user_avatar ua, users u WHERE ua.user_id = u.id and ua.user_id = :userId and ua.be_deleted = false",
            nativeQuery = true)
    Optional<UserAvatarEntity> findActiveAvatar(@Param("userId") long userId);
    @Query(value = "SELECT ua.* FROM user_avatar ua, users u WHERE ua.user_id = u.id and ua.user_id = :userId and ua.be_deleted = :beDeleted",
            nativeQuery = true)
    List<UserAvatarEntity> findAvatars(
            @Param("userId") long userId,
            @Param("beDeleted") boolean beDeleted);*/

    Optional<GroupsEntity> findByName(String name);
    Optional<GroupsEntity> findByUuid(String uuid);
    List<GroupsEntity> findAllByUserId(long userId);
    Optional<GroupsEntity> findByUserIdAndId(long userId, long groupId);

    @Query(value = "SELECT g.* FROM groups g, groups_member gm WHERE gm.user_id = :userId and g.id = gm.group_id",
            nativeQuery = true)
    List<GroupsEntity> findAllMemberGroups(@Param("userId") long userId);
}
