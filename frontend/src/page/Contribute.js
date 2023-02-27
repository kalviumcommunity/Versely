import React from 'react'

function Contribute() {
  return (
    <div className='Form'>
      <h1>Add a Song Lyric</h1>
      <div className='Form-div'>
        <label>Song Name</label>
        <input type="text" placeholder=' Song Name' />
        <br />
        <label>Artist</label>
        <input type="text" placeholder=" Artist's Name" />
        <div className='contributeflex'>
          <div className='Songtextarea'>
            <label>Song lyrics</label>
            <textarea rows="12" cols="60" placeholder="Song lyrics" />
          </div>
          <div className='Abouttextarea'>
            <label>About Song and Explanation</label>
            <textarea rows="12" cols="60" placeholder="About the Song" />
          </div>
        </div>
      </div>
        <button className='contributebutton'>Upload Image</button>
        <button className='contributebutton'>Submit</button>
    </div>
  )
}

export default Contribute
