define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fMasterFile%2fVC_ProjectList"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5459,ModelViewName:"Project_ListView",StateName:i,ID_View:6723,ModelName:"Project",Icon:"mdi mdi-emby",DisplayName:"Project",ID_ModelDetailView:6224,ID_ViewType:2,ViewControllerName:"Project_DetailView",ID_Model:5263,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"mt3YzNHjWuEGOkIzDoYngetqSFbYVZn6TIa+s2ciwn2N5gy4FKB1rB1aivJIfOvI9xqCr1J7dW968ADYjSnISWZ6jPXF8AspH119ZP9wKd0rv+Yeyg+iLxU1yWpyABfn",SQLUpdateProc:"AOoUNpij8lQtQngbBqaIJtGEf1I+1opG4YMqzSEXxHmgXP3pWuO3hM+I0Kb/v2A6wBv8nEsb/SPS8CoRABkymITuPIZ5VvXjRb5Ghq8FPi0u4qDHD/+BTp05WAzQY/mm"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Project";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:20278,ID_Column:25324,dataField:"Attachment",allowFixing:!0,visible:!1,caption:"Attachment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20284,ID_Column:25336,dataField:"AwardNoticeFile",allowFixing:!0,visible:!1,caption:"AwardNoticeFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20283,ID_Column:25334,dataField:"BillOfMaterialsFile",allowFixing:!0,visible:!1,caption:"BillOfMaterialsFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20282,ID_Column:25332,dataField:"CustomerContractFile",allowFixing:!0,visible:!1,caption:"CustomerContractFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20279,ID_Column:25326,dataField:"CustomerPOFile",allowFixing:!0,visible:!1,caption:"CustomerPOFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20280,ID_Column:25328,dataField:"FinalProposalFile",allowFixing:!0,visible:!1,caption:"FinalProposalFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20286,ID_Column:25340,dataField:"ForImportationFile",allowFixing:!0,visible:!1,caption:"ForImportationFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20287,ID_Column:25342,dataField:"OthersFile",allowFixing:!0,visible:!1,caption:"OthersFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20285,ID_Column:25338,dataField:"ProgressBillingFile",allowFixing:!0,visible:!1,caption:"ProgressBillingFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:20281,ID_Column:25330,dataField:"TenderBizFile",allowFixing:!0,visible:!1,caption:"TenderBizFile",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18554,ID_Column:22075,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"Project No.",width:122,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18548,ID_Column:22063,dataField:"ProjectName",allowFixing:!0,visible:!0,caption:"Project Name",width:144,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11495,ID_Column:14313,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",width:67,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12698,ID_Column:14551,dataField:"Client",allowFixing:!0,visible:!0,caption:"Client",width:165,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Client",cellTemplate:function(n,t){t.data.Client===undefined&&u.console_warn("Client is undefined in datasource");var i=t.data.Client!==undefined?t.data.Client===null?"-":t.data.Client:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12699,ID_Column:14553,dataField:"ProjectLead",allowFixing:!0,visible:!0,caption:"Project Lead",width:152,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ProjectLead",cellTemplate:function(n,t){t.data.ProjectLead===undefined&&u.console_warn("ProjectLead is undefined in datasource");var i=t.data.ProjectLead!==undefined?t.data.ProjectLead===null?"-":t.data.ProjectLead:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:18553,ID_Column:22073,dataField:"Contact",allowFixing:!0,visible:!0,caption:"Contact",width:121,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Contact",cellTemplate:function(n,t){t.data.Contact===undefined&&u.console_warn("Contact is undefined in datasource");var i=t.data.Contact!==undefined?t.data.Contact===null?"-":t.data.Contact:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:11498,ID_Column:14316,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:114,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"GAJoE7WJuoGrpgmrABpUXgYvEfl3Mt1Lq4SvWj2SlbruUzxiHL1soeyWdtPHa7FyLH7hHK0sOVxHs1ZkVSrr4FBX9b/6kqMkbPTUcA9aN0YwavAKmaTBNobLibm1iiWF",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11499,ID_Column:14317,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"g0da8M3J1eNAMw6mGoWzpFi/GFasFkRAuJerXYhrUpahVQIaCl8qVFZgmt3FvGbUUsSPtada4CCPaMoM9lBPUVhN6BL44Sp5z9DtvHWJWePV8JJzlgF35y4qb9ehHZiS",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:11493,ID_Column:14311,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11494,ID_Column:14312,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:11496,ID_Column:14314,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:102,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:11497,ID_Column:14315,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:11501,ID_Column:14319,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18549,ID_Column:22065,dataField:"Address",allowFixing:!0,visible:!1,caption:"Address",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18550,ID_Column:22067,dataField:"PhoneNo",allowFixing:!0,visible:!1,caption:"PhoneNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18551,ID_Column:22069,dataField:"MobileNo",allowFixing:!0,visible:!1,caption:"MobileNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:18552,ID_Column:22071,dataField:"Remarks",allowFixing:!0,visible:!1,caption:"Remarks",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18581,ID_Column:22107,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18583,ID_Column:22111,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:18584,ID_Column:22113,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:18585,ID_Column:22115,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:18586,ID_Column:22117,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:18587,ID_Column:22119,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:129,alignment:"left",fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:224182,ID_Column:267924,dataField:"ProjectDetails",allowFixing:!0,visible:!1,caption:"ProjectDetails",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224183,ID_Column:267926,dataField:"ProjectScope",allowFixing:!0,visible:!1,caption:"ProjectScope",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[{ID:22063,PropertyName:"ProjectName",Caption:"Project Name"},{ID:14551,PropertyName:"Client",Caption:"Client"},{ID:14553,PropertyName:"ProjectLead",Caption:"Project Lead"}];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})