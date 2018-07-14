// Facility DataTable Settings
export var facilitySettings = {
    columns: {
        name: {
            title: 'Facility Type',
            filter: true,
            width: '80%'
        },
        value: {
            title: 'Percentage',
            filter: true,
            width: '20%',
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
    }
}