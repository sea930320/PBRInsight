// Brand Average Price DataTable Settings
export var avgPriceSettings = {
    columns: {
        name: {
            title: 'Brand',
            filter: true,
            width: '40%'
        },
        wp: {
            title: 'Wholesale Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}`
            }
        },
        rp: {
            title: 'Retail Pharmacy Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}`
            }
        },
        hp: {
            title: 'Hospital Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}`
            }
        },
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

export var comparsionSettings = {
    columns: {
        name: {
            title: 'Brand',
            filter: true,
            width: '40%'
        },
        wp: {
            title: 'Wholesale Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}%`
            }
        },
        rp: {
            title: 'Retail Pharmacy Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}%`
            }
        },
        hp: {
            title: 'Hospital Price',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(parseFloat(value).toFixed(2)).toLocaleString('en-GB')}%`
            }
        },
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