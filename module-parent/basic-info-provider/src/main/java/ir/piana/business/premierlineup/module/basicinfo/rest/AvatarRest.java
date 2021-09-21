package ir.piana.business.premierlineup.module.basicinfo.rest;

import com.google.common.io.ByteStreams;
import ir.piana.business.premierlineup.common.dev.uploadrest.AfterPreparationImageAction;
import ir.piana.business.premierlineup.common.dev.uploadrest.StorageImageContainer;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.common.service.PianaCacheService;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.basicinfo.data.entity.UserAvatarEntity;
import ir.piana.business.premierlineup.module.basicinfo.data.repository.UserAvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController("avatarService")
@RequestMapping("/api/basic-info/avatar")
public class AvatarRest implements AfterPreparationImageAction {
    @Autowired
    private UserAvatarRepository userAvatarRepository;

    @Autowired
    private Environment env;

    @Autowired
    private PianaCacheService pianaCacheService;

    byte[] userImage;

    @PostConstruct
    public void init() throws IOException {
        userImage = ByteStreams.toByteArray(this.getClass().getResourceAsStream("/user.png"));
    }

    @Override
    public ResponseEntity doProcess(HttpServletRequest request, StorageImageContainer imageContainer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userEntity = ((UserModel) authentication.getPrincipal()).getUserEntity();
        List<UserAvatarEntity> byUserIds = userAvatarRepository.findAvatars(userEntity.getId(), false);
        if(byUserIds != null) {
            byUserIds.stream().forEach(avatar -> {
                avatar.setBeDeleted(true);
                userAvatarRepository.save(avatar);
            });
        }
        UserAvatarEntity save = userAvatarRepository.save(UserAvatarEntity.builder()
                .userId(userEntity.getId())
                .path(imageContainer.getFilename())
                .imageData(imageContainer.getFile())
                .build());

        request.getSession().setAttribute("avatar", save);
        return ResponseEntity.ok(ResponseModel.builder().code(0).data(save.getPath()).build());
    }

//    @PreAuthorize("hasRole('ROLE_AUTHENTICATED')")
    @GetMapping
    public byte[] avatar(
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        if(request.getSession().getAttribute("avatar") != null) {
            response.setContentType("image/png");
            return ((UserAvatarEntity)request.getSession().getAttribute("avatar")).getImageData();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!CommonUtils.isNull(authentication.getPrincipal()) &&
                !(authentication.getPrincipal() instanceof String &&
                        authentication.getPrincipal().toString().equalsIgnoreCase("anonymousUser"))) {
            long userId = ((UserModel) authentication.getPrincipal()).getUserEntity().getId();
            Optional<UserAvatarEntity> byUserId = userAvatarRepository.findActiveAvatar(userId);
            if (byUserId.isPresent()) {
                request.getSession().setAttribute("avatar", byUserId);
                response.setContentType("image/png");
                return byUserId.get().getImageData();
            }
        }
        response.setContentType("image/png");
        return userImage;
    }
}
