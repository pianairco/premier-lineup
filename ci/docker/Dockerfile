FROM maven:3.3-jdk-8-onbuild
WORKDIR /app
COPY / /app/
RUN cd build/; mvn package -DskipTests

RUN cp /usr/share/zoneinfo/Asia/Tehran /etc/localtime
COPY --from=build /app/premier-lineup-backend/target/premier-lineup-backend-1.0.jar /app/service.jar
ENTRYPOINT ["java", "-jar", "/app/service.jar"]
