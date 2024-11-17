import { Repository } from "@/types";
import Carousel from "../Carousel";
import CarouselItem from "../CarouselItem";

type RepositoryListProps = {
  repositories: Repository[] | undefined;
};

export default function RepositoryList({ repositories }: RepositoryListProps) {
  if (!repositories) {
    return null;
  }

  return (
    <Carousel>
      <>
        {repositories.map((repository, index) => (
          <CarouselItem
            key={repository.id}
            isFirstElement={index === 0}
            isLastElement={index === repositories.length - 1}
            repository={repository}
          />
        ))}
      </>
    </Carousel>
  );
}
