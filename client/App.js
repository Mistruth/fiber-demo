import React, { useState, useEffect } from 'react'
import Item from './Item'

export default function App() {
  const [state, updateState] = useState(1)

  useEffect(()=>{
    updateState(2)
  },[])

  return (
    <div>
      <button
        onClick={() => {
          updateState(2)
        }}
      >
        按钮
      </button>
      <div>{state}</div>
      <Item></Item>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </div>
  )
}
