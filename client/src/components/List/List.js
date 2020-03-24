import React, { useEffect } from 'react'
import { useTodoContext } from '../../utils/GlobalState'
import Item from '../../utils/Item'

const List = () => {

  const [state, dispatch] = useTodoContext()

  const handleToggleComplete = (id, isDone) => {
    Item.update(id, { isDone: !isDone })
      .then(() => {
        dispatch({ type: 'UPDATE_ITEM', id, isDone })
      })
  }

  const handleDeleteItem = id => {
    Item.delete(id)
      .then(() => {
        dispatch({ type: 'DELETE_ITEM', id })
      })
  }

  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        dispatch({ type: 'GET_ITEMS', items })
      })
  }, [])

  return (
    <ul>
      {
        state.items.map(({ _id, text, isDone }) => (
          <li key={_id}>
            {text}
            <button color={isDone ? 'success' : 'warning'} onClick={() => handleToggleComplete(_id, isDone)}>{isDone ? 'complete' : 'incomplete'}</button>
            <button color="danger" onClick={() => handleDeleteItem(_id)}>delete</button>
          </li>
        ))
      }
    </ul>
  )
}

export default List
