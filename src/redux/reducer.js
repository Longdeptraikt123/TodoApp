const storedTodoList = localStorage.getItem('todoList');
const initState = {
    filters: {
        search: '',
    },
    todoList: storedTodoList ? JSON.parse(storedTodoList) : [
        { id: 1, name: 'learn football' },
    ]
};


// action creators
export const addToDoAction = (data) => {
    return {
        type: 'AddTodo',
        payload: data
    }

}
export const searchAction = (text) => {
    return {
        type: 'searchAction',
        payload: text
    }
}

export const deleteAction = (id) => {
    return {
        type: 'deleteAction',
        payload: id
    }
}

const rootReducer = (state = initState, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'AddTodo':
            const updatedTodoList = [...state.todoList, action.payload];
            localStorage.setItem('todoList', JSON.stringify(updatedTodoList));

            return {
                ...state,
                todoList: updatedTodoList
            };

        case 'searchAction':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    search: action.payload
                }
            };

        case 'deleteAction':
            const filteredTodoList = state.todoList.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todoList', JSON.stringify(filteredTodoList));

            return {
                ...state,
                todoList: filteredTodoList
            };

        default:
            return state;
    }
};

export default rootReducer