# ETAPA 1: CONSTRUCCIÓN (Cocinando el código)
# Usamos una imagen que tiene Maven y Java 17
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Este comando crea el archivo .jar (el ejecutable)
RUN mvn clean package -DskipTests

# ETAPA 2: EJECUCIÓN (Sirviendo el plato)
# Usamos una imagen ligera solo con Java para que sea rápido
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copiamos solo el archivo .jar cocinado en la etapa anterior
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
# Abrimos el puerto 8080
EXPOSE 8080
# Arrancamos la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]