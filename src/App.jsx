import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const SavetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    setTodo("")
    console.log(todos)
    SavetoLS()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })  //Returns the elements of an array that meet the condition specified 
    setTodos(newtodos)
    SavetoLS()
  }
  const handleDelete = (e, id) => {
    if (confirm("Are u sure u want to delete?❎") == true) {
      let newtodos = todos.filter(item => {
        return item.id !== id

      })  //Returns the elements of an array that meet the condition specified 
      setTodos(newtodos)
    }
    SavetoLS()
  }
  const handleCheckbox = (e) => {
    console.log(e, e.target)
    let id = e.target.name
    console.log(`The is is${id}`)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index)
    let newtodos = [...todos]
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    setTodos(newtodos)
    SavetoLS()
  }
  const toggleshowfinished = () => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 bg-purple-300 p-3  rounded-xl md:w-1/2 min-h-[80vh]">
        <h1 className='text-center font-bold text-xl'>iTask-Manage your todos at one place</h1>
        <div className='addtodo'>
          <h2 className='text-lg font-bold underline my-2'>Add Todo</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-full rounded-xl p-1' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-purple-600 my-3 p-2 py-1.5 w-full rounded-xl text-white text-sm  disabled:bg-purple-500 font-semibold hover:bg-purple-700'>Save</button>
        </div>
        <input type="checkbox" onChange={toggleshowfinished} checked={showfinished} />Show Finished
        <h2 className='text-lg font-bold underline my-4'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div>No todos to display </div>}
          {todos.map(item => {
            return (showfinished || !item.iscompleted) && <div key={item.id} className="todo flex gap-3 justify-between items-center md:w-1/2">
              <div className='flex gap-5'>
                <input type="checkbox" onChange={handleCheckbox} checked={todo.iscompleted} name={item.id} />
                <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div></div>
              <div className="buttons flex gap-4 h-full items-center">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-purple-600  p-2 py-1.5 rounded-md text-white text-xl font-semibold hover:bg-purple-700 my-3'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-purple-600  p-2 py-1.5 rounded-md text-white text-xl font-semibold hover:bg-purple-700 my-3'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
