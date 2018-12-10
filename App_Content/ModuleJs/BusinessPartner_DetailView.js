define(["app","baseDetailViewController","/JsApp/GetScript?Url=VC_BusinessPartner"],function(n,t,i){var r=function(){var t=this,n=arguments;t.ModelHelper=new i;t.ModelHelper.ID_ViewType=2;t.Init(n[0],n[1],n[2],n[3],n[4],n[5],n[6])};return r.prototype=Object.create(t.prototype),r.prototype.Init=function(n,i,r,u,f,e,o){var s=this;s.IsEmptyString=function(n){return n===undefined||n===null?!0:n.replace(" ","").length===0?!0:!1};n.DisplayName="Business Partner";n.DisplayPropertyName=i.ID==-1?"(New)":s.IsEmptyString(i.Name)==!0?"":i.Name;s.DisplayProperty="Name";s.ID_ModelObject=3102;s.ID_View=3335;s.ID_Model=2141;s.ModelViewName="BusinessPartner_DetailView";s.ModelName="BusinessPartner";s.DisplayName="Business Partner";s.IsEditingOnly=!1;s.IsDeveloperMode=!1;s.$isAllowAdd=!0;s.$isAllowEdit=!0;s.CRUDTablesIds={Main:2141,Contacts:2156,BusinessPartner_Branchs:12475};t.prototype.Init.call(this,n,i,r,u,f,e,o);var v=i,h=s.GetControlDataSource("DxmcOXm8ZtxqNdjH6EoBJ4FT2UgadL+NTYMuOJlwquhyoJ62Hq+28CGoirZOVhOdsCYug7Y0zdIYMOOhM1Ls6DH36Wm0Pil4jDI7KeT3UdANb0YnGKw8QyqYjrPnByCl"),c=s.GetControlDataSource("CiGWTR9lWJrkU5SG1vNdz/VpcRieptqTkNqSF2BIw5H/v3j20P91ouGNkX50pH3iINWPFoyzuep8Fbr6TNX9XgI5hGpwXnlKxapQxbAOuINPje723I4VS94dgjpAKqFkqir6d7N6g2QJbTCKgLVp56LHqUqoRQtlpWpN7mZf4KQ="),l=s.GetControlDataSource("4UUXngT+t0HGBLntxKPu9FVJMzi6CEVzc+WTPP+7dybIiMdzbp7NRKsl9CACFpvk7i+H+yloQN7QfH3MESIyCzLOlTW+O+QEck/pjCHdYhfbw6qXKQ+JR+sFN5bLK38b8foY27P7rx4cKrOWiPFrlbcXqHgTFxDVkCs1pvammtI="),a=s.GetControlDataSource("y8eTF4n2+GrBkb+xcKSPTjoQIxh3dyd+DjodxVakwXyyXczq4gtEv+47+asBGoUFbQxA/ILzvdOgr5NHzdYi1DwO52XZhHJKt4F7+uvJGOH7DFBuCMtrki45az2EYuTJ79nHnpxpaknvgZpy7+v1wjpDX2t21XTE3eV1cAJc7Zo=");if(s.$scope.GeneralFormOptions={bindingOptions:{"formData.ID_PaymentTerm":"CurrentObject.ID_PaymentTerm","formData.Address1":"CurrentObject.Address1","formData.Address2":"CurrentObject.Address2","formData.Address3":"CurrentObject.Address3","formData.Branch":"CurrentObject.Branch","formData.Code":"CurrentObject.Code","formData.Comment":"CurrentObject.Comment","formData.CreditLimit":"CurrentObject.CreditLimit","formData.CustomerCode":"CurrentObject.CustomerCode","formData.DateCreated":"CurrentObject.DateCreated","formData.DateModified":"CurrentObject.DateModified","formData.DeliveryTo":"CurrentObject.DeliveryTo","formData.FaxNo":"CurrentObject.FaxNo","formData.FullAddress":"CurrentObject.FullAddress","formData.ID_TaxScheme":"CurrentObject.ID_TaxScheme","formData.InvoiceTo":"CurrentObject.InvoiceTo","formData.ID_Currency":"CurrentObject.ID_Currency","formData.ID_CustomerType":"CurrentObject.ID_CustomerType","formData.ID_EPP_AccountExecutive":"CurrentObject.ID_EPP_AccountExecutive","formData.IsSupplier":"CurrentObject.IsSupplier","formData.IsWalkIn":"CurrentObject.IsWalkIn","formData.Management":"CurrentObject.Management","formData.ID_EWT":"CurrentObject.ID_EWT","formData.ID_ModifiedBy":"CurrentObject.ID_ModifiedBy","formData.ID_SupplierType":"CurrentObject.ID_SupplierType","formData.Reason":"CurrentObject.Reason","formData.SupplierCode":"CurrentObject.SupplierCode","formData.IsActive":"CurrentObject.IsActive","formData.IsCustomer":"CurrentObject.IsCustomer","formData.IsImported":"CurrentObject.IsImported","formData.TelNo":"CurrentObject.TelNo","formData.TIN":"CurrentObject.TIN","formData.TradeName":"CurrentObject.TradeName","formData.Name":"CurrentObject.Name","formData.ParentCompany":"CurrentObject.ParentCompany","formData.ID_BusinessStyle":"CurrentObject.ID_BusinessStyle","formData.CreatedBy":"CurrentObject.CreatedBy"},formData:s.$scope.CurrentObject,customizeItem:s.customizeItem,onInitialized:function(n){$(n.element).addClass("generalform");s.$timeout(function(){s.firstFieldIndex="Name";s.FormInstance=n.component;s.FormInstance.option("$EditableProperties",["ID_PaymentTerm","Address1","Address2","Address3","Branch","Comment","CreditLimit","DeliveryTo","FaxNo","FullAddress","ID_TaxScheme","InvoiceTo","ID","ID_Currency","ID_CustomerType","ID_EPP_AccountExecutive","IsSupplier","IsWalkIn","Management","ID_EWT","ID_SupplierType","IsActive","IsCustomer","IsImported","TelNo","TIN","TradeName","Name","ParentCompany","ID_BusinessStyle"]);s.OnFormInitialized();s.setFormReadOnly=function(n){if(s.IsFormReadOnly!==n){s.IsFormReadOnly=n;s.$fileUploaders!==undefined&&s.$fileUploaders!==null&&s.$fileUploaders.length>0&&$.each(s.$fileUploaders,function(t,i){i.component!==undefined?i.component.option("readOnly",!n):i.option("readOnly",!n)});$.each(s.DetailViewForms,function(t,i){i.setFormReadOnly(n)});s.setID_PaymentTermReadOnly!==undefined&&s.setID_PaymentTermReadOnly(n);s.setAddress1ReadOnly!==undefined&&s.setAddress1ReadOnly(n);s.setAddress2ReadOnly!==undefined&&s.setAddress2ReadOnly(n);s.setAddress3ReadOnly!==undefined&&s.setAddress3ReadOnly(n);s.setBranchReadOnly!==undefined&&s.setBranchReadOnly(n);s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n);s.setCreditLimitReadOnly!==undefined&&s.setCreditLimitReadOnly(n);s.setDeliveryToReadOnly!==undefined&&s.setDeliveryToReadOnly(n);s.setFaxNoReadOnly!==undefined&&s.setFaxNoReadOnly(n);s.setFullAddressReadOnly!==undefined&&s.setFullAddressReadOnly(n);s.setID_TaxSchemeReadOnly!==undefined&&s.setID_TaxSchemeReadOnly(n);s.setInvoiceToReadOnly!==undefined&&s.setInvoiceToReadOnly(n);s.setIDReadOnly!==undefined&&s.setIDReadOnly(n);s.setID_CurrencyReadOnly!==undefined&&s.setID_CurrencyReadOnly(n);s.setID_CustomerTypeReadOnly!==undefined&&s.setID_CustomerTypeReadOnly(n);s.setID_EPP_AccountExecutiveReadOnly!==undefined&&s.setID_EPP_AccountExecutiveReadOnly(n);s.setIsSupplierReadOnly!==undefined&&s.setIsSupplierReadOnly(n);s.setIsWalkInReadOnly!==undefined&&s.setIsWalkInReadOnly(n);s.setManagementReadOnly!==undefined&&s.setManagementReadOnly(n);s.setID_EWTReadOnly!==undefined&&s.setID_EWTReadOnly(n);s.setID_SupplierTypeReadOnly!==undefined&&s.setID_SupplierTypeReadOnly(n);s.setIsActiveReadOnly!==undefined&&s.setIsActiveReadOnly(n);s.setIsCustomerReadOnly!==undefined&&s.setIsCustomerReadOnly(n);s.setIsImportedReadOnly!==undefined&&s.setIsImportedReadOnly(n);s.setTelNoReadOnly!==undefined&&s.setTelNoReadOnly(n);s.setTINReadOnly!==undefined&&s.setTINReadOnly(n);s.setTradeNameReadOnly!==undefined&&s.setTradeNameReadOnly(n);s.setNameReadOnly!==undefined&&s.setNameReadOnly(n);s.setParentCompanyReadOnly!==undefined&&s.setParentCompanyReadOnly(n);s.setID_BusinessStyleReadOnly!==undefined&&s.setID_BusinessStyleReadOnly(n);$.each(["BusinessPartner_Branchs","Contacts"],function(t,i){s["set"+i+"GridEnabled"]!==undefined&&s["set"+i+"GridEnabled"](!n)});s.ChildToolbars!==undefined&&$.each(s.ChildToolbars,function(t,i){i.option("dataSource")!=undefined&&$.each(i.option("dataSource"),function(t,i){(i.isSystem==undefined||i.isSystem!=!0)&&(i.disabled=n)})});s.onSetFormReadOnly(n)}};s.onLoad()},500)},onFieldDataChanged:function(n){s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:((n.dataField==="Address1"||n.dataField==="Address2"||n.dataField==="Address3"||n.dataField==="Branch"||n.dataField==="Code"||n.dataField==="Comment"||n.dataField==="CreditLimit"||n.dataField==="CustomerCode"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="DeliveryTo"||n.dataField==="FaxNo"||n.dataField==="FullAddress"||n.dataField==="InvoiceTo"||n.dataField==="ID"||n.dataField==="IsSupplier"||n.dataField==="IsWalkIn"||n.dataField==="Management"||n.dataField==="ID_ModifiedBy"||n.dataField==="Reason"||n.dataField==="SupplierCode"||n.dataField==="IsActive"||n.dataField==="IsCustomer"||n.dataField==="IsImported"||n.dataField==="TelNo"||n.dataField==="TIN"||n.dataField==="TradeName"||n.dataField==="Name"||n.dataField==="ParentCompany"||n.dataField==="ID_CreatedBy")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),n.dataField!=="Code"&&n.dataField!=="CustomerCode"&&n.dataField!=="DateCreated"&&n.dataField!=="DateModified"&&n.dataField!=="ID_ModifiedBy"&&n.dataField!=="Reason"&&n.dataField!=="SupplierCode"&&n.dataField!=="ID_CreatedBy"&&(s.$scope.CurrentObject.$dirty=!0)),s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()}))},scrollingEnabled:!0,height:function(){return"89%"},items:[{itemType:"tabbed",tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized,onItemClick:s.onTab_Click},tabs:[{title:"General",ID_Tab:-1,items:[{itemType:"group",colCount:1,tabPanelOptions:{deferRendering:!1,onInitialized:s.onTabInitialized},items:[{itemType:"group",IsShowLabel:!0,colCount:1,colSpan:1,items:[{name:"Code",label:{text:"Code",alignment:"right",showColon:!1,location:"left"},dataField:"Code",editorType:"dxTextBox",editorOptions:{PropertyName:"Code",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("Code",n)},tabIndex:1e8}},{name:"ParentCompany",label:{text:"Parent Company",alignment:"right",showColon:!1,location:"left"},dataField:"ParentCompany",editorType:"dxTextBox",editorOptions:{PropertyName:"ParentCompany",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("ParentCompany",n)}}},{name:"Name",label:{text:"Registered Name",alignment:"right",showColon:!1,location:"left"},dataField:"Name",editorType:"dxTextBox",editorOptions:{PropertyName:"Name",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Name",n)},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Registered Name"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Registered Name is required"}],cssClass:"js-dx-required"},{name:"Management",label:{text:"Management",alignment:"right",showColon:!1,location:"left"},dataField:"Management",editorType:"dxTextBox",editorOptions:{PropertyName:"Management",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Management",n)}}},{name:"TradeName",label:{text:"Trade Name",alignment:"right",showColon:!1,location:"left"},dataField:"TradeName",editorType:"dxTextBox",editorOptions:{PropertyName:"TradeName",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TradeName",n)}}},{name:"Branch",label:{text:"Branch",alignment:"right",showColon:!1,location:"left"},dataField:"Branch",editorType:"dxTextBox",editorOptions:{PropertyName:"Branch",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Branch",n)}}},{name:"IsActive",label:{text:"Active",alignment:"right",showColon:!1,location:"left"},dataField:"IsActive",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsActive",onInitialized:function(n){s.onControl_Initialized("IsActive",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsActive=n.value}}},{name:"FullAddress",label:{text:"Full Address",alignment:"right",showColon:!1,location:"left"},dataField:"FullAddress",editorType:"dxTextArea",editorOptions:{PropertyName:"FullAddress",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:50,onInitialized:function(n){s.onControl_Initialized("FullAddress",n)}}},{name:"TelNo",label:{text:"Tel No",alignment:"right",showColon:!1,location:"left"},dataField:"TelNo",editorType:"dxTextBox",editorOptions:{PropertyName:"TelNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TelNo",n)}}},{name:"ID_PaymentTerm",label:{text:"Payment Term",alignment:"right",showColon:!1,location:"left"},dataField:"ID_PaymentTerm",editorType:"dxListViewBox",editorOptions:{PropertyName:"ID_PaymentTerm",SQL:"T4PABT5++fYUHxcSsS6x3ZCNtPHSOHrcRZ0TixIAi2HQvikw2pvc2ferce8oGIE9Oy/JSBF8vpgIzWhUioZnHdbeKnZPJxFtgzx5rDkGqTUhTt2JVHKClDfzqIRJ15eMRw/i7Gk0+lrq7SXWK8ozidLnkQLQaADpz1wiefpgLfA=",IsDeveloperMode:!1,ID_Control:6074,ID_ModelProperty:5365,ControlName:"ID_PaymentTerm",DisplayProperty:"PaymentTerm",CurrentObject:s.CurrentObject,FormatKey:"62EA1DFD-F716-4595-8144-D859A1723AFC",ModelOption:{ID_DetailView:3095,ModelPropertyName:"Payment Term",IsModal:s.IsModal===!0,ID_Model_Caller:2141,Icon:"mdi mdi-credit-card"},onInitialized:function(n){var i=n.component,t;s.$scope.CurrentObject.ID_PaymentTerm!=null&&(t=[{ID:s.$scope.CurrentObject.ID_PaymentTerm,Name:s.$scope.CurrentObject.PaymentTerm}],s.$scope.CurrentObject.EXPR_ID_PaymentTerm=t[0],i.$setValue(t[0]));s.onControl_Initialized("ID_PaymentTerm",n)},OnItemSelected:function(n){var t=n;t==undefined&&(t=null);s.$scope.CurrentObject.EXPR_ID_PaymentTerm=t;s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_PaymentTerm",value:t})});s.$scope.CurrentObject.ID_PaymentTerm=t!==null?t.ID:null;s.$scope.CurrentObject.PaymentTerm=t!==null?t.Name:""},onValueChanged:function(n){if(s.$scope.CurrentObject.$dirty=!0,n.value===null)s.$timeout(function(){s.CurrentObject_FieldDataChanged({dataField:"ID_PaymentTerm",value:null})});else{if(n.component.$IsSelf==!0){n.component.$IsSelf=undefined;return}var t={ID:n.value,Name:s.$scope.CurrentObject.PaymentTerm};s.$timeout(function(){n.component.$setValue(t,!1);n.component.repaint()},300)}},onFocusIn:function(){s.$timeout(function(){s.$scope.StatusText="Please Specify Payment Term"})},onFocusOut:function(){s.$timeout(function(){s.$scope.StatusText=""})}},validationRules:[{type:"required",message:"Payment Term is required"}],cssClass:"js-dx-required"},{name:"IsWalkIn",label:{text:"Walk In",alignment:"right",showColon:!1,location:"left"},dataField:"IsWalkIn",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsWalkIn",onInitialized:function(n){s.onControl_Initialized("IsWalkIn",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsWalkIn=n.value}}},{name:"ID_BusinessStyle",label:{text:"Business Style",alignment:"right",showColon:!1,location:"left"},dataField:"ID_BusinessStyle",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_BusinessStyle",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:a,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_BusinessStyle",value:t});s.$scope.CurrentObject.ID_BusinessStyle=t!==null?t.ID:null;s.$scope.CurrentObject.ID_BusinessStyle_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_BusinessStyle",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"ID_TaxScheme",label:{text:"Tax Scheme",alignment:"right",showColon:!1,location:"left"},dataField:"ID_TaxScheme",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_TaxScheme",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:h,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_TaxScheme",value:t});s.$scope.CurrentObject.ID_TaxScheme=t!==null?t.ID:null;s.$scope.CurrentObject.TaxScheme=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_TaxScheme",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"ID_EPP_AccountExecutive",label:{text:"BDM",alignment:"right",showColon:!1,location:"left"},dataField:"ID_EPP_AccountExecutive",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_EPP_AccountExecutive",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:l,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_EPP_AccountExecutive",value:t});s.$scope.CurrentObject.ID_EPP_AccountExecutive=t!==null?t.ID:null;s.$scope.CurrentObject.EPPAccountExecutive=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_EPP_AccountExecutive",n)},displayExpr:"Name",valueExpr:"ID"}}]}]}]},{ID_Tab:14602,title:"Supplier",colCount:1,items:[{name:"IsSupplier",label:{text:"Supplier",alignment:"right",showColon:!1,location:"left"},dataField:"IsSupplier",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsSupplier",onInitialized:function(n){s.onControl_Initialized("IsSupplier",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsSupplier=n.value}}},{name:"ID_SupplierType",label:{text:"Supplier Type",alignment:"right",showColon:!1,location:"left"},dataField:"ID_SupplierType",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_SupplierType",showClearButton:!0,items:[{ID:1,Name:"AcctgProducts"},{ID:2,Name:"Appliances"},{ID:3,Name:"Cargo"},{ID:4,Name:"ComputerNetworkSoftware"},{ID:5,Name:"ElectroElecConstruction"},{ID:6,Name:"ElectroElecConstruction/Appliances"},{ID:7,Name:"ElectroElecConstruction/ComputerNetworkSoftware"},{ID:8,Name:"Foreign Supplier"},{ID:9,Name:"Frabrication"},{ID:10,Name:"ITProducts"},{ID:11,Name:"ITProducts/ComputerNetworkSoftware"},{ID:12,Name:"NULL"},{ID:13,Name:"OfficeSuppliesUniform"},{ID:14,Name:"Photographer"},{ID:15,Name:"ReaderCashDrawerID"},{ID:16,Name:"ReaderCashDrawerID/ComputerNetworkSoftware"},{ID:17,Name:"VehiclePartsService"}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_SupplierType",value:t});s.$scope.CurrentObject.ID_SupplierType=t!==null?t.ID:null;s.$scope.CurrentObject.ID_SupplierType_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_SupplierType",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"SupplierCode",label:{text:"Supplier Code",alignment:"right",showColon:!1,location:"left"},dataField:"SupplierCode",editorType:"dxTextBox",editorOptions:{PropertyName:"SupplierCode",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("SupplierCode",n)},tabIndex:1e8}}]},{ID_Tab:14603,title:"Customer",colCount:1,items:[{name:"IsCustomer",label:{text:"Customer",alignment:"right",showColon:!1,location:"left"},dataField:"IsCustomer",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsCustomer",onInitialized:function(n){s.onControl_Initialized("IsCustomer",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsCustomer=n.value}}},{name:"ID_CustomerType",label:{text:"Customer Type",alignment:"right",showColon:!1,location:"left"},dataField:"ID_CustomerType",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_CustomerType",showClearButton:!0,searchEnabled:!0,searchMode:"contains",dataSource:c,onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_CustomerType",value:t});s.$scope.CurrentObject.ID_CustomerType=t!==null?t.ID:null;s.$scope.CurrentObject.ID_CustomerType_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_CustomerType",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"CustomerCode",label:{text:"Customer Code",alignment:"right",showColon:!1,location:"left"},dataField:"CustomerCode",editorType:"dxTextBox",editorOptions:{PropertyName:"CustomerCode",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("CustomerCode",n)},tabIndex:1e8}},{name:"InvoiceTo",label:{text:"Invoice To",alignment:"right",showColon:!1,location:"left"},dataField:"InvoiceTo",editorType:"dxTextArea",editorOptions:{PropertyName:"InvoiceTo",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:150,onInitialized:function(n){s.onControl_Initialized("InvoiceTo",n)}}},{name:"DeliveryTo",label:{text:"Delivery To",alignment:"right",showColon:!1,location:"left"},dataField:"DeliveryTo",editorType:"dxTextArea",editorOptions:{PropertyName:"DeliveryTo",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:150,onInitialized:function(n){s.onControl_Initialized("DeliveryTo",n)}}}]}]}]},s.$scope.ContactsGridOption=s.GetDetailGridOption("Contact_LookUp_ListView","$parent.$parent.CurrentObject.Contacts","Contacts",[{editorOptions:{min:0},ID_ModelProperty:5653,ID_Column:6717,dataField:"ID",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"number",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:17995,ID_Column:20998,dataField:"IsDefault",allowFixing:!0,visible:!0,caption:"Default",width:80,fixed:!0,fixedPosition:"left",allowEditing:!0,dataType:"boolean",isAllowZero:!0,cssClass:"editable-cell "},{ID_ModelProperty:5655,ID_Column:6719,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:200,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:5663,ID_Column:6727,dataField:"LastName",allowFixing:!0,visible:!0,caption:"Last Name",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,validationRules:[{type:"required",message:"Last Name is required"}],cssClass:"editable-cell  js-required"},{ID_ModelProperty:5664,ID_Column:6728,dataField:"FirstName",allowFixing:!0,visible:!0,caption:"First Name",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,validationRules:[{type:"required",message:"First Name is required"}],cssClass:"editable-cell  js-required"},{ID_ModelProperty:5665,ID_Column:6729,dataField:"MiddleName",allowFixing:!0,visible:!0,caption:"Middle Name",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{ID_ModelProperty:5666,ID_Column:6730,dataField:"MobileNo",allowFixing:!0,visible:!0,caption:"Mobile No",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{ID_ModelProperty:5667,ID_Column:6731,dataField:"TelNo",allowFixing:!0,visible:!0,caption:"Tel No",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{ID_ModelProperty:5668,ID_Column:6732,dataField:"EmailAddress",allowFixing:!0,visible:!0,caption:"Email Address",width:200,allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "},{editorOptions:{min:0},ID_ModelProperty:19611,ID_Column:24193,dataField:"ID_ContactReference",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_ContactReference",allowEditing:!1,dataType:"number",isAllowZero:!0}],"",3117,null,350,"@ID",null,"Contacts",2242,2156,6385,5671,undefined,100),s.$scope.BusinessPartner_BranchsGridOption=s.GetDetailGridOption("BusinessPartner_Branch_LookUp_ListView","$parent.$parent.CurrentObject.BusinessPartner_Branchs","BusinessPartner_Branchs",[{ID_ModelProperty:224499,ID_Column:368558,dataField:"ID",allowFixing:!0,visible:!0,caption:"ID",width:100,alignment:"right",fixed:!0,allowEditing:!1,dataType:"string",isAllowZero:!0,cellTemplate:function(n,t){var i=t.data.ID;i<0?n.text("(New)"):n.text("")},cssClass:"system-id"},{ID_ModelProperty:224500,ID_Column:368559,dataField:"Code",allowFixing:!0,visible:!1,caption:"Code",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:224501,ID_Column:368560,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",allowEditing:!0,dataType:"string",isAllowZero:!0,validationRules:[{type:"required",message:"Name is required"}],cssClass:"editable-cell  js-required"},{ID_ModelProperty:224502,ID_Column:368561,dataField:"IsActive",allowFixing:!0,visible:!1,caption:"Active",allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:224503,ID_Column:368562,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224504,ID_Column:368563,dataField:"ID_BusinessPartner",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_BusinessPartner",allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:224505,ID_Column:368564,dataField:"ID_Warehouse",allowFixing:!0,format:{type:"fixedPoint",precision:0},visible:!1,caption:"ID_Warehouse",allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:224506,ID_Column:368565,dataField:"Address",allowFixing:!0,visible:!0,caption:"Address",allowEditing:!0,dataType:"string",isAllowZero:!0,cssClass:"editable-cell "}],"",10442,null,300,"@ID",null,"Branch",9883,12475,294424,224507,undefined,100),s.$scope.Contacts_MenuOptions=[],s.$scope.Contacts_MenuOptions.push({text:"Add Contacts",icon:"mdi mdi-playlist-plus",IsDisabled:function(){return s.IsFormReadOnly==!0?!0:!1},onItemClick:function(){s.OpenOnNewWindowByID(3117,-1,{IsEditingOnly:!0,PropertyLink:"ID_BusinessPartner",onCurrentObjectLoad:function(n){n.ID_BusinessPartner=s.$scope.CurrentObject.ID;n.BusinessPartner=s.$scope.CurrentObject.Name},OnEditingDone:function(n){s.$scope.CurrentObject.Contacts===null&&s.$scope.CurrentObject.Contacts==undefined&&(s.$scope.CurrentObject.Contacts=[]);s.$scope.CurrentObject.Contacts.push(n)}})}}),s.$scope.BusinessPartner_Branchs_MenuOptions=[],s.$scope.GeneralGridTabPabelItems=[{title:"Detail",isForm:!0,ID_Tab:14605,name:"OtherTab",formOption:{bindingOptions:{"formData.Address1":"$parent.$parent.CurrentObject.Address1","formData.Address2":"$parent.$parent.CurrentObject.Address2","formData.Address3":"$parent.$parent.CurrentObject.Address3","formData.ID_EWT":"$parent.$parent.CurrentObject.ID_EWT","formData.FaxNo":"$parent.$parent.CurrentObject.FaxNo","formData.TIN":"$parent.$parent.CurrentObject.TIN","formData.IsImported":"$parent.$parent.CurrentObject.IsImported","formData.ID_Currency":"$parent.$parent.CurrentObject.ID_Currency","formData.CreditLimit":"$parent.$parent.CurrentObject.CreditLimit"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",["Address1","Address2","Address3","ID_EWT","FaxNo","TIN","IsImported","ID_Currency","CreditLimit"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setAddress1ReadOnly!==undefined&&s.setAddress1ReadOnly(n);s.setAddress2ReadOnly!==undefined&&s.setAddress2ReadOnly(n);s.setAddress3ReadOnly!==undefined&&s.setAddress3ReadOnly(n);s.setID_EWTReadOnly!==undefined&&s.setID_EWTReadOnly(n);s.setFaxNoReadOnly!==undefined&&s.setFaxNoReadOnly(n);s.setTINReadOnly!==undefined&&s.setTINReadOnly(n);s.setIsImportedReadOnly!==undefined&&s.setIsImportedReadOnly(n);s.setID_CurrencyReadOnly!==undefined&&s.setID_CurrencyReadOnly(n);s.setCreditLimitReadOnly!==undefined&&s.setCreditLimitReadOnly(n)},s.onOtherTab_TabFormInitialized!==undefined)s.onOtherTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="Address1"||n.dataField==="Address2"||n.dataField==="Address3"||n.dataField==="FaxNo"||n.dataField==="TIN"||n.dataField==="IsImported"||n.dataField==="CreditLimit")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"Address1",label:{text:"Address1",alignment:"right",showColon:!1,location:"left"},dataField:"Address1",editorType:"dxTextBox",editorOptions:{PropertyName:"Address1",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address1",n)}}},{name:"Address2",label:{text:"Address2",alignment:"right",showColon:!1,location:"left"},dataField:"Address2",editorType:"dxTextBox",editorOptions:{PropertyName:"Address2",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address2",n)}}},{name:"Address3",label:{text:"Address3",alignment:"right",showColon:!1,location:"left"},dataField:"Address3",editorType:"dxTextBox",editorOptions:{PropertyName:"Address3",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("Address3",n)}}},{name:"ID_EWT",label:{text:"EWT",alignment:"right",showColon:!1,location:"left"},dataField:"ID_EWT",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_EWT",showClearButton:!0,items:[{ID:2,Name:"Prime Contractors/ Sub-contractors "},{ID:5,Name:"Professional (Lawyer/CPA/Engr) Gross Income not exceed Php3M"},{ID:1,Name:"Purchase of Goods"},{ID:3,Name:"Rentals"},{ID:4,Name:"Zero Rated"}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_EWT",value:t});s.$scope.CurrentObject.ID_EWT=t!==null?t.ID:null;s.$scope.CurrentObject.ID_EWT_DisplayName=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_EWT",n)},displayExpr:"Name",valueExpr:"ID"}},{name:"FaxNo",label:{text:"Fax No",alignment:"right",showColon:!1,location:"left"},dataField:"FaxNo",editorType:"dxTextBox",editorOptions:{PropertyName:"FaxNo",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("FaxNo",n)},mask:"(000)000-0000",useMaskedValue:!0}},{name:"TIN",label:{text:"TIN",alignment:"right",showColon:!1,location:"left"},dataField:"TIN",editorType:"dxTextBox",editorOptions:{PropertyName:"TIN",onKeyDown:function(){s.$isReloadCurrentObject=!1},onInitialized:function(n){s.onControl_Initialized("TIN",n)}}},{name:"IsImported",label:{text:"Imported",alignment:"right",showColon:!1,location:"left"},dataField:"IsImported",editorType:"dxCheckBox",editorOptions:{PropertyName:"IsImported",onInitialized:function(n){s.onControl_Initialized("IsImported",n)},onValueChanged:function(n){s.$scope.CurrentObject.IsImported=n.value}}},{name:"ID_Currency",label:{text:"Currency",alignment:"right",showColon:!1,location:"left"},dataField:"ID_Currency",editorType:"cmSelectBox",editorOptions:{PropertyName:"ID_Currency",disabled:!0,showClearButton:!0,items:[{ID:1,Name:"Philippine Peso",Conversion:1},{ID:2,Name:"US Dollar",Conversion:49.34},{ID:3,Name:"Japan Yen",Conversion:1.49},{ID:4,Name:"EURO",Conversion:null},{ID:5,Name:"SGD Dollar",Conversion:null},{ID:6,Name:"United Arab Emirates Dirham",Conversion:null}],searchEnabled:!0,searchMode:"contains",onValueChanged:function(n){var t=n.component._options.selectedItem;s.CurrentObject_FieldDataChanged({dataField:"ID_Currency",value:t});s.$scope.CurrentObject.ID_Currency=t!==null?t.ID:null;s.$scope.CurrentObject.Currrency=t!==null?t.Name:""},onInitialized:function(n){s.onControl_Initialized("ID_Currency",n)},displayExpr:"Name",valueExpr:"ID",tabIndex:1e8}},{name:"CreditLimit",label:{text:"Credit Limit",alignment:"right",showColon:!1,location:"left"},dataField:"CreditLimit",editorType:"jDxNumberBox",editorOptions:{PropertyName:"CreditLimit",onKeyDown:function(){s.$isReloadCurrentObject=!1},PropertyName:"CreditLimit",format:"#0%",OnEnterKey:function(n){var t=n.component.option("value");s.$scope.CurrentObject.CreditLimit=(t==null?0:t).toFixed(2)},onInitialized:function(n){s.onControl_Initialized("CreditLimit",n)}}}]}]}},{isForm:!1,Caption:"Contacts",Name:"ContactsGridContainer",title:"Contacts",PropertyName:"Contacts",DisplayProperty:"Name",GridOption:s.$scope.ContactsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.Contacts_MenuOptions"})},{title:"Comment",isForm:!0,ID_Tab:8025,name:"CommentTab",formOption:{bindingOptions:{"formData.Comment":"$parent.$parent.CurrentObject.Comment"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:1,onInitialized:function(n){n.component.option("$EditableProperties",["Comment"]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(n){s.setCommentReadOnly!==undefined&&s.setCommentReadOnly(n)},s.onCommentTab_TabFormInitialized!==undefined)s.onCommentTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:n.dataField==="Comment"&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),s.$scope.CurrentObject.$dirty=!0)},items:[{itemType:"group",colCount:1,colSpan:1,items:[{name:"Comment",label:{visible:!1},dataField:"Comment",editorType:"dxTextArea",editorOptions:{PropertyName:"Comment",onKeyDown:function(){s.$isReloadCurrentObject=!1},height:200,onInitialized:function(n){s.onControl_Initialized("Comment",n);s.$timeout(function(){$($(n.element).find(".dx-texteditor-input")).css({"font-size":"15px"})})}},colSpan:2}]}]}},{title:"Forex",isForm:!0,ID_Tab:19332,name:"ForeignExTab",formOption:{bindingOptions:{},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onForeignExTab_TabFormInitialized!==undefined)s.onForeignExTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0&&(s.$scope.CurrentObject.$dirty=!1)},items:[{itemType:"group",colCount:2,colSpan:2,items:[]}]}},{title:"Status",isForm:!0,ID_Tab:12178,name:"StatusTab",formOption:{bindingOptions:{"formData.CreatedBy":"$parent.$parent.CurrentObject.CreatedBy","formData.ID_ModifiedBy":"$parent.$parent.CurrentObject.ID_ModifiedBy","formData.DateCreated":"$parent.$parent.CurrentObject.DateCreated","formData.DateModified":"$parent.$parent.CurrentObject.DateModified","formData.Reason":"$parent.$parent.CurrentObject.Reason"},customizeItem:s.customizeItem,formData:s.$scope.CurrentObject,colCount:2,onInitialized:function(n){n.component.option("$EditableProperties",[]);s.$timeout(function(){if(s.DetailViewForms.push(n.component),n.component.setFormReadOnly=function(){},s.onStatusTab_TabFormInitialized!==undefined)s.onStatusTab_TabFormInitialized(n)},500)},onFieldDataChanged:function(n){s.ComputeExpression!=undefined&&s.$timeout(function(){s.ComputeExpression()});s.$isReloadCurrentObject==!0?s.$scope.CurrentObject.$dirty=!1:(n.dataField==="ID_CreatedBy"||n.dataField==="ID_ModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Reason")&&(s.CurrentObject_FieldDataChanged({dataField:n.dataField,value:n.value}),(n.dataField==="ID_CreatedBy"||n.dataField==="ID_ModifiedBy"||n.dataField==="DateCreated"||n.dataField==="DateModified"||n.dataField==="Reason")&&(s.$scope.CurrentObject.$dirty=!0))},items:[{itemType:"group",colCount:2,colSpan:2,items:[{name:"ID_CreatedBy",label:{text:"Created By",alignment:"right",showColon:!1,location:"left"},dataField:"CreatedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_CreatedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_CreatedBy",n)},tabIndex:1e8}},{name:"ID_ModifiedBy",label:{text:"Modified By",alignment:"right",showColon:!1,location:"left"},dataField:"ID_ModifiedBy",editorType:"dxTextBox",editorOptions:{PropertyName:"ID_ModifiedBy",readOnly:!0,onInitialized:function(n){s.onControl_Initialized("ID_ModifiedBy",n)},tabIndex:1e8}},{name:"DateCreated",label:{text:"Date Created",alignment:"right",showColon:!1,location:"left"},dataField:"DateCreated",editorType:"dxDateBox",editorOptions:{PropertyName:"DateCreated",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateCreated",n)},tabIndex:1e8}},{name:"DateModified",label:{text:"Date Modified",alignment:"right",showColon:!1,location:"left"},dataField:"DateModified",editorType:"dxDateBox",editorOptions:{PropertyName:"DateModified",readOnly:!0,width:"100%",type:"date",onInitialized:function(n){s.onControl_Initialized("DateModified",n)},tabIndex:1e8}},{name:"Reason",label:{text:"Reason",alignment:"right",showColon:!1,location:"left"},dataField:"Reason",editorType:"dxTextArea",editorOptions:{PropertyName:"Reason",readOnly:!0,height:150,onInitialized:function(n){s.onControl_Initialized("Reason",n)},tabIndex:1e8}}]}]}},{isForm:!1,Caption:"Branch",Name:"BusinessPartner_BranchsGridContainer",title:"Branch",PropertyName:"BusinessPartner_Branchs",DisplayProperty:"Name",GridOption:s.$scope.BusinessPartner_BranchsGridOption,width:"100%",MenuOptions:s.GetGridMenuOption({dataSource:"$parent.$parent.BusinessPartner_Branchs_MenuOptions"})}],s.$scope.GridTabPanelControlOption={items:s.$scope.GeneralGridTabPabelItems,onItemClick:s.onTab_Click,onInitialized:function(n){if(s.GridTabPanelControl=n.component,s.onTabInitialized!==undefined)s.onTabInitialized(n)},deferRendering:!1,swipeEnabled:!1,itemTemplate:"dxDataGrid",scrollByContent:!0,loop:!1,animationEnabled:!1},s.$scope.CurrentObject.CRUD={Main:2141,Contacts:2156,BusinessPartner_Branchs:12475},s.$dateFields.push("DateModified"),s.$dateFields.push("DateCreated"),s.ModelHelper!=null){s.ModelHelper.Init(this);s.ModelHelper.onInitDetailView(this)}if(s.ViewHelper!=null){s.ViewHelper.Init(this);s.ViewHelper.onInitDetailView(this)}},r})    