package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.annotations.SerializedName;

public class ReceivedMsgs {
    @SerializedName("MsgBody")
    private String msgBody;
    @SerializedName("Mobile")
    private String mobile;
    @SerializedName("Date")
    private Long date;

    public ReceivedMsgs() {
    }

    public String getMsgBody() {
        return this.msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getMobile() {
        return this.mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Long getDate() {
        return this.date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    public String toString() {
        return "ReceivedMsgs [MsgBody=" + this.msgBody + ", Mobile=" + this.mobile + ", Date=" + this.date + "]";
    }
}
