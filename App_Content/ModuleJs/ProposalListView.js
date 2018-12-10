define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_Proposal"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8777,ModelViewName:"Proposal_ListView",StateName:i,ID_View:11255,ModelName:"Proposal",Icon:"mdi mdi-file-outline",DisplayName:"Proposal",ID_ModelDetailView:9389,ID_ViewType:2,ViewControllerName:"Proposal_DetailView",ID_Model:8422,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"yVluZgmUBdOSBB/V+RSug4j3Hmiey7jzRnHM5w0jQF/WNG6wzfKn3wwf2Oh4IaasAsB4lFhqEHP/y+6ixka00qw0J+3typAxlzo5dwQBlGrS25ZH95/2mDwdZmKJgWQU",SQLUpdateProc:"lAgRKKxDTOOTgMMteItdzHX5UwwjTAFlU2FgcXTMFq5Wfg61oVxPqMKUkOjzKCaqUU/9F8CGEWPPJt5jnSzcMey2J6E79AVs3Uf3IPs5+68HhrDTX89mUt1tXvyfqcl2"};u.$isAllowAdd=!1;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Proposal";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:19620,ID_Column:24222,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:19631,ID_Column:24234,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"PL No.",width:80,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19632,ID_Column:24236,dataField:"Date",allowFixing:!0,visible:!0,caption:"PL Date",width:86,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19622,ID_Column:24224,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19624,ID_Column:24226,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19626,ID_Column:24228,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19630,ID_Column:24232,dataField:"AccountExecutive",allowFixing:!0,visible:!0,caption:"BDM",width:139,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Employee",cellTemplate:function(n,t){t.data.AccountExecutive===undefined&&u.console_warn("AccountExecutive is undefined in datasource");var i=t.data.AccountExecutive!==undefined?t.data.AccountExecutive===null?"-":t.data.AccountExecutive:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19619,ID_Column:24221,dataField:"Name",allowFixing:!0,visible:!0,caption:"Project Name",width:137,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19628,ID_Column:24230,dataField:"TradeName",allowFixing:!0,visible:!0,caption:"Trade Name",width:145,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Customer",cellTemplate:function(n,t){t.data.TradeName===undefined&&u.console_warn("TradeName is undefined in datasource");var i=t.data.TradeName!==undefined?t.data.TradeName===null?"-":t.data.TradeName:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19629,ID_Column:24231,dataField:"ID_BusinessUnit",allowFixing:!0,visible:!1,caption:"Business Unit",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19633,ID_Column:24238,dataField:"SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19634,ID_Column:24240,dataField:"Discount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount Amount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19635,ID_Column:24242,dataField:"VATableAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VATable Amt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19636,ID_Column:24244,dataField:"VATAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VAT Amt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19637,ID_Column:24246,dataField:"VATRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VAT Rate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19638,ID_Column:24248,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total Amount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19760,ID_Column:24444,dataField:"ID_TaxScheme",allowFixing:!0,visible:!1,caption:"ID_TaxScheme",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19778,ID_Column:24487,dataField:"TotalVatInc",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalVatInc",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19777,ID_Column:24485,dataField:"TotalVatEx",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalVatEx",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19776,ID_Column:24481,dataField:"Reference",allowFixing:!0,visible:!1,caption:"Reference",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224848,ID_Column:970126,dataField:"Remarks",allowFixing:!0,visible:!1,caption:"Remarks",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224849,ID_Column:970128,dataField:"CancellationCharge",allowFixing:!0,visible:!1,caption:"CancellationCharge",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224851,ID_Column:970132,dataField:"PriceValidity",allowFixing:!0,visible:!1,caption:"PriceValidity",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224852,ID_Column:970134,dataField:"Delivery",allowFixing:!0,visible:!1,caption:"Delivery",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224854,ID_Column:970138,dataField:"Warranty",allowFixing:!0,visible:!1,caption:"Warranty",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224934,ID_Column:970292,dataField:"BOM_IsLot",allowFixing:!0,visible:!1,caption:"BOM_IsLot",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224935,ID_Column:970294,dataField:"BOM_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_SubTotal",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224936,ID_Column:970296,dataField:"BOM_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_DiscountRate",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224937,ID_Column:970298,dataField:"BOM_Discount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_Discount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224938,ID_Column:970300,dataField:"BOM_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"BOM_TotalAmount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224939,ID_Column:970302,dataField:"Service_IsLot",allowFixing:!0,visible:!1,caption:"Service_IsLot",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224940,ID_Column:970304,dataField:"Service_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_SubTotal",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224941,ID_Column:970306,dataField:"Service_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_DiscountRate",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224942,ID_Column:970308,dataField:"Service_Discount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_Discount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224943,ID_Column:970310,dataField:"Service_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Service_TotalAmount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224948,ID_Column:970320,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224949,ID_Column:970322,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224950,ID_Column:970324,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224951,ID_Column:970326,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224952,ID_Column:970328,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_Column:970331,dataField:"Branch",allowFixing:!0,visible:!0,caption:"Branch",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:970334,dataField:"Category",allowFixing:!0,visible:!0,caption:"Category",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19621,ID_Column:24223,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:145,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19627,ID_Column:24229,dataField:"Opportunity",allowFixing:!0,visible:!0,caption:"Reference Opp No.",width:114,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Opportunity",cellTemplate:function(n,t){t.data.Opportunity===undefined&&u.console_warn("Opportunity is undefined in datasource");var i=t.data.Opportunity!==undefined?t.data.Opportunity===null?"-":t.data.Opportunity:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19757,ID_Column:24437,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:120,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:19623,ID_Column:24225,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:169,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224993,ID_Column:970412,dataField:"Confidentiality",allowFixing:!0,visible:!1,caption:"Confidentiality",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:315097,ID_Column:1070653,dataField:"Introduction",allowFixing:!0,visible:!1,caption:"Introduction",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:315132,ID_Column:1070704,dataField:"EquipmentWarranty",allowFixing:!0,visible:!1,caption:"EquipmentWarranty",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:315133,ID_Column:1070706,dataField:"MaterialsWarranty",allowFixing:!0,visible:!1,caption:"MaterialsWarranty",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316195,ID_Column:1070850,dataField:"Equipment_SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316196,ID_Column:1070852,dataField:"Equipment_DiscountRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount %",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316197,ID_Column:1070854,dataField:"Equipment_DiscountAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Discount Amt",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:316198,ID_Column:1070856,dataField:"Equipment_TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Total Amount",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})