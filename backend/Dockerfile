# ETAPA 1: CONSTRUCCIÓN
# Usamos una imagen de Maven más moderna y estable
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# ETAPA 2: EJECUCIÓN
# Cambiamos 'openjdk' por 'eclipse-temurin' que sí está disponible
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]