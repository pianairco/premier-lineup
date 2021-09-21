package ir.piana.business.premierlineup.module.basicinfo.data.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_avatar")
@SequenceGenerator(name = "master_seq", initialValue = 1, sequenceName = "master_seq", allocationSize = 1)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAvatarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "master_seq")
    @Column(name = "ID")
    private long id;
    @Column(name = "user_id")
    private long userId;
    @Column(name = "path")
    private String path;
    @Column(name = "format")
    private String format;
    @Column(name = "be_deleted")
    private boolean beDeleted;
    @Column(name = "image_data")
    @Lob
    private byte[] imageData;
}
