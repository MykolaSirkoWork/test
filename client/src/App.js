import {useRoutes} from "./routes";
import React from "react";

function App() {
  const routs = useRoutes()
  return (

          <div>
              {routs}
          </div>

  );
}

export default App;
