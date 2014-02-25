function Vector2( x, y ) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector2.prototype = {
	add: function( v ) {
		this.x += v.x;
		this.y += v.y;
	},

	sub: function( v ) {
		this.x -= v.x;
		this.y -= v.y;
	},

	multiply: function( v ) {
		this.x *= v.x;
		this.y *= v.y;
	},

	divide: function( v ) {
		if( v.x !== 0 ) {
			this.x /= v.x;
		}
		else {
			this.x = 0;
		}

		if( v.y !== 0 ) {
			this.y /= v.y;
		}
		else {
			this.y = 0;
		}
	},

	lerp: function( v, alpha ) {
		this.x = this.x + ((v.x - this.x) * alpha);
		this.y = this.y + ((v.y - this.y) * alpha);
	},

	lerpVectors: function( start, end, alpha ) {
		this.x = start.x + ((end.x - start.x) * alpha);
		this.y = start.y + ((end.y - start.y) * alpha);
	}
}