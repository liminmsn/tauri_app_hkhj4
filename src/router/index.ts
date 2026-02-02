import { createBrowserRouter } from "react-router-dom";
import Net, { NetAPI } from "@/api/net";
import App from "@/App";
import View_Home from "@/view/View_Home";
import analysis from "./analysis";
import analysis_net_api_home from "./analysis/analysis_net_api_home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: View_Home,
                loader: async () => {
                    const res_text = await (await new Net(NetAPI.Home).get()).text();
                    return analysis.init(res_text, analysis_net_api_home)
                }
            }
        ]
    }
]);

export default router;