define(["app","baseListViewController","/JsApp/GetScript?Url=Inventory%2fVC_ItemReturn"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:3375,ModelViewName:"ItemReturn_ListView",StateName:i,ID_View:4593,ModelName:"ItemReturn",Icon:"mdi mdi-reply-all",DisplayName:"Item Return",ID_ModelDetailView:4183,ID_ViewType:2,ViewControllerName:"ItemReturn_DetailView",ID_Model:3222,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"PWGSQm6DLA9xP3HTMy8zX1sOb3QxdQfhl5YJeA4xTGMMvBb68pfZAiHMuW2AqyE7gnp3Ds1sSXL7WCGHtUj5CE2vxBYlwqmLKcwcIJENYUQjKuFt76DvKn5cj+4Skhfy",SQLUpdateProc:"lo9+y+zS5lb+3HrxzZF8hhj9kIGeeFSLoWWG2O8cuctFBR81JIqVJ7uLTdZC7Gi+B2rhgcedMGyLGjUyQPHsLkmRHXj7w7JpcEr4ckaqyMqmzfnz5sSNQC4qM9oKr5cC"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="ItemReturn";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:7779,ID_Column:9853,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:94,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12526,ID_Column:14361,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"ITR No.",width:72,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12529,ID_Column:14367,dataField:"Date",allowFixing:!0,visible:!0,caption:"ITR Date",width:91,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:7789,ID_Column:9870,dataField:"Employee",allowFixing:!0,visible:!0,caption:"Employee",width:233,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:3141,Icon:"mdi mdi-account-multiple",ModelPropertyName:"Employee"},refDataField:"ID_Employee",SQL:"oAF/5yworDyFrKIgvcahhwgr0OKCi3dXJlroFQFGLnx/zJDu0xIFGulead6MUIcaKF1u40JhRz4zHrL9tDlWUlwZdbd+8Y4VL6sYKh/HnZByU7gqXPf03YIjFlIy9F/HZFpdbloARcFzfq3F5OjqKrbmaR5MpQvZrRToUsmEtS8=",cellTemplate:function(n,t){t.data.Employee===undefined&&u.console_warn("Employee is undefined in datasource");var i=t.data.Employee!==undefined?t.data.Employee===null?"-":t.data.Employee:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12531,ID_Column:14371,dataField:"ItemCondition",allowFixing:!0,visible:!0,caption:"Item Condition",width:109,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ItemCondition",cellTemplate:function(n,t){t.data.ItemCondition===undefined&&u.console_warn("ItemCondition is undefined in datasource");var i=t.data.ItemCondition!==undefined?t.data.ItemCondition===null?"-":t.data.ItemCondition:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:11489,ID_Column:14295,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:112,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:"",groupIndex:1},{editorOptions:{min:0},ID_ModelProperty:12528,ID_Column:14365,dataField:"Warehouse",allowFixing:!0,visible:!0,caption:"Warehouse",width:153,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:1039,Icon:"jspp-icon js-factory-stock-house",ModelPropertyName:"Warehouse"},refDataField:"ID_Warehouse",SQL:"OtgSsXhAXBgb6qtKAJ6A+s02mQ4FHk7B1AfyKMfp/pfcXZIdtCxXcHjfUtgQVMfP3Q2PwgDAHPBkD05Gbw7VV7kA8sJkcguyHXhEnprn205sTkh92zeVR9hncT17QFWHPEOZ872PsCnnymVot+3DimGBHE7ZAmqjnM3tdVNxncU=",cellTemplate:function(n,t){t.data.Warehouse===undefined&&u.console_warn("Warehouse is undefined in datasource");var i=t.data.Warehouse!==undefined?t.data.Warehouse===null?"-":t.data.Warehouse:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12525,ID_Column:14359,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:134,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"1BUuJSa32GxGLqEG9KIzzMi8Cnwp/ZVotvP8SX1rgUrfJAwwSjD3NUDkJpzjdjKPtdvbyvXhC7DNfU604g77qjOHJDSqK8OdmOX5+Kjrp5cWFQvARzlq28CYFS0qxvyu",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7783,ID_Column:9858,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",width:142,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7780,ID_Column:9854,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7781,ID_Column:9855,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7782,ID_Column:9856,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7784,ID_Column:9860,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7785,ID_Column:9862,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"Date Approved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:7787,ID_Column:9866,dataField:"CancelledBy",allowFixing:!0,visible:!1,caption:"Cancelled By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_CancelledBy",cellTemplate:function(n,t){t.data.CancelledBy===undefined&&u.console_warn("CancelledBy is undefined in datasource");var i=t.data.CancelledBy!==undefined?t.data.CancelledBy===null?"-":t.data.CancelledBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7788,ID_Column:9868,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"8jVWNifAJ7mVGlpdLTeE/iczWz4DOhx5dShYllIARAlD9mSyEhhPB/l7jv/Tgc3tGdVbaT7TFCts64WI9Y7TJFXBGQYAyE0dfIZ6npOt763WZ8Z35mBdlSbSAXmgpPbm",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:11488,ID_Column:14293,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"Date Cancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17853,ID_Column:20721,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:7786,ID_Column:9864,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"Approved By",width:82,allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"w90fgPZ094wYcQnxmE5UuYsHSY/naXkL4jQ/x8LZdEnS26ZpLVIhYapQUuChHTvsLGvEW1XlR8vDm7cgRBSHGrVpBtOFEm2X22KjivG+rs9cwZLH7SvXvKIKvDuROgdM"},{ID_Column:1071071,dataField:"ItemIssuance",allowFixing:!0,visible:!0,caption:"IIS Reference",width:143,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ItemIssuance",cellTemplate:function(n,t){t.data.ItemIssuance===undefined&&u.console_warn("ItemIssuance is undefined in datasource");var i=t.data.ItemIssuance!==undefined?t.data.ItemIssuance===null?"-":t.data.ItemIssuance:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:19784,ID_Column:24497,dataField:"ReturnedTo",allowFixing:!0,visible:!0,caption:"Returned To",width:152,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_ReturnedTo",cellTemplate:function(n,t){t.data.ReturnedTo===undefined&&u.console_warn("ReturnedTo is undefined in datasource");var i=t.data.ReturnedTo!==undefined?t.data.ReturnedTo===null?"-":t.data.ReturnedTo:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})