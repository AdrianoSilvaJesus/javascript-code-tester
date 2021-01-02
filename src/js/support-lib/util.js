function criaSpan(className) {
	var span = document.createElement('span');
	if (className === "linha") {
			span.onmouseover = function () {
				span.addClass("line-selected");
			}
			span.onmouseout = function () {
				span.removeClass("line-selected");
			}
	}
	span.className = className;
	return span;
}