import { createContext, useState } from "react";
const ProgressContext = createContext();


export function ProgressContextProvider({ children }) {
    const [progress, setProgress] = useState('');
  
    function updateProgress(progressed, total) {
      if (total === 0) {
        setProgress(0);
        return;
      }
  
      setProgress((progressed / total) * 100);
    }
  
    return (
      <ProgressContext.Provider value={{ progress, updateProgress }}>
        {children}
      </ProgressContext.Provider>
    );
  }

  export default ProgressContext;
  