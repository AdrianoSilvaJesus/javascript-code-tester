function addClass(element, className) {
	element.classList.add(className)
}

function removeClass(element, className) {
	element.classList.remove(className);
}

function criaSpan(className) {
	var span = document.createElement('span');
	if (className === "linha") {
			span.onmouseover = function () {
				addClass(span, "line-selected");
			}
			span.onmouseout = function () {
				removeClass(span, "line-selected");
			}
	}
	span.className = className;
	return span;
}