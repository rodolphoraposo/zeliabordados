(function initGaleriaLogic() {
  const WHATSAPP_NUMBER = "5582999362458";
  let carrinho = [];

  /* ===== LIGHTBOX ===== */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const imgAmpliada = document.getElementById("img-ampliada");
    const closeBtn = document.querySelector(".close-lightbox");

    document.querySelectorAll(".img-expand").forEach(img => {
      img.onclick = () => {
        lightbox.style.display = "flex";
        imgAmpliada.src = img.src;
        document.body.classList.add("modal-open");
      };
    });

    closeBtn.onclick = () => {
      lightbox.style.display = "none";
      document.body.classList.remove("modal-open");
    };

    lightbox.onclick = e => {
      if (e.target === lightbox) closeBtn.onclick();
    };
  }

  /* ===== QUANTIDADE ===== */
  function initQuantityControls() {
    document.querySelectorAll('.card').forEach(card => {
      const dec = card.querySelector('.dec');
      const inc = card.querySelector('.inc');
      const num = card.querySelector('.qty-num');

      dec.onclick = () => num.textContent = Math.max(1, +num.textContent - 1);
      inc.onclick = () => num.textContent = +num.textContent + 1;

      card.querySelector('.btn-add-cart').onclick = () => {
        addToCart(
          card.dataset.id,
          card.dataset.name,
          +card.dataset.price,
          +num.textContent
        );
        num.textContent = 1;
      };
    });
  }

  /* ===== CARRINHO ===== */
  function addToCart(id, nome, preco, qtd) {
    const item = carrinho.find(i => i.id === id);
    item ? item.qtd += qtd : carrinho.push({ id, nome, preco, qtd });
    renderCart();
  }

  function removeFromCart(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    renderCart();
  }

  function renderCart() {
    const lista = document.getElementById('lista-pedido');
    const totalEl = document.getElementById('valor-total');
    const countEl = document.getElementById('cart-count');

    lista.innerHTML = "";
    let total = 0;
    let count = 0;

    carrinho.forEach(item => {
      total += item.preco * item.qtd;
      count += item.qtd;

      lista.innerHTML += `
        <div class="pedido-item">
          <div class="info">
            <strong>${item.qtd}x ${item.nome}</strong>
            <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
          </div>
          <button class="btn-remove" data-id="${item.id}">&times;</button>
        </div>
      `;
    });

    totalEl.textContent = `R$ ${total.toFixed(2)}`;
    countEl.textContent = count;

    document.querySelectorAll('.btn-remove').forEach(btn =>
      btn.onclick = () => removeFromCart(btn.dataset.id)
    );
  }

  /* ===== MODAL ===== */
  const modal = document.getElementById('modal-checkout');
  document.getElementById('btn-abrir-carrinho').onclick = () => {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  };

  document.getElementById('close-modal').onclick = () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  };

  document.getElementById('cust-entrega').onchange = e => {
    const group = document.getElementById('group-endereco');
    const input = document.getElementById('cust-endereco');
    group.style.display = e.target.value === "Entrega" ? "block" : "none";
    e.target.value === "Entrega"
      ? input.setAttribute("required", true)
      : input.removeAttribute("required");
  };

  /* ===== WHATSAPP ===== */
  document.getElementById('checkout-form').onsubmit = e => {
    e.preventDefault();
    if (!carrinho.length) return alert("Carrinho vazio!");

    let msg = "*PEDIDO – ZÉLIA BORDADOS*\n\n";
    carrinho.forEach(i =>
      msg += `• ${i.qtd}x ${i.nome} (R$ ${(i.preco * i.qtd).toFixed(2)})\n`
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  document.addEventListener("DOMContentLoaded", () => {
    initLightbox();
    initQuantityControls();
  });
})();
