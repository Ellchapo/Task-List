
import './App.css';
import { useEffect, useState } from 'react';
import { AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';


function App() {

  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTasks,setAllTasks] = useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescriptionn]=useState("");
  const [completedTask,setCompletedTask]=useState([]);

  const addTask = ()=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyy + '-' + 'at' + h +':'+ m + ':' + s
     
  let newTaskItem ={
    title:newTitle,
    description:newDescription,
    completedOn:completedOn
  }

  let updatedTask = [...allTasks];
  updatedTask.push(newTaskItem);
  setAllTasks(updatedTask);
  localStorage.setItem('taskList', JSON.stringify(updatedTask));
  };

  const deleteTask=(index)=>{
  let reducedTask =[...allTasks];
  reducedTask.splice(index);

  localStorage.setItem('taskList', JSON.stringify(reducedTask));
  setAllTasks(reducedTask);
  };
  
  const deleteTaskC=(index)=>{
    let reducedTask =[...completedTask];
    reducedTask.splice(index);
  
    localStorage.setItem('taskList', JSON.stringify(reducedTask));
    setCompletedTask(reducedTask);
    };
  const completedTaskH =(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + '-' + mm + '-' + yyy + '-' + 'at' + h +':'+ m + ':' + s
     
    let filteredItem = {
      ...allTasks[index],
      completedOn:completedOn
    }
    let updateCompleteArr = [...completedTask];
    updateCompleteArr.push(filteredItem);
    setCompletedTask(updateCompleteArr);
    deleteTask(index);
  };
  useEffect(()=>{
     let savedTask = JSON.parse(localStorage.getItem('taskList'));
     if(savedTask){
      setAllTasks(savedTask);
     }
  },[])
  return (
    <div className="App">
     <h1>My Task</h1>

     <div className='task-wrapper'>
      <div className='task-input'>
        <div className='task-input-item'>
          <label>Title</label>
          <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter task title'/>
        </div>

        <div className='task-input-item'>
          <label>Description</label>
          <input type='text' value={newDescription} onChange={(e)=>setNewDescriptionn(e.target.value)} placeholder='Enter task description'/>
        </div>
        
        <div className='task-input-item'>
          <button type='button' onClick={addTask} className='primaryBtn'>Add</button>
        </div>

      </div>
     

     <div className='btn-area'>
      <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`}
      onClick={()=>{setIsCompleteScreen(false)}}>Todo</button>
      <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`}
      onClick={()=>{setIsCompleteScreen(true)}}>Completed</button>
     </div>
     

     <div className='task-list'>
      { isCompleteScreen===false &&
        allTasks.map((item,index)=>{
          return(
               
            <div className='task-list-item'>
      <div>
       <h3>{item.title}</h3>
       <p>{item.description}</p>
       <p><small>Created on: {item.completedOn}</small></p>
      </div>
       <div>
      <AiOutlineDelete className='icon' onClick={()=>deleteTask(index)}></ AiOutlineDelete>
      <BsCheckLg className='check-icon' onClick={()=>completedTaskH(index)}></BsCheckLg>
     </div>
     
     </div>

          )
        })
     
}
{ isCompleteScreen===true &&
        completedTask.map((item,index)=>{
          return(
               
            <div className='task-list-item'>
      <div>
       <h3>{item.title}</h3>
       <p>{item.description}</p>
       <p><small>Completed on: {item.completedOn}</small></p>
      </div>
       <div>
      <AiOutlineDelete className='icon' onClick={()=>deleteTaskC(index)}></ AiOutlineDelete>
      
     </div>
     
     </div>

          )
        })
     
}
     </div>
     </div>
    </div>
  );
}

export default App;
