package todoApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todoApp.dto.Project;
import todoApp.dto.ResponseStructure;
import todoApp.service.ProjectService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("todoApp/projects")
public class ProjectController {
	@Autowired
	private ProjectService projectService;
	
	
	@PostMapping("/create-project")
	public ResponseEntity<ResponseStructure<Project>> createProject(@RequestBody Project project) {
		return projectService.createProject(project);
	}
    @GetMapping("/getAll-projects")
    public List<Project> getAllProjects() {
    	return projectService.getAllProjects();
    }
    @GetMapping("/getBy-id/{id}")
    public Optional<Project> getProjectById(@PathVariable Long id) {
    	return projectService.getById(id);
    }
    
    @DeleteMapping("delete-project/{id}")
    public String deleteProject(@PathVariable Long id) {
    	return projectService.deleteProject(id);
    }
    @PutMapping("/edit-title/{id}")
    public Project editTitle(@PathVariable Long id,@RequestBody Project project) {

    	return projectService.editTitle(id,project);
    }
}
