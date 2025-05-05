package com.exercise.demo.Repo;

import com.exercise.demo.Entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepo extends MongoRepository<Course, String> {
    Iterable<Course> findByInstructor(String instructor);
    Iterable<Course> findByCategory(String category);
    Iterable<Course> findByLevel(String level);
}
