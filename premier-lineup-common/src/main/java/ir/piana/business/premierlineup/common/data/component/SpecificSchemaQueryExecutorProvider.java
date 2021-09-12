package ir.piana.business.premierlineup.common.data.component;

import ir.piana.business.premierlineup.common.data.util.SpecificSchemaQueryExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.sql.SQLException;

@Service("SpecificSchemaQueryExecutorProvider")
@DependsOn("dataSourceService")
@Slf4j
public class SpecificSchemaQueryExecutorProvider {
//    @Autowired
//    @Qualifier("dataSources")
//    private Map<String, HikariDataSource> datasources;

    @Autowired
    @Qualifier("supportExecutor")
    private SpecificSchemaQueryExecutor supportExecutor;

    @PostConstruct
    public void init() {
      log.info("SpecificSchemaQueryExecutorProvider => initialized");
    }

//    public void executeOnAllDataSources(String query) {
//        for(String key : multiShopExecutors.keySet()) {
//            try {
//                multiShopExecutors.get(key).execute(query);
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//    }

    public void executeOnSupport(String query) {
        try {
            supportExecutor.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public SpecificSchemaQueryExecutor getSupportExecutor() {
        return this.supportExecutor;
    }

//    public SpecificSchemaQueryExecutor getSpecificSchemaQueryExecutor(String tenantId) {
//        return new SpecificSchemaQueryExecutor(datasources.get(tenantId));
//    }

//    public void executeOnAllDataSources(String query) {
//        for(String key : datasources.keySet()) {
//            try {
//                new SpecificSchemaQueryExecutor(datasources.get(key)).execute(query);
//            } catch (SQLException e) {
//                e.printStackTrace();
//            }
//        }
//    }
}
