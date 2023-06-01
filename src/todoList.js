import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { addToDoAction, deleteAction } from "./redux/reducer";
import { v4 as uuidv4 } from 'uuid'

const List = () => {

    const [todoName, setTodoName] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleClickAdd = () => {
        dispatch(addToDoAction({
            id: uuidv4(),
            name: todoName,
        }))
        setTodoName('')
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleInputChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleDelete = (id) => {
        dispatch(deleteAction(id))
    }

    const searchText = useSelector((state) => state.filters.search)

    const todoList = useSelector((state) => {
        const todoFiltering = state.todoList.filter((todo) => {
            return todo.name.toLowerCase().includes(searchText)
        })
        return todoFiltering
    })

    return (
        <div className="m:2px|0px|10px|0px">
            <ol className="m:0.5rem|0 p:5px|0|5px|1.3rem">
                {todoList.map(todo => (
                    <li key={todo.id}>
                        <span>{todo.name}</span>
                        <button onClick={() => handleDelete(todo.id)} className="cursor:pointer opacity:0.35:hover p:4px|8px outline:none m:10px|5px color:#fff b:none r:5px bg:red"><MdDelete /></button>
                    </li>
                ))}
            </ol>

            <div className="flex">
                <input
                    ref={inputRef}
                    onChange={handleInputChange}
                    value={todoName}
                    className="p:5px w:90%"
                    type="text"
                    placeholder="Add..."
                />
                <button onClick={handleClickAdd} className="b:none color:#fff font-weight:500 f:15px outline:none bg:blue r:5 ml:2px cursor:pointer p:8|10">Add</button>
            </div>
        </div>
    )
}

export default List
