package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.annotations.SerializedName;

public class RecipientsMessage {
    @SerializedName("Id")
    private String id;
    @SerializedName("Message")
    private String message;
    @SerializedName("Mobile")
    private String mobile;

    public RecipientsMessage() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMobile() {
        return this.mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String toString() {
        return "RecipientsMessage [Id=" + this.id + ", Message=" + this.message + ", Mobile=" + this.mobile + "]";
    }
}
