package todoApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import todoApp.dto.TodoList;

public interface TodoListRepository extends JpaRepository<TodoList, Long>{


	List<TodoList> findByProjectId(Long projectId);

}
