// drugForms DataTable Settings
export var drugFormSettings = {
    columns: {
        name: {
            title: 'POM/OTC',
            filter: true,
            width: '80%'
        },
        value: {
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