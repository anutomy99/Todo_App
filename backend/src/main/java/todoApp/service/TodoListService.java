package todoApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import todoApp.dto.Project;
import todoApp.dto.TodoList;
import todoApp.dto.TodoStatus;
import todoApp.repository.ProjectRepository;
import todoApp.repository.TodoListRepository;

@Service
public class TodoListService {
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private TodoListRepository todoListRepository;

	public TodoList createTodoList(TodoList todoList,Long projectId) {
		 Project projectDetails = projectRepository.findById(projectId).orElseThrow(()->new RuntimeException("id not found"));
	     if(projectDetails !=null) {
	    	 todoList.setCreatedDate(LocalDateTime.now());
	    	 todoList.setStatus(TodoStatus.PENDING);
	    	 todoList.setProject(projectDetails);
	     }
		return  todoListRepository.save(todoList);
	}

	

	public TodoList updateTodoList(TodoList todoList, Long todolistId) {
		TodoList todoDetails = todoListRepository.findById(todolistId).orElseThrow(()->new RuntimeException("id not found"));
		if(todoDetails !=null) {
			if(todoList.getDescription()!=null) {
				todoDetails.setDescription(todoList.getDescription());
			}
			todoDetails.setUpdatedDate(LocalDateTime.now());
	    }
		return todoListRepository.save(todoDetails);


}


	public List<TodoList> getAllTodos() {
		return todoListRepository.findAll();
	}



	public String deleteTodo(Long todoListId) {
		Optional<TodoList> recTodo = todoListRepository.findById(todoListId);
			    TodoList todo = recTodo.get();
				todoListRepository.delete(todo);
			
		return "Deleted sucessfully..";
	}



	public List<TodoList> getTodoByProjectId(Long projectId) {
		return todoListRepository.findByProjectId(projectId);
	}



	public String updateTodoStatus(Long todoListId) {
		Optional<TodoList> getTodo = todoListRepository.findById(todoListId);
		TodoList todo = getTodo.get();
        if (todo == null) {
            return "Todo not found";
        }
        if (todo.getStatus() == TodoStatus.PENDING) {
            todo.setStatus(TodoStatus.COMPLETED);
            todo.setUpdatedDate(LocalDateTime.now());
            todoListRepository.save(todo);
            return "Todo completed successfully";
        } else {
            return "Todo is already completed";
        }
	}



	public TodoList updateTodo(Long todoListId, TodoList todoList) {
		Optional<TodoList> todoOptional = todoListRepository.findById(todoListId);
		if (todoOptional.isPresent()) {
			TodoList todo = todoOptional.get();
	            if(todo.getTitle()!= null) {
				todo.setTitle(todoList.getTitle());
	            }
	            if(todo.getDescription()!=null) {
				todo.setDescription(todoList.getDescription());
	            }
	            todo.setUpdatedDate(LocalDateTime.now());
			return todoListRepository.save(todo);

		}else {
			throw new RuntimeException("Todo not find with id "+todoListId);
		}
	}



	public TodoList getTodoById(Long todoListId) {
		TodoList optionalTodo = todoListRepository.findById(todoListId).orElseThrow(()->new RuntimeException("Todo not find"));
		return optionalTodo;
	}

}


