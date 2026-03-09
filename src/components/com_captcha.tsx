import { user_api_captcha } from "@/router/user_api"
import { useState } from "react";

export default function ({ email, time }: { email: string, time: number }) {
    const [label, setLabel] = useState("获取");
    const [disabled, setDisabled] = useState(false);

    function getCaptcha() {
        if (!disabled) {
            user_api_captcha(email).then(res => {
                setDisabled(true);
                setLabel("");
                const ss = time;
                for (let i = 0; i <= ss; i++) {
                    setTimeout(() => {
                        let s = ss - i;
                        setLabel(`${s}s`);
                        if (s == 0) {
                            setDisabled(false);
                            setLabel("获取");
                        }
                    }, i * 1000);
                }
            });
        }
    }

    return <label>
        <div className="flex">
            <input className="border outline-none" type="text" name="code" placeholder="输入邮箱验证码" required />
            <input className="w-full ml-1.5" type="button" value={label} disabled={disabled} onClick={getCaptcha} />
        </div>
    </label>
}