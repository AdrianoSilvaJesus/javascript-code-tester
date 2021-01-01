String.prototype.removeCharAtPosition = function(position){
	var string = this.split('');
	string.splice(position - 1, 1);
	return string.join('');
}