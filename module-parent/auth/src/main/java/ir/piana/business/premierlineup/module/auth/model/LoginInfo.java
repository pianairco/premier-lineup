package ir.piana.business.premierlineup.module.auth.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfo {
    private String mobile;
    private String username;
    private String password;
    private String captcha;
    private String uuid;
    private String accessToken;
    private String otp;
}
