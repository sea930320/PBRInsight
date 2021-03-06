// Brand DataTable Settings
export var brandSettings = {
    columns: {
        name: {
            title: 'Brand',
            filter: true,
            width: '60%'
        },
        naira: {
            title: 'Naira',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(value).toLocaleString('en-GB')}`
            }
        },
        volumn: {
            title: 'Volume',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${Number(value).toLocaleString('en-GB')}`
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