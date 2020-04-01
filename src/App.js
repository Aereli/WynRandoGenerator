import React from "react"
import "../src/styles/App.css"
import Students from "./utils/students"

function App() {
  const data = Students()
  if (!data) return <p>Loading...</p>

  console.log(data)
  return (
    <div>
      <h1>Hello</h1>
      <p>Students:</p>
    </div>
  )
}

export default App
