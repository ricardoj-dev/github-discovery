import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BookmarkList from "../../components/bookmarks-section/BookmarkList";
import { useBookmarksContext } from "../../lib/hooks";

vi.mock("../../lib/hooks", () => {
  return {
    useBookmarksContext: vi.fn(),
  };
});

describe("BookmarkList Component", () => {
  it("should display a message when there are no bookmarks", () => {
    (
      useBookmarksContext as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => ({
      bookmarks: [],
    }));

    render(<BookmarkList />);

    expect(screen.getByText("No bookmarks to show")).toBeInTheDocument();
  });

  it("should display bookmarks when they exist", () => {
    const mockBookmarks = [
      {
        id: "1",
        full_name: "repo1",
        description: "Description for repo1",
        watchers_count: 10,
        stargazers_count: 20,
        forks_count: 5,
        html_url: "https://github.com/repo1",
        is_bookmarked: true,
      },
      {
        id: "2",
        full_name: "repo2",
        description: "Description for repo2",
        watchers_count: 15,
        stargazers_count: 25,
        forks_count: 7,
        html_url: "https://github.com/repo2",
        is_bookmarked: true,
      },
    ];

    (
      useBookmarksContext as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => ({
      bookmarks: mockBookmarks,
    }));

    render(<BookmarkList />);

    mockBookmarks.forEach((bookmark) => {
      expect(screen.getByText(bookmark.full_name)).toBeInTheDocument();
      expect(screen.getByText(bookmark.description)).toBeInTheDocument();
    });
  });
});
