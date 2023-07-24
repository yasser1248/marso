import frappe
from .merge import Basket
import json

@frappe.whitelist()
def make_item_merge_sales_invoice(document):
    data = json.loads(document)
    basket = Basket()
    basket.steps_to_merge( data.get('items'))
    new_data = basket.returned_data()
    return  new_data
    


@frappe.whitelist()
def sales_invoice_on_submit(doc , event) :
    if doc.documents :
        all_delivery_note = doc.documents.split("$")
        for delivery in all_delivery_note :
            if frappe.db.exists("Delivery Note", delivery) :
                delivery_note = frappe.get_doc("Delivery Note", delivery)
                delivery_note.db_set('per_billed', 100)
                delivery_note.db_set('status', "Completed")


@frappe.whitelist()
def sales_invoice_on_cancel(doc,event):
    if doc.documents :
        all_delivery_note = doc.documents.split("$")
        for delivery in all_delivery_note :
            if frappe.db.exists("Delivery Note", delivery) :
                delivery_note = frappe.get_doc("Delivery Note", delivery)
                delivery_note.db_set('per_billed', 0)
                delivery_note.db_set('status', "To Bill")