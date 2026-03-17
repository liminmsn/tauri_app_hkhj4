import Com_Card from "@/components/view/com_Card";
import { user_api_feed_back_submit } from "@/router/user_api";
import { toast } from "react-toastify";

export default function () {
    async function increment(formData: FormData) {
        user_api_feed_back_submit(formData).then(res => {
            toast(res.msg, {
                theme: 'dark',
                type: res.code == 200 ? "success" : "warning"
            });
        });
    }

    return <div className="p-2 text-center pt-20">
        <Com_Card>
            <form action={increment} className="flex flex-col gap-y-2 p-8">
                <label className="text-sm">
                    你联系方式：
                    <input name="call" type="text" maxLength={30} placeholder="微信、手机号、邮箱" required />
                </label>
                <label className="text-sm">
                    遇到的问题：
                    <textarea name="info" required maxLength={300} style={{ verticalAlign: 'top' }} className="border-none outline-none theme_1 rounded-sm min-h-40" placeholder="问题、想法、建议" />
                </label>
                <input type="submit" value="提交反馈" />
            </form>
        </Com_Card>
    </div >
}