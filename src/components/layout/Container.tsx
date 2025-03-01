const Container = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`bg-white p-4 rounded-[4px] ${className}`}>{children}</div>
  );
};

export default Container;
