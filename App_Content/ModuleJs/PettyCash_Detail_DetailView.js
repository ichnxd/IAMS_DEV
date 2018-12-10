define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="PettyCash_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=6242,s.ID_View=6764,s.ID_Model=5276,s.ModelViewName="PettyCash_Detail_DetailView",s.ModelName="PettyCash_Detail",s.DisplayName="PettyCash_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:5276},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.AdvancedPaymentAmount":"CurrentObject.AdvancedPaymentAmount","formData.AdvancePaymentSubtotalAmount":"CurrentObject.AdvancePaymentSubtotalAmount","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_PaymentCustodian":"CurrentObject.ID_PaymentCustodian","formData.ID_PettyCash":"CurrentObject.ID_PettyCash","formData.ID_Reference":"CurrentObject.ID_Reference","formData.ID_ReferenceParentModel":"CurrentObject.ID_ReferenceParentModel","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.PaymentAmount":"CurrentObject.PaymentAmount","formData.ReferenceDate":"CurrentObject.ReferenceDate","formData.RRTotalAmount":"CurrentObject.RRTotalAmount","formData.TotalAmount":"CurrentObject.TotalAmount","formData.VatAmount":"CurrentObject.VatAmount"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["AdvancedPaymentAmount","AdvancePaymentSubtotalAmount","Code","Comment","ID","ID_PaymentCustodian","ID_PettyCash","ID_Reference","ID_ReferenceParentModel","IsActive","Name","PaymentAmount","ReferenceDate","RRTotalAmount","TotalAmount","VatAmount"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setAdvancedPaymentAmountReadOnly!==undefined&&s.setAdvancedPaymentAmountReadOnly(n);s.setAdvancePaymentSubtotalAmountReadOnly!==undefined&&s.setAdvancePaymentSubtotalAmountReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_PaymentCustodianReadOnly!==undefined&&s.setID_PaymentCustodianReadOnly(n);s.setID_PettyCashReadOnly!==undefined&&s.setID_PettyCashReadOnly(n);s.setID_ReferenceReadOnly!==undefined&&s.setID_ReferenceReadOnly(n);s.setID_ReferenceParentModelReadOnly!==undefined&&s.setID_ReferenceParentModelReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setPaymentAmountReadOnly!==undefined&&s.setPaymentAmountReadOnly(n);s.setReferenceDateReadOnly!==undefined&&s.setReferenceDateReadOnly(n);s.setRRTotalAmountReadOnly!==undefined&&s.setRRTotalAmountReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setVatAmountReadOnly!==undefined&&s.setVatAmountReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="AdvancedPaymentAmount"||n.dataField==="AdvancePaymentSubtotalAmount"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_PaymentCustodian"||n.dataField==="ID_PettyCash"||n.dataField==="ID_Reference"||n.dataField==="ID_ReferenceParentModel"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="PaymentAmount"||n.dataField==="ReferenceDate"||n.dataField==="RRTotalAmount"||n.dataField==="TotalAmount"||n.dataField==="VatAmount")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ReferenceDate",label:{text:"ReferenceDate",alignment:"right",showColon:!1,location:"left"},dataField:"ReferenceDate",editorType:"dxDateBox",editorOptions:{PropertyName:"ReferenceDate",width:"100%",type:"datetime",onInitialized:function(n){s.onControl_Initialized("ReferenceDate",n)}}},{name:"AdvancedPaymentAmount",label:{text:"AdvancedPaymentAmount",alignment:"right",showColon:!1,location:"left"},dataField:"AdvancedPaymentAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"AdvancedPaymentAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("AdvancedPaymentAmount",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"ID_Reference",label:{text:"ID_Reference",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Reference",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Reference",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Reference",n)}}},{name:"ID_ReferenceParentModel",label:{text:"ID_ReferenceParentModel",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ReferenceParentModel",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ReferenceParentModel",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ReferenceParentModel",n)}}},{name:"ID_PaymentCustodian",label:{text:"ID_PaymentCustodian",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PaymentCustodian",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PaymentCustodian",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PaymentCustodian",n)}}},{name:"PaymentAmount",label:{text:"PaymentAmount",alignment:"right",showColon:!1,location:"left"},dataField:"PaymentAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"PaymentAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("PaymentAmount",n)}}},{name:"VatAmount",label:{text:"VatAmount",alignment:"right",showColon:!1,location:"left"},dataField:"VatAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"VatAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("VatAmount",n)}}},{name:"AdvancePaymentSubtotalAmount",label:{text:"AdvancePaymentSubtotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"AdvancePaymentSubtotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"AdvancePaymentSubtotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("AdvancePaymentSubtotalAmount",n)}}},{name:"RRTotalAmount",label:{text:"RRTotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"RRTotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"RRTotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("RRTotalAmount",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_PettyCash",label:{text:"ID_PettyCash",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PettyCash",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PettyCash",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PettyCash",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify ID_PettyCash"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"ID_PettyCash is required"}],cssClass:"js-dx-required"}]}]}]},{ID_Tab:15975,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:15976,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:5276},s.$dateFields.push("ReferenceDate"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    