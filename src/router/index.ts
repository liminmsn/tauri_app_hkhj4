import { createHashRouter } from "react-router";
import App from "@/App";
import View_Home from "@/view/View_Home";

const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: View_Home
            }
        ]
    }
]);

export default router;