package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.annotations.SerializedName;

public enum StatusCode {
    @SerializedName("0")
    Unknown(0),
    @SerializedName("1")
    Sended(1),
    @SerializedName("2")
    InQueue(2),
    @SerializedName("3")
    Filtered(3),
    @SerializedName("8")
    InTelecommunication(8),
    @SerializedName("16")
    NotInTelecommunication(16),
    @SerializedName("27")
    NumberError(27),
    @SerializedName("23")
    ServerFull(23);

    private final int value;

    private StatusCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
