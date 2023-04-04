frappe.ui.form.on('Sales Invoice', {
    merge_items(frm) { 
        frm.toggle_display('merge_items', 0);
        frm.call({
            method: 'marso.override.make_item_merge_sales_invoice',
            args: {
                document: frm.doc
            },
            freeze: true,
            callback: (r) => {
                frm.clear_table("items")
                frm.refresh_field("items")
                let items_table = r.message.items_data
                frm.set_value("documents" , r.message.delivery_note)
                for (let i in items_table){
                    var row = frappe.model.add_child(cur_frm.doc, "Sales Invoice Item", "items");
                    row.item_code = i;
                    row.item_name = items_table[i].item_name;
                    row.rate = items_table[i].rate ;
                    row.qty =  items_table[i].qty ;
                    row.amount = items_table[i].qty * items_table[i].rate ;
                    row.uom = items_table[i].uom;
                    row.income_account =items_table[i].income_account ;
                    row.description = items_table[i].description ;
                    row.item = `${i}:${items_table[i].item_name}` ;
        
                }
                cur_frm.refresh_field("items")
            },
            error: (r) => {
                frappe.msgprint(__("There is a problem merging items"))
            }
        })
    }
})
