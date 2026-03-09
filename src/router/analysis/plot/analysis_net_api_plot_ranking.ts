export const data_rank_onign = [
    {
        label: '标题',
        list: [
            {
                href: '',
                tit: '文本',
                score: '0.0'
            }
        ]
    }
]

export default function (dom: Document) {
    let data = data_rank_onign;
    const rank = dom.querySelector('.ui-cnt.fn-clear');
    if (rank) {
        const list = Array.from(rank.children).map(item => {
            return {
                label: item.children[0].textContent,
                list: Array.from(item.children[1].children).map(li => {
                    const a = li.children[0];
                    return {
                        href: a.getAttribute('href'),
                        tit: a.querySelector('.tit')?.textContent,
                        score: a.querySelector('.score')?.textContent
                    }
                })
            }
        });
        return list;
    }

    return data;
}