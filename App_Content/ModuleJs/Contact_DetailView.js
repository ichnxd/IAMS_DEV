define(["app","baseDetailViewController","/JsApp/GetScript?Url=VC_BPContact"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this,h;if(s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1},n.DisplayName="Contact",n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name,s.DisplayProperty="Name",s.ID_ModelObject=3117,s.ID_View=3382,s.ID_Model=2156,s.ModelViewName="Contact_DetailView",s.ModelName="Contact",s.DisplayName="Contact",s.IsEditingOnly=!1,s.IsDeveloperMode=!1,s.$isAllowAdd=!0,s.$isAllowEdit=!0,s.CRUDTablesIds={Main:2156},t.prototype.Init.call(this,n,i,r,u,f,e,o),h=i,s.ComputeExpression=function(){s.calculateHeaderExpression("Name","#LastName + ', ' + #FirstName + ' ' + #MiddleName",1)},s.$scope.GeneralFormOptions={bindingOptions:{"formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.Position":"CurrentObject.Position","formData.EmailAddress":"CurrentObject.EmailAddress","formData.FaxNo":"CurrentObject.FaxNo","formData.FirstName":"CurrentObject.FirstName","formData.TelNo":"CurrentObject.TelNo","formData.LastName":"CurrentObject.LastName","formData.MiddleName":"CurrentObject.MiddleName","formData.MobileNo":"CurrentObject.MobileNo","formData.Name":"CurrentObject.Name","formData.BusinessPartner":"CurrentObject.BusinessPartner","formData.LastModifiedBy":"CurrentObject.LastModifiedBy","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["Comment","Position","EmailAddress","FaxNo","FirstName","ID","TelNo","LastName","MiddleName","MobileNo"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setPositionReadOnly!==undefined&&s.setPositionReadOnly(n);s.setEmailAddressReadOnly!==undefined&&s.setEmailAddressReadOnly(n);s.setFaxNoReadOnly!==undefined&&s.setFaxNoReadOnly(n);s.setFirstNameReadOnly!==undefined&&s.setFirstNameReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setTelNoReadOnly!==undefined&&s.setTelNoReadOnly(n);s.setLastNameReadOnly!==undefined&&s.setLastNameReadOnly(n);s.setMiddleNameReadOnly!==undefined&&s.setMiddleNameReadOnly(n);s.setMobileNoReadOnly!==undefined&&s.setMobileNoReadOnly(n);$.each([],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Position"||n.dataField==="EmailAddress"||n.dataField==="FaxNo"||n.dataField==="FirstName"||n.dataField==="ID"||n.dataField==="TelNo"||n.dataField==="LastName"||n.dataField==="MiddleName"||n.dataField==="MobileNo"||n.dataField==="Name"||n.dataField==="ID_LastModifiedBy"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="Code"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="Name"&&n.dataField!=="ID_LastModifiedBy"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:2,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",caption:"Information",IsShowLabel:!0,colCount:2,colSpan:2,items:[{name:"LastName",label:{text:"Last Name",alignment:"right",showColon:!1,location:"left"},dataField:"LastName",editorType:"dxTextBox",editorOptions:{PropertyName:"LastName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("LastName",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Last Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Last Name is required"}],cssClass:"js-dx-required"},{name:"FirstName",label:{text:"First Name",alignment:"right",showColon:!1,location:"left"},dataField:"FirstName",editorType:"dxTextBox",editorOptions:{PropertyName:"FirstName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("FirstName",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify First Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"First Name is required"}],cssClass:"js-dx-required"},{name:"MiddleName",label:{text:"Middle Name",alignment:"right",showColon:!1,location:"left"},dataField:"MiddleName",editorType:"dxTextBox",editorOptions:{PropertyName:"MiddleName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("MiddleName",n)}}},{name:"Position",label:{text:"Position",alignment:"right",showColon:!1,location:"left"},dataField:"Position",editorType:"dxTextBox",editorOptions:{PropertyName:"Position",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Position",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Position"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Position is required"}],cssClass:"js-dx-required"},{name:"ID_BusinessPartner",label:{text:"Parent",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BusinessPartner",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_BusinessPartner",readOnly:!0,SQL:"ACOEzbDtlTKuiv35nNfWXevgkbiBiPpEoi1Seb8rMOkoCgn31q8Izqi30FVrTCaC6g5QcXuMN8dyVyArOdvXU5InX/zSC47maHimTLyJfX3coSBrE1UdETDvuQMM8p7B",IsDeveloperMode:!1,ID_Control:9876,ID_ModelProperty:7940,ControlName:"ID_BusinessPartner",DisplayProperty:"BusinessPartner",CurrentObject:s.CurrentObject,FormatKey:"45037C05-8CE4-456E-87F5-67C9A53D65D6",ModelOption:{ID_DetailView:3102,ModelPropertyName:"Parent",IsModal:s.IsModal===!0,ID_Model_Caller:2156,Icon:"mdi mdi-contact-mail"},Columns:["ID","Name","FullAddress"],onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_BusinessPartner!=null&&(t=[{ID:s.$scope.CurrentObject.ID_BusinessPartner,Name:s.$scope.CurrentObject.BusinessPartner}],s.$scope.CurrentObject.EXPR_ID_BusinessPartner=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_BusinessPartner",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_BusinessPartner=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_BusinessPartner",value:t})});s.$scope.CurrentObject.ID_BusinessPartner=t!==null?t.ID:null;s.$scope.CurrentObject.BusinessPartner=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_BusinessPartner",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.BusinessPartner};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Parent"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}},{name:"Name",label:{text:"Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})},tabIndex:1e8}}]},{itemType:"group",colCount:2,IsShowLabel:!0,colSpan:3,caption:"Contract Detail",items:[{name:"MobileNo",label:{text:"Mobile No",alignment:"right",showColon:!1,location:"left"},dataField:"MobileNo",editorType:"dxTextBox",editorOptions:{PropertyName:"MobileNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("MobileNo",n)},mask:"+(00)000-000-0000",useMaskedValue:!0}},{name:"TelNo",label:{text:"Tel No",alignment:"right",showColon:!1,location:"left"},dataField:"TelNo",editorType:"dxTextBox",editorOptions:{PropertyName:"TelNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TelNo",n)},mask:"(000)000-0000",useMaskedValue:!0}},{name:"EmailAddress",label:{text:"Email Address",alignment:"right",showColon:!1,location:"left"},dataField:"EmailAddress",editorType:"dxTextBox",editorOptions:{PropertyName:"EmailAddress",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("EmailAddress",n)}}},{name:"FaxNo",label:{text:"Fax No",alignment:"right",showColon:!1,location:"left"},dataField:"FaxNo",editorType:"dxTextBox",editorOptions:{PropertyName:"FaxNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("FaxNo",n)},mask:"(000)000-0000",useMaskedValue:!0}}]}]}]},{ID_Tab:8013,title:"Comment",colCount:1,items:[{name:"Comment",label:{visible:!1},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n)}}}]},{ID_Tab:13256,title:"Status",colCount:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_LastModifiedBy",label:{text:"Last Modified by",alignment:"right",showColon:!1,location:"left"},dataField:"LastModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_LastModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_LastModifiedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Code",n)},tabIndex:1e8}}]}]}]},s.$scope.CurrentObject.CRUD={Main:2156},s.$dateFields.push("DateCreated"),s.$dateFields.push("DateModified"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    