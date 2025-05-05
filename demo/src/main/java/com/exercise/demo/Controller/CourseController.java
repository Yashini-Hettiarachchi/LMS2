package com.exercise.demo.Controller;

import com.exercise.demo.Entity.Course;
import com.exercise.demo.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/save")
    public ResponseEntity<?> saveCourse(@RequestBody Course course) {
        courseService.saveOrUpdate(course);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Course saved successfully");
        response.put("courseId", course.get_id());
        
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getall")
    public Iterable<Course> getAllCourses() {
        return courseService.listAll();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateCourse(@RequestBody Course course, @PathVariable(name = "id") String _id) {
        course.set_id(_id);
        courseService.saveOrUpdate(course);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Course updated successfully");
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable("id") String _id) {
        courseService.deleteCourse(_id);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Course deleted successfully");
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search/{id}")
    public Course getCourseById(@PathVariable(name = "id") String courseId) {
        return courseService.getCourseById(courseId);
    }

    @GetMapping("/instructor/{instructor}")
    public Iterable<Course> getCoursesByInstructor(@PathVariable(name = "instructor") String instructor) {
        return courseService.getCoursesByInstructor(instructor);
    }

    @GetMapping("/category/{category}")
    public Iterable<Course> getCoursesByCategory(@PathVariable(name = "category") String category) {
        return courseService.getCoursesByCategory(category);
    }

    @GetMapping("/level/{level}")
    public Iterable<Course> getCoursesByLevel(@PathVariable(name = "level") String level) {
        return courseService.getCoursesByLevel(level);
    }
}
