import { createBrowserRouter } from "react-router-dom";
import Net, { NetAPI } from "@/api/Net";
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
import View_Login from "@/view/user/View_Login";
import View_UserInfo from "@/view/user/View_UserInfo";
import View_Register from "@/view/user/View_Register";
import View_Error from "@/view/View_Error";
import { user_api_captcha, user_api_userInfo } from "./user_api";

async function analysis_body(url: NetAPI | string | undefined, analysis_net_api: (dom: Document) => any) {
    try {
        const res_text = await (await new Net(url).get()).text();
        return analysis.init(res_text, analysis_net_api);
    } catch (error) {
        console.log(error);
        window.location.pathname = "/err";
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: View_Home,
                loader: async () => await analysis_body(NetAPI.Home, analysis_net_api_home)
            },
            {
                path: '/year/:url',
                Component: View_Year,
                loader: async ({ params }) => await analysis_body(params['url'], analysis_net_api_year)
            },
            {
                path: '/detail/:url',
                Component: View_Detail,
                loader: async ({ params }) => await analysis_body(window.atob(params['url']!), analysis_net_api_detail)
            },
            {
                path: '/play/:url',
                Component: View_Play,
                loader: async ({ params }) => await analysis_body(window.atob(params['url']!), analysis_net_api_play)
            },
            {
                path: "/err",
                Component: View_Error
            },
            {
                path: '/user',
                Component: View_User,
                children: [
                    {
                        path: '',
                        Component: View_Login,
                        loader: async () => {
                            if (localStorage.getItem('token')) {
                                location.replace('/user/userInfo');
                            }
                            return await user_api_captcha();
                        }
                    },
                    {
                        path: "userInfo",
                        Component: View_UserInfo,
                        loader: async () => {
                            return await user_api_userInfo();
                        }
                    },
                    {
                        path: 'register',
                        Component: View_Register
                    }
                ]
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