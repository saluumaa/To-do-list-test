/*eslint-disable */
import { saveTodo, editTodo, checkTodo, btnClear } from '../modules/CRUD';
import { tasks } from '../modules/display';
describe('Todo List', () => {
  
  it('should update the description of an existing task when todoIndex is not null', () => {
    const initialTasks = [{ description: 'Task 1', completed: false, index: 1 }];
    const updatedTaskDescription = 'Updated task';
    saveTodo(0, updatedTaskDescription);
    expect(tasks.length).toBe(initialTasks.length);
    expect(tasks[0].description).toBe(updatedTaskDescription);
  });
});

describe('editTodo', () => {
  it('should make the task description contentEditable and show delete icon when edit icon is clicked', () => {
    const todoId = 1;
    editTodo(todoId);
    const container = document.getElementById(todoId);
    const taskDescription = container.querySelector('.list-text');
    const deleteIcon = container.querySelector('.delete');
    expect(taskDescription.contentEditable).toBe(true);
    expect(deleteIcon.classList.contains('show')).toBe(true);
  });
});

describe('checkTodo', () => {
  it('should toggle the completed status of a task when check icon is clicked', () => {
    const initialTasks = [      { description: 'Task 1', completed: false, index: 1 },      { description: 'Task 2', completed: false, index: 2 },    ];
    const todoId = 1;
    checkTodo(todoId);
    expect(tasks.length).toEqual(initialTasks.length);
    expect(tasks[todoId - 1].completed).toBe(true);
  });
});

describe('btnClear', () => {
  it('should remove all completed tasks from the tasks array and DOM when clear button is clicked', () => {
    const initialTasks = [      { description: 'Task 1', completed: true, index: 1 },      { description: 'Task 2', completed: false, index: 2 },      { description: 'Task 3', completed: true, index: 3 },    ];
    const incompleteTasks = initialTasks.filter((todo) => !todo.completed);
    if(btnClear){
        btnClear.click();
        expect(tasks.length).toBe(incompleteTasks.length);
        expect(document.querySelectorAll('.todo').length).toBe(incompleteTasks.length);
        expect(tasks.every((todo) => !todo.completed)).toBe(true);
    }
    
  });
});
