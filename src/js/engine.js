function executaCodigo() {
	const palavras = document.getElementsByClassName('palavra');
	var stringCode = "";
	for (palavra of palavras) {
		stringCode += palavra.textContent;
	}
	eval(stringCode);
}

const botaoExecutar = document.getElementById('executar');
botaoExecutar.addEventListener("click", executaCodigo, false);