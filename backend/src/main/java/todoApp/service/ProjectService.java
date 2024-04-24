package todoApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import todoApp.dto.Project;
import todoApp.dto.ResponseStructure;
import todoApp.repository.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	

	public ResponseEntity<ResponseStructure<Project>> createProject(Project project) {
		ResponseStructure<Project> structure = new ResponseStructure<>();
	    project.setCreatedTime(LocalDateTime.now());
		project= projectRepository.save(project);
		structure.setData(project);
		structure.setMessage("Project Created Suceessfully " + project.getId());
		structure.setStatusCode(HttpStatus.CREATED.value());
		return new ResponseEntity<ResponseStructure<Project>>(structure,HttpStatus.CREATED);

	}
	


	public List<Project> getAllProjects() {
		return projectRepository.findAll();
	}

	public Optional<Project> getById(Long id) {
		return projectRepository.findById(id);
	}

	public Project editTitle(Long id,Project project) {
       Project projectDetails = projectRepository.findById(id).orElseThrow(()->new RuntimeException("id not found"));
       if(projectDetails !=null) {
		projectDetails.setTitle(project.getTitle());
       }
		return projectRepository.save(projectDetails);
	}

	public String deleteProject(Long id) {
		Optional<Project> optionalProject =projectRepository.findById(id);
		Project project = optionalProject.get();
		
		projectRepository.delete(project);
		return "Project deleted successfully";
	}
  
}
