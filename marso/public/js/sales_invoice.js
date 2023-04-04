frappe.ui.form.on('Sales Invoice', {
    merge_items(frm) { 
        frm.call({
            method: 'marso.override.make_item_merge',
            args: {
                document: frm.doc
            },
            // freeze: true,
            callback: (r) => {
                // frm.clear_table("items")
                // frm.refresh_field("items")
                console.log(r)
                // let items_table = r.message.items
                // frm.set_value("documents" , r.message.delivery_note)
                // for (let i in items_table){
                //     console.log(cur_frm.doc)
                //     var row = frappe.model.add_child(cur_frm.doc, "Sales Invoice Item", "items");
                    // cur_frm.append('items', {
                    //     'item_code': i,
                    //     'item_name': items_table[i].item_name ,
                    //     // 'field': 'field_value'
                    // })
                    
                    // console.log(i)
                    // row.item_code = i;
                    // row.item_name = items_table[i].item_name;
                    // row.rate = items_table[i].rate ;
                    // row.qty =  items_table[i].qty ;
                    // row.amount = items_table[i].qty * items_table[i].rate ;
                    // row.uom = items_table[i].uom;
                    // row.income_account =items_table[i].income_account ;
                    // row.description = items_table[i].description ;
                    // row.item = `${i}:${items_table[i].item_name}` ;
        
                // }
                // cur_frm.refresh_field("items")
            },
            error: (r) => {
                console.log("Error")
                console.log(r)
            }
        })
    }
})

// frappe.ui.form.on('Sales Invoice', {
// 	refresh(frm) {
// class Sales_invoice {
//     constructor() {
//         this.basket = {};
//         this.document = [];
//     }
//     add(list){
//         list.map(i => {
//             if (i.item_code in this.basket){
//                 this.basket[i.item_code]["qty"].push(i.qty);
//                 this.basket[i.item_code]["amount"].push(i.amount);
                
//             } else {
//                 this.basket[i.item_code] = {"item_name":i.item_name,"amount" :[i.amount],"qty":[i.qty],"uom":i.uom ,"income_account":i.income_account,"description":i.description}
				
//             }
//             this.document.unshift(i.delivery_note)
//         })
//     }
//     get_total(){
//         for (let i in this.basket){
//             const sum_quantity = this.basket[i].qty.reduce((acc,value) => {
//                 return acc + value
//             } , 0 )
//             this.basket[i].qty = sum_quantity ;
//             const sum_price = this.basket[i].amount.reduce((acc,value) => {
//                 return acc + value
//             } , 0 )
//             this.basket[i].amount = sum_price /  this.basket[i].qty;

//         };
        
        
//     }
// }
// frappe.ui.form.on('Sales Invoice', {
// 	merge_items(frm) {
// 		let items_table = new Sales_invoice()
// 		items_table.add(frm.doc.items)
// 		items_table.get_total()
// 		cur_frm.clear_table("items")
// 		cur_frm.refresh_field("items")
//         frm.set_value("documents" , items_table.document.toString())
//         frm.refresh_field("documents")
// 		// for (let i in items_table.basket){
// 		// 	let child = cur_frm.add_child("items");
// 		// 	frappe.model.set_value(child.doctype, child.name, "item_code", i)
// 		// 	frappe.model.set_value(child.doctype, child.name, "item_name", items_table.basket[i].item_name)
// 		// 	frappe.model.set_value(child.doctype, child.name, "rate", items_table.basket[i].amount)
// 		// 	frappe.model.set_value(child.doctype, child.name, "qty", items_table.basket[i].qty)
// 		// 	frappe.model.set_value(child.doctype, child.name, "description", items_table.basket[i].description)
// 		// 	frappe.model.set_value(child.doctype, child.name, "uom", items_table.basket[i].uom)
// 		// 	frappe.model.set_value(child.doctype, child.name, "income_account", items_table.basket[i].income_account)
// 		// 	frappe.model.set_value(child.doctype, child.name, "item", `${i}:${items_table.basket[i].item_name}`)
// 		// }
// 		for (let i in items_table.basket){
// 			var row = frappe.model.add_child(cur_frm.doc, "Sales Invoice Item", "items");
// 			row.item_code = i;
// 			row.item_name = items_table.basket[i].item_name;
// 			row.rate = items_table.basket[i].amount ;
// 			row.qty =  items_table.basket[i].qty ;
// 			row.amount = items_table.basket[i].qty * items_table.basket[i].amount ;
// 			row.uom = items_table.basket[i].uom;
// 			row.income_account =items_table.basket[i].income_account ;
// 			row.description = items_table.basket[i].description ;
// 			row.item = `${i}:${items_table.basket[i].item_name}` ;

// 		}
// 		cur_frm.refresh_field("items")
// 	}
// })
// }
// })


