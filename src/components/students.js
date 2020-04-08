import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
// import StudentList from "./studentList"

import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Checkbox from "@material-ui/core/Checkbox"
import Avatar from "@material-ui/core/Avatar"

const Students = () => {
  const [data, setData] = useState(null)
  const [randomStudent, setRandomStudent] = useState("")
  const [studentArray, setStudentArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [checked, setChecked] = React.useState([1])

  const [studentIsChecked, setStudentIsChecked] = useState(null)

  useEffect(() => {
    // console.log("fetching data!")
    setIsError(false)
    setLoading(true)
    axios
      .get("https://wynpics.herokuapp.com/cohorts/36")
      .then(res => {
        // console.log("this is fetching", res)
        setData(res.data)
        setLoading(false)
      })
      .catch(err => setIsError(err))
  }, [])

  // *****************************

  function handleClick() {
    const randomStudentNumber = Math.floor(Math.random() * data.length)
    setStudentArray(data)
    const studentChosen = data[randomStudentNumber]
    const currentIndex = checked.indexOf(studentChosen.imageUrl)
    const studentFirstName = studentChosen.firstName
    const studentLastName = studentChosen.lastName
    setRandomStudent(studentFirstName + " " + studentLastName)

    if (currentIndex <= 0) {
      studentArray.splice(randomStudentNumber, 1)
    } else if (currentIndex >= 0) {
      console.log("student absent")
      setRandomStudent(`${randomStudent} is marked as absent!`)
      return
    } else if (data.length === 0) {
      setRandomStudent("No more students left!")
      return
    }

    console.log(currentIndex)
    // console.log(randomStudentNumber, studentChosen)

    // *****************************
  }

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  }))

  //this is Material UI styling
  const classes = useStyles()

  const handleToggle = value => () => {
    const valueId = value.imageUrl
    const currentIndex = checked.indexOf(valueId)
    const newChecked = [...checked]

    console.log("new checked: ", checked)

    if (currentIndex === -1) {
      newChecked.push(valueId)
      console.log("true: ", newChecked)
    } else {
      newChecked.splice(currentIndex, 1)
      console.log("false: ", newChecked)
    }
    setChecked(newChecked)
    // console.log("this thing: ", checked)
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
        {/* {data ? data.map(stu => <p>{stu.firstName}</p>) : <p>loading.. </p>} */}
      </div>
      <div className="student-list">
        <h2>Check off student if absent</h2>
        <List dense className={classes.root}>
          {data ? (
            data.map(stu => {
              const labelId = `checkbox-list-secondary-label-${stu.imageUrl}`
              return (
                <ListItem key={stu.imageUrl} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${stu.imageUrl}`}
                      src={stu.imageUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={stu.firstName}
                    secondary={stu.lastName}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      type="checkbox"
                      edge="end"
                      onChange={handleToggle(stu)}
                      checked={checked.indexOf(stu.imageUrl) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          ) : (
            <p>loading.. </p>
          )}
        </List>
      </div>
    </div>
  )
}

export default Students
