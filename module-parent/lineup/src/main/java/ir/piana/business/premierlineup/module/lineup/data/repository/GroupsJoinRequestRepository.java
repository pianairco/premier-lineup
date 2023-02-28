package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsJoinRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupsJoinRequestRepository extends JpaRepository<GroupsJoinRequestEntity, Long> {
    List<GroupsJoinRequestEntity> findAllByUserId(long userId);
    Optional<GroupsJoinRequestEntity> findByGroupIdAndUserId(long groupId, long userId);
}
