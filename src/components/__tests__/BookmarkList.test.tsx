import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BookmarkList from '../../components/bookmarks-section/BookmarkList';
import useBookmarksStore from '@/stores/bookmarksStore';

vi.mock('@/stores/bookmarksStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('BookmarkList Component', () => {
  it('should display a message when there are no bookmarks', () => {
    // Mock bookmarks as empty
    vi.mocked(useBookmarksStore).mockReturnValue({
      bookmarks: [],
      isBookmarksLoading: false,
      setBookmarks: vi.fn(),
      toggleBookmark: vi.fn(),
    });

    // When
    render(<BookmarkList />);

    // Then
    expect(screen.getByText('No bookmarks to show.')).toBeInTheDocument();
  });

  it('should display bookmarks when they exist', () => {
    // Given
    const mockBookmarks = [
      {
        id: '1',
        full_name: 'repo1',
        description: 'Description for repo1',
        watchers_count: 10,
        stargazers_count: 20,
        forks_count: 5,
        html_url: 'https://github.com/repo1',
        is_bookmarked: true,
      },
      {
        id: '2',
        full_name: 'repo2',
        description: 'Description for repo2',
        watchers_count: 15,
        stargazers_count: 25,
        forks_count: 7,
        html_url: 'https://github.com/repo2',
        is_bookmarked: true,
      },
    ];

    // Mock bookmarks with data
    vi.mocked(useBookmarksStore).mockReturnValue({
      bookmarks: mockBookmarks,
      isBookmarksLoading: false,
      setBookmarks: vi.fn(),
      toggleBookmark: vi.fn(),
    });

    // When
    render(<BookmarkList />);

    // Then
    mockBookmarks.forEach((bookmark) => {
      expect(screen.getByText(bookmark.full_name)).toBeInTheDocument();
      expect(screen.getByText(bookmark.description)).toBeInTheDocument();
    });
  });
});
