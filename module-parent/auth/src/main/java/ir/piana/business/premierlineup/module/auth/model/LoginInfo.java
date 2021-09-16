package ir.piana.business.premierlineup.module.auth.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfo {
    private String username;
    private String mobile;
    private String password;
    private String captcha;
    private String uuid;
    private String accessToken;
    private String otp;
}
