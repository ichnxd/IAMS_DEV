define(["app","baseListViewController"],function(n,t){var i=function(){var t=this,n=arguments;t.Init(n[0],n[1],n[2])};return i.prototype=Object.create(t.prototype),i.prototype.Init=function(n,i,r){var u=this,e,f;u.$scope=n;_ListViewModel={ID_ModelObject:2119,ModelViewName:"DocumentSeries_ListView",StateName:i,ID_View:3166,ModelName:"DocumentSeries",Icon:"mdi mdi-format-list-numbers",DisplayName:"Document Series",ID_ModelDetailView:3054,ID_ViewType:2,ViewControllerName:"DocumentSeries_DetailView",ID_Model:2093,DisplayProperty:"Name",Height:null,PageSize:50,IsWordWrap:!1,DataSource:"cAX6/SlS/YVfdLnFOcE4pVk/4CGkI5sR1woCRXyT2a9Y7BrLnVKqvYfMLMcYNIWlpkqyjgu21sw+Cgbdb9VXwb8Al6GOjJEPBfKnV4WUiUUlZGQH9uzqIULdTdORCX8U",SQLUpdateProc:"+r6Q6sqAeyZojthYNtCj6RF4JJn4rQawJArQD3aNkPKEc0svMApnh/xADFgZRuxLtIP5QW68rn/xy2Q1UIIh4osR7/8dNzZF9lT8qst5AbH6wjwd5azV4xqNWhEf24qk"};u.$isAllowAdd=!0;u.$isAllowEdit=!0;u.$isAllowDelete=!1;u.ModelName="DocumentSeries";u.IsDeveloperMode=!0;n.ContextMenuItems=[];e=[];u.ButNew={ID:1,text:"New",icon:"fa fa-file-o"};u.$scope.ContextMenuItems.unshift(u.ButNew);u.IsHasCreatedByColumn=!0;t.prototype.Init.call(this,n,i,_ListViewModel,r);u.$scope.dataGridOptions.columns=[{editorOptions:{min:0},ID_ModelProperty:7540,ID_Column:9396,dataField:"LastModifiedBy",allowFixing:!0,visible:!1,caption:"Last Modified By",alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_LastModifiedBy",SQL:"NEuOs326gKNXuU9mK2A1CzdXrTVgsKGAmBHjfUMy8xifGIS+rpVS1aENNlOy3GueFCgQ9UDs1Ub2cdY6pJcr1XSTTw7HqRmKy9SZELZyKp9ubj+Hbsgh6AX8gYUS8ffT",cellTemplate:function(n,t){t.data.LastModifiedBy===undefined&&u.console_warn("LastModifiedBy is undefined in datasource");var i=t.data.LastModifiedBy!==undefined?t.data.LastModifiedBy===null?"-":t.data.LastModifiedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:4824,ID_Column:5134,dataField:"Name",allowFixing:!0,visible:!0,caption:"Name",width:251,allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:4825,ID_Column:5135,dataField:"IsActive",allowFixing:!0,visible:!0,caption:"Active",width:88,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:4826,ID_Column:5136,dataField:"DateCreated",allowFixing:!0,visible:!1,caption:"Date Created",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:4827,ID_Column:5137,dataField:"DateModified",allowFixing:!0,visible:!1,caption:"Date Modified",allowEditing:!1,dataType:"date",format:"MM/dd/yyyy hh:mm tt",isAllowZero:!0,selectedFilterOperation:"between"},{editorOptions:{min:0},placeholder:"Find User...",ID_ModelProperty:4828,ID_Column:5138,dataField:"CreatedBy",allowFixing:!0,visible:!0,caption:"Created By",width:198,alignment:"left",allowEditing:!1,dataType:"string",isAllowZero:!0,ModelOption:{ID_DetailView:2047,Icon:"mdi mdi-account",ModelPropertyName:"User"},refDataField:"ID_CreatedBy",SQL:"LGxqNWtZ58s6wNSnEH1M+sc10IYpqQnP6gntHlMUmrIVBIiDNUqRC60uSrpZoxQQGuWf9rA+SuEZCClYADGcZbP36iG7Tbt96CDCdL3GR70x0f9SZkCh80CaAvyD8lZD",cellTemplate:function(n,t){t.data.CreatedBy===undefined&&u.console_warn("CreatedBy is undefined in datasource");t.data.ID_CreatedBy===u.CurrentUser.ID&&n.addClass("CurrentUser");var i=t.data.CreatedBy!==undefined?t.data.CreatedBy===null?"-":t.data.CreatedBy:"undefined";n.text(i)},groupCellTemplate:function(n,t){var i=t.totalItem.data.items.length,r=t.displayValue!==null?t.displayValue.replace(/\s/g,""):"";$('<div class="GroupColumnHeader"><span class="js-group-caption  '+r+' ">'+(t.displayValue===null?"-":t.displayValue)+'<\/span><div class="group-count">('+i+")<\/div><\/div>").appendTo(n)}},{ID_ModelProperty:4830,ID_Column:5140,dataField:"Comment",allowFixing:!0,visible:!1,caption:"Comment",allowEditing:!1,dataType:"string",isAllowZero:!0},{ID_ModelProperty:4831,ID_Column:5141,dataField:"Prefix",allowFixing:!0,visible:!0,caption:"Prefix",width:93,allowEditing:!1,dataType:"string",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:4833,ID_Column:5143,dataField:"CurrentTransNo",allowFixing:!0,visible:!0,caption:"Current Trans No",width:116,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:4834,ID_Column:5144,dataField:"AddDate",allowFixing:!0,visible:!0,caption:"Add Date",width:91,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:4835,ID_Column:5145,dataField:"SeqNo",allowFixing:!0,format:"fixedPoint",precision:0,visible:!1,caption:"Seq No",width:83,allowEditing:!1,dataType:"number",isAllowZero:!0},{editorOptions:{min:0},ID_ModelProperty:4836,ID_Column:5146,dataField:"DigitCount",allowFixing:!0,visible:!0,caption:"Digit Count",width:83,allowEditing:!1,dataType:"number",isAllowZero:!0},{ID_ModelProperty:4837,ID_Column:5147,dataField:"AddBranchCode",allowFixing:!0,visible:!0,caption:"Add Branch Code",width:94,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:317375,ID_Column:1071319,dataField:"LastDateTransaction",allowFixing:!0,visible:!1,caption:"LastDateTransaction",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"},{ID_ModelProperty:317388,ID_Column:1071349,dataField:"IsResetEveryMonth",allowFixing:!0,visible:!1,caption:"IsResetEveryMonth",width:100,allowEditing:!1,dataType:"boolean",isAllowZero:!0},{ID_ModelProperty:317390,ID_Column:1071356,dataField:"LastTransactionDate",allowFixing:!0,visible:!1,caption:"LastTransactionDate",width:100,allowEditing:!1,dataType:"date",format:"MM/dd/yyyy",isAllowZero:!0,selectedFilterOperation:"between"}];u.$SearchColumns=[];u.$SearchColumns.unshift({ID:-1,Caption:"(All)"});u.$scope.ColumnSearchExpr=-1;u.$scope.searchBoxColumnOption={dataSource:u.$SearchColumns,displayExpr:"Caption",valueExpr:"ID",width:130,value:-1,onValueChanged:function(n){u.$scope.ColumnSearchExpr=n.value},onInitialized:function(n){u.$SearchColumns.length<2&&n.component.option("visible",!1)}};f=null;u.IsDeveloperMode==!0?(f="ID",u.LvModel.firstColumn="ID"):(f=Enumerable.From(u.$scope.dataGridOptions.columns).Where("$.visible == true").ToArray()[0],f.width=100,u.LvModel.firstColumn=f.dataField);u.$SummaryColumnName=f.dataField;u.$scope.dataGridOptions.summary.totalItems.push({name:"SelectedRowsSummary",showInColumn:u.IsDeveloperMode==!0?"ID":f.dataField,summaryType:"custom",customizeText:function(){return u.TotalRecordCount+" Record"+(u.TotalRecordCount>1?"s":"")+" found"}});$.each(e,function(n,t){u.$scope.dataGridOptions.summary.totalItems.push(t)})},i})