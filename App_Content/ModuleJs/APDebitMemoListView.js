define(["app","baseListViewController","/JsApp/GetScript?Url=Doc%2fAP%2fCreditDebitMemo%2fVC_APDebitMemo"],function(n,t,i){var r=function(){var n=this,t=arguments;n.ModelHelper=new i;n.ModelHelper.ID_ViewType=1;n.Init(t[0],t[1],t[2])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:5467,ModelViewName:"APDebitMemo_ListView",StateName:i,ID_View:6742,ModelName:"APDebitMemo",Icon:"FontInSys",DisplayName:"AP Debit Memo",ID_ModelDetailView:6235,ID_ViewType:2,ViewControllerName:"APDebitMemo_DetailView",ID_Model:5269,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"k9V6fNMDZFuZUnYxgNp+XKSLUG3CQfyBpcbJGhWAAA33I68A26mERrntdTLEnjKYjSqMxMcRrBSSc55/sDit+LoQavmXUZx4NBZBUDf102VgbtTuPRHluRlnjpqbz9PXf6C73LQ1YOvPeDpUPEe19SZHV6xHoEpLeJhAMJqXnDc=",SQLUpdateProc:"wXWadXHrNNaUMcuSyIpTHeiUuBYvhvdZVya9fm97mOilsACqK9JcL9yIEEyEo64muoqOH40Kx7blyA3PKWNh8OTjL47G3hxmDQfOWrTGFX20qG9/8Fpm7vIxykM6RPJX"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="APDebitMemo";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);e=[{name:"TotalAmount_Summary",showInColumn:"TotalAmount",summaryType:"custom",type:"SUM",customizeText:function(){return u.$Summary.TotalAmount==undefined?"0.00":Globalize.format(u.$Summary.TotalAmount,"n2")}}];u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{ID_ModelProperty:12657,ID_Column:14478,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:12658,ID_Column:14479,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",width:224,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17485,ID_Column:20016,dataField:"DocumentNo",allowFixing:!0,visible:!0,caption:"APDM No.",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:17484,ID_Column:20014,dataField:"Date",allowFixing:!0,visible:!0,caption:"APDM Date",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:12687,ID_Column:14530,dataField:"BusinessPartner",allowFixing:!0,visible:!0,caption:"Supplier",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:3102,Icon:"mdi mdi-contact-mail",ModelPropertyName:"Business Partner"},refDataField:"ID_BusinessPartner",SQL:"bRjqEfLxeXz/tXhGJLYUBLDTg5ZgM2P9E2xQDuWmAkTWG1UQX4SSnK5qGqdsiAxFHKd3IXcg397fRUVhaw4Fmx7qkd7biRKoI4haunHVke6rZnaJyjVnWKSFiNFI4KSgnC3P0F0VEeHXDalZrl+2pjWq7Ok8C+GET2INiD14LmE=",cellTemplate:function(n,t){t.data.BusinessPartner===undefined?u.console_warn("BusinessPartner is undefined in datasource"):(n.addClass(""),u.addColumnClass(n,"ID_BusinessPartner",t.data,t.data.BusinessPartner!=null?t.data.BusinessPartner.replace(" ",""):null));n.addClass("ID_BusinessPartner");var i=t.data.BusinessPartner!==undefined?t.data.BusinessPartner===null?"-":t.data.BusinessPartner:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:"ID_BusinessPartner"},{editorOptions:{min:0},ID_ModelProperty:17488,ID_Column:20022,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Amount",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{ID_ModelProperty:12660,ID_Column:14481,dataField:"DateCreated",allowFixing:!0,visible:!0,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:12661,ID_Column:14482,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:12662,ID_Column:14483,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"m07bcagNRGIL6EYWTlCPqdhp+dqBgsDm2wajNvz2/G9jFB5oAZJ4xp7V+Cx4BFurE0jlIrMpf0bUQ6x0rmKYSrcspz+aR3fe0eZwMRr2L8osP3HY/9hCLuJEPxldR81F",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12663,ID_Column:14484,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",width:112,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"npDOkjSYbCY4HvngFj/+A2ji4GXZoJXK4+mDLmU/dDBaVlcEwzEk2bQTrtGKrzhz88+mKEQrS6IeDd1tkb6hv7dz6Au6Pz9Y8ndqvPmCDoQSb4OHLWn4fxoEDjFSnbTw",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:12688,ID_Column:14532,dataField:"FilingStatus",allowFixing:!0,visible:!0,caption:"Filing Status",width:86,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,refDataField:"ID_FilingStatus",cellTemplate:function(n,t){t.data.FilingStatus===undefined?u.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),u.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_ModelProperty:12659,ID_Column:14480,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:80,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:12665,ID_Column:14486,dataField:"Comment",allowFixing:!0,visible:!0,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17486,ID_Column:20018,dataField:"TotalVat",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"TotalVat",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17487,ID_Column:20020,dataField:"Subtotal",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Subtotal",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17526,ID_Column:20096,dataField:"ID_MemoType",allowFixing:!0,visible:!1,caption:"ID_MemoType",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:17540,ID_Column:20122,dataField:"ID_ApprovedBy",allowFixing:!0,visible:!1,caption:"ID_ApprovedBy",allowEditing:!1,dataType:"number",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},SQL:"Xc8TC84FSavaRwlb1Q79REeGU6xmsxOv3RUvgo2uDgbxd6dDxjC0EsBHNvWFacxXDg8gdopXde+bV+Z4qrVcOhQhsL+5i0vrbES00m2WL0H/LeQfHK0cZ6fKRZ92b3V4"},{ID_ModelProperty:17541,ID_Column:20124,dataField:"DateApproved",allowFixing:!0,visible:!1,caption:"DateApproved",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:17542,ID_Column:20126,dataField:"ID_CancelledBy",allowFixing:!0,visible:!1,caption:"ID_CancelledBy",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:17543,ID_Column:20128,dataField:"DateCancelled",allowFixing:!0,visible:!1,caption:"DateCancelled",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17835,ID_Column:20684,dataField:"Reason",allowFixing:!0,visible:!1,caption:"Reason",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17943,ID_Column:20901,dataField:"ID_Warehouse",allowFixing:!0,visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19510,ID_Column:23937,dataField:"VatRate",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"VatRate",allowEditing:!1,dataType:"number",isAllowZero:!0}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},r})