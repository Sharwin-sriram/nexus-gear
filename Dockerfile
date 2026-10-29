# Multi-stage Dockerfile for NEXUS GEAR on Render.com
# Stage 1: Build with Maven and OpenJDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Cache Maven dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source and package jar
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Production JRE runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Set default port (Render will inject $PORT at runtime)
ENV PORT=8080
EXPOSE 8080

# Copy packaged jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Run application with Render port binding
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
