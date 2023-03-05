package ir.piana.business.premierlineup.common.model;

import lombok.Getter;

import java.util.LinkedHashMap;
import java.util.Map;

public class JsonCreator {
    private Map<String, Object> data;

    private JsonCreator () {
        data = new LinkedHashMap<>();
    }

    public static JsonCreator Builder() {
        return new JsonCreator();
    }

    public JsonCreator push(String key, Object value) {
        data.put(key, value);
        return this;
    }

    public Map<String, Object> build() {
        return data;
    }
}
