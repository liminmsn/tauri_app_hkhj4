import { createBrowserRouter } from "react-router-dom";
import Net, { NetAPI } from "@/api/net";
import App from "@/App";
import View_Home from "@/view/View_Home";
import analysis from "./analysis";
import analysis_net_api_home from "./analysis/analysis_net_api_home";
import View_Year from "@/view/View_Year";
import analysis_net_api_year from "./analysis/analysis_net_api_year";
import View_Detail from "@/view/View_Detail";
import analysis_net_api_detail from "./analysis/analysis_net_api_detail";
import View_Play from "@/view/View_Play";
import analysis_net_api_play from "./analysis/analysis_net_api_play";
import View_User from "@/view/View_User";
import View_Setting from "@/view/View_Setting";

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
            },
            {
                path: '/year/:url',
                Component: View_Year,
                loader: async ({ params }) => {
                    const res_text = await (await new Net(params['url']).get()).text();
                    return analysis.init(res_text, analysis_net_api_year)
                }
            },
            {
                path: '/detail/:url',
                Component: View_Detail,
                loader: async ({ params }) => {
                    const url = window.atob(params['url'] || '');
                    const res_text = await (await new Net(url).get()).text();
                    return analysis.init(res_text, analysis_net_api_detail);
                }
            },
            {
                path: '/play/:url',
                Component: View_Play,
                loader: async ({ params }) => {
                    const url = window.atob(params['url'] || '');
                    const res_text = await (await new Net(url).get()).text();
                    return analysis.init(res_text, analysis_net_api_play);
                }
            },
            {
                path: '/user',
                Component: View_User,
                loader: () => { }
            },
            {
                path: '/setting',
                Component: View_Setting,
                loader: () => { }
            }
        ]
    }
]);

export default router;