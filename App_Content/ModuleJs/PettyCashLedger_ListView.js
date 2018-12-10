define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9870,ModelViewName:"PettyCashLedger_ListView",StateName:i,ID_View:14561,ModelName:"PettyCash",Icon:"FontInSys",DisplayName:"Petty Cash Ledger",ID_ModelDetailView:6241,ID_ViewType:2,ViewControllerName:"PettyCash_DetailView",ID_Model:5275,DisplayProperty:"Name",Height:null,PageSize:20,IsWordWrap:!1,DataSource:"7uJAdDqaj6SrnbfRASqpgkabqTf1hRl+IIqDeJFw60AyB7vMBHaVg/yM5bEcU8IhZLEMe25mhJPlTc3YNy6uqI1hXyCEI57KYDuRt/UHND5T+z2rHcUsOboi5pnW43gdNGgw63MqXRGO6nW9lvJqoYe5Xybcy7dWs6H2fKmB7AU=",SQLUpdateProc:"iyhlFJf91N8n/wEka14TlAnM/I4uWCpv6M5vqJ4JPSwu+Lrio1f9wsIuyBNct5usNm+xHrXATtt+nK2X06owlHsi7zxnYuYf9ZKlTqV62teTK1ljbvdOE6LLp51VlOGd"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="PettyCash";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];e=[{name:"Amount_Summary",showInColumn:"Amount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.Amount==undefined?Globalize.format(0,"n2"):Globalize.format(u.$Summary.Amount,"n2")}}];t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_Column:268342,dataField:"Date",allowFixing:!0,visible:!0,caption:"Date",width:94,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268353,dataField:"Type",allowFixing:!0,visible:!0,caption:"Type",width:145,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268343,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"Document No.",width:110,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268339,dataField:"Amount",allowFixing:!0,format:"fixedPoint",precision:2,visible:!0,caption:"Total Amount",width:122,alignment:"right",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{ID_Column:268340,dataField:"Balance",allowFixing:!0,format:"fixedPoint",precision:2,visible:!0,caption:"Balance",width:97,alignment:"right",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_Column:268341,dataField:"CAFund",allowFixing:!0,visible:!1,caption:"CAFund",width:593,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268348,dataField:"Liquidation",allowFixing:!0,visible:!0,caption:"LQ No.",width:105,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268352,dataField:"Replenishment",allowFixing:!0,visible:!0,caption:"RP No.",width:96,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268344,dataField:"Employee",allowFixing:!0,visible:!0,caption:"Employee",width:174,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268347,dataField:"ID_ReleasedBy",allowFixing:!0,visible:!1,caption:"ID_ReleasedBy",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268349,dataField:"PCCNo",allowFixing:!0,visible:!1,caption:"PCCNo",width:325,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268350,dataField:"ReleasedBy",allowFixing:!0,visible:!0,caption:"ReleasedBy",width:165,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268351,dataField:"ReleasedDate",allowFixing:!0,visible:!0,caption:"Released Date",width:313,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:268346,dataField:"ID_Employee",allowFixing:!0,visible:!1,caption:"ID_Employee",width:298,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})