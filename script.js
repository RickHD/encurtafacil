const btn = document.getElementById("btnEncurtar");
btn.addEventListener("click", encurtar);

async function encurtar() {
  const input = document.getElementById("urlInput").value.trim();
  if (!input) return;

  const resultado = document.getElementById("resultado");
  btn.disabled = true; // desabilita botão

  // Feedback visual de loading
  resultado.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <span>Gerando link...</span>
    </div>
  `;

  try {
    const response = await fetch("https://encurtafacil.encurtafacil.workers.dev/encurtar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: input }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultado.innerHTML = `<p class="error">Erro ao encurtar link: ${data.error || "desconhecido"}</p>`;
      return;
    }

    const shortUrl = data.shortUrl;

    resultado.innerHTML = `
      <div>
        <p>Link encurtado:</p>
        <a href="${shortUrl}" target="_blank" class="short-link">${shortUrl}</a>
        <button onclick="copiar('${shortUrl}')">Copiar</button>
      </div>
    `;

    document.getElementById("urlInput").value = ""; // limpa input
  } catch (e) {
    resultado.innerHTML = `<p class="error">Erro de conexão</p>`;
  } finally {
    btn.disabled = false; // reabilita botão
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
