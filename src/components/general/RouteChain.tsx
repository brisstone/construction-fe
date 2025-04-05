"use client";

import { GoBackIcon } from "@/assets/svgComp/General";
import { useNavigate } from "react-router-dom";

const RouteChain = ({
  routeTwo,
  routeOne,
  routeThree,
}: {
  routeTwo?: string;
  routeOne?: string;
  routeThree?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center font-medium gap-4 text-xs text-iconColor">
      <main
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <GoBackIcon />
      </main>
      <aside className="flex items-center gap-1">
        <p>{routeOne}</p>
        {(!routeTwo || routeTwo == undefined || routeTwo == "undefined") ? (
          "..."
        ) : (
          <div>
            <span>/ </span>
            <span className={`${routeThree ? "" : "text-deepBlue"}`}>
              {routeTwo}
            </span>
          </div>
        )}
        {routeThree && (
          <div>
            <span> / </span>
            <span className={`${"text-deepBlue"}`}>{routeThree}</span>
          </div>
        )}
      </aside>
    </div>
  );
};

export default RouteChain;
