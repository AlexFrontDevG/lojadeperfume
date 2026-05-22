/* PEDIDO RANDOM */

const orderElement = document.getElementById("order-number");

const randomOrder = Math.floor(Math.random() * 900000) + 100000;

orderElement.innerHTML = `#ELX${randomOrder}`;

/* RECIBO */

function downloadReceipt(){

  const receipt = `
==========================
ÉLIXIR PARFUMS
==========================

Pedido: ${orderElement.innerHTML}

Status: Pagamento Confirmado

Entrega estimada:
3-7 dias úteis

Obrigado pela preferência.
==========================
`;

  const blob = new Blob([receipt], { type:'text/plain' });

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);

  link.download = 'recibo-elixir.txt';

  link.click();

}

window.downloadReceipt = downloadReceipt;