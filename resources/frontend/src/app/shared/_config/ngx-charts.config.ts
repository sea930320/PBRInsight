import * as shape from 'd3-shape';

//Bar Chart
export var barChartView: any[] = [550, 400];
// options
export var barChartSettings = {
    barChartShowXAxis: true,
    barChartShowYAxis: true,
    barChartGradient: false,
    barChartShowLegend: true,
    barChartShowXAxisLabel: true,
    barChartShowYAxisLabel: true,
    barChartYAxisLabel: '%',
    barChartDisplayCount: 10,
    barChartSMDisplayCount: 6,
    barChartXSDisplayCount: 5,
    barChartColorScheme: {
        domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
    },
    barChartColorScheme1: {
        domain: ['#FF8D60', '#FF8D60', '#FF8D60', '#FF8D60']
    },
    barChartColorScheme2: {
        domain: ['#FF586B', '#FF586B', '#FF586B', '#FF586B']
    },
    barChartColorScheme3: {
        domain: ['#009DA0', '#FFC107', '#8BC34A', '#AAAAAA']
    },
}


//Pie CHart
export var pieChartView: any[] = [550, 400];
// options
export var pieChartSettings = {
    pieChartShowLegend: true,
    pieChartColorScheme: {
        domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
    },
    pieChartShowLabels: true,
    pieChartExplodeSlices: true,
    pieChartDoughnut: true,
    pieChartGradient: false,
    pieChart1ExplodeSlices: true,
    pieChart1Doughnut: false,
    pieChartDisplayCount: 4,
}
//Line Charts

export var lineChartView: any[] = [550, 400];

// options
export var lineChartSettings = {
    lineChartShowXAxis: true,
    lineChartShowYAxis: true,
    lineChartGradient: false,
    lineChartShowLegend: false,
    lineChartShowXAxisLabel: true,
    lineChartShowYAxisLabel: true,
    lineChartAutoScale: true,
    lineChartLineInterpolation: shape.curveBasis,
    lineChartColorScheme1: {
        domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA'],
    },
    lineChartColorScheme2: {
        domain: ['#FF8D60', '#009DA0', '#FF586B', '#AAAAAA'],
    },
    lineChartDisplayCount: 5,
}

//Area Charts
export var areaChartView: any[] = [550, 400];

// options
export var areaChartSettings = {
    areaChartShowXAxis: true,
    areaChartShowYAxis: true,
    areaChartGradient: false,
    areaChartShowLegend: false,
    areaChartShowXAxisLabel: true,
    areaChartShowYAxisLabel: true,
    areaChartYAxisLabel: '%',
    areaChartColorScheme: {
        domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA']
    },
    areaChartColorScheme1: {
        domain: ['#FF586B', '#FF8D60', '#1CBCD8', '#AAAAAA']
    },
    areaChartAutoScale: true,
    areaChartLineInterpolation: shape.curveBasis,
}