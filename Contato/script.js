const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});

function formatPhone(phone) {
  phone = phone.replace(/\D/g, ''); // remove tudo que não é dígito
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // adiciona parênteses ao redor do DDD
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // adiciona hífen entre os 4 últimos dígitos
  return phone;
}

function submitForm() {
  // Obtenha os valores dos campos do formulário
  const name = document.getElementById("name").value;
  const phoneInput = document.getElementById("phone");
  const email = document.getElementById("email").value;
  
  // Formate o número de telefone
  const phone = formatPhone(phoneInput.value);
  
  // Envie as informações para o servidor usando AJAX ou outra técnica de envio de formulário
  // Aqui, usaremos um alerta para exibir as informações do formulário
  alert(`Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}`);
    
  
  // Limpe o formulário após o envio
  document.getElementById("myForm").reset();
}

function createTable(name, phone, email) {
  // Cria a tabela
  const table = document.createElement('table');
  table.setAttribute('border', '1');
  
  // Cria a primeira linha da tabela (cabeçalho)
  const headerRow = document.createElement('tr');
  
  const nameHeader = document.createElement('th');
  nameHeader.textContent = 'Nome';
  headerRow.appendChild(nameHeader);
  
  const phoneHeader = document.createElement('th');
  phoneHeader.textContent = 'Telefone';
  headerRow.appendChild(phoneHeader);
  
  const emailHeader = document.createElement('th');
  emailHeader.textContent = 'Email';
  headerRow.appendChild(emailHeader);
  
  table.appendChild(headerRow);
  
  // Cria a segunda linha da tabela (dados)
  const dataRow = document.createElement('tr');
  
  const nameData = document.createElement('td');
  nameData.textContent = name;
  dataRow.appendChild(nameData);
  
  const phoneData = document.createElement('td');
  phoneData.textContent = phone;
  dataRow.appendChild(phoneData);
  
  const emailData = document.createElement('td');
  emailData.textContent = email;
  dataRow.appendChild(emailData);
  
  table.appendChild(dataRow);
  
  // Insere a tabela no HTML da página
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // limpa o conteúdo anterior
  tableContainer.appendChild(table);
}

function submitForm() {
  // Obtenha os valores dos campos do formulário
  const name = document.getElementById("name").value;
  const phoneInput = document.getElementById("phone");
  const email = document.getElementById("email").value;
  
  // Formate o número de telefone
  const phone = formatPhone(phoneInput.value);
  
  // Cria a tabela com os dados do formulário
  createTable(name, phone, email);
    
  // Limpa o formulário após o envio
  document.getElementById("myForm").reset();
}




