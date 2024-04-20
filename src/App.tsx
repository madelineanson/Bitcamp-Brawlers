import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="fannie-mae-logo">
      <img src="\src\assets\fannie-mae-logo-dark-blue.png"></img>
    </div>

    <div className="main-content">
      < p>
        <img src="\src\assets\US-Heatmap-PLACEHOLDER.png"></img>
      </p>
      <Footer></Footer>
      <p>
        Fannie Mae Logo® is a registered trademark of Fannie Mae.
      </p>
    </div>
    </>
  )
}

export default App
