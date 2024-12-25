import { useEffect, useRef, useState } from 'react';
import CarouselButton from './CarouselButton';

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = carouselRef.current;

      const canScrollLeft = scrollLeft > 0;
      const canScrollRight =
        scrollWidth > offsetWidth && scrollLeft + offsetWidth < scrollWidth - 1;

      setCanScrollLeft(canScrollLeft);
      setCanScrollRight(canScrollRight);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    checkScrollPosition();

    const handleScroll = () => {
      checkScrollPosition();
    };

    carousel.addEventListener('scroll', handleScroll);

    const observer = new MutationObserver(() => {
      checkScrollPosition();
    });

    observer.observe(carousel, { childList: true });

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [children]);

  return (
    <div className="relative w-full flex items-center">
      <div className="w-12 flex justify-center">
        <CarouselButton
          direction="left"
          onClick={scrollLeft}
          isVisible={canScrollLeft}
          margin="mr-4"
        />
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto py-4 space-x-4 scrollbar-hide scroll-smooth"
      >
        {children}
      </div>

      <div className="w-12 flex justify-center">
        <CarouselButton
          direction="right"
          onClick={scrollRight}
          isVisible={canScrollRight}
          margin="ml-4"
        />
      </div>
    </div>
  );
};

export default Carousel;
