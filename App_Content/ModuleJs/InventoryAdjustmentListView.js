define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryAdjustment"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3401,ModelViewName:"InventoryAdjustment_ListView",StateName:i,ID_View:4631,ModelName:"InventoryAdjustment",Icon:"fa fa-expand",DisplayName:"Inventory Adjustment",ID_ModelDetailView:4195,ID_ViewType:2,ViewControllerName:"InventoryAdjustment_DetailView",ID_Model:3234,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"BptZ9DhIC6+9de0bvit49LbTQQx9a8vBL959kHHqA54Agot6UL4tcCm++1j/p1DKS3IG8H8PWM8jSLYdXWRrULxZVMXSk7JuRyJ8Uvw/8uEs0KijdcFZQafxhqfGAxte9aNsmnnxXTbQdJyucIP3i+2IExfXTWUuYeVEmCKJ8m4=",SQLUpdateProc:"jb9LC02YEHMHdgkvvaLW3mAnhrWOcObrsOxQ7jCAcVkVUX1anPLrXYgvZM8y9NzOC0jquAOeIFubNr+aK8CJByu4JwdeBiCB91cVPj2SDGXHWrhE+sZk6PMbWBm8c8cl"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="InventoryAdjustment";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:7954,ID_Column:10246,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"IA No",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7960,ID_Column:10252,dataField:"Date",allowFixing:!0,visible:!0,caption:"IA Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:7953,ID_Column:10245,dataField:"Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},refDataField:"ID_Warehouse",SQL:"A7CsIK1rDIXdvLsnE/dxgTFHEdf1G+Mf94gOhGxPAwCaZjt55gVgMvnqjM3HAscAlk9CJ1afc4i9KZ0GDkzJRkDPt5z6BXvjQYdIylkT7t4dU6fgUcCvMXVv+rHpNLVNfqy5jarfg0wqY6fLKoeQegy8JRtFpeNgzf+1htxv9T0=",cellTemplate:function(n,t){t.data.Warehouse===undefined&&u.console_warn("Warehouse is undefined in datasource");var i=t.data.Warehouse!==undefined?t.data.Warehouse===null?"-":t.data.Warehouse:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7959,ID_Column:10251,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:17253,ID_Column:19690,dataField:"InventoryAdjustmentType",allowFixing:!0,visible:!0,caption:"Type",width:93,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_InventoryAdjustmentType",cellTemplate:function(n,t){t.data.InventoryAdjustmentType===undefined&&u.console_warn("InventoryAdjustmentType is undefined in datasource");var i=t.data.InventoryAdjustmentType!==undefined?t.data.InventoryAdjustmentType===null?"-":t.data.InventoryAdjustmentType:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17570,ID_Column:20178,dataField:"Reason",allowFixing:!0,visible:!0,caption:"Reason",width:108,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7949,ID_Column:10241,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:255,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"dPuiUtfM5TRada/IIPfbrRFwdhA9QNpmd1199GTCjs6kcchRAluguFKd0E8y52L+4Qf03E9q88GgzwdodZbFT+kQ/H8xd2W/m7Qo2R4Q2QL1dSihc3XYPwdBwJcwt36K",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17978,ID_Column:20965,dataField:"ReasonOfAdjustment",allowFixing:!0,visible:!1,caption:"ReasonOfAdjustment",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})