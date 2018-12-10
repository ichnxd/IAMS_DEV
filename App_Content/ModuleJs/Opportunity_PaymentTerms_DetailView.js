define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Opportunity_PaymentTerms",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=10447,s.ID_View=15612,s.ID_Model=12480,s.ModelViewName="Opportunity_PaymentTerms_DetailView",s.ModelName="Opportunity_PaymentTerms",s.DisplayName="Opportunity_PaymentTerms",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:12480},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Amount":"CurrentObject.Amount","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.ID_Opportunity":"CurrentObject.ID_Opportunity","formData.ID_PaymentScheme":"CurrentObject.ID_PaymentScheme","formData.ID_PaymentTerm":"CurrentObject.ID_PaymentTerm","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.Rate":"CurrentObject.Rate"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Amount","Code","Comment","ID_Opportunity","ID_PaymentScheme","ID_PaymentTerm","IsActive","Name","Rate"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setAmountReadOnly!==undefined&&s.setAmountReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setReadOnly!==undefined&&s.setReadOnly(n);s.setID_OpportunityReadOnly!==undefined&&s.setID_OpportunityReadOnly(n);s.setID_PaymentSchemeReadOnly!==undefined&&s.setID_PaymentSchemeReadOnly(n);s.setID_PaymentTermReadOnly!==undefined&&s.setID_PaymentTermReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setRateReadOnly!==undefined&&s.setRateReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Amount"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="ID"||n.dataField==="ID_Opportunity"||n.dataField==="ID_PaymentScheme"||n.dataField==="ID_PaymentTerm"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="Rate")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Opportunity",label:{text:"ID_Opportunity",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Opportunity",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Opportunity",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Opportunity",n)}}},{name:"ID_PaymentScheme",label:{text:"ID_PaymentScheme",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PaymentScheme",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PaymentScheme",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PaymentScheme",n)}}},{name:"Rate",label:{text:"Rate",alignment:"right",showColon:!1,location:"left"},dataField:"Rate",editorType:"dxTextBox",editorOptions:{PropertyName:"Rate",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Rate",n)}}},{name:"ID_PaymentTerm",label:{text:"ID_PaymentTerm",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PaymentTerm",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_PaymentTerm",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_PaymentTerm",n)}}},{name:"Amount",label:{text:"Amount",alignment:"right",showColon:!1,location:"left"},dataField:"Amount",editorType:"dxTextBox",editorOptions:{PropertyName:"Amount",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Amount",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"}]}]}]},{ID_Tab:294602,title:"Status",colCount:2,items:[]},{ID_Tab:304601,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]}]}]},s.$scope.CurrentObject.CRUD={Main:12480},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    