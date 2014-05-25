var EveCostMainZoneView = Backbone.Marionette.ItemView.extend({
    template: '#eveCostScreenTemplate',

    initialize: function(options) {
        this.data = options.data;
    },

    onShow: function() {

        this.chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'spline',
                width: 723,
                height: 273,
                spacingLeft: 40,
                spacingRight: 0,
                spacingTop: 40,
                spacingBottom: 0,
                marginLeft: 41,
                marginRight: 41,
                backgroundColor:'rgba(255, 255, 255, 0)'
            },

            title: {
                text: '',

            },
            xAxis: {
                color: 'rgb(255,255,255)',
                gridLineWidth: 3,
                tickInterval: 1,
                min: 0,
                max: 1,
                labels: {
                    style: {
                        fontFamily: 'alrightsans-light',
                        fontSize: 20,
                        color: 'rgb(255,255,255)'
                    }
                },
                title: {
                    align: 'high',
                    text: 'Trip',
                    style: {
                        fontFamily: 'alrightsans-bold',
                        fontSize: 20,
                        color: 'rgb(255,255,255)'
                    }
                },
            },
            yAxis: {
                color: 'rgb(255,255,255)',
                plotBands: [
                    {
                        color: 'rgb(102,45,145)',
                        from: 5,
                        to: 10
                    },
                    {
                        color: 'rgb(208,221,40)',
                        from: 10,
                        to: 25
                    }
                ],
                title: {
                    align: 'high',
                    text: 'Temp',
                    offset: 0,
                    rotation: 0,
                    x: 15,
                    y: -17,
                    style: {
                        fontFamily: 'alrightsans-bold',
                        fontSize: 20,
                        color: 'rgb(255,255,255)'
                    }
                },
                gridLineWidth: 0,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels: {
                    style: {
                        fontFamily: 'alrightsans-light',
                        fontSize: 20,
                        color: 'rgb(255,255,255)'
                    }
                }
            },
            series: [{
                showInLegend: false
            }],
            plotOptions: {
                spline: {
                    color: 'rgb(255,255,255)',
                    lineWidth: 5,
                    marker: {
                        radius: 10,
                        lineColor: 'black',
                        lineWidth: 4
                    },
                }
            },

            credits: false
        });

        this.chart.series[0].setData(this.data);
    }
});