export const data_year_onign = {
    itemList: [{ img: '', info: '', url: '', label: '' }]
}

export default function (dom: Document) {
    const data = data_year_onign;

    const itemList = dom.querySelectorAll('.box_con .img-list a');
    if (itemList) {
        data.itemList = Array.from(itemList).map(a => {
            return {
                url: a.getAttribute('href') || '',
                img: a.children[0].getAttribute('src') || '',
                label: a.children[1].textContent || '',
                info: a.children[3].textContent || '',
                info2: a.children[2].textContent || '',
            }
        });
    }
    return data;
}