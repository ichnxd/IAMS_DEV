function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}


var jDxDateRangeBox = DevExpress.ui.dxSelectBox.inherit({
    _init: function () {
        this.callBase();
        this.option('placeholder', 'Select Date...');
        this.option('showClearButton', false);
        //
        //
        //
        var DateValue = null;
        var DateValueOption = this.option('value');

        var dataSourceItems = [
               //{
               //    id: -2,
               //    text: 'None'
               //},
               //{
               //    id: -1,
               //    text: 'Default'
               //},
               {
                   id: 1,
                   text: 'Date Range'
               },
               {
                   id: 2,
                   text: 'Today'
               },
               {
                   id: 3,
                   text: 'Current Week'
               },
               {
                   id: 4,
                   text: 'Current Month'
               },
               {
                   id: 5,
                   text: 'Current Year'
               },
               {
                   id: 6,
                   text: 'Quarter 1'
               },
               {
                   id: 7,
                   text: 'Quarter 2'
               },
               {
                   id: 8,
                   text: 'Quarter 3'
               },
               {
                   id: 9,
                   text: 'Quarter 4'
               },
        ];

        this.option("valueExpr", 'id');
        this.option("onValueChanged", function (e) {
            //if (_.OptionBox !== undefined) {
            //    _.OptionBox.option('value', -2);
            //}
        });
        this.option("displayExpr", 'text');
        this.option("dataSource", dataSourceItems);


        if (DateValueOption !== undefined && DateValueOption !== null) {
            DateValue = this._getDateValue(DateValueOption);
            this.option('value', DateValue.id);
            var onInit = this.option('onInit');
            if (onInit !== undefined) {
                onInit(DateValue);
            }
        }
        this.option('DateValue', DateValue);
    },
    _renderClearButton: function () {
        var clearButtonVisibility = this._clearButtonVisibility();
        this.element().toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, clearButtonVisibility);
        if (clearButtonVisibility) {
            if (this._$clearButton === undefined || this._$clearButton === null) {
                this._$clearButton = this._createClearButton();
                this._$clearButton.css({ 'padding-top': '33px' }).prependTo(this._buttonsContainer())
            }
        }
        if (this._$clearButton)
            this._$clearButton.toggleClass("dx-state-invisible", !clearButtonVisibility)
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
    _getDateValue: function (id) {
        var DateValue = {
            id: -2,
            startDate: null,
            endDate: null
        }
        DateValue.ID_Period = null;
        switch (id) {
            case 1:
                //var curr = new Date();
                DateValue.startDate = null;
                DateValue.endDate = null;
                break;
            case 2:
                DateValue.startDate = new Date();
                DateValue.endDate = new Date();
                break;
            case 3:
                var curr = new Date();
                DateValue.startDate = new Date(curr.setDate(curr.getDate() - curr.getDay()));;
                DateValue.endDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
                break;
            case 4:
                var curr_date = new Date();
                DateValue.startDate = moment([curr_date.getFullYear(), curr_date.getMonth()]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([curr_date.getFullYear(), curr_date.getMonth()]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                DateValue.ID_Period = 5;
                break;
            case 5:
                var date = new Date();
                DateValue.startDate = moment([date.getFullYear(), 0]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([date.getFullYear(), 11]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                DateValue.ID_Period = 6;
                break;
            case 6:
                var date = new Date();
                DateValue.ID_Period = 1;
                DateValue.startDate = moment([date.getFullYear(), 0]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([date.getFullYear(), 2]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                break;
            case 7:
                var date = new Date();
                DateValue.ID_Period = 2;
                DateValue.startDate = moment([date.getFullYear(), 3]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([date.getFullYear(), 5]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                break;
            case 8:
                var date = new Date();
                DateValue.ID_Period = 3;
                DateValue.startDate = moment([date.getFullYear(), 6]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([date.getFullYear(), 8]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                break;
            case 9:
                var date = new Date();
                DateValue.ID_Period = 4;
                DateValue.startDate = moment([date.getFullYear(), 9]).format('YYYY-MM-DD HH:mm:ss');
                DateValue.endDate = moment([date.getFullYear(), 11]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                break;
        }
        DateValue.id = id;
        //console.log(DateValue);
        return DateValue;
    },
    _renderPopupContent: function () {
        var _ = this;
        var $timeout = angular.element(document).injector().get('$timeout');
        this._setPopupOption("minHeight", 295);
        this._setPopupOption("minWidth", 330);
        this._setPopupOption("resizeEnabled", true);

        this._$element.addClass('jDxDateRangeBox');

        var $popupContent = this._popup.content();

        var DateValue = this.option('DateValue');
        var DateValueOption = DateValue.id

        $popupContent.css({ 'padding': '10px' });

        _.IsDatePeriod = false;

        var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        ];

        var periodList = [];
        for (var i = 2010; i <= (new Date()).getFullYear() ; i++) {
            periodList.push(i.toString());
        }


        $('<div></div>').dxForm({
            items: [{
                itemType: 'tabbed',
                tabPanelOptions: {
                    deferRendering: false,
                    onSelectionChanged: function (e) {
                        
                    },
                    onTitleClick: function (e) {
                        if (e.itemIndex === 1) {
                            _.IsDatePeriod = true;
                        } else {
                            _.IsDatePeriod = false;
                        }
                    },
                },
                tabs: [{
                    title: "Range",
                    items: [
                        {
                            name: 'StartDate',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                //value: DateValue !== null ? DateValue.startDate : undefined,
                                width: '100%',
                                onInitialized: function (e) {
                                    _.$StartDate = e.component;
                                    if (DateValue !== null) {
                                        _.$StartDate.option('value', DateValue.startDate);
                                        _.$StartDate.option('disabled', (DateValue.id !== 1 && DateValue.id !== -1));
                                    }
                                }
                            },
                            label: {
                                alignment: 'right',
                                text: 'From',
                                showColon: false
                            }
                            , colSpan: 1
                        }, {
                            name: 'EndDate',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                //value: DateValue !== null ? DateValue.endDate : undefined,
                                width: '100%',
                                onInitialized: function (e) {
                                    _.$EndDate = e.component;
                                    if (DateValue !== null) {
                                        _.$EndDate.option('value', DateValue.endDate);
                                        _.$EndDate.option('disabled', DateValue.id !== 1);
                                    }
                                }
                            },
                            label: {
                                alignment: 'right',
                                text: 'To',
                                showColon: false
                            }
                            , colSpan: 1
                        }, {

                            editorType: 'dxRadioGroup',
                            editorOptions: { 
                                dataSource: _.option("dataSource"),
                                value: DateValueOption,
                                layout: 'horizontal',
                                onValueChanged: function (e) {
                                    DateValueOption = e.value;
                                    if (e.value == -2) {
                                        _.$StartDate.option('disabled', true);
                                        _.$EndDate.option('disabled', true);
                                        _.$StartDate.option('value', null);
                                        _.$EndDate.option('value', null);
                                        return;
                                    }
                                    _.$StartDate.option('disabled', (e.value !== 1 && e.value !== -1));
                                    _.$EndDate.option('disabled', e.value !== 1);
                                    if (e.value == -1) {
                                        _.$EndDate.option('value', null);
                                    }

                                    var DateValue = _._getDateValue(e.value);
                                    //
                                    //
                                    //

                                    _.$StartDate.option('value', DateValue.startDate);
                                    _.$EndDate.option('value', DateValue.endDate);
                                    _.option('DateValue', DateValue);



                                }, onInitialized: function (e) {
                                    _.OptionBox = e.component;
                                    _.OptionBox.option('value', DateValueOption);
                                },
                                valueExpr: 'id',
                                displayExpr: 'text',
                            }
                        }

                    ]
                }, {
                    title: "Period",
                    items: [
                        {
                            name: 'Year',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                items: periodList,
                                onInitialized: function (e) {
                                    _.$YearBox = e.component;
                                }
                            },
                            label: {
                                alignment: 'right',
                                text: 'Year',
                                showColon: false,
                            }
                        },
                        {
                            name: 'Period',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                valueExpr: 'id',
                                displayExpr: 'name',
                                items: [{ id: -1, name: '(All)' }, { id: 1, name: 'January' }, { id: 2, name: 'February' }, { id: 3, name: 'March' },
                                    { id: 4, name: 'April' }, { id: 5, name: 'May' }, { id: 6, name: 'June' },
                                    { id: 7, name: 'July' }, { id: 8, name: 'August' }, { id: 9, name: 'September' },
                                    { id: 10, name: 'October' }, { id: 11, name: 'November' }, { id: 12, name: 'December' },
                                    { id: 13, name: 'Quarter 1' }, { id: 14, name: 'Quarter 2' }, { id: 15, name: 'Quarter 3' }, { id: 16, name: 'Quarter 4' }],
                                onInitialized: function (e) {
                                    _.$PeriodBox = e.component;
                                }
                            },
                            label: {
                                alignment: 'right',
                                text: 'Period',
                                showColon: false,
                                //location: 'top'
                            }
                        }
                    ]
                }]
            }],
            colCount: 1,
            minColWidth: 200,
            alignItemLabels: true
        }).appendTo($popupContent);

        $("<div/>").dxButton({
            text: 'OK',
            width: '80px',
            type: 'success',
            onClick: function () {
                var dateValue = _.option('DateValue');
                var tempDateValue = null;
                var ID_Period = null;
                if (_.IsDatePeriod === true) {
                    var Year = _.$YearBox.option('value');
                    var Period = _.$PeriodBox.option('value');
                    //
                    //
                    //
                    
                    if (Year == null) return;
                    if (Period == null) return;
                    var startDate = null;
                    var endDate = null
                    if (Year !== '(All)' && Period == -1) {
                        startDate = moment([parseInt(Year), 0]).format('YYYY-MM-DD HH:mm:ss');
                        endDate = moment([parseInt(Year), 11]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                        dateValue.displayValue = 'Year (' + Year + ')';
                        ID_Period = 6;
                    }
                    else if (Year !== '(All)' && ( Period > 0 && Period < 13) ) {
                        //numbers
                        var month = Period;
                        startDate = moment([parseInt(Year), month - 1]).format('YYYY-MM-DD HH:mm:ss');
                        endDate = moment(startDate).endOf('month').format('YYYY-MM-DD HH:mm:ss');

                        dateValue.displayValue = Year + ' ' + monthNames[month -1];
                        ID_Period = 5;
                    } else if (Year !== '(All)' &&  Period > 12) {
                        //QUARTER
                        switch (Period) {
                            case 13:
                                startDate = moment([parseInt(Year), 0]).format('YYYY-MM-DD HH:mm:ss');
                                endDate = moment([parseInt(Year), 2]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                                dateValue.displayValue = 'Quarter 1 (' + Year + ')';
                                ID_Period = 1;
                                break;
                            case 14:
                                startDate = moment([parseInt(Year), 3]).format('YYYY-MM-DD HH:mm:ss');
                                endDate = moment([parseInt(Year), 5]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                                dateValue.displayValue = 'Quarter 2 (' + Year + ')';
                                ID_Period = 2;
                                break;
                            case 15:
                                startDate = moment([parseInt(Year), 6]).format('YYYY-MM-DD HH:mm:ss');
                                endDate = moment([parseInt(Year), 8]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                                dateValue.displayValue = 'Quarter 3 (' + Year + ')';
                                ID_Period = 3;
                                break;
                            case 16:
                                startDate = moment([parseInt(Year), 9]).format('YYYY-MM-DD HH:mm:ss');
                                endDate = moment([parseInt(Year), 11]).endOf('month').format('YYYY-MM-DD HH:mm:ss');
                                dateValue.displayValue = 'Quarter 4 (' + Year + ')';
                                ID_Period = 4;
                                break;
                        }
                    }
          
                    dateValue.startDate = startDate;
                    dateValue.endDate = endDate;
                    dateValue.IsDatePeriod = true;
                    dateValue.id = (parseInt(Year) + Period) * -1;
                    DateValueOption = dateValue.id;
                    console.log('dateValue', dateValue);
                    _.option('DateValue', dateValue);
                    tempDateValue = angular.copy(dateValue)
                    //_.repaint();
                } else {
                    dateValue.IsDatePeriod = false;
                    /*if (DateValueOption == 1) {
                        dateValue.startDate = moment(_.$StartDate.option('value')).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
                        dateValue.endDate = moment(_.$EndDate.option('value')).add(1, 'day').format('YYYY-MM-DD HH:mm:ss');
                        _.option('DateValue', dateValue);
                    }*/
					
					dateValue.startDate = moment(_.$StartDate.option('value')).format('YYYY-MM-DD HH:mm:ss');
                    dateValue.endDate = moment(_.$EndDate.option('value')).format('YYYY-MM-DD HH:mm:ss');
                    _.option('DateValue', dateValue);
                    tempDateValue = angular.copy(dateValue)
                }
                
                var $timeout = angular.element(document).injector().get('$timeout');
                $timeout(function () {
                    _.option('value', DateValueOption);
                    _.OptionBox.option('value', DateValueOption);
                    _.option("opened", false);
                    var onDateValueChanged = _.option('OnDateValueChanged');
                    if (onDateValueChanged !== undefined) {
                        if (ID_Period != null) {
                            tempDateValue.ID_Period = ID_Period;
                        }
                        onDateValueChanged(tempDateValue);
                    }
                }, 500);
                
                //}, 500);
            }
        }).css({ 'margin-top': '5px', 'position': 'absolute', 'bottom': '5px', 'right': '5px' }).appendTo($popupContent);
    },
    _displayValue: function (item) {
        var _ = this;
        var _StartDate, _EndDate;
        var ReturnStr = '';
        var dateValue = _.option('DateValue');
        if (dateValue.IsDatePeriod === true) {
            return dateValue.displayValue;
        }
        
        if (dateValue !== null) {
            if (dateValue.id != -2) {
                
                var StartDate = dateValue.startDate;
                var EndDate = this.option('DateValue').endDate;
                if (StartDate !== null) {
                    _StartDate = moment(StartDate).format('YYYY/MM/DD');
                }
                _EndDate = EndDate !== null && EndDate !== undefined ? moment(EndDate).format('YYYY/MM/DD') : null;
                console.log(StartDate);
                if (StartDate === null && EndDate === null) {
                    return '';
                }
                var CurrentYear = moment(StartDate).format('YYYY');
                if (dateValue.id == 2) {
                    ReturnStr = _StartDate + ' (Today)';
                } else {
                    //
                    //
                    //
                    if (dateValue.id === 3) {
                        ReturnStr = '(Current Week)';
                    } else if (dateValue.id === 4) {
                        ReturnStr = moment(StartDate).format('MMMM') + ' ' + CurrentYear;
                    } else if (dateValue.id === 5) {
                        ReturnStr = 'Year ' + CurrentYear;
                    } else if (dateValue.id === 6) {
                        ReturnStr = 'Jan ' + CurrentYear + ' to Mar ' + CurrentYear;
                    } else if (dateValue.id === 7) {
                        ReturnStr = 'Apr ' + CurrentYear + ' to Jun ' + CurrentYear;
                    } else if (dateValue.id === 8) {
                        ReturnStr = 'Jul ' + CurrentYear + ' to Sep ' + CurrentYear;
                    } else if (dateValue.id === 9) {
                        ReturnStr = 'Oct ' + CurrentYear + ' to Dec ' + CurrentYear;
                    } else if (dateValue.id === 1) {
                        ReturnStr = _StartDate + ' - ' + _EndDate;
                    } else {
                        ReturnStr = '(Date Range)';
                    }
                }
            }

        }
        return ReturnStr;
    },
    _renderOpenedState: function () {
        var opened = this.option("opened");
        if (opened) this._createPopup();
        this.element().toggleClass(DROP_DOWN_EDITOR_ACTIVE, opened);

        this._setPopupOption("visible", opened);
        this.setAria({
            expanded: opened,
            owns: (opened || undefined) && this._popupContentId
        })
    },
});
DevExpress.registerComponent("jDxDateRangeBox",jDxDateRangeBox);