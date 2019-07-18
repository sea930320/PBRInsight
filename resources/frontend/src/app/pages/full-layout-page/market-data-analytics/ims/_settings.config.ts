// Molecule DataTable Settings
export var moleculeSettings = {
    columns: {
        name: {
            title: 'Molecule',
            filter: true,
            width: '60%'
        },
        ims: {
            title: 'Ims Equivalent Valuation',
            filter: true,
            width: '40%',
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