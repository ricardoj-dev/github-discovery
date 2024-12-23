import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TopicList from '../../components/topics-section/TopicList';
import { useTopicsContext } from '../../lib/hooks';

vi.mock('../../lib/hooks', () => {
  return {
    useTopicsContext: vi.fn(),
  };
});

describe('TopicList Component', () => {
  it('should render the list of topics', () => {
    // Given
    const mockTopics = [
      { name: 'Vue', isActive: true },
      { name: 'Javascript', isActive: false },
      { name: 'CSS', isActive: true },
    ];

    const toggleTopicMock = vi.fn();

    (useTopicsContext as unknown as Mock).mockImplementation(() => ({
      topics: mockTopics,
      toggleTopic: toggleTopicMock,
    }));

    // When
    render(<TopicList />);

    // Then
    mockTopics.forEach((topic) => {
      const button = screen.getByText(topic.name);
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(topic.name);
      if (topic.isActive) {
        expect(button).toHaveClass('bg-gray-500');
      } else {
        expect(button).toHaveClass('bg-white');
      }
    });
  });

  it('should call toggleTopic when a topic is clicked', () => {
    // Given
    const mockTopics = [
      { name: 'Vue', isActive: true },
      { name: 'Javascript', isActive: false },
    ];

    const toggleTopicMock = vi.fn();

    (
      useTopicsContext as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => ({
      topics: mockTopics,
      toggleTopic: toggleTopicMock,
    }));

    // When
    render(<TopicList />);

    const vueButton = screen.getByText('Vue');
    fireEvent.click(vueButton);

    // Then
    expect(toggleTopicMock).toHaveBeenCalledTimes(1);
    expect(toggleTopicMock).toHaveBeenCalledWith(mockTopics[0]);
  });
});
