define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_ItemIssuance"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3347,ModelViewName:"ItemIssuance_ListView",StateName:i,ID_View:4546,ModelName:"ItemIssuance",Icon:"fa fa-mail-forward",DisplayName:"Item Issuance",ID_ModelDetailView:4169,ID_ViewType:2,ViewControllerName:"ItemIssuance_DetailView",ID_Model:3208,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"LLdPHdzLhs6vvQnVB4QxOD+OoRcJ9z1D6zDWS/Kqwr7qDA2/4NNWla6NFll2BAqVJ9NTzY6Pv/PEPby7Dpr8vdayblwHRjO13QQcXw+RVRqIPVA4XhVt6yerItXNms/D",SQLUpdateProc:"iZ1CfJNRwuajrDFZdKuulXGmwftvPvh6QqzpvZ/awdUWc+WBt6KLNyQ1WTMvY+RYMHTctPRdrSYt7otAfEJNCtBZ2WS47XbbW5a29BP6nMNSMylaXTYTxJ9b3bKSSaj9"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="ItemIssuance";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:8995,ID_Column:11316,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"ISS No.",width:120,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:8996,ID_Column:11318,dataField:"Date",allowFixing:!0,visible:!0,caption:"ISS Date",width:117,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7633,ID_Column:9588,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7634,ID_Column:9589,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7635,ID_Column:9590,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:317745,ID_Column:1071942,dataField:"ID_ItemRequest",allowFixing:!0,visible:!1,caption:"ID_ItemRequest",width:100,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_Column:1072008,dataField:"IRNo",allowFixing:!0,visible:!0,caption:"IRNo",width:100,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:317746,ID_Column:1071944,dataField:"IRDate",allowFixing:!0,visible:!0,caption:"IRDate",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:8994,ID_Column:11314,dataField:"IssuanceType",allowFixing:!0,visible:!0,caption:"Issuance Type",width:122,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_IssuanceType",cellTemplate:function(n,t){t.data.IssuanceType===undefined&&u.console_warn("IssuanceType is undefined in datasource");var i=t.data.IssuanceType!==undefined?t.data.IssuanceType===null?"-":t.data.IssuanceType:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19501,ID_Column:23907,dataField:"Customer",allowFixing:!0,visible:!0,caption:"Customer",width:161,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Customer",cellTemplate:function(n,t){t.data.Customer===undefined&&u.console_warn("Customer is undefined in datasource");var i=t.data.Customer!==undefined?t.data.Customer===null?"-":t.data.Customer:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:8991,ID_Column:11308,dataField:"Employee",allowFixing:!0,visible:!1,caption:"Employee",width:116,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:3141,Icon:"mdi mdi-account-multiple",ModelPropertyName:"Employee"},refDataField:"ID_Employee",SQL:"gAIvujFdaWBlNTp+XQMx8mxhTQtg9RZ/C6T8qwo/AxVabX23qRm52tJsoOFrWVCw46gDg0hegpRsaaO3i2iBFnBTiyeX/s3QNicr7uq/Hwzgq+KFdCCkQlo5cVjqA4vkTnnKXhTL9Np7f9KOnaiTi6PVJQV9TeDZRAIs4vfN47I=",cellTemplate:function(n,t){t.data.Employee===undefined&&u.console_warn("Employee is undefined in datasource");var i=t.data.Employee!==undefined?t.data.Employee===null?"-":t.data.Employee:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:8989,ID_Column:11304,dataField:"IssuedTo",allowFixing:!0,visible:!0,caption:"Issued To",width:160,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_IssuedTo",SQL:"DexBfD8GIYzijtAUnkn5VH9q9sWI0td0JcAyg9zOlTN04WItdkZycNKcar2Dt6+iDvIPujP8MRlaYxjwUciGiPRAmd8oosl8n5YAp0UEr6vP1+J11+a6VCcSOXjAT1Lp",cellTemplate:function(n,t){t.data.IssuedTo===undefined&&u.console_warn("IssuedTo is undefined in datasource");var i=t.data.IssuedTo!==undefined?t.data.IssuedTo===null?"-":t.data.IssuedTo:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:19609,ID_Column:24190,dataField:"ClientPO",allowFixing:!0,visible:!0,caption:"Client PO",width:158,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:8992,ID_Column:11310,dataField:"Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",width:138,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},refDataField:"ID_Warehouse",SQL:"6xCBFr9kLVVvH5BlcXKFl6YZcqeQklYsB+aTD77IMs13mz4Mvm5opKyfi8usAssqGPzLHOlEhH7U+wJ/fhu1qkXQs9eO5C+l7MZauJ+wSD3Xb9lnENgkNe7a+N8Oh5nEEIoVlLqUmIE6cAcDaRjpU4aOVPQEEVo/HrINmNvp9Yk=",cellTemplate:function(n,t){t.data.Warehouse===undefined&&u.console_warn("Warehouse is undefined in datasource");var i=t.data.Warehouse!==undefined?t.data.Warehouse===null?"-":t.data.Warehouse:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:8993,ID_Column:11312,dataField:"IsForReturn",allowFixing:!0,visible:!0,caption:"For Return",width:101,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7637,ID_Column:9592,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:8990,ID_Column:11306,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:121,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7638,ID_Column:9593,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:130,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"TxgQyseUxy40fN3g8aZEEcMrHNphP9qqzxdDRLcs+v4dXT6GEO4LHj48Io8NbLBBqMQhrzLcNTC3l+XMspF8iwuRrlwgXBdDKGtP+ErX8jalMlORHQEoy9BTW/o0gNin",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7639,ID_Column:9594,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"GVldN5rYleX0Xt6Qw1SJU7Yg5XwTzMsAfCLFnUfrnOPf9LC2iOfiv4BZs3b33IUVZwoAJC88m2B+pqk12bsGPqVjVtR5Pmk28Aq092Wy6Id1ZIy0R/2QcACTJmQ7KssV",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7641,ID_Column:9596,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:11484,ID_Column:14285,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"AIRhtwNN0CZdaKFaxQddl0jFmDcD+Z6Oz0QiNUSUsg6lO+4noPyg20PyAGvBH+0vFbAdVY846/X7esXXWho2O8WpKU6WDT1y9O4BZc6AgmEwa6Hzkzoeans51T5LFsx2"},{editorOptions:{min:0},ID_ModelProperty:11485,ID_Column:14287,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:11486,ID_Column:14289,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:11487,ID_Column:14291,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7636,ID_Column:9591,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:105,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:19502,ID_Column:23909,dataField:"ID_Contact",allowFixing:!0,visible:!1,caption:"ID_Contact",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17845,ID_Column:20706,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19517,ID_Column:23951,dataField:"ExchangeRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"ExchangeRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:19691,ID_Column:24371,dataField:"AssetCode",allowFixing:!0,visible:!1,caption:"AssetCode",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19692,ID_Column:24373,dataField:"Specification",allowFixing:!0,visible:!1,caption:"Specification",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17341,ID_Column:19798,dataField:"DocStatus",allowFixing:!0,visible:!0,caption:"Doc Status",width:113,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_DocStatus",cellTemplate:function(n,t){t.data.DocStatus===undefined?u.console_warn("DocStatus is undefined in datasource"):(n.addClass("DocStatus"),u.addColumnClass(n,"ID_DocStatus",t.data,t.data.DocStatus!=null?t.data.DocStatus.replace(" ",""):null));n.addClass("ID_DocStatus");var i=t.data.DocStatus!==undefined?t.data.DocStatus===null?"-":t.data.DocStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption DocStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})