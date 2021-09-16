package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.annotations.SerializedName;

public enum ResultCode {
    @SerializedName("0")
    Success(0),
    @SerializedName("1001")
    DocError(1001),
    @SerializedName("1002")
    NumberError(1002),
    @SerializedName("1003")
    DateError(1003),
    @SerializedName("1004")
    ParamError(1004),
    @SerializedName("2001")
    OwnNumberError(2001),
    @SerializedName("2002")
    UserError(2002),
    @SerializedName("2003")
    IPError(2003),
    @SerializedName("2004")
    DateRangeError(2004),
    @SerializedName("2005")
    UserListError(2005),
    @SerializedName("2006")
    MessageLengthError(2006),
    @SerializedName("2007")
    PortError(2007),
    @SerializedName("2008")
    PageError(2008),
    @SerializedName("2009")
    UserInfoError(2009),
    @SerializedName("3001")
    RegisterInfoError(3001),
    @SerializedName("3002")
    GroupError(3002),
    @SerializedName("3003")
    CreditError(3003),
    @SerializedName("3004")
    ServiceError(3004),
    @SerializedName("5001")
    ServerError(5001),
    @SerializedName("5002")
    SendError(5002),
    @SerializedName("5003")
    ReceiveError(5003),
    @SerializedName("5004")
    ParamSendError(5004);

    private final int value;

    private ResultCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
