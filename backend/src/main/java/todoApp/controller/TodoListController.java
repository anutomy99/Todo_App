package todoApp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import todoApp.dto.TodoList;
import todoApp.service.TodoListService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("todoApp/todolists")
public class TodoListController {
	@Autowired
	private TodoListService todoListService;
	@PostMapping("/create-todolist/{projectId}")
	public TodoList createTodoList(@RequestBody TodoList todoList,@PathVariable Long projectId) {
		return todoListService.createTodoList(todoList,projectId);
	}
	@PutMapping("/edit-todolist/{todoListId}")
	public TodoList updateTodoList(@RequestBody TodoList todoList,@PathVariable Long todoListId) {
		return todoListService.updateTodoList(todoList,todoListId);
	}
    
	@GetMapping("/getAll-todos")
	public List<TodoList> getAllTodos() {
		return todoListService.getAllTodos();
	}
	@GetMapping("getTodoBy-projectId/{projectId}")
	public List<TodoList> getTodoByProjectId(@PathVariable Long projectId ) {
		return todoListService.getTodoByProjectId(projectId);
	}
	@DeleteMapping("/delete-todo/{todoListId}")
	public String deleteTodo(@PathVariable Long todoListId) {
		return todoListService.deleteTodo(todoListId);
	}
	
	@PutMapping("update-todo/{todoListId}")
	public TodoList updateTodo(@PathVariable Long todoListId,@RequestBody TodoList todoList) {
		return todoListService.updateTodo(todoListId,todoList);
	}
	@GetMapping("/get-todo/{todoListId}")
	public TodoList getTodoById(@PathVariable Long todoListId ) {
		return todoListService.getTodoById(todoListId);
	}
	
	@PutMapping("updateTodo-status/{todoListId}")
	public String updateTodoStatus(@PathVariable Long todoListId) {
		return todoListService.updateTodoStatus(todoListId);
	}
}

