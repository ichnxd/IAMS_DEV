define(["app","baseListViewController","/JsApp/GetScript?Url=VC_InventorySummaryPerWarehouse"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9967,ModelViewName:"InventorySummaryPerWarehouse_LookUp_ListView",StateName:i,ID_View:24640,ModelName:"InventorySummaryPerWarehouse",Icon:"FontInSys",DisplayName:"Inventory Summary Per Warehouse",ID_ModelDetailView:10484,ID_ViewType:2,ViewControllerName:"InventorySummaryPerWarehouse_DetailView",ID_Model:12516,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"tUBKibiZs1j2eJr8IvVw0JtJ+zPbOlMUJMIMV1MdKvjco4KPzclL0QRAy10Lldb2280AKhk57EQTUhVFuvIBGw/0Yynss7ENvuz4m6OOwurDQYqXxSu58jDDaouEHfNf1tLjhAFCg7La6szqyyfYoo5mCccvL2QWubvaQOwkzCU=",SQLUpdateProc:"ImbZ7waN4VPDU8DjGuyYCVYOpb+BSsKcFQY+uDEB7zmniN7/K4NmCEsD4oQTEmRkVfLWPX3MzAn1Zj2KrdnXPexRfJiSRS4XvRAj1pT5KbBc7Y3xNwH8eQQB34Squ7Mi"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="InventorySummaryPerWarehouse";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:317499,ID_Column:1071540,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317507,ID_Column:1071541,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317502,ID_Column:1071542,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"DateCreated",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:317503,ID_Column:1071543,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"DateModified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:317504,ID_Column:1071546,dataField:"ID_CreatedBy",allowFixing:!0,visible:!1,caption:"ID_CreatedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317505,ID_Column:1071547,dataField:"ID_LastModifiedBy",allowFixing:!0,visible:!1,caption:"ID_LastModifiedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317501,ID_Column:1071548,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"IsActive",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317509,ID_Column:1071562,dataField:"ID_UOM",allowFixing:!0,visible:!1,caption:"ID_UOM",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317510,ID_Column:1071564,dataField:"OnOrder",allowFixing:!0,visible:!1,caption:"OnOrder",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317511,ID_Column:1071566,dataField:"Allocated",allowFixing:!0,visible:!1,caption:"Allocated",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317512,ID_Column:1071568,dataField:"Adjustment",allowFixing:!0,visible:!1,caption:"Adjustment",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317553,ID_Column:1071646,dataField:"ID_Item",allowFixing:!0,visible:!1,caption:"ID_Item",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317612,ID_Column:1071740,dataField:"ID_InventorySummaryOnhand",allowFixing:!0,visible:!1,caption:"ID_InventorySummaryOnhand",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317613,ID_Column:1071742,dataField:"PartNo",allowFixing:!0,visible:!1,caption:"PartNo",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317614,ID_Column:1071744,dataField:"SupplierCode",allowFixing:!0,visible:!1,caption:"SupplierCode",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317719,ID_Column:1071889,dataField:"OnderedQty",allowFixing:!0,visible:!1,caption:"OnderedQty",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317500,ID_Column:1071549,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317508,ID_Column:1071560,dataField:"Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",width:390,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Warehouse",cellTemplate:function(n,t){t.data.Warehouse===undefined&&u.console_warn("Warehouse is undefined in datasource");var i=t.data.Warehouse!==undefined?t.data.Warehouse===null?"-":t.data.Warehouse:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:317720,ID_Column:1071891,dataField:"OnOrderedQty",allowFixing:!0,visible:!0,caption:"Ordered Quantity",width:220,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317718,ID_Column:1071887,dataField:"AllocatedQty",allowFixing:!0,visible:!0,caption:"Allocated Quantity",width:211,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317513,ID_Column:1071570,dataField:"OnHandQty",allowFixing:!0,visible:!0,caption:"On Hand Quantity",width:208,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317506,ID_Column:1071545,dataField:"ID_Company",allowFixing:!0,visible:!1,caption:"ID_Company",allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})