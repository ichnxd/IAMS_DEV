define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8741,ModelViewName:"ApproverMatrix_Summary_ListView",StateName:i,ID_View:11201,ModelName:"ApproverMatrix_Summary",Icon:"mdi mdi-thumbs-up-down",DisplayName:"Approver Matrix Summary",ID_ModelDetailView:9372,ID_ViewType:2,ViewControllerName:"ApproverMatrix_Summary_DetailView",ID_Model:8405,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"1qXbi/XPWQPIVYN2l2RtmLHgHK1HchmrRRh+HH9Gb7KAMLxyRtObTPmNjzJvjOSO6j3hspPN9q2aLdLGu0305WcNE0pMT/4I+mqBl1DzfogSRty1iQ5dDKFONoudXnuyFaSQ0MtYQJbfsg2tNHGa90fY1Dtwr8mPAhupMMBjyck=",SQLUpdateProc:"FPS1HBGm3W002EdoKn5MuUdyel5fUxLZYvMRsMWPEB2ntXP122nFDeamuxuWVFYWxzRLciigJ98wXfAG0OQM3ef4txTYSlFaUV9bwJjAJ5QGANEKfOYvqWRYTY37+l5F"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="ApproverMatrix_Summary";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:19185,ID_Column:23265,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19188,ID_Column:23268,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19189,ID_Column:23269,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19190,ID_Column:23270,dataField:"CreatedBy",allowFixing:!0,visible:!1,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19193,ID_Column:23273,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19186,ID_Column:23266,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:102,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19194,ID_Column:23274,dataField:"Employee",allowFixing:!0,visible:!0,caption:"Employee",width:300,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Employee",cellTemplate:function(n,t){t.data.Employee===undefined&&u.console_warn("Employee is undefined in datasource");var i=t.data.Employee!==undefined?t.data.Employee===null?"-":t.data.Employee:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19200,ID_Column:23280,dataField:"ID_CurrentObject",allowFixing:!0,visible:!0,caption:"Key Object",width:127,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19196,ID_Column:23276,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:140,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:19197,ID_Column:23277,dataField:"DateApproved",allowFixing:!0,visible:!0,caption:"Date Approved",width:153,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19198,ID_Column:23278,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"Date Cancelled",width:102,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19199,ID_Column:23279,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",width:111,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19201,ID_Column:23281,dataField:"Model",allowFixing:!0,visible:!0,caption:"Model",width:207,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Model",cellTemplate:function(n,t){t.data.Model===undefined&&u.console_warn("Model is undefined in datasource");var i=t.data.Model!==undefined?t.data.Model===null?"-":t.data.Model:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19191,ID_Column:23271,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",width:201,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19202,ID_Column:23282,dataField:"IsSuperApprover",allowFixing:!0,visible:!1,caption:"Super Approver",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19204,ID_Column:23286,dataField:"ID_LastApprover",allowFixing:!0,visible:!1,caption:"ID_LastApprover",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19187,ID_Column:23267,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19195,ID_Column:23275,dataField:"Level",allowFixing:!0,visible:!1,caption:"Level",width:129,allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})