import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom"

export default function () {
    const loader = useLoaderData();
    useEffect(() => {
        console.log(loader);
        
    }, [])

    return <div className="h-full overflow-y-auto p-2">
        <div className="py-4 pb-6 px-4 h-2/5 shadow-sm rounded-sm flex text_1" style={{ backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%", backgroundImage: 'url("/test/bg.svg")', backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <div className="h-full flex-1 mr-6 flex">
                <img className="h-full mr-6" src="/test/tp.png" alt="" />
                <div className="flex flex-col">
                    <p className="text-2xl">无法抗拒的他</p>
                    <p className="my-2 text-right text-2xl"><span className=" text-amber-300 mr-1 font-bold">9.2</span>分</p>
                    <p>主演：李政宰,朴海秀,孔刘,许成泰,魏化俊,更多.</p>
                    <div className="grid grid-cols-2 grid-rows-2 my-2">
                        <span>类型：韩版中文字幕</span>
                        <span>导演：aa</span>
                        <span>地区：韩国</span>
                        <span>年份：2026</span>
                    </div>
                    <p>剧情：15岁的李秀妍因被贴上“杀人犯女儿”的标签后在学校被孤立，总是缩着肩低着头行走。直到遇到愿意和自己当朋友的韩正宇一切才变得不一样。一个雨天，正宇被绑架了，前去营救的秀妍也一起被带走。有着贩毒和强奸犯前......</p>
                </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-1">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                        return <img key={item} className="h-full" src="/test/tp.png" alt="" />
                    })
                }
            </div>
        </div>
        <p className="inline-block theme_0 p-1 px-2 my-2 rounded-md shadow-sm">
            <Icon icon="line-md:thumbs-up-twotone" className="inline" />
            <span>连载更新</span>
        </p>
        <div className="grid gap-2 grid-cols-5">
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                    return <div key={item} className=" rounded-sm shadow-sm overflow-hidden cursor-pointer">
                        {/* <div className="h-2 theme_0"></div> */}
                        <img src="/test/tp.png" className="theme_0" />
                        <div className="text-center label_bg">
                            <span className=" text-sm">hahaha</span>
                        </div>
                        <div className="h-4 theme_0"></div>
                    </div>
                })
            }
        </div>
    </div>
}

