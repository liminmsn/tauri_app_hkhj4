import { createBrowserRouter, redirect } from "react-router-dom";
import { user_api_premium_list, user_api_userInfo } from "./user_api";
import Net, { NetAPI_Move, NetAPI_Plot } from "@/api/Net";
import { toast } from "react-toastify";
import App from "@/App";
import View_Year from "@/view/View_Year";
import View_Detail from "@/view/View_Detail";
import View_Play from "@/view/View_Play";
import View_User from "@/view/View_User";
import View_Setting from "@/view/other/View_Setting";
import View_Login from "@/view/user/View_Login";
import View_UserInfo from "@/view/user/View_UserInfo";
import View_Register from "@/view/user/View_Register";
import View_Error from "@/view/other/View_Error";
import View_ForgotPaswd from "@/view/user/View_ForgotPaswd";
import View_Premium from "@/view/View_Premium";
import View_Plot from "@/view/category/View_Plot";
import View_Move from "@/view/category/View_Move";
import analysis_net_api_move from "./analysis/move/analysis_net_api_move";
import analysis from "./analysis";
import analysis_net_api_plot from "./analysis/plot/analysis_net_api_plot";
import analysis_net_api_plot_year from "./analysis/plot/analysis_net_api_plot_year";
import analysis_net_api_plot_detail from "./analysis/plot/analysis_net_api_plot_detail";
import analysis_net_api_plot_play from "./analysis/plot/analysis_net_api_plot_play";
import { categoryHomePath, CATEGORY_PLOT, CATEGORY_MOVE } from "@/hooks/CateGoryProvider";
import analysis_net_api_plot_detail_move from "./analysis/move/analysis_net_api_plot_detail_move";
import analysis_net_api_plot_play_move from "./analysis/move/analysis_net_api_plot_play_move";

/**未登录自动跳转登录 */
function is_login() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    return true;
}

export async function analysis_body(url: NetAPI_Plot | string | undefined, analysis_net_api: (dom: Document) => any) {
    console.log(url);
    
    try {
        let res_text;
        switch (categoryHomePath()) {
            case CATEGORY_MOVE:
                res_text = await (await new Net(url, import.meta.env['VITE_URL_MOVE']).get()).text()
                break;
            default:
                res_text = await (await new Net(url).get()).text()
                break;
        }
        return analysis.init(res_text, analysis_net_api);
    } catch (error) {
        console.log(error);
        // window.location.pathname = "/err";
    }
}

const analysis_init = {
    [CATEGORY_PLOT]: {
        'home': analysis_net_api_plot,
        'year': analysis_net_api_plot_year,
        'detail': analysis_net_api_plot_detail,
        'play': analysis_net_api_plot_play
    },
    [CATEGORY_MOVE]: {
        'home': analysis_net_api_move,
        'year': analysis_net_api_plot_year,
        'detail': analysis_net_api_plot_detail_move,
        'play': analysis_net_api_plot_play_move
    },
}
function getAnalysisFun(type: keyof typeof analysis_init, path: keyof typeof analysis_init[typeof CATEGORY_MOVE]) {
    console.log(type,path);
    return analysis_init[type][path];
}

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "plot",
                Component: View_Plot,
                loader: async () => {
                    return await analysis_body(NetAPI_Plot.Home, getAnalysisFun(categoryHomePath(), "home"))
                }
            },
            {
                path: "move",
                Component: View_Move,
                loader: async () => {
                    return await analysis_body(NetAPI_Move.Home, getAnalysisFun(categoryHomePath(), "home"))
                }
            },
            {
                path: "/video",
                children: [
                    {
                        path: 'year/:url',
                        Component: View_Year,
                        loader: async ({ params }) => await analysis_body(params['url'], getAnalysisFun(categoryHomePath(), "year"))
                    },
                    {
                        path: 'detail/:url',
                        Component: View_Detail,
                        loader: async ({ params }) => {
                            const url = window.atob(params['url']!);
                            return {
                                url: url,
                                data: await analysis_body(url, getAnalysisFun(categoryHomePath(), "detail"))
                            }
                        }
                    },
                    {
                        path: 'play/:url',
                        Component: View_Play,
                        loader: async ({ params }) => {
                            if (!is_login()) {
                                throw redirect("/user");
                            }
                            return await analysis_body(window.atob(params['url']!), getAnalysisFun(categoryHomePath(), "play"));
                        }
                    },
                ]
            },
            {
                path: "/premium",
                children: [
                    {
                        path: "",
                        Component: View_Premium,
                        loader: async () => {
                            if (!is_login()) {
                                throw redirect("/user");
                            }
                            return await user_api_premium_list()
                        }
                    }
                ]
            },
            {
                path: '/user',
                Component: View_User,
                children: [
                    {
                        path: '',
                        Component: View_Login,
                        loader: async () => {
                            if (is_login()) {
                                throw redirect("/user/userInfo");
                            }
                            // return await user_api_captcha();
                        }
                    },
                    {
                        path: "userInfo",
                        Component: View_UserInfo,
                        loader: async () => {
                            const res = await user_api_userInfo();
                            if (res.code != 200) {
                                throw redirect("/");
                            }
                            return res;
                        }
                    },
                    {
                        path: 'register',
                        Component: View_Register
                    },
                    {
                        path: 'forgot_password',
                        Component: View_ForgotPaswd
                    }
                ]
            },
            {
                path: '/setting',
                Component: View_Setting,
                loader: () => { }
            },
            {
                path: "/err",
                Component: View_Error
            }
        ]
    }
]);

export default router;