// atc1 DataTable Settings
export var atc1Settings = {
    columns: {
        name: {
            title: 'Anatomic Classification(Atc1)',
            filter: true,
            width: '60%'
        },
        value: {
            title: 'Percentage',
            filter: true,
            width: '20%',
            valuePrepareFunction: function (value) {
                return `${value} %`
            }
        },
        naira: {
            title: 'Naira',
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