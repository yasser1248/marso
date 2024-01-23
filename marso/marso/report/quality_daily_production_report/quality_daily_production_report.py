# Copyright (c) 2024, basel waheed and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data


def get_data(filters:dict = {}):
    additional_filters = {}
    if filters.get("from_date") and filters.get("to_date") :
        additional_filters["date"] =  ["between", ( filters.get("from_date"),filters.get("to_date") ) ] 

    data=frappe.db.get_all("Daily Production Report",
        filters = additional_filters,
        fields =["date","the_piston","employee_id","actual_production","product",
                "shift_type","number_of_clicks","first_degree","expected_production",
                "template_number","decrease","diameter","air","dough","chemistry",
                "cut","factor","employee_defect_3rd","press_defect_3rd","cut_defect3rd",
                "scrap_weight","kpis_frist_degree","notes","scrap_per_piece","kpis_second_degree"], 
        
        )
    return data


def get_columns():
    """return colums based on filters"""
    columns =[
        {
            "label" : _("Date"),
            "fieldname" : "date" ,
            "fieldtype": "Date",
            "width" : 120
        },
        {
            "label": _("The Press"),
            "fieldname": "the_piston",
            "fieldtype": "Link",
            "options": "Machine",
            "width": 120,
        },
        {
            "label": _("Employee ID"),
            "fieldname": "employee_id",
            "fieldtype": "Link",
            "options": "Employee",
            "width": 120,
        },
        {
            "label": _("Actual Production"),
            "fieldname": "actual_production",
            "fieldtype": "Float",
            "width": 120,
        },
        {
            "label": _("Product"),
            "fieldname": "product",
            "fieldtype": "Link",
            "options": "Item",
            "width": 120,
        },
        {
            "label": _("Shift Type"),
            "fieldname": "shift_type",
            "fieldtype": "Link",
            "options": "Shift Type",
            "width": 120,
        },
        {
            "label": _("Number of Presses"),
            "fieldname": "number_of_clicks",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("First Degree"),
            "fieldname": "first_degree",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Expected Production"),
            "fieldname": "expected_production",
            "fieldtype": "Float",
            "width": 120,
        },
        {
            "label": _("Mould Number"),
            "fieldname": "template_number",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Incomplete Product"),
            "fieldname": "decrease",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Cutter Defect"),
            "fieldname": "diameter",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Bubbles Defect"),
            "fieldname": "air",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Mixer Defect"),
            "fieldname": "dough",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Mixing Defect"),
            "fieldname": "chemistry",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Employee Defect"),
            "fieldname": "factor",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Employee Defect (3rd)"),
            "fieldname": "employee_defect_3rd",
            "fieldtype": "Data",
            "width": 120,
        },
        {
            "label": _("Press Defect (3rd)"),
            "fieldname": "press_defect_3rd",
            "fieldtype": "Data",
            "width": 120,
        },
        {
            "label": _("Cut Defect(3rd)"),
            "fieldname": "cut_defect3rd",
            "fieldtype": "Data",
            "width": 120,
        },
        {
            "label": _("Scrap Weight"),
            "fieldname": "scrap_weight",
            "fieldtype": "Float",
            "width": 120,
        },
        {
            "label": _("KPI's Frist Degree"),
            "fieldname": "kpis_frist_degree",
            "fieldtype": "Float",
            "width": 120,
        },
        {
            "label": _("Notes"),
            "fieldname": "notes",
            "fieldtype": "Int",
            "width": 120,
        },
        {
            "label": _("Scrap per Piece"),
            "fieldname": "scrap_per_piece",
            "fieldtype": "Float",
            "width": 120,
        },
        {
            "label": _("KPI's Second Degree"),
            "fieldname": "kpis_second_degree",
            "fieldtype": "Float",
            "width": 120,
        },
    ]
    return columns