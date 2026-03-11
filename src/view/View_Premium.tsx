import Com_card from "@/components/view/com_Card";
import { PremiumListItem } from "@/router/user_api";
import { useState } from "react";
import { useLoaderData } from "react-router-dom"

export default function () {
    const { data } = useLoaderData<{ data: PremiumListItem[] }>();
    const [select_primume, setSelectPrimume] = useState<PremiumListItem | null>(null);

    return <div className="text-center pt-20">
        {/* <div className="text-sm opacity-40">
            --
            <span>微信</span>
            <span>支付宝</span>
            --
        </div> */}
        <div className="my-2 gap-4 flex justify-center cursor-pointer">
            {
                data && data.map((item, idx) => {
                    return <div key={idx} onClick={() => {
                        if (select_primume == null || select_primume.id != item.id) {
                            setSelectPrimume(item)
                        } else {
                            setSelectPrimume(null);
                        }
                    }}>
                        <div className={`transition ${item.id == select_primume?.id && '-translate-y-4'}`}>
                            <Com_card>
                                <div className={`p-4 px-8 text-center relative`} >
                                    <div className="text-sm opacity-50 text-balance line-through">原价:{item.price}元</div>
                                    <div className="text-xl font-bold relative">
                                        <span className="absolute -right-4 -top-1 rotate-12 text-sm theme_0 px-1 scale-80 rounded-sm">{item.priceDiscount}折</span>
                                        <span className="py-1 mr-1">{(Number(item.price) - (Number(item.price) * Number(item.priceDiscount)))}元</span>
                                    </div>
                                    <div className="text-sm">{item.priceLabel}</div>
                                    <div className=" -rotate-45 absolute -right-5 px-6 text-sm font-bold bg-red-500"><span className="pl-4">{item.day}天</span></div>
                                </div>
                            </Com_card>
                        </div>
                    </div>
                })
            }
        </div>
        <input disabled={select_primume == null} className="px-8! font-bold" type="button" value="订阅" />
    </div>
}