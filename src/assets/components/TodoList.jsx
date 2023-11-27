import { useContext, useState } from "react";
import { Button } from "@material-tailwind/react";
import Task from "./Task";
import { uid } from "uid";
import { Context } from "../../App";

const TodoList =() => {

  const [rotate, SetRotate] = useState(0);

  const [Sort, ChangeSort] = useContext(Context);

  const [Content, SetContent] = useState("");

  const [Tasks, SetTasks] = useState([]);

  const Delete = index => {
    SetTasks(prevTasks =>(prevTasks.filter((item) => item.id !== index)));
  };    

  const Rotate = () =>{
    SetRotate(prev=>prev - 180);
    if(Sort){
      SetTasks(prev=>prev.sort((a, b) => a.text.localeCompare(b.text)));
    }
    else{
      SetTasks(prev=>prev.sort((a, b) => b.text.localeCompare(a.text)));
    }

    ChangeSort(!Sort)
    
  }

  const onChangeInput = e =>{
    SetContent(e.target.value)
  }

  const Edit = (index, text) =>{
    Delete(index);
    SetContent(text);
  }

  const onSubmit = () =>{
    const Task = {
      text: Content,
      marked: false,
      isDisabled: true,
      id: uid()
    }
    if(Content){
      SetTasks(prev=>([...prev, Task]));
      SetContent("");
    }
  }

  const KeyDown = e =>{
    if(e.key === "Enter"){
      onSubmit();
    }
  }

  const Mapping = () =>{
    return Tasks.map((item) =>
    <Task
    key={item.id}
    id={item.id}
    text={item.text}
    marked={item.marked}
    isDisabled={item.isDisabled}
    onEdit={() => Edit(item.id, item.text)}
    onDelete={() => Delete(item.id)}/>
  )
  }

  return (
    <div className="body w-screen h-screen flex flex-col justify-center p-[15px]">
      <div className="title font-lobster text-[calc(2.75em)] mb-9 self-center">To-Do List</div>
      <div className="flex max-sm:flex-col-reverse max-sm:w-full w-[calc(100vw-70px)] max-sm:items-center sm:justify-center">
        
        <div className="flex sm:flex-col max-sm:max-w-[450px] max-sm:w-full">
          <Button onClick={Rotate} className="swap bg-yellow-400  max-sm:w-[50%] w-[60px] h-[60px] mr-[10px] mt-[15px] sm:mt-[25px] rounded-full flex items-center justify-center cursor-pointer">
            <img src="/images/Swap-Icon.svg" alt="" style={{ transform: `rotate(${rotate}deg)`, transition:"0.3s" }}/>
          </Button>
          <Button onClick={Rotate} className="swap bg-yellow-400 max-sm:w-[50%] w-[60px] h-[60px] sm:mr-[10px] mt-[15px] sm:mt-[25px] rounded-full flex items-center justify-center cursor-pointer">
            <img src="/images/Swap-Icon.svg" alt="" style={{ transform: `rotate(${rotate}deg)`, transition:"0.3s" }}/>
          </Button>
        </div>
        <div className="MyList max-w-[450px] w-full min-h-[500px] rounded-3xl bg-[#F5F5F5] relative p-3 xs:p-7">
        <div className="w-full h-[375px] overflow-y-auto">
        {
          Mapping()
        }
        </div>
        <div className="flex mt-7 w-full justify-end">
          <input type="text" onChange={onChangeInput} onKeyDown={KeyDown} value={Content} placeholder="Write the Task..." className="outline-none max-w-[275px] w-full bg-[#FAFAFA] h-[60px] max-xs:h-[45px] rounded-3xl bottom-3 mr-3 xs:mr-7 px-5 placeholder:italic placeholder:font-semibold italic font-bold max-xs:text-[15px]"/>
          
        <Button onClick={onSubmit} className="swap bg-yellow-400 min-w-[60px] max-xs:!w-[45px] h-[60px] max-xs:h-[45px]  rounded-full flex items-center justify-center cursor-pointer text-white text-[30px] xs:text-[30px]">
          +
          </Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default TodoList;