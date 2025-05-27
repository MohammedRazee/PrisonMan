package com.Prisonman.Prisonman.Repository;

import com.Prisonman.Prisonman.Model.inmates;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface prisonRepo extends MongoRepository<inmates, String> {
}
