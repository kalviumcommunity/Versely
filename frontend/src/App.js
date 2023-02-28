import Home from './page/Home'
import Explore from './page/Explore'
import Contribute from './page/Contribute'
import Login from './page/Login'
import Signup from './page/Signup'
import {Route, Routes,} from 'react-router-dom'
import Navbar from './component/Navbar'
import Footer from './component/Footer'

function App() {
  if (window.location.pathname==="/Login"){
    return <div className="App">
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Explore' element={<Explore/>}/>
    <Route path='/Contribute' element={<Contribute/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    </Routes>
  </div>
  }  
  else{
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Explore' element={<Explore/>}/>
      <Route path='/Contribute' element={<Contribute/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      </Routes>
      <Footer/>
    </div>
  );}
}

export default App;
