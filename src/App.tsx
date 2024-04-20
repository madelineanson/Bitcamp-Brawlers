import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import Map from './Map'


function App() {
  const [disaster, setDisaster] = useState<"fire" | "flood" | "hurricane">("fire")
  return (
    <>
        

    <div className="fannie-mae-logo">
      <img src="\src\assets\fannie-mae-logo-dark-blue.png"></img>
    </div>

    <div className="button-container">
  <div className="pushable pushable-fire">
    <div onClick={() => setDisaster("fire")} className="front front-fire">Fire</div>
  </div>
  <div className="pushable pushable-flood">
    <div onClick={() => setDisaster("flood")} className="front front-flood">Flood</div>
  </div>
  <div className="pushable pushable-hurricane">
    <div onClick={() => setDisaster("hurricane")} className="front front-hurricane">Hurricane</div>
  </div>
</div>
    

    <div className="main-content">
      <div className="maps">
        <Map disaster={disaster}></Map>
      </div>
      <Footer></Footer>
      <p>
        Fannie Mae Logo® is a registered trademark of Fannie Mae.
      </p>
    </div>
    </>
  )
}

export default App
