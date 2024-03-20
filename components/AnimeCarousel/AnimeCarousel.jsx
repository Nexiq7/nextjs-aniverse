import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import AnimeCard from '../AnimeCard/AnimeCard';

const AnimeCarousel = ({ animeArray, title, addMargin }) => {
    return (
        <div className={`rounded-lg overflow-hidden ${addMargin ? 'mt-10' : ''}`}>
            <div className='h-[40px] flex'>
                <h2 className='text-2xl bg-gradient-to-r from-sky-500 to-indigo-400 inline-block text-transparent bg-clip-text font-medium'> {title}
                </h2>
            </div >
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}>
                <CarouselContent>
                    {animeArray.map((data, index) => (
                        <CarouselItem key={index} className="h-[200px] sm:h-[350px] md:h-[400px] lg:h-[400px] xl:h-[250px] 2xl:h-[300px] basis-1/2 md:basis-1/3 ">
                            <AnimeCard data={data} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div >
    )
}

export default AnimeCarousel