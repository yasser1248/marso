// Copyright (c) 2023, basel waheed and contributors
// For license information, please see license.txt

frappe.ui.form.on('Certificate Of Analysis', {
	refresh: function(frm) {
		frm.set_query('test_name', 'physical_index', () => {
			return {
				filters: {
					type: 'PHYSICAL'
				}
			}
		});
		frm.set_query('test_name', 'chemical_index', () => {
			return {
				filters: {
					type: 'CHEMICAL'
				}
			}
		})
	}

});


