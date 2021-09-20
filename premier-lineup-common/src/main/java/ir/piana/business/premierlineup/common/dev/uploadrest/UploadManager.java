package ir.piana.business.premierlineup.common.dev.uploadrest;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.piana.business.premierlineup.common.dev.sqlrest.SqlQueryService;
import ir.piana.business.premierlineup.common.model.ResponseModel;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

@Controller
@RequestMapping("api/upload-manager")
@Profile("production")
public class UploadManager {
    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private SqlQueryService sqlService;

    @Autowired
    @Qualifier("databaseStorageService")
    private StorageService storageService;

    @Autowired
    StorageProperties storageProperties;

    private static ObjectMapper jsonMapper = new ObjectMapper();

    @RequestMapping(value = "/serve", method = RequestMethod.POST,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = "application/json; charset=utf8")
    public @ResponseBody
    ResponseEntity upload(HttpServletRequest request,
                          @RequestHeader("image_upload_group") String group,
                          @RequestParam("file") MultipartFile file) {
        try {
            StorageImageContainer preparation = storageService.preparation(request, file, group);
            String beanName = storageProperties.getGroups().get(group).getBean();
            AfterPreparationImageAction bean = (AfterPreparationImageAction) applicationContext.getBean(beanName);
            return bean.doProcess(request, preparation);
        } catch (Exception e) {
            e.printStackTrace();
            return internalServerError.apply(request);
        }
    }

    Function<HttpServletRequest, ResponseEntity> notFound = (r) -> {
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<String>("Not Fund", responseHeaders, HttpStatus.NOT_FOUND);
    };

    Function<HttpServletRequest, ResponseEntity> notImplement = (r) -> {
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<String>("Not Implemented", responseHeaders, HttpStatus.NOT_IMPLEMENTED);
    };

    Function<HttpServletRequest, ResponseEntity> internalServerError = (r) -> {
        HttpHeaders responseHeaders = new HttpHeaders();
        return new ResponseEntity<String>("Internal Server Error", responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
    };





    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
}
