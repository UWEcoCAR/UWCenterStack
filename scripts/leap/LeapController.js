var LeapController = Marionette.Controller.extend({
    initialize: function() {
        this.state = 'OUTSIDE_ACTIVE_ZONE';
        this.midPoint = new Vector(CONFIG.LEAP_ACTIVE_ZONE_MIDPOINT);
        this.edgeLengths = new Vector(CONFIG.LEAP_ACTIVE_ZONE_SIZE);
        this.outerBoundsEdgeLengths = new Vector(this.edgeLengths.x + 40, this.edgeLengths.y + 40, this.edgeLengths.z + 40);
        this.velocityThreshold = 100;
        this.stoppedThreshold = 500;
        Leap.loop(_.bind(function(frame) {
            var palmPosition;
            var palmVelocity;
            for (var i = 0; i < frame.hands.length; i++) {
                var palmPositionCandidate = new Vector(frame.hands[i].palmPosition);
                var palmVelocityCandidate = new Vector(frame.hands[i].palmVelocity);
                if (CONFIG.LEAP_INVERT) {
                    palmPositionCandidate.x *= -1;
                    palmPositionCandidate.y *= -1;
                    palmPositionCandidate.y += 600;
                    palmPositionCandidate.z *= -1;
                    palmVelocityCandidate.x *= -1;
                    palmVelocityCandidate.y *= -1;
                    palmVelocityCandidate.z *= -1;
                }

                if (palmPositionCandidate.containedInRectangularPrism(this.midPoint, this.outerBoundsEdgeLengths)) {
                    palmPosition = palmPositionCandidate;
                    palmVelocity = palmVelocityCandidate;
                    this.trigger('position', new Vector(
                        (palmPosition.x - this.midPoint.x) / (this.edgeLengths.x / 2),
                        (palmPosition.y - this.midPoint.y) / (this.edgeLengths.y / 2),
                        (palmPosition.z - this.midPoint.z) / (this.edgeLengths.z / 2)
                    ));
                    break;
                }
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
                        console.log('how did we get here?');
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