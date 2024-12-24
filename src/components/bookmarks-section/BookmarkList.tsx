import { useBookmarksContext } from '../../lib/hooks';
import NoResultsMessage from '../NoResultsMessage';
import CarouselContainer from '../CarouselContainer';

const BookmarkList = () => {
  const { bookmarks } = useBookmarksContext();

  if (bookmarks.length === 0) {
    return <NoResultsMessage message="No bookmarks to show" />;
  }

  return <CarouselContainer repositories={bookmarks} />;
};

export default BookmarkList;
