export const data_move_home_onign = {
    grup: [{ label: '', url: '' }],
    cardList: [
        {
            title: '',
            itemList: [{ img: '', info: '', url: '', label: '' }]
        }
    ]
}

export default function (document: Document) {
    let data = data_move_home_onign;
    data.grup = Array.from(document.querySelector(".myui-screen__list.nav-slide.clearfix")?.querySelectorAll(".btn") || []).filter(item => item.getAttribute('href')).map(a => {
        return {
            label: a.textContent || '',
            url: a.getAttribute('href') || ''
        }
    })

    data.cardList = Array.from(document.querySelectorAll(".myui-panel.myui-panel-bg.clearfix")).map(item => {
        const temp1 = item.children[0];
        return {
            title: temp1.querySelector('.title')?.textContent?.replaceAll("\n", "")?.replaceAll(" ", "") || '',
            itemList: Array.from(temp1.querySelectorAll(".myui-vodlist__box")).map(item => {
                const regex = /background:\s*url\(\s*["']?([^"')]+)["']?\s*\)/i; //匹配url
                const match_url = item.querySelector('.myui-vodlist__thumb')?.outerHTML.match(regex);
                return {
                    label: item.querySelector('.myui-vodlist__thumb')?.getAttribute('title') || '',
                    url: item.querySelector('.myui-vodlist__thumb')?.getAttribute('href') || '',
                    img: match_url && String("https:").concat(match_url[1]) || '',
                    info: item.querySelector('.pic-tag.pic-tag-top')?.textContent || '',
                    info2: Array.from(item.querySelector('.myui-vodlist__detail')?.querySelector('p')?.children || []).map(item => item.textContent).join("、")
                }
            })
        }
    })
    return data;
}