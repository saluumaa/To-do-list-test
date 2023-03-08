import { tasks } from "../modules/display";
import { saveTodo, deleteTodo } from "../modules/CRUD";

describe('saveTodo function', () => {
    beforeEach(() => {
      // reset tasks array and localStorage before each test
      tasks.length = 0;
      localStorage.clear();
    });
  
    test('adds a new task to the tasks array', () => {
      saveTodo(null, 'task 1');
      expect(tasks).toHaveLength(1);
      expect(tasks[0].description).toBe('task 1');
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    test('should save the updated tasks array to localStorage', () => {
      tasks.push({ description: 'task 1', completed: false, index: 1 });
      const index = tasks.findIndex(task => task.description === 'task 1');
      saveTodo(index, 'updated task 1')
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  
  });

describe('deleteTodo', () => {
  beforeEach(() => {
    // set up the tasks array and a task to delete
    localStorage.clear();
    const task = [{
      description: 'Delete me',
      completed: false,
      index: 1,
    }];
    localStorage.setItem('tasks', JSON.stringify([task]));
  });

  it('should delete a task', () => {
    deleteTodo(1);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks).toHaveLength(0);
  });

  it('should not delete a task if the ID is invalid', () => {
    deleteTodo(2);
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks).toHaveLength(1);
  });
});



