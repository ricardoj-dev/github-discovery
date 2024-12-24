type CarouselProps = {
  children: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  return (
    <div className="flex overflow-x-auto py-4 space-x-4 scrollbar-hide">
      {children}
    </div>
  );
};

export default Carousel;
