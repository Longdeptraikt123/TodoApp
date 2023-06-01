import React, { useState } from "react";
import List from "./todoList";
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import '@master/css';
import { searchAction } from "./redux/reducer";
const Todo = () => {
    const [searchText, SetSearchText] = useState('')
    const dispatch = useDispatch()
    const handleSearchText = (e) => {
        SetSearchText(e.target.value)
        dispatch(searchAction((e.target.value)))
    }
    return (
        <div className="flex flex:column jc:space-between abs p:3px|10px h:80% w:480px bg:#333 r:10px box-shadow:0px|1px|25px|#fff top:50% left:50% translate(-50%,-50%)">
            <div>
                <h1 className="text-align:center p:10">
                    TodoApp with Redux
                </h1>
                <div className="text-align:center rel p:10 m:5px|0">
                    <h4 className="text-align:left p:5|15|5|0">Search</h4>
                    <input
                        value={searchText}
                        onChange={handleSearchText}
                        className="p:5px w:100%"
                        type="text"
                        placeholder="Search..."
                    />
                    <FaSearch className="abs top:57% cursor:pointer right:4% color:#111" />
                </div>
            </div>
            <List />
        </div>
    )
}
export default Todo