define(["app","baseDetailViewController","/JsApp/GetScript?Url=Doc%2fAR%2fQuotation%2fVC_Quotation"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this;s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1};n.DisplayName="Quotation Form";n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name;s.DisplayProperty="Name";s.ID_ModelObject=3128;s.ID_View=3415;s.ID_Model=2167;s.ModelViewName="Quotation_DetailView";s.ModelName="Quotation";s.DisplayName="Quotation Form";s.IsEditingOnly=!1;s.IsDeveloperMode=!1;s.$isAllowAdd=!0;s.$isAllowEdit=!0;s.CRUDTablesIds={Main:2167,Quotation_Details:3237};t.prototype.Init.call(this,n,i,r,u,f,e,o);var l=i,h=s.GetAutoCompleteDataSource("thUeJLFKMa/0sFOYEvmeQwlB4yf6RlO/NaDbCOWau+SuEJJ5kz7yXH5OqbC1hkel/t5PLSh16G43z/Xi1bo80qdy9YV9EBzjWZRqY3Vnc3Etkj+sIQNPVx532w0MTdEXBkBBVvfJvdesP0UhWTaozU4x/LKd0yO4ts7gGLrfRaY=",[]),c=s.GetControlDataSource("fAgfiMFPGKDAlNgWaX81f4OAsKtNe9kqnw8AbuE/nAFeHTKMJb86Ug/neVJu/jMQDG06ust/HqmrK6T9pqTjgUXcB9DSpAu6EnASQANuyj2O6SZXb0kjZLlp6LjxTdcZyb16xD6ErnoJkDJIadll7P6ix90K/UAwZu8Uee3Q+V8=");if(s.$scope.GeneralFormOptions={bindingOptions:{"formData.Comment":"CurrentObject.Comment","formData.Date":"CurrentObject.Date","formData.DateApproved":"CurrentObject.DateApproved","formData.DateCanceled":"CurrentObject.DateCanceled","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.DetailCount":"CurrentObject.DetailCount","formData.DocumentNo":"CurrentObject.DocumentNo","formData.IsWalkIn":"CurrentObject.IsWalkIn","formData.MaturityDate":"CurrentObject.MaturityDate","formData.Reason":"CurrentObject.Reason","formData.ID_PaymentTerm":"CurrentObject.ID_PaymentTerm","formData.ID_Salesman":"CurrentObject.ID_Salesman","formData.Subtotal":"CurrentObject.Subtotal","formData.TotalAmount":"CurrentObject.TotalAmount","formData.TotalVat":"CurrentObject.TotalVat","formData.Validity":"CurrentObject.Validity","formData.WalkInCustomer":"CurrentObject.WalkInCustomer","formData.ID_BusinessPartner":"CurrentObject.ID_BusinessPartner","formData.ID_Warehouse":"CurrentObject.ID_Warehouse","formData.CancelledBy":"CurrentObject.CancelledBy","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy","formData.ApprovedBy":"CurrentObject.ApprovedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","Date","ID","IsWalkIn","MaturityDate","ID_PaymentTerm","ID_Salesman","Validity","WalkInCustomer","ID_BusinessPartner","ID_Warehouse"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDateReadOnly!==undefined&&s.setDateReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setIsWalkInReadOnly!==undefined&&s.setIsWalkInReadOnly(n);s.setMaturityDateReadOnly!==undefined&&s.setMaturityDateReadOnly(n);s.setID_PaymentTermReadOnly!==undefined&&s.setID_PaymentTermReadOnly(n);s.setID_SalesmanReadOnly!==undefined&&s.setID_SalesmanReadOnly(n);s.setValidityReadOnly!==undefined&&s.setValidityReadOnly(n);s.setWalkInCustomerReadOnly!==undefined&&s.setWalkInCustomerReadOnly(n);s.setID_BusinessPartnerReadOnly!==undefined&&s.setID_BusinessPartnerReadOnly(n);s.setID_WarehouseReadOnly!==undefined&&s.setID_WarehouseReadOnly(n);$.each(["Quotation_Details"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Comment"||n.dataField==="Date"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DetailCount"||n.dataField==="DocumentNo"||n.dataField==="ID"||n.dataField==="IsWalkIn"||n.dataField==="MaturityDate"||n.dataField==="Reason"||n.dataField==="Subtotal"||n.dataField==="TotalAmount"||n.dataField==="TotalVat"||n.dataField==="Validity"||n.dataField==="WalkInCustomer"||n.dataField==="ID_CanceledBy"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateApproved"&&n.dataField!=="DateCanceled"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="DetailCount"&&n.dataField!=="DocumentNo"&&n.dataField!=="Reason"&&n.dataField!=="Subtotal"&&n.dataField!=="TotalAmount"&&n.dataField!=="TotalVat"&&n.dataField!=="ID_CanceledBy"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&n.dataField!=="ID_ApprovedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"DocumentNo",label:{text:"QTN No.",alignment:"right",showColon:!1,location:"left"},dataField:"DocumentNo",editorType:"dxTextBox",editorOptions:{PropertyName:"DocumentNo",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DocumentNo",n)},tabIndex:1e8}},{name:"Date",label:{text:"QTN Date",alignment:"right",showColon:!1,location:"left"},dataField:"Date",editorType:"dxDateBox",editorOptions:{PropertyName:"Date",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("Date",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify QTN Date"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"QTN Date is required"}],cssClass:"js-dx-required"},{name:"MaturityDate",label:{text:"Maturity Date",alignment:"right",showColon:!1,location:"left"},dataField:"MaturityDate",editorType:"dxDateBox",editorOptions:{PropertyName:"MaturityDate",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("MaturityDate",n)}}},{name:"ID_PaymentTerm",label:{text:"Payment Term",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PaymentTerm",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_PaymentTerm",showClearButton:!0,items:[{ID:1,Code:null,Name:"COD"},{ID:2,Code:null,Name:"7 Days"},{ID:3,Code:null,Name:"15 Days"},{ID:4,Code:null,Name:"30 Days"},{ID:5,Code:null,Name:"45 Days"},{ID:6,Code:null,Name:"60 Days"},{ID:7,Code:null,Name:"90 Days"},{ID:8,Code:null,Name:"PDC 7 Days\r\n"},{ID:9,Code:null,Name:"PDC 15 Days\r\n"},{ID:10,Code:null,Name:"PDC 30 Days"},{ID:11,Code:null,Name:"PDC 45 Days"},{ID:12,Code:null,Name:"PDC 60 Days"},{ID:13,Code:null,Name:"12 Months"},{ID:14,Code:null,Name:"24 Months\r\n"},{ID:15,Code:null,Name:"36 Months"},{ID:72,Code:null,Name:"21 Days"},{ID:73,Code:null,Name:"Consignment"},{ID:74,Code:null,Name:"Progress Billing"},{ID:75,Code:null,Name:" 3 Months"},{ID:76,Code:null,Name:"6 Months"},{ID:77,Code:null,Name:"12 Months"},{ID:78,Code:null,Name:"Monthly"},{ID:79,Code:null,Name:"Quarterly"},{ID:80,Code:null,Name:"10 days"},{ID:81,Code:null,Name:"3 DAYS"},{ID:82,Code:null,Name:"100%  Advance"},{ID:83,Code:null,Name:"Semi-Annual"}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_PaymentTerm",value:t});s.$scope.CurrentObject.ID_PaymentTerm=t!==null?t.ID:null;s.$scope.CurrentObject.PaymentTerm=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_PaymentTerm",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"Validity",label:{text:"Validity",alignment:"right",showColon:!1,location:"left"},dataField:"Validity",editorType:"dxTextBox",editorOptions:{PropertyName:"Validity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Validity",n)}}},{name:"ID_Warehouse",label:{text:"Warehouse",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Warehouse",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_Warehouse",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:c,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_Warehouse",value:t});s.$scope.CurrentObject.ID_Warehouse=t!==null?t.ID:null;s.$scope.CurrentObject.Warehouse=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_Warehouse",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"ID_Salesman",label:{text:"Salesman",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Salesman",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_Salesman",SQL:"sA2Xadi6yEFsL7aB6wDHeCt3zysCzccnO8Si0Q9ZKKtd5ony9j/l7Vig2mJ6ZYS21wCEyc7p6imZBNibanAdabvaACvAjRUbH0kkApzcJroy/VgKAJ4h/Ro/gJ+zpYToCP8Jx1EV1+eOgZKbPsvothbqS2llgQ5oY8AKijhc1gA=",IsDeveloperMode:!1,ID_Control:14885,ID_ModelProperty:12704,ControlName:"ID_Salesman",DisplayProperty:"Salesman",CurrentObject:s.CurrentObject,FormatKey:"E1370901-F952-4901-847D-7B0602E361D7",Columns:["ID","Name"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_Salesman!=null&&(t=[{ID:s.$scope.CurrentObject.ID_Salesman,Name:s.$scope.CurrentObject.Salesman}],s.$scope.CurrentObject.EXPR_ID_Salesman=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_Salesman",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_Salesman=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Salesman",value:t})});s.$scope.CurrentObject.ID_Salesman=t!==null?t.ID:null;s.$scope.CurrentObject.Salesman=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_Salesman",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Salesman};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Salesman"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Salesman is required"}],cssClass:"js-dx-required"}]},{itemType:"group",colCount:1,IsShowLabel:!0,colSpan:1,caption:"Customer Information",items:[{name:"ID_BusinessPartner",label:{text:"Customer",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BusinessPartner",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_BusinessPartner",SQL:"WoFuFdsE+xHKwzuHGjmlEd+GcJ7fD77RUifCn+yAax0KczYWKp68Dxh+nExsb3kgfbESPjwLUlOgmTt+JJShl2+kPFQxIu1eJnCCzSN2IU8Yh8kgFuQJS/aBNlhb5T2AMuTbGpxrMzhbZ1TaDP5uw5sD/MhR0rYyf8RohDfbsC+9hj84PmLRcLnxtUNVqoWslwAUIIGQkDzaoeupC1JK9FeHhl3VWVsbqmERuc5Cj/12fv3jn5R/jiW7gXufUFtB",IsDeveloperMode:!1,ID_Control:6582,ID_ModelProperty:5869,ControlName:"ID_BusinessPartner",DisplayProperty:"Customer",CurrentObject:s.CurrentObject,FormatKey:"AEF32FA4-F549-4750-9992-DDA7C4930879",ModelOption:{ID_DetailView:3102,ModelPropertyName:"Customer",IsModal:s.IsModal===!0,ID_Model_Caller:2167,Icon:"mdi mdi-contact-mail"},Columns:["ID","Name","Address"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_BusinessPartner!=null&&(t=[{ID:s.$scope.CurrentObject.ID_BusinessPartner,Name:s.$scope.CurrentObject.Customer}],s.$scope.CurrentObject.EXPR_ID_BusinessPartner=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_BusinessPartner",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_BusinessPartner=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_BusinessPartner",value:t})});s.$scope.CurrentObject.ID_BusinessPartner=t!==null?t.ID:null;s.$scope.CurrentObject.Customer=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_BusinessPartner",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.Customer};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Customer"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Customer is required"}],cssClass:"js-dx-required"},{name:"IsWalkIn",label:{text:"Walk-In",alignment:"right",showColon:!1,location:"left"},dataField:"IsWalkIn",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsWalkIn",onInitialized:function(n){s.onControl_Initialized("IsWalkIn",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsWalkIn=n.value}}},{name:"WalkInCustomer",label:{text:"Walk-in Customer",alignment:"right",showColon:!1,location:"left"},dataField:"WalkInCustomer",editorType:"dxAutocomplete",editorOptions:{PropertyName:"WalkInCustomer",disabled:!0,dataSource:h,valueExpr:"Name",searchMode:"contains",onInitialized:function(n){s.onControl_Initialized("WalkInCustomer",n)},tabIndex:1e8}}]},{itemType:"group",colCount:1,IsShowLabel:!0,colSpan:1,caption:"Total",items:[{name:"TotalVat",label:{text:"VAT Amount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalVat",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalVat",readOnly:!0,PropertyName:"TotalVat",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalVat=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalVat",n)},tabIndex:1e8}},{name:"Subtotal",label:{text:"Subtotal",alignment:"right",showColon:!1,location:"left"},dataField:"Subtotal",editorType:"jDxNumberBox",editorOptions:{PropertyName:"Subtotal",readOnly:!0,PropertyName:"Subtotal",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.Subtotal=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("Subtotal",n)},tabIndex:1e8}},{name:"TotalAmount",label:{text:"Total Amount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalAmount",readOnly:!0,PropertyName:"TotalAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)},tabIndex:1e8}},{name:"DetailCount",label:{text:"Detail Count",alignment:"right",showColon:!1,location:"left"},dataField:"DetailCount",editorType:"dxTextBox",editorOptions:{PropertyName:"DetailCount",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DetailCount",n)},tabIndex:1e8}}]}]}]}]}]},s.$scope.Quotation_DetailsGridOption=s.GetDetailGridOption("Quotation_Detail_LookUp_ListView","$parent.$parent.CurrentObject.Quotation_Details","Quotation_Details",[{ID_Column:14238,dataField:"ReferenceNo",allowFixing:!0,visible:!1,caption:"Reference No",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9003,ID_Column:11330,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:9005,ID_Column:11332,dataField:"Name",allowFixing:!0,visible:!1,caption:"Name",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{ID_Column:14263,dataField:"ItemCode",allowFixing:!0,visible:!0,caption:"Item Code",width:75,fixed:!0,fixedPosition:"left",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9004,ID_Column:11331,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",width:108,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:9012,ID_Column:11339,dataField:"Description",allowFixing:!0,visible:!0,caption:"Description",width:250,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9018,ID_Column:11345,dataField:"ID_DocStatus",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"Doc Status",width:724,alignment:"left",allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){t.data.DocStatus===undefined?s.console_warn("DocStatus is undefined in datasource"):(n.addClass("DocStatus"),s.addColumnClass(n,"ID_DocStatus",t.data,t.data.DocStatus!=null?t.data.DocStatus.replace(" ",""):null));n.addClass("ID_DocStatus");var i=t.data.DocStatus!==undefined?t.data.DocStatus===null?"-":t.data.DocStatus:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption DocStatus '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)},cssClass:""},{ID_Column:19136,dataField:"VatAmountPerSRP",allowFixing:!0,visible:!1,caption:"VAT Amt",width:86,alignment:"right",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9007,ID_Column:11334,dataField:"Quantity",allowFixing:!0,format:"fixedPoint",precision:0,visible:!0,caption:"Quantity",width:68,allowEditing:!0,dataType:"number",isAllowZero:!0,validationRules:[{type:"required",message:"Quantity is required"}],cssClass:"editable-cell  js-required"},{editorOptions:{min:0},ID_ModelProperty:9009,ID_Column:11336,dataField:"TotalAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Line Total",width:102,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM",cssClass:"TotalAmount"},{editorOptions:{min:0},ID_ModelProperty:9020,ID_Column:11347,dataField:"Balance",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Balance",width:95,fixed:!0,fixedPosition:"right",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:9010,ID_Column:11337,dataField:"ID_UOM",allowFixing:!0,visible:!0,caption:"UOM",width:89,alignment:"left",allowEditing:!1,dataType:"object",isAllowZero:!0,cellTemplate:function(n,t){t.data.UOM===undefined&&s.console_warn("UOM is undefined in datasource");var i=t.data.UOM!==undefined?t.data.UOM===null?"-":t.data.UOM:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{editorOptions:{min:0},ID_ModelProperty:9008,ID_Column:11335,dataField:"UnitPrice",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"SRP",width:88,allowEditing:!0,dataType:"number",isAllowZero:!0,summaryType:"SUM",validationRules:[{type:"required",message:"SRP is required"}],cssClass:"editable-cell  js-required UnitPrice"},{editorOptions:{min:0},ID_ModelProperty:9006,ID_Column:11333,dataField:"ID_Quotation",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_Quotation",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9011,ID_Column:11338,dataField:"ID_Item",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_Item",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:9013,ID_Column:11340,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",width:200,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:9016,ID_Column:11343,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",width:200,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},ID_ModelProperty:9019,ID_Column:11346,dataField:"ID_DocDetail",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_DocDetail",width:200,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:9014,ID_Column:11341,dataField:"Notes",allowFixing:!0,visible:!1,caption:"Notes",width:761,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:17027,ID_Column:19247,dataField:"GrossAmount",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"Gross Amt",width:92,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:9017,ID_Column:11344,dataField:"VatAmt",allowFixing:!0,format:{type:"fixedPoint",precision:2},visible:!0,caption:"VAT Amt",width:87,allowEditing:!1,dataType:"number",isAllowZero:!0,summaryType:"SUM"},{ID_ModelProperty:17055,ID_Column:19301,dataField:"IsFree",allowFixing:!0,visible:!0,caption:"Free",width:100,allowEditing:!0,dataType:"boolean",isAllowZero:!0,cssClass:"editable-cell "}],"",4198,null,230,"@ID",null,"Details",3406,3237,10966,9021,[{column:"ID",customizeText:function(){return"Total Summary"}},{column:"TotalAmount",customizeText:function(){return"0.00"},summaryType:"count"},{column:"UnitPrice",customizeText:function(){return"0.00"},summaryType:"count"},{column:"VatAmt",customizeText:function(){return"0.00"},summaryType:"count"}],100),s.$scope.Quotation_Details_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{title:"Comment",isForm:!0,ID_Tab:12072,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:1,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:1,colSpan:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}},colSpan:2}]}]}},{title:"Status",isForm:!0,ID_Tab:12070,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.LastModifiedBy":"$parent.$parent.CurrentObject.LastModifiedBy","formData.ApprovedBy":"$parent.$parent.CurrentObject.ApprovedBy","formData.CancelledBy":"$parent.$parent.CurrentObject.CancelledBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified","formData.DateApproved":"$parent.$parent.CurrentObject.DateApproved","formData.DateCanceled":"$parent.$parent.CurrentObject.DateCanceled","formData.Reason":"$parent.$parent.CurrentObject.Reason"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CanceledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="Reason")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CanceledBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DateApproved"||n.dataField==="DateCanceled"||n.dataField==="Reason")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"ID_ApprovedBy",label:{text:"Approved by",alignment:"right",showColon:!1,location:"left"},dataField:"ApprovedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ApprovedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ApprovedBy",n)},tabIndex:1e8}},{name:"ID_CancelledBy",label:{text:"Cancelled By",alignment:"right",showColon:!1,location:"left"},dataField:"CancelledBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CancelledBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CancelledBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"DateApproved",label:{text:"Date Approved",alignment:"right",showColon:!1,location:"left"},dataField:"DateApproved",editorType:"dxDateBox",editorOptions:{PropertyName:"DateApproved",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateApproved",n)},tabIndex:1e8}},{name:"DateCanceled",label:{text:"Date Cancelled",alignment:"right",showColon:!1,location:"left"},dataField:"DateCanceled",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCanceled",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCanceled",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},tabIndex:1e8}}]}]}},{isForm:!1,Caption:"Details",Name:"Quotation_DetailsGridContainer",title:"Details",PropertyName:"Quotation_Details",DisplayProperty:"Name",GridOption:s.$scope.Quotation_DetailsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.Quotation_Details_MenuOptions"})}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:2167,Quotation_Details:3237},s.$dateFields.push("Date"),s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("DateApproved"),s.$dateFields.push("DateCanceled"),s.$dateFields.push("DeliveryDate"),s.$dateFields.push("MaturityDate"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    