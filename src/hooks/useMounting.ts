import { useState, useEffect, useCallback } from "react";

type MountHandler = (value: boolean, delay?: number) => any;

export function useMounting(autoMount = true): [boolean, MountHandler, boolean] {
  const [mounted, setMounted] = useState(false);
  const [isMounting, setIsMounting] = useState(false);

  const handleMounting: MountHandler = useCallback(
    (value: boolean, delay?: number) => {
      if (value === mounted) return;
      if (!delay || delay < 1) return setMounted(value);

      setIsMounting(true);

      setTimeout(() => {
        setMounted(value);
        setIsMounting(false);
      }, delay);
    },
    [mounted]
  );

  useEffect(() => {
    if (autoMount) setMounted(true);
  }, [autoMount]);

  return [mounted, handleMounting, isMounting];
}
