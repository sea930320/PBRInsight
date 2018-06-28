// category DataTable Settings
export var categorySettings = {
    columns: {
        name: {
            title: 'Therapy Area',
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
};

// individual DataTable Settings
export var individualSettings = {
    columns: {
        name: {
            title: 'Disease Name',
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
};