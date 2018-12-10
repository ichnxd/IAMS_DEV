define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_InventoryPerWarehouse"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8775,ModelViewName:"ItemSerialTracking_ListView",StateName:i,ID_View:11253,ModelName:"InventoryHistory",Icon:"FontInSys",DisplayName:"Serial Tracking",ID_ModelDetailView:4187,ID_ViewType:2,ViewControllerName:"InventoryHistory_DetailView",ID_Model:3226,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"VvphDLsWwf2nMsoCsQ+UdIv+G3mVUqDkxsETHC2bX0kTL/M2EMpOo04qCh5XWegwBFs8gm1aUuIAzS8FOSNYk6I2F51BGcyh3Zi+GEzDEiDVgoqmTL3ve7xcqLGZ3V0V",SQLUpdateProc:"ao8IPCN/Fj4AQHne1VJT6zR99/ZLqgTtyedlXC673avUainIHL3MVtjjrbHAOs0L6TIsGFPjfRv8uyjUfzPTDs4yRj/G351bnWFcXbftI4LbpFcysYNP0cKnD9xWPbF/"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="InventoryHistory";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_Column:24547,dataField:"SerialNo",allowFixing:!0,visible:!0,caption:"Serial No.",width:120,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24177,dataField:"Customer",allowFixing:!0,visible:!0,caption:"Customer",width:257,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24180,dataField:"Item",allowFixing:!0,visible:!0,caption:"Item",width:197,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24344,dataField:"Brand",allowFixing:!0,visible:!0,caption:"Brand",width:181,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24347,dataField:"PartNo",allowFixing:!0,visible:!0,caption:"Part No.",width:150,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24350,dataField:"SupplierCode",allowFixing:!0,visible:!0,caption:"SupplierCode",width:150,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24181,dataField:"OnHand",allowFixing:!0,visible:!0,caption:"OnHand",width:253,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24182,dataField:"RefNoIn",allowFixing:!0,visible:!0,caption:"Ref No. In",width:104,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:26372,dataField:"RefNoOutDate",allowFixing:!0,visible:!0,caption:"Ref. Out Date",width:124,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24183,dataField:"RefNoOut",allowFixing:!0,visible:!0,caption:"Ref No. Out",width:109,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317310,ID_Column:1071165,dataField:"Description",allowFixing:!0,visible:!1,caption:"Description",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[{ID:24547,PropertyName:null,Caption:"Serial No."},{ID:24177,PropertyName:null,Caption:"Customer"},{ID:24180,PropertyName:null,Caption:"Item"}];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})