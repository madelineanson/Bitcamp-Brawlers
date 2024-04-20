import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import Map from './Map'
import Graph from './Graph'

function App() {
  const [disaster, setDisaster] = useState<"fire" | "flood" | "hurricane">("fire")

  return (
    <>
      <Graph></Graph>

    </>
  )
}

export default App
