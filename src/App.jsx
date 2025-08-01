import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinsihed, setshowFinsihed] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
 let todos=JSON.parse(localStorage.getItem("todos"))
    
  settodos(todos)
    }
  }, [])
  
  const saveToLs=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const toggleFinsihed=(e)=>{
    setshowFinsihed(!showFinsihed)

  }
  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id==id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newTodos)
    saveToLs()
  }

  
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!=id;
    });
    settodos(newTodos)
    saveToLs()
  }
  const handleAdd=()=>{
    settodos([...todos, {id: uuidv4(),todo, isCompleted:false}])
    settodo("")
    saveToLs()
  }
   const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleCheckbox=(e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id==id;
    })
     let newTodos=[...todos];
     newTodos[index].isCompleted= !newTodos[index].isCompleted;
     settodos(newTodos)
     saveToLs()
  }
  
  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-4 rounded-2xl p-5 bg-blue-300 min-h-[80vh] md:w-[35%]">
        <div className="addTodo my-5 flex flex-col gap-3">
          <h1 className='font-bold text-center text-xl '>Manage Your Todos</h1>
          <h2 className='text-lg'>Add Todos</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='bg-pink-300 w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-400 hover:bg-blue-600 p-2 py-1 mx-2 rounded-full
           disabled:bg-gray-700 text-sm font-bold text-white  '>Save</button>
           </div>
        </div>
        <input className='my-4' id="show" onChange={toggleFinsihed} type="checkbox" checked={showFinsihed}/> 
        <label className='mx-2'htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-50 w-[90%] mx-auto my-2'>
        </div>
          <div className="todos">
            <h2 className='text-xl font-bold'>Your Todos </h2>
            {todos.length===0 && <div className='m-5'>No Todos Found</div>}
            {todos.map((item) => {

            return (showFinsihed||!item.isCompleted) && <div key={item.id} className="todo flex  m-3 justify-between">
              <div className='flex gap-5 items-center'>
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=""/>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
               </div> 
              <div className="buttons flex h-full items-center mr-3 h-5 mt-1">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-blue-400 hover:bg-blue-600 p-2 py-1 text-sm font-bold text-white rounded-lg mx-1'><FaEdit/></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-blue-400 hover:bg-blue-600 p-2 py-1 text-sm font-bold text-white rounded-lg mx-1'><AiFillDelete/></button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
