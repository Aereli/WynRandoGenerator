import React from "react"
// import { useState, useEffect } from "react"

import Students from "../utils/students"

const StudentList = () => {
  const data = Students()
  if (!data) return <p>Loading...</p>

  return (
    <div>
      <h1>this will be the student list table</h1>
    </div>
  )
}

export default StudentList
