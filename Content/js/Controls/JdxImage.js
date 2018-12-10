var jDxImage = DevExpress.ui.dxTextArea.inherit({
    _init: function () {
        this.callBase();
        this.NAME = 'jDxImage';
    },
    _render: function () {
        var _ = this;
        var PropertyName = _.option('PropertyName');
        this.PROPERTYNAME = PropertyName;
        var fileUploaders = null;
        var ImagePath = _.option('value');
        this._$element.addClass("js-image-control");

        var ClearButton = $('<div class="clear-button"><span class="mdi mdi-close-circle"></span></div>');
        //ClearButton.css({ 'display': 'none' });

        var ImgControl = $('<img scr="" ></img>');

        ImgControl.click(function () {
            //
            //
            //
            
            var p = angular.element(document).injector().get('JsWizardView');
            p.Show({
                Template: '<div style="width:100%;height:100%;padding:10px 10px 0 10px"><img style="width:100%!important;height:92.5%!important" ng-src="{{ImgSrc}}"></img></div>',
                width: $(window).width * 0.80,
                height: $(window).height * 0.80,
                title: ImgControl.attr('src'),
                closeOnConfirm: true,
                InitController: function (s) {
                    s.ImgSrc = ImgControl.attr('src');
                    s.NegativeButton.visible = false;
                }
            });

        });

        //this.$ImageControl = ImgControl;

        if (ImagePath !== null) {
            ImgControl.attr('src', ImagePath);
        }

        ImgControl.appendTo(this._$element);

        _.$ImgControl = ImgControl;

        
        
        ClearButton.click(function (evt) {
            var src = ImgControl.attr('src');
            if (src != null) {
                DevExpress.ui.dialog.confirm('Do you want to remove this image', 'IAMS').done(function (dialogResult) {
                    if (dialogResult) {
                        fileUploaders.reset();
                        ImgControl.attr('src', null);
                        _.option('onRemoveImage')({
                            ImgControl: ImgControl,
                            PropertyName: PropertyName
                        });
                    }
                });
            }
        });

        ClearButton.appendTo(this._$element);

        $('<div></div>').dxFileUploader({
            selectButtonText: "Select photo",
            labelText: "",
            accept: "image/*",
            onValueChanged: function (e) {
                if (e.value.length > 0) {
                    var reader = new FileReader();
                    reader.onload = function (f) {
                        ImgControl.attr('src', f.target.result);
                    }
                    reader.readAsDataURL(e.value[0]);
                } else {
                    ImgControl.attr('src', null);
                }
                _.option('onFormUploaderValueChanged')(e);

            },
            onInitialized: function (e) {
                fileUploaders = e.component;
                e.component.PROPERTYNAME = PropertyName;
                _.option('onFormUploaderInitialized')(e);
                //var _formInit = _.option('onFormUploaderInitialized');
                //if (_formInit !== undefined) _formInit.call(_, e);
            },
            uploadMode: "useForm"
        }).appendTo(this._$element);
    },
    _renderDisplayText: function (value) {


    }
});
DevExpress.registerComponent("jDxImage",jDxImage);