// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.26/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./utils","./CreditEstimator","./ExpressionGrid","dojo/i18n!../../nls/jsapi","dojo/text!./templates/FindExistingLocations.html"],function(t,s,e,i,n,a,o,r,h,l,y,d,u,c,p,L,_,m,x,f,g,w,C,S,v,A,b,j,I,k,E,B,F,N,G,U,J,P){var T=s([p,L,_,m,x,F,B],{declaredClass:"esri.dijit.analysis.FindExistingLocations",templateString:P,widgetsInTemplate:!0,i18n:null,toolName:"FindExistingLocations",helpFileName:"FindExistingLocations",resultParameter:"resultLayer",primaryActionButttonClass:"esriAnalysisSubmitButton",analysisLayer:null,constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),e.mixin(this.i18n,J.findExistingLocations),e.mixin(this.i18n,J.expressionGrid)},postCreate:function(){this.inherited(arguments),c.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",e.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(t){t&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:t})},_handleSaveBtnClick:function(){if(this._form.validate()&&this.expressionGrid.validate()){this._saveBtn.set("disabled",!0);var t,s,e,n,o={},r={};s=this.expressionGrid.get("expressionMap"),o.expressions=a.toJson(s.expressions),o.data=a.toJson(s.data),e=[],e=i.map(s.inputLayers,function(t){return this.constructAnalysisInputLyrObj(t)},this),o.aLayer=a.toJson(this.constructAnalysisInputLyrObj(this.analysisLayer)),o.inputLayers=a.toJson(e),this.returnFeatureCollection||(o.OutputName=a.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(o.context=a.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),o.context=a.toJson(t)),r.jobParams=o,n=h.substitute(this.i18n.itemDescription,{analysisLayerName:this.analysisLayer.name}),n+="<div><i><u>"+this.i18n.expression+"</u> "+s.expressionString+"</i></div>",r.itemParams={description:n,tags:h.substitute(this.i18n.itemTags,{analysisLayerName:this.analysisLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(r.itemParams.folder=this.get("folderId")),this.execute(r)}},_handleShowCreditsClick:function(t){t.preventDefault();var s,n,o,r={};if(!this._form.validate()||!this.expressionGrid.validate())return l.set(this._showCreditsLink,"color","grey"),void l.set(this._showCreditsLink,"cursor","default");l.set(this._showCreditsLink,"color",""),l.set(this._showCreditsLink,"cursor",""),n=this.expressionGrid.get("expressionMap"),r.expressions=a.toJson(n.expressions),o=[],o=i.map(n.inputLayers,function(t){return this.constructAnalysisInputLyrObj(t)},this),r.inputLayers=a.toJson(o),this.returnFeatureCollection||(r.OutputName=a.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(r.context=a.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(s={outSR:this.map.spatialReference},this.showChooseExtent&&(s.extent=this.map.extent._normalize(!0)),r.context=a.toJson(s)),this.getCreditsEstimate(this.toolName,r).then(e.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()}))},_save:function(){},_buildUI:function(){var t=!0;this.signInPromise.then(e.hitch(this,N.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.get("analysisLayer")||!this.get("analysisLayers")||this.rerun||this.set("analysisLayer",this.analysisLayers[0]),this.analysisLayer&&this.rerun&&this.inputLayers&&i.forEach(this.inputLayers,function(t){t&&this.analysisLayer&&(this.analysisLayer.url===t.url||this.analysisLayer.name===t.name)&&(this.analysisLayer=t)},this),N.populateAnalysisLayers(this,"analysisLayer","analysisLayers")),N.addReadyToUseLayerOption(this,[this._analysisSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this.rerun&&this.data&&this.expressions&&this.selectedInputLayers&&N.updateExpressions(this),this.data&&(t=!1),this._updateAnalysisLayerUI(t),l.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(e.hitch(this,function(t){this.folderStore=t,N.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),l.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),l.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._loadConnections()},_handleUpdateExpressions:function(t){t.length>1?(l.set(this._showCreditsLink,"color",""),l.set(this._showCreditsLink,"cursor","")):(l.set(this._showCreditsLink,"color","grey"),l.set(this._showCreditsLink,"cursor","default"))},_updateAnalysisLayerUI:function(t){this.analysisLayer&&(t&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{analysisLayerName:this.analysisLayer.name})),this._outputLayerInput.set("value",this.outputLayerName)),y.set(this._findExpLabel,"innerHTML",this.i18n.findExpLabel),this.expressionGrid&&(this.expressionGrid.destroy(),this.expressionGrid=null),this.expressionGrid=new U({analysisLayer:this.analysisLayer,inputLayers:this.inputLayers,allowAllInputOperands:!1,primaryActionButttonClass:this.get("primaryActionButttonClass"),showReadyToUseLayers:this.get("showReadyToUseLayers"),showBrowseLayers:this.showBrowseLayers,owningWidget:this,data:!t&&this.data},d.create("div",{style:"width:100%;"},this._expressionGridTd)),this.expressionGrid.on("update-expressions",e.hitch(this,this._handleUpdateExpressions))},_handleAnalysisLayerChange:function(t){this._isAnalysisSelect=!0,"browse"===t?this._createBrowseItems({},this._analysisSelect):"browselayers"===t?(this.showGeoAnalyticsParams&&(u=this._browseLyrsdlg.browseItems.get("query"),u.types.push('type:"Big Data File Share"'),this._browseLyrsdlg.browseItems.set("query",u)),this._browseLyrsdlg.show()):(this.analysisLayer=this.analysisLayers[t],!this.inputLayers[t]&&this.analysisLayer&&this.inputLayers.push(this.analysisLayer),this._updateAnalysisLayerUI(!0))},showReadyToUseLayersDialog:function(t,s){this._isAnalysisSelect=t,"browse"===s?this._browsedlg.show():this._browseLyrsdlg.show()},_loadConnections:function(){this.on("start",e.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",e.hitch(this,"_onClose",!1))},_handleBrowseItemsSelect:function(t,s){t&&t.selection&&N.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.analysisLayers:this.inputLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this.layersSelect,browseDialog:t.dialog||this._browsedlg,widget:this},s).always(e.hitch(this,function(){this._isAnalysisSelect&&(this.analysisLayer=this.analysisLayers[this._analysisSelect.get("value")],this.inputLayers[this._analysisSelect.get("value")]||this.inputLayers.push(this.analysisLayer),this._updateAnalysisLayerUI(!0))}))},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},_setInputLayersAttr:function(t){this.inputLayers=t},_getInputLayersAttr:function(){return this.inputLayers||[]},_setAnalysisLayerAttr:function(t){this.analysisLayer=t},_getAnalysisLayerAttr:function(){return this.analysisLayer},_setAnalysisLayersAttr:function(t){this.analysisLayers=t||[]},validateServiceName:function(t){return N.validateServiceName(t,{textInput:this._outputLayerInput})},_setPrimaryActionButttonClassAttr:function(t){this.primaryActionButttonClass=t},_getPrimaryActionButttonClassAttr:function(){return this.primaryActionButttonClass},_connect:function(t,s,e){this._pbConnects.push(n.connect(t,s,e))}});return o("extend-esri")&&e.setObject("dijit.analysis.FindExistingLocations",T,k),T});