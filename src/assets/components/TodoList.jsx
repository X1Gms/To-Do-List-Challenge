import { Button } from "@material-tailwind/react";
import AppHook from "../context/AppHook";
import { useEffect } from "react";

const TodoList = () => {

  const {rotate} = AppHook();

  const {Content} = AppHook();

  const {Rotate} = AppHook();

  const {onChangeInput} = AppHook();

  const {onSubmit} = AppHook();

  const {KeyDown} = AppHook();

  const {FilterCheck} = AppHook();

  const {Mapping} = AppHook();

  useEffect(()=>{
     const Mappin = async () =>{
      await Mapping
    }
    Mappin()
  })

  return (
    <div className="body w-screen h-screen flex flex-col justify-center p-[15px]">
      <div className="title font-lobster text-[calc(2.75em)] mb-9 self-center">To-Do List</div>
      <div className="flex max-sm:flex-col-reverse max-sm:w-full w-[calc(100vw-70px)] max-sm:items-center sm:justify-center">
        
        <div className="flex sm:flex-col max-sm:max-w-[450px] max-sm:w-full">
          <Button onClick={Rotate} className="swap bg-yellow-400  max-sm:w-[50%] w-[60px] h-[60px] mr-[10px] mt-[15px] sm:mt-[25px] rounded-full flex items-center justify-center cursor-pointer">
            <img src="/images/Swap-Icon.svg" alt="" style={{ transform: `rotate(${rotate}deg)`, transition:"0.3s" }}/>
          </Button>
          <Button onClick={FilterCheck} className="swap bg-yellow-400 max-sm:w-[50%] w-[60px] h-[60px] sm:mr-[10px] mt-[15px] sm:mt-[25px] rounded-full flex items-center justify-center cursor-pointer">
            <img src="/images/Hide.svg"/>
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