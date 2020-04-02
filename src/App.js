import React from "react"
import "../src/styles/App.css"
import Students from "./utils/students"
import { useState } from 'react'

function App() {
  const [randomStudent, setRandomStudent] = useState('')

  const data = Students()
  if (!data) return <p>Loading...</p>

  function handleClick() {
    const randomStudentNumber = Math.floor(Math.random()*data.data.length)
    const studentFirstName = data.data[randomStudentNumber].firstName
    const studentLastName = data.data[randomStudentNumber].lastName
    setRandomStudent(studentFirstName + " " + studentLastName)
  }

  console.log(data)
  return (
    <div>
      <h1>Hello</h1>
      <p>Students:</p>
      <button onClick={handleClick}>Generate Random Student</button>
      {randomStudent}
    </div>
  )
}

export default App
