package ir.piana.business.premierlineup.module.lineup.data.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "groups_member")
@SequenceGenerator(name = "master_seq", initialValue = 1, sequenceName = "master_seq", allocationSize = 1)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupsMemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "master_seq")
    @Column(name = "ID")
    private long id;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "group_id")
    private long groupId;
}
