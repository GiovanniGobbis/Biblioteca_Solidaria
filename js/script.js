// script.js - versão final Entrega III
document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     1. Atualiza automaticamente o ano no rodapé
  ======================================================= */
  document.querySelectorAll("[id^='year']").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* =======================================================
     2. Menu hambúrguer responsivo
  ======================================================= */
  document.querySelectorAll(".nav-toggle").forEach(btn => {
    btn.addEventListener("click", function () {
      const nav = this.nextElementSibling;
      nav.classList.toggle("active");
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
    });
  });

  /* =======================================================
     3. Máscaras de campos (CPF, Telefone, CEP)
  ======================================================= */
  function maskCPF(v) {
    return v
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }
  function maskPhone(v) {
    return v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }
  function maskCEP(v) {
    return v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
  }

  document.addEventListener("input", function (e) {
    if (e.target.id === "cpf") e.target.value = maskCPF(e.target.value);
    if (e.target.id === "telefone") e.target.value = maskPhone(e.target.value);
    if (e.target.id === "cep") e.target.value = maskCEP(e.target.value);
  });

  /* =======================================================
     4. Validação + Armazenamento local do formulário
  ======================================================= */
  const form = document.getElementById("cadastroForm");
  const feedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        if (feedback) {
          feedback.textContent = "⚠️ Por favor, corrija os campos obrigatórios.";
          feedback.className = "alert error";
          feedback.style.color = "red";
          feedback.classList.remove("hidden");
        }
        return;
      }

      // Pega dados e salva no localStorage
      const dados = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem("cadastroUsuario", JSON.stringify(dados));

      if (feedback) {
        feedback.textContent = "✅ Cadastro enviado e salvo com sucesso!";
        feedback.className = "alert success";
        feedback.style.color = "green";
        feedback.classList.remove("hidden");
      }

      form.reset();
    });

    // Mostra dados salvos se existirem
    const dadosSalvos = localStorage.getItem("cadastroUsuario");
    if (dadosSalvos) {
      console.log("Dados salvos do usuário:", JSON.parse(dadosSalvos));
    }
  }

  /* =======================================================
     5. SPA Simples — Carrega páginas sem recarregar
  ======================================================= */
  const main = document.querySelector("main");
  const links = document.querySelectorAll("a[href$='.html']");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const destino = link.getAttribute("href");
      if (destino !== "index.html" && main) {
        e.preventDefault();
        fetch(destino)
          .then(resp => resp.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const novoMain = doc.querySelector("main");
            if (novoMain) {
              main.innerHTML = novoMain.innerHTML;
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          })
          .catch(() => console.error("Erro ao carregar a página SPA."));
      }
    });
  });

});
