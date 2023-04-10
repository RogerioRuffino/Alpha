const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});
        
// Seleciona os elementos do DOM
const clientesSelect = document.querySelector('#clientes');
// const novoClienteInput = document.querySelector('#novo_cliente');
const adicionarClienteBtn = document.querySelector('#btn_adicionar_cliente');
const editarClienteBtn = document.querySelector('#btn_editar_cliente');
const popupAdicionarCliente = document.querySelector('#popup_adicionar_cliente');
const fecharPopupBtn = document.querySelector('#btn_fechar_popup');
const salvarClienteBtn = document.querySelector('#btn_salvar_cliente');
const nomeClienteInput = document.querySelector('#nome_cliente');
const emailClienteInput = document.querySelector('#email_cliente');
const telefoneClienteInput = document.querySelector('#telefone_cliente');
const cidadeClienteInput = document.querySelector('#cidade_cliente');
const btnExportarDados = document.querySelector('#btn_exportar_dados');
const btnImportarDados = document.querySelector('#btn_importar_dados');

// Objeto que irá armazenar os clientes
// let clientes = {};
//
let clientes = JSON.parse(localStorage.getItem('clientes')) || {};

// Atualiza o select de clientes
atualizarSelectClientes();


//
// Função para salvar os clientes no armazenamento local
function salvarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

// Função para atualizar o select de clientes
function atualizarSelectClientes() {
    clientesSelect.innerHTML = '<option value="">Selecione um cliente</option>';
    for (let cliente in clientes) {
        clientesSelect.innerHTML += `<option value="${cliente}">${cliente}</option>`;
    }
}

// Função para exibir a popup de adicionar novo cliente
function exibirPopupAdicionarCliente() {
    popupAdicionarCliente.style.display = 'block';
    
    
}

   // Função para adicionar um novo cliente
function adicionarCliente(nome, email, telefone, cidade) {
clientes[nome] = {
    email: email,
    telefone: telefone,
    cidade: cidade,
};
//
salvarClientes(); // salva os clientes atualizados no armazenamento local
//
}

function fecharPopupAdicionarCliente() {
popupAdicionarCliente.style.display = 'none';
limparInputs();
}

// Função para exibir os dados do cliente selecionado
function exibirDadosCliente(cliente) {
nomeClienteInput.value = cliente;
emailClienteInput.value = clientes[cliente].email;
telefoneClienteInput.value = clientes[cliente].telefone;
cidadeClienteInput.value = clientes[cliente].cidade;
}

// Função para editar os dados do cliente selecionado
function editarCliente(cliente, nome, email, telefone, cidade) {
delete clientes[cliente];
adicionarCliente(nome, email, telefone, cidade);
}

// Função para limpar os inputs do formulário
function limparInputs() {
nomeClienteInput.value = '';
emailClienteInput.value = '';
telefoneClienteInput.value = '';
cidadeClienteInput.value = '';
}

// Evento para adicionar novo cliente
adicionarClienteBtn.addEventListener('click', () => {
exibirPopupAdicionarCliente();
});

// Evento para fechar a popup de adicionar novo cliente
fecharPopupBtn.addEventListener('click', () => {
fecharPopupAdicionarCliente();
});

// Evento para salvar novo cliente
salvarClienteBtn.addEventListener('click', (event) => {
event.preventDefault();
const nome = nomeClienteInput.value.trim();
const email = emailClienteInput.value.trim();
const telefone = telefoneClienteInput.value.trim();
const cidade = cidadeClienteInput.value.trim();
if (nome !== '' && email !== '' && telefone !== '' && cidade !== '' ) {
    adicionarCliente(nome, email, telefone, cidade);
    atualizarSelectClientes();
    limparInputs();
    fecharPopupAdicionarCliente();
} else {
    alert('Por favor, preencha todos os campos.');
}
});

// Evento para selecionar um cliente
clientesSelect.addEventListener('change', () => {
const clienteSelecionado = clientesSelect.value;
if (clienteSelecionado !== '') {
    exibirDadosCliente(clienteSelecionado);
    editarClienteBtn.disabled = false;
} else {
    limparInputs();
    editarClienteBtn.disabled = true;
}
});

// Evento para editar um cliente
editarClienteBtn.addEventListener('click', () => {
const clienteSelecionado = clientesSelect.value;
if (clienteSelecionado !== '') {
    exibirPopupAdicionarCliente();
    nomeClienteInput.value = clienteSelecionado;
    delete clientes[clienteSelecionado];
}
});

// Evento para exportar os dados
btnExportarDados.addEventListener('click', () => {
  const json = JSON.stringify(clientes);
  const blob = new Blob([json], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'clientes.json';
  a.click();
});

// Evento para importar os dados
btnImportarDados.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const data = JSON.parse(reader.result);
      clientes = data;
      atualizarSelectClientes();
      salvarClientes();
    };
  });
  input.click();
});
