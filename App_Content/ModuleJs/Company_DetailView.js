define(["app","baseDetailViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Company",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=1044,s.ID_View=1146,s.ID_Model=83,s.ModelViewName="Company_DetailView",s.ModelName="Company",s.DisplayName="Company",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:83},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.$scope.GeneralFormOptions={bindingOptions:{"formData.Address":"CurrentObject.Address","formData.Address1":"CurrentObject.Address1","formData.Address2":"CurrentObject.Address2","formData.Address3":"CurrentObject.Address3","formData.Code":"CurrentObject.Code","formData.DateCreated":"CurrentObject.DateCreated","formData.Phone":"CurrentObject.Phone","formData.Fax":"CurrentObject.Fax","formData.ImageFile":"CurrentObject.ImageFile","formData.IsActive":"CurrentObject.IsActive","formData.Name":"CurrentObject.Name","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Address","Address1","Address2","Address3","Code","Phone","Fax","ID","ImageFile","IsActive","Name"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setAddressReadOnly!==undefined&&s.setAddressReadOnly(n);s.setAddress1ReadOnly!==undefined&&s.setAddress1ReadOnly(n);s.setAddress2ReadOnly!==undefined&&s.setAddress2ReadOnly(n);s.setAddress3ReadOnly!==undefined&&s.setAddress3ReadOnly(n);s.setCodeReadOnly!==undefined&&s.setCodeReadOnly(n);s.setPhoneReadOnly!==undefined&&s.setPhoneReadOnly(n);s.setFaxReadOnly!==undefined&&s.setFaxReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setImageFileReadOnly!==undefined&&s.setImageFileReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Address"||n.dataField==="Address1"||n.dataField==="Address2"||n.dataField==="Address3"||n.dataField==="Code"||n.dataField==="DateCreated"||n.dataField==="Phone"||n.dataField==="Fax"||n.dataField==="ID"||n.dataField==="ImageFile"||n.dataField==="IsActive"||n.dataField==="Name"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="DateCreated"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:3,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Code",n)}}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Name is required"}],cssClass:"js-dx-required"},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"Address",label:{text:"Address",alignment:"right",showColon:!1,location:"left"},dataField:"Address",editorType:"dxTextBox",editorOptions:{PropertyName:"Address",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address",n)}}},{name:"ImageFile",label:{text:"ImageFile",alignment:"right",showColon:!1,location:"left"},dataField:"ImageFile",editorType:"dxTextBox",editorOptions:{PropertyName:"ImageFile",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ImageFile",n)}}},{name:"Phone",label:{text:"Phone",alignment:"right",showColon:!1,location:"left"},dataField:"Phone",editorType:"dxTextBox",editorOptions:{PropertyName:"Phone",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Phone",n)},mask:"(000)000-0000",useMaskedValue:!0}},{name:"Fax",label:{text:"Fax",alignment:"right",showColon:!1,location:"left"},dataField:"Fax",editorType:"dxTextBox",editorOptions:{PropertyName:"Fax",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Fax",n)},mask:"(000)000-0000",useMaskedValue:!0}},{name:"Address1",label:{text:"Address1",alignment:"right",showColon:!1,location:"left"},dataField:"Address1",editorType:"dxTextBox",editorOptions:{PropertyName:"Address1",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address1",n)}}},{name:"Address2",label:{text:"Address2",alignment:"right",showColon:!1,location:"left"},dataField:"Address2",editorType:"dxTextBox",editorOptions:{PropertyName:"Address2",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address2",n)}}},{name:"Address3",label:{text:"Address3",alignment:"right",showColon:!1,location:"left"},dataField:"Address3",editorType:"dxTextBox",editorOptions:{PropertyName:"Address3",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address3",n)}}}]}]}]}]}]},s.$scope.CurrentObject.CRUD={Main:83},s.$dateFields.push("DateCreated"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},i})    