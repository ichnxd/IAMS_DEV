define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="LedgerEntry_Detail",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=5217,s.ID_View=5699,s.ID_Model=4256,s.ModelViewName="LedgerEntry_Detail_DetailView",s.ModelName="LedgerEntry_Detail",s.DisplayName="LedgerEntry_Detail",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:4256},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.AccountName":"CurrentObject.AccountName","formData.Amount":"CurrentObject.Amount","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.CreditAmt":"CurrentObject.CreditAmt","formData.ID_Subsidiary":"CurrentObject.ID_Subsidiary","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.DebitAmt":"CurrentObject.DebitAmt","formData.ID_Account":"CurrentObject.ID_Account","formData.ID_CostCenter":"CurrentObject.ID_CostCenter"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["AccountName","Amount","Code","Comment","CreditAmt","ID_Subsidiary","IsActive","Name","DebitAmt","ID","ID_Account","ID_CostCenter"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setAccountNameReadOnly!==undefined&&s.setAccountNameReadOnly(n);s.setAmountReadOnly!==undefined&&s.setAmountReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setCreditAmtReadOnly!==undefined&&s.setCreditAmtReadOnly(n);s.setID_SubsidiaryReadOnly!==undefined&&s.setID_SubsidiaryReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setDebitAmtReadOnly!==undefined&&s.setDebitAmtReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_AccountReadOnly!==undefined&&s.setID_AccountReadOnly(n);s.setID_CostCenterReadOnly!==undefined&&s.setID_CostCenterReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="AccountName"||n.dataField==="Amount"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="CreditAmt"||n.dataField==="ID_Subsidiary"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="DebitAmt"||n.dataField==="ID"||n.dataField==="ID_Account"||n.dataField==="ID_CostCenter")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"DebitAmt",label:{text:"DebitAmt",alignment:"right",showColon:!1,location:"left"},dataField:"DebitAmt",editorType:"jDxNumberBox",editorOptions:{PropertyName:"DebitAmt",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"DebitAmt",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.DebitAmt=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("DebitAmt",n)}}},{name:"CreditAmt",label:{text:"CreditAmt",alignment:"right",showColon:!1,location:"left"},dataField:"CreditAmt",editorType:"jDxNumberBox",editorOptions:{PropertyName:"CreditAmt",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"CreditAmt",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.CreditAmt=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("CreditAmt",n)}}},{name:"Amount",label:{text:"Amount",alignment:"right",showColon:!1,location:"left"},dataField:"Amount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"Amount",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"Amount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.Amount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("Amount",n)}}},{name:"AccountName",label:{text:"AccountName",alignment:"right",showColon:!1,location:"left"},dataField:"AccountName",editorType:"dxTextBox",editorOptions:{PropertyName:"AccountName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("AccountName",n)}}},{name:"ID_Account",label:{text:"ID_Account",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Account",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Account",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Account",n)}}},{name:"ID_CostCenter",label:{text:"ID_CostCenter",alignment:"right",showColon:!1,location:"left"},dataField:"ID_CostCenter",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CostCenter",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_CostCenter",n)}}},{name:"ID_Subsidiary",label:{text:"ID_Subsidiary",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Subsidiary",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Subsidiary",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Subsidiary",n)}}}]}]}]},{ID_Tab:13413,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:13414,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:4256},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    