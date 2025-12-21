/*************************************************
 * LÓGICA DA GALERIA - ZÉLIA BORDADOS
 * Inclui: Lightbox, Carrinho e Checkout WhatsApp
 *************************************************/

(function initGaleriaLogic() {
  const WHATSAPP_NUMBER = "5582999362458";
  let carrinho = [];

  // ===== 1. LIGHTBOX (Ampliar Fotos) =====
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const imgAmpliada = document.getElementById("img-ampliada");
    const closeBtn = document.querySelector(".close-lightbox");

    document.querySelectorAll(".img-expand").forEach(img => {
      img.onclick = function() {
        lightbox.style.display = "flex";
        imgAmpliada.src = this.src;
        document.body.style.overflow = "hidden"; // Trava scroll
      }
    });

    closeBtn.onclick = () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    };

    lightbox.onclick = (e) => {
      if (e.target === lightbox) closeBtn.onclick();
    };
  }

  // ===== 2. CONTROLE DE QUANTIDADE NOS CARDS =====
  function initQuantityControls() {
    document.querySelectorAll('.card').forEach(card => {
      const btnDec = card.querySelector('.dec');
      const btnInc = card.querySelector('.inc');
      const qtyNum = card.querySelector('.qty-num');
      const btnAdd = card.querySelector('.btn-add-cart');

      btnDec.onclick = () => {
        let val = parseInt(qtyNum.innerText);
        if (val > 1) qtyNum.innerText = val - 1;
      };

      btnInc.onclick = () => {
        let val = parseInt(qtyNum.innerText);
        qtyNum.innerText = val + 1;
      };

      btnAdd.onclick = () => {
        const item = {
          id: card.dataset.id,
          nome: card.dataset.name,
          preco: parseFloat(card.dataset.price),
          qtd: parseInt(qtyNum.innerText)
        };
        adicionarAoCarrinho(item);
        qtyNum.innerText = "1"; // Reseta após add
      };
    });
  }

  // ===== 3. LÓGICA DO CARRINHO =====
  function adicionarAoCarrinho(item) {
    const index = carrinho.findIndex(c => c.id === item.id);
    if (index > -1) {
      carrinho[index].qtd += item.qtd;
    } else {
      carrinho.push(item);
    }
    atualizarBadge();
    alert(`✅ ${item.nome} adicionado ao carrinho!`);
  }

  function atualizarBadge() {
    const count = carrinho.reduce((acc, curr) => acc + curr.qtd, 0);
    document.getElementById('cart-count').innerText = count;
  }

  function renderCarrinho() {
    const lista = document.getElementById('lista-pedido');
    const totalMsg = document.getElementById('valor-total');
    lista.innerHTML = "";
    let totalGeral = 0;

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.qtd;
      totalGeral += subtotal;
      lista.innerHTML += `
        <div class="item-linha">
          <span>${item.qtd}x ${item.nome}</span>
          <span>R$ ${subtotal.toFixed(2)} <i class="fa-solid fa-trash" style="color:#e74c3c; cursor:pointer" onclick="removerItem(${index})"></i></span>
        </div>
      `;
    });

    totalMsg.innerText = `R$ ${totalGeral.toFixed(2)}`;
  }

  window.removerItem = (index) => {
    carrinho.splice(index, 1);
    renderCarrinho();
    atualizarBadge();
    if(carrinho.length === 0) document.getElementById('close-modal').click();
  };

  // ===== 4. MODAL E FINALIZAÇÃO =====
  const modal = document.getElementById('modal-checkout');
  
  document.getElementById('btn-abrir-carrinho').onclick = () => {
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");
    renderCarrinho();
    modal.style.display = 'flex';
  };

  document.getElementById('close-modal').onclick = () => modal.style.display = 'none';

  document.getElementById('cust-entrega').onchange = function() {
    document.getElementById('group-endereco').style.display = this.value === "Entrega" ? "block" : "none";
  };

  document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('cust-nome').value;
    const entrega = document.getElementById('cust-entrega').value;
    const endereco = document.getElementById('cust-endereco').value;
    const pagamento = document.getElementById('cust-pagamento').value;

    let mensagem = `*PEDIDO - ZÉLIA BORDADOS*\n\n`;
    mensagem += `*Cliente:* ${nome}\n`;
    mensagem += `*Entrega:* ${entrega}\n`;
    if(entrega === "Entrega") mensagem += `*Endereço:* ${endereco}\n`;
    mensagem += `*Pagamento:* ${pagamento}\n\n`;
    mensagem += `*ITENS:*\n`;

    let totalGeral = 0;
    carrinho.forEach(item => {
      mensagem += `• ${item.qtd}x ${item.nome} (R$ ${(item.preco * item.qtd).toFixed(2)})\n`;
      totalGeral += item.preco * item.qtd;
    });

    mensagem += `\n*TOTAL: R$ ${totalGeral.toFixed(2)}*`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initQuantityControls();
    
    // Smooth scroll para links existentes
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
})();