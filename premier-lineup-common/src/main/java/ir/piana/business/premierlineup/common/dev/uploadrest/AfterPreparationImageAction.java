package ir.piana.business.premierlineup.common.dev.uploadrest;

import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

public interface AfterPreparationImageAction {
    ResponseEntity doProcess (HttpServletRequest request, StorageImageContainer imageContainer);
}
