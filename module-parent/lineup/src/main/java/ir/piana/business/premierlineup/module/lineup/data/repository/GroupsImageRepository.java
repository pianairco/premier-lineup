package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GroupsImageRepository extends JpaRepository<GroupsImageEntity, Long> {
    @Query(value = "SELECT ua.* FROM groups_image ua, groups u WHERE ua.group_id = u.id and ua.group_id = :groupId and ua.be_deleted = false",
            nativeQuery = true)
    Optional<GroupsImageEntity> findImage(@Param("groupId") long groupId);
    @Query(value = "SELECT ua.* FROM groups_image ua, groups u WHERE ua.group_id = u.id and ua.group_id = :groupId and ua.be_deleted = :beDeleted",
            nativeQuery = true)
    List<GroupsImageEntity> findImages(
            @Param("groupId") long groupId,
            @Param("beDeleted") boolean beDeleted);

    GroupsImageEntity findByPath(String path);
}
