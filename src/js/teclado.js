var entradaTexto = document.getElementById("entrada-texto");

(function(){
	// Todas as linhas da entrada de texto;
	var linhas;
	// Referencia ao elemento SPAN com a linha atual
	var linhaAtual;
	// Referencia ao elemento SPAN com a palavra atual
	var palavraAtual;

	function inicializa() {
		linhas = [];
		linhaAtual = criaSpan("linha");
		palavraAtual = criaSpan("palavra");
		linhas.push(linhaAtual);
		entradaTexto.appendChild(linhaAtual);
		linhaAtual.appendChild(palavraAtual);
	}

	inicializa();

	function separaPalavra(indicePalavra) {
		palavraAtual = criaSpan("palavra");
		linhaAtual.appendChild(palavraAtual);
	}

	function trocaLinha() {
		// Remove a linha atual da lista
		linhas.pop();
		entradaTexto.removeChild(linhaAtual);
		// Pega a linha anterior a atual
		linhaAnterior = linhas[linhas.length - 1]
		if (!linhaAnterior) {
			// Reinicia a entrada de texto com os valores padrão
			return inicializa();
		}
		linhaAtual = linhaAnterior;
		palavraAtual = linhaAtual.lastChild;
	}

	function quebraLinha() {
		linhaAtual = criaSpan("linha");

		linhas.push(linhaAtual);
		entradaTexto.appendChild(linhaAtual);
		separaPalavra();
	}

	function selecionaLinha(direcao) {
		
	}

	function entrada(character, characterEspecial) {
		var palavra = palavraAtual.textContent;
	 	if(!character && !characterEspecial){
	 		// Caso a palavra seja vazia pula para a palavra anterior a ela
	 		palavraAtual.textContent = palavra = palavra.removeCharAtPosition(palavra.length);

	 		if(palavra.trim().length == 0) {
	 			palavraAnterior = palavraAtual.previousSibling;
	 			linhaAtual.removeChild(palavraAtual);
	 			if (!palavraAnterior) return trocaLinha();
	 			palavraAtual = palavraAnterior;
	 		}
	 		return;
	 	}

	 	// Faz o tratamento da entrada de qualquer caracatere especial
	 	switch (characterEspecial) {
	 		case 'enter':
	 			quebraLinha();
	 			return;
	 		case 'space':
	 			separaPalavra();
	 			return;
	 		case 'cima':
	 			console.log("Linha de cima !");
	 			selecionaLinha(linhas.indexOf(linhaAtual));
	 			return;
	 		case 'baixo':
	 			console.log("Linha de baixo !");
	 			selecionaLinha(linhas.indexOf(linhaAtual));
	 			return;
	 	}

	 	palavraAtual.textContent = palavra = palavra + character;
	}
	
	window.onkeypress = function(event) {
		// Passa o caractere digitado para a função entrada()
		var character = String.fromCharCode(event.keyCode);
		entrada(character);
	}; 

	window.onkeydown = function(event) {
	 	const keycode = event.keyCode;
	 	//Verifica se foi pressionado Backspace, Delete ou qualquer outro caractere especial
	 	switch (keycode) {
	 		case 8:
	 			entrada();
	 			break;
	 		case 46:
	 			entrada();
	 			break;
	 		case 13:
	 			entrada(null, "enter");
	 			break;
	 		case 32:
	 			entrada(null, "space");
	 			break;
	 		case 38:
	 			entrada(null, "cima");
	 			break;
	 		case 40:
	 			entrada(null, "baixo");
	 			break;
	 	}
	 }
})();