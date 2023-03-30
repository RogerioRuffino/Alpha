// ===========================  SIGN UP    =================

const signUpBtn = document.getElementById('signup');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});

signUpBtn.addEventListener('click', validateSignUp);

function validateSignUp(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!isValidEmail(email)) {
    alert('Por favor, digite um e-mail válido.');
    return;
  }

  if (!isValidPassword(password)) {
    alert('A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  const confirmationCode = generateConfirmationCode();
  sendConfirmationCode(email, confirmationCode);
  storeUser(email, password, confirmationCode);

  alert('Um código de confirmação foi enviado para o seu e-mail. Por favor, verifique e confirme o cadastro.');
}

function isValidEmail(email) {
  // Regex para validar o e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function generateConfirmationCode() {
  // Gera um código de confirmação aleatório
  const confirmationCode = Math.floor(Math.random() * 900000) + 100000;
  return confirmationCode.toString();
}

function sendConfirmationCode(email, confirmationCode) {
  // Envia o código de confirmação para o e-mail do usuário
  // Você precisará utilizar um serviço de e-mail para enviar o e-mail. Um exemplo é o Nodemailer.
  // O código abaixo é apenas um exemplo e não funcionará sem a configuração adequada do Nodemailer.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meuemail@gmail.com',
      pass: 'minhasenha'
    }
  });

  const mailOptions = {
    from: 'meuemail@gmail.com',
    to: email,
    subject: 'Código de confirmação do cadastro',
    text: `Seu código de confirmação é ${confirmationCode}. Por favor, insira esse código na página de confirmação do cadastro.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail enviado: ' + info.response);
    }
  });
}

function storeUser(email, password, confirmationCode) {
    const user = {
    email: email,
    password: password,
    confirmationCode: confirmationCode
    };
    
    // Verifica se o local storage está disponível no navegador
    if (typeof(Storage) !== "undefined") {
    // Recupera a lista de usuários cadastrados
    let userList = JSON.parse(localStorage.getItem('userList'));
    
    
  
    // Se não houver usuários cadastrados, cria uma nova lista
    if (!userList) {
      userList = [];
    }
    
    // Adiciona o usuário à lista
    userList.push(user);
    
    // Armazena a lista atualizada no local storage
    localStorage.setItem('userList', JSON.stringify(userList));
    } else {
    console.log('O seu navegador não suporta o armazenamento local');
    }
    }
    
    
    
    
    

//   _______________________ FIM SIGN UP  ________________________
