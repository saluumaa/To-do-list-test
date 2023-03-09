import { editTodo, checkTodo, btnClear } from '../modules/CRUD.js';
import { tasks } from '../modules/display.js';

describe('editTodo', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="todo" id="1">
        <span class="list-text">Task 1</span>
        <button class="Edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;
  });

  it('should make the task description contentEditable and show delete icon when edit icon is clicked', () => {
    const todoId = 1;
    editTodo(todoId);
    const container = document.getElementById(todoId);
    const taskDescription = container.querySelector('.list-text');
    const deleteIcon = container.querySelector('.delete');
    expect(taskDescription.contentEditable).toBe(true);
    expect(deleteIcon.classList.contains('show')).toBe(true);
  });

  it('should save changes when enter key is pressed', () => {
    const todoId = 1;
    editTodo(todoId);
    const container = document.getElementById(todoId);
    const taskDescription = container.querySelector('.list-text');
    const editIcon = container.querySelector('.Edit');
    taskDescription.textContent = 'Updated task';
    taskDescription.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(editIcon.classList.contains('hide')).toBe(false);
    expect(taskDescription.contentEditable).toBe(false);
    expect(taskDescription.textContent).toBe('Updated task');
  });
});

describe('checkTodo', () => {
  let initialTasks;

  beforeEach(() => {
    initialTasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ];
    tasks.push(...initialTasks);
  });

  afterEach(() => {
    tasks.length = 0;
  });

  it('should toggle the completed status of a task when check icon is clicked', () => {
    const todoId = 1;
    checkTodo(todoId);
    expect(tasks.length).toEqual(initialTasks.length);
    expect(tasks[todoId - 1].completed).toBe(true);

    checkTodo(todoId);
    expect(tasks[todoId - 1].completed).toBe(false);
  });
});

describe('btnClear', () => {
  it('should remove all completed tasks from the tasks array and DOM when clear button is clicked', () => {
    const initialTasks = [{ description: 'Task 1', completed: true, index: 1 }, { description: 'Task 2', completed: false, index: 2 }, { description: 'Task 3', completed: true, index: 3 }];
    const incompleteTasks = initialTasks.filter((todo) => !todo.completed);
    if (btnClear) {
      btnClear.click();
      expect(tasks.length).toBe(incompleteTasks.length);
      expect(document.querySelectorAll('.todo').length).toBe(incompleteTasks.length);
      expect(tasks.every((todo) => !todo.completed)).toBe(true);
    }
  });
});
