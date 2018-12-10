define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:4442,ModelViewName:"AcctYear_LookUp_ListView",StateName:i,ID_View:5694,ModelName:"AcctYear",Icon:"mdi mdi-calendar-range",DisplayName:"Accounting Year",ID_ModelDetailView:5216,ID_ViewType:2,ViewControllerName:"AcctYear_DetailView",ID_Model:4255,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"dCUdEpyztQC5YKWhXah3D8kZIFbksnC4O7yCC70Xbss4hCymv+bCBQvBsywWtHuXBnJmmzeFiJ2YIYslQXzZp96k4mGYwjqn0R6hlWbvaiTUx2qWxJBpg/4JrheWCLn1",SQLUpdateProc:"rd9EGWxBiaytjgeotVavNbs7I6RRKFISKgu+B5+GdsTGrYh80Cutr+uC08MMja02zeZwobWnDf/vjRXr8N+/IrFRIOthlRGiuzC25oJlVkjp/ASBuSo4MZsJtshupaSt"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="AcctYear";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:10370,ID_Column:13028,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10378,ID_Column:13036,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10373,ID_Column:13031,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:10374,ID_Column:13032,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:10375,ID_Column:13033,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"PWMV3JnLOCBJz26OKSnLJRsiifgdLGWSmvGpE0tbf0RowoIcvZQIAHJTHn/REQ29aYQygQnsAh0UfA0hera2T1tBEnRDGZ8gmAhjQ2UBG9rpjri2Hi0uDGDX/kbA1C1R",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10376,ID_Column:13034,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"7kItSvxu7FPR7pM9dx8ckM4bgTRgaDFVvM4paQMnkVIlR02bfEEDKZs1irdubsINTPwKMCT0X0FxbYAmqsUQVlvfK+UlXdltWuxhU9m8lxvWFgvpP0U/Nm2JCfxVPd8x",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:10372,ID_Column:13030,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:10371,ID_Column:13029,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})