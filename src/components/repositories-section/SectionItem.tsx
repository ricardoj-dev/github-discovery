type SectionItemProps = {
  children: React.ReactNode;
};

const SectionItem = ({ children }: SectionItemProps) => {
  return <div className="mt-5 h-56 flex flex-col">{children}</div>;
};

export default SectionItem;
