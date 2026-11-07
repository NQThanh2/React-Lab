import {createBrowserRouter} from "react-router-dom";
import {Layout} from "./Layout.tsx";
import {Error} from "./Error.tsx";
import {Home} from "../components/Home.tsx"

export const route = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout/>,
            errorElement: <Error/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                }
            ]
        }
    ]
);