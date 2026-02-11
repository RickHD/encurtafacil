function generateCode() {
    return Math.random().toString(36).substring(2, 7);
}

function shorten() {
    const input = document.getElementById("url");
    const result = document.getElementById("result");

    const url = input.value.trim();
    if (!url) return;

    const code = generateCode();

    const links = JSON.parse(localStorage.getItem("links") || "{}");
    links[code] = url;

    localStorage.setItem("links", JSON.stringify(links));

    const shortUrl = window.location.origin + window.location.pathname + "#" + code;

    result.innerHTML = `Link curto:<br><a href="${shortUrl}">${shortUrl}</a>`;
}

function redirect() {
    const code = window.location.hash.substring(1);
    if (!code) return;

    const links = JSON.parse(localStorage.getItem("links") || "{}");

    if (links[code]) {
        window.location.href = links[code];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", shorten);
    redirect();
});
