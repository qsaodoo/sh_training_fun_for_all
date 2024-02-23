odoo.define('payment_pos_ref.PosEmailReceiptPaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const { Gui } = require('point_of_sale.Gui');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var _t = core._t;
    const { useErrorHandlers, useAsyncLockedMethod } = require('point_of_sale.custom_hooks');

    const PosEmailReceiptPaymentScreen= (PaymentScreen) => class extends PaymentScreen {
        constructor() {
            super(...arguments);
        }


        async selectClient() {
            // IMPROVEMENT: This code snippet is repeated multiple times.
            // Maybe it's better to create a function for it.
            const currentClient = this.currentOrder.get_client();
            const { confirmed, payload: newClient } = await this.showTempScreen(
                'ClientListScreen',
                { client: currentClient }
            );
            if (confirmed) {
                this.currentOrder.set_client(newClient);
                this.currentOrder.updatePricelist(newClient);
                if(newClient){
                    if (newClient.email){
                        this.env.pos.get_order().set_receipt_email(newClient.email);
                    }
                } else{
                     this.env.pos.get_order().set_receipt_email('');
                }
            }
        }

        async sendEmailReceipt() {
            const { confirmed, payload } = await this.showPopup('ReceiptEmailPopup', {
                title: this.env._t('Payment Reference'),
            });
            if (confirmed) {
                this.env.pos.get_order().set_receipt_email(payload);
            }
        }

        async validateOrder(isForceValidate) {
            if(this.env.pos.config.cash_rounding) {
                if(!this.env.pos.get_order().check_paymentlines_rounding()) {
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Rounding error in payment lines'),
                        body: this.env._t("The amount of your payment lines must be rounded to validate the transaction."),
                    });
                    return;
                }
            }
            if (await this._isOrderValid(isForceValidate)) {
                for (let line of this.paymentLines) {
                    if (!line.is_done()) this.currentOrder.remove_paymentline(line);
                }
                await this._finalizeValidation();
            }
        }



    };
    Registries.Component.extend(PaymentScreen, PosEmailReceiptPaymentScreen);
    return PaymentScreen;
});