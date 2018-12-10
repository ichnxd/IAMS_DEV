define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAR%2fPDC%2fVC_PDCMonitoring"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8498,ModelViewName:"PDCMonitoring_LookUp_ListView",StateName:i,ID_View:9789,ModelName:"PDCMonitoring",Icon:"FontInSys",DisplayName:"Collection Monitoring",ID_ModelDetailView:9251,ID_ViewType:2,ViewControllerName:"PDCMonitoring_DetailView",ID_Model:8285,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"mNHVkRAPla6tBJOTlAI0erfcuU9R+FBlMT2bs6cp9usyZgoT5Oba8j7j4SGTfA860S3PAWz9ArRWu+bN+b0OgbntoJ4gL2G4Kf2Y8MgygxiWyl7c4xKyGhkMwp6OzHMR",SQLUpdateProc:"UGQ+5jRXEpThmYvQKuwVzuJGawaIRD7uUj7e4GX4P/4Ebn88mgTWnqq3FLcD81ROhRpyX4OeHRVCED2oDa1rHT/RCDtDh3MpJvla/Cx9fbyTM0Ewqph6ujpKRbVbxgSz"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="PDCMonitoring";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];e=[{name:"CheckAmount_Summary",showInColumn:"CheckAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.CheckAmount==undefined?"0.00":Globalize.format(u.$Summary.CheckAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:16877,ID_Column:18888,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16885,ID_Column:18896,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16880,ID_Column:18891,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:22356,ID_Column:26647,dataField:"DateDeposit",allowFixing:!0,visible:!1,caption:"DateDeposit",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:16881,ID_Column:18892,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:16883,ID_Column:18894,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"YA8AtWlPvGriMuDS4iaKqlXiOn2MkpyGw6lQtHFRQczjT1BwiH02SKDwrcSJB5+zR27ZfbpQkC+mcy+9NVBwE4y5Ky2pZGPgN8SKqS3UC6iwtFioj7ck7sZ9xINgg2Js",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:16879,ID_Column:18890,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:16878,ID_Column:18889,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:16882,ID_Column:18893,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"DGzacZAsantNnlIwbCz15BWE0NsojVjpTV/pIJu48caTyljwuS4/XGMmTQihoDokRYF39K7ZpLhANGXytEz3Zh3svBDpZy7QBlIJNkpHlBlzWRkWD+xOPHV9riZk1i2F",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:16886,ID_Column:18907,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:16887,ID_Column:18909,dataField:"ID_Bank",allowFixing:!0,visible:!1,caption:"ID_Bank",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:16888,ID_Column:18911,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16889,ID_Column:18913,dataField:"Date",allowFixing:!0,visible:!1,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:16890,ID_Column:18915,dataField:"CheckNumber",allowFixing:!0,visible:!1,caption:"ChequeNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16891,ID_Column:18917,dataField:"CheckDate",allowFixing:!0,visible:!1,caption:"ChequeDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:16892,ID_Column:18919,dataField:"CheckAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"CheckAmount"},{editorOptions:{min:0},ID_ModelProperty:16893,ID_Column:18921,dataField:"DetailCount",allowFixing:!0,visible:!1,caption:"DetailCount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:16894,ID_Column:18923,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:16895,ID_Column:18925,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:16896,ID_Column:18927,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"0RkByWHMgdTJjJXCH/QsrA275qPV2hvmT1UcOQ4N7+rDOZny9rbryljIJKxEDrCaMIC5/aHPu13+s9xuTTDtDnRXb7p5nmYh8/XlM+qNCeNQQ6bYi8WGS/1rPjoB6xDZ"},{editorOptions:{min:0},ID_ModelProperty:16897,ID_Column:18929,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:16956,ID_Column:19041,dataField:"ID_BankAccount",allowFixing:!0,visible:!1,caption:"ID_BankAccount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:16892,ID_Column:24398,dataField:"CheckAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CheckAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17866,ID_Column:20746,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})