import{d as a,aK as c,m as r,_ as u,c as i,a as s,t as l,e as d,w as m,a5 as p,o as _,f}from"./index-ee461707.js";import{B as b}from"./index-853f68ed.js";import"./use-route-123403f8.js";const A=a({setup(){const e=c("bus"),t=r(0);function o(){t.value++,e.emit("change-number",t.value)}return{number:t,onAdd:o}}}),C=s("div",{class:"title"},"A组件",-1),h={class:"title"};function k(e,t,o,v,B,E){const n=b;return _(),i(p,null,[C,s("div",h,"当前结果："+l(e.number),1),d(n,{type:"primary",size:"small",block:"",onClick:e.onAdd},{default:m(()=>[f("增加")]),_:1},8,["onClick"])],64)}const x=u(A,[["render",k]]);export{x as default};
