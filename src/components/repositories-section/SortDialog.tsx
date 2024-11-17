import { useRepositoriesContext } from "@/lib/hooks";
import { SortOption, SortOptionsListMap, Topic } from "@/types";

type SortDialogProps = {
  componentRef: React.LegacyRef<HTMLDivElement> | undefined;
  handleClickSortOptionSelected: (sortOption: SortOption) => void;
  topic: Topic;
};

const SortDialog = ({
  componentRef,
  handleClickSortOptionSelected,
  topic,
}: SortDialogProps) => {
  const { sortOptions } = useRepositoriesContext();
  const selectedSortOption = sortOptions[topic];

  const sortOptionsList: SortOptionsListMap = {
    stars: "Sort by stars",
    forks: "Sort by forks",
    interactions: "Sort by help wanted issues",
    updated: "Sort by updated",
  };

  return (
    <div
      ref={componentRef}
      className="absolute top-full mt-1 left-0 z-20 w-64 h-32 p-2 bg-white rounded-lg shadow-md flex flex-col gap-1"
    >
      {Object.entries(sortOptionsList).map(([key, value]) => (
        <Sort
          key={key}
          isChecked={selectedSortOption === key}
          onClick={() => handleClickSortOptionSelected(key as SortOption)}
          sortOption={key as SortOption}
          sortLabel={value}
        />
      ))}
    </div>
  );
};

export default SortDialog;

type SortProps = {
  isChecked: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  sortLabel: string;
  sortOption: SortOption;
};

const Sort = ({ isChecked, onClick, sortLabel, sortOption }: SortProps) => {
  const inputId = `sort-${sortLabel.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <fieldset className="flex gap-1">
      <input
        id={inputId}
        className="peer/published"
        type="radio"
        name="sort"
        value={sortOption}
        defaultChecked={isChecked}
        onClick={onClick}
      />
      <label htmlFor={inputId} className="peer-checked/published:text-gray-800">
        {sortLabel}
      </label>
    </fieldset>
  );
};
