DevExpress.ui.dxOverlay.baseZIndex(3000);
var app = angular.module('JSWebApp', ['angularValidator', 'ui.bootstrap', 'ct.ui.router.extras', 'ui.utils.masks', 'datetime', 'dx',
    'ngAnimate', 'toastr', '720kb.tooltips', 'angular-cache', 'angular-loading-bar', 'base64', 'ngFileUpload', 'angular-quill', 'pageslide-directive', 'ngHandsontable']);
var app_cached_providers = { };
var $stateProviderRef = null;
var $urlRouterProviderRef = null;
app.config(['$controllerProvider',
  function (controllerProvider) {
      app_cached_providers.$controllerProvider = controllerProvider;
  }
]);
app.config(['toastrConfig', function (toastrConfig) {
    angular.extend(toastrConfig, {
        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });
}]);

app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.directive('dxDataGridView', ['JsPopUpView', function (JsPopUpView) {
    return {
        restrict: 'E',
        scope: {
            setting: '=',
            data: '=',
            width: '='
        },
        templateUrl: '/Templates/DxDataGridView.tpl.html',
        link: function (scope, element, attr) {
            scope.setting.width = scope.width;
            var Items = [];
            var listOption = scope.setting.listItemOption;
            if (listOption.DataSource !== null && listOption.DataSource !== undefined) {
                Items.push({
                    text: listOption.Caption,
                    icon: listOption.icon,
                    onItemClick: function () {
                        JsPopUpView.BrowseDataSet(listOption.DataSource, listOption.Option).then(function (collection) {
                            if (collection.length == 0) return;
                            var List = [];
                            $.each(collection, function (i, d) {
                                var newValue = listOption.DefaultValue(d);
                                List.push(newValue);
                            });
                            if (scope.setting.onListItem_Added !== undefined) {
                                scope.setting.onListItem_Added(List);
                            }
                        });
                    }
                });
            }
            scope.ContextMenuOption = {
                dataSource: Items,
                itemTemplate : 'item',
                onItemClick: function (e) {
                    if (e.itemData.onItemClick !== undefined) {
                        e.itemData.onItemClick();
                        return;
                    }
                }
            }
        }
    }
}]);

app.directive('jsScrollView', ['$q',function ($q) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $(element).on('scroll touchmove mousewheel', function (e) {
                console.log(e);
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    }

}]);
app.directive('jsKeyDown', function () {
    return {
        restrict: 'A',
        scope: {
            onKeydown: '&',
        },
        link: function (scope, elem, attrs) {
            elem.on('keydown', function (e) {
                scope.onKeydown({ event : e});
            });
        }
    };
});

app.directive('initView', function () {
    return function (scope, element, attrs) {
        setTimeout(function () {
            if (scope.InitView !== undefined) {
                scope.InitView(element);
            }
        }, 1000);
    };
});
app.directive('iframeOnload', [function () {
    return {
        scope: {
            callBack: '&iframeOnload'
        },
        link: function (scope, element, attrs) {
            element.on('load', function () {
                return scope.callBack();
            })
        }
    }
}]);
Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
Array.prototype.SUM = function (prop,args) {
    var Value = 0.00;
    if (args !== null && args !== undefined) {
        Value = Enumerable.From(this).Where(args).ToArray().SUM(prop);
    } else {
        $.each(this, function (i,o) {
            Value += o[prop];
        });
        //Value = Enumerable.From(this).Sum("$." + prop);
    }
    return isNaN(Value) ? 0.00 : Value;
}
Array.prototype.COUNT = function (args) {
    var Value = 0.00;
    if (args != null) {
        Value = Enumerable.From(this).Where(args).ToArray().length;
    } else {
        Value = this.length;
    }
    return isNaN(Value) ? 0 : Value;
}
String.prototype.count = function (s1) {
    return (this.length - this.replace(new RegExp(s1, "g"), '').length) / s1.length;
}
String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
}