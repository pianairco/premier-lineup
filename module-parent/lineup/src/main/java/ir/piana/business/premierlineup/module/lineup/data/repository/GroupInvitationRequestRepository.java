package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.GroupInvitationRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupInvitationRequestRepository extends JpaRepository<GroupInvitationRequestEntity, Long> {
    Optional<GroupInvitationRequestEntity> findByUniqueIdAndMobile(String uniqueId, String mobile);
    List<GroupInvitationRequestEntity> findAllByUniqueId(String uniqueId);
}
