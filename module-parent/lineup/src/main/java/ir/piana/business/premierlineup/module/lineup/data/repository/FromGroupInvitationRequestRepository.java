package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.FromGroupInvitationRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FromGroupInvitationRequestRepository extends JpaRepository<FromGroupInvitationRequestEntity, Long> {
    Optional<FromGroupInvitationRequestEntity> findByUniqueId(String uniqueId);
}
