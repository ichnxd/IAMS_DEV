define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAR%2fCollection%2fVC_Collection"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3354,ModelViewName:"PaymentTransaction_LookUp_ListView",StateName:i,ID_View:4557,ModelName:"ColllectionReceipt",Icon:"FontInSys",DisplayName:"Collection Receipt",ID_ModelDetailView:4173,ID_ViewType:2,ViewControllerName:"PaymentTransaction_DetailView",ID_Model:3212,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"CuiRW7JJKe9bCUm+AfYXBcc7fgcUpWBaBATHcoT8y3qZuOPMdilhkl8Y3RhpOfOk4bVudEZEWMTC3E+wJs5c9CJAPVMgzsDMCXLeW9nM3sGN7YjlmEyvRrn/8FlEGp8MC4ayKUNlFzJwLpz1PCHL8lmPSRBVwxHfqviIcbjShPY=",SQLUpdateProc:"GOJaEvs/JR/cHCfJLKVCJ15luppiV0bX4SUaamOkl8eHAY0x+ohogMVcDn6M78vnQ7cnra1RMrQ9nIxGbwBlsVqN11CCU19sKqo4fWh82h6VB4y3K9hMkrhBhuCvjzJf"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="ColllectionReceipt";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:7677,ID_Column:9662,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7680,ID_Column:9665,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7679,ID_Column:9664,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7678,ID_Column:9663,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9179,ID_Column:11667,dataField:"ManualDocNo",allowFixing:!0,visible:!1,caption:"ManualDocNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9180,ID_Column:11669,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9181,ID_Column:11671,dataField:"Date",allowFixing:!0,visible:!1,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9182,ID_Column:11673,dataField:"ID_BusinessPartner",allowFixing:!0,visible:!1,caption:"ID_BusinessPartner",allowEditing:!1,dataType:"number",isAllowZero:!0,cssClass:"ID_BusinessPartner"},{editorOptions:{min:0},ID_ModelProperty:9183,ID_Column:11675,dataField:"ID_PaymentTransactionType",allowFixing:!0,visible:!1,caption:"ID_PaymentTransactionType",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9184,ID_Column:11677,dataField:"ID_ReceiptType",allowFixing:!0,visible:!1,caption:"ID_ReceiptType",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9185,ID_Column:11679,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9186,ID_Column:11681,dataField:"SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9187,ID_Column:11683,dataField:"TotalCredit",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalCredit",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9188,ID_Column:11685,dataField:"TotalDebit",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalDebit",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9189,ID_Column:11687,dataField:"GrossAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"GrossAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9190,ID_Column:11689,dataField:"ID_EWT",allowFixing:!0,visible:!1,caption:"ID_EWT",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9191,ID_Column:11691,dataField:"EWTRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"EWTRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9192,ID_Column:11693,dataField:"EWTAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"EWTAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9193,ID_Column:11695,dataField:"VatAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VatAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9195,ID_Column:11699,dataField:"TotalNetAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalNetAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9196,ID_Column:11701,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:9197,ID_Column:11703,dataField:"CashPayment",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CashPayment",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9198,ID_Column:11705,dataField:"TotalBankTransferAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalBankTransferAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9199,ID_Column:11707,dataField:"TotalCheckAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalCheckAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9200,ID_Column:11709,dataField:"TotalPayment",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalPayment",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:9201,ID_Column:11711,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"atcrMeadWnHDoS5hNwuXk9mnAnxmC2ueblWUoZfLPU53sYRMrdLjZ4lkbaygD0uWdPGSflLdekVg3svPRO27Ebg0wuyAYCr2T8dBJt8iKtb/aklOPfDNRgztj6xcqfG6",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:9203,ID_Column:11715,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9206,ID_Column:11721,dataField:"ID_PostedBy",allowFixing:!0,visible:!1,caption:"ID_PostedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9207,ID_Column:11723,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:9208,ID_Column:11725,dataField:"DetailCount",allowFixing:!0,visible:!1,caption:"DetailCount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9209,ID_Column:11727,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"A0sZT8bb8Nm/1PBn2JAiQkXxemENJzo9yU03ml0+qbxIiSQlqtFluDmB63Nk2bMrHsGdw3JwlYoC4gZv2rqbe94HnmN5BcMnu8/jJsuBs7ETbWBCqJ6UnhYNVycsSulz",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:9214,ID_Column:11737,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12652,ID_Column:14459,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"6Mu9emQ3dSm0CC7z4uDk4bjiT/ESIOYPQXgzpfkEj93rpI+yocRFJouS2jNGIVPfxQ3ITtQeKELhk4eDzrjEXtUsUwk4MJ5QyR2CepU8wIXTeHB8zGrctXJP9DfpXjH8"},{editorOptions:{min:0},ID_ModelProperty:12653,ID_Column:14461,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:12655,ID_Column:14465,dataField:"DateCanceled",allowFixing:!0,visible:!1,caption:"DateCanceled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17081,ID_Column:19346,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17858,ID_Column:20730,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19119,ID_Column:23118,dataField:"TotalNonTradeAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalNonTradeAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19520,ID_Column:23956,dataField:"ExchangeRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"ExchangeRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19560,ID_Column:24075,dataField:"ID_BankAccount",allowFixing:!0,visible:!1,caption:"ID_BankAccount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19561,ID_Column:24077,dataField:"ID_Bank",allowFixing:!0,visible:!1,caption:"ID_Bank",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:21383,ID_Column:26390,dataField:"CashDateDeposit",allowFixing:!0,visible:!1,caption:"CashDateDeposit",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:21385,ID_Column:26391,dataField:"ID_CashDateDepositBy",allowFixing:!0,visible:!1,caption:"ID_CashDateDepositBy",allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})