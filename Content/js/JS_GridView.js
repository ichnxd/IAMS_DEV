app.directive("jsgridview", ['$parse', '$timeout', 'JSDataService', 'JsModalFactory', function ($parse, $timeout, JSDataService, JsModalFactory) {
    return {
        restrict: 'E',
        require: ['ngModel'],
        scope: {
            columns: '=?',
            fixedcolumns: '=?',
            url: '@?',
            dataStuff:'=?',
            ngModel: '=',
            detailViewController:'@',
            detailViewTemplateUri:'@',
        },
        link: function ($scope, element, attrs, controllers) {
            if ($scope.fixedcolumns == undefined) $scope.fixedcolumns = 2;
            //
            //  LISTVIEW UI CODE
            //
            var pressed = false;
            var CurrentHeader = undefined;
            var CurrentHeaderDiv = undefined;
            var CurrentColumns = undefined;
            var CurrentColumnsDivs = undefined;
            var startX, startWidth;
            var DefaultScrollBarSize = 15;
            var ScrollHorizontal = 0, ScrollVertical = 0;
            var tBodyContent = $('.content .grid-body-table > tbody');
            var tFixedBodyContent = $('.fixed-content .grid-body-table > tbody');
            var IsLastColumnWidthAdjusted = false;

            var bodyContent = $(element).find('.content').find('.grid-body-content');
            var headerContent = $(element).find('.content').find('.grid-header-content');

            var GridFilterHolder = $(element).find('.gridview-filter-holder');
            var GridViewHolder = $(element).find('.gridview-holder');
            var windowHeight = $(window).height() - 12;
            var windowWidth = $(window).width() - 12;

            $scope.IsFilterBoxShow = false;
           
            var InitColumnWatch = $scope.$watch('columns', function (newvalue, oldvalue) {
                if (newvalue == undefined) return;
                if (newvalue == null) return;
                var columnNames = [];
                var TotalColumnWidth = 0;

                $.each($scope.columns, function (i, o) {
                    if (o.width == undefined) o.width = 100;
                    TotalColumnWidth += o.width;
                    if (i < $scope.fixedcolumns) {
                        columnNames.push(o);
                    }
                });

                $scope.FixedColumns = columnNames;
                $scope.ScrollBarSize = 0;

                var top = $(element).find('.grid-body-table').eq(0).offset().top;
                var left = $(element).offset().left;
                var tBodyHeight = windowHeight - top;
                var ElementWidth = $(window).width() - left;
                $scope.ScrollBarSize = DefaultScrollBarSize;
                if (TotalColumnWidth > ElementWidth) {
                    $(element).find('.content').find('.scrollbar-container-vertical').width(TotalColumnWidth);
                    IsLastColumnWidthAdjusted = true;
                }
                var tBodyScrollBarVerticalContainer = $(element).find('.content').find('.scrollbar-container-vertical');
                var tBodyScrollBarHorizontalContainer = $(element).find('.scrollbar-container-horizontal');
                var tFixedBodyScrollBarVerticalContainer = $(element).find('.fixed-content').find('.scrollbar-container-vertical');
                tBodyScrollBarVerticalContainer.height(tBodyHeight);
                tFixedBodyScrollBarVerticalContainer.height(tBodyHeight);

                bodyContent.width(ElementWidth);
                headerContent.width(ElementWidth);

                $scope.$watch('IsFilterBoxShow', function (newValue, oldValue) {
                    var ElementWidth = (newValue ? $(element).find('.gridview-holder').width() : $(window).width() - 1) - ( newValue ? 0 : left );
                    bodyContent.width(ElementWidth);
                    headerContent.width(ElementWidth);
                });

                tBodyScrollBarHorizontalContainer.scroll(function (evt) {
                    var left = $(evt.currentTarget).scrollLeft();
                    headerContent.scrollLeft(left);
                });

                tBodyScrollBarVerticalContainer.scroll(function (evt) {
                    var top = $(evt.currentTarget).scrollTop();
                    tFixedBodyScrollBarVerticalContainer.scrollTop(top);
                    var element = evt.target;
                    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                        $scope.Refresh(false);
                    }
                });

                $timeout(function () {
                    $(element).find(".table-header").mousedown(function (e) {
                        if ($(e.target).hasClass('table-header-container')) return;
                        if ($(this).hasClass('fixed')) return;
                        CurrentHeader = $(this);
                        CurrentHeaderDiv = $(this).find('div').eq(0);
                        pressed = true;
                        startX = e.pageX;
                        startWidth = $(this).width();
                        $(CurrentHeader).addClass("resizing");
                        $(CurrentHeader).addClass("noSelect");
                        var CurrentIndex = CurrentHeader.index();
                        CurrentColumns = $(tBodyContent).find('.js-col-' + CurrentIndex);
                        CurrentColumnsDivs = $(tBodyContent).find('.js-col-' + CurrentIndex ).find('div');
                    });

                    $(element).find(".table-header").mousemove(function (e) {
                        if (pressed) {
                            var width = startWidth + (e.pageX - startX);
                            $(CurrentHeader).width(width);
                            $(CurrentHeaderDiv).width(width);
                            $(CurrentColumns).width(width)
                            $(CurrentColumnsDivs).width(width);
                            $scope.columns[$(this).index()].width = width;
                        }
                    });

                    $(element).find(".table-header").mouseup(function () {
                        if (pressed) {
                            $(CurrentHeader).removeClass("resizing");
                            $(CurrentHeader).removeClass("noSelect");
                            var TotalWidth = 0;
                            var CurrentColumnHeaders = $(element).find('.content').find('.table-header');
                            $.each(CurrentColumnHeaders, function (i, o) {
                                TotalWidth += $( o ).width();
                            });
                            if (TotalWidth > $(element).width()) {
                                $(element).find('.content').find('.scrollbar-container-vertical').width(TotalWidth);
                            } else {
                                $(element).find('.content').find('.scrollbar-container-vertical').css({'width':'100%'});
                            }
                            pressed = false;
                        }
                    });
                }, 1000);
                $scope.Refresh();
                InitColumnWatch();
            })

            $scope.OnColumnAdded = function (column, index) {
                $timeout(function () {
                    var TotalWidth = 0;
                    $.each($(element).find('.content').find('.table-header'), function (i, o) {
                        TotalWidth += $(o).outerWidth(true);
                    });
                    if (TotalWidth > $(element).width()) {
                        //$(element).find('.content').css({ 'margin-left': '5px' });
                        //$(element).find('.fixed-content').css({ 'margin-left': '5px' });
                        $(element).find('.content').find('.scrollbar-container-vertical').width(TotalWidth);
                    } else {
                        //$(element).find('.content').css({ 'margin-left': '0px' });
                        $(element).find('.content').find('.scrollbar-container-vertical').css({ 'width': '100%' });
                    }
                });   
            }

            //
            //  DATA SOURCE
            //

            $scope.Refresh = function (IsClear) {
                if (IsClear == undefined) IsClear = true;
                if (IsClear) {
                    $scope.ngModel = [];
                }
                if ($scope.url == undefined) return;
                var Ids = null;
                var CurrentList = $scope.ngModel;
                if (CurrentList != null) {
                    if (CurrentList.length > 0) {
                        Ids = Enumerable.From(CurrentList).Select(function (x) { return x.ID }).ToArray().join();
                    }
                }
                if ($scope.dataStuff == undefined) $scope.dataStuff = { };
                $scope.dataStuff.Ids = Ids;
                JSDataService.GetCollection($scope.url, $scope.dataStuff).then(function (collection) {
                    if (collection != null) {
                        if (IsClear) {
                            $scope.ngModel = collection;
                        } else {
                            $.each(collection, function (i, o) {
                                $scope.ngModel.push(o);
                            });
                        }
                    }
                });
            }

            //
            // TOOLBAR
            //

            var OpenDetailView = function (CurrentObject) {
                var _id = (CurrentObject == null ? -1 : CurrentObject.ID);
                JsModalFactory.OpenDetailView(_id, $scope.url ,$scope.detailViewTemplateUri, $scope.detailViewController);
            }

            $scope.IsButEditEnabled = function () {
                var Count = Enumerable.From($scope.ngModel).Where(function (x) { return x._IsSelected == true; }).ToArray().length;
                return !(Count == 1);
            }
            $scope.IsButDeleteEnabled = function () {
                var Count = Enumerable.From($scope.ngModel).Where(function (x) { return x._IsSelected == true; }).ToArray().length;
                console.log(Count);
                return !(Count > 0);
            }
            $scope.OnNewClick = function () {
                OpenDetailView();
            }
            $scope.OnDeleteClick = function () {
            }
            $scope.OnEditClick = function () {
                var CurrentObject = Enumerable.From($scope.ngModel).Where(function (x) { return x._IsSelected == true; }).ToArray()[0];
                OpenDetailView(CurrentObject);
            }
            $scope.OnRefreshClick = function () {
                $scope.Refresh();
            }
            $scope.OnFilterClick = function () {
                $scope.IsFilterBoxShow = !$scope.IsFilterBoxShow;
            }
            $scope.IsSelectAll = false;
            $scope.OnSelectAllClick = function () {
                $scope.IsSelectAll = !$scope.IsSelectAll;
                $.each($scope.ngModel, function (i, o) {
                    o._IsSelected = $scope.IsSelectAll;
                })
            }
            $scope.OnItemSelected = function (object) {
                if (object._IsSelected == undefined) object._IsSelected = false;
                object._IsSelected = !object._IsSelected;
            }
            $scope.modelValue = function () {
                return controllers[0].$viewValue;
            }
            $scope.ToggleMultiSelect = function () {


            }
            if ($scope.url != undefined && $scope.columns == undefined) {
                $scope.Refresh();
            }
        },
        templateUrl: '/Templates/JSGridView.tpl.html'
    };
}]);