define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Petty Cash Monitoring",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=10431,s.ID_View=14547,s.ID_Model=12464,s.ModelViewName="PettyCashMonitoring_DetailView",s.ModelName="PettyCashMonitoring",s.DisplayName="Petty Cash Monitoring",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!1,s.$isAllowEdit=!1,s.CRUDTablesIds={Main:12464},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Employee":"CurrentObject.Employee","formData.ChangeAmount":"CurrentObject.ChangeAmount","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.Name":"CurrentObject.Name","formData.ReimbursementAmount":"CurrentObject.ReimbursementAmount","formData.TotalCashAdvanceAmount":"CurrentObject.TotalCashAdvanceAmount","formData.TotalLiquidatedCost":"CurrentObject.TotalLiquidatedCost","formData.DateRelease":"CurrentObject.DateRelease","formData.CreatedBy":"CurrentObject.CreatedBy","formData.LastModifiedBy":"CurrentObject.LastModifiedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","ID"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="ID_Employee"||n.dataField==="ChangeAmount"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Name"||n.dataField==="ReimbursementAmount"||n.dataField==="TotalCashAdvanceAmount"||n.dataField==="TotalLiquidatedCost"||n.dataField==="DateRelease"||n.dataField==="ID"||n.dataField==="ID_CreatedBy"||n.dataField==="ID_LastModifiedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="ID_Employee"&&n.dataField!=="ChangeAmount"&&n.dataField!=="Code"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="Name"&&n.dataField!=="ReimbursementAmount"&&n.dataField!=="TotalCashAdvanceAmount"&&n.dataField!=="TotalLiquidatedCost"&&n.dataField!=="DateRelease"&&n.dataField!=="ID_CreatedBy"&&n.dataField!=="ID_LastModifiedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Code",n)},tabIndex:1e8}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}},{name:"TotalCashAdvanceAmount",label:{text:"Total CA Amount",alignment:"right",showColon:!1,location:"left"},dataField:"TotalCashAdvanceAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalCashAdvanceAmount",readOnly:!0,PropertyName:"TotalCashAdvanceAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalCashAdvanceAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalCashAdvanceAmount",n)},tabIndex:1e8}},{name:"ChangeAmount",label:{text:"Change Amount",alignment:"right",showColon:!1,location:"left"},dataField:"ChangeAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"ChangeAmount",readOnly:!0,PropertyName:"ChangeAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.ChangeAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("ChangeAmount",n)},tabIndex:1e8}},{name:"TotalLiquidatedCost",label:{text:"Total Liquidated Cost",alignment:"right",showColon:!1,location:"left"},dataField:"TotalLiquidatedCost",editorType:"jDxNumberBox",editorOptions:{PropertyName:"TotalLiquidatedCost",readOnly:!0,PropertyName:"TotalLiquidatedCost",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.TotalLiquidatedCost=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("TotalLiquidatedCost",n)},tabIndex:1e8}},{name:"ReimbursementAmount",label:{text:"Reimbursement Amount",alignment:"right",showColon:!1,location:"left"},dataField:"ReimbursementAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"ReimbursementAmount",readOnly:!0,PropertyName:"ReimbursementAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.ReimbursementAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("ReimbursementAmount",n)},tabIndex:1e8}},{name:"DateRelease",label:{text:"DateRelease",alignment:"right",showColon:!1,location:"left"},dataField:"DateRelease",editorType:"dxDateBox",editorOptions:{PropertyName:"DateRelease",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateRelease",n)},tabIndex:1e8}},{name:"ID_Employee",label:{text:"Employee",alignment:"right",showColon:!1,location:"left"},dataField:"Employee",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Employee",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_Employee",n)},tabIndex:1e8}}]}]}]},{ID_Tab:294102,title:"Comment",colCount:1,items:[{name:"Comment",label:{visible:!1},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:294103,title:"Status",colCount:2,items:[{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}}]}]}]},s.$scope.CurrentObject.CRUD={Main:12464},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("DateRelease"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    