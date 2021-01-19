(function () {
	var saida_testes;
	this.assert = function assert(valor, descricao) {
		if (!saida_testes) saida_testes = document.getElementById("saida-testes"); 

		var item_teste = document.createElement('li');
		item_teste.className = valor ? "verdadeiro" : "falso";
		item_teste.appendChild(document.createTextNode(descricao));
		
		saida_testes.appendChild(item_teste);
		
		if(!valor) {
			item_teste.parentNode.className = 'grupo-falso';
		}

		return item_teste;
	}

	this.test = function test(grupoTeste, assercoes) {
		saida_testes = document.getElementById('saida-testes');
		saida_testes = assert(true, grupoTeste);
		saida_testes.appendChild(document.createElement('ul'));
		saida_testes.className = "grupo-verdadeiro";
		assercoes();
		saida_testes  = null;
	} 
})();