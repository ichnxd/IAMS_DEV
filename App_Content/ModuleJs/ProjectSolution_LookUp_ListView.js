define(["app","baseListViewController","/JsApp/GetScript?Url=VC_BOM"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9899,ModelViewName:"ProjectSolution_LookUp_ListView",StateName:i,ID_View:15619,ModelName:"ProjectSolution",Icon:"FontInSys",DisplayName:"Bill of Materials",ID_ModelDetailView:10450,ID_ViewType:2,ViewControllerName:"ProjectSolution_DetailView",ID_Model:12483,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"/tDjtxq1VyY1KxpKAny0nfbXn9U/3cLkg3y0Sq+i+oVdm35Yyim8CqMU8LP87XJrjsIS7/FNXDf9XMfizXKbRZfNrJPxWfukInEYMFUN4BSaHMMbhGuqt6p2xwk2VnlT",SQLUpdateProc:"8RuaZO75mwm3eImkIDrFRonW7H3ozJaBs2zKYGUMwVDZ/CCVmwap/NPSZZbzi7iS0gCSh3Id03YC8iipAb8QejqLo4BGyz9CTLQet6Qs9tuAsmTo63+JA1sqyhkaS3vq"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="ProjectSolution";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:224683,ID_Column:1069814,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224691,ID_Column:1069815,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224686,ID_Column:1069816,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224687,ID_Column:1069817,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224688,ID_Column:1069820,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:224689,ID_Column:1069821,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224685,ID_Column:1069822,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224684,ID_Column:1069823,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224814,ID_Column:1070057,dataField:"ID_Customer",allowFixing:!0,visible:!1,caption:"ID_Customer",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224815,ID_Column:1070059,dataField:"ID_Opportunity",allowFixing:!0,visible:!1,caption:"ID_Opportunity",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224816,ID_Column:1070061,dataField:"Date",allowFixing:!0,visible:!1,caption:"Date",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224830,ID_Column:1070089,dataField:"ID_AccountExecutive",allowFixing:!0,visible:!1,caption:"ID_AccountExecutive",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224831,ID_Column:1070091,dataField:"TradeName",allowFixing:!0,visible:!1,caption:"TradeName",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224832,ID_Column:1070093,dataField:"Branch",allowFixing:!0,visible:!1,caption:"Branch",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224833,ID_Column:1070095,dataField:"Category",allowFixing:!0,visible:!1,caption:"Category",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224834,ID_Column:1070097,dataField:"Remarks",allowFixing:!0,visible:!1,caption:"Remarks",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224835,ID_Column:1070099,dataField:"ProjectName",allowFixing:!0,visible:!1,caption:"ProjectName",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224836,ID_Column:1070101,dataField:"ScopeOfWork",allowFixing:!0,visible:!1,caption:"ScopeOfWork",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224837,ID_Column:1070103,dataField:"Notations",allowFixing:!0,visible:!1,caption:"Notations",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224845,ID_Column:1070119,dataField:"AttachmentA",allowFixing:!0,visible:!1,caption:"AttachmentA",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224846,ID_Column:1070121,dataField:"AttachmentB",allowFixing:!0,visible:!1,caption:"AttachmentB",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224847,ID_Column:1070123,dataField:"AttachmentC",allowFixing:!0,visible:!1,caption:"AttachmentC",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224853,ID_Column:1070135,dataField:"ID_BOM",allowFixing:!0,visible:!1,caption:"ID_BOM",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224968,ID_Column:1070364,dataField:"isTemplate",allowFixing:!0,visible:!1,caption:"isTemplate",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224821,ID_Column:1070071,dataField:"FilingStatus",allowFixing:!0,visible:!1,caption:"Filing Status",width:100,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:224822,ID_Column:1070073,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224823,ID_Column:1070075,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224824,ID_Column:1070077,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224825,ID_Column:1070079,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224827,ID_Column:1070083,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317463,ID_Column:1071492,dataField:"TemplatePath",allowFixing:!0,visible:!1,caption:"TemplatePath",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})