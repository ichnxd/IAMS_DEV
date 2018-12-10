define(["app","baseListViewController","/JsApp/GetScript?Url=VC_User"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:1104,ModelViewName:"User_LookUp_ListView",StateName:i,ID_View:3281,ModelName:"User",Icon:"mdi mdi-account",DisplayName:"User",ID_ModelDetailView:2047,ID_ViewType:2,ViewControllerName:"User_DetailView",ID_Model:1086,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"hMzNmIskG5a+gh6bTaWJ1Z1bpwmUSC1Tm8O9QPoGZUhSua5GXr5Xqw1of/iEeiUlD6nKGjeE22uVSLEYPbHe7J4Sp710yIqgqwRaTwBJ7cMk9mc0zr4tRSOHKDQ/pDDh",SQLUpdateProc:"scChzjjVIPT5ux5ST8elPvvrej8+5IEyFsxCimY8WHC31WKbjJdDS391Lwt8pDjs0nwkNum6b3GYvwJn0Z0mRcK73hiYbHH6JzwsinTZ9OogWo7Ur/rbhefUv9sSCWWf"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="User";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:3750,ID_Column:3982,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3754,ID_Column:3986,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:3755,ID_Column:3987,dataField:"ID_Employee",allowFixing:!0,visible:!1,caption:"ID_Employee",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:3141,Icon:"mdi mdi-account-multiple",ModelPropertyName:"Employee"},SQL:"+udUDnlBNhvESYyZW3wMI6o0AHNbh55sdeg9lvg5FVWOIsxDoi0MwxrcBon24i+9WFdqr75GLWQE9ptEF6VRJ5KGxSbSvNQ0vjW97LcrRqz2lxTo2xKFqgALXPAE7d58mXz1cSYEtGycQEjNLCOjqKITfCGGSl5Z1+NAKOsI/DA="},{editorOptions:{min:0},ID_ModelProperty:3808,ID_Column:4088,dataField:"ID_UserGroup",allowFixing:!0,visible:!1,caption:"ID_UserGroup",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:3752,ID_Column:3984,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:3751,ID_Column:3983,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3753,ID_Column:3985,dataField:"Password",allowFixing:!0,visible:!1,caption:"Password",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3822,ID_Column:4116,dataField:"Username",allowFixing:!0,visible:!1,caption:"Username",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7716,ID_Column:9731,dataField:"ImageFile",allowFixing:!0,visible:!1,caption:"ImageFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7753,ID_Column:9801,dataField:"IsChangePasswordUponFirstLogin",allowFixing:!0,visible:!1,caption:"Change Pasword",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:11387,ID_Column:14063,dataField:"IsSystemUser",allowFixing:!0,visible:!1,caption:"System User",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18304,ID_Column:21606,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:18306,ID_Column:21610,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})