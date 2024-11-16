import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  classesContainer?: string;
  classesSpinner?: string;
};

const LoadingSpinner = ({
  classesContainer,
  classesSpinner,
}: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex items-center justify-center", classesContainer)}>
      <div
        className={cn(
          "w-16 h-16 border-4 border-black-800 border-solid rounded-full animate-spin",
          "border-t-transparent",
          classesSpinner
        )}
        style={{ borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
