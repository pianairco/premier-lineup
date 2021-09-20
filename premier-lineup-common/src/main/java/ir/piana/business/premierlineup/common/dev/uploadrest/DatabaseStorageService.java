package ir.piana.business.premierlineup.common.dev.uploadrest;

import ir.piana.business.premierlineup.common.dev.sqlrest.SqlQueryService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service("databaseStorageService")
@Profile("production")
public class DatabaseStorageService extends StorageService {
    private final Path rootLocation;

    @Autowired
    private SqlQueryService sqlQueryService;

    @Autowired
    public DatabaseStorageService(StorageProperties properties) {
        storageProperties = properties;
        this.rootLocation = Paths.get(properties.getLocation());
    }

    public GroupProperties getGroupProperties(String group) {
        return storageProperties.getGroups().get(group);
    }

    @Override
    public String store(MultipartFile file, String group) {
        Integer width = storageProperties.getGroups().get(group).getWidth();
        Integer height = storageProperties.getGroups().get(group).getHeight();
        return this.store(file, group, "0", width, height);
    }

    @Override
    public String store(String sourceData, String group, int rotation) {
        String format = "";
        try {
            String[] parts = sourceData.split(",");
            String imageString = parts[1];

            if(parts[0].startsWith("data:")) {
                format = parts[0].substring(5).split(";")[0];
                if(format.equalsIgnoreCase("image/jpeg"))
                    format = "jpeg";
                if(format.equalsIgnoreCase("image/jpg"))
                    format = "jpg";
                else if(format.equalsIgnoreCase("image/png"))
                    format = "png";
            }
            String filename = RandomStringUtils.randomAlphanumeric(64).concat(".").concat(format);

            BufferedImage originalImage = null;
            byte[] imageByte;

            BASE64Decoder decoder = new BASE64Decoder();
            imageByte = decoder.decodeBuffer(imageString);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            originalImage = ImageIO.read(bis);
            bis.close();

            int type = originalImage.getType() == 0? BufferedImage.TYPE_INT_ARGB
                    : originalImage.getType();

            BufferedImage scaledImg = manipulateImage(originalImage, type, rotation,
                    storageProperties.getGroups().get(group).getWidth(),
                    storageProperties.getGroups().get(group).getHeight());

            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(scaledImg, format, os);
            // Passing: ​(RenderedImage im, String formatName, OutputStream output)

            sqlQueryService.insert("insert into images (id, image_src, image_type, image_data) values (master_seq.nextval, ?, ?, ?)",
                    "", new Object[] { filename, "image/" + format, os.toByteArray() });

            return filename;
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file!", e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException(
                        "Could not read file: " + filename);

            }
        }
        catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            if(!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
        }
        catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
