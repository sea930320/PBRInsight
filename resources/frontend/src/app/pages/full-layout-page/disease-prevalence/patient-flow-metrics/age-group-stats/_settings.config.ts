// Population by Age Group DataTable Settings
export var AgeGroupSettings = {
    selectMode: 'multi',
    mode: 'external',
    pager: {
        display: false,
    },
    columns: {
        age_group: {
            title: 'Age Group',
            filter: true,
            class: 'text-center',
            width: '19%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${value}</div>`
            }
        },
        male_population: {
            title: 'Male Population',
            filter: true,
            class: 'text-center',
            width: '15%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${Number(value).toLocaleString('en-GB')} </div>`
            }
        },
        male_percentage: {
            title: 'Male(%)',
            filter: true,
            width: '12%',
            class: 'text-center percentage-col',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${value} % </div>`
            }
        },
        female_population: {
            title: 'Female Population',
            filter: true,
            class: 'text-center',
            width: '15%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${Number(value).toLocaleString('en-GB')} </div>`
            }
        },
        female_percentage: {
            title: 'Female(%)',
            filter: true,
            class: 'text-center percentage-col',
            width: '12%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${value} % </div>`
            }
        },
        total_population: {
            title: 'Total Population',
            filter: true,
            class: 'text-center',
            width: '15%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${Number(value).toLocaleString('en-GB')} </div>`
            }
        },
        total_percentage: {
            title: 'Total(%)',
            filter: true,
            class: 'text-center percentage-col',
            width: '12%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${value} % </div>`
            }
        }
    },
    hideSubHeader: false,
    actions: {
        add: false,
        edit: false,
        delete: false
    },
    attr: {
        class: "table table-responsive"
    }
}

// Actual Population Size DataTable Settings
export var PopulationSettings = {
    columns: {
        year: {
            title: 'Year',
            filter: true,
            class: 'text-center',
            width: '20%'
        },
        total_population: {
            title: 'Total Population',
            filter: true,
            class: 'text-center',
            width: '40%',
            valuePrepareFunction: function (value) {
                return Number(value).toLocaleString('en-GB')
            }
        },
        annual_growth_rate: {
            title: 'Annual Growth Rate',
            filter: true,
            width: '40%',
            class: 'text-center',
            valuePrepareFunction: function (value) {
                return `${value} %`
            }
        }
    },
    hideSubHeader: false,
    actions: {
        add: false,
        edit: false,
        delete: false
    },
    attr: {
        class: "table table-responsive"
    },
    pager: {
        perPage: 5
    }
}

