import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA_QUERIES } from "@/utils/constants";
import { createContext, useContext, useMemo } from "react";

export type MediaQueryContextType = {
  maxSM: boolean;
  maxMD: boolean;
  maxLG: boolean;
  maxXL: boolean;
};
const MediaQueryContext = createContext({});

export const MediaQueryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const maxSM = useMediaQuery(MEDIA_QUERIES.MAX_SM);
  const maxMD = useMediaQuery(MEDIA_QUERIES.MAX_MD);
  const maxLG = useMediaQuery(MEDIA_QUERIES.MAX_LG);
  const maxXL = useMediaQuery(MEDIA_QUERIES.MAX_XL);

  const context = useMemo(
    () => ({ maxSM, maxMD, maxLG, maxXL }),
    [maxSM, maxMD, maxLG, maxXL]
  );

  return (
    <MediaQueryContext.Provider value={context}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = () =>
  useContext(MediaQueryContext) as MediaQueryContextType;
