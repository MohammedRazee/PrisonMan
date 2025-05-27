package com.Prisonman.Prisonman.Controller;

import com.Prisonman.Prisonman.Model.Inmate;
import com.Prisonman.Prisonman.Repository.InmateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inmates")
@CrossOrigin(origins = "http://localhost:5173") // adjust to your frontend port
public class InmateController {

    @Autowired
    private InmateRepository inmateRepository;

    @GetMapping
    public List<Inmate> getAllInmates() {
        return inmateRepository.findAll();
    }

    @PostMapping
    public Inmate addInmate(@RequestBody Inmate inmate) {
        return inmateRepository.save(inmate);
    }

    @DeleteMapping("/{id}")
    public void deleteInmate(@PathVariable String id) {
        inmateRepository.deleteById(id);
    }
}
