import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import WyncodeHeader from "../styles/Wyncode Logo Slim White.png"

import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Checkbox from "@material-ui/core/Checkbox"
import Avatar from "@material-ui/core/Avatar"

const Students = () => {
  const [studentData, setStudentData] = useState(null)
  const [randomStudent, setRandomStudent] = useState("")
  const [studentArray, setStudentArray] = useState([])
  const [isError, setIsError] = useState(false)
  const [checked, setChecked] = React.useState([])
  const [disabled, setDisabled] = React.useState(false)

  useEffect(() => {
    setIsError(false)
    axios
      .get("https://wynpics.herokuapp.com/cohorts/36")
      .then(({ data }) => {
        setStudentArray(data)
        setStudentData(data)
      })
      .catch(err => setIsError(err), isError)
  }, [])

  // *****************************

  function handleClick() {
    if (studentArray.length === 0) {
      setRandomStudent("No more students!")
      setDisabled(true)
      return;
    }

    const randomStudentNumber = Math.floor(Math.random() * studentArray.length)
    const { imageUrl, firstName, lastName } = studentArray[randomStudentNumber]
    const name = firstName + " " + lastName
    const currentIndex = checked.indexOf(imageUrl)

    if (studentArray.length !== 0 && currentIndex < 0) {
      setStudentArray(studentArray.filter( student => student.imageUrl !== imageUrl))

      setRandomStudent(name)

    } else if (studentArray.length !== 0 && currentIndex >= 0) {
      setRandomStudent(`${name} is marked as absent!`)
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }))

  //this is Material UI styling
  const classes = useStyles()

  const handleToggle = (value) => () => {
    const valueId = value.imageUrl
    const currentIndex = checked.indexOf(valueId)

    console.log(checked)

    if (currentIndex === -1) {
      setChecked([...checked, valueId])
    } else {
      setChecked(checked.filter( id => id !== valueId ))
    }
  }

  return (
    <div className="background">
      <div className="blue-back">
        <div className="triangle"></div>
        <div className="student-container">
          <div>
            <img
              className="wyncode-logo"
              src={WyncodeHeader}
              alt="wyncode-logo"
            ></img>
          </div>
          <h1 className="wyncode-header">Random Student Generator!</h1>
          <button
            className="student-button"
            onClick={handleClick}
            disabled={disabled}
          >
            Generate Random Student
          </button>
          <div className="student">{randomStudent}</div>
        </div>
      </div>

      <div className="student-list">
        <h2 className="student-list-header">Absent Students</h2>
        <List dense className={classes.root}>
          {studentArray.length ? (
            studentArray.map((stu) => {
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
