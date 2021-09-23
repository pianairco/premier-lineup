package ir.piana.business.premierlineup.module.general.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.business.premierlineup.common.initializr.MenuBootstrapper;
import ir.piana.business.premierlineup.common.model.MenuModel;
import ir.piana.business.premierlineup.module.general.data.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/modules/general/menu")
public class MenuRest {
    @Autowired
    private MenuRepository menuRepository;

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
        return ResponseEntity.ok(menuBootstrapper.getMenuModels());
    }
}
