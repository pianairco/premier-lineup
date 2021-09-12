package ir.piana.business.premierlineup.common.model.form.structure;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SelectableItem<T> {
    private String title;
    private T value;
}
