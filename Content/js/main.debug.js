require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds: 30,
    baseUrl: "/Generic/js/",
    optimize: "uglify",
    paths: {
        'app': '/Content/js/JS_App',
        'baseView': '/Content/js/Base/BaseViewController',
        'baseCustom': '/Content/js/Base/BaseCustomViewController',
        'baseListViewController': '/Content/js/Base/BaseListViewController',
        'baseDetailViewController': '/Content/js/Base/BaseDetailViewController',
        'AcctHelper': '/JsApp/GetScript?Url=AccountingHelper',
        'baseModelHelper': '/Content/js/Base/BaseViewHelperController',
        'highlight': '/Scripts/quill/highlight/highlight.min'
    },
});
requirejs.onError = function (err) {
    console.log('require js', err);
};