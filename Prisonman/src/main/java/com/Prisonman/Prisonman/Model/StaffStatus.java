package com.Prisonman.Prisonman.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "staff_status")
public class StaffStatus {
    @Id
    private String id;
    private String name;
    private int value;

    public StaffStatus() {}  // Empty constructor needed by Spring Data

    public StaffStatus(String name, int value) {
        this.name = name;
        this.value = value;
    }

    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
}
