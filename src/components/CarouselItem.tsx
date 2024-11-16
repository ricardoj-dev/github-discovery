import { cn } from "@/lib/utils";
import { Repository } from "@/types";
import IconStar from "./icons/IconStar";
import IconStarFill from "./icons/IconStarFill";
import IconUsersAlt from "./icons/IconUsersAlt";
import React from "react";
import IconCodeSandbox from "./icons/IconCodeSandbox";
import IconGithub from "./icons/IconGithub";
import IconRepoForkedTwentyFour from "./icons/IconRepoForkedTwentyFour";
import { useBookmarksContext } from "@/lib/hooks";

type CarouselItemProps = {
  isFirstElement: boolean;
  isLastElement: boolean;
  repository: Repository;
};

const CarouselItem = ({
  isFirstElement,
  isLastElement,
  repository,
}: CarouselItemProps) => {
  const { toggleBookmark } = useBookmarksContext();

  const splittedFullName = repository.full_name.split("/");

  const handleStarClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(repository);
  };

  return (
    <a href={repository.html_url} target="_blank" className="hover:z-10">
      <div
        key={repository.id}
        className={cn(
          "flex flex-col flex-shrink-0 w-96 p-4 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110 hover:z-10",
          null,
          {
            "hover:translate-x-4": isFirstElement,
            "-hover:translate-x-4": isLastElement,
          }
        )}
      >
        <div className="flex justify-between  items-start">
          <div className="flex flex-col gap-2 flex-[0_0_85%]">
            <h2 className="text-xl line-clamp-1">
              {splittedFullName[0]}
              <span className="font-bold">/{splittedFullName[1]}</span>
            </h2>
            <p className="text-[10px] text-gray-600 line-clamp-1">
              {repository.description}
            </p>
          </div>
          <div className="flex items-center justify-end flex-[0_0_15%]">
            {repository.is_bookmarked ? (
              <IconStarFill className="w-4 h-4" onClick={handleStarClick} />
            ) : (
              <IconStar className="w-4 h-4" onClick={handleStarClick} />
            )}
          </div>
        </div>

        <div className=" mt-8 flex justify-between">
          <div className="flex gap-5">
            <DataContainer quantity="2k" descriptionLabel="Contributors">
              <IconUsersAlt />
            </DataContainer>

            <DataContainer quantity="25m" descriptionLabel="Used by">
              <IconCodeSandbox />
            </DataContainer>

            <DataContainer
              quantity={repository.stargazers_count}
              descriptionLabel="Stars"
            >
              <IconStar />
            </DataContainer>

            <DataContainer
              quantity={repository.forks_count}
              descriptionLabel="Forks"
            >
              <IconRepoForkedTwentyFour />
            </DataContainer>
          </div>

          <IconGithub />
        </div>
      </div>
    </a>
  );
};

export default CarouselItem;

type DataContainerProps = {
  children: React.ReactNode;
  quantity: string | number;
  descriptionLabel: string;
};

const DataContainer = ({
  children,
  quantity,
  descriptionLabel,
}: DataContainerProps) => {
  return (
    <div className="flex gap-1">
      {children}

      <div className="flex flex-col">
        <p className="text-[12px]">{quantity}</p>
        <p className="text-[10px] text-gray-600">{descriptionLabel}</p>
      </div>
    </div>
  );
};
