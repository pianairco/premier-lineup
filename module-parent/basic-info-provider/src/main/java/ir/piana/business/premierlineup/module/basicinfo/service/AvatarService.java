package ir.piana.business.premierlineup.module.basicinfo.service;

import ir.piana.business.premierlineup.common.dev.uploadrest.AfterPreparationImageAction;
import ir.piana.business.premierlineup.common.dev.uploadrest.StorageImageContainer;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.basicinfo.data.entity.UserAvatarEntity;
import ir.piana.business.premierlineup.module.basicinfo.data.repository.UserAvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component("avatarService")
public class AvatarService implements AfterPreparationImageAction {
    @Autowired
    UserAvatarRepository userAvatarRepository;

    @Override
    public ResponseEntity doProcess(HttpServletRequest request, StorageImageContainer imageContainer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity userEntity = ((UserModel) authentication.getPrincipal()).getUserEntity();
        UserAvatarEntity save = userAvatarRepository.save(UserAvatarEntity.builder()
                .userId(userEntity.getId())
                .path(imageContainer.getFilename())
                .imageData(imageContainer.getFile())
                .build());

        return ResponseEntity.ok(ResponseModel.builder().code(0).data(save.getPath()).build());
    }
}
