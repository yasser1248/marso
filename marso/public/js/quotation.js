frappe.ui.form.on("Quotation", "onload", function(frm) {
    frm.set_query("bank_account", function() {
        return {
            "filters": {
                "bank": frm.doc.bank,
                
            }
        };
    });
});
