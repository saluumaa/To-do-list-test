/*eslint-disable */

import { tasks } from "../modules/display";
import { saveTodo, deleteTodo } from "../modules/CRUD";

describe("saveTodo function", () => {
  beforeEach(() => {
    tasks.length = 0;
    localStorage.clear();
  });

  test("adds a new task to the tasks array", () => {
    saveTodo(null, "task 1");
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe("task 1");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  test("should save the updated tasks array to localStorage", () => {
    tasks.push({ description: "task 1", completed: false, index: 1 });
    const index = tasks.findIndex((task) => task.description === "task 1");
    saveTodo(index, "updated task 1");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
});
describe('deleteTodo', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <ul>
        <li id="1">Task 1</li>
        <li id="2">Task 2</li>
        <li id="3">Task 3</li>
      </ul>
    `;
    const task = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
    localStorage.setItem('tasks', JSON.stringify(task));
    tasks.push(...task);
  });

  it('should remove exactly one <li> element from the list in the DOM', () => {
    deleteTodo(2); 
    const listItems = document.querySelectorAll('li');
    expect(listItems).toHaveLength(2); 
    expect(listItems[0].textContent).toBe('Task 1'); 
    expect(listItems[1].textContent).toBe('Task 3'); 
  });
});
