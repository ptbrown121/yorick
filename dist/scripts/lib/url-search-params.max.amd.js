/*!
Copyright (C) 2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
define(function(){"use strict";function t(t){return encodeURIComponent(t).replace(i,c)}function n(t){return decodeURIComponent(t.replace(a," "))}function e(t){if(this[u]=Object.create(null),t){"?"===t.charAt(0)&&(t=t.slice(1));for(var e,r,i=(t||"").split("&"),a=0,o=i.length;a<o;a++)-1<(e=(r=i[a]).indexOf("="))?this.append(n(r.slice(0,e)),n(r.slice(e+1))):r.length&&this.append(n(r),"")}}var r=e.prototype,i=/[!'\(\)~]|%20|%00/g,a=/\+/g,o={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"},c=function(t){return o[t]},s=function(){try{return!!Symbol.iterator}catch(t){return!1}}(),u="__URLSearchParams__:"+Math.random();r.append=function(t,n){var e=this[u];t in e?e[t].push(""+n):e[t]=[""+n]},r.delete=function(t){delete this[u][t]},r.get=function(t){var n=this[u];return t in n?n[t][0]:null},r.getAll=function(t){var n=this[u];return t in n?n[t].slice(0):[]},r.has=function(t){return t in this[u]},r.set=function(t,n){this[u][t]=[""+n]},r.forEach=function(t,n){var e=this[u];Object.getOwnPropertyNames(e).forEach(function(r){e[r].forEach(function(e){t.call(n,e,r,this)},this)},this)},r.keys=function(){var t=[];this.forEach(function(n,e){t.push(e)});var n={next:function(){var n=t.shift();return{done:void 0===n,value:n}}};return s&&(n[Symbol.iterator]=function(){return n}),n},r.values=function(){var t=[];this.forEach(function(n){t.push(n)});var n={next:function(){var n=t.shift();return{done:void 0===n,value:n}}};return s&&(n[Symbol.iterator]=function(){return n}),n},r.entries=function(){var t=[];this.forEach(function(n,e){t.push([e,n])});var n={next:function(){var n=t.shift();return{done:void 0===n,value:n}}};return s&&(n[Symbol.iterator]=function(){return n}),n},s&&(r[Symbol.iterator]=r.entries),r.toJSON=function(){return{}},r.toString=function(){var n,e,r,i,a=this[u],o=[];for(e in a)for(r=t(e),n=0,i=a[e];n<i.length;n++)o.push(r+"="+t(i[n]));return o.join("&")};var h=Object.defineProperty,f=Object.getOwnPropertyDescriptor,l=function(t){var n=t.append;t.append=r.append,e.call(t,t._usp.search.slice(1)),t.append=n},p=function(t,n){if(!(t instanceof n))throw new TypeError("'searchParams' accessed on an object that does not implement interface "+n.name)},v=function(t){var n,i,a=t.prototype,o=f(a,"searchParams"),c=f(a,"href"),s=f(a,"search");!o&&s&&s.set&&(i=function(t){function n(n,e){r.append.call(this,n,e),n=this.toString(),t.set.call(this._usp,n?"?"+n:"")}function e(n){r.delete.call(this,n),n=this.toString(),t.set.call(this._usp,n?"?"+n:"")}function i(n,e){r.set.call(this,n,e),n=this.toString(),t.set.call(this._usp,n?"?"+n:"")}return function(t,r){return t.append=n,t.delete=e,t.set=i,h(t,"_usp",{configurable:!0,writable:!0,value:r})}}(s),n=function(t,n){return h(t,"_searchParams",{configurable:!0,writable:!0,value:i(n,t)}),n},Object.defineProperties(a,{href:{get:function(){return c.get.call(this)},set:function(t){var n=this._searchParams;c.set.call(this,t),n&&l(n)}},search:{get:function(){return s.get.call(this)},set:function(t){var n=this._searchParams;s.set.call(this,t),n&&l(n)}},searchParams:{get:function(){return p(this,t),this._searchParams||n(this,new e(this.search.slice(1)))},set:function(e){p(this,t),n(this,e)}}}))};return v(HTMLAnchorElement),/^function|object$/.test(typeof URL)&&URL.prototype&&v(URL),e});