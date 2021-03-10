/**
 * IMPORTS
 */
import '../styles/tasklist.scss';
import {useState} from 'react';
import {FiTrash, FiCheckSquare} from 'react-icons/fi';


/**
 * TYPES
 */
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}


/**
 * EXPORTS
 */

/**
 * I render the task list component.
 * 
 * returns: task list component
 */
export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  /**
   * I handle the creation of a new task
   * 
   * returns: nothing
   */
  function handleCreateNewTask()
  {
    // empty new task title: abort
    if (newTaskTitle === '')
    {
      return;
    }

    // create task
    const task: Task = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    };

    // add task to array
    setTasks([...tasks, task]);

    // clean task title
    setNewTaskTitle('');
  }

  /**
   * I handle the toggle task completion
   *
   * :param id: task id to be toggled
   * 
   * returns: nothing
   */
  function handleToggleTaskCompletion(id: number)
  {
    // get task index
    const index = tasks.findIndex(task => task.id === id);

    // task not found: abort
    if (index === -1)
    {
      return;
    }

    // get task value
    const taskValue = tasks[index];

    // toggle task completion
    taskValue.isComplete = !taskValue.isComplete;

    // create aux tasks array
    const newTasks = [...tasks];

    // update task value
    newTasks[index] = taskValue;

    // update tasks array
    setTasks([...newTasks]);
  }

  /**
   * I handle a task remove
   *
   * :param id: task id to be removed
   * 
   * returns: nothing
   */
  function handleRemoveTask(id: number)
  {
    // get task index
    const index = tasks.findIndex(task => task.id === id);

    // task not found: abort
    if (index === -1)
    {
      return;
    }
 
    // get tasksValue
    const tasksValue = [...tasks];

    // remove task from array
    tasksValue.splice(index, 1);

    // update tasks array
    setTasks([...tasksValue]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}