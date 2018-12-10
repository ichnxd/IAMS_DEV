define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5452,ModelViewName:"CostCenter_LookUp_ListView",StateName:i,ID_View:6712,ModelName:"CostCenter",Icon:"mdi mdi-coin",DisplayName:"Cost Center",ID_ModelDetailView:6221,ID_ViewType:2,ViewControllerName:"CostCenter_DetailView",ID_Model:5260,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"6fGgbUT4UT0GzJHA0uSpweN0OrPPVN9VT1xoaLSbCEp8Q0XSvn+DrsmhLx+TZOzfZbDCsNBpljGI2ArP+iv1hkiDEB+f5CsCci0UhIe14zlDSiH+BYs9EkBz7gqftpAb",SQLUpdateProc:"wR4hdav46240qL5mnRPVvjg8ViK36iwoAco4KCeOO9+ShbEWjvLL+PwxEdYfUMhfc+4RChbIUmG1Bpk4JD+kAuj+V7Fv2nY0a4U2N2261U9diCGgQMnZPwoK1SraOAfb"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="CostCenter";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:11430,ID_Column:14145,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11437,ID_Column:14152,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11433,ID_Column:14148,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:11434,ID_Column:14149,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:11438,ID_Column:14153,dataField:"ID_CostCenterGroup",allowFixing:!0,visible:!0,caption:"ID_CostCenterGroup",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:11435,ID_Column:14150,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"V+TqDCpqZOt0ms3HCazidHStQFjsufItMyK4fZgq89Yy1zyPmOnutZT/eMzRi2y1m7Q7KmdkbwaupeEQDDG2E+etvDDoulFbdIHLUOUK/EJRDs5xze6pddES3v2WoTMf",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11439,ID_Column:14154,dataField:"ID_Warehouse",allowFixing:!0,visible:!0,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:11432,ID_Column:14147,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:11431,ID_Column:14146,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19269,ID_Column:23415,dataField:"SeqNo",allowFixing:!0,visible:!1,caption:"SeqNo",allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})