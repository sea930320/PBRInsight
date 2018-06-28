import * as shape from 'd3-shape';

//Bar Chart
export var barChartView: any[] = [550, 400];
// options
export var barChartSettings = {
    barChartShowXAxis : true,
    barChartShowYAxis : true,
    barChartGradient : false,
    barChartShowLegend : true,
    barChartShowXAxisLabel : true,
    barChartXAxisLabel : 'Disease',
    barChartShowYAxisLabel : true,
    barChartYAxisLabel : '%',
    barChartDisplayCount : 10,
    barChartColorScheme : {
        domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
    }
}


//Pie CHart
export var pieChartView: any[] = [550, 400];
// options
export var pieChartSettings = {
    pieChartShowLegend : true,
    pieChartColorScheme : {
        domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
    },
    pieChartShowLabels : true,
    pieChartExplodeSlices : true,
    pieChartDoughnut : true,
    pieChartGradient : false,    
    pieChart1ExplodeSlices : true,
    pieChart1Doughnut : false,
    pieChartDisplayCount : 5,
}
//Line Charts

export var lineChartView: any[] = [550, 400];

// options
export var lineChartShowXAxis = true;
export var lineChartShowYAxis = true;
export var lineChartGradient = false;
export var lineChartShowLegend = false;
export var lineChartShowXAxisLabel = true;
export var lineChartXAxisLabel = 'Country';
export var lineChartShowYAxisLabel = true;
export var lineChartYAxisLabel = 'Population';

export var lineChartColorScheme = {
    domain: ['#009DA0', '#FF8D60', '#FF586B', '#AAAAAA']
};

// line, area
export var lineChartAutoScale = true;
export var lineChartLineInterpolation = shape.curveBasis;

//Area Charts
export var areaChartView: any[] = [550, 400];

// options
export var areaChartShowXAxis = true;
export var areaChartShowYAxis = true;
export var areaChartGradient = false;
export var areaChartShowLegend = false;
export var areaChartShowXAxisLabel = true;
export var areaChartXAxisLabel = 'Country';
export var areaChartShowYAxisLabel = true;
export var areaChartYAxisLabel = 'Population';

export var areaChartColorScheme = {
    domain: ['#FF8D60', '#FF586B', '#1CBCD8', '#AAAAAA']
};

// line, area
export var areaChartAutoScale = true;
export var areaChartLineInterpolation = shape.curveBasis;