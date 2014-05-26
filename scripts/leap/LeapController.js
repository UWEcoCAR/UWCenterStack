var LeapController = Marionette.Controller.extend({
    initialize: function() {
        this.state = 'OUTSIDE_ACTIVE_ZONE';
        this.midPoint = new Vector(CONFIG.LEAP_ACTIVE_ZONE_MIDPOINT);
        this.edgeLengths = new Vector(CONFIG.LEAP_ACTIVE_ZONE_SIZE);
        this.velocityThreshold = 100;
        this.stoppedThreshold = 500;
        Leap.loop(_.bind(function(frame) {
            var palmPosition;
            var palmVelocity;
            console.log(frame.hands.length);
            if (frame.hands[0]) {
                palmPosition = new Vector(frame.hands[0].palmPosition);
                palmVelocity = new Vector(frame.hands[0].palmVelocity);
                if (CONFIG.LEAP_INVERT) {
                    palmPosition.x *= -1;
                    palmPosition.y *= -1;
                    palmPosition.y += 600;
                    palmPosition.z *= -1;
                    palmVelocity.x *= -1;
                    palmVelocity.y *= -1;
                    palmVelocity.z *= -1;
                }
                console.log('palmPosition ' + palmPosition);
                this.trigger('position', new Vector(
                    (palmPosition.x - this.midPoint.x) / (this.edgeLengths.x / 2),
                    (palmPosition.y - this.midPoint.y) / (this.edgeLengths.y / 2),
                    (palmPosition.z - this.midPoint.z) / (this.edgeLengths.z / 2)
                ));
            }
            switch (this.state) {
                case 'OUTSIDE_ACTIVE_ZONE':
                    if (palmPosition && palmPosition.containedInRectangularPrism(this.midPoint, this.edgeLengths)) {
                        this._goToState('INSIDE_ACTIVE_ZONE');
                    }
                    break;
                case 'INSIDE_ACTIVE_ZONE':
                    if (!palmPosition || !palmPosition.containedInRectangularPrism(this.midPoint, this.edgeLengths)) {
                        this._goToState('OUTSIDE_ACTIVE_ZONE');
                    } else if (palmVelocity && palmVelocity.magnitude() < this.velocityThreshold) {
                        this._goToState('STOPPED_INSIDE_ACTIVE_ZONE');
                    }
                    break;
                case 'STOPPED_INSIDE_ACTIVE_ZONE':
                    if (!palmVelocity || palmVelocity.magnitude() > this.velocityThreshold) {
                        this._goToState('INSIDE_ACTIVE_ZONE');
                    } else if (moment() - this.stoppedStart > this.stoppedThreshold) {
                        this._goToState('GESTURE_MODE');
                    }
                    break;
                case 'GESTURE_MODE':
                    if (!palmPosition) {
                        this._goToState('OUTSIDE_ACTIVE_ZONE');
                        break;
                    }
                    if (!palmPosition.containedInRectangularPrism(this.midPoint, this.edgeLengths)) {
                        if (palmPosition.x < this.midPoint.x - this.edgeLengths.x / 2) {
                            this.trigger('gesture:left');
                            console.log('gesture:left');
                        }
                        if (palmPosition.x > this.midPoint.x + this.edgeLengths.x / 2) {
                            this.trigger('gesture:right');
                            console.log('gesture:right');
                        }
                        if (palmPosition.y < this.midPoint.y - this.edgeLengths.y / 2) {
                            this.trigger('gesture:down');
                            console.log('gesture:down');
                        }
                        if (palmPosition.y > this.midPoint.y + this.edgeLengths.y / 2) {
                            this.trigger('gesture:up');
                            console.log('gesture:up');
                        }
                        if (palmPosition.z < this.midPoint.z - this.edgeLengths.z / 2) {
                            this.trigger('gesture:in');
                            console.log('gesture:in');
                        }
                        if (palmPosition.z > this.midPoint.z + this.edgeLengths.z / 2) {
                            this.trigger('gesture:out');
                            console.log('gesture:out');
                        }
                        this._goToState('OUTSIDE_ACTIVE_ZONE');
                    }
                    break;
            }
        }, this));

        this.listenTo(this, 'enterState:STOPPED_INSIDE_ACTIVE_ZONE', function() {
            this.stoppedStart = moment();
        });
    },

    _goToState: function(state) {
        this.trigger('leaveState:' + this.state, state);
        this.state = state;
        console.log(state);
        this.trigger('enterState:' + state, this.state);
    }
});