const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});


const date = new Date();
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear().toString();
const dateString = `${month}-${day}-${year}`;



const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao='${dateString}')?$format=json`;

const ptaxCompraElement = document.getElementById('ptax-compra');
const ptaxVendaElement = document.getElementById('ptax-venda');
const dataHoraElement = document.getElementById('data-hora');

ptaxCompraElement.innerText = 'Carregando...';
ptaxVendaElement.innerText = 'Carregando...';
dataHoraElement.innerText = 'Carregando...';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const ptaxCompraValue = data.value[0].cotacaoCompra.toFixed(4).replace('.', ',');
    const ptaxVendaValue = data.value[0].cotacaoVenda.toFixed(4).replace('.', ',');
    const dataHoraValue = new Date(data.value[0].dataHoraCotacao).toLocaleString();

    ptaxCompraElement.innerText = `R$ ${ptaxCompraValue}`;
    ptaxVendaElement.innerText = `R$ ${ptaxVendaValue}`;
    dataHoraElement.innerText = dataHoraValue;
  })
  .catch(error => console.log(error));
