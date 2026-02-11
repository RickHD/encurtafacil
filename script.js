function encurtar() {
  const input = document.getElementById("urlInput").value;

  if (!input) return;

  // Simulação (troque depois pela API real)
  const slug = Math.random().toString(36).substring(2, 8);
  const shortUrl = `https://encurtafacil.encurtafacil.workers.dev/${slug}`;

  const resultado = document.getElementById("resultado");

  resultado.innerHTML = `
    <div>
      <p>Link encurtado:</p>
      <span class="short-link" onclick="copiar('${shortUrl}')">
        ${shortUrl}
      </span>
    </div>
  `;
}

function copiar(texto) {
  navigator.clipboard.writeText(texto);

  const toast = document.getElementById("toast");

  toast.classList.remove("hide");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 1800);
}
