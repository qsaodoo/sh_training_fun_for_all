# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class MailMessage(models.Model):
    # TODO : put a bug here
    _inherit = 'mail.message'

    rating_ids_O = fields.One2many('rating.rating', 'message_id', groups='base.group_user', string='Related ratings')
