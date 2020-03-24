import React, { useState, useEffect } from 'react'
import Item from './utils/Item'

const App = () => {

  const [itemState, setItemState] = useState({
    items: [],
    text: ''
  })

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  const handleCreateItem = event => {
    console.log(event)
    event.preventDefault()
    Item.create({
      text: itemState.text,
      isDone: false
    })
      .then(({ data: item }) => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items.push(item)
        setItemState({ ...itemState, items, text: '' })
      })
  }

  const handleToggleComplete = (id, isDone) => {
    Item.update(id, { isDone: !isDone })
      .then(() => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items.forEach(item => {
          if (item._id === id) {
            item.isDone = !isDone
          }
        })
        setItemState({ ...itemState, items })
      })
  }

  const handleDeleteItem = id => {
    Item.delete(id)
      .then(() => {
        let items = JSON.parse(JSON.stringify(itemState.items))
        items = items.filter(item => item._id !== id)
        setItemState({ ...itemState, items })
      })
  }

  useEffect(() => {
    Item.read()
      .then(({ data: items }) => {
        setItemState({ ...itemState, items })
      })
  }, [])

  return (
    <div>

      <form>
        <p>
          <label htmlFor="text">item</label>
          <input
            type="text"
            name="text"
            value={itemState.text}
            onChange={handleInputChange} />
        </p>
        <p>
          <button color="primary" onClick={handleCreateItem}>Add Item</button>
        </p>
      </form>
      <ul>
        {
          itemState.items.map(({ _id, text, isDone }) => (
            <li key={_id}>
              {text}
              <button color={isDone ? 'success' : 'warning'} onClick={() => handleToggleComplete(_id, isDone)}>{isDone ? 'complete' : 'incomplete'}</button>
              <button color="danger" onClick={() => handleDeleteItem(_id)}>delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
