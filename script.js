async function encurtar() {
  const input = document.getElementById("urlInput").value;

  if (!input) return;

  const resultado = document.getElementById("resultado");

  try {
    const response = await fetch("https://encurtafacil.encurtafacil.workers.dev/encurtar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: input }),
    });

    const data = await response.json();

    if (!response.ok) {
      resultado.innerHTML = `<p>Erro ao encurtar link</p>`;
      return;
    }

    const shortUrl = data.short;

    resultado.innerHTML = `
      <div>
        <p>Link encurtado:</p>
        <span class="short-link" onclick="copiar('${shortUrl}')">
          ${shortUrl}
        </span>
      </div>
    `;
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
