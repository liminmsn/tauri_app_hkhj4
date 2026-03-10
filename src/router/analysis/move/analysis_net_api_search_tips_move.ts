export const data_move_search_tips_onign = {
    title: '热门搜索',
    host_list: [
        {
            label: '',
            url: ''
        }
    ]
}

export default function (document: Document) {
    let data = data_move_search_tips_onign;
    data.host_list = Array.from(document.querySelectorAll(".search-dropdown-hot a") || []).map(a => {
        return {
            label: a.getAttribute('title') || '',
            url: a.getAttribute('href') || ''
        }
    });
    return data;
}