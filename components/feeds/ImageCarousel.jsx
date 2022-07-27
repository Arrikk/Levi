import React from 'react'
import {BASEURL} from './../../hooks/useDate'

const ImageCarousel = ({id, media}) => {
  // id = id+1

  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
    <img src={`${BASEURL}${media.source}`} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      {id > 0 && <a href={`#slide${id-1}`} className="btn btn-circle">❮</a>}
      {/* <a href={`#slide${id++}`} className="btn btn-circle">❮</a>  */}
      <a href={`#slide${id+=1}`} className="btn btn-circle">❯</a>
    </div>
  </div> 
  )
} 

export default ImageCarousel