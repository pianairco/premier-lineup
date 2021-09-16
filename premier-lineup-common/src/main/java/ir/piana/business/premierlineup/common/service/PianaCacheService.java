package ir.piana.business.premierlineup.common.service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class PianaCacheService {
    private Cache<Object, Object> cache;

    @PostConstruct
    public void init() {
        CacheLoader<String, Object> loader;
        loader = new CacheLoader<String, Object>() {
            @Override
            public Object load(String key) {
                return RandomStringUtils.randomNumeric(4);
            }
        };

        cache = CacheBuilder.newBuilder()
                .maximumSize(1000)
                .expireAfterWrite(2, TimeUnit.MINUTES)
                .build();
    }

    public Object put(Object value) {
        String key = UUID.randomUUID().toString();
        cache.put(key, value);
        return key;
    }

    public Object getValue(Object key) {
        Object ifPresent = cache.getIfPresent(key);
        if(ifPresent != null) {
            cache.invalidate(key);
        }
        return ifPresent;
    }
}
