package ir.piana.business.premierlineup.common.dev.uploadrest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupProperties {
    private String folder;
    private int width;
    private int height;
    private String afterSaveImageActivity;
    private String sql;
    private String bean;
    private List<String> sqls;
}
