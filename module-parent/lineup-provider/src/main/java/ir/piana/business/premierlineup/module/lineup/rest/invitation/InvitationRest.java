package ir.piana.business.premierlineup.module.lineup.rest.invitation;

import ir.piana.business.premierlineup.common.exceptions.HttpCommonRuntimeException;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.lineup.data.entity.FromGroupInvitationRequestEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupInvitationRequestEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsMemberEntity;
import ir.piana.business.premierlineup.module.lineup.data.repository.*;
import ir.piana.business.premierlineup.module.lineup.rest.invitation.dto.InvitationToGroupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController("InvitationRest")
@RequestMapping("/api/modules/lineup/group/invitation")
public class InvitationRest {
    @Autowired
    private FromGroupInvitationRequestRepository fromGroupInvitationRequestRepository;

    @Autowired
    private GroupInvitationRequestRepository groupInvitationRequestRepository;

    @Autowired
    private GroupsMemberRepository groupsMemberRepository;

    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private GroupsJoinRequestRepository groupsJoinRequestRepository;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping(path = "invite-to-group",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> inviteToGroup(
            @RequestBody InvitationToGroupDto invitationToGroupDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserModel userModel = (UserModel) authentication.getPrincipal();
        Optional<GroupsEntity> byUserIdAndGroupId = groupsRepository.findByUserIdAndId(userModel.getUserEntity().getId(), invitationToGroupDto.groupId);
        if(!byUserIdAndGroupId.isPresent())
            throw new HttpCommonRuntimeException(HttpStatus.INTERNAL_SERVER_ERROR, 10, "error");

        FromGroupInvitationRequestEntity build = FromGroupInvitationRequestEntity.builder()
                .groupId(invitationToGroupDto.groupId)
                .isFree(invitationToGroupDto.isPublic)
                .uniqueId(UUID.randomUUID().toString())
                .build();
        fromGroupInvitationRequestRepository.save(build);

        String link = null;
        if (invitationToGroupDto.isPublic()) {
            link = "https://localhost:8443/api/modules/lineup/group/invitation/public/follow-invitation?uid=" + build.getUniqueId();
        } else {
            List<GroupInvitationRequestEntity> collect = invitationToGroupDto.getMobiles().stream().map(
                    mobile -> GroupInvitationRequestEntity.builder()
                            .groupId(invitationToGroupDto.groupId)
                            .mobile(mobile)
                            .uniqueId(build.getUniqueId())
                            .build()).collect(Collectors.toList());
            groupInvitationRequestRepository.saveAll(collect);
            link = "https://localhost:8443/api/modules/lineup/group/invitation/private/follow-invitation?uid=" + build.getUniqueId();
        }
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(link).build());
    }

    @GetMapping("public/follow-invitation")
    public ResponseEntity<Object> publicFollowInvitation(
            HttpSession session,
            @RequestParam("uid") String uid) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserModel userModel = null;
        Optional<FromGroupInvitationRequestEntity> byUniqueIdOptional = fromGroupInvitationRequestRepository.findByUniqueId(uid);
        FromGroupInvitationRequestEntity byUniqueId = null;
        if(!byUniqueIdOptional.isPresent()) {
            Object attribute = session.getAttribute("invite-to-group");
            if(attribute != null && attribute instanceof FromGroupInvitationRequestEntity)
                byUniqueId = (FromGroupInvitationRequestEntity) attribute;
            else
                throw new HttpCommonRuntimeException(11, "error");
        } else {
            byUniqueId = byUniqueIdOptional.get();
        }
        if(authentication.getPrincipal() instanceof UserModel) {
            userModel = (UserModel) authentication.getPrincipal();
        } else {
            session.setAttribute("invite-to-group", byUniqueId);
            session.setAttribute("redirect-after-login",
                    "https://localhost:8443/api/modules/lineup/group/invitation/" +
                            (byUniqueId.isFree() ? "public" : "private") + "/follow-invitation?" +
                            "uid=" + uid);
            return redirect("https://10.193.3.11:9443/#/auth/login");
        }

        GroupsMemberEntity save = groupsMemberRepository.save(GroupsMemberEntity.builder()
                .userId(userModel.getUserEntity().getId())
                .groupId(byUniqueId.getGroupId()).build());

        https://localhost:8443/api/modules/lineup/group/invitation/follow-invitation?uid=52241c42-acb1-4d7a-a175-43bdd090e23f
        return redirect("https://10.193.3.11:9443/#/root/authenticated/group/member-groups");
    }

    @GetMapping("private/follow-invitation")
    public ResponseEntity<Object> privateFollowInvitation(
            HttpSession session,
            @RequestParam("uid") String uid) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserModel userModel = null;
        Optional<FromGroupInvitationRequestEntity> byUniqueIdOptional = fromGroupInvitationRequestRepository.findByUniqueId(uid);
        FromGroupInvitationRequestEntity byUniqueId = null;
        if(!byUniqueIdOptional.isPresent()) {
            Object attribute = session.getAttribute("invite-to-group");
            if(attribute != null && attribute instanceof FromGroupInvitationRequestEntity)
                byUniqueId = (FromGroupInvitationRequestEntity) attribute;
            else
                throw new HttpCommonRuntimeException(11, "error");
        } else {
            byUniqueId = byUniqueIdOptional.get();
        }
        if(authentication.getPrincipal() instanceof UserModel) {
            userModel = (UserModel) authentication.getPrincipal();
        } else {
            session.setAttribute("invite-to-group", byUniqueId);
            session.setAttribute("redirect-after-login",
                    "https://localhost:8443/api/modules/lineup/group/invitation/" +
                            (byUniqueId.isFree() ? "public" : "private") + "/follow-invitation?" +
                            "uid=" + uid);
            return redirect("https://10.193.3.11:9443/#/auth/login");
        }

        Optional<GroupInvitationRequestEntity> byMobile = groupInvitationRequestRepository
                .findByUniqueIdAndMobile(uid, userModel.getUserEntity().getMobile());

        if (byMobile.isPresent()) {
            GroupsMemberEntity save = groupsMemberRepository.save(GroupsMemberEntity.builder()
                    .userId(userModel.getUserEntity().getId())
                    .groupId(byUniqueId.getGroupId()).build());
        }
        https://localhost:8443/api/modules/lineup/group/invitation/follow-invitation?uid=52241c42-acb1-4d7a-a175-43bdd090e23f
        return redirect("https://10.193.3.11:9443/#/root/authenticated/group/member-groups");
    }

    public ResponseEntity<Object> redirect(String url) {

        URI externalUri = null;
        try {
            externalUri = new URI(url);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(externalUri);

        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }

    /*public ResponseEntity<ResponseModel> getInvitedGroups() {
        fromGroupInvitationRequestRepository.
    }*/
}
