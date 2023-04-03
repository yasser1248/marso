import frappe
import json

class Basket :
    def __init__(self) -> None:
        self.basket = {}
        self.document = set()
        self.delivery_note_detail = {}

    def steps_to_merge(self , items):
        for item in items:
            self.add_item_to_basket(item)
            self.add_delivery_note_details(item)
        self.calculate_rate_of_item()

    def add_item_to_basket(self , item):
        
        if item.item_code in self.basket :
            self.basket[item.item_code]['qty'] += item.qty
            self.basket[item.item_code]['amount'] += item.amount
        else :
            self.basket[item.item_code] = {'qty': item.item.qty ,"rate":0 ,"amount":item.amount }
        self.document.add(item.delivery_note)

    def add_delivery_note_details(self ,item):
        if item.dn_detail not in self.delivery_note_detail :
            self.delivery_note_detail[item.dn_detail] = item.amount
        else :
            self.delivery_note_detail[item.dn_detail] += item.amount

    
    def calculate_rate_of_item(self):
        for item in self.basket :
            self.basket[item]['rate'] = item.get('amount') / item.get("rate")

    
    def returned_data(self):
        context = {"items": self.basket , "delivery_note" : self.document , "delivery_note_details" :list(self.delivery_note_detail)}
        return context

