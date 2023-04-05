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
const salvarButton = document.getElementById('salvar-button');
salvarButton.addEventListener('click', salvarCotacoes);


// adiciona o evento de clique no botão de busca
buscarButton.addEventListener('click', buscarCotacao);

// verifica se há cotações salvas no localStorage e as exibe na tabela
if (localStorage.getItem('cotacoes')) {
    cotacoes = JSON.parse(localStorage.getItem('cotacoes'));
    cotacoes.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      if (dateB.getFullYear() !== dateA.getFullYear()) {
        return dateB.getFullYear() - dateA.getFullYear();
      }
      if (dateB.getMonth() !== dateA.getMonth()) {
        return dateB.getMonth() - dateA.getMonth();
      }
      return dateB.getDate() - dateA.getDate();
    });
    exibirCotacoes();
  }
  

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
  
    // inicializa a variável cotacoes com o valor do localStorage ou um array vazio
    let cotacoes = localStorage.getItem('cotacoes') ? JSON.parse(localStorage.getItem('cotacoes')) : [];
  
    // adiciona a cotação à tabela
    const novaLinha = tabelaCotacoes.insertRow();
    const colunaData = novaLinha.insertCell();
    const colunaCotacao = novaLinha.insertCell();
    colunaData.innerHTML = dataFormatada;
    colunaCotacao.innerHTML = `R$ ${cotacaoFormatada}`;
  
    // adiciona a cotação ao array cotacoes
    cotacoes.push({data: dataFormatada, cotacao: cotacaoFormatada});
  
    // salva as cotações no localStorage
    localStorage.setItem('cotacoes', JSON.stringify(cotacoes));
  }
  
// função para exibir as cotações salvas na tabela

function exibirCotacoes() {
    cotacoes.forEach((cotacao) => {
        const novaLinha = tabelaCotacoes.insertRow();
        const colunaData = novaLinha.insertCell();
        const colunaCotacao = novaLinha.insertCell();
        colunaData.innerHTML = cotacao.data;    
        colunaCotacao.innerHTML = `R$ ${cotacao.cotacao}`;
    });
  }
  
  function salvarCotacoes() {
    // verifica se há cotações salvas no localStorage
    if (!localStorage.getItem('cotacoes')) {
      alert('Não há cotações salvas para serem exportadas.');
      return;
    }
  
    // pega as cotacoes do localStorage
    const cotacoes = JSON.parse(localStorage.getItem('cotacoes'));
  
    // converte as cotacoes em uma string JSON
    const json = JSON.stringify(cotacoes);
  
    // cria um objeto de arquivo com o conteúdo JSON
    const file = new Blob([json], { type: 'application/json' });
  
    // cria um elemento de link para fazer o download do arquivo
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(file));
  
    // adiciona um diálogo de salvamento de arquivo
    link.setAttribute('download', prompt('Digite o nome do arquivo', 'cotacoes.json'));
  
    // adiciona o elemento de link ao DOM e faz o download do arquivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
