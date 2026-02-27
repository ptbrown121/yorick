/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
!function(t,n,e){var i,o="hashchange",r=document,c=t.event.special,a=r.documentMode,u="on"+o in n&&(a===e||a>7);function f(t){return"#"+(t=t||location.href).replace(/^[^#]*#?(.*)$/,"$1")}t.fn[o]=function(t){return t?this.bind(o,t):this.trigger(o)},t.fn[o].delay=50,c[o]=t.extend(c[o],{setup:function(){if(u)return!1;t(i.start)},teardown:function(){if(u)return!1;t(i.stop)}}),i=function(){var i,c,a,s={},d=f(),l=function(t){return t},h=l,p=l;function m(){var e=f(),r=p(d);e!==d?(h(d=e,r),t(n).trigger(o)):r!==d&&(location.href=location.href.replace(/#.*/,"")+r),i=setTimeout(m,t.fn[o].delay)}return s.start=function(){i||m()},s.stop=function(){i&&clearTimeout(i),i=e},n.attachEvent&&!n.addEventListener&&!u&&(s.start=function(){c||(a=(a=t.fn[o].src)&&a+f(),c=t('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){a||h(f()),m()}).attr("src",a||"javascript:0").insertAfter("body")[0].contentWindow,r.onpropertychange=function(){try{"title"===event.propertyName&&(c.document.title=r.title)}catch(t){}})},s.stop=l,p=function(){return f(c.location.href)},h=function(n,e){var i=c.document,a=t.fn[o].domain;n!==e&&(i.title=r.title,i.open(),a&&i.write('<script>document.domain="'+a+'"<\/script>'),i.close(),c.location.hash=n)}),s}()}(jQuery,this);