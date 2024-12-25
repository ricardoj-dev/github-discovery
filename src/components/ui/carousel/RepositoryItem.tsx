import { Repository } from '@/types';
import IconStar from '@/components/icons/IconStar';
import IconStarFill from '@/components/icons/IconStarFill';
import IconUsersAlt from '@/components/icons/IconUsersAlt';
import React from 'react';
import IconCodeSandbox from '@/components/icons/IconCodeSandbox';
import IconGithub from '@/components/icons/IconGithub';
import IconRepoForkedTwentyFour from '@/components/icons/IconRepoForkedTwentyFour';

type RepositoryItemProps = {
  id: string;
  full_name: string;
  description: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  is_bookmarked?: boolean;
  onBookmarkClick?: (repository: Repository) => void;
};

const RepositoryItem = ({
  id,
  full_name,
  description,
  watchers_count,
  stargazers_count,
  forks_count,
  html_url,
  is_bookmarked,
  onBookmarkClick,
}: RepositoryItemProps) => {
  const splittedFullName = full_name.split('/');

  const handleStarClick = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmarkClick?.({
      id,
      full_name,
      description,
      watchers_count,
      stargazers_count,
      forks_count,
      html_url,
      is_bookmarked,
    } as Repository);
  };

  return (
    <a
      href={html_url}
      target="_blank"
      className="hover:z-10 flex-shrink-0 w-96 first:hover:translate-x-4 last:hover:-translate-x-4 transition-transform"
    >
      <div
        key={id}
        className="flex flex-col p-4 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-110"
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2 flex-[0_0_85%]">
            <h2 className="text-xl line-clamp-1">
              {splittedFullName[0]}
              <span className="font-bold">/{splittedFullName[1]}</span>
            </h2>
            <p className="text-[10px] text-gray-600 line-clamp-1">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-end flex-[0_0_15%]">
            {is_bookmarked ? (
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

            <DataContainer quantity={stargazers_count} descriptionLabel="Stars">
              <IconStar />
            </DataContainer>

            <DataContainer quantity={forks_count} descriptionLabel="Forks">
              <IconRepoForkedTwentyFour />
            </DataContainer>
          </div>

          <IconGithub />
        </div>
      </div>
    </a>
  );
};

export default RepositoryItem;

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
