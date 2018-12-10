define(['baseView','app'], function (BaseView,app) {
    "use strict"
    function BaseDetailViewController() { }

    BaseDetailViewController.TBTN_NEW = -1;
    BaseDetailViewController.TBTN_SAVE = -2;
    BaseDetailViewController.TBTN_SAVEANDCLOSE = -5;
    BaseDetailViewController.TBTN_REFRESH = -3;
    BaseDetailViewController.TBTN_DELETE = -4;

    BaseDetailViewController.prototype = Object.create(BaseView.prototype);

    BaseDetailViewController.prototype.Init = function ($scope, CurrentObject, ViewStateName, IsModal, ModalMode, ViewOption,ViewAccess) {

        BaseView.prototype.Init.call(this,$scope);


        var _ = this;
        
        _.ViewAccess = ViewAccess;
        _.$ViewOptions = ViewOption;
        _._DeletedItems = {};
        _.detailClipboard = {};
        _.$dateFields = [];
        //
        // INIT SCOPE
        //

        if (_.DisplayName !== undefined && _.DisplayName !== null) {
            _.ModelName = _.DisplayName;
        }

        _.getRandomInt = function() {
            var min = 1000, max = 9999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        _.DetailViewForms = [];

        _.$onCheckBoxInitialized = function (ID_Control,Name, e) {
            e.element.on("click", function (ev) {
                //
                //
                //
                _.$isReloadCurrentObject = false;
                if (_.IsDeveloperMode === true) {
                    if (ev.ctrlKey === true) {
                        ev.stopPropagation();
                        _.EditModelDetail_Setting(ID_Control,Name);
                    }
                }
            });
        }

        _.onRemoveImage = function (e) {
            $scope.CurrentObject[e.PropertyName] = null;
        }

        _.onFormUploaderInitialized = function (e) {
            //alert('xxx');
            //console.log('Init',e);
            _.$timeout(function () {
                if (_.$fileUploaders === undefined || _.$fileUploaders === null) _.$fileUploaders = [];
                _.$fileUploaders.push(e.component);
            }, 500);
        }

        _.customizeItem = function (e) {
            //console.log('customize item--->',e);
            if (e.editorOptions !== undefined) {
                if (e.editorOptions.type === 'date') {
                    if (_.$dateFields === undefined || _.$dateFields === null) _.$dateFields = [];
                    _.$dateFields.push(e.dataField);
                }
            }
            if (e.itemType === 'group') {
                if (e.IsShowLabel === false) {
                    //console.log(e);
                    //alert('xxx');
                    if (e.label === undefined) {
                        e.label = {
                            alignment: 'right',
                            text: e.caption,
                            visible:false
                        }
                    };
                }
            }
        }
        _.onTab_Click = function (e) {
            if (_.IsDeveloperMode !== true) return;
            if (e.itemData.ID_Tab !== undefined) {
                if (e.jQueryEvent.ctrlKey === true) {
                    _.EditOnSQLView(2, _.ID_ModelObject, e.itemData.ID_Tab);
                }
            }
        }
        //
        //
        //
        _.onTabInitialized = function (e) {
            var tabs = e.component.option("items");
            //console.log('tabs', tabs);
            var generalTabs = Enumerable.From(tabs).Where("$.title === 'General'").ToArray();
            if (generalTabs.length > 0) {
                _.$MainTab = e.component;
            }
            _.$timeout(function () {
                var TabItems = $(e.component._$wrapper).find('.dx-multiview-item');
                $.each(TabItems, function (i, tab) {
                    //console.log(tabs[i]);
                    $(tab).addClass("tab_" + tabs[i].title.replace(" ", ""));
                });
            }, 500);
            if (_.$OtherTabs === undefined) _.$OtherTabs = [];
            _.$OtherTabs.push(e.component);
            //alert('tab');
        }

        $scope.ShowListView = function () {
            if (!_.ListViewTab) return;
            //
            //
            //
            _.openModelListView(_.ListViewTab.ID_Tab, _.ListViewTab.ID_View);
        }

        _.$scope = $scope; //$scope
        _.$scope.PanelHeight = ($(window).height() * 0.660) + 'px';
       
        _.$scope.FormContextMenuItems = [];
        _.$scope.CurrentObject = CurrentObject;
        _.$scope.DataInformationText = '';

        _.$FilesToUpload = null;
        _.ViewStateName = ViewStateName;
        _.IsModal = IsModal;
        _.ModalMode = ModalMode;

        _.SaveUrl = '/JsApp/Save';
        _.ReloadUrl = '/JsApp/GetCurrentObject';
        _.PropertyGridEditors = [];
        _.ValidationRules = [];

        _.$scope.StatusText = '';

        _.$scope.PerformSave = function () {
            _.PerformSave();
        };

        _.$scope.PerformSaveAndClose = function () {
            _.CloseAfterSave = true;
            _.PerformSave();
        };
        
        _.$scope.IsModelNotifShow = false;
        _.$scope.ModelNotifOption = {
            title: "Notification",
            onInitialized: function (e,elem) {
                _.ModelNotif = e;
                $(elem).find('.counter').css({
                    'top': '-30px',
                    'right': '-12px',
                });
            }
        }

        _.$scope.MainScrollViewOption = {
            height: _.IsModal === true ? ( ModalMode.IsFullScreen === true ? '83.3%' :  '80%' ) : '83.3%',
            showScrollbar: 'always',
            scrollByContent: false,
            //useNative:true,
            onInitialized: function (e) {
               
            }
        };

        _.$IsSaving = false;

        _.$scope.OnElementInit = function (View) {
            if (_.OnElementInit !== undefined) {
                _.OnElementInit(View);
            }
        };

        _.$scope.onFileDelete = function ($event, propertyName, ID_FileAttachmentDetail, isMultiple) {
            $event.stopPropagation();
            $event.preventDefault();
            _.ConfirmBox('Do you want to remove Attachment(' + propertyName + ')').then(function () {
                if (ID_FileAttachmentDetail !== undefined && ID_FileAttachmentDetail !== null) {
                    //
                    //
                    //
                    //alert(ID_FileAttachmentDetail);
                    _.JSDataService.Post('JsApp/DeleteFileAttachments', {
                        ID_FileAttachment_Detail: ID_FileAttachmentDetail
                    }).then(function (e) {
                        _.Reload();

                    });
                } else {
                    //alert('xxx');
                    _.$scope.CurrentObject[propertyName] = null;
                    var fileToUpload = Enumerable.From(_.$FilesToUpload).Where("$.propertyName =='" + propertyName + "'").SingleOrDefault();
                    if (fileToUpload !== null && fileToUpload !== undefined) {
                        var index = Enumerable.From(_.$FilesToUpload).IndexOf(fileToUpload);
                        if (index > -1) {
                            _.$FilesToUpload.splice(index, 1);
                        }
                    }
                }
            });
            
        }

        var isAssigned = false;
        _.$scope.onScrollViewInitialized = function (e) {
            if (isAssigned === false) {
                $(e.element).on("dxmousewheel", function (ev) {
                    if ($(ev.target).hasClass('dx-scrollable-container') === false) {
                        ev.preventDefault();
                    };
                });
                //
                //
                //
                //var height = 0.00;
                //if (ModalMode.IsFullScreen === true) {
                //    height = $(window).height() * 0.820;
                //} else {
                //    height = $(window).height() * 0.660;
                //}
                
                
                _.$timeout(function () {
                    var MainForm = $('#' + e.component.option('ID_Form'));
                    if (BaseDetailViewController.PanelHeight === undefined) {
                        var PanelHeight = 0;
                        var StatusBar = null;
                        if (_.IsModal === true) {
                            StatusBar = MainForm.find('.JsModalbtnContainer');
                            PanelHeight = MainForm.height() - $(StatusBar).height() - 66 - 42;
                        } else {
                            StatusBar = MainForm.find('.status-bar-container');
                            PanelHeight = MainForm.height() - $(StatusBar).height() - 66 - 35;
                        }
                        if (PanelHeight < 50) {
                            BaseDetailViewController.PanelHeight = undefined;
                        } else {
                            BaseDetailViewController.PanelHeight = PanelHeight;
                        }
                    }
                    var height = BaseDetailViewController.PanelHeight;// + (150);
                    //alert(height);
                    e.component.option('height', height);
                }, 500);
                
                //isAssigned = true;

            }
        };

        //
        //
        //

        _.addColumnClass = function (container, valueField, rowObject, _Class) {
            //console.log(valueField, container);
            container.addClass(_Class);
        }

        _.addColumnClassMapping = function (container, valueField, rowObject, parentClass, mappings) {
            container.addClass(parentClass);
            var value = rowObject[valueField];
            if (value !== undefined || value !== null) {
                var ClassName = Enumerable.From(mappings).Where('$.ID ===' + value).SingleOrDefault().Value;
                if (!ClassName) {
                    container.addClass(ClassName);
                }
            }
        };

        _.onControl_Initialized = function (propertyName, e) {

            
            _['set' + propertyName + 'Enabled'] = function (isEnabled) {
                //console.log(propertyName);
                e.component.option( 'disabled' , !isEnabled );
            };

            //if (propertyName === 'FileAttachments') {
            //    console.log('control Initialized', propertyName);
            //}
            

            _['set' + propertyName + 'ReadOnly'] = function (IsReadOnly) {
                //console.log(control);
                e.component.option('readOnly', IsReadOnly);
            };

            //
            //
            //
            if (_._onControl_Initialized !== undefined) _._onControl_Initialized(propertyName, e);

            //alert('xx');
            if (e.component.NAME === 'jDxImage') {
                if (_.$imgControls === undefined || _.$imgControls === null) _.$imgControls = [];
                _.$timeout(function () {
                    //_.$imgControls.push(e.component.$ImgControl);
                    _.$imgControls.push(e.component);
                }, 500);
            }
        };

        _.AddGridActionButton = function (PropertyName, option) {
            var Columns = _.GetGridOption(PropertyName).columns;
            Columns.unshift({
                dataField: '$ActionButtons',
                caption: '',
                fixed: true,
                allowResizing : true,
                width: 30,
                allowEditing: false,
                cellTemplate: function (container, options) {
                    container.addClass('GridActionButton');
                    $('<div></div>').dxButton({
                        text: option.icon === undefined ? option.caption : undefined,
                        icon: option.icon,
                        hint : option.caption,
                        disabled : _.IsFormReadOnly === true,
                        onClick: function () {
                            if (_.IsFormReadOnly === true) return;
                            if (option.onClick !== undefined) {
                                option.onClick(options);
                            }
                        }
                    }).appendTo(container);
                }
            });
        }

        _.GetGridOption = function (PropertyName) {
            return _.$scope[PropertyName + 'GridOption'];
        }

        _.AddToolbarButton = function (toolBar) {
            _.$scope.FormContextMenuItems.push(toolBar);
        }

        _.EditDetailViewControl = function (ID_DetailView) {
            this.JsPopUpView.OpenDetailView(13, {
                ID_CurrentObject: ID_DetailView,
                fullScreen: true
            });
        }

        _.EditListViewControl = function (ID_ListView) {
            this.JsPopUpView.OpenDetailView(14, {
                ID_CurrentObject: ID_ListView,
                fullScreen: true
            });
        }

        _.EditModelObject = function (ID_Model) {
            this.JsPopUpView.OpenDetailView(4, {
                ID_CurrentObject: ID_Model,
                fullScreen : true
            });
        }

        _.ShowGridColumnChooser = function (PropertyName) {
            var Grid = _.GetGridEditor(PropertyName);
            Grid.showColumnChooser();
            
        }

        _.AddNewDetail = function (PropertyName, ID_DetailView, ParentPropertyName) {
            var _ = this;
            if (ParentPropertyName !== undefined) {
                if (ParentPropertyName !== null) {
                    var Grid = _.GetGridEditor(PropertyName);
                    var ParentGrid = _.GetGridEditor(ParentPropertyName);
                    if (ParentGrid.getSelectedRowsData().length === 0) return;
                    var CurrentSelected = ParentGrid.getSelectedRowsData()[0];
                    if (CurrentSelected === null) return;
                }
            }
            _.JSDataService.GetCurrentObject('/JsApp/GetModelView', {
                ID: ID_DetailView,
                ID_ViewType: 2,
                ViewName: null,
            }).then(function (View) {
                _.JSDataService.GetCurrentObject('/JsApp/GetCurrentObject', {
                    ID: View.ID
                    , ViewName: View.Name
                    , ID_CurrentObject: -1
                }).then(function (CurrentObject) {
                    _.OpenOnNewWindow(ID_DetailView, CurrentObject).then(function (CurrentData) {
                        if (CurrentData.$tempID === undefined || CurrentData.$tempID === null) {
                            CurrentData.$tempID = BaseView.$NewID();
                        }
                        if (ParentPropertyName === null) {
                            if (_.$scope.CurrentObject[PropertyName] === null) _.$scope.CurrentObject[PropertyName] = [];
                            _.$scope.CurrentObject[PropertyName].push(CurrentData);
                        } else {
                            var ParentGrid = _.GetGridEditor(ParentPropertyName);
                            if (ParentGrid.getSelectedRowsData().length === 0) return;
                            //
                            //

                            var CurrentSelected = ParentGrid.getSelectedRowsData()[0];
                            if (CurrentSelected !== null) {
                                var CurrentObject = null;
                                if (CurrentSelected.ID > -1) {
                                    CurrentObject = Enumerable.From(_.$scope.CurrentObject[ParentPropertyName]).Where('$.ID ==' + CurrentSelected.ID).SingleOrDefault();
                                } else {
                                    CurrentObject = Enumerable.From(_.$scope.CurrentObject[ParentPropertyName]).Where('$.$tempID ==' + CurrentSelected.$tempID).SingleOrDefault();
                                }
                                if (CurrentObject[PropertyName] === null) CurrentObject[PropertyName] = [];
                                CurrentObject[PropertyName].push(CurrentData);
                                Grid.option('dataSource', CurrentObject[PropertyName]);
                                Grid.refresh();
                            }
                        }

                    });

                });

            });
        }

        _.GetGridEditor = function (PropertyName) {
            return Enumerable.From(_.PropertyGridEditors).Where(function (g) {
                return g.PropertyName == PropertyName;
            }).FirstOrDefault();
        }

        var repaintChildToolBars = function (Items) {
            $.each(Items, function (i, item) {
                if (item.IsDisabled !== undefined) {
                    item.disabled = item.IsDisabled();
                }
                if (item.items !== undefined) {
                    repaintChildToolBars(item.items);
                }
            });
        }

        _.RefreshToolBar = function () {

            var MainToolBarItems = _.MainToolbar.option('dataSource');

            $.each(MainToolBarItems, function (i, tbar) {

                if (tbar.IsDisabled !== undefined) {
                   
                    tbar.disabled = tbar.IsDisabled(_.$scope.CurrentObject);

                }

                if (typeof tbar.gettext === "function") {
                    tbar.text = tbar.gettext();
                }

                if (typeof tbar.geticon === "function") {
                    tbar.icon = tbar.geticon();
                }

            });

            

            _.MainToolbar.repaint();

            if (_.ChildToolbars !== undefined) {

                $.each(_.ChildToolbars, function (i, t) {

                    var toolbarButtons = t.option('dataSource');

                    if (toolbarButtons == undefined) return;

                    $.each(toolbarButtons, function (i, tbar) {

                        if (tbar.IsDisabled !== undefined) {
                            tbar.disabled = tbar.IsDisabled(_.$scope.CurrentObject);
                        }

                        if (tbar.items !== undefined) {
                            repaintChildToolBars( tbar.items )
                        }

                    });


                    t.repaint();
                });
            }
        }

        _.GetDxControl = function (FieldName) {
            //alert(FieldName);
            if (_.FormInstance == undefined) return null;
            
            //console.log(_.FormInstance);
            var Control = _.FormInstance.getEditor(FieldName);
            if (Control !== null && Control !== undefined) return Control;
            $.each(_.DetailViewForms, function (i, e) {
                Control = e.getEditor(FieldName);
                if (Control !== null && Control !== undefined) return Control;
            });
        };

        var findItem = function (fieldName, items) {
            var FormItem = null;
            $.each(items, function (i, o) {
                if (o === undefined) return;
                if (FormItem == null) {
                    if (o.items !== undefined) {
                        if (FormItem === null) {
                            FormItem = findItem(fieldName, o.items);
                        }
                    } else {

                        if (o.dataField === fieldName) {
                          
                            FormItem = o;
                          
                            return FormItem;
                        }
                    }
                }
            });
            return FormItem;
        }

        _.BatchEditView = function (PropertyName, Caption) {
            //if (_.IsFormReadOnly !== true) {
            //
            //
            //

            var Grid = _.GetGridEditor(PropertyName);

            app.$modal().Show(
                {
                    title: 'Edit ' + Caption,
                    ViewSrc: 'Templates/BatchEditGrid.html',
                    width: $(window).width() * 0.8,
                    height: $(window).height() * 0.8,
                    InitController: function (scope) {
                        var GridOption = _.GetGridTabOption(Grid.PropertyName).GridOption;
                        scope.GridOption = {
                            columns: GridOption.columns,
                            dataSource: Grid.option('dataSource'),
                            selection: {
                                mode: 'single',
                                showCheckBoxesMode: 'always'
                            },
                            rowAlternationEnabled: true,
                            allowColumnReordering: true,
                            showBorders: false,
                            height: function () { return '100%' },
                            editing: ( _.IsFormReadOnly !== true ? {
                                //editEnabled: true,
                                //removeEnabled: false,
                                //insertEnabled: false,
                                mode: 'cell',
                                allowUpdating: true,
                                allowAdding: true,
                                allowDeleting: false,
                                errorRowEnabled: true,
                                texts: {
                                    confirmDeleteMessage: ''
                                }
                            } : undefined ),
                            loadPanel: {
                                enabled: false
                            },
                            scrolling: {
                                mode: 'virtual',
                                scrollByThumb: true
                            },
                            onRowUpdated: Grid.option('onRowUpdated'),
                        };
                    }
                }
            );
            //}
        }

        _.GetFormItem = function (fieldName) {
            var Items = _.$scope.GeneralFormOptions.items[0].tabs;
            var re = findItem(fieldName, Items);
            if (re == null) {
                if (_.$scope.GeneralGridTabPabelItems !== undefined) {
                    var FormItems = Enumerable.From(_.$scope.GeneralGridTabPabelItems).Where('$.isForm == true').ToArray();
                    $.each(FormItems, function (i, item) {
                        re = findItem(fieldName, item.formOption.items);
                        if (re !== null) {
                            if (re.items !== undefined) {
                                re = findItem(fieldName, re.items);
                            }
                            if (re !== null) {
                                if (re.editorType !== undefined) {
                                    if (fieldName == re.dataField) {
                                        return false;
                                    }
                                }
                            }
                        }
                    });
                }
            }
            return re;
        };

        _.GetFormItemOptions = function (fieldName) {
            var r = _.GetFormItem(fieldName);
            if (r == null) return null;
            return r.editorOptions;
        };

        _.GetGridTabOption = function (PropertyName) {
            if (_.$scope.GeneralGridTabPabelItems === undefined) return null;
            if (_.$scope.GeneralGridTabPabelItems === null) return null;
            
            var GridTabOption = Enumerable.From(_.$scope.GeneralGridTabPabelItems)
                .Where(function (tab) {
                    return tab.PropertyName === PropertyName;
                }).FirstOrDefault();
            //console.log('GridTabOption', GridTabOption);
            if (GridTabOption === undefined) {
                $.each(_.$scope.GeneralGridTabPabelItems, function (i, g) {
                    if (GridTabOption !== undefined) return;
                    if (g.ChildGrids === undefined) return;
                    if (g.ChildGrids.length === 0) return;
                    //console.log('Child Grids',g.ChildGrids);
                    GridTabOption = Enumerable.From(g.ChildGrids).Where(function (grid) {
                        return grid.PropertyName === PropertyName;
                    }).FirstOrDefault();
                });
            }
            if (GridTabOption === null || GridTabOption === undefined) throw new Error('cannot find property grid (' + PropertyName + ')');
            //console.log('GridTabOption',GridTabOption);
            return GridTabOption;
        }

        _.AddGridColumnValidationRule = function (PropertyName,ColumnName,Validation) {
            var Grid = Enumerable.From(_.PropertyGridEditors).Where("$.PropertyName == '" + PropertyName + "'").SingleOrDefault();
            var Column = Grid.columnOption(ColumnName);
            if (Column.validationRules === undefined) {
                Column.validationRules = [];
            } else {

                var ValidationRule = Enumerable.From(Column.validationRules).Where("$.id === " + Validation.id).SingleOrDefault();
                if (ValidationRule !== undefined && ValidationRule !== null) {
                    return;
                }
            }
          
            if (Array.isArray(Validation)) {
                Column.validationRules.concat(Validation);    
            } else {
                Column.validationRules.push(Validation)
            }
            Grid.columnOption(ColumnName, 'validationRules', Column.validationRules);
        }

        _.AddToolBarButtonOnGrid = function (PropertyName, Button, IsShift) {
            if (_.$scope[PropertyName + '_MenuOptions'] == undefined) _.$scope[PropertyName + '_MenuOptions'] = [];
            if (IsShift === undefined) {
                _.$scope[PropertyName + '_MenuOptions'].push(Button);
            } else {
                if (IsShift == true) {
                    _.$scope[PropertyName + '_MenuOptions'].unshift(Button);
                } else {
                    _.$scope[PropertyName + '_MenuOptions'].push(Button);
                }                
            }
        };

        _.AddButtonReport = function (reportData) {

            var menuReport = Enumerable.From(_.$scope.FormContextMenuItems).Where("$.ID == " + -10099).SingleOrDefault();

            if (menuReport == undefined || menuReport == null) {
                menuReport = {
                    ID: -10099,
                    text: 'Reports',
                    icon: 'mdi mdi-file-hidden',
                    color: '#3c763d',
                    //IsDisabled: function () {
                    //    //var CurrentObject = _.$scope.CurrentObject;
                    //    //if (CurrentObject.ID == -1) return true;
                    //    return false;
                    //},
                    disabled:false,
                    isContextMenu: true,
                    items: []
                };
                _.$scope.FormContextMenuItems.push(menuReport);
            }
            menuReport.items.push({
                text: reportData.Name,
                reportData: reportData,
                icon: 'mdi mdi-file-hidden',
                IsDisabled: reportData.IsDisabled,
                onItemClick: function () {
                    var _report = this.reportData;
                    var CurrentObject = _.$scope.CurrentObject;
                    if (CurrentObject.ID == -1) {
                        _.MsgBox(_.DisplayName + ' must be save first.');
                        return;
                    }
                    if (reportData.isValid !== undefined) {
                        if (reportData.isValid(CurrentObject) === false) return;
                    }
                    _.ViewReport(CurrentObject.ID, _report.ID_Report, CurrentObject.Name, {
                        ID: CurrentObject.ID
                    });
                }
            });
        }

        //
        //
        //

        _.RefreshGridSelection = function (Grid, rowIndex) {
            Grid.deselectAll();
            _.$timeout(function () {
                Grid.selectRowsByIndexes([rowIndex]);
            }, 500);
        }

        _.DeleteAllItems = function (PropertyName) {
            var Grid = _.GetGridEditor(PropertyName);
            if (Grid === undefined || Grid === null) throw new Error(PropertyName + ' not found');

            var ParentPropertyName = Grid.ParentPropertyName;
            var SelectedRows = _.$scope.CurrentObject[PropertyName];
            
            if (_._DeletedItems[Grid._options.propertyName] === undefined) _._DeletedItems[Grid._options.propertyName] = [];
            var Properties = _.$scope.CurrentObject[Grid._options.propertyName];
            $.each(SelectedRows, function (i, o) {

                var Index = Properties.indexOf(o);
                if (o.ID > 0) {
                    _._DeletedItems[Grid._options.propertyName].push(o);
                }
                _.$timeout(function () {
                    _.$scope.CurrentObject[Grid._options.propertyName].splice(Index, 1);
                    if (_.OnDetailGrid_RowDeleted !== undefined) {
                        _.OnDetailGrid_RowDeleted(Grid);
                    }
                });
            });
            Grid.refresh();
            _.$scope.CurrentObject.$dirty = true;
        }

        _.GetDetailGridOption = function (GridName, DataSource, PropertyName, Columns, Options,
                    ID_DetailView, ChildGrids, height, Expression, ParentPropertyName, Caption, ID_ModelListView, ID_PropertyModel, ID, ID_ModelProperty, GridSummaries, pageSize) {
            //console.log(GridName, Columns);
                return {
                      bindingOptions : {
                          dataSource : DataSource
                      }
                    , propertyName : PropertyName
                    , columns: Columns
                    , columnResizingMode: 'widget'
                    , height: function () {

                        //console.log(height);

                        return height !== null ? height : 'auto';
                        //return '100%';
                    }
                    , columnAutoWidth: true
                    , filterRow: {
                        visible: false
                    }
                    , groupPanel: {
                        visible: false
                    },
                    loadPanel: {
                        enabled: false
                    },
                    noDataText: "No Data", //(ParentPropertyName !== null ? "No Data" : ""),
                    allowColumnResizing : true,
                    showRowLines : true,
                    remoteOperations: {
                        //paging: false,
                        summary: true
                    },
                    scrolling: {
                        //mode: 'inf',
                        //scrollByThumb : true
                        useNative: true
                    },
                    paging: {
                        enabled: true,
                        pageSize: pageSize,
                    },
                    customizeColumns: function (columns) {

                        //var CurrentGrid = Enumerable.From(_.PropertyGridEditors).Where('$.PropertyName === "' + PropertyName + '"').SingleOrDefault();
                        //var GridWidth = CurrentGrid._$element.width();
                        
                        $.each(columns, function (i, c) {
                            //c.allowSorting = false;
                            //c.allowEditing = false;
                            if (c.dataType === 'date') {
                                //alert(c.format);
                                if (c.format !== null && c.format !== undefined) {
                                    c.cellTemplate = function (container, options) {
                                        var d = options.data[c.dataField];
                                        if (!!d) {
                                            container.html(Globalize.format(new Date(d), c.format));
                                        } else {
                                            container.html('');
                                        }
                                    }
                                }
                            }
                        });

                        //var ColumnsWidthNulls = Enumerable.From(columns).Where('$.width == null || $.width == undefined').ToArray();
                        //if (ColumnsWidthNulls.length !== columns.length) {
                        //    $.each(ColumnsWidthNulls, function (i, c) {
                        //        c.width = 200;
                        //    });
                        //}

                        var c = Enumerable.From(columns).Where('$.dataField == "ID"').SingleOrDefault();
                        if (c !== undefined) {
                            c.caption = "";
                            c.width = 50;
                            c.allowHiding = false
                            c.allowGrouping = false;
                            c.allowReordering = false;
                            c.allowResizing = false;
                            c.allowHiding = false;
                        }

                        

                        //var LastColumn = Enumerable.From(columns).Where('$.visible == true && $.fixedPosition === undefined && $.fixed !== true && $.groupIndex === undefined').OrderByDescending("$.index").ToArray();
                        //if (LastColumn.length > 0) {
                        //    LastColumn[0].width = undefined;
                        //}

                        //var __Columns = Enumerable.From(columns).Where('$.visible === true && $.fixedPosition === undefined').ToArray();
                        //if (__Columns.length < 5) {
                        //    var LastColumns = __Columns[length - 1];
                        //    LastColumns.width = undefined;
                        //}

                    },
                    allowSorting: false,
                    onCellClick: function (e) {

                        if (e.rowType === undefined && e.column === undefined) {
                            e.component.closeEditCell();
                            return;
                        }

                        if (e.column !== undefined) {
                            if (e.column.command !== undefined) {
                                if (e.column.command === 'expand' || e.column.command === 'select') {
                                    return;
                                } 
                            }
                        }

                        if (_.IsFormReadOnly === true) {
                            if (e.column !== undefined) {
                                e.jQueryEvent.stopPropagation();
                                e.component.clearSelection();
                                e.component.selectRowsByIndexes([e.rowIndex]);
                                return;
                            }
                        }

                        if (e.column !== undefined) {
                            //if (e.column.dataField === 'ID' || e.column.allowEditing == false) {
                            if (e.column.dataField === 'ID' ) {
                                e.jQueryEvent.stopPropagation();
                                e.component.clearSelection();
                                e.component.selectRowsByIndexes([e.rowIndex]);
                                return
                            }
                        }

                        e.jQueryEvent.stopPropagation();
                            
                        if (e.data !== undefined) {
                            if (_.ModelHelper !== undefined) {
                                if (e.column !== undefined) {
                                    if (_.ModelHelper.isColumnGridEditable(PropertyName, e) === false) return;
                                }
                            }

                            if (_.ViewHelper !== undefined) {
                                if (e.column !== undefined) {
                                    if (_.ViewHelper.isColumnGridEditable(PropertyName, e) === false) return;
                                }
                            }
                        }

                        if (e.isEditing == false) {
                            e.component.closeEditCell();
                        }

                        if (_.IsFormReadOnly !== true) {
                    
                            if (e.isEditing === false) {

                                //console.log('CELL CLICK',e);

                                var Cell = e.component.getCellElement(e.rowIndex, e.columnIndex);
                                //console.log(Cell);
                                if (Cell !== undefined) {
                                    if (Cell.hasClass('JsCellFocus')) {

                                        if (e.column.allowEditing == true) {

                                            e.component.editCell(e.rowIndex, e.columnIndex);
                                            //alert('xxx');
                                            //alert('editCell');
                                            //var scrollable = e.component.getView('rowsView')._scrollable;

                                            //var offset = $(Cell).position();
                                            //console.log(offset);

                                            //scrollable.scrollTo(Cell);
                                        }

                                    } else {

                                        e.element.find('td').removeClass('JsCellFocus');

                                        Cell.addClass('JsCellFocus');

                                        e.component.focus(Cell);

                                        //
                                        //
                                        //

                                    }
                                }
                            } else {
                                //e.component.closeEditCell();
                            }
                        }
                    
                    },
                    //stateStoring: {
                    //    enabled: true,
                    //    type: "localStorage",
                    //    storageKey: _.ModelViewName + PropertyName
                    //},
                    focusStateEnabled: true,
                    onKeyDown: function (e) {
                        var KeyCode = e.jQueryEvent.keyCode;
                        if (KeyCode === 83) { 
                            if (e.jQueryEvent.ctrlKey === true) {
                                e.jQueryEvent.preventDefault();
                                return; //DISABLE SAVE
                            }
                        }
                        
                        if (KeyCode == 27) {
                            var Grid = e.component;
                            Grid.clearSelection();

                            e.element.find('td').removeClass('JsCellFocus');
                        } else if (KeyCode == 8) {

                            //
                            //
                            //
                            
                        } else if ( KeyCode == 46 ) { 
                            var selectedRowsData = e.component.getSelectedRowsData();
                            if ( selectedRowsData.length > 0 ) { 
                                _.DeleteDetails(e.component, selectedRowsData, ParentPropertyName);
                            }
                        } else if (KeyCode == 13) {
                            //


                            if (_.HasdxListViewEditor_Open == true) {
                                e.jQueryEvent.stopPropagation();
                                e.jQueryEvent.preventDefault();
                                return;
                            }

                            //
                            if (_.IsDeveloperMode === true) {
                                if (e.jQueryEvent.ctrlKey == true && e.jQueryEvent.shiftKey == true && e.jQueryEvent.altKey == true) {
                                    if (ID_ModelProperty !== null) {
                                        _.JsPopUpView.OpenDetailView(15, {
                                            ID_CurrentObject: ID_ModelProperty
                                        });
                                    }
                                    return;
                                }

                                if (e.jQueryEvent.ctrlKey == true && e.jQueryEvent.shiftKey == true) {
                                    _.EditModelDetail_Setting(ID, PropertyName);
                                }
                            }
                            
                        } else {
                            _.$isReloadCurrentObject = false;
                            //
                            //
                            //
                            _.OnKeyDown(e.jQueryEvent);
                        }

                        if (e.jQueryEvent.ctrlKey === true) {
                            if (KeyCode === 67) { // Ctrl + C
                                var selKey = e.component.getSelectedRowKeys();
                                if (selKey.length === 1) {
                                    var currentKey = angular.copy(selKey[0]);
                                    currentKey.ID = -1;
                                    _.detailClipboard[PropertyName] = currentKey;
                                    _.MsgBox('Copy to clipboard successfull');
                                }
                            } else if (KeyCode === 86) {
                                if (_.detailClipboard[PropertyName] !== null && _.detailClipboard[PropertyName] !== undefined) {
                                    if (_.onDetailPasteClipboard !== undefined) _.onDetailPasteClipboard(PropertyName, _.detailClipboard[PropertyName]);
                                }
                            }
                        }

                        //if (e.jQueryEvent.keyCode == 38 || e.jQueryEvent.keyCode == 40) {
                        //    var selKey = e.component.getSelectedRowKeys();
                        //    if (selKey.length) {
                        //        var currentKey = selKey[0];
                        //        var index = e.component.getRowIndexByKey(currentKey);
                        //        if (e.jQueryEvent.keyCode == 38) {
                        //            index--;
                        //            if (index >= 0) {
                        //                e.component.selectRowsByIndexes([index]);
                        //                e.jQueryEvent.stopPropagation();
                        //            }
                        //        }
                        //        else if (e.jQueryEvent.keyCode == 40) {
                        //            index++;
                        //            e.component.selectRowsByIndexes([index]);
                        //            e.jQueryEvent.stopPropagation();
                        //        }
                        //    }
                        //}
                    },
                    selection: {
                        //allowSelectAll: true,
                        mode: 'multiple',
                        showCheckBoxesMode: 'always'
                    },
                    rowAlternationEnabled: true,
                    allowColumnReordering: true,
                    showBorders: false,
                    editing : {
                        //editEnabled: true,
                        //allowUpdating:
                        //removeEnabled: false,
                        //insertEnabled: false,
                        mode: 'cell',
                        allowUpdating: true,
                        allowAdding: true,
                        allowDeleting: false,
                        errorRowEnabled: true,
                        texts: {
                            confirmDeleteMessage: ''
                        }
                    },
                    sorting: {
                        mode: 'none'//, 'multiple'
                    },
                    columnChooser: {
                        height: 400,
                        width: 250,
                    },
                    onContentReady: function (e) {
                        //var freespacerow = $(e.element).find('.dx-row.dx-freespace-row');
                        //$.each(freespacerow, function (i, r) {
                        //    var height = $(r).height();
                        //    if (height > 0) {
                        //        alert('xxx');
                        //        $(r).css({ 'height': (10) + 'px' });
                        //    }
                        //});
                        
                        var Detail = null;
                        var CurrentParentObject = null;
                        //console.log('ParentPropertyName', ParentPropertyName);
                        if (ParentPropertyName !== null && ParentPropertyName !== undefined) {
                            var ParentSelectedRows = _.GetGridEditor(ParentPropertyName).getSelectedRowsData();
                            if (ParentSelectedRows.length > 0) {
                                var Index = _.$scope.CurrentObject[ParentPropertyName].indexOf(ParentSelectedRows[0]);
                                CurrentParentObject = _.$scope.CurrentObject[ParentPropertyName][0];
                                Detail = CurrentParentObject[PropertyName];
                            }
                        } else {
                            Detail = _.$scope.CurrentObject[PropertyName];
                        }
                        

                        if (Detail !== undefined && Detail !== null) {
                            if (_['$' + PropertyName + '_RowCount'] !== Detail.length) {
                                var NewDetails = [];
                                _.$timeout(function () {
                                    
                                    $.each(Detail, function (i, d) {
                                        
                                        if (d.ID == -1 || d.ID == undefined || d.ID == null ) {
                                            d.ID = _.getRandomInt() * -1;
                                            
                                            if (CurrentParentObject !== null) {
                                                d.$ID_Parent = CurrentParentObject.ID;
                                            }

                                            NewDetails.push(d);
                                        }
                                        
                                    });

                                    if (NewDetails.length > 0) {
                                        _.$scope.CurrentObject.$dirty = true;
                                    }
                                    //
                                    //
                                    //
                                    if (_['on' + PropertyName + '_RowInserted'] !== undefined) {
                                        _.$timeout(function () {
                                            _['on' + PropertyName + '_RowInserted'](e.component, NewDetails);
                                        });
                                    }
                                });

                                if (Detail.length !== _['$' + PropertyName + '_RowCount']) {
                                    if (_['on' + PropertyName + '_RowUpdated'] !== undefined) {
                                        _.$timeout(function () {
                                            _['on' + PropertyName + '_RowUpdated'](e.component,Detail);
                                        });
                                    }
                                }
                                e.component.refresh();
                                //alert('xxxx');
                            }

                            if (e.component.needSummaryUpdate === true) {
                                e.component.needSummaryUpdate = false;
                                e.component.refresh();
                                //alert('yyyy');
                                //if (!!e.component.lastRowColumnEdit) {
                                //    _.$timeout(function () {
                                //        var nextElement = e.component.getCellElement(e.component.lastRowColumnEdit.rowIndex, e.component.lastRowColumnEdit.dataField);
                                //        e.component.focus(nextElement);
                                //        e.component.lastRowColumnEdit = null;
                                //    },100);
                                //}
                            }

                            _['$' + PropertyName + '_RowCount'] = Detail.length;

                        }
                        
                        if (_.ComputeExpression !== undefined) {
                            _.$timeout(function () {
                                _.ComputeExpression();
                            });
                        }
 
                    },
                    onInitialized: function (e) {

                        e.element.on('mousewheel', function (e) {
                            if (e.altKey === true) {
                                e.stopPropagation();
                            }
                        });
                        
                        if (_.IsDeveloperMode == true) {
                            $(e.element).attr('tabindex', -1000);
                            $(e.element).keydown(function (e) {
                                if (e.which === 13) {
                                    if (e.ctrlKey == true && e.shiftKey == true && e.altKey == true) {
                                        if (ID_ModelProperty !== null) {
                                            _.JsPopUpView.OpenDetailView(15, {
                                                ID_CurrentObject: ID_ModelProperty
                                            });
                                        }
                                        return;
                                    }
                                    if (e.ctrlKey == true && e.shiftKey == true) {
                                        _.EditModelDetail_Setting(ID, PropertyName);
                                    }
                                }
                            });
                        }

                        e.component.PropertyName = PropertyName;
                        e.component.ParentPropertyName = ParentPropertyName;
                        e.component.Caption = Caption;

                        _.PropertyGridEditors.push(e.component);

                        _['$' + PropertyName+'_RowCount'] = 0;

                        _['set' + PropertyName + 'GridEnabled'] = function (IsEnabled) {
                            //e.component.option('editing.editEnabled', IsEnabled);
                            e.component.option('editing.allowUpdating', IsEnabled);
                            if (IsEnabled == false) {
                                e.component._$element.find('.dx-datagrid').addClass('disabled-edit')
                            } else {
                                e.component._$element.find('.dx-datagrid').removeClass('disabled-edit');
                            }
                            
                        }

                        _.$timeout(function () {
                            if (_.$scope.CurrentObject[PropertyName] == null) _.$scope.CurrentObject[PropertyName] = [];
                            if (_.IsFormReadOnly !== undefined) {

                                if (_.IsFormReadOnly === true) {
                                    //e.component.option('editing.editEnabled', false);
                                    e.component.option('editing.allowUpdating', false);
                                }
                            }

                            if (ParentPropertyName !== null) {
                                e.component.option('dataSource', []);
                            }

                            if (_.$scope.CurrentObject[PropertyName] == null || _.$scope.CurrentObject[PropertyName] == undefined) _.$scope.CurrentObject[PropertyName] = [];

                            if (_["onGridInitialized_" + PropertyName] !== undefined) {

                                _["onGridInitialized_" + PropertyName](e.component);

                            }

                        }, 500);
                        
                        if (_.ComputeExpression !== undefined) {
                            _.ComputeExpression();
                        }

                        //var RecordCount = e.component.option('dataSource').length;
                        //console.log('RecordCount', RecordCount);
                        //_.GetGridTabOption(PropertyName).RecordCount = RecordCount + ' ' + (RecordCount > 1 ? 'items' : 'item' );

                    },
                    onInitNewRow: function(options) {

                    },
                    onRowValidating: function (e) {
                        if (!e.brokenRules.length)
                            return;
                        e.isValid = true;
                    },
                    onEditingStart: function (e) {
                        
                    },
                    onEditorPreparing: function (e) {
                        if (e.parentType === "dataRow") {
                            if (e.row === undefined) return;
                            var oldOnValueChanged = e.editorOptions.onValueChanged;
                            e.editorOptions.onValueChanged = function () {
                                _.$isReloadCurrentObject = false;
                                e.component.needSummaryUpdate = true;
                                e.component.lastRowColumnEdit = {
                                    rowIndex: e.row.rowIndex,
                                    dataField: e.dataField,
                                    visibleIndex: e.visibleIndex
                                }
                                oldOnValueChanged.apply(this, arguments);
                            };
                        }
                        
                       // console.log(e);
                    },
                    onRowUpdated: function (e) {
                        var Index = null;

                        if (_.$scope.CurrentObject[PropertyName] !== null && _.$scope.CurrentObject[PropertyName] !== undefined) {
                            Index = _.$scope.CurrentObject[PropertyName].indexOf(e.key);
                        }
                        
                        e.key.$dirty = true;

                        _.$scope.CurrentObject.$dirty = true;

                        if (_[PropertyName + '_onColumnChanged'] !== undefined) {

                            _[PropertyName + '_onColumnChanged'].call(this, {
                                  data: e.data
                                , dataField: Object.keys(e.data)[0]
                                , key: e.key
                                , grid: e.component
                                , rowIndex: Index
                            });

                        }
                        
                        if (_.ComputeExpression !== undefined) {
                            _.ComputeExpression();
                        }
                        //
                        //
                        //

                        //var freespacerow = $(e.element).find('.dx-row.dx-freespace-row');
                        //$.each(freespacerow, function (i, r) {
                        //    var height = $(r).height();
                        //    if (height > 0) {
                        //        alert('xxx');
                        //        $(r).css({ 'height': (10) + 'px' });
                        //    }
                        //});

                    },
                    onSelectionChanged: function (e) {

                        var that = this;

                        e.element.find('td').removeClass('JsCellFocus');

                        if (e.selectedRowKeys.length == 0 || e.selectedRowKeys.length > 1) {

                           _.$timeout(function () {
                               // _.$scope[PropertyName + 'ItemSelected'] = '';
                                if (ChildGrids !== null) {
                                    $.each(ChildGrids, function (i, g) {
                                        if (PropertyName !== g.PropertyName) {
                                            var Grid = _.GetGridEditor(g.PropertyName);
                                            Grid.option('dataSource', null);
                                            _.$scope['$' + PropertyName + 'RecordCount'] = '';
                                        }
                                    });
                                }
                                return
                            });
                            
                        };

                        if (e.selectedRowsData.length !== 1) return;

                        var CurrentSelected = e.selectedRowKeys[0];
                        
                        //if (Expression !== null) {
                        //    _.$scope[PropertyName + 'ItemSelected'] = _.calculateExpression(CurrentSelected, Expression, PropertyName, null, 0);
                        //} else {
                        //    _.$scope[PropertyName + 'ItemSelected'] = CurrentSelected.Name;
                        //}
                        
                        
                        if (ChildGrids !== null) {
                            $.each(ChildGrids, function (i, g) {
                                if (PropertyName == g.PropertyName) return;

                                _.$timeout(function () {
                                    var Grid = _.GetGridEditor(g.PropertyName);
                                    //Grid.option('parentObject', CurrentSelected);
                                    if (CurrentSelected == undefined) return;
                                    var dataSource = CurrentSelected[g.PropertyName];
                                    if (dataSource === undefined) dataSource = [];
                                    if (dataSource === null) dataSource = [];
                                    Grid.option('dataSource', dataSource);
                                    _.$scope['$' + PropertyName + 'RecordCount'] = dataSource.length;

                                });
                            });
                        }
                    },
                    onContextMenuPreparing: function (e) {

                        if (e.items == null) e.items = [];

                        if (window.event !== undefined) {
                            e.jQueryEvent = window.event;
                        } else {
                            e.jQueryEvent = {};
                        }

                        e.items.push({
                            text: "Export to xls",
                            icon: "fa fa-file-excel-o",
                            //template: "contextItem",
                            onItemClick: function () {
                                var Grid = _.GetGridEditor(PropertyName);
                                Grid.exportToExcel(false);
                            }
                        });

                        if (_.IsDeveloperMode) {

                            if (e.jQueryEvent.ctrlKey == true) {

                                e.items = [];

                                e.items.push(_.GetDeveloperMenuOptions({
                                    name: GridName,
                                    ID_ModelListView: ID_ModelListView,
                                    ID_PropertyModel: ID_PropertyModel,
                                    PropertyName: PropertyName
                                }));

                                e.items.push({
                                    text: 'Column Chooser', color: '#008bba', align: 'right', icon: 'jspp-icon js-list', isSystem: true,
                                        onItemClick: function () {
                                            _.ShowGridColumnChooser(PropertyName);
                                        }
                                });

                                
                                e.items.push({
                                    text: 'Edit Column (' + e.column.caption + ')',
                                    icon: 'mdi mdi-table-column-width',
                                    onItemClick: function () {
                                        _.JsPopUpView.OpenDetailView(21, {
                                            ID_CurrentObject: e.column.ID_Column,
                                            fullScreen: true
                                        });
                                    }
                                });

                                return;
                            }

                        } 

                        if (e.row !== undefined) {

                            if (_.IsFormReadOnly !== true) {

                                //e.items.unshift({
                                //    text: "Edit on New Window",
                                //    icon: "mdi mdi-grid",
                                //    template: "contextItem",
                                //    onItemClick: function () {
                                //        _.BatchEditView(PropertyName, Caption);
                                //    }
                                //});

                            }

                            if (e.row.rowType === "data") {

                                var Grid = e.component;

                                var itemsSelected = Grid.getSelectedRowsData();

                                if (itemsSelected.length  < 2 ) {

                                    Grid.selectRowsByIndexes([e.rowIndex]);

                                }

                                if (_.IsFormReadOnly !== true) {
                                    e.items.push({
                                        text: "Delete item",
                                        icon: "red fa fa-times",
                                        //template: "contextItem",
                                        onItemClick: function () {

                                            //
                                            //  TODO
                                            //
                                            var selectedRowsData = e.component.getSelectedRowsData();
                                            if (selectedRowsData.length > 0) {
                                                if (_.onBeforeDeleteDetail !== undefined) _.onBeforeDeleteDetail(e.component, selectedRowsData, ParentPropertyName);
                                                _.DeleteDetails(e.component, selectedRowsData, ParentPropertyName);
                                            }
                                        }
                                    });
                                }

                                if (_.IsFormReadOnly !== true ) {
                                    if (ID_DetailView !== -1) {
                                        e.items.unshift({
                                            text: "Open Detail",
                                            icon: "fa fa-folder-open",
                                            //template: "contextItem",
                                            onItemClick: function () {
                                                var detail = angular.copy(e.row.data);
                                                _.OpenOnNewWindow(ID_DetailView, detail).then(function (CurrentData) {

                                                    _.$scope.CurrentObject[PropertyName][e.rowIndex] = CurrentData;

                                                    _.$timeout(function () {

                                                        e.component.repaint();

                                                    });

                                                });
                                            }
                                        });
                                    }
                                }

                                //
                                // ADD FOLLOWING
                                //

                            }
                        } else {
                            
                            if (e.items == null) e.items = [];

                            if (ParentPropertyName !== null) {
                                var MenuOptions = _.$scope[PropertyName + '_MenuOptions'];
                                if (MenuOptions !== undefined) {
                                    $.each(MenuOptions, function (i, o) {
                                        e.items.unshift(o);
                                    });
                                }
                            }
                        }

                        if (_["onContextMenuPreparing_" + PropertyName] !== undefined) {

                            _["onContextMenuPreparing_" + PropertyName](e);

                        }
                    },
                    //summary: {
                    ////    totalItems : GridSummaries
                    ////}
                    //    //totalItems: [{
                    //    //    name: 'SelectedRowsSummary',
                    //    //    showInColumn: 'ID',
                    //    //    summaryType: 'sum',
                    //    //    //customizeText: function() {
                    //    //    //    return 'Record Count : ';
                    //    //    //}
                    //    //}],
                    //}
                }
        }

        _.GetDeveloperMenuOptions = function (grid) {
            return {
                text: 'Developers Mode', align: 'right', color: '#588C7E', icon: 'mdi mdi-codepen', isSystem: true,
                items: [
                    {
                        text: 'Edit ListView', icon: 'icon mdi mdi-border-outside', onItemClick: function () {
                            _.EditListViewControl(grid.ID_ModelListView);
                        },
                    },
                    {
                        text: 'Edit ModelView', icon: 'icon mdi mdi-border-outside', onItemClick: function () {
                            _.EditModelObject(grid.ID_PropertyModel);
                        },
                    },
                    {
                        text: 'Save Format', icon: 'icon mdi mdi-content-save', onItemClick: function () {
                            var Grid = _.GetGridEditor(grid.PropertyName);
                            _.SaveListViewFormat(grid.Name, Grid.state(), grid.ID_ModelListView);
                        }
                    }, {
                        text: 'Batch Edit ' + _.ModelName + ' ListView', icon: 'icon mdi mdi-table-large', isDeveloperMode: true, onItemClick: function () {
                            _.EditOnSQLView(1, grid.ID_ModelListView);
                        }
                    }, {
                        text: 'Batch Edit ' +  _.ModelName + ' Properties', icon: 'icon mdi mdi-table-large', isDeveloperMode: true, onItemClick: function () {
                            _.EditModelOnSQLView(grid.ID_PropertyModel);
                        }
                    }, {
                        text: 'View Model Script', icon: 'icon mdi mdi-script', isDeveloperMode: true, onItemClick: function () {
                            _.ViewModelScript();
                        }
                    }
                ]
            }
        };

        //
        //  Form Setting
        //


        //
        //  ContextMenu
        //

        _.IsNew = function () {

            return _.$scope.CurrentObject.ID === -1;
        }

        var IsEditingOnly = _.IsEditingOnly;

        if (IsEditingOnly == false) {


            //VIEW ACCESS
            var ViewAccess = _.ViewAccess;
            //console.log('Sales Order',ViewAccess);
            if (ViewAccess !== undefined && ViewAccess !== null) {

                _.butSave = {};
                _.butSaveClose = {};
                _.butNew = {};

                if (ViewAccess.IsCanWrite == false) {
                    _.$isAllowAdd = false;
                    _.$isAllowEdit = false;
                }

                if (ViewAccess.IsCanEdit == false) {
                    _.$isAllowEdit = false;
                }

                if (_.$isAllowAdd == true) {
                    _.butNew = { ID: BaseDetailViewController.TBTN_NEW, text: 'New', icon: 'fa fa-file-o' };
                    _.$scope.FormContextMenuItems.push(_.butNew);
                }

                if (_.$isAllowEdit === true) {
                    _.butSave = { ID: BaseDetailViewController.TBTN_SAVE, color: '#28abe3', text: 'Save', icon: 'fa fa-save' };
                    _.butSaveClose = { ID: BaseDetailViewController.TBTN_SAVEANDCLOSE, color: '#ff0000', text: 'Save & Close', icon: 'fa fa-save', visible: !(_.IsModal == true) };
                    _.$scope.FormContextMenuItems.push(_.butSave);
                    _.$scope.FormContextMenuItems.push(_.butSaveClose);
                } 
            }
            _.butRefresh = { ID: BaseDetailViewController.TBTN_REFRESH, color: '#588c73', text: 'Refresh', icon: 'mdi mdi-refresh' };
            _.$scope.FormContextMenuItems.push(_.butRefresh);

        }

        if (_.IsDeveloperMode) {

            _.$scope.FormContextMenuItems.push({
                ID: -1001, align: 'right', color: '#588C7E', icon: 'mdi mdi-codepen',
                items: [
                    { ID: -1002, text: 'Edit ' + _.ModelViewName, icon: 'icon mdi mdi-border-outside' },
                    { ID: -1003, text: 'Edit ' + _.ModelName + ' Model', icon: 'icon mdi mdi-arrange-send-backward' },
                    { ID: -1004, text: 'Batch Edit (' + _.ModelViewName + ')', icon: 'icon mdi mdi-table-large' },
                    { ID: -1005, text: 'Batch Edit (' + _.ModelName + ')', icon: 'icon mdi mdi-table-large' },
                    {
                        text: 'Publish Js', icon: 'mdi mdi-language-javascript', isDeveloperMode: true, onItemClick: function () {
                            _.ConfirmBox('Do you want to publish script?', 'DetailView').then(function () {
                                var $http = angular.element(document).injector().get('$http');
                                $http.get('/JsApp/DetailView?ID=' + _.ID_View + '&ViewName=' + _.ModelViewName + '&isMinify=1').then(function (r) {
                                    _.JSDataService.Post('/JsApp/PublishJs', {
                                        ID_View: _.ID_View,
                                        Script: r.data,
                                        ViewName: _.ModelViewName,
                                        ID_ViewType: 2
                                    }).then(function () {

                                    });

                                });
                            });
                        }
                    }
                ]
            });

        }
        //
        //
        //

        _.GetGridMenuOption = function (Option) {
            return {
                bindingOptions: { 'dataSource': Option.dataSource },
                onInitialized : function( e ) { 
                    $.each( e.component._options.items , function( i , o ) {
                        if ( o.disabled === undefined )  o.disabled = false;
                    } );
                    if ( _.ChildToolbars === undefined ) { 
                        _.ChildToolbars = [];
                    }
                    _.ChildToolbars.push( e.component );
                },
                onItemClick: function (data) {
                    var item = data.itemData;

                    if (data.itemData.onItemClick !== undefined) {
                        data.itemData.onItemClick();
                    }
                }
            }
        }

        _.$scope.FormContextMenu = {

            bindingOptions: {
                'dataSource': 'FormContextMenuItems'
            },
            itemTemplate: function (itemData, itemIndex, itemElement) {
                if (itemData.align === 'right') {
                    $(itemElement).parent().parent().css('float', 'right');
                    $(itemElement).parent().parent().addClass('jsContextMenuRight');
                }

                if (itemData.icon === undefined && itemData.icon == null) {
                    itemData.icon = 'mdi mdi-file-outline';
                }

                if (itemData.color === undefined && itemData.color == null) {
                    itemData.color = '#767676';
                }
                
                if (itemData.text === undefined) {
                    return "<div class='JsContextMenu'><div class='icon-container' style='background:" + itemData.color + "'><span class='" + itemData.icon + "'></span></div></div>";
                }
                return "<div class='JsContextMenu' style='display:table-cell;vertical-align:middle;background:transparent'><div class='item-content'><span style='color:" + itemData.color + "' class='" + itemData.icon + "'></span> <div class='item-caption'>" + itemData.text + "</div>" + (itemData.items !== undefined && itemData.items !== null ? '<span class="fa fa-caret-down"></span>' : '') + "</div>";
            }
            , displayExpr: "name"
            , onInitialized: function (e) {
                $.each(e.component._options.items, function (i, o) {
                    if (o.disabled === undefined) o.disabled = false;
                });
                _.MainToolbar = e.component;
            }
            , onItemClick: function (data) {
                if (data.itemData.onItemClick !== undefined) {
                    data.itemData.onItemClick([_.$scope.CurrentObject]);
                    return;
                }
                switch (data.itemData.ID) {
                    case BaseDetailViewController.TBTN_NEW:
                        _.PerformNew();
                        break;
                    case BaseDetailViewController.TBTN_SAVE:
                        _.PerformSave();
                        break;
                    case BaseDetailViewController.TBTN_SAVEANDCLOSE:
                        if (_.$scope.$Tab !== undefined) _.$scope.$Tab.$forceClose = true;
                        _.PerformSave();
                        break;
                    case BaseDetailViewController.TBTN_REFRESH:
                        _.RefreshCurrentObject();
                        break;
                    case -1002:
                        _.EditDetailViewControl(_.ID_ModelObject);
                        break
                    case -1003:
                        _.EditModelObject(_.ID_Model);
                        break;
                    case -1004:
                        _.EditOnSQLView(2,_.ID_ModelObject);
                        break;
                    case -1005:
                        _.EditModelOnSQLView(_.ID_Model);
                        break;
                }
                if (_.onMenuItemClick !== undefined) {
                    _.onMenuItemClick(data);
                }
            }
        }

        //
        //  DATASOURCE
        //

        _.GetAutoCompleteDataSource = function (SQL, SearchColumns) {
            //console.log('AutoComplete',SearchColumns);
            return new DevExpress.data.DataSource({
                load: function (loadOptions) {
                    var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                    var searchValue = loadOptions.searchValue;
                    var searchExpr = loadOptions.searchExpr !== null && loadOptions.searchExpr !== undefined ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                    var defer = _.$q.defer();

                    var FilterExpr = [];

                    searchValue = searchValue.replace(/'/g, '"');
                    //console.log(searchValue);

                    $.each(SearchColumns, function (i,s) {
                        FilterExpr.push(" " + s + " LIKE '%" + searchValue + "%' ");
                    });

                    if (FilterExpr.length === 0) FilterExpr.push("Name LIKE '%" + searchValue + "%' ")

                    //console.log('FilterExpr', FilterExpr.join(" OR "));

                    _.JSDataService.Query(SQL, {
                        FilterExpr: FilterExpr.join(" OR ")
                    }, skip).then(function (Data) {
                        defer.resolve(Data.collection);
                    });
                    return defer.promise;
                }
            });
        }

        _.GetControlDataSource = function (SQL) {
            
            return new DevExpress.data.DataSource({
                load: function (loadOptions) {
                    var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                    var searchValue = loadOptions.searchValue;
                    var searchExpr = loadOptions.searchExpr !== null && loadOptions.searchExpr !== undefined ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                    var defer = _.$q.defer();

                    _.JSDataService.GetDataSet('/JsApp/GetDataCollection', {
                          SearchExpr: searchExpr
                        , SearchValue: searchValue
                        //, DataSourceKey: DataSourceKey
                        , SQL : SQL
                        , Skip: skip
                    }).then(function (Data) {
                        defer.resolve(Data.collection);
                    });
                    return defer.promise;
                },
                byKey: function (key) {
                    var defer = _.$q.defer();
                    _.JSDataService.GetDataSet('/JsApp/GetDataCollection', {
                        Key: key
                      , SQL: SQL
                    }).then(function (Data) {
                        //console.log(SQL,Data);
                        defer.resolve(Data.collection[0]);
                    });
                    //_.$timeout(function () {
                    //    defer.resolve(null);
                    //}, 500);
                    return defer.promise;
                },
            });
        }

        //
        //  END
        //

        _.AddRemoteValidationRule = function (SQL, Params) {
            _.ValidationRules.push(function () {
                return _.JSDataService.Validate(SQL, Params);
            });
        }

        //
        //
        //

        _.$scope.OnEditDone = function () {
            var _performValidtion = _.PerformValidation();
            if (_performValidtion.then !== undefined) {
                _performValidtion.then(function (Validator) {
                    if (Validator.isValid === false) {
                        //console.log('Validator', Validator);
                        _.ShowValidation(Validator.brokenRules);
                        return;
                    }
                    _.$scope.OnEditingDone();

                });
            } else {
                if (_performValidtion.isValid === false) {
                    _.ShowValidation(_performValidtion.brokenRules);
                    return;
                }
                _.$scope.OnEditingDone();

            }
        }
        //
        //
        //

        _.EditModelDetail_Setting = function (id,Name) {
            
            this.JsPopUpView.OpenDetailView(20, {
                ID_CurrentObject: id,
                fullScreen: true
            } );

        }

        //
        //
        //

        _.FormItem_CurrentObjectChanged = function (e) {
            if (_.IsFormReadOnly === true) return;

            if (_.FormInstance !== undefined) {
                var EditableProperties = _.FormInstance.option('$EditableProperties');
                if (EditableProperties !== undefined) {
                    $.each(EditableProperties, function (i, s) {
                        if (e.dataField === s) {
                            if (_.FormInstance.getEditor(s) === undefined) return;
                            if (_['$' + s + '_OnValueChanged'] !== undefined) {
                                _['$' + s + '_OnValueChanged'](e)
                            }
                        }
                    });
                }
            }


            $.each(_.DetailViewForms, function (i, frm) {
                var EditableProperties = frm.option('$EditableProperties');
                if (EditableProperties !== undefined) {
                    $.each(EditableProperties, function (i, s) {
                        if (e.dataField === s) {
                            if (frm.getEditor(s) === undefined) return;
                            if (_['$' + s + '_OnValueChanged'] !== undefined) {
                                _['$' + s + '_OnValueChanged'](e)
                            }
                        }
                    });
                }
            });

        }

        _.FormItem_EnabledDisabled = function () {
            if (_.IsFormReadOnly === true) return;

            if (_.FormInstance !== undefined) {
                var EditableProperties = _.FormInstance.option('$EditableProperties');
                if (EditableProperties !== undefined) {
                    $.each(EditableProperties, function (i, s) {
                        if (_.FormInstance.getEditor(s) === undefined) return;
                        if (_['$' + s + '_IsDisabled'] !== undefined) {
                            var disabled = _['$' + s + '_IsDisabled']()
                            _.FormInstance.getEditor(s).option('disabled', !disabled);
                        }
                    });
                }
            }

            
            $.each(_.DetailViewForms, function (i, frm) {
                var EditableProperties = frm.option('$EditableProperties');
                if (EditableProperties !== undefined) {
                    $.each(EditableProperties, function (i, s) {
                        if (frm.getEditor(s) === undefined) return;
                        if (_['$' + s + '_IsDisabled'] !== undefined) {
                            var disabled = _['$' + s + '_IsDisabled']()
                            frm.getEditor(s).option('disabled', !disabled);
                        }
                    });
                }
            });
        }

        _.OnKeyDown = function (e) {
            switch (e.keyCode) {
                case 78:
                    if (e.altKey == true) {
                        e.preventDefault();
                        _.PerformNew();
                    }
                    break;
                case 82:
                    if (e.altKey == true) {
                        _.RefreshCurrentObject();
                    }
                    break;
                case 83:
                    if (e.ctrlKey == true) {
                        e.preventDefault();
                        if (e.altKey == true) {
                            if (_.$scope.$Tab !== undefined) _.$scope.$Tab.$forceClose = true;
                            _.PerformSave();
                        } else {
                            _.PerformSave();
                        }
                    }
                    break;
                case 27:
                    //if ($scope.$Tab !== undefined) {
                    //    $scope.CloseModule();
                    //};
                    break;
                case 112:
                    e.preventDefault();//help
                    _.$timeout(function () {
                        $scope.PageSlideViewOpen.Open = !$scope.PageSlideViewOpen.Open;
                    }, 100);
                    break;
                default:
                    //alert(e.keyCode);
                    //e.preventDefault();
                    break;
            }

        }

        if ($scope.$Tab !== undefined) {
            $scope.$Tab.onTab_KeyDown = _.OnKeyDown;
        }

        if (_.IsModal === true) {
            $scope.$onModalKeyDown = _.OnKeyDown;
        }

        $scope.onFileUploadClick = function (ID_Detail) {
            if (_.$scope.CurrentObject.ID > 0) {
                $("<form/>").attr({
                    method: "post",
                    target: "_blank",
                    action: 'JsApp/GetAttachments',
                })
                    .append($("<input type='hidden' name='ID_Model'/>").attr('value', -1))
                    .append($("<input type='hidden' name='PropertyName'/>").attr('value', 'xxxx'))
                    .append($("<input type='hidden' name='ID_CurrentObject'/>").attr('value', _.$scope.CurrentObject.ID))
                    .append($("<input type='hidden' name='ID_Detail'/>").attr('value', ID_Detail))
                    .appendTo('body').submit().remove();
            }
        }

        $scope.isHideAttachment = function (propertyName) {
            //alert('xxxxx');
            if (typeof _.$scope.CurrentObject[propertyName] === 'string') {
                if (_.$scope.CurrentObject[propertyName].length > 0) {
                    return false;
                }
            }
            //console.log(propertyName);
            return true;
        }

        $scope.OnFileUploader_FileClick = function (propertyName, e) {
            //Download
            
            var fileToUpload = Enumerable.From(_.$FilesToUpload).Where("$.propertyName =='" + propertyName + "'").SingleOrDefault();
            if (fileToUpload !== null && fileToUpload !== undefined) return;

            //
            //
            //
            //alert(_.ID_Model);
            if (_.$scope.CurrentObject.ID > 0) {
                if (_.$scope.CurrentObject[propertyName] !== null) {
                    $("<form/>").attr({
                        method: "post",
                        target:"_blank",
                        action: 'JsApp/GetAttachments',
                    })
                    .append($("<input type='hidden' name='ID_Model'/>").attr('value', _.ID_Model))
                    .append($("<input type='hidden' name='PropertyName'/>").attr('value', propertyName))
                    .append($("<input type='hidden' name='ID_CurrentObject'/>").attr('value', _.$scope.CurrentObject.ID))
                    .appendTo('body').submit().remove();
                }
            }
        }
        _.$fileUploaders = [];
        _.$fileUploadersRequiredList = [];
        _.OnFileUploader_Initialized = function (propertyName, e, caption, isRequired) {
            _.$fileUploaders.push(e);
            if (isRequired === true) {
                _.$fileUploadersRequiredList.push({
                    propertyName: propertyName,
                    caption: caption
                });
            }
            //console.log('FileUploader -->' + propertyName, _.$scope.CurrentObject[propertyName]);
        }

        _.OnFileUploader_OnValueChanged = function (propertyName, e, IsMultiple) {
            
            if ( e.value.length > 0 ) {  
                if ( _.$FilesToUpload == null ) {
                    _.$FilesToUpload = [];
                }
                var fileToUpload = Enumerable.From(_.$FilesToUpload).Where("$.propertyName =='" + propertyName + "'").SingleOrDefault();
                if (IsMultiple === true) {
                    var randomInt = BaseView.getRandomInt() + "";
                    $.each(e.value, function (i, f) {
                        f.ID_Parent = randomInt;
                    });
                    if (fileToUpload != null) {
                        fileToUpload = {
                            id: randomInt,
                            propertyName: propertyName,
                            fileName: Enumerable.From(e.value).Select('$.name').ToArray().join(","),
                            file: e.value,
                            isImage: false,
                            IsMultiple : true
                        };
                    } else {
                        _.$FilesToUpload.push({
                            propertyName: propertyName,
                            fileName: Enumerable.From(e.value).Select('$.name').ToArray().join(","),
                            file: e.value,
                            isImage: false,
                            IsMultiple: true
                        });
                    }
                } else {
                    if (fileToUpload == null) {
                        _.$FilesToUpload.push({
                            propertyName: propertyName,
                            fileName: e.value[0].name,
                            file: e.value[0],
                            isImage: false,
                        });
                    } else {
                        fileToUpload.fileName = e.value[0].name;
                        fileToUpload.file = e.value[0];
                    }
                }
                
                _.$timeout(function () {
                    _.$scope.CurrentObject[propertyName] = e.value[0].name;
                });
            } else {
                if ( _.$FilesToUpload !== null ) {         
                    //_.$scope.CurrentObject[propertyName] = null;
                    $.each( _.$FilesToUpload, function (i ,f) {
                        if (f.fileName === e.value.name) {
                            _.$FilesToUpload.splice(i, 1);
                            _.$timeout(function () {
                                _.$scope.CurrentObject[propertyName] = null;
                            });
                            return false;
                        }
                    });
                }
            }
        }
    }

    //
    //
    //
    //
    //  END..................................
    //
    //
    //
    //
    //


    BaseDetailViewController.prototype.PerformValidation = function () {

        var _ = this;

        if (_.ValidationRules.length > 0) {

            var defer = _.$q.defer();

            var ValidationRules = [];

            $.each(_.ValidationRules, function (i,o) {

                ValidationRules.push(o.call());

            });

            _.$q.all(ValidationRules).then(function (Validation) {

                console.log('-->Validation',Validation);

                _.$timeout(function () {

                    var IsValid = _.IsValid();

                    var validator = {
                        isValid: IsValid.isValid
                       , brokenRules: []
                    };

                    for (var i = 0 ; i < Validation.length ; i++) {
                        var v = Validation[i];

                        var _validator = v;

                        

                        if (_validator.isValid == false) {
                        
                            if (_validator.brokenRules !== undefined) {

                                $.each(_validator.brokenRules, function (i,s) {
                                    validator.brokenRules.push({
                                        type: 'custom',
                                        message: s
                                    });
                                })
                            } else {
                                validator.brokenRules.push({
                                    type: 'custom',
                                    message: _validator.message
                                });
                            }

                            validator.isValid = false;
                        }

                    }

                    $.each(IsValid.brokenRules,function(i,v) { 
                        validator.brokenRules.unshift( v );
                    });

                    defer.resolve(validator);

                });
               
            });
            return defer.promise;
        } else {

            return _.IsValid();

        }

        
    }

    BaseDetailViewController.prototype.IsValid = function () {

        var _ = this;

        var Forms = [_.FormInstance]

        $.each(_.DetailViewForms, function (i, e) {
            Forms.push(e);
        });

        var IsValid = true;

        var brokenRules = [];

        var FormResult = [];

        for (var i = 0 ; i < Forms.length ; i++) {

            var frm = Forms[i];

            try {
                var result = DevExpress.validationEngine.validateGroup(frm);
                FormResult.push({isValid : result.IsValid});
                if (result.isValid == false) {
                    $.each(result.brokenRules, function (i, o) {
                        if (o.message.includes("is invalid") == false) {
                            brokenRules.push(o);
                        }
                    });

                    if (IsValid == true) {

                        IsValid = false;

                    }
                }
            } catch (e) {

                FormResult.push({isValid:true});
                
            }
        }

        //
        //
        //

        if (_.$fileUploadersRequiredList.length > 0) {
            $.each(_.$fileUploadersRequiredList, function (i,s) {
                if (_.$scope.CurrentObject[s.propertyName] === undefined || _.$scope.CurrentObject[s.propertyName] === null) {
                    brokenRules.push({
                        type: 'required',
                        message: 'Please attach files ' + s.caption
                    });
                }
            });
        }

        if (_.$HotTableList !== undefined && _.$HotTableList !== null) {
            $.each(_.$HotTableList, function (i, h) {
                var Columns = Enumerable.From(h.view.settings.columns).Where("$.IsRequired == true").ToArray();
                var CurrentRows = h.view.settings.data;
                $.each(CurrentRows, function (i, o) {
                    if (o.$IsNewRow !== true) {
                        $.each(Columns, function (x, p) {
                            if (o[p.data] != null) {
                                if (p.type === undefined) { //String
                                    if (o[p.data].trim().length === 0) {
                                        IsValid = false;
                                        brokenRules.push({
                                            type: 'required',
                                            message: '(' + i + ') ' + p.data + ' is required'
                                        });
                                    }
                                }
                            } else {
                                IsValid = false;
                                brokenRules.push({
                                    type: 'required',
                                    message: '(' + i + ') ' + p.data + ' is required'
                                });
                            }
                        });
                    }
                });

                h.validateCells(function (p) {

                });
            });
        }

        if (_.PropertyGridEditors !== null && _.PropertyGridEditors.length > 0) {

            var Validators = [];

            $.each(_.PropertyGridEditors, function (i, g) {
                var _columns = g.option('columns');
                //console.log('-->Validation' + g.PropertyName, _columns);
                var validationColumns = Enumerable.From(_columns).Where(function (c) {
                    if (c.validationRules !== undefined) {
                        if (c.validationRules.length > 0) {
                            return true;
                        }
                    }
                }).ToArray();

                if (validationColumns.length > 0) {
                    
                    var GridData = _.$scope.CurrentObject[g.PropertyName];

                    if (GridData !== undefined && GridData !== null) {
                        $.each(GridData, function (i, data) {

                            $.each(validationColumns, function (i, c) {

                                var cellValue = data[c.dataField];
                                $.each(c.validationRules, function (i, v) {
                                    if (v.type == 'required') {
                                        if (cellValue == null || cellValue == undefined) {
                                            IsValid = false;
                                            brokenRules.push({
                                                type: 'required',
                                                message: g.Caption + '(' + (i + 1) + ') ' + v.message
                                            });
                                        } else {
                                            if (c.dataType === 'number') {
                                                if (cellValue === 0 && (c.isAllowZero === false)) {
                                                    IsValid = false;
                                                    brokenRules.push({
                                                        type: 'required',
                                                        message:  g.Caption + '(' +  (i + 1)  + ') ' + v.message
                                                    });
                                                }
                                            }
                                        }
                                    } else if (v.type == 'custom') {
                                        //
                                        //  TODO
                                        //
                                    }
                                });
                            });

                        });
                    }
                }
                //
                //
                //
            });
        }

       //var results = Enumerable.From(FormResult).Select("$.isValid == false").ToArray();
       //if (results.length > 0) {
       //    IsValid = false;
       //}
        if (brokenRules.length == 0) {
            IsValid = true;
        }
        return { isValid : IsValid , brokenRules : brokenRules };
    }

    //Save
    BaseDetailViewController.prototype.PerformSave = function () {
        
        var _ = this;

        _.$scope.IsNewObject = false;

        var _performSave = function (Validator) {
            if (Validator.isValid === false) {

                _.ShowValidation(Validator.brokenRules);

                return;
            }

            console.log("josephhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

            if (_.$scope.CurrentObject.ID === -1) {
                _.Save();
            } else {
                if (_.$PromptBeforeSave === false) {


                    _.Save();
                } else {
                    DevExpress.ui.dialog.confirm("Do you want to save changes?", "Save " + _.ModelName).done(function (dialogResult) {
                        if (dialogResult) {
                            _.Save();
                        }
                    });
                }
            }
        }


        var _performValidtion = _.PerformValidation();

        if (_performValidtion.then !== undefined) {

            _performValidtion.then(function (Validator) {
                _performSave(Validator);

            });

        } else {
            _performSave(_performValidtion);
        }
    }

    BaseDetailViewController.prototype.Save = function () {

        var _ = this;

        //console.log('BEFORE SAVE---->' + _.ModelViewName,);

        var defer = _.$q.defer();

        var IsNew = _.$scope.CurrentObject.ID === -1;

        var Files = null;

        if (_.$FilesToUpload !== null) {
            Files = [];
            $.each(_.$FilesToUpload, function (i, o) {
                if (o.file instanceof Array) {
                    $.each(o.file, function (x, f) {
                        Files.push(f);
                    });
                } else {
                    Files.push(o.file);
                }
                o.file = null;
            });
        }

        if (_.$IsSaving === false) {
            _.$IsSaving = true;
        } else {
            return;
        }

        if (_.$dateFields === undefined || _.$dateFields === null) _.$dateFields = [];
        _.$dateFields.push('Date');
        _.$dateFields.push('StartTime');
        _.$dateFields.push('EndDate');
        _.$dateFields.push('StartDate');
        _.$dateFields.push('MemoDate');
        _.$dateFields.push('EndTime');
        _.$dateFields.push('CheckDate');
        _.$dateFields.push('Schedule_StartDate');
        _.$dateFields.push('Schedule_EndDate');
        _.$dateFields.push('Schedule_StartTime');
        _.$dateFields.push('Schedule_EndTime');
        _.$dateFields = Enumerable.From(_.$dateFields).Distinct().ToArray();

        if (!!_.$dateFields) {
    
            //console.log('DateFields', _.$dateFields);

            $.each(_.$dateFields, function (i, df) {
                if (!!_.$scope.CurrentObject[df]) {
                    if (_.$scope.CurrentObject[df] !== null) {
                        if (typeof _.$scope.CurrentObject[df] === 'string') {
                            //console.log('dateField', df, _.$scope.CurrentObject[df]);
                            var newValue = Globalize.format(new Date(_.$scope.CurrentObject[df]), "yyyy/MM/dd HH:mm:ss");
                            _.$scope.CurrentObject[df] = newValue;
                            //console.log('new Value-->', df, _.$scope.CurrentObject[df], newValue);
                        } else if (typeof _.$scope.CurrentObject[df] === "object") {
                            var newValue = Globalize.format(_.$scope.CurrentObject[df], "yyyy/MM/dd HH:mm:ss");
                            _.$scope.CurrentObject[df] = newValue;
                        }

                    }
                }
            });
        }
        
        //console.log(_.ModelName,'-------------------------->SAVING',_.$scope.CurrentObject);
        //return;

        for (var p in _.$scope.CurrentObject) {
            var value = _.$scope.CurrentObject[p];
            if (value !== null) {
                if (value instanceof Array) {
                    $.each(value, function (index, object) {
                        for (var _value in object) {
                            
                            //console.log('--> Array', _value, typeof object[_value]);
                            if (typeof object[_value] === 'string') {
                                if (_.$dateFields.includes(_value) == true) {
                                    var newValue = Globalize.format(new Date(object[_value]), "yyyy/MM/dd HH:mm:ss");
                                    object[_value] = newValue;
                                    //alert('new Date');
                                }       
                            } else if (typeof object[_value] === 'object') {
                                if (_.$dateFields.includes(_value) == true) {
                                    if (object[_value] != null) {
                                        var newValue = Globalize.format(object[_value], "yyyy/MM/dd HH:mm:ss");
                                        object[_value] = newValue;
                                        console.log(_value, typeof object[_value], object[_value]);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }

        _.JSDataService.SaveModelObject(_.SaveUrl, {

            ID: _.ID_ModelObject,

            CurrentObject: JSON.stringify(_.$scope.CurrentObject),

            ViewName: _.ModelViewName,

            _DeletedItems: JSON.stringify(_._DeletedItems),

            $files: Files,

            $filesDetails: JSON.stringify(_.$FilesToUpload)

        }).then(function (CurrentObject) {

            //
            //
            //


            //var toastr = angular.element(document).injector().get('toastr');

            //toastr.success('Save Successfully', _.ModelName, {
            //    closeButton: true
            //});

            //DevExpress.ui.notify('Save Successfully', 'success', 1000);

            _.$IsSaving = false;

            _.ToastSuccess('Save Successful');

            _._DeletedItems = {};

            if (_.CloseAfterSave !== undefined) {
                if (_.CloseAfterSave == true) {
                    _.$timeout(function () {
                        _.$scope.ClosePopup(true);
                    }, 500);
                }
            }

            _.$isReloadCurrentObject = true;

            _.$scope.CurrentObject = CurrentObject;

            $.each(_.DetailViewForms, function (i, frm) {
                frm.option('formData', _.$scope.CurrentObject);
            });
            _.FormInstance.option('formData', _.$scope.CurrentObject);

            //_.$scope.CurrentObject.xxxxxx = 'fasfasfads';

            _.$scope.CurrentObject.$dirty = false;

            _.$scope.CurrentObject.CRUD = _.CRUDTablesIds;

            if (_.ModelHelper !== undefined) {
                _.ModelHelper.CurrentObject = _.$scope.CurrentObject;
                _.ModelHelper.onCurrentObjectSaved(_.$scope.CurrentObject);
            }

            if (_.ViewHelper !== undefined) {
                _.ViewHelper.CurrentObject = _.$scope.CurrentObject;
                _.ModelHelper.onCurrentObjectSaved(_.$scope.CurrentObject);
            }

            //Change Tab Name
            if (IsNew) {

                if (_.$scope.$Tab !== undefined) {

                    if (_.$scope.$Tab.id < 0) {

                        _.$timeout(function () {


                            //_.$scope.$Tab.id = _.ID_ModelObject * 1000 * CurrentObject.ID
                            _.$scope.$Tab.title = _.DisplayName + ' (' + CurrentObject[_.DisplayProperty] + ')';
                            _.$scope.DisplayPropertyName = ' (' + CurrentObject[_.DisplayProperty] + ')';
                            //_.$scope.$Tab.ID_CurrentObject = CurrentObject.ID;
                            //_.$scope.$Tab.title = CurrentObject.Name;

                            //_.$scope.$Tab.ViewName = 'tb' + _.ModelViewName + '_' + _.$scope.$Tab.id;
                        }, 300);
                    }
                }
            }

            //
            //
            //
            //

            if (_.$ViewOptions !== null && _.$ViewOptions !== undefined) {
                if (_.$ViewOptions.$onCurrentObjectSaved !== undefined && _.$ViewOptions.$onCurrentObjectSaved !== null) {
                    _.$ViewOptions.$onCurrentObjectSaved(_.$scope.CurrentObject,_);
                }

                if (_.$scope.$Tab !== undefined) {
                    if (_.$scope.$Tab.$forceClose == true) {
                        _.$timeout(function () {
                            _.$scope.$Tab.CloseModule();
                        }, 500);
                        return;
                    }
                }

                if (_.$ViewOptions.$ClosedAfterSaved === true) {
                    _.ConfirmBox('Do you want to close this ' + (_.$scope.$Tab !== undefined ? 'Tab' : 'Window') + '?').then(function () {
                        _.$timeout(function () {
                            _.$scope.$Tab.CloseModule();
                        }, 500);
                    }, function () {
                        _.$scope.StatusText = 'Successfully Saved';
                        _.onLoad();
                    });
                    return;
                }
            } else {
                if (_.$scope.$Tab !== undefined) {
                    if (_.$scope.$Tab.$forceClose == true) {
                        _.$timeout(function () {
                            _.$scope.$Tab.CloseModule();
                        }, 500);
                        return;
                    }
                }
            }

            _.$scope.StatusText = 'Successfully Saved';
            _.onLoad();

            //_.onLoad();

            //if (_.$scope.$Tab !== undefined) {
            //    _.ConfirmBox('Do you want to close this ' + (_.$scope.$Tab !== undefined ? 'Tab' : 'Window') + '?').then(function () {
            //        _.$timeout(function () {

            //            _.$scope.$Tab.CloseModule();

            //        }, 500);
            //    });
            //}
            defer.resolve();
        }, function () {
            _.$IsSaving = false;
            defer.reject();

        });
        return defer.promise;
    }

    BaseDetailViewController.prototype.Reload = function (ID_CurrentObject) {
        var _ = this;
        var d = _.$q.defer();
        if (ID_CurrentObject == undefined) ID_CurrentObject = _.$scope.CurrentObject.ID;
        var Params = _.$scope.$params;
        _.JSDataService.GetCurrentObject(_.ReloadUrl, {
            ID: _.ID_ModelObject
                   , ViewName: _.ModelViewName + '_DetailView_' + ID_CurrentObject
                   , ID_CurrentObject: ID_CurrentObject
                   , DataSource: _.$ViewOptions.DataSource
                   , params: (Params !== null && Params !== undefined ? JSON.stringify(Params) : null)
        }).then(function (CurrentObject) {

            if (ID_CurrentObject == -1) {
                $.each(_.DetailViewForms, function (i, frm) {
                    frm.resetValues();
                });
                _.FormInstance.resetValues();
            }
            
            _.$timeout(function () {
                _.$isReloadCurrentObject = true;
                _.$scope.CurrentObject = CurrentObject;
                _.$scope.CurrentObject.$dirty = false;
                _.$scope.CurrentObject.CRUD = _.CRUDTablesIds;

                if (_.ModelHelper !== undefined) {
                    _.ModelHelper.CurrentObject = _.$scope.CurrentObject;
                }
                if (_.ViewHelper !== undefined) {
                    _.ViewHelper.CurrentObject = _.$scope.CurrentObject;
                }

                $.each(_.DetailViewForms, function (i, frm) {
                    frm.option('formData', _.$scope.CurrentObject);
                });
                _.FormInstance.option('formData', _.$scope.CurrentObject);

                _.onLoad();
                d.resolve();

            }, 500);

        });
        return d.promise;
    }

    BaseDetailViewController.prototype.RefreshCurrentObject = function () {

        var _ = this;

        DevExpress.ui.dialog.confirm("Reload Current " + _.ModelName + "?", "Load " + _.ModelName).done(function (dialogResult) {
            if ( dialogResult ) {
                _.Reload();
            }
        });

    }

    BaseDetailViewController.prototype.PerformNew = function () {

        var _ = this;

        if (_.$PromptBeforeSave === false) {
            _.Reload(-1);
        } else {
            DevExpress.ui.dialog.confirm("Create New " + _.ModelName + "?", "New ").done(function (dialogResult) {
                if (dialogResult) {
                    _.Reload(-1);
                }
            });
        }
    }

    BaseDetailViewController.prototype.onLoad = function () {
        var _ = this;

        _.$FilesToUpload = [];
        _.$fileUploadersRequiredList = [];

        if (_.$fileUploaders !== undefined && _.$fileUploaders !== null) { 
            if ( _.$fileUploaders.length  > 0 ) { 
                $.each(_.$fileUploaders, function (i, f) {
                    //alert('xxx');
                    if (f.reset !== undefined) {
                        if (_.$scope.CurrentObject.ID > -1) {
                            if (f.PROPERTYNAME !== undefined) {
                                var src = _.$scope.CurrentObject[f.PROPERTYNAME];
                                if (!!src) {
                                    f.skipImage = true;
                                }
                            }
                        }
                        f.reset();
                        //console.log('Uploadersss-->', f);
                    } else {
                        if (_.$scope.CurrentObject.ID > -1) {
                            if (f.component.PROPERTYNAME !== undefined) {
                                var src = _.$scope.CurrentObject[f.component.PROPERTYNAME];
                                if (!!src) {
                                    f.component.skipImage = true;
                                }
                            }
                        }
                        f.component.reset();
                        //console.log('Uploadersss-->', f.component);
                    }
                });
            }
        }

        _.$timeout(function () {
            if (_.$imgControls !== undefined && _.$imgControls !== null) {
                if (_.$imgControls.length > 0) {
                    $.each(_.$imgControls, function (i, cmp) {
                        var PropertyName = cmp.PROPERTYNAME;
                        var img = cmp.$ImgControl;
                        var Source = $(img).attr('src');
                        if (Source == undefined || Source == null) {
                            var src = _.$scope.CurrentObject[PropertyName];
                            if (!!src) {
                                $(img).attr('src', src);
                            }
                        }
                    });
                }
            }
        }, 1000);
        

        _.$scope.CurrentObject.$dirty = false;

        if (_.$scope.CurrentObject.ID > -1) {
            //console.log('-->on Load', _.$scope.CurrentObject);
        }

        //console.log('on Load', _.$scope.CurrentObject);
        _._DeletedItems = {};
        if (_.ModelHelper !== undefined) {
            _.ModelHelper.CurrentObject = _.$scope.CurrentObject;
            _.ModelHelper.onLoad();
        }

        if (_.ViewHelper !== undefined) {
            _.ViewHelper.CurrentObject = _.$scope.CurrentObject;
            _.ViewHelper.onLoad();
        }

        if (_.IsFormReadOnly !== undefined) {
            if (_.butSave !== undefined) {
                _.butSave.disabled = _.IsFormReadOnly;  
            }
            if (_.butSaveClose !== undefined) {
                _.butSaveClose.disabled = _.IsFormReadOnly;
            }
        }
       
        if (_.$scope.CurrentObject.ID > 0) {
            if (_.$scope.CurrentObject.DateCreated !== undefined) {
                _.$scope.DataInformationText = 'Created by ' + _.$scope.CurrentObject.CreatedBy + ' on ' + moment(_.$scope.CurrentObject.DateCreated).format('MMMM D, YYYY h:mm:ss A');
            } else {
                _.$scope.DataInformationText = 'Created by ' + _.$scope.CurrentObject.CreatedBy;
            }
        } else {
            _.$scope.DataInformationText = '(New Record)';
            //
            //
            //

            if (_.$imgControls !== undefined && _.$imgControls !== null) {
                if (_.$imgControls.length > 0) {
                    $.each(_.$imgControls, function (i, cmp) {
                        var img = cmp.$ImgControl;
                        $(img).removeAttr('src');
                        //$(img).attr('alt', 'Please Select Image');
                    });
                }
            }
        }

        //
        //
        //
        if (_.PropertyGridEditors !== undefined && _.PropertyGridEditors !== null) {
            $.each(_.PropertyGridEditors, function (i, o) {
                if (_.$scope.CurrentObject[o.PropertyName] != null) {
                    if (Array.isArray(_.$scope.CurrentObject[o.PropertyName]) !== true) {
                        _.$scope.CurrentObject[o.PropertyName] = [];
                    }
                } else {
                    _.$scope.CurrentObject[o.PropertyName] = [];
                }
                //console.log('-->',_.$scope.CurrentObject[o.PropertyName]);
                o.clearSelection();
            });
        }

        if (_.$GridControlList !== undefined) {
            if (_.$GridControlList !== null) {
                $.each(_.$GridControlList, function (i, g) {
                    g.clearSelection();
                    g.refresh();
                });
            }
        }

        if (_.$HotTableList !== null && _.$HotTableList !== undefined) {
            $.each(_.$HotTableList, function (i, h) {
                h.render();
            });
        }


        //VIEW ACCESS
        var ViewAccess = _.ViewAccess;
        if (ViewAccess !== undefined && ViewAccess !== null) {
            if (ViewAccess.IsCanWrite == false) {
                if (_.$scope.CurrentObject.ID == -1) {
                    _.butSave.disabled = true;
                    _.butSaveClose.disabled = true;
                }
            }

            if (ViewAccess.IsCanEdit === false) {
                if (_.$scope.CurrentObject.ID > 0) {
                    _.butSave.disabled = true;
                    _.butSaveClose.disabled = true;
                }
            }
        }

        _.FormItem_EnabledDisabled();
        _.RefreshToolBar();

        if (_.$MainTab !== undefined) {
            _.$MainTab.option('selectedIndex', 0);
        }

        if (_.$OtherTabs !== undefined) {

        }

        

        _.$timeout(function () {
            var CurrentControl = _.FormInstance.getEditor(_.firstFieldIndex);
            if (CurrentControl !== undefined && CurrentControl !== null) {
                CurrentControl.focus();
                //alert('focus');
            }

            //if (_.$scope.CurrentObject.ID == -1) {
            //    _.FormInstance.resetValues();
            //    $.each(_.DetailViewForms, function (i, e) {
            //        e.resetValues();
            //    });
            //}
        }, 500);
        
    }

    BaseDetailViewController.prototype.CurrentObject_FieldDataChanged = function (e) {
        var _ = this;
        if (_.ModelHelper !== undefined) {
            if (_.ModelHelper.onCurrentObjectChanged !== undefined) {
                _.ModelHelper.onCurrentObjectChanged(e);
            }
        }
        if (_.ViewHelper !== undefined) {
            if (_.ViewHelper.onCurrentObjectChanged !== undefined) {
                _.ViewHelper.onCurrentObjectChanged(e);
            }
        }
        _.FormItem_EnabledDisabled();
        _.FormItem_CurrentObjectChanged(e);
    }

    BaseDetailViewController.prototype.OnFormInitialized = function () {
        var _ = this;
        if (_.ModelHelper !== undefined) {
            if (_.ModelHelper.OnFormInitialized !== undefined) {
                _.ModelHelper.OnFormInitialized(_);
            }
        }
        if (_.ViewHelper !== undefined) {
            if (_.ViewHelper.OnFormInitialized !== undefined) {
                _.ViewHelper.OnFormInitialized(_);
            }
        }
     }

    BaseDetailViewController.prototype.DeleteDetails = function (Grid, SelectedRows, ParentPropertyName) {

        var _ = this;

        var result = DevExpress.ui.dialog.confirm("Do you want to delete item(s)?",_.ModelName);

        result.done(function (dialogResult) {

            if (dialogResult === false) return;

            if (_._DeletedItems[Grid._options.propertyName] === undefined) _._DeletedItems[Grid._options.propertyName] = [];

            var Properties = null;

            var CurrentSelected = undefined;

            var PropertyName = Grid._options.propertyName;

            if ( _[PropertyName + "_IsCanDelete"] !== undefined ) { 
                if ( _[PropertyName + "_IsCanDelete"](SelectedRows) == false ) return;
            }

            if (ParentPropertyName !== undefined && ParentPropertyName !== null) {
                var ParentGrid = _.GetGridEditor(ParentPropertyName);

                if (ParentGrid.getSelectedRowsData().length === 0) return;

                CurrentSelected = ParentGrid.getSelectedRowsData()[0];
            }

            //
            //

            if (CurrentSelected !== undefined) {
                if (CurrentSelected !== null) {

                    var CurrentObject = CurrentSelected;

                    //if (CurrentSelected.ID > -1) {
                    //    CurrentObject = Enumerable.From(_.$scope.CurrentObject[ParentPropertyName]).Where('$.ID ==' + CurrentSelected.ID).SingleOrDefault();
                    //} else {
                    //    CurrentObject = CurrentSelected;
                    //}

                    Properties = CurrentObject[Grid._options.propertyName];

                    var indexes = [];
                    $.each(SelectedRows, function (i, o) {
                        indexes.push(Properties.indexOf(o));
                        if (o.ID > 0) {
                            _._DeletedItems[Grid._options.propertyName].push(jQuery.extend({}, o));
                        }
                    });

                    $.each(indexes, function (i, index) {
                        _.$timeout(function () {
                            Grid.deleteRow(index);
                            if (_.OnDetailGrid_RowDeleted !== undefined) {
                                _.OnDetailGrid_RowDeleted(Grid);
                            }
                        });
                        
                    });


                    //$.each(SelectedRows, function (i, o) {

                    //    var Index = Properties.indexOf(o);
                    //    if (o.ID > -1) {
                    //        _._DeletedItems[Grid._options.propertyName].push(jQuery.extend({}, o));
                    //    }

                    //    Grid.deleteRow(Index);
                    //    alert(Index);
                        
                    //    if (_.OnDetailGrid_RowDeleted !== undefined) {
                    //        _.OnDetailGrid_RowDeleted(Grid);
                    //    }

                    //});
                    
                }
            } else {

                Properties = _.$scope.CurrentObject[Grid._options.propertyName];
                var indexes = [];
                $.each(SelectedRows, function (i, o) {
                    indexes.push(Properties.indexOf(o));
                    if (o.ID > 0) {
                        _._DeletedItems[Grid._options.propertyName].push(jQuery.extend({}, o));
                    }
                });

                $.each(indexes, function (i, index) {
                    _.$timeout(function () {
                        Grid.deleteRow(index);
                        if (_.OnDetailGrid_RowDeleted !== undefined) {
                            _.OnDetailGrid_RowDeleted(Grid);
                        }
                    });
                });

              
            }
            _.$scope.CurrentObject.$dirty = true;
        });

        //Grid.repaint();
    };

    return BaseDetailViewController;
});