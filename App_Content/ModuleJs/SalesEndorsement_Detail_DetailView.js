define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="SalesEndorsement_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=6246,s.ID_View=6776,s.ID_Model=5280,s.ModelViewName="SalesEndorsement_Detail_DetailView",s.ModelName="SalesEndorsement_Detail",s.DisplayName="SalesEndorsement_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:5280},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Description":"CurrentObject.Description","formData.Discount":"CurrentObject.Discount","formData.DiscountRate":"CurrentObject.DiscountRate","formData.ID_Brand":"CurrentObject.ID_Brand","formData.ID_ItemType":"CurrentObject.ID_ItemType","formData.IsFree":"CurrentObject.IsFree","formData.LineDiscount":"CurrentObject.LineDiscount","formData.ModelCode":"CurrentObject.ModelCode","formData.DisplayName":"CurrentObject.DisplayName","formData.GrossAmount":"CurrentObject.GrossAmount","formData.SKUCode":"CurrentObject.SKUCode","formData.SRP":"CurrentObject.SRP","formData.ID_SalesEndorsement":"CurrentObject.ID_SalesEndorsement","formData.ID_UOM":"CurrentObject.ID_UOM","formData.IsActive":"CurrentObject.IsActive","formData.TotalAmount":"CurrentObject.TotalAmount","formData.UnitPrice":"CurrentObject.UnitPrice","formData.VatAmount":"CurrentObject.VatAmount","formData.Name":"CurrentObject.Name","formData.Quantity":"CurrentObject.Quantity","formData.Remarks":"CurrentObject.Remarks","formData.ID_Item":"CurrentObject.ID_Item"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","Description","Discount","DiscountRate","ID_Brand","ID_ItemType","IsFree","LineDiscount","ModelCode","DisplayName","GrossAmount","ID","SKUCode","SRP","ID_SalesEndorsement","ID_UOM","IsActive","TotalAmount","UnitPrice","VatAmount","Name","Quantity","Remarks","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDescriptionReadOnly!==undefined&&s.setDescriptionReadOnly(n);s.setDiscountReadOnly!==undefined&&s.setDiscountReadOnly(n);s.setDiscountRateReadOnly!==undefined&&s.setDiscountRateReadOnly(n);s.setID_BrandReadOnly!==undefined&&s.setID_BrandReadOnly(n);s.setID_ItemTypeReadOnly!==undefined&&s.setID_ItemTypeReadOnly(n);s.setIsFreeReadOnly!==undefined&&s.setIsFreeReadOnly(n);s.setLineDiscountReadOnly!==undefined&&s.setLineDiscountReadOnly(n);s.setModelCodeReadOnly!==undefined&&s.setModelCodeReadOnly(n);s.setDisplayNameReadOnly!==undefined&&s.setDisplayNameReadOnly(n);s.setGrossAmountReadOnly!==undefined&&s.setGrossAmountReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setSKUCodeReadOnly!==undefined&&s.setSKUCodeReadOnly(n);s.setSRPReadOnly!==undefined&&s.setSRPReadOnly(n);s.setID_SalesEndorsementReadOnly!==undefined&&s.setID_SalesEndorsementReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setUnitPriceReadOnly!==undefined&&s.setUnitPriceReadOnly(n);s.setVatAmountReadOnly!==undefined&&s.setVatAmountReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setRemarksReadOnly!==undefined&&s.setRemarksReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Description"||n.dataField==="Discount"||n.dataField==="DiscountRate"||n.dataField==="ID_Brand"||n.dataField==="ID_ItemType"||n.dataField==="IsFree"||n.dataField==="LineDiscount"||n.dataField==="ModelCode"||n.dataField==="DisplayName"||n.dataField==="GrossAmount"||n.dataField==="ID"||n.dataField==="SKUCode"||n.dataField==="SRP"||n.dataField==="ID_SalesEndorsement"||n.dataField==="ID_UOM"||n.dataField==="IsActive"||n.dataField==="TotalAmount"||n.dataField==="UnitPrice"||n.dataField==="VatAmount"||n.dataField==="Name"||n.dataField==="Quantity"||n.dataField==="Remarks"||n.dataField==="ID_Item")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)}}},{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"VatAmount",label:{text:"VatAmount",alignment:"right",showColon:!1,location:"left"},dataField:"VatAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"VatAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("VatAmount",n)}}},{name:"SRP",label:{text:"SRP",alignment:"right",showColon:!1,location:"left"},dataField:"SRP",editorType:"dxTextBox",editorOptions:{PropertyName:"SRP",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("SRP",n)}}},{name:"ID_Brand",label:{text:"ID_Brand",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Brand",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Brand",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Brand",n)}}},{name:"IsFree",label:{text:"Free",alignment:"right",showColon:!1,location:"left"},dataField:"IsFree",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsFree",onInitialized:function(n){s.onControl_Initialized("IsFree",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsFree=n.value}}},{name:"Description",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Description",editorType:"dxTextBox",editorOptions:{PropertyName:"Description",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Description",n)}}},{name:"ID_ItemType",label:{text:"ID_ItemType",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ItemType",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ItemType",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ItemType",n)}}},{name:"ModelCode",label:{text:"ModelCode",alignment:"right",showColon:!1,location:"left"},dataField:"ModelCode",editorType:"dxTextBox",editorOptions:{PropertyName:"ModelCode",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ModelCode",n)}}},{name:"Discount",label:{text:"Discount",alignment:"right",showColon:!1,location:"left"},dataField:"Discount",editorType:"dxTextBox",editorOptions:{PropertyName:"Discount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Discount",n)}}},{name:"DiscountRate",label:{text:"DiscountRate",alignment:"right",showColon:!1,location:"left"},dataField:"DiscountRate",editorType:"dxTextBox",editorOptions:{PropertyName:"DiscountRate",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("DiscountRate",n)}}},{name:"UnitPrice",label:{text:"UnitPrice",alignment:"right",showColon:!1,location:"left"},dataField:"UnitPrice",editorType:"dxTextBox",editorOptions:{PropertyName:"UnitPrice",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("UnitPrice",n)}}},{name:"Remarks",label:{text:"Remarks",alignment:"right",showColon:!1,location:"left"},dataField:"Remarks",editorType:"dxTextBox",editorOptions:{PropertyName:"Remarks",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Remarks",n)}}},{name:"SKUCode",label:{text:"SKUCode",alignment:"right",showColon:!1,location:"left"},dataField:"SKUCode",editorType:"dxTextBox",editorOptions:{PropertyName:"SKUCode",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("SKUCode",n)}}},{name:"DisplayName",label:{text:"DisplayName",alignment:"right",showColon:!1,location:"left"},dataField:"DisplayName",editorType:"dxTextBox",editorOptions:{PropertyName:"DisplayName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("DisplayName",n)}}},{name:"GrossAmount",label:{text:"Gross Amt",alignment:"right",showColon:!1,location:"left"},dataField:"GrossAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"GrossAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("GrossAmount",n)}}},{name:"LineDiscount",label:{text:"Line Discount",alignment:"right",showColon:!1,location:"left"},dataField:"LineDiscount",editorType:"dxTextBox",editorOptions:{PropertyName:"LineDiscount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("LineDiscount",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_SalesEndorsement",label:{text:"ID_SalesEndorsement",alignment:"right",showColon:!1,location:"left"},dataField:"ID_SalesEndorsement",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_SalesEndorsement",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_SalesEndorsement",n)}}}]}]}]},{ID_Tab:16019,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:16020,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:5280},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    