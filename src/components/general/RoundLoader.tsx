const RoundLoader = ({className}: {className?: string}) => {
  return (
    <div className={`flex items-center justify-center my-5 ${className}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-deepBlue"></div>
    </div>
  );
};

export default RoundLoader;
