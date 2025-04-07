import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from 'reactstrap';
import styled from 'styled-components';

const Style = styled.div`
    .carousel {
        max-width: 100%;
        overflow: hidden;
    }
    .custom-carousel-control-prev {
    left: -90px;
    @media (max-width: 768px) {
      left: -20px;
    }
  }
  .custom-carousel-control-next {
    right: -90px;
    @media (max-width: 768px) {
      right: -20px;
    }
  }
`;

export const Carousel_ = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

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
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
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
            interval={5000}
            ride={'carousel'}
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
