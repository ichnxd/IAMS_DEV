define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Replenishment_BorrowedCash",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9416,s.ID_View=12361,s.ID_Model=11449,s.ModelViewName="Replenishment_BorrowedCash_DetailView",s.ModelName="Replenishment_BorrowedCash",s.DisplayName="Replenishment_BorrowedCash",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:11449},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Amount":"CurrentObject.Amount","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_BCCreatedBy":"CurrentObject.ID_BCCreatedBy","formData.Name":"CurrentObject.Name","formData.ID_BorrowedCash":"CurrentObject.ID_BorrowedCash","formData.ID_Custodian":"CurrentObject.ID_Custodian","formData.ID_ReleasedBy":"CurrentObject.ID_ReleasedBy","formData.ID_Replenishment":"CurrentObject.ID_Replenishment","formData.IsActive":"CurrentObject.IsActive"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Amount","Code","Comment","ID","ID_BCCreatedBy","Name","ID_BorrowedCash","ID_Custodian","ID_ReleasedBy","ID_Replenishment","IsActive"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setAmountReadOnly!==undefined&&s.setAmountReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_BCCreatedByReadOnly!==undefined&&s.setID_BCCreatedByReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setID_BorrowedCashReadOnly!==undefined&&s.setID_BorrowedCashReadOnly(n);s.setID_CustodianReadOnly!==undefined&&s.setID_CustodianReadOnly(n);s.setID_ReleasedByReadOnly!==undefined&&s.setID_ReleasedByReadOnly(n);s.setID_ReplenishmentReadOnly!==undefined&&s.setID_ReplenishmentReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Amount"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_BCCreatedBy"||n.dataField==="Name"||n.dataField==="ID_BorrowedCash"||n.dataField==="ID_Custodian"||n.dataField==="ID_ReleasedBy"||n.dataField==="ID_Replenishment"||n.dataField==="IsActive")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"ID_Replenishment",label:{text:"ID_Replenishment",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Replenishment",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Replenishment",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Replenishment",n)}}},{name:"ID_BorrowedCash",label:{text:"ID_BorrowedCash",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BorrowedCash",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_BorrowedCash",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_BorrowedCash",n)}}},{name:"Amount",label:{text:"Amount",alignment:"right",showColon:!1,location:"left"},dataField:"Amount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"Amount",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"Amount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.Amount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("Amount",n)}}},{name:"ID_Custodian",label:{text:"ID_Custodian",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Custodian",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Custodian",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Custodian",n)}}},{name:"ID_ReleasedBy",label:{text:"ID_ReleasedBy",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ReleasedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ReleasedBy",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_ReleasedBy",n)}}},{name:"ID_BCCreatedBy",label:{text:"ID_BCCreatedBy",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BCCreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_BCCreatedBy",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_BCCreatedBy",n)}}}]}]}]},{ID_Tab:26092,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:26093,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:11449},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    