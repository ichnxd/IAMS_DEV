function JsPopUpView($uibModal, $q, JSDataService, $timeout, $interpolate, $rootScope, $controller, $compile, JsWizardView, CacheFactory, $http) {
    var JsPopUpView = {};

    function getRandomInt() {
        var min = 1000, max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    function GetFilterString(filterArray) {

        var _ = this;

        var filterString = '';

        $.each(filterArray, function (i, o) {

            if ($.isArray(o)) {

                filterString += " (" + GetFilterString(o) + ") "

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

    JsPopUpView.EMsgBox = function (message, title, options) {
        return JsPopUpView.MsgBox(message, title, options, 4);
    }

    JsPopUpView.SMsgBox = function (message, title, options) {
        return JsPopUpView.MsgBox(message, title, options, 2);
    }

    JsPopUpView.WMsgBox = function(message, title, options ) {
        return JsPopUpView.MsgBox(message, title, options, 3);
    }

    JsPopUpView.MsgBox = function (message, title, options , type ) {

        var defer = $q.defer();
        
        var PopUpID = generateUUID();

        var icon = 'fa fa-exclamation-circle';
        var typeClass = 'info';
        switch (type) {
            case 1://Information
                icon = 'fa fa-exclamation-circle';
                break;
            case 2://Success
                icon = 'fa fa-check-circle';
                typeClass = 'success';
                break;
            case 3://Warning
                icon = 'fa fa-exclamation-triangle';
                typeClass = 'warning';
                break;
            case 4://Danger
                icon = 'fa fa-times-circle';
                typeClass = 'danger';
                break;
        }

        var Template = "<div id='" + PopUpID + "' class='MsgBox'></div>";
        $('body').append(Template);

        var wHeight = $(window).height();
        var wWidth = $(window).width();

        $('#' + PopUpID).dxPopup(
            {
                showTitle : false,
                height: function () {
                    return 'auto'
                },
                width: function () {
                    return 'auto';
                },
                onHidden: function (e) {
                    $timeout(function () {
                        $("#" + PopUpID).remove();
                    }, 500);
                },

                closeOnOutsideClick: false,
                shadingColor: '#1b1b1bcc',
                contentTemplate: function (e) {

                    var maxHeight = parseInt(wHeight * 0.20);

                    var NewScope = $rootScope.$new();
               
                    NewScope.ButOk = {
                        text: 'OK',
                        onClick: function () {

                            defer.resolve();

                            var PopUp = $("#" + PopUpID).dxPopup('instance');
                            PopUp.hide();
                        }
                    };

                    var template = null;

                    if (type == 4) {
                        NewScope.dxScrollView = {
                            height: maxHeight
                        };

                        template = '<div class="container"><div class="header ' + typeClass + '"><span class="' + icon + '"> </span> ' + title
                            + '</div><div class="msg"><div dx-scroll-view="dxScrollView">' + message + '</div></div><div class="btn-container"><legend/><div dx-button="ButOk"></div></div></div>';
                    } else {

                        template = '<div class="container"><div class="header ' + typeClass + '"><span class="' + icon + '"> </span> ' + title
                            + '</div><div class="msg"><div class="msg-container">' + message + '</div></div><div class="btn-container"><legend/><div dx-button="ButOk"></div></div></div>';

                    }
                    var _compiled = $compile(template)(NewScope);

                    return _compiled;
                }
            });
        var PopUp = $("#" + PopUpID).dxPopup('instance');

        PopUp.show();

        defer.promise;
    }

    JsPopUpView.ShowPop = function (o) {
        var defer = $q.defer();
        var PopUpID = generateUUID();
        var Template = "<div id='" + PopUpID + "' class='JsPopView'></div>";
        var NewScope = $rootScope.$new(true);
        if (o.InitController !== undefined) {
            o.InitController(NewScope);
        }
        if (o.background === null || o.background === undefined) o.background = '#696969';

        var eHeight = o.element.height();
        var eWidth = o.element.width();
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        var position = o.element.offset();
        var pHeight = wHeight * 0.45;
        var pWidth = $(window).width() * 0.45;
        var eTop = position.top;
        var eLeft = position.left;

        var IsBottom = wHeight - (eTop + eHeight) >= pHeight ? true : false;
        var IsLeft = wWidth - (eLeft + eWidth) >= pWidth ? true : false;

        if (IsBottom) {

            IsBottom = (wHeight - (eTop + eHeight) - Math.floor(pHeight)) > 10;
        }

        var pPosition = null;

        if (IsBottom && IsLeft) {
            pPosition = {
                my: 'left top',
                at: 'left bottom', of: o.element
            };
        } else if (IsBottom && IsLeft === false) {
            pPosition = {
                my: 'right top',
                at: 'right bottom', of: o.element
            };
        } else if (IsBottom == false && IsLeft) {
            pPosition = {
                my: 'left bottom',
                at: 'left top', of: o.element
            };
        } else if (IsBottom == false && IsLeft == false) {

            pPosition = {
                my: 'right bottom',
                at: 'right top', of: o.element
            };

        } else {
            pPosition = { my: 'center', at: 'center', of: window }
        }


        $('body').append(Template);
        $('#' + PopUpID).dxPopup(
            {
                width: o.width === undefined ? 400 : o.width,
                height: o.height === undefined ? 300 : o.height,
                target: o.element,
                showTitle: true,
                shading: true,
                shadingColor: '#1b1b1bcc',
                closeOnOutsideClick: true,
                position: pPosition,
                visible: true,
                onHidden: function () {
                    defer.resolve(NewScope);
                    NewScope.$destroy();
                    $('#' + PopUpID).remove();
                },
                titleTemplate: function (e) {
                    e.css({ 'padding': 0 });
                    return '<div class="js-notif-title" style="background-color:'
                        + o.background + ';padding:5px;color:#fff;font-size:17px">' + o.title + '</div>';
                },
                contentTemplate: function () {
                    var html = $('<div style="height:100%"></div>');
                    var contentHtml = "";
                    if (o.templateUri !== undefined) {
                        NewScope.templateUri = o.templateUri;
                        contentHtml = "<div ng-include='templateUri'></div>";
                    } else if (o.template !== undefined) {
                        contentHtml = o.template(NewScope);
                    }                 
                    html.append($compile(contentHtml)(NewScope))
                    return html;
                }
            }
        );
        //
        //
        //
        return defer.promise;
    }


    JsPopUpView.BrowseDataSet = function (SQL, Options) {

        var defer = $q.defer();

        JSDataService.loadViewState(Options.ID_View).then(function (state) {
            
            //console.log('Current State',state);

            //if (state != null) {
            //    if (state.data == '') state = null;
            //}

            //var CurrentState = undefined;

            //if (state != null) {
            //    CurrentState = JSON.parse(state.data);
            //}
     
            var PopUpID = generateUUID();

            var Template = "<div id='" + PopUpID + "' class='JsPopView browse-data-list'></div>";

            $('body').append(Template);

            var _customizeItem = function (e) {
                if (e.value != null) {
                    if (typeof e.value == 'number') {
                        return Globalize.format(e.value, "n2")
                    }
                }
                return e.valueText;

            };

            var NewScope = $rootScope.$new(true);

            var focusOnFilterRow = function (evt) {
                var TextBox = $(NewScope.Grid._$element).find('.dx-datagrid-filter-row .dx-texteditor-input');
                switch (evt.keyCode) {
                    case 112:
                        TextBox = TextBox[0];
                        break;
                    case 113:
                        TextBox = TextBox[1];
                        break;
                    case 114:
                        TextBox = TextBox[2];
                        break;
                    case 115:
                        TextBox = TextBox[3];
                        break;
                    case 116:
                        TextBox = TextBox[4];
                        break;
                    case 117:
                        TextBox = TextBox[5];
                        break;
                    case 118:
                        TextBox = TextBox[6];
                        break;
                    case 119:
                        TextBox = TextBox[7];
                        break;
                    case 120:
                        TextBox = TextBox[8];
                        break;
                    case 121:
                        TextBox = TextBox[9];
                        break;
                    case 122:
                        TextBox = TextBox[10];
                        break;
                }
                $(TextBox).focus();
            }

            var SearchBox = null;
            var _Columns = null;

            var PageSize = Options.pageSize === undefined ? 200 : Options.pageSize;

            $('#' + PopUpID).dxPopup(
                {
                    titleTemplate: function () {

                        var header = $("<div class='header'> " + (Options.title != undefined ? Options.title : 'Browse') + " <div class='header-control'></div></div>");

                        return header;

                    },
                    onHidden: function (e) {
                        $timeout(function () {

                            $("#" + PopUpID).remove();

                        }, 500);
                    },
                    animation: false,
                    width: Options.width === undefined ? $(window).width() * 0.95 : Options.width,
                    height: Options.height === undefined ? $(window).height() * 0.95 : Options.height,
                    closeOnOutsideClick: true,
                    onShown: function (e) {

                        var popView = e.component;

                        $(popView._$element).keydown(function (e) {

                            if (e.which == 38 || e.which == 40) {
                                if (NewScope.Grid !== undefined && NewScope.Grid !== null) {
                                    var cellElement = NewScope.Grid.getCellElement(0, 1);
                                    NewScope.Grid.focus(cellElement);
                                }
                            };

                            if (e.which >= 112 && e.which <= 122) {
                                e.preventDefault();
                                e.stopPropagation();
                                focusOnFilterRow(e);
                            }
                        });

                        //console.log('-->',popView);

                        var dxMenuOptionItems = [
                            {
                                id: 3,
                                text: 'Clear Filter',
                                icon: 'blue mdi mdi-filter-remove-outline',
                            },
                           {
                               id: 1,
                               text: 'Refresh',
                               icon: 'green mdi mdi-refresh'
                           }
                        ];

                        var ID_DetailView = Options.ID_DetailView;
                        if (ID_DetailView !== null && ID_DetailView !== undefined && ID_DetailView !== 2) {
                            dxMenuOptionItems.push({
                                id :2,
                                text: 'New ' + Options.ModelName,
                                icon: 'blue mdi mdi-file-outline',
                            });
                        }

                        NewScope.dxMenuOption = {
                            items: dxMenuOptionItems,
                            onItemClick: function (e) {
                                var id = e.itemData.id;
                                switch (id) {
                                    case 1:
                                        NewScope.Grid.refresh();
                                        break;
                                    case 2:
                                        JsPopUpView.OpenDetailView(ID_DetailView, {
                                            ID_CurrentObject: -1,
                                            //fullScreen: false,
                                            height : $(window).height() * 0.93,
                                            width : $(window).width() * 0.93
                                        });
                                        break;
                                    case 3:
                                        SearchBox.reset();
                                        NewScope.Grid.clearFilter();
                                        $timeout(function () {
                                            NewScope.Grid.refresh();
                                        }, 500);
                                        break;
                                }
                            }
                        };

                        //
                        //
                        //

                        NewScope.ItemSelected = '0 Item Selected';
                        NewScope.onItemSelectedClick = function () {
                            var SelectedRows = NewScope.Grid.getSelectedRowsData();
                            if (SelectedRows.length > 0) {
                                //NewScope.Grid.option('dataSource', SelectedRows);
                                //NewScope.Grid.repaint();
                            }
                        }
                        
                        if ($rootScope.CurrentUser.IsDeveloperMode == true) {
                            NewScope.BrowseMenu = {
                                items: [
                                    {
                                        text: 'Options',
                                        items: [
                                           {
                                               ID: 1,
                                               text: 'Refresh',
                                               icon: 'mdi mdi-refresh'
                                           },
                                           {
                                               ID: 2,
                                               text: 'Filter',
                                               icon: 'mdi mdi-filter'
                                           }, {
                                               ID: 3,
                                               text: 'Clear Filter',
                                               icon: 'mdi mdi-filter-remove'
                                           }, {
                                               ID: 4,
                                               text: 'Group Panel',
                                               icon: 'mdi mdi-ungroup'
                                           }, {
                                               ID: 5,
                                               text: 'Save Layout',
                                               icon: 'mdi mdi-content-save'
                                           }, {
                                               ID: 6,
                                               text: 'Add/Edit Columns',
                                               icon: 'mdi mdi-view-list'
                                           }
                                        ]
                                    }
                                ],
                                onItemClick: function (e) {
                                    switch (e.itemData.ID) {
                                        case 1:
                                            NewScope.Grid.refresh();
                                            break;
                                        case 2:
                                            var Value = NewScope.Grid.option('filterRow.visible');
                                            NewScope.Grid.option('filterRow.visible', !Value);
                                            break;
                                        case 3:
                                            var Value = NewScope.Grid.option('searchPanel.visible');
                                            NewScope.Grid.option('searchPanel.visible', !Value);
                                            break;
                                        case 4:
                                            var Value = NewScope.Grid.option('groupPanel.visible');
                                            NewScope.Grid.option('groupPanel.visible', !Value);
                                            break;
                                        case 5:
                                            if (Options.ID_View == null || Options.ID_View == undefined) {
                                                alert('No format key is defined');
                                                return;
                                            };
                                            if (Options.formatKey === undefined) {
                                                Options.formatKey = Options.ID_View.replace("-", "");
                                            };

                                            var State = NewScope.Grid.state();
                                            State.selectedRowKeys = [];

                                            var ColumnStates = [];

                                            $.each(_Columns, function (i, c) {
                                                var Column = Enumerable.From(State.columns).Where("$.dataField == '" + c.dataField + "'").SingleOrDefault();
                                                Column.caption = c.caption;
                                                ColumnStates.push(Column);
                                            });

                                            State.columns = ColumnStates;

                                            JSDataService.Post('/JsApp/SaveViewGridLookupState', {
                                                formatKey: Options.ID_View,
                                                ID: Options.ID_Control,
                                                //formatKey : Options.formatKey,
                                                format: JSON.stringify(State)
                                            }).then(function (response) {
                                                DevExpress.ui.notify('Layout Save.', 'success', 1000);
                                            });
                                            break;
                                        case 6:

                                            var $rootScope = angular.element(document).injector().get('$rootScope');

                                            $rootScope.$emit("CallNewTabMethod", {

                                                ID: getRandomInt(),
                                                Caption: 'SQL VIEW',
                                                ID_ViewType: 5,
                                                ViewID: 3350,
                                                params: {
                                                    ID_ViewType: 3,
                                                    ID_View: state.ID
                                                }
                                            });

                                            //JSDataService.loadViewState(Options.ID_View, true).then(function (_) {
                                            //    var $rootScope = angular.element(document).injector().get('$rootScope');
                                            //    $rootScope.$emit("CallNewTabMethod", {
                                            //        ID: JSDataService.getRandomInt(),
                                            //        Caption: 'Code Editor (' + Options.ID_View + ')',
                                            //        ID_ViewType: 5,
                                            //        ViewID: 4642,
                                            //        params: {
                                            //            Text: _.data,
                                            //            FormatKey: Options.ID_View
                                            //        }
                                            //    });

                                            //});
                                            break;
                                    }
                                }
                            };
                        }

                        NewScope.ButOk = {
                            text: 'OK',
                            type: 'default',
                            icon: 'mdi mdi-checkbox-marked-circle-outline',
                            onClick: function () {
                                var SelectedRows = NewScope.Grid.getSelectedRowsData();
                                if (SelectedRows.length == 0) return;
                                
                                if (Options.validate !== undefined) {
                                    if (Options.validate(SelectedRows) == false) {
                                        return;
                                    }
                                }

                                defer.resolve(SelectedRows);

                                $("#" + PopUpID).dxPopup('instance').hide();

                            }
                        }

                        NewScope.ButCancel = {
                            text: 'CANCEL',
                            icon: 'red mdi mdi-information-outline',
                            onClick: function () {
                                $("#" + PopUpID).dxPopup('instance').hide();
                            }
                        }
                        NewScope.SearchValue = '';

                        NewScope.dxSearchBoxOption = {
                            placeholder: 'Search here...',
                            showClearButton: true,
                            mode: 'search',
                            width:300,
                            //visible: true,
                            bindingOptions: {
                                'value': 'SearchValue'
                            },
                            onEnterKey: function () {
                                $timeout(function () {
                                    NewScope.Grid.refresh();
                                }, 500);
                            },
                            onInitialized: function (e) {
                                $timeout(function () {
                                    e.component.focus();
                                    SearchBox = e.component;
                                }, 500);
                            }
                        };

                        NewScope.GridOption = {
                            columns: state !== null ? state.Columns : undefined,
                            loadPanel: {
                                enabled: false
                            },
                            dataSource: {

                                load: function (loadOptions) {

                                    var ListViewFilterString = null;

                                    if (loadOptions.filter != undefined) {

                                        ListViewFilterString = "(" + GetFilterString(loadOptions.filter) + ")";

                                    }

                                    var SortingExpr = null;

                                    if (loadOptions.sort !== undefined && loadOptions.sort !== null) {
                                        $.each(loadOptions.sort, function (i, o) {

                                            SortingExpr = o.selector + " " + (o.desc === true ? "DESC" : "");

                                        });
                                        //console.log(SortingExpr);
                                    }

                                    var d = $q.defer();
                                    //console.log('FullTextSearch',NewScope.SearchValue);
                                        
                                    JSDataService.Query(SQL
                                        , {
                                            params: Options.params,
                                            FilterString: ListViewFilterString,
                                            SortingExpr: SortingExpr,
                                            FullTextSearch: (NewScope.SearchValue.length === 0 ? undefined : NewScope.SearchValue),
                                            pageSize : PageSize
                                        }
                                        , loadOptions.skip == undefined ? 0 : loadOptions.skip
                                    ).then(function (Data) {
                                        d.resolve(Data.collection);
                                    });
                                    return d.promise;
                                },
                                totalCount: function () {

                                    return 0;

                                }

                            },
                            height: function () {
                                return "90%";
                            },
                            onInitialized: function (e) {
                                NewScope.Grid = e.component;
                                e.component.option('groupPanel.visible', false);
                            },
                            scrolling: {
                                mode: "infinite"
                            },
                            remoteOperations: {
                                filtering: true,
                                paging: true,
                                summary: true,
                                sorting:true
                            },
                            sorting: {
                                mode: "single"
                            },
                            selection: {
                                mode: 'multiple',
                                showCheckBoxesMode: "always"
                            },
                            paging: {
                                pageSize: PageSize
                            },
                            allowColumnReordering: true,
                            allowColumnResizing: true,
                            rowAlternationEnabled: true,
                            showRowLines: true,
                            columnAutoWidth: false,
                            showColumnLines: true,
                            //hoverStateEnabled : true,
                            columnChooser: {
                                enabled: $rootScope.CurrentUser.IsDeveloperMode == true,
                                //enabled: true,
                                height: 400,
                                width: 300,
                            },
                            groupPanel: {
                                visible: true
                            },
                            filterRow: {
                                visible: true,
                                applyFilter: "onClick"
                            },
                            onEditorPreparing: function (e) {
                                if (e.parentType == 'filterRow') {
                                    e.editorOptions.onEnterKey = function (arg) {
                                        e.element.find('.dx-apply-button').trigger('dxclick');
                                    }
                                }
                            },
                            searchPanel: {
                                visible: false
                            },
                            onRowClick: function (e) {

                                if (Options.onDblClick !== undefined) {

                                    var component = e.component;

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

                                            var dataGrid = e.component;
                                            var keys = dataGrid.getSelectedRowKeys();
                                            dataGrid.deselectRows(keys);


                                            e.component.selectRows([e.key]);
                                            Options.onDblClick(e.key);
                                        }
                                        component.clickCount = 0;
                                        component.lastClickTime = 0;
                                    }
                                } else {
                                    e.component.selectRows([e.key], true);
                                }
                            },
                            customizeColumns: function (columns) {

                                _Columns = columns;

                                var GroupTemplate = function (cellElement, d) {
                                    cellElement.html(d.value);
                                };
                                var indexkeys = 0;
                                $.each(columns, function (i, o) {

                                    o.groupCellTemplate = GroupTemplate;
                                    //console.log(o);
                                    if ($rootScope.CurrentUser.IsDeveloperMode !== true) {
                                        if (o.dataField === "ID") {
                                            o.visible = false;
                                        }
                                    } else {
                                        if (o.dataField === "ID") {
                                            o.width = 80;
                                        }
                                    }

                                    o.showWhenGrouped = false;
                                    o.allowFixing = true;
                                    if (o.dataField !== "ID") {
                                        o.customizeText = _customizeItem;
                                    }
                                    if (o.dataField.indexOf("ID_") == 0) {
                                        o.visible = false;
                                    }

                                    if (o.width > 0 && o.width < 100) {
                                        o.width = o.width + 40;
                                    }

                                    if (o.visible !== false) {
                                        indexkeys++
                                        o.caption = o.caption + ' (F' + (indexkeys) + ")";
                                        //console.log(o.caption);
                                    }

                                    //if (CurrentState !== undefined && CurrentState !== null) {
                                    //    var ColumnState = Enumerable.From(CurrentState.columns).Where("$.dataField == '" + o.dataField + "'").SingleOrDefault();
                                    //    if (ColumnState !== null && ColumnState !== undefined) {

                                    //        for (var property in ColumnState) {
                                    //            o[property] = ColumnState[property];
                                    //        };

                                    //        if (!!ColumnState.caption) {
                                    //            o.caption = ColumnState.caption;
                                    //        }
                                    //    }

                                        

                                    //    //
                                    //    //
                                    //    //
                                        
                                    //}

                                });
                                if (Options.onCustomizeColumns != undefined) {
                                    
                                    Options.onCustomizeColumns(columns);
                                }
                            },
                            onSelectionChanged: function (e) {
                                var Count = e.selectedRowKeys.length;
                                if (Count > 0) {
                                    NewScope.ItemSelected = Count + ' Item(s) Selected';
                                } else {
                                    NewScope.ItemSelected = '0 Item Selected';
                                }
                            },
                            onKeyDown: function (e) {

                                if (e.jQueryEvent.keyCode == 27) {
                                    e.component.clearSelection();
                                } else if (e.jQueryEvent.keyCode === 13) {

                                    //$timeout(function () {

                                    var SelectedRows = e.component.getSelectedRowsData();

                                    if (SelectedRows.length == 0) return;

                                    if (Options.validate !== undefined) {
                                        if (Options.validate(SelectedRows) == false) {
                                            return;
                                        }
                                    }

                                    defer.resolve(SelectedRows);

                                    $("#" + PopUpID).dxPopup('instance').hide();
                                    //}, 500);

                                }

                                if (e.jQueryEvent.ctrlKey === true) {
                                    e.jQueryEvent.preventDefault();
                                    e.jQueryEvent.stopPropagation();
                                    if (e.jQueryEvent.keyCode === 70) {
                                        if (SearchBox !== null) {
                                            SearchBox.focus();
                                            $(SearchBox._$element).find('input').select();
                                        }
                                    }
                                }

                                if (e.jQueryEvent.keyCode >= 112 && e.jQueryEvent.keyCode <= 122) {
                                    e.jQueryEvent.preventDefault();
                                    e.jQueryEvent.stopPropagation();
                                    focusOnFilterRow(e.jQueryEvent);
                                }
                            },
                            onContextMenuPreparing: function (e) {
                                if (e.row != undefined) {
                                    if (e.row.rowType === "data") {
                                        if (e.items == null || e.items == undefined) e.items = [];
                                        if (Options.ID_DetailView !== null && Options.ID_DetailView !== undefined) {
                                            if (Options.PropertyKey !== null && Options.PropertyKey !== undefined) {
                                                //e.component.selectedRowKeys(e.row.rowIndex);
                                                e.items.push({
                                                    text: 'Open ' + e.row.data['Name'],
                                                    icon: Options.ModelIcon,
                                                    onItemClick: function () {
                                                        JsPopUpView.OpenDetailView(ID_DetailView, {
                                                            ID_CurrentObject: e.row.data[Options.PropertyKey],
                                                            fullScreen: true
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        };

                        $timeout(function () {
                            if ($rootScope.CurrentUser.IsDeveloperMode !== true) {
                                $compile("<div class='JsMenuItems' dx-menu='dxMenuOption'></div><div dx-data-grid='GridOption'></div><div class='search-box' dx-text-box='dxSearchBoxOption' style='position:absolute;top:6px;right:5px'></div><div class='btnContainerHeader'><div class='btnContainer' style='height:10%'><div class='status' ng-click='onItemSelectedClick()'>{{ItemSelected}}</div><div dx-button='ButOk'/><div dx-button='ButCancel'/></div></div>")(NewScope).appendTo(popView._$popupContent);
                            } else {
                                $compile("<div class='BrowseMenu' dx-menu='BrowseMenu' style='height:5%'></div><div class='JsMenuItems debug' dx-menu='dxMenuOption'></div><div dx-data-grid='GridOption'></div><div class='search-box' dx-text-box='dxSearchBoxOption' style='position:absolute;top:6px;right:70px'></div><div class='btnContainerHeader'><div class='btnContainer' style='height:10%'><div class='status' ng-click='onItemSelectedClick()'>{{ItemSelected}}</div><div dx-button='ButOk'/><div dx-button='ButCancel'/></div></div>")(NewScope).appendTo(popView._$popupContent);
                            }
                        }, 500);
                    }

                }
            );

            var PopUp = $("#" + PopUpID).dxPopup('instance');
            PopUp.show();

        });

        
       
        return defer.promise;
    };

    var Open = function (View, ID_Type, Options) {
        
        var PopUp = null;
        
        if (Options.IsEditingOnly === undefined) {
            if (View.ViewAccess === null || View.ViewAccess === undefined) {
                alert('User does not have access on ' + View.ModelName + '. Please contact your System Administrator.');
                return;
            }

            var UserViewAccess = View.ViewAccess[0];

            if (UserViewAccess !== undefined) {
                if (UserViewAccess.IsDeveloper !== 1) {
                    if (!((UserViewAccess.IsAllow === true) && (UserViewAccess.IsDeny !== true))) {
                        alert('User does not have access on ' + View.ModelName);
                        return;
                    } else {
                        if (Options.CurrentObject === -1) {
                            if (UserViewAccess.IsCanWrite == false) {
                                alert('User does not allow to create on module ' + View.ModelName);
                                return;
                            }
                        }
                    }
                }
            }
        }

        var defer = $q.defer();
     
        var SrcController = null;

        switch (ID_Type) {
            case 1:
                SrcController = '/JsApp/ListView?ID=' + View.ID + '&ViewName=' + View.Name;
                break;
            case 2:
                SrcController = '/JsApp/DetailView?ID=' + View.ID + '&ViewName=' + View.Name;
                
                if (Options.IsEditingOnly !== undefined) {
                    SrcController += '&IsEditingOnly=1';
                    if (Options.PropertyLink !== undefined) {
                        SrcController += '&PropertyLink=' + Options.PropertyLink;
                    }
                }
                
                if (Options.Orientation !== undefined) {
                    SrcController += '&Orientation=' + Options.Orientation;
                }
                break;
        }


        JSDataService.LoadController(View.ViewControllerName, ID_Type, SrcController).then(function () {
            
            //var ID = Options.ID != undefined ? Options.ID : View.Name;

            var ID = generateUUID();

            var Template = "<div id='" + ID + "' class='JsPopView'></div>";

            $('body').append(Template);

            var NewScope = $rootScope.$new(true);

            //////console.log('NewScsope--->' + View.Name, NewScope);

            //ListView

            if (Options != null) {

                NewScope.OnLookUpListViewItemSelected = Options.OnLookUpListViewItemSelected !== undefined ? Options.OnLookUpListViewItemSelected : undefined;
                NewScope.FilterString = Options.FilterString !== undefined ? Options.FilterString : undefined;

            }

            NewScope.IsFullScreen = false;
            NewScope.$CurrentUser = $rootScope.CurrentUser;

            var minButton = Options.minButton !== undefined ? Options.minButton : true;
            var maxButton = Options.minButton !== undefined ? Options.minButton : true;
            var restoreButton = Options.minButton !== undefined ? Options.minButton : true;

            if (Options.anchorElement !== undefined) {

                if (Options.position === undefined) {

                    var eHeight = Options.anchorElement.height();
                    var eWidth = Options.anchorElement.width();
                    var wHeight = $(window).height();
                    var wWidth = $(window).width();
                    var position = Options.anchorElement.offset();
                    var pHeight = wHeight * 0.45;
                    var pWidth = $(window).width() * 0.45;
                    var eTop = position.top;
                    var eLeft = position.left;

                    var IsBottom = wHeight - (eTop + eHeight) >= pHeight ? true : false;
                    var IsLeft = wWidth - (eLeft + eWidth) >= pWidth ? true : false;

                    if (IsBottom) {

                        IsBottom = (wHeight - (eTop + eHeight) - Math.floor(pHeight)) > 10;
                    }

                    var pPosition = null;

                    if (IsBottom && IsLeft) {
                        pPosition = {
                            my: 'left top',
                            at: 'left bottom', of: Options.anchorElement
                        };
                    } else if (IsBottom && IsLeft === false) {
                        pPosition = {
                            my: 'right top',
                            at: 'right bottom', of: Options.anchorElement
                        };
                    } else if (IsBottom == false && IsLeft) {
                        pPosition = {
                            my: 'left bottom',
                            at: 'left top', of: Options.anchorElement
                        };
                    } else if (IsBottom == false && IsLeft == false) {
   
                        pPosition = {
                            my: 'right bottom',
                            at: 'right top', of: Options.anchorElement
                        };
                   
                    } else {
                        pPosition = { my: 'center', at: 'center', of: window }
                    }

                    Options.position = pPosition;
                }
            }

            if (Options.fullScreen === true) {
                minButton = false;
                restoreButton = false;
                maxButton = false;
            }

            //if (Options.Width == undefined && Options.Width == null) {
                //Options.width = View.Width;
            //}

            if (View.Width != null) Options.width = View.Width;
            if (View.Height != null) Options.height = View.Height;
            
            //if (Options.Height == undefined && Options.Height == null) {
                //Options.height = View.Height;
            //}
            
            $("#" + ID ).dxPopup({
                showTitle: false,
                resizeEnabled: true,
                animation : Options.animation == undefined ? true : Options.animation,
                fullScreen : Options.fullScreen == undefined ? false :  Options.fullScreen,
                closeOnOutsideClick: Options.closeOnOutsideClick != undefined ? Options.closeOnOutsideClick : false,
                shading: Options.shading == undefined ? true : Options.shading,
                shadingColor: '#1b1b1bcc',
                dragEnabled: Options.dragEnabled === undefined ? true : Options.dragEnabled,
                height: Options.height != undefined ? (Options.height != null ? Options.height : "95%") : $(window).height() * 0.95,
                width: Options.width != undefined ? (Options.width != null ? Options.width : "95%") : $(window).width() * 0.95,
                position: Options.position == undefined ? { my: 'center', at: 'center', of: window } : Options.position, 
                //titleTemplate: function () {
                //
                //    var buttons = $compile(
                //          (minButton ? "<button ng-click='OnControlButtonClick(1)' ng-hide='IsMinimized === true'><span class='mdi mdi-window-minimize'></span></button>" : "")
                //        + (restoreButton ? "<button ng-click='OnControlButtonClick(2)' ng-hide='IsFullScreen === false'><span class='mdi mdi-window-restore'></span></button>" : "" )
                //        + (maxButton ? "<button ng-click='OnControlButtonClick(3)' ng-hide='IsFullScreen === true'><span class='mdi mdi-window-maximize'></span></button>" : "")
                //        + "<button ng-click='OnControlButtonClick(4)' ng-hide='IsMinimized === true'><span class='mdi mdi-window-close'></span></button>")(NewScope);
                //
                //    var header = $("<div class='header' style='background-color:" + View.PrimaryColor + "'><span class='" + View.Icon + "'></span> " + (Options.title == undefined ? View.DisplayName : Options.title) + "<div class='header-control'></div></div>");
                //
                //    header.find('.header-control').html(buttons);
                //
                //    return header;
                //       
                //},
                onShown: function (e) {

                    var c = e.component;

                    if (c.IsInit == undefined) {

                        $(e.element).find(".dx-scrollable").dxScrollable({ showScrollbar: 'hide' });
                        $(e.element).bind('keydown', function (event) {
                            if (NewScope.$onModalKeyDown !== undefined) {
                                NewScope.$onModalKeyDown(event);
                            }
                        });

                        c.IsInit = true;
                    } else {
                        if (Options.onShown !== undefined) {
                            Options.onShown(NewScope);
                        }
                        return;
                    }

                 

                    if (Options.IsEditingOnly !== undefined) {

                        NewScope.OnEditingDone = function () {

                            Options.OnEditingDone(NewScope.CurrentObject);

                            NewScope.isDispose = true;

                            PopUp.hide();
                        }

                    }

                    //NewScope.ModalMode = {
                    //    SingleSelect: Options.SingleSelect != undefined ? Options.SingleSelect : false,
                    //    OnEditingDone: Options.OnEditingDone,
                        
                    //};

                    NewScope.ClosePopup = function (IsSaved) {
                        NewScope.isDispose = true;
                        if (IsSaved == true) {
                            
                            if (Options.OnSaved !== undefined) {
                                
                                Options.OnSaved();
                            }
                        }
                        PopUp.hide();

                    }

                    $controller(View.ViewControllerName, {
                        $scope: NewScope,
                        ViewStateName: null,
                        IsModal: true,
                        ModalMode : {
                            SingleSelect: Options.SingleSelect != undefined ? Options.SingleSelect : false,
                            OnEditingDone: Options.OnEditingDone,
                            IsFullScreen: Options.fullScreen == undefined ? false : Options.fullScreen
                        },
                        $ViewAccess: UserViewAccess,
                        CurrentObject: Options.CurrentObject,
                        $ViewOption: {
                            DataSource : View.DataSource,
                            $onCurrentObjectSaved: function () {
                               
                            }
                        }
                    });

                    var template = '<div ng-include="ViewSrc" style="height:100%"></div>';

                    var _compiled = $compile(template)(NewScope);

                    c._$popupContent.html(_compiled);

                    $timeout(function () {

                        if (Options.InitController !== undefined) {

                            Options.InitController(NewScope);

                        }

                        switch (ID_Type) {
                            case 1:
                                NewScope.ViewSrc = '/ListView?ID=' + View.ID + '&ViewName=' + View.Name + '&IsModal=1';
                                break;
                            case 2:
                                NewScope.ViewSrc = '/DetailView?ID=' + View.ID + '&ViewName=' + View.Name + '&IsModal=1' + (Options.IsEditingOnly !== undefined ? '&IsEditingOnly=1' : '') + (Options.Orientation !== undefined ? '&Orientation=' + Options.Orientation : '');
                                break;
                        }

                    });
                    
                },
                onHidden: function () {
                    
                    defer.resolve(PopUp);

                    if (Options.IsDisposeAfterClose !== undefined) {
                        if (Options.IsDisposeAfterClose === true) {
                            if (Options.onDispose !== undefined) {

                                Options.onDispose();

                            }
                            
                            $("#" + ID).remove();
                            return;
                        }
                    } 

                    if (NewScope.isDispose) {


                        if (Options.onDispose !== undefined) {

                            Options.onDispose();

                        }

                        $("#" + ID).remove();
                    }
                }
            });

            PopUp = $("#" + ID).dxPopup('instance');

            NewScope.CloseModule = function () {
                NewScope.isDispose = true;
                PopUp.hide();
            }


            NewScope.OnControlButtonClick = function (id_button) {
                switch (id_button) {
                    case 1:
                        PopUp.option('fullScreen', false);
                        NewScope.IsFullScreen = false;
                        NewScope.IsMinimized = true;
                        PopUp.option('height', 30);
                        PopUp.option('width', 300);
                        PopUp.option('resizeEnabled', false);
                        PopUp.option('position', {
                            my: 'right bottom',
                            at: 'right bottom',
                            of: 'body'
                        });
                        break;
                    case 2:
                        PopUp.option('resizeEnabled', true);
                        PopUp.option('fullScreen', false);
                        NewScope.IsFullScreen = false;
                        NewScope.IsMinimized = false;

                        PopUp.option('height', '80%');
                        PopUp.option('width', '80%');
                        var PopupView = $("#" + View.Name).find('.JsPopView');
                        PopupView.css({ 'height': '' });
                        PopupView.css({ 'width': '' });
                        PopupView.css({ 'position': 'inherit' });

                        break;
                    case 3:
                        PopUp.option('fullScreen', true);
                        NewScope.IsFullScreen = true;
                        NewScope.IsMinimized = false;
                        break;
                    case 4:
                        if (ID_Type === 2) {
                            if (NewScope.CurrentObject !== undefined && NewScope.CurrentObject !== null) {
                                if (NewScope.CurrentObject.$dirty === true) {
                                    DevExpress.ui.dialog.confirm("Do you want to discard changes?", View.DisplayName).done(function (dialogResult) {
                                        if (dialogResult) {
                                            NewScope.isDispose = true;
                                            PopUp.hide();
                                        }
                                    });
                                } else {
                                    NewScope.isDispose = true;
                                    PopUp.hide();
                                }
                            } else {
                                PopUp.hide();
                            }
                        } else {

                            

                        }
                        break;
                }
                
               
            }

            //PopUp.$scope = NewScope;
            PopUp.show();
        });

        return defer.promise;
    }

    JsPopUpView.OpenListView = function (ID_View, options) {

        var defer = $q.defer();

        //alert(ID_View);

        var Data = {
            ID: ID_View,
            ID_ViewType: 1,
            ViewName: null
        };

        JSDataService.GetCurrentObject('/JsApp/GetModelView', Data).then(function (View) {
          

            //////console.log(View);

            Open(View, 1, options).then(function (PopUpView) {

                defer.resolve(PopUpView);

            });

        });

        return defer.promise;
    }

    JsPopUpView.OpenDetailView = function (ID_View, options) {

        var Data = {
            ID:ID_View,
            ID_ViewType: 2,
            ViewName: null
        };

        //
        //
        //

        options.height = options.height === undefined ? $(window).height() * 0.95 : options.height,


        options.width =  options.width === undefined ? $(window).width() * 0.95 : options.width,


        JSDataService.GetCurrentObject('/JsApp/GetModelView', Data).then(function (View) {

            if (options.CurrentObject !== undefined) {

                options.IsEditingOnly = true;

                Open(View, 2, options);

            } else {
                JSDataService.GetCurrentObject('/JsApp/GetCurrentObject', {
                    ID: ID_View
                  , ViewName: View.Name
                  , ID_CurrentObject: options == undefined ? -1 : options.ID_CurrentObject
                  , params: JSON.stringify(options.params)
                  , DataSource : View.DataSource
                }).then(function (CurrentObject) {

                    options.CurrentObject = CurrentObject;


                    //
                    //
                    //

                    if (options.onCurrentObjectLoad != undefined) {
                        options.onCurrentObjectLoad(CurrentObject);
                    }

                    Open(View, 2, options);

                });

            }
            
        });

    }

    JsPopUpView.Login = function () {
        var _popUp = null;
        JsWizardView.Show({
            ViewSrc: 'Templates/LoginPopup.tpl.html',
            title: 'IAMS Login',
            width: 550,
            height: 260,
            showNegativeButton: true,
            onPopupInitialized: function (p) {
                _popUp = p;
            },
            InitController: function ($scope) {
                var FormLogin = null;
                var LastLogin = $rootScope.CurrentUser;
                $scope.LoginModel = {
                    Username: LastLogin !== undefined ? LastLogin.Username : null,
                    Password: null,
                    ID_Company: -1
                }

                var OnSubmitButton = function (e) {

                    var result = FormLogin.validate();
                    if (result.isValid === false) {
                        return;
                    }

                    var req = {
                        method: 'POST',
                        url: '/Login/SignIn',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: $scope.LoginModel
                    }

                    $http(req).then(function (obj) {
                        var data = JSON.parse(obj.data);
                        if (data.Status == -1) {
                            JsPopUpView.MsgBox(data.Message, 'Login');
                            return;
                        }
                        e.hide();
                    }, function (data) {

                    });

                };
                $scope.PositiveButton.text = 'Login';
                $scope.onPositiveClick = function (e) {
                    OnSubmitButton(e);
                    //window.location.replace('/Login');
                }

                $scope.NegativeButton.text = 'Exit App';
                $scope.onNegativeClick = function (e) {
                    e.hide();
                    window.location.replace('/Login');
                }


                $scope.FormOptions = {
                    bindingOptions: {
                        'formData.Username': 'LoginModel.Username',
                        'formData.Password': 'LoginModel.Password',
                        //'formData.ID_Company': 'LoginModel.ID_Company',
                    },
                    formData: $scope.LoginModel,
                    showColonAfterLabel: false,
                    onEditorEnterKey: function () {
                        OnSubmitButton(_popUp);
                    },
                    onInitialized: function (e) {
                        FormLogin = e.component;
                    },
                    items: [
                        {
                            dataField: 'Username',
                            validationRules: [{
                                type: 'required',
                                message: 'Username is required'
                            }],
                            label: {
                                visible: false
                            },
                            editorOptions: {
                                placeholder: 'Username',
                                showClearButton: true,
                                onValueChanged: function () {

                                },
                                disabled: true
                            },
                            
                        }, {
                            dataField: 'Password',
                            label: {
                                visible: false
                            },
                            editorOptions: {
                                mode: 'password',
                                placeholder: 'Password',
                                showClearButton: true,
                                onValueChanged: function () {

                                }

                            }

                        }
                    ]
                };
            }
        });
    };

    JsPopUpView.ShowSessionTimeout = function () {
        JsWizardView.Show({
            ViewSrc: 'Templates/SessionTimeout.tpl.html',
            title: 'Session Expired',
            width: 550,
            height: 260,
            showNegativeButton : true,
            InitController: function ($scope) {

                $scope.PositiveButton.Text = 'Login';
                $scope.onPositiveClick = function (e) {
                    e.hide();
                    JsPopUpView.Login();
                    //window.location.replace('/Login');
                }

                $scope.NegativeButton.Text = 'Exit App';
                $scope.onNegativeClick = function (e) {
                    e.hide();
                    window.location.replace('/Login');
                }

            }
        });
    }

    JsPopUpView.ShowAboutView = function () {
        JsWizardView.Show({
            ViewSrc: 'Templates/About.tpl.html',
            title: 'About',
            width: 550,
            height: 260,
            showNegativeButton: false,
            InitController: function ($scope) {
                $scope.onPositiveClick = function () {
                    //
                    //
                    //
                }
            }
        });
    }

    JsPopUpView.SendEmail = function () {
        JsWizardView.Show({
            ViewSrc: 'Templates/SendEmail.tpl.html',
            title: 'Send Mail',
            width: 660,
            height: 550,
            showNegativeButton: false,
            InitController: function ($scope) {
                $scope.CurrentObject = {
                    Subject: '',
                    Body: ''
                };

                $scope.formOptions = {
                    formData: $scope.CurrentObject
                }

                $scope.onPositiveClick = function () {
                    //
                    //
                    //
                }
            }
        });
    }

    //
    //
    //
    JsPopUpView.UpdateObjectReference = function (opt) {
        JsWizardView.Show({
            ViewSrc: 'Templates/UpdateObjectRef.tpl.html',
            title: 'Update Reference',
            width: 330,
            height:180,
            showNegativeButton: false,
            InitController: function ($scope) {

                var SelectBox = null;

                $scope.NewValue = null;

                $scope.CurrentObject = {
                    ID_Value: null,
                    OldValue: opt.Name
                }

                $scope.formOption = {
                    formData: $scope.CurrentObject,
                    showColonAfterLabel: false,
                    items: [
                        {
                            editorType: 'dxTextBox',
                            dataField: 'OldValue',
                            label: {
                                text: 'Old Value'
                            },
                            disabled: true
                        },
                        {
                            editorType: 'dxSelectBox',
                            dataField: 'ID_Value',
                            label: {
                                text: 'New Value'
                            },
                            editorOptions: {
                                dataSource: JSDataService.GetControlDataSource(opt.SQL),
                                displayExpr: 'Name',
                                valueExpr: 'ID',
                                displayValue: 'NewValue',
                                searchEnabled: true,
                                itemTemplate: function (d) {
                                    var div = $('<div style="padding-bottom:5px"><div style="font-size:10px">' + d.CustomerCode + '</div><div>' + d.Name + '</div></div>');
                                    return div;
                                },
                                onInitialized: function (evt) {
                                    SelectBox = evt.component;
                                }
                            }
                        }
                    ],
                }

                $scope.onPositiveClick = function (PopUp) {
                    var selectedItem = SelectBox.option('selectedItem');
                    DevExpress.ui.dialog.confirm("Aare you sure you want update reference? (" + (  opt.Name + ' - ' + selectedItem.Name ) + ")", "Update Reference" ).done(function (dialogResult) {
                        if (dialogResult === true) {


                            JSDataService.ExecSQLProc(opt.SQLUpdateProc,
                             {
                                 'ID_Model': opt.ID_Model,
                                 'ID_CurrentObject': opt.ID_CurrentObject,
                                 'NewValue': selectedItem.ID
                             }
                         ).then(function (response) {
                             DevExpress.ui.dialog.alert('Update object reference successfully', '').then(function () {
                                 PopUp.hide();
                             });
                             
                             //VC.RefreshToolBar();
                         }, function () {

                         });

                            
                        }
                    });

                }
            }
        });
    }
    //
    //
    //

    JsPopUpView.EditSerial = function (items, Title) {

        var defer = $q.defer();

        JsWizardView.Show({
            ViewSrc: 'Templates/DocSerials.tpl.html',
            title: Title + ' (' + items.length + ')',
            width: 850,
            height: 450,
            showCloseButton: true,
            showNegativeButton: false,
            InitController: function (s) {

                var isEmpty = function (str) {
                    return (!str || 0 === str.length);
                }

                s.items = [];

                s.fileUploaderOption = {
                    selectButtonText: 'Import CSV',
                    icon: 'mdi mdi-file-excel',
                    onValueChanged: function (e) {
                        var file = e.value;
                        if (file == null) return;
                        var Serials = [];
                        var csvParser = new SimpleExcel.Parser.CSV();
                        csvParser.loadFile(file, function () {
                            var Rows = csvParser.getSheet();
                            $.each(Rows, function (i, cells) {
                                var Row = [];
                                $.each(cells, function (x, c) {
                                    if (isEmpty(c.value)) return;
                                    Row.push(c.value);
                                });
                                Serials.push(Row);
                            });
                        });
                        $timeout(function () {
                            e.component.option('value', null);
                            s.items = Serials;
                        }, 500);
                    },
                    accept: '*.csv'
                };


                

                var data = [];

                var Count = ( items.length / 5 ) + 2;

                var index = 0;

                for (var i = 0; i < Count ; i++) {

                    var Row = [];
                    
                    for (var x = 0; x <= 4; x++) {

                        if (index === items.length) continue;

                        Row.push(items[index].Name);

                        index++;
                    }
                    data.push(Row);
                };

                s.tblSettings = {
                    colWidths: 150,
                    //width: 1000,
                    //height: 500,
                    maxRowsNumber: Count,
                    afterChange: function (changes, source) {
                        var Count = 0;
                        if (s.items !== undefined) {
                            $.each(s.items, function (i, row) {
                                $.each(row, function (x, serial) {
                                    if (serial == null) return;
                                    if (serial.replace(' ', '').length === 0) return;
                                    Count++;
                                });
                            });
                        }
                        s.CurrentSerialCount = Count;
                    }
                };

                s.RequiredSerialCount = items.length;
                
                $timeout(function () {
                    s.items = data;
                },500);
                

                s.onPositiveClick = function (p) {
                    var Items = [];
                    $.each(s.items, function (i, row) {
                        $.each(row, function (x, serial) {
                            if (serial == null) return;
                            if (serial.replace(' ', '').length === 0) return;
                            Items.push(serial);
                        });
                    });
                    if (Items.length !== items.length) {
                        DevExpress.ui.dialog.alert('Serials must be equal to ' + items.length, 'Validation.');
                        return
                    };

                    var DistinctSerials = Enumerable.From(Items).Distinct().ToArray();

                    if (DistinctSerials.length !== items.length) {
                        DevExpress.ui.dialog.alert('Serial Nos must be unique', 'Validation.');
                        return;
                    };

                    $.each(Items, function (i, o) {
                        items[i].Name = o;
                    });
                    p.hide();
                    defer.resolve(items);
                }

            }
            
        });
        return defer.promise;
    };


    return JsPopUpView;
}

app.factory('JsPopUpView', ['$uibModal', '$q', 'JSDataService', '$timeout', '$interpolate', '$rootScope', '$controller', '$compile', 'JsWizardView', 'CacheFactory', '$http', JsPopUpView]);