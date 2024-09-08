import React, { useEffect, useState } from 'react';
import '../style/todo.css';
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const Todo = () => {
  const todoKey="ReactListTodo";
  const [inputVal, setInputVal] = useState({});
  const [task, setTask] = useState(()=>{
    const rawTodo=localStorage.getItem(todoKey);
    if(!rawTodo) return[];
    return JSON.parse(rawTodo);
  });
  const [dateTime,setDateTime]=useState("");

  const handleInputForm = (value) => {
    setInputVal({id:value,content:value,checked:false});
  };
//Form submit array insertion
  const handleSubmitForm = (event) => {
    const {id,content,checked}=inputVal;
    event.preventDefault();
    if (!content) return;
    // if (task.includes(inputVal)) {
    //   setInputVal(""); 
    //   return;
    // }
    const matchTodo=task.find((curTask)=>curTask.content===content);
    if(matchTodo) return;
    setTask((prevVal) => [...prevVal, {id,content,checked}]);
    setInputVal({ id: "", content: "", checked: false });
  };
  //Time&Date Set
  useEffect(()=>{
   const interval= setInterval(()=>{
        const now=new Date();
        const formatedDate=now.toLocaleDateString();
        const formatedTime=now.toLocaleTimeString();
        setDateTime(`${formatedDate}-${formatedTime}`)
    
    },1000)
    return()=>clearInterval(interval);
  },[])
  //Del specific Todo
 const handleDelTodo=(value)=>{
    let updatedTask=task.filter((curElem)=>curElem.content!==value.content);
    setTask(updatedTask);
 }
 //Clear All
 const handleClearTodo=()=>{
    setTask([]);
 }
 //Check Uncheck
const handleCheckTodo = (curElem) => {
  const updatedTask = task.map((curTask) => {
    if (curTask.content === curElem.content) { 
      return { ...curTask, checked: !curTask.checked };
    }
    return curTask;
  });
  setTask(updatedTask); 
};
//Local Storage
localStorage.setItem(todoKey,JSON.stringify(task));
  return (
    <section className='todo-container'>
      <header>
        <h1>ToDo List</h1>
        <h2>{dateTime}</h2>
      </header>
      <section>
        <form onSubmit={handleSubmitForm}>
          <div>
            <input 
              type="text"
              autoComplete='off'
              value={inputVal.content}
              onChange={(event) => handleInputForm(event.target.value)}
            />
          </div>
          <div>
            <button type="submit" className='submit'>
              Add
            </button>
          </div>
        </form>
      </section>
      {task.length > 0 && (
        <section className='list'>
          <ul className='xpace'>
            {task.map((curElem) => (
              <li key={curElem.id}
              className='lix'>
                <span className={` ${curElem.checked ? "chexk" : "notchexk"}`}>{curElem.content}</span>
                <button className="lisdecor btnx" 
                 onClick={()=>handleCheckTodo(curElem)}>
                  <FaCheck />
                </button>
                <button className='lisdecor remove'
                onClick={()=>handleDelTodo(curElem)}
                >
                  <MdDelete />
                </button>
                
              </li>
            ))}
          </ul>
        </section>

      )}
      <section>
                    <button className='clear'
                     onClick={handleClearTodo}>
                        Clear All
                    </button>
                </section>
    </section>
  );
};
