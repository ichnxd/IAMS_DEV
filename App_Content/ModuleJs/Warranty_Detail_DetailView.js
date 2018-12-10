define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Warranty_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9392,s.ID_View=11265,s.ID_Model=8425,s.ModelViewName="Warranty_Detail_DetailView",s.ModelName="Warranty_Detail",s.DisplayName="Warranty_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8425},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Description":"CurrentObject.Description","formData.ID_DeliveryReceipt_Detail":"CurrentObject.ID_DeliveryReceipt_Detail","formData.IsActive":"CurrentObject.IsActive","formData.isSerialized":"CurrentObject.isSerialized","formData.Name":"CurrentObject.Name","formData.Quantity":"CurrentObject.Quantity","formData.TotalAmount":"CurrentObject.TotalAmount","formData.UnitPrice":"CurrentObject.UnitPrice","formData.ID_UOM":"CurrentObject.ID_UOM","formData.ID_Warranty":"CurrentObject.ID_Warranty","formData.ID_Item":"CurrentObject.ID_Item"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","Description","ID","ID_DeliveryReceipt_Detail","IsActive","isSerialized","Name","Quantity","TotalAmount","UnitPrice","ID_UOM","ID_Warranty","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDescriptionReadOnly!==undefined&&s.setDescriptionReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_DeliveryReceipt_DetailReadOnly!==undefined&&s.setID_DeliveryReceipt_DetailReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setisSerializedReadOnly!==undefined&&s.setisSerializedReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setUnitPriceReadOnly!==undefined&&s.setUnitPriceReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setID_WarrantyReadOnly!==undefined&&s.setID_WarrantyReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Description"||n.dataField==="ID"||n.dataField==="ID_DeliveryReceipt_Detail"||n.dataField==="IsActive"||n.dataField==="isSerialized"||n.dataField==="Name"||n.dataField==="Quantity"||n.dataField==="TotalAmount"||n.dataField==="UnitPrice"||n.dataField==="ID_UOM"||n.dataField==="ID_Warranty"||n.dataField==="ID_Item")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Warranty",label:{text:"ID_Warranty",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Warranty",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Warranty",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Warranty",n)}}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"isSerialized",label:{text:"isSerialized",alignment:"right",showColon:!1,location:"left"},dataField:"isSerialized",editorType:"dxCheckBox",editorOptions:{PropertyName:"isSerialized",onInitialized:function(n){s.onControl_Initialized("isSerialized",n)},onValueChanged:function(n){s.$scope.CurrentObject.isSerialized=n.value}}},{name:"Description",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Description",editorType:"dxTextBox",editorOptions:{PropertyName:"Description",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Description",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)}}},{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"UnitPrice",label:{text:"UnitPrice",alignment:"right",showColon:!1,location:"left"},dataField:"UnitPrice",editorType:"dxTextBox",editorOptions:{PropertyName:"UnitPrice",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("UnitPrice",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"ID_DeliveryReceipt_Detail",label:{text:"ID_DeliveryReceipt_Detail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DeliveryReceipt_Detail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DeliveryReceipt_Detail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DeliveryReceipt_Detail",n)}}}]}]}]},{ID_Tab:25553,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:25554,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8425},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    