import React, { useState, useEffect } from 'react'
import Item from './utils/Item'

const App = () => {

  const [itemState, setItemState] = useState({
    items: []
  })

  const handleToggleComplete = (id, isDone) => {
    Item.update(id, { isDone: !isDone })
      .then(() => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items.forEach(item => {
          if (item._id === id) {
            item.isDone = !isDone
          }
        })
        setItemState({ items })
      })
  }

  const handleDeleteItem = id => {
    Item.delete(id)
      .then(() => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items = items.filter(item => item._id !== id)
        setItemState({ items })
      })
  }

  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        setItemState({ items })
      })
  }, [])

  return (
    <div>
      <h1>Hello World!</h1>
      <ul>
        {
          itemState.items.map(({ _id, text, isDone }) => (
            <li key={_id}>
              {text}
              <button onClick={() => handleToggleComplete(_id, isDone)}>{isDone ? 'complete' : 'incomplete'}</button>
              <button onClick={() => handleDeleteItem(_id)}>delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
