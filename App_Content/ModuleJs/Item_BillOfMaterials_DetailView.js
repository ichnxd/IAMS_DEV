define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Product Component",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=2050,s.ID_View=2159,s.ID_Model=1089,s.ModelViewName="Item_BillOfMaterials_DetailView",s.ModelName="BillOfMaterials",s.DisplayName="Product Component",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:1089},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Cost":"CurrentObject.Cost","formData.DateCreated":"CurrentObject.DateCreated","formData.Description":"CurrentObject.Description","formData.Name":"CurrentObject.Name","formData.Quantity":"CurrentObject.Quantity","formData.ID_Parent":"CurrentObject.ID_Parent","formData.ID_UOM":"CurrentObject.ID_UOM","formData.IsActive":"CurrentObject.IsActive","formData.ID_Item":"CurrentObject.ID_Item","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","Cost","Description","Name","Quantity","ID","ID_Parent","ID_UOM","IsActive","ID_Item"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setCostReadOnly!==undefined&&s.setCostReadOnly(n);s.setDescriptionReadOnly!==undefined&&s.setDescriptionReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setQuantityReadOnly!==undefined&&s.setQuantityReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_ParentReadOnly!==undefined&&s.setID_ParentReadOnly(n);s.setID_UOMReadOnly!==undefined&&s.setID_UOMReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setID_ItemReadOnly!==undefined&&s.setID_ItemReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Cost"||n.dataField==="DateCreated"||n.dataField==="Description"||n.dataField==="Name"||n.dataField==="Quantity"||n.dataField==="ID"||n.dataField==="ID_Parent"||n.dataField==="ID_UOM"||n.dataField==="IsActive"||n.dataField==="ID_Item"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateCreated"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"Quantity",label:{text:"Quantity",alignment:"right",showColon:!1,location:"left"},dataField:"Quantity",editorType:"dxTextBox",editorOptions:{PropertyName:"Quantity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Quantity",n)}}},{name:"ID_UOM",label:{text:"ID_UOM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_UOM",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_UOM",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_UOM",n)}}},{name:"Cost",label:{text:"Cost",alignment:"right",showColon:!1,location:"left"},dataField:"Cost",editorType:"dxTextBox",editorOptions:{PropertyName:"Cost",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Cost",n)}}},{name:"Description",label:{text:"Description",alignment:"right",showColon:!1,location:"left"},dataField:"Description",editorType:"dxTextBox",editorOptions:{PropertyName:"Description",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Description",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_Item",label:{text:"ID_Item",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Item",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Item",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Item",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify ID_Item"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"ID_Item is required"}],cssClass:"js-dx-required"},{name:"ID_Parent",label:{text:"ID_Parent",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Parent",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Parent",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Parent",n)}}}]}]}]},{ID_Tab:7963,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]}]}]},s.$scope.CurrentObject.CRUD={Main:1089},s.$dateFields.push("DateCreated"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    