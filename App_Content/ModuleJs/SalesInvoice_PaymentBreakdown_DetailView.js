define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="SalesInvoice_PaymentBreakdown",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9267,s.ID_View=9843,s.ID_Model=8301,s.ModelViewName="SalesInvoice_PaymentBreakdown_DetailView",s.ModelName="SalesInvoice_PaymentBreakdown",s.DisplayName="SalesInvoice_PaymentBreakdown",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8301},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.FilingStatus":"CurrentObject.FilingStatus","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Date":"CurrentObject.Date","formData.DateCreated":"CurrentObject.DateCreated","formData.DocumentNo":"CurrentObject.DocumentNo","formData.Notes":"CurrentObject.Notes","formData.PaidAmount":"CurrentObject.PaidAmount","formData.Reason":"CurrentObject.Reason","formData.ID_SalesInvoice":"CurrentObject.ID_SalesInvoice","formData.Subtotal":"CurrentObject.Subtotal","formData.TotalAmount":"CurrentObject.TotalAmount","formData.TotalVat":"CurrentObject.TotalVat","formData.VatRate":"CurrentObject.VatRate","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.ID_BusinessPartner":"CurrentObject.ID_BusinessPartner","formData.ApprovedBy":"CurrentObject.ApprovedBy","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","Date","DocumentNo","Notes","PaidAmount","ID","ID_SalesInvoice","Subtotal","TotalAmount","TotalVat","VatRate","IsActive","Name","ID_BusinessPartner"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDateReadOnly!==undefined&&s.setDateReadOnly(n);s.setDocumentNoReadOnly!==undefined&&s.setDocumentNoReadOnly(n);s.setNotesReadOnly!==undefined&&s.setNotesReadOnly(n);s.setPaidAmountReadOnly!==undefined&&s.setPaidAmountReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_SalesInvoiceReadOnly!==undefined&&s.setID_SalesInvoiceReadOnly(n);s.setSubtotalReadOnly!==undefined&&s.setSubtotalReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setTotalVatReadOnly!==undefined&&s.setTotalVatReadOnly(n);s.setVatRateReadOnly!==undefined&&s.setVatRateReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setID_BusinessPartnerReadOnly!==undefined&&s.setID_BusinessPartnerReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="ID_FilingStatus"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Date"||n.dataField==="DateCreated"||n.dataField==="DocumentNo"||n.dataField==="Notes"||n.dataField==="PaidAmount"||n.dataField==="Reason"||n.dataField==="ID"||n.dataField==="ID_SalesInvoice"||n.dataField==="Subtotal"||n.dataField==="TotalAmount"||n.dataField==="TotalVat"||n.dataField==="VatRate"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="ID_BusinessPartner"||n.dataField==="ID_ApprovedBy"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="ID_FilingStatus"&&n.dataField!=="DateCreated"&&n.dataField!=="Reason"&&n.dataField!=="ID_ApprovedBy"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_SalesInvoice",label:{text:"ID_SalesInvoice",alignment:"right",showColon:!1,location:"left"},dataField:"ID_SalesInvoice",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_SalesInvoice",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_SalesInvoice",n)}}},{name:"PaidAmount",label:{text:"PaidAmount",alignment:"right",showColon:!1,location:"left"},dataField:"PaidAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"PaidAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("PaidAmount",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"DocumentNo",label:{text:"DocumentNo",alignment:"right",showColon:!1,location:"left"},dataField:"DocumentNo",editorType:"dxTextBox",editorOptions:{PropertyName:"DocumentNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("DocumentNo",n)}}},{name:"ID_BusinessPartner",label:{text:"ID_BusinessPartner",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BusinessPartner",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_BusinessPartner",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_BusinessPartner",n)}}},{name:"Date",label:{text:"Date",alignment:"right",showColon:!1,location:"left"},dataField:"Date",editorType:"dxDateBox",editorOptions:{PropertyName:"Date",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("Date",n)}}},{name:"ID_FilingStatus",label:{text:"Filing Status",alignment:"right",showColon:!1,location:"left"},dataField:"FilingStatus",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_FilingStatus",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_FilingStatus",n)},tabIndex:1e8}},{name:"VatRate",label:{text:"VatRate",alignment:"right",showColon:!1,location:"left"},dataField:"VatRate",editorType:"jDxNumberBox",editorOptions:{PropertyName:"VatRate",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"VatRate",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.VatRate=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("VatRate",n)}}},{name:"TotalVat",label:{text:"TotalVat",alignment:"right",showColon:!1,location:"left"},dataField:"TotalVat",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalVat",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"TotalVat",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalVat=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalVat",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"TotalAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"Subtotal",label:{text:"Subtotal",alignment:"right",showColon:!1,location:"left"},dataField:"Subtotal",editorType:"jDxNumberBox",editorOptions:{PropertyName:"Subtotal",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"Subtotal",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.Subtotal=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("Subtotal",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Active"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Active is required"}],cssClass:"js-dx-required"},{name:"ID_ApprovedBy",label:{text:"Approved by",alignment:"right",showColon:!1,location:"left"},dataField:"ApprovedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ApprovedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ApprovedBy",n)},tabIndex:1e8}},{name:"Notes",label:{text:"Notes",alignment:"right",showColon:!1,location:"left"},dataField:"Notes",editorType:"dxTextBox",editorOptions:{PropertyName:"Notes",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Notes",n)}}}]}]}]},{ID_Tab:21530,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Comment"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Comment is required"}],cssClass:"js-dx-required"}]},{ID_Tab:21531,title:"Status",colCount:2,items:[{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}}]}]}]},s.$scope.CurrentObject.CRUD={Main:8301},s.$dateFields.push("Date"),s.$dateFields.push("DateCreated"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    