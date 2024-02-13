import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {

  const[inputList, setInputList] = useState("");
  const[taskList, setTaskList] = useState([]);
  const[completed, setCompleted] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);

  const e =  (event) => {
    setInputList(event.target.value);
  }
  const add = () => {
    if(inputList.trim() !== ""){
      setTaskList((content) => {
        return [...content, { task: inputList, completed: false }];
      });
      setInputList("");
    }else {
      alert("Please Enter a task before adding!")
    }
  };
  
  const del = (seq) => {
    setTaskList((content) => {
      return content.filter((con, index) => {
        return index !== seq
      })
    })
  };

  const edit = (seq, updatedText) => {
    setTaskList((content) => {
      return content.map((task, index) => {
        if(index === seq){
          return { ...task, task: updatedText };
        }
        return task;
      })
    })
  };

  const toggleCompleted = (seq) => {
    setClickedIndex(seq); 
    setTaskList((content) =>
      content.map((task, index) => {
        if (index === seq) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };
  
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    setTaskList(todos);
  }, []);
  
  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem('todos', JSON.stringify(taskList));
    }
  }, [taskList]);

  return (
    <div className='main'>
      <div className='todo'>
        <img 
        src='Images/1.jpg'
        alt='Todo'/>
        <div className='heading'>TODO LIST</div>
        <input type='text' className='bar' placeholder='Add Items...' onChange={e} value={inputList} maxLength={"40"}/>
        <button className='btn-1' onClick={add}> + </button>

        <ol>
            {taskList.map((val,index) => {
              return <TodoList text = {val} seq = {index} onSelect = {del} onEdit = {edit} toggleCompleted = {toggleCompleted} completed = {completed} isClicked={clickedIndex === index}/>
            })}
        </ol>
      </div>
    </div>
  );
}

export default App;
