odoo.define('payment_pos_ref.ReceiptEmailPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { useState } = owl.hooks;
    const { _lt } = require('@web/core/l10n/translation');

    class ReceiptEmailPopup extends AbstractAwaitablePopup {
        constructor() {
            super(...arguments);
            this.inputPaymentRef = useState('');
        }

        save() {
            var input_email = document.getElementById("payment_ref").value;
            const inputEmail = this.inputPaymentRef.value;
            const currentOrder = this.env.pos.get_order();
            console.log("Current Order:", currentOrder);
            if (currentOrder) {
                // Get the active payment line

                    // Save the payment_ref value in the ui_paymentline dictionary
                    currentOrder.payment_ref = inputEmail;
                    // Trigger an update to reflect changes in the UI (if needed)
                    currentOrder.trigger('change', currentOrder);
                }
             else {
                    console.error("No current order");
             }
            this.props.resolve({ confirmed: true, data: { payment_ref: inputEmail } });

            // Trigger the 'close-popup' event
            this.trigger('close-popup');


        }


        cancel() {
            this.props.resolve({ confirmed: false, payload: null });
			this.trigger('close-popup');
        }

    }
    ReceiptEmailPopup.template = 'ReceiptEmailPopup';
    ReceiptEmailPopup.defaultProps = {
        confirmText: _lt('Send'),
        cancelText: _lt('Cancel'),
        body: '',
    };

    Registries.Component.add(ReceiptEmailPopup);
    return ReceiptEmailPopup;
});