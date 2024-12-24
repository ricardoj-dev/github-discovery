import { useBookmarksContext } from '@/lib/hooks';
import Carousel from './ui/carousel';
import CarouselItem from './ui/carousel/CarouselItem';
import { Repository } from '@/types';

const CarouselContainer = ({
  repositories,
}: {
  repositories: Repository[];
}) => {
  const { toggleBookmark } = useBookmarksContext();

  const handleBookmarkToggle = (repository: Repository) => {
    toggleBookmark(repository);
  };

  return (
    <Carousel>
      {repositories.map((repository) => (
        <CarouselItem
          key={repository.id}
          {...repository}
          onBookmarkClick={handleBookmarkToggle}
        />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
