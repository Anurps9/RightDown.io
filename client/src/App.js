import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useEffect, useState } from "react";
import cookie from 'react-cookies'
import { routes } from "./routes";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const userId = cookie.load('userId')
    if(userId){
      setUser(userId)
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            {
              routes.map((route) => (
                <Route path={route.path} element={route.element} />
              ))
            }
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
