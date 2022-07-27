import React from 'react'
import CarouselItem from './CarouselItem';

const Carousel = ({media}) => {
  return (
    <div className="carousel w-full">
        {media?.map((media, idx) => <CarouselItem key={idx} media={media} id={idx} />  )}
    </div>
  )
}

export default Carousel