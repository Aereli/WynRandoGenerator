// import React from "react"
import { useState, useEffect } from "react"

const Students = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  useEffect(() => {
    async function fetchData() {
      console.log("fetching data!")
      setLoading(true)
      setError()
      const data = await fetch("https://wynpics.herokuapp.com/cohorts/36")
        .then(res => res.json())
        .catch(err => setError(err))
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [])
  return { data, loading, error }
}

export default Students
