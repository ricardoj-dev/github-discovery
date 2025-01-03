import { cn } from '@/lib/utils';

type LoadingSpinnerSize = 'small' | 'medium' | 'large';
type LoadingSpinnerVariant = 'default' | 'overlay';

type LoadingSpinnerProps = {
  size?: LoadingSpinnerSize;
  variant?: LoadingSpinnerVariant;
};

const LoadingSpinner = ({
  size = 'medium',
  variant = 'default',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  const variantClasses = {
    default: 'flex items-center justify-center',
    overlay:
      'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-50 z-50',
  };

  return (
    <div className={cn(variantClasses[variant])}>
      <div
        className={cn(
          'border-black border-solid rounded-full animate-spin',
          'border-t-transparent',
          sizeClasses[size]
        )}
        style={{ borderTopColor: 'transparent' }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
