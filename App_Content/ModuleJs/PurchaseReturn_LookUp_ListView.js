define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAP%2fReturn%2fVC_PurchaseReturn"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:2228,ModelViewName:"PurchaseReturn_LookUp_ListView",StateName:i,ID_View:3359,ModelName:"PurchaseReturn",Icon:"FontInSys",DisplayName:"Purchase Return",ID_ModelDetailView:3110,ID_ViewType:2,ViewControllerName:"PurchaseReturn_DetailView",ID_Model:2149,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"UIL1VKM9h/fG/fxZMO/QTHJKX4AIBhLq2ActJ5ORGeSBnp278UusRzhQ5sDZ8c0jpTQqZehTe5bj/1zUzDiiHMRfbn9UGfJDGLWd8+nA5k3PoQCEBlPd/zFHLXomUgut",SQLUpdateProc:"cBJFNUwTuisx71Sgc/aWSEsClCX0CpvcWDEyN5lbLvHxhn4voEeUxGHA8IR0p21Re7N97S75nEKE2WUgQtEoAwxfDJPdZndyJtSlXfWnM4xxjnXj8l3Js928wEREztfi"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="PurchaseReturn";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:5506,ID_Column:6428,dataField:"Date",allowFixing:!0,visible:!0,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5519,ID_Column:6441,dataField:"DateApproved",allowFixing:!0,visible:!0,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5521,ID_Column:6443,dataField:"DateCancelled",allowFixing:!0,visible:!0,caption:"DateCanceled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5513,ID_Column:6435,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5517,ID_Column:6439,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:5524,ID_Column:6446,dataField:"DetailCount",allowFixing:!0,visible:!0,caption:"Detail Count",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:5504,ID_Column:6426,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:5514,ID_Column:6436,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!0,caption:"Approved By",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"cnomyZLu4k8uIi/XGoRXjfG/wdX40tMjnTo9J18yyDt6un8Bv81yBqiGdRY/7bCvPa3c3uXDYPbWX8k/WaOSod0xqYWDHs8tbnq/TCeUbSoAsletae8oSputktAhP9hP"},{editorOptions:{min:0},ID_ModelProperty:5520,ID_Column:6442,dataField:"ID_CancelledBy",allowFixing:!0,visible:!0,caption:"Cancelled By",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:5515,ID_Column:6437,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"I7j9Ugnwtgbdmtf4XFVmF44CJK7XpfDwKgWG3WdncDdHEb14T80KCS6OORYNzp8NJMyF/Y+VrPhiN3HD5bid5eXTMebqRa3UQqGKNum6SUq7pzGE4ZVP/a13lrtyO7Wc",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:5507,ID_Column:6429,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:5518,ID_Column:6440,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"8XlUeVWUDxgzsOi5/+IHPtGcPhvolnN5RINipA50fIQdRpWTMMVTiYTGHSPzX4XhetQfirHZc75Mta/3pbv8IFLCMNVpWAdKsMofJjLEMJQH2kfpoKC0Z6hSEmGFYKXS",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:5502,ID_Column:6424,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5529,ID_Column:6451,dataField:"ID_Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},SQL:"gE02apFduxLNaa8h2pdSc8BnF3Hrw6/TOMnnVJp0jf7na7t3clwgvXQwIpziZI+GS0xB76BKnpSoV4mn2KeELQ3db+yVZt6XYtT8iyoYj14ZztTdRxX/pMS6xlzvZgpsZcLe4cfTCzlDuo6XMWTxs6u81S34GQ/+dnJTT8jHwA8="},{ID_ModelProperty:5512,ID_Column:6434,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:5503,ID_Column:6425,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:5516,ID_Column:6438,dataField:"Notes",allowFixing:!0,visible:!0,caption:"Notes",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5511,ID_Column:6433,dataField:"Subtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5510,ID_Column:6432,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:5523,ID_Column:6445,dataField:"TotalQty",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Qty",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5509,ID_Column:6431,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"TotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5508,ID_Column:6430,dataField:"VatRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"VatRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7755,ID_Column:9805,dataField:"ID_Supplier",allowFixing:!0,visible:!1,caption:"ID_Supplier",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:7756,ID_Column:9807,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12697,ID_Column:14546,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17065,ID_Column:19320,dataField:"IsImported",allowFixing:!0,visible:!1,caption:"Imported",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17068,ID_Column:19325,dataField:"ID_Currency",allowFixing:!0,visible:!1,caption:"ID_Currency",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17072,ID_Column:19332,dataField:"ExchangeRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"ExchangeRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17916,ID_Column:20846,dataField:"ReasonOfReturn",allowFixing:!0,visible:!1,caption:"ReasonOfReturn",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19287,ID_Column:23455,dataField:"IsDebit",allowFixing:!0,visible:!1,caption:"Debit",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19505,ID_Column:23914,dataField:"ID_TransactionType",allowFixing:!0,visible:!1,caption:"ID_TransactionType",allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})