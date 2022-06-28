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
      if (useMetaKey && ev.key === key) {
        if (checkIsMacOS() && ev.metaKey) {
          handler();
          return;
        }
        if (!checkIsMacOS() && ev.ctrlKey) {
          handler();
          return;
        }
      }

      if (ev.key === key) {
        handler();
      }
    },
    [handler, key, useMetaKey]
  );

  useEffect(() => {
    document.addEventListener("keydown", executeHandler);

    return () => document.removeEventListener("keydown", executeHandler);
  }, [executeHandler]);
};
