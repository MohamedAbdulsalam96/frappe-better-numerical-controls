import {
    isVal,
    isDataObject
} from './utils/check.js';

frappe.ui.form.ControlInt = frappe.ui.form.ControlInt.extend({
    make_input: function() {
        this._super();
        if (this.df.fieldtype !== 'Int') return;
        if (frappe.utils.is_json(this.df.options)) {
            this.df.options = frappe.utils.parse_json(this.df.options);
        }
        if (isDataObject(this.df.options)) {
            let opts = this.df.options,
            me = this;
            ['min', 'max'].forEach(function(k) {
                if (isVal(opts[k])) me['_' + k] = cint(opts[k]);
            });
        }
    },
    parse: function(value) {
        value = this._super(value);
        if (isVal(this._min) && this._min > value) return this._min;
        if (isVal(this._max) && this._max < value) return this._max;
        return value;
    }
});