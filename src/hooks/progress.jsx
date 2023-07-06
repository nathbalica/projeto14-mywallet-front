import { useContext } from "react";
import  ProgressContext from "../contexts/ProgressContext";

export default function useProgress() {
  return useContext(ProgressContext);
}