import React, { createContext, useReducer, useContext } from 'react'

const TodoContext = createContext({
 items: [] 
})

const TodoProvider = ({ value, ...props }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'CREATE_ITEM':
        let items = JSON.parse(JSON.stringify(state.items))
        items.push(action.item)
        return { ...state, items }
      case 'UPDATE_ITEM':
        let updatedItems = JSON.parse(JSON.stringify(state.items))
        updatedItems.forEach(item => {
          if (item._id === action.id) {
            item.isDone = !action.isDone
          }
        })
        return { ...state, items: updatedItems }
      case 'DELETE_ITEM':
        let deletedItems = JSON.parse(JSON.stringify(state.items))
        deletedItems = deletedItems.filter(item => item._id !== action.id)
        return { ...state, items: deletedItems }
      case 'GET_ITEMS':
        return { ...state, items: action.items }
      default:
        return state  
    }
  }, { items: [] })

  return <TodoContext.Provider value={[state, dispatch]} {...props} />
}

const useTodoContext = () => useContext(TodoContext)

export { TodoProvider, useTodoContext }