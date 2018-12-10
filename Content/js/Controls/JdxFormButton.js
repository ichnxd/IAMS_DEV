var jDxButton = DevExpress.ui.dxTextArea.inherit({
    _init: function () {
        this.callBase();
    },
    _render: function () {
        var _ = this;
        $('<div class="FormButton"></div>').dxButton({
            text: _.option('caption'),
            onInitialized: function (e) {
                var OnInit = _.option('onButInitialized');
                //console.log(OnInit);
                OnInit(e.component);
            }
        }).appendTo(this._$element);
    },
    _renderDisplayText: function (value) {
      
       
    }
});
DevExpress.registerComponent("jDxButton",jDxButton);