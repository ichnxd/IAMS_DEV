define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5445,ModelViewName:"BookOfAccount_ListView",StateName:i,ID_View:6698,ModelName:"BookOfAccount",Icon:"fa fa-book",DisplayName:"Book of Account",ID_ModelDetailView:6217,ID_ViewType:2,ViewControllerName:"BookOfAccount_DetailView",ID_Model:5256,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"vsmS8uA3Zoc6/fz6dmpqtCXVrIGIOLRVXe/pl7CP2jojOalubQCIp0T4cjiKyF5980rPbIXzgvW2viAJXTWtUTRJyB5RjOLLl1XTX4Gpy/nAC232LGrysWN1zl7HdbuA",SQLUpdateProc:"qNj5FYwU3VYuAu2wf7Oba0i08H0DSbXnAXrMjtdV6i3Q4ENkVKWqKXPHivPIgc4Ut19+R3pEDNzGn2pJE8QRkcnUxA4XguQN9L9EWjKaEWA4k5t6z+FhWJfg54h6O5J2"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="BookOfAccount";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:11382,ID_Column:14053,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",width:63,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11383,ID_Column:14054,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:255,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18449,ID_Column:21874,dataField:"IsForManual",allowFixing:!0,visible:!0,caption:"For Manual",width:81,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:11384,ID_Column:14055,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",width:110,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:11385,ID_Column:14056,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",width:555,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})