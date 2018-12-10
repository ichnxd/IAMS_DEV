
define(function(){
    var app = angular.module('JSWebApp', []);

    app.$GetAsync = function () {
        return angular.element(document).injector().get('$q');
    }

    app.$GetDataService = function () {
        return angular.element(document).injector().get('JSDataService');
    }

    app.$GetTimeOut = function () {
        return angular.element(document).injector().get('$timeout');
    }

    app.$GetPopupView = function () {
        return angular.element(document).injector().get('JsPopUpView');
    }

    app.$rootScope = function () {
        return angular.element(document).injector().get('$rootScope');
    }

    app.$modal = function () {
        return angular.element(document).injector().get('JsWizardView');
    }

    app.getRandomInt = function () {
        var min = 1000, max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    app.$changePasswordDialog = function (CurrentUser) {
        return app.$modal().$changePasswordDialog(CurrentUser);
    }

    app.copyTextToClipboard = function (text) {
        //alert(text);
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log(err);
            alert(err);
            //alert('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
    }

    //
    // RECEIVING REPORT
    //

    var Base64 = {


        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


        encode: function (input) {
            if (input == null) input = "";
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },


        decode: function (input) {
            if (input == null) input = "";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        _utf8_encode: function (string) {
            if (string == null) return null;
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    }

    app.Base64 = Base64;

    app.GetFilterString = function(filterArray) {

        var _ = this;

        var filterString = '';

        $.each(filterArray, function (i, o) {
            //console.log('dataField', o);
            if ($.isArray(o)) {

                filterString += " (" + app.GetFilterString(o) + ") "

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

                    value = '[' + o + ']';

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


                        var dateString = (moment(o).format("YYYY-MM-DD")) + "";
                        //alert('Date');

                        value = "'" + dateString + "'"

                        console.log(value);

                    } else if (jQuery.type(o) === "boolean") {

                        if (o == true) {

                            value = "1";

                        } else {

                            value = "2";

                        }

                    } else {

                        //console.log('dataField',o);

                        value = o;

                    }

                }

                filterString += " " + value;

            }


        });

        return filterString;
    }


    app.GetFilterObject = function (filterArray) {

        var _ = this;

        var filterString = '';

        $.each(filterArray, function (i, o) {
            //console.log('dataField', o);
            if ($.isArray(o)) {

                filterString += app.GetFilterObject(o)

            } else {

                var value = '';

                if (i % 2 == 1) {

                    //if (o === 'contains' || o === 'startswith' || o === 'endswith') {
                    //    value = 'LIKE';
                    //} else {
                    //    value = o.toUpperCase();
                    //}

                    value = ":"
                }

                if (i === 0) {

                    //value = '[' + o + ']';
                    value = "'" + o + "'";

                } else if (i === 2) {

                    if (jQuery.type(o) === "string") {

                        //if (filterArray[1] === 'contains') {
                        //    value = "'%" + o + "%'"
                        //} else if (filterArray[1] === 'startswith') {
                        //    value = "'" + o + "%'"
                        //} else if (filterArray[1] === 'endswith') {
                        //    value = "'%" + o + "'"
                        //} else {
                        //    value = "'" + o + "'"
                        //}
                        value = "'" + o + "'"
                    } else if (jQuery.type(o) === "date") {


                        var dateString = (moment(o).format("YYYY-MM-DD")) + "";
                        //alert('Date');

                        value = "'" + dateString + "'"

                        //console.log(value);

                    } else if (jQuery.type(o) === "boolean") {

                        if (o == true) {

                            value = "1";

                        } else {

                            value = "2";

                        }

                    } else {

                        //console.log('dataField',o);

                        value = o;

                    }

                }

                if (i === 2) {
                    filterString += " " + value + "|";
                } else {
                    filterString += " " + value;
                }
                

            }


        });

        return filterString;
    }


    return app;
});
