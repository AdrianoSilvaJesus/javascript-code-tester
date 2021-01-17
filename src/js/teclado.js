var entradaTexto = document.getElementById("entrada-texto");
var cursor = document.getElementsByClassName('cursor')[0];

// Guarda todas as linhas da entrada-texto
var linhas = [];
// Referencia ao elemento SPAN com a linha atual
var linhaAtual;
// Referencia ao elemento SPAN com a palavra atual
var palavraAtual;

(function(){
	function inicializa() {
		linhaAtual = criaSpan("linha");
		palavraAtual = criaSpan("palavra");
		cursor = criaSpan("cursor");

		linhas.push(linhaAtual);
		entradaTexto.appendChild(linhaAtual);
		linhaAtual.appendChild(palavraAtual);

		cursor.innerText = "|";
		linhaAtual.appendChild(cursor);
		linhaAtual.addClass("line-selected");
	}

	inicializa();

	function separaPalavra(space) {
		palavraAtual = criaSpan("palavra");
		
		palavraAtual.textContent = space ? " " : "";

		linhaAtual.appendChild(palavraAtual);
		linhaAtual.appendChild(cursor);
	}

	function trocaLinha() {
		// Remove a linha atual da lista e do elemento pai
		linhas.pop();
		var linhaAnterior = linhaAtual.remove().previousSibling;

		if (!(linhaAnterior instanceof HTMLElement)) {
			// Reinicia a entrada de texto com os valores padrão
			return inicializa();
		}


		linhaAtual = linhaAnterior;
		palavraAtual = linhaAtual.lastChild;
		// Decrementa o contador de linhas lateral
		contadorLinha('decrementar')
		linhaAtual.addClass("line-selected");
		// Coloca o cursor no final da linha
		linhaAtual.appendChild(cursor);
	}

	function quebraLinha() {
		linhaAtual.removeClass("line-selected");
		linhaAtual.lastChild.remove();
		
		linhaAtual = criaSpan("linha");
		linhas.push(linhaAtual);

		linhaAtual.addClass("line-selected");

		entradaTexto.appendChild(linhaAtual);
		separaPalavra();
		// Incrementa o contador de linhas lateral
		contadorLinha('incrementar');
	}

	function entrada(character, characterEspecial) {
		// Valor atual da palavra antes de ser adicionado ou removido um caractere
		var palavra = palavraAtual.textContent;
	 	if(!character && !characterEspecial){
	 		// Caso a palavra seja vazia pula para a palavra anterior a ela
	 		palavraAtual.textContent = palavra = palavra.removeCharAtPosition(palavra.length);

	 		destacaPalavra(palavra);

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
	 			separaPalavra(true);
	 			return;
	 		case 'cima':
	 			moveLinha("cima");
	 			return;
	 		case 'baixo':
	 			moveLinha("baixo");
	 			return;
	 	}

	 	palavraAtual.textContent = palavra = palavra + character;

	 	destacaPalavra(palavraAtual.textContent.trimLeft());
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
	 		case 37:
	 			entrada(null, "cima");
	 			break;
	 		case 39:
	 			entrada(null, "baixo");
	 	}
	 }
})();