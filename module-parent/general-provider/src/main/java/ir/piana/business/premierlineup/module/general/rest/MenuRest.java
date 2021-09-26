package ir.piana.business.premierlineup.module.general.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.business.premierlineup.common.initializr.MenuBootstrapper;
import ir.piana.business.premierlineup.common.model.MenuModel;
import ir.piana.business.premierlineup.common.util.CommonUtils;
import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.model.UserModel;
import ir.piana.business.premierlineup.module.auth.service.AuthenticationService;
import ir.piana.business.premierlineup.module.general.data.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/modules/general/menu")
public class MenuRest {
    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    private MenuBootstrapper menuBootstrapper;

    @Autowired
    @Qualifier("objectMapper")
    private ObjectMapper objectMapper;

    @PostConstruct
    public void init() throws IOException {
    }

    @GetMapping(path = "list")
    public ResponseEntity<List<MenuModel>> getMenuModel() {
        UserModel userModel = authenticationService.getIfAuthenticated();
        List<MenuModel> menus = null;
        if(!CommonUtils.isNull(userModel)) {
            Collection<GrantedAuthority> authorities = userModel.getAuthorities();
            List<String> collect = authorities.stream().map(g -> g.getAuthority().substring(5).toLowerCase())
                    .collect(Collectors.toList());
            menus = menuBootstrapper.getMenuModels().stream()
                    .filter(m -> m.getRoles().stream().filter(r -> collect.contains(r)).findFirst().isPresent())
                    .collect(Collectors.toList());
        } else {
            menus = menuBootstrapper.getMenuModels().stream()
                    .filter(m -> m.getRoles() == null || m.getRoles().isEmpty())
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(menus);
    }
}
