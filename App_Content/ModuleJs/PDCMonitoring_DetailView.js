define(["app","baseDetailViewController","/JsApp/GetScript?Url=Doc%2fAR%2fPDC%2fVC_PDCMonitoring"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Collection Monitoring",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9251,s.ID_View=9791,s.ID_Model=8285,s.ModelViewName="PDCMonitoring_DetailView",s.ModelName="PDCMonitoring",s.DisplayName="Collection Monitoring",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!1,s.$isAllowEdit=!1,s.CRUDTablesIds={Main:8285},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.CheckAmount":"CurrentObject.CheckAmount","formData.CheckDate":"CurrentObject.CheckDate","formData.CheckNumber":"CurrentObject.CheckNumber","formData.CheckStatus":"CurrentObject.CheckStatus","formData.CheckType":"CurrentObject.CheckType","formData.DocumentNo":"CurrentObject.DocumentNo","formData.Reason":"CurrentObject.Reason","formData.Date":"CurrentObject.Date","formData.DateDeposit":"CurrentObject.DateDeposit","formData.Bank":"CurrentObject.Bank"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["ID"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="CheckAmount"||n.dataField==="CheckDate"||n.dataField==="CheckNumber"||n.dataField==="CheckStatus"||n.dataField==="CheckType"||n.dataField==="DocumentNo"||n.dataField==="ID"||n.dataField==="Reason"||n.dataField==="Date"||n.dataField==="DateDeposit"||n.dataField==="ID_Bank")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="CheckAmount"&&n.dataField!=="CheckDate"&&n.dataField!=="CheckNumber"&&n.dataField!=="CheckStatus"&&n.dataField!=="CheckType"&&n.dataField!=="DocumentNo"&&n.dataField!=="Reason"&&n.dataField!=="Date"&&n.dataField!=="DateDeposit"&&n.dataField!=="ID_Bank"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"CheckType",label:{text:"Payment Type",alignment:"right",showColon:!1,location:"left"},dataField:"CheckType",editorType:"dxTextBox",editorOptions:{PropertyName:"CheckType",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("CheckType",n)},tabIndex:1e8}},{name:"DocumentNo",label:{text:"PDC No.",alignment:"right",showColon:!1,location:"left"},dataField:"DocumentNo",editorType:"dxTextBox",editorOptions:{PropertyName:"DocumentNo",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("DocumentNo",n)},tabIndex:1e8}},{name:"Date",label:{text:"PDC Date",alignment:"right",showColon:!1,location:"left"},dataField:"Date",editorType:"dxDateBox",editorOptions:{PropertyName:"Date",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("Date",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:80,onInitialized:function(n){s.onControl_Initialized("Reason",n)},tabIndex:1e8}},{name:"DateDeposit",label:{text:"Date Deposit",alignment:"right",showColon:!1,location:"left"},dataField:"DateDeposit",editorType:"dxDateBox",editorOptions:{PropertyName:"DateDeposit",readOnly:!0,width:"100%",type:"datetime",onInitialized:function(n){s.onControl_Initialized("DateDeposit",n)},tabIndex:1e8}}]}]}]}]}]},s.$scope.GeneralGridTabPabelItems=[{title:"Detail",isForm:!0,ID_Tab:28367,name:"DetailTab",formOption:{bindingOptions:{"formData.BankSection":"$parent.$parent.CurrentObject.BankSection","formData.TranSection":"$parent.$parent.CurrentObject.TranSection","formData.Bank":"$parent.$parent.CurrentObject.Bank","formData.CheckAmount":"$parent.$parent.CurrentObject.CheckAmount","formData.CheckDate":"$parent.$parent.CurrentObject.CheckDate","formData.CheckNumber":"$parent.$parent.CurrentObject.CheckNumber","formData.CheckStatus":"$parent.$parent.CurrentObject.CheckStatus"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["BankSection","TranSection"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setBankSectionReadOnly!==undefined&&s.setBankSectionReadOnly(n);s.setTranSectionReadOnly!==undefined&&s.setTranSectionReadOnly(n)},s.onDetailTab_TabFormInitialized!==undefined)s.onDetailTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="BankSection"||n.dataField==="TranSection"||n.dataField==="ID_Bank"||n.dataField==="CheckAmount"||n.dataField==="CheckDate"||n.dataField==="CheckNumber"||n.dataField==="CheckStatus")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_Bank"||n.dataField==="CheckAmount"||n.dataField==="CheckDate"||n.dataField==="CheckNumber"||n.dataField==="CheckStatus")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[]},{caption:"Bank",itemType:"group",isShowLabel:!0,colCount:1,colSpan:1,items:[{name:"ID_Bank",label:{text:"Bank",alignment:"right",showColon:!1,location:"left"},dataField:"Bank",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Bank",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_Bank",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Bank"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}}]},{caption:"Transaction",itemType:"group",isShowLabel:!0,colCount:2,colSpan:1,items:[{name:"CheckNumber",label:{text:"Transaction/Cheque No,",alignment:"right",showColon:!1,location:"left"},dataField:"CheckNumber",editorType:"dxTextBox",editorOptions:{PropertyName:"CheckNumber",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("CheckNumber",n)},tabIndex:1e8}},{name:"CheckDate",label:{text:"Date",alignment:"right",showColon:!1,location:"left"},dataField:"CheckDate",editorType:"dxDateBox",editorOptions:{PropertyName:"CheckDate",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("CheckDate",n)},tabIndex:1e8}},{name:"CheckAmount",label:{text:"Amount",alignment:"right",showColon:!1,location:"left"},dataField:"CheckAmount",editorType:"jDxNumberBox",editorOptions:{PropertyName:"CheckAmount",readOnly:!0,PropertyName:"CheckAmount",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.CheckAmount=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("CheckAmount",n)},tabIndex:1e8}},{name:"CheckStatus",label:{text:"Status",alignment:"right",showColon:!1,location:"left"},dataField:"CheckStatus",editorType:"dxTextBox",editorOptions:{PropertyName:"CheckStatus",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("CheckStatus",n)},tabIndex:1e8}}]}]}}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:8285},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.$dateFields.push("Date"),s.$dateFields.push("CheckDate"),s.$dateFields.push("DateApproved"),s.$dateFields.push("DateCancelled"),s.$dateFields.push("DateDeposit"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    