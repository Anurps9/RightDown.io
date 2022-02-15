import Home from "./Components/Home";
import RequireAuth from "./Components/RequireAuth";
import Signup from "./Components/Signup";

export const routes = [
    {
        path: '/',
        element: <RequireAuth><Home /></RequireAuth>
    },
    {
        path: '/signup',
        element: <Signup />
    }
]