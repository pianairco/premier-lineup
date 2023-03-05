package ir.piana.business.premierlineup.module.lineup.rest.invitation.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvitationToGroupDto {
    public long groupId;
    public boolean isPublic;
    public List<String> mobiles;
}
