import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import StudentList from "./studentList"

const Students = () => {
  const [data, setData] = useState(null)
  const [randomStudent, setRandomStudent] = useState("")
  const [studentArray, setStudentArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log("fetching data!")
    setIsError(false)
    setLoading(true)
    axios
      .get("https://wynpics.herokuapp.com/cohorts/36")
      .then(res => {
        console.log("this is fetching", res)
        setData(res.data)
        setLoading(false)
      })
      .catch(err => setIsError(err))
  }, [])

  // *****************************

  function handleClick() {
    const randomStudentNumber = Math.floor(Math.random() * data.length)

    if (data.length === 0) {
      setRandomStudent("No more students left!")
      return
    }
    setStudentArray(data)
    const studentChosen = data[randomStudentNumber]
    studentArray.splice(randomStudentNumber, 1)
    // console.log(randomStudentNumber, studentChosen)

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
      <div>
        {data ? data.map(stu => <p>{stu.firstName}</p>) : <p>loading.. </p>}
      </div>
      <StudentList />
    </div>
  )
}

export default Students
