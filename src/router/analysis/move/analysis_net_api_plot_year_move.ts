export const data_year_onign = {
    page: [{ label: '', url: '', disabled: false }],
    itemList: [{ img: '', info: '', url: '', label: '' }]
}

export default function (dom: Document) {
    const data = data_year_onign;

    data.page = Array.from(dom.querySelector(".myui-page")?.querySelectorAll("li") || []).map(li => {
        const a = li.children[0];
        return {
            disabled: li.classList.contains('disabled') || false,
            label: a.textContent || '',
            url: String("/").concat(a.getAttribute('href') || '')
        }
    })

    const itemList = dom.querySelectorAll('.myui-vodlist__box');
    if (itemList) {
        data.itemList = Array.from(itemList).map(item => {
            const regex = /background:\s*url\(\s*["']?([^"')]+)["']?\s*\)/i; //匹配url
            const match_url = item.querySelector('.myui-vodlist__thumb')?.outerHTML.match(regex);
            return {
                label: item.querySelector('.myui-vodlist__thumb')?.getAttribute('title') || '',
                url: item.querySelector('.myui-vodlist__thumb')?.getAttribute('href') || '',
                img: match_url && String("https:").concat(match_url[1]) || '',
                info: item.querySelector('.pic-tag.pic-tag-top')?.textContent || '',
                info2: Array.from(item.querySelector('.myui-vodlist__detail')?.querySelector('p')?.children || []).map(item => item.textContent).join("、")
            }
        });
    }
    return data;
}