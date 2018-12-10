require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds: 30,
    baseUrl: "/Generic/js/",
    optimize: "uglify",
    catchError:true,
    paths: {
        'app': '/Content/js/JS_App',
        'baseView': '/Content/js/Base/BaseViewController.es5.min',
        'baseCustom': '/Content/js/Base/BaseCustomViewController.min',
        'baseListViewController': '/Content/js/Base/BaseListViewController.min',
        'baseDetailViewController': '/Content/js/Base/BaseDetailViewController.min',
        'AcctHelper': '/JsApp/GetScript?Url=AccountingHelper',
        'baseModelHelper': '/Content/js/Base/BaseViewHelperController.es5.min',
        'highlight': '/Scripts/quill/highlight/highlight.min'
    },
});
requirejs.onError = function (err) {
    console.log('require js', err);
};