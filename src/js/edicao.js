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

function selecionaLinha(direcao) {
	linhaAtual.removeClass("line-selected");
	switch (direcao){
		case "cima" :
			linhaAtual = !linhaAtual.previousSibling ? linhaAtual : linhaAtual.previousSibling;
			break;
		case "baixo" :
			linhaAtual = !linhaAtual.nextSibling ? linhaAtual : linhaAtual.nextSibling;
			break;
	}
	linhaAtual.addClass("line-selected");
	palavraAtual = linhaAtual.lastChild;
}

function destacaPalavra(palavra) {
	if(palavra in keywords){
		palavraAtual.addClass(keywords[palavra]);	
	}
}