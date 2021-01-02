var entradaTexto = document.getElementById("entrada-texto");
var cursor = document.getElementsByClassName('cursor')[0];

// Todas as linhas da entrada de texto;
var linhas;
// Referencia ao elemento SPAN com a linha atual
var linhaAtual;
// Referencia ao elemento SPAN com a palavra atual
var palavraAtual;

(function(){
	function inicializa() {
		linhas = [];
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

	function separaPalavra(indicePalavra) {
		palavraAtual = criaSpan("palavra");
		linhaAtual.appendChild(palavraAtual);
		linhaAtual.appendChild(cursor);
	}

	function trocaLinha() {
		// Remove a linha atual da lista e do elemento pai
		var linhaAnterior = linhas.pop().remove().previousSibling;

		if (!(linhaAnterior instanceof HTMLElement)) {
			// Reinicia a entrada de texto com os valores padrão
			return inicializa();
		}

		linhaAtual = linhaAnterior;
		linhaAnterior.addClass("line-selected");
		palavraAtual = linhaAtual.lastChild;
		linhaAtual.appendChild(cursor);
	}

	function quebraLinha() {
		linhaAtual = criaSpan("linha");

		linhas.push(linhaAtual);
		entradaTexto.appendChild(linhaAtual);

		linhaAtual.previousSibling.removeClass("line-selected");
		linhaAtual.addClass("line-selected");
		separaPalavra();
	}

	function entrada(character, characterEspecial) {
		// Valor atual da palavra antes de ser adicionado ou removido um caractere
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
	 			selecionaLinha("cima");
	 			return;
	 		case 'baixo':
	 			selecionaLinha("baixo");
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
	 	}
	 }
})();