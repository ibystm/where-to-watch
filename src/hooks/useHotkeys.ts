import { useCallback, useEffect } from "react";
import { checkIsMacOS } from "../utils/checkOS";

export const useHotKeys = (
  key: string,
  handler: () => void,
  // Ctrl key for windows, Command key for mac os
  useMetaKey: boolean = false
) => {
  const executeHandler = useCallback(
    (ev: KeyboardEvent): void => {
      if (ev.key !== key) return;
      if (useMetaKey) {
        if (checkIsMacOS() && ev.metaKey) {
          handler();
          return;
        }
        if (!ev.ctrlKey) return;
        return handler();
      }

      handler();
    },
    [handler, key, useMetaKey]
  );

  useEffect(() => {
    document.addEventListener("keydown", executeHandler);

    return () => document.removeEventListener("keydown", executeHandler);
  }, [executeHandler]);
};
