package com.Prisonman.Prisonman.Repository;

import com.Prisonman.Prisonman.Model.Cell;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CellRepository extends MongoRepository<Cell, String> {
}
