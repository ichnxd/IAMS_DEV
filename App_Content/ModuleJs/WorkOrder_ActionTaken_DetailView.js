define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="WorkOrder_ActionTaken",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=10466,s.ID_View=15669,s.ID_Model=12499,s.ModelViewName="WorkOrder_ActionTaken_DetailView",s.ModelName="WorkOrder_ActionTaken",s.DisplayName="WorkOrder_ActionTaken",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:12499},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.ID_WorkOrder":"CurrentObject.ID_WorkOrder","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.ID_ActionTaken":"CurrentObject.ID_ActionTaken","formData.ID_Department":"CurrentObject.ID_Department","formData.ID_Lead":"CurrentObject.ID_Lead","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","ID_WorkOrder","IsActive","Name","ID_ActionTaken","ID_Department","ID_Lead"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setReadOnly!==undefined&&s.setReadOnly(n);s.setID_WorkOrderReadOnly!==undefined&&s.setID_WorkOrderReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setID_ActionTakenReadOnly!==undefined&&s.setID_ActionTakenReadOnly(n);s.setID_DepartmentReadOnly!==undefined&&s.setID_DepartmentReadOnly(n);s.setID_LeadReadOnly!==undefined&&s.setID_LeadReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="ID"||n.dataField==="ID_WorkOrder"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="ID_ActionTaken"||n.dataField==="ID_Department"||n.dataField==="ID_Lead"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_WorkOrder",label:{text:"ID_WorkOrder",alignment:"right",showColon:!1,location:"left"},dataField:"ID_WorkOrder",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_WorkOrder",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_WorkOrder",n)}}},{name:"ID_ActionTaken",label:{text:"Action Taken",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ActionTaken",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ActionTaken",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ActionTaken",n)}}},{name:"ID_Lead",label:{text:"Lead",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Lead",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Lead",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Lead",n)}}},{name:"ID_Department",label:{text:"Department",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Department",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Department",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Department",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"}]}]}]},{ID_Tab:296352,title:"Status",colCount:2,items:[{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}}]},{ID_Tab:306351,title:"Comment",colCount:1,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:12499},s.$dateFields.push("DateModified"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    