package ir.piana.business.premierlineup.module.lineup.data.repository;

import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsMemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupsMemberRepository extends JpaRepository<GroupsMemberEntity, Long> {
    List<GroupsMemberEntity> findAllByUserId(long userId);
    Optional<GroupsMemberEntity> findByGroupIdAndUserId(long groupId, long userId);
}
