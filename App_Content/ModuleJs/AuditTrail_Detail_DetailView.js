define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="AuditTrail_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9325,s.ID_View=11050,s.ID_Model=8359,s.ModelViewName="AuditTrail_Detail_DetailView",s.ModelName="AuditTrail_Detail",s.DisplayName="AuditTrail_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8359},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_AuditTrail":"CurrentObject.ID_AuditTrail","formData.ID_CurrentObject":"CurrentObject.ID_CurrentObject","formData.ID_Model":"CurrentObject.ID_Model","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.NewValue":"CurrentObject.NewValue","formData.OldValue":"CurrentObject.OldValue"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Code","Comment","ID","ID_AuditTrail","ID_CurrentObject","ID_Model","IsActive","Name","NewValue","OldValue"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_AuditTrailReadOnly!==undefined&&s.setID_AuditTrailReadOnly(n);s.setID_CurrentObjectReadOnly!==undefined&&s.setID_CurrentObjectReadOnly(n);s.setID_ModelReadOnly!==undefined&&s.setID_ModelReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setNewValueReadOnly!==undefined&&s.setNewValueReadOnly(n);s.setOldValueReadOnly!==undefined&&s.setOldValueReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_AuditTrail"||n.dataField==="ID_CurrentObject"||n.dataField==="ID_Model"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="NewValue"||n.dataField==="OldValue")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_AuditTrail",label:{text:"ID_AuditTrail",alignment:"right",showColon:!1,location:"left"},dataField:"ID_AuditTrail",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_AuditTrail",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_AuditTrail",n)}}},{name:"OldValue",label:{text:"OldValue",alignment:"right",showColon:!1,location:"left"},dataField:"OldValue",editorType:"dxTextBox",editorOptions:{PropertyName:"OldValue",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("OldValue",n)}}},{name:"NewValue",label:{text:"NewValue",alignment:"right",showColon:!1,location:"left"},dataField:"NewValue",editorType:"dxTextBox",editorOptions:{PropertyName:"NewValue",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("NewValue",n)}}},{name:"ID_CurrentObject",label:{text:"ID_CurrentObject",alignment:"right",showColon:!1,location:"left"},dataField:"ID_CurrentObject",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CurrentObject",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_CurrentObject",n)}}},{name:"ID_Model",label:{text:"ID_Model",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Model",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Model",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Model",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}}]}]}]},{ID_Tab:22858,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:22859,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8359},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    