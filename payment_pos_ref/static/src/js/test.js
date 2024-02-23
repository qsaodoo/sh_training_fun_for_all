odoo.define('payment_pos_ref.ReceiptEmailPopup', function (require) {
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
            // Retrieve the value using Owl state
            const inputValue = this.inputPaymentRef.value;

            // Perform any necessary actions with the payment_ref value
            console.log("Payment Reference:", inputValue);

            // Access the current order from the Point of Sale
            const currentOrder = this.env.pos.get_order();

            // Check if there is a current order
            if (currentOrder) {
                // Get the active payment line
                const activePaymentLine = currentOrder.selected_paymentline;

                // Check if there is an active payment line
                if (activePaymentLine) {
                    // Save the payment_ref value in the ui_paymentline dictionary
                    activePaymentLine.ui_paymentline['payment_ref'] = inputValue;

                    // Trigger an update to reflect changes in the UI (if needed)
                    currentOrder.trigger('change', currentOrder);
                }
            }

            // Resolve the promise with the data dictionary
            this.props.resolve({ confirmed: true, data: currentOrder ? currentOrder.data : {} });

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
