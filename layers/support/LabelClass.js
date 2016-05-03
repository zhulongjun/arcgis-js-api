// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["../../core/Accessoire","../../core/JSONSupporter","../../core/lang","../../core/screenUtils","dojo/_base/lang","dojo/number","../../PopupTemplate","../../widgets/Popup/PopupRendererViewModel","../../symbols/support/jsonUtils"],function(e,r,t,n,l,a,i,o,s){var c=e.createSubclass([r],{declaredClass:"esri.layers.support.LabelClass",classMetadata:{properties:{requiredFields:{dependsOn:["labelExpression","labelExpressionInfo","where"]}}},labelExpression:null,labelExpressionInfo:null,labelPlacement:null,_labelPlacementReader:function(e){var r=e;return this._labelPlacementLookup.hasOwnProperty(r)||(r=t.valueOf(this._labelPlacementLookup,r)),r},maxScale:0,minScale:0,_requiredFieldsGetter:function(){var e=Object.create(null);return this._collectRequiredFields(e),Object.keys(e)},sizeInfo:null,_sizeInfoReader:function(e){return e?{minSize:n.pt2px(e.minSize)||0,maxSize:n.pt2px(e.maxSize)||0}:e},symbol:null,_symbolReader:s.fromJSON,useCodedValues:null,where:null,_labelPlacementLookup:{"above-center":"esriServerPointLabelPlacementAboveCenter","above-left":"esriServerPointLabelPlacementAboveLeft","above-right":"esriServerPointLabelPlacementAboveRight","below-center":"esriServerPointLabelPlacementBelowCenter","below-left":"esriServerPointLabelPlacementBelowLeft","below-right":"esriServerPointLabelPlacementBelowRight","center-center":"esriServerPointLabelPlacementCenterCenter","center-left":"esriServerPointLabelPlacementCenterLeft","center-right":"esriServerPointLabelPlacementCenterRight","above-after":"esriServerLinePlacementAboveAfter","above-along":"esriServerLinePlacementAboveAlong","above-before":"esriServerLinePlacementAboveBefore","above-start":"esriServerLinePlacementAboveStart","above-end":"esriServerLinePlacementAboveEnd","below-after":"esriServerLinePlacementBelowAfter","below-along":"esriServerLinePlacementBelowAlong","below-before":"esriServerLinePlacementBelowBefore","below-start":"esriServerLinePlacementBelowStart","below-end":"esriServerLinePlacementBelowEnd","center-after":"esriServerLinePlacementCenterAfter","center-along":"esriServerLinePlacementCenterAlong","center-before":"esriServerLinePlacementCenterBefore","center-start":"esriServerLinePlacementCenterStart","center-end":"esriServerLinePlacementCenterEnd","always-horizontal":"esriServerPolygonPlacementAlwaysHorizontal"},getLabelExpression:function(){return this.labelExpressionInfo?this.labelExpressionInfo.value:this._validateLabelExpression(this.labelExpression)?this._convertLabelExpression(this.labelExpression):""},toJSON:function(){if(this.sizeInfo)var e={minSize:n.px2pt(this.sizeInfo.minSize||0),maxSize:n.px2pt(this.sizeInfo.maxSize||0)};var r={labelExpression:this.labelExpression,labelExpressionInfo:this.labelExpressionInfo&&l.clone(this.labelExpressionInfo),useCodedValues:this.useCodedValues,maxScale:this.maxScale,minScale:this.minScale,where:this.where,sizeInfo:e,labelPlacement:this._labelPlacementLookup.hasOwnProperty(this.labelPlacement)?this._labelPlacementLookup[this.labelPlacement]:this.labelPlacement,symbol:this.symbol&&this.symbol.toJSON()};return t.fixJson(r)},_collectRequiredFields:function(e){this._collectLabelExpressionRequiredFields(this.getLabelExpression(),e),this._collectWhereRequiredFields(this.where,e)},_validateLabelExpression:function(e){var r=/^(\s*\[[^\]]+\]\s*)+$/i;return r.test(e)},_convertLabelExpression:function(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")},_collectWhereRequiredFields:function(e,r){if(null!=e){var t=e.split(" ");3===t.length&&(r[t[0]]=!0),7===t.length&&(r[t[0]]=!0,r[t[4]]=!0)}},_collectLabelExpressionRequiredFields:function(e,r){var t=e.match(/{[^}]*}/g);t&&t.forEach(function(e){r[e.slice(1,-1)]=!0})}});return c.evaluateWhere=function(e,r){var t=function(e,r,t){switch(r){case"=":return e==t?!0:!1;case"<>":return e!=t?!0:!1;case">":return e>t?!0:!1;case">=":return e>=t?!0:!1;case"<":return t>e?!0:!1;case"<=":return t>=e?!0:!1}return!1};try{if(null==e)return!0;var n=e.split(" ");if(3===n.length)return t(r[n[0]],n[1],n[2]);if(7===n.length){var l=t(r[n[0]],n[1],n[2]),a=n[3],i=t(r[n[4]],n[5],n[6]);switch(a){case"AND":return l&&i;case"OR":return l||i}}return!1}catch(o){console.log("Error.: can't parse = "+e)}},c.buildLabelText=function(e,r,t,n){var l=e.replace(/{[^}]*}/g,function(e){return c.formatField(e.slice(1,-1),e,r,t,n)});return l},c.formatField=function(e,r,n,s,c){var u,b,m=r;for(u=0;u<s.length;u++)if(s[u].name==e){m=n[s[u].name];var p=s[u].domain;if(p&&l.isObject(p)){if("codedValue"==p.type)for(b=0;b<p.codedValues.length;b++)p.codedValues[b].code==m&&(m=p.codedValues[b].name);else"range"==p.type&&p.minValue<=m&&m<=p.maxValue&&(m=p.name);return null==m?"":m}var f=s[u].type;if("date"==f){var v=c&&c.dateFormat||"shortDate";v=i.prototype._dateFormatJsonDict.fromJSON(v);var d="DateFormat"+o.prototype._dateFormats[v];d&&(m=t.substitute({myKey:m},"{myKey:"+d+"}"))}else("integer"==f||"small-integer"==f||"long"==f||"double"==f)&&c&&c.numberFormat&&c.numberFormat.digitSeparator&&c.numberFormat.places&&(m=a.format(m,{places:c.numberFormat.places}))}return null==m?"":m},c});