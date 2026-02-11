console.log("JS carregou");

function generateCode() {
    return Math.random().toString(36).substring(2, 7);
}

function shorten() {
    console.log("Botão clicado");

    const input = document.getElementById("url");
    const result = document.getElementById("result");

    if (!input || !result) {
        console.log("Elemento não encontrado");
        return;
    }

    const url = input.value.trim();
    if (!url) {
        console.log("URL vazia");
        return;
    }

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
    console.log("DOM pronto");

    const btn = document.getElementById("btn");

    if (!btn) {
        console.log("Botão não encontrado");
        return;
    }

    btn.addEventListener("click", shorten);
    redirect();
});
