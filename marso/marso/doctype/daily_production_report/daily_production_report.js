// Copyright (c) 2023, basel waheed and contributors
// For license information, please see license.txt

frappe.ui.form.on('Daily Production Report', {
	first_degree: function(frm) {
		muiltyply(frm , frm.doc.first_degree , frm.doc.actual_production)
	},
	actual_production: function(frm) {
		muiltyply(frm , frm.doc.first_degree , frm.doc.actual_production)
	},
	template_number: function(frm){
		calculate(frm)
	},
	decrease: function(frm){
		calculate(frm)
	},
	diameter: function(frm){
		calculate(frm)
	},
	air: function(frm){
		calculate(frm)
	},
	dough: function(frm){
		calculate(frm)
	},
	chemistry: function(frm){
		calculate(frm)
	},
	cut: function(frm){
		calculate(frm)
	},
	factor: function(frm){
		calculate(frm)
	},
	actual_production: function(frm){
		calculate(frm)
	},

});

function muiltyply(frm ,num1 , num2) {
	if (num1 && num2){
		frm.set_value("kpis_frist_degree", num1 / num2 )
	}else  {
		frm.set_value("kpis_frist_degree", 0 )
	}
	
}

function calculate(frm) {
	let total = 0
	let fields = ["template_number","decrease","diameter","air","dough","chemistry","cut","factor"]
	for (let i = 0; i <= fields.length ; i++) {
		if (frm.doc[fields[i]]){
			total += frm.doc[fields[i]]
		}

	}
	if ( frm.doc.actual_production) {
		frm.set_value("kpis_second_degree" , total)
	} else {
		frm.set_value("kpis_second_degree" , 0)
	}
}