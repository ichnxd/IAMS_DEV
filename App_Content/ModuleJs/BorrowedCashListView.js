define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%5cAP%5cPettyCash%5cVC_BorrowedCash"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8795,ModelViewName:"BorrowedCash_ListView",StateName:i,ID_View:12306,ModelName:"BorrowedCash",Icon:"FontInSys",DisplayName:"Borrowed Cash",ID_ModelDetailView:9398,ID_ViewType:2,ViewControllerName:"BorrowedCash_DetailView",ID_Model:11431,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"EDaafc6wTDg3z8qRfKS44iMOJQLJrDu7idlDd6AMFR4lOFOP6B+ghvR9caJcORE4WUv0cr596zvrc5hxpx0X+tlNMFw+JPxqQp+LmwmzZSTJHiuCKoGsRbSW3mJzMLu6",SQLUpdateProc:"oIQQS3uH/V/h9DOe85iS7VJwAUnvmxGTqSBPkvkg5twASih+HqHAuJTQWJ2tKng1VD8eCRMs8B4LmYRcXfKUA/+y2RDweS7GBYjIXQp6L9cHUCkrwS3vBrKJr33V4A2V"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="BorrowedCash";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:19832,ID_Column:24665,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19833,ID_Column:24666,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19834,ID_Column:24667,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:19836,ID_Column:24669,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19838,ID_Column:24671,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19840,ID_Column:24673,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19843,ID_Column:24676,dataField:"ID_Custodian",allowFixing:!0,visible:!1,caption:"ID_Custodian",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19847,ID_Column:24680,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19848,ID_Column:24681,dataField:"ID_WarehouseCustodian",allowFixing:!0,visible:!1,caption:"ID_WarehouseCustodian",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19849,ID_Column:24682,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19850,ID_Column:24683,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19851,ID_Column:24684,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19852,ID_Column:24685,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19853,ID_Column:24686,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19854,ID_Column:24687,dataField:"ID_ReleasedBy",allowFixing:!0,visible:!1,caption:"ID_ReleasedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19835,ID_Column:24668,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19844,ID_Column:24677,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"BC No.",width:114,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19845,ID_Column:24678,dataField:"Date",allowFixing:!0,visible:!0,caption:"BC Date",width:115,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19842,ID_Column:24675,dataField:"ReasonForBorrored",allowFixing:!0,visible:!0,caption:"Reason For Borrowed",width:363,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19841,ID_Column:24674,dataField:"AmountRequested",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Amount Requested",width:131,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19837,ID_Column:24670,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:236,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19846,ID_Column:24679,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:100,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:19855,ID_Column:24688,dataField:"ReleasedDate",allowFixing:!0,visible:!0,caption:"ReleasedDate",width:125,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})