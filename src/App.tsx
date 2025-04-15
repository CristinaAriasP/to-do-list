import {ChangeEvent, useState} from 'react';
import './App.css';

interface Task {
  text: string;
  isCompleted: boolean;
  id: number;
}

function App() {
  const [taskText, setTaskText] = useState('');
  const [isOnlyPending, setIsOnlyPending] = useState(false);
  const [tasks, setTasks] = useState<Task[]> ([
    { text: 'Tarea 1', isCompleted: false, id: Math.random() },
    { text: 'Tarea 2', isCompleted: true, id: Math.random() },
  ]);

  const handleAddTask = () => {
    setTasks([...tasks, { text: taskText, isCompleted: false , id: Math.random()}]);
    setTaskText('');
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskText(event.target.value);
  };

  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { 
            ...task, 
            isCompleted: !task.isCompleted 
          };
        } 
          return task;
      });
    setTasks(updatedTasks);
    console.log(tasks);
  };

  const deleteTask = (taskId: number) => {
    setTasks(currentTasks => {
      return currentTasks.filter( task => {
        return task.id != taskId;
      })
    }); 
  }

  const handleIsOnlyPendingClick = () => {
    setIsOnlyPending(!isOnlyPending)
  }

  const filteredTasks = isOnlyPending 
  ? tasks.filter((task) => {
    return !task.isCompleted; 
  })
  : tasks;

  // const handleShowUncompletedTasks = (tasks: Task[]) =>{
  //   console.log(tasks);
  //   const uncompletedTasks = tasks.map((task) => {
  //     if (task.isCompleted === true) {
  //       return task
  //     };
  //     setTasks(uncompletedTasks);
  //   })
  // }



  return (
    <>
      <h1> To do List</h1>
      <div className='add-task'>
        <input type="text" onInput={handleInput} value={taskText} />
        <button onClick={handleAddTask} disabled={!taskText.trim().length}> Añadir tarea </button> 
        <div  className='filters'>
         <button className={isOnlyPending ? `filters filters__btn--selected` : ``} onClick={() => handleIsOnlyPendingClick()}> 
          Show only pending </button>
        </div>
      </div>
      <div className = 'task-list'>
        {filteredTasks.map((task) => {
          return (
            <div className="task">
            <div>
              <input type="checkbox" checked={task.isCompleted} 
              onChange={() => toggleComplete(task.id)} />
              <span className={task.isCompleted ? 'completed' : ''}>
                {task.text}
              </span>
            </div>
            <button  onClick={() => deleteTask(task.id)}> Eliminar </button>
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
