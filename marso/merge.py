import frappe
import json

class Basket :
    def __init__(self) -> None:
        self.basket = {}
        self.document = set()
        # self.delivery_note_detail = {}

    def steps_to_merge(self , items:list = []):
        for item in items:
            self.add_item_to_basket(item)
        #     self.add_delivery_note_details(item)
        self.calculate_rate_of_item()

    def add_item_to_basket(self , item):
        
        if item.get("item_code") in self.basket :
            self.basket[item.get("item_code")]['qty'] += item.get("qty")
            self.basket[item.get("item_code")]['amount'] += item.get("amount")
        else :
            self.basket[item.get("item_code")] = {'qty': item.get("qty") ,"rate":0 ,"amount":item.get("amount") ,"item_name":item.get("item_name") , "uom":item.get("uom")  ,"income_account":item.get("income_account") ,"description":item.get("description")}
        self.document.add(item.get("delivery_note"))

    # def add_delivery_note_details(self ,item):
    #     if item.get("dn_detail") not in self.delivery_note_detail :
    #         self.delivery_note_detail[item.get("dn_detail")] = item.get("amount")
    #     else :
    #         self.delivery_note_detail[item.get("dn_detail")] += item.get("amount")

    
    def calculate_rate_of_item(self):
        for key , value in self.basket.items() :
            self.basket[key]['rate'] = value.get('amount') / value.get("qty")

    
    def returned_data(self):
        context = {"items": self.basket , "delivery_note" : str(self.document)}
        return context

