export default function (dom: Document) {
    const match = dom.body.textContent.match(/"url"\s*:\s*"([^"]+)"/) || '';
    if (!match) return null;
    return {
        url: decodeURIComponent(match[1])
    };
}