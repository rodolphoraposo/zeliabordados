/*************************************************
 * CONFIGURAÇÃO – AJUSTE PARA SEU NEGÓCIO
 *************************************************/

// Número de WhatsApp da Zélia Bordados
const WHATSAPP_NUMBER = "5582994336126"; 
// A chave PIX não se aplica ao link-tree principal, mantida apenas por referência
const PIX_KEY = ""; 

/*************************************************
 * FUNÇÕES PRINCIPAIS (APENAS WHATSAPP)
 *************************************************/

// Apenas para garantir que o link do WhatsApp na Home esteja configurado
(function initWhatsapp() {
  const whatsappLink = document.querySelector('a[aria-label="WhatsApp"]');
  if (whatsappLink && WHATSAPP_NUMBER) {
    // O link já está definido no HTML com a mensagem padrão de orçamento.
    // Esta função serve apenas para garantia/compatibilidade futura.
  }
})();

// O restante das funções de carrinho (PRECO_PIZZA, SABORES, addToCart, etc.) 
// não se aplicam e foram removidas/vazadas, deixando apenas a parte de configuração
// essencial para um Link-Tree.
// As funções relacionadas ao Cardápio/Menu (load, renderList, etc.) também foram removidas.

// ===== Auto-adicionar PROMO (REMOVIDO, POIS NÃO SE APLICA) =====
// O sistema de promoções foi desativado/removido na arquitetura de bordados.

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.querySelector('.main-content');
    
    // Tempo que a logo ficará visível (2.5 segundos)
    const splashDuration = 2500; 

    setTimeout(() => {
        // Inicia o fade-out (opacidade 0)
        splashScreen.classList.add('fade-out');

        splashScreen.addEventListener('transitionend', () => {
            // Remove o display da tela de splash após a transição
            splashScreen.style.display = 'none';
        }, { once: true });
        
        // Garante que o conteúdo principal apareça (opacidade 1)
        // O pequeno atraso (550ms) garante que o main-content comece a aparecer 
        // um pouco depois que a tela de splash começa a sumir.
        setTimeout(() => {
            mainContent.classList.add('loaded');
        }, 550); 
    }, splashDuration);
});