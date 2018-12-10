define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryPerWarehouse"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3383,ModelViewName:"InventoryHistory_ListView",StateName:i,ID_View:4605,ModelName:"InventoryHistory",Icon:"FontInSys",DisplayName:"InventoryHistory",ID_ModelDetailView:4187,ID_ViewType:2,ViewControllerName:"InventoryHistory_DetailView",ID_Model:3226,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"Ik/qV1nBpa7dV59jaAtZG6oOZLBSmwDuxT5cg5DzZ62r+mWsBltJ3JIp6OCgboo6afKmspoUW+UV49uAOOhzmKnVg3VBHZ/twFxfDNBmx2y1iBwSAg4uxioHiPAJ4cHd",SQLUpdateProc:"9tSz9aaAOpBwyRX2+JV8IsgW4vxsBuNnbYYf04RIJgpDrbM5e2ZJwQB8/tvI2UueTE8/iUZNOocv7BmMDKfjSKzMUX5D5Vxo6vUOOC+NM3AMT/zSlu2DxpH8YwCvvCzc"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="InventoryHistory";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:7829,ID_Column:9954,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7837,ID_Column:9962,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7832,ID_Column:9957,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7833,ID_Column:9958,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7834,ID_Column:9959,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"UowyEzdrVBFQElFykmr4g1WhQRrFAvVYgQ/RoY/4SXddxPnSMsiRKGOzDtUYViRjhA2eHkGgfKl1DUz1YHovOOJl+rmTfqS31zX9p0Pi4uXjs/Vgh7iCGb7evlRekyHN",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7831,ID_Column:9956,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7830,ID_Column:9955,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7835,ID_Column:9960,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"WUiw5H3oFKTowuwZa4dHpRYwdWQVBIYpc9Y3H0EtoQYQOVocuMW9Q3ltjp1xgME3H9zAsDUfPwrfd7vrtRrE5+2B/QuRK8/m58PayS8OK5BstjMrnStGtbKDoRPmPI3x",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11449,ID_Column:14187,dataField:"Qty",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Qty",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:11451,ID_Column:14195,dataField:"ID_Item",allowFixing:!0,visible:!1,caption:"ID_Item",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:11452,ID_Column:14199,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:11453,ID_Column:14203,dataField:"RefNo",allowFixing:!0,visible:!1,caption:"RefNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11454,ID_Column:14207,dataField:"RefTable",allowFixing:!0,visible:!1,caption:"RefTable",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12520,ID_Column:14353,dataField:"QtyDefective",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"QtyDefective",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17105,ID_Column:19394,dataField:"ID_Model",allowFixing:!0,visible:!1,caption:"ID_Model",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17106,ID_Column:19397,dataField:"ID_DocDetail",allowFixing:!0,visible:!1,caption:"ID_DocDetail",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17107,ID_Column:19400,dataField:"ID_Doc",allowFixing:!0,visible:!1,caption:"ID_Doc",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17108,ID_Column:19403,dataField:"SerialNo",allowFixing:!0,visible:!1,caption:"SerialNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17109,ID_Column:19406,dataField:"ID_UOM",allowFixing:!0,visible:!1,caption:"ID_UOM",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17110,ID_Column:19409,dataField:"UnitCost",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"UnitCost",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317310,ID_Column:1071164,dataField:"Description",allowFixing:!0,visible:!1,caption:"Description",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})