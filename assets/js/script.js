/*************************************************
 * CONFIGURAÇÃO – AJUSTE PARA SEU NEGÓCIO
 *************************************************/

// Número de WhatsApp da Zélia Bordados
const WHATSAPP_NUMBER = "5582991201916"; 
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