import{q as o,d,e as n,a5 as c,z as u,a0 as f,V as m,B as P}from"./index-ee461707.js";const[p,i]=o("cell-group"),g={title:String,inset:Boolean,border:u};var h=d({name:p,inheritAttrs:!1,props:g,setup(e,{slots:t,attrs:s}){const r=()=>{var a;return n("div",f({class:[i({inset:e.inset}),{[m]:e.border&&!e.inset}]},s),[(a=t.default)==null?void 0:a.call(t)])},l=()=>n("div",{class:i("title",{inset:e.inset})},[t.title?t.title():e.title]);return()=>e.title||t.title?n(c,null,[l(),r()]):r()}});const B=P(h),O=/^1[123456789]\d(\*{4}|\d{4})\d{4}$/,T=/^\d+-?(\*{3,4}|\d{4})\d+$/;export{B as C,T as f,O as p};
