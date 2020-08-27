import React from 'react'
import './app.less'

export default class App extends React.Component {




  componentDidMount(){

    fetch('/api/personalInfo').then(res => {

      console.log(res)

    })

  }


  render(){
    document.title = 'This is My Space'
    return <div className="app-container">

      <div className="text-contianer" contentEditable>
      </div>
      <div className="button">
        发送
      </div>

    </div>
  }

}