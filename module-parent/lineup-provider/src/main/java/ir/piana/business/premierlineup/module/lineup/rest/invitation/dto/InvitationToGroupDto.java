package ir.piana.business.premierlineup.module.lineup.rest.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvitationToGroupDto {
    public long groupId;
    public boolean isPublic;
    public List<String> mobiles;
}
