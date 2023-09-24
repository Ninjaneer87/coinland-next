import { useEffect, useLayoutEffect, useState } from "react";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
};
const NoSSR = ({ children, defer = false, fallback = null }: Props) => {
  const [isMounted, setMountedState] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) setMountedState(true);
  }, [defer]);

  useEffect(() => {
    if (defer) setMountedState(true);
  }, [defer]);

  return isMounted ? children : fallback;
};

export default NoSSR;
