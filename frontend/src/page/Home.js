import React from 'react'
import { Link } from 'react-router-dom'
import Home1 from '../asset/Home1.png'
import Home2 from '../asset/Home2.jpg'
import Home3 from '../asset/Home3.png'
import Songimage from '../asset/songimage1.png'

function Home() {
  return (
    <div>
      <div className='Box'>
        <h1>Elevating the music experience.</h1>
        <img src={Home1} alt="" />
      </div>
      <div className='Box1'>
        <div>
          <h2>Enhancing your<br/>music experience</h2>
          <p>Search and explore various songs <br/>lyrics their explanation with translation <br/>in different languages and more...</p>
        </div>
        <div>
          <img src={Home2} alt="" />
        </div>
      </div>
      <div className='Box2'>
        <div className='Content'>
          <h2>Making lyrics better,<br/>together.</h2>
          <p>Contribute to add about music facts and explanation of the lyrics and take yours and others musical experience to next level and earn points.</p>
        </div>
        <div>
          <img src={Home3} alt="" />
        </div>
      </div>
      <div className='Box3'>
        <h2>Explore Song Lyrics</h2>
      <div className='songdiv'>
        <div className='songcard'>
          <img src={Songimage} alt="" />
          <h3>Until I Found You</h3>
          <p>Stephen Sanchez</p>
        </div>
        <div className='songcard'>
          <img src={Songimage} alt="" />
          <h3>Until I Found You</h3>
          <p>Stephen Sanchez</p>
        </div>
        <div className='songcard'>
          <img src={Songimage} alt="" />
          <h3>Until I Found You</h3>
          <p>Stephen Sanchez</p>
        </div>
        <div className='songcard'>
          <img src={Songimage} alt="" />
          <h3>Until I Found You</h3>
          <p>Stephen Sanchez</p>
        </div>
      </div>
      <button className='explorebutton'><Link className='linkbutton' to="/Explore">Explore more..</Link></button>
      </div>
    </div>
  )
}

export default Home
