package com.exercise.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "courses")
public class Course {

    @Id
    private String _id;
    private String title;
    private String description;
    private String instructor;
    private String duration;
    private String level;
    private String category;

    public Course() {
    }

    public Course(String _id, String title, String description, String instructor, 
                 String duration, String level, String category) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
        this.duration = duration;
        this.level = level;
        this.category = category;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Course{" +
                "_id='" + _id + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", instructor='" + instructor + '\'' +
                ", duration='" + duration + '\'' +
                ", level='" + level + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
