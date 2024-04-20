import { useState } from 'react'
// import droughtDark from './assets/SVG/drought-dark.svg'
// import droughtLight from './assets/SVG/drought-light.svg'
// import earthquakeDark from './assets/SVG/earthquale-dark.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="parent">
          <div className="fire"></div>
          <div className="flood"></div>
          <div className="hurricane"></div>
        </div>
        


      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={earthquakeDark} className="logo earthquake" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={droughtDark} className="logo drought" alt="React logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={droughtLight} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1>hi</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
