package ir.piana.business.premierlineup.module.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmInfo {
    private String type;
    private String uuid;
    private String otp;
}
