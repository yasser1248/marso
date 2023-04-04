import frappe
from .merge import Basket
import json

@frappe.whitelist()
def make_item_merge(document):
    data = json.loads(document)
    basket = Basket()
    basket.steps_to_merge( data.get('items'))
    new_data = basket.returned_data()
    return  new_data
    