var jDxNumberBox = DevExpress.ui.dxNumberBox.inherit({
    _init: function () {
        this.callBase();
    },
    _render: function () {
        this.callBase();
        this._input().css({ 'text-align': 'right' });
    },
    //_forceRefreshInputValue: function () {
    //    if (this.option("mode") === "number")
    //        return;
    //    var $input = this._input(),
    //        valueFormat = this.option("valueFormat");
    //    $input.val(null);
    //    $input.val(Globalize.format(this.option("value"), "n2"))
    //},
    _forceRefreshInputValue: function () {
        var output = this.option("value");
        if (output != null) {
            this._input().val(Globalize.format(parseFloat(this.option("value")), "n2"));            
        }
        //console.log('force', typeof (output))
    },

    _normalizeText: function (value) {
        //value = $.trim(commonUtils.isDefined(value) ? value : this._input().val());
        if (value === undefined) value = this._input().val();
        return value;
    },

    _parseValue: function (value) {
        //var PropertyName = this.option('PropertyName');
        //console.log(PropertyName, value);
        if (value === "" || value === undefined) {
            return this.callBase(value);
        };
        if (value.split(".").length > 1) {
            var Index = value.lastIndexOf('.');
            var temp = (value.substring(0, Index).split('.').join('').split(',').join('') + value.substring(Index, value.length));

            value = parseFloat(temp).toFixed(2);
        } else {
            value = parseFloat(String(value).split(',').join('')).toFixed(2);
        }
        //console.log(value);
        return this.callBase(value);
    },
    //_parseValue: function (value) {
    //    if (value === "") return null;
    //    //value = value.replace(",", "");
    //    var Counts = value.count('.');
    //    console.log(Counts);
    //    if (Counts > 1) {
    //        console.log('before--->',value);
    //        var Index = value.indexOf('.');
    //        value = value.substring(0, Index) + value.substring(Index + 1, value.length);
    //        console.log('-->',value);
    //    }
    //    var number = parseFloat(value);
    //    if (this.option("min") !== undefined)
    //        number = math.max(number, this.option("min"));
    //    if (this.option("max") !== undefined)
    //        number = math.min(number, this.option("max"));
    //    return number
    //},
    _renderDisplayText: function (value) {
        this.callBase(value);
        if (value != null) {
             this._input().val(Globalize.format(parseFloat(value), "n2"));
        } else {
            //console.log('_renderDisplayText', value);
            this._input().val('');
        }
        //console.log('force', typeof (value))
    }
});
DevExpress.registerComponent("jDxNumberBox", jDxNumberBox);