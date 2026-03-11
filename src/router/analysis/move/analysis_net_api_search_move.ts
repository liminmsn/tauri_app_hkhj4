export const data_move_search_onign = {
    page: [{ label: '', url: '', disabled: false }],
    itemList: [{ img: '', info: '', info2: '', url: '', label: '' }]
}

export default function (dom: Document) {
    let data = data_move_search_onign;
    data.page = Array.from(dom.querySelector(".myui-page")?.querySelectorAll("li") || []).map(li => {
        const a = li.children[0];
        return {
            disabled: li.classList.contains('disabled') || false,
            label: a.textContent || '',
            url: a.getAttribute('href') || ''
        }
    })
    data.itemList = Array.from(dom.querySelector(".myui-vodlist__media.clearfix")?.querySelectorAll("li") || []).map(li => {
        return {
            img: li.querySelector('.myui-vodlist__thumb')?.getAttribute('data-original') || '',
            label: li.querySelector('.detail .title a')?.textContent || '',
            url: li.querySelector('.detail .title a')?.getAttribute('href') || '',
            info: li.querySelector('.thumb .pic-text.text-right')?.textContent || '',
            info2: li.querySelectorAll('.detail p')[1].textContent || ''
        }
    })

    console.log(data);
    return data;
}