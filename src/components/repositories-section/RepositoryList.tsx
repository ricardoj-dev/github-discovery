import { Repository } from '@/types';
import CarouselContainer from '../CarouselContainer';

type RepositoryListProps = {
  repositories: Repository[] | undefined;
};

export default function RepositoryList({ repositories }: RepositoryListProps) {
  if (!repositories) {
    return null;
  }

  return <CarouselContainer repositories={repositories} />;
}
