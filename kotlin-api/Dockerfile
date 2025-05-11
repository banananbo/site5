FROM gradle:7.6.0-jdk11 AS build
WORKDIR /app
COPY . .
RUN gradle build --no-daemon

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","app.jar"] 