var Vector = function() {
    if (
            arguments.length === 1 &&
            $.isArray(arguments[0]) &&
            arguments[0].length === 3 &&
            typeof arguments[0][0] === 'number' &&
            typeof arguments[0][1] === 'number' &&
            typeof arguments[0][2] === 'number') {
        this.x = arguments[0][0];
        this.y = arguments[0][1];
        this.z = arguments[0][2];
    } else if (
            arguments.length === 3 &&
            typeof arguments[0] === 'number' &&
            typeof arguments[1] === 'number' &&
            typeof arguments[2] === 'number') {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
    } else {
        throw "Must create a vector from an array of three numbers or 3 numbers";
    }
};

Vector.prototype.containedInRectangularPrism = function(centerVector, edgeLengthsVector) {
    if (!Vector.isVector(centerVector)) {
        throw "centerVector must be a Vector";
    }
    if (!Vector.isVector(edgeLengthsVector)) {
        throw "edgeLengthsVector must be a Vector";
    }
//    console.log('X: ' + (Math.abs(centerVector.x - this.x) < edgeLengthsVector.x / 2));
//    console.log('Y: ' + (Math.abs(centerVector.y - this.y) < edgeLengthsVector.y / 2));
//    console.log('Z: ' + (Math.abs(centerVector.z - this.z) < edgeLengthsVector.z / 2));
    return Math.abs(centerVector.x - this.x) < edgeLengthsVector.x / 2 &&
           Math.abs(centerVector.y - this.y) < edgeLengthsVector.y / 2 &&
           Math.abs(centerVector.z - this.z) < edgeLengthsVector.z/ 2;
};

Vector.prototype.magnitude = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
};


Vector.prototype.normalize = function() {
    var magnitude = this.magnitude();
    this.x /= magnitude;
    this.y /= magnitude;
    this.z /= magnitude;
    return this;
};

Vector.isVector = function(vector) {
    return vector instanceof Vector;
};

Vector.prototype.toString = function() {
    return '[' + this.x + ', ' + this.y + ', ' + this.z + ']';
};