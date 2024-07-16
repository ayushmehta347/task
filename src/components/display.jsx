import React from 'react'
import { TiEdit } from 'react-icons/ti'; 
const  Display=({title,description,dueDate,completed,updateHandler,deleteHandler,editHandler,id})=>
 {
  return (
    <div className='task'>
        <div>
      <div>{title}{dueDate}
       <p>{description}</p>
         {/* {dueDate && <p>Due Date: </p>} */}
         </div>
     </div>
     <div className='icon'>
         <TiEdit className="edit-icon" onClick={() => editHandler(id)} /> 
        <input onChange={()=>updateHandler(id)} type="checkbox" checked={completed}/>
        <button  onClick={()=>deleteHandler(id)}className='btn'>Delete</button>
     </div>
    </div>
  )
}

export default Display
