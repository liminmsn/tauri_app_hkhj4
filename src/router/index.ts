import { createBrowserRouter } from "react-router-dom";
import Net, { NetAPI } from "@/api/net";
import App from "@/App";
import View_Home from "@/view/View_Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: View_Home,
                loader: () => new Net(NetAPI.Home).get()
            }
        ]
    }
]);

export default router;