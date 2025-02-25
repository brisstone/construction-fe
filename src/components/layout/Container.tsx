const Container = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={`${className} bg-white p-4 rounded-[4px]`}>{children}</div>;
};

export default Container;
