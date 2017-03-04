// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["../../core/JSONSupport","../../core/lang","../../core/kebabDictionary","../../core/Error","dojo/_base/lang","dojo/number","../../PopupTemplate","../../widgets/Popup/PopupRendererViewModel","../../renderers/support/arcadeUtils","../../symbols/support/jsonUtils"],function(e,r,n,t,l,a,s,o,i,c){var u="__begin__",p="__end__",b=new RegExp(u,"ig"),v=new RegExp(p,"ig"),m=new RegExp("^"+u,"i"),d=new RegExp(p+"$","i"),f='"',x=f+" + ",h=" + "+f,g=n({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"}),S=e.createSubclass({declaredClass:"esri.layers.support.LabelClass",properties:{name:{value:null,json:{write:!0}},labelExpression:{value:null,json:{write:!0}},labelExpressionInfo:{value:null,json:{write:function(e,n,a,s){var o=r.fixJson(e&&l.clone(e));s&&"web-scene"===s.origin?(o.expression&&(s.messages&&s.messages.push(new t("property:unsupported",this.declaredClass+".labelExpressionInfo.expression is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:"labelExpressionInfo.expression",context:s})),delete o.expression),n.labelExpressionInfo=o):n.labelExpressionInfo=this._processLabelExpressionInfo(o)}}},labelPlacement:{value:null,json:{read:function(e,r){return g.fromJSON(e)},write:function(e,r){var n=g.toJSON(e);n&&(r.labelPlacement=n)}}},maxScale:{value:0,json:{write:function(e,r){(e||this.minScale)&&(r.maxScale=e)}}},minScale:{value:0,json:{write:function(e,r){(e||this.maxScale)&&(r.minScale=e)}}},requiredFields:{readOnly:!0,dependsOn:["labelExpression","labelExpressionInfo","where"],get:function(){var e=Object.create(null);return this._collectRequiredFields(e),Object.keys(e)}},symbol:{value:null,json:{read:c.read,write:function(e,r,n,t){r.symbol=c.write(e,{},t)}}},useCodedValues:{value:null,json:{write:!0}},where:{value:null,json:{write:!0}}},getLabelExpression:function(){var e={expression:"",type:"none"};return this.labelExpressionInfo?this.labelExpressionInfo.value?(e.expression=this.labelExpressionInfo.value,e.type="conventional"):this.labelExpressionInfo.expression&&(e.expression=this.labelExpressionInfo.expression,e.type="arcade"):this._validateLabelExpression(this.labelExpression)&&(e.expression=this._convertLabelExpression(this.labelExpression),e.type="conventional"),e},getOptions:function(){var e={},r=this.labelExpressionInfo;if(r){var n=r.expression;n&&!r.value&&(e.hasArcadeExpression=!0,e.compiledArcadeFunc=i.createFunction(n))}return e},clone:function(){return new S({labelExpression:this.labelExpression,labelExpressionInfo:l.clone(this.labelExpressionInfo),labelPlacement:this.labelPlacement,maxScale:this.maxScale,minScale:this.minScale,name:this.name,symbol:this.symbol.clone(),where:this.where,useCodedValues:this.useCodedValues})},_collectRequiredFields:function(e){this._collectLabelExpressionRequiredFields(this.getLabelExpression(),e),this._collectWhereRequiredFields(this.where,e)},_validateLabelExpression:function(e){var r=/^(\s*\[[^\]]+\]\s*)+$/i;return r.test(e)},_convertLabelExpression:function(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")},_collectWhereRequiredFields:function(e,r){if(null!=e){var n=e.split(" ");3===n.length&&(r[n[0]]=!0),7===n.length&&(r[n[0]]=!0,r[n[4]]=!0)}},_collectLabelExpressionRequiredFields:function(e,r){if("arcade"===e.type){var n=i.extractFieldNames(e.expression);n.forEach(function(e){r[e]=!0})}else{var t=e.expression.match(/{[^}]*}/g);t&&t.forEach(function(e){r[e.slice(1,-1)]=!0})}},_processLabelExpressionInfo:function(e){return e&&e.value&&(e.expression=this._convertTemplatedStringToArcade(e.value)),e},_convertTemplatedStringToArcade:function(e){var r;return e&&(r=l.replace(e,function(e,r){return u+'$feature["'+r+'"]'+p}),r=m.test(r)?r.replace(m,""):f+r,r=d.test(r)?r.replace(d,""):r+f,r=r.replace(b,x).replace(v,h)),r}});return S.evaluateWhere=function(e,r){var n=function(e,r,n){switch(r){case"=":return e==n?!0:!1;case"<>":return e!=n?!0:!1;case">":return e>n?!0:!1;case">=":return e>=n?!0:!1;case"<":return n>e?!0:!1;case"<=":return n>=e?!0:!1}return!1};try{if(null==e)return!0;var t=e.split(" ");if(3===t.length)return n(r[t[0]],t[1],t[2]);if(7===t.length){var l=n(r[t[0]],t[1],t[2]),a=t[3],s=n(r[t[4]],t[5],t[6]);switch(a){case"AND":return l&&s;case"OR":return l||s}}return!1}catch(o){console.log("Error.: can't parse = "+e)}},S.buildLabelText=function(e,r,n,t){var l="";if(t&&t.hasArcadeExpression){if(t.compiledArcadeFunc){var a=i.createExecContext(r),s=i.executeFunction(t.compiledArcadeFunc,a);null!=s&&(l=s.toString())}}else{var o=r&&r.attributes||{};l=e.replace(/{[^}]*}/g,function(e){return S.formatField(e.slice(1,-1),e,o,n,t)})}return l},S.formatField=function(e,n,t,i,c){var u,p,b=n;for(u=0;u<i.length;u++)if(i[u].name==e){b=t[i[u].name];var v=i[u].domain;if(v&&l.isObject(v)){if("codedValue"==v.type)for(p=0;p<v.codedValues.length;p++)v.codedValues[p].code==b&&(b=v.codedValues[p].name);else"range"==v.type&&v.minValue<=b&&b<=v.maxValue&&(b=v.name);return null==b?"":b}var m=i[u].type;if("date"==m){var d=c&&c.dateFormat||"shortDate";d=s.prototype._dateFormatKebabDict.fromJSON(d);var f="DateFormat"+o.prototype._dateFormats[d];f&&(b=r.substitute({myKey:b},"{myKey:"+f+"}"))}else("integer"==m||"small-integer"==m||"long"==m||"double"==m)&&c&&c.numberFormat&&c.numberFormat.digitSeparator&&c.numberFormat.places&&(b=a.format(b,{places:c.numberFormat.places}))}return null==b?"":b},S});