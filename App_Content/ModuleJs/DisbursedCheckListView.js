define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAP%2fDisbursedCheck%2fVC_DisbursedCheck"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:8505,ModelViewName:"DisbursedCheck_ListView",StateName:i,ID_View:9800,ModelName:"DisbursedCheck",Icon:"FontInSys",DisplayName:"Disbursement Monitoring",ID_ModelDetailView:9254,ID_ViewType:2,ViewControllerName:"DisbursedCheck_DetailView",ID_Model:8288,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"VGoSNmGl3fZf+hHnLZxDuvViW5b/HVni9fxi1L9YXQ6VY3rUN6d0d2mM65Y8MIyKIkypQa7Cam8MIhVRsCecwJ7/4OXN1NG6QpwzFI2THcF/7LE2oZpPs1eSxCk4SXmoQAdZLAhn7FR/mZG8ieqD72DjpXD927G66BwWywe4qLk=",SQLUpdateProc:"y+y3FCkqucmvlCVyZjggoOymJX+T6iWoLo4StIhk9om2jrD1JW5MrILIgxrVV3vpzcg0cc0UZ0PH5mNf6Yt2h8/SIA7z+uUO1ODQvRUGXQ+g++8kXefxkAhtqhR9nEvc"};u.$isAllowAdd=!1;u.$isAllowEdit=!1;u.$isAllowDelete=!1;u.ModelName="DisbursedCheck";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];e=[{name:"CheckAmt_Summary",showInColumn:"CheckAmt",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.CheckAmt==undefined?"0.00":Globalize.format(u.$Summary.CheckAmt,"n2")}}];t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:16968,ID_Column:19074,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16982,ID_Column:19094,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"DCM No.",width:76,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16969,ID_Column:19075,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16985,ID_Column:19100,dataField:"Date",allowFixing:!0,visible:!0,caption:"DCM Date",width:92,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_Column:19139,dataField:"Supplier",allowFixing:!0,visible:!0,caption:"Supplier",width:167,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:24559,dataField:"Payee",allowFixing:!0,visible:!0,caption:"Payee",width:203,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:21398,ID_Column:26428,dataField:"Model",allowFixing:!0,visible:!0,caption:"Payment Type",width:92,alignment:"left",fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Model",cellTemplate:function(n,t){t.data.Model===undefined&&u.console_warn("Model is undefined in datasource");var i=t.data.Model!==undefined?t.data.Model===null?"-":t.data.Model:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_Column:19140,dataField:"CheckNo",allowFixing:!0,visible:!0,caption:"Transaction/Cheque No.",width:138,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:21370,ID_Column:26427,dataField:"DCMDate",allowFixing:!0,visible:!1,caption:"Date Cleared/Bounced",width:132,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_Column:26426,dataField:"DateCleared",allowFixing:!0,visible:!0,caption:"Date Cleared",width:116,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:16970,ID_Column:19076,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17003,ID_Column:19144,dataField:"CheckAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Amount",width:107,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{editorOptions:{min:0},ID_ModelProperty:16989,ID_Column:19108,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:110,alignment:"left",fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:17854,ID_Column:20723,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:16992,ID_Column:19114,dataField:"Bank",allowFixing:!0,visible:!1,caption:"Bank",width:135,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_Bank",cellTemplate:function(n,t){t.data.Bank===undefined&&u.console_warn("Bank is undefined in datasource");var i=t.data.Bank!==undefined?t.data.Bank===null?"-":t.data.Bank:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:17002,ID_Column:19142,dataField:"CheckDate",allowFixing:!0,visible:!0,caption:"Cheque Date",width:226,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:21393,ID_Column:26366,dataField:"DateReleased",allowFixing:!0,visible:!0,caption:"Date Released",width:72,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:21376,ID_Column:26425,dataField:"DateBounced",allowFixing:!0,visible:!1,caption:"Date Bounced",width:140,fixedPosition:"right",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})