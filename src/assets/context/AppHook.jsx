import { useContext } from "react";
import { ImContext } from "./AppContext";

export default function AppHook() {
  const context = useContext(ImContext);

  if(context === undefined){
    throw Error("No Context");
  }

  return context;
}