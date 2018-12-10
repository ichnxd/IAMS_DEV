define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAP%2fOrder%2fVC_PurchaseOrder"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:62,ModelViewName:"PurchaseOrder_LookUp_ListView",StateName:i,ID_View:3267,ModelName:"PurchaseOrder",Icon:"FontInSys",DisplayName:"Purchase Order",ID_ModelDetailView:1026,ID_ViewType:2,ViewControllerName:"PurchaseOrder_DetailView",ID_Model:65,DisplayProperty:"DocumentNo",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"vBfNGGSgHEW+9FCwQ7CK4LU9rbHUVQZnX32emDn0x46qMoNYENZ7uFaqG5F30l3EFqYqPhtVrRee7z7XivL4XqxsRRlim0brfwlQrZ8ufQfO57B7ilPaakkUYn7o2+DS",SQLUpdateProc:"6+9yYL/r/xmlKRHXDG3dApomNKnhcGqvUFtVZgJB1A+KEj+EMg2qTh3ThjULf7QXtcu8yJLYcHUKBd4c7DkqkYQwfwaJBYUWafDwNfmZu8Be2rJ0Y+vgzFKFSL2a62hn"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="PurchaseOrder";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:6089,ID_Column:7548,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:508,ID_Column:512,dataField:"Date",allowFixing:!0,visible:!0,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5338,ID_Column:6121,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5340,ID_Column:6125,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCanceled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:515,ID_Column:519,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:5369,ID_Column:6183,dataField:"DeliveryDate",allowFixing:!0,visible:!0,caption:"DeliveryDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:5343,ID_Column:6131,dataField:"DetailCount",allowFixing:!0,visible:!1,caption:"DetailCount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:506,ID_Column:510,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"Document No",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:5367,ID_Column:6179,dataField:"Address",allowFixing:!0,visible:!0,caption:"Address",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:516,ID_Column:520,dataField:"ApprovedBy",allowFixing:!0,visible:!0,caption:"Approved By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_ApprovedBy",SQL:"n5mNTC39Eszs22le9yFBxXuXdICyeXSH58v1Yp7N6Yv8nnuvRqX4GhwIuLTuAit2IVrC1bz6K7AFPs6FKlfJ9qx41/LT21gIO+c4CENiPJY+LvFFYaNSAAwaR/ZRm9q2",cellTemplate:function(n,t){t.data.ApprovedBy===undefined&&u.console_warn("ApprovedBy is undefined in datasource");var i=t.data.ApprovedBy!==undefined?t.data.ApprovedBy===null?"-":t.data.ApprovedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:507,ID_Column:511,dataField:"ID_BusinessPartner",allowFixing:!0,visible:!0,caption:"Supplier",allowEditing:!1,dataType:"object",isAllowZero:!0,ModelOption:{ID_DetailView:3102,Icon:"mdi mdi-contact-mail",ModelPropertyName:"Business Partner"},SQL:"BZXwbLdVoU6weagjwBDGvhb+O/UpJBWOCf2KUFgTBJr5vDSRxr/s5A3Xgv8XFLJJtKR29FelOAyWtMFxiVeE4nblYipqffq6x7n9md2QCotfYpsgCInfDODsK7Mp6/jm",cssClass:"ID_BusinessPartner"},{editorOptions:{min:0},ID_ModelProperty:5339,ID_Column:6123,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"Cancelled By",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5454,ID_Column:6331,dataField:"DocStatus",allowFixing:!0,visible:!0,caption:"Doc Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_DocStatus",cellTemplate:function(n,t){t.data.DocStatus===undefined?u.console_warn("DocStatus is undefined in datasource"):(n.addClass("DocStatus"),u.addColumnClass(n,"ID_DocStatus",t.data,t.data.DocStatus!=null?t.data.DocStatus.replace(" ",""):null));n.addClass("ID_DocStatus");var i=t.data.DocStatus!==undefined?t.data.DocStatus===null?"-":t.data.DocStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption DocStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:509,ID_Column:513,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:5337,ID_Column:6119,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"77EVRj+AyDo5/8y65O7jIi405oezGNjVgAnZMIa7I1eHsoRpiAXApI/eB+6NTP2Ojj9TT8mlFYSqZ4XqQCwv+X7AH6CrmL7WVXu5E2RRWPowi2KGW5diHZx4nJidgrPs",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:5368,ID_Column:6181,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!0,caption:"Payment Term",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5370,ID_Column:6185,dataField:"ID_PurchaseOrderType",allowFixing:!0,visible:!0,caption:"P.O. Type",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7479,ID_Column:9275,dataField:"ID_Contact",allowFixing:!0,visible:!1,caption:"ID_Contact",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:517,ID_Column:521,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"N1bAeCT1V/GrGtkiEvaIWN7FYfqctF/Y+sHZB3IMNdYMm8fL3+qzWdS34UPHBtJ/I5CS9DGGf3tkqb20mwDv3ES5F2kh83BYL8T7F3i2bPmXu9FFVmI4/dsbyvMR5Z06",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:5372,ID_Column:6189,dataField:"ID_Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},SQL:"T+VpVSL8Mi3TCoghg4vcHk5TdalVvi5fhPoboQAl0kMvnASeOQ/QKuJtIU7XOmGy4WQBUTj6aTE9taXkoJV0tnr2aHI3hxQzGigBRQ/1Zetq8aPattm6xzQr3i9MmXcVAd+Z7/Y9tgELmM9Y/27c5J/J23Ye+vv40cMSpgLjmlw="},{ID_ModelProperty:514,ID_Column:518,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:20215,ID_Column:25200,dataField:"isDebit",allowFixing:!0,visible:!1,caption:"isDebit",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:505,ID_Column:509,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:513,ID_Column:517,dataField:"Subtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:512,ID_Column:516,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Amount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:5342,ID_Column:6129,dataField:"TotalQty",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalQty",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:511,ID_Column:515,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Vat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:510,ID_Column:514,dataField:"VatRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"VAT Rate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12689,ID_Column:14533,dataField:"ID_TaxScheme",allowFixing:!0,visible:!1,caption:"ID_TaxScheme",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17028,ID_Column:19250,dataField:"ID_Currency",allowFixing:!0,visible:!1,caption:"ID_Currency",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17062,ID_Column:19315,dataField:"IsImported",allowFixing:!0,visible:!1,caption:"Imported",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17069,ID_Column:19327,dataField:"ExchangeRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"ExchangeRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17266,ID_Column:19711,dataField:"ID_PaymentFilingStatus",allowFixing:!0,visible:!1,caption:"ID_PaymentFilingStatus",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17708,ID_Column:20445,dataField:"VPBalance",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VPBalance",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17712,ID_Column:20453,dataField:"DueDate",allowFixing:!0,visible:!1,caption:"DueDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17841,ID_Column:20695,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17989,ID_Column:20986,dataField:"IsDeliverClient",allowFixing:!0,visible:!1,caption:"Delivery Client",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17990,ID_Column:20988,dataField:"ID_ShipWarehouse",allowFixing:!0,visible:!1,caption:"ID_ShipWarehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17991,ID_Column:20990,dataField:"Shipto",allowFixing:!0,visible:!1,caption:"Shipto",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17992,ID_Column:20992,dataField:"ShipContact",allowFixing:!0,visible:!1,caption:"ShipContact",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17993,ID_Column:20994,dataField:"ShipAddress",allowFixing:!0,visible:!1,caption:"ShipAddress",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17994,ID_Column:20996,dataField:"ShipTIN",allowFixing:!0,visible:!1,caption:"ShipTIN",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18412,ID_Column:21790,dataField:"PrePayment",allowFixing:!0,visible:!1,caption:"PrePayment",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18413,ID_Column:21792,dataField:"CashAdvance",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CashAdvance",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18415,ID_Column:21796,dataField:"CATotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CATotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18416,ID_Column:21798,dataField:"CASubtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CASubtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18545,ID_Column:22057,dataField:"RemainingCAPayable",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"RemainingCAPayable",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18659,ID_Column:22254,dataField:"ID_ReferenceUsedAdvancePayment",allowFixing:!0,visible:!1,caption:"ID_ReferenceUsedAdvancePayment",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18660,ID_Column:22256,dataField:"ID_ReferenceUsedAdvancePayment_ParentModel",allowFixing:!0,visible:!1,caption:"ID_ReferenceUsedAdvancePayment_ParentModel",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19252,ID_Column:23375,dataField:"isChecked",allowFixing:!0,visible:!1,caption:"Checked",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19254,ID_Column:23377,dataField:"ID_CheckedBy",allowFixing:!0,visible:!1,caption:"ID_CheckedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19272,ID_Column:23420,dataField:"Payee",allowFixing:!0,visible:!1,caption:"Payee",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19504,ID_Column:23912,dataField:"ID_TransactionType",allowFixing:!0,visible:!1,caption:"ID_TransactionType",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19565,ID_Column:24455,dataField:"IsAutoApproved",allowFixing:!0,visible:!1,caption:"IsAutoApproved",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:19564,ID_Column:24459,dataField:"isEditable",allowFixing:!0,visible:!1,caption:"isEditable",allowEditing:!1,dataType:"boolean",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})