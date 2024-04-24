package todoApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import todoApp.dto.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
