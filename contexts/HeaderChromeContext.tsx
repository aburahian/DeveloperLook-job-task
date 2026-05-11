"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeaderChromeContextValue = {
  forceHideHeader: boolean;
  setForceHideHeader: (v: boolean) => void;
  cursorActive: boolean;
  setCursorActive: (v: boolean) => void;
  cursorIcon: boolean;
  setCursorIcon: (v: boolean) => void;
  buttonCursorActive: boolean;
  setButtonCursorActive: (v: boolean) => void;
  buttonCursorText: string;
  setButtonCursorText: (v: string) => void;
};

const HeaderChromeContext = createContext<HeaderChromeContextValue | null>(
  null,
);

export function HeaderChromeProvider({ children }: { children: ReactNode }) {
  const [forceHideHeader, setForceHideHeader] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorIcon, setCursorIcon] = useState(false);
  const [buttonCursorActive, setButtonCursorActive] = useState(false);
  const [buttonCursorText, setButtonCursorText] = useState("");

  const setButtonCursorTextStable = useCallback((t: string) => {
    setButtonCursorText(t);
  }, []);

  const value = useMemo(
    () => ({
      forceHideHeader,
      setForceHideHeader,
      cursorActive,
      setCursorActive,
      cursorIcon,
      setCursorIcon,
      buttonCursorActive,
      setButtonCursorActive,
      buttonCursorText,
      setButtonCursorText: setButtonCursorTextStable,
    }),
    [
      forceHideHeader,
      cursorActive,
      cursorIcon,
      buttonCursorActive,
      buttonCursorText,
      setButtonCursorTextStable,
    ],
  );

  return (
    <HeaderChromeContext.Provider value={value}>
      {children}
    </HeaderChromeContext.Provider>
  );
}

export function useHeaderChrome() {
  const ctx = useContext(HeaderChromeContext);
  if (!ctx) {
    throw new Error("useHeaderChrome must be used within HeaderChromeProvider");
  }
  return ctx;
}
