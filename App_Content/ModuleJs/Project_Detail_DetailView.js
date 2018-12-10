define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Project_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9335,s.ID_View=11082,s.ID_Model=8369,s.ModelViewName="Project_Detail_DetailView",s.ModelName="Project_Detail",s.DisplayName="Project_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8369},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_Brand":"CurrentObject.ID_Brand","formData.ID_DocDetail":"CurrentObject.ID_DocDetail","formData.ID_TaxScheme":"CurrentObject.ID_TaxScheme","formData.ID_UOM":"CurrentObject.ID_UOM","formData.Quantity":"CurrentObject.Quantity","formData.RequestedQTY":"CurrentObject.RequestedQTY","formData.ID_Model":"CurrentObject.ID_Model","formData.ID_Project":"CurrentObject.ID_Project","formData.ID_SalesEndorsement":"CurrentObject.ID_SalesEndorsement","formData.TotalAmount":"CurrentObject.TotalAmount","formData.UnitPrice":"CurrentObject.UnitPrice","formData.Vat":"CurrentObject.Vat","formData.IsActive":"CurrentObject.IsActive","formData.IsNew":"CurrentObject.IsNew","formData.Name":"CurrentObject.Name","formData.ID_Item":"CurrentObject.ID_Item"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","ID","ID_Brand","ID_DocDetail","ID_TaxScheme","ID_UOM","Quantity","RequestedQTY","ID_Model","ID_Project","ID_SalesEndorsement","TotalAmount","UnitPrice","Vat","IsActive","IsNew","Name","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_BrandReadOnly!==undefined&&s.setID_BrandReadOnly(n);s.setID_DocDetailReadOnly!==undefined&&s.setID_DocDetailReadOnly(n);s.setID_TaxSchemeReadOnly!==undefined&&s.setID_TaxSchemeReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setRequestedQTYReadOnly!==undefined&&s.setRequestedQTYReadOnly(n);s.setID_ModelReadOnly!==undefined&&s.setID_ModelReadOnly(n);s.setID_ProjectReadOnly!==undefined&&s.setID_ProjectReadOnly(n);s.setID_SalesEndorsementReadOnly!==undefined&&s.setID_SalesEndorsementReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setUnitPriceReadOnly!==undefined&&s.setUnitPriceReadOnly(n);s.setVatReadOnly!==undefined&&s.setVatReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setIsNewReadOnly!==undefined&&s.setIsNewReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_Brand"||n.dataField==="ID_DocDetail"||n.dataField==="ID_TaxScheme"||n.dataField==="ID_UOM"||n.dataField==="Quantity"||n.dataField==="RequestedQTY"||n.dataField==="ID_Model"||n.dataField==="ID_Project"||n.dataField==="ID_SalesEndorsement"||n.dataField==="TotalAmount"||n.dataField==="UnitPrice"||n.dataField==="Vat"||n.dataField==="IsActive"||n.dataField==="IsNew"||n.dataField==="Name"||n.dataField==="ID_Item")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Project",label:{text:"ID_Project",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Project",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Project",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Project",n)}}},{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)}}},{name:"ID_Brand",label:{text:"ID_Brand",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Brand",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Brand",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Brand",n)}}},{name:"ID_Model",label:{text:"ID_Model",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Model",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Model",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Model",n)}}},{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"ID_TaxScheme",label:{text:"ID_TaxScheme",alignment:"right",showColon:!1,location:"left"},dataField:"ID_TaxScheme",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_TaxScheme",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_TaxScheme",n)}}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"UnitPrice",label:{text:"UnitPrice",alignment:"right",showColon:!1,location:"left"},dataField:"UnitPrice",editorType:"dxTextBox",editorOptions:{PropertyName:"UnitPrice",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("UnitPrice",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"Vat",label:{text:"Vat",alignment:"right",showColon:!1,location:"left"},dataField:"Vat",editorType:"dxTextBox",editorOptions:{PropertyName:"Vat",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Vat",n)}}},{name:"IsNew",label:{text:"New",alignment:"right",showColon:!1,location:"left"},dataField:"IsNew",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsNew",onInitialized:function(n){s.onControl_Initialized("IsNew",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsNew=n.value}}},{name:"RequestedQTY",label:{text:"RequestedQTY",alignment:"right",showColon:!1,location:"left"},dataField:"RequestedQTY",editorType:"dxTextBox",editorOptions:{PropertyName:"RequestedQTY",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("RequestedQTY",n)}}},{name:"ID_DocDetail",label:{text:"ID_DocDetail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DocDetail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DocDetail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DocDetail",n)}}},{name:"ID_SalesEndorsement",label:{text:"ID_SalesEndorsement",alignment:"right",showColon:!1,location:"left"},dataField:"ID_SalesEndorsement",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_SalesEndorsement",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_SalesEndorsement",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}}]}]}]},{ID_Tab:23028,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:23029,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8369},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    