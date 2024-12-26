import { useDropdown, useRepositoriesContext } from '@/lib/hooks';
import { SortOption, Topic } from '@/types';
import IconDown from '../icons/IconDown';
import SortDialog from '@/components/ui/sort-dialog';

type TopicHeaderProps = {
  topic: Topic;
};

const TopicHeader = ({ topic }: TopicHeaderProps) => {
  const { fetchRepositoriesBySortOption, sortOptions } =
    useRepositoriesContext();

  const {
    isOpen: isVisibleSortDialog,
    setIsOpen: setIsVisibleSortDialog,
    ref: sortDialogRef,
  } = useDropdown();

  const handleOptionSelected = (sortOption: SortOption) => {
    fetchRepositoriesBySortOption(topic, sortOption);
    setIsVisibleSortDialog(false);
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
          <div ref={sortDialogRef}>
            <SortDialog
              onOptionSelected={handleOptionSelected}
              topic={topic}
              sortOptions={sortOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicHeader;
