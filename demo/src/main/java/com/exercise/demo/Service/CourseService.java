package com.exercise.demo.Service;

import com.exercise.demo.Entity.Course;
import com.exercise.demo.Repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepo;

    public void saveOrUpdate(Course course) {
        courseRepo.save(course);
    }

    public Iterable<Course> listAll() {
        return courseRepo.findAll();
    }

    public void deleteCourse(String id) {
        courseRepo.deleteById(id);
    }

    public Course getCourseById(String courseId) {
        return courseRepo.findById(courseId).orElse(null);
    }

    public Iterable<Course> getCoursesByInstructor(String instructor) {
        return courseRepo.findByInstructor(instructor);
    }

    public Iterable<Course> getCoursesByCategory(String category) {
        return courseRepo.findByCategory(category);
    }

    public Iterable<Course> getCoursesByLevel(String level) {
        return courseRepo.findByLevel(level);
    }
}
