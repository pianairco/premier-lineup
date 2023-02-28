package ir.piana.business.premierlineup.module.lineup.data.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "from_group_invitation_request")
@SequenceGenerator(name = "master_seq", initialValue = 1, sequenceName = "master_seq", allocationSize = 1)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FromGroupInvitationRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "master_seq")
    @Column(name = "ID")
    private long id;
    @Column(name = "group_id")
    private long groupId;
    @Column(name = "unique_id")
    private String uniqueId;
    @Column(name = "try_count")
    private int tryCount;
    @Column(name = "registered_count")
    private int registeredCount;
    @Column(name = "is_free")
    private boolean isFree;
}
