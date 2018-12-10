define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Canvass Sheet",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=4153,s.ID_View=4490,s.ID_Model=3192,s.ModelViewName="CanvasSheet_Detail_DetailView",s.ModelName="CanvasSheet_Detail",s.DisplayName="Canvass Sheet",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:3192},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.ID_DocDetail":"CurrentObject.ID_DocDetail","formData.ID_DocParent":"CurrentObject.ID_DocParent","formData.ID_ItemRequest_Detail":"CurrentObject.ID_ItemRequest_Detail","formData.ID_Project":"CurrentObject.ID_Project","formData.ID_PurchaseRequest":"CurrentObject.ID_PurchaseRequest","formData.ID_UOM":"CurrentObject.ID_UOM","formData.ID_Brand":"CurrentObject.ID_Brand","formData.ID_Client":"CurrentObject.ID_Client","formData.IsFree":"CurrentObject.IsFree","formData.Name":"CurrentObject.Name","formData.Quantity":"CurrentObject.Quantity","formData.UnitPrice":"CurrentObject.UnitPrice","formData.ID_ItemRequest":"CurrentObject.ID_ItemRequest","formData.ID_Item":"CurrentObject.ID_Item","formData.LastModifiedBy":"CurrentObject.LastModifiedBy","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","ID","ID_DocDetail","ID_DocParent","ID_ItemRequest_Detail","ID_Project","ID_PurchaseRequest","ID_UOM","ID_Brand","ID_Client","IsFree","Name","Quantity","UnitPrice","ID_ItemRequest","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_DocDetailReadOnly!==undefined&&s.setID_DocDetailReadOnly(n);s.setID_DocParentReadOnly!==undefined&&s.setID_DocParentReadOnly(n);s.setID_ItemRequest_DetailReadOnly!==undefined&&s.setID_ItemRequest_DetailReadOnly(n);s.setID_ProjectReadOnly!==undefined&&s.setID_ProjectReadOnly(n);s.setID_PurchaseRequestReadOnly!==undefined&&s.setID_PurchaseRequestReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setID_BrandReadOnly!==undefined&&s.setID_BrandReadOnly(n);s.setID_ClientReadOnly!==undefined&&s.setID_ClientReadOnly(n);s.setIsFreeReadOnly!==undefined&&s.setIsFreeReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setUnitPriceReadOnly!==undefined&&s.setUnitPriceReadOnly(n);s.setID_ItemRequestReadOnly!==undefined&&s.setID_ItemRequestReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="ID"||n.dataField==="ID_DocDetail"||n.dataField==="ID_DocParent"||n.dataField==="ID_ItemRequest_Detail"||n.dataField==="ID_Project"||n.dataField==="ID_PurchaseRequest"||n.dataField==="ID_UOM"||n.dataField==="ID_Brand"||n.dataField==="ID_Client"||n.dataField==="IsFree"||n.dataField==="Name"||n.dataField==="Quantity"||n.dataField==="UnitPrice"||n.dataField==="ID_ItemRequest"||n.dataField==="ID_Item"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="ID_LastModifiedBy"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"ID_DocDetail",label:{text:"ID_DocDetail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DocDetail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DocDetail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DocDetail",n)}}},{name:"ID_PurchaseRequest",label:{text:"ID_PurchaseRequest",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PurchaseRequest",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PurchaseRequest",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PurchaseRequest",n)}}},{name:"UnitPrice",label:{text:"UnitPrice",alignment:"right",showColon:!1,location:"left"},dataField:"UnitPrice",editorType:"jDxNumberBox",editorOptions:{PropertyName:"UnitPrice",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"UnitPrice",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.UnitPrice=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("UnitPrice",n)}}},{name:"IsFree",label:{text:"Free",alignment:"right",showColon:!1,location:"left"},dataField:"IsFree",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsFree",onInitialized:function(n){s.onControl_Initialized("IsFree",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsFree=n.value}}},{name:"ID_Brand",label:{text:"ID_Brand",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Brand",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Brand",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Brand",n)}}},{name:"ID_Client",label:{text:"ID_Client",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Client",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Client",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Client",n)}}},{name:"ID_Project",label:{text:"ID_Project",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Project",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Project",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Project",n)}}},{name:"ID_ItemRequest",label:{text:"ID_ItemRequest",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ItemRequest",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ItemRequest",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ItemRequest",n)}}},{name:"ID_ItemRequest_Detail",label:{text:"ID_ItemRequest_Detail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ItemRequest_Detail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ItemRequest_Detail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ItemRequest_Detail",n)}}},{name:"ID_DocParent",label:{text:"ID_DocParent",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DocParent",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DocParent",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DocParent",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)}}},{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)}}}]}]}]},{ID_Tab:8157,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:8158,title:"Status",colCount:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}}]}]}]},s.$scope.CurrentObject.CRUD={Main:3192},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    