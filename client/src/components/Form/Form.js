import React, { useRef } from 'react'
import { useTodoContext } from '../../utils/GlobalState'
import Item from '../../utils/Item'

const Form = () => {

  const textRef = useRef()

  const [, dispatch] = useTodoContext()
  
  const handleAddItem = event => {
    event.preventDefault()

    Item.create({
      text: textRef.current.value,
      isDone: false
    })
      .then(({ data: item }) => {
        dispatch({ type: 'CREATE_ITEM', item })
        textRef.current.value = ''
      })
  }
  return (
    <form>
      <p>
        <label htmlFor="text">item</label>
        <input
          type="text"
          name="text"
          ref={textRef}
        />
      </p>
      <p>
        <button onClick={handleAddItem}>Add Item</button>
      </p>
    </form>
  )
}

export default Form