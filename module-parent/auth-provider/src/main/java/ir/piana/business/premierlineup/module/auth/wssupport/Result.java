package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.JsonElement;
import com.google.gson.annotations.SerializedName;

public class Result {
    @SerializedName("Code")
    private ResultCode code;
    @SerializedName("Message")
    private String message;
    @SerializedName("Result")
    private JsonElement result;

    public Result() {
    }

    public ResultCode getCode() {
        return this.code;
    }

    public void setCode(ResultCode code) {
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public JsonElement getResult() {
        return this.result;
    }

    public void setResult(JsonElement result) {
        this.result = result;
    }

    public String toString() {
        return "Result [Code=" + this.code + ", Message=" + this.message + ", Result=" + this.result + "]";
    }
}
