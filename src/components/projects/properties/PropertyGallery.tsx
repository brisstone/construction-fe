import React, { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

interface ImageSet {
  images: string[];
  runNumber?: number;
}
export interface IPropertyGallery {
  id: string;
  allImageSets: ImageSet[];
  showNavigation?: boolean;
  dynamicHeight?: boolean;
  isNotStarLot?: boolean
  backoffice?: boolean
}

const PropertyGallery: React.FC<IPropertyGallery> = ({
  id,
  allImageSets,
  showNavigation = false,
  dynamicHeight = false,
  isNotStarLot = false,
}) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const pswpRef = useRef<PhotoSwipeLightbox | null>(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    pswpRef.current = lightbox;

    return () => {
      lightbox.destroy();
      pswpRef.current = null;
    };
  }, []);

  // Get the current images from the selected set
  const currentImages = allImageSets?.[currentSetIndex]?.images || [];

  const handleNext = () => {
    setCurrentSetIndex((prevIndex) =>
      prevIndex < allImageSets.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentSetIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : allImageSets.length - 1
    );
  };

  if (!allImageSets) return;

  return (
    <div className="relative">
      <div className="text-[12px] md:text-[13px] absolute left-[10px] top-[10px] md:left-[28px] md:top-[28px] p-1 flex justify-center items-center w-[35px] h-[35px] bg-black text-white rounded z-[8]">
        #{allImageSets?.[currentSetIndex].runNumber || id || "N/A"}
      </div>
      <div
        id="gallery"
        className={`grid grid-cols-5 gap-[0.2rem] ${
          dynamicHeight
            ? "grid-rows-1 xlg:grid-rows-3 h-auto md:h-[332px]"
            : "grid-rows-1 xlg:grid-rows-3 h-auto"
        }`}
      >
        {currentImages?.map((src, index) => (
          <a
            href={src}
            data-pswp-width="1024"
            data-pswp-height="768"
            key={index}
            className={`relative  ${
              dynamicHeight
                ? index === 0
                  ? "col-span-3 row-span-3"
                  : "col-span-1 row-span-1 aspect-[4/3] md:aspect-auto"
                : index === 0
                ? "col-span-3 row-span-3"
                : "col-span-1 row-span-1  aspect-[4/3]"
            }`}
          >
            <img
              src={src}
              alt={`${id} view ${index + 1}`}
              className={`w-full object-cover h-full rounded-[8px]`}
              {...(dynamicHeight
                ? { layout: "fill", objectFit: "cover" }
                : { width: 120, height: 146 })}
            />
          </a>
        ))}
        {!isNotStarLot && (
          <div className="absolute top-0 md:top-2 right-0 md:right-3 p-2 text-black font-bold">
            <div className="flex justify-center items-center h-[26px] w-[108px] rounded-lg bg-[#EEEEEE] text-sm text-black font-bold">
              Star Property
            </div>
          </div>
        )}
      </div>
      {/* Navigation Arrows */}
      {showNavigation && (
        <div className="absolute bottom-[10px] right-[10px] m:bottom-[30px] md:right-[30px] flex gap-4">
          <button
            onClick={handlePrev}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center bg-black text-white rounded-full cursor-pointer"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center bg-black text-white rounded-full cursor-pointer"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
