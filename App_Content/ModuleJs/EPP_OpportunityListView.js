define(["app","baseListViewController","/JsApp/GetScript?Url=Salespipeline%2fVC_EPPOpportunity"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8809,ModelViewName:"EPP_Opportunity_ListView",StateName:i,ID_View:12327,ModelName:"EPP_Opportunity",Icon:"mdi mdi-account-star",DisplayName:"EPP Opportunity",ID_ModelDetailView:9405,ID_ViewType:2,ViewControllerName:"EPP_Opportunity_DetailView",ID_Model:11438,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"qiKIXBlIVNtmedPZ/H9DQxoCeOOY//vrR5JCGhE4TGJ9cKlRZ9wczZ7KN8pDpeJ0J9KMbaYYzfHQmJr5M40RfFoAeejMiNLRdtaDGoufU0/5USh/yH03lXruV5jKgMPV",SQLUpdateProc:"gfJTmePBizSLlG+vpzuA0eJ5fQfK+XYnQ7dQEKWOiPmSBhP5BGURtVa+aLjBdeKwlP+VXUslZPkNDSQUbTwhowSaFFdyn/muKhYLERrIriYEOXY7LzJAChjazDXEf0HW"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="EPP_Opportunity";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:19945,ID_Column:24880,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:150,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19946,ID_Column:24881,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:105,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19947,ID_Column:24882,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:150,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:19949,ID_Column:24884,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",width:150,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19951,ID_Column:24886,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",width:150,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19953,ID_Column:24888,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",width:150,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19954,ID_Column:24889,dataField:"Customer",allowFixing:!0,visible:!0,caption:"Customer",width:137,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Customer",cellTemplate:function(n,t){t.data.Customer===undefined&&u.console_warn("Customer is undefined in datasource");var i=t.data.Customer!==undefined?t.data.Customer===null?"-":t.data.Customer:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:22416,ID_Column:26775,dataField:"NoOfRegisteredEmployees",allowFixing:!0,visible:!0,caption:"No. of Reg. Employees",width:135,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:22415,ID_Column:26773,dataField:"NoOfEmployees",allowFixing:!0,visible:!0,caption:"No. of Employees",width:111,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19955,ID_Column:24890,dataField:"Stage",allowFixing:!0,visible:!0,caption:"Stage",width:150,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_EPP_Stage",cellTemplate:function(n,t){t.data.Stage===undefined&&u.console_warn("Stage is undefined in datasource");var i=t.data.Stage!==undefined?t.data.Stage===null?"-":t.data.Stage:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},groupIndex:1},{editorOptions:{min:0},ID_ModelProperty:19956,ID_Column:24891,dataField:"TargetPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Target Price",width:96,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19957,ID_Column:24892,dataField:"ContractPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Contract Price",width:102,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19948,ID_Column:24883,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:150,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19958,ID_Column:24893,dataField:"ActualSales",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Actual Sales",width:118,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19950,ID_Column:24885,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:170,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19959,ID_Column:24894,dataField:"TaxScheme",allowFixing:!0,visible:!0,caption:"Tax Scheme",width:164,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_TaxScheme",cellTemplate:function(n,t){t.data.TaxScheme===undefined&&u.console_warn("TaxScheme is undefined in datasource");var i=t.data.TaxScheme!==undefined?t.data.TaxScheme===null?"-":t.data.TaxScheme:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19960,ID_Column:24895,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"DocumentNo",width:150,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19961,ID_Column:24896,dataField:"DateEngaged",allowFixing:!0,visible:!0,caption:"Date Engagede",width:150,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19962,ID_Column:24897,dataField:"WonLostDate",allowFixing:!0,visible:!0,caption:"Won Lost Date",width:150,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19963,ID_Column:24898,dataField:"BusinessUnit",allowFixing:!0,visible:!0,caption:"Business Unit",width:150,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_BusinessUnit",cellTemplate:function(n,t){t.data.BusinessUnit===undefined&&u.console_warn("BusinessUnit is undefined in datasource");var i=t.data.BusinessUnit!==undefined?t.data.BusinessUnit===null?"-":t.data.BusinessUnit:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19964,ID_Column:24899,dataField:"ContactPerson",allowFixing:!0,visible:!0,caption:"Contact",width:150,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Contact",cellTemplate:function(n,t){t.data.ContactPerson===undefined&&u.console_warn("ContactPerson is undefined in datasource");var i=t.data.ContactPerson!==undefined?t.data.ContactPerson===null?"-":t.data.ContactPerson:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19965,ID_Column:24900,dataField:"ID_PaymentTerm",allowFixing:!0,visible:!0,caption:"ID_PaymentTerm",width:94,allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})