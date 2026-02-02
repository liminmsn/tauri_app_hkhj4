export const data_home_onign = {
    grup: [{ label: '', url: '' }],
    cardList: [{
        img: '', url: '',
        info: {
            title: '',
            fen: '',
            ul: [''],
            desc2: ''
        }
    }],
    itemList: [{ img: '', info: '', url: '', label: '' }]
}

export default function (dom: Document) {
    const data = data_home_onign;

    const grup = dom.querySelectorAll('li[class*="=0"]');
    data.grup = Array.from(grup).map(item => {
        const a = item.children[0];
        return {
            label: a.textContent,
            url: a.getAttribute('href') || 'null'
        }
    });
    const cardList = dom.querySelector('.channel-silder-cnt')?.children;
    if (cardList) {
        data.cardList = Array.from(cardList).map(li => {
            return {
                img: li.children[0].children[0].getAttribute('src') || '',
                url: li.children[0].getAttribute('href') || '',
                info: {
                    title: li.querySelector('.channel-silder-title>h2')?.textContent || '',
                    fen: li.querySelector('.channel-silder-title>span>i')?.textContent || '',
                    ul: Array.from(li.querySelectorAll('.channel-silder-info li')).map(li => {
                        return li.childNodes[1].textContent || '未知'
                    }) || [],
                    desc2: li.querySelector('.channel-silder-desc2>span')?.textContent || '',
                }
            }
        })
    }

    const itemList = dom.querySelectorAll('.img-list.dis')[0].children;
    if (itemList) {
        data.itemList = Array.from(itemList).map(li => {
            const a = li.children[0];
            return {
                img: a.children[0].getAttribute('src') || '',
                url: a.getAttribute('href') || '',
                info: a.children[2].textContent || '',
                label: a.children[1].textContent || ''
            }
        });
    }
    return data;
}