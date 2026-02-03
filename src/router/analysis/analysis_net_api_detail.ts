export const data_detail_onign = {
    info: {
        title: '',
        img: '',
        pingfen: '',
        desc: [{ o: '', t: '' }]
    },
    desc: '',
    playlist_1: [{ label: '', url: '' }],
    playlist_2: [{ label: '', url: '' }],
    playother_1: [{ img: '', info: '', info2: '', url: '', label: '' }],
    playother_2: [{ img: '', info: '', info2: '', url: '', label: '' }]
}

export default function (dom: Document) {
    const data = data_detail_onign;
    const head = dom.querySelector('.detail-cols.fn-clear');
    data.info = {
        title: head?.querySelector('.detail-title.fn-clear h1')?.textContent || '',
        img: head?.querySelector('img')?.getAttribute('src') || '',
        pingfen: dom?.querySelector('#pingfen')?.textContent || '未知',
        desc: Array.from(head?.querySelector('.info.fn-clear')?.querySelectorAll('.nyzhuy') || []).map(item => {
            return {
                o: item.querySelector('dt')?.textContent || '',
                t: item.querySelector('dd')?.textContent || ''
            }
        })
    }
    data.desc = dom.querySelector('.tjuqing')?.textContent || '暂无';
    data.playlist_1 = Array.from(dom.querySelector('#playlist_1')?.querySelectorAll('a') || []).map(item => {
        return {
            label: item.textContent || '',
            url: item.getAttribute('href') || ''
        }
    });
    data.playlist_2 = Array.from(dom.querySelector('#playlist_2')?.querySelectorAll('a') || []).map(item => {
        return {
            label: item.textContent || '',
            url: item.getAttribute('href') || ''
        }
    });

    data.playother_1 = Array.from(dom.querySelectorAll('.img-list.dis .lianzai-img')).map(item => {
        return {
            url: item.getAttribute('href') || '',
            img: item.children[0].getAttribute('src') || '',
            label: item.querySelector('h2')?.textContent || '',
            info: item.querySelector('i')?.textContent || '',
            info2: item.querySelector('p')?.textContent || ''
        }
    })
    data.playother_2 = Array.from(dom.querySelectorAll('.silder-cnt2 .img-list2 li')).map(item => {
        const a = item.children[0];
        return {
            url: a.getAttribute('href') || '',
            img: a.children[0].getAttribute('src') || '',
            label: item.querySelector('h5')?.textContent || '',
            info: item.querySelector('.text2')?.textContent || '',
            info2: item.querySelector('.time2')?.textContent || '',
        }
    })


    return data;
}