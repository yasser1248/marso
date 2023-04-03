frappe.ui.form.on('Sales Invoice', {
    merge_items(frm) { 
        frm.call({
            method: 'marso.override.make_item_merge',
            args: {
                document: frm.doc
            },
            freeze: true,
            // callback: (r) => {
            //     // on success
            // },
            // error: (r) => {
            //     // on error
            // }
        })
    }
})