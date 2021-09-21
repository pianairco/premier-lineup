package ir.piana.business.premierlineup.module.basicinfo.data.repository;

import ir.piana.business.premierlineup.module.basicinfo.data.entity.UserAvatarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserAvatarRepository extends JpaRepository<UserAvatarEntity, Long> {
    /*List<UserAvatarEntity> findByUserIdAndBeDeleted(long userId, boolean beDeleted);*/

    @Query(value = "SELECT ua.* FROM user_avatar ua, users u WHERE ua.user_id = u.id and ua.user_id = :userId and ua.be_deleted = false",
            nativeQuery = true)
    Optional<UserAvatarEntity> findActiveAvatar(@Param("userId") long userId);
    @Query(value = "SELECT ua.* FROM user_avatar ua, users u WHERE ua.user_id = u.id and ua.user_id = :userId and ua.be_deleted = :beDeleted",
            nativeQuery = true)
    List<UserAvatarEntity> findAvatars(
            @Param("userId") long userId,
            @Param("beDeleted") boolean beDeleted);
}
