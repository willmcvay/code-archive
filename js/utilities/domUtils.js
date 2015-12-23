module.exports = {

	hasClass: function (element, className) {
	    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	},

	addClass: function (element, className) {
	    if (!hasClass(element, className)) {
	        element.className += ' ' + className;
	    }
	},

	removeClass: function (element, className) {
	    if (hasClass(element, className)) {
	        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	        element.className = element.className.replace(reg, ' ');
	    }
	}
};