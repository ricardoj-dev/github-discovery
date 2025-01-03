import InformationMessage from '../ui/InformationMessage';
import CarouselContainer from '../CarouselContainer';
import useBookmarksStore from '@/stores/bookmarksStore';

const BookmarkList = () => {
  const bookmarks = useBookmarksStore().bookmarks;

  if (bookmarks.length === 0) {
    return <InformationMessage message="No bookmarks to show." />;
  }

  return <CarouselContainer repositories={bookmarks} />;
};

export default BookmarkList;
