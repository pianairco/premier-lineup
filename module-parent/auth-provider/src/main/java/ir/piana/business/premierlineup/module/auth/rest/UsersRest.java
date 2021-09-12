package ir.piana.business.premierlineup.module.auth.rest;

import ir.piana.business.premierlineup.module.auth.data.entity.UserEntity;
import ir.piana.business.premierlineup.module.auth.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersRest {
    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void init() {
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @GetMapping(path = "users")
    public ResponseEntity<List<UserEntity>> getTest() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
