export const data_detail_onign = {
    info: {
        title: '',
        img: '',
        pingfen: '',
        desc: [{ o: '', t: '' }]
    },
    desc: '',
    play_list: [[{ label: '', url: '' }]],
    playlist_1: [{ label: '', url: '' }],
    playlist_2: [{ label: '', url: '' }],
    playother_1: [{ img: '', info: '', info2: '', url: '', label: '' }],
    playother_2: [{ img: '', info: '', info2: '', url: '', label: '' }]
}

export default function (dom: Document) {
    const data = data_detail_onign;
    const head = dom.querySelector('.myui-panel.active.col-pd.clearfix');


    const a_img = head?.querySelector('.myui-content__thumb')?.children[0]; //左边
    const detail = head?.querySelector('.myui-content__detail');//右边
    const lbal_arr = Array.from(detail?.querySelectorAll('.data') || []);
    data.info = {
        title: a_img?.getAttribute('title') || '',
        img: a_img?.querySelector('img')?.getAttribute('src') || '',
        pingfen: detail?.querySelector('#rating')?.textContent?.replaceAll('：', ':') || '未知',
        desc: [
            {
                o: lbal_arr[0].children[0].textContent || '',
                t: lbal_arr[0].childNodes[1].textContent || ''
            },
            {
                o: lbal_arr[1].children[0].textContent || '',
                t: lbal_arr[1].children[1].textContent || ''
            },
            {
                o: lbal_arr[2].children[0].textContent || '',
                t: lbal_arr[2].children[1].textContent || ''
            },
            {
                o: lbal_arr[3].children[0].textContent || '',
                t: Array.from(lbal_arr[3].children).filter((_item, idx) => { return idx > 0 }).map(item => item.textContent).join("、") || ''
            },
            {
                o: lbal_arr[4].children[0].textContent || '',
                t: lbal_arr[4].childNodes[2].textContent || ''
            },
            {
                o: lbal_arr[5].children[0].textContent || '',
                t: lbal_arr[5].childNodes[2].textContent || ''
            },
            {
                o: detail?.querySelector('.desc.hidden-xs')?.children[0].textContent || '',
                t: detail?.querySelector('.desc.hidden-xs')?.childNodes[2].textContent || ''
            },
        ]
    }
    data.desc = lbal_arr[5].innerHTML || '暂无';
    data.play_list = Array.from(dom.querySelector(".tab-content.myui-panel_bd")?.querySelectorAll("ul") || [])
        .map(ul => {
            return Array.from(ul.querySelectorAll('a')).map(item => {
                return {
                    label: item.textContent || '',
                    url: item.getAttribute('href') || ''
                }
            });
        });


    // data.playlist_1 = Array.from(dom.querySelector('#playlist1')?.querySelectorAll('a') || []).map(item => {
    //     return {
    //         label: item.textContent || '',
    //         url: item.getAttribute('href') || ''
    //     }
    // });
    // data.playlist_2 = Array.from(dom.querySelector('#playlist2')?.querySelectorAll('a') || []).map(item => {
    //     return {
    //         label: item.textContent || '',
    //         url: item.getAttribute('href') || ''
    //     }
    // });

    // 推荐
    const other_lsit = Array.from(dom.querySelectorAll(".tab-content.myui-panel_bd"));
    // console.log(other_lsit);
    data.playother_1 = Array.from(other_lsit[1]?.querySelectorAll(".myui-vodlist__box") || []).map(item => {
        const regex = /background:\s*url\(\s*["']?([^"')]+)["']?\s*\)/i; //匹配url
        const match_url = item.querySelector('.myui-vodlist__thumb')?.outerHTML.match(regex);
        return {
            label: item.querySelector('.myui-vodlist__thumb')?.getAttribute('title') || '',
            url: item.querySelector('.myui-vodlist__thumb')?.getAttribute('href') || '',
            img: match_url && String("https:").concat(match_url[1]) || '',
            info: item.querySelector('.pic-tag.pic-tag-top')?.textContent?.replaceAll(" ", "")?.replace("\n", "") || '',
            info2: Array.from(item.querySelector('.myui-vodlist__detail')?.children[1].children || []).map(item => item.textContent).join("、")
        }
    })
    data.playother_2 = Array.from(other_lsit[2]?.querySelectorAll(".myui-vodlist__box") || []).map(item => {
        const regex = /background:\s*url\(\s*["']?([^"')]+)["']?\s*\)/i; //匹配url
        const match_url = item.querySelector('.myui-vodlist__thumb')?.outerHTML.match(regex);
        return {
            label: item.querySelector('.myui-vodlist__thumb')?.getAttribute('title') || '',
            url: item.querySelector('.myui-vodlist__thumb')?.getAttribute('href') || '',
            img: match_url && String("https:").concat(match_url[1]) || '',
            info: item.querySelector('.pic-tag.pic-tag-top')?.textContent?.replaceAll(" ", "")?.replace("\n", "") || '',
            info2: Array.from(item.querySelector('.myui-vodlist__detail')?.children[1].children || []).map(item => item.textContent).join("、")
        }
    })

    // console.log(data);

    return data;
}