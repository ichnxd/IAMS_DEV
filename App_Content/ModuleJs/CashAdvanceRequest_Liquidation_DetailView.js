define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="CashAdvanceRequest_Liquidation",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=9316,s.ID_View=11020,s.ID_Model=8350,s.ModelViewName="CashAdvanceRequest_Liquidation_DetailView",s.ModelName="CashAdvanceRequest_Liquidation",s.DisplayName="CashAdvanceRequest_Liquidation",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:8350},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.ActualCost":"CurrentObject.ActualCost","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.Details":"CurrentObject.Details","formData.ID_CashAdvanceRequest":"CurrentObject.ID_CashAdvanceRequest","formData.ID_Itinerary":"CurrentObject.ID_Itinerary","formData.ID_Means":"CurrentObject.ID_Means","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["ActualCost","Code","Comment","Details","ID","ID_CashAdvanceRequest","ID_Itinerary","ID_Means","IsActive","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setActualCostReadOnly!==undefined&&s.setActualCostReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setDetailsReadOnly!==undefined&&s.setDetailsReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_CashAdvanceRequestReadOnly!==undefined&&s.setID_CashAdvanceRequestReadOnly(n);s.setID_ItineraryReadOnly!==undefined&&s.setID_ItineraryReadOnly(n);s.setID_MeansReadOnly!==undefined&&s.setID_MeansReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="ActualCost"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="Details"||n.dataField==="ID"||n.dataField==="ID_CashAdvanceRequest"||n.dataField==="ID_Itinerary"||n.dataField==="ID_Means"||n.dataField==="IsActive"||n.dataField==="Name")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_Itinerary",label:{text:"ID_Itinerary",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Itinerary",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Itinerary",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Itinerary",n)}}},{name:"Details",label:{text:"Details",alignment:"right",showColon:!1,location:"left"},dataField:"Details",editorType:"dxTextBox",editorOptions:{PropertyName:"Details",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Details",n)}}},{name:"ID_Means",label:{text:"ID_Means",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Means",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_Means",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_Means",n)}}},{name:"ActualCost",label:{text:"ActualCost",alignment:"right",showColon:!1,location:"left"},dataField:"ActualCost",editorType:"dxTextBox",editorOptions:{PropertyName:"ActualCost",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ActualCost",n)}}},{name:"ID_CashAdvanceRequest",label:{text:"ID_CashAdvanceRequest",alignment:"right",showColon:!1,location:"left"},dataField:"ID_CashAdvanceRequest",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CashAdvanceRequest",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ID_CashAdvanceRequest",n)}}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}}]}]}]},{ID_Tab:22594,title:"Comment",colCount:1,items:[{name:"Comment",label:{text:"Comment",alignment:"left",showColon:!1,location:"top"},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:22595,title:"Status",colCount:2,items:[]}]}]},s.$scope.CurrentObject.CRUD={Main:8350},s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    