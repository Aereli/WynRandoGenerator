import React from "react"
import "../src/styles/App.css"
import Students from "./utils/students"
import { useState, useEffect } from "react"

function App() {
  const [randomStudent, setRandomStudent] = useState("")
  // const [stu, setStu] = useState(null)
  const [allStu, setAllStu] = useState()
  const [usedStudents, setUsedStudents] = useState([])

  useEffect(() => {
    console.log(usedStudents)
  }, [usedStudents])

  const data = Students()
  if (!data) return <p>Loading...</p>
  setAllStu(data.data)
  console.log(allStu)

  function handleClick() {
    let randomStudentNumber
    // setStu(data.data[randomStudentNumber])
    let ifPresent = true
    // const ifPresent = usedStudents.some(({ studentNumber }) => {
    //   console.log(studentNumber === randomStudentNumber)
    //   return studentNumber === randomStudentNumber
    // })
    while (ifPresent) {
      randomStudentNumber = Math.floor(Math.random() * data.data.length)
      ifPresent = usedStudents.some(({ studentNumber }) => {
        console.log(studentNumber === randomStudentNumber)
        return studentNumber === randomStudentNumber
      })
    }

    const studentFirstName = data.data[randomStudentNumber].firstName
    const studentLastName = data.data[randomStudentNumber].lastName
    setRandomStudent(studentFirstName + " " + studentLastName)

    setUsedStudents([
      ...usedStudents,
      { studentNumber: randomStudentNumber, ...data.data[randomStudentNumber] }
    ])
  }

  return (
    <div className="background">
      <div className="student-container">
        <h1>Random Student Generator!</h1>
        <button className="student-button" onClick={handleClick}>
          Generate Random Student
        </button>
        <div className="student">{randomStudent}</div>
      </div>
    </div>
  )
}

export default App
