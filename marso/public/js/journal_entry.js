frappe.provide("erpnext.accounts");
frappe.provide("erpnext.journal_entry");


erpnext.accounts.JournalEntry = erpnext.accounts.JournalEntry.extend({
    setup_queries: function() {
		var me = this;

		me.frm.set_query("account", "accounts", function(doc, cdt, cdn) {
			return erpnext.journal_entry.account_query(me.frm);
		});

		me.frm.set_query("party_type", "accounts", function(doc, cdt, cdn) {
			const row = locals[cdt][cdn];

			return {
				query: "erpnext.setup.doctype.party_type.party_type.get_party_type",
				filters: {
					'account': row.account
				}
			}
		});

		me.frm.set_query("reference_name", "accounts", function(doc, cdt, cdn) {
			var jvd = frappe.get_doc(cdt, cdn);

			// expense claim
			if(jvd.reference_type==="Expense Claim") {
				return {
					filters: {
						'total_sanctioned_amount': ['>', 0],
						'status': ['!=', 'Paid'],
						'docstatus': 1
					}
				};
			}
			// let current_doc = locals[cdt][cdn];
			if(jvd.reference_type==="Payment Entry") {
				return {
					filters: {
						'party_type': jvd.party_type,
						"party" : jvd.party,
						// 'status': ['!=', 'Paid'],
						'docstatus': 1
					}
				};
			}

			if(jvd.reference_type==="Employee Advance") {
				return {
					filters: {
						'docstatus': 1
					}
				};
			}

			// journal entry
			if(jvd.reference_type==="Journal Entry") {
				frappe.model.validate_missing(jvd, "account");
				return {
					query: "erpnext.accounts.doctype.journal_entry.journal_entry.get_against_jv",
					filters: {
						account: jvd.account,
						party: jvd.party
					}
				};
			}

			// payroll entry
			if(jvd.reference_type==="Payroll Entry") {
				return {
					query: "erpnext.payroll.doctype.payroll_entry.payroll_entry.get_payroll_entries_for_jv",
				};
			}

			var out = {
				filters: [
					[jvd.reference_type, "docstatus", "=", 1]
				]
			};

			if(in_list(["Sales Invoice", "Purchase Invoice"], jvd.reference_type)) {
				out.filters.push([jvd.reference_type, "outstanding_amount", "!=", 0]);
				// Filter by cost center
				if(jvd.cost_center) {
					out.filters.push([jvd.reference_type, "cost_center", "in", ["", jvd.cost_center]]);
				}
				// account filter
				frappe.model.validate_missing(jvd, "account");
				var party_account_field = jvd.reference_type==="Sales Invoice" ? "debit_to": "credit_to";
				out.filters.push([jvd.reference_type, party_account_field, "=", jvd.account]);

				if (in_list(['Debit Note', 'Credit Note'], doc.voucher_type)) {
					out.filters.push([jvd.reference_type, "is_return", "=", 1]);
				}
			}

			if(in_list(["Sales Order", "Purchase Order"], jvd.reference_type)) {
				// party_type and party mandatory
				frappe.model.validate_missing(jvd, "party_type");
				frappe.model.validate_missing(jvd, "party");

				out.filters.push([jvd.reference_type, "per_billed", "<", 100]);
			}

			if(jvd.party_type && jvd.party) {
				var party_field = "";
				if(jvd.reference_type.indexOf("Sales")===0) {
					var party_field = "customer";
				} else if (jvd.reference_type.indexOf("Purchase")===0) {
					var party_field = "supplier";
				}

				if (party_field) {
					out.filters.push([jvd.reference_type, party_field, "=", jvd.party]);
				}
			}

			return out;
		});
	},
});

cur_frm.script_manager.make(erpnext.accounts.JournalEntry);


frappe.ui.form.on("Journal Entry Account", {
    reference_name: function (frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        if (row.reference_type === "Payment Entry") {
            frappe.call({
                method: "frappe.client.get_value",
                args: { doctype: row.reference_type, fieldname: "paid_amount", filters: { "name": row.reference_name } },
                callback: (r) => {
                    frappe.model.set_value(row.doctype, row.name, "credit_in_account_currency", r.message.paid_amount);
                    frm.refresh_field("accounts");
                },
            });
        }
        frm.refresh_field("accounts");
    },
});
