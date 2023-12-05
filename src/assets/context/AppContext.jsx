import {createContext, useState } from "react";
import { uid } from "uid";
import Cookies from "js-cookie";
import Task from "../components/Task";
import PropTypes from 'prop-types';

export const ImContext = createContext(null);

const AppContext = ({children}) => {

    const [rotate, SetRotate] = useState(0);

    const SortValue = Cookies.get("Sort");
    const init = SortValue ? JSON.parse(SortValue) : false
    const [Sort, ChangeSort] = useState(init);
  
    const [Content, SetContent] = useState("");
  
    const CTasks = Cookies.get("Tasks");
    const initialTasks = CTasks ? JSON.parse(CTasks) : [];
    
    const [Tasks, SetTasks] = useState(initialTasks);
  
    const [IsMarked, SetMarked] = useState(false);
  
    const Delete = index => {
      SetTasks(prevTasks =>{
        const newTask = prevTasks.filter((item) => item.id !== index);
        Cookies.set("Tasks", JSON.stringify(newTask));
        return newTask;
      });
    };    
  
    const Rotate = () =>{
      SetRotate(prev=>prev - 180);
        SetTasks(prev=>{
          const newTasks = prev.sort((a, b) => Sort ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text));
          Cookies.set("Tasks",JSON.stringify(newTasks));
          return newTasks;
        });
  
      ChangeSort(prev=>{Cookies.set("Sort", !prev)
      return !Sort}
      )
      
    }
  
    const onChangeInput = e =>{
      SetContent(e.target.value)
    }
  
    const Edit = (index, text) =>{
      Delete(index);
      SetContent(text);
    }
  
    const onSubmit = () =>{
      console.log("Hey");
      const Task = {
        text: Content,
        marked: false,
        id: uid()
      }
      if(Content){
        SetTasks(prev => {
          const newTasks = [...prev, Task];
          Cookies.set("Tasks", JSON.stringify(newTasks));
          return newTasks;
        });
        
        SetContent("");
      }
    }
  
    const KeyDown = e =>{
      if(e.key === "Enter"){
        onSubmit();
      }
    }
  
    const onMark = (index) => {
      SetTasks((prev) => {
        const updatedTasks = prev.map((task) =>
          task.id === index ? { ...task, marked: !task.marked } : task
        );
    
        Cookies.set("Tasks", JSON.stringify(updatedTasks));
    
        return updatedTasks;
      });
    };  
  
    const FilterCheck = () =>{
      SetMarked(prev => !prev);
    }
  
    const Mapping = () => {
  
      const fTasks = Tasks.filter((item)=> IsMarked ? item.marked === false : item.marked === true || item.marked === false);
  
      return fTasks.map((item) =>
      <Task
        key={item.id}
        id={item.id}
        text={item.text}
        marked={item.marked}
        onEdit={() => Edit(item.id, item.text)}
        onDelete={() => Delete(item.id)}
        onMark={()=> onMark(item.id)}
      />
    )
    }

    const AllFuncs = {
        rotate,
        Rotate,
        Content,
        onChangeInput,
        KeyDown,
        FilterCheck,
        Mapping,
        onSubmit,
        onMark,
        Delete,
        Edit
    }

    
  
    return (
      <ImContext.Provider value={AllFuncs}>
        {children}
      </ImContext.Provider>
    );
    
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;