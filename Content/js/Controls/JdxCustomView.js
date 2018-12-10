//var dxTextBox = DevExpress.require('/ui/widgets/ui.textBox');
//var registerComponent = DevExpress.require('/componentRegistrator');
//var uiNamespace = DevExpress.require('/ui/uiNamespace');

var JdxCustomView = DevExpress.ui.dxTextArea.inherit({
    _init: function () {
        var _ = this;
        _.callBase();
        //_.JSDataService = angular.element(document).injector().get('JSDataService');
        //_.$q = angular.element(document).injector().get('$q');
    },
    _render: function () {
        //
        //
        //
        var element = this._$element;
        
        //
        //
        //

        //console.log('parent--->',this._$element.parent().width());

        this._$element.css({ 'max-width': this._$element.parent().width() + "px" });

        var onViewRendered = this.option('onViewRendered');
        if (onViewRendered !== null && onViewRendered !== undefined) {
            onViewRendered(element);
        }

    }
});
DevExpress.registerComponent("jdxCustomView", JdxCustomView);