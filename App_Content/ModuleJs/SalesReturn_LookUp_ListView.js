define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAR%2fSalesReturn%2fVC_SalesReturn"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5472,ModelViewName:"SalesReturn_LookUp_ListView",StateName:i,ID_View:6750,ModelName:"SalesReturn",Icon:"FontInSys",DisplayName:"Sales Return",ID_ModelDetailView:6238,ID_ViewType:2,ViewControllerName:"SalesReturn_DetailView",ID_Model:5272,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"AseNucx2sDkF7F9FsRIUq7Z10vm+VoO9leQDREwSAHjHZAsxfpWjKX9ayjT/KkR8eDwVKhOqCw3qN7ms9o2a4aOHTPBGE1bOD8Q70uVmsSFDSEAcg/0Ecf+8LmbZr7pb",SQLUpdateProc:"IWNpHQ8vx21GFYfTZcGWwu8WIjg38Q0plYnblPp94qXeo/BtF9bhYI8vVQXDaEtB6umnWDxDr2L/Qhq+JbTHD1eleYhJEalP+ej3MCnbKkNfC5sYw+uoawjcp9eGOpzi"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="SalesReturn";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:12729,ID_Column:14582,dataField:"Address",allowFixing:!0,visible:!0,caption:"Address",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12706,ID_Column:14559,dataField:"Code",allowFixing:!0,visible:!0,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12714,ID_Column:14567,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12722,ID_Column:14575,dataField:"Date",allowFixing:!0,visible:!0,caption:"Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12725,ID_Column:14578,dataField:"DateApproved",allowFixing:!0,visible:!0,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12727,ID_Column:14580,dataField:"DateCancelled",allowFixing:!0,visible:!0,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12709,ID_Column:14562,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12710,ID_Column:14563,dataField:"DateModified",allowFixing:!0,visible:!0,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:12728,ID_Column:14581,dataField:"DetailCount",allowFixing:!0,visible:!0,caption:"DetailCount",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:12723,ID_Column:14576,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"DocumentNo",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12716,ID_Column:14569,dataField:"GrandTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"GrandTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12724,ID_Column:14577,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!0,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"w0OEBZF8NcZMpqcclXvd63S7BdAuA3NngqE7xocHXZvgtuy9dFmtiX0do2Q/9EDMlsQt1RaEd9Jt8yXcu096flmK0mInSZlj8wBkpD8P9Jja6F42/4Wad6805+ITSsiL"},{editorOptions:{min:0},ID_ModelProperty:12726,ID_Column:14579,dataField:"ID_CancelledBy",allowFixing:!0,visible:!0,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12711,ID_Column:14564,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"dWOCIzeVXPAVkSTQWOQ+kLI9b+IxHOktf4X+7x+4sSjTs/jXop8w2kjrxuND28R1X9IQCP8G7xoNkvcLX3oQkPYwaxIki4k22/z2kLB565+pMXdczBsXezsUhz6NyGPE",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12715,ID_Column:14568,dataField:"ID_Customer",allowFixing:!0,visible:!0,caption:"ID_Customer",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12721,ID_Column:14574,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:12712,ID_Column:14565,dataField:"LastModifiedBy",allowFixing:!0,visible:!0,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"8SFYv0gmyhA9GuIwqhcDs/B4LzKITqK9U5+9AnDAWQJBrlseFxR817Ks+1QJu2o9T64CTwUKM+SHT8u0w+JF9MvvfPa8rL2fNklBi1m2l72fMjKEaDOjrxqyLwlWp/Ba",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12730,ID_Column:14583,dataField:"ID_Warehouse",allowFixing:!0,visible:!0,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:12708,ID_Column:14561,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:12707,ID_Column:14560,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12731,ID_Column:14584,dataField:"Reason",allowFixing:!0,visible:!0,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12717,ID_Column:14570,dataField:"SubTotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"SubTotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12719,ID_Column:14572,dataField:"TotalQty",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"TotalQty",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12718,ID_Column:14571,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"TotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12720,ID_Column:14573,dataField:"VatRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"VatRate",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:13766,ID_Column:15681,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalAmount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:16901,ID_Column:18936,dataField:"ID_SalesReturnType",allowFixing:!0,visible:!1,caption:"ID_SalesReturnType",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17915,ID_Column:20844,dataField:"ReasonOfReturn",allowFixing:!0,visible:!1,caption:"ReasonOfReturn",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:19488,ID_Column:23875,dataField:"IsCreditMemo",allowFixing:!0,visible:!1,caption:"IsCreditMemo",allowEditing:!1,dataType:"boolean",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})