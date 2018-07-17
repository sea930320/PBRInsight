// Population by Age Group DataTable Settings
export var tmSettings = {
    columns: {
        name: {
            title: 'Year',
            filter: true,
            class: 'text-center',
            width: '20%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${value}</div>`
            }
        },
        valuation: {
            title: 'Naira',
            filter: true,
            class: 'text-center',
            width: '80%',
            type: 'html',
            valuePrepareFunction: function (value) {
                return `<div class="text-center">${Number(value).toLocaleString('en-GB')} </div>`
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