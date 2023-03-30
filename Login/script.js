const callVolta = document.getElementById('btnVoltar');
callVolta.addEventListener('click', () => {
  // code to call another program
  // for example, redirect to another HTML page:
  window.location.href = '/Alpha/index.html';
});
		
		// Função de login que verifica as credenciais do usuário e permite salvar a senha
		function login(username, password, savePassword) {
			// Verificar se as credenciais são válidas (isso é apenas um exemplo)
			if (username === "usuario" && password === "senha") {
				// Se o usuário optou por salvar a senha, armazená-la em localStorage
				if (savePassword) {
					localStorage.setItem("savedPassword", password);
				} else {
					localStorage.removeItem("savedPassword");
				}
				return true; // Credenciais válidas
			} else {
				alert("Credenciais inválidas."); // Credenciais inválidas, mostrar mensagem de erro
				return false;
			}
		}

		// Função para solicitar uma nova senha confirmada por e-mail
		function resetPassword(username, email) {
			// Verificar se o e-mail é válido (isso é apenas um exemplo)
			if (email === "frasesroger@gmail.com") {
				// Gerar um código de redefinição de senha aleatório
				var resetCode = Math.floor(Math.random() * 1000000);
				// Enviar o código de redefinição de senha por e-mail (isso é apenas um exemplo)
				console.log("Envie o código de redefinição de senha por e-mail para " + email + ": " + resetCode);
				// Armazenar o código de redefinição de senha em sessionStorage
				sessionStorage.setItem("resetCode", resetCode);
				alert("Código de redefinição de senha enviado com sucesso. Verifique seu e-mail."); // Mostrar mensagem de sucesso
				return true;
			} else {
				alert("O endereço de e-mail não é válido."); // E-mail inválido, mostrar mensagem de erro
				return false;
			}
		}