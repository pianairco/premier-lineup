package ir.piana.business.premierlineup.module.lineup.models;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberModel {
    private String username;
    private String mobile;
    private String pictureUrl;
}
