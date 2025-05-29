package com.Prisonman.Prisonman.Controller;

import com.Prisonman.Prisonman.Model.Cell;
import com.Prisonman.Prisonman.Repository.CellRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cells")
@CrossOrigin(origins = "http://localhost:5173")
public class CellController {

    @Autowired
    private CellRepository cellRepository;

    @GetMapping
    public List<Cell> getAllCells() {
        return cellRepository.findAll();
    }

    @PostMapping
    public Cell createCell(@RequestBody Cell cell) {
        return cellRepository.save(cell);
    }

    @PutMapping("/{id}")
    public Cell updateCell(@PathVariable String id, @RequestBody Cell updatedCell) {
        Cell cell = cellRepository.findById(id).orElseThrow(() -> new RuntimeException("Cell not found"));
        cell.setId(updatedCell.getId());
        cell.setCellNumber(updatedCell.getCellNumber());
        cell.setBlock(updatedCell.getBlock());
        cell.setCapacity(updatedCell.getCapacity());
        cell.setCurrentOccupancy(updatedCell.getCurrentOccupancy());
        cell.setStatus(updatedCell.getStatus());
        cell.setInmates(updatedCell.getInmates());
        return cellRepository.save(cell);
    }

    @DeleteMapping("/{id}")
    public void deleteCell(@PathVariable String id) {
        cellRepository.deleteById(id);
    }
}
