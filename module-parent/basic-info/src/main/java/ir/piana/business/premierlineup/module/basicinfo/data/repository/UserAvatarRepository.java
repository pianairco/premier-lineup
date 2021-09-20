package ir.piana.business.premierlineup.module.basicinfo.data.repository;

import ir.piana.business.premierlineup.module.basicinfo.data.entity.UserAvatarEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvatarRepository extends JpaRepository<UserAvatarEntity, Long> {
    UserAvatarEntity findByUserId(long userId);

//    @Query(value = "SELECT u.id FROM users u, weekly_matches_competition_prediction p WHERE " +
//            "p.id = :predictionId and u.id = p.user_id between :first and :second and wm.weekly_match_status_id in (1, 2, 3)", nativeQuery = true)
//    List<Long> findRelatedToCompetition(@Param("predictionId") String predictionId);
}
