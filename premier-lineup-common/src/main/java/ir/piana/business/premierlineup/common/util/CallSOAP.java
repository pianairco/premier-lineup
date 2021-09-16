package ir.piana.business.premierlineup.common.util;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class CallSOAP {
    public static Document callSOAP(String xmlInput, String wsURL, String SOAPAction) throws IOException {
        String responseString = "";
        String outputString = "";
        URL url = new URL(wsURL);
        HttpURLConnection postConnection = (HttpURLConnection)url.openConnection();
        ByteArrayOutputStream bout = new ByteArrayOutputStream();
        byte[] buffer = new byte[xmlInput.length()];
        buffer = xmlInput.getBytes();
        bout.write(buffer);
        byte[] b = bout.toByteArray();
        postConnection.setRequestProperty("Content-Length", String.valueOf(b.length));
        postConnection.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
        postConnection.setRequestProperty("SOAPAction", SOAPAction);
        postConnection.setRequestMethod("POST");
        postConnection.setDoOutput(true);
        postConnection.setDoInput(true);
        OutputStream out = postConnection.getOutputStream();
        out.write(b);
        out.close();
        int responseCode = postConnection.getResponseCode();
        if (responseCode != 200) {
            return null;
        } else {
            InputStreamReader isr = new InputStreamReader(postConnection.getInputStream());

            for(BufferedReader in = new BufferedReader(isr); (responseString = in.readLine()) != null; outputString = outputString + responseString) {
            }

            Document document = parseXmlFile(outputString);
            return document;
        }
    }

    public static Document parseXmlFile(String in) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(in));
            return db.parse(is);
        } catch (ParserConfigurationException var5) {
            throw new RuntimeException(var5);
        } catch (SAXException var6) {
            throw new RuntimeException(var6);
        } catch (IOException var7) {
            throw new RuntimeException(var7);
        }
    }
}
