package ir.piana.business.premierlineup.module.general.data.entity;

import ir.piana.business.premierlineup.common.data.entity.EntitySelectable;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SUBSIDIARY_LEDGER_NATURE")
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NatureSelectable implements EntitySelectable {
    /** identifier field */
    @Id
    @Column(name = "SL_NATURE_ID")
    private Long id;

    /** persistent field */
    @Column(name = "SL_NATURE_NAME")
    private String name;
}
