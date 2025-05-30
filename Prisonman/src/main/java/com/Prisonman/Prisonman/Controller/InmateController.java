package com.Prisonman.Prisonman.Controller;

import com.Prisonman.Prisonman.Model.Cell;
import com.Prisonman.Prisonman.Model.Inmate;
import com.Prisonman.Prisonman.Repository.CellBlockRepository;
import com.Prisonman.Prisonman.Repository.CellRepository;
import com.Prisonman.Prisonman.Repository.InmateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inmates")
@CrossOrigin(origins = "http://localhost:5173")
public class InmateController {

    @Autowired
    private InmateRepository inmateRepository;

    @Autowired
    private CellRepository cellRepository;

    @Autowired
    private CellBlockRepository cellBlockRepository;

    @GetMapping
    public List<Inmate> getAllInmates() {
        return inmateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inmate> getInmateById(@PathVariable String id) {
        Optional<Inmate> inmate = inmateRepository.findByInmateId(id);
        return inmate.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addInmate(@RequestBody Inmate inmate) {
        Optional<Cell> cellOpt = cellRepository.findAll().stream()
                .filter(cell -> cell.getCellNumber().equals(inmate.getCellNumber()) &&
                        cell.getBlock().equals(inmate.getBlock()))
                .findFirst();

        if (cellOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Specified cell not found.");
        }

        Cell cell = cellOpt.get();

        if (cell.getCurrentOccupancy() >= cell.getCapacity()) {
            return ResponseEntity.status(409).body("Cell is already full.");
        }

        Inmate savedInmate = inmateRepository.save(inmate);

        List<String> inmatesList = cell.getInmates();
        inmatesList.add(savedInmate.getInmateId());
        cell.setInmates(inmatesList);
        cell.setCurrentOccupancy(cell.getCurrentOccupancy() + 1);
        cell.setStatus(cell.getCurrentOccupancy() >= cell.getCapacity() ? "Occupied" : "Available");
        cellRepository.save(cell);

        updateCellBlockStats(cell.getBlock());

        return ResponseEntity.ok(savedInmate);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Inmate> updateInmate(@PathVariable String id, @RequestBody Inmate updatedInmate) {
        return inmateRepository.findById(id).map(inmate -> {
            inmate.setName(updatedInmate.getName());
            inmate.setInmateId(updatedInmate.getInmateId());
            inmate.setAge(updatedInmate.getAge());
            inmate.setAdmissionDate(updatedInmate.getAdmissionDate());
            inmate.setStatus(updatedInmate.getStatus());
            inmate.setCharges(updatedInmate.getCharges());
            inmate.setBlock(updatedInmate.getBlock());
            Inmate saved = inmateRepository.save(inmate);
            return ResponseEntity.ok(saved);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInmate(@PathVariable String id) {
        Optional<Inmate> inmateOpt = inmateRepository.findByInmateId(id);
        if (inmateOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Inmate inmate = inmateOpt.get();

        Optional<Cell> cellOpt = cellRepository.findAll().stream()
                .filter(cell -> cell.getCellNumber().equals(inmate.getCellNumber()) &&
                        cell.getBlock().equals(inmate.getBlock()))
                .findFirst();

        if (cellOpt.isPresent()) {
            Cell cell = getCell(cellOpt, inmate);

            cellRepository.save(cell);
            updateCellBlockStats(cell.getBlock());
        }

        inmateRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private static Cell getCell(Optional<Cell> cellOpt, Inmate inmate) {
        Cell cell = cellOpt.get();

        List<String> inmatesList = cell.getInmates();
        inmatesList.remove(inmate.getInmateId());
        cell.setInmates(inmatesList);

        cell.setCurrentOccupancy(cell.getCurrentOccupancy() - 1);

        if (cell.getCurrentOccupancy() < cell.getCapacity()) {
            cell.setStatus("Available");
        }
        return cell;
    }

    private void updateCellBlockStats(String blockName) {
        List<Cell> cellsInBlock = cellRepository.findAll().stream()
                .filter(cell -> cell.getBlock().equals(blockName))
                .toList();

        int totalCapacity = cellsInBlock.stream().mapToInt(Cell::getCapacity).sum();
        int totalCurrent = cellsInBlock.stream().mapToInt(Cell::getCurrentOccupancy).sum();
        int utilization = (int) ((totalCurrent / (double) totalCapacity) * 100);

        cellBlockRepository.findAll().stream()
                .filter(block -> block.getName().equals(blockName))
                .findFirst()
                .ifPresent(block -> {
                    block.setCapacity(totalCapacity);
                    block.setCurrent(totalCurrent);
                    block.setUtilization(utilization);
                    cellBlockRepository.save(block);
                });
    }

}
