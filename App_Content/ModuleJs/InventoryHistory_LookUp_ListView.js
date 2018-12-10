define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryPerWarehouse"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3382,ModelViewName:"InventoryHistory_LookUp_ListView",StateName:i,ID_View:4604,ModelName:"InventoryHistory",Icon:"FontInSys",DisplayName:"InventoryHistory",ID_ModelDetailView:4187,ID_ViewType:2,ViewControllerName:"InventoryHistory_DetailView",ID_Model:3226,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"PS4/cTQ56ETzqp2XhDs3L4aL6WjqYxKFUonHA+chjqq6d1XpgI7YlQpNTbDFq6mAEkZxh6AprwZeOMt2ohKxa01AuGp8aOryoXhw8oKTB0tMkextQOHBO4Qvs26B0o0C",SQLUpdateProc:"06Tm8GMTR27lWgyzehq1ipXcJ4rq+XSmxfgRh3GqBMKbtQZqO8qdMwoKtJLKzTJziFIFQDtxhDGDTSu+VdOd0kyvSWypUqzT+T4/Bp6J0M5ZAwf7JowtlesPTkdI3KAA"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="InventoryHistory";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:7829,ID_Column:9944,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:456,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:11451,ID_Column:14194,dataField:"ID_Item",allowFixing:!0,visible:!1,caption:"ID_Item",width:33,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:11453,ID_Column:14202,dataField:"RefNo",allowFixing:!0,visible:!0,caption:"Ref No.",width:76,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:11449,ID_Column:14186,dataField:"Qty",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Qty",width:68,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12520,ID_Column:14352,dataField:"QtyDefective",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Defective Qty",width:75,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:11454,ID_Column:14206,dataField:"RefTable",allowFixing:!0,visible:!1,caption:"RefTable",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7834,ID_Column:9949,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",width:398,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"RZxVYItzUSsCNUzcbEy1mYbU5w2pXPwWuEtwpAUds81n+h3D35x936judtGriury7mUv6g8tT1V2eUMZ1/4u//NRFcUKtEpccVj61927fjeF+gwZifLUw4SQRUMBSzlb",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7835,ID_Column:9950,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",width:200,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"mBJJLwbNJbGjOLIJDK+DrP+a+dy2DB/gfPu5ISqZHWyLOc000QmCpsHR0stbIBhznkdq2n2R9P5w2lN1nOqunRVlfKH3w6CGLWXS22VxAPgzVNtaWcz8FTejx3jhbNfi",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11452,ID_Column:14198,dataField:"Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",width:114,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},refDataField:"ID_Warehouse",SQL:"Ky48uT/gPyQKaEnwl2cPDg1aXvzAgJJzUwchB/LgoW4bhmVJFAtLl+3GMIqcAf0WgEQqgtjVE4BLehQmKsw8SFLh2UioFOUSbZRuHs8MvaxIWvh0FzB8GOdVShalsetLnNcD1slNQgVRlw1uNzSXKbWqUUmBbmvGLGvMMZbGNeE=",cellTemplate:function(n,t){t.data.Warehouse===undefined&&u.console_warn("Warehouse is undefined in datasource");var i=t.data.Warehouse!==undefined?t.data.Warehouse===null?"-":t.data.Warehouse:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7831,ID_Column:9946,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",width:63,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7830,ID_Column:9945,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",width:409,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7832,ID_Column:9947,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:82,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7833,ID_Column:9948,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",width:80,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7837,ID_Column:9952,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",width:390,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17105,ID_Column:19393,dataField:"ID_Model",allowFixing:!0,visible:!1,caption:"ID_Model",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17106,ID_Column:19396,dataField:"ID_DocDetail",allowFixing:!0,visible:!1,caption:"ID_DocDetail",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17107,ID_Column:19399,dataField:"ID_Doc",allowFixing:!0,visible:!1,caption:"ID_Doc",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17108,ID_Column:19402,dataField:"SerialNo",allowFixing:!0,visible:!1,caption:"SerialNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17109,ID_Column:19405,dataField:"ID_UOM",allowFixing:!0,visible:!1,caption:"ID_UOM",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17110,ID_Column:19408,dataField:"UnitCost",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"UnitCost",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:317310,ID_Column:1071163,dataField:"Description",allowFixing:!0,visible:!1,caption:"Description",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})