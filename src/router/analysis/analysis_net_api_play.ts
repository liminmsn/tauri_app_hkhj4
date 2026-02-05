export default function (dom: Document) {
    try {
        const match = dom.body.innerHTML.match(/"url"\s*:\s*"([^"]+)"/);
        if (!match) throw new Error("url not found");

        const raw = match[1];

        return {
            url: encodeURI(decodeURIComponent(unescape(raw))),
            err: null
        };
    } catch (error) {
        return { url: "", err: error };
    }
}