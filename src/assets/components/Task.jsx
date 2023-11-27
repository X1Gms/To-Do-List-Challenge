import Check from "../Check";
import Edit from "../Edit";
import Trash from "../Trash";
import PropTypes from 'prop-types'
import CheckFill from "../Check-Fill";
import { useState } from "react";

const Task = props => {

  const [Marked, SetMarked] = useState(props.marked);
  

  const onCheck = () =>{
    SetMarked(prev=>(!prev));
    props.onMark()
  }

  return (
    <div className="task min-h-[50px] bg-[#FAFAFA] flex items-center justify-between rounded-2xl text-[#343434] mb-4 last:mb-0">
    <div className="flex">
      <div>
        <div onClick={onCheck}>{Marked ? <CheckFill/> : <Check/>}</div>
      </div>
      <div className={`p bg-transparent outline-none break-all ${Marked && "line-through"}`}>{props.text}</div>
    </div>
    <div className="flex">
      <div onClick={props.onEdit}><Edit/></div>
      <div onClick={props.onDelete}><Trash/></div>
    </div>
    
  </div>
  )
}

Task.propTypes = {
  text: PropTypes.string.isRequired,
  marked: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onMark: PropTypes.func.isRequired
}

export default Task;