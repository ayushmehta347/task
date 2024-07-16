import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { server } from '../main';
import { Context } from "../main";
import toast from 'react-hot-toast';
import Display from '../components/display';
import { useNavigate } from 'react-router-dom';
//add edit func chnge 
import '../styles/app.css';


  const TodoPage = () => {
    // const [dueDate, setDueDate] = useState('');
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('')
    const[task,setTask]=useState([]);
    const[update,setUpdate]=useState(false);
    const {authenticated,setAuthenticated}=useContext(Context);
    const navigate = useNavigate();
    const[edit,setEdit]=useState(false);
    const [editId,setEditId]=useState('');



const updateHandler = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
         
            navigate('/login');
            return;
        }

        const { data } = await axios.post(
            `${server}/update/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            }
        );
        toast.success(data.message);
        setUpdate(prev => !prev);
    } catch (error) {
        console.error('Error updating task:', error);
        toast.error(error.response.data.message);
    }
};

const deleteHandler = async (id) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          
            navigate('/login');
            return;
        }

        const { data } = await axios.post(
            `${server}/${id}`,{},//fr dta passing
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            }
        );
        toast.success(data.message);
        setUpdate(prev => !prev);
    } catch (error) {
        console.error('Error deleting task:', error);
        toast.error(error.response.data.message);
    }
};

const editHandler = async (id) => {
   // console.log(id)
   setEditId(id);
//        console.log(editId);
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const response = await axios.get(`${server}/gettask`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const tasks = response.data.tasks; 
        const editItem = tasks.find(task => task._id === id);
       
        if (editItem) {
            setTitle(editItem.title);
            setDescription(editItem.description);
            setEdit(true);
        } else {
            console.error('Task not found with id:', id);
            toast.error('Task not found');
        }
    } catch (error) {
        console.error('Error editing task:', error);
        toast.error(error.response.data.message);
    }
};

//create Task
const submitHandler = async (e) => {
    e.preventDefault();
    setEdit(false)
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        
        const response = await axios.post(
            `${server}/newtask`,
            {
                title,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            }
        );
        toast.success(response.data.message);
        setDescription('');
        setTitle('');

        setUpdate(prev => !prev);
    } catch (error) {
        console.error('Error creating task:', error);
        toast.error("Error creating task");
    }
};


useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
        navigate('/login');
        return;
    }

    axios.get(`${server}/gettask`, {
        headers: {
            authorization: `Bearer ${token}` 
        }
    })
    .then(res => {
        setTask(res.data.tasks);
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            
            navigate('/login');
        } else {
        
            console.error('Error fetching tasks:', error);
            toast.error("Error fetching tasks");
        }
    });
}, [update]);
    
const handleAddEditedTask = async (e) => {
    e.preventDefault();
    setTitle('');
    setDescription('');
    setEdit(false);

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const response = await axios.put(
            `${server}/edit`,
            {
                editId,
                title, 
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            }
        );
        toast.success(response.data.message);
        setUpdate(prev => !prev); 
    } catch (error) {
        console.error('Error adding edited task:', error);
        toast.error(error.response.data.message);
    }
};

if(edit===false){
    
  return(
  

    <div className="container">
        <h1>TODO</h1>
      <section>
        <form onSubmit={submitHandler}>
            
          <input value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" className='input'
            placeholder="title" required />

            <input value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text" className='input'
            placeholder="Description" required />
          
         
           <button type="submit">Add Task</button> 
        </form>
      </section>
   
    <section className='todocontainer'>

        {
            task.map(i=>(
                <Display title={i.title} description={i.description}
                completed={i.completed}
                editHandler={editHandler}
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                id={i._id}
                key={i._id}/>
            ))
        }

    </section>

  </div>


  )
}else{
  return(
    <div className="container">
        <h1>TODO</h1>
      <section>
        <form onSubmit={handleAddEditedTask}>
            
          <input value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" className='input'
            placeholder="title" required />

            <input value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text" className='input'
            placeholder="Description" required />
         
            <button type="submit"  className='editedButton'>Add Edited Task</button> 
        </form>
      </section>
   
    <section className='todocontainer'>

       {
  task.map(i => (
    <Display 
      title={i.title} 
      description={i.description} 
      dueDate={i.dueDate} 
      completed={i.completed} 
      editHandler={editHandler} 
      updateHandler={updateHandler} 
      deleteHandler={deleteHandler} 
      id={i._id} 
      key={i._id}
    />
  ))
}

    </section>

  </div>


  )
}


};

export default TodoPage;
