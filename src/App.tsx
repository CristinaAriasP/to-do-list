import {ChangeEvent, useState} from 'react';
import './App.css';

interface Task {
  text: string;
  isCompleted: boolean;
}

function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]> ([
    { text: 'Tarea 1', isCompleted: false},
    { text: 'Tarea 2', isCompleted: true},
  ]);

  const handleAddTask = () => {
    setTasks([...tasks, { text: taskText, isCompleted: false }]);
    setTaskText('');
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const handleToggleComplete = (index: number) => {
    setTasks(
      tasks.map((task, i) => {
        if (i === index) {
          return { ...task, isCompleted: !task.isCompleted };
        } else {
          return task;
        }
      })
    );
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks]; 
    newTasks.splice(index, 1); 
    setTasks(newTasks); 
  };

  return (
    <>
      <h1> To do List</h1>
      <div className='add-task'>
        <input type="text" onInput={handleInput} value={taskText} />
        <button onClick={handleAddTask}> Añadir tarea </button>
      </div>
      <div className = 'task-list'>
        {tasks.map((task, index) => {
          return (
            <div className="task" key={index}>
            <div>
              <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleComplete(index)} />
              <span className={task.isCompleted ? 'completed' : ''}>
                {task.text}
              </span>
            </div>
            <button  onClick={() => handleDeleteTask(index)}> Eliminar </button>
          </div>
          );
        })}
      </div>
    </>
  )
}

export default App


  // type User = {
  //  name: string;
  // age: number;
  // }

  // const name: string = 'pepito';
  // const age: number = 2;
  // const isMurciano: boolean = true;
  // const tasks: string[] = '['task1', 'task2];
