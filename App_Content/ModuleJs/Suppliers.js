define(["app","baseListViewController","/JsApp/GetScript?Url=VC_BusinessPartner","/JsApp/GetScript?Url=Doc%2fAP%2fVC_Supplier"],function(n,t,i,r){var u=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.ViewHelper=new r;n.ViewHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return u.prototype=Object.create(t.prototype),u.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8508,ModelViewName:"Suppliers_ListView",StateName:i,ID_View:9805,ModelName:"BusinessPartner",Icon:"mdi mdi-contact-mail",DisplayName:"Suppliers",ID_ModelDetailView:3102,ID_ViewType:2,ViewControllerName:"BusinessPartner_DetailView",ID_Model:2141,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"lMjdNiNRA/sJCV3Bp9J7ddzAde3PaGxh3c6/+UjOPVhT0ZrLaPQ+Ps/P1b7LY2rlXv2zrzQNipilrYigRKwPp5dI28gJiE8kj2DJlQGFqjJrT33rg4B4WiOoyPDZjMGx10WDOf+6aizhrL8waUtjLTbR8Rai+5DgwB7zY0Vp//U=",SQLUpdateProc:"WBovBNSE+pFLQE6nlSuo3Gd22COd+tfe0w5IX/ntCIa0rCVN7wWF5pIZF96kQvTLljE5iOqWCjgfPA18fBuK/gKWSFDKC9itsjAW47vja4B1fbDqKBNJ+e34Z2nAN5yb"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!0;u.ModelName="BusinessPartner";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_Column:19151,dataField:"Address2",allowFixing:!0,visible:!1,caption:"Address2",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19152,dataField:"Address3",allowFixing:!0,visible:!1,caption:"Address3",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19153,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19453,ID_Column:23787,dataField:"SupplierCode",allowFixing:!0,visible:!0,caption:"Code",width:116,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19177,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:324,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19154,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19157,dataField:"EmailAddress",allowFixing:!0,visible:!1,caption:"EmailAddress",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19158,dataField:"FaxNo",allowFixing:!0,visible:!1,caption:"FaxNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19180,dataField:"TradeName",allowFixing:!0,visible:!0,caption:"Trade Name",width:87,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19159,dataField:"FullAddress",allowFixing:!0,visible:!0,caption:"FullAddress",width:216,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19179,dataField:"TIN",allowFixing:!0,visible:!0,caption:"TIN",width:88,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19162,dataField:"ID_Contact",allowFixing:!0,visible:!1,caption:"ID_Contact",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19164,dataField:"ID_Currency",allowFixing:!0,visible:!1,caption:"ID_Currency",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19165,dataField:"ID_CustomerType",allowFixing:!0,visible:!1,caption:"ID_CustomerType",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19166,dataField:"ID_EWT",allowFixing:!0,visible:!1,caption:"ID_EWT",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19167,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass(""),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:"ID_FilingStatus"},{ID_Column:19168,dataField:"ID_ModifiedBy",allowFixing:!0,visible:!1,caption:"ID_ModifiedBy",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19169,dataField:"ID_Original",allowFixing:!0,visible:!1,caption:"ID_Original",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19170,dataField:"ID_ParentBusinessPartner",allowFixing:!0,visible:!1,caption:"ID_ParentBusinessPartner",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19171,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!1,caption:"ID_PaymentTerm",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19172,dataField:"ID_SupplierType",allowFixing:!0,visible:!1,caption:"ID_SupplierType",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19173,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19174,dataField:"IsCustomer",allowFixing:!0,visible:!1,caption:"Customer",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19175,dataField:"IsImported",allowFixing:!0,visible:!1,caption:"Imported",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19176,dataField:"IsSupplier",allowFixing:!0,visible:!1,caption:"Supplier",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19150,dataField:"Address1",allowFixing:!0,visible:!1,caption:"Address1",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19178,dataField:"TelNo",allowFixing:!0,visible:!0,caption:"Tel No.",width:167,allowEditing:!1,dataType:"string",isAllowZero:!0},{placeholder:"Find User...",ID_Column:19163,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:128,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",SQL:"VYINTd6892FGNrUkRwipsB+Zu77606hET9B0bVYda87lWBwOVBge7XVSH05eBreLLxKjgXdXlpsrRcVohQXF/3Zd6moK7eD5mefZHGXVBpmAY5AUHQH4eibzDu1QjRam",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_Column:19155,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:19156,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17059,ID_Column:19309,dataField:"IsWalkIn",allowFixing:!0,visible:!1,caption:"Walk in",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17103,ID_Column:19390,dataField:"CreditLimit",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"CreditLimit",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17843,ID_Column:20701,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18002,ID_Column:21014,dataField:"ID_BusinessStyle",allowFixing:!0,visible:!1,caption:"ID_BusinessStyle",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18406,ID_Column:21778,dataField:"ID_CustomerReference",allowFixing:!0,visible:!1,caption:"ID_CustomerReference",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19235,ID_Column:23341,dataField:"ID_TaxScheme",allowFixing:!0,visible:!1,caption:"ID_TaxScheme",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19452,ID_Column:23783,dataField:"CustomerCode",allowFixing:!0,visible:!1,caption:"CustomerCode",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224387,ID_Column:268360,dataField:"InvoiceTo",allowFixing:!0,visible:!1,caption:"InvoiceTo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224388,ID_Column:268364,dataField:"DeliveryTo",allowFixing:!0,visible:!1,caption:"DeliveryTo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:316222,ID_Column:1070918,dataField:"ParentCompany",allowFixing:!0,visible:!1,caption:"ParentCompany",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:316223,ID_Column:1070922,dataField:"Branch",allowFixing:!0,visible:!1,caption:"Branch",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:316224,ID_Column:1070926,dataField:"Management",allowFixing:!0,visible:!1,caption:"Management",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},u})