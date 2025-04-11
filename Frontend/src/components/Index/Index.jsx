import React from 'react'
import Nav from '../Index/Nav'
import Menu from './Menu'
import Post from './Post'
import Extra from './Extra'
import Bookmarks from '../ExtraIndex/Bookmarks'


const Index = () => {
  return (
    <div className='bg-slate-50'>
       <Nav /> 
      <div className='flex justify-center'>
     <Menu /> 
  
        <Post  /> 
       <Extra /> 
      </div> 
     
    </div>
  )
}

export default Index