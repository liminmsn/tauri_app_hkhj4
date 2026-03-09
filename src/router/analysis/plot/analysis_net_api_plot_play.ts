export const play_data = { url: "", title: "", err: "" };
export default function (dom: Document) {
    console.log(dom);

    try {
        const match = dom.body.innerHTML.match(/"url"\s*:\s*"([^"]+)"/);
        if (!match) throw new Error("url not found");

        const raw = match[1];

        return {
            title: dom.title,
            url: encodeURI(decodeURIComponent(unescape(raw))),
            err: null
        };
    } catch (error) {
        return { url: null, title: null, err: error };
    }
}