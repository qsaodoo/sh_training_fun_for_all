# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.

from odoo import models, fields


class PosConfig(models.Model):
	_inherit = 'pos.config'

	allow_for_receipt_email = fields.Boolean(string="Enable To Send Receipt Email")

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: