package ir.piana.business.premierlineup.common.dev.uploadrest;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StorageImageContainer {
    private String filename;
    private String format;
    private byte[] file;
}
