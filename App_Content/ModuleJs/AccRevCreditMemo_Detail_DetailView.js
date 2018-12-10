define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="AccRevCreditMemo_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9274,s.ID_View=9864,s.ID_Model=8308,s.ModelViewName="AccRevCreditMemo_Detail_DetailView",s.ModelName="AccRevCreditMemo_Detail",s.DisplayName="AccRevCreditMemo_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8308},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Description":"CurrentObject.Description","formData.GrossAmount":"CurrentObject.GrossAmount","formData.UnitPrice":"CurrentObject.UnitPrice","formData.ID_AccRevCreditMemo":"CurrentObject.ID_AccRevCreditMemo","formData.ID_DocDetail":"CurrentObject.ID_DocDetail","formData.ID_DocDetailParentModel":"CurrentObject.ID_DocDetailParentModel","formData.ID_UOM":"CurrentObject.ID_UOM","formData.IsActive":"CurrentObject.IsActive","formData.VATAmount":"CurrentObject.VATAmount","formData.IsFree":"CurrentObject.IsFree","formData.Name":"CurrentObject.Name","formData.Quantity":"CurrentObject.Quantity","formData.TotalAmount":"CurrentObject.TotalAmount","formData.ID_Item":"CurrentObject.ID_Item"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","Description","GrossAmount","ID","UnitPrice","ID_AccRevCreditMemo_Detail","ID_DocDetail","ID_DocDetailParentModel","ID_UOM","IsActive","VATAmount","IsFree","Name","Quantity","TotalAmount","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDescriptionReadOnly!==undefined&&s.setDescriptionReadOnly(n);s.setGrossAmountReadOnly!==undefined&&s.setGrossAmountReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setUnitPriceReadOnly!==undefined&&s.setUnitPriceReadOnly(n);s.setID_AccRevCreditMemoReadOnly!==undefined&&s.setID_AccRevCreditMemoReadOnly(n);s.setID_DocDetailReadOnly!==undefined&&s.setID_DocDetailReadOnly(n);s.setID_DocDetailParentModelReadOnly!==undefined&&s.setID_DocDetailParentModelReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setVATAmountReadOnly!==undefined&&s.setVATAmountReadOnly(n);s.setIsFreeReadOnly!==undefined&&s.setIsFreeReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Description"||n.dataField==="GrossAmount"||n.dataField==="ID"||n.dataField==="UnitPrice"||n.dataField==="ID_AccRevCreditMemo_Detail"||n.dataField==="ID_DocDetail"||n.dataField==="ID_DocDetailParentModel"||n.dataField==="ID_UOM"||n.dataField==="IsActive"||n.dataField==="VATAmount"||n.dataField==="IsFree"||n.dataField==="Name"||n.dataField==="Quantity"||n.dataField==="TotalAmount"||n.dataField==="ID_Item")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_AccRevCreditMemo",label:{text:"ID_AccRevCreditMemo_Detail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_AccRevCreditMemo",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_AccRevCreditMemo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_AccRevCreditMemo",n)}}},{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)}}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"UnitPrice",label:{text:"UnitPrice",alignment:"right",showColon:!1,location:"left"},dataField:"UnitPrice",editorType:"dxTextBox",editorOptions:{PropertyName:"UnitPrice",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("UnitPrice",n)}}},{name:"IsFree",label:{text:"Free",alignment:"right",showColon:!1,location:"left"},dataField:"IsFree",editorType:"dxTextBox",editorOptions:{PropertyName:"IsFree",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("IsFree",n)}}},{name:"VATAmount",label:{text:"VATAmount",alignment:"right",showColon:!1,location:"left"},dataField:"VATAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"VATAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("VATAmount",n)}}},{name:"GrossAmount",label:{text:"GrossAmount",alignment:"right",showColon:!1,location:"left"},dataField:"GrossAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"GrossAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("GrossAmount",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"dxTextBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"ID_DocDetail",label:{text:"ID_DocDetail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DocDetail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DocDetail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DocDetail",n)}}},{name:"ID_DocDetailParentModel",label:{text:"ID_DocDetailParentModel",alignment:"right",showColon:!1,location:"left"},dataField:"ID_DocDetailParentModel",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_DocDetailParentModel",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_DocDetailParentModel",n)}}},{name:"Description",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Description",editorType:"dxTextBox",editorOptions:{PropertyName:"Description",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Description",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}}]}]}]},{ID_Tab:21673,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:21674,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8308},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    