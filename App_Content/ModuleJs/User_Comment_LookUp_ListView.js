define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9854,ModelViewName:"User_Comment_LookUp_ListView",StateName:i,ID_View:14529,ModelName:"User_Comment",Icon:"mdi mdi-comment-account-outline",DisplayName:"User Comment",ID_ModelDetailView:10428,ID_ViewType:2,ViewControllerName:"User_Comment_DetailView",ID_Model:12461,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"BSlG8zmVj5ThSMGPkzY6EsZQSj1FnjZVnlygJpLN9ukE9nKHEyXbf3XBr3kM5UoNosDYHxtMTIHgufVIKWIykUrdRiuSFkJnV6TKtD5hW4pRr137y/DaVlbMasv+XVz5",SQLUpdateProc:"CPApuTzQTFa4mWYlFUi0LmaMpb8ql1qryCZHmV7Xy8rwP4NSyz1M/kNou3EXG7i4DLYLEdG6ZaHU/nOiWEPd2CxzmmpzxXCfeEWz3B1TEzu1ur6uTLssTlSM7wVzycct"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="User_Comment";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:224198,ID_Column:267952,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224201,ID_Column:267955,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224206,ID_Column:267960,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224204,ID_Column:267958,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224205,ID_Column:267959,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:224202,ID_Column:267956,dataField:"ID_CurrentObject",allowFixing:!0,visible:!0,caption:"ID_CurrentObject",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224203,ID_Column:267957,dataField:"ID_Model",allowFixing:!0,visible:!0,caption:"ID_Model",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224200,ID_Column:267954,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224199,ID_Column:267953,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})