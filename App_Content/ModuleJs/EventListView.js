define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_Event"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5463,ModelViewName:"Event_ListView",StateName:i,ID_View:6729,ModelName:"Event",Icon:"mdi mdi-calendar-text",DisplayName:"Trade Shows/Events",ID_ModelDetailView:6226,ID_ViewType:2,ViewControllerName:"Event_DetailView",ID_Model:5265,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"21eI/YsA7XtdoVfx2+BWofH6nuHDup8ugCkuLRIkA1tGzObrtIi47N+QFCXKXFobBA5kOXM0rLYvcUiZ587fmp79nJmgnVXK6dfz5asFTZZmxgGCPDz5Wl7vCgOVyNIO",SQLUpdateProc:"JqLIUyYqceUqnbhKNUW/bICU84XAfKKzfWKKhrViLA+VI9I3rnjrTESaUTTR2xQ3Ja2JTvBjpUoOUshtTVHUzUHLzcMDSnbXt73E8zW67wxb/IejmNok4FKeQSxdBtOw"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Event";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:12533,ID_Column:14391,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12534,ID_Column:14392,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:235,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12535,ID_Column:14393,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:91,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18312,ID_Column:21623,dataField:"Days",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Days",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18330,ID_Column:21655,dataField:"TotalExpenses",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Expenses",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18331,ID_Column:21657,dataField:"TotalSales",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Sales",width:102,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18332,ID_Column:21659,dataField:"TotalInquiry",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Inquiry",width:111,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:12536,ID_Column:14394,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:138,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12537,ID_Column:14395,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12538,ID_Column:14396,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:162,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"YNA8G4FAdFgqbal3X2D3WlbJ0WjIELEMiYuTztgkjSIlAqYk/Mi9gcuQLKOpsI0kXnheTWBE3XDbwzcGNP3TdtjdWEDuw1F+/kQZv44vgVh+BDckaJeEYKLtX45d4jBO",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12539,ID_Column:14397,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"ftWPrwQTN7FJDaKelrSxPb9levPeBANuLw0TMk9gJW/YhsI7gko71wg67fAEyG4VLG4KUBePVjlKyEdXaRQrrPcAehffSopIV7iKb5pZVKQ/6Fr+jzRnSRt7ftm1A21v",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:12541,ID_Column:14399,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18308,ID_Column:21615,dataField:"Venue",allowFixing:!0,visible:!1,caption:"Venue",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18309,ID_Column:21617,dataField:"BootNo",allowFixing:!0,visible:!1,caption:"BootNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18310,ID_Column:21619,dataField:"StartDate",allowFixing:!0,visible:!1,caption:"StartDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:18311,ID_Column:21621,dataField:"EndDate",allowFixing:!0,visible:!1,caption:"EndDate",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:18313,ID_Column:21625,dataField:"ID_Customer",allowFixing:!0,visible:!1,caption:"ID_Customer",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18314,ID_Column:21627,dataField:"ID_Contact",allowFixing:!0,visible:!1,caption:"Contact",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18315,ID_Column:21629,dataField:"Address",allowFixing:!0,visible:!1,caption:"Address",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18316,ID_Column:21631,dataField:"Website",allowFixing:!0,visible:!1,caption:"Website",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18317,ID_Column:21633,dataField:"Email",allowFixing:!0,visible:!1,caption:"Email",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18318,ID_Column:21635,dataField:"PhoneNo",allowFixing:!0,visible:!1,caption:"PhoneNo",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})