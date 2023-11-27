import React, {useState} from "react";
import TodoList from "./assets/components/TodoList";
import Cookies from "js-cookie";

export const Context = React.createContext();
const App =() => {

  const SortValue = Cookies.get("Sort");
  const init = SortValue ? JSON.parse(SortValue) : false
  const [Sort, ChangeSort] = useState(init);

  return(
    <Context.Provider value={ [Sort, ChangeSort]}>
      <TodoList/>
    </Context.Provider>
  )
}

export default App;