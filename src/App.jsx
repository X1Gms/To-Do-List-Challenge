import React, {useState} from "react";
import TodoList from "./assets/components/TodoList";

export const Context = React.createContext();
const App =() => {

  const [Sort, ChangeSort] = useState(false);

  return(
    <Context.Provider value={ [Sort, ChangeSort]}>
      <TodoList/>
    </Context.Provider>
  )
}

export default App;