import React from "react"
import "../src/styles/App.css"
import Students from "./utils/students"
import StudentList from "./components/studentList"
import { useState, useEffect } from "react"

function App() {
  const [randomStudent, setRandomStudent] = useState("")
  // const [usedStudents, setUsedStudents] = useState([])
  const [studentArray, setStudentArray] = useState()

  useEffect(() => {
    setStudentArray(data.data)
    console.log(studentArray)
  })

  const data = Students()
  if (!data) return <p>Loading...</p>

  function handleClick() {
    const randomStudentNumber = Math.floor(Math.random() * data.data.length)

    // const forNow = data.data
    // // console.log(`this is just for now:${forNow}`)
    // *****************************

    // while (ifPresent && data.data.lenght > 0) {
    //   randomStudentNumber = Math.floor(Math.random() * data.data.length)
    //   ifPresent = usedStudents.some(({ studentNumber }) => {
    //     console.log(studentNumber === randomStudentNumber)
    //     return studentNumber === randomStudentNumber
    //   })
    // }

    // *****************************

    if (data.data.length === 0) {
      console.log("No more students")
      setRandomStudent("No more students left!")
      return
    }

    const studentChosen = data.data[randomStudentNumber]
    studentArray.splice(randomStudentNumber, 1)
    console.log(randomStudentNumber, studentChosen)

    const studentFirstName = studentChosen.firstName
    const studentLastName = studentChosen.lastName
    setRandomStudent(studentFirstName + " " + studentLastName)

    // *****************************
  }

  return (
    <div className="background">
      <div className="student-container">
        <h1>Random Student Generator!</h1>
        <button className="student-button" onClick={handleClick}>
          Generate Random Student
        </button>
        <div className="student">{randomStudent}</div>
        <StudentList />
      </div>
    </div>
  )
}

export default App
