odoo.define('payment_pos_ref.POSEmailsReceipt', function (require) {
    "use strict";

    var models = require('point_of_sale.models');
    var utils = require('web.utils');
    const Registries = require('point_of_sale.Registries');
    var core = require('web.core');

    var OrderSuper = models.Order;
    models.Order = models.Order.extend({

        initialize: function(parent,options) {
            OrderSuper.prototype.initialize.apply(this,arguments);
            this.receipt_email = this.get_receipt_email() || false;
        },

        init_from_JSON: function(json) {
            OrderSuper.prototype.init_from_JSON.apply(this,arguments);
            this.receipt_email = json.receipt_email;
        },

        set_receipt_email:function(receipt_email) {
            this.receipt_email = receipt_email;
            this.trigger('change',this);
        },

        get_receipt_email:function() {
            return this.receipt_email;
        },

        export_as_JSON: function() {
            var json = OrderSuper.prototype.export_as_JSON.call(this);
            json.receipt_email = this.receipt_email;
            return json;
        },

        export_for_printing: function() {
            var json = OrderSuper.prototype.export_for_printing.call(this);
            json.receipt_email = this.get_receipt_email();
            return json;
        },

    });
});