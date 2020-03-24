import React, { useState, useEffect, useRef, useReducer } from 'react'
import { TodoProvider } from './utils/GlobalState'
import Form from './components/Form'
import List from './components/List'
import Item from './utils/Item'

const App = () => {

  return (
    <TodoProvider>
      <Form />
      <List />
    </TodoProvider>
  )
}

export default App
