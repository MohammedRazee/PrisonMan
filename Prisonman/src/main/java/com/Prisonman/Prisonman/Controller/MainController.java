package com.Prisonman.Prisonman.Controller;

import com.Prisonman.Prisonman.Model.inmates;
import com.Prisonman.Prisonman.Repository.prisonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    prisonRepo prisonRepo;

    @PostMapping("addInmate")
    public void add_inmate(@RequestBody inmates inmate) {
        prisonRepo.save(inmate);
    }
}
