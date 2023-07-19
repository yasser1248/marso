// Copyright (c) 2023, basel waheed and contributors
// For license information, please see license.txt

frappe.ui.form.on('Packing List', {



	ship_to: function(frm) {
		if ( frm.doc.ship_to) {
			frappe.call({
				'method': 'frappe.contacts.doctype.address.address.get_default_address',
				'args': {
					'doctype': 'Customer',
					'name': frm.doc.ship_to
				},
				'callback': function(r) {
					frm.set_value('customer_address', r.message);
				}
			});
		}
	} ,

});



frappe.ui.form.on('Packing List Details', { 

	qty_kg : function(frm ) {
		calculate_total_weight(frm)
	},
	packing_list_details_remove(frm){
		calculate_total_weight(frm)
	},

});



function calculate_total_weight(frm){
	let amount = 0;
	frm.doc.packing_list_details.forEach(function (d) {
		amount += d.qty_kg;
	});
	frm.set_value("total_weight" ,amount )
	frm.set_value("tnw" ,amount )
}