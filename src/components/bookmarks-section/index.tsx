import BookmarkList from "./BookmarkList";

const BookmarksSection = () => {
  return (
    <section className="h-56 flex flex-col">
      <h2 className="text-4xl">My Bookmarks</h2>
      <BookmarkList />
    </section>
  );
};

export default BookmarksSection;
