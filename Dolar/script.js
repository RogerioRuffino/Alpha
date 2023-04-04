const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});


const urlBase = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata';
const endpoint = '/CotacaoDolarDia';
const formato = '?$format=json';
const cotacaoDiv = document.getElementById('cotacao');
const dataInput = document.getElementById('data-input');
const buscarButton = document.getElementById('buscar-button');
const tabelaCotacoes = document.getElementById('tabela-cotacoes').getElementsByTagName('tbody')[0];

// array para armazenar as cotações
let cotacoes = [];

// função para buscar e exibir a cotação do dólar comercial
async function buscarCotacao() {
  const dataSelecionada = new Date(dataInput.value);
  const dataFormatada = `${dataSelecionada.getMonth() + 1}-${dataSelecionada.getDate()}-${dataSelecionada.getFullYear()}`;
  const url = `${urlBase}${endpoint}(dataCotacao=@dataCotacao)${formato}&@dataCotacao='${dataFormatada}'`;

  let cotacao;

  try {
    const response = await fetch(url);
    const json = await response.json();
    cotacao = json.value[0].cotacaoVenda;
  } catch (error) {
    console.error(error);
    // caso ocorra um erro, exibe mensagem de erro
    cotacaoDiv.className = 'error';
    cotacaoDiv.innerHTML = 'Não foi possível obter a cotação do dólar comercial na data especificada.';
    return;
  }

  // se não houver cotação, exibe mensagem de erro
  if (!cotacao) {
    cotacaoDiv.className = 'error';
    cotacaoDiv.innerHTML = 'Não foi possível obter a cotação do dólar comercial na data especificada.';
    return;
  }

  // formata o valor da cotação com duas casas decimais
  const cotacaoFormatada = parseFloat(cotacao).toFixed(2).replace('.', ',');

  // exibe a cotação no elemento HTML correspondente
  cotacaoDiv.innerHTML = `Cotação do dólar comercial em ${dataFormatada}: R$ ${cotacaoFormatada}<span>(fonte: Banco Central do Brasil)</span>`;

  // adiciona a cotação à tabela
  const novaLinha = tabelaCotacoes.insertRow();
  const colunaData = novaLinha.insertCell();
  const colunaCotacao = novaLinha.insertCell();
  colunaData.innerHTML = dataFormatada;
  colunaCotacao.innerHTML = `R$ ${cotacaoFormatada}`;
  cotacoes.push({data: dataFormatada, cotacao: cotacaoFormatada});
}

// adiciona o evento de clique no botão de busca
buscarButton.addEventListener('click', buscarCotacao);
