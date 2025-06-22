import React from "react";
import { DIContainer } from "../api";

export interface ProvidedContext {
  container: DIContainer;
}

const DIContext = React.createContext<ProvidedContext>({
  container: {
    get: () => undefined,
    inject: () => {
      throw new Error("no container available");
    },
  },
});

export const useDI = () => React.useContext(DIContext);

export interface ProviderProps {
  children?: React.ReactNode;
  container: DIContainer;
}

export const DIProvider = React.memo<ProviderProps>((props: ProviderProps) => {
    
  const memoizedContext = React.useMemo(() => {
    const value: ProvidedContext = {
      container: props.container,
    };

    return value;
  }, [props.container]);

  return (
    <DIContext.Provider value={memoizedContext}>
      {props.children}
    </DIContext.Provider>
  );
});
