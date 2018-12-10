"use strict";

define(function () {
    "use strict";
    function baseModelHelper() {
        return this;
    };

    baseModelHelper.prototype = {
        Init: function Init(VC) {
            this.VC = VC;
            this.CurrentObject = VC.$scope.CurrentObject;
        },
        onLoad: function onLoad() {},
        onCurrentObjectChanged: function onCurrentObjectChanged(e) {},
        onCurrentObjectSaved: function onCurrentObjectSaved(e) {},
        isColumnGridEditable: function isColumnGridEditable(p, e) {
            return true;
        },
        onInitListView: function onInitListView() {},
        onInitDetailView: function onInitDetailView() {},
        rndID: function rndID() {
            var min = 1000;
            var max = 9999;
            return (Math.floor(Math.random() * (max - min + 1)) + min) * -1;
        },
        getCurrentObject: function getCurrentObject() {
            var _ = this;
            var VC = this.VC;
            var SelectedItems = _.ID_ViewType == 1 ? VC.Grid.getSelectedRowsData() : [VC.$scope.CurrentObject];
            if (SelectedItems.length !== 1) return true;
            return SelectedItems[0];
        }
    };

    return baseModelHelper;
});

