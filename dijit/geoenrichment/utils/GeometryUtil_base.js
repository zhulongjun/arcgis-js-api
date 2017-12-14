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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

!function(t){function i(t,i){var s=t.length;if(3>s)return 0;i||(i=t[0]);for(var n=i[0],e=i[1],h=t[s-1],r=h[0]-n,o=h[1]-e,a=0,l=0,c=t.length;c>l;l++){h=t[l];var u=h[0]-n,x=h[1]-e;a+=u*o-r*x,r=u,o=x}return a/2}function s(t,i){var s=t.length;if(!s)return null;i||(i=t[0]);var n=i[0],e=i[1],h=0,r=0,o=0;if(s>2)for(var a=t[s-1],l=a[0]-n,c=a[1]-e,u=0,x=t.length;x>u;u++){a=t[u];var g=a[0]-n,f=a[1]-e,d=g*c-l*f;h+=d,r+=(l+g)*d,o+=(c+f)*d,l=g,c=f}return 0==h?r=o=0:(r/=3*h,o/=3*h),[n+r,e+o]}var n={};n.calculateRingArea=i,n.calculateRingCentroid=s;var e=1,h=-1,r=0;n.INTERIOR=e,n.EXTERIOR=h,n.BOUNDARY=r,n.createRingInfo=function(t,i){return new l(t,i)},n.createSegmentCoordinates=function(t){return new c(null,0,0,t)};var o=function(t){return function(){for(var i in t){var s=t[i];"function"==typeof s?this[i]=s.bind(this):this[i]=s}var n=t.ctr.bind(this);n.apply(this,arguments)}},a=o({xmin:null,ymin:null,xmax:null,ymax:null,spatialReference:null,ctr:function(t,i,s,n,e){this.xmin=t,this.ymin=i,this.xmax=s,this.ymax=n,this.spatialReference=e},printOut:function(){console.log([this.xmin,this.xmax,this.ymin,this.ymax].join(" "))}}),l=o({ring:null,origin:null,area:0,clockwise:!1,extent:null,_coords:null,ctr:function(t,s){this.ring=t,this.origin=s;var n=this.ring.length-1;if(!(0>n)){n?(this.ring[n][0]!=this.ring[0][0]||this.ring[n][1]!=this.ring[0][1])&&(n++,this.ring.push(this.ring[0].slice())):n++;var e=0,h=0,r=!s;this.extent=new a(this.ring[0][0],this.ring[0][1],this.ring[0][0],this.ring[0][1]);for(var o=0;n>o;o++){var l=this.ring[o],c=l[0];r&&(e+=c),c<this.extent.xmin?this.extent.xmin=c:c>this.extent.xmax&&(this.extent.xmax=c),c=l[1],r&&(h+=c),c<this.extent.ymin?this.extent.ymin=c:c>this.extent.ymax&&(this.extent.ymax=c)}r&&(this.origin=[e/n,h/n]),this.area=i(this.ring,this.origin),this.area<=0?this.area=-this.area:this.clockwise=!0}},setDirection:function(t){this.clockwise==!t&&(this.ring.reverse(),this.clockwise=!this.clockwise,this._coords=null)},testPoint:function(t,i){var s=this.getRingCoordinates(i),n=s.testPoint(t[0]-this.origin[0],t[1]-this.origin[1]);return this.clockwise?n:-n},generalize:function(t,s,n){s=s||.75;for(var e=this.getRingCoordinates(t),h=e.xs,r=e.ys,o=t,a=h[0],l=r[0],c=h.length-1,u=h[c],x=r[c],g=this,f=this.clockwise?function(t){g.ring.splice(t,1)}:function(t){g.ring.splice(-t-1,1)};c-- >0&&h.length>3;){var d=h[c],y=r[c];o*=s,e.setSegment(a,l,d,y)&&e.testPointOnTouch(u,x,o)?(h.splice(c+1,1),r.splice(c+1,1),f(c+1),u=d,x=y):(a=u,l=x,u=d,x=y,o=t)}this._coords=null,n&&(this.area=i(this.ring,this.origin),this.clockwise||(this.area=-this.area))},getRingCoordinates:function(t,i){return i?new c(this.ring,i[0],i[1],t,this.extent,this.clockwise):(this._coords&&this._coords.eps==t||(this._coords=new c(this.ring,this.origin[0],this.origin[1],t,this.extent,this.clockwise)),this._coords)}});n.RingInfo=l;var c=o({xs:null,ys:null,extent:null,eps:NaN,_sx:null,_dx:null,_sy:null,_dy:null,ctr:function(t,i,s,n,e,h){if(this.xs=[],this.ys=[],t||(t=[]),void 0===i&&(i=0),void 0===s&&(s=0),void 0===n&&(n=0),this.eps=Math.max(n,0),e){var r=this.eps/2;this.extent=new a(e.xmin-i-r,e.ymin-s-r,e.xmax-i+r,e.ymax-s+r)}var o=t.length-1;if(!(0>o))for(var l=o?t[o][0]==t[0][0]&&t[o][1]==t[0][1]?o:o+1:1,c=h?1:-1,u=h?0:o;l--;u+=c){var x=t[u];this.xs.push(x[0]-i),this.ys.push(x[1]-s)}},testPoint:function(t,i){if(!this._pointBelongsToExtent(t,i))return h;var s=this.xs.length,n=!1;if(this._dy=this.ys[0]-this.ys[s-1],0==this._dy){for(var o=s;o-- >1&&(this._dy=this.ys[o]-this.ys[o-1],0==this._dy););if(0==this._dy)return r}n=this._dy>0;for(var a,l,c=0,u=this.xs[0],x=this.ys[0],g=1;s>=g;g++,u=a,x=l){var f=g==s?0:g;if(a=this.xs[f],l=this.ys[f],this.setSegment(u,x,a,l)){var d=x-i,y=l-i,_=!1;if(0>d&&(d=-d,y=-y,_=!0),!(d>this.eps&&y>this.eps)){if(this.testPointOnTouch(t,i,this.eps))return r;0==d?0!==y&&(0>y&&(n=!n),u>t&&n&&c++):0==y?n=_:0>y&&t<u+this._dx/this._dy*(i-x)&&c++}}}return c%2!=0?e:h},testPointOnTouch:function(t,i,s){var n=this.findIntersectionDelta(t,i,t-this._dy,i+this._dx),e=this._sx+n*this._dx-t,h=this._sy+n*this._dy-i;return s*s>=e*e+h*h},_pointBelongsToExtent:function(t,i){return t>=this.extent.xmin&&t<=this.extent.xmax&&i>=this.extent.ymin&&i<=this.extent.ymax},setSegment:function(t,i,s,n){return this._sx=t,this._dx=s-t,this._sy=i,this._dy=n-i,0!=this._dx||0!=this._dy},findIntersectionDelta:function(t,i,s,n,e){void 0===e&&(e=!0),s-=t,n-=i;var h=this._dy*s-this._dx*n;if(0==h)return 0;var r=t-this._sx,o=i-this._sy,a=o*s-r*n,l=e?0:o*this._dx-r*this._dy;return 0>h&&(h=-h,a=-a,l=-l),e||(l=0>l?0:h>l?l/h:1,this.testPointOnTouch(t+l*s,i+l*n,this.eps))?0>=a?0:h>a?a/h:1:-1},addPointOfSegmentAt:function(t){this.xs.push(this._sx+t*this._dx),this.ys.push(this._sy+t*this._dy)}});n.RingCoordinates=c,t.document?define([],function(){return n}):t.GeometryUtil_base=n}(this);