/*************************************************
 * LÓGICA DA GALERIA - ZÉLIA BORDADOS
 * Inclui: Rolar até a seção e botão de orçamento por item
 *************************************************/

(function initGaleriaLogic() {
  const WHATSAPP_NUMBER = "5582991201916";

  // ===== Rolar suavemente para as Seções da Galeria =====
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Atualizar classe ativa
          document.querySelectorAll('.main-nav .nav-link').forEach(n => n.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
  }

  // ===== Botão "Solicitar Orçamento" por Item =====
  function initItemBudgetButtons() {
    const itemButtons = document.querySelectorAll('.btn-orcamento-item');

    itemButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-item');
        
        if (!itemName) {
            console.error('Nome do item não encontrado no botão.');
            return;
        }

        // Mensagem customizada para o WhatsApp
        const message = encodeURIComponent(`Olá Zélia, gostaria de um orçamento para o item: *${itemName}*. Poderia me ajudar?`);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        window.open(whatsappUrl, '_blank');
      });
    });
  }

  // Inicializa as funções ao carregar o DOM
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initItemBudgetButtons();

    // Seta o primeiro link como ativo por padrão na carga
    const firstLink = document.querySelector('.main-nav .nav-link');
    if (firstLink) firstLink.classList.add('active');
  });

})();