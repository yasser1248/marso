# Copyright (c) 2023, basel waheed and contributors
# For license information, please see license.txt

import frappe
import erpnext
from frappe.contacts.doctype.contact.contact import get_default_contact
from frappe.contacts.doctype.address.address import get_company_address, get_default_address


from frappe.model.document import Document

class PackingList(Document):
		
	def before_save(self) :
		self.set_address_details()
		self.set_contact_details()
		# self.set_company_address()


	def set_address_details(self):
		self.customer_address = get_default_address("Customer" , self.ship_to) or ""

	
	def set_contact_details(self):
		self.customer_contact = get_default_contact("Customer" , self.ship_to) or ""

	# def set_company_address(self):
	# 	self.company_address = get_company_address(erpnext.get_default_company())













def get_contact(name:str=""):
	return get_default_contact("Customer",name)