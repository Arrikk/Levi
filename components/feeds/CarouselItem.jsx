import React from 'react'
import ImageCarousel from './ImageCarousel';
import VideoCarousel from './VideoCarousel';

const CarouselItem = ({media, id}) => {
    return  media.mediaType == 'image' ? <ImageCarousel media={media} id={id} /> : <VideoCarousel id={id} />
}

export default CarouselItem
