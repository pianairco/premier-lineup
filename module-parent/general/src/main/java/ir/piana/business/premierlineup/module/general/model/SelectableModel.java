package ir.piana.business.premierlineup.module.general.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SelectableModel<T> {
    private String title;
    private T value;
}
