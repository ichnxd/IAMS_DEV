var DROP_DOWN_EDITOR_CLASS = "dx-dropdowneditor",
    DROP_DOWN_EDITOR_INPUT_WRAPPER_CLASS = "dx-dropdowneditor-input-wrapper",
    DROP_DOWN_EDITOR_BUTTON_CLASS = "dx-dropdowneditor-button",
    DROP_DOWN_EDITOR_BUTTON_ICON = "dx-dropdowneditor-icon",
    DROP_DOWN_EDITOR_OVERLAY = "dx-dropdowneditor-overlay",
    DROP_DOWN_EDITOR_OVERLAY_FLIPPED = "dx-dropdowneditor-overlay-flipped",
    DROP_DOWN_EDITOR_ACTIVE = "dx-dropdowneditor-active",
    DROP_DOWN_EDITOR_BUTTON_VISIBLE = "dx-dropdowneditor-button-visible",
    DROP_DOWN_EDITOR_FIELD_CLICKABLE = "dx-dropdowneditor-field-clickable",
TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = "dx-show-clear-button";

var DxListViewBox = DevExpress.ui.dxSelectBox.inherit({
    //_supportedKeys: function (e) {
    //    try {
    //        this.callBase(e);
    //    } catch (e) { }
    //},
    _init: function () {
        this.callBase();

        var _ = this;
        //console.log(this);
        _.State = null;

        var cfilters = _.option('ColumnsFilter');
        //console.log("Filters--->>>>", cfilters);

        //this.option("applyValueMode", 'useButtons');

        _.Clear = function () {
            if (_.$Grid !== undefined && _.$Grid !== null) {
                _.$Grid.clearSelection();
            }
            _.$setValue(null, true,true);
            if (_._options.OnItemSelected != undefined) {

                _._options.OnItemSelected([]);

            }
            var _OnItemSelected = _.option('_OnItemSelected');
            if (_OnItemSelected !== undefined) {
                _OnItemSelected();
            }
        }


        _.$isInit = false;

        _.openPopup = function () {

            if (_.option("opened") === true) return;

            _.option("opened", true);
            
        }

        _.$JsDataService = angular.element(document).injector().get('JSDataService');

        _.$q = angular.element(document).injector().get('$q');

        _.$timeout = angular.element(document).injector().get('$timeout');

        this.option('displayExpr', 'Name');

        this.option('displayValue', 'ID');


        var IsMultiSelect = _.option('IsMultiSelect') != undefined ? _.option('IsMultiSelect') : false;

        //this.option('showClearButton', true);

        if (IsMultiSelect == false) {
            this.option('showClearButton', true);
        } else {
            this.option('showClearButton', false);
        }


        var ID_ModelProperty = this.option('ID_ModelProperty');
        var ID_Control = this.option('ID_Control');
        var ControlName = this.option('ControlName');
        

        this.option('searchEnabled', true);
        this.option('onEnterKey', function (e) {

            if (e.jQueryEvent.ctrlKey == true && e.jQueryEvent.altKey == true) {

                var JsPopUpView = angular.element(document).injector().get('JsPopUpView');
                JsPopUpView.OpenDetailView(15, {
                    ID_CurrentObject: ID_ModelProperty
                });
                return;
            };

            if ( e.jQueryEvent.ctrlKey == true && e.jQueryEvent.shiftKey == true ) { 
                //_.EditModelDetail_Setting(ID_Control, ControlName);
                var JsPopUpView = angular.element(document).injector().get('JsPopUpView');
                JsPopUpView.OpenDetailView(20, {
                    ID_CurrentObject: ID_Control,
                    fullScreen: true
                });
                return;
            }

            
            if (_.$Grid !== undefined && _.$Grid !== null) {
                var SelectedData = _.$Grid.getSelectedRowsData();
                if (IsMultiSelect == false) {
                    if (SelectedData.length !== 1) return;
                    _.option("opened", false);
                    _.$setValue(SelectedData[0],false,true);
                } else {
                    _.option("opened", false);
                    _.$setValue(SelectedData, true,true);
                }
            }
            var _OnItemSelected = _.option('_OnItemSelected');
            if (_OnItemSelected !== undefined) {
                _OnItemSelected();
            }
        });
        this.option('onKeyDown', function (e) {
            e.which = e.jQueryEvent.which;
            if (e.which == 38 || e.which == 40) {

                if (_.option("opened") == false) {
                    _.option("opened", true);
                    return;
                }

                if (_.$Grid !== undefined && _.$Grid !== null) {

                    var selKey = _.$Grid.getSelectedRowKeys();
                    if (selKey.length == 0) {
                        _.$Grid.selectRowsByIndexes([0]);

                        return;
                    }
                    if (selKey.length) {
                        var currentKey = selKey[0];
                        var index = _.$Grid.getRowIndexByKey(currentKey);
                        if (e.which == 38) {
                            index--;
                            if (index >= 0) {
                                _.$Grid.selectRowsByIndexes([index]);
                                //e.jQueryEvent.stopPropagation();
                            }
                        }
                        else if (e.which == 40) {
                            index++;
                            _.$Grid.selectRowsByIndexes([index]);
                            //e.jQueryEvent.stopPropagation();
                        }
                    }
                }
            }
            //console.log(e.jQueryEvent.which);
            if (e.jQueryEvent.which === 8 || e.jQueryEvent.which === 46) { //Delete and backspace
                
                _.$timeout(function () {
                    if ($(_._$placeholder).hasClass('dx-state-invisible') === false) {
                        var value = _.option("value");
                        if (value != null) {
                            _.Clear();
                        }
                    }
                }, 500);
                
            }
        });
    }
    //, _valueChangeEventHandler: function (e) {
    //    this.callBase(e);
    //}
    , _searchDataSource: function () {
        this._clearSearchTimer();
        var opened = this.option("opened");
        if (opened == false) this.option("opened", true);
        this.option('searchValue', this._searchValue());
        this.refresh();
    }
    , _filterDataSource: function (searchValue) {
      
    }
    , _fieldBlurHandler: function () {
        //alert('xxxx');
        var selectedItem = this.option("selectedItem");
        if (this.option("value") == null) {
            this._renderInputValue().always($.proxy(function (e) {
                this._setSelectedItem(selectedItem);
                this._renderDisplayText(this._displayGetter(this.option("selectedItem")))
            }, this))
        }
    }
    , refresh: function () {
        if ( this.$Grid !== undefined ) this.$Grid.refresh();
    }
    , _renderPopupContent: function () {
        var contentTemplate = this._getTemplateByOption("contentTemplate");
        var $popupContent = this._popup.content();

        $popupContent.empty();

        this._setPopupOption("minHeight", 270);
        this._setPopupOption("onShown", function () {
            if (_.$dirty === true) {
                _.refresh();
            }
            _.$timeout(function () {
                //_.$Grid.focus();
            }, 500);
        });
        this._setPopupOption("minWidth", 500);
        this._setPopupOption("resizeEnabled", true);
        //
        // dxDataGrid
        //

        var _ = this;

        var IsMultiSelect = _.option('IsMultiSelect') != undefined ? _.option('IsMultiSelect') : false;

        var Items = [];

        var ModelOption = _.option("ModelOption");

        var OpenCurrentObject = null;
        var NewCurrentObject = null;

        if (ModelOption !== undefined) {

            OpenCurrentObject = function (ID_CurrentObject) {
                var _IDTab = ModelOption.ID_DetailView * 1000 * ID_CurrentObject;
                var $body = angular.element(document.body);

                if (ModelOption.IsModal == true) {

                    var JsPopUpView = angular.element(document).injector().get('JsPopUpView');

                    JsPopUpView.OpenDetailView(ModelOption.ID_DetailView, {
                        ID_CurrentObject: ID_CurrentObject,
                        fullScreen: false
                    });

                } else {

                    var $rootScope = $body.injector().get('$rootScope');

                    $rootScope.$emit("CallNewTabMethod", {
                        ID: _IDTab,
                        Caption: ModelOption.ModelPropertyName,
                        ID_ViewType: 2,
                        ViewID: ModelOption.ID_DetailView,
                        ID_CurrentObject: ID_CurrentObject,
                        ImageName: ModelOption.Icon
                    });

                }
                _.option("opened", false);
            };

            NewCurrentObject = function () {
                var _IDTab = ModelOption.ID_DetailView * 1000 * -1;
                var $body = angular.element(document.body);
                var $rootScope = $body.injector().get('$rootScope');
                var ID_Model_Caller = ModelOption.ID_Model_Caller;
                if (ModelOption.IsModal == true) {

                    var JsPopUpView = angular.element(document).injector().get('JsPopUpView');

                    JsPopUpView.OpenDetailView(ModelOption.ID_DetailView, {
                        ID_CurrentObject: -1,
                        fullScreen: false,
                        ID_Model_Caller: ID_Model_Caller
                    });

                } else {
                    var data = {
                        ID: _IDTab,
                        Caption: ModelOption.ModelPropertyName,
                        ID_ViewType: 2,
                        ViewID: ModelOption.ID_DetailView,
                        ID_CurrentObject: -1,
                        ImageName: ModelOption.Icon,
                        $onCurrentObjectSaved: function (CurrentObject) {
                            _.$setValue(CurrentObject,false,true);
                        },
                        params: {
                            ID_Model_Caller: ID_Model_Caller
                        },
                        $ClosedAfterSaved : true
                    };

                    var onCreateNewObject = _.option('onCreateNewObject');
                    if (onCreateNewObject !== undefined && onCreateNewObject !== null) {
                        onCreateNewObject(data);
                        if (data.cancel == true) {
                            return;
                        }
                    }

                    $rootScope.$emit("CallNewTabMethod", data);
                }
                _.option("opened", false);
            };

            Items.push({
                id : 1,
                text: 'New', //+ ModelOption.ModelPropertyName,
                icon: 'mdi mdi-file-outline'
            });
        }

        Items.push({
            id: 3,
            text: 'Refresh',
            icon: 'mdi mdi-refresh'
        });

        if (IsMultiSelect == true) {
            Items.push({
                id: 7,
                text: 'Clear Selection',
                icon: 'mdi mdi-link-off'
            });
        }

        //
        //
        //

        var FormatKey = _.option('FormatKey');
        var _Columns = null;

        if (_.option('IsDeveloperMode') == true) {
            Items.push(
                {
                    text: 'Options',
                    icon: 'mdi mdi-settings',
                    items: [
                        {
                            id: 4,
                            text: 'Save Format',
                            icon: 'mdi mdi-content-save'
                        },
                        {
                            id: 5,
                            icon: 'mdi mdi-pencil-box-outline',
                            text: 'Edit Format',

                        },
                        {
                            id: 6,
                            icon: 'mdi mdi-table-column-width',
                            text: 'Group Panel',
                        }
                    ]
                }
            );
        }

        $('<div class="jdxlistview-menu-list"></div>').dxMenu({
            items: Items,
            onItemClick: function (e) {
                switch (e.itemData.id) {
                    case 1:
                        NewCurrentObject();
                        break;
                    case 3:
                        _.$Grid.refresh();
                        break;
                    case 4:

                        if (FormatKey === undefined) {
                            FormatKey = Options.ID_View.replace("-", "");
                        };

                        var State = _.$Grid.state();
                        State.selectedRowKeys = [];

                        var ColumnStates = [];

                        $.each(_Columns, function (i, c) {
                            if (c.visible == true) {
                                var Column = Enumerable.From(State.columns).Where("$.dataField == '" + c.dataField + "'").SingleOrDefault();
                                Column.caption = c.caption;
                                ColumnStates.push(Column);
                            }
                        });

                        State.columns = ColumnStates;

                        _.$JsDataService.Post('/JsApp/SaveViewGridLookupState', {
                            formatKey: FormatKey,
                            //ID: Options.ID_Control,
                            //formatKey : Options.formatKey,
                            format: JSON.stringify(State)
                        }).then(function (response) {
                            DevExpress.ui.notify('Layout Save.', 'success', 1000);
                        });
                        break;
                    case 5:
                        //_.option("opened", false);
                        //_.$JsDataService.loadViewState(FormatKey, true).then(function (d) {
                        //    var $rootScope = angular.element(document).injector().get('$rootScope');
                        //    $rootScope.$emit("CallNewTabMethod", {
                        //        ID: _.$JsDataService.getRandomInt(),
                        //        Caption: 'Code Editor (' + FormatKey + ')',
                        //        ID_ViewType: 5,
                        //        ViewID: 4642,
                        //        params: {
                        //            Text: d.data,
                        //            FormatKey: FormatKey
                        //        }
                        //    });
                        //});

                        if (_.State == null) return;

                        var $rootScope = angular.element(document).injector().get('$rootScope');

                        $rootScope.$emit("CallNewTabMethod", {

                            ID: getRandomInt(),
                            Caption: 'SQL VIEW',
                            ID_ViewType: 5,
                            ViewID: 3350,
                            params: {
                                ID_ViewType: 3,
                                ID_View: _.State.ID
                            }
                        });

                        break;
                    case 6:
                        var Value = _.$Grid.option('groupPanel.visible');
                        _.$Grid.option('groupPanel.visible', !Value);
                        break;
                    case 7:
                        _.$Grid.clearSelection();
                        _.$setValue(null, true,true);
                        if (_._options.OnItemSelected != undefined) {

                            _._options.OnItemSelected([]);

                        }
                        break;
                }
            }
        }).appendTo($popupContent);

       
        _.$JsDataService.loadViewState(FormatKey).then(function (state) {

            _.State = state;

            //if (state !== null) {
            //    if (state.data == '') state = null;
            //}
            //var ListViewState = undefined;
            //if (state != null) {
            //    ListViewState = JSON.parse(state.data);
            //}

            $('<div class="dxComboGrid"></div>').dxDataGrid({
                columns: state == null ? undefined : (state.Columns == null ? undefined : state.Columns),
                dataSource: {
                    load: function (loadOptions) {

                        var deferred = _.$q.defer();

                        var isMultipleFilter = false;

                        var ListViewFilterString = null;
                    
                        var SearchValue = _.option('searchValue');

                        if (loadOptions.filter != undefined) {
                            ListViewFilterString = "(" + _.GetFilterString(loadOptions.filter) + ")";
                        }

                        var data = {
                            FilterString: ListViewFilterString
                        };

                        var SortingExpr = null;

                        if (loadOptions.sort !== undefined && loadOptions.sort !== null) {
                            $.each(loadOptions.sort, function (i, o) {
                                SortingExpr = o.selector + " " + (o.desc === true ? "DESC" : "");
                            });
                            data.SortingExpr = SortingExpr;
                        }


                        if (SearchValue != undefined && SearchValue != null) {
                            var cfilters = _.option('ColumnsFilter');
                            //console.log("Filters--->>>>",cfilters);
                            if (cfilters !== undefined && cfilters !== null) {
                                var filterString = "Name LIKE '%" + SearchValue + "%'";
                                $.each(cfilters, function (i, item) {
                                    if (item.toUpperCase() !== "NAME" && item.trim() !== "") {
                                        filterString += " OR CAST(" + item + " AS VARCHAR(200)) LIKE '%" + SearchValue + "%' ";
                                    }                                    
                                });
                                data.FilterExpr = filterString;
                            } else {
                                data.FilterExpr = "Name LIKE '%" + SearchValue + "%'";
                            }
                        }

                        if (_.$isInitDataSource === undefined) {
                            _.$isInitDataSource = true;
                            var CurrentValue = _.option('CurrentValue');
                            if (CurrentValue !== null && CurrentValue !== undefined) {
                                data.FilterExpr = "ID = " + CurrentValue.ID;
                            }
                        }

                        if (_._options.onLoad !== undefined) {
                            _._options.onLoad(data,_);
                        }

                        data.ShowSummaries = false;

                        _.$JsDataService.Query(
                            _.option("SQL"),
                            data,
                            (loadOptions.skip == undefined ? 0 : loadOptions.skip)
                        ).then(function (Data) {

                            deferred.resolve(Data.collection);

                        });

                        return deferred.promise;
                    }, totalCount: function () {
                        return 0;
                    }
                },
                height: function () {
                    return (ModelOption !== undefined ? 240 : 260);
                },
                scrolling: {
                    mode: "infinite"
                },
                columnAutoWidth: true,
                columnResizingMode : 'widget',
                onSelectionChanged: function (options) {
                    var scrollable = options.component.getView('rowsView')._scrollable;      
                    var selectedRowElements = options.component.element().find('tr.dx-selection');
                    scrollable.scrollToElement(selectedRowElements);
                },
                remoteOperations: {
                    filtering: true,
                    paging: true,
                    summary: true,
                    sorting: true
                },
                selection: IsMultiSelect ? {
                    mode: 'multiple',
                    showCheckBoxesMode: "always"
                } : {
                    mode : 'single'
                },
                sorting: {
                    mode: "single"
                },
                loadPanel: {
                    enabled: false
                },
                //onRowClick: function (e) {
                //    e.component.selectRows([e.key], true);
                //},
                allowColumnReordering: true,
                allowColumnResizing: true,
                showColumnLines: true,
                customizeColumns: function (columns) {
                    if (_.option('IsDeveloperMode') == true) {
                        _Columns = columns;
                    }
                    var VisibleColumns = _.option('Columns');
                    $.each(columns, function (i, c) {

                        //if (ListViewState !== undefined && ListViewState !== null) {
                        //    var ColumnState = Enumerable.From(ListViewState.columns).Where("$.dataField == '" + c.dataField + "'").SingleOrDefault();
                        //    if (ColumnState !== null && ColumnState !== undefined) {

                        //        for (var property in ColumnState) {
                        //            c[property] = ColumnState[property];
                        //        };

                        //        if (!!ColumnState.caption) {
                        //            c.caption = ColumnState.caption;
                        //        }
                        //    }
                        //}
                        if (c.dataField === "ID") {
                            c.width = 50;
                            c.allowResizing = false;
                            c.allowReordering = false;
                            c.allowFixing = true;
                            if (_.option('IsDeveloperMode') === true) {
                                c.visible = true;
                            } else {
                                c.visible = false;
                            }
                        } else {

                            if (VisibleColumns !== undefined && VisibleColumns !== null) {
                                var _Column = Enumerable.From(VisibleColumns).Where(function (e) {
                                    if (e == c.dataField) return true;
                                    return false;
                                }).SingleOrDefault();
                                if (_Column !== undefined) {
                                    c.visible = true;
                                    c.allowFixing = true;
                                    if (VisibleColumns.length > 5) {
                                        if (c.width == undefined) {
                                            c.width = 150;
                                        }
                                    }
                                } else {
                                    c.visible = false;
                                }
                            }
                        }

                    });

                },
                onRowClick: function (e) {
                    var component = e.component;

                    if (IsMultiSelect == true) {
                        component.selectRows([e.key], true);
                        return;
                    }

                    if (!component.clickCount)
                        component.clickCount = 1;
                    else
                        component.clickCount = component.clickCount + 1;


                    if (component.clickCount == 1) {
                        component.lastClickTime = new Date();

                        setTimeout(function () { component.lastClickTime = 0; component.clickCount = 0; }, 350);
                    }
                    else if (component.clickCount == 2) {
                        if (((new Date()) - component.lastClickTime) < 300) {

                            _.option("opened", false);

                            var SelectedData = e.component.getSelectedRowsData();

                            _.$setValue(IsMultiSelect ? SelectedData : SelectedData[0], IsMultiSelect, true);
                            //alert('dbl Click');

                            var _OnItemSelected = _.option('_OnItemSelected');
                            if (_OnItemSelected !== undefined) {
                                _OnItemSelected();
                            }
                        }
                        component.clickCount = 0;

                        component.lastClickTime = 0;
                    }
                },
                filterRow: {
                    visible: false
                },
                onInitialized: function (e) {
                    _.$Grid = e.component;
                    _.$isInit = true;

                } ,
                onKeyDown: function (e) {
                    //alert('xxxx');
                    if (e.jQueryEvent.keyCode == 27) {
                        e.component.clearSelection();
                        if (IsMultiSelect) {
                            _.$setValue(null, true,true);
                        }
                    }
                    if (e.jQueryEvent.keyCode == 13) {
                        var SelectedData = e.component.getSelectedRowsData();

                        if (IsMultiSelect == false) {
                            if (SelectedData.length !== 1) return;
                            _.option("opened", false);
                            _.$setValue(SelectedData[0],false,true);
                        } else {
                        
                            _.option("opened", false);

                            _.$setValue(SelectedData,true,true);
                        }
                    }

                    if (e.jQueryEvent.keyCode == 38 || e.jQueryEvent.keyCode == 40) {
                        var selKey = e.component.getSelectedRowKeys();
                        if (selKey.length) {
                            var currentKey = selKey[0];
                            var index = e.component.getRowIndexByKey(currentKey);
                            if (e.jQueryEvent.keyCode == 38) {
                                index--;
                                if (index >= 0) {
                                    e.component.selectRowsByIndexes([index]);
                                    e.jQueryEvent.stopPropagation();
                                }
                            }
                            else if (e.jQueryEvent.keyCode == 40) {
                                index++;
                                e.component.selectRowsByIndexes([index]);
                                e.jQueryEvent.stopPropagation();
                            }
                        }
                    }
                },
                paging: {
                    pageSize: 50
                },
                hoverStateEnabled: true,
                onContentReady: function (e) {
                    //var Rows = e.component._controllers.data._dataSource._items;
                    //if (Rows == null) Rows = [];
                    //var CurrentValue = _.option('CurrentValue');
                    //_.option('items', Rows);
                    
                    _.$dirty = false;

                },
                onContextMenuPreparing: function (e) {

                    if (e.items == null) e.items = [];

                    //e.items.push({
                    //    text: 'Refresh'
                    //      , icon: 'mdi mdi-refresh'
                    //      , onItemClick: function () {
                    //          e.component.refresh();
                    //      }
                    //});

                    var ModelOption = _.option("ModelOption");
                    if (ModelOption !== undefined) {

                        //e.items.unshift({
                        //      text: 'New'
                        //    , icon: 'mdi mdi-file-outline'
                        //    , onItemClick: function () {
                        //        NewCurrentObject();
                        //    }
                        //});

                  
                    
                        if (e.row != undefined) {

                            if (e.row.rowType === "data") {

                                _.$Grid.selectRowsByIndexes(e.row.rowIndex);
                            
                                e.items.push({
                                      text: 'Open ' + e.row.data.Name
                                    , icon: "mdi mdi-tab"
                                    , onItemClick: function () {
                                        var ID_CurrentObject = e.row.data.ID;
                                        OpenCurrentObject(ID_CurrentObject);
                                    }
                                });
                            }
                        }
                    }
                
                }
            }).appendTo($popupContent);

        });
        contentTemplate.render($popupContent);
    }
    , _renderOpenedState: function () {
        
        var opened = this.option("opened");
        if (opened) this._createPopup();
        this.element().toggleClass(DROP_DOWN_EDITOR_ACTIVE, opened);
        if (opened == true) {
            if (this.$Grid !== undefined && this.$Grid !== null) {
                if (this.option("value") === null) {
                    this.$Grid.refresh();
                }
            }
        }
        this._setPopupOption("visible", opened);
        this.setAria({
            expanded: opened,
            owns: (opened || undefined) && this._popupContentId
        })
    },
    _popupPositionedHandler: function (e) {
        this._popup.overlayContent().toggleClass(DROP_DOWN_EDITOR_OVERLAY_FLIPPED, e.position === undefined ? false :  e.position.v.flip)
    },
    _displayValue: function (item) {
        
        var _ = this;

        var IsMultiSelect = _.option('IsMultiSelect') != undefined ? _.option('IsMultiSelect') : false;

        var SelectedItem = _.option("selectedItem");

        if (IsMultiSelect) {
            SelectedItem = _.option("values");
            //console.log(IsMultiSelect, SelectedItem);
        }
        
        if (SelectedItem == null) return null;
        
        var displayValue = null;

        if (IsMultiSelect) {
            if (SelectedItem != null) {
                if (SelectedItem.length > 1) {
                    displayValue = '(Multiple Values)';
                } else {
                    if (SelectedItem.length == 1) {
                        displayValue = SelectedItem[0].Name;
                    }
                }
            }
        } else {
            displayValue = SelectedItem.Name;
            
        }
        //console.log('displayValue', displayValue);
        //alert(displayValue);
        return displayValue;
    },
    _clearTextValue: function () {
        this.callBase();
        //console.log('clear Text Value')
    },
    _clearValueHandler: function () {
        this.reset();
        //console.log('_clearValueHandler', this);
        //var SearchEnabled = this.option('searchEnabled');
        //if (SearchEnabled == true) return;
        //this.option('searchEnabled',true);

    },
    $setValue: function (Value,IsMulti,IsSelf) {
        
        if (IsMulti == undefined) IsMulti = false;

        var _ = this;

        

        if (IsMulti == false) {

            

            this.option('selectedItem', Value);

            if (IsSelf === true) {
                _.$IsSelf = true;
            }
            
            //alert(Value.ID);

            this.option('value', Value.ID);

        } else {
            if (Value == null) Value = [];

            this.option('values', Value.length == 0 ? null : Value);

            this.option('selectedItem', Value.length == 0 ? null : { } );


            if (IsSelf === true) {
                _.$IsSelf = true;
            }


            this.option('value', Value.length == 0 ? null : - 1);
         
            //this.repaint();
        }

        if (_._options.OnItemSelected != undefined) {

            _._options.OnItemSelected(Value);

        }
    },
    _renderClearButton: function () {
        var clearButtonVisibility = this._clearButtonVisibility();
        this.element().toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, clearButtonVisibility);
        if (clearButtonVisibility) {
            if (this._$clearButton === undefined || this._$clearButton === null) {
                this._$clearButton = this._createClearButton();
                this._$clearButton.prependTo(this._buttonsContainer())
            }
        }
        if (this._$clearButton)
            this._$clearButton.toggleClass("dx-state-invisible", !clearButtonVisibility)
    },
    _focusOutHandler: function (e) {
        //Jefrey Sambile for tabbing
    },
    _createDropDownButton: function () {
        try {
            return this.callBase();
        } catch (ex) {

        }
    },
    _renderDropButton: function () {
        var dropButtonVisible = this.option("showDropButton");
        this.element().toggleClass(DROP_DOWN_EDITOR_BUTTON_VISIBLE, dropButtonVisible);
        if (!dropButtonVisible) {
            this._$dropButton && this._$dropButton.remove();
            this._$dropButton = null;
            return
        }

        if (!this._$dropButton) {
            this._$dropButton = this._createDropButton().addClass(DROP_DOWN_EDITOR_BUTTON_CLASS);
            this._$dropButton.prependTo(this._buttonsContainer());
        }
    },
    //
    //  UTILS
    //

    GetFilterString : function(filterArray) {

        var _ = this;

        var filterString = '';

        $.each(filterArray, function (i, o) {

            if ($.isArray(o)) {

                filterString += " (" + _.GetFilterString(o) + ") "

            } else {

                var value = '';

                if (i % 2 == 1) {

                    if (o === 'contains' || o === 'startswith' || o === 'endswith') {
                        value = 'LIKE';
                    } else {
                        value = o.toUpperCase();
                    }
                }

                if (i === 0) {

                    value = o;

                } else if (i === 2) {

                    if (jQuery.type(o) === "string") {

                        if (filterArray[1] === 'contains') {
                            value = "'%" + o + "%'"
                        } else if (filterArray[1] === 'startswith') {
                            value = "'" + o + "%'"
                        } else if (filterArray[1] === 'endswith') {
                            value = "'%" + o + "'"
                        } else {
                            value = "'" + o + "'"
                        }
                    } else if (jQuery.type(o) === "date") {


                        value = "'" + moment(o).format("YYYY-MM-DD") + "'"

                    } else if (jQuery.type(o) === "boolean") {

                        if (o == true) {

                            value = "1";

                        } else {

                            value = "2";

                        }

                    } else {

                        value = o;

                    }

                }

                filterString += " " + value;

            }


        });

        return filterString;
    }


});
DevExpress.registerComponent("dxListViewBox", DxListViewBox);


