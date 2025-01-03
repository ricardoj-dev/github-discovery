import LoadingSpinner from './LoadingSpinner';
import { Button, ButtonProps } from './button';

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <LoadingSpinner size="small" />}
      {!isLoading && children}
    </Button>
  );
};

export default LoadingButton;
