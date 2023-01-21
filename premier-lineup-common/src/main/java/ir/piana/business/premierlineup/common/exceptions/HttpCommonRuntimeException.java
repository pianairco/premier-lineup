package ir.piana.business.premierlineup.common.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class HttpCommonRuntimeException extends RuntimeException {
    private HttpStatus httpStatus;
    private int code;
    private String message;

    public HttpCommonRuntimeException(int code, String message) {
        this(HttpStatus.OK, code, message);
    }

    public HttpCommonRuntimeException(HttpStatus httpStatus, int code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }
}
