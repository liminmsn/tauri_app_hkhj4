import Com_card from "@/components/view/com_Card";
import { categoryHomePath } from "@/hooks/CateGoryProvider";
import { useMemberContext } from "@/hooks/MemberProvider";
import { PremiumListItem, PremiumSpay, PremiumSpayType, user_api_premium_spay } from "@/router/user_api";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom"

export default function () {
    const navigator = useNavigate();
    const { member, updateState } = useMemberContext();
    const [time_data, setTimeData] = useState(member);
    const { data } = useLoaderData<{ data: PremiumListItem[] }>();
    const [select_premium, setSelectPremim] = useState<PremiumListItem | null>(null);
    const [pay_data, setPlayData] = useState<PremiumSpay>({
        type: 'alipay',
        name: '',
        money: '',
        premiumId: 0
    });

    const [spay_data, setSpayData] = useState<PremiumSpayType | null>(null);
    async function getSpayData() {
        const res = await user_api_premium_spay(pay_data);
        setSpayData(res.data);
    };

    if (time_data) {
        return <div className="text-center mt-20">
            <Com_card>
                <div className="p-8 flex flex-col gap-1.5 items-start">
                    <label>
                        <span className="text-sm">订阅邮箱：</span>
                        <div className="inline py-1 time_data px-2 rounded-sm">
                            <span>{time_data.email}</span>
                        </div>
                    </label>
                    <label>
                        <span className="text-sm">到期时间：</span>
                        <div className="inline py-1 time_data px-2 number rounded-sm">
                            <span>{time_data.expireTime}</span>
                        </div>
                    </label>
                    <input className="px-8!" type="button" value="叠加订阅" onClick={() => setTimeData(null)} />
                </div>
            </Com_card>
        </div>
    }

    if (spay_data) {
        function endPay() {
            updateState(() => {
                navigator(categoryHomePath());
            });
        }

        return <div className="text-center pt-10 shouxie">
            <div>
                <span>手机使用</span>
                <img className="h-10 inline mx-2" src={`/pay/${pay_data.type}.svg`} />
                <span>扫码完成支付!</span>
            </div>
            <img width={150} height={150} className="theme_0 inline my-2" src={spay_data.img} />
            <div>
                <label>订单号:</label>
                <span>{spay_data.trade_no}</span>
            </div>
            <div>
                <label>消息:</label>
                <span>{spay_data.msg}</span>
            </div>
            {select_premium && <div>
                <label>描述:</label>
                <span>{select_premium?.priceLabel}</span>
            </div>}
            {select_premium && <div>
                <label>价格:</label>
                <span className="fong-bold text-red-500">{(Number(select_premium.price) - (Number(select_premium.price) * Number(select_premium.priceDiscount)))}元</span>
            </div>}
            <input className="px-8!" style={{ backgroundColor: 'var(--theme_1)' }} type="button" value="返回" onClick={() => setSpayData(null)} />
            <input className="px-8! ml-2" type="button" value="我已完成支付" onClick={() => endPay()} />
        </div>
    }


    return <div className="text-center pt-20">
        <div className="my-2 gap-4 flex justify-center cursor-pointer">
            {
                data && data.map((item, idx) => {
                    return <div key={idx} onClick={() => {
                        if (select_premium == null || select_premium.id != item.id) {
                            setSelectPremim(item)
                            setPlayData({ ...pay_data, premiumId: item.id, name: item.priceLabel, money: String((Number(item.price) - (Number(item.price) * Number(item.priceDiscount)))) })
                        } else {
                            setSelectPremim(null);
                        }
                    }}>
                        <div className={`transition ${item.id == select_premium?.id && '-translate-y-6'}`}>
                            <Com_card>
                                <div className={`p-4 px-8 text-center relative`} >
                                    <div className="text-sm opacity-50 text-balance line-through">原价:{item.price}元</div>
                                    <div className="text-xl font-bold relative">
                                        <span className="absolute -right-4 -top-1 rotate-12 text-sm theme_0 px-1 scale-80 rounded-sm">{item.priceDiscount}折</span>
                                        <span className="py-1 mr-1">{(Number(item.price) - (Number(item.price) * Number(item.priceDiscount)))}元</span>
                                    </div>
                                    <div className="text-sm">{item.priceLabel}</div>
                                    <div className=" -rotate-45 absolute -right-5 px-6 text-sm font-bold bg-red-500 shouxie"><span className="pl-4">{item.day}天</span></div>
                                </div>
                            </Com_card>
                        </div>
                    </div>
                })
            }
        </div>
        <div className="mb-2">
            {/* {JSON.stringify(pay_data)} */}
            <label className="shouxie`">选择你的支付方式：
                <div className="flex h-8 justify-center gap-2 mt-2">
                    {
                        ["alipay", "wxpay"].map(url => {
                            return <img key={url} className={`${url == pay_data.type ? "opacity-100" : " opacity-50"} h-full`} src={`/pay/${url}.svg`} />
                        })
                    }
                    <select className="shouxie"
                        disabled={select_premium == null}
                        value={pay_data.type}
                        onChange={(e) => {
                            setPlayData({ ...pay_data, type: e.currentTarget.value as any });
                        }}>
                        <option value="alipay">支付宝</option>
                        <option value="wxpay">微信</option>
                    </select>
                </div>
            </label>
        </div>
        <input disabled={select_premium == null} className="px-8!" type="button" value="发起订阅" onClick={getSpayData} />
    </div>
}