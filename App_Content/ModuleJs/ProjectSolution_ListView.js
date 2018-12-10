define(["app","baseListViewController","/JsApp/GetScript?Url=VC_BOM"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:9900,ModelViewName:"ProjectSolution_ListView",StateName:i,ID_View:15620,ModelName:"ProjectSolution",Icon:"FontInSys",DisplayName:"Bill of Materials",ID_ModelDetailView:10450,ID_ViewType:2,ViewControllerName:"ProjectSolution_DetailView",ID_Model:12483,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"EoMPwBoDO1/RTbXmxFfvPe9Y6wwYopBCeCwcG5CuefAwHW59PxwQdq4X21OEWyNgsP8M6ld8djJQFBhlj9rwUK08PoxI3u5nKrVXJuROjVKHnzAhKu0gvUaMZH/z8Y7c",SQLUpdateProc:"teP31Gy9KszYE9dKTa3MMrZuMrN6qQVYpuHk0JZ0M2IYjS1aaP0RA0Pc3H1NNhT2C5uAd+XwdGZd2PmQPd5DnSBSY10yzBGZoG8DGKem5ThXz7+/ghKqN1EgWzLfoqIm"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="ProjectSolution";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:224684,ID_Column:1069833,dataField:"Name",allowFixing:!0,visible:!0,caption:"BOM No.",width:139,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224816,ID_Column:1070062,dataField:"Date",allowFixing:!0,visible:!0,caption:"BOM Date",width:122,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224815,ID_Column:1070060,dataField:"Opportunity",allowFixing:!0,visible:!0,caption:"OPP No.",width:133,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Opportunity",cellTemplate:function(n,t){t.data.Opportunity===undefined&&u.console_warn("Opportunity is undefined in datasource");var i=t.data.Opportunity!==undefined?t.data.Opportunity===null?"-":t.data.Opportunity:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224835,ID_Column:1070100,dataField:"ProjectName",allowFixing:!0,visible:!0,caption:"Project Name",width:138,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224683,ID_Column:1069824,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224691,ID_Column:1069825,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224686,ID_Column:1069826,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224687,ID_Column:1069827,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224689,ID_Column:1069831,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224685,ID_Column:1069832,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224823,ID_Column:1070076,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224825,ID_Column:1070080,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:224827,ID_Column:1070084,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224832,ID_Column:1070094,dataField:"Branch",allowFixing:!0,visible:!1,caption:"Branch",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224833,ID_Column:1070096,dataField:"Category",allowFixing:!0,visible:!1,caption:"Category",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224834,ID_Column:1070098,dataField:"Remarks",allowFixing:!0,visible:!1,caption:"Remarks",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224836,ID_Column:1070102,dataField:"ScopeOfWork",allowFixing:!0,visible:!1,caption:"ScopeOfWork",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224837,ID_Column:1070104,dataField:"Notations",allowFixing:!0,visible:!1,caption:"Notations",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224845,ID_Column:1070120,dataField:"AttachmentA",allowFixing:!0,visible:!1,caption:"AttachmentA",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224846,ID_Column:1070122,dataField:"AttachmentB",allowFixing:!0,visible:!1,caption:"AttachmentB",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224847,ID_Column:1070124,dataField:"AttachmentC",allowFixing:!0,visible:!1,caption:"AttachmentC",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224822,ID_Column:1070074,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"Approved By",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224824,ID_Column:1070078,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"Date Approved",width:133,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:224821,ID_Column:1070072,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:100,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:224688,ID_Column:1069830,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",width:149,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:224853,ID_Column:1070136,dataField:"ID_BOM",allowFixing:!0,visible:!1,caption:"ID_BOM",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224814,ID_Column:1070058,dataField:"ID_Customer",allowFixing:!0,visible:!1,caption:"Client",width:176,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224831,ID_Column:1070092,dataField:"TradeName",allowFixing:!0,visible:!0,caption:"Trade Name",width:893,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224830,ID_Column:1070090,dataField:"BDM",allowFixing:!0,visible:!0,caption:"BDM",width:280,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_AccountExecutive",cellTemplate:function(n,t){t.data.BDM===undefined&&u.console_warn("BDM is undefined in datasource");var i=t.data.BDM!==undefined?t.data.BDM===null?"-":t.data.BDM:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:224968,ID_Column:1070365,dataField:"isTemplate",allowFixing:!0,visible:!1,caption:"isTemplate",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})