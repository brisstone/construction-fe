const DetailCard = ({
  title = "details",
  children,
  className,
}: {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`${className} bg-white h-fit p-2 rounded-[4px] shadow-detailShadow`}>
      <h3 className="text-sm text-center font-bold">{title}</h3>
      <div className="overflow-y-scroll max-h-[300px] scrollableCSS my-2">{children}</div>
    </div>
  );
};

export default DetailCard;
