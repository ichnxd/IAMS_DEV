define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%5cAP%5cPettyCash%5cVC_PettyCashCustodian"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8729,ModelViewName:"PettyCashCustodian_ListView",StateName:i,ID_View:11176,ModelName:"PettyCashCustodian",Icon:"FontInSys",DisplayName:"Petty Cash Custodian",ID_ModelDetailView:9365,ID_ViewType:2,ViewControllerName:"PettyCashCustodian_DetailView",ID_Model:8399,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"AngL4nUMQRdicN3ARJSZwkzr3aij8ruE5Kktz5ZuOTG3dqAmy05mfyDcCiAOc1N0DyH45s5ltQVbvbbxo4D7xsNbwv9UhGJ/7WVrPn23Rg6bcaiCNzqbiDDnelLuwlq4MZjcsBu1wnIrzMD4xrWqB61LAwCsrZYvMMYNQMlf9Ns=",SQLUpdateProc:"fgS5CcnIlg+fZI14Ykh+hqLohr7MuWsMvO19+k1G2xJ+LfltbflW6clYMYy8X9Yizc2EfCeW+2gLAhAZkki4HbiwxrjX1FMfb/gdA43CgAzHYLXuGonA4fLgbk+dEku5"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="PettyCashCustodian";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:19024,ID_Column:22931,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19033,ID_Column:22941,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"P.C.C. No.",width:108,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19025,ID_Column:22932,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19026,ID_Column:22933,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19037,ID_Column:22949,dataField:"User",allowFixing:!0,visible:!1,caption:"User",width:313,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_User",cellTemplate:function(n,t){t.data.User===undefined&&u.console_warn("User is undefined in datasource");var i=t.data.User!==undefined?t.data.User===null?"-":t.data.User:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19057,ID_Column:23017,dataField:"Employee",allowFixing:!0,visible:!0,caption:"Employee",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Employee",cellTemplate:function(n,t){t.data.Employee===undefined&&u.console_warn("Employee is undefined in datasource");var i=t.data.Employee!==undefined?t.data.Employee===null?"-":t.data.Employee:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19035,ID_Column:22945,dataField:"CAFund",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Initial Fund",width:130,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19036,ID_Column:22947,dataField:"CABalance",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Remaining Fund",width:117,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19027,ID_Column:22934,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:102,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19028,ID_Column:22935,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19029,ID_Column:22936,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:164,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CreatedBy",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19030,ID_Column:22937,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_LastModifiedBy",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19032,ID_Column:22939,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19034,ID_Column:22943,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19038,ID_Column:22951,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19039,ID_Column:22953,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19040,ID_Column:22955,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19041,ID_Column:22957,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:19053,ID_Column:22981,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19052,ID_Column:22979,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:110,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:19775,ID_Column:24479,dataField:"ReasonForClosing",allowFixing:!0,visible:!1,caption:"ReasonForClosing",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19751,ID_Column:24423,dataField:"ID_Bank",allowFixing:!0,visible:!1,caption:"ID_Bank",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19752,ID_Column:24425,dataField:"ID_BankAccount",allowFixing:!0,visible:!1,caption:"ID_BankAccount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19747,ID_Column:24413,dataField:"DepositAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"DepositAmount",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19753,ID_Column:24429,dataField:"ID_ClosedBy",allowFixing:!0,visible:!1,caption:"ID_ClosedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19746,ID_Column:24411,dataField:"DateClosed",allowFixing:!0,visible:!1,caption:"DateClosed",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})