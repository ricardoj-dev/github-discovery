import { useRepositoriesContext } from "@/lib/hooks";
import { SortOption, Topic } from "@/types";
import { useEffect, useRef, useState } from "react";
import IconDown from "../icons/IconDown";
import SortDialog from "./SortDialog";

type TopicOfRepositoryHeaderProps = {
  topic: Topic;
};

const TopicOfRepositoryHeader = ({ topic }: TopicOfRepositoryHeaderProps) => {
  const { fetchRepositoriesBySortOption } = useRepositoriesContext();

  const [isVisibleSortDialog, setIsVisibleSortDialog] = useState(false);
  const sortDialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortDialogRef.current &&
        !sortDialogRef.current.contains(event.target as Node)
      ) {
        setIsVisibleSortDialog(false);
      }
    };

    if (isVisibleSortDialog) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisibleSortDialog]);

  const handleClickSortOptionSelected = (sortOption: SortOption) => {
    fetchRepositoriesBySortOption(topic, sortOption);
    setIsVisibleSortDialog((prev) => !prev);
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <h2 className="text-2xl">{topic}</h2>
      <div className="relative">
        <IconDown
          className="size-5 cursor-pointer"
          onClick={() => setIsVisibleSortDialog((prev) => !prev)}
        />
        {isVisibleSortDialog && (
          <SortDialog
            componentRef={sortDialogRef}
            handleClickSortOptionSelected={handleClickSortOptionSelected}
            topic={topic}
          />
        )}
      </div>
    </div>
  );
};

export default TopicOfRepositoryHeader;
