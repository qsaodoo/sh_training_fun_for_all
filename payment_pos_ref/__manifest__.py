# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.
{
    'name': "POS Payment reference",
    'version': '15.0.0.0',
    'category': 'Point of Sale',
    'summary': "",
    'description': """ 


    """,
    'author': 'Gerardo Soto',
    'website': "",
    'depends': ['base', 'point_of_sale','account_accountant'],
    'data': [
        'views/pos_config.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'payment_pos_ref/static/src/js/models.js',
            'payment_pos_ref/static/src/js/Screens/PaymentScreen/PaymentScreen.js',
            'payment_pos_ref/static/src/js/Screens/ProductScreen/ProductScreen.js',
            'payment_pos_ref/static/src/js/Popups/ReceiptEmailPopup.js',
        ],
        'web.assets_qweb': [
            'payment_pos_ref/static/src/xml/**/*',
        ],
    },
    'license':'OPL-1',
    'installable': True,
    'auto_install': False,
    "images":['static/description/Email-Receipt-POS.gif'],
}

