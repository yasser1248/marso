import frappe
from .merge import Basket
import json

@frappe.whitelist()
def make_item_merge(document):
    document = json.loads(document)
    basket = Basket()
    basket.steps_to_merge( document.items)
    new_data = basket.returned_data()
    document.documents = new_data.get('delivery_note')