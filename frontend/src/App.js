import Home from './page/Home'
import Explore from './page/Explore'
import Contribute from './page/Contribute'
import Login from './page/Login'
import {Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <Link to='/'>Home</Link>
      <Link to='/Explore'>Explore</Link> */}

      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Explore' element={<Explore/>}/>
      <Route path='/Contribute' element={<Contribute/>}/>
      <Route path='/Login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
