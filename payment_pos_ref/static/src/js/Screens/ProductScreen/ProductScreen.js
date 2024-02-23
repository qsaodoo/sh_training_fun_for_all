odoo.define('payment_pos_ref.ProductScreen', function(require) {
    'use strict';

    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require('web.custom_hooks');

    const PosProductScreen = ProductScreen => class extends ProductScreen {

        async _onClickCustomer() {
            const currentClient = this.currentOrder.get_client();
            if (currentClient && this.currentOrder.getHasRefundLines()) {
                this.showPopup('ErrorPopup', {
                    title: this.env._t("Can't change customer"),
                    body: _.str.sprintf(
                        this.env._t(
                            "This order already has refund lines for %s. We can't change the customer associated to it. Create a new order for the new customer."
                        ),
                        currentClient.name
                    ),
                });
                return;
            }
            const { confirmed, payload: newClient } = await this.showTempScreen(
                'ClientListScreen',
                { client: currentClient }
            );
            if (confirmed) {
                console.log("confr")
                this.currentOrder.set_client(newClient);
                this.currentOrder.updatePricelist(newClient);
                if(newClient){
                    console.log("newClient", newClient)
                    if (newClient.email){
                        this.env.pos.get_order().set_receipt_email(newClient.email);
                    }
                } else{
                     this.env.pos.get_order().set_receipt_email('');
                }
            }
        }
    };
    Registries.Component.extend(ProductScreen, PosProductScreen);
    return ProductScreen;
});