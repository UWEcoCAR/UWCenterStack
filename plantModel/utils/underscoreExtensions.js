_ = require('underscore');

_.mixin({
    getClosestValues: function(a, x) {
        var lo = -1, hi = a.length;
        while (hi - lo > 1) {
            var mid = Math.round((lo + hi)/2);
            if (a[mid] <= x) {
                lo = mid;
            } else {
                hi = mid;
            }
        }
        if (a[lo] == x) hi = lo;
        return {low: a[lo], high: a[hi]};
    }
});

module.exports = _;