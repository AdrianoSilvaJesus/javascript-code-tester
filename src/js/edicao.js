var keywords = {
	arguments : "especial",
	await: "setenca",
	break: "setenca",
	case: "setenca",
	catch: "setenca",
	class:"setenca",
	const: "atribuicao",
	continue: "setenca",
	debugger: "setenca",
	default:"setenca",
	delete: "setenca",
	do: "setenca",
	else: "setenca",
	enum: "setenca",
	eval: "funcao",
	export: "setenca",
	extends: "setenca",
	false: "valor",
	finally: "setenca",
	for: "setenca",
	function: "funcao",
	if: "setenca",
	implements: "setenca",
	import: "setenca",
	in: "setenca",
	instanceof: "setenca",
	interface: "setenca",
	let: "atribuicao",
	new: "setenca",
	null: "setenca",
	package: "setenca",
	private: "setenca",
	protected: "setenca",
	public: "setenca",
	return: "setenca",
	static: "setenca",
	super: "especial",
	switch: "setenca",
	this: "especial",
	throw: "setenca",
	true: "valor",
	try: "setenca",
	typeof: "setenca",
	var: "atribuicao",
	void: "atribuicao",
	while: "setenca",
	with: "setenca",
	yield: "setenca",
};

function selecionaLinha(rotina) {
	linhaAtual.removeClass("line-selected");
	// Remove o cursor no final da linha
	linhaAtual.removeChild(cursor);
	
	// Rotina que pode trocar o valor da linha atual
	if (rotina) rotina();

	// Pega a ultima palavra da linha atual
	palavraAtual = linhaAtual.lastChild;

	linhaAtual.addClass("line-selected");
	// Coloca o cursor no final da linha
	linhaAtual.appendChild(cursor);
}

function moveLinha(direcao) {
	selecionaLinha(function () {
		switch (direcao){
			case "cima" :
				linhaAtual = !(linhaAtual.previousSibling instanceof HTMLElement) ? linhaAtual : linhaAtual.previousSibling;
				break;
			case "baixo" :
				linhaAtual = !(linhaAtual.nextSibling instanceof HTMLElement) ? linhaAtual : linhaAtual.nextSibling;
				break;
		}
	});
}

function destacaPalavra(palavra) {

	if (/^\w+\.(\w+)$/g.test(palavra)) {
		var teste = /^\w+\.(\w+)$/g.exec(palavra);
		var propriedade = criaSpan("span");

		propriedade.textContent = teste[teste.length - 1];
		console.log(propriedade);
	};

	if(palavra in keywords) {
		palavraAtual.addClass(keywords[palavra])
		return;
	}

	if (palavraAtual.classList[1]) {
		palavraAtual.removeClass(palavraAtual.classList[1]);
	}
}

function contadorLinha(acao) {
	var contador_linha = document.getElementById("contador-linha");

	switch (acao) {
		case 'incrementar':
			var numero_linha = document.createElement('span');
			numero_linha.textContent = linhas.length - 1;

			contador_linha.appendChild(numero_linha);

			break;
		case 'decrementar':
			if (!linhas.length) return;

			contador_linha.lastChild.remove();
			break;
	}
}

(function () {
	var pesquisa_linha = document.getElementById("pesquisa-linha");

	pesquisa_linha.addEventListener("change", function (event) {

		var indice_linha = event.target.value

		if(!(indice_linha in linhas)) return;

		selecionaLinha(function () {
			linhaAtual = linhas[indice_linha];
		});
	}, false);

	pesquisa_linha.addEventListener("focus",pesquisa_linha.focar, false);
})();