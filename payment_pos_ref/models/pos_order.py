# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class AccountBankStatementLine(models.Model):
    _inherit = 'account.bank.statement.line'

    pos_payment_ref = fields.Boolean(related='journal_id.pos_payment_ref', readonly=True)
    payment_ref = fields.Char('Bank Name')


class POSPayments(models.Model):
    _inherit = "pos.payment"

    payment_ref = fields.Char(string="Referencia de Pago")


class PosOrder(models.Model):
    _inherit = "pos.order"

    payment_ref = fields.Char(string="Referencia de Pago")

    def _payment_fields(self, order, ui_paymentline):
        res = super(PosOrder, self)._payment_fields(order, ui_paymentline)
        res.update({
            'payment_ref': ui_paymentline.get('payment_ref'),
        })
        return res

    def add_payment(self, data):
        statement_id = super(PosOrder, self).add_payment(data)
        StatementLine = self.env['account.bank.statement.line']
        journal = self.env['pos.payment.method'].browse(data['payment_method_id']).journal_id.id
        statement_lines = StatementLine.search([
            ('statement_id', '=', statement_id),
            #('pos_statement_id', '=', self.id),
            ('journal_id', '=', journal),
            ('amount', '=', data['amount'])])
        for line in statement_lines:
            if line.journal_id.pos_payment_ref:
                payment_ref = {
                    'payment_ref': data.get('payment_ref'),
                }
                line.write(payment_ref)
                break

        return statement_id


# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:


class AccountJournal(models.Model):
    _inherit = 'account.journal'

    pos_payment_ref = fields.Boolean('POS Payment Ref', default=False)