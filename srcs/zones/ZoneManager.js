function ZoneManager() {
	this.zoneList = new Array();
	this.lastZone = null;
	this.currentZone = null;

	this.onStart = function(position) {
		this.lastZone = null;
		this.currentZone = null;
		for (var i = 0; i < this.zoneList.length; i++) {
			if (this.zoneList[i].isThere(position)) {
				this.currentZone = this.zoneList[i];
			}
		}
	}

	this.onMove = function(position) {
		for (var i = 0; i < this.zoneList.length; i++) {
			if (this.zoneList[i].isThere(position) && this.currentZone != this.zoneList[i]) {
				this.lastZone = this.currentZone;
				this.currentZone = this.zoneList[i];

				if (this.lastZone && this.lastZone.target === this.currentZone && this.lastZone.selected) {
					this.lastZone.selected = false;
					this.currentZone.selected = true;
					onEnd(position);
				}
			}
		}
	}

	this.onEnd = function(position) {
		console.log(this.currentZone.name);
		$.each(this.zoneList, function(index, element) {
			element.hover = false;
		});
		return this.currentZone.name;
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