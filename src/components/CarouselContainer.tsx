import { useBookmarksContext } from '@/lib/hooks';
import Carousel from './ui/carousel';
import RepositoryItem from './ui/carousel/RepositoryItem';
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
        <RepositoryItem
          key={repository.id}
          {...repository}
          onBookmarkClick={handleBookmarkToggle}
        />
      ))}
    </Carousel>
  );
};

export default CarouselContainer;
