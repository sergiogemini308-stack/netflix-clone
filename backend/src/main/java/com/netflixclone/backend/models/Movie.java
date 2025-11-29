package com.netflixclone.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "movies") // 1. Esto dice: "Guarda esto en la colección 'movies' de Mongo"
@Data // 2. Esto es magia de Lombok: crea Getters, Setters y toString automático
public class Movie {
    
    @Id // 3. El ID único de la película (como la cédula)
    private String id;
    
    private String title;
    private String description;
    private String videoUrl;    // Aquí guardaremos el link del video
    private String coverImage;  // Aquí la url de la portada
    private int releaseYear;
}