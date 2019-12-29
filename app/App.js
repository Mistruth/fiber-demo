// import React, { Component } from 'react'
import { h, useState } from './fre'
import Item from './Item'

export default function App() {
  let [index, updateIndex] = useState(0)

  return (
    <div className='container'>
      <button
        onClick={() => {
          updateIndex(++index)
        }}
      >
        按钮
      </button>
      <div className='list'>
        <div className='item'>
          <Item content={index}></Item>
          <Item content={index}></Item>
          <Item content={index}></Item>
          <Item content={index}></Item>
          <Item content={index}></Item>
          <Item content={index}></Item>
        </div>
      </div>
    </div>
  )
}
