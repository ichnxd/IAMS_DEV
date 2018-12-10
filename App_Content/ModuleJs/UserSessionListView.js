define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:1117,ModelViewName:"UserSession_ListView",StateName:i,ID_View:2164,ModelName:"UserSession",Icon:"mdi mdi-account-convert",DisplayName:"User Session",ID_ModelDetailView:2053,ID_ViewType:2,ViewControllerName:"UserSession_DetailView",ID_Model:1092,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"UJbp1XBoameIyUYAdPozOzsAgr40Z71xCe+zz8vcWax4hkDNiPpJwyAPzZjHdk+WFyRp7Cp+fR5gumpb7PqdAH0HujzB3Tvmu7/Iucr7+nGxeuV36FTLNn2AAkBOz1wJdGNFyVXlLMQ6npo18EnsPJLAUjzbxD3CorC1SYNy10s=",SQLUpdateProc:"Vh+nXxcOHrB4I244hvtHbO4tpn0Anev/uLAM9NjTsvbXlt19LCZz8E9iOXIx+pck935tEJDhWmixJM+EQQCSYwpDdeCHEmsqBuZ80qz4xrE2vhj+ocRJkrSkJCd0z2oE"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="UserSession";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:3810,ID_Column:4104,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3811,ID_Column:4105,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3812,ID_Column:4106,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:3819,ID_Column:4113,dataField:"User",allowFixing:!0,visible:!0,caption:"User",width:195,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_User",SQL:"OUJgB9VKT1LJFWqi6/upgzLqxNHn8JHtPQGfK2Y1TN5K3MP4Srx5B3vjJjD1iIaZVvPx+n3BYBuwNM9DQdsKo6qg6Qrf810uoLexqUY9BwWnFE/aLA1VcyGiHLBTAFnE",cellTemplate:function(n,t){t.data.User===undefined&&u.console_warn("User is undefined in datasource");var i=t.data.User!==undefined?t.data.User===null?"-":t.data.User:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_Column:24610,dataField:"Department",allowFixing:!0,visible:!0,caption:"Department",width:270,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18606,ID_Column:22157,dataField:"IPAddress",allowFixing:!0,visible:!0,caption:"IP Address",width:126,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17773,ID_Column:20560,dataField:"ComputerName",allowFixing:!0,visible:!0,caption:"Computer Name",width:126,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3817,ID_Column:4111,dataField:"StartTime",allowFixing:!0,visible:!0,caption:"Start Time",width:141,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:3818,ID_Column:4112,dataField:"EndTime",allowFixing:!0,visible:!0,caption:"End Time",width:210,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17772,ID_Column:20558,dataField:"MachineName",allowFixing:!0,visible:!0,caption:"Machine Name",width:146,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3813,ID_Column:4107,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:121,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:3814,ID_Column:4108,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",width:106,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"vYng1h/QI+GUYcpZR6OLYHPy5iyBvHT/LTtsNPhDrfKIwF7+u4Kzt6b1m2NomaAG2nqEny9W59lsM92QuyVWpiu0btkfAODAoMUMoom0WHQS645gs9vLS+urw7RVHqAk",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:3816,ID_Column:4110,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3820,ID_Column:4114,dataField:"SessionID",allowFixing:!0,visible:!1,caption:"SessionID",width:114,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:3821,ID_Column:4115,dataField:"IsSessionExpired",allowFixing:!0,visible:!1,caption:"Session Expired",width:117,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7887,ID_Column:10112,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},SQL:"vI9W+xxvq89gVqkSHli/ShIaR7fJh3wGvbHN+ez1khZRMsxP6pFSgIHqCIvLhxy6r/GqaXiczrYOogxU7rigUvbA7IDNgmDPgUnDZJ0VIY7lzEYMKc75CMIj9MzbwAB9MdgQwXcmVTWZw9LX44dAXSD4+Tf8bGKpW6nc2xnzKAI="}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})