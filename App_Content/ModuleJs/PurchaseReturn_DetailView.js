define(["app","baseDetailViewController","/JsApp/GetScript?Url=Doc%2fAP%2fReturn%2fVC_PurchaseReturn"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this;s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1};n.DisplayName="Purchase Return";n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name;s.DisplayProperty="Name";s.ID_ModelObject=3110;s.ID_View=3361;s.ID_Model=2149;s.ModelViewName="PurchaseReturn_DetailView";s.ModelName="PurchaseReturn";s.DisplayName="Purchase Return";s.IsEditingOnly=!1;s.IsDeveloperMode=!1;s.$isAllowAdd=!0;s.$isAllowEdit=!0;s.CRUDTablesIds={Main:2149,PurchaseReturnDetails:3221,PurchaseReturn_Detail_Serials:3227};t.prototype.Init.call(this,n,i,r,u,f,e,o);var h=i;if(s.$scope.GeneralFormOptions={bindingOptions:{"formData.Comment":"CurrentObject.Comment","formData.Date":"CurrentObject.Date","formData.DateApproved":"CurrentObject.DateApproved","formData.DateCancelled":"CurrentObject.DateCancelled","formData.DateCreated":"CurrentObject.DateCreated","formData.DocumentNo":"CurrentObject.DocumentNo","formData.ExchangeRate":"CurrentObject.ExchangeRate","formData.IsImported":"CurrentObject.IsImported","formData.ID_Currency":"CurrentObject.ID_Currency","formData.DateModified":"CurrentObject.DateModified","formData.DetailCount":"CurrentObject.DetailCount","formData.Reason":"CurrentObject.Reason","formData.ReasonOfReturn":"CurrentObject.ReasonOfReturn","formData.ID_TransactionType":"CurrentObject.ID_TransactionType","formData.IsDebit":"CurrentObject.IsDebit","formData.Subtotal":"CurrentObject.Subtotal","formData.TotalAmount":"CurrentObject.TotalAmount","formData.TotalQty":"CurrentObject.TotalQty","formData.TotalVat":"CurrentObject.TotalVat","formData.VatRate":"CurrentObject.VatRate","formData.ID_Supplier":"CurrentObject.ID_Supplier","formData.Warehouse":"CurrentObject.Warehouse","formData.ApprovedBy":"CurrentObject.ApprovedBy","formData.CancelledBy":"CurrentObject.CancelledBy","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","Date","ExchangeRate","IsImported","ID_Currency","ReasonOfReturn","ID_TransactionType","IsDebit","ID_Supplier"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDateReadOnly!==undefined&&s.setDateReadOnly(n);s.setExchangeRateReadOnly!==undefined&&s.setExchangeRateReadOnly(n);s.setIsImportedReadOnly!==undefined&&s.setIsImportedReadOnly(n);s.setReadOnly!==undefined&&s.setReadOnly(n);s.setID_CurrencyReadOnly!==undefined&&s.setID_CurrencyReadOnly(n);s.setReasonOfReturnReadOnly!==undefined&&s.setReasonOfReturnReadOnly(n);s.setID_TransactionTypeReadOnly!==undefined&&s.setID_TransactionTypeReadOnly(n);s.setIsDebitReadOnly!==undefined&&s.setIsDebitReadOnly(n);s.setID_SupplierReadOnly!==undefined&&s.setID_SupplierReadOnly(n);$.each(["PurchaseReturn_Detail_Serials","PurchaseReturnDetails"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Comment"||n.dataField==="Date"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="DateCreated"||n.dataField==="DocumentNo"||n.dataField==="ExchangeRate"||n.dataField==="ID"||n.dataField==="IsImported"||n.dataField==="DateModified"||n.dataField==="DetailCount"||n.dataField==="Reason"||n.dataField==="ReasonOfReturn"||n.dataField==="IsDebit"||n.dataField==="Subtotal"||n.dataField==="TotalAmount"||n.dataField==="TotalQty"||n.dataField==="TotalVat"||n.dataField==="VatRate"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CanceledBy"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateApproved"&&n.dataField!=="DateCanceled"&&n.dataField!=="DateCreated"&&n.dataField!=="DocumentNo"&&n.dataField!=="ID"&&n.dataField!=="DateModified"&&n.dataField!=="DetailCount"&&n.dataField!=="Reason"&&n.dataField!=="Subtotal"&&n.dataField!=="TotalAmount"&&n.dataField!=="TotalQty"&&n.dataField!=="TotalVat"&&n.dataField!=="VatRate"&&n.dataField!=="ID_ApprovedBy"&&n.dataField!=="ID_CanceledBy"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"DocumentNo",label:{text:"PR No.",alignment:"right",showColon:!1,location:"left"},dataField:"DocumentNo",editorType:"dxTextBox",editorOptions:{PropertyName:"DocumentNo",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DocumentNo",n)},tabIndex:1e8}},{name:"Date",label:{text:"PR Date",alignment:"right",showColon:!1,location:"left"},dataField:"Date",editorType:"dxDateBox",editorOptions:{PropertyName:"Date",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("Date",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify PR Date"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"PR Date is required"}],cssClass:"js-dx-required"},{name:"ID_TransactionType",label:{text:"PR Type",alignment:"right",showColon:!1,location:"left"},dataField:"ID_TransactionType",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_TransactionType",showClearButton:!1,items:[{ID:2,Name:"Non-Trade"},{ID:1,Name:"Trade"}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_TransactionType",value:t});s.$scope.CurrentObject.ID_TransactionType=t!==null?t.ID:null;s.$scope.CurrentObject.ID_TransactionType_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_TransactionType",n)},displayExpr:"Name",valueExpr:"ID",onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify PR Type"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"PR Type is required"}],cssClass:"js-dx-required"},{name:"ID_Supplier",label:{text:"Supplier",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Supplier",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_Supplier",SQL:"2Usma4fySDptgcDtKMkSPiiacYNWbcq/IFwV3RhIK/4JLRDYaS18d4F0VWlEHXcVolJ073KPL7hkUzdrGCtMYW4FYJ4djBb/Vpo4HrKahXIKs7rnCOs30g9O7FG9UVrjQel3RtSzyWL3kNf42koMvz79KdqU98Mg9ktAfkrEGIBiNGFg/PLYATVV+g+yXc0+7mr1Wk+lIQHOquAGfSzbpw==",IsDeveloperMode:!1,ID_Control:9652,ID_ModelProperty:7755,ControlName:"ID_Supplier",DisplayProperty:"Supplier",CurrentObject:s.CurrentObject,FormatKey:"BF17BAD8-74C2-4CF4-BB02-BC4D818480A9",ModelOption:{ID_DetailView:3102,ModelPropertyName:"Supplier",IsModal:s.IsModal===!0,ID_Model_Caller:2149,Icon:"mdi mdi-contact-mail"},Columns:["ID","Name","Address"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_Supplier!=null&&(t=[{ID:s.$scope.CurrentObject.ID_Supplier,Name:s.$scope.CurrentObject.Supplier}],s.$scope.CurrentObject.EXPR_ID_Supplier=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_Supplier",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_Supplier=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Supplier",value:t})});s.$scope.CurrentObject.ID_Supplier=t!==null?t.ID:null;s.$scope.CurrentObject.Supplier=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Supplier",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Supplier};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Supplier"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Supplier is required"}],cssClass:"js-dx-required"},{name:"IsImported",label:{text:"Imported",alignment:"right",showColon:!1,location:"left"},dataField:"IsImported",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsImported",onInitialized:function(n){s.onControl_Initialized("IsImported",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsImported=n.value}}},{name:"VatRate",label:{text:"VAT Rate",alignment:"right",showColon:!1,location:"left"},dataField:"VatRate",editorType:"jDxNumberBox",editorOptions:{PropertyName:"VatRate",readOnly:!0,PropertyName:"VatRate",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.VatRate=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("VatRate",n)},tabIndex:1e8}},{name:"TotalVat",label:{text:"Total VAT",alignment:"right",showColon:!1,location:"left"},dataField:"TotalVat",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalVat",readOnly:!0,PropertyName:"TotalVat",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalVat=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalVat",n)},tabIndex:1e8}},{name:"TotalAmount",label:{text:"Total Amount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalAmount",readOnly:!0,PropertyName:"TotalAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)},tabIndex:1e8}},{name:"Subtotal",label:{text:"Subtotal",alignment:"right",showColon:!1,location:"left"},dataField:"Subtotal",editorType:"jDxNumberBox",editorOptions:{PropertyName:"Subtotal",readOnly:!0,PropertyName:"Subtotal",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.Subtotal=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("Subtotal",n)},tabIndex:1e8}},{name:"TotalQty",label:{text:"Total Qty",alignment:"right",showColon:!1,location:"left"},dataField:"TotalQty",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalQty",readOnly:!0,PropertyName:"TotalQty",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalQty=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalQty",n)},tabIndex:1e8}},{name:"DetailCount",label:{text:"Detail Count",alignment:"right",showColon:!1,location:"left"},dataField:"DetailCount",editorType:"dxTextBox",editorOptions:{PropertyName:"DetailCount",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DetailCount",n)},tabIndex:1e8}},{name:"ID_Warehouse",label:{text:"Warehouse",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Warehouse",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_Warehouse",readOnly:!0,showClearButton:!0,items:[{ID:1,Code:"HO",Name:"Head Office"},{ID:2,Code:"PP",Name:"Progressive Poultry"},{ID:3,Code:"CO",Name:"Cebu Office"},{ID:4,Code:"C",Name:"Cuenco"},{ID:5,Code:null,Name:"ACE - SM FV"},{ID:6,Code:null,Name:"ACE - SM MAKATI"},{ID:7,Code:null,Name:"ACE - SM MANILA"},{ID:8,Code:null,Name:"ACE - SM MARIKINA"},{ID:9,Code:null,Name:"ACE - SM MARILAO"},{ID:10,Code:null,Name:"ACE - SM NE"},{ID:11,Code:null,Name:"ACE - SM PAMPANGA"},{ID:12,Code:null,Name:"Handyman Farmers/riverbanks marikina"},{ID:13,Code:null,Name:"Handyman Galleria"},{ID:14,Code:null,Name:"Handyman Lucky Gold Pasig"},{ID:15,Code:null,Name:"Handyman Montalban"},{ID:16,Code:null,Name:"Handyman Pagsanjan laguna"},{ID:17,Code:null,Name:"Handyman Rds alimall"},{ID:18,Code:null,Name:"Handyman Rds antipolo"},{ID:19,Code:null,Name:"Handyman Rds metro east"},{ID:20,Code:null,Name:"Handyman Rds novaliches"},{ID:21,Code:null,Name:"Handyman Rp cdo"},{ID:22,Code:null,Name:"Handyman Rp il centro"},{ID:23,Code:null,Name:"Handyman Victoria Timog"},{ID:24,Code:null,Name:"Lido"},{ID:25,Code:null,Name:"MBR"},{ID:26,Code:null,Name:"SM Manila"},{ID:27,Code:null,Name:"SM Megamall"},{ID:28,Code:"EO",Name:"Executive Office"},{ID:35,Code:null,Name:"Handyman Cabanatuan"},{ID:41,Code:null,Name:"Cuenco B"},{ID:47,Code:"EPP-ON",Name:"EPP Warehouse (Online)"},{ID:48,Code:null,Name:"Ace Hardware - "},{ID:66,Code:null,Name:"Ace Hardware - SM BACOOR CAVITE"},{ID:67,Code:null,Name:"Ace Hardware - SM DASMA CAVITE"},{ID:68,Code:null,Name:"Ace Hardware - SM FAIRVIEW"},{ID:69,Code:null,Name:"Ace Hardware - SM MAKATI"},{ID:70,Code:null,Name:"Ace Hardware - SM MANILA"},{ID:71,Code:null,Name:"Ace Hardware - SM MARIKINA"},{ID:72,Code:null,Name:"Ace Hardware - SM MARILAO"},{ID:73,Code:null,Name:"Ace Hardware - SM MARKET MARKET"},{ID:74,Code:null,Name:"Ace Hardware - SM MEGAMALL"},{ID:75,Code:null,Name:"Ace Hardware - SM NORTH"},{ID:76,Code:null,Name:"Ace Hardware - SM PAMPANGA"},{ID:77,Code:null,Name:"Ace Hardware - SM SAN LAZARO"},{ID:78,Code:null,Name:"Ace Hardware - SM TAYTAY"},{ID:83,Code:null,Name:"Handyman - NOVALICHES"},{ID:84,Code:null,Name:"Handyman - ANTIPOLO"},{ID:85,Code:null,Name:"Handyman - METRO EAST"},{ID:87,Code:null,Name:"Handyman - GALLERIA"},{ID:88,Code:null,Name:"Handyman - RIVERBANKS"},{ID:89,Code:null,Name:"Handyman - RP IL CENTRO"},{ID:90,Code:null,Name:"Handyman - MONTALBAN"},{ID:91,Code:null,Name:"Handyman - PALAWAN"},{ID:92,Code:null,Name:"Handyman - TIMOG"},{ID:93,Code:null,Name:"Handyman - CABANATUAN"},{ID:94,Code:null,Name:"Handyman - ALI MALL"},{ID:95,Code:null,Name:"Handyman - LUCKY GOLD"},{ID:96,Code:null,Name:"Handyman - PAGSANJAN"},{ID:97,Code:null,Name:"Handyman - FARMERS"},{ID:98,Code:null,Name:"Handyman - RP CDO"},{ID:99,Code:null,Name:"Handyman - CAINTA"},{ID:100,Code:null,Name:"Handyman - VIOLAGO"},{ID:101,Code:null,Name:"Handyman - PIONEER"},{ID:102,Code:null,Name:"Handyman - CABUYAO"},{ID:103,Code:null,Name:"Defective"},{ID:105,Code:null,Name:"Okada Warehouse"},{ID:106,Code:null,Name:"RWM Warehouse"},{ID:107,Code:"EPP-OH",Name:"EPP Warehouse (OnHand)"},{ID:108,Code:null,Name:"Ace Hardware - San Jose Del Monte"},{ID:109,Code:null,Name:"Handyman - North EDSA"},{ID:110,Code:null,Name:"Handyman - Malabon"},{ID:112,Code:null,Name:"Handyman - Iba, Zambales"},{ID:113,Code:null,Name:"Handyman - Lemery, Batangas"},{ID:114,Code:null,Name:"DEMO/SERVICES"},{ID:115,Code:null,Name:"DEFECTIVES Warehouse"},{ID:117,Code:null,Name:"Connecticut"}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_Warehouse",value:t});s.$scope.CurrentObject.ID_Warehouse=t!==null?t.ID:null;s.$scope.CurrentObject.Warehouse=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_Warehouse",n)},displayExpr:"Name",valueExpr:"ID",onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Warehouse"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}}]},{itemType:"group",colCount:1,IsShowLabel:!0,colSpan:1,caption:"Others",items:[{name:"ReasonOfReturn",label:{text:"Reason of Return",alignment:"right",showColon:!1,location:"left"},dataField:"ReasonOfReturn",editorType:"dxTextArea",editorOptions:{PropertyName:"ReasonOfReturn",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:150,onInitialized:function(n){s.onControl_Initialized("ReasonOfReturn",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Reason of Return"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Reason of Return is required"}],cssClass:"js-dx-required"}]}]}]},{ID_Tab:19336,title:"Forex",colCount:1,items:[{name:"ID_Currency",label:{text:"Currency",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Currency",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_Currency",showClearButton:!0,items:[{ID:1,Name:"Philippine Peso",Conversion:1},{ID:2,Name:"US Dollar",Conversion:49.34},{ID:3,Name:"Japan Yen",Conversion:1.49},{ID:4,Name:"EURO",Conversion:null},{ID:5,Name:"SGD Dollar",Conversion:null},{ID:6,Name:"United Arab Emirates Dirham",Conversion:null}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_Currency",value:t});s.$scope.CurrentObject.ID_Currency=t!==null?t.ID:null;s.$scope.CurrentObject.ID_Currency_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_Currency",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"ExchangeRate",label:{text:"Exchange Rate",alignment:"right",showColon:!1,location:"left"},dataField:"ExchangeRate",editorType:"dxTextBox",editorOptions:{PropertyName:"ExchangeRate",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ExchangeRate",n)}}}]}]}]},s.$scope.PurchaseReturnDetailsGridOption=s.GetDetailGridOption("PurchaseReturn_Detail_LookUp_ListView","$parent.$parent.CurrentObject.PurchaseReturnDetails","PurchaseReturnDetails",[{ID_Column:10030,dataField:"PartNo",allowFixing:!0,visible:!1,caption:"Part No",width:91,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_Column:10034,dataField:"ItemCode",allowFixing:!0,visible:!0,caption:"Item Code",width:89,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7765,ID_Column:9816,dataField:"ID_Item",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"Item Name",width:160,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.Item===undefined&&s.console_warn("Item is undefined in datasource");var i=t.data.Item!==undefined?t.data.Item===null?"-":t.data.Item:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_Column:10033,dataField:"SupplierCode",allowFixing:!0,visible:!1,caption:"Supplier Code",width:149,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7758,ID_Column:9809,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:7759,ID_Column:9810,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7760,ID_Column:9811,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7766,ID_Column:9817,dataField:"Description",allowFixing:!0,visible:!1,caption:"Description",width:364,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{editorOptions:{min:0},ID_ModelProperty:7777,ID_Column:9845,dataField:"RefQuantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!0,caption:"RR Qty",width:51,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7761,ID_Column:9812,dataField:"Quantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!0,caption:"Qty",width:61,allowEditing:!0,dataType:"number",isAllowZero:!0,validationRules:[{type:"required",message:"Qty is required"}],cssClass:"editable-cell  js-required"},{editorOptions:{min:0},ID_ModelProperty:7764,ID_Column:9815,dataField:"ID_UOM",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"UOM",width:80,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.UOM===undefined&&s.console_warn("UOM is undefined in datasource");var i=t.data.UOM!==undefined?t.data.UOM===null?"-":t.data.UOM:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:7762,ID_Column:9813,dataField:"UnitPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Unit Cost",width:85,allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"UnitPrice"},{ID_ModelProperty:7767,ID_Column:9818,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:200,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:7768,ID_Column:9819,dataField:"Notes",allowFixing:!0,visible:!1,caption:"Notes",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7771,ID_Column:9822,dataField:"VatAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"VAT Amt",width:80,allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{editorOptions:{min:0},ID_ModelProperty:7763,ID_Column:9814,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Total Amount",width:104,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:7772,ID_Column:9823,dataField:"ID_DocStatus",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Doc Status",width:200,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.DocStatus===undefined?s.console_warn("DocStatus is undefined in datasource"):(n.addClass("DocStatus"),s.addColumnClass(n,"ID_DocStatus",t.data,t.data.DocStatus!=null?t.data.DocStatus.replace(" ",""):null));n.addClass("ID_DocStatus");var i=t.data.DocStatus!==undefined?t.data.DocStatus===null?"-":t.data.DocStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption DocStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:7774,ID_Column:9825,dataField:"Balance",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Balance",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:16958,ID_Column:19045,dataField:"Reference",allowFixing:!0,visible:!1,caption:"Reference",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7773,ID_Column:9824,dataField:"ID_DocDetail",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Reference",width:200,alignment:"left",fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.Reference===undefined&&s.console_warn("Reference is undefined in datasource");var i=t.data.Reference!==undefined?t.data.Reference===null?"-":t.data.Reference:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:17024,ID_Column:19243,dataField:"GrossAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!1,caption:"Gross Amt",width:473,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:7770,ID_Column:9821,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",width:250,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:17056,ID_Column:19303,dataField:"IsFree",allowFixing:!0,visible:!0,caption:"Free",width:86,allowEditing:!0,dataType:"boolean",isAllowZero:!0,cssClass:"editable-cell "},{editorOptions:{min:0},ID_ModelProperty:17268,ID_Column:19715,dataField:"ID_FilingStatus",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Filing Status",width:200,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.FilingStatus===undefined?s.console_warn("FilingStatus is undefined in datasource"):(n.addClass("FilingStatus"),s.addColumnClass(n,"ID_FilingStatus",t.data,t.data.FilingStatus!=null?t.data.FilingStatus.replace(" ",""):null));n.addClass("ID_FilingStatus");var i=t.data.FilingStatus!==undefined?t.data.FilingStatus===null?"-":t.data.FilingStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption FilingStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{editorOptions:{min:0},ID_ModelProperty:18152,ID_Column:21310,dataField:"ID_Brand",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_Brand",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:19527,ID_Column:23970,dataField:"ID_DocDetailParentModel",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_DocDetailParentModel",allowEditing:!1,dataType:"number",isAllowZero:!0}],"",4182,[{Name:"PurchaseReturn_Detail_Serials",PropertyName:"PurchaseReturn_Detail_Serials",Caption:"Serials"}],250,"@ID",null,"Details",3372,3221,9680,7776,[{column:"ID",customizeText:function(){return"Total Summary"}},{column:"UnitPrice",customizeText:function(){return"0.00"},summaryType:"count"},{column:"VatAmt",customizeText:function(){return"0.00"},summaryType:"count"},{column:"TotalAmount",customizeText:function(){return"0.00"},summaryType:"count"}],100),s.$scope.PurchaseReturn_Detail_SerialsGridOption=s.GetDetailGridOption("PurchaseReturn_Detail_Serial_LookUp_ListView","$parent.$parent.CurrentObject.PurchaseReturn_Detail_Serials","PurchaseReturn_Detail_Serials",[{editorOptions:{min:0},ID_ModelProperty:7839,ID_Column:10018,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:7840,ID_Column:10019,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7841,ID_Column:10020,dataField:"Name",allowFixing:!0,visible:!0,caption:"Serial No.",width:500,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:7842,ID_Column:10021,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",width:200,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:7843,ID_Column:10022,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:7844,ID_Column:10023,dataField:"ID_PurchaseReturn_Detail",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_PurchaseReturn_Detail",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0}],"",4188,null,230,"@ID","PurchaseReturnDetails","Serials",3386,3227,9768,7845,undefined,100),s.$scope.PurchaseReturn_Detail_Serials_MenuOptions=[],s.$scope.PurchaseReturnDetails_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{isForm:!1,Caption:"Details",Name:"PurchaseReturnDetailsGridContainer",title:"Details",PropertyName:"PurchaseReturnDetails",DisplayProperty:"Name",GridOption:s.$scope.PurchaseReturnDetailsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.PurchaseReturnDetails_MenuOptions"}),ChildGrids:[{isForm:!1,Caption:"Serials",Name:"PurchaseReturn_Detail_SerialsGridContainer",title:"Serials",PropertyName:"PurchaseReturn_Detail_Serials",DisplayProperty:"Name",GridOption:s.$scope.PurchaseReturn_Detail_SerialsGridOption,width:"99.6%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.PurchaseReturn_Detail_Serials_MenuOptions"})}]},{title:"Comment",isForm:!0,ID_Tab:9656,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]}]}},{title:"Status",isForm:!0,ID_Tab:9659,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.LastModifiedBy":"$parent.$parent.CurrentObject.LastModifiedBy","formData.ApprovedBy":"$parent.$parent.CurrentObject.ApprovedBy","formData.CancelledBy":"$parent.$parent.CurrentObject.CancelledBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified","formData.DateApproved":"$parent.$parent.CurrentObject.DateApproved","formData.DateCancelled":"$parent.$parent.CurrentObject.DateCancelled","formData.Reason":"$parent.$parent.CurrentObject.Reason","formData.IsDebit":"$parent.$parent.CurrentObject.IsDebit"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["IsDebit"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setIsDebitReadOnly!==undefined&&s.setIsDebitReadOnly(n)},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CanceledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="Reason"||n.dataField==="IsDebit")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CanceledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="Reason")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"ID_ApprovedBy",label:{text:"Approved by",alignment:"right",showColon:!1,location:"left"},dataField:"ApprovedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ApprovedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ApprovedBy",n)},tabIndex:1e8}},{name:"ID_CancelledBy",label:{text:"Cancelled By",alignment:"right",showColon:!1,location:"left"},dataField:"CancelledBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CancelledBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CancelledBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"DateApproved",label:{text:"Date Approved",alignment:"right",showColon:!1,location:"left"},dataField:"DateApproved",editorType:"dxDateBox",editorOptions:{PropertyName:"DateApproved",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateApproved",n)},tabIndex:1e8}},{name:"DateCancelled",label:{text:"Date Cancelled",alignment:"right",showColon:!1,location:"left"},dataField:"DateCancelled",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCancelled",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCancelled",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Reason"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}},{name:"IsDebit",label:{text:"Debit",alignment:"right",showColon:!1,location:"left"},dataField:"IsDebit",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsDebit",onInitialized:function(n){s.onControl_Initialized("IsDebit",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsDebit=n.value}}}]}]}},{title:"Acct. Entries",isForm:!0,ID_Tab:294262,name:"JVTab",formOption:{bindingOptions:{"formData.JVGrid":"$parent.$parent.CurrentObject.JVGrid"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["JVGrid"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setJVGridReadOnly!==undefined&&s.setJVGridReadOnly(n)},s.onJVTab_TabFormInitialized!==undefined)s.onJVTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0&&(s.$scope.CurrentObject.$dirty=!1)},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"JVGrid",label:{text:"Acct. Entries",location:"top",showColon:!1},dataField:"JVGrid",editorType:"jdxGridView",editorOptions:{PropertyName:"JVGrid",SQL:"CK74SUcDI3uLICfuOcxnSvyntnMOJNHBhIzm5i6POXafLsAq+ZSf67GZ5fq55PLOl9LNXJFS26hC0cCE9kdvrcHGS/5TvqJ17QmeCPIp9Ei1IF8DR1Wa9v992iQqRwxwQpj/CSbgpSSqG7ggd2d/Kb75nBNOM/+iQqu5Rt1gUnBIMKbogUJRuquqIWeH85a/IaW802EHx5a1FEGGx7RhoyLn/ZKwm1OLtm1ljjQvey9dp/jv4fHtWLD+gqsHy81yCs/spIuknkjFs8nJJJtXw8VIEdRE/DtQxEilcyFMmZ0=",height:"300px",ID_View:"1734DC4F-7F9E-4C62-BBFB-A317E7E58648",OnGridInit:function(n){s.$GridControlList==undefined&&(s.$GridControlList=[]);s.$GridControlList.push(n)},onLoad:function(n){(n.params==null||n.params==undefined)&&(n.params={});n.params.ID=s.$scope.CurrentObject.ID},onLoad:function(n){n.params==undefined&&(n.params={});n.params==null&&(n.params={});n.params.ID=s.$scope.CurrentObject.ID;console.log("onLoad",n.params)}}}]}]}}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:2149,PurchaseReturnDetails:3221,PurchaseReturn_Detail_Serials:3227},s.$dateFields.push("Date"),s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("DateApproved"),s.$dateFields.push("DateCancelled"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    