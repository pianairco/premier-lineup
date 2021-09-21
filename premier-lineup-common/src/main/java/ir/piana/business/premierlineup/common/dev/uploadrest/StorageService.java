package ir.piana.business.premierlineup.common.dev.uploadrest;

import ir.piana.business.premierlineup.common.util.CommonUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.stream.Stream;

public abstract class StorageService {
    protected StorageProperties storageProperties;

    public abstract void init();

    public abstract GroupProperties getGroupProperties(String group);

    public StorageImageContainer preparation(HttpServletRequest request, String base64file, String group) {
        int width = storageProperties.getGroups().get(group).getWidth();
        int height = storageProperties.getGroups().get(group).getHeight();
        String rotateString = request.getHeader("image-upload-rotation");
        int rotation = 0;
        if(!CommonUtils.isNull(rotateString)) {
            rotation = Integer.parseInt(rotateString);
        }

        String format = base64file.substring(0, base64file.indexOf(";")).split(":")[1].split("/")[1];
        String filename = RandomStringUtils.randomAlphanumeric(64).concat(".").concat(format);

        String file = base64file.substring(base64file.indexOf(";") + "base64,".length() + 1);
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = new ByteArrayInputStream(Base64.getDecoder().decode(file))) {
                BufferedImage originalImage = ImageIO.read(inputStream);
//                    BufferedImage scaledImg = Scalr.resize(
//                            originalImage, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, 2000, 750);
                int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB
                        : originalImage.getType();

                BufferedImage scaledImg = manipulateImage(originalImage, type, rotation, width, height);
//                    ImageIO.write(scaledImg, format, new File(filePath));

                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageIO.write(scaledImg, format, os);
                // Passing: ​(RenderedImage im, String formatName, OutputStream output)

                return StorageImageContainer.builder().file(os.toByteArray()).filename(filename).format(format).build();
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
    }

    public StorageImageContainer preparation(HttpServletRequest request, MultipartFile file, String group) {
        int width = storageProperties.getGroups().get(group).getWidth();
        int height = storageProperties.getGroups().get(group).getHeight();
        String rotateString = request.getHeader("image-upload-rotation");
        int rotation = 0;
        if(!CommonUtils.isNull(rotateString)) {
            rotation = Integer.parseInt(rotateString);
        }

        String format = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String filename = RandomStringUtils.randomAlphanumeric(64).concat(".").concat(format);

        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new StorageException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                InputStream is = null;
                BufferedImage originalImage = ImageIO.read(inputStream);
//                    BufferedImage scaledImg = Scalr.resize(
//                            originalImage, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, 2000, 750);
                int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB
                        : originalImage.getType();

                BufferedImage scaledImg = manipulateImage(originalImage, type, rotation, width, height);
//                    ImageIO.write(scaledImg, format, new File(filePath));

                ByteArrayOutputStream os = new ByteArrayOutputStream();
                ImageIO.write(scaledImg, format, os);
                // Passing: ​(RenderedImage im, String formatName, OutputStream output)

                return StorageImageContainer.builder().file(os.toByteArray()).filename(filename).format(format).build();
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file " + filename, e);
        }
    }

    public abstract String store(MultipartFile file, String group);

    public String store(MultipartFile file, String group, String rotation) {
        throw new NotImplementedException();
    }

    public String store(MultipartFile file, String group, String rotation, Integer width, Integer height) {
        throw new NotImplementedException();
    }

    public String store(String file, String group, int rotation) {
        throw new NotImplementedException();
    }

    public abstract Stream<Path> loadAll();

    public abstract Path load(String filename);

    public abstract Resource loadAsResource(String filename);

    public abstract void deleteAll();

    protected static BufferedImage rotateImageByDegrees(BufferedImage img, int type, double angle) {

        double rads = Math.toRadians(angle);
        double sin = Math.abs(Math.sin(rads)), cos = Math.abs(Math.cos(rads));
        int w = img.getWidth();
        int h = img.getHeight();
        int newWidth = (int) Math.floor(w * cos + h * sin);
        int newHeight = (int) Math.floor(h * cos + w * sin);

        BufferedImage rotated = new BufferedImage(newWidth, newHeight, type);
        Graphics2D g2d = rotated.createGraphics();
        AffineTransform at = new AffineTransform();
        at.translate((newWidth - w) / 2, (newHeight - h) / 2);

        int x = w / 2;
        int y = h / 2;

        at.rotate(rads, x, y);
        g2d.setTransform(at);
        g2d.drawImage(img, 0, 0, null);
        g2d.dispose();

        return rotated;
    }

    protected static BufferedImage manipulateImage(
            BufferedImage originalImage, int type,
            Integer rotation, Integer img_width, Integer img_height) {
        BufferedImage resizedImage = new BufferedImage(img_width, img_height, type);
        Graphics2D g = resizedImage.createGraphics();
        g.drawImage(originalImage, 0, 0, img_width, img_height, null);
        g.dispose();

//        Graphics2D g2r = resizedImage.createGraphics();
//        AffineTransform identity = new AffineTransform();
//        AffineTransform trans = new AffineTransform();
//        trans.setTransform(identity);
//        trans.rotate(Math.toRadians(rotation));
//        g2r.drawImage(resizedImage, trans, null);

        return rotateImageByDegrees(resizedImage, type, rotation);
    }
}
