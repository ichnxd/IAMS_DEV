define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAR%2fQuotation%2fVC_Quotation"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:2265,ModelViewName:"Quotation_ListView",StateName:i,ID_View:3414,ModelName:"Quotation",Icon:"FontInSys",DisplayName:"Quotation Form",ID_ModelDetailView:3128,ID_ViewType:2,ViewControllerName:"Quotation_DetailView",ID_Model:2167,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"13cGSFJo2Ojtx1sBmumBVojbdNtvJ1uFqen2jOcMpuNBnqNJ9OfDMxyUPdvBFrVDUqnrbn3kKyFSzwcgn+qt7DqRvG/fXeUiNEcco5CYjrTtyqMwjBuhygM+0jSqvziv/rjIKZsPFYx/41yI+qAWoY++oVkkSvuANXx//jhq2HQ=",SQLUpdateProc:"OpB9guM7F0H9g0cgwI9aoDHXgYUKLL6n0JCGtRicqHzmarAJIuQqMoL/KQozfRA+k0LEUEjYXOUHvfMZkfnX3nufwtS2t/qRu38/7Hp8/GRTMP+/k+EV5DrAKdbFqbbP"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="Quotation";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:5868,ID_Column:7174,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"Qtn No.",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:5870,ID_Column:7176,dataField:"Date",allowFixing:!0,visible:!0,caption:"Qtn Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:5869,ID_Column:7175,dataField:"Customer",allowFixing:!0,visible:!0,caption:"Customer",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_BusinessPartner",cellTemplate:function(n,t){t.data.Customer===undefined?u.console_warn("Customer is undefined in datasource"):(n.addClass(""),u.addColumnClass(n,"ID_BusinessPartner",t.data,t.data.Customer!=null?t.data.Customer.replace(" ",""):null));n.addClass("ID_BusinessPartner");var i=t.data.Customer!==undefined?t.data.Customer===null?"-":t.data.Customer:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:"ID_BusinessPartner"},{editorOptions:{min:0},ID_ModelProperty:5890,ID_Column:7196,dataField:"PaymentTerm",allowFixing:!0,visible:!0,caption:"Terms",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_PaymentTerm",cellTemplate:function(n,t){t.data.PaymentTerm===undefined&&u.console_warn("PaymentTerm is undefined in datasource");var i=t.data.PaymentTerm!==undefined?t.data.PaymentTerm===null?"-":t.data.PaymentTerm:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7941,ID_Column:10212,dataField:"MaturityDate",allowFixing:!0,visible:!1,caption:"Maturity Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:5879,ID_Column:7185,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"0pURY4v/YLUp05Lpb8skWeOgOu1u3rSymhs7Qn0uSuVvNEnbMM4SF74atIjIUt2Jbc0Vt8s7bg/vvfxBtI+MTEAtQGk+zGO0u7ilSgbzEgLOx6xPm9aSulMr4CppwzDE",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:7942,ID_Column:10214,dataField:"Validity",allowFixing:!0,visible:!1,caption:"Validity",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:5874,ID_Column:7180,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Grand Total",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:5871,ID_Column:7177,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:9001,ID_Column:11329,dataField:"WalkInCustomer",allowFixing:!0,visible:!1,caption:"WalkInCustomer",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9099,ID_Column:11516,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:12704,ID_Column:14557,dataField:"ID_Salesman",allowFixing:!0,visible:!1,caption:"ID_Salesman",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:12761,ID_Column:14667,dataField:"IsWalkIn",allowFixing:!0,visible:!1,caption:"Walk In",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17057,ID_Column:19306,dataField:"ID_WalkInCustomer",allowFixing:!0,visible:!1,caption:"ID_WalkInCustomer",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17865,ID_Column:20745,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})