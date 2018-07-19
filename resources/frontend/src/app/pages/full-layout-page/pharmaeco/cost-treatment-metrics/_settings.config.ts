// Brand Average Price DataTable Settings
export var costTreatmentSettings = {
    columns: {
        name: {
            title: 'Disease',
            filter: true,
            width: '80%'
        },
        value: {
            title: 'Cost of Treatment',
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