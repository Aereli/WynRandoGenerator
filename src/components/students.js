import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Students = () => {
  const [data, setData] = useState(null)
  const [randomStudent, setRandomStudent] = useState("")
  const [studentArray, setStudentArray] = useState([])

  useEffect(() => {
    console.log("fetching data!")
    axios
      .get("https://wynpics.herokuapp.com/cohorts/36")
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  // *****************************

  function handleClick() {
    console.log("this is new", data)

    const randomStudentNumber = Math.floor(Math.random() * data.length)

    if (data.length === 0) {
      console.log("No more students")
      setRandomStudent("No more students left!")
      return
    }
    setStudentArray(data)
    const studentChosen = data[randomStudentNumber]
    studentArray.splice(randomStudentNumber, 1)
    console.log(randomStudentNumber, studentChosen)

    const studentFirstName = studentChosen.firstName
    const studentLastName = studentChosen.lastName
    setRandomStudent(studentFirstName + " " + studentLastName)
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

export default Students
