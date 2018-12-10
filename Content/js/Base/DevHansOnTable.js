(function (Handsontable) {

    var hDxSelectBox = Handsontable.editors.BaseEditor.prototype.extend();

    hDxSelectBox.prototype.init = function () {
        var _ = this;
        this._control = $('<div></div>').dxSelectBox({
            onInitialized: function (e) { },
            displayExpr: 'Name',
            valueExpr: 'ID',
            searchEnabled: true,
            onItemClick: function (e) {
                _.select.style.display = 'none';
            },
            onSelectionChanged: function (e) {
                if (e.selectedItem == null) return;
                var array = [[e.selectedItem.ID]];
                var KeyObject = _.instance.view.settings.data[_.cellProperties.row];
                if (_.cellProperties.DisplayProperty != undefined) {
                    KeyObject[_.cellProperties.DisplayProperty] = e.selectedItem['Name'];
                    //console.log('onSelectionChanged', KeyObject);
                }
                if (_.cellProperties.onItemSelected !== undefined && _.cellProperties.onItemSelected !== null) {
                    _.cellProperties.onItemSelected({
                        value: e.selectedItem,
                        row: _.cellProperties.row,
                        dataField: _.cellProperties.prop,
                        key: KeyObject
                    });
                }
                _.saveValue(array, undefined);
            }
        });
        this.select = this._control[0];
        
        Handsontable.Dom.addClass(this.select, 'dhtSelectEditor');
        this.select.style.display = 'none';
        this.instance.rootElement.appendChild(this.select);
        //
        //
        //
        this.$q = angular.element(document).injector().get('$q');
        this.$timeout = angular.element(document).injector().get('$timeout');
        this.JSDataService = angular.element(document).injector().get('JSDataService');
    }

    hDxSelectBox.prototype.focus = function () {
        var Control = this._control.dxSelectBox('instance');
        Control.focus();
        Control.option('opened', true);
    }

    hDxSelectBox.prototype.prepare = function () {
        Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
        var _ = this;
        //var SelectBox = null;
        if ($(this._control).closest("body").length == 0) return;
        var SelectBox = this._control.dxSelectBox('instance');
        if (SelectBox == null) return;
        var dataSource = this.cellProperties.dataSource;
        var SQL = this.cellProperties.SQL;
        if (SQL !== undefined) {
            if (this.InitDataSource === undefined) {
                SelectBox.option('dataSource', new DevExpress.data.DataSource({
                        load: function (loadOptions) {
                            var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                            var searchValue = loadOptions.searchValue;
                            var searchExpr = loadOptions.searchExpr !== null && loadOptions.searchExpr !== undefined ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                            var defer = _.$q.defer();
                            _.JSDataService.GetDataSet('/JsApp/GetDataCollection', {
                                  SearchExpr: searchExpr
                                , SearchValue: searchValue
                                , SQL : SQL
                                , Skip: skip
                            }).then(function (Data) {
                                defer.resolve(Data.collection);
                            });
                            return defer.promise;
                        },
                        byKey: function (key) {
                            var defer = _.$q.defer();
                            if (isNaN(key) == true) {
                                _.$timeout(function () {
                                    defer.resolve(null);
                                });
                            } else {
                                _.JSDataService.GetDataSet('/JsApp/GetDataCollection', {
                                    Key: key
                                  , SQL: SQL
                                }).then(function (Data) {
                                    defer.resolve(Data.collection[0]);
                                });
                            }
                            return defer.promise;
                        },
                    })
                );
                this.InitDataSource = true;
            }
        } else {
            SelectBox.option('items', dataSource);
        }
    }

    hDxSelectBox.prototype.saveValue = function (val, ctrlDown) {
        Handsontable.editors.BaseEditor.prototype.saveValue.call(this, val, ctrlDown);
    };

    var offsetScroll = function (elem) {
        var scrollLeft, scrollTop;
        scrollLeft = scrollTop = 0;
        while (elem && elem != document.documentElement)
        {
            scrollLeft += elem.scrollLeft;
            scrollTop += elem.scrollTop;
            if (elem.style.position == 'fixed')
                break;
            elem = elem.parentElement;
        }
        return {
            left: scrollLeft,
            top: scrollTop
        };
    };

    hDxSelectBox.prototype.open = function () {
        var width = Handsontable.Dom.outerWidth(this.TD);
        var height = Handsontable.Dom.outerHeight(this.TD);
        var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
        var tdOffset = Handsontable.Dom.offset(this.TD);

        var ScrollViewTop = $(this.instance.rootElement).find('.ht_master').find('.wtHolder')[0];
        var ScrollTop = Handsontable.Dom.getScrollTop(ScrollViewTop);
        var ScrollLeft = Handsontable.Dom.getScrollLeft(ScrollViewTop);
        
        var SelectBox = this._control.dxSelectBox('instance');
        SelectBox.option('height', height - 1);
        SelectBox.option('width', width - 2);

        this.select.style.top = ((tdOffset.top - rootOffset.top) - ScrollTop) + 'px';
        this.select.style.left = ((tdOffset.left - rootOffset.left + 1) - ScrollLeft ) + 'px';
        this.select.style.margin = '0px';
        this.select.style.display = '';
    }
    
    hDxSelectBox.prototype.close = function () { }

    hDxSelectBox.prototype.getValue = function (value) {
        var SelectBox = this._control.dxSelectBox('instance');
        return SelectBox.option('value');
    }

    hDxSelectBox.prototype.setValue = function (value) {
        var SelectBox = this._control.dxSelectBox('instance');
        value = parseInt(value);
        SelectBox.option('value', value);
    };

    Handsontable.editors.CustomEditor = hDxSelectBox;
    Handsontable.editors.registerEditor('dxSelectBox', hDxSelectBox);
    //
    //
    //

    var hDxListViewBox = Handsontable.editors.BaseEditor.prototype.extend();

    var onBeforeKeyDown = function (event) {
        switch (event.keyCode) {
            case 13:
                event.stopImmediatePropagation();
                event.preventDefault();
                break;
        }
    };

    hDxListViewBox.prototype.init = function () {
        var _ = this;
        this._control = $('<div></div>').dxListViewBox({
            onInitialized: function (e) { },
            displayExpr: 'Name',
            valueExpr: 'ID',
            _OnItemSelected: function (e) {
                _.select.style.display = 'none';
                _.instance.removeHook('beforeKeyDown', onBeforeKeyDown);
                _.instance.selectCell(_.row + 1, _.col);
            },
            onSelectionChanged: function (e) {
                if (e.selectedItem == null) return;
                var array = [[e.selectedItem.ID]];
                var KeyObject = _.instance.view.settings.data[_.cellProperties.row];

                if (_.cellProperties.DisplayProperty != undefined) {
                    KeyObject[_.cellProperties.DisplayProperty] = e.selectedItem['Name'];
                }

                if (_.cellProperties.onItemSelected !== undefined && _.cellProperties.onItemSelected !== null) {
                    _.cellProperties.onItemSelected({
                        value: e.selectedItem,
                        row: _.cellProperties.row,
                        dataField: _.cellProperties.prop,
                        key: KeyObject
                    });
                }
                _.saveValue(array, undefined);
                
                
            }
        });
        this.select = this._control[0];

        Handsontable.Dom.addClass(this.select, 'dhtSelectEditor');
        this.select.style.display = 'none';
        this.instance.rootElement.appendChild(this.select);
        //
        //
        //
        this.$q = angular.element(document).injector().get('$q');
        this.$timeout = angular.element(document).injector().get('$timeout');
        this.JSDataService = angular.element(document).injector().get('JSDataService');
    }

    hDxListViewBox.prototype.open = function () {
        var width = Handsontable.Dom.outerWidth(this.TD);
        var height = Handsontable.Dom.outerHeight(this.TD);
        var rootOffset = Handsontable.Dom.offset(this.instance.rootElement);
        var tdOffset = Handsontable.Dom.offset(this.TD);

        var ScrollViewTop = $(this.instance.rootElement).find('.ht_master').find('.wtHolder')[0];
        var ScrollTop = Handsontable.Dom.getScrollTop(ScrollViewTop);
        var ScrollLeft = Handsontable.Dom.getScrollLeft(ScrollViewTop);

        var SelectBox = this._control.dxListViewBox('instance');
        SelectBox.option('height', height - 1);
        SelectBox.option('width', width - 2);

        this.select.style.top = ((tdOffset.top - rootOffset.top) - ScrollTop) + 'px';
        this.select.style.left = ((tdOffset.left - rootOffset.left + 1) - ScrollLeft ) + 'px';
        this.select.style.margin = '0px';
        this.select.style.display = '';
    }

    hDxListViewBox.prototype.prepare = function () {
        Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);
        var _ = this;
        var SelectBox = this._control.dxListViewBox('instance');
        var SQL = this.cellProperties.SQL;
        
        if (SQL !== undefined) {
            if (this.InitDataSource === undefined) {
                SelectBox.option('SQL', SQL);
                this.InitDataSource = true;
            }
        }
        
    }

    hDxListViewBox.prototype.focus = function () {
        var Control = this._control.dxListViewBox('instance');
        Control.focus();
        Control.option('opened', true);
        if (Control.$Grid !== undefined) {
            Control.$Grid.clearSelection();
            this.instance.addHook('beforeKeyDown', onBeforeKeyDown);
        }
    }

    hDxListViewBox.prototype.close = function () { }

    hDxListViewBox.prototype.getValue = function (value) {
        var SelectBox = this._control.dxListViewBox('instance');
        return SelectBox.option('value');
    }

    hDxListViewBox.prototype.setValue = function (value) {
        if (value === '') value = -1;
        value = parseInt(value);
        var SelectBox = this._control.dxListViewBox('instance');
        SelectBox.option('value', value);
    }

    Handsontable.editors.CustomEditor = hDxListViewBox;
    Handsontable.editors.registerEditor('dxListView', hDxListViewBox);



})(Handsontable);