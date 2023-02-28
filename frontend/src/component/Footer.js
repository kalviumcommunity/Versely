import React from 'react'
import logo from '../asset/logo.png'
import linkedin from '../asset/linkedin.svg'
import github from '../asset/github.svg'
import whatsapp from '../asset/whatsapp.svg'

function Footer() {
  return (
    <div>
      <footer>
        <div className='footer'>
        <div className='footer-div'><img className='footer-logo' src={logo} alt="" />
        </div>
        <div className='footer-link-div'>
				<a href="#"><img className='footer-link' src={linkedin} alt="" /></a>
				<a href="#"><img className='footer-link' src={github} alt="" /></a>
				<a href="#"><img className='footer-link' src={whatsapp} alt="" /></a>
        </div>
        </div>
        <p className='copyright'>Versely &copy; 2023</p>
      </footer>
    </div>
  )
}

export default Footer
