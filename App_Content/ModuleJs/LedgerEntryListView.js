define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:4447,ModelViewName:"LedgerEntry_ListView",StateName:i,ID_View:5701,ModelName:"LedgerEntry",Icon:"FontInSys",DisplayName:"Ledger Entry",ID_ModelDetailView:5218,ID_ViewType:2,ViewControllerName:"LedgerEntry_DetailView",ID_Model:4257,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"xqrPgfQ1rbW9Zj1GwDlCw82K0AdFwdSxtwO4udRJZ9jroyC/nCHMtLUAcAyhcUs3VopaMfMrt67PajHhGXYTLcI10HrZHt9mQNdWq6d0V85Eaz9wBQ4aFV7ouvv/WBMt",SQLUpdateProc:"IWTQQ0SjWtnv/Sq/Wwd55fsEOvPgZROZCvN2XDBCWZPImfFDwzBjoWzePnyjpES7HhJgAIj5AECFMMSxgM8te0WvN2yw6apf6Z0OY9JtLWRJ02hNWesOOKLty3oJjqtK"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="LedgerEntry";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:10401,ID_Column:13101,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10396,ID_Column:13096,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:10397,ID_Column:13097,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:10410,ID_Column:13110,dataField:"BOA",allowFixing:!0,visible:!0,caption:"BOA",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_BOA",cellTemplate:function(n,t){t.data.BOA===undefined&&u.console_warn("BOA is undefined in datasource");var i=t.data.BOA!==undefined?t.data.BOA===null?"-":t.data.BOA:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:10398,ID_Column:13098,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"nGDNdQ+RwLeyrbcbMAasI9d6nJ6p3MpI5j+u1KQaP1+x92Ve7h0q4lYXhnbnmT4TKsKCWcrQiiWO1VLuZOZwsDc3dXDloB7CW3Sgnr/sqM6ZVzN3tPhSaxfTHxBinpY/",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10402,ID_Column:13102,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:10399,ID_Column:13099,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"U/FEr0uwBlojZf2c7CP1zlb8iP99B0hNf9kxD/v0z19V3T7x9lZpBTN9wCBJpjwhTJdkC7/+4aIH6yrAiQlwer8FS8TMD4c/H6A0TvJ9bTUIUXfnOLCRcCZp0e+i1/6s",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10408,ID_Column:13108,dataField:"Month",allowFixing:!0,visible:!0,caption:"Month",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Month",cellTemplate:function(n,t){t.data.Month===undefined&&u.console_warn("Month is undefined in datasource");var i=t.data.Month!==undefined?t.data.Month===null?"-":t.data.Month:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10403,ID_Column:13103,dataField:"PostedBy",allowFixing:!0,visible:!0,caption:"Posted By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_PostedBy",cellTemplate:function(n,t){t.data.PostedBy===undefined&&u.console_warn("PostedBy is undefined in datasource");var i=t.data.PostedBy!==undefined?t.data.PostedBy===null?"-":t.data.PostedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:10405,ID_Column:13105,dataField:"Reference",allowFixing:!0,visible:!0,caption:"Reference",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Reference",cellTemplate:function(n,t){t.data.Reference===undefined&&u.console_warn("Reference is undefined in datasource");var i=t.data.Reference!==undefined?t.data.Reference===null?"-":t.data.Reference:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:10395,ID_Column:13095,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:10407,ID_Column:13107,dataField:"LedgerEntryDate",allowFixing:!0,visible:!0,caption:"Ledger Entry",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:10394,ID_Column:13094,dataField:"Name",allowFixing:!0,visible:!0,caption:"Ledger No.",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:10404,ID_Column:13104,dataField:"PostedDate",allowFixing:!0,visible:!0,caption:"Posted Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:10406,ID_Column:13106,dataField:"RefNo",allowFixing:!0,visible:!0,caption:"Ref No",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10411,ID_Column:13111,dataField:"TotalAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Amt",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10412,ID_Column:13112,dataField:"TransactionModule",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Transaction Module",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:10409,ID_Column:13109,dataField:"Year",allowFixing:!0,visible:!0,caption:"Year",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17861,ID_Column:20737,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})