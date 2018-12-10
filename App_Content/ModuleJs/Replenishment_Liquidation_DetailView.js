define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Replenishment_Liquidation",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9384,s.ID_View=11238,s.ID_Model=8417,s.ModelViewName="Replenishment_Liquidation_DetailView",s.ModelName="Replenishment_Liquidation",s.DisplayName="Replenishment_Liquidation",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8417},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.ID_Employee":"CurrentObject.ID_Employee","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_Client":"CurrentObject.ID_Client","formData.TotalAmount":"CurrentObject.TotalAmount","formData.ID_Liquidation":"CurrentObject.ID_Liquidation","formData.ID_Replenishment":"CurrentObject.ID_Replenishment","formData.IsActive":"CurrentObject.IsActive","formData.LiqDate":"CurrentObject.LiqDate","formData.Name":"CurrentObject.Name"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["ID_Employee","Code","Comment","ID","ID_Client","TotalAmount","ID_Liquidation","ID_Replenishment","IsActive","LiqDate","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setID_EmployeeReadOnly!==undefined&&s.setID_EmployeeReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_ClientReadOnly!==undefined&&s.setID_ClientReadOnly(n);s.setTotalAmountReadOnly!==undefined&&s.setTotalAmountReadOnly(n);s.setID_LiquidationReadOnly!==undefined&&s.setID_LiquidationReadOnly(n);s.setID_ReplenishmentReadOnly!==undefined&&s.setID_ReplenishmentReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setLiqDateReadOnly!==undefined&&s.setLiqDateReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="ID_Employee"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_Client"||n.dataField==="TotalAmount"||n.dataField==="ID_Liquidation"||n.dataField==="ID_Replenishment"||n.dataField==="IsActive"||n.dataField==="LiqDate"||n.dataField==="Name")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Employee",label:{text:"ID_Employee",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Employee",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Employee",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Employee",n)}}},{name:"ID_Client",label:{text:"ID_Client",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Client",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Client",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Client",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_Replenishment",label:{text:"ID_Replenishment",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Replenishment",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Replenishment",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Replenishment",n)}}},{name:"TotalAmount",label:{text:"TotalAmount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalAmount",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"TotalAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalAmount",n)}}},{name:"ID_Liquidation",label:{text:"ID_Liquidation",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Liquidation",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Liquidation",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Liquidation",n)}}},{name:"LiqDate",label:{text:"LiqDate",alignment:"right",showColon:!1,location:"left"},dataField:"LiqDate",editorType:"dxDateBox",editorOptions:{PropertyName:"LiqDate",width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("LiqDate",n)}}}]}]}]},{ID_Tab:24148,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:24149,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8417},s.$dateFields.push("LiqDate"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    