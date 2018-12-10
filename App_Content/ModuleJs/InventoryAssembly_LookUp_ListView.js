define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryAssembly"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8510,ModelViewName:"InventoryAssembly_LookUp_ListView",StateName:i,ID_View:9807,ModelName:"InventoryAssembly",Icon:"mdi mdi-call-split",DisplayName:"Assemble / Disassemble",ID_ModelDetailView:9256,ID_ViewType:2,ViewControllerName:"InventoryAssembly_DetailView",ID_Model:8290,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"VWoMwaImLq66yTzo3gvYSLZRJetAMjQs7ckcvnKgaFgAy4aqLaxW1PtyoIYqfSMuiQtaE2/HXNYsNUdWtNIVgIpe40qYlsvLZqJ/RdgPfwmAXypnprUvnPibyWdf59RD",SQLUpdateProc:"8qSLacbW91PBzbqwPLfh88DDZdvNyWZP1n8uBoyGkuFtLTdQTRfHxLUzK8Ho7bF6f7ZXANiNI6j9nPxRL8JXPKKyOHoXM4UtTfmgoV1BFlxJjoi1bjWjLbtIK43yXkoU"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="InventoryAssembly";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:17030,ID_Column:19253,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17038,ID_Column:19261,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17033,ID_Column:19256,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17034,ID_Column:19257,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:17035,ID_Column:19258,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"NBulkZXjA1pj3AoiuwFx9uwQ1XCclsbcfBnSlmFNv9RnHL2O7z0rgGp5i/WQ+0M2VP4N3P2yw8kPlp6BOtC5bZ2z0H0la5gbfbmXurY0BKVh3xkLzqfi4X6yp/rCk1KR",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:17036,ID_Column:19259,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"H6bJPi5BVH+80uHPCPzoLgLgGug/rEajEi51lQ+JOitdawYY70OpV6KWFsQq79LEfs5ZB8E3WgmXqYAF4pqCimgjOByisv21n0pTqugPBXkTI763666SOjeaoZoYYRYe",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17032,ID_Column:19255,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:17031,ID_Column:19254,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17725,ID_Column:20476,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:17744,ID_Column:20513,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17755,ID_Column:20535,dataField:"DocumentNo",allowFixing:!0,visible:!1,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17756,ID_Column:20537,dataField:"ID_InventoryAssemblyType",allowFixing:!0,visible:!1,caption:"ID_InventoryAssemblyType",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17770,ID_Column:20554,dataField:"Date",allowFixing:!0,visible:!1,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17862,ID_Column:20738,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18957,ID_Column:22828,dataField:"ID_Item",allowFixing:!0,visible:!1,caption:"ID_Item",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19002,ID_Column:22900,dataField:"Quantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!1,caption:"Quantity",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19090,ID_Column:23078,dataField:"IsSerialized",allowFixing:!0,visible:!1,caption:"Serialized",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19120,ID_Column:23120,dataField:"ID_UOM",allowFixing:!0,visible:!1,caption:"ID_UOM",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19121,ID_Column:23122,dataField:"UOMConversion",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"UOMConversion",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19159,ID_Column:23195,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19160,ID_Column:23197,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19161,ID_Column:23199,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19162,ID_Column:23201,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19169,ID_Column:23215,dataField:"QtyOnHand",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"QtyOnHand",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317271,ID_Column:1071089,dataField:"isBundle",allowFixing:!0,visible:!1,caption:"isBundle",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:317272,ID_Column:1071091,dataField:"NonInventoriable",allowFixing:!0,visible:!1,caption:"NonInventoriable",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})