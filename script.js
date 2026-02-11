async function encurtar() {
  const input = document.getElementById("urlInput").value.trim();
  if (!input) return;

  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `<p>Gerando link...</p>`;

  try {
    const response = await fetch("https://encurtafacil.encurtafacil.workers.dev/encurtar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: input }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultado.innerHTML = `<p>Erro ao encurtar link: ${data.error || "desconhecido"}</p>`;
      return;
    }

    const shortUrl = data.shortUrl;

    resultado.innerHTML = `
      <div>
        <p>Link encurtado:</p>
        <a href="${shortUrl}" target="_blank" class="short-link">
          ${shortUrl}
        </a>
        <button onclick="copiar('${shortUrl}')">Copiar</button>
      </div>
    `;

    document.getElementById("urlInput").value = ""; // limpa o input
  } catch (e) {
    resultado.innerHTML = `<p>Erro de conexão</p>`;
  }
}

async function copiar(texto) {
  await navigator.clipboard.writeText(texto);

  const toast = document.getElementById("toast");
  toast.classList.remove("hide");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 1800);
}
