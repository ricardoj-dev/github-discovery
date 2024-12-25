import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RepositoryList from '../../components/repositories-section/RepositoryList';
import { Repository } from '../../types';

vi.mock('../../lib/hooks', () => {
  return {
    useTopicsContext: vi.fn(),
  };
});

vi.mock('../Carousel', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel">{children}</div>
  ),
}));
vi.mock('../RepositoryItem', () => ({
  default: ({ repository }: { repository: Repository }) => (
    <div data-testid="carousel-item">{repository.full_name}</div>
  ),
}));

describe('RepositoryList Component', () => {
  it('should render nothing when repositories are undefined', () => {
    // When
    render(<RepositoryList repositories={undefined} />);

    // Then
    const carouselElement = screen.queryByTestId('carousel');
    expect(carouselElement).not.toBeInTheDocument();
  });

  it('should render a list of repositories', () => {
    // Given
    const mockRepositories: Repository[] = [
      {
        id: '1',
        full_name: 'repo1',
        description: 'Description for repo1',
        watchers_count: 10,
        stargazers_count: 20,
        forks_count: 5,
        html_url: 'https://github.com/repo1',
        is_bookmarked: false,
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

    // When
    render(<RepositoryList repositories={mockRepositories} />);

    // Then
    const carouselElement = screen.getByTestId('carousel');
    expect(carouselElement).toBeInTheDocument();

    mockRepositories.forEach((repository) => {
      expect(screen.getByText(repository.full_name)).toBeInTheDocument();
    });
  });
});
