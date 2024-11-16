import { useBookmarksContext } from "../../lib/hooks";
import Carousel from "../Carousel";
import CarouselItem from "../CarouselItem";
import NoResultsMessage from "../NoResultsMessage";

const BookmarkList = () => {
  const { bookmarks } = useBookmarksContext();

  if (bookmarks.length === 0) {
    return <NoResultsMessage message="No bookmarks to show" />;
  }

  return (
    <>
      <Carousel>
        <>
          {bookmarks.map((item, index) => (
            <CarouselItem
              key={index}
              isFirstElement={index === 0}
              isLastElement={index === bookmarks.length - 1}
              repository={item}
            />
          ))}
        </>
      </Carousel>
    </>
  );
};

export default BookmarkList;
