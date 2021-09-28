package ir.piana.business.premierlineup.module.lineup.rest;

import com.google.common.io.ByteStreams;
import ir.piana.business.premierlineup.common.dev.uploadrest.AfterPreparationImageAction;
import ir.piana.business.premierlineup.common.dev.uploadrest.StorageImageContainer;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.auth.service.AuthenticationService;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsImageEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsJoinRequestEntity;
import ir.piana.business.premierlineup.module.lineup.data.entity.GroupsMemberEntity;
import ir.piana.business.premierlineup.module.lineup.data.repository.GroupsImageRepository;
import ir.piana.business.premierlineup.module.lineup.data.repository.GroupsJoinRequestRepository;
import ir.piana.business.premierlineup.module.lineup.data.repository.GroupsMemberRepository;
import ir.piana.business.premierlineup.module.lineup.data.repository.GroupsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController("groupImageService")
@RequestMapping("/api/modules/lineup/group")
public class GroupRest implements AfterPreparationImageAction {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private GroupsRepository groupsRepository;

    @Autowired
    private GroupsImageRepository groupsImageRepository;

    @Autowired
    private GroupsMemberRepository groupsMemberRepository;

    @Autowired
    private GroupsJoinRequestRepository joinRequestRepository;

    @Autowired
    private Environment env;

    @Autowired
    private PianaCacheService pianaCacheService;

    byte[] groupImage;

    @PostConstruct
    public void init() throws IOException {
        groupImage = ByteStreams.toByteArray(this.getClass().getResourceAsStream("/group.png"));
    }

    @Override
    public ResponseEntity doProcess(HttpServletRequest request, StorageImageContainer imageContainer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String groupIdString = request.getHeader("group_id");
        if(CommonUtils.isNull(groupIdString)) {
            ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }

        Optional<GroupsEntity> byId = groupsRepository.findById(Long.parseLong(groupIdString));
        if(!byId.isPresent()) {
            ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }
        GroupsEntity groupsEntity = byId.get();
        List<GroupsImageEntity> groupsImages = groupsImageRepository.findImages(Long.parseLong(groupIdString), false);
        if(groupsImages != null) {
            groupsImages.stream().forEach(image -> {
                image.setBeDeleted(true);
                groupsImageRepository.save(image);
            });
        }

        GroupsImageEntity save = groupsImageRepository.save(GroupsImageEntity.builder()
                .groupId(groupsEntity.getId())
                .path(imageContainer.getFilename())
                .imageData(imageContainer.getFile())
                .build());

        request.getSession().setAttribute(save.getPath(), save);
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(save.getPath()).build());
    }

//    @PreAuthorize("hasRole('ROLE_AUTHENTICATED')")
    @GetMapping({"image", "image/{path}"})
    public byte[] getGroupImage(
            @PathVariable(name = "path", required = false) String path,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
//        String path = request.getServletPath().substring(request.getServletPath().lastIndexOf("/"));
        if (CommonUtils.isNull(path)) {
            response.setContentType("image/png");
            return groupImage;
        } else if (request.getSession().getAttribute(path) != null) {
            response.setContentType("image/png");
            return ((GroupsImageEntity)request.getSession().getAttribute(path)).getImageData();
        } else {
            GroupsImageEntity byPath = groupsImageRepository.findByPath(path);
            request.getSession().setAttribute(byPath.getPath(), byPath);
            response.setContentType("image/png");
            return byPath.getImageData();
        }
    }

    @PostMapping(path = "save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseModel> create(
            HttpServletRequest request, @RequestBody Map<String, String> body) {
        UserModel userModel = authenticationService.getIfAuthenticated();
        if(CommonUtils.isNull(body.get("name"))) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        } else if (groupsRepository.findByName(body.get("name")).isPresent()) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        } else if (userModel == null) {
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());
        }
        GroupsEntity save = groupsRepository.save(GroupsEntity.builder()
                .userId(userModel.getUserEntity().getId())
                .uuid(UUID.randomUUID().toString())
                .name(body.get("name")).build());

        GroupsMemberEntity save1 = groupsMemberRepository.save(
                GroupsMemberEntity.builder()
                        .groupId(save.getId())
                        .userId(save.getUserId())
                        .build());
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(save).build());
    }

    @GetMapping("info-by-uuid/{uuid}")
    public ResponseEntity<ResponseModel> getInfoByUuid(@PathVariable("uuid") String uuid) {
        Optional<GroupsEntity> byUuid = groupsRepository.findByUuid(uuid);
        if(!byUuid.isPresent())
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(byUuid.get()).build());
    }

    @GetMapping("goto-join-by-uuid/{uuid}")
    public ResponseEntity gotoJoinByUuid(@PathVariable("uuid") String uuid) {
        Optional<GroupsEntity> byUuid = groupsRepository.findByUuid(uuid);
        if(!byUuid.isPresent()) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        return ResponseEntity.status(302).header("Location",
                "https://piana.ir/#/root/authenticated/group/join-by-uuid/" + uuid).build();
    }

    @GetMapping("shared-link")
    public ResponseEntity<ResponseModel> getSharedLink(@RequestParam("group-id") Long groupId) {
        Optional<GroupsEntity> byId = groupsRepository.findById(groupId);
        if(!byId.isPresent())
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        return ResponseEntity.ok(ResponseModel.builder().code(0)
                .data("https://piana.ir:8443/api/modules/lineup/group/goto-join-by-uuid/" + byId.get().getUuid())
                .build());
    }

    @GetMapping("join/{uuid}")
    public ResponseEntity<ResponseModel> join(
            HttpServletRequest request,
            @PathVariable("uuid") String uuid) {
        UserModel userModel = authenticationService.getIfAuthenticated();
        if(userModel == null) {
            request.getSession().setAttribute("join-to-group", uuid);
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        Optional<GroupsEntity> byUuid = groupsRepository.findByUuid(uuid);
        if (!byUuid.isPresent()) {
            return ResponseEntity.ok(ResponseModel.builder().code(2).build());
        }

        Optional<GroupsMemberEntity> byGroupIdAndUserId = groupsMemberRepository.findByGroupIdAndUserId(
                byUuid.get().getId(), userModel.getUserEntity().getId());
        if(byGroupIdAndUserId.isPresent()) {
            return ResponseEntity.ok(ResponseModel.builder().code(3).build());
        }

        if(byUuid.get().isPublic()) {
            GroupsMemberEntity save = GroupsMemberEntity.builder()
                    .groupId(byUuid.get().getId())
                    .userId(userModel.getUserEntity().getId())
                    .build();
            groupsMemberRepository.save(save);
        } else {
            GroupsJoinRequestEntity joinRequest = GroupsJoinRequestEntity.builder()
                    .groupId(byUuid.get().getId())
                    .userId(userModel.getUserEntity().getId())
                    .build();
            joinRequestRepository.save(joinRequest);
        }

        return ResponseEntity.ok(ResponseModel.builder().code(0).build());
    }

    @GetMapping("admin-groups")
    public ResponseEntity<ResponseModel> getAdminGroups(HttpServletRequest request) {
        UserModel userModel = authenticationService.getIfAuthenticated();
        if(userModel == null) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        List<GroupsEntity> allByUserId = groupsRepository.findAllByUserId(userModel.getUserEntity().getId());
        allByUserId.stream().forEach(g -> {
            g.setJoinLink("https://piana.ir:8443/api/modules/lineup/group/goto-join-by-uuid/" + g.getUuid());
        });
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(allByUserId).build());
    }

    @GetMapping("member-groups")
    public ResponseEntity<ResponseModel> getMemberGroups(HttpServletRequest request) {
        UserModel userModel = authenticationService.getIfAuthenticated();
        if(userModel == null) {
            return ResponseEntity.ok(ResponseModel.builder().code(1).build());
        }
        List<GroupsEntity> allByUserId = groupsRepository
                .findAllMemberGroups(userModel.getUserEntity().getId());

        return ResponseEntity.ok(ResponseModel.builder().code(0).data(allByUserId).build());
    }
}
