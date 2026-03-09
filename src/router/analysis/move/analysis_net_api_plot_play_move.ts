export const play_data = { url: "", title: "", err: "" };
export default function (dom: Document) {
    try {
        const js_label = dom.querySelector('.myui-player__box.player-fixed .embed-responsive')?.children[0].innerHTML!;
        const play_url = new Function(`${js_label}return cms_player["url"];`)();
        console.log(play_url);
        return {
            title: dom.title,
            url: play_url,
            err: null
        };

    } catch (error) {
        return { url: null, title: null, err: error };
    }
}