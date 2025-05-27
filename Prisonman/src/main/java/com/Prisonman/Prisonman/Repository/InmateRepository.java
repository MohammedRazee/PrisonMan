package com.Prisonman.Prisonman.Repository;

import com.Prisonman.Prisonman.Model.Inmate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InmateRepository extends MongoRepository<Inmate, String> {
}
