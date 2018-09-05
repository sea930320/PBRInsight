import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Disease Prevalence', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/disease-prevalence/analytics', title: 'Disease Prevalence', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/disease-prevalence/patient-flow-metrics', title: 'Patient Forecasting', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/disease-prevalence/co-morbidities', title: 'Co-Morbidities', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '/patient-flow-metrics', title: 'Patient Forecasting', icon: 'ft-bar-chart-2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Treatment Mapping', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/treatment-mapping/therapy-area-level', title: 'Therapy Area Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/treatment-mapping/brand-molecule', title: 'Brand and Molecule(INN)', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '/diagnotics', title: 'Diagnostics', icon: 'ft-bar-chart-2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '', title: 'Market Data Analytics', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/market-data-analytics/market-view', title: 'Market View', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/market-data-analytics/therapy-area', title: 'Therapy Area', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/market-data-analytics/brand', title: 'Brand', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/market-data-analytics/molecule', title: 'Molecule(INN)', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    // {
    //     path: '', title: 'Pricing Analytics', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //     submenu: [
    //         { path: '/pricing-analytics/molecule-price-analytics', title: 'Molecule(INN)', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/pricing-analytics/brand-price-analytics', title: 'Brand', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    //     ]
    // },
    // {
    //     path: '', title: 'Pharmacoeconomics', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    //     submenu: [
    //         { path: '/pharmaeco/cost-treatment-metrics', title: 'Cost of Treatment Metrics', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    //     ]
    // }
];
