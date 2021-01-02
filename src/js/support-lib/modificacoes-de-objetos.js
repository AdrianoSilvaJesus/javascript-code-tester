String.prototype.removeCharAtPosition = function(position){
	var string = this.split('');
	string.splice(position - 1, 1);
	return string.join('');
}

// Adiciona class a um elemento HTML
HTMLElement.prototype.addClass = function (className) {
	this.classList.add(className);
}

// Remove a classe de um elemento HTML
HTMLElement.prototype.removeClass = function (className) {
	this.classList.remove(className);
}

HTMLElement.prototype.remove = function () {
	// Retorna o elemento irmão anterior e o posterior
	var previousSibling = this.previousSibling;
	var nextSibling = this.nextSibling;

	if (this.parentNode) {
		this.parentNode.removeChild(this);
	}

	return {
		previousSibling: previousSibling,
		nextSibling: nextSibling
	};
}