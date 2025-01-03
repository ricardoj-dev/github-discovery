type ErrorMessageProps = {
  message: string;
};

const InformationMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default InformationMessage;
