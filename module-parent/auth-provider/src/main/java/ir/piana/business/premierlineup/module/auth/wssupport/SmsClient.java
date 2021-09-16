package ir.piana.business.premierlineup.module.auth.wssupport;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import ir.piana.business.premierlineup.common.util.CallSOAP;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Base64;

public class SmsClient  {
    private static final String USERNAME = "mjrahmati";
    private static final String PASSWORD = "AsadMasad@1366";
    private static final Gson GSON = (new GsonBuilder()).setPrettyPrinting().create();
    private static final String FastSendWSURL = "http://smspanel.trez.ir/fastsend.asmx";

    public static Long SendMessageWithCode(String reciptionNumber, String code) throws MalformedURLException, IOException {
        String xmlInput = "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n  <soap12:Body>\n    <SendMessageWithCode xmlns=\"http://tempuri.org/\">\n      <Username>" + USERNAME + "</Username>\n" + "      <Password>" + PASSWORD + "</Password>\n" + "      <ReciptionNumber>" + reciptionNumber + "</ReciptionNumber>\n" + "      <Code>" + code + "</Code>\n" + "    </SendMessageWithCode>\n" + "  </soap12:Body>\n" + "</soap12:Envelope>";
        String SOAPAction = "http://tempuri.org/SendMessageWithCode";
        Document document = CallSOAP.callSOAP(xmlInput, "http://smspanel.trez.ir/fastsend.asmx", SOAPAction);
        if (document != null) {
            NodeList nodeLst = document.getElementsByTagName("SendMessageWithCodeResult");
            String result = nodeLst.item(0).getTextContent();
            return result != null && !result.isEmpty() ? Long.parseLong(result) : null;
        } else {
            return null;
        }
    }

    public static String getAuthHeader() {
        String Auth = USERNAME + ":" + PASSWORD;
        String encodedAuth = Base64.getEncoder().encodeToString(Auth.getBytes());
        String authHeader = "Basic " + encodedAuth;
        return authHeader;
    }

    public static Result SendMessage(String phoneNumber, String message, String[] mobiles, String userGroupID, Long SendDateInTimeStamp) throws IOException {
        String json = "{\n    \"PhoneNumber\": \"" + phoneNumber + "\",\r\n" + "    \"Message\": \"" + message + "\",\r\n" + "    \"Mobiles\": " + GSON.toJson(mobiles) + ",\r\n" + "    \"UserGroupID\": \"" + userGroupID + "\",\r\n" + "    \"SendDateInTimeStamp\":" + SendDateInTimeStamp + "\n}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/SendMessage");
        return callAPI(api, json);
    }

    public static Result SendCorrespondingMessage(String phoneNumber, RecipientsMessage[] recipientsMessage, String userGroupID) throws IOException {
        String json = "{\n    \"PhoneNumber\": \"" + phoneNumber + "\",\r\n" + "    \"RecipientsMessage\": " + GSON.toJson(recipientsMessage) + ",\r\n" + "    \"UserGroupID\": \"" + userGroupID + "\",\r\n}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/SendCorrespondingMessage");
        return callAPI(api, json);
    }

    public static Result SendMessageToPort(String phoneNumber, int recievePortNumber, int sendPortNumber, String userGroupID, RecipientsMessage[] recipientsMessage) throws IOException {
        String json = "{\n    \"PhoneNumber\": \"" + phoneNumber + "\",\r\n" + "    \"recievePortNumber\": " + recievePortNumber + ",\r\n" + "    \"sendPortNumber\": " + sendPortNumber + ",\r\n" + "    \"RecipientsMessage\": " + GSON.toJson(recipientsMessage) + ",\r\n" + "    \"UserGroupID\": \"" + userGroupID + "\",\r\n}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/SendMessageToPort");
        return callAPI(api, json);
    }

    public static Result GroupMessageStatus(String groupMessageId) throws IOException {
        String json = "{\"GroupMessageId\": \"" + groupMessageId + "\"}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/GroupMessageStatus");
        return callAPI(api, json);
    }

    public static Result CorrespondingMessageStatus(String[] messageId) throws IOException {
        String json = "{\"messageId\": " + GSON.toJson(messageId) + "}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/CorrespondingMessageStatus");
        return callAPI(api, json);
    }

    public static Result GetGroupMessageId(String groupId) throws IOException {
        String json = "{\"groupId\": \"" + groupId + "\"}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/GetGroupMessageId");
        return callAPI(api, json);
    }

    public static Result ReceiveMessages(String phoneNumber, Long startDate, Long EndDate, int page) throws IOException {
        String json = "{\n    \"PhoneNumber\": \"" + phoneNumber + "\",\r\n" + "    \"StartDate\": " + startDate + ",\r\n" + "    \"EndDate\": " + EndDate + ",\r\n" + "    \"Page\": " + page + ",\n}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/ReceiveMessages");
        return callAPI(api, json);
    }

    public static Result GetCredit() throws IOException {
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/GetCredit");
        return callAPI(api, "");
    }

    public static Result GetPrices() throws IOException {
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/GetPrices");
        return callAPI(api, "");
    }

    public static Result ShowWhiteList(String[] Mobiles) throws IOException {
        String json = "{\"MobilesList\": " + GSON.toJson(Mobiles) + "}";
        URL api = new URL("https://smspanel.trez.ir/api/smsAPI/ShowWhiteList");
        return callAPI(api, json);
    }

    private static Result callAPI(URL api, String POST_PARAMS) throws IOException {
        System.out.println(POST_PARAMS);
        HttpURLConnection postConnection = (HttpURLConnection)api.openConnection();
        postConnection.setRequestMethod("POST");
        postConnection.setRequestProperty("Authorization", getAuthHeader());
        postConnection.setRequestProperty("Content-Type", "application/json");
        postConnection.setDoOutput(true);
        OutputStream os = postConnection.getOutputStream();
        os.write(POST_PARAMS.getBytes());
        os.flush();
        os.close();
        int responseCode = postConnection.getResponseCode();
        if (responseCode != 200) {
            System.out.println("POST NOT WORKED");
            return null;
        } else {
            BufferedReader in = new BufferedReader(new InputStreamReader(postConnection.getInputStream()));
            StringBuffer response = new StringBuffer();

            String inputLine;
            while((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }

            in.close();
            System.out.println(response.toString());
            GsonBuilder builder = new GsonBuilder();
            builder.setPrettyPrinting();
            Gson gson = builder.create();
            Result result = (Result)gson.fromJson(response.toString(), Result.class);
            return result;
        }
    }

    public static Long AutoSendCode(String phoneNumber, String footer) throws MalformedURLException, IOException {
        String xmlInput = "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n  <soap12:Body>\n    <AutoSendCode xmlns=\"http://tempuri.org/\">\n      <Username>" + USERNAME + "</Username>\n" + "      <Password>" + PASSWORD + "</Password>\n" + "      <ReciptionNumber>" + phoneNumber + "</ReciptionNumber>\n" + "      <Footer>" + footer + "</Footer>\n" + "    </AutoSendCode>\n" + "  </soap12:Body>\n" + "</soap12:Envelope>";
        String SOAPAction = "http://tempuri.org/AutoSendCode";
        Document document = CallSOAP.callSOAP(xmlInput, "http://smspanel.trez.ir/fastsend.asmx", SOAPAction);
        if (document != null) {
            NodeList nodeLst = document.getElementsByTagName("AutoSendCodeResult");
            String code = nodeLst.item(0).getTextContent();
            return code != null && !code.isEmpty() ? Long.parseLong(code) : null;
        } else {
            return 0L;
        }
    }

    public static Boolean CheckSendCode(String reciptionNumber, String code) throws MalformedURLException, IOException {
        String xmlInput = "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">\n  <soap12:Body>\n    <CheckSendCode xmlns=\"http://tempuri.org/\">\n      <Username>" + USERNAME + "</Username>\n" + "      <Password>" + PASSWORD + "</Password>\n" + "      <ReciptionNumber>" + reciptionNumber + "</ReciptionNumber>\n" + "      <Code>" + code + "</Code>\n" + "    </CheckSendCode>\n" + "  </soap12:Body>\n" + "</soap12:Envelope>";
        String SOAPAction = "http://tempuri.org/CheckSendCode";
        Document document = CallSOAP.callSOAP(xmlInput, "http://smspanel.trez.ir/fastsend.asmx", SOAPAction);
        if (document != null) {
            NodeList nodeLst = document.getElementsByTagName("CheckSendCodeResult");
            String result = nodeLst.item(0).getTextContent();
            return result != null && !result.isEmpty() ? Boolean.parseBoolean(result) : false;
        } else {
            return false;
        }
    }
}
