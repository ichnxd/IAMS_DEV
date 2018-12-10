define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fMasterFile%2fVC_ProjectList"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5458,ModelViewName:"Project_LookUp_ListView",StateName:i,ID_View:6722,ModelName:"Project",Icon:"mdi mdi-emby",DisplayName:"Project",ID_ModelDetailView:6224,ID_ViewType:2,ViewControllerName:"Project_DetailView",ID_Model:5263,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"MN+xwFmGQVV30zIOUKMKxdSdCnA/iuq3wcmE7HFcpUZGdxWV+Q7+LrunFeEC+nny269ZUgFySfNvx7xixOqJ2UhhQijHJdE+qvzCgREigEHZHZZJ5FxuvuiFa6XvtFaD",SQLUpdateProc:"VeHhUfdok77oNC7eeLcFV2+yUfzCvDFQoqK1OPQfRV99IHL73PwsqH1RgUgAmO7b/xIW8L6ekXxqVhp72pIAZMmklNX5yUzqU58Jecj6vcwsem6X7DbYPuI8dU2Qbp/n"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Project";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:20278,ID_Column:25323,dataField:"Attachment",allowFixing:!0,visible:!1,caption:"Attachment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20284,ID_Column:25335,dataField:"AwardNoticeFile",allowFixing:!0,visible:!1,caption:"AwardNoticeFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20283,ID_Column:25333,dataField:"BillOfMaterialsFile",allowFixing:!0,visible:!1,caption:"BillOfMaterialsFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11493,ID_Column:14301,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11501,ID_Column:14309,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20282,ID_Column:25331,dataField:"CustomerContractFile",allowFixing:!0,visible:!1,caption:"CustomerContractFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20279,ID_Column:25325,dataField:"CustomerPOFile",allowFixing:!0,visible:!1,caption:"CustomerPOFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20280,ID_Column:25327,dataField:"FinalProposalFile",allowFixing:!0,visible:!1,caption:"FinalProposalFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20286,ID_Column:25339,dataField:"ForImportationFile",allowFixing:!0,visible:!1,caption:"ForImportationFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11496,ID_Column:14304,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:11497,ID_Column:14305,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:11498,ID_Column:14306,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"dF+8dcWkcjpf/1OlzXD4lTNYxsZ9TKMRIT0IjS2AE0WvwgpkeM1marUEpbfR9/9PqiFh0Y6rBGnpUAm383aytK8OsP263fdcpFBd8TFeKCzAORKSiPGRhiGv17raPwRt",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11499,ID_Column:14307,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"KbxkhkDm+6+/FnfF/v031b7kB88u1oj3qFIP0aCd2cVta8ZlzMdCOmPjUJg6WVW0a1JpSVL+s3HhmV8/v8ZWVnlGjYQpY2cA2Q1OWM9dxZMUJwIMLRxspbAFyovOy24s",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:11495,ID_Column:14303,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:11494,ID_Column:14302,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20287,ID_Column:25341,dataField:"OthersFile",allowFixing:!0,visible:!1,caption:"OthersFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20285,ID_Column:25337,dataField:"ProgressBillingFile",allowFixing:!0,visible:!1,caption:"ProgressBillingFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20281,ID_Column:25329,dataField:"TenderBizFile",allowFixing:!0,visible:!1,caption:"TenderBizFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12698,ID_Column:14550,dataField:"ID_Client",allowFixing:!0,visible:!1,caption:"ID_Client",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12699,ID_Column:14552,dataField:"ID_ProjectLead",allowFixing:!0,visible:!1,caption:"ID_ProjectLead",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18548,ID_Column:22062,dataField:"ProjectName",allowFixing:!0,visible:!1,caption:"ProjectName",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18549,ID_Column:22064,dataField:"Address",allowFixing:!0,visible:!1,caption:"Address",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18550,ID_Column:22066,dataField:"PhoneNo",allowFixing:!0,visible:!1,caption:"PhoneNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18551,ID_Column:22068,dataField:"MobileNo",allowFixing:!0,visible:!1,caption:"MobileNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18552,ID_Column:22070,dataField:"Remarks",allowFixing:!0,visible:!1,caption:"Remarks",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18553,ID_Column:22072,dataField:"ID_Contact",allowFixing:!0,visible:!1,caption:"ID_Contact",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18554,ID_Column:22074,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18581,ID_Column:22106,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18583,ID_Column:22110,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:18584,ID_Column:22112,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:18585,ID_Column:22114,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18586,ID_Column:22116,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18587,ID_Column:22118,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:224182,ID_Column:267923,dataField:"ProjectDetails",allowFixing:!0,visible:!1,caption:"ProjectDetails",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224183,ID_Column:267925,dataField:"ProjectScope",allowFixing:!0,visible:!1,caption:"ProjectScope",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})