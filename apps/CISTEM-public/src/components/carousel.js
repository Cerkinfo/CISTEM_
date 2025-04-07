import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from 'reactstrap';
import styled from 'styled-components';

const Style = styled.div`
    .custom-carousel-control-prev {
        left: -35px;
    }

    .custom-carousel-control-next {
        right: -35px;
    }
`;

export const Carousel_ = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
    
    const handleItemClick = () => {
        setIsPaused(true);
      };
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          onClick={handleItemClick}
        >
          {item}
        <CarouselCaption/>
        </CarouselItem>
      );
    });

    return (
        <Style>
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            dark={true}
            interval={isPaused ? false : 5000}
            ride={isPaused ? false : 'carousel'}
        >
        {slides}
        <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
            className="custom-carousel-control-prev"
        />
        <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
            className="custom-carousel-control-next"
        />
      </Carousel>
      </Style>
    );
}
