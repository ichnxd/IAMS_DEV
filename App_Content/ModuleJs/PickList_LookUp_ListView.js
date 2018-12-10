define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%5cAR%5cPickList%5cVC_PickList"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9973,ModelViewName:"PickList_LookUp_ListView",StateName:i,ID_View:24649,ModelName:"PickList",Icon:"FontInSys",DisplayName:"Pick List",ID_ModelDetailView:10487,ID_ViewType:2,ViewControllerName:"PickList_DetailView",ID_Model:12519,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"0KLnR4mwSiZSYpg0WVs4WX5qObdcoqQ8eV9PyT4PAwxy7T7TZhkZHDBfj9cExixG0tKCI/HdQ9WaVWWdk263I0JsH6UtyENiBg4a7BJ5B/wlBX+pe6W1njUkYHW8/BzO",SQLUpdateProc:"9e6HmZNi3Hq/QUwH0tI5FQF4hvemsCtHRR+/2ZDgmfvGCNfzIHdlhMOZpFbliC8OzVs1n9tVZcDT/P2xYUXMHBTNqUa6YyojTSkkaFZYwBbq/ESVX/TkPhEMv5CNEIEt"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="PickList";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:317556,ID_Column:1071650,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317564,ID_Column:1071651,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317559,ID_Column:1071652,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"DateCreated",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:317560,ID_Column:1071653,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"DateModified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:317563,ID_Column:1071655,dataField:"ID_Company",allowFixing:!0,visible:!0,caption:"ID_Company",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317561,ID_Column:1071656,dataField:"ID_CreatedBy",allowFixing:!0,visible:!0,caption:"ID_CreatedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317562,ID_Column:1071657,dataField:"ID_LastModifiedBy",allowFixing:!0,visible:!0,caption:"ID_LastModifiedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317558,ID_Column:1071658,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"IsActive",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:317557,ID_Column:1071659,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317565,ID_Column:1071670,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317566,ID_Column:1071672,dataField:"Date",allowFixing:!0,visible:!1,caption:"Date",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:317567,ID_Column:1071674,dataField:"ID_SalesOrder",allowFixing:!0,visible:!1,caption:"ID_SalesOrder",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317568,ID_Column:1071676,dataField:"ID_BusinessPartner",allowFixing:!0,visible:!1,caption:"ID_BusinessPartner",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317648,ID_Column:1071794,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317649,ID_Column:1071796,dataField:"ID_FilingStatus",allowFixing:!0,visible:!1,caption:"ID_FilingStatus",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317771,ID_Column:1071997,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317772,ID_Column:1071999,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317773,ID_Column:1072001,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:317774,ID_Column:1072003,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:317775,ID_Column:1072005,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})