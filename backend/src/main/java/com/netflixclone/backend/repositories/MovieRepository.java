package com.netflixclone.backend.repositories;

import com.netflixclone.backend.models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // Le dice a Spring: "Este archivo sirve para hablar con la BD"
public interface MovieRepository extends MongoRepository<Movie, String> {
    // ¡Aquí está la magia!
    // Al extender de MongoRepository, ya tienes GRATIS métodos como:
    // .save()   -> Guardar
    // .findAll() -> Traer todo
    // .findById() -> Buscar uno
    // .delete()  -> Borrar
}
