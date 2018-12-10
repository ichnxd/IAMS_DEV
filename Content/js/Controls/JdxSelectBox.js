function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
var jDxSelectBox = DevExpress.ui.dxSelectBox.inherit({
    _init: function () {
        this.callBase();
        var options = this._options;
        options.searchEnabled = true;
        options.showClearButton = true;
        options.valueExpr = 'ID';
        options.displayExpr = 'Name';

        if (this._options._CurrentValue != undefined) {

            if (this._options._CurrentValue != null) {
                //alert('xxxx');
                this.option('value', this._options._CurrentValue.ID);
                this.option('selectedItem', this._options._CurrentValue);
            }

        }

    },
    _renderInputAddons: function () {
        
        this.callBase();
        this._renderCustomButton();
    },
    _renderCustomButton: function () {

        if (this.$InitButtons) {
            return;
        }

        //console.log(this);

        var _ = this;

        this.$InitButtons = true;
        
        this._$element.addClass('jDxSelectBox');

        //this._$container.find('.dx-texteditor-container').prepend('<span style="color:' + this._options.modelPrimaryColor + '" class="js-model-icon ' + this._options.icon + '"></span>');
        //
        //this._$container.find('.dx-texteditor-container').find('input').width('92%');

        var options = this._options;

        _._$clearButton.on('click', function (e) {

            _._options._CurrentValue = null;
        
            _.option('value', null);
        
            _.option('selectedItem', null);
        
            _._$clearButton.hide();
        
            _._$placeholder.show();
        
            //if (_._options.OnItemSelected != undefined) {
            //
            //    _._options.OnItemSelected(null);
            //
            //}
        
        });

        this._buttonsContainer().find('.dx-dropdowneditor-button').on('click', function (e) {

            e.stopPropagation();

            if (options.JsPopUpView === undefined) return;

            if (options.ID_ModelListView === null || options.ID_ModelListView === undefined) throw new Error('Specify ID_Control_ModelListView');

            if (_.option('readOnly') === true) return;
            if (_.option('disabled') === true) return;

            _._OpenPopUpListView(options.JsPopUpView);

        });

    },
    _displayValue: function (e) {

        if (this._options._CurrentValue != undefined) {
    
            if (this._options._CurrentValue != null) {

                return this._options._CurrentValue.Name;
                    
            }
    
        } else {
    
            if (e == null) {
    
                return this.callBase(e);
    
            }
        }
    
        return e.Name;
    },
    _OpenPopUpListView: function (JsPopUpView) {

        var _ = this;

        //console.log(_);

        var options = this._options;

        var ID_Control_ModelListView = options.ID_ModelListView;

        var Input = _._$element.find('input'); 

        var ID = Input.attr('id');
        if (ID === undefined) {
            ID = createGuid();
            Input.attr('id', ID);
        } 
        
        //var eHeight = Input.height();
        //var eWidth = Input.width();
        //var wHeight = $(window).height();
        //var wWidth = $(window).width();
        //var position = Input.offset();
        var pHeight = $(window).height() * 0.45;
        var pWidth = $(window).width() * 0.45;
        //var eTop = position.top;
        //var eLeft = position.left;

        //var IsBottom = wHeight - (eTop + eHeight) >= pHeight ? true : false;
        //var IsLeft = wWidth - (eLeft + eWidth) >= pWidth ? true : false;

        //var pPosition = null;

        //if ( IsBottom && IsLeft ) { 
        //    pPosition = {
        //        my: 'left top',
        //        at: 'left bottom', of: _._$element
        //    };
        //} else if ( IsBottom && IsLeft === false ){
        //    pPosition = {
        //        my: 'right top',
        //        at: 'right bottom', of: _._$element
        //    };
        //} else if ( IsBottom == false && IsLeft ) {
        //    pPosition = {
        //        my: 'left bottom',
        //        at: 'left top', of: _._$element
        //    };
        //} else {
        //    // false false
        //    pPosition = { 
        //            my: 'right top',
        //            at: 'right bottom',
        //            of: _._$element
        //    }
        //}

        var FilterString = null;

        if (_._options._CurrentValue != null) {

            FilterString = "ID = " + _._options._CurrentValue.ID;

        }

    
        JsPopUpView.OpenListView(options.ID_ModelListView, {

            ID: ID + '_PopUpView' ,
            //position: pPosition,
            height: pHeight,
            width: pWidth,
            anchorElement : _._$container,
            FilterString : FilterString,
            SingleSelect: true,
            closeOnOutsideClick: true,
            IsDisposeAfterClose : true,
            minButton: false,
            animation: false,
            maxButton: false,
            restoreButton: false,
            dragEnabled : false,
            OnLookUpListViewItemSelected: function (ItemSelected) {

                _._options._CurrentValue = ItemSelected;

                _.option('value', ItemSelected.ID);
                
                _.option('selectedItem', ItemSelected);

                if (_._options.OnItemSelected != undefined) {
                    _._options.OnItemSelected(ItemSelected);
                }

                window.setTimeout(function () {

                    //_._$clearButton.show();
                    //
                    //_._$placeholder.hide();
                    //
                    //_._$container.find('input').val(ItemSelected.Name);
                    //
                    options.PopUpView.hide();

                    //_.focus();

                },100);
                
            },
        } ).then(function(Popup){
        
            options.PopUpView = Popup;

        } );

    },
    _createDropDownButton: function () {
        try {
            return this.callBase();
        } catch (ex) {

        }
    },
    _createPopup: function () {
        this.callBase();
        this._$popup.remove();
    },
    _clean: function () {
        delete this._$customButton;
        this.callBase();
    }
});
DevExpress.registerComponent("jDxSelectBox", jDxSelectBox);