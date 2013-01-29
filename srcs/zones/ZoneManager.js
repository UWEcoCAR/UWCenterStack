function ZoneManager() {
	this.zoneList = new Array();
	this.lastZone = null;
	this.currentZone = null;

	this.onStart = function(position) {
		for (var i = 0; i < this.zoneList.length; i++) {
			if (this.zoneList[i].isThere(position)) {
				this.lastZone = this.currentZone;
				this.currentZone = this.zoneList[i];
			}
		}
	}

	this.onMove = function(position) {
		for (var i = 0; i < this.zoneList.length; i++) {
			if (this.zoneList[i].isThere(position)) {
				this.lastZone = this.currentZone;
				this.currentZone = this.zoneList[i];

				if (this.currentZone.target === this.lastZone) {
					console.log("TARGET REACHED");
					onEnd(position);
				}
			}
		}
	}

	this.onEnd = function(position) {

	}

	this.update = function() {

	}

	this.draw = function() {
		$.each(this.zoneList, function(index, element) {
			element.draw();
		});
	}

	this.link = function(a,b) {
		a.target = b;
		a.selected = true;
		b.target = a;
		this.zoneList.push(a);
		this.zoneList.push(b);
	}
}