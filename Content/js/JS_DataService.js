app.service('JSDataService', ['$http', '$q', 'toastr', '$timeout', 'Upload', function ($http, $q, toastr, $timeout, Upload) {

    var _TransformRequest = function (obj, headersGetter) {
        var str = [];
        for (var p in obj) {
            if (obj[p] !== undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    };

    var GetColectionArray = function (JsonArray) {
        var mList = [];
        var Columns = JsonArray[0];
        var fKeyProperties = [];
        var fKeyColumns = Enumerable.From(Columns).Where(function (s) {
            if (s.indexOf('^') > -1) {
                var index = s.indexOf('_');
                if (fKeyProperties.indexOf(s.substring(1, index)) == -1) {
                    fKeyProperties.push(s.substring(1, index));
                }
                return s;
            }
        }).ToArray();
        var Properties = Enumerable.From(Columns).Where(function (s) {
            if (s.indexOf('^') == -1) {
                return s;
            }
        }).ToArray();
        for (var i = 1; i < JsonArray.length; i++) {
            var jarray = JsonArray[i];
            var newObject = {};
            $.each(Columns, function (index, column) {
                if (column.indexOf('^') == -1) {
                    if (typeof jarray[index] === 'string') {
                        if (jarray[index].indexOf('&amp;') > -1) {
                            jarray[index] = jarray[index].replaceAll("&amp;", "&");
                        }
                    }
                    newObject[column] = jarray[index];
                } else if (column.indexOf('^') == 0) {
                    $.each(fKeyProperties, function (i, property) {
                        var characterIndex = column.indexOf('_');
                        if (column.substring(1, characterIndex) == property) {
                            var columnName = column.substring(characterIndex + 1, column.length);
                            if (newObject[property] == undefined) {
                                newObject[property] = {};
                            }
                            newObject[property][columnName] = jarray[index];
                        }
                    });
                }
            })
            mList.push(newObject);
        };
        return mList;
    }

    this.Post = function (Url, data) {
        var defer = $q.defer();
        
        $http({
            method: 'POST',
            url: Url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: data
        }).then(function (response) {
            //console.log(response);
            defer.resolve(response);
        });

        return defer.promise;
    };

    this.GetControlDataSource = function (SQL) {

        var _ = this;

        return new DevExpress.data.DataSource({
            load: function (loadOptions) {
                var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                var searchValue = loadOptions.searchValue;
                var searchExpr = loadOptions.searchExpr !== null && loadOptions.searchExpr !== undefined ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                var defer = $q.defer();

                _.GetDataSet('/JsApp/GetDataCollection', {
                    SearchExpr: searchExpr
                    , SearchValue: searchValue
                    //, DataSourceKey: DataSourceKey
                    , SQL: SQL
                    , Skip: skip
                }).then(function (Data) {
                    defer.resolve(Data.collection);
                });
                return defer.promise;
            },
            byKey: function (key) {
                var defer = $q.defer();
                _.GetDataSet('/JsApp/GetDataCollection', {
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

    this.Query = function (SQL, data, skip) {

        //data.SQL = SQL;
        if (data == undefined) data = {};

        var defer = $q.defer();

        var _data = {
            SQL: SQL,
            params: data.params == undefined ? undefined : JSON.stringify(data.params),
            skip: skip,
            FilterExpr: data.FilterExpr,
            FullTextSearch: data.FullTextSearch,
            FilterString: data !== undefined ? data.FilterString : null,
            SortingExpr: data.SortingExpr,
            IsExport: data.IsExport !== undefined && data.IsExport !== null ? data.IsExport : false,
            SummaryColumns: data.SummaryColumns
        }

        if (data.pageSize !== undefined) {
            _data.pageSize = data.pageSize;
        }

        $http({
            method: 'POST',
            url: '/JsApp/GetSQLDataSet',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: _data,
            showProgress: data.showProgress === undefined ? true : data.showProgress
        }).then(function (response) {
            //console.log(response);
            if (response.data == null) {
                defer.resolve(null);
                return;
            }
            if (response.data == '') {
                defer.resolve(null);
                return;
            }

            var data = response.data.split('£');
            var Summaries = data[1] == "-" ? null : GetColectionArray(JSON.parse(data[1]))[0];
            if (data[0] == '') {
                defer.resolve({
                    collection: [],
                    summaries: Summaries
                });
                return;
            }
            var JsonArray = JSON.parse(data[0]);
            var mList = GetColectionArray(JsonArray);
            //console.log('Query',mList);
            defer.resolve({
                collection: mList,
                summaries: Summaries
            });
        }, function (response) {
            defer.reject();
        });


        return defer.promise;
    };

    this.GetDataSet = function (url, data) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: data
        }).then(function (response) {
            if (response.data == null) {
                defer.resolve(null);
                return;
            }
            if (response.data == '') {
                defer.resolve(null);
                return;
            }

            var data = response.data.split('£');
            var Summaries = data[1] == "-" ? null : GetColectionArray(JSON.parse(data[1]))[0];
            if (data[0] == '') {
                defer.resolve({
                    collection: [],
                    summaries: Summaries
                });
                return;
            }
            var JsonArray = JSON.parse(data[0]);
            var mList = GetColectionArray(JsonArray);
            
            defer.resolve({
                collection: mList,
                summaries: Summaries
            });
        }, function (response) {
            defer.reject();
        });
        return defer.promise;
    }

    this.GetCollection = function (url, requestdata) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: { Data: JSON.stringify(requestdata) }
        }).then(function (response) {
            if (response.data == null) {
                defer.resolve(null);
                return;
            }
            var JsonArray = JSON.parse(response.data);
            var mList = GetColectionArray(JsonArray);
            defer.resolve(mList);
        }, function (response) {
            defer.reject();
        });
        return defer.promise;
    }

    this.GetCurrentObject = function (url, data, showProgress) {
        var defer = $q.defer();
        $http({
            showProgress : showProgress === undefined ? true : showProgress,
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: data
        }).then(function (response) {
            if (response.data == '') {
                defer.resolve(null);
                return;
            }
            var CurrentObject = JSON.parse(response.data);
            defer.resolve(CurrentObject);
        }, function () {
            defer.resolve(null);
        });
        return defer.promise;
    }

    this.DeleteObjects = function (items, ID_Model) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: 'JsApp/DeleteModelObject',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: {
                items: Enumerable.From(items).Select('$.ID').ToArray().join(","),
                ID_Model : ID_Model
            }
        }).then(function (response) {
            defer.resolve(response);
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    this.SaveModelObject = function (url, data) {
        var defer = $q.defer();

        Upload.upload({
            url: url,
            data: data,
        }).then(function (response) {
            
            var CurrentObject = JSON.parse(response.data);
            if (CurrentObject.IsError != undefined) {
                if (CurrentObject.IsError == true) {
                    console.log('Error',CurrentObject);
                    DevExpress.ui.dialog.alert(CurrentObject.Message, 'Error');
                    defer.reject(CurrentObject);
                    return;
                }
            }

            //DevExpress.ui.notify('Save Successfully', 'success', 1000);
            defer.resolve(CurrentObject);

        }, function (response) {
            defer.reject(response.data);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            
        });
        return defer.promise;
    }

    //
    //
    //

    this.SaveEmployeePicture = function (ID_Employee, $file) {
        return this.SaveModelObject('JsApp/SaveProfilePicture', {
            ID_Employee: ID_Employee,
            $files: $file
        });
    }

    this.ExecSQLProc = function (SQL, Params) {
        var defer = $q.defer();
        //
        //
        //
        //console.log('-->SQL PROC', Params);
        //alert(SQL);

        if (Params !== undefined && Params !== null) {
            for (var p in Params) {
                var value = Params[p];
                if (value !== null) {
                    if (value instanceof Date) {
                        Params[p] = moment(value).format('YYYY-MM-DD hh:mm:ss A');
                    }
                }
            }
        }
        //console.log('-->after', Params);
        
        $http({
            method: 'POST',
            url: '/JsApp/ExecSQLProc',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: {
                SQL: SQL,
                Params : JSON.stringify( Params )
            }
        }).then(function (response) {
            defer.resolve( response.data );
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    this.pGetCurrentObject = function (SQL, Params) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/JsApp/pGetCurrentObject',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: {
                SQL: SQL,
                Params: JSON.stringify(Params)
            }
        }).then(function (response) {
            
            defer.resolve(JSON.parse(response.data));
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    this.Validate = function (SQL, Params) {
        //console.log('Parameters',Params);
        return this.pGetCurrentObject(SQL, Params);
    }


    this.SaveListViewFormat = function (_state,ID_ListView) {
        //console.log('ListViewState', State);
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/JsApp/SaveListViewFormat',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: _TransformRequest,
            data: {
                State: JSON.stringify(_state),
                ID_ListView : ID_ListView
            }
        }).then(function (response) {
            defer.resolve();
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    //
    //
    //
    
    this.GetNavigations = function () {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/Home/GetNavigations',
        }).then(function (response) {
            var Navigations = JSON.parse(response.data);
            defer.resolve(Navigations);
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    this.GetCurrentUser = function () {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/Home/GetUser',
        }).then(function (response) {
            var User = JSON.parse(response.data);
            defer.resolve(User);
        }, function () {
            defer.reject();
        });
        return defer.promise;
    }

    this.LoadController = function (ControllerName, ID_ViewType, controllerPath) {
        var defer = $q.defer();
        require([controllerPath], function (controller) {
            switch (ID_ViewType) {
                case 1:
                    controller.$inject = ['$scope', 'ViewStateName', '$ViewAccess'];
                    break;
                case 3:
                    controller.$inject = ['$scope', 'ReportParams', '$OwnerRights'];
                    break;
                case 7:
                    controller.$inject = ['$scope', 'DashboardSettings'];
                    break;
                default:
                    controller.$inject = ['$scope', 'CurrentObject', 'ViewStateName', 'IsModal', 'ModalMode', '$ViewOption', '$ViewAccess'];
                    break;
            }
            app_cached_providers.$controllerProvider.register(ControllerName, controller);
            defer.resolve();
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }
    //
    //
    //

    this.getRandomInt = function() {
        var min = 1000, max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    this.ImportExcel = function (data) {
        return this.SaveModelObject('/JsApp/ImportExcel', data);
    }

    this.loadViewState = function (ID_View, isMinify) {
        if (ID_View === undefined && ID_View == null) {
            var defer = $q.defer();
            $timeout(function () { defer.resolve(null); }, 500);
            return defer.promise;
        }
        //
        //var defer = $q.defer();
        //$http.get('App_Content/ListViewFormat/' + ID_View + '.json').success(function (data) {
        //    defer.resolve(data);
        //}, function () {
        //    defer.resolve(null);
        //});
        //return defer.promise;
        return this.GetCurrentObject('/JsApp/LoadGridViewState', { ID_View: ID_View });
        //if (isMinify !== undefined) {
        //    return this.Post('/JsApp/LoadGridViewState', { ID_View: ID_View, isMinify: isMinify});
        //}
        //return this.Post('/JsApp/LoadGridViewState', { ID_View: ID_View });
    }
    //
    //

    this.GetSQLDatasource = function (SQL,params) {
        var _ = this;
        return new DevExpress.data.DataSource({
            load: function (loadOptions) {
                var skip = loadOptions.skip == undefined ? 0 : loadOptions.skip;
                var searchValue = loadOptions.searchValue;
                var searchExpr = loadOptions.searchExpr != null ? (typeof (loadOptions.searchExpr) === 'string' ? loadOptions.searchExpr : loadOptions.searchExpr.join()) : null;
                var defer = $q.defer();

                var data = { };
                //if (scope.option.onLoadDataSource !== undefined) {
                //    scope.option.onLoadDataSource(data);
                //}

                //if (SearchBox !== null) {
                //    var SearchValue = SearchBox.option('value');
                //    data.FilterExpr = "SearchExpr LIKE '%" + SearchValue + "%'";
                //}

                data.showProgress = false;
                _.Query(SQL, {
                    params: params
                }, skip).then(function (Data) {
                    if (Data.collection == null) Data.collection = [];
                    //console.log(Data.collection);
                    //if (scope.option.SQLCount !== undefined) {
                    //    _.RefreshCount();
                    //}
                    defer.resolve(Data.collection);
                });
                return defer.promise;
            },
            byKey: function (data) {
                var returnObject = null;
                //if (itemData.defaultItems !== undefined) {
                //    returnObject = Enumerable.From(itemData.defaultItems).Where("$.ID == " + data).ToArray()[0];
                //}
                //if (returnObject !== null) return returnObject;
                var defer = $q.defer();
                _.Query(SQL, {
                    FilterExpr: "ID = " + data
                }).then(function (Data) {
                    if (Data.collection.length == 0) {
                        data.resolve(null);
                        return;
                    }
                    defer.resolve(Data.collection[0]);
                    //if (scope.option.SQLCount !== undefined) {
                    //    _.RefreshCount();
                    //}
                });
                return defer.promise;
            }
        });
    }

    this.UploadFile = function (Option) {
        if (Option == undefined) {
            Option = {
                height: 200,
                multiple: true,
                closeOnConfirm: true
            };
        }
        var defer = $q.defer();
        var modal = angular.element(document).injector().get('JsWizardView');
        modal.Show({
            ViewSrc: 'App_Content/ViewControllers/Templates/FileUpload.tpl.html',
            title: Option.Title === undefined ? 'Upload File(s)' : Option.Title,
            width: 550,
            height: Option.height == undefined ? 200 : Option.height,
            closeOnConfirm: Option.closeOnConfirm === undefined ? true : Option.closeOnConfirm,
            showCloseButton: false,
            InitController: function ($scope) {

                $scope.data = {
                    Files: []
                };

                $scope.FileUploaderOption = {
                    buttonText: 'Select file',
                    labelText: 'Drop file here',
                    multiple: Option.multiple == undefined ? true : Option.multiple,
                    accept: Option.accept,
                    uploadMode: "useForm",
                    onValueChanged: function (e) {
                        console.log(e);
                        $scope.data.Files = e.value;
                        //$scope.data.File = e.value;
                    }
                };


                $scope.TextBoxOption = {
                    visible: false
                }


                //
                //
                //
                $scope.onPositiveClick = function (popup) {
                    console.log($scope.data.Files);
                    defer.resolve({
                        component : popup,
                        files: $scope.data.Files
                    });
                };

                $scope.onNegativeClick = function () {
                    defer.reject();
                };
            }
        });
        return defer.promise;
    }


    this.UploadCSV = function (Proc, Params, Title) {
         
        var defer = $q.defer();
        var modal = angular.element(document).injector().get('JsWizardView');
        
        modal.Show({
            ViewSrc: 'App_Content/ViewControllers/Templates/FileUpload.tpl.html',
            title: Title,
            width: 550,
            height: 200,
            closeOnConfirm: true,
            showCloseButton: false,
            InitController: function ($scope) {
                $scope.data = {
                    Params: JSON.stringify(Params),
                    Procedure: Proc,
                    FileName: null,
                    File: null
                };

                $scope.FileUploaderOption = {
                    buttonText: 'Select file',
                    labelText: 'Drop file here',
                    multiple: false,
                    accept: '.csv',
                    uploadMode: "useForm",
                    onValueChanged: function (e) {

                        $scope.data.File = e.value;
                    }
                };

  
                $scope.TextBoxOption = {
                    visible: false
                }
                

                //
                //
                //
                $scope.onPositiveClick = function () {
                    if ($scope.data.File == null) {
                        VC.MsgBox('File not found');
                        return;
                    }
            
                    Upload.upload({
                        url: 'JsApp/UploadCSV',
                        data: $scope.data,
                    }).then(function (response) {
                        var CurrentObject = JSON.parse(response.data);    
                        toastr.success('Upload Successful', Title, {
                            closeButton: true
                        });
                        defer.resolve(CurrentObject);
                    },function(response){
                        toastr.success('An error occured!', Title, {
                            closeButton: true
                        });
                        defer.reject(response);
                    });

                };

                $scope.onNegativeClick = function () {
                    //console.log('reject')
                    defer.reject();
                };
            }
        });//End Upload

        return defer.promise;
    }

    ////
    ////

    this.UploadItemExcel = function (Title, ID_Model) {
        console.log('ID_Model', ID_Model);
        var defer = $q.defer();
        var modal = angular.element(document).injector().get('JsWizardView');
        modal.Show({
            ViewSrc: 'App_Content/ViewControllers/Templates/FileUpload.tpl.html',
            title: Title,
            width: 550,
            height: 200,
            closeOnConfirm: true,
            showCloseButton: false,
            InitController: function ($scope) {
                $scope.data = {
                    FileName: null,
                    File: null,
                    ID_Model: ID_Model
                };

                $scope.FileUploaderOption = {
                    buttonText: 'Select file',
                    labelText: 'Drop file here',
                    multiple: false,
                    accept: '.xlsx',
                    uploadMode: "useForm",
                    onValueChanged: function (e) {
                        $scope.data.File = e.value;
                    }
                };


                $scope.TextBoxOption = {
                    visible: false
                }


                //
                //
                //
                $scope.onPositiveClick = function () {
                    if ($scope.data.File == null) {
                        VC.MsgBox('File not found');
                        return;
                    }

                    Upload.upload({
                        url: 'JsApp/UploadItemExcel',
                        data: $scope.data,
                    }).then(function (response) {

                        var isValid = true;
                        var CurrentObject = JSON.parse(response.data);

                        if(isValid == true){

                            if(CurrentObject.Validations != undefined){

                                if(CurrentObject.Validations == null) CurrentObject.Validations = [];
    
                                if(CurrentObject.Validations.length > 0){
    
                                    isValid = false;
                                }               
                            }
                        }

                        if(isValid == true){

                            if(CurrentObject.SQLValidations != undefined){

                                if(CurrentObject.SQLValidations == null) CurrentObject.SQLValidations = [];
    
                                if(CurrentObject.SQLValidations.length > 0){
    
                                    isValid = false;
                                }               
                            }
                        }
                        
                        if(isValid == true){

                            toastr.success('Upload Successful', Title, {
                                closeButton: true
                            });
                        }else{
                                
                            toastr.error('Upload Failed', Title, {
                                closeButton: true
                            });
                        }

                        defer.resolve(CurrentObject);

                    }, function (response) {
                        toastr.error('An error occured!', Title, {
                            closeButton: true
                        });
                        defer.reject(response);
                    });

                };

                $scope.onNegativeClick = function () {
                    //console.log('reject')
                    defer.reject();
                };
            }
        });//End Upload

        return defer.promise;
    }



    ////
    ////

    //
    //
    //

    var Base64 = {


        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


        encode: function (input) {
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
    this.Base64 = Base64;
}]);