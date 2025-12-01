(function(){"use strict";const to=t=>t.length>0,Hi=t=>t.length>0,Ca=(t,e)=>[...t,e],Ji=t=>t[0],Pa=t=>t.shift(),Qt=(t,e)=>{if(!t)throw new Error(e)},ro=(t,e="Expected a non-empty readonly array.")=>{Qt(t.length>0,e)};function ed(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function no(t){if(typeof t!="boolean")throw new Error(`boolean expected, not ${t}`)}function io(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function Dt(t,e,r=""){const n=ed(t),s=t?.length,a=e!==void 0;if(!n||a&&s!==e){const h=r&&`"${r}" `,g=a?` of length ${e}`:"",w=n?`length=${s}`:`type=${typeof t}`;throw new Error(h+"expected Uint8Array"+g+", got "+w)}return t}function La(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function td(t,e){Dt(t,void 0,"output");const r=e.outputLen;if(t.length<r)throw new Error("digestInto() expects output buffer of length at least "+r)}function jr(t){return new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4))}function Mn(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function rd(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}const nd=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68,Fa=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",id=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function so(t){if(Dt(t),Fa)return t.toHex();let e="";for(let r=0;r<t.length;r++)e+=id[t[r]];return e}const Ar={_0:48,_9:57,A:65,F:70,a:97,f:102};function Ra(t){if(t>=Ar._0&&t<=Ar._9)return t-Ar._0;if(t>=Ar.A&&t<=Ar.F)return t-(Ar.A-10);if(t>=Ar.a&&t<=Ar.f)return t-(Ar.a-10)}function Wa(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);if(Fa)return Uint8Array.fromHex(t);const e=t.length,r=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const n=new Uint8Array(r);for(let s=0,a=0;s<r;s++,a+=2){const h=Ra(t.charCodeAt(a)),g=Ra(t.charCodeAt(a+1));if(h===void 0||g===void 0){const w=t[a]+t[a+1];throw new Error('hex string expected, got non-hex character "'+w+'" at index '+a)}n[s]=h*16+g}return n}function sd(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function od(t){return new TextDecoder().decode(t)}function ad(...t){let e=0;for(let n=0;n<t.length;n++){const s=t[n];Dt(s),e+=s.length}const r=new Uint8Array(e);for(let n=0,s=0;n<t.length;n++){const a=t[n];r.set(a,s),s+=a.length}return r}function ld(t,e){if(e==null||typeof e!="object")throw new Error("options must be defined");return Object.assign(t,e)}function cd(t,e){if(t.length!==e.length)return!1;let r=0;for(let n=0;n<t.length;n++)r|=t[n]^e[n];return r===0}const ud=(t,e)=>{function r(n,...s){if(Dt(n,void 0,"key"),!nd)throw new Error("Non little-endian hardware is not yet supported");if(t.nonceLength!==void 0){const k=s[0];Dt(k,t.varSizeNonce?void 0:t.nonceLength,"nonce")}const a=t.tagLength;a&&s[1]!==void 0&&Dt(s[1],void 0,"AAD");const h=e(n,...s),g=(k,N)=>{if(N!==void 0){if(k!==2)throw new Error("cipher output not supported");Dt(N,void 0,"output")}};let w=!1;return{encrypt(k,N){if(w)throw new Error("cannot encrypt() twice with same key + nonce");return w=!0,Dt(k),g(h.encrypt.length,N),h.encrypt(k,N)},decrypt(k,N){if(Dt(k),a&&k.length<a)throw new Error('"ciphertext" expected length bigger than tagLength='+a);return g(h.decrypt.length,N),h.decrypt(k,N)}}}return Object.assign(r,t),r};function Da(t,e,r=!0){if(e===void 0)return new Uint8Array(t);if(e.length!==t)throw new Error('"output" expected Uint8Array of length '+t+", got: "+e.length);if(r&&!fd(e))throw new Error("invalid output, must be aligned");return e}function dd(t,e,r){no(r);const n=new Uint8Array(16),s=rd(n);return s.setBigUint64(0,BigInt(e),r),s.setBigUint64(8,BigInt(t),r),n}function fd(t){return t.byteOffset%4===0}function Ki(t){return Uint8Array.from(t)}function hd(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Ma(t,e=""){if(!Number.isSafeInteger(t)||t<0){const r=e&&`"${e}" `;throw new Error(`${r}expected integer >= 0, got ${t}`)}}function pi(t,e,r=""){const n=hd(t),s=t?.length,a=e!==void 0;if(!n||a&&s!==e){const h=r&&`"${r}" `,g=a?` of length ${e}`:"",w=n?`length=${s}`:`type=${typeof t}`;throw new Error(h+"expected Uint8Array"+g+", got "+w)}return t}function pd(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash must wrapped by utils.createHasher");Ma(t.outputLen),Ma(t.blockLen)}function Gi(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function md(t,e){pi(t,void 0,"digestInto() output");const r=e.outputLen;if(t.length<r)throw new Error('"digestInto() output" expected to be of length >='+r)}function Un(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}function oo(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function yr(t,e){return t<<32-e|t>>>e}function Ua(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function Ba(t,e={}){const r=(s,a)=>t(a).update(s).digest(),n=t(void 0);return r.outputLen=n.outputLen,r.blockLen=n.blockLen,r.create=s=>t(s),Object.assign(r,e),Object.freeze(r)}function _d(t=32){const e=typeof globalThis=="object"?globalThis.crypto:null;if(typeof e?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return e.getRandomValues(new Uint8Array(t))}const $a=t=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,t])});function gd(t,e,r){return t&e^~t&r}function yd(t,e,r){return t&e^t&r^e&r}class ja{blockLen;outputLen;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(e,r,n,s){this.blockLen=e,this.outputLen=r,this.padOffset=n,this.isLE=s,this.buffer=new Uint8Array(e),this.view=oo(this.buffer)}update(e){Gi(this),pi(e);const{view:r,buffer:n,blockLen:s}=this,a=e.length;for(let h=0;h<a;){const g=Math.min(s-this.pos,a-h);if(g===s){const w=oo(e);for(;s<=a-h;h+=s)this.process(w,h);continue}n.set(e.subarray(h,h+g),this.pos),this.pos+=g,h+=g,this.pos===s&&(this.process(r,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){Gi(this),md(e,this),this.finished=!0;const{buffer:r,view:n,blockLen:s,isLE:a}=this;let{pos:h}=this;r[h++]=128,Un(this.buffer.subarray(h)),this.padOffset>s-h&&(this.process(n,0),h=0);for(let N=h;N<s;N++)r[N]=0;n.setBigUint64(s-8,BigInt(this.length*8),a),this.process(n,0);const g=oo(e),w=this.outputLen;if(w%4)throw new Error("_sha2: outputLen must be aligned to 32bit");const q=w/4,k=this.get();if(q>k.length)throw new Error("_sha2: outputLen bigger than state");for(let N=0;N<q;N++)g.setUint32(4*N,k[N],a)}digest(){const{buffer:e,outputLen:r}=this;this.digestInto(e);const n=e.slice(0,r);return this.destroy(),n}_cloneInto(e){e||=new this.constructor,e.set(...this.get());const{blockLen:r,buffer:n,length:s,finished:a,destroyed:h,pos:g}=this;return e.destroyed=h,e.finished=a,e.length=s,e.pos=g,s%r&&e.buffer.set(n),e}clone(){return this._cloneInto()}}const zr=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),$t=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),Xi=BigInt(2**32-1),za=BigInt(32);function bd(t,e=!1){return e?{h:Number(t&Xi),l:Number(t>>za&Xi)}:{h:Number(t>>za&Xi)|0,l:Number(t&Xi)|0}}function wd(t,e=!1){const r=t.length;let n=new Uint32Array(r),s=new Uint32Array(r);for(let a=0;a<r;a++){const{h,l:g}=bd(t[a],e);[n[a],s[a]]=[h,g]}return[n,s]}const Va=(t,e,r)=>t>>>r,Qa=(t,e,r)=>t<<32-r|e>>>r,Bn=(t,e,r)=>t>>>r|e<<32-r,$n=(t,e,r)=>t<<32-r|e>>>r,Yi=(t,e,r)=>t<<64-r|e>>>r-32,Zi=(t,e,r)=>t>>>r-32|e<<64-r;function Or(t,e,r,n){const s=(e>>>0)+(n>>>0);return{h:t+r+(s/2**32|0)|0,l:s|0}}const Nd=(t,e,r)=>(t>>>0)+(e>>>0)+(r>>>0),xd=(t,e,r,n)=>e+r+n+(t/2**32|0)|0,vd=(t,e,r,n)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0),qd=(t,e,r,n,s)=>e+r+n+s+(t/2**32|0)|0,Sd=(t,e,r,n,s)=>(t>>>0)+(e>>>0)+(r>>>0)+(n>>>0)+(s>>>0),kd=(t,e,r,n,s,a)=>e+r+n+s+a+(t/2**32|0)|0,Ed=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Vr=new Uint32Array(64);class Ad extends ja{constructor(e){super(64,e,8,!1)}get(){const{A:e,B:r,C:n,D:s,E:a,F:h,G:g,H:w}=this;return[e,r,n,s,a,h,g,w]}set(e,r,n,s,a,h,g,w){this.A=e|0,this.B=r|0,this.C=n|0,this.D=s|0,this.E=a|0,this.F=h|0,this.G=g|0,this.H=w|0}process(e,r){for(let N=0;N<16;N++,r+=4)Vr[N]=e.getUint32(r,!1);for(let N=16;N<64;N++){const C=Vr[N-15],z=Vr[N-2],V=yr(C,7)^yr(C,18)^C>>>3,Z=yr(z,17)^yr(z,19)^z>>>10;Vr[N]=Z+Vr[N-7]+V+Vr[N-16]|0}let{A:n,B:s,C:a,D:h,E:g,F:w,G:q,H:k}=this;for(let N=0;N<64;N++){const C=yr(g,6)^yr(g,11)^yr(g,25),z=k+C+gd(g,w,q)+Ed[N]+Vr[N]|0,Z=(yr(n,2)^yr(n,13)^yr(n,22))+yd(n,s,a)|0;k=q,q=w,w=g,g=h+z|0,h=a,a=s,s=n,n=z+Z|0}n=n+this.A|0,s=s+this.B|0,a=a+this.C|0,h=h+this.D|0,g=g+this.E|0,w=w+this.F|0,q=q+this.G|0,k=k+this.H|0,this.set(n,s,a,h,g,w,q,k)}roundClean(){Un(Vr)}destroy(){this.set(0,0,0,0,0,0,0,0),Un(this.buffer)}}class Od extends Ad{A=zr[0]|0;B=zr[1]|0;C=zr[2]|0;D=zr[3]|0;E=zr[4]|0;F=zr[5]|0;G=zr[6]|0;H=zr[7]|0;constructor(){super(32)}}const Ha=wd(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),Td=Ha[0],Id=Ha[1],Qr=new Uint32Array(80),Hr=new Uint32Array(80);class Cd extends ja{constructor(e){super(128,e,16,!1)}get(){const{Ah:e,Al:r,Bh:n,Bl:s,Ch:a,Cl:h,Dh:g,Dl:w,Eh:q,El:k,Fh:N,Fl:C,Gh:z,Gl:V,Hh:Z,Hl:ge}=this;return[e,r,n,s,a,h,g,w,q,k,N,C,z,V,Z,ge]}set(e,r,n,s,a,h,g,w,q,k,N,C,z,V,Z,ge){this.Ah=e|0,this.Al=r|0,this.Bh=n|0,this.Bl=s|0,this.Ch=a|0,this.Cl=h|0,this.Dh=g|0,this.Dl=w|0,this.Eh=q|0,this.El=k|0,this.Fh=N|0,this.Fl=C|0,this.Gh=z|0,this.Gl=V|0,this.Hh=Z|0,this.Hl=ge|0}process(e,r){for(let Re=0;Re<16;Re++,r+=4)Qr[Re]=e.getUint32(r),Hr[Re]=e.getUint32(r+=4);for(let Re=16;Re<80;Re++){const Ie=Qr[Re-15]|0,ot=Hr[Re-15]|0,at=Bn(Ie,ot,1)^Bn(Ie,ot,8)^Va(Ie,ot,7),Ce=$n(Ie,ot,1)^$n(Ie,ot,8)^Qa(Ie,ot,7),$e=Qr[Re-2]|0,Be=Hr[Re-2]|0,Ye=Bn($e,Be,19)^Yi($e,Be,61)^Va($e,Be,6),rt=$n($e,Be,19)^Zi($e,Be,61)^Qa($e,Be,6),et=vd(Ce,rt,Hr[Re-7],Hr[Re-16]),M=qd(et,at,Ye,Qr[Re-7],Qr[Re-16]);Qr[Re]=M|0,Hr[Re]=et|0}let{Ah:n,Al:s,Bh:a,Bl:h,Ch:g,Cl:w,Dh:q,Dl:k,Eh:N,El:C,Fh:z,Fl:V,Gh:Z,Gl:ge,Hh:Ee,Hl:Ue}=this;for(let Re=0;Re<80;Re++){const Ie=Bn(N,C,14)^Bn(N,C,18)^Yi(N,C,41),ot=$n(N,C,14)^$n(N,C,18)^Zi(N,C,41),at=N&z^~N&Z,Ce=C&V^~C&ge,$e=Sd(Ue,ot,Ce,Id[Re],Hr[Re]),Be=kd($e,Ee,Ie,at,Td[Re],Qr[Re]),Ye=$e|0,rt=Bn(n,s,28)^Yi(n,s,34)^Yi(n,s,39),et=$n(n,s,28)^Zi(n,s,34)^Zi(n,s,39),M=n&a^n&g^a&g,pe=s&h^s&w^h&w;Ee=Z|0,Ue=ge|0,Z=z|0,ge=V|0,z=N|0,V=C|0,{h:N,l:C}=Or(q|0,k|0,Be|0,Ye|0),q=g|0,k=w|0,g=a|0,w=h|0,a=n|0,h=s|0;const oe=Nd(Ye,et,pe);n=xd(oe,Be,rt,M),s=oe|0}({h:n,l:s}=Or(this.Ah|0,this.Al|0,n|0,s|0)),{h:a,l:h}=Or(this.Bh|0,this.Bl|0,a|0,h|0),{h:g,l:w}=Or(this.Ch|0,this.Cl|0,g|0,w|0),{h:q,l:k}=Or(this.Dh|0,this.Dl|0,q|0,k|0),{h:N,l:C}=Or(this.Eh|0,this.El|0,N|0,C|0),{h:z,l:V}=Or(this.Fh|0,this.Fl|0,z|0,V|0),{h:Z,l:ge}=Or(this.Gh|0,this.Gl|0,Z|0,ge|0),{h:Ee,l:Ue}=Or(this.Hh|0,this.Hl|0,Ee|0,Ue|0),this.set(n,s,a,h,g,w,q,k,N,C,z,V,Z,ge,Ee,Ue)}roundClean(){Un(Qr,Hr)}destroy(){Un(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}class Pd extends Cd{Ah=$t[0]|0;Al=$t[1]|0;Bh=$t[2]|0;Bl=$t[3]|0;Ch=$t[4]|0;Cl=$t[5]|0;Dh=$t[6]|0;Dl=$t[7]|0;Eh=$t[8]|0;El=$t[9]|0;Fh=$t[10]|0;Fl=$t[11]|0;Gh=$t[12]|0;Gl=$t[13]|0;Hh=$t[14]|0;Hl=$t[15]|0;constructor(){super(64)}}const Ja=Ba(()=>new Od,$a(1)),Ka=Ba(()=>new Pd,$a(3));class Ga{oHash;iHash;blockLen;outputLen;finished=!1;destroyed=!1;constructor(e,r){if(pd(e),pi(r,void 0,"key"),this.iHash=e.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const n=this.blockLen,s=new Uint8Array(n);s.set(r.length>n?e.create().update(r).digest():r);for(let a=0;a<s.length;a++)s[a]^=54;this.iHash.update(s),this.oHash=e.create();for(let a=0;a<s.length;a++)s[a]^=106;this.oHash.update(s),Un(s)}update(e){return Gi(this),this.iHash.update(e),this}digestInto(e){Gi(this),pi(e,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){const e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||=Object.create(Object.getPrototypeOf(this),{});const{oHash:r,iHash:n,finished:s,destroyed:a,blockLen:h,outputLen:g}=this;return e=e,e.finished=s,e.destroyed=a,e.blockLen=h,e.outputLen=g,e.oHash=r._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const ao=(t,e,r)=>new Ga(t,e).update(r).digest();ao.create=(t,e)=>new Ga(t,e);function es(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Xa(t,e){return Array.isArray(e)?e.length===0?!0:t?e.every(r=>typeof r=="string"):e.every(r=>Number.isSafeInteger(r)):!1}function Ld(t){if(typeof t!="function")throw new Error("function expected");return!0}function ts(t,e){if(typeof e!="string")throw new Error(`${t}: string expected`);return!0}function jn(t){if(!Number.isSafeInteger(t))throw new Error(`invalid integer: ${t}`)}function rs(t){if(!Array.isArray(t))throw new Error("array expected")}function ns(t,e){if(!Xa(!0,e))throw new Error(`${t}: array of strings expected`)}function Ya(t,e){if(!Xa(!1,e))throw new Error(`${t}: array of numbers expected`)}function Fd(...t){const e=a=>a,r=(a,h)=>g=>a(h(g)),n=t.map(a=>a.encode).reduceRight(r,e),s=t.map(a=>a.decode).reduce(r,e);return{encode:n,decode:s}}function Rd(t){const e=typeof t=="string"?t.split(""):t,r=e.length;ns("alphabet",e);const n=new Map(e.map((s,a)=>[s,a]));return{encode:s=>(rs(s),s.map(a=>{if(!Number.isSafeInteger(a)||a<0||a>=r)throw new Error(`alphabet.encode: digit index outside alphabet "${a}". Allowed: ${t}`);return e[a]})),decode:s=>(rs(s),s.map(a=>{ts("alphabet.decode",a);const h=n.get(a);if(h===void 0)throw new Error(`Unknown letter: "${a}". Allowed: ${t}`);return h}))}}function Wd(t=""){return ts("join",t),{encode:e=>(ns("join.decode",e),e.join(t)),decode:e=>(ts("join.decode",e),e.split(t))}}function Dd(t,e="="){return jn(t),ts("padding",e),{encode(r){for(ns("padding.encode",r);r.length*t%8;)r.push(e);return r},decode(r){ns("padding.decode",r);let n=r.length;if(n*t%8)throw new Error("padding: invalid, string should have whole number of bytes");for(;n>0&&r[n-1]===e;n--)if((n-1)*t%8===0)throw new Error("padding: invalid, string has too much padding");return r.slice(0,n)}}}function lo(t,e,r){if(e<2)throw new Error(`convertRadix: invalid from=${e}, base cannot be less than 2`);if(r<2)throw new Error(`convertRadix: invalid to=${r}, base cannot be less than 2`);if(rs(t),!t.length)return[];let n=0;const s=[],a=Array.from(t,g=>{if(jn(g),g<0||g>=e)throw new Error(`invalid integer: ${g}`);return g}),h=a.length;for(;;){let g=0,w=!0;for(let q=n;q<h;q++){const k=a[q],N=e*g,C=N+k;if(!Number.isSafeInteger(C)||N/e!==g||C-k!==N)throw new Error("convertRadix: carry overflow");const z=C/r;g=C%r;const V=Math.floor(z);if(a[q]=V,!Number.isSafeInteger(V)||V*r+g!==C)throw new Error("convertRadix: carry overflow");if(w)V?w=!1:n=q;else continue}if(s.push(g),w)break}for(let g=0;g<t.length-1&&t[g]===0;g++)s.push(0);return s.reverse()}const Za=(t,e)=>e===0?t:Za(e,t%e),is=(t,e)=>t+(e-Za(t,e)),co=(()=>{let t=[];for(let e=0;e<40;e++)t.push(2**e);return t})();function uo(t,e,r,n){if(rs(t),e<=0||e>32)throw new Error(`convertRadix2: wrong from=${e}`);if(r<=0||r>32)throw new Error(`convertRadix2: wrong to=${r}`);if(is(e,r)>32)throw new Error(`convertRadix2: carry overflow from=${e} to=${r} carryBits=${is(e,r)}`);let s=0,a=0;const h=co[e],g=co[r]-1,w=[];for(const q of t){if(jn(q),q>=h)throw new Error(`convertRadix2: invalid data word=${q} from=${e}`);if(s=s<<e|q,a+e>32)throw new Error(`convertRadix2: carry overflow pos=${a} from=${e}`);for(a+=e;a>=r;a-=r)w.push((s>>a-r&g)>>>0);const k=co[a];if(k===void 0)throw new Error("invalid carry");s&=k-1}if(s=s<<r-a&g,!n&&a>=e)throw new Error("Excess padding");if(!n&&s>0)throw new Error(`Non-zero padding: ${s}`);return n&&a>0&&w.push(s>>>0),w}function Md(t){jn(t);const e=2**8;return{encode:r=>{if(!es(r))throw new Error("radix.encode input should be Uint8Array");return lo(Array.from(r),e,t)},decode:r=>(Ya("radix.decode",r),Uint8Array.from(lo(r,t,e)))}}function Ud(t,e=!1){if(jn(t),t<=0||t>32)throw new Error("radix2: bits should be in (0..32]");if(is(8,t)>32||is(t,8)>32)throw new Error("radix2: carry overflow");return{encode:r=>{if(!es(r))throw new Error("radix2.encode input should be Uint8Array");return uo(Array.from(r),8,t,!e)},decode:r=>(Ya("radix2.decode",r),Uint8Array.from(uo(r,t,8,e)))}}function Bd(t,e){return jn(t),Ld(e),{encode(r){if(!es(r))throw new Error("checksum.encode: input should be Uint8Array");const n=e(r).slice(0,t),s=new Uint8Array(r.length+t);return s.set(r),s.set(n,r.length),s},decode(r){if(!es(r))throw new Error("checksum.decode: input should be Uint8Array");const n=r.slice(0,-t),s=r.slice(-t),a=e(n).slice(0,t);for(let h=0;h<t;h++)if(a[h]!==s[h])throw new Error("Invalid checksum");return n}}}const ss={alphabet:Rd,chain:Fd,checksum:Bd,convertRadix:lo,convertRadix2:uo,radix:Md,radix2:Ud,join:Wd,padding:Dd};const $d=t=>t[0]==="あいこくしん";function jd(t){if(typeof t!="string")throw new TypeError("invalid mnemonic type: "+typeof t);return t.normalize("NFKD")}function zd(t){const e=jd(t),r=e.split(" ");if(![12,15,18,21,24].includes(r.length))throw new Error("Invalid mnemonic");return{nfkd:e,words:r}}function el(t){if(pi(t),![16,20,24,28,32].includes(t.length))throw new Error("invalid entropy length")}const Vd=t=>{const e=8-t.length/4;return new Uint8Array([Ja(t)[0]>>e<<e])};function tl(t){if(!Array.isArray(t)||t.length!==2048||typeof t[0]!="string")throw new Error("Wordlist: expected array of 2048 strings");return t.forEach(e=>{if(typeof e!="string")throw new Error("wordlist: non-string element: "+e)}),ss.chain(ss.checksum(1,Vd),ss.radix2(11,!0),ss.alphabet(t))}function rl(t,e){const{words:r}=zd(t),n=tl(e).decode(r);return el(n),n}function Qd(t,e){return el(t),tl(e).encode(t).join($d(e)?"　":" ")}function Hd(t,e){try{rl(t,e)}catch{return!1}return!0}const fo=`abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split(`
`);var ho;try{ho=new TextDecoder}catch{}var ke,br,R=0,mt={},st,Jr,cr=0,wr=0,Lt,Tr,Ht=[],nt,nl={useRecords:!1,mapsAsObjects:!0};class il{}const sl=new il;sl.name="MessagePack 0xC1";var Kr=!1,ol=2,Jd;try{new Function("")}catch{ol=1/0}class mi{constructor(e){e&&(e.useRecords===!1&&e.mapsAsObjects===void 0&&(e.mapsAsObjects=!0),e.sequential&&e.trusted!==!1&&(e.trusted=!0,!e.structures&&e.useRecords!=!1&&(e.structures=[],e.maxSharedStructures||(e.maxSharedStructures=0))),e.structures?e.structures.sharedLength=e.structures.length:e.getStructures&&((e.structures=[]).uninitialized=!0,e.structures.sharedLength=0),e.int64AsNumber&&(e.int64AsType="number")),Object.assign(this,e)}unpack(e,r){if(ke)return wl(()=>(yo(),this?this.unpack(e,r):mi.prototype.unpack.call(nl,e,r)));!e.buffer&&e.constructor===ArrayBuffer&&(e=typeof Buffer<"u"?Buffer.from(e):new Uint8Array(e)),typeof r=="object"?(br=r.end||e.length,R=r.start||0):(R=0,br=r>-1?r:e.length),wr=0,Jr=null,Lt=null,ke=e;try{nt=e.dataView||(e.dataView=new DataView(e.buffer,e.byteOffset,e.byteLength))}catch(n){throw ke=null,e instanceof Uint8Array?n:new Error("Source must be a Uint8Array or Buffer but was a "+(e&&typeof e=="object"?e.constructor.name:typeof e))}if(this instanceof mi){if(mt=this,this.structures)return st=this.structures,os(r);(!st||st.length>0)&&(st=[])}else mt=nl,(!st||st.length>0)&&(st=[]);return os(r)}unpackMultiple(e,r){let n,s=0;try{Kr=!0;let a=e.length,h=this?this.unpack(e,a):as.unpack(e,a);if(r){if(r(h,s,R)===!1)return;for(;R<a;)if(s=R,r(os(),s,R)===!1)return}else{for(n=[h];R<a;)s=R,n.push(os());return n}}catch(a){throw a.lastPosition=s,a.values=n,a}finally{Kr=!1,yo()}}_mergeStructures(e,r){e=e||[],Object.isFrozen(e)&&(e=e.map(n=>n.slice(0)));for(let n=0,s=e.length;n<s;n++){let a=e[n];a&&(a.isShared=!0,n>=32&&(a.highByte=n-32>>5))}e.sharedLength=e.length;for(let n in r||[])if(n>=0){let s=e[n],a=r[n];a&&(s&&((e.restoreStructures||(e.restoreStructures=[]))[n]=s),e[n]=a)}return this.structures=e}decode(e,r){return this.unpack(e,r)}}function os(t){try{if(!mt.trusted&&!Kr){let r=st.sharedLength||0;r<st.length&&(st.length=r)}let e;if(mt.randomAccessStructure&&ke[R]<64&&ke[R]>=32&&Jd||(e=At()),Lt&&(R=Lt.postBundlePosition,Lt=null),Kr&&(st.restoreStructures=null),R==br)st&&st.restoreStructures&&al(),st=null,ke=null,Tr&&(Tr=null);else{if(R>br)throw new Error("Unexpected end of MessagePack data");if(!Kr){let r;try{r=JSON.stringify(e,(n,s)=>typeof s=="bigint"?`${s}n`:s).slice(0,100)}catch(n){r="(JSON view not available "+n+")"}throw new Error("Data read, but end of buffer not reached "+r)}}return e}catch(e){throw st&&st.restoreStructures&&al(),yo(),(e instanceof RangeError||e.message.startsWith("Unexpected end of buffer")||R>br)&&(e.incomplete=!0),e}}function al(){for(let t in st.restoreStructures)st[t]=st.restoreStructures[t];st.restoreStructures=null}function At(){let t=ke[R++];if(t<160)if(t<128){if(t<64)return t;{let e=st[t&63]||mt.getStructures&&cl()[t&63];return e?(e.read||(e.read=po(e,t&63)),e.read()):t}}else if(t<144)if(t-=128,mt.mapsAsObjects){let e={};for(let r=0;r<t;r++){let n=ml();n==="__proto__"&&(n="__proto_"),e[n]=At()}return e}else{let e=new Map;for(let r=0;r<t;r++)e.set(At(),At());return e}else{t-=144;let e=new Array(t);for(let r=0;r<t;r++)e[r]=At();return mt.freezeData?Object.freeze(e):e}else if(t<192){let e=t-160;if(wr>=R)return Jr.slice(R-cr,(R+=e)-cr);if(wr==0&&br<140){let r=e<16?_o(e):fl(e);if(r!=null)return r}return mo(e)}else{let e;switch(t){case 192:return null;case 193:return Lt?(e=At(),e>0?Lt[1].slice(Lt.position1,Lt.position1+=e):Lt[0].slice(Lt.position0,Lt.position0-=e)):sl;case 194:return!1;case 195:return!0;case 196:if(e=ke[R++],e===void 0)throw new Error("Unexpected end of buffer");return go(e);case 197:return e=nt.getUint16(R),R+=2,go(e);case 198:return e=nt.getUint32(R),R+=4,go(e);case 199:return yn(ke[R++]);case 200:return e=nt.getUint16(R),R+=2,yn(e);case 201:return e=nt.getUint32(R),R+=4,yn(e);case 202:if(e=nt.getFloat32(R),mt.useFloat32>2){let r=bo[(ke[R]&127)<<1|ke[R+1]>>7];return R+=4,(r*e+(e>0?.5:-.5)>>0)/r}return R+=4,e;case 203:return e=nt.getFloat64(R),R+=8,e;case 204:return ke[R++];case 205:return e=nt.getUint16(R),R+=2,e;case 206:return e=nt.getUint32(R),R+=4,e;case 207:return mt.int64AsType==="number"?(e=nt.getUint32(R)*4294967296,e+=nt.getUint32(R+4)):mt.int64AsType==="string"?e=nt.getBigUint64(R).toString():mt.int64AsType==="auto"?(e=nt.getBigUint64(R),e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=nt.getBigUint64(R),R+=8,e;case 208:return nt.getInt8(R++);case 209:return e=nt.getInt16(R),R+=2,e;case 210:return e=nt.getInt32(R),R+=4,e;case 211:return mt.int64AsType==="number"?(e=nt.getInt32(R)*4294967296,e+=nt.getUint32(R+4)):mt.int64AsType==="string"?e=nt.getBigInt64(R).toString():mt.int64AsType==="auto"?(e=nt.getBigInt64(R),e>=BigInt(-2)<<BigInt(52)&&e<=BigInt(2)<<BigInt(52)&&(e=Number(e))):e=nt.getBigInt64(R),R+=8,e;case 212:if(e=ke[R++],e==114)return gl(ke[R++]&63);{let r=Ht[e];if(r)return r.read?(R++,r.read(At())):r.noBuffer?(R++,r()):r(ke.subarray(R,++R));throw new Error("Unknown extension "+e)}case 213:return e=ke[R],e==114?(R++,gl(ke[R++]&63,ke[R++])):yn(2);case 214:return yn(4);case 215:return yn(8);case 216:return yn(16);case 217:return e=ke[R++],wr>=R?Jr.slice(R-cr,(R+=e)-cr):Gd(e);case 218:return e=nt.getUint16(R),R+=2,wr>=R?Jr.slice(R-cr,(R+=e)-cr):Xd(e);case 219:return e=nt.getUint32(R),R+=4,wr>=R?Jr.slice(R-cr,(R+=e)-cr):Yd(e);case 220:return e=nt.getUint16(R),R+=2,ul(e);case 221:return e=nt.getUint32(R),R+=4,ul(e);case 222:return e=nt.getUint16(R),R+=2,dl(e);case 223:return e=nt.getUint32(R),R+=4,dl(e);default:if(t>=224)return t-256;if(t===void 0){let r=new Error("Unexpected end of MessagePack data");throw r.incomplete=!0,r}throw new Error("Unknown MessagePack token "+t)}}}const Kd=/^[a-zA-Z_$][a-zA-Z\d_$]*$/;function po(t,e){function r(){if(r.count++>ol){let s=t.read=new Function("r","return function(){return "+(mt.freezeData?"Object.freeze":"")+"({"+t.map(a=>a==="__proto__"?"__proto_:r()":Kd.test(a)?a+":r()":"["+JSON.stringify(a)+"]:r()").join(",")+"})}")(At);return t.highByte===0&&(t.read=ll(e,t.read)),s()}let n={};for(let s=0,a=t.length;s<a;s++){let h=t[s];h==="__proto__"&&(h="__proto_"),n[h]=At()}return mt.freezeData?Object.freeze(n):n}return r.count=0,t.highByte===0?ll(e,r):r}const ll=(t,e)=>function(){let r=ke[R++];if(r===0)return e();let n=t<32?-(t+(r<<5)):t+(r<<5),s=st[n]||cl()[n];if(!s)throw new Error("Record id is not defined for "+n);return s.read||(s.read=po(s,t)),s.read()};function cl(){let t=wl(()=>(ke=null,mt.getStructures()));return st=mt._mergeStructures(t,st)}var mo=_i,Gd=_i,Xd=_i,Yd=_i;function _i(t){let e;if(t<16&&(e=_o(t)))return e;if(t>64&&ho)return ho.decode(ke.subarray(R,R+=t));const r=R+t,n=[];for(e="";R<r;){const s=ke[R++];if((s&128)===0)n.push(s);else if((s&224)===192){const a=ke[R++]&63;n.push((s&31)<<6|a)}else if((s&240)===224){const a=ke[R++]&63,h=ke[R++]&63;n.push((s&31)<<12|a<<6|h)}else if((s&248)===240){const a=ke[R++]&63,h=ke[R++]&63,g=ke[R++]&63;let w=(s&7)<<18|a<<12|h<<6|g;w>65535&&(w-=65536,n.push(w>>>10&1023|55296),w=56320|w&1023),n.push(w)}else n.push(s);n.length>=4096&&(e+=Ft.apply(String,n),n.length=0)}return n.length>0&&(e+=Ft.apply(String,n)),e}function ul(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=At();return mt.freezeData?Object.freeze(e):e}function dl(t){if(mt.mapsAsObjects){let e={};for(let r=0;r<t;r++){let n=ml();n==="__proto__"&&(n="__proto_"),e[n]=At()}return e}else{let e=new Map;for(let r=0;r<t;r++)e.set(At(),At());return e}}var Ft=String.fromCharCode;function fl(t){let e=R,r=new Array(t);for(let n=0;n<t;n++){const s=ke[R++];if((s&128)>0){R=e;return}r[n]=s}return Ft.apply(String,r)}function _o(t){if(t<4)if(t<2){if(t===0)return"";{let e=ke[R++];if((e&128)>1){R-=1;return}return Ft(e)}}else{let e=ke[R++],r=ke[R++];if((e&128)>0||(r&128)>0){R-=2;return}if(t<3)return Ft(e,r);let n=ke[R++];if((n&128)>0){R-=3;return}return Ft(e,r,n)}else{let e=ke[R++],r=ke[R++],n=ke[R++],s=ke[R++];if((e&128)>0||(r&128)>0||(n&128)>0||(s&128)>0){R-=4;return}if(t<6){if(t===4)return Ft(e,r,n,s);{let a=ke[R++];if((a&128)>0){R-=5;return}return Ft(e,r,n,s,a)}}else if(t<8){let a=ke[R++],h=ke[R++];if((a&128)>0||(h&128)>0){R-=6;return}if(t<7)return Ft(e,r,n,s,a,h);let g=ke[R++];if((g&128)>0){R-=7;return}return Ft(e,r,n,s,a,h,g)}else{let a=ke[R++],h=ke[R++],g=ke[R++],w=ke[R++];if((a&128)>0||(h&128)>0||(g&128)>0||(w&128)>0){R-=8;return}if(t<10){if(t===8)return Ft(e,r,n,s,a,h,g,w);{let q=ke[R++];if((q&128)>0){R-=9;return}return Ft(e,r,n,s,a,h,g,w,q)}}else if(t<12){let q=ke[R++],k=ke[R++];if((q&128)>0||(k&128)>0){R-=10;return}if(t<11)return Ft(e,r,n,s,a,h,g,w,q,k);let N=ke[R++];if((N&128)>0){R-=11;return}return Ft(e,r,n,s,a,h,g,w,q,k,N)}else{let q=ke[R++],k=ke[R++],N=ke[R++],C=ke[R++];if((q&128)>0||(k&128)>0||(N&128)>0||(C&128)>0){R-=12;return}if(t<14){if(t===12)return Ft(e,r,n,s,a,h,g,w,q,k,N,C);{let z=ke[R++];if((z&128)>0){R-=13;return}return Ft(e,r,n,s,a,h,g,w,q,k,N,C,z)}}else{let z=ke[R++],V=ke[R++];if((z&128)>0||(V&128)>0){R-=14;return}if(t<15)return Ft(e,r,n,s,a,h,g,w,q,k,N,C,z,V);let Z=ke[R++];if((Z&128)>0){R-=15;return}return Ft(e,r,n,s,a,h,g,w,q,k,N,C,z,V,Z)}}}}}function hl(){let t=ke[R++],e;if(t<192)e=t-160;else switch(t){case 217:e=ke[R++];break;case 218:e=nt.getUint16(R),R+=2;break;case 219:e=nt.getUint32(R),R+=4;break;default:throw new Error("Expected string")}return _i(e)}function go(t){return mt.copyBuffers?Uint8Array.prototype.slice.call(ke,R,R+=t):ke.subarray(R,R+=t)}function yn(t){let e=ke[R++];if(Ht[e]){let r;return Ht[e](ke.subarray(R,r=R+=t),n=>{R=n;try{return At()}finally{R=r}})}else throw new Error("Unknown extension type "+e)}var pl=new Array(4096);function ml(){let t=ke[R++];if(t>=160&&t<192){if(t=t-160,wr>=R)return Jr.slice(R-cr,(R+=t)-cr);if(!(wr==0&&br<180))return mo(t)}else return R--,_l(At());let e=(t<<5^(t>1?nt.getUint16(R):t>0?ke[R]:0))&4095,r=pl[e],n=R,s=R+t-3,a,h=0;if(r&&r.bytes==t){for(;n<s;){if(a=nt.getUint32(n),a!=r[h++]){n=1879048192;break}n+=4}for(s+=3;n<s;)if(a=ke[n++],a!=r[h++]){n=1879048192;break}if(n===s)return R=n,r.string;s-=3,n=R}for(r=[],pl[e]=r,r.bytes=t;n<s;)a=nt.getUint32(n),r.push(a),n+=4;for(s+=3;n<s;)a=ke[n++],r.push(a);let g=t<16?_o(t):fl(t);return g!=null?r.string=g:r.string=mo(t)}function _l(t){if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean"||typeof t=="bigint")return t.toString();if(t==null)return t+"";if(mt.allowArraysInMapKeys&&Array.isArray(t)&&t.flat().every(e=>["string","number","boolean","bigint"].includes(typeof e)))return t.flat().toString();throw new Error(`Invalid property type for record: ${typeof t}`)}const gl=(t,e)=>{let r=At().map(_l),n=t;e!==void 0&&(t=t<32?-((e<<5)+t):(e<<5)+t,r.highByte=e);let s=st[t];return s&&(s.isShared||Kr)&&((st.restoreStructures||(st.restoreStructures=[]))[t]=s),st[t]=r,r.read=po(r,n),r.read()};Ht[0]=()=>{},Ht[0].noBuffer=!0,Ht[66]=t=>{let e=t.byteLength%8||8,r=BigInt(t[0]&128?t[0]-256:t[0]);for(let n=1;n<e;n++)r<<=BigInt(8),r+=BigInt(t[n]);if(t.byteLength!==e){let n=new DataView(t.buffer,t.byteOffset,t.byteLength),s=(a,h)=>{let g=h-a;if(g<=40){let N=n.getBigUint64(a);for(let C=a+8;C<h;C+=8)N<<=64n,N|=n.getBigUint64(C);return N}let w=a+(g>>4<<3),q=s(a,w),k=s(w,h);return q<<BigInt((h-w)*8)|k};r=r<<BigInt((n.byteLength-e)*8)|s(e,n.byteLength)}return r};let yl={Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AggregateError:typeof AggregateError=="function"?AggregateError:null};Ht[101]=()=>{let t=At();if(!yl[t[0]]){let e=Error(t[1],{cause:t[2]});return e.name=t[0],e}return yl[t[0]](t[1],{cause:t[2]})},Ht[105]=t=>{if(mt.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=nt.getUint32(R-4);Tr||(Tr=new Map);let r=ke[R],n;r>=144&&r<160||r==220||r==221?n=[]:r>=128&&r<144||r==222||r==223?n=new Map:(r>=199&&r<=201||r>=212&&r<=216)&&ke[R+1]===115?n=new Set:n={};let s={target:n};Tr.set(e,s);let a=At();if(s.used)Object.assign(n,a);else return s.target=a;if(n instanceof Map)for(let[h,g]of a.entries())n.set(h,g);if(n instanceof Set)for(let h of Array.from(a))n.add(h);return n},Ht[112]=t=>{if(mt.structuredClone===!1)throw new Error("Structured clone extension is disabled");let e=nt.getUint32(R-4),r=Tr.get(e);return r.used=!0,r.target},Ht[115]=()=>new Set(At());const bl=["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64","BigInt64","BigUint64"].map(t=>t+"Array");let Zd=typeof globalThis=="object"?globalThis:window;Ht[116]=t=>{let e=t[0],r=Uint8Array.prototype.slice.call(t,1).buffer,n=bl[e];if(!n){if(e===16)return r;if(e===17)return new DataView(r);throw new Error("Could not find typed array for code "+e)}return new Zd[n](r)},Ht[120]=()=>{let t=At();return new RegExp(t[0],t[1])};const ef=[];Ht[98]=t=>{let e=(t[0]<<24)+(t[1]<<16)+(t[2]<<8)+t[3],r=R;return R+=e-t.length,Lt=ef,Lt=[hl(),hl()],Lt.position0=0,Lt.position1=0,Lt.postBundlePosition=R,R=r,At()},Ht[255]=t=>t.length==4?new Date((t[0]*16777216+(t[1]<<16)+(t[2]<<8)+t[3])*1e3):t.length==8?new Date(((t[0]<<22)+(t[1]<<14)+(t[2]<<6)+(t[3]>>2))/1e6+((t[3]&3)*4294967296+t[4]*16777216+(t[5]<<16)+(t[6]<<8)+t[7])*1e3):t.length==12?new Date(((t[0]<<24)+(t[1]<<16)+(t[2]<<8)+t[3])/1e6+((t[4]&128?-281474976710656:0)+t[6]*1099511627776+t[7]*4294967296+t[8]*16777216+(t[9]<<16)+(t[10]<<8)+t[11])*1e3):new Date("invalid");function wl(t){let e=br,r=R,n=cr,s=wr,a=Jr,h=Tr,g=Lt,w=new Uint8Array(ke.slice(0,br)),q=st,k=st.slice(0,st.length),N=mt,C=Kr,z=t();return br=e,R=r,cr=n,wr=s,Jr=a,Tr=h,Lt=g,ke=w,Kr=C,st=q,st.splice(0,st.length,...k),mt=N,nt=new DataView(ke.buffer,ke.byteOffset,ke.byteLength),z}function yo(){ke=null,Tr=null,st=null}const bo=new Array(147);for(let t=0;t<256;t++)bo[t]=+("1e"+Math.floor(45.15-t*.30103));var as=new mi({useRecords:!1});as.unpack,as.unpackMultiple,as.unpack;let tf=new Float32Array(1);new Uint8Array(tf.buffer,0,4);let ls;try{ls=new TextEncoder}catch{}let wo,Nl;const zn=typeof Buffer<"u",cs=zn?function(t){return Buffer.allocUnsafeSlow(t)}:Uint8Array,xl=zn?Buffer:Uint8Array,vl=zn?4294967296:2144337920;let j,gi,ht,D=0,jt,vt=null,rf;const nf=21760,sf=/[\u0080-\uFFFF]/,Vn=Symbol("record-id");class ql extends mi{constructor(e){super(e),this.offset=0;let r,n,s,a,h=xl.prototype.utf8Write?function(M,pe){return j.utf8Write(M,pe,j.byteLength-pe)}:ls&&ls.encodeInto?function(M,pe){return ls.encodeInto(M,j.subarray(pe)).written}:!1,g=this;e||(e={});let w=e&&e.sequential,q=e.structures||e.saveStructures,k=e.maxSharedStructures;if(k==null&&(k=q?32:0),k>8160)throw new Error("Maximum maxSharedStructure is 8160");e.structuredClone&&e.moreTypes==null&&(this.moreTypes=!0);let N=e.maxOwnStructures;N==null&&(N=q?32:64),!this.structures&&e.useRecords!=!1&&(this.structures=[]);let C=k>32||N+k>64,z=k+64,V=k+N+64;if(V>8256)throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");let Z=[],ge=0,Ee=0;this.pack=this.encode=function(M,pe){if(j||(j=new cs(8192),ht=j.dataView||(j.dataView=new DataView(j.buffer,0,8192)),D=0),jt=j.length-10,jt-D<2048?(j=new cs(j.length),ht=j.dataView||(j.dataView=new DataView(j.buffer,0,j.length)),jt=j.length-10,D=0):D=D+7&2147483640,r=D,pe&df&&(D+=pe&255),a=g.structuredClone?new Map:null,g.bundleStrings&&typeof M!="string"?(vt=[],vt.size=1/0):vt=null,s=g.structures,s){s.uninitialized&&(s=g._mergeStructures(g.getStructures()));let ne=s.sharedLength||0;if(ne>k)throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to "+s.sharedLength);if(!s.transitions){s.transitions=Object.create(null);for(let se=0;se<ne;se++){let Oe=s[se];if(!Oe)continue;let he,Se=s.transitions;for(let je=0,ze=Oe.length;je<ze;je++){let Et=Oe[je];he=Se[Et],he||(he=Se[Et]=Object.create(null)),Se=he}Se[Vn]=se+64}this.lastNamedStructuresLength=ne}w||(s.nextId=ne+64)}n&&(n=!1);let oe;try{g.randomAccessStructure&&M&&M.constructor&&M.constructor===Object?et(M):Ie(M);let ne=vt;if(vt&&kl(r,Ie,0),a&&a.idsToInsert){let se=a.idsToInsert.sort((je,ze)=>je.offset>ze.offset?1:-1),Oe=se.length,he=-1;for(;ne&&Oe>0;){let je=se[--Oe].offset+r;je<ne.stringsPosition+r&&he===-1&&(he=0),je>ne.position+r?he>=0&&(he+=6):(he>=0&&(ht.setUint32(ne.position+r,ht.getUint32(ne.position+r)+he),he=-1),ne=ne.previous,Oe++)}he>=0&&ne&&ht.setUint32(ne.position+r,ht.getUint32(ne.position+r)+he),D+=se.length*6,D>jt&&Be(D),g.offset=D;let Se=of(j.subarray(r,D),se);return a=null,Se}return g.offset=D,pe&cf?(j.start=r,j.end=D,j):j.subarray(r,D)}catch(ne){throw oe=ne,ne}finally{if(s&&(Ue(),n&&g.saveStructures)){let ne=s.sharedLength||0,se=j.subarray(r,D),Oe=af(s,g);if(!oe)return g.saveStructures(Oe,Oe.isCompatible)===!1?g.pack(M,pe):(g.lastNamedStructuresLength=ne,j.length>1073741824&&(j=null),se)}j.length>1073741824&&(j=null),pe&uf&&(D=r)}};const Ue=()=>{Ee<10&&Ee++;let M=s.sharedLength||0;if(s.length>M&&!w&&(s.length=M),ge>1e4)s.transitions=null,Ee=0,ge=0,Z.length>0&&(Z=[]);else if(Z.length>0&&!w){for(let pe=0,oe=Z.length;pe<oe;pe++)Z[pe][Vn]=0;Z=[]}},Re=M=>{var pe=M.length;pe<16?j[D++]=144|pe:pe<65536?(j[D++]=220,j[D++]=pe>>8,j[D++]=pe&255):(j[D++]=221,ht.setUint32(D,pe),D+=4);for(let oe=0;oe<pe;oe++)Ie(M[oe])},Ie=M=>{D>jt&&(j=Be(D));var pe=typeof M,oe;if(pe==="string"){let ne=M.length;if(vt&&ne>=4&&ne<4096){if((vt.size+=ne)>nf){let Se,je=(vt[0]?vt[0].length*3+vt[1].length:0)+10;D+je>jt&&(j=Be(D+je));let ze;vt.position?(ze=vt,j[D]=200,D+=3,j[D++]=98,Se=D-r,D+=4,kl(r,Ie,0),ht.setUint16(Se+r-3,D-r-Se)):(j[D++]=214,j[D++]=98,Se=D-r,D+=4),vt=["",""],vt.previous=ze,vt.size=0,vt.position=Se}let he=sf.test(M);vt[he?0:1]+=M,j[D++]=193,Ie(he?-ne:ne);return}let se;ne<32?se=1:ne<256?se=2:ne<65536?se=3:se=5;let Oe=ne*3;if(D+Oe>jt&&(j=Be(D+Oe)),ne<64||!h){let he,Se,je,ze=D+se;for(he=0;he<ne;he++)Se=M.charCodeAt(he),Se<128?j[ze++]=Se:Se<2048?(j[ze++]=Se>>6|192,j[ze++]=Se&63|128):(Se&64512)===55296&&((je=M.charCodeAt(he+1))&64512)===56320?(Se=65536+((Se&1023)<<10)+(je&1023),he++,j[ze++]=Se>>18|240,j[ze++]=Se>>12&63|128,j[ze++]=Se>>6&63|128,j[ze++]=Se&63|128):(j[ze++]=Se>>12|224,j[ze++]=Se>>6&63|128,j[ze++]=Se&63|128);oe=ze-D-se}else oe=h(M,D+se);oe<32?j[D++]=160|oe:oe<256?(se<2&&j.copyWithin(D+2,D+1,D+1+oe),j[D++]=217,j[D++]=oe):oe<65536?(se<3&&j.copyWithin(D+3,D+2,D+2+oe),j[D++]=218,j[D++]=oe>>8,j[D++]=oe&255):(se<5&&j.copyWithin(D+5,D+3,D+3+oe),j[D++]=219,ht.setUint32(D,oe),D+=4),D+=oe}else if(pe==="number")if(M>>>0===M)M<32||M<128&&this.useRecords===!1||M<64&&!this.randomAccessStructure?j[D++]=M:M<256?(j[D++]=204,j[D++]=M):M<65536?(j[D++]=205,j[D++]=M>>8,j[D++]=M&255):(j[D++]=206,ht.setUint32(D,M),D+=4);else if(M>>0===M)M>=-32?j[D++]=256+M:M>=-128?(j[D++]=208,j[D++]=M+256):M>=-32768?(j[D++]=209,ht.setInt16(D,M),D+=2):(j[D++]=210,ht.setInt32(D,M),D+=4);else{let ne;if((ne=this.useFloat32)>0&&M<4294967296&&M>=-2147483648){j[D++]=202,ht.setFloat32(D,M);let se;if(ne<4||(se=M*bo[(j[D]&127)<<1|j[D+1]>>7])>>0===se){D+=4;return}else D--}j[D++]=203,ht.setFloat64(D,M),D+=8}else if(pe==="object"||pe==="function")if(!M)j[D++]=192;else{if(a){let se=a.get(M);if(se){if(!se.id){let Oe=a.idsToInsert||(a.idsToInsert=[]);se.id=Oe.push(se)}j[D++]=214,j[D++]=112,ht.setUint32(D,se.id),D+=4;return}else a.set(M,{offset:D-r})}let ne=M.constructor;if(ne===Object)$e(M);else if(ne===Array)Re(M);else if(ne===Map)if(this.mapAsEmptyObject)j[D++]=128;else{oe=M.size,oe<16?j[D++]=128|oe:oe<65536?(j[D++]=222,j[D++]=oe>>8,j[D++]=oe&255):(j[D++]=223,ht.setUint32(D,oe),D+=4);for(let[se,Oe]of M)Ie(se),Ie(Oe)}else{for(let se=0,Oe=wo.length;se<Oe;se++){let he=Nl[se];if(M instanceof he){let Se=wo[se];if(Se.write){Se.type&&(j[D++]=212,j[D++]=Se.type,j[D++]=0);let Gt=Se.write.call(this,M);Gt===M?Array.isArray(M)?Re(M):$e(M):Ie(Gt);return}let je=j,ze=ht,Et=D;j=null;let Bt;try{Bt=Se.pack.call(this,M,Gt=>(j=je,je=null,D+=Gt,D>jt&&Be(D),{target:j,targetView:ht,position:D-Gt}),Ie)}finally{je&&(j=je,ht=ze,D=Et,jt=j.length-10)}Bt&&(Bt.length+D>jt&&Be(Bt.length+D),D=Sl(Bt,j,D,Se.type));return}}if(Array.isArray(M))Re(M);else{if(M.toJSON){const se=M.toJSON();if(se!==M)return Ie(se)}if(pe==="function")return Ie(this.writeFunction&&this.writeFunction(M));$e(M)}}}else if(pe==="boolean")j[D++]=M?195:194;else if(pe==="bigint"){if(M<9223372036854776e3&&M>=-9223372036854776e3)j[D++]=211,ht.setBigInt64(D,M);else if(M<18446744073709552e3&&M>0)j[D++]=207,ht.setBigUint64(D,M);else if(this.largeBigIntToFloat)j[D++]=203,ht.setFloat64(D,Number(M));else{if(this.largeBigIntToString)return Ie(M.toString());if(this.useBigIntExtension||this.moreTypes){let ne=M<0?BigInt(-1):BigInt(0),se;if(M>>BigInt(65536)===ne){let Oe=BigInt(18446744073709552e3)-BigInt(1),he=[];for(;he.push(M&Oe),M>>BigInt(63)!==ne;)M>>=BigInt(64);se=new Uint8Array(new BigUint64Array(he).buffer),se.reverse()}else{let Oe=M<0,he=(Oe?~M:M).toString(16);if(he.length%2?he="0"+he:parseInt(he.charAt(0),16)>=8&&(he="00"+he),zn)se=Buffer.from(he,"hex");else{se=new Uint8Array(he.length/2);for(let Se=0;Se<se.length;Se++)se[Se]=parseInt(he.slice(Se*2,Se*2+2),16)}if(Oe)for(let Se=0;Se<se.length;Se++)se[Se]=~se[Se]}se.length+D>jt&&Be(se.length+D),D=Sl(se,j,D,66);return}else throw new RangeError(M+" was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string")}D+=8}else if(pe==="undefined")this.encodeUndefinedAsNil?j[D++]=192:(j[D++]=212,j[D++]=0,j[D++]=0);else throw new Error("Unknown type: "+pe)},ot=this.variableMapSize||this.coercibleKeyAsNumber||this.skipValues?M=>{let pe;if(this.skipValues){pe=[];for(let se in M)(typeof M.hasOwnProperty!="function"||M.hasOwnProperty(se))&&!this.skipValues.includes(M[se])&&pe.push(se)}else pe=Object.keys(M);let oe=pe.length;oe<16?j[D++]=128|oe:oe<65536?(j[D++]=222,j[D++]=oe>>8,j[D++]=oe&255):(j[D++]=223,ht.setUint32(D,oe),D+=4);let ne;if(this.coercibleKeyAsNumber)for(let se=0;se<oe;se++){ne=pe[se];let Oe=Number(ne);Ie(isNaN(Oe)?ne:Oe),Ie(M[ne])}else for(let se=0;se<oe;se++)Ie(ne=pe[se]),Ie(M[ne])}:M=>{j[D++]=222;let pe=D-r;D+=2;let oe=0;for(let ne in M)(typeof M.hasOwnProperty!="function"||M.hasOwnProperty(ne))&&(Ie(ne),Ie(M[ne]),oe++);if(oe>65535)throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');j[pe+++r]=oe>>8,j[pe+r]=oe&255},at=this.useRecords===!1?ot:e.progressiveRecords&&!C?M=>{let pe,oe=s.transitions||(s.transitions=Object.create(null)),ne=D++-r,se;for(let Oe in M)if(typeof M.hasOwnProperty!="function"||M.hasOwnProperty(Oe)){if(pe=oe[Oe],pe)oe=pe;else{let he=Object.keys(M),Se=oe;oe=s.transitions;let je=0;for(let ze=0,Et=he.length;ze<Et;ze++){let Bt=he[ze];pe=oe[Bt],pe||(pe=oe[Bt]=Object.create(null),je++),oe=pe}ne+r+1==D?(D--,Ye(oe,he,je)):rt(oe,he,ne,je),se=!0,oe=Se[Oe]}Ie(M[Oe])}if(!se){let Oe=oe[Vn];Oe?j[ne+r]=Oe:rt(oe,Object.keys(M),ne,0)}}:M=>{let pe,oe=s.transitions||(s.transitions=Object.create(null)),ne=0;for(let Oe in M)(typeof M.hasOwnProperty!="function"||M.hasOwnProperty(Oe))&&(pe=oe[Oe],pe||(pe=oe[Oe]=Object.create(null),ne++),oe=pe);let se=oe[Vn];se?se>=96&&C?(j[D++]=((se-=96)&31)+96,j[D++]=se>>5):j[D++]=se:Ye(oe,oe.__keys__||Object.keys(M),ne);for(let Oe in M)(typeof M.hasOwnProperty!="function"||M.hasOwnProperty(Oe))&&Ie(M[Oe])},Ce=typeof this.useRecords=="function"&&this.useRecords,$e=Ce?M=>{Ce(M)?at(M):ot(M)}:at,Be=M=>{let pe;if(M>16777216){if(M-r>vl)throw new Error("Packed buffer would be larger than maximum buffer size");pe=Math.min(vl,Math.round(Math.max((M-r)*(M>67108864?1.25:2),4194304)/4096)*4096)}else pe=(Math.max(M-r<<2,j.length-1)>>12)+1<<12;let oe=new cs(pe);return ht=oe.dataView||(oe.dataView=new DataView(oe.buffer,0,pe)),M=Math.min(M,j.length),j.copy?j.copy(oe,0,r,M):oe.set(j.slice(r,M)),D-=r,r=0,jt=oe.length-10,j=oe},Ye=(M,pe,oe)=>{let ne=s.nextId;ne||(ne=64),ne<z&&this.shouldShareStructure&&!this.shouldShareStructure(pe)?(ne=s.nextOwnId,ne<V||(ne=z),s.nextOwnId=ne+1):(ne>=V&&(ne=z),s.nextId=ne+1);let se=pe.highByte=ne>=96&&C?ne-96>>5:-1;M[Vn]=ne,M.__keys__=pe,s[ne-64]=pe,ne<z?(pe.isShared=!0,s.sharedLength=ne-63,n=!0,se>=0?(j[D++]=(ne&31)+96,j[D++]=se):j[D++]=ne):(se>=0?(j[D++]=213,j[D++]=114,j[D++]=(ne&31)+96,j[D++]=se):(j[D++]=212,j[D++]=114,j[D++]=ne),oe&&(ge+=Ee*oe),Z.length>=N&&(Z.shift()[Vn]=0),Z.push(M),Ie(pe))},rt=(M,pe,oe,ne)=>{let se=j,Oe=D,he=jt,Se=r;j=gi,D=0,r=0,j||(gi=j=new cs(8192)),jt=j.length-10,Ye(M,pe,ne),gi=j;let je=D;if(j=se,D=Oe,jt=he,r=Se,je>1){let ze=D+je-1;ze>jt&&Be(ze);let Et=oe+r;j.copyWithin(Et+je,Et+1,D),j.set(gi.slice(0,je),Et),D=ze}else j[oe+r]=gi[0]},et=M=>{let pe=rf(M,j,r,D,s,Be,(oe,ne,se)=>{if(se)return n=!0;D=ne;let Oe=j;return Ie(oe),Ue(),Oe!==j?{position:D,targetView:ht,target:j}:D},this);if(pe===0)return $e(M);D=pe}}useBuffer(e){j=e,j.dataView||(j.dataView=new DataView(j.buffer,j.byteOffset,j.byteLength)),ht=j.dataView,D=0}set position(e){D=e}get position(){return D}clearSharedData(){this.structures&&(this.structures=[]),this.typedStructs&&(this.typedStructs=[])}}Nl=[Date,Set,Error,RegExp,ArrayBuffer,Object.getPrototypeOf(Uint8Array.prototype).constructor,DataView,il],wo=[{pack(t,e,r){let n=t.getTime()/1e3;if((this.useTimestamp32||t.getMilliseconds()===0)&&n>=0&&n<4294967296){let{target:s,targetView:a,position:h}=e(6);s[h++]=214,s[h++]=255,a.setUint32(h,n)}else if(n>0&&n<4294967296){let{target:s,targetView:a,position:h}=e(10);s[h++]=215,s[h++]=255,a.setUint32(h,t.getMilliseconds()*4e6+(n/1e3/4294967296>>0)),a.setUint32(h+4,n)}else if(isNaN(n)){if(this.onInvalidDate)return e(0),r(this.onInvalidDate());let{target:s,targetView:a,position:h}=e(3);s[h++]=212,s[h++]=255,s[h++]=255}else{let{target:s,targetView:a,position:h}=e(15);s[h++]=199,s[h++]=12,s[h++]=255,a.setUint32(h,t.getMilliseconds()*1e6),a.setBigInt64(h+4,BigInt(Math.floor(n)))}}},{pack(t,e,r){if(this.setAsEmptyObject)return e(0),r({});let n=Array.from(t),{target:s,position:a}=e(this.moreTypes?3:0);this.moreTypes&&(s[a++]=212,s[a++]=115,s[a++]=0),r(n)}},{pack(t,e,r){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=101,n[s++]=0),r([t.name,t.message,t.cause])}},{pack(t,e,r){let{target:n,position:s}=e(this.moreTypes?3:0);this.moreTypes&&(n[s++]=212,n[s++]=120,n[s++]=0),r([t.source,t.flags])}},{pack(t,e){this.moreTypes?No(t,16,e):xo(zn?Buffer.from(t):new Uint8Array(t),e)}},{pack(t,e){let r=t.constructor;r!==xl&&this.moreTypes?No(t,bl.indexOf(r.name),e):xo(t,e)}},{pack(t,e){this.moreTypes?No(t,17,e):xo(zn?Buffer.from(t):new Uint8Array(t),e)}},{pack(t,e){let{target:r,position:n}=e(1);r[n]=193}}];function No(t,e,r,n){let s=t.byteLength;if(s+1<256){var{target:a,position:h}=r(4+s);a[h++]=199,a[h++]=s+1}else if(s+1<65536){var{target:a,position:h}=r(5+s);a[h++]=200,a[h++]=s+1>>8,a[h++]=s+1&255}else{var{target:a,position:h,targetView:g}=r(7+s);a[h++]=201,g.setUint32(h,s+1),h+=4}a[h++]=116,a[h++]=e,t.buffer||(t=new Uint8Array(t)),a.set(new Uint8Array(t.buffer,t.byteOffset,t.byteLength),h)}function xo(t,e){let r=t.byteLength;var n,s;if(r<256){var{target:n,position:s}=e(r+2);n[s++]=196,n[s++]=r}else if(r<65536){var{target:n,position:s}=e(r+3);n[s++]=197,n[s++]=r>>8,n[s++]=r&255}else{var{target:n,position:s,targetView:a}=e(r+5);n[s++]=198,a.setUint32(s,r),s+=4}n.set(t,s)}function Sl(t,e,r,n){let s=t.length;switch(s){case 1:e[r++]=212;break;case 2:e[r++]=213;break;case 4:e[r++]=214;break;case 8:e[r++]=215;break;case 16:e[r++]=216;break;default:s<256?(e[r++]=199,e[r++]=s):s<65536?(e[r++]=200,e[r++]=s>>8,e[r++]=s&255):(e[r++]=201,e[r++]=s>>24,e[r++]=s>>16&255,e[r++]=s>>8&255,e[r++]=s&255)}return e[r++]=n,e.set(t,r),r+=s,r}function of(t,e){let r,n=e.length*6,s=t.length-n;for(;r=e.pop();){let a=r.offset,h=r.id;t.copyWithin(a+n,a,s),n-=6;let g=a+n;t[g++]=214,t[g++]=105,t[g++]=h>>24,t[g++]=h>>16&255,t[g++]=h>>8&255,t[g++]=h&255,s=a}return t}function kl(t,e,r){if(vt.length>0){ht.setUint32(vt.position+t,D+r-vt.position-t),vt.stringsPosition=D-t;let n=vt;vt=null,e(n[0]),e(n[1])}}function af(t,e){return t.isCompatible=r=>{let n=!r||(e.lastNamedStructuresLength||0)===r.length;return n||e._mergeStructures(r),n},t}let El=new ql({useRecords:!1});const lf=El.pack;El.pack;const cf=512,uf=1024,df=2048,Al=t=>Object.prototype.toString.call(t)==="[object Object]",Ol=t=>Object.entries(t),vo=()=>Object.create(null),Tl=(t,e)=>e in t?t[e]:void 0,Il=!(typeof navigator<"u"&&"product"in navigator&&navigator.product==="ReactNative")&&typeof globalThis.Buffer<"u";function ue(t=void 0){return{ok:!0,value:t}}const we=t=>({ok:!1,error:t}),ff=t=>{if(t.ok)return t.value;throw new Error("getOrThrow",{cause:t.error})},hf=t=>t.ok?t.value:null,bn=(t,e)=>{try{return ue(t())}catch(r){return we(e(r))}},pf=async(t,e)=>t().then(r=>ue(r),r=>we(e(r))),Cl=t=>{if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return`"${t}"`;try{return JSON.stringify(t)}catch{return globalThis.String(t)}},qo=Symbol("evolu.Type"),Pl=t=>typeof t=="object"&&t!==null&&qo in t,Gr=(t,e)=>({...e,name:t,is:r=>e.fromUnknown(r).ok,from:e.fromUnknown,orThrow:r=>ff(e.fromUnknown(r)),orNull:r=>hf(e.fromUnknown(r)),[qo]:!0,Type:void 0,Input:void 0,Error:void 0,Parent:void 0,ParentError:void 0,Errors:void 0,"~standard":{version:1,vendor:"evolu",validate:r=>{const n=e.fromUnknown(r);return n.ok?{value:n.value}:(Gl??=Fh(),{issues:Nr(n.error,Gl)})},types:{input:void 0,output:void 0}}}),Xe=t=>e=>t({...e,value:Cl(e.value)}),dr=(t,e)=>Gr(t,{fromUnknown:e,fromParent:ue}),Xr=()=>Xe(t=>`A value ${t.value} is not a ${t.type.toLowerCase()}.`);dr("Unknown",ue);const Ct=dr("String",t=>typeof t=="string"?ue(t):we({type:"String",value:t})),mf=Xr(),wn=dr("Number",t=>typeof t=="number"?ue(t):we({type:"Number",value:t})),_f=Xr(),gf=dr("BigInt",t=>typeof t=="bigint"?ue(t):we({type:"BigInt",value:t})),yf=Xr(),So=dr("Boolean",t=>typeof t=="boolean"?ue(t):we({type:"Boolean",value:t})),bf=Xr();dr("Undefined",t=>t===void 0?ue(t):we({type:"Undefined",value:t}));const wf=Xr(),ko=dr("Null",t=>t===null?ue(t):we({type:"Null",value:t})),Nf=Xr();dr("Function",t=>typeof t=="function"?ue(t):we({type:"Function",value:t}));const xf=Xr(),us=dr("Uint8Array",t=>t instanceof globalThis.Uint8Array?ue(t):we({type:"Uint8Array",value:t})),vf=Xr(),qf=t=>({...dr("InstanceOf",e=>e instanceof t?ue(e):we({type:"InstanceOf",value:e,ctor:t.name})),ctor:t}),Sf=Xe(t=>`The value ${t.value} is not an instance of ${t.ctor}.`);qf(globalThis.Date),dr("EvoluType",t=>Pl(t)?ue(t):we({type:"EvoluType",value:t}));const kf=Xe(t=>`Value ${t.value} is not a valid Evolu Type.`);function it(t,e,r){return{...Gr("Brand",{fromUnknown:r?s=>{const a=e.fromUnknown(s);return a.ok?r(a.value):a}:s=>{const a=e.fromUnknown(s);return a.ok?ue(a.value):we({type:t,value:s,parentError:a.error})},fromParent:r??ue}),brand:t,parentType:e}}it("CurrencyCode",Ct,t=>/^[A-Z]{3}$/.test(t)?ue(t):we({type:"CurrencyCode",value:t}));const Ef=Xe(t=>`Invalid currency code: ${t.value}.`),yi=it("DateIso",Ct,t=>{if(t.length!==24)return we({type:"DateIso",value:t});const e=globalThis.Date.parse(t);return isNaN(e)?we({type:"DateIso",value:t}):new globalThis.Date(e).toISOString()!==t?we({type:"DateIso",value:t}):ue(t)}),Af=Xe(t=>`The value ${t.value} is not a valid ISO 8601 date string.`),Of=t=>it("Trimmed",t,e=>e.trim().length===e.length?ue(e):we({type:"Trimmed",value:e})),Tf=Xe(t=>`The value ${t.value} must be trimmed.`),ds=Of(Ct),Nn=t=>e=>it(`MinLength${t}`,e,r=>r.length>=t?ue(r):we({type:"MinLength",value:r,min:t})),If=Xe(t=>`The value ${t.value} does not meet the minimum length of ${t.min}.`),bi=t=>e=>it(`MaxLength${t}`,e,r=>r.length<=t?ue(r):we({type:"MaxLength",value:r,max:t})),Cf=Xe(t=>`The value ${t.value} exceeds the maximum length of ${t.max}.`),fs=t=>e=>it(`Length${t}`,e,r=>r.length===t?ue(r):we({type:"Length",value:r,exact:t})),Pf=Xe(t=>`The value ${t.value} does not have the required length of ${t.exact}.`);Nn(1)(Ct);const Lf=bi(100)(Ct),Ff=bi(1e3)(Ct);Nn(1)(Lf),Nn(1)(Ff);const Ll=Nn(1)(ds),Rf=bi(100)(ds),Wf=bi(1e3)(ds);Nn(1)(Rf),Nn(1)(Wf),it("Mnemonic",Ll,t=>Hd(t,fo)?ue(t):we({type:"Mnemonic",value:t}));const Df=Xe(t=>`Invalid BIP39 mnemonic: ${t.value}.`),Fl=(t,e)=>{const r=new RegExp(e.source,e.flags);return n=>it(t,n,s=>(r.lastIndex=0,r.test(s)?ue(s):we({type:"Regex",name:t,value:s,pattern:e})))},Mf=Xe(t=>`The value ${t.value} does not match the pattern for ${t.name}: ${t.pattern}.`),Uf=Fl("UrlSafeString",/^[A-Za-z0-9_-]+$/)(Ct),Rl=it("Base64Url",Ct,t=>{let e;try{e=hs(Eo(t))}catch{}return e===t?ue(t):we({type:"Base64Url",value:t})}),Wl={alphabet:"base64url",omitPadding:!0},hs=Il?t=>globalThis.Buffer.from(t).toString("base64url"):typeof globalThis.Uint8Array.prototype?.toBase64<"u"?t=>t.toBase64(Wl):t=>{const e=Array.from(t,n=>globalThis.String.fromCodePoint(n)).join("");return globalThis.btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")},Eo=Il?t=>{const e=globalThis.Buffer.from(t,"base64url");return new globalThis.Uint8Array(e)}:typeof globalThis.Uint8Array?.fromBase64<"u"?t=>globalThis.Uint8Array.fromBase64(t,Wl):t=>{let e=t.replace(/-/g,"+").replace(/_/g,"/");for(;e.length%4!==0;)e+="=";const r=globalThis.atob(e);return globalThis.Uint8Array.from(r,n=>n.charCodeAt(0))},Bf=it("SimpleName",Uf,t=>t.length>=1&&t.length<=64?ue(t):we({type:"SimpleName",value:t}));it("SimplePassword",Nn(8)(bi(64)(ds)));const $f=t=>Xe(e=>`Invalid password: ${t(e.parentError)}`),Ao=it("Id",Ct,t=>t.length===22&&Rl.fromParent(t).ok?ue(t):we({type:"Id",value:t})),jf=Xe(t=>`The value ${t.value} is not a valid Id.`),zf=t=>hs(t.randomBytes.create(16)),Vf=Xe(t=>`Invalid Id for table ${t.table}: ${t.value}.`),Qf=it("IdBytes",fs(16)(us)),Hf=16,ps=t=>Eo(t),ms=t=>hs(t),Dl=t=>it("Positive",t,e=>e>0?ue(e):we({type:"Positive",value:e})),Jf=Xe(t=>`The value ${t.value} must be positive (> 0).`),Ml=t=>it("Negative",t,e=>e<0?ue(e):we({type:"Negative",value:e})),Kf=Xe(t=>`The value ${t.value} must be negative (< 0).`),Ul=t=>it("NonPositive",t,e=>e<=0?ue(e):we({type:"NonPositive",value:e})),Gf=Xe(t=>`The value ${t.value} must be non-positive (≤ 0).`),Bl=t=>it("NonNegative",t,e=>e>=0?ue(e):we({type:"NonNegative",value:e})),Xf=Xe(t=>`The value ${t.value} must be non-negative (≥ 0).`),Yf=Bl(wn);Dl(Yf);const Zf=Ul(wn);Ml(Zf);const eh=t=>it("Int",t,e=>globalThis.Number.isSafeInteger(e)?ue(e):we({type:"Int",value:e})),th=Xe(t=>`The value ${t.value} must be an integer.`),_s=eh(wn),Qe=Bl(_s),Xt=Dl(Qe),rh=Xt.orThrow(globalThis.Number.MAX_SAFE_INTEGER),nh=Ul(_s);Ml(nh);const ih=Xe(t=>`The value ${t.value} is not > ${t.min}.`),sh=Xe(t=>`The value ${t.value} is not < ${t.max}.`),oh=Xe(t=>`The value ${t.value} is not >= ${t.min}.`),$l=t=>e=>it(`LessThanOrEqualTo${t}`,e,r=>r<=t?ue(r):we({type:"LessThanOrEqualTo",value:r,max:t})),ah=Xe(t=>`The value ${t.value} is not <= ${t.max}.`),lh=t=>it("NonNaN",t,e=>globalThis.Number.isNaN(e)?we({type:"NonNaN",value:e}):ue(e)),ch=Xe(()=>"The value must not be NaN.");lh(wn);const uh=t=>it("Finite",t,e=>globalThis.Number.isFinite(e)?ue(e):we({type:"Finite",value:e})),dh=Xe(t=>`The value ${t.value} must be finite.`),fh=uh(wn),hh=Xe(t=>`The value ${t.value} is not a multiple of ${t.divisor}.`),jl=(t,e)=>r=>it(`Between${t}-${e}`,r,n=>n>=t&&n<=e?ue(n):we({type:"Between",value:n,min:t,max:e})),ph=Xe(t=>`The value ${t.value} is not between ${t.min} and ${t.max}, inclusive.`),mh=t=>({...Gr("Literal",{fromUnknown:r=>r===t?ue(t):we({type:"Literal",value:r,expected:t}),fromParent:ue}),expected:t}),_h=Xe(t=>`The value ${t.value} is not strictly equal to the expected literal: ${globalThis.String(t.expected)}.`),zl=t=>({...Gr("Array",{fromUnknown:n=>{if(!Array.isArray(n))return we({type:"Array",value:n,reason:{kind:"NotArray"}});const s=[];for(let a=0;a<n.length;a++){const h=t.fromUnknown(n[a]);if(!h.ok)return we({type:"Array",value:n,reason:{kind:"Element",index:a,error:h.error}});s.push(h.value)}return ue(s)},fromParent:n=>{const s=[];for(let a=0;a<n.length;a++){const h=t.fromParent(n[a]);if(!h.ok)return we({type:"Array",value:n,reason:{kind:"Element",index:a,error:h.error}});s.push(h.value)}return ue(s)}}),element:t}),gh=t=>Xe(e=>{switch(e.reason.kind){case"NotArray":return`Expected an array but received ${e.value}.`;case"Element":return`Invalid element at index ${e.reason.index}: ${t(e.reason.error)}`}}),yh=t=>({...Gr("Set",{fromUnknown:n=>{if(!(n instanceof globalThis.Set))return we({type:"Set",value:n,reason:{kind:"NotSet"}});let s=0;for(const a of n){const h=t.fromUnknown(a);if(!h.ok)return we({type:"Set",value:n,reason:{kind:"Element",index:s,error:h.error}});s++}return ue(n)},fromParent:n=>{let s=0;for(const a of n){const h=t.fromParent(a);if(!h.ok)return we({type:"Set",value:n,reason:{kind:"Element",index:s,error:h.error}});s++}return ue(n)}}),element:t}),bh=t=>Xe(e=>{switch(e.reason.kind){case"NotSet":return`Expected a Set but received ${e.value}.`;case"Element":return`Invalid element at index ${e.reason.index}: ${t(e.reason.error)}`}}),Oo=(t,e)=>({...Gr("Record",{fromUnknown:s=>{if(!Al(s))return we({type:"Record",value:s,reason:{kind:"NotRecord"}});const a={};for(const[h,g]of Object.entries(s)){const w=t.fromUnknown(h);if(!w.ok)return we({type:"Record",value:s,reason:{kind:"Key",key:h,error:w.error}});const q=e.fromUnknown(g);if(!q.ok)return we({type:"Record",value:s,reason:{kind:"Value",key:h,error:q.error}});a[w.value]=q.value}return ue(a)},fromParent:s=>{const a={};for(const[h,g]of Object.entries(s)){const w=t.fromParent(h);if(!w.ok)return we({type:"Record",value:s,reason:{kind:"Key",key:h,error:w.error}});const q=e.fromParent(g);if(!q.ok)return we({type:"Record",value:s,reason:{kind:"Value",key:w.value,error:q.error}});a[w.value]=q.value}return ue(a)}}),key:t,value:e}),wh=t=>Xe(e=>{switch(e.reason.kind){case"NotRecord":return`Expected a record (plain object) but received ${e.value}.`;case"Key":return`Invalid key ${e.reason.key}: ${t(e.reason.error)}`;case"Value":return`Invalid value for key ${e.reason.key}: ${t(e.reason.error)}`}});function wi(t,e){const r=Object.keys(t);return{...Gr("Object",{fromUnknown:a=>{if(!Al(a))return we({type:"Object",value:a,reason:{kind:"NotObject"}});const h={},g={};for(const q of r){if(!(q in a)&&Kl(t[q]))continue;const k=t[q].fromUnknown(a[q]);k.ok?g[q]=k.value:h[q]=k.error}const w=Object.keys(a).filter(q=>!r.includes(q));return w.length>0?we({type:"Object",value:a,reason:{kind:"ExtraKeys",extraKeys:w}}):Object.keys(h).length>0?we({type:"Object",value:a,reason:{kind:"Props",errors:h}}):ue(g)},fromParent:a=>{const h={},g={};for(const w of r){if(!(w in a)&&Kl(t[w]))continue;const q=t[w].fromParent(a[w]);q.ok?g[w]=q.value:h[w]=q.error}return Object.keys(h).length>0?we({type:"Object",value:a,reason:{kind:"Props",errors:h}}):ue(g)}}),props:t}}const Vl=t=>Xe(e=>{switch(e.reason.kind){case"NotObject":return`Expected a plain object but received ${e.value}`;case"ExtraKeys":return`Unexpected extra keys: ${e.reason.extraKeys.join(", ")}`;case"Props":return`Invalid object properties:
${Object.entries(e.reason.errors).filter(([,n])=>n!==void 0).map(([n,s])=>`- ${n}: ${t(s)}`).join(`
`)}`}}),Nh=t=>Xe(e=>{switch(e.reason.kind){case"NotObject":return`Expected an object, but received ${e.value}.`;case"Props":return Vl(t)({type:"Object",value:e.value,reason:{kind:"Props",errors:e.reason.errors}});case"IndexKey":return`Invalid index key ${e.reason.key}: ${t(e.reason.error)}`;case"IndexValue":return`Invalid value at index key ${e.reason.key}: ${t(e.reason.error)}`}});function gs(...t){const e=t.map(n=>Pl(n)?n:mh(n)),r=n=>{const s=[];for(const a of e){const h=a.fromUnknown(n);if(h.ok)return h;s.push(h.error)}return we({type:"Union",value:n,errors:s})};return{...Gr("Union",{fromUnknown:r,fromParent:r}),members:e}}const xh=t=>Xe(e=>{const r=e.errors.map((n,s)=>`  ${s+1}. ${t(n)}`).join(`
`);return`Value ${e.value} does not match any member of the union.
Errors:
${r}`}),vh=t=>{let e;return{name:"Recursive",from:r=>(e??=t(),e.from(r)),fromUnknown:r=>(e??=t(),e.fromUnknown(r)),fromParent:r=>(e??=t(),e.fromParent(r)),is:r=>(e??=t(),e.is(r)),[qo]:!0,getParentType:()=>(e??=t(),e)}},Ql=t=>gs(ko,t),qh=t=>Xe(e=>{switch(e.reason.kind){case"InvalidLength":return`Expected a tuple of length ${e.reason.expected}, but received ${e.value}.`;case"Element":return`Invalid element at index ${e.reason.index}:
  ${t(e.reason.error)}`}}),Sh=it("Int64",gf,t=>t>=-9223372036854775808n&&t<=9223372036854775807n?ue(t):we({type:"Int64",value:t})),kh=Xe(t=>`The value ${t.value} is not a valid 64-bit signed integer (Int64).`);it("Int64",Ll,t=>bn(()=>{const e=globalThis.BigInt(t);return Sh.orThrow(e),t},()=>({type:"Int64String",value:t})));const Eh=Xe(t=>`The value ${t.value} is not a valid Int64 string.`),Hl=vh(()=>gs(Ct,fh,So,ko,Ah,Oh)),Ah=zl(Hl),Oh=Oo(Ct,Hl),Th=t=>bn(()=>JSON.parse(t),e=>({type:"Json",value:t,message:globalThis.String(e)})),Ih=it("Json",Ct,t=>{const e=Th(t);return e.ok?ue(t):e}),Ch=Xe(t=>`Invalid JSON: ${t.value}. Error: ${t.message}`),Jl=t=>JSON.parse(t),Kl=t=>typeof t=="object"&&t!=null&&"name"in t&&t.name==="Optional",Ph=655360,Lh=Xe(t=>`The mutation size exceeds the maximum limit of ${Ph} bytes. The provided mutation has a size of ${lf(t.value).byteLength} bytes.`),Fh=t=>{const e=r=>{switch(r=r,r.type){case"String":return mf(r);case"Number":return _f(r);case"BigInt":return yf(r);case"Boolean":return bf(r);case"Undefined":return wf(r);case"Null":return Nf(r);case"Function":return xf(r);case"Uint8Array":return vf(r);case"InstanceOf":return Sf(r);case"EvoluType":return kf(r);case"CurrencyCode":return Ef(r);case"DateIso":return Af(r);case"Trimmed":return Tf(r);case"MinLength":return If(r);case"MaxLength":return Cf(r);case"Length":return Pf(r);case"Mnemonic":return Df(r);case"Regex":return Mf(r);case"Id":return jf(r);case"TableId":return Vf(r);case"Positive":return Jf(r);case"Negative":return Kf(r);case"NonPositive":return Gf(r);case"NonNegative":return Xf(r);case"Int":return th(r);case"GreaterThan":return ih(r);case"LessThan":return sh(r);case"GreaterThanOrEqualTo":return oh(r);case"LessThanOrEqualTo":return ah(r);case"NonNaN":return ch(r);case"Finite":return dh(r);case"MultipleOf":return hh(r);case"Between":return ph(r);case"Literal":return _h(r);case"Int64":return kh(r);case"Int64String":return Eh(r);case"Json":return Ch(r);case"ValidMutationSize":return Lh(r);case"SimplePassword":return $f(e)(r);case"Array":return gh(e)(r);case"Set":return bh(e)(r);case"Record":return wh(e)(r);case"Object":return Vl(e)(r);case"ObjectWithRecord":return Nh(e)(r);case"Union":return xh(e)(r);case"Tuple":return qh(e)(r);default:{const n=r;return`A value ${Cl(n.value)} is not valid for type ${n.type}.`}}};return e},Nr=(t,e,r=[])=>{if(t.type==="Array"){const n=t;return n.reason.kind==="NotArray"?[{message:e(t),path:r}]:Nr(n.reason.error,e,[...r,n.reason.index])}if(t.type==="Set"){const n=t;return n.reason.kind==="NotSet"?[{message:e(t),path:r}]:Nr(n.reason.error,e,[...r,n.reason.index])}if(t.type==="Object"){const n=t;if(n.reason.kind==="NotObject"||n.reason.kind==="ExtraKeys")return[{message:e(t),path:r}];const s=[];for(const[a,h]of Object.entries(n.reason.errors))s.push(...Nr(h,e,[...r,a]));return s}if(t.type==="ObjectWithRecord"){const n=t;if(n.reason.kind==="NotObject")return[{message:e(t),path:r}];if(n.reason.kind==="IndexKey"||n.reason.kind==="IndexValue")return Nr(n.reason.error,e,[...r,n.reason.key]);const s=[];for(const[a,h]of Object.entries(n.reason.errors))s.push(...Nr(h,e,[...r,a]));return s}if(t.type==="Record"){const n=t;return n.reason.kind==="NotRecord"?[{message:e(t),path:r}]:Nr(n.reason.error,e,[...r,n.reason.key])}if(t.type==="Tuple"){const n=t;return n.reason.kind==="InvalidLength"?[{message:e(t),path:r}]:Nr(n.reason.error,e,[...r,n.reason.index])}if(t.type==="Union")return t.errors.flatMap(s=>Nr(s,e,r));if(t.type==="Brand"){const n=t;return"parentError"in n?Nr(n.parentError,e,r):[{message:e(t),path:r}]}return[{message:e(t),path:r}]};let Gl;class To extends Error{constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}const xr=t=>{let e=t?new globalThis.Uint8Array(t):new globalThis.Uint8Array(512),r=Qe.orThrow(t?t.length:0);return{getCapacity:()=>Qe.orThrow(e.length),getLength:()=>r,extend:s=>{const a=r+s.length;if(e.length<a){const h=e,g=Math.max(e.length*2,a);e=new globalThis.Uint8Array(g),e.set(h)}e.set(s,r),r=Qe.orThrow(r+s.length)},shift:()=>{if(r===0)throw new To("Buffer parse ended prematurely");const s=e[0];return e=e.subarray(1),r--,Qe.orThrow(s)},shiftN:s=>{if(r<s)throw new To("Buffer parse ended prematurely");const a=e.subarray(0,s);return e=e.subarray(s),r=Qe.orThrow(r-s),a},truncate:s=>{if(s>r)throw new To("Cannot truncate to a length greater than current");r=s},reset:()=>{r=Qe.orThrow(0)},unwrap:()=>e.subarray(0,r)}},Rh=t=>{const e=new Map;return{has:r=>e.has(r),get:r=>{const n=e.get(r);if(n!==void 0)return e.delete(r),e.set(r,n),n},set:(r,n)=>{if(e.has(r))e.delete(r);else if(e.size===t){const s=e.keys().next().value;e.delete(s)}e.set(r,n)},delete:r=>{e.delete(r)},map:e}},Wh=(t={})=>{const e={enabled:t.enableLogging??!1,log:(...r)=>{e.enabled&&console.log(...r)},info:(...r)=>{e.enabled&&console.info(...r)},warn:(...r)=>{e.enabled&&console.warn(...r)},error:(...r)=>{console.error(...r)},debug:(...r)=>{e.enabled&&console.debug(...r)},time:r=>{e.enabled&&console.time(r)},timeLog:(r,...n)=>{e.enabled&&console.timeLog(r,...n)},timeEnd:r=>{e.enabled&&console.timeEnd(r)},dir:(r,n)=>{e.enabled&&console.dir(r,n)},table:(r,n)=>{e.enabled&&console.table(r,n)},count:r=>{e.enabled&&console.count(r)},countReset:r=>{e.enabled&&console.countReset(r)},assert:(r,n,...s)=>{e.enabled&&console.assert(r,n,...s)},trace:(r,...n)=>{e.enabled&&console.trace(r,...n)}};return e},Xl=t=>Uint8Array.from(t.split(""),e=>e.charCodeAt(0)),Dh=Xl("expand 16-byte k"),Mh=Xl("expand 32-byte k"),Uh=jr(Dh),Bh=jr(Mh);function De(t,e){return t<<e|t>>>32-e}function Io(t){return t.byteOffset%4===0}const ys=64,$h=16,Yl=2**32-1,Zl=Uint32Array.of();function jh(t,e,r,n,s,a,h,g){const w=s.length,q=new Uint8Array(ys),k=jr(q),N=Io(s)&&Io(a),C=N?jr(s):Zl,z=N?jr(a):Zl;for(let V=0;V<w;h++){if(t(e,r,n,k,h,g),h>=Yl)throw new Error("arx: counter overflow");const Z=Math.min(ys,w-V);if(N&&Z===ys){const ge=V/4;if(V%4!==0)throw new Error("arx: invalid block position");for(let Ee=0,Ue;Ee<$h;Ee++)Ue=ge+Ee,z[Ue]=C[Ue]^k[Ee];V+=ys;continue}for(let ge=0,Ee;ge<Z;ge++)Ee=V+ge,a[Ee]=s[Ee]^q[ge];V+=Z}}function zh(t,e){const{allowShortKeys:r,extendNonceFn:n,counterLength:s,counterRight:a,rounds:h}=ld({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},e);if(typeof t!="function")throw new Error("core must be a function");return io(s),io(h),no(a),no(r),(g,w,q,k,N=0)=>{Dt(g,void 0,"key"),Dt(w,void 0,"nonce"),Dt(q,void 0,"data");const C=q.length;if(k===void 0&&(k=new Uint8Array(C)),Dt(k,void 0,"output"),io(N),N<0||N>=Yl)throw new Error("arx: counter overflow");if(k.length<C)throw new Error(`arx: output (${k.length}) is shorter than data (${C})`);const z=[];let V=g.length,Z,ge;if(V===32)z.push(Z=Ki(g)),ge=Bh;else if(V===16&&r)Z=new Uint8Array(32),Z.set(g),Z.set(g,16),ge=Uh,z.push(Z);else throw Dt(g,32,"arx key"),new Error("invalid key size");Io(w)||z.push(w=Ki(w));const Ee=jr(Z);if(n){if(w.length!==24)throw new Error("arx: extended nonce must be 24 bytes");n(ge,Ee,jr(w.subarray(0,16)),Ee),w=w.subarray(16)}const Ue=16-s;if(Ue!==w.length)throw new Error(`arx: nonce must be ${Ue} or 16 bytes`);if(Ue!==12){const Ie=new Uint8Array(12);Ie.set(w,a?0:12-w.length),w=Ie,z.push(w)}const Re=jr(w);return jh(t,ge,Ee,Re,q,k,N,h),Mn(...z),k}}function Mt(t,e){return t[e++]&255|(t[e++]&255)<<8}class Vh{blockLen=16;outputLen=16;buffer=new Uint8Array(16);r=new Uint16Array(10);h=new Uint16Array(10);pad=new Uint16Array(8);pos=0;finished=!1;constructor(e){e=Ki(Dt(e,32,"key"));const r=Mt(e,0),n=Mt(e,2),s=Mt(e,4),a=Mt(e,6),h=Mt(e,8),g=Mt(e,10),w=Mt(e,12),q=Mt(e,14);this.r[0]=r&8191,this.r[1]=(r>>>13|n<<3)&8191,this.r[2]=(n>>>10|s<<6)&7939,this.r[3]=(s>>>7|a<<9)&8191,this.r[4]=(a>>>4|h<<12)&255,this.r[5]=h>>>1&8190,this.r[6]=(h>>>14|g<<2)&8191,this.r[7]=(g>>>11|w<<5)&8065,this.r[8]=(w>>>8|q<<8)&8191,this.r[9]=q>>>5&127;for(let k=0;k<8;k++)this.pad[k]=Mt(e,16+2*k)}process(e,r,n=!1){const s=n?0:2048,{h:a,r:h}=this,g=h[0],w=h[1],q=h[2],k=h[3],N=h[4],C=h[5],z=h[6],V=h[7],Z=h[8],ge=h[9],Ee=Mt(e,r+0),Ue=Mt(e,r+2),Re=Mt(e,r+4),Ie=Mt(e,r+6),ot=Mt(e,r+8),at=Mt(e,r+10),Ce=Mt(e,r+12),$e=Mt(e,r+14);let Be=a[0]+(Ee&8191),Ye=a[1]+((Ee>>>13|Ue<<3)&8191),rt=a[2]+((Ue>>>10|Re<<6)&8191),et=a[3]+((Re>>>7|Ie<<9)&8191),M=a[4]+((Ie>>>4|ot<<12)&8191),pe=a[5]+(ot>>>1&8191),oe=a[6]+((ot>>>14|at<<2)&8191),ne=a[7]+((at>>>11|Ce<<5)&8191),se=a[8]+((Ce>>>8|$e<<8)&8191),Oe=a[9]+($e>>>5|s),he=0,Se=he+Be*g+Ye*(5*ge)+rt*(5*Z)+et*(5*V)+M*(5*z);he=Se>>>13,Se&=8191,Se+=pe*(5*C)+oe*(5*N)+ne*(5*k)+se*(5*q)+Oe*(5*w),he+=Se>>>13,Se&=8191;let je=he+Be*w+Ye*g+rt*(5*ge)+et*(5*Z)+M*(5*V);he=je>>>13,je&=8191,je+=pe*(5*z)+oe*(5*C)+ne*(5*N)+se*(5*k)+Oe*(5*q),he+=je>>>13,je&=8191;let ze=he+Be*q+Ye*w+rt*g+et*(5*ge)+M*(5*Z);he=ze>>>13,ze&=8191,ze+=pe*(5*V)+oe*(5*z)+ne*(5*C)+se*(5*N)+Oe*(5*k),he+=ze>>>13,ze&=8191;let Et=he+Be*k+Ye*q+rt*w+et*g+M*(5*ge);he=Et>>>13,Et&=8191,Et+=pe*(5*Z)+oe*(5*V)+ne*(5*z)+se*(5*C)+Oe*(5*N),he+=Et>>>13,Et&=8191;let Bt=he+Be*N+Ye*k+rt*q+et*w+M*g;he=Bt>>>13,Bt&=8191,Bt+=pe*(5*ge)+oe*(5*Z)+ne*(5*V)+se*(5*z)+Oe*(5*C),he+=Bt>>>13,Bt&=8191;let Gt=he+Be*C+Ye*N+rt*k+et*q+M*w;he=Gt>>>13,Gt&=8191,Gt+=pe*g+oe*(5*ge)+ne*(5*Z)+se*(5*V)+Oe*(5*z),he+=Gt>>>13,Gt&=8191;let pn=he+Be*z+Ye*C+rt*N+et*k+M*q;he=pn>>>13,pn&=8191,pn+=pe*w+oe*g+ne*(5*ge)+se*(5*Z)+Oe*(5*V),he+=pn>>>13,pn&=8191;let mn=he+Be*V+Ye*z+rt*C+et*N+M*k;he=mn>>>13,mn&=8191,mn+=pe*q+oe*w+ne*g+se*(5*ge)+Oe*(5*Z),he+=mn>>>13,mn&=8191;let _n=he+Be*Z+Ye*V+rt*z+et*C+M*N;he=_n>>>13,_n&=8191,_n+=pe*k+oe*q+ne*w+se*g+Oe*(5*ge),he+=_n>>>13,_n&=8191;let gn=he+Be*ge+Ye*Z+rt*V+et*z+M*C;he=gn>>>13,gn&=8191,gn+=pe*N+oe*k+ne*q+se*w+Oe*g,he+=gn>>>13,gn&=8191,he=(he<<2)+he|0,he=he+Se|0,Se=he&8191,he=he>>>13,je+=he,a[0]=Se,a[1]=je,a[2]=ze,a[3]=Et,a[4]=Bt,a[5]=Gt,a[6]=pn,a[7]=mn,a[8]=_n,a[9]=gn}finalize(){const{h:e,pad:r}=this,n=new Uint16Array(10);let s=e[1]>>>13;e[1]&=8191;for(let g=2;g<10;g++)e[g]+=s,s=e[g]>>>13,e[g]&=8191;e[0]+=s*5,s=e[0]>>>13,e[0]&=8191,e[1]+=s,s=e[1]>>>13,e[1]&=8191,e[2]+=s,n[0]=e[0]+5,s=n[0]>>>13,n[0]&=8191;for(let g=1;g<10;g++)n[g]=e[g]+s,s=n[g]>>>13,n[g]&=8191;n[9]-=8192;let a=(s^1)-1;for(let g=0;g<10;g++)n[g]&=a;a=~a;for(let g=0;g<10;g++)e[g]=e[g]&a|n[g];e[0]=(e[0]|e[1]<<13)&65535,e[1]=(e[1]>>>3|e[2]<<10)&65535,e[2]=(e[2]>>>6|e[3]<<7)&65535,e[3]=(e[3]>>>9|e[4]<<4)&65535,e[4]=(e[4]>>>12|e[5]<<1|e[6]<<14)&65535,e[5]=(e[6]>>>2|e[7]<<11)&65535,e[6]=(e[7]>>>5|e[8]<<8)&65535,e[7]=(e[8]>>>8|e[9]<<5)&65535;let h=e[0]+r[0];e[0]=h&65535;for(let g=1;g<8;g++)h=(e[g]+r[g]|0)+(h>>>16)|0,e[g]=h&65535;Mn(n)}update(e){La(this),Dt(e),e=Ki(e);const{buffer:r,blockLen:n}=this,s=e.length;for(let a=0;a<s;){const h=Math.min(n-this.pos,s-a);if(h===n){for(;n<=s-a;a+=n)this.process(e,a);continue}r.set(e.subarray(a,a+h),this.pos),this.pos+=h,a+=h,this.pos===n&&(this.process(r,0,!1),this.pos=0)}return this}destroy(){Mn(this.h,this.r,this.buffer,this.pad)}digestInto(e){La(this),td(e,this),this.finished=!0;const{buffer:r,h:n}=this;let{pos:s}=this;if(s){for(r[s++]=1;s<16;s++)r[s]=0;this.process(r,0,!0)}this.finalize();let a=0;for(let h=0;h<8;h++)e[a++]=n[h]>>>0,e[a++]=n[h]>>>8;return e}digest(){const{buffer:e,outputLen:r}=this;this.digestInto(e);const n=e.slice(0,r);return this.destroy(),n}}function Qh(t){const e=(n,s)=>t(s).update(n).digest(),r=t(new Uint8Array(32));return e.outputLen=r.outputLen,e.blockLen=r.blockLen,e.create=n=>t(n),e}const Hh=Qh(t=>new Vh(t));function Jh(t,e,r,n,s,a=20){let h=t[0],g=t[1],w=t[2],q=t[3],k=e[0],N=e[1],C=e[2],z=e[3],V=e[4],Z=e[5],ge=e[6],Ee=e[7],Ue=s,Re=r[0],Ie=r[1],ot=r[2],at=h,Ce=g,$e=w,Be=q,Ye=k,rt=N,et=C,M=z,pe=V,oe=Z,ne=ge,se=Ee,Oe=Ue,he=Re,Se=Ie,je=ot;for(let Et=0;Et<a;Et+=2)at=at+Ye|0,Oe=De(Oe^at,16),pe=pe+Oe|0,Ye=De(Ye^pe,12),at=at+Ye|0,Oe=De(Oe^at,8),pe=pe+Oe|0,Ye=De(Ye^pe,7),Ce=Ce+rt|0,he=De(he^Ce,16),oe=oe+he|0,rt=De(rt^oe,12),Ce=Ce+rt|0,he=De(he^Ce,8),oe=oe+he|0,rt=De(rt^oe,7),$e=$e+et|0,Se=De(Se^$e,16),ne=ne+Se|0,et=De(et^ne,12),$e=$e+et|0,Se=De(Se^$e,8),ne=ne+Se|0,et=De(et^ne,7),Be=Be+M|0,je=De(je^Be,16),se=se+je|0,M=De(M^se,12),Be=Be+M|0,je=De(je^Be,8),se=se+je|0,M=De(M^se,7),at=at+rt|0,je=De(je^at,16),ne=ne+je|0,rt=De(rt^ne,12),at=at+rt|0,je=De(je^at,8),ne=ne+je|0,rt=De(rt^ne,7),Ce=Ce+et|0,Oe=De(Oe^Ce,16),se=se+Oe|0,et=De(et^se,12),Ce=Ce+et|0,Oe=De(Oe^Ce,8),se=se+Oe|0,et=De(et^se,7),$e=$e+M|0,he=De(he^$e,16),pe=pe+he|0,M=De(M^pe,12),$e=$e+M|0,he=De(he^$e,8),pe=pe+he|0,M=De(M^pe,7),Be=Be+Ye|0,Se=De(Se^Be,16),oe=oe+Se|0,Ye=De(Ye^oe,12),Be=Be+Ye|0,Se=De(Se^Be,8),oe=oe+Se|0,Ye=De(Ye^oe,7);let ze=0;n[ze++]=h+at|0,n[ze++]=g+Ce|0,n[ze++]=w+$e|0,n[ze++]=q+Be|0,n[ze++]=k+Ye|0,n[ze++]=N+rt|0,n[ze++]=C+et|0,n[ze++]=z+M|0,n[ze++]=V+pe|0,n[ze++]=Z+oe|0,n[ze++]=ge+ne|0,n[ze++]=Ee+se|0,n[ze++]=Ue+Oe|0,n[ze++]=Re+he|0,n[ze++]=Ie+Se|0,n[ze++]=ot+je|0}function Kh(t,e,r,n){let s=t[0],a=t[1],h=t[2],g=t[3],w=e[0],q=e[1],k=e[2],N=e[3],C=e[4],z=e[5],V=e[6],Z=e[7],ge=r[0],Ee=r[1],Ue=r[2],Re=r[3];for(let ot=0;ot<20;ot+=2)s=s+w|0,ge=De(ge^s,16),C=C+ge|0,w=De(w^C,12),s=s+w|0,ge=De(ge^s,8),C=C+ge|0,w=De(w^C,7),a=a+q|0,Ee=De(Ee^a,16),z=z+Ee|0,q=De(q^z,12),a=a+q|0,Ee=De(Ee^a,8),z=z+Ee|0,q=De(q^z,7),h=h+k|0,Ue=De(Ue^h,16),V=V+Ue|0,k=De(k^V,12),h=h+k|0,Ue=De(Ue^h,8),V=V+Ue|0,k=De(k^V,7),g=g+N|0,Re=De(Re^g,16),Z=Z+Re|0,N=De(N^Z,12),g=g+N|0,Re=De(Re^g,8),Z=Z+Re|0,N=De(N^Z,7),s=s+q|0,Re=De(Re^s,16),V=V+Re|0,q=De(q^V,12),s=s+q|0,Re=De(Re^s,8),V=V+Re|0,q=De(q^V,7),a=a+k|0,ge=De(ge^a,16),Z=Z+ge|0,k=De(k^Z,12),a=a+k|0,ge=De(ge^a,8),Z=Z+ge|0,k=De(k^Z,7),h=h+N|0,Ee=De(Ee^h,16),C=C+Ee|0,N=De(N^C,12),h=h+N|0,Ee=De(Ee^h,8),C=C+Ee|0,N=De(N^C,7),g=g+w|0,Ue=De(Ue^g,16),z=z+Ue|0,w=De(w^z,12),g=g+w|0,Ue=De(Ue^g,8),z=z+Ue|0,w=De(w^z,7);let Ie=0;n[Ie++]=s,n[Ie++]=a,n[Ie++]=h,n[Ie++]=g,n[Ie++]=ge,n[Ie++]=Ee,n[Ie++]=Ue,n[Ie++]=Re}const Gh=zh(Jh,{counterRight:!1,counterLength:8,extendNonceFn:Kh,allowShortKeys:!1}),Xh=new Uint8Array(16),ec=(t,e)=>{t.update(e);const r=e.length%16;r&&t.update(Xh.subarray(r))},Yh=new Uint8Array(32);function tc(t,e,r,n,s){s!==void 0&&Dt(s,void 0,"AAD");const a=t(e,r,Yh),h=dd(n.length,s?s.length:0,!0),g=Hh.create(a);s&&ec(g,s),ec(g,n),g.update(h);const w=g.digest();return Mn(a,h),w}const rc=ud({blockSize:64,nonceLength:24,tagLength:16},(t=>(e,r,n)=>({encrypt(a,h){const g=a.length;h=Da(g+16,h,!1),h.set(a);const w=h.subarray(0,-16);t(e,r,w,w,1);const q=tc(t,e,r,w,n);return h.set(q,g),Mn(q),h},decrypt(a,h){h=Da(a.length-16,h,!1);const g=a.subarray(0,-16),w=a.subarray(-16),q=tc(t,e,r,g,n);if(!cd(w,q))throw new Error("invalid tag");return h.set(a.subarray(0,-16)),t(e,r,h,h,1),Mn(q),h}}))(Gh)),Co=it("Entropy",us),Zh=fs(16)(Co),nc=fs(32)(Co);fs(64)(Co);const ic=()=>({create:_d}),Po=(t,e)=>{let r=ao(Ka,Ua("Symmetric key seed"),t);for(const n of e){const s=typeof n=="number"?n.toString():n;r=ep(s,r)}return r.slice(32,64)},ep=(t,e)=>{const r=Ua(t),n=new globalThis.Uint8Array(r.byteLength+1);return n[0]=0,n.set(r,1),ao(Ka,e.slice(0,32),n)},tp=it("EncryptionKey",nc),rp=t=>{const e=Qe.orThrow(24);return{nonceLength:e,encrypt:(n,s)=>{const a=t.randomBytes.create(e),h=rc(s,a).encrypt(n);return{nonce:a,ciphertext:h}},decrypt:(n,s,a)=>bn(()=>rc(s,a).decrypt(n),h=>({type:"SymmetricCryptoDecryptError",error:h}))}},np=t=>{if(t<=0)return Qe.orThrow(0);const e=31-Math.clz32(t>>>0),r=32-Math.clz32(e>>>0),s=(1<<Math.max(0,e-r))-1;return Qe.orThrow(t+s&~s)},ip=t=>{const e=np(t),r=Qe.orThrow(e-t);return new globalThis.Uint8Array(r)},sc=(t,e)=>t===e,sp=sc,Lo=sc,oc=(t=>(e,r)=>{if(e===r)return!0;if(e.length!==r.length)return!1;for(let n=0;n<e.length;n++)if(!t(e[n],r[n]))return!1;return!0})(Lo),op=t=>(e,r)=>{if(e===r)return!0;for(const n in t)if(!t[n](e[n],r[n]))return!1;return!0},Qn=t=>{const e=r=>Object.getOwnPropertyNames(r).reduce((s,a)=>{const h=r[a];return a==="cause"&&h instanceof Error?s[a]=e(h):typeof h!="function"&&(s[a]=h),s},{});if(t instanceof Error)return{type:"TransferableError",error:e(t)};try{return{type:"TransferableError",error:structuredClone(t)}}catch{try{return{type:"TransferableError",error:String(t)}}catch{return{type:"TransferableError",error:"[Unserializable Object]"}}}};function f0(t){return t}const ap=()=>!0,ac=()=>!1,lp=gs(ko,Ct,wn,us),cp=(t,e)=>t instanceof globalThis.Uint8Array&&e instanceof globalThis.Uint8Array?oc(t,e):t===e,up=t=>async(e,r)=>pf(async()=>{const n=await t.createSqliteDriver(e,r);let s=!1;const a=()=>bn(()=>{t.console?.log("[sql] rollback"),n.exec(Pe`rollback;`,!0)},Fo);return{exec:g=>bn(()=>{t.console?.log("[sql]",{query:g});const w=dp(g,()=>n.exec(g,hp(g.sql)));return t.console?.log("[sql]",{result:w}),w},w=>({type:"SqliteError",error:Qn(w)})),transaction:g=>{const w=bn(()=>{t.console?.log("[sql] begin"),n.exec(Pe`begin;`,!0);const q=g();return q.ok&&(t.console?.log("[sql] commit"),n.exec(Pe`commit;`,!0)),q},Fo);if(!w.ok){const q=a();return q.ok?w:(t.console?.log("[sql] rollback failed",q.error),we({type:"SqliteError",error:w.error.error,rollbackError:q.error.error}))}if(!w.value.ok){const q=a();return q.ok?w.value:(t.console?.log("[sql] rollback failed",q.error),we({type:"SqliteError",error:Qn(w.value.error),rollbackError:q.error.error}))}return ue(w.value.value)},export:()=>bn(()=>n.export(),g=>({type:"SqliteError",error:Qn(g)})),[Symbol.dispose]:()=>{s||(s=!0,n[Symbol.dispose]())}}},Fo),Fo=t=>({type:"SqliteError",error:Qn(t)}),dp=(t,e)=>{if(!t.options?.logQueryExecutionTime)return e();const r=performance.now(),n=e(),s=performance.now()-r;return console.log(`SqliteQueryExecutionTime: ${s.toString()}ms`,t),n},fp=(t,e)=>{let r=!1;const n=new Map;return{get:(s,a)=>{if(a!==!0&&!s.options?.prepare)return null;let h=n.get(s.sql);return h||(h=t(s.sql),n.set(s.sql,h)),h},[Symbol.dispose]:()=>{r||(r=!0,n.forEach(e),n.clear())}}},Pe=(t,...e)=>{let r="";const n=[];for(let s=0;s<t.length;s++)if(r+=t[s],s<e.length){const a=e[s];typeof a=="object"&&a!=null&&"type"in a?r+=a.sql:(r+="?",n.push(a))}return{sql:r,parameters:n}};Pe.identifier=t=>({type:"SqlIdentifier",sql:`"${t.replace(/"/g,'""')}"`}),Pe.raw=t=>({type:"RawSql",sql:t}),Pe.prepared=(t,...e)=>({...Pe(t,...e),options:{prepare:!0}});const hp=t=>{const e=lc.get(t);if(e!==void 0)return e;const r=pp.test(mp(t));return lc.set(t,r),r},lc=Rh(Xt.orThrow(1e4)),pp=new RegExp(`\\b(${["alter","create","delete","drop","insert","replace","update","begin","commit","rollback","pragma","vacuum"].join("|")})\\b`,"i"),mp=t=>{if(!t.includes("--"))return t;let e="",r=0;for(;r<t.length;)if(r<t.length-1&&t[r]==="-"&&t[r+1]==="-"){for(r+=2;r<t.length&&t[r]!==`
`;)r++;r<t.length&&t[r]===`
`&&(e+=`
`,r++)}else e+=t[r],r++;return e},_p=t=>e=>{const r=t.sqlite.exec({...e,sql:`EXPLAIN QUERY PLAN ${e.sql}`});return r.ok?(console.log("[explainSqliteQueryPlan]",e),console.log(gp(r.value.rows)),ue()):r},gp=t=>t.map(e=>{let r=e.parent,n=0;do{const s=t.find(a=>a.id===r);if(!s)break;r=s.parent,n++}while(!0);return`${"  ".repeat(n)}${e.detail}`}).join(`
`),cc=gs(0,1),uc=1,yp=0,bp=t=>t?uc:yp,wp=t=>t===uc,Np=({init:t,onMessage:e})=>{let r=null,n=null;const s=[];let a=!1;const h=k=>{Qt(r!=null,"The onMessage wasn't set"),r(k)},g=k=>{h({type:"onError",error:Qn(k)})},w=k=>(...N)=>{try{k(...N)}catch(C){g(C)}};return{postMessage:k=>{if(k.type!=="init"){n?w(e(n))(k):s.push(k);return}a||(a=!0,t(k,h,w).then(N=>{if(N!=null){n=N;for(const C of s)w(e(n))(C);s.length=0}}).catch(g))},onMessage:k=>{r=k}}},xp=({init:t,handlers:e})=>Np({init:t,onMessage:r=>n=>{const s=n.type,a=e[s];a(r)(n)}}),vp=it("OwnerId",Ao),qp=it("OwnerIdBytes",Qf),bs=t=>ps(t),ws=t=>ms(t);Qe.orThrow(16);const Sp=it("OwnerEncryptionKey",tp),kp=it("OwnerWriteKey",Zh);it("OwnerSecret",nc);const Ep=t=>t.randomBytes.create(32),Ap=t=>Qd(t,fo),Op=t=>rl(t,fo),Tp=t=>({id:ws(qp.orThrow(Po(t,["Evolu","OwnerIdBytes"]).slice(0,16))),encryptionKey:Sp.orThrow(Po(t,["Evolu","OwnerEncryptionKey"])),writeKey:kp.orThrow(Po(t,["Evolu","OwnerWriteKey"]).slice(0,16))}),dc=t=>({...Tp(t),type:"AppOwner",mnemonic:Ap(t)}),Ip=t=>t+1,Cp=t=>t-1,Pp=(t,e=Xt.orThrow(16),r=Xt.orThrow(2))=>{const n=e*r;if(t<n)return we(Xt.orThrow(n));const s=[],a=Math.floor(t/e),h=t%e;let g=0;for(let w=0;w<e;w++){const q=w<h,k=a+(q?1:0);g+=k,s.push(Xt.orThrow(g))}return ro(s),ue(s)};function Yr(t){return typeof t>"u"||t===void 0}function zt(t){return typeof t=="string"}function Ns(t){return typeof t=="number"}function xs(t){return typeof t=="boolean"}function Ro(t){return t===null}function Lp(t){return t instanceof Date}function Wo(t){return typeof t=="bigint"}function Yt(t){return typeof t=="function"}function fr(t){return typeof t=="object"&&t!==null}function p(t){return Object.freeze(t)}function vs(t){return Ir(t)?t:[t]}function Ir(t){return Array.isArray(t)}function Zt(t){return t}const lt=p({is(t){return t.kind==="AlterTableNode"},create(t){return p({kind:"AlterTableNode",table:t})},cloneWithTableProps(t,e){return p({...t,...e})},cloneWithColumnAlteration(t,e){return p({...t,columnAlterations:t.columnAlterations?[...t.columnAlterations,e]:[e]})}}),_t=p({is(t){return t.kind==="IdentifierNode"},create(t){return p({kind:"IdentifierNode",name:t})}}),Cr=p({is(t){return t.kind==="CreateIndexNode"},create(t){return p({kind:"CreateIndexNode",name:_t.create(t)})},cloneWith(t,e){return p({...t,...e})},cloneWithColumns(t,e){return p({...t,columns:[...t.columns||[],...e]})}}),fc=p({is(t){return t.kind==="CreateSchemaNode"},create(t,e){return p({kind:"CreateSchemaNode",schema:_t.create(t),...e})},cloneWith(t,e){return p({...t,...e})}}),Fp=["preserve rows","delete rows","drop"],er=p({is(t){return t.kind==="CreateTableNode"},create(t){return p({kind:"CreateTableNode",table:t,columns:p([])})},cloneWithColumn(t,e){return p({...t,columns:p([...t.columns,e])})},cloneWithConstraint(t,e){return p({...t,constraints:t.constraints?p([...t.constraints,e]):p([e])})},cloneWithFrontModifier(t,e){return p({...t,frontModifiers:t.frontModifiers?p([...t.frontModifiers,e]):p([e])})},cloneWithEndModifier(t,e){return p({...t,endModifiers:t.endModifiers?p([...t.endModifiers,e]):p([e])})},cloneWith(t,e){return p({...t,...e})}}),Pr=p({is(t){return t.kind==="SchemableIdentifierNode"},create(t){return p({kind:"SchemableIdentifierNode",identifier:_t.create(t)})},createWithSchema(t,e){return p({kind:"SchemableIdentifierNode",schema:_t.create(t),identifier:_t.create(e)})}}),Ni=p({is(t){return t.kind==="DropIndexNode"},create(t,e){return p({kind:"DropIndexNode",name:Pr.create(t),...e})},cloneWith(t,e){return p({...t,...e})}}),Do=p({is(t){return t.kind==="DropSchemaNode"},create(t,e){return p({kind:"DropSchemaNode",schema:_t.create(t),...e})},cloneWith(t,e){return p({...t,...e})}}),Mo=p({is(t){return t.kind==="DropTableNode"},create(t,e){return p({kind:"DropTableNode",table:t,...e})},cloneWith(t,e){return p({...t,...e})}}),Zr=p({is(t){return t.kind==="AliasNode"},create(t,e){return p({kind:"AliasNode",node:t,alias:e})}}),Lr=p({is(t){return t.kind==="TableNode"},create(t){return p({kind:"TableNode",table:Pr.create(t)})},createWithSchema(t,e){return p({kind:"TableNode",table:Pr.createWithSchema(t,e)})}});function tr(t){return fr(t)&&Yt(t.toOperationNode)}function hc(t){return fr(t)&&"expressionType"in t&&tr(t)}function Rp(t){return fr(t)&&"expression"in t&&zt(t.alias)&&tr(t)}const Fr=p({is(t){return t.kind==="SelectModifierNode"},create(t,e){return p({kind:"SelectModifierNode",modifier:t,of:e})},createWithExpression(t){return p({kind:"SelectModifierNode",rawModifier:t})}}),en=p({is(t){return t.kind==="AndNode"},create(t,e){return p({kind:"AndNode",left:t,right:e})}}),Hn=p({is(t){return t.kind==="OrNode"},create(t,e){return p({kind:"OrNode",left:t,right:e})}}),Uo=p({is(t){return t.kind==="OnNode"},create(t){return p({kind:"OnNode",on:t})},cloneWithOperation(t,e,r){return p({...t,on:e==="And"?en.create(t.on,r):Hn.create(t.on,r)})}}),xn=p({is(t){return t.kind==="JoinNode"},create(t,e){return p({kind:"JoinNode",joinType:t,table:e,on:void 0})},createWithOn(t,e,r){return p({kind:"JoinNode",joinType:t,table:e,on:Uo.create(r)})},cloneWithOn(t,e){return p({...t,on:t.on?Uo.cloneWithOperation(t.on,"And",e):Uo.create(e)})}}),Jn=p({is(t){return t.kind==="BinaryOperationNode"},create(t,e,r){return p({kind:"BinaryOperationNode",leftOperand:t,operator:e,rightOperand:r})}}),Wp=["=","==","!=","<>",">",">=","<","<=","in","not in","is","is not","like","not like","match","ilike","not ilike","@>","<@","^@","&&","?","?&","?|","!<","!>","<=>","!~","~","~*","!~*","@@","@@@","!!","<->","regexp","is distinct from","is not distinct from"],Dp=["+","-","*","/","%","^","&","|","#","<<",">>"],pc=["->","->>"],Mp=[...Wp,...Dp,"&&","||"],Up=["not","-",...["exists","not exists"]],Bp=[...Mp,...pc,...Up,"between","between symmetric"],tn=p({is(t){return t.kind==="OperatorNode"},create(t){return p({kind:"OperatorNode",operator:t})}});function mc(t){return zt(t)&&pc.includes(t)}const Ot=p({is(t){return t.kind==="ColumnNode"},create(t){return p({kind:"ColumnNode",column:_t.create(t)})}}),Bo=p({is(t){return t.kind==="SelectAllNode"},create(){return p({kind:"SelectAllNode"})}}),qs=p({is(t){return t.kind==="ReferenceNode"},create(t,e){return p({kind:"ReferenceNode",table:e,column:t})},createSelectAll(t){return p({kind:"ReferenceNode",table:t,column:Bo.create()})}});class $p{#e;get dynamicReference(){return this.#e}get refType(){}constructor(e){this.#e=e}toOperationNode(){return Nc(this.#e)}}function _c(t){return fr(t)&&tr(t)&&zt(t.dynamicReference)}const Rr=p({is(t){return t.kind==="OrderByItemNode"},create(t,e){return p({kind:"OrderByItemNode",orderBy:t,direction:e})},cloneWith(t,e){return p({...t,...e})}}),rr=p({is(t){return t.kind==="RawNode"},create(t,e){return p({kind:"RawNode",sqlFragments:p(t),parameters:p(e)})},createWithSql(t){return rr.create([t],[])},createWithChild(t){return rr.create(["",""],[t])},createWithChildren(t){return rr.create(new Array(t.length+1).fill(""),t)}}),jp={is(t){return t.kind==="CollateNode"},create(t){return p({kind:"CollateNode",collation:_t.create(t)})}};class vn{#e;constructor(e){this.#e=p(e)}desc(){return new vn({node:Rr.cloneWith(this.#e.node,{direction:rr.createWithSql("desc")})})}asc(){return new vn({node:Rr.cloneWith(this.#e.node,{direction:rr.createWithSql("asc")})})}nullsLast(){return new vn({node:Rr.cloneWith(this.#e.node,{nulls:"last"})})}nullsFirst(){return new vn({node:Rr.cloneWith(this.#e.node,{nulls:"first"})})}collate(e){return new vn({node:Rr.cloneWith(this.#e.node,{collation:jp.create(e)})})}toOperationNode(){return this.#e.node}}const gc=new Set;function Kn(t){gc.has(t)||(gc.add(t),console.log(t))}function yc(t){return t==="asc"||t==="desc"}function qn(t){if(t.length===2)return[$o(t[0],t[1])];if(t.length===1){const[e]=t;return Array.isArray(e)?(Kn("orderBy(array) is deprecated, use multiple orderBy calls instead."),e.map(r=>$o(r))):[$o(e)]}throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${t.length}`)}function $o(t,e){const r=zp(t);if(Rr.is(r)){if(e)throw new Error("Cannot specify direction twice!");return r}return bc(r,e)}function zp(t){if(Pi(t))return En(t);if(_c(t))return t.toOperationNode();const[e,r]=t.split(" ");return r?(Kn("`orderBy('column asc')` is deprecated. Use `orderBy('column', 'asc')` instead."),bc(rn(e),r)):rn(t)}function bc(t,e){if(typeof e=="string"){if(!yc(e))throw new Error(`Invalid order by direction: ${e}`);return Rr.create(t,rr.createWithSql(e))}if(hc(e))return Kn("`orderBy(..., expr)` is deprecated. Use `orderBy(..., 'asc')` or `orderBy(..., (ob) => ...)` instead."),Rr.create(t,e.toOperationNode());const r=Rr.create(t);return e?e(new vn({node:r})).toOperationNode():r}const Ss=p({is(t){return t.kind==="JSONReferenceNode"},create(t,e){return p({kind:"JSONReferenceNode",reference:t,traversal:e})},cloneWithTraversal(t,e){return p({...t,traversal:e})}}),wc=p({is(t){return t.kind==="JSONOperatorChainNode"},create(t){return p({kind:"JSONOperatorChainNode",operator:t,values:p([])})},cloneWithValue(t,e){return p({...t,values:p([...t.values,e])})}}),xi=p({is(t){return t.kind==="JSONPathNode"},create(t){return p({kind:"JSONPathNode",inOperator:t,pathLegs:p([])})},cloneWithLeg(t,e){return p({...t,pathLegs:p([...t.pathLegs,e])})}});function Nc(t){return zt(t)?rn(t):t.toOperationNode()}function vi(t){return Ir(t)?t.map(e=>nr(e)):[nr(t)]}function nr(t){return Pi(t)?En(t):Nc(t)}function Vp(t,e){const r=rn(t);if(mc(e))return Ss.create(r,wc.create(tn.create(e)));const n=e.slice(0,-1);if(mc(n))return Ss.create(r,xi.create(tn.create(n)));throw new Error(`Invalid JSON operator: ${e}`)}function rn(t){if(!t.includes("."))return qs.create(Ot.create(t));const r=t.split(".").map(jo);if(r.length===3)return Hp(r);if(r.length===2)return Jp(r);throw new Error(`invalid column reference ${t}`)}function Qp(t){const e=" as ";if(t.includes(e)){const[r,n]=t.split(e).map(jo);return Zr.create(rn(r),_t.create(n))}else return rn(t)}function xc(t){return Ot.create(t)}function ks(t){if(t.includes(" ")){const[r,n]=t.split(" ").map(jo);if(!yc(n))throw new Error(`invalid order direction "${n}" next to "${r}"`);return qn([r,n])[0]}else return xc(t)}function Hp(t){const[e,r,n]=t;return qs.create(Ot.create(n),Lr.createWithSchema(e,r))}function Jp(t){const[e,r]=t;return qs.create(Ot.create(r),Lr.create(e))}function jo(t){return t.trim()}const vc=p({is(t){return t.kind==="PrimitiveValueListNode"},create(t){return p({kind:"PrimitiveValueListNode",values:p([...t])})}}),Es=p({is(t){return t.kind==="ValueListNode"},create(t){return p({kind:"ValueListNode",values:p(t)})}}),hr=p({is(t){return t.kind==="ValueNode"},create(t){return p({kind:"ValueNode",value:t})},createImmediate(t){return p({kind:"ValueNode",value:t,immediate:!0})}});function Kp(t){return Ir(t)?Gp(t):Rt(t)}function Rt(t){return Pi(t)?En(t):hr.create(t)}function zo(t){return Ns(t)||xs(t)||Ro(t)}function Vo(t){if(!zo(t))throw new Error(`unsafe immediate value ${JSON.stringify(t)}`);return hr.createImmediate(t)}function Gp(t){return t.some(Pi)?Es.create(t.map(e=>Rt(e))):vc.create(t)}const Wr=p({is(t){return t.kind==="ParensNode"},create(t){return p({kind:"ParensNode",node:t})}});function Ut(t){if(t.length===3)return Qo(t[0],t[1],t[2]);if(t.length===1)return Rt(t[0]);throw new Error(`invalid arguments: ${JSON.stringify(t)}`)}function Qo(t,e,r){return Xp(e)&&Sc(r)?Jn.create(nr(t),Ho(e),hr.createImmediate(r)):Jn.create(nr(t),Ho(e),Kp(r))}function vr(t,e,r){return Jn.create(nr(t),Ho(e),nr(r))}function qc(t,e){return As(Object.entries(t).filter(([,r])=>!Yr(r)).map(([r,n])=>Qo(r,Sc(n)?"is":"=",n)),e)}function As(t,e,r=!0){const n=e==="and"?en.create:Hn.create;if(t.length===0)return Jn.create(hr.createImmediate(1),tn.create("="),hr.createImmediate(e==="and"?1:0));let s=kc(t[0]);for(let a=1;a<t.length;++a)s=n(s,kc(t[a]));return t.length>1&&r?Wr.create(s):s}function Xp(t){return t==="is"||t==="is not"}function Sc(t){return Ro(t)||xs(t)}function Ho(t){if(zt(t)&&Bp.includes(t))return tn.create(t);if(tr(t))return t.toOperationNode();throw new Error(`invalid operator ${JSON.stringify(t)}`)}function kc(t){return tr(t)?t.toOperationNode():t}const Gn=p({is(t){return t.kind==="OrderByNode"},create(t){return p({kind:"OrderByNode",items:p([...t])})},cloneWithItems(t,e){return p({...t,items:p([...t.items,...e])})}}),Ec=p({is(t){return t.kind==="PartitionByNode"},create(t){return p({kind:"PartitionByNode",items:p(t)})},cloneWithItems(t,e){return p({...t,items:p([...t.items,...e])})}}),Jo=p({is(t){return t.kind==="OverNode"},create(){return p({kind:"OverNode"})},cloneWithOrderByItems(t,e){return p({...t,orderBy:t.orderBy?Gn.cloneWithItems(t.orderBy,e):Gn.create(e)})},cloneWithPartitionByItems(t,e){return p({...t,partitionBy:t.partitionBy?Ec.cloneWithItems(t.partitionBy,e):Ec.create(e)})}}),Os=p({is(t){return t.kind==="FromNode"},create(t){return p({kind:"FromNode",froms:p(t)})},cloneWithFroms(t,e){return p({...t,froms:p([...t.froms,...e])})}}),Ac=p({is(t){return t.kind==="GroupByNode"},create(t){return p({kind:"GroupByNode",items:p(t)})},cloneWithItems(t,e){return p({...t,items:p([...t.items,...e])})}}),Oc=p({is(t){return t.kind==="HavingNode"},create(t){return p({kind:"HavingNode",having:t})},cloneWithOperation(t,e,r){return p({...t,having:e==="And"?en.create(t.having,r):Hn.create(t.having,r)})}}),Wt=p({is(t){return t.kind==="InsertQueryNode"},create(t,e,r){return p({kind:"InsertQueryNode",into:t,...e&&{with:e},replace:r})},createWithoutInto(){return p({kind:"InsertQueryNode"})},cloneWith(t,e){return p({...t,...e})}}),Tc=p({is(t){return t.kind==="ListNode"},create(t){return p({kind:"ListNode",items:p(t)})}}),Xn=p({is(t){return t.kind==="UpdateQueryNode"},create(t,e){return p({kind:"UpdateQueryNode",table:t.length===1?t[0]:Tc.create(t),...e&&{with:e}})},createWithoutTable(){return p({kind:"UpdateQueryNode"})},cloneWithFromItems(t,e){return p({...t,from:t.from?Os.cloneWithFroms(t.from,e):Os.create(e)})},cloneWithUpdates(t,e){return p({...t,updates:t.updates?p([...t.updates,...e]):e})},cloneWithLimit(t,e){return p({...t,limit:e})}}),Ic=p({is(t){return t.kind==="UsingNode"},create(t){return p({kind:"UsingNode",tables:p(t)})},cloneWithTables(t,e){return p({...t,tables:p([...t.tables,...e])})}}),qi=p({is(t){return t.kind==="DeleteQueryNode"},create(t,e){return p({kind:"DeleteQueryNode",from:Os.create(t),...e&&{with:e}})},cloneWithOrderByItems:(t,e)=>Te.cloneWithOrderByItems(t,e),cloneWithoutOrderBy:t=>Te.cloneWithoutOrderBy(t),cloneWithLimit(t,e){return p({...t,limit:e})},cloneWithoutLimit(t){return p({...t,limit:void 0})},cloneWithUsing(t,e){return p({...t,using:t.using!==void 0?Ic.cloneWithTables(t.using,e):Ic.create(e)})}}),Jt=p({is(t){return t.kind==="WhereNode"},create(t){return p({kind:"WhereNode",where:t})},cloneWithOperation(t,e,r){return p({...t,where:e==="And"?en.create(t.where,r):Hn.create(t.where,r)})}}),Cc=p({is(t){return t.kind==="ReturningNode"},create(t){return p({kind:"ReturningNode",selections:p(t)})},cloneWithSelections(t,e){return p({...t,selections:t.selections?p([...t.selections,...e]):p(e)})}}),Yp=p({is(t){return t.kind==="ExplainNode"},create(t,e){return p({kind:"ExplainNode",format:t,options:e})}}),Sn=p({is(t){return t.kind==="WhenNode"},create(t){return p({kind:"WhenNode",condition:t})},cloneWithResult(t,e){return p({...t,result:e})}}),qr=p({is(t){return t.kind==="MergeQueryNode"},create(t,e){return p({kind:"MergeQueryNode",into:t,...e&&{with:e}})},cloneWithUsing(t,e){return p({...t,using:e})},cloneWithWhen(t,e){return p({...t,whens:t.whens?p([...t.whens,e]):p([e])})},cloneWithThen(t,e){return p({...t,whens:t.whens?p([...t.whens.slice(0,-1),Sn.cloneWithResult(t.whens[t.whens.length-1],e)]):void 0})}}),Pc=p({is(t){return t.kind==="OutputNode"},create(t){return p({kind:"OutputNode",selections:p(t)})},cloneWithSelections(t,e){return p({...t,selections:t.selections?p([...t.selections,...e]):p(e)})}}),Te=p({is(t){return gt.is(t)||Wt.is(t)||Xn.is(t)||qi.is(t)||qr.is(t)},cloneWithEndModifier(t,e){return p({...t,endModifiers:t.endModifiers?p([...t.endModifiers,e]):p([e])})},cloneWithWhere(t,e){return p({...t,where:t.where?Jt.cloneWithOperation(t.where,"And",e):Jt.create(e)})},cloneWithJoin(t,e){return p({...t,joins:t.joins?p([...t.joins,e]):p([e])})},cloneWithReturning(t,e){return p({...t,returning:t.returning?Cc.cloneWithSelections(t.returning,e):Cc.create(e)})},cloneWithoutReturning(t){return p({...t,returning:void 0})},cloneWithoutWhere(t){return p({...t,where:void 0})},cloneWithExplain(t,e,r){return p({...t,explain:Yp.create(e,r?.toOperationNode())})},cloneWithTop(t,e){return p({...t,top:e})},cloneWithOutput(t,e){return p({...t,output:t.output?Pc.cloneWithSelections(t.output,e):Pc.create(e)})},cloneWithOrderByItems(t,e){return p({...t,orderBy:t.orderBy?Gn.cloneWithItems(t.orderBy,e):Gn.create(e)})},cloneWithoutOrderBy(t){return p({...t,orderBy:void 0})}}),gt=p({is(t){return t.kind==="SelectQueryNode"},create(t){return p({kind:"SelectQueryNode",...t&&{with:t}})},createFrom(t,e){return p({kind:"SelectQueryNode",from:Os.create(t),...e&&{with:e}})},cloneWithSelections(t,e){return p({...t,selections:t.selections?p([...t.selections,...e]):p(e)})},cloneWithDistinctOn(t,e){return p({...t,distinctOn:t.distinctOn?p([...t.distinctOn,...e]):p(e)})},cloneWithFrontModifier(t,e){return p({...t,frontModifiers:t.frontModifiers?p([...t.frontModifiers,e]):p([e])})},cloneWithOrderByItems:(t,e)=>Te.cloneWithOrderByItems(t,e),cloneWithGroupByItems(t,e){return p({...t,groupBy:t.groupBy?Ac.cloneWithItems(t.groupBy,e):Ac.create(e)})},cloneWithLimit(t,e){return p({...t,limit:e})},cloneWithOffset(t,e){return p({...t,offset:e})},cloneWithFetch(t,e){return p({...t,fetch:e})},cloneWithHaving(t,e){return p({...t,having:t.having?Oc.cloneWithOperation(t.having,"And",e):Oc.create(e)})},cloneWithSetOperations(t,e){return p({...t,setOperations:t.setOperations?p([...t.setOperations,...e]):p([...e])})},cloneWithoutSelections(t){return p({...t,selections:[]})},cloneWithoutLimit(t){return p({...t,limit:void 0})},cloneWithoutOffset(t){return p({...t,offset:void 0})},cloneWithoutOrderBy:t=>Te.cloneWithoutOrderBy(t),cloneWithoutGroupBy(t){return p({...t,groupBy:void 0})}});class Si{#e;constructor(e){this.#e=p(e)}on(...e){return new Si({...this.#e,joinNode:xn.cloneWithOn(this.#e.joinNode,Ut(e))})}onRef(e,r,n){return new Si({...this.#e,joinNode:xn.cloneWithOn(this.#e.joinNode,vr(e,r,n))})}onTrue(){return new Si({...this.#e,joinNode:xn.cloneWithOn(this.#e.joinNode,rr.createWithSql("true"))})}$call(e){return e(this)}toOperationNode(){return this.#e.joinNode}}const Zp=p({is(t){return t.kind==="PartitionByItemNode"},create(t){return p({kind:"PartitionByItemNode",partitionBy:t})}});function em(t){return vi(t).map(Zp.create)}class ki{#e;constructor(e){this.#e=p(e)}orderBy(...e){return new ki({overNode:Jo.cloneWithOrderByItems(this.#e.overNode,qn(e))})}clearOrderBy(){return new ki({overNode:Te.cloneWithoutOrderBy(this.#e.overNode)})}partitionBy(e){return new ki({overNode:Jo.cloneWithPartitionByItems(this.#e.overNode,em(e))})}$call(e){return e(this)}toOperationNode(){return this.#e.overNode}}const Ei=p({is(t){return t.kind==="SelectionNode"},create(t){return p({kind:"SelectionNode",selection:t})},createSelectAll(){return p({kind:"SelectionNode",selection:Bo.create()})},createSelectAllFromTable(t){return p({kind:"SelectionNode",selection:qs.createSelectAll(t)})}});function ir(t){return Yt(t)?ir(t(ni())):Ir(t)?t.map(e=>Lc(e)):[Lc(t)]}function Lc(t){return zt(t)?Ei.create(Qp(t)):_c(t)?Ei.create(t.toOperationNode()):Ei.create(tu(t))}function ur(t){return t?Array.isArray(t)?t.map(Fc):[Fc(t)]:[Ei.createSelectAll()]}function Fc(t){if(zt(t))return Ei.createSelectAllFromTable(It(t));throw new Error(`invalid value selectAll expression: ${JSON.stringify(t)}`)}const tm=p({is(t){return t.kind==="ValuesNode"},create(t){return p({kind:"ValuesNode",values:p(t)})}}),rm=p({is(t){return t.kind==="DefaultInsertValueNode"},create(){return p({kind:"DefaultInsertValueNode"})}});function Rc(t){const e=Yt(t)?t(ni()):t,r=Ir(e)?e:p([e]);return nm(r)}function nm(t){const e=im(t);return[p([...e.keys()].map(Ot.create)),tm.create(t.map(r=>sm(r,e)))]}function im(t){const e=new Map;for(const r of t){const n=Object.keys(r);for(const s of n)!e.has(s)&&r[s]!==void 0&&e.set(s,e.size)}return e}function sm(t,e){const r=Object.keys(t),n=Array.from({length:e.size});let s=!1,a=r.length;for(const g of r){const w=e.get(g);if(Yr(w)){a--;continue}const q=t[g];(Yr(q)||Pi(q))&&(s=!0),n[w]=q}if(a<e.size||s){const g=rm.create();return Es.create(n.map(w=>Yr(w)?g:Rt(w)))}return vc.create(n)}const Wc=p({is(t){return t.kind==="ColumnUpdateNode"},create(t,e){return p({kind:"ColumnUpdateNode",column:t,value:e})}});function om(...t){return t.length===2?[Wc.create(nr(t[0]),Rt(t[1]))]:Ko(t[0])}function Ko(t){const e=Yt(t)?t(ni()):t;return Object.entries(e).filter(([r,n])=>n!==void 0).map(([r,n])=>Wc.create(Ot.create(r),Rt(n)))}const am=p({is(t){return t.kind==="OnDuplicateKeyNode"},create(t){return p({kind:"OnDuplicateKeyNode",updates:t})}});class lm{insertId;numInsertedOrUpdatedRows;constructor(e,r){this.insertId=e,this.numInsertedOrUpdatedRows=r}}class Ai extends Error{node;constructor(e){super("no result"),this.node=e}}function Oi(t){return Object.prototype.hasOwnProperty.call(t,"prototype")}const sr=p({is(t){return t.kind==="OnConflictNode"},create(){return p({kind:"OnConflictNode"})},cloneWith(t,e){return p({...t,...e})},cloneWithIndexWhere(t,e){return p({...t,indexWhere:t.indexWhere?Jt.cloneWithOperation(t.indexWhere,"And",e):Jt.create(e)})},cloneWithIndexOrWhere(t,e){return p({...t,indexWhere:t.indexWhere?Jt.cloneWithOperation(t.indexWhere,"Or",e):Jt.create(e)})},cloneWithUpdateWhere(t,e){return p({...t,updateWhere:t.updateWhere?Jt.cloneWithOperation(t.updateWhere,"And",e):Jt.create(e)})},cloneWithUpdateOrWhere(t,e){return p({...t,updateWhere:t.updateWhere?Jt.cloneWithOperation(t.updateWhere,"Or",e):Jt.create(e)})},cloneWithoutIndexWhere(t){return p({...t,indexWhere:void 0})},cloneWithoutUpdateWhere(t){return p({...t,updateWhere:void 0})}});class Dr{#e;constructor(e){this.#e=p(e)}column(e){const r=Ot.create(e);return new Dr({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{columns:this.#e.onConflictNode.columns?p([...this.#e.onConflictNode.columns,r]):p([r])})})}columns(e){const r=e.map(Ot.create);return new Dr({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{columns:this.#e.onConflictNode.columns?p([...this.#e.onConflictNode.columns,...r]):p(r)})})}constraint(e){return new Dr({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{constraint:_t.create(e)})})}expression(e){return new Dr({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{indexExpression:e.toOperationNode()})})}where(...e){return new Dr({...this.#e,onConflictNode:sr.cloneWithIndexWhere(this.#e.onConflictNode,Ut(e))})}whereRef(e,r,n){return new Dr({...this.#e,onConflictNode:sr.cloneWithIndexWhere(this.#e.onConflictNode,vr(e,r,n))})}clearWhere(){return new Dr({...this.#e,onConflictNode:sr.cloneWithoutIndexWhere(this.#e.onConflictNode)})}doNothing(){return new cm({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{doNothing:!0})})}doUpdateSet(e){return new Ti({...this.#e,onConflictNode:sr.cloneWith(this.#e.onConflictNode,{updates:Ko(e)})})}$call(e){return e(this)}}class cm{#e;constructor(e){this.#e=p(e)}toOperationNode(){return this.#e.onConflictNode}}class Ti{#e;constructor(e){this.#e=p(e)}where(...e){return new Ti({...this.#e,onConflictNode:sr.cloneWithUpdateWhere(this.#e.onConflictNode,Ut(e))})}whereRef(e,r,n){return new Ti({...this.#e,onConflictNode:sr.cloneWithUpdateWhere(this.#e.onConflictNode,vr(e,r,n))})}clearWhere(){return new Ti({...this.#e,onConflictNode:sr.cloneWithoutUpdateWhere(this.#e.onConflictNode)})}$call(e){return e(this)}toOperationNode(){return this.#e.onConflictNode}}const um=p({is(t){return t.kind==="TopNode"},create(t,e){return p({kind:"TopNode",expression:t,modifiers:e})}});function Yn(t,e){if(!Ns(t)&&!Wo(t))throw new Error(`Invalid top expression: ${t}`);if(!Yr(e)&&!dm(e))throw new Error(`Invalid top modifiers: ${e}`);return um.create(t,e)}function dm(t){return t==="percent"||t==="with ties"||t==="percent with ties"}const Zn=p({is(t){return t.kind==="OrActionNode"},create(t){return p({kind:"OrActionNode",action:t})}});class ct{#e;constructor(e){this.#e=p(e)}values(e){const[r,n]=Rc(e);return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{columns:r,values:n})})}columns(e){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{columns:p(e.map(Ot.create))})})}expression(e){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{values:En(e)})})}defaultValues(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{defaultValues:!0})})}modifyEnd(e){return new ct({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,e.toOperationNode())})}ignore(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("ignore")})})}orIgnore(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("ignore")})})}orAbort(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("abort")})})}orFail(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("fail")})})}orReplace(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("replace")})})}orRollback(){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{orAction:Zn.create("rollback")})})}top(e,r){return new ct({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}onConflict(e){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{onConflict:e(new Dr({onConflictNode:sr.create()})).toOperationNode()})})}onDuplicateKeyUpdate(e){return new ct({...this.#e,queryNode:Wt.cloneWith(this.#e.queryNode,{onDuplicateKey:am.create(Ko(e))})})}returning(e){return new ct({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ir(e))})}returningAll(){return new ct({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ur())})}output(e){return new ct({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ir(e))})}outputAll(e){return new ct({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ur(e))})}clearReturning(){return new ct({...this.#e,queryNode:Te.cloneWithoutReturning(this.#e.queryNode)})}$call(e){return e(this)}$if(e,r){return e?r(this):new ct({...this.#e})}$castTo(){return new ct(this.#e)}$narrowType(){return new ct(this.#e)}$assertType(){return new ct(this.#e)}withPlugin(e){return new ct({...this.#e,executor:this.#e.executor.withPlugin(e)})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.queryNode,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){const e=this.compile(),r=await this.#e.executor.executeQuery(e),{adapter:n}=this.#e.executor,s=e.query;return s.returning&&n.supportsReturning||s.output&&n.supportsOutput?r.rows:[new lm(r.insertId,r.numAffectedRows??BigInt(0))]}async executeTakeFirst(){const[e]=await this.execute();return e}async executeTakeFirstOrThrow(e=Ai){const r=await this.executeTakeFirst();if(r===void 0)throw Oi(e)?new e(this.toOperationNode()):e(this.toOperationNode());return r}async*stream(e=100){const r=this.compile(),n=this.#e.executor.stream(r,e);for await(const s of n)yield*s.rows}async explain(e,r){return await new ct({...this.#e,queryNode:Te.cloneWithExplain(this.#e.queryNode,e,r)}).execute()}}class fm{numDeletedRows;constructor(e){this.numDeletedRows=e}}const Go=p({is(t){return t.kind==="LimitNode"},create(t){return p({kind:"LimitNode",limit:t})}});class Nt{#e;constructor(e){this.#e=p(e)}where(...e){return new Nt({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,Ut(e))})}whereRef(e,r,n){return new Nt({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,vr(e,r,n))})}clearWhere(){return new Nt({...this.#e,queryNode:Te.cloneWithoutWhere(this.#e.queryNode)})}top(e,r){return new Nt({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}using(e){return new Nt({...this.#e,queryNode:qi.cloneWithUsing(this.#e.queryNode,ii(e))})}innerJoin(...e){return this.#t("InnerJoin",e)}leftJoin(...e){return this.#t("LeftJoin",e)}rightJoin(...e){return this.#t("RightJoin",e)}fullJoin(...e){return this.#t("FullJoin",e)}#t(e,r){return new Nt({...this.#e,queryNode:Te.cloneWithJoin(this.#e.queryNode,Ps(e,r))})}returning(e){return new Nt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ir(e))})}returningAll(e){return new Nt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ur(e))})}output(e){return new Nt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ir(e))})}outputAll(e){return new Nt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ur(e))})}clearReturning(){return new Nt({...this.#e,queryNode:Te.cloneWithoutReturning(this.#e.queryNode)})}clearLimit(){return new Nt({...this.#e,queryNode:qi.cloneWithoutLimit(this.#e.queryNode)})}orderBy(...e){return new Nt({...this.#e,queryNode:Te.cloneWithOrderByItems(this.#e.queryNode,qn(e))})}clearOrderBy(){return new Nt({...this.#e,queryNode:Te.cloneWithoutOrderBy(this.#e.queryNode)})}limit(e){return new Nt({...this.#e,queryNode:qi.cloneWithLimit(this.#e.queryNode,Go.create(Rt(e)))})}modifyEnd(e){return new Nt({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,e.toOperationNode())})}$call(e){return e(this)}$if(e,r){return e?r(this):new Nt({...this.#e})}$castTo(){return new Nt(this.#e)}$narrowType(){return new Nt(this.#e)}$assertType(){return new Nt(this.#e)}withPlugin(e){return new Nt({...this.#e,executor:this.#e.executor.withPlugin(e)})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.queryNode,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){const e=this.compile(),r=await this.#e.executor.executeQuery(e),{adapter:n}=this.#e.executor,s=e.query;return s.returning&&n.supportsReturning||s.output&&n.supportsOutput?r.rows:[new fm(r.numAffectedRows??BigInt(0))]}async executeTakeFirst(){const[e]=await this.execute();return e}async executeTakeFirstOrThrow(e=Ai){const r=await this.executeTakeFirst();if(r===void 0)throw Oi(e)?new e(this.toOperationNode()):e(this.toOperationNode());return r}async*stream(e=100){const r=this.compile(),n=this.#e.executor.stream(r,e);for await(const s of n)yield*s.rows}async explain(e,r){return await new Nt({...this.#e,queryNode:Te.cloneWithExplain(this.#e.queryNode,e,r)}).execute()}}class hm{numUpdatedRows;numChangedRows;constructor(e,r){this.numUpdatedRows=e,this.numChangedRows=r}}class bt{#e;constructor(e){this.#e=p(e)}where(...e){return new bt({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,Ut(e))})}whereRef(e,r,n){return new bt({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,vr(e,r,n))})}clearWhere(){return new bt({...this.#e,queryNode:Te.cloneWithoutWhere(this.#e.queryNode)})}top(e,r){return new bt({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}from(e){return new bt({...this.#e,queryNode:Xn.cloneWithFromItems(this.#e.queryNode,ii(e))})}innerJoin(...e){return this.#t("InnerJoin",e)}leftJoin(...e){return this.#t("LeftJoin",e)}rightJoin(...e){return this.#t("RightJoin",e)}fullJoin(...e){return this.#t("FullJoin",e)}#t(e,r){return new bt({...this.#e,queryNode:Te.cloneWithJoin(this.#e.queryNode,Ps(e,r))})}orderBy(...e){return new bt({...this.#e,queryNode:Te.cloneWithOrderByItems(this.#e.queryNode,qn(e))})}clearOrderBy(){return new bt({...this.#e,queryNode:Te.cloneWithoutOrderBy(this.#e.queryNode)})}limit(e){return new bt({...this.#e,queryNode:Xn.cloneWithLimit(this.#e.queryNode,Go.create(Rt(e)))})}set(...e){return new bt({...this.#e,queryNode:Xn.cloneWithUpdates(this.#e.queryNode,om(...e))})}returning(e){return new bt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ir(e))})}returningAll(e){return new bt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ur(e))})}output(e){return new bt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ir(e))})}outputAll(e){return new bt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ur(e))})}modifyEnd(e){return new bt({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,e.toOperationNode())})}clearReturning(){return new bt({...this.#e,queryNode:Te.cloneWithoutReturning(this.#e.queryNode)})}$call(e){return e(this)}$if(e,r){return e?r(this):new bt({...this.#e})}$castTo(){return new bt(this.#e)}$narrowType(){return new bt(this.#e)}$assertType(){return new bt(this.#e)}withPlugin(e){return new bt({...this.#e,executor:this.#e.executor.withPlugin(e)})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.queryNode,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){const e=this.compile(),r=await this.#e.executor.executeQuery(e),{adapter:n}=this.#e.executor,s=e.query;return s.returning&&n.supportsReturning||s.output&&n.supportsOutput?r.rows:[new hm(r.numAffectedRows??BigInt(0),r.numChangedRows)]}async executeTakeFirst(){const[e]=await this.execute();return e}async executeTakeFirstOrThrow(e=Ai){const r=await this.executeTakeFirst();if(r===void 0)throw Oi(e)?new e(this.toOperationNode()):e(this.toOperationNode());return r}async*stream(e=100){const r=this.compile(),n=this.#e.executor.stream(r,e);for await(const s of n)yield*s.rows}async explain(e,r){return await new bt({...this.#e,queryNode:Te.cloneWithExplain(this.#e.queryNode,e,r)}).execute()}}const Dc=p({is(t){return t.kind==="CommonTableExpressionNameNode"},create(t,e){return p({kind:"CommonTableExpressionNameNode",table:Lr.create(t),columns:e?p(e.map(Ot.create)):void 0})}}),Ts=p({is(t){return t.kind==="CommonTableExpressionNode"},create(t,e){return p({kind:"CommonTableExpressionNode",name:t,expression:e})},cloneWith(t,e){return p({...t,...e})}});class Is{#e;constructor(e){this.#e=p(e)}materialized(){return new Is({...this.#e,node:Ts.cloneWith(this.#e.node,{materialized:!0})})}notMaterialized(){return new Is({...this.#e,node:Ts.cloneWith(this.#e.node,{materialized:!1})})}toOperationNode(){return this.#e.node}}function Mc(t,e){const r=e(Sm()).toOperationNode();return Yt(t)?t(pm(r)).toOperationNode():Ts.create(Uc(t),r)}function pm(t){return e=>new Is({node:Ts.create(Uc(e),t)})}function Uc(t){if(t.includes("(")){const e=t.split(/[\(\)]/),r=e[0],n=e[1].split(",").map(s=>s.trim());return Dc.create(r,n)}else return Dc.create(t)}const Cs=p({is(t){return t.kind==="WithNode"},create(t,e){return p({kind:"WithNode",expressions:p([t]),...e})},cloneWithExpression(t,e){return p({...t,expressions:p([...t.expressions,e])})}}),Bc=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];function mm(t){let e="";for(let r=0;r<t;++r)e+=_m();return e}function _m(){return Bc[~~(Math.random()*Bc.length)]}function Tt(){return new gm}class gm{#e;get queryId(){return this.#e===void 0&&(this.#e=mm(8)),this.#e}}function p0(t){return t}class $c{nodeStack=[];#e=p({AliasNode:this.transformAlias.bind(this),ColumnNode:this.transformColumn.bind(this),IdentifierNode:this.transformIdentifier.bind(this),SchemableIdentifierNode:this.transformSchemableIdentifier.bind(this),RawNode:this.transformRaw.bind(this),ReferenceNode:this.transformReference.bind(this),SelectQueryNode:this.transformSelectQuery.bind(this),SelectionNode:this.transformSelection.bind(this),TableNode:this.transformTable.bind(this),FromNode:this.transformFrom.bind(this),SelectAllNode:this.transformSelectAll.bind(this),AndNode:this.transformAnd.bind(this),OrNode:this.transformOr.bind(this),ValueNode:this.transformValue.bind(this),ValueListNode:this.transformValueList.bind(this),PrimitiveValueListNode:this.transformPrimitiveValueList.bind(this),ParensNode:this.transformParens.bind(this),JoinNode:this.transformJoin.bind(this),OperatorNode:this.transformOperator.bind(this),WhereNode:this.transformWhere.bind(this),InsertQueryNode:this.transformInsertQuery.bind(this),DeleteQueryNode:this.transformDeleteQuery.bind(this),ReturningNode:this.transformReturning.bind(this),CreateTableNode:this.transformCreateTable.bind(this),AddColumnNode:this.transformAddColumn.bind(this),ColumnDefinitionNode:this.transformColumnDefinition.bind(this),DropTableNode:this.transformDropTable.bind(this),DataTypeNode:this.transformDataType.bind(this),OrderByNode:this.transformOrderBy.bind(this),OrderByItemNode:this.transformOrderByItem.bind(this),GroupByNode:this.transformGroupBy.bind(this),GroupByItemNode:this.transformGroupByItem.bind(this),UpdateQueryNode:this.transformUpdateQuery.bind(this),ColumnUpdateNode:this.transformColumnUpdate.bind(this),LimitNode:this.transformLimit.bind(this),OffsetNode:this.transformOffset.bind(this),OnConflictNode:this.transformOnConflict.bind(this),OnDuplicateKeyNode:this.transformOnDuplicateKey.bind(this),CreateIndexNode:this.transformCreateIndex.bind(this),DropIndexNode:this.transformDropIndex.bind(this),ListNode:this.transformList.bind(this),PrimaryKeyConstraintNode:this.transformPrimaryKeyConstraint.bind(this),UniqueConstraintNode:this.transformUniqueConstraint.bind(this),ReferencesNode:this.transformReferences.bind(this),CheckConstraintNode:this.transformCheckConstraint.bind(this),WithNode:this.transformWith.bind(this),CommonTableExpressionNode:this.transformCommonTableExpression.bind(this),CommonTableExpressionNameNode:this.transformCommonTableExpressionName.bind(this),HavingNode:this.transformHaving.bind(this),CreateSchemaNode:this.transformCreateSchema.bind(this),DropSchemaNode:this.transformDropSchema.bind(this),AlterTableNode:this.transformAlterTable.bind(this),DropColumnNode:this.transformDropColumn.bind(this),RenameColumnNode:this.transformRenameColumn.bind(this),AlterColumnNode:this.transformAlterColumn.bind(this),ModifyColumnNode:this.transformModifyColumn.bind(this),AddConstraintNode:this.transformAddConstraint.bind(this),DropConstraintNode:this.transformDropConstraint.bind(this),RenameConstraintNode:this.transformRenameConstraint.bind(this),ForeignKeyConstraintNode:this.transformForeignKeyConstraint.bind(this),CreateViewNode:this.transformCreateView.bind(this),RefreshMaterializedViewNode:this.transformRefreshMaterializedView.bind(this),DropViewNode:this.transformDropView.bind(this),GeneratedNode:this.transformGenerated.bind(this),DefaultValueNode:this.transformDefaultValue.bind(this),OnNode:this.transformOn.bind(this),ValuesNode:this.transformValues.bind(this),SelectModifierNode:this.transformSelectModifier.bind(this),CreateTypeNode:this.transformCreateType.bind(this),DropTypeNode:this.transformDropType.bind(this),ExplainNode:this.transformExplain.bind(this),DefaultInsertValueNode:this.transformDefaultInsertValue.bind(this),AggregateFunctionNode:this.transformAggregateFunction.bind(this),OverNode:this.transformOver.bind(this),PartitionByNode:this.transformPartitionBy.bind(this),PartitionByItemNode:this.transformPartitionByItem.bind(this),SetOperationNode:this.transformSetOperation.bind(this),BinaryOperationNode:this.transformBinaryOperation.bind(this),UnaryOperationNode:this.transformUnaryOperation.bind(this),UsingNode:this.transformUsing.bind(this),FunctionNode:this.transformFunction.bind(this),CaseNode:this.transformCase.bind(this),WhenNode:this.transformWhen.bind(this),JSONReferenceNode:this.transformJSONReference.bind(this),JSONPathNode:this.transformJSONPath.bind(this),JSONPathLegNode:this.transformJSONPathLeg.bind(this),JSONOperatorChainNode:this.transformJSONOperatorChain.bind(this),TupleNode:this.transformTuple.bind(this),MergeQueryNode:this.transformMergeQuery.bind(this),MatchedNode:this.transformMatched.bind(this),AddIndexNode:this.transformAddIndex.bind(this),CastNode:this.transformCast.bind(this),FetchNode:this.transformFetch.bind(this),TopNode:this.transformTop.bind(this),OutputNode:this.transformOutput.bind(this),OrActionNode:this.transformOrAction.bind(this),CollateNode:this.transformCollate.bind(this)});transformNode(e,r){if(!e)return e;this.nodeStack.push(e);const n=this.transformNodeImpl(e,r);return this.nodeStack.pop(),p(n)}transformNodeImpl(e,r){return this.#e[e.kind](e,r)}transformNodeList(e,r){return e&&p(e.map(n=>this.transformNode(n,r)))}transformSelectQuery(e,r){return{kind:"SelectQueryNode",from:this.transformNode(e.from,r),selections:this.transformNodeList(e.selections,r),distinctOn:this.transformNodeList(e.distinctOn,r),joins:this.transformNodeList(e.joins,r),groupBy:this.transformNode(e.groupBy,r),orderBy:this.transformNode(e.orderBy,r),where:this.transformNode(e.where,r),frontModifiers:this.transformNodeList(e.frontModifiers,r),endModifiers:this.transformNodeList(e.endModifiers,r),limit:this.transformNode(e.limit,r),offset:this.transformNode(e.offset,r),with:this.transformNode(e.with,r),having:this.transformNode(e.having,r),explain:this.transformNode(e.explain,r),setOperations:this.transformNodeList(e.setOperations,r),fetch:this.transformNode(e.fetch,r),top:this.transformNode(e.top,r)}}transformSelection(e,r){return{kind:"SelectionNode",selection:this.transformNode(e.selection,r)}}transformColumn(e,r){return{kind:"ColumnNode",column:this.transformNode(e.column,r)}}transformAlias(e,r){return{kind:"AliasNode",node:this.transformNode(e.node,r),alias:this.transformNode(e.alias,r)}}transformTable(e,r){return{kind:"TableNode",table:this.transformNode(e.table,r)}}transformFrom(e,r){return{kind:"FromNode",froms:this.transformNodeList(e.froms,r)}}transformReference(e,r){return{kind:"ReferenceNode",column:this.transformNode(e.column,r),table:this.transformNode(e.table,r)}}transformAnd(e,r){return{kind:"AndNode",left:this.transformNode(e.left,r),right:this.transformNode(e.right,r)}}transformOr(e,r){return{kind:"OrNode",left:this.transformNode(e.left,r),right:this.transformNode(e.right,r)}}transformValueList(e,r){return{kind:"ValueListNode",values:this.transformNodeList(e.values,r)}}transformParens(e,r){return{kind:"ParensNode",node:this.transformNode(e.node,r)}}transformJoin(e,r){return{kind:"JoinNode",joinType:e.joinType,table:this.transformNode(e.table,r),on:this.transformNode(e.on,r)}}transformRaw(e,r){return{kind:"RawNode",sqlFragments:p([...e.sqlFragments]),parameters:this.transformNodeList(e.parameters,r)}}transformWhere(e,r){return{kind:"WhereNode",where:this.transformNode(e.where,r)}}transformInsertQuery(e,r){return{kind:"InsertQueryNode",into:this.transformNode(e.into,r),columns:this.transformNodeList(e.columns,r),values:this.transformNode(e.values,r),returning:this.transformNode(e.returning,r),onConflict:this.transformNode(e.onConflict,r),onDuplicateKey:this.transformNode(e.onDuplicateKey,r),endModifiers:this.transformNodeList(e.endModifiers,r),with:this.transformNode(e.with,r),ignore:e.ignore,orAction:this.transformNode(e.orAction,r),replace:e.replace,explain:this.transformNode(e.explain,r),defaultValues:e.defaultValues,top:this.transformNode(e.top,r),output:this.transformNode(e.output,r)}}transformValues(e,r){return{kind:"ValuesNode",values:this.transformNodeList(e.values,r)}}transformDeleteQuery(e,r){return{kind:"DeleteQueryNode",from:this.transformNode(e.from,r),using:this.transformNode(e.using,r),joins:this.transformNodeList(e.joins,r),where:this.transformNode(e.where,r),returning:this.transformNode(e.returning,r),endModifiers:this.transformNodeList(e.endModifiers,r),with:this.transformNode(e.with,r),orderBy:this.transformNode(e.orderBy,r),limit:this.transformNode(e.limit,r),explain:this.transformNode(e.explain,r),top:this.transformNode(e.top,r),output:this.transformNode(e.output,r)}}transformReturning(e,r){return{kind:"ReturningNode",selections:this.transformNodeList(e.selections,r)}}transformCreateTable(e,r){return{kind:"CreateTableNode",table:this.transformNode(e.table,r),columns:this.transformNodeList(e.columns,r),constraints:this.transformNodeList(e.constraints,r),temporary:e.temporary,ifNotExists:e.ifNotExists,onCommit:e.onCommit,frontModifiers:this.transformNodeList(e.frontModifiers,r),endModifiers:this.transformNodeList(e.endModifiers,r),selectQuery:this.transformNode(e.selectQuery,r)}}transformColumnDefinition(e,r){return{kind:"ColumnDefinitionNode",column:this.transformNode(e.column,r),dataType:this.transformNode(e.dataType,r),references:this.transformNode(e.references,r),primaryKey:e.primaryKey,autoIncrement:e.autoIncrement,unique:e.unique,notNull:e.notNull,unsigned:e.unsigned,defaultTo:this.transformNode(e.defaultTo,r),check:this.transformNode(e.check,r),generated:this.transformNode(e.generated,r),frontModifiers:this.transformNodeList(e.frontModifiers,r),endModifiers:this.transformNodeList(e.endModifiers,r),nullsNotDistinct:e.nullsNotDistinct,identity:e.identity,ifNotExists:e.ifNotExists}}transformAddColumn(e,r){return{kind:"AddColumnNode",column:this.transformNode(e.column,r)}}transformDropTable(e,r){return{kind:"DropTableNode",table:this.transformNode(e.table,r),ifExists:e.ifExists,cascade:e.cascade}}transformOrderBy(e,r){return{kind:"OrderByNode",items:this.transformNodeList(e.items,r)}}transformOrderByItem(e,r){return{kind:"OrderByItemNode",orderBy:this.transformNode(e.orderBy,r),direction:this.transformNode(e.direction,r),collation:this.transformNode(e.collation,r),nulls:e.nulls}}transformGroupBy(e,r){return{kind:"GroupByNode",items:this.transformNodeList(e.items,r)}}transformGroupByItem(e,r){return{kind:"GroupByItemNode",groupBy:this.transformNode(e.groupBy,r)}}transformUpdateQuery(e,r){return{kind:"UpdateQueryNode",table:this.transformNode(e.table,r),from:this.transformNode(e.from,r),joins:this.transformNodeList(e.joins,r),where:this.transformNode(e.where,r),updates:this.transformNodeList(e.updates,r),returning:this.transformNode(e.returning,r),endModifiers:this.transformNodeList(e.endModifiers,r),with:this.transformNode(e.with,r),explain:this.transformNode(e.explain,r),limit:this.transformNode(e.limit,r),top:this.transformNode(e.top,r),output:this.transformNode(e.output,r),orderBy:this.transformNode(e.orderBy,r)}}transformColumnUpdate(e,r){return{kind:"ColumnUpdateNode",column:this.transformNode(e.column,r),value:this.transformNode(e.value,r)}}transformLimit(e,r){return{kind:"LimitNode",limit:this.transformNode(e.limit,r)}}transformOffset(e,r){return{kind:"OffsetNode",offset:this.transformNode(e.offset,r)}}transformOnConflict(e,r){return{kind:"OnConflictNode",columns:this.transformNodeList(e.columns,r),constraint:this.transformNode(e.constraint,r),indexExpression:this.transformNode(e.indexExpression,r),indexWhere:this.transformNode(e.indexWhere,r),updates:this.transformNodeList(e.updates,r),updateWhere:this.transformNode(e.updateWhere,r),doNothing:e.doNothing}}transformOnDuplicateKey(e,r){return{kind:"OnDuplicateKeyNode",updates:this.transformNodeList(e.updates,r)}}transformCreateIndex(e,r){return{kind:"CreateIndexNode",name:this.transformNode(e.name,r),table:this.transformNode(e.table,r),columns:this.transformNodeList(e.columns,r),unique:e.unique,using:this.transformNode(e.using,r),ifNotExists:e.ifNotExists,where:this.transformNode(e.where,r),nullsNotDistinct:e.nullsNotDistinct}}transformList(e,r){return{kind:"ListNode",items:this.transformNodeList(e.items,r)}}transformDropIndex(e,r){return{kind:"DropIndexNode",name:this.transformNode(e.name,r),table:this.transformNode(e.table,r),ifExists:e.ifExists,cascade:e.cascade}}transformPrimaryKeyConstraint(e,r){return{kind:"PrimaryKeyConstraintNode",columns:this.transformNodeList(e.columns,r),name:this.transformNode(e.name,r),deferrable:e.deferrable,initiallyDeferred:e.initiallyDeferred}}transformUniqueConstraint(e,r){return{kind:"UniqueConstraintNode",columns:this.transformNodeList(e.columns,r),name:this.transformNode(e.name,r),nullsNotDistinct:e.nullsNotDistinct,deferrable:e.deferrable,initiallyDeferred:e.initiallyDeferred}}transformForeignKeyConstraint(e,r){return{kind:"ForeignKeyConstraintNode",columns:this.transformNodeList(e.columns,r),references:this.transformNode(e.references,r),name:this.transformNode(e.name,r),onDelete:e.onDelete,onUpdate:e.onUpdate,deferrable:e.deferrable,initiallyDeferred:e.initiallyDeferred}}transformSetOperation(e,r){return{kind:"SetOperationNode",operator:e.operator,expression:this.transformNode(e.expression,r),all:e.all}}transformReferences(e,r){return{kind:"ReferencesNode",table:this.transformNode(e.table,r),columns:this.transformNodeList(e.columns,r),onDelete:e.onDelete,onUpdate:e.onUpdate}}transformCheckConstraint(e,r){return{kind:"CheckConstraintNode",expression:this.transformNode(e.expression,r),name:this.transformNode(e.name,r)}}transformWith(e,r){return{kind:"WithNode",expressions:this.transformNodeList(e.expressions,r),recursive:e.recursive}}transformCommonTableExpression(e,r){return{kind:"CommonTableExpressionNode",name:this.transformNode(e.name,r),materialized:e.materialized,expression:this.transformNode(e.expression,r)}}transformCommonTableExpressionName(e,r){return{kind:"CommonTableExpressionNameNode",table:this.transformNode(e.table,r),columns:this.transformNodeList(e.columns,r)}}transformHaving(e,r){return{kind:"HavingNode",having:this.transformNode(e.having,r)}}transformCreateSchema(e,r){return{kind:"CreateSchemaNode",schema:this.transformNode(e.schema,r),ifNotExists:e.ifNotExists}}transformDropSchema(e,r){return{kind:"DropSchemaNode",schema:this.transformNode(e.schema,r),ifExists:e.ifExists,cascade:e.cascade}}transformAlterTable(e,r){return{kind:"AlterTableNode",table:this.transformNode(e.table,r),renameTo:this.transformNode(e.renameTo,r),setSchema:this.transformNode(e.setSchema,r),columnAlterations:this.transformNodeList(e.columnAlterations,r),addConstraint:this.transformNode(e.addConstraint,r),dropConstraint:this.transformNode(e.dropConstraint,r),renameConstraint:this.transformNode(e.renameConstraint,r),addIndex:this.transformNode(e.addIndex,r),dropIndex:this.transformNode(e.dropIndex,r)}}transformDropColumn(e,r){return{kind:"DropColumnNode",column:this.transformNode(e.column,r)}}transformRenameColumn(e,r){return{kind:"RenameColumnNode",column:this.transformNode(e.column,r),renameTo:this.transformNode(e.renameTo,r)}}transformAlterColumn(e,r){return{kind:"AlterColumnNode",column:this.transformNode(e.column,r),dataType:this.transformNode(e.dataType,r),dataTypeExpression:this.transformNode(e.dataTypeExpression,r),setDefault:this.transformNode(e.setDefault,r),dropDefault:e.dropDefault,setNotNull:e.setNotNull,dropNotNull:e.dropNotNull}}transformModifyColumn(e,r){return{kind:"ModifyColumnNode",column:this.transformNode(e.column,r)}}transformAddConstraint(e,r){return{kind:"AddConstraintNode",constraint:this.transformNode(e.constraint,r)}}transformDropConstraint(e,r){return{kind:"DropConstraintNode",constraintName:this.transformNode(e.constraintName,r),ifExists:e.ifExists,modifier:e.modifier}}transformRenameConstraint(e,r){return{kind:"RenameConstraintNode",oldName:this.transformNode(e.oldName,r),newName:this.transformNode(e.newName,r)}}transformCreateView(e,r){return{kind:"CreateViewNode",name:this.transformNode(e.name,r),temporary:e.temporary,orReplace:e.orReplace,ifNotExists:e.ifNotExists,materialized:e.materialized,columns:this.transformNodeList(e.columns,r),as:this.transformNode(e.as,r)}}transformRefreshMaterializedView(e,r){return{kind:"RefreshMaterializedViewNode",name:this.transformNode(e.name,r),concurrently:e.concurrently,withNoData:e.withNoData}}transformDropView(e,r){return{kind:"DropViewNode",name:this.transformNode(e.name,r),ifExists:e.ifExists,materialized:e.materialized,cascade:e.cascade}}transformGenerated(e,r){return{kind:"GeneratedNode",byDefault:e.byDefault,always:e.always,identity:e.identity,stored:e.stored,expression:this.transformNode(e.expression,r)}}transformDefaultValue(e,r){return{kind:"DefaultValueNode",defaultValue:this.transformNode(e.defaultValue,r)}}transformOn(e,r){return{kind:"OnNode",on:this.transformNode(e.on,r)}}transformSelectModifier(e,r){return{kind:"SelectModifierNode",modifier:e.modifier,rawModifier:this.transformNode(e.rawModifier,r),of:this.transformNodeList(e.of,r)}}transformCreateType(e,r){return{kind:"CreateTypeNode",name:this.transformNode(e.name,r),enum:this.transformNode(e.enum,r)}}transformDropType(e,r){return{kind:"DropTypeNode",name:this.transformNode(e.name,r),ifExists:e.ifExists}}transformExplain(e,r){return{kind:"ExplainNode",format:e.format,options:this.transformNode(e.options,r)}}transformSchemableIdentifier(e,r){return{kind:"SchemableIdentifierNode",schema:this.transformNode(e.schema,r),identifier:this.transformNode(e.identifier,r)}}transformAggregateFunction(e,r){return{kind:"AggregateFunctionNode",func:e.func,aggregated:this.transformNodeList(e.aggregated,r),distinct:e.distinct,orderBy:this.transformNode(e.orderBy,r),withinGroup:this.transformNode(e.withinGroup,r),filter:this.transformNode(e.filter,r),over:this.transformNode(e.over,r)}}transformOver(e,r){return{kind:"OverNode",orderBy:this.transformNode(e.orderBy,r),partitionBy:this.transformNode(e.partitionBy,r)}}transformPartitionBy(e,r){return{kind:"PartitionByNode",items:this.transformNodeList(e.items,r)}}transformPartitionByItem(e,r){return{kind:"PartitionByItemNode",partitionBy:this.transformNode(e.partitionBy,r)}}transformBinaryOperation(e,r){return{kind:"BinaryOperationNode",leftOperand:this.transformNode(e.leftOperand,r),operator:this.transformNode(e.operator,r),rightOperand:this.transformNode(e.rightOperand,r)}}transformUnaryOperation(e,r){return{kind:"UnaryOperationNode",operator:this.transformNode(e.operator,r),operand:this.transformNode(e.operand,r)}}transformUsing(e,r){return{kind:"UsingNode",tables:this.transformNodeList(e.tables,r)}}transformFunction(e,r){return{kind:"FunctionNode",func:e.func,arguments:this.transformNodeList(e.arguments,r)}}transformCase(e,r){return{kind:"CaseNode",value:this.transformNode(e.value,r),when:this.transformNodeList(e.when,r),else:this.transformNode(e.else,r),isStatement:e.isStatement}}transformWhen(e,r){return{kind:"WhenNode",condition:this.transformNode(e.condition,r),result:this.transformNode(e.result,r)}}transformJSONReference(e,r){return{kind:"JSONReferenceNode",reference:this.transformNode(e.reference,r),traversal:this.transformNode(e.traversal,r)}}transformJSONPath(e,r){return{kind:"JSONPathNode",inOperator:this.transformNode(e.inOperator,r),pathLegs:this.transformNodeList(e.pathLegs,r)}}transformJSONPathLeg(e,r){return{kind:"JSONPathLegNode",type:e.type,value:e.value}}transformJSONOperatorChain(e,r){return{kind:"JSONOperatorChainNode",operator:this.transformNode(e.operator,r),values:this.transformNodeList(e.values,r)}}transformTuple(e,r){return{kind:"TupleNode",values:this.transformNodeList(e.values,r)}}transformMergeQuery(e,r){return{kind:"MergeQueryNode",into:this.transformNode(e.into,r),using:this.transformNode(e.using,r),whens:this.transformNodeList(e.whens,r),with:this.transformNode(e.with,r),top:this.transformNode(e.top,r),endModifiers:this.transformNodeList(e.endModifiers,r),output:this.transformNode(e.output,r),returning:this.transformNode(e.returning,r)}}transformMatched(e,r){return{kind:"MatchedNode",not:e.not,bySource:e.bySource}}transformAddIndex(e,r){return{kind:"AddIndexNode",name:this.transformNode(e.name,r),columns:this.transformNodeList(e.columns,r),unique:e.unique,using:this.transformNode(e.using,r),ifNotExists:e.ifNotExists}}transformCast(e,r){return{kind:"CastNode",expression:this.transformNode(e.expression,r),dataType:this.transformNode(e.dataType,r)}}transformFetch(e,r){return{kind:"FetchNode",rowCount:this.transformNode(e.rowCount,r),modifier:e.modifier}}transformTop(e,r){return{kind:"TopNode",expression:e.expression,modifiers:e.modifiers}}transformOutput(e,r){return{kind:"OutputNode",selections:this.transformNodeList(e.selections,r)}}transformDataType(e,r){return e}transformSelectAll(e,r){return e}transformIdentifier(e,r){return e}transformValue(e,r){return e}transformPrimitiveValueList(e,r){return e}transformOperator(e,r){return e}transformDefaultInsertValue(e,r){return e}transformOrAction(e,r){return e}transformCollate(e,r){return e}}const ym=p({AlterTableNode:!0,CreateIndexNode:!0,CreateSchemaNode:!0,CreateTableNode:!0,CreateTypeNode:!0,CreateViewNode:!0,RefreshMaterializedViewNode:!0,DeleteQueryNode:!0,DropIndexNode:!0,DropSchemaNode:!0,DropTableNode:!0,DropTypeNode:!0,DropViewNode:!0,InsertQueryNode:!0,RawNode:!0,SelectQueryNode:!0,UpdateQueryNode:!0,MergeQueryNode:!0}),bm={json_agg:!0,to_json:!0};class wm extends $c{#e;#t=new Set;#r=new Set;constructor(e){super(),this.#e=e}transformNodeImpl(e,r){if(!this.#i(e))return super.transformNodeImpl(e,r);const n=this.#c(e);for(const h of n)this.#r.add(h);const s=this.#o(e);for(const h of s)this.#t.add(h);const a=super.transformNodeImpl(e,r);for(const h of s)this.#t.delete(h);for(const h of n)this.#r.delete(h);return a}transformSchemableIdentifier(e,r){const n=super.transformSchemableIdentifier(e,r);return n.schema||!this.#t.has(e.identifier.name)?n:{...n,schema:_t.create(this.#e)}}transformReferences(e,r){const n=super.transformReferences(e,r);return n.table.table.schema?n:{...n,table:Lr.createWithSchema(this.#e,n.table.table.identifier.name)}}transformAggregateFunction(e,r){return{...super.transformAggregateFunction({...e,aggregated:[]},r),aggregated:this.#s(e,r,"aggregated")}}transformFunction(e,r){return{...super.transformFunction({...e,arguments:[]},r),arguments:this.#s(e,r,"arguments")}}#s(e,r,n){return bm[e.func]?e[n].map(s=>!Lr.is(s)||s.table.schema?this.transformNode(s,r):{...s,table:this.transformIdentifier(s.table.identifier,r)}):this.transformNodeList(e[n],r)}#i(e){return e.kind in ym}#o(e){const r=new Set;if("name"in e&&e.name&&Pr.is(e.name)&&this.#l(e.name,r),"from"in e&&e.from)for(const n of e.from.froms)this.#n(n,r);if("into"in e&&e.into&&this.#n(e.into,r),"table"in e&&e.table&&this.#n(e.table,r),"joins"in e&&e.joins)for(const n of e.joins)this.#n(n.table,r);return"using"in e&&e.using&&(xn.is(e.using)?this.#n(e.using.table,r):this.#n(e.using,r)),r}#c(e){const r=new Set;return"with"in e&&e.with&&this.#a(e.with,r),r}#n(e,r){if(Lr.is(e))this.#l(e.table,r);else if(Zr.is(e)&&Lr.is(e.node))this.#l(e.node.table,r);else if(Tc.is(e))for(const n of e.items)this.#n(n,r)}#l(e,r){const n=e.identifier.name;!this.#t.has(n)&&!this.#r.has(n)&&r.add(n)}#a(e,r){for(const n of e.expressions){const s=n.name.table.table.identifier.name;this.#r.has(s)||r.add(s)}}}class ei{#e;constructor(e){this.#e=new wm(e)}transformQuery(e){return this.#e.transformNode(e.node,e.queryId)}async transformResult(e){return e.result}}const Nm=p({is(t){return t.kind==="MatchedNode"},create(t,e=!1){return p({kind:"MatchedNode",not:t,bySource:e})}});function jc(t,e,r){return Sn.create(As([Nm.create(!t.isMatched,t.bySource),...e&&e.length>0?[e.length===3&&r?vr(e[0],e[1],e[2]):Ut(e)]:[]],"and",!1))}function Ii(t){return zt(t)?rr.create([t],[]):tr(t)?t.toOperationNode():t}class zc{#e;#t;#r;constructor(){this.#e=new Promise((e,r)=>{this.#r=r,this.#t=e})}get promise(){return this.#e}resolve=e=>{this.#t&&this.#t(e)};reject=e=>{this.#r&&this.#r(e)}}async function Vc(t){const e=new zc,r=new zc;return t.provideConnection(async n=>(e.resolve(n),await r.promise)).catch(n=>e.reject(n)),p({connection:await e.promise,release:r.resolve})}const xm=p([]);class Qc{#e;constructor(e=xm){this.#e=e}get plugins(){return this.#e}transformQuery(e,r){for(const n of this.#e){const s=n.transformQuery({node:e,queryId:r});if(s.kind===e.kind)e=s;else throw new Error(["KyselyPlugin.transformQuery must return a node","of the same kind that was given to it.",`The plugin was given a ${e.kind}`,`but it returned a ${s.kind}`].join(" "))}return e}async executeQuery(e){return await this.provideConnection(async r=>{const n=await r.executeQuery(e);return"numUpdatedOrDeletedRows"in n&&Kn("kysely:warning: outdated driver/plugin detected! `QueryResult.numUpdatedOrDeletedRows` has been replaced with `QueryResult.numAffectedRows`."),await this.#t(n,e.queryId)})}async*stream(e,r){const{connection:n,release:s}=await Vc(this);try{for await(const a of n.streamQuery(e,r))yield await this.#t(a,e.queryId)}finally{s()}}async#t(e,r){for(const n of this.#e)e=await n.transformResult({result:e,queryId:r});return e}}class ti extends Qc{get adapter(){throw new Error("this query cannot be compiled to SQL")}compileQuery(){throw new Error("this query cannot be compiled to SQL")}provideConnection(){throw new Error("this query cannot be executed")}withConnectionProvider(){throw new Error("this query cannot have a connection provider")}withPlugin(e){return new ti([...this.plugins,e])}withPlugins(e){return new ti([...this.plugins,...e])}withPluginAtFront(e){return new ti([e,...this.plugins])}withoutPlugins(){return new ti([])}}const Xo=new ti;class vm{numChangedRows;constructor(e){this.numChangedRows=e}}class nn{#e;constructor(e){this.#e=p(e)}modifyEnd(e){return new nn({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,e.toOperationNode())})}top(e,r){return new nn({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}using(...e){return new Kt({...this.#e,queryNode:qr.cloneWithUsing(this.#e.queryNode,Ps("Using",e))})}returning(e){return new nn({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ir(e))})}returningAll(e){return new nn({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ur(e))})}output(e){return new nn({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ir(e))})}outputAll(e){return new nn({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ur(e))})}}class Kt{#e;constructor(e){this.#e=p(e)}modifyEnd(e){return new Kt({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,e.toOperationNode())})}top(e,r){return new Kt({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}whenMatched(){return this.#t([])}whenMatchedAnd(...e){return this.#t(e)}whenMatchedAndRef(e,r,n){return this.#t([e,r,n],!0)}#t(e,r){return new Hc({...this.#e,queryNode:qr.cloneWithWhen(this.#e.queryNode,jc({isMatched:!0},e,r))})}whenNotMatched(){return this.#r([])}whenNotMatchedAnd(...e){return this.#r(e)}whenNotMatchedAndRef(e,r,n){return this.#r([e,r,n],!0)}whenNotMatchedBySource(){return this.#r([],!1,!0)}whenNotMatchedBySourceAnd(...e){return this.#r(e,!1,!0)}whenNotMatchedBySourceAndRef(e,r,n){return this.#r([e,r,n],!0,!0)}returning(e){return new Kt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ir(e))})}returningAll(e){return new Kt({...this.#e,queryNode:Te.cloneWithReturning(this.#e.queryNode,ur(e))})}output(e){return new Kt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ir(e))})}outputAll(e){return new Kt({...this.#e,queryNode:Te.cloneWithOutput(this.#e.queryNode,ur(e))})}#r(e,r=!1,n=!1){const s={...this.#e,queryNode:qr.cloneWithWhen(this.#e.queryNode,jc({isMatched:!1,bySource:n},e,r))},a=n?Hc:qm;return new a(s)}$call(e){return e(this)}$if(e,r){return e?r(this):new Kt({...this.#e})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.queryNode,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){const e=this.compile(),r=await this.#e.executor.executeQuery(e),{adapter:n}=this.#e.executor,s=e.query;return s.returning&&n.supportsReturning||s.output&&n.supportsOutput?r.rows:[new vm(r.numAffectedRows)]}async executeTakeFirst(){const[e]=await this.execute();return e}async executeTakeFirstOrThrow(e=Ai){const r=await this.executeTakeFirst();if(r===void 0)throw Oi(e)?new e(this.toOperationNode()):e(this.toOperationNode());return r}}class Hc{#e;constructor(e){this.#e=p(e)}thenDelete(){return new Kt({...this.#e,queryNode:qr.cloneWithThen(this.#e.queryNode,Ii("delete"))})}thenDoNothing(){return new Kt({...this.#e,queryNode:qr.cloneWithThen(this.#e.queryNode,Ii("do nothing"))})}thenUpdate(e){return new Kt({...this.#e,queryNode:qr.cloneWithThen(this.#e.queryNode,Ii(e(new bt({queryId:this.#e.queryId,executor:Xo,queryNode:Xn.createWithoutTable()}))))})}thenUpdateSet(...e){return this.thenUpdate(r=>r.set(...e))}}class qm{#e;constructor(e){this.#e=p(e)}thenDoNothing(){return new Kt({...this.#e,queryNode:qr.cloneWithThen(this.#e.queryNode,Ii("do nothing"))})}thenInsertValues(e){const[r,n]=Rc(e);return new Kt({...this.#e,queryNode:qr.cloneWithThen(this.#e.queryNode,Ii(Wt.cloneWith(Wt.createWithoutInto(),{columns:r,values:n})))})}}class sn{#e;constructor(e){this.#e=p(e)}selectFrom(e){return Zo({queryId:Tt(),executor:this.#e.executor,queryNode:gt.createFrom(ii(e),this.#e.withNode)})}selectNoFrom(e){return Zo({queryId:Tt(),executor:this.#e.executor,queryNode:gt.cloneWithSelections(gt.create(this.#e.withNode),ir(e))})}insertInto(e){return new ct({queryId:Tt(),executor:this.#e.executor,queryNode:Wt.create(It(e),this.#e.withNode)})}replaceInto(e){return new ct({queryId:Tt(),executor:this.#e.executor,queryNode:Wt.create(It(e),this.#e.withNode,!0)})}deleteFrom(e){return new Nt({queryId:Tt(),executor:this.#e.executor,queryNode:qi.create(ii(e),this.#e.withNode)})}updateTable(e){return new bt({queryId:Tt(),executor:this.#e.executor,queryNode:Xn.create(ii(e),this.#e.withNode)})}mergeInto(e){return new nn({queryId:Tt(),executor:this.#e.executor,queryNode:qr.create(ru(e),this.#e.withNode)})}with(e,r){const n=Mc(e,r);return new sn({...this.#e,withNode:this.#e.withNode?Cs.cloneWithExpression(this.#e.withNode,n):Cs.create(n)})}withRecursive(e,r){const n=Mc(e,r);return new sn({...this.#e,withNode:this.#e.withNode?Cs.cloneWithExpression(this.#e.withNode,n):Cs.create(n,{recursive:!0})})}withPlugin(e){return new sn({...this.#e,executor:this.#e.executor.withPlugin(e)})}withoutPlugins(){return new sn({...this.#e,executor:this.#e.executor.withoutPlugins()})}withSchema(e){return new sn({...this.#e,executor:this.#e.executor.withPluginAtFront(new ei(e))})}}function Sm(){return new sn({executor:Xo})}function km(t,e){return new Si({joinNode:xn.create(t,Li(e))})}function Em(){return new ki({overNode:Jo.create()})}function Ps(t,e){if(e.length===3)return Om(t,e[0],e[1],e[2]);if(e.length===2)return Am(t,e[0],e[1]);if(e.length===1)return Tm(t,e[0]);throw new Error("not implemented")}function Am(t,e,r){return r(km(t,e)).toOperationNode()}function Om(t,e,r,n){return xn.createWithOn(t,Li(e),vr(r,"=",n))}function Tm(t,e){return xn.create(t,Li(e))}const Im=p({is(t){return t.kind==="OffsetNode"},create(t){return p({kind:"OffsetNode",offset:t})}}),Cm=p({is(t){return t.kind==="GroupByItemNode"},create(t){return p({kind:"GroupByItemNode",groupBy:t})}});function Pm(t){return t=Yt(t)?t(ni()):t,vi(t).map(Cm.create)}const Jc=p({is(t){return t.kind==="SetOperationNode"},create(t,e,r){return p({kind:"SetOperationNode",operator:t,expression:e,all:r})}});function ri(t,e,r){return Yt(e)&&(e=e(ta())),Ir(e)||(e=[e]),e.map(n=>Jc.create(t,En(n),r))}class ut{#e;constructor(e){this.#e=e}get expressionType(){}as(e){return new Yo(this,e)}or(...e){return new Ls(Hn.create(this.#e,Ut(e)))}and(...e){return new Fs(en.create(this.#e,Ut(e)))}$castTo(){return new ut(this.#e)}$notNull(){return new ut(this.#e)}toOperationNode(){return this.#e}}class Yo{#e;#t;constructor(e,r){this.#e=e,this.#t=r}get expression(){return this.#e}get alias(){return this.#t}toOperationNode(){return Zr.create(this.#e.toOperationNode(),tr(this.#t)?this.#t.toOperationNode():_t.create(this.#t))}}class Ls{#e;constructor(e){this.#e=e}get expressionType(){}as(e){return new Yo(this,e)}or(...e){return new Ls(Hn.create(this.#e,Ut(e)))}$castTo(){return new Ls(this.#e)}toOperationNode(){return Wr.create(this.#e)}}class Fs{#e;constructor(e){this.#e=e}get expressionType(){}as(e){return new Yo(this,e)}and(...e){return new Fs(en.create(this.#e,Ut(e)))}$castTo(){return new Fs(this.#e)}toOperationNode(){return Wr.create(this.#e)}}const Lm={is(t){return t.kind==="FetchNode"},create(t,e){return{kind:"FetchNode",rowCount:hr.create(t),modifier:e}}};function Fm(t,e){if(!Ns(t)&&!Wo(t))throw new Error(`Invalid fetch row count: ${t}`);if(!Rm(e))throw new Error(`Invalid fetch modifier: ${e}`);return Lm.create(t,e)}function Rm(t){return t==="only"||t==="with ties"}class Je{#e;constructor(e){this.#e=p(e)}get expressionType(){}get isSelectQueryBuilder(){return!0}where(...e){return new Je({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,Ut(e))})}whereRef(e,r,n){return new Je({...this.#e,queryNode:Te.cloneWithWhere(this.#e.queryNode,vr(e,r,n))})}having(...e){return new Je({...this.#e,queryNode:gt.cloneWithHaving(this.#e.queryNode,Ut(e))})}havingRef(e,r,n){return new Je({...this.#e,queryNode:gt.cloneWithHaving(this.#e.queryNode,vr(e,r,n))})}select(e){return new Je({...this.#e,queryNode:gt.cloneWithSelections(this.#e.queryNode,ir(e))})}distinctOn(e){return new Je({...this.#e,queryNode:gt.cloneWithDistinctOn(this.#e.queryNode,vi(e))})}modifyFront(e){return new Je({...this.#e,queryNode:gt.cloneWithFrontModifier(this.#e.queryNode,Fr.createWithExpression(e.toOperationNode()))})}modifyEnd(e){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.createWithExpression(e.toOperationNode()))})}distinct(){return new Je({...this.#e,queryNode:gt.cloneWithFrontModifier(this.#e.queryNode,Fr.create("Distinct"))})}forUpdate(e){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("ForUpdate",e?vs(e).map(It):void 0))})}forShare(e){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("ForShare",e?vs(e).map(It):void 0))})}forKeyShare(e){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("ForKeyShare",e?vs(e).map(It):void 0))})}forNoKeyUpdate(e){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("ForNoKeyUpdate",e?vs(e).map(It):void 0))})}skipLocked(){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("SkipLocked"))})}noWait(){return new Je({...this.#e,queryNode:Te.cloneWithEndModifier(this.#e.queryNode,Fr.create("NoWait"))})}selectAll(e){return new Je({...this.#e,queryNode:gt.cloneWithSelections(this.#e.queryNode,ur(e))})}innerJoin(...e){return this.#t("InnerJoin",e)}leftJoin(...e){return this.#t("LeftJoin",e)}rightJoin(...e){return this.#t("RightJoin",e)}fullJoin(...e){return this.#t("FullJoin",e)}crossJoin(...e){return this.#t("CrossJoin",e)}innerJoinLateral(...e){return this.#t("LateralInnerJoin",e)}leftJoinLateral(...e){return this.#t("LateralLeftJoin",e)}crossJoinLateral(...e){return this.#t("LateralCrossJoin",e)}crossApply(...e){return this.#t("CrossApply",e)}outerApply(...e){return this.#t("OuterApply",e)}#t(e,r){return new Je({...this.#e,queryNode:Te.cloneWithJoin(this.#e.queryNode,Ps(e,r))})}orderBy(...e){return new Je({...this.#e,queryNode:Te.cloneWithOrderByItems(this.#e.queryNode,qn(e))})}groupBy(e){return new Je({...this.#e,queryNode:gt.cloneWithGroupByItems(this.#e.queryNode,Pm(e))})}limit(e){return new Je({...this.#e,queryNode:gt.cloneWithLimit(this.#e.queryNode,Go.create(Rt(e)))})}offset(e){return new Je({...this.#e,queryNode:gt.cloneWithOffset(this.#e.queryNode,Im.create(Rt(e)))})}fetch(e,r="only"){return new Je({...this.#e,queryNode:gt.cloneWithFetch(this.#e.queryNode,Fm(e,r))})}top(e,r){return new Je({...this.#e,queryNode:Te.cloneWithTop(this.#e.queryNode,Yn(e,r))})}union(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("union",e,!1))})}unionAll(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("union",e,!0))})}intersect(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("intersect",e,!1))})}intersectAll(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("intersect",e,!0))})}except(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("except",e,!1))})}exceptAll(e){return new Je({...this.#e,queryNode:gt.cloneWithSetOperations(this.#e.queryNode,ri("except",e,!0))})}as(e){return new Wm(this,e)}clearSelect(){return new Je({...this.#e,queryNode:gt.cloneWithoutSelections(this.#e.queryNode)})}clearWhere(){return new Je({...this.#e,queryNode:Te.cloneWithoutWhere(this.#e.queryNode)})}clearLimit(){return new Je({...this.#e,queryNode:gt.cloneWithoutLimit(this.#e.queryNode)})}clearOffset(){return new Je({...this.#e,queryNode:gt.cloneWithoutOffset(this.#e.queryNode)})}clearOrderBy(){return new Je({...this.#e,queryNode:Te.cloneWithoutOrderBy(this.#e.queryNode)})}clearGroupBy(){return new Je({...this.#e,queryNode:gt.cloneWithoutGroupBy(this.#e.queryNode)})}$call(e){return e(this)}$if(e,r){return e?r(this):new Je({...this.#e})}$castTo(){return new Je(this.#e)}$narrowType(){return new Je(this.#e)}$assertType(){return new Je(this.#e)}$asTuple(){return new ut(this.toOperationNode())}$asScalar(){return new ut(this.toOperationNode())}withPlugin(e){return new Je({...this.#e,executor:this.#e.executor.withPlugin(e)})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.queryNode,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){const e=this.compile();return(await this.#e.executor.executeQuery(e)).rows}async executeTakeFirst(){const[e]=await this.execute();return e}async executeTakeFirstOrThrow(e=Ai){const r=await this.executeTakeFirst();if(r===void 0)throw Oi(e)?new e(this.toOperationNode()):e(this.toOperationNode());return r}async*stream(e=100){const r=this.compile(),n=this.#e.executor.stream(r,e);for await(const s of n)yield*s.rows}async explain(e,r){return await new Je({...this.#e,queryNode:Te.cloneWithExplain(this.#e.queryNode,e,r)}).execute()}}function Zo(t){return new Je(t)}class Wm{#e;#t;constructor(e,r){this.#e=e,this.#t=r}get expression(){return this.#e}get alias(){return this.#t}get isAliasedSelectQueryBuilder(){return!0}toOperationNode(){return Zr.create(this.#e.toOperationNode(),_t.create(this.#t))}}const on=p({is(t){return t.kind==="AggregateFunctionNode"},create(t,e=[]){return p({kind:"AggregateFunctionNode",func:t,aggregated:e})},cloneWithDistinct(t){return p({...t,distinct:!0})},cloneWithOrderBy(t,e,r=!1){const n=r?"withinGroup":"orderBy";return p({...t,[n]:t[n]?Gn.cloneWithItems(t[n],e):Gn.create(e)})},cloneWithFilter(t,e){return p({...t,filter:t.filter?Jt.cloneWithOperation(t.filter,"And",e):Jt.create(e)})},cloneWithOrFilter(t,e){return p({...t,filter:t.filter?Jt.cloneWithOperation(t.filter,"Or",e):Jt.create(e)})},cloneWithOver(t,e){return p({...t,over:e})}}),Kc=p({is(t){return t.kind==="FunctionNode"},create(t,e){return p({kind:"FunctionNode",func:t,arguments:e})}});class or{#e;constructor(e){this.#e=p(e)}get expressionType(){}as(e){return new Dm(this,e)}distinct(){return new or({...this.#e,aggregateFunctionNode:on.cloneWithDistinct(this.#e.aggregateFunctionNode)})}orderBy(...e){return new or({...this.#e,aggregateFunctionNode:Te.cloneWithOrderByItems(this.#e.aggregateFunctionNode,qn(e))})}clearOrderBy(){return new or({...this.#e,aggregateFunctionNode:Te.cloneWithoutOrderBy(this.#e.aggregateFunctionNode)})}withinGroupOrderBy(...e){return new or({...this.#e,aggregateFunctionNode:on.cloneWithOrderBy(this.#e.aggregateFunctionNode,qn(e),!0)})}filterWhere(...e){return new or({...this.#e,aggregateFunctionNode:on.cloneWithFilter(this.#e.aggregateFunctionNode,Ut(e))})}filterWhereRef(e,r,n){return new or({...this.#e,aggregateFunctionNode:on.cloneWithFilter(this.#e.aggregateFunctionNode,vr(e,r,n))})}over(e){const r=Em();return new or({...this.#e,aggregateFunctionNode:on.cloneWithOver(this.#e.aggregateFunctionNode,(e?e(r):r).toOperationNode())})}$call(e){return e(this)}$castTo(){return new or(this.#e)}$notNull(){return new or(this.#e)}toOperationNode(){return this.#e.aggregateFunctionNode}}class Dm{#e;#t;constructor(e,r){this.#e=e,this.#t=r}get expression(){return this.#e}get alias(){return this.#t}toOperationNode(){return Zr.create(this.#e.toOperationNode(),_t.create(this.#t))}}function Gc(){const t=(r,n)=>new ut(Kc.create(r,vi(n??[]))),e=(r,n)=>new or({aggregateFunctionNode:on.create(r,n?vi(n):void 0)});return Object.assign(t,{agg:e,avg(r){return e("avg",[r])},coalesce(...r){return t("coalesce",r)},count(r){return e("count",[r])},countAll(r){return new or({aggregateFunctionNode:on.create("count",ur(r))})},max(r){return e("max",[r])},min(r){return e("min",[r])},sum(r){return e("sum",[r])},any(r){return t("any",[r])},jsonAgg(r){return new or({aggregateFunctionNode:on.create("json_agg",[zt(r)?It(r):r.toOperationNode()])})},toJson(r){return new ut(Kc.create("to_json",[zt(r)?It(r):r.toOperationNode()]))}})}const Mm=p({is(t){return t.kind==="UnaryOperationNode"},create(t,e){return p({kind:"UnaryOperationNode",operator:t,operand:e})}});function Um(t,e){return Mm.create(tn.create(t),nr(e))}const Sr=p({is(t){return t.kind==="CaseNode"},create(t){return p({kind:"CaseNode",value:t})},cloneWithWhen(t,e){return p({...t,when:p(t.when?[...t.when,e]:[e])})},cloneWithThen(t,e){return p({...t,when:t.when?p([...t.when.slice(0,-1),Sn.cloneWithResult(t.when[t.when.length-1],e)]):void 0})},cloneWith(t,e){return p({...t,...e})}});class Xc{#e;constructor(e){this.#e=p(e)}when(...e){return new Yc({...this.#e,node:Sr.cloneWithWhen(this.#e.node,Sn.create(Ut(e)))})}}class Yc{#e;constructor(e){this.#e=p(e)}then(e){return new Bm({...this.#e,node:Sr.cloneWithThen(this.#e.node,zo(e)?Vo(e):Rt(e))})}}class Bm{#e;constructor(e){this.#e=p(e)}when(...e){return new Yc({...this.#e,node:Sr.cloneWithWhen(this.#e.node,Sn.create(Ut(e)))})}else(e){return new $m({...this.#e,node:Sr.cloneWith(this.#e.node,{else:zo(e)?Vo(e):Rt(e)})})}end(){return new ut(Sr.cloneWith(this.#e.node,{isStatement:!1}))}endCase(){return new ut(Sr.cloneWith(this.#e.node,{isStatement:!0}))}}class $m{#e;constructor(e){this.#e=p(e)}end(){return new ut(Sr.cloneWith(this.#e.node,{isStatement:!1}))}endCase(){return new ut(Sr.cloneWith(this.#e.node,{isStatement:!0}))}}const Zc=p({is(t){return t.kind==="JSONPathLegNode"},create(t,e){return p({kind:"JSONPathLegNode",type:t,value:e})}});class ea{#e;constructor(e){this.#e=e}at(e){return this.#t("ArrayLocation",e)}key(e){return this.#t("Member",e)}#t(e,r){return Ss.is(this.#e)?new Ci(Ss.cloneWithTraversal(this.#e,xi.is(this.#e.traversal)?xi.cloneWithLeg(this.#e.traversal,Zc.create(e,r)):wc.cloneWithValue(this.#e.traversal,hr.createImmediate(r)))):new Ci(xi.cloneWithLeg(this.#e,Zc.create(e,r)))}}class Ci extends ea{#e;constructor(e){super(e),this.#e=e}get expressionType(){}as(e){return new jm(this,e)}$castTo(){return new Ci(this.#e)}$notNull(){return new Ci(this.#e)}toOperationNode(){return this.#e}}class jm{#e;#t;constructor(e,r){this.#e=e,this.#t=r}get expression(){return this.#e}get alias(){return this.#t}toOperationNode(){return Zr.create(this.#e.toOperationNode(),tr(this.#t)?this.#t.toOperationNode():_t.create(this.#t))}}const eu=p({is(t){return t.kind==="TupleNode"},create(t){return p({kind:"TupleNode",values:p(t)})}}),zm=["varchar","char","text","integer","int2","int4","int8","smallint","bigint","boolean","real","double precision","float4","float8","decimal","numeric","binary","bytea","date","datetime","time","timetz","timestamp","timestamptz","serial","bigserial","uuid","json","jsonb","blob","varbinary","int4range","int4multirange","int8range","int8multirange","numrange","nummultirange","tsrange","tsmultirange","tstzrange","tstzmultirange","daterange","datemultirange"],Vm=[/^varchar\(\d+\)$/,/^char\(\d+\)$/,/^decimal\(\d+, \d+\)$/,/^numeric\(\d+, \d+\)$/,/^binary\(\d+\)$/,/^datetime\(\d+\)$/,/^time\(\d+\)$/,/^timetz\(\d+\)$/,/^timestamp\(\d+\)$/,/^timestamptz\(\d+\)$/,/^varbinary\(\d+\)$/],Qm=p({is(t){return t.kind==="DataTypeNode"},create(t){return p({kind:"DataTypeNode",dataType:t})}});function Hm(t){return!!(zm.includes(t)||Vm.some(e=>e.test(t)))}function kn(t){if(tr(t))return t.toOperationNode();if(Hm(t))return Qm.create(t);throw new Error(`invalid column data type ${JSON.stringify(t)}`)}const Jm=p({is(t){return t.kind==="CastNode"},create(t,e){return p({kind:"CastNode",expression:t,dataType:e})}});function ta(t=Xo){function e(s,a,h){return new ut(Qo(s,a,h))}function r(s,a){return new ut(Um(s,a))}const n=Object.assign(e,{fn:void 0,eb:void 0,selectFrom(s){return Zo({queryId:Tt(),executor:t,queryNode:gt.createFrom(ii(s))})},case(s){return new Xc({node:Sr.create(Yr(s)?void 0:nr(s))})},ref(s,a){return Yr(a)?new ut(rn(s)):new ea(Vp(s,a))},jsonPath(){return new ea(xi.create())},table(s){return new ut(It(s))},val(s){return new ut(Rt(s))},refTuple(...s){return new ut(eu.create(s.map(nr)))},tuple(...s){return new ut(eu.create(s.map(Rt)))},lit(s){return new ut(Vo(s))},unary:r,not(s){return r("not",s)},exists(s){return r("exists",s)},neg(s){return r("-",s)},between(s,a,h){return new ut(Jn.create(nr(s),tn.create("between"),en.create(Rt(a),Rt(h))))},betweenSymmetric(s,a,h){return new ut(Jn.create(nr(s),tn.create("between symmetric"),en.create(Rt(a),Rt(h))))},and(s){return Ir(s)?new ut(As(s,"and")):new ut(qc(s,"and"))},or(s){return Ir(s)?new ut(As(s,"or")):new ut(qc(s,"or"))},parens(...s){const a=Ut(s);return Wr.is(a)?new ut(a):new ut(Wr.create(a))},cast(s,a){return new ut(Jm.create(nr(s),kn(a)))},withSchema(s){return ta(t.withPluginAtFront(new ei(s)))}});return n.fn=Gc(),n.eb=n,n}function ni(t){return ta()}function En(t){if(tr(t))return t.toOperationNode();if(Yt(t))return t(ni()).toOperationNode();throw new Error(`invalid expression: ${JSON.stringify(t)}`)}function tu(t){if(tr(t))return t.toOperationNode();if(Yt(t))return t(ni()).toOperationNode();throw new Error(`invalid aliased expression: ${JSON.stringify(t)}`)}function Pi(t){return hc(t)||Rp(t)||Yt(t)}class Km{#e;get table(){return this.#e}constructor(e){this.#e=e}as(e){return new Gm(this.#e,e)}}class Gm{#e;#t;get table(){return this.#e}get alias(){return this.#t}constructor(e,r){this.#e=e,this.#t=r}toOperationNode(){return Zr.create(It(this.#e),_t.create(this.#t))}}function Xm(t){return fr(t)&&tr(t)&&zt(t.table)&&zt(t.alias)}function ii(t){return Ir(t)?t.map(e=>Li(e)):[Li(t)]}function Li(t){return zt(t)?ru(t):Xm(t)?t.toOperationNode():tu(t)}function ru(t){const e=" as ";if(t.includes(e)){const[r,n]=t.split(e).map(nu);return Zr.create(It(r),_t.create(n))}else return It(t)}function It(t){if(t.includes(".")){const[r,n]=t.split(".").map(nu);return Lr.createWithSchema(r,n)}else return Lr.create(t)}function nu(t){return t.trim()}const iu=p({is(t){return t.kind==="AddColumnNode"},create(t){return p({kind:"AddColumnNode",column:t})}}),xt=p({is(t){return t.kind==="ColumnDefinitionNode"},create(t,e){return p({kind:"ColumnDefinitionNode",column:Ot.create(t),dataType:e})},cloneWithFrontModifier(t,e){return p({...t,frontModifiers:t.frontModifiers?p([...t.frontModifiers,e]):[e]})},cloneWithEndModifier(t,e){return p({...t,endModifiers:t.endModifiers?p([...t.endModifiers,e]):[e]})},cloneWith(t,e){return p({...t,...e})}}),su=p({is(t){return t.kind==="DropColumnNode"},create(t){return p({kind:"DropColumnNode",column:Ot.create(t)})}}),ou=p({is(t){return t.kind==="RenameColumnNode"},create(t,e){return p({kind:"RenameColumnNode",column:Ot.create(t),renameTo:Ot.create(e)})}}),ra=p({is(t){return t.kind==="CheckConstraintNode"},create(t,e){return p({kind:"CheckConstraintNode",expression:t,name:e?_t.create(e):void 0})}}),Ym=["no action","restrict","cascade","set null","set default"],Rs=p({is(t){return t.kind==="ReferencesNode"},create(t,e){return p({kind:"ReferencesNode",table:t,columns:p([...e])})},cloneWithOnDelete(t,e){return p({...t,onDelete:e})},cloneWithOnUpdate(t,e){return p({...t,onUpdate:e})}});function au(t){return tr(t)?t.toOperationNode():hr.createImmediate(t)}const Ws=p({is(t){return t.kind==="GeneratedNode"},create(t){return p({kind:"GeneratedNode",...t})},createWithExpression(t){return p({kind:"GeneratedNode",always:!0,expression:t})},cloneWith(t,e){return p({...t,...e})}}),Zm=p({is(t){return t.kind==="DefaultValueNode"},create(t){return p({kind:"DefaultValueNode",defaultValue:t})}});function Ds(t){if(Ym.includes(t))return t;throw new Error(`invalid OnModifyForeignAction ${t}`)}class wt{#e;constructor(e){this.#e=e}autoIncrement(){return new wt(xt.cloneWith(this.#e,{autoIncrement:!0}))}identity(){return new wt(xt.cloneWith(this.#e,{identity:!0}))}primaryKey(){return new wt(xt.cloneWith(this.#e,{primaryKey:!0}))}references(e){const r=rn(e);if(!r.table||Bo.is(r.column))throw new Error(`invalid call references('${e}'). The reference must have format table.column or schema.table.column`);return new wt(xt.cloneWith(this.#e,{references:Rs.create(r.table,[r.column])}))}onDelete(e){if(!this.#e.references)throw new Error("on delete constraint can only be added for foreign keys");return new wt(xt.cloneWith(this.#e,{references:Rs.cloneWithOnDelete(this.#e.references,Ds(e))}))}onUpdate(e){if(!this.#e.references)throw new Error("on update constraint can only be added for foreign keys");return new wt(xt.cloneWith(this.#e,{references:Rs.cloneWithOnUpdate(this.#e.references,Ds(e))}))}unique(){return new wt(xt.cloneWith(this.#e,{unique:!0}))}notNull(){return new wt(xt.cloneWith(this.#e,{notNull:!0}))}unsigned(){return new wt(xt.cloneWith(this.#e,{unsigned:!0}))}defaultTo(e){return new wt(xt.cloneWith(this.#e,{defaultTo:Zm.create(au(e))}))}check(e){return new wt(xt.cloneWith(this.#e,{check:ra.create(e.toOperationNode())}))}generatedAlwaysAs(e){return new wt(xt.cloneWith(this.#e,{generated:Ws.createWithExpression(e.toOperationNode())}))}generatedAlwaysAsIdentity(){return new wt(xt.cloneWith(this.#e,{generated:Ws.create({identity:!0,always:!0})}))}generatedByDefaultAsIdentity(){return new wt(xt.cloneWith(this.#e,{generated:Ws.create({identity:!0,byDefault:!0})}))}stored(){if(!this.#e.generated)throw new Error("stored() can only be called after generatedAlwaysAs");return new wt(xt.cloneWith(this.#e,{generated:Ws.cloneWith(this.#e.generated,{stored:!0})}))}modifyFront(e){return new wt(xt.cloneWithFrontModifier(this.#e,e.toOperationNode()))}nullsNotDistinct(){return new wt(xt.cloneWith(this.#e,{nullsNotDistinct:!0}))}ifNotExists(){return new wt(xt.cloneWith(this.#e,{ifNotExists:!0}))}modifyEnd(e){return new wt(xt.cloneWithEndModifier(this.#e,e.toOperationNode()))}$call(e){return e(this)}toOperationNode(){return this.#e}}const lu=p({is(t){return t.kind==="ModifyColumnNode"},create(t){return p({kind:"ModifyColumnNode",column:t})}}),an=p({is(t){return t.kind==="ForeignKeyConstraintNode"},create(t,e,r,n){return p({kind:"ForeignKeyConstraintNode",columns:t,references:Rs.create(e,r),name:n?_t.create(n):void 0})},cloneWith(t,e){return p({...t,...e})}});class Mr{#e;constructor(e){this.#e=e}onDelete(e){return new Mr(an.cloneWith(this.#e,{onDelete:Ds(e)}))}onUpdate(e){return new Mr(an.cloneWith(this.#e,{onUpdate:Ds(e)}))}deferrable(){return new Mr(an.cloneWith(this.#e,{deferrable:!0}))}notDeferrable(){return new Mr(an.cloneWith(this.#e,{deferrable:!1}))}initiallyDeferred(){return new Mr(an.cloneWith(this.#e,{initiallyDeferred:!0}))}initiallyImmediate(){return new Mr(an.cloneWith(this.#e,{initiallyDeferred:!1}))}$call(e){return e(this)}toOperationNode(){return this.#e}}const Ms=p({is(t){return t.kind==="AddConstraintNode"},create(t){return p({kind:"AddConstraintNode",constraint:t})}}),An=p({is(t){return t.kind==="UniqueConstraintNode"},create(t,e,r){return p({kind:"UniqueConstraintNode",columns:p(t.map(Ot.create)),name:e?_t.create(e):void 0,nullsNotDistinct:r})},cloneWith(t,e){return p({...t,...e})}}),Us=p({is(t){return t.kind==="DropConstraintNode"},create(t){return p({kind:"DropConstraintNode",constraintName:_t.create(t)})},cloneWith(t,e){return p({...t,...e})}}),Fi=p({is(t){return t.kind==="AlterColumnNode"},create(t,e,r){return p({kind:"AlterColumnNode",column:Ot.create(t),[e]:r})}});class cu{#e;constructor(e){this.#e=e}setDataType(e){return new Ri(Fi.create(this.#e,"dataType",kn(e)))}setDefault(e){return new Ri(Fi.create(this.#e,"setDefault",au(e)))}dropDefault(){return new Ri(Fi.create(this.#e,"dropDefault",!0))}setNotNull(){return new Ri(Fi.create(this.#e,"setNotNull",!0))}dropNotNull(){return new Ri(Fi.create(this.#e,"dropNotNull",!0))}$call(e){return e(this)}}class Ri{#e;constructor(e){this.#e=e}toOperationNode(){return this.#e}}class si{#e;constructor(e){this.#e=p(e)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class ln{#e;constructor(e){this.#e=p(e)}onDelete(e){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.onDelete(e)})}onUpdate(e){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.onUpdate(e)})}deferrable(){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.deferrable()})}notDeferrable(){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.notDeferrable()})}initiallyDeferred(){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.initiallyDeferred()})}initiallyImmediate(){return new ln({...this.#e,constraintBuilder:this.#e.constraintBuilder.initiallyImmediate()})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(lt.cloneWithTableProps(this.#e.node,{addConstraint:Ms.create(this.#e.constraintBuilder.toOperationNode())}),this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class oi{#e;constructor(e){this.#e=p(e)}ifExists(){return new oi({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{dropConstraint:Us.cloneWith(this.#e.node.dropConstraint,{ifExists:!0})})})}cascade(){return new oi({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{dropConstraint:Us.cloneWith(this.#e.node.dropConstraint,{modifier:"cascade"})})})}restrict(){return new oi({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{dropConstraint:Us.cloneWith(this.#e.node.dropConstraint,{modifier:"restrict"})})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}const ai=p({is(t){return t.kind==="PrimaryKeyConstraintNode"},create(t,e){return p({kind:"PrimaryKeyConstraintNode",columns:p(t.map(Ot.create)),name:e?_t.create(e):void 0})},cloneWith(t,e){return p({...t,...e})}}),li=p({is(t){return t.kind==="AddIndexNode"},create(t){return p({kind:"AddIndexNode",name:_t.create(t)})},cloneWith(t,e){return p({...t,...e})},cloneWithColumns(t,e){return p({...t,columns:[...t.columns||[],...e]})}});class On{#e;constructor(e){this.#e=p(e)}unique(){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.cloneWith(this.#e.node.addIndex,{unique:!0})})})}column(e){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.cloneWithColumns(this.#e.node.addIndex,[ks(e)])})})}columns(e){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.cloneWithColumns(this.#e.node.addIndex,e.map(ks))})})}expression(e){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.cloneWithColumns(this.#e.node.addIndex,[e.toOperationNode()])})})}using(e){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.cloneWith(this.#e.node.addIndex,{using:rr.createWithSql(e)})})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class cn{#e;constructor(e){this.#e=e}nullsNotDistinct(){return new cn(An.cloneWith(this.#e,{nullsNotDistinct:!0}))}deferrable(){return new cn(An.cloneWith(this.#e,{deferrable:!0}))}notDeferrable(){return new cn(An.cloneWith(this.#e,{deferrable:!1}))}initiallyDeferred(){return new cn(An.cloneWith(this.#e,{initiallyDeferred:!0}))}initiallyImmediate(){return new cn(An.cloneWith(this.#e,{initiallyDeferred:!1}))}$call(e){return e(this)}toOperationNode(){return this.#e}}class Tn{#e;constructor(e){this.#e=e}deferrable(){return new Tn(ai.cloneWith(this.#e,{deferrable:!0}))}notDeferrable(){return new Tn(ai.cloneWith(this.#e,{deferrable:!1}))}initiallyDeferred(){return new Tn(ai.cloneWith(this.#e,{initiallyDeferred:!0}))}initiallyImmediate(){return new Tn(ai.cloneWith(this.#e,{initiallyDeferred:!1}))}$call(e){return e(this)}toOperationNode(){return this.#e}}class uu{#e;constructor(e){this.#e=e}$call(e){return e(this)}toOperationNode(){return this.#e}}const e_=p({is(t){return t.kind==="RenameConstraintNode"},create(t,e){return p({kind:"RenameConstraintNode",oldName:_t.create(t),newName:_t.create(e)})}});class t_{#e;constructor(e){this.#e=p(e)}renameTo(e){return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{renameTo:It(e)})})}setSchema(e){return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{setSchema:_t.create(e)})})}alterColumn(e,r){const n=r(new cu(e));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,n.toOperationNode())})}dropColumn(e){return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,su.create(e))})}renameColumn(e,r){return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,ou.create(e,r))})}addColumn(e,r,n=Zt){const s=n(new wt(xt.create(e,kn(r))));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,iu.create(s.toOperationNode()))})}modifyColumn(e,r,n=Zt){const s=n(new wt(xt.create(e,kn(r))));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,lu.create(s.toOperationNode()))})}addUniqueConstraint(e,r,n=Zt){const s=n(new cn(An.create(r,e)));return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addConstraint:Ms.create(s.toOperationNode())})})}addCheckConstraint(e,r,n=Zt){const s=n(new uu(ra.create(r.toOperationNode(),e)));return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addConstraint:Ms.create(s.toOperationNode())})})}addForeignKeyConstraint(e,r,n,s,a=Zt){const h=a(new Mr(an.create(r.map(Ot.create),It(n),s.map(Ot.create),e)));return new ln({...this.#e,constraintBuilder:h})}addPrimaryKeyConstraint(e,r,n=Zt){const s=n(new Tn(ai.create(r,e)));return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addConstraint:Ms.create(s.toOperationNode())})})}dropConstraint(e){return new oi({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{dropConstraint:Us.create(e)})})}renameConstraint(e,r){return new oi({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{renameConstraint:e_.create(e,r)})})}addIndex(e){return new On({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{addIndex:li.create(e)})})}dropIndex(e){return new si({...this.#e,node:lt.cloneWithTableProps(this.#e.node,{dropIndex:Ni.create(e)})})}$call(e){return e(this)}}class pr{#e;constructor(e){this.#e=p(e)}alterColumn(e,r){const n=r(new cu(e));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,n.toOperationNode())})}dropColumn(e){return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,su.create(e))})}renameColumn(e,r){return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,ou.create(e,r))})}addColumn(e,r,n=Zt){const s=n(new wt(xt.create(e,kn(r))));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,iu.create(s.toOperationNode()))})}modifyColumn(e,r,n=Zt){const s=n(new wt(xt.create(e,kn(r))));return new pr({...this.#e,node:lt.cloneWithColumnAlteration(this.#e.node,lu.create(s.toOperationNode()))})}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class du extends $c{transformPrimitiveValueList(e){return Es.create(e.values.map(hr.createImmediate))}transformValue(e){return hr.createImmediate(e.value)}}class mr{#e;constructor(e){this.#e=p(e)}ifNotExists(){return new mr({...this.#e,node:Cr.cloneWith(this.#e.node,{ifNotExists:!0})})}unique(){return new mr({...this.#e,node:Cr.cloneWith(this.#e.node,{unique:!0})})}nullsNotDistinct(){return new mr({...this.#e,node:Cr.cloneWith(this.#e.node,{nullsNotDistinct:!0})})}on(e){return new mr({...this.#e,node:Cr.cloneWith(this.#e.node,{table:It(e)})})}column(e){return new mr({...this.#e,node:Cr.cloneWithColumns(this.#e.node,[ks(e)])})}columns(e){return new mr({...this.#e,node:Cr.cloneWithColumns(this.#e.node,e.map(ks))})}expression(e){return new mr({...this.#e,node:Cr.cloneWithColumns(this.#e.node,[e.toOperationNode()])})}using(e){return new mr({...this.#e,node:Cr.cloneWith(this.#e.node,{using:rr.createWithSql(e)})})}where(...e){const r=new du;return new mr({...this.#e,node:Te.cloneWithWhere(this.#e.node,r.transformNode(Ut(e),this.#e.queryId))})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class na{#e;constructor(e){this.#e=p(e)}ifNotExists(){return new na({...this.#e,node:fc.cloneWith(this.#e.node,{ifNotExists:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}function r_(t){if(Fp.includes(t))return t;throw new Error(`invalid OnCommitAction ${t}`)}class ar{#e;constructor(e){this.#e=p(e)}temporary(){return new ar({...this.#e,node:er.cloneWith(this.#e.node,{temporary:!0})})}onCommit(e){return new ar({...this.#e,node:er.cloneWith(this.#e.node,{onCommit:r_(e)})})}ifNotExists(){return new ar({...this.#e,node:er.cloneWith(this.#e.node,{ifNotExists:!0})})}addColumn(e,r,n=Zt){const s=n(new wt(xt.create(e,kn(r))));return new ar({...this.#e,node:er.cloneWithColumn(this.#e.node,s.toOperationNode())})}addPrimaryKeyConstraint(e,r,n=Zt){const s=n(new Tn(ai.create(r,e)));return new ar({...this.#e,node:er.cloneWithConstraint(this.#e.node,s.toOperationNode())})}addUniqueConstraint(e,r,n=Zt){const s=n(new cn(An.create(r,e)));return new ar({...this.#e,node:er.cloneWithConstraint(this.#e.node,s.toOperationNode())})}addCheckConstraint(e,r,n=Zt){const s=n(new uu(ra.create(r.toOperationNode(),e)));return new ar({...this.#e,node:er.cloneWithConstraint(this.#e.node,s.toOperationNode())})}addForeignKeyConstraint(e,r,n,s,a=Zt){const h=a(new Mr(an.create(r.map(Ot.create),It(n),s.map(Ot.create),e)));return new ar({...this.#e,node:er.cloneWithConstraint(this.#e.node,h.toOperationNode())})}modifyFront(e){return new ar({...this.#e,node:er.cloneWithFrontModifier(this.#e.node,e.toOperationNode())})}modifyEnd(e){return new ar({...this.#e,node:er.cloneWithEndModifier(this.#e.node,e.toOperationNode())})}as(e){return new ar({...this.#e,node:er.cloneWith(this.#e.node,{selectQuery:En(e)})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class Wi{#e;constructor(e){this.#e=p(e)}on(e){return new Wi({...this.#e,node:Ni.cloneWith(this.#e.node,{table:It(e)})})}ifExists(){return new Wi({...this.#e,node:Ni.cloneWith(this.#e.node,{ifExists:!0})})}cascade(){return new Wi({...this.#e,node:Ni.cloneWith(this.#e.node,{cascade:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class Bs{#e;constructor(e){this.#e=p(e)}ifExists(){return new Bs({...this.#e,node:Do.cloneWith(this.#e.node,{ifExists:!0})})}cascade(){return new Bs({...this.#e,node:Do.cloneWith(this.#e.node,{cascade:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class $s{#e;constructor(e){this.#e=p(e)}ifExists(){return new $s({...this.#e,node:Mo.cloneWith(this.#e.node,{ifExists:!0})})}cascade(){return new $s({...this.#e,node:Mo.cloneWith(this.#e.node,{cascade:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}const un=p({is(t){return t.kind==="CreateViewNode"},create(t){return p({kind:"CreateViewNode",name:Pr.create(t)})},cloneWith(t,e){return p({...t,...e})}});class n_{#e=new du;transformQuery(e){return this.#e.transformNode(e.node,e.queryId)}transformResult(e){return Promise.resolve(e.result)}}class dn{#e;constructor(e){this.#e=p(e)}temporary(){return new dn({...this.#e,node:un.cloneWith(this.#e.node,{temporary:!0})})}materialized(){return new dn({...this.#e,node:un.cloneWith(this.#e.node,{materialized:!0})})}ifNotExists(){return new dn({...this.#e,node:un.cloneWith(this.#e.node,{ifNotExists:!0})})}orReplace(){return new dn({...this.#e,node:un.cloneWith(this.#e.node,{orReplace:!0})})}columns(e){return new dn({...this.#e,node:un.cloneWith(this.#e.node,{columns:e.map(xc)})})}as(e){const r=e.withPlugin(new n_).toOperationNode();return new dn({...this.#e,node:un.cloneWith(this.#e.node,{as:r})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}const js=p({is(t){return t.kind==="DropViewNode"},create(t){return p({kind:"DropViewNode",name:Pr.create(t)})},cloneWith(t,e){return p({...t,...e})}});class Di{#e;constructor(e){this.#e=p(e)}materialized(){return new Di({...this.#e,node:js.cloneWith(this.#e.node,{materialized:!0})})}ifExists(){return new Di({...this.#e,node:js.cloneWith(this.#e.node,{ifExists:!0})})}cascade(){return new Di({...this.#e,node:js.cloneWith(this.#e.node,{cascade:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}const fu=p({is(t){return t.kind==="CreateTypeNode"},create(t){return p({kind:"CreateTypeNode",name:t})},cloneWithEnum(t,e){return p({...t,enum:Es.create(e.map(hr.createImmediate))})}});class ia{#e;constructor(e){this.#e=p(e)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}asEnum(e){return new ia({...this.#e,node:fu.cloneWithEnum(this.#e.node,e)})}$call(e){return e(this)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}const hu=p({is(t){return t.kind==="DropTypeNode"},create(t){return p({kind:"DropTypeNode",name:t})},cloneWith(t,e){return p({...t,...e})}});class sa{#e;constructor(e){this.#e=p(e)}ifExists(){return new sa({...this.#e,node:hu.cloneWith(this.#e.node,{ifExists:!0})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}function pu(t){if(t.includes(".")){const r=t.split(".").map(i_);if(r.length===2)return Pr.createWithSchema(r[0],r[1]);throw new Error(`invalid schemable identifier ${t}`)}else return Pr.create(t)}function i_(t){return t.trim()}const zs=p({is(t){return t.kind==="RefreshMaterializedViewNode"},create(t){return p({kind:"RefreshMaterializedViewNode",name:Pr.create(t)})},cloneWith(t,e){return p({...t,...e})}});class Mi{#e;constructor(e){this.#e=p(e)}concurrently(){return new Mi({...this.#e,node:zs.cloneWith(this.#e.node,{concurrently:!0,withNoData:!1})})}withData(){return new Mi({...this.#e,node:zs.cloneWith(this.#e.node,{withNoData:!1})})}withNoData(){return new Mi({...this.#e,node:zs.cloneWith(this.#e.node,{withNoData:!0,concurrently:!1})})}$call(e){return e(this)}toOperationNode(){return this.#e.executor.transformQuery(this.#e.node,this.#e.queryId)}compile(){return this.#e.executor.compileQuery(this.toOperationNode(),this.#e.queryId)}async execute(){await this.#e.executor.executeQuery(this.compile())}}class Ui{#e;constructor(e){this.#e=e}createTable(e){return new ar({queryId:Tt(),executor:this.#e,node:er.create(It(e))})}dropTable(e){return new $s({queryId:Tt(),executor:this.#e,node:Mo.create(It(e))})}createIndex(e){return new mr({queryId:Tt(),executor:this.#e,node:Cr.create(e)})}dropIndex(e){return new Wi({queryId:Tt(),executor:this.#e,node:Ni.create(e)})}createSchema(e){return new na({queryId:Tt(),executor:this.#e,node:fc.create(e)})}dropSchema(e){return new Bs({queryId:Tt(),executor:this.#e,node:Do.create(e)})}alterTable(e){return new t_({queryId:Tt(),executor:this.#e,node:lt.create(It(e))})}createView(e){return new dn({queryId:Tt(),executor:this.#e,node:un.create(e)})}refreshMaterializedView(e){return new Mi({queryId:Tt(),executor:this.#e,node:zs.create(e)})}dropView(e){return new Di({queryId:Tt(),executor:this.#e,node:js.create(e)})}createType(e){return new ia({queryId:Tt(),executor:this.#e,node:fu.create(pu(e))})}dropType(e){return new sa({queryId:Tt(),executor:this.#e,node:hu.create(pu(e))})}withPlugin(e){return new Ui(this.#e.withPlugin(e))}withoutPlugins(){return new Ui(this.#e.withoutPlugins())}withSchema(e){return new Ui(this.#e.withPluginAtFront(new ei(e)))}}class s_{ref(e){return new $p(e)}table(e){return new Km(e)}}class o_{#e;constructor(e){this.#e=e}async provideConnection(e){const r=await this.#e.acquireConnection();try{return await e(r)}finally{await this.#e.releaseConnection(r)}}}class In extends Qc{#e;#t;#r;constructor(e,r,n,s=[]){super(s),this.#e=e,this.#t=r,this.#r=n}get adapter(){return this.#t}compileQuery(e,r){return this.#e.compileQuery(e,r)}provideConnection(e){return this.#r.provideConnection(e)}withPlugins(e){return new In(this.#e,this.#t,this.#r,[...this.plugins,...e])}withPlugin(e){return new In(this.#e,this.#t,this.#r,[...this.plugins,e])}withPluginAtFront(e){return new In(this.#e,this.#t,this.#r,[e,...this.plugins])}withConnectionProvider(e){return new In(this.#e,this.#t,e,[...this.plugins])}withoutPlugins(){return new In(this.#e,this.#t,this.#r,[])}}function oa(){return typeof performance<"u"&&Yt(performance.now)?performance.now():Date.now()}class a_{#e;#t;#r;#s;#i;#o=new WeakSet;constructor(e,r){this.#s=!1,this.#e=e,this.#t=r}async init(){if(this.#i)throw new Error("driver has already been destroyed");this.#r||(this.#r=this.#e.init().then(()=>{this.#s=!0}).catch(e=>(this.#r=void 0,Promise.reject(e)))),await this.#r}async acquireConnection(){if(this.#i)throw new Error("driver has already been destroyed");this.#s||await this.init();const e=await this.#e.acquireConnection();return this.#o.has(e)||(this.#c()&&this.#n(e),this.#o.add(e)),e}async releaseConnection(e){await this.#e.releaseConnection(e)}beginTransaction(e,r){return this.#e.beginTransaction(e,r)}commitTransaction(e){return this.#e.commitTransaction(e)}rollbackTransaction(e){return this.#e.rollbackTransaction(e)}savepoint(e,r,n){if(this.#e.savepoint)return this.#e.savepoint(e,r,n);throw new Error("The `savepoint` method is not supported by this driver")}rollbackToSavepoint(e,r,n){if(this.#e.rollbackToSavepoint)return this.#e.rollbackToSavepoint(e,r,n);throw new Error("The `rollbackToSavepoint` method is not supported by this driver")}releaseSavepoint(e,r,n){if(this.#e.releaseSavepoint)return this.#e.releaseSavepoint(e,r,n);throw new Error("The `releaseSavepoint` method is not supported by this driver")}async destroy(){this.#r&&(await this.#r,this.#i||(this.#i=this.#e.destroy().catch(e=>(this.#i=void 0,Promise.reject(e)))),await this.#i)}#c(){return this.#t.isLevelEnabled("query")||this.#t.isLevelEnabled("error")}#n(e){const r=e.executeQuery,n=e.streamQuery,s=this;e.executeQuery=async a=>{let h;const g=oa();try{return await r.call(e,a)}catch(w){throw h=w,await s.#l(w,a,g),w}finally{h||await s.#a(a,g)}},e.streamQuery=async function*(a,h){let g;const w=oa();try{for await(const q of n.call(e,a,h))yield q}catch(q){throw g=q,await s.#l(q,a,w),q}finally{g||await s.#a(a,w,!0)}}}async#l(e,r,n){await this.#t.error(()=>({level:"error",error:e,query:r,queryDurationMillis:this.#u(n)}))}async#a(e,r,n=!1){await this.#t.query(()=>({level:"query",isStream:n,query:e,queryDurationMillis:this.#u(r)}))}#u(e){return oa()-e}}const l_=()=>{};class aa{#e;#t;constructor(e){this.#e=e}async provideConnection(e){for(;this.#t;)await this.#t.catch(l_);return this.#t=this.#r(e).finally(()=>{this.#t=void 0}),this.#t}async#r(e){return await e(this.#e)}}const c_=["read only","read write"],u_=["read uncommitted","read committed","repeatable read","serializable","snapshot"];function mu(t){if(t.accessMode&&!c_.includes(t.accessMode))throw new Error(`invalid transaction access mode ${t.accessMode}`);if(t.isolationLevel&&!u_.includes(t.isolationLevel))throw new Error(`invalid transaction isolation level ${t.isolationLevel}`)}p(["query","error"]);class d_{#e;#t;constructor(e){Yt(e)?(this.#t=e,this.#e=p({query:!0,error:!0})):(this.#t=f_,this.#e=p({query:e.includes("query"),error:e.includes("error")}))}isLevelEnabled(e){return this.#e[e]}async query(e){this.#e.query&&await this.#t(e())}async error(e){this.#e.error&&await this.#t(e())}}function f_(t){if(t.level==="query"){const e=`kysely:query:${t.isStream?"stream:":""}`;console.log(`${e} ${t.query.sql}`),console.log(`${e} duration: ${t.queryDurationMillis.toFixed(1)}ms`)}else t.level==="error"&&(t.error instanceof Error?console.error(`kysely:error: ${t.error.stack??t.error.message}`):console.error(`kysely:error: ${JSON.stringify({error:t.error,query:t.query.sql,queryDurationMillis:t.queryDurationMillis})}`))}function h_(t){return fr(t)&&Yt(t.compile)}Symbol.asyncDispose??=Symbol("Symbol.asyncDispose");class fn extends sn{#e;constructor(e){let r,n;if(p_(e))r={executor:e.executor},n={...e};else{const s=e.dialect,a=s.createDriver(),h=s.createQueryCompiler(),g=s.createAdapter(),w=new d_(e.log??[]),q=new a_(a,w),k=new o_(q),N=new In(h,g,k,e.plugins??[]);r={executor:N},n={config:e,executor:N,dialect:s,driver:q}}super(r),this.#e=p(n)}get schema(){return new Ui(this.#e.executor)}get dynamic(){return new s_}get introspection(){return this.#e.dialect.createIntrospector(this.withoutPlugins())}case(e){return new Xc({node:Sr.create(Yr(e)?void 0:En(e))})}get fn(){return Gc()}transaction(){return new Vs({...this.#e})}startTransaction(){return new Qs({...this.#e})}connection(){return new m_({...this.#e})}withPlugin(e){return new fn({...this.#e,executor:this.#e.executor.withPlugin(e)})}withoutPlugins(){return new fn({...this.#e,executor:this.#e.executor.withoutPlugins()})}withSchema(e){return new fn({...this.#e,executor:this.#e.executor.withPluginAtFront(new ei(e))})}withTables(){return new fn({...this.#e})}async destroy(){await this.#e.driver.destroy()}get isTransaction(){return!1}getExecutor(){return this.#e.executor}executeQuery(e,r){r!==void 0&&Kn("Passing `queryId` in `db.executeQuery` is deprecated and will result in a compile-time error in the future.");const n=h_(e)?e.compile():e;return this.getExecutor().executeQuery(n)}async[Symbol.asyncDispose](){await this.destroy()}}class Cn extends fn{#e;constructor(e){super(e),this.#e=e}get isTransaction(){return!0}transaction(){throw new Error("calling the transaction method for a Transaction is not supported")}connection(){throw new Error("calling the connection method for a Transaction is not supported")}async destroy(){throw new Error("calling the destroy method for a Transaction is not supported")}withPlugin(e){return new Cn({...this.#e,executor:this.#e.executor.withPlugin(e)})}withoutPlugins(){return new Cn({...this.#e,executor:this.#e.executor.withoutPlugins()})}withSchema(e){return new Cn({...this.#e,executor:this.#e.executor.withPluginAtFront(new ei(e))})}withTables(){return new Cn({...this.#e})}}function p_(t){return fr(t)&&fr(t.config)&&fr(t.driver)&&fr(t.executor)&&fr(t.dialect)}class m_{#e;constructor(e){this.#e=p(e)}async execute(e){return this.#e.executor.provideConnection(async r=>{const n=this.#e.executor.withConnectionProvider(new aa(r)),s=new fn({...this.#e,executor:n});return await e(s)})}}class Vs{#e;constructor(e){this.#e=p(e)}setAccessMode(e){return new Vs({...this.#e,accessMode:e})}setIsolationLevel(e){return new Vs({...this.#e,isolationLevel:e})}async execute(e){const{isolationLevel:r,accessMode:n,...s}=this.#e,a={isolationLevel:r,accessMode:n};return mu(a),this.#e.executor.provideConnection(async h=>{const g=this.#e.executor.withConnectionProvider(new aa(h)),w=new Cn({...s,executor:g});let q=!1;try{await this.#e.driver.beginTransaction(h,a),q=!0;const k=await e(w);return await this.#e.driver.commitTransaction(h),k}catch(k){throw q&&await this.#e.driver.rollbackTransaction(h),k}})}}class Qs{#e;constructor(e){this.#e=p(e)}setAccessMode(e){return new Qs({...this.#e,accessMode:e})}setIsolationLevel(e){return new Qs({...this.#e,isolationLevel:e})}async execute(){const{isolationLevel:e,accessMode:r,...n}=this.#e,s={isolationLevel:e,accessMode:r};mu(s);const a=await Vc(this.#e.executor);return await this.#e.driver.beginTransaction(a.connection,s),new Ur({...n,connection:a,executor:this.#e.executor.withConnectionProvider(new aa(a.connection))})}}class Ur extends Cn{#e;#t;#r;constructor(e){const r={isCommitted:!1,isRolledBack:!1};e={...e,executor:new hn(e.executor,r)};const{connection:n,...s}=e;super(s),this.#e=p(e),this.#r=r;const a=Tt();this.#t=h=>e.executor.compileQuery(h,a)}get isCommitted(){return this.#r.isCommitted}get isRolledBack(){return this.#r.isRolledBack}commit(){return Pn(this.#r),new Bi(async()=>{await this.#e.driver.commitTransaction(this.#e.connection.connection),this.#r.isCommitted=!0,this.#e.connection.release()})}rollback(){return Pn(this.#r),new Bi(async()=>{await this.#e.driver.rollbackTransaction(this.#e.connection.connection),this.#r.isRolledBack=!0,this.#e.connection.release()})}savepoint(e){return Pn(this.#r),new Bi(async()=>(await this.#e.driver.savepoint?.(this.#e.connection.connection,e,this.#t),new Ur({...this.#e})))}rollbackToSavepoint(e){return Pn(this.#r),new Bi(async()=>(await this.#e.driver.rollbackToSavepoint?.(this.#e.connection.connection,e,this.#t),new Ur({...this.#e})))}releaseSavepoint(e){return Pn(this.#r),new Bi(async()=>(await this.#e.driver.releaseSavepoint?.(this.#e.connection.connection,e,this.#t),new Ur({...this.#e})))}withPlugin(e){return new Ur({...this.#e,executor:this.#e.executor.withPlugin(e)})}withoutPlugins(){return new Ur({...this.#e,executor:this.#e.executor.withoutPlugins()})}withSchema(e){return new Ur({...this.#e,executor:this.#e.executor.withPluginAtFront(new ei(e))})}withTables(){return new Ur({...this.#e})}}class Bi{#e;constructor(e){this.#e=e}async execute(){return await this.#e()}}function Pn(t){if(t.isCommitted)throw new Error("Transaction is already committed");if(t.isRolledBack)throw new Error("Transaction is already rolled back")}class hn{#e;#t;constructor(e,r){e instanceof hn?this.#e=e.#e:this.#e=e,this.#t=r}get adapter(){return this.#e.adapter}get plugins(){return this.#e.plugins}transformQuery(e,r){return this.#e.transformQuery(e,r)}compileQuery(e,r){return this.#e.compileQuery(e,r)}provideConnection(e){return this.#e.provideConnection(e)}executeQuery(e){return Pn(this.#t),this.#e.executeQuery(e)}stream(e,r){return Pn(this.#t),this.#e.stream(e,r)}withConnectionProvider(e){return new hn(this.#e.withConnectionProvider(e),this.#t)}withPlugin(e){return new hn(this.#e.withPlugin(e),this.#t)}withPlugins(e){return new hn(this.#e.withPlugins(e),this.#t)}withPluginAtFront(e){return new hn(this.#e.withPluginAtFront(e),this.#t)}withoutPlugins(){return new hn(this.#e.withoutPlugins(),this.#t)}}class __{nodeStack=[];get parentNode(){return this.nodeStack[this.nodeStack.length-2]}#e=p({AliasNode:this.visitAlias.bind(this),ColumnNode:this.visitColumn.bind(this),IdentifierNode:this.visitIdentifier.bind(this),SchemableIdentifierNode:this.visitSchemableIdentifier.bind(this),RawNode:this.visitRaw.bind(this),ReferenceNode:this.visitReference.bind(this),SelectQueryNode:this.visitSelectQuery.bind(this),SelectionNode:this.visitSelection.bind(this),TableNode:this.visitTable.bind(this),FromNode:this.visitFrom.bind(this),SelectAllNode:this.visitSelectAll.bind(this),AndNode:this.visitAnd.bind(this),OrNode:this.visitOr.bind(this),ValueNode:this.visitValue.bind(this),ValueListNode:this.visitValueList.bind(this),PrimitiveValueListNode:this.visitPrimitiveValueList.bind(this),ParensNode:this.visitParens.bind(this),JoinNode:this.visitJoin.bind(this),OperatorNode:this.visitOperator.bind(this),WhereNode:this.visitWhere.bind(this),InsertQueryNode:this.visitInsertQuery.bind(this),DeleteQueryNode:this.visitDeleteQuery.bind(this),ReturningNode:this.visitReturning.bind(this),CreateTableNode:this.visitCreateTable.bind(this),AddColumnNode:this.visitAddColumn.bind(this),ColumnDefinitionNode:this.visitColumnDefinition.bind(this),DropTableNode:this.visitDropTable.bind(this),DataTypeNode:this.visitDataType.bind(this),OrderByNode:this.visitOrderBy.bind(this),OrderByItemNode:this.visitOrderByItem.bind(this),GroupByNode:this.visitGroupBy.bind(this),GroupByItemNode:this.visitGroupByItem.bind(this),UpdateQueryNode:this.visitUpdateQuery.bind(this),ColumnUpdateNode:this.visitColumnUpdate.bind(this),LimitNode:this.visitLimit.bind(this),OffsetNode:this.visitOffset.bind(this),OnConflictNode:this.visitOnConflict.bind(this),OnDuplicateKeyNode:this.visitOnDuplicateKey.bind(this),CreateIndexNode:this.visitCreateIndex.bind(this),DropIndexNode:this.visitDropIndex.bind(this),ListNode:this.visitList.bind(this),PrimaryKeyConstraintNode:this.visitPrimaryKeyConstraint.bind(this),UniqueConstraintNode:this.visitUniqueConstraint.bind(this),ReferencesNode:this.visitReferences.bind(this),CheckConstraintNode:this.visitCheckConstraint.bind(this),WithNode:this.visitWith.bind(this),CommonTableExpressionNode:this.visitCommonTableExpression.bind(this),CommonTableExpressionNameNode:this.visitCommonTableExpressionName.bind(this),HavingNode:this.visitHaving.bind(this),CreateSchemaNode:this.visitCreateSchema.bind(this),DropSchemaNode:this.visitDropSchema.bind(this),AlterTableNode:this.visitAlterTable.bind(this),DropColumnNode:this.visitDropColumn.bind(this),RenameColumnNode:this.visitRenameColumn.bind(this),AlterColumnNode:this.visitAlterColumn.bind(this),ModifyColumnNode:this.visitModifyColumn.bind(this),AddConstraintNode:this.visitAddConstraint.bind(this),DropConstraintNode:this.visitDropConstraint.bind(this),RenameConstraintNode:this.visitRenameConstraint.bind(this),ForeignKeyConstraintNode:this.visitForeignKeyConstraint.bind(this),CreateViewNode:this.visitCreateView.bind(this),RefreshMaterializedViewNode:this.visitRefreshMaterializedView.bind(this),DropViewNode:this.visitDropView.bind(this),GeneratedNode:this.visitGenerated.bind(this),DefaultValueNode:this.visitDefaultValue.bind(this),OnNode:this.visitOn.bind(this),ValuesNode:this.visitValues.bind(this),SelectModifierNode:this.visitSelectModifier.bind(this),CreateTypeNode:this.visitCreateType.bind(this),DropTypeNode:this.visitDropType.bind(this),ExplainNode:this.visitExplain.bind(this),DefaultInsertValueNode:this.visitDefaultInsertValue.bind(this),AggregateFunctionNode:this.visitAggregateFunction.bind(this),OverNode:this.visitOver.bind(this),PartitionByNode:this.visitPartitionBy.bind(this),PartitionByItemNode:this.visitPartitionByItem.bind(this),SetOperationNode:this.visitSetOperation.bind(this),BinaryOperationNode:this.visitBinaryOperation.bind(this),UnaryOperationNode:this.visitUnaryOperation.bind(this),UsingNode:this.visitUsing.bind(this),FunctionNode:this.visitFunction.bind(this),CaseNode:this.visitCase.bind(this),WhenNode:this.visitWhen.bind(this),JSONReferenceNode:this.visitJSONReference.bind(this),JSONPathNode:this.visitJSONPath.bind(this),JSONPathLegNode:this.visitJSONPathLeg.bind(this),JSONOperatorChainNode:this.visitJSONOperatorChain.bind(this),TupleNode:this.visitTuple.bind(this),MergeQueryNode:this.visitMergeQuery.bind(this),MatchedNode:this.visitMatched.bind(this),AddIndexNode:this.visitAddIndex.bind(this),CastNode:this.visitCast.bind(this),FetchNode:this.visitFetch.bind(this),TopNode:this.visitTop.bind(this),OutputNode:this.visitOutput.bind(this),OrActionNode:this.visitOrAction.bind(this),CollateNode:this.visitCollate.bind(this)});visitNode=e=>{this.nodeStack.push(e),this.#e[e.kind](e),this.nodeStack.pop()}}const g_=/'/g;class y_ extends __{#e="";#t=[];get numParameters(){return this.#t.length}compileQuery(e,r){return this.#e="",this.#t=[],this.nodeStack.splice(0,this.nodeStack.length),this.visitNode(e),p({query:e,queryId:r,sql:this.getSql(),parameters:[...this.#t]})}getSql(){return this.#e}visitSelectQuery(e){const r=this.parentNode!==void 0&&!Wr.is(this.parentNode)&&!Wt.is(this.parentNode)&&!er.is(this.parentNode)&&!un.is(this.parentNode)&&!Jc.is(this.parentNode);this.parentNode===void 0&&e.explain&&(this.visitNode(e.explain),this.append(" ")),r&&this.append("("),e.with&&(this.visitNode(e.with),this.append(" ")),this.append("select"),e.distinctOn&&(this.append(" "),this.compileDistinctOn(e.distinctOn)),e.frontModifiers?.length&&(this.append(" "),this.compileList(e.frontModifiers," ")),e.top&&(this.append(" "),this.visitNode(e.top)),e.selections&&(this.append(" "),this.compileList(e.selections)),e.from&&(this.append(" "),this.visitNode(e.from)),e.joins&&(this.append(" "),this.compileList(e.joins," ")),e.where&&(this.append(" "),this.visitNode(e.where)),e.groupBy&&(this.append(" "),this.visitNode(e.groupBy)),e.having&&(this.append(" "),this.visitNode(e.having)),e.setOperations&&(this.append(" "),this.compileList(e.setOperations," ")),e.orderBy&&(this.append(" "),this.visitNode(e.orderBy)),e.limit&&(this.append(" "),this.visitNode(e.limit)),e.offset&&(this.append(" "),this.visitNode(e.offset)),e.fetch&&(this.append(" "),this.visitNode(e.fetch)),e.endModifiers?.length&&(this.append(" "),this.compileList(this.sortSelectModifiers([...e.endModifiers])," ")),r&&this.append(")")}visitFrom(e){this.append("from "),this.compileList(e.froms)}visitSelection(e){this.visitNode(e.selection)}visitColumn(e){this.visitNode(e.column)}compileDistinctOn(e){this.append("distinct on ("),this.compileList(e),this.append(")")}compileList(e,r=", "){const n=e.length-1;for(let s=0;s<=n;s++)this.visitNode(e[s]),s<n&&this.append(r)}visitWhere(e){this.append("where "),this.visitNode(e.where)}visitHaving(e){this.append("having "),this.visitNode(e.having)}visitInsertQuery(e){const r=this.parentNode!==void 0&&!Wr.is(this.parentNode)&&!rr.is(this.parentNode)&&!Sn.is(this.parentNode);this.parentNode===void 0&&e.explain&&(this.visitNode(e.explain),this.append(" ")),r&&this.append("("),e.with&&(this.visitNode(e.with),this.append(" ")),this.append(e.replace?"replace":"insert"),e.ignore&&(Kn("`InsertQueryNode.ignore` is deprecated. Use `InsertQueryNode.orAction` instead."),this.append(" ignore")),e.orAction&&(this.append(" "),this.visitNode(e.orAction)),e.top&&(this.append(" "),this.visitNode(e.top)),e.into&&(this.append(" into "),this.visitNode(e.into)),e.columns&&(this.append(" ("),this.compileList(e.columns),this.append(")")),e.output&&(this.append(" "),this.visitNode(e.output)),e.values&&(this.append(" "),this.visitNode(e.values)),e.defaultValues&&(this.append(" "),this.append("default values")),e.onConflict&&(this.append(" "),this.visitNode(e.onConflict)),e.onDuplicateKey&&(this.append(" "),this.visitNode(e.onDuplicateKey)),e.returning&&(this.append(" "),this.visitNode(e.returning)),r&&this.append(")"),e.endModifiers?.length&&(this.append(" "),this.compileList(e.endModifiers," "))}visitValues(e){this.append("values "),this.compileList(e.values)}visitDeleteQuery(e){const r=this.parentNode!==void 0&&!Wr.is(this.parentNode)&&!rr.is(this.parentNode);this.parentNode===void 0&&e.explain&&(this.visitNode(e.explain),this.append(" ")),r&&this.append("("),e.with&&(this.visitNode(e.with),this.append(" ")),this.append("delete "),e.top&&(this.visitNode(e.top),this.append(" ")),this.visitNode(e.from),e.output&&(this.append(" "),this.visitNode(e.output)),e.using&&(this.append(" "),this.visitNode(e.using)),e.joins&&(this.append(" "),this.compileList(e.joins," ")),e.where&&(this.append(" "),this.visitNode(e.where)),e.orderBy&&(this.append(" "),this.visitNode(e.orderBy)),e.limit&&(this.append(" "),this.visitNode(e.limit)),e.returning&&(this.append(" "),this.visitNode(e.returning)),r&&this.append(")"),e.endModifiers?.length&&(this.append(" "),this.compileList(e.endModifiers," "))}visitReturning(e){this.append("returning "),this.compileList(e.selections)}visitAlias(e){this.visitNode(e.node),this.append(" as "),this.visitNode(e.alias)}visitReference(e){e.table&&(this.visitNode(e.table),this.append(".")),this.visitNode(e.column)}visitSelectAll(e){this.append("*")}visitIdentifier(e){this.append(this.getLeftIdentifierWrapper()),this.compileUnwrappedIdentifier(e),this.append(this.getRightIdentifierWrapper())}compileUnwrappedIdentifier(e){if(!zt(e.name))throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");this.append(this.sanitizeIdentifier(e.name))}visitAnd(e){this.visitNode(e.left),this.append(" and "),this.visitNode(e.right)}visitOr(e){this.visitNode(e.left),this.append(" or "),this.visitNode(e.right)}visitValue(e){e.immediate?this.appendImmediateValue(e.value):this.appendValue(e.value)}visitValueList(e){this.append("("),this.compileList(e.values),this.append(")")}visitTuple(e){this.append("("),this.compileList(e.values),this.append(")")}visitPrimitiveValueList(e){this.append("(");const{values:r}=e;for(let n=0;n<r.length;++n)this.appendValue(r[n]),n!==r.length-1&&this.append(", ");this.append(")")}visitParens(e){this.append("("),this.visitNode(e.node),this.append(")")}visitJoin(e){this.append(w_[e.joinType]),this.append(" "),this.visitNode(e.table),e.on&&(this.append(" "),this.visitNode(e.on))}visitOn(e){this.append("on "),this.visitNode(e.on)}visitRaw(e){const{sqlFragments:r,parameters:n}=e;for(let s=0;s<r.length;++s)this.append(r[s]),n.length>s&&this.visitNode(n[s])}visitOperator(e){this.append(e.operator)}visitTable(e){this.visitNode(e.table)}visitSchemableIdentifier(e){e.schema&&(this.visitNode(e.schema),this.append(".")),this.visitNode(e.identifier)}visitCreateTable(e){this.append("create "),e.frontModifiers&&e.frontModifiers.length>0&&(this.compileList(e.frontModifiers," "),this.append(" ")),e.temporary&&this.append("temporary "),this.append("table "),e.ifNotExists&&this.append("if not exists "),this.visitNode(e.table),e.selectQuery?(this.append(" as "),this.visitNode(e.selectQuery)):(this.append(" ("),this.compileList([...e.columns,...e.constraints??[]]),this.append(")"),e.onCommit&&(this.append(" on commit "),this.append(e.onCommit)),e.endModifiers&&e.endModifiers.length>0&&(this.append(" "),this.compileList(e.endModifiers," ")))}visitColumnDefinition(e){e.ifNotExists&&this.append("if not exists "),this.visitNode(e.column),this.append(" "),this.visitNode(e.dataType),e.unsigned&&this.append(" unsigned"),e.frontModifiers&&e.frontModifiers.length>0&&(this.append(" "),this.compileList(e.frontModifiers," ")),e.generated&&(this.append(" "),this.visitNode(e.generated)),e.identity&&this.append(" identity"),e.defaultTo&&(this.append(" "),this.visitNode(e.defaultTo)),e.notNull&&this.append(" not null"),e.unique&&this.append(" unique"),e.nullsNotDistinct&&this.append(" nulls not distinct"),e.primaryKey&&this.append(" primary key"),e.autoIncrement&&(this.append(" "),this.append(this.getAutoIncrement())),e.references&&(this.append(" "),this.visitNode(e.references)),e.check&&(this.append(" "),this.visitNode(e.check)),e.endModifiers&&e.endModifiers.length>0&&(this.append(" "),this.compileList(e.endModifiers," "))}getAutoIncrement(){return"auto_increment"}visitReferences(e){this.append("references "),this.visitNode(e.table),this.append(" ("),this.compileList(e.columns),this.append(")"),e.onDelete&&(this.append(" on delete "),this.append(e.onDelete)),e.onUpdate&&(this.append(" on update "),this.append(e.onUpdate))}visitDropTable(e){this.append("drop table "),e.ifExists&&this.append("if exists "),this.visitNode(e.table),e.cascade&&this.append(" cascade")}visitDataType(e){this.append(e.dataType)}visitOrderBy(e){this.append("order by "),this.compileList(e.items)}visitOrderByItem(e){this.visitNode(e.orderBy),e.collation&&(this.append(" "),this.visitNode(e.collation)),e.direction&&(this.append(" "),this.visitNode(e.direction)),e.nulls&&(this.append(" nulls "),this.append(e.nulls))}visitGroupBy(e){this.append("group by "),this.compileList(e.items)}visitGroupByItem(e){this.visitNode(e.groupBy)}visitUpdateQuery(e){const r=this.parentNode!==void 0&&!Wr.is(this.parentNode)&&!rr.is(this.parentNode)&&!Sn.is(this.parentNode);if(this.parentNode===void 0&&e.explain&&(this.visitNode(e.explain),this.append(" ")),r&&this.append("("),e.with&&(this.visitNode(e.with),this.append(" ")),this.append("update "),e.top&&(this.visitNode(e.top),this.append(" ")),e.table&&(this.visitNode(e.table),this.append(" ")),this.append("set "),e.updates&&this.compileList(e.updates),e.output&&(this.append(" "),this.visitNode(e.output)),e.from&&(this.append(" "),this.visitNode(e.from)),e.joins){if(!e.from)throw new Error("Joins in an update query are only supported as a part of a PostgreSQL 'update set from join' query. If you want to create a MySQL 'update join set' query, see https://kysely.dev/docs/examples/update/my-sql-joins");this.append(" "),this.compileList(e.joins," ")}e.where&&(this.append(" "),this.visitNode(e.where)),e.orderBy&&(this.append(" "),this.visitNode(e.orderBy)),e.limit&&(this.append(" "),this.visitNode(e.limit)),e.returning&&(this.append(" "),this.visitNode(e.returning)),r&&this.append(")"),e.endModifiers?.length&&(this.append(" "),this.compileList(e.endModifiers," "))}visitColumnUpdate(e){this.visitNode(e.column),this.append(" = "),this.visitNode(e.value)}visitLimit(e){this.append("limit "),this.visitNode(e.limit)}visitOffset(e){this.append("offset "),this.visitNode(e.offset)}visitOnConflict(e){this.append("on conflict"),e.columns?(this.append(" ("),this.compileList(e.columns),this.append(")")):e.constraint?(this.append(" on constraint "),this.visitNode(e.constraint)):e.indexExpression&&(this.append(" ("),this.visitNode(e.indexExpression),this.append(")")),e.indexWhere&&(this.append(" "),this.visitNode(e.indexWhere)),e.doNothing===!0?this.append(" do nothing"):e.updates&&(this.append(" do update set "),this.compileList(e.updates),e.updateWhere&&(this.append(" "),this.visitNode(e.updateWhere)))}visitOnDuplicateKey(e){this.append("on duplicate key update "),this.compileList(e.updates)}visitCreateIndex(e){this.append("create "),e.unique&&this.append("unique "),this.append("index "),e.ifNotExists&&this.append("if not exists "),this.visitNode(e.name),e.table&&(this.append(" on "),this.visitNode(e.table)),e.using&&(this.append(" using "),this.visitNode(e.using)),e.columns&&(this.append(" ("),this.compileList(e.columns),this.append(")")),e.nullsNotDistinct&&this.append(" nulls not distinct"),e.where&&(this.append(" "),this.visitNode(e.where))}visitDropIndex(e){this.append("drop index "),e.ifExists&&this.append("if exists "),this.visitNode(e.name),e.table&&(this.append(" on "),this.visitNode(e.table)),e.cascade&&this.append(" cascade")}visitCreateSchema(e){this.append("create schema "),e.ifNotExists&&this.append("if not exists "),this.visitNode(e.schema)}visitDropSchema(e){this.append("drop schema "),e.ifExists&&this.append("if exists "),this.visitNode(e.schema),e.cascade&&this.append(" cascade")}visitPrimaryKeyConstraint(e){e.name&&(this.append("constraint "),this.visitNode(e.name),this.append(" ")),this.append("primary key ("),this.compileList(e.columns),this.append(")"),this.buildDeferrable(e)}buildDeferrable(e){e.deferrable!==void 0&&(e.deferrable?this.append(" deferrable"):this.append(" not deferrable")),e.initiallyDeferred!==void 0&&(e.initiallyDeferred?this.append(" initially deferred"):this.append(" initially immediate"))}visitUniqueConstraint(e){e.name&&(this.append("constraint "),this.visitNode(e.name),this.append(" ")),this.append("unique"),e.nullsNotDistinct&&this.append(" nulls not distinct"),this.append(" ("),this.compileList(e.columns),this.append(")"),this.buildDeferrable(e)}visitCheckConstraint(e){e.name&&(this.append("constraint "),this.visitNode(e.name),this.append(" ")),this.append("check ("),this.visitNode(e.expression),this.append(")")}visitForeignKeyConstraint(e){e.name&&(this.append("constraint "),this.visitNode(e.name),this.append(" ")),this.append("foreign key ("),this.compileList(e.columns),this.append(") "),this.visitNode(e.references),e.onDelete&&(this.append(" on delete "),this.append(e.onDelete)),e.onUpdate&&(this.append(" on update "),this.append(e.onUpdate)),this.buildDeferrable(e)}visitList(e){this.compileList(e.items)}visitWith(e){this.append("with "),e.recursive&&this.append("recursive "),this.compileList(e.expressions)}visitCommonTableExpression(e){this.visitNode(e.name),this.append(" as "),xs(e.materialized)&&(e.materialized||this.append("not "),this.append("materialized ")),this.visitNode(e.expression)}visitCommonTableExpressionName(e){this.visitNode(e.table),e.columns&&(this.append("("),this.compileList(e.columns),this.append(")"))}visitAlterTable(e){this.append("alter table "),this.visitNode(e.table),this.append(" "),e.renameTo&&(this.append("rename to "),this.visitNode(e.renameTo)),e.setSchema&&(this.append("set schema "),this.visitNode(e.setSchema)),e.addConstraint&&this.visitNode(e.addConstraint),e.dropConstraint&&this.visitNode(e.dropConstraint),e.renameConstraint&&this.visitNode(e.renameConstraint),e.columnAlterations&&this.compileColumnAlterations(e.columnAlterations),e.addIndex&&this.visitNode(e.addIndex),e.dropIndex&&this.visitNode(e.dropIndex)}visitAddColumn(e){this.append("add column "),this.visitNode(e.column)}visitRenameColumn(e){this.append("rename column "),this.visitNode(e.column),this.append(" to "),this.visitNode(e.renameTo)}visitDropColumn(e){this.append("drop column "),this.visitNode(e.column)}visitAlterColumn(e){this.append("alter column "),this.visitNode(e.column),this.append(" "),e.dataType&&(this.announcesNewColumnDataType()&&this.append("type "),this.visitNode(e.dataType),e.dataTypeExpression&&(this.append("using "),this.visitNode(e.dataTypeExpression))),e.setDefault&&(this.append("set default "),this.visitNode(e.setDefault)),e.dropDefault&&this.append("drop default"),e.setNotNull&&this.append("set not null"),e.dropNotNull&&this.append("drop not null")}visitModifyColumn(e){this.append("modify column "),this.visitNode(e.column)}visitAddConstraint(e){this.append("add "),this.visitNode(e.constraint)}visitDropConstraint(e){this.append("drop constraint "),e.ifExists&&this.append("if exists "),this.visitNode(e.constraintName),e.modifier==="cascade"?this.append(" cascade"):e.modifier==="restrict"&&this.append(" restrict")}visitRenameConstraint(e){this.append("rename constraint "),this.visitNode(e.oldName),this.append(" to "),this.visitNode(e.newName)}visitSetOperation(e){this.append(e.operator),this.append(" "),e.all&&this.append("all "),this.visitNode(e.expression)}visitCreateView(e){this.append("create "),e.orReplace&&this.append("or replace "),e.materialized&&this.append("materialized "),e.temporary&&this.append("temporary "),this.append("view "),e.ifNotExists&&this.append("if not exists "),this.visitNode(e.name),this.append(" "),e.columns&&(this.append("("),this.compileList(e.columns),this.append(") ")),e.as&&(this.append("as "),this.visitNode(e.as))}visitRefreshMaterializedView(e){this.append("refresh materialized view "),e.concurrently&&this.append("concurrently "),this.visitNode(e.name),e.withNoData?this.append(" with no data"):this.append(" with data")}visitDropView(e){this.append("drop "),e.materialized&&this.append("materialized "),this.append("view "),e.ifExists&&this.append("if exists "),this.visitNode(e.name),e.cascade&&this.append(" cascade")}visitGenerated(e){this.append("generated "),e.always&&this.append("always "),e.byDefault&&this.append("by default "),this.append("as "),e.identity&&this.append("identity"),e.expression&&(this.append("("),this.visitNode(e.expression),this.append(")")),e.stored&&this.append(" stored")}visitDefaultValue(e){this.append("default "),this.visitNode(e.defaultValue)}visitSelectModifier(e){e.rawModifier?this.visitNode(e.rawModifier):this.append(b_[e.modifier]),e.of&&(this.append(" of "),this.compileList(e.of,", "))}visitCreateType(e){this.append("create type "),this.visitNode(e.name),e.enum&&(this.append(" as enum "),this.visitNode(e.enum))}visitDropType(e){this.append("drop type "),e.ifExists&&this.append("if exists "),this.visitNode(e.name)}visitExplain(e){this.append("explain"),(e.options||e.format)&&(this.append(" "),this.append(this.getLeftExplainOptionsWrapper()),e.options&&(this.visitNode(e.options),e.format&&this.append(this.getExplainOptionsDelimiter())),e.format&&(this.append("format"),this.append(this.getExplainOptionAssignment()),this.append(e.format)),this.append(this.getRightExplainOptionsWrapper()))}visitDefaultInsertValue(e){this.append("default")}visitAggregateFunction(e){this.append(e.func),this.append("("),e.distinct&&this.append("distinct "),this.compileList(e.aggregated),e.orderBy&&(this.append(" "),this.visitNode(e.orderBy)),this.append(")"),e.withinGroup&&(this.append(" within group ("),this.visitNode(e.withinGroup),this.append(")")),e.filter&&(this.append(" filter("),this.visitNode(e.filter),this.append(")")),e.over&&(this.append(" "),this.visitNode(e.over))}visitOver(e){this.append("over("),e.partitionBy&&(this.visitNode(e.partitionBy),e.orderBy&&this.append(" ")),e.orderBy&&this.visitNode(e.orderBy),this.append(")")}visitPartitionBy(e){this.append("partition by "),this.compileList(e.items)}visitPartitionByItem(e){this.visitNode(e.partitionBy)}visitBinaryOperation(e){this.visitNode(e.leftOperand),this.append(" "),this.visitNode(e.operator),this.append(" "),this.visitNode(e.rightOperand)}visitUnaryOperation(e){this.visitNode(e.operator),this.isMinusOperator(e.operator)||this.append(" "),this.visitNode(e.operand)}isMinusOperator(e){return tn.is(e)&&e.operator==="-"}visitUsing(e){this.append("using "),this.compileList(e.tables)}visitFunction(e){this.append(e.func),this.append("("),this.compileList(e.arguments),this.append(")")}visitCase(e){this.append("case"),e.value&&(this.append(" "),this.visitNode(e.value)),e.when&&(this.append(" "),this.compileList(e.when," ")),e.else&&(this.append(" else "),this.visitNode(e.else)),this.append(" end"),e.isStatement&&this.append(" case")}visitWhen(e){this.append("when "),this.visitNode(e.condition),e.result&&(this.append(" then "),this.visitNode(e.result))}visitJSONReference(e){this.visitNode(e.reference),this.visitNode(e.traversal)}visitJSONPath(e){e.inOperator&&this.visitNode(e.inOperator),this.append("'$");for(const r of e.pathLegs)this.visitNode(r);this.append("'")}visitJSONPathLeg(e){const r=e.type==="ArrayLocation";this.append(r?"[":"."),this.append(String(e.value)),r&&this.append("]")}visitJSONOperatorChain(e){for(let r=0,n=e.values.length;r<n;r++)r===n-1?this.visitNode(e.operator):this.append("->"),this.visitNode(e.values[r])}visitMergeQuery(e){e.with&&(this.visitNode(e.with),this.append(" ")),this.append("merge "),e.top&&(this.visitNode(e.top),this.append(" ")),this.append("into "),this.visitNode(e.into),e.using&&(this.append(" "),this.visitNode(e.using)),e.whens&&(this.append(" "),this.compileList(e.whens," ")),e.returning&&(this.append(" "),this.visitNode(e.returning)),e.output&&(this.append(" "),this.visitNode(e.output)),e.endModifiers?.length&&(this.append(" "),this.compileList(e.endModifiers," "))}visitMatched(e){e.not&&this.append("not "),this.append("matched"),e.bySource&&this.append(" by source")}visitAddIndex(e){this.append("add "),e.unique&&this.append("unique "),this.append("index "),this.visitNode(e.name),e.columns&&(this.append(" ("),this.compileList(e.columns),this.append(")")),e.using&&(this.append(" using "),this.visitNode(e.using))}visitCast(e){this.append("cast("),this.visitNode(e.expression),this.append(" as "),this.visitNode(e.dataType),this.append(")")}visitFetch(e){this.append("fetch next "),this.visitNode(e.rowCount),this.append(` rows ${e.modifier}`)}visitOutput(e){this.append("output "),this.compileList(e.selections)}visitTop(e){this.append(`top(${e.expression})`),e.modifiers&&this.append(` ${e.modifiers}`)}visitOrAction(e){this.append(e.action)}visitCollate(e){this.append("collate "),this.visitNode(e.collation)}append(e){this.#e+=e}appendValue(e){this.addParameter(e),this.append(this.getCurrentParameterPlaceholder())}getLeftIdentifierWrapper(){return'"'}getRightIdentifierWrapper(){return'"'}getCurrentParameterPlaceholder(){return"$"+this.numParameters}getLeftExplainOptionsWrapper(){return"("}getExplainOptionAssignment(){return" "}getExplainOptionsDelimiter(){return", "}getRightExplainOptionsWrapper(){return")"}sanitizeIdentifier(e){const r=this.getLeftIdentifierWrapper(),n=this.getRightIdentifierWrapper();let s="";for(const a of e)s+=a,a===r?s+=r:a===n&&(s+=n);return s}sanitizeStringLiteral(e){return e.replace(g_,"''")}addParameter(e){this.#t.push(e)}appendImmediateValue(e){if(zt(e))this.appendStringLiteral(e);else if(Ns(e)||xs(e)||Wo(e))this.append(e.toString());else if(Ro(e))this.append("null");else if(Lp(e))this.appendImmediateValue(e.toISOString());else throw new Error(`invalid immediate value ${e}`)}appendStringLiteral(e){this.append("'"),this.append(this.sanitizeStringLiteral(e)),this.append("'")}sortSelectModifiers(e){return e.sort((r,n)=>r.modifier&&n.modifier?_u[r.modifier]-_u[n.modifier]:1),p(e)}compileColumnAlterations(e){this.compileList(e)}announcesNewColumnDataType(){return!0}}const b_=p({ForKeyShare:"for key share",ForNoKeyUpdate:"for no key update",ForUpdate:"for update",ForShare:"for share",NoWait:"nowait",SkipLocked:"skip locked",Distinct:"distinct"}),_u=p({ForKeyShare:1,ForNoKeyUpdate:1,ForUpdate:1,ForShare:1,NoWait:2,SkipLocked:2,Distinct:0}),w_=p({InnerJoin:"inner join",LeftJoin:"left join",RightJoin:"right join",FullJoin:"full join",CrossJoin:"cross join",LateralInnerJoin:"inner join lateral",LateralLeftJoin:"left join lateral",LateralCrossJoin:"cross join lateral",OuterApply:"outer apply",CrossApply:"cross apply",Using:"using"});class N_{async init(){}async acquireConnection(){return new x_}async beginTransaction(){}async commitTransaction(){}async rollbackTransaction(){}async releaseConnection(){}async destroy(){}async releaseSavepoint(){}async rollbackToSavepoint(){}async savepoint(){}}class x_{async executeQuery(){return{rows:[]}}async*streamQuery(){}}class v_{get supportsCreateIfNotExists(){return!0}get supportsTransactionalDdl(){return!1}get supportsReturning(){return!1}get supportsOutput(){return!1}}const q_=/"/g;class S_ extends y_{visitOrAction(e){this.append("or "),this.append(e.action)}getCurrentParameterPlaceholder(){return"?"}getLeftExplainOptionsWrapper(){return""}getRightExplainOptionsWrapper(){return""}getLeftIdentifierWrapper(){return'"'}getRightIdentifierWrapper(){return'"'}getAutoIncrement(){return"autoincrement"}sanitizeIdentifier(e){return e.replace(q_,'""')}visitDefaultInsertValue(e){this.append("null")}}class k_ extends v_{get supportsTransactionalDdl(){return!1}get supportsReturning(){return!0}async acquireMigrationLock(e,r){}async releaseMigrationLock(e,r){}}const E_=wi({createdAt:yi,updatedAt:yi,isDeleted:Ql(cc),ownerId:vp}),la=new Set(Object.keys(E_.props)),A_=[...la,"id"],O_=wi({name:Ct,sql:Ct});wi({tables:Oo(Ct,yh(Ct)),indexes:zl(O_)});const ca=t=>({allIndexes:e=!1}={})=>{const r=vo(),n=t.sqlite.exec(Pe`
      select
        sqlite_master.name as tableName,
        table_info.name as columnName
      from
        sqlite_master
        join pragma_table_info(sqlite_master.name) as table_info;
    `);if(!n.ok)return n;n.value.rows.forEach(h=>{const{tableName:g,columnName:w}=h;(r[g]??=new Set).add(w)});const s=t.sqlite.exec(e?Pe`
            select name, sql
            from sqlite_master
            where type = 'index' and name not like 'sqlite_%';
          `:Pe`
            select name, sql
            from sqlite_master
            where
              type = 'index'
              and name not like 'sqlite_%'
              and name not like 'evolu_%';
          `);if(!s.ok)return s;const a=s.value.rows.map(h=>({name:h.name,sql:h.sql.replace("CREATE INDEX","create index").replace("CREATE UNIQUE INDEX","create unique index")}));return ue({tables:r,indexes:a})},gu=(t,e)=>t.name===e.name&&t.sql===e.sql,ua=t=>(e,r)=>{const n=[];if(!r){const s=ca(t)();if(!s.ok)return s;r=s.value}for(const[s,a]of Object.entries(e.tables)){const h=Tl(r.tables,s);if(!h)n.push(T_(s,a));else for(const g of a.difference(h))n.push(Pe`
            alter table ${Pe.identifier(s)}
            add column ${Pe.identifier(g)} any;
          `)}r.indexes.filter(s=>!e.indexes.some(a=>gu(a,s))).forEach(s=>{n.push(Pe`drop index ${Pe.identifier(s.name)};`)}),e.indexes.filter(s=>!r.indexes.some(a=>gu(s,a))).forEach(s=>{n.push({sql:`${s.sql};`,parameters:[]})});for(const s of n){const a=t.sqlite.exec(s);if(!a.ok)return a}return ue()},T_=(t,e)=>Pe`
  create table ${Pe.identifier(t)} (
    "id" text,
    ${Pe.raw(`${[...la,...e].map(r=>`${Pe.identifier(r).sql} any`).join(", ")}, `)}
    primary key ("ownerId", "id")
  )
  without rowid, strict;
`,yu=new fn({dialect:{createAdapter:()=>new k_,createDriver:()=>new N_,createIntrospector(){throw new Error("Not implemeneted")},createQueryCompiler:()=>new S_}});yu.schema.createIndex.bind(yu.schema);const I_=(t,e)=>{if(t.byteLength>e.byteLength)return 1;if(t.byteLength<e.byteLength)return-1;for(let r=0;r<t.byteLength;r++){if(t[r]<e[r])return-1;if(t[r]>e[r])return 1}return 0},da=it("Millis",$l(0xffffffffffff-1)(Qe)),C_=0,fa=it("Counter",$l(65535)(Qe)),ha=0,P_=Fl("NodeId",/^[a-f0-9]{16}$/)(Ct),L_="0000000000000000";wi({millis:da,counter:fa,nodeId:P_});const F_=op({millis:Lo,counter:Lo,nodeId:sp}),R_=({millis:t=C_,counter:e=ha,nodeId:r=L_}={})=>({millis:t,counter:e,nodeId:r}),W_=t=>{const e=so(t.randomBytes.create(8));return R_({nodeId:e})},bu=t=>e=>{const r=da.from(t.time.now());if(!r.ok)return we({type:"TimestampTimeOutOfRangeError"});const n=Math.max(r.value,...e);return n-r.value>t.timestampConfig.maxDrift?we({type:"TimestampDriftError",now:r.value,next:n}):ue(n)},Hs=t=>{const e=fa.from(Ip(t));return e.ok?ue(e.value):we({type:"TimestampCounterOverflowError"})},D_=t=>e=>{const r=bu(t)([e.millis]);if(!r.ok)return r;const n=r.value===e.millis?Hs(e.counter):ue(ha);return n.ok?ue({millis:r.value,counter:n.value,nodeId:e.nodeId}):n},M_=t=>(e,r)=>{const n=bu(t)([e.millis,r.millis]);if(!n.ok)return n;const s=n.value===e.millis&&n.value===r.millis?Hs(Math.max(e.counter,r.counter)):n.value===e.millis?Hs(e.counter):n.value===r.millis?Hs(r.counter):ue(ha);return s.ok?ue({millis:n.value,counter:s.value,nodeId:e.nodeId}):s};it("TimestampBytes",us);const U_=Qe.orThrow(16),Ln=t=>{const{millis:e,counter:r,nodeId:n}=t,s=new globalThis.Uint8Array(16),a=BigInt(e);s[0]=Number(a>>40n&0xffn),s[1]=Number(a>>32n&0xffn),s[2]=Number(a>>24n&0xffn),s[3]=Number(a>>16n&0xffn),s[4]=Number(a>>8n&0xffn),s[5]=Number(a&0xffn),s[6]=r>>8&255,s[7]=r&255;for(let h=0;h<8;h++){const g=parseInt(n.slice(h*2,h*2+2),16);s[8+h]=g}return s},ci=t=>{const e=BigInt(t[0])<<40n|BigInt(t[1])<<32n|BigInt(t[2])<<24n|BigInt(t[3])<<16n|BigInt(t[4])<<8n|BigInt(t[5]),r=t[6]<<8|t[7];let n="";for(let s=8;s<16;s++)n+=t[s].toString(16).padStart(2,"0");return{millis:Number(e),counter:r,nodeId:n}},wu=I_,B_=t=>new Date(t.millis).toISOString(),$i=Qe.orThrow(12),$_=new Uint8Array($i),kr=Symbol("InfiniteUpperBound"),St={Fingerprint:1,Skip:0,Timestamps:2},j_=Oo(Ct,lp),z_=it("ValidDbChangeValues",j_,t=>{const e=A_.filter(r=>r in t);return e.length>0?we({type:"ValidDbChangeValues",value:t,invalidColumns:e}):ue(t)}),Nu=wi({table:Ct,id:Ao,values:z_,isInsert:So,isDelete:Ql(So)}),V_=t=>e=>({insertTimestamp:(r,n,s)=>{const a=G_(t);return J_(t)(r,n,a,s)},getExistingTimestamps:(r,n)=>{const s=ad(...n),a=t.sqlite.exec(Pe`
          with recursive
            split_timestamps(timestampBytes, pos) as (
              select
                substr(${s}, 1, 16),
                17 as pos
              union all
              select
                substr(${s}, pos, 16),
                pos + 16
              from split_timestamps
              where pos <= length(${s})
            )
          select s.timestampBytes
          from
            split_timestamps s
            join evolu_timestamp t
              on t.ownerId = ${r} and s.timestampBytes = t.t;
        `);return a.ok?ue(a.value.rows.map(h=>h.timestampBytes)):a},getSize:r=>{const n=tg(t)(r);return n.ok?n.value:(e.onStorageError(n.error),null)},fingerprint:(r,n,s)=>{pa(n,s);const a=ig(t)(r,n,s);return a.ok?a.value:(e.onStorageError(a.error),null)},fingerprintRanges:(r,n,s)=>{const a=ma(t)(r,n,s);return a.ok?a.value:(e.onStorageError(a.error),null)},findLowerBound:(r,n,s,a)=>{const h=rg(t)(r,n,s,a);return h.ok?h.value:(e.onStorageError(h.error),null)},iterate:(r,n,s,a)=>{pa(n,s);const h=s-n;if(h===0)return;const g=sg(t)(r,n);if(!g.ok){e.onStorageError(g.error);return}if(!a(g.value,n)||h===1)return;const w=t.sqlite.exec(Pe`
          select t
          from evolu_timestamp
          where ownerId = ${r} and t > ${g.value}
          order by t
          limit ${h-1};
        `);if(!w.ok){e.onStorageError(w.error);return}for(let q=0;q<w.value.rows.length;q++){const k=Qe.orThrow(n+1+q);if(!a(w.value.rows[q].t,k))return}},deleteOwner:r=>{const n=t.sqlite.exec(Pe`
          delete from evolu_timestamp where ownerId = ${r};
        `);return n.ok?!0:(e.onStorageError(n.error),!1)}}),pa=(t,e)=>{Qt(t<=e,"invalid begin or end")},Q_=t=>{for(const e of[Pe`
      create table evolu_timestamp (
        "ownerId" blob not null,
        "t" blob not null,
        "h1" integer,
        "h2" integer,
        "c" integer,
        "l" integer not null,
        primary key ("ownerId", "t")
      )
      strict;
    `,Pe`
      create index evolu_timestamp_index on evolu_timestamp (
        "ownerId",
        "l",
        "t",
        "h1",
        "h2",
        "c"
      );
    `,Pe`
      create table evolu_usage (
        "ownerId" blob primary key,
        "storedBytes" integer not null,
        "firstTimestamp" blob,
        "lastTimestamp" blob
      )
      strict;
    `]){const r=t.sqlite.exec(e);if(!r.ok)return r}return ue()},H_=(t,e,r)=>wu(t,r)===1?["append",e,t]:wu(t,e)===-1?["prepend",t,r]:["insert",e,r],J_=t=>(e,r,n,s)=>{const[a,h]=Z_(K_(r));let g=[];switch(s){case"append":g=[n===1?Pe.prepared`
                insert into evolu_timestamp
                  (ownerId, l, t, h1, h2, c)
                values
                  (${e}, 1, ${r}, ${a}, ${h}, 1)
                on conflict do nothing;
              `:Pe.prepared`
                with
                  fc(b, cl, pt, nt, ih1, ih2, ic) as (
                    select
                      0,
                      (
                        select max(l)
                        from evolu_timestamp
                        where ownerId = ${e}
                      ),
                      zeroblob(0),
                      null,
                      0,
                      0,
                      0
                    union all
                    select
                      not b,
                      iif(b, iif(nt is null, cl - 1, cl), cl),
                      iif(b, ifnull(nt, pt), pt),
                      iif(
                        b,
                        null,
                        (
                          select t
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = cl
                            and t > pt
                            and t < ${r}
                          order by t
                          limit 1
                        )
                      ),
                      iif(
                        b and cl < ${n} and nt is not null,
                        (
                          select (ih1 | h1) - (ih1 & h1)
                          from evolu_timestamp
                          where ownerId = ${e} and t = nt
                        ),
                        ih1
                      ),
                      iif(
                        b and cl < ${n} and nt is not null,
                        (
                          select (ih2 | h2) - (ih2 & h2)
                          from evolu_timestamp
                          where ownerId = ${e} and t = nt
                        ),
                        ih2
                      ),
                      iif(
                        b and cl < ${n} and nt is not null,
                        (
                          select ic + c
                          from evolu_timestamp
                          where ownerId = ${e} and t = nt
                        ),
                        ic
                      )
                    from fc
                    where cl > 0
                  )
                insert into evolu_timestamp (ownerId, t, l, h1, h2, c)
                select
                  ${e},
                  ${r},
                  ${n},
                  (${a} | ih1) - (${a} & ih1),
                  (${h} | ih2) - (${h} & ih2),
                  ic + 1
                from fc
                order by cl asc
                limit 1
                on conflict do nothing;
              `];break;case"prepend":g=[Pe.prepared`
            insert into evolu_timestamp
              (ownerId, l, t, h1, h2, c)
            values
              (${e}, ${n}, ${r}, ${a}, ${h}, 1)
            on conflict do nothing;
          `,Pe.prepared`
            with
              ml(ml) as (
                select max(l)
                from evolu_timestamp
                where ownerId = ${e}
              ),
              fp(b, cl, pt, nt, h1, h2, c) as (
                select
                  0,
                  (select ml from ml),
                  null,
                  null,
                  null,
                  null,
                  null
                union all
                select
                  not b,
                  iif(b, cl - 1, cl),
                  iif(
                    b,
                    iif(nt is not null and (pt is null or nt < pt), nt, pt),
                    pt
                  ),
                  iif(
                    b,
                    null,
                    (
                      select t
                      from evolu_timestamp
                      where ownerId = ${e} and l = cl and t > ${r}
                      order by t
                      limit 1
                    )
                  ),
                  iif(
                    b and nt is not null and (pt is null or nt < pt),
                    (
                      select h1
                      from evolu_timestamp
                      where ownerId = ${e} and t = nt
                    ),
                    null
                  ),
                  iif(
                    b and nt is not null and (pt is null or nt < pt),
                    (
                      select h2
                      from evolu_timestamp
                      where ownerId = ${e} and t = nt
                    ),
                    null
                  ),
                  iif(
                    b and nt is not null and (pt is null or nt < pt),
                    (
                      select c
                      from evolu_timestamp
                      where ownerId = ${e} and t = nt
                    ),
                    null
                  )
                from fp
                where cl > ${n}
              ),
              u(t, h1, h2) as (
                select
                  pt,
                  (${a} | h1) - (${a} & h1),
                  (${h} | h2) - (${h} & h2)
                from fp
                where h1 is not null and pt is not null
                order by pt
                -- Check skiplistMaxLevel docs.
                limit 10
              )
            update evolu_timestamp
            set
              h1 = u.h1,
              h2 = u.h2,
              c = c + 1
            from u
            where
              changes() > 0
              and ownerId = ${e}
              and evolu_timestamp.t = u.t;
          `];break;case"insert":g=n===1?[Pe.prepared`
                  insert into evolu_timestamp
                    (ownerId, l, t, h1, h2, c)
                  values
                    (${e}, 1, ${r}, ${a}, ${h}, 1)
                  on conflict do nothing;
                `,Pe.prepared`
                  with
                    p(l, t, h1, h2) as (
                      select
                        (
                          select max(l) + 1
                          from evolu_timestamp
                          where ownerId = ${e}
                        ),
                        null,
                        null,
                        null
                      union all
                      select
                        p.l - 1,
                        ifnull(
                          (
                            select t
                            from evolu_timestamp
                            where
                              ownerId = ${e}
                              and l = p.l - 1
                              and t > ${r}
                              and (p.t is null or p.t > t)
                            order by t
                            limit 1
                          ),
                          p.t
                        ),
                        (
                          select h1
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = p.l - 1
                            and t > ${r}
                            and (p.t is null or p.t > t)
                          order by t
                          limit 1
                        ),
                        (
                          select h2
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = p.l - 1
                            and t > ${r}
                            and (p.t is null or p.t > t)
                          order by t
                          limit 1
                        )
                      from p
                      where p.l > 2
                      -- Check skiplistMaxLevel docs.
                      limit 10
                    ),
                    u(t, h1, h2) as (
                      select
                        t,
                        (${a} | h1) - (${a} & h1),
                        (${h} | h2) - (${h} & h2)
                      from p
                      where h1 is not null
                    )
                  update evolu_timestamp
                  set
                    h1 = u.h1,
                    h2 = u.h2,
                    c = c + 1
                  from u
                  where
                    changes() > 0
                    and ownerId = ${e}
                    and evolu_timestamp.t = u.t;
                `]:[Pe.prepared`
                  insert into evolu_timestamp (ownerId, t, l)
                  values (${e}, ${r}, ${n})
                  on conflict do nothing;
                `,Pe.prepared`
                  with
                    c0(b, cl, pt, nt, h1, h2, c) as (
                      select
                        0,
                        (
                          select max(l)
                          from evolu_timestamp
                          where ownerId = ${e}
                        ),
                        0,
                        null,
                        null,
                        null,
                        null
                      union all
                      select
                        not b,
                        iif(b, iif(nt is null, cl - 1, cl), cl),
                        iif(b, ifnull(nt, pt), pt),
                        iif(
                          b,
                          null,
                          (
                            select t
                            from evolu_timestamp
                            where
                              ownerId = ${e}
                              and l = cl
                              and t > pt
                              and t < ${r}
                            order by t
                            limit 1
                          )
                        ),
                        iif(
                          b and cl < ${n} and nt is not null,
                          (
                            select h1
                            from evolu_timestamp
                            where ownerId = ${e} and t = nt
                          ),
                          null
                        ),
                        iif(
                          b and cl < ${n} and nt is not null,
                          (
                            select h2
                            from evolu_timestamp
                            where ownerId = ${e} and t = nt
                          ),
                          null
                        ),
                        iif(
                          b and cl < ${n} and nt is not null,
                          (
                            select c
                            from evolu_timestamp
                            where ownerId = ${e} and t = nt
                          ),
                          null
                        )
                      from c0
                      where cl > 0
                    ),
                    c1(l, t, h1, h2, c) as (
                      select
                        ${n},
                        ${r},
                        ${a},
                        ${h},
                        1
                      union all
                      select cl, pt, h1, h2, c
                      from c0
                      where h1 is not null
                    ),
                    c2(rn, l, t, h1, h2, c) as (
                      select row_number() over (order by l), l, t, h1, h2, c
                      from c1
                    ),
                    c3(rn, l, t, h1, h2, c) as (
                      select rn, l, t, h1, h2, c from c2 where rn = 1
                      union all
                      select
                        c3.rn + 1,
                        c2.l,
                        c2.t,
                        (c2.h1 | c3.h1) - (c2.h1 & c3.h1),
                        (c2.h2 | c3.h2) - (c2.h2 & c3.h2),
                        c2.c + c3.c
                      from
                        c3
                        join c2 on c2.rn = c3.rn + 1
                    ),
                    c4(l, t, h1, h2, c, rn) as (
                      select l, t, h1, h2, c, max(rn)
                      from c3
                      group by l
                    ),
                    -- DEV: Check whether a boolean flag is faster.
                    n(l, t, h1, h2, c) as (
                      select
                        (
                          select max(l) + 1
                          from evolu_timestamp
                          where ownerId = ${e}
                        ),
                        null,
                        null,
                        null,
                        null
                      union all
                      select
                        n.l - 1,
                        ifnull(
                          (
                            select t
                            from evolu_timestamp
                            where
                              ownerId = ${e}
                              and l = n.l - 1
                              and t > ${r}
                              and (n.t is null or t < n.t)
                            order by t
                            limit 1
                          ),
                          n.t
                        ),
                        (
                          select h1
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = n.l - 1
                            and t > ${r}
                            and (n.t is null or t < n.t)
                          order by t
                          limit 1
                        ),
                        (
                          select h2
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = n.l - 1
                            and t > ${r}
                            and (n.t is null or t < n.t)
                          order by t
                          limit 1
                        ),
                        (
                          select c
                          from evolu_timestamp
                          where
                            ownerId = ${e}
                            and l = n.l - 1
                            and t > ${r}
                            and (n.t is null or t < n.t)
                          order by t
                          limit 1
                        )
                      from n
                      where l - 1 > (select min(l) from c4)
                    ),
                    u(ut, uh1, uh2, uc) as (
                      select t, h1, h2, c from c4 where t = ${r}
                      union all
                      select
                        max(t),
                        iif(
                          l > ${n},
                          (${a} | h1) - (${a} & h1),
                          (
                            select (c4.h1 | n.h1) - (c4.h1 & n.h1)
                            from c4
                            where
                              c4.l = (select max(l) from c4 where c4.l < n.l)
                          )
                        ),
                        iif(
                          l > ${n},
                          (${h} | h2) - (${h} & h2),
                          (
                            select (c4.h2 | n.h2) - (c4.h2 & n.h2)
                            from c4
                            where
                              c4.l = (select max(l) from c4 where c4.l < n.l)
                          )
                        ),
                        iif(
                          l > ${n},
                          c + 1,
                          (
                            select n.c - c4.c
                            from c4
                            where
                              c4.l = (select max(l) from c4 where c4.l < n.l)
                          )
                        )
                      from n
                      group by t
                      -- Check skiplistMaxLevel docs.
                      limit 10
                    )
                  update evolu_timestamp
                  set
                    h1 = uh1,
                    h2 = uh2,
                    c = uc
                  from u
                  where changes() > 0 and ownerId = ${e} and t = ut;
                `];break}for(const w of g){const q=t.sqlite.exec(w);if(!q.ok)return q}return ue()},K_=t=>Ja(t).slice(0,$i),G_=t=>{let e=1;for(;t.random.next()<=X_&&e<Y_;)e+=1;return Xt.orThrow(e)},X_=.25,Y_=10,Z_=t=>{let e=BigInt(0),r=BigInt(0);for(let n=0;n<6;n++)e=e<<BigInt(8)|BigInt(t[n]);for(let n=6;n<12;n++)r=r<<BigInt(8)|BigInt(t[n]);return[e.toString(),r.toString()]},eg=([t,e])=>{let r=BigInt(t),n=BigInt(e);const s=new Uint8Array(12);for(let a=5;a>=0;a--)s[a]=Number(r&BigInt(255)),r>>=BigInt(8);for(let a=11;a>=6;a--)s[a]=Number(n&BigInt(255)),n>>=BigInt(8);return s},tg=t=>e=>{const r=t.sqlite.exec(Pe.prepared`
      with
        ml(ml) as (
          select max(l)
          from evolu_timestamp
          where ownerId = ${e}
        ),
        sc(l, pt, c) as (
          select (select ml + 1 from ml), zeroblob(0), 0
          union all
          select
            sc.l - 1,
            ifnull(
              (
                select max(t)
                from evolu_timestamp as m
                where ownerId = ${e} and m.l = sc.l - 1 and m.t > sc.pt
              ),
              sc.pt
            ),
            ifnull(
              (
                select sum(m.c)
                from evolu_timestamp as m
                where ownerId = ${e} and m.l = sc.l - 1 and m.t > sc.pt
              ),
              0
            )
          from sc
          where sc.l > 1
        )
      select sum(c) as size
      from sc;
    `);return r.ok?ue(r.value.rows[0].size):r},rg=t=>(e,r,n,s)=>{if(pa(r,n),n===0||r===n||s===kr)return ue(n);const a=t.sqlite.exec(Pe.prepared`
      select t
      from evolu_timestamp
      where ownerId = ${e} and t >= ${s}
      order by t
      limit 1;
    `);if(!a.ok)return a;if(a.value.rows.length===0)return ue(n);const h=ng(t)(e,a.value.rows[0].t);return h.ok?ue(Qe.orThrow(Cp(h.value))):h},ng=t=>(e,r)=>{const n=t.sqlite.exec(Pe.prepared`
      with
        ml(ml) as (
          select max(l) from evolu_timestamp where ownerId = ${e}
        ),
        sc(l, pt, tc) as (
          select ml + 1, zeroblob(0), 0 from ml
          union all
          select
            sc.l - 1,
            ifnull(
              (
                select max(t)
                from evolu_timestamp
                where
                  ownerId = ${e}
                  and l = sc.l - 1
                  and t <= ${r}
                  and t > sc.pt
                order by t
              ),
              sc.pt
            ),
            ifnull(
              (
                select sum(c)
                from evolu_timestamp
                where
                  ownerId = ${e}
                  and l = sc.l - 1
                  and t <= ${r}
                  and t > sc.pt
              ),
              0
            )
          from sc
          where sc.l > 1 and sc.pt != ${r}
        )
      select sum(tc) as count
      from sc;
    `);return n.ok?ue(n.value.rows[0].count):n},ig=t=>(e,r,n)=>{if(n-r===0)return ue($_);if(r===0){const a=ma(t)(e,[n]);return a.ok?ue(a.value[0].fingerprint):a}const s=ma(t)(e,[r,n]);return s.ok?ue(s.value[1].fingerprint):s},ma=t=>(e,r,n=kr)=>{const s=JSON.stringify(r),a=t.sqlite.exec(Pe.prepared`
      with
        ml(ml) as (
          select max(l) from evolu_timestamp where ownerId = ${e}
        ),
        c0(c) as (select value as c from json_each(${s})),
        c1(c, b, nt, nc, nh1, nh2, ft, tt, dl, ic, h1, h2) as (
          select
            c,
            1,
            null,
            null,
            null,
            null,
            zeroblob(0),
            X'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            ml,
            0,
            0,
            0
          from
            c0,
            ml
          union all
          select
            c,
            not b,
            iif(
              b,
              (
                select t
                from evolu_timestamp
                where l = dl and t > ft and t < tt and ownerId = ${e}
                order by t
                limit 1
              ),
              null
            ),
            iif(
              b,
              (
                select c
                from evolu_timestamp
                where l = dl and t > ft and t < tt and ownerId = ${e}
                order by t
                limit 1
              ),
              null
            ),
            iif(
              b,
              (
                select h1
                from evolu_timestamp
                where l = dl and t > ft and t < tt and ownerId = ${e}
                order by t
                limit 1
              ),
              null
            ),
            iif(
              b,
              (
                select h2
                from evolu_timestamp
                where l = dl and t > ft and t < tt and ownerId = ${e}
                order by t
                limit 1
              ),
              null
            ),
            iif(b, ft, iif(ic + nc <= c, nt, ft)),
            iif(b, tt, iif(ic + nc <= c, tt, ifnull(nt, tt))),
            iif(b, dl, iif(ic + nc <= c, dl, dl - 1)),
            iif(b, ic, iif(ic + nc <= c, ic + nc, ic)),
            iif(b, h1, iif(ic + nc <= c, ${Js("h1","nh1")}, h1)),
            iif(b, h2, iif(ic + nc <= c, ${Js("h2","nh2")}, h2))
          from c1
          where iif(b, 1, ic != c)
        ),
        c2(h1, h2, t, rn) as (
          select
            h1,
            h2,
            (
              select min(t)
              from evolu_timestamp
              where t > ft and ownerId = ${e}
            ),
            row_number() over (order by c)
          from c1
          where c = ic and b = 1
        ),
        c3(oh1, oh2, b, rn, h1, h2) as (
          select h1, h2, t, rn, h1, h2 from c2 where rn = 1
          union all
          select
            c2.h1,
            c2.h2,
            t,
            c2.rn,
            ${Js("c3.oh1","c2.h1")},
            ${Js("c3.oh2","c2.h2")}
          from
            c2
            join c3 on c2.rn = c3.rn + 1
        )
      select b, cast(h1 as text) as h1, cast(h2 as text) as h2
      from c3;
    `);if(!a.ok)return a;const h=a.value.rows.map((g,w,q)=>({type:St.Fingerprint,upperBound:w===q.length-1?n:g.b,fingerprint:eg([g.h1,g.h2])}));return ue(h)},Js=(t,e)=>Pe.raw(`(${t} | ${e}) - (${t} & ${e})`),sg=t=>(e,r)=>{const n=t.sqlite.exec(Pe.prepared`
      with
        fi(b, cl, ic, pt, mt, nt, nc) as (
          select
            0,
            (
              select max(l)
              from evolu_timestamp
              where ownerId = ${e}
            ),
            0,
            zeroblob(0),
            X'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
            null,
            0
          union all
          select
            not b,
            iif(
              b,
              iif(nt is null or nt > mt or ic + nc > ${r+1}, cl - 1, cl),
              cl
            ),
            iif(
              b,
              iif(nt is null or nt > mt or ic + nc > ${r+1}, ic, ic + nc),
              ic
            ),
            iif(
              b,
              iif(nt is null or nt > mt or ic + nc > ${r+1}, pt, nt),
              pt
            ),
            iif(
              b,
              iif(
                nt is null or nt > mt or ic + nc > ${r+1},
                iif(nt is not null and nt < mt, nt, mt),
                mt
              ),
              mt
            ),
            iif(
              b,
              null,
              (
                select t
                from evolu_timestamp
                where ownerId = ${e} and l = cl and t > pt
                order by t
                limit 1
              )
            ),
            iif(
              b,
              null,
              (
                select c
                from evolu_timestamp
                where ownerId = ${e} and l = cl and t > pt
                order by t
                limit 1
              )
            )
          from fi
          where ic != ${r+1}
        )
      select pt
      from fi
      where ic == ${r+1};
    `);return n.ok?ue(n.value.rows[0].pt):n},og=t=>(e,r)=>{const n=t.sqlite.exec(Pe`
      select storedBytes, firstTimestamp, lastTimestamp
      from evolu_usage
      where ownerId = ${e};
    `);if(!n.ok)return n;if(!Hi(n.value.rows))return ue({storedBytes:null,firstTimestamp:r,lastTimestamp:r});const s=Ji(n.value.rows);return Qt(s.firstTimestamp,"not null"),Qt(s.lastTimestamp,"not null"),ue({storedBytes:s.storedBytes,firstTimestamp:s.firstTimestamp,lastTimestamp:s.lastTimestamp})},ag=t=>(e,r,n,s)=>{const a=t.sqlite.exec(Pe`
      insert into evolu_usage
        ("ownerId", "storedBytes", "firstTimestamp", "lastTimestamp")
      values
        (${e}, ${r}, ${n}, ${s})
      on conflict (ownerId) do update
        set
          storedBytes = ${r},
          firstTimestamp = ${n},
          lastTimestamp = ${s};
    `);return a.ok?ue():a},Ks=new ql({variableMapSize:!0,useRecords:!1}),xu=1e6;jl(xu,1e8)(_s);const vu=xu;jl(3e3,1e5)(_s);const lg=3e4,Gs=Qe.orThrow(1),_r={Request:0,Response:1,Broadcast:2},ji={None:0,Subscribe:1,Unsubscribe:2},gr={NoError:0,WriteKeyError:1,WriteError:2,QuotaError:3,SyncError:4},cg=t=>(e,r,n)=>{const s=Xs(e.id,{messageType:_r.Request,totalMaxSize:n??vu,writeKey:e.writeKey});let a=!1;for(const h of r){const g=Ou(t)(h,e.encryptionKey),w={timestamp:h.timestamp,change:g};if(s.canAddMessage(w))s.addMessage(w);else{a=!0;break}}if(a){const h=t.randomBytes.create($i);s.addRange({type:St.Fingerprint,upperBound:kr,fingerprint:h})}return s.unwrap()},qu=t=>(e,r)=>{const n=Xs(e,{messageType:_r.Request,subscriptionFlag:r??ji.None}),s=bs(e),a=t.storage.getSize(s);return a==null?null:(ku(t)(s,Qe.orThrow(0),a,kr,n),n.unwrap())},ug=t=>Xs(t,{messageType:_r.Request,subscriptionFlag:ji.Unsubscribe}).unwrap(),Xs=(t,e)=>{const{totalMaxSize:r=vu,rangesMaxSize:n=lg,version:s=Gs}=e,a={header:xr(),messages:{timestamps:Ys(),dbChanges:xr()},ranges:{timestamps:Ys(),types:xr(),payloads:xr()}};if(kt(a.header,s),a.header.extend(bs(t)),a.header.extend([e.messageType]),e.messageType===_r.Request){e.writeKey?(a.header.extend([1]),a.header.extend(e.writeKey)):a.header.extend([0]);const z=e.subscriptionFlag??ji.None;a.header.extend([z])}else e.messageType===_r.Response&&a.header.extend([e.errorCode]);let h=!1;const g=()=>w()<=r,w=()=>Xt.orThrow(q()+k()),q=()=>a.header.getLength()+a.messages.timestamps.getLength()+a.messages.dbChanges.getLength(),k=()=>a.ranges.timestamps.getCount()>0?a.ranges.timestamps.getLength()+a.ranges.types.getLength()+a.ranges.payloads.getLength()+N.remainingRange:0,N={remainingRange:$i+10,timestamp:30,dbChangeLength:8,splitRange:800,timestampsRange:50},C=N.timestamp+N.dbChangeLength+N.remainingRange;return{canAddMessage:z=>w()+C+z.change.length<=r,addMessage:z=>{a.messages.timestamps.add(z.timestamp),Fn(a.messages.dbChanges,z.change),a.messages.dbChanges.extend(z.change),Qt(g(),"the message is too big")},canSplitRange:()=>k()+N.splitRange<=n,canAddTimestampsRangeAndMessage:(z,V)=>{const Z=k()+z.getLength()+N.timestampsRange;return Z<=n&&(V?q()+Z+C+V.change.length<=r:!0)},addRange:z=>{switch(Qt(e.messageType!==_r.Broadcast,"Cannot add a range into broadcast message"),Qt(!h,"Cannot add a range after an InfiniteUpperBound range"),h=z.upperBound===kr,z.upperBound!==kr?a.ranges.timestamps.add(ci(z.upperBound)):a.ranges.timestamps.addInfinite(),kt(a.ranges.types,Qe.orThrow(z.type)),z.type){case St.Skip:break;case St.Fingerprint:a.ranges.payloads.extend(z.fingerprint);break;case St.Timestamps:{z.timestamps.append(a.ranges.payloads);break}}Qt(g(),`the range ${z.type} is too big`)},unwrap:()=>(a.ranges.timestamps.getCount()>0&&Qt(h,"The last range's upperBound must be InfiniteUpperBound"),a.messages.timestamps.append(a.header),a.header.extend(a.messages.dbChanges.unwrap()),a.ranges.timestamps.getCount()>0&&(a.ranges.timestamps.append(a.header),a.header.extend(a.ranges.types.unwrap()),a.header.extend(a.ranges.payloads.unwrap())),a.header.unwrap()),getSize:w}},Ys=()=>{let t=Qe.orThrow(0);const e=xr(),r=()=>{e.reset(),kt(e,t)};r();const n=xr();let s=0;const a=Su((g,w)=>{kt(g,w)}),h=Su((g,w)=>{bg(g,w)});return{add:g=>{const w=g.millis-s;Qt(Qe.is(w),"The delta must be NonNegativeInt"),t++,r(),s=g.millis,kt(n,w),a.add(g.counter),h.add(g.nodeId)},addInfinite:()=>{t++,r()},getCount:()=>t,getLength:()=>e.getLength()+n.getLength()+a.getLength()+h.getLength(),append:g=>{g.extend(e.unwrap()),g.extend(n.unwrap()),g.extend(a.unwrap()),g.extend(h.unwrap())}}},Su=t=>{const e=xr();let r=Qe.orThrow(0),n=null,s=Qe.orThrow(0);return{add:a=>{a===n?(s++,e.truncate(r)):(n=a,s=Qe.orThrow(1)),r=e.getLength(),t(e,a),kt(e,s)},getLength:()=>e.getLength(),unwrap:()=>e.unwrap()}},dg=t=>async(e,r={})=>{try{const n=xr(e),[s,a]=fg(n),h=r.version??Gs;if(s!==h)return we({type:"ProtocolVersionError",version:s,isInitiator:h<s,ownerId:a});const g=n.shift();if(Qt(g===_r.Response||g===_r.Broadcast,"Invalid MessageType"),g===_r.Response){const V=n.shift();if(V!==gr.NoError)switch(V){case gr.WriteKeyError:return we({type:"ProtocolWriteKeyError",ownerId:a});case gr.WriteError:return we({type:"ProtocolWriteError",ownerId:a});case gr.QuotaError:return we({type:"ProtocolQuotaError",ownerId:a});case gr.SyncError:return we({type:"ProtocolSyncError",ownerId:a});default:throw new Br(`Invalid ProtocolErrorCode: ${V}`)}}const w=hg(n),q=bs(a);if(Hi(w)&&!(await t.storage.writeMessages(q,w)).ok)return ue({type:"no-response"});const k=r.getWriteKey?.(a);if(k==null)return ue({type:"no-response"});if(g===_r.Broadcast)return ue({type:"broadcast"});const N=mg(n);if(!Hi(N))return ue({type:"no-response"});const C=Xs(a,{messageType:_r.Request,writeKey:k,rangesMaxSize:r.rangesMaxSize}),z=pg(t)(N,C,q);return!z.ok||!z.value?ue({type:"no-response"}):ue({type:"response",message:C.unwrap()})}catch(n){return we({type:"ProtocolInvalidDataError",data:e,error:n})}},fg=t=>{const e=lr(t),r=ga(t);return[e,r]};class Br extends Error{constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace(this,this.constructor)}}const hg=t=>{const e=_a(t),r=[];for(const n of e){const s=Rn(t),a=t.shiftN(s);r.push({timestamp:n,change:a})}return r},pg=t=>(e,r,n)=>{const s=r.getSize(),a=t.storage.getSize(n);if(a==null)return we(gr.SyncError);let h=null,g=Qe.orThrow(0),w=!1,q=!1;const k=V=>{q&&V.upperBound===kr?r.addRange({type:St.Skip,upperBound:kr}):w=!0},N=()=>{q=!0,w&&(w=!1,Qt(h!=null,"prevUpperBound is null"),r.addRange({type:St.Skip,upperBound:h}))},C=V=>{const Z=t.storage.fingerprint(n,V,a);return Z?(r.addRange({type:St.Fingerprint,upperBound:kr,fingerprint:Z}),!0):!1};for(const V of e){const Z=V.upperBound,ge=g;let Ee=t.storage.findLowerBound(n,g,a,Z);if(Ee==null)return we(gr.SyncError);switch(V.type){case St.Skip:{k(V);break}case St.Fingerprint:{const Ue=t.storage.fingerprint(n,ge,Ee);if(Ue==null)return we(gr.SyncError);if(oc(V.fingerprint,Ue))k(V);else if(r.canSplitRange())N(),ku(t)(n,ge,Ee,Z,r);else return C(Ee)?ue(!0):we(gr.SyncError);break}case St.Timestamps:{let Ue=Z;const Re=new Map(V.timestamps.map($e=>[$e.join(),!0])),Ie=Ys();let ot=!1,at=!1;if(t.storage.iterate(n,ge,Ee,($e,Be)=>{const Ye=$e.join(),rt=ci($e);let et=null;if(Re.has(Ye))Re.delete(Ye);else{const M=t.storage.readDbChange(n,$e);if(M==null)return ot=!0,!1;et={timestamp:rt,change:M}}return r.canAddTimestampsRangeAndMessage(Ie,et)?(Ie.add(rt),et&&r.addMessage(et),!0):(at=!0,Ue=$e,Ee=Be,!1)}),ot)return we(gr.SyncError);const Ce=()=>{N(),r.addRange({type:St.Timestamps,upperBound:Ue,timestamps:Ie})};if(at)return Ce(),C(Ee)?ue(!0):we(gr.SyncError);Re.size>0?Ce():k(V);break}}g=Ee,h=Z}const z=r.getSize()>s;return ue(z)},ku=t=>(e,r,n,s,a)=>{const h=Qe.orThrow(n-r),g=Pp(h);if(!g.ok){const N={type:St.Timestamps,upperBound:s,timestamps:Ys()};t.storage.iterate(e,Qe.orThrow(0),h,C=>(N.timestamps.add(ci(C)),!0)),a.addRange(N);return}const w=r===0?g.value:[r,...g.value.map(N=>Qe.orThrow(N+r))],q=t.storage.fingerprintRanges(e,w,s);if(q==null)return;const k=r>0?q.slice(1):q;for(const N of k)a.addRange(N)},mg=t=>{if(t.getLength()===0)return[];const e=lr(t);if(e===0)return[];const r=Qe.orThrow(e-1),n=_a(t,r),s=[];for(let h=0;h<e;h++){const g=lr(t);switch(g){case St.Fingerprint:case St.Skip:case St.Timestamps:s.push(g);break;default:throw new Br(`Invalid RangeType: ${g}`)}}const a=[];for(let h=0;h<e;h++){const g=h<r?Ln(n[h]):kr;switch(s[h]){case St.Skip:a.push({type:St.Skip,upperBound:g});break;case St.Fingerprint:{const q=t.shiftN($i);a.push({type:St.Fingerprint,upperBound:g,fingerprint:q});break}case St.Timestamps:{const q=_a(t).map(Ln);a.push({type:St.Timestamps,upperBound:g,timestamps:q});break}}}return a},_a=(t,e)=>{e??=lr(t);let r=0;const n=[];for(let q=0;q<e;q++){const k=lr(t),N=da.from(r+k);if(!N.ok)throw new Br(N.error.type);n.push(N.value),r=N.value}const s=[];let a=0;for(;a<e;){const q=fa.from(lr(t));if(!q.ok)throw new Br(q.error.type);const k=lr(t);for(let N=0;N<k;N++)s.push(q.value),a++}const h=[];let g=0;for(;g<e;){const q=wg(t),k=lr(t);for(let N=0;N<k;N++)h.push(q),g++}const w=[];for(let q=0;q<e;q++)w.push({millis:n[q],counter:s[q],nodeId:h[q]});return w},ga=t=>{const e=t.shiftN(Hf);return ms(e)},Eu=(t,e)=>{t.extend(Ks.pack(e))},Au=t=>{let e,r;Ks.unpackMultiple(t.unwrap(),(a,h,g)=>(e=a,r=g,!1));const n=Qe.fromUnknown(r);if(!n.ok)throw new Br(n.error.type);const s=wn.fromUnknown(e);if(!s.ok)throw new Br(s.error.type);return t.shiftN(n.value),s.value},_g=(t,e)=>{let r=0;for(let n=0;n<e.length&&n<8;n++)e[n]&&(r|=1<<n);t.extend([r])},gg=(t,e)=>{const r=t.shift(),n=[];for(let s=0;s<e&&s<8;s++)n.push((r&1<<s)!==0);return n},Ou=t=>(e,r)=>{const n=xr();kt(n,Gs),n.extend(Ln(e.timestamp)),_g(n,[e.change.isInsert,e.change.isDelete!=null,e.change.isDelete??!1]),ya(n,e.change.table),n.extend(ps(e.change.id));const s=Ol(e.change.values);Fn(n,s);for(const[g,w]of s)ya(n,g),Ng(n,w);n.extend(ip(n.getLength()));const{nonce:a,ciphertext:h}=t.symmetricCrypto.encrypt(n.unwrap(),r);return n.reset(),n.extend(a),Fn(n,h),n.extend(h),n.unwrap()},yg=t=>(e,r)=>{try{const n=xr(e.change),s=n.shiftN(t.symmetricCrypto.nonceLength),a=n.shiftN(Rn(n)),h=t.symmetricCrypto.decrypt(a,r,s);if(!h.ok)return h;n.reset(),n.extend(h.value),lr(n);const g=ci(n.shiftN(U_));if(!F_(g,e.timestamp))return we({type:"ProtocolTimestampMismatchError",expected:e.timestamp,timestamp:g});const w=gg(n,Xt.orThrow(3)),q=ba(n),k=ga(n),N=Rn(n),C=vo();for(let V=0;V<N;V++){const Z=ba(n),ge=xg(n);C[Z]=ge}const z=Nu.orThrow({table:q,id:k,values:C,isInsert:w[0],isDelete:w[1]?w[2]:null});return ue(z)}catch(n){return we({type:"ProtocolInvalidDataError",data:e.change,error:n})}},kt=(t,e)=>{if(e===0){t.extend([0]);return}let r=BigInt(e);const n=[];for(;r!==0n;){const s=globalThis.Number(r&127n);n.push(s),r>>=7n}for(let s=0;s<n.length-1;s++)n[s]|=128;t.extend(n)},lr=t=>{let e=0n,r=0n,n;for(let a=0;a<8&&(n=t.shift(),e|=BigInt(n&127)<<r,(n&128)!==0);a++)r+=7n;const s=Qe.from(globalThis.Number(e));if(!s.ok)throw new Br(s.error.type);return s.value},Fn=(t,e)=>{kt(t,Qe.orThrow(e.length))},Rn=lr,ya=(t,e)=>{const r=sd(e);Fn(t,r),t.extend(r)},ba=t=>{const e=Rn(t),r=t.shiftN(e);return od(r)},bg=(t,e)=>{t.extend(Wa(e))},wg=t=>{const e=t.shiftN(Qe.orThrow(8));return so(e)},Tu=t=>t>=0&&t<20,qt={String:Qe.orThrow(20),Number:Qe.orThrow(21),Null:Qe.orThrow(22),Bytes:Qe.orThrow(23),NonNegativeInt:Qe.orThrow(30),EmptyString:Qe.orThrow(31),Base64Url:Qe.orThrow(32),Id:Qe.orThrow(33),Json:Qe.orThrow(34),DateIsoWithNonNegativeTime:Qe.orThrow(35),DateIsoWithNegativeTime:Qe.orThrow(36)},Ng=(t,e)=>{if(e===null){kt(t,qt.Null);return}switch(typeof e){case"string":{if(e===""){kt(t,qt.EmptyString);return}const r=yi.fromParent(e);if(r.ok){const h=new Date(r.value).getTime();Qe.is(h)?(kt(t,qt.DateIsoWithNonNegativeTime),kt(t,h)):(kt(t,qt.DateIsoWithNegativeTime),Eu(t,h));return}const n=Ao.fromParent(e);if(n.ok){kt(t,qt.Id),t.extend(ps(n.value));return}const s=Ih.fromParent(e);if(s.ok&&JSON.stringify(Jl(s.value))===e){const h=Ks.pack(Jl(s.value));kt(t,qt.Json),Fn(t,h),t.extend(h);return}const a=Rl.fromParent(e);if(a.ok){kt(t,qt.Base64Url);const h=Eo(a.value);Fn(t,h),t.extend(h);return}kt(t,qt.String),ya(t,e);return}case"number":{if(Qe.is(e)){if(Tu(e)){kt(t,e);return}kt(t,qt.NonNegativeInt),kt(t,e);return}kt(t,qt.Number),Eu(t,e);return}}kt(t,qt.Bytes),Fn(t,e),t.extend(e)},xg=t=>{const e=lr(t);if(Tu(e))return e;switch(e){case qt.String:return ba(t);case qt.Number:return Au(t);case qt.Null:return null;case qt.Bytes:{const r=Rn(t);return t.shiftN(r)}case qt.Id:return ga(t);case qt.NonNegativeInt:return lr(t);case qt.Json:{const r=Rn(t),n=t.shiftN(r);return JSON.stringify(Ks.unpack(n))}case qt.DateIsoWithNonNegativeTime:case qt.DateIsoWithNegativeTime:{const r=e===qt.DateIsoWithNonNegativeTime?lr(t):Au(t),n=yi.fromParent(new Date(r).toISOString());if(!n.ok)throw new Br(n.error.type);return n.value}case qt.EmptyString:return"";case qt.Base64Url:{const r=Rn(t),n=t.shiftN(r);return hs(n)}default:throw new Br("invalid ProtocolValueType")}},vg=t=>{const[e,r,n]=JSON.parse(t),s=r.map(([h,g])=>h==="b"?Wa(g):g),a=n.length?Object.fromEntries(n):void 0;return{sql:e,parameters:s,...a!==void 0&&{options:a}}},qg=[],Sg=()=>{const t=new Map;return e=>{let r=t.get(e);if(!r){let n=new Map;r={set:s=>{n=new Map([...n,...s])},get:()=>n},t.set(e,r)}return r}},Iu=t=>(e,r)=>{const n=[];for(const w of r){const q=vg(w),k=t.sqlite.exec(q);if(!k.ok)return k;n.push([w,k.value.rows]),q.options?.logExplainQueryPlan&&_p(t)(q)}const s=t.getQueryRowsCache(e),a=s.get();s.set(n);const h=s.get(),g=r.map(w=>({query:w,patches:kg(a.get(w),h.get(w)??qg)}));return ue(g)},kg=(t,e)=>{if(t===void 0)return[{op:"replaceAll",value:e}];if(t.length!==e.length)return[{op:"replaceAll",value:e}];const r=t.length,n=[];for(let s=0;s<r;s++){const a=t[s],h=e[s];for(const g in a)if(!cp(a[g],h[g])){n.push({op:"replaceAt",value:h,index:s});break}}return r>0&&n.length===r?[{op:"replaceAll",value:e}]:n};zf({randomBytes:ic()});const Eg=t=>{let e=!1;const r=new Map,n=new Map,s=new Map,a=new Map,h=t.disposalDelay??100,g=k=>{const N=t.getResourceKey(k),C=a.get(N);if(C&&(clearTimeout(C),a.delete(N)),!r.has(N)){const z=t.createResource(k);r.set(N,z)}},w=k=>{const N=setTimeout(()=>{const C=r.get(k);C&&(C[Symbol.dispose](),r.delete(k)),a.delete(k)},h);a.set(k,N)},q={addConsumer:(k,N)=>{if(e)return;const C=t.getConsumerId(k);s.set(C,k);for(const z of N){g(z);const V=t.getResourceKey(z);let Z=n.get(V);Z||(Z=new Map,n.set(V,Z));const ge=Z.get(C)??0,Ee=ge+1;if(Z.set(C,Xt.orThrow(Ee)),ge===0&&t.onConsumerAdded){const Ue=r.get(V);Ue&&t.onConsumerAdded(k,Ue,V)}}},removeConsumer:(k,N)=>{if(e)return ue();const C=t.getConsumerId(k);for(const z of N){const V=t.getResourceKey(z),Z=n.get(V);if(!Z)return we({type:"ResourceNotFoundError",resourceKey:V});const ge=Z.get(C);if(ge==null)return we({type:"ConsumerNotFoundError",consumerId:C,resourceKey:V});if(ge===1){if(Z.delete(C),t.onConsumerRemoved){const Ee=r.get(V);Ee&&t.onConsumerRemoved(k,Ee,V)}Z.size===0&&(n.delete(V),w(V))}else Z.set(C,Xt.orThrow(ge-1))}return q.hasConsumerAnyResource(k)||s.delete(C),ue()},getResource:k=>e?null:r.get(k)??null,getConsumersForResource:k=>{if(e)return[];const N=n.get(k);return N?Array.from(N.keys()):[]},hasConsumerAnyResource:k=>{if(e)return!1;const N=t.getConsumerId(k);return Array.from(n.values()).some(C=>C.has(N))},getConsumer:k=>{if(e)return null;const N=s.get(k);return!N||!q.hasConsumerAnyResource(N)?null:N},[Symbol.dispose]:()=>{if(!e){e=!0;for(const k of a.values())clearTimeout(k);a.clear();for(const k of r.values())k[Symbol.dispose]();r.clear(),n.clear(),s.clear()}}};return q},Ag=()=>{const t={now:()=>{const e=t.nowIso();return new globalThis.Date(e).getTime()},nowIso:()=>{const e=new globalThis.Date().toISOString();return Qt(yi.is(e),"System clock returned invalid ISO date"),e}};return t},wa=t=>{if(typeof t=="number")return t;const e={ms:1,s:1e3,m:6e4,h:36e5,d:864e5};let r=0,n=0;for(;n<t.length;){for(;n<t.length&&t[n]===" ";)n++;if(n>=t.length)break;let s="";for(;n<t.length&&t[n]>="0"&&t[n]<="9";)s+=t[n],n++;if(s==="")break;let a="";if(n<t.length&&(t[n]==="m"&&n+1<t.length&&t[n+1]==="s"?(a="ms",n+=2):(t[n]==="s"||t[n]==="m"||t[n]==="h"||t[n]==="d")&&(a=t[n],n++)),a==="")break;const h=parseInt(s,10);r+=h*e[a]}return Qe.orThrow(r)},Cu=t=>typeof t=="object"&&t!==null&&t.type==="AbortError";typeof AbortSignal.any!="function"&&(AbortSignal.any=function(t){const e=new AbortController,r=s=>{e.abort(s.target.reason),n()},n=()=>{for(const s of t)s.removeEventListener("abort",r)};for(const s of t){if(s.aborted)return e.abort(s.reason),e.signal;s.addEventListener("abort",r)}return e.signal});const Pu=(t,e)=>t?.signal?AbortSignal.any([t.signal,e]):e,Na=t=>(e=>{const r=e?.signal;if(!r)return t(e);if(r.aborted)return Promise.resolve(we({type:"AbortError",reason:r.reason}));const{promise:n,resolve:s}=Promise.withResolvers(),a=()=>{s(we({type:"AbortError",reason:r.reason}))};return r.addEventListener("abort",a,{once:!0}),Promise.race([n,t(e).then(h=>(r.removeEventListener("abort",a),h))])});typeof AbortSignal.timeout!="function"&&(AbortSignal.timeout=function(t){const e=new AbortController,r=setTimeout(()=>{e.abort()},t);return e.signal.addEventListener("abort",()=>{clearTimeout(r)}),e.signal});const Og=t=>Na(e=>new Promise(r=>{const n=wa(t),s=AbortSignal.timeout(n);Pu(e,s).addEventListener("abort",()=>{r(ue())},{once:!0})})),Tg=({retries:t,initialDelay:e="1s",maxDelay:r="30s",factor:n=2,jitter:s=.5,retryable:a=w=>!Cu(w),onRetry:h},g)=>Na(async w=>{const q=wa(e),k=wa(r),N=Xt.orThrow(t);let C=0;for(;;){const z=await g(w);if(z.ok)return z;if(Cu(z.error))return we(z.error);if(C+=1,C>N||!a(z.error))return we({type:"RetryError",cause:z.error,attempts:C});const V=q*Math.pow(n,C-1),Z=Math.min(V,k),ge=1-s+Math.random()*s*2,Ee=Math.floor(Z*ge);h&&h(z.error,C,Ee);{const Ue=await Og(Qe.orThrow(Ee))(w);if(!Ue.ok)return Ue}}}),Ig=t=>{let e=!1,r=t;const n=[],s=new AbortController,a=()=>r>0?(r--,Promise.resolve()):new Promise(g=>{n.push(g)}),h=()=>{to(n)?Pa(n)():r++};return{withPermit:g=>Na(async w=>{if(await a(),e)return we({type:"AbortError",reason:"Semaphore disposed"});const q=Pu(w,s.signal),k=await g({signal:q});return h(),k}),[Symbol.dispose]:()=>{if(!e)for(e=!0,s.abort("Semaphore disposed");to(n);)Pa(n)()}}},Cg=()=>{const t=Ig(Xt.orThrow(1));return{withLock:t.withPermit,[Symbol.dispose]:t[Symbol.dispose]}},Pg=t=>e=>{let r=!1;const n=q=>r?null:g.getConsumer(q),s=Lg({...t,getSyncOwner:n})(e);if(!s.ok)return s;const a=s.value,g=Eg({createResource:q=>{const k=va(q);return t.console.log("[sync]","createWebSocket",{transportKey:k,url:q.url}),t.createWebSocket(q.url,{binaryType:"arraybuffer",onOpen:()=>{if(r)return;const N=g.getResource(k);if(!N)return;const C=g.getConsumersForResource(k);t.console.log("[sync]","onOpen",{transportKey:k,ownerIds:C});for(const z of C){const V=qu({storage:a})(z,ji.Subscribe);V&&(t.console.log("[sync]","send",{message:V}),N.send(V))}},onClose:N=>{t.console.log("[sync]","onClose",{transportKey:k,code:N.code,reason:N.reason,wasClean:N.wasClean})},onError:N=>{t.console.warn("[sync]","onError",{transportKey:k,error:N})},onMessage:N=>{if(r||!(N instanceof ArrayBuffer))return;const C=g.getResource(k);if(!C)return;const z=new Uint8Array(N);t.console.log("[sync]","onMessage",{transportKey:k,message:z}),dg({storage:a})(z,{getWriteKey:V=>n(V)?.writeKey??null}).then(V=>{if(!V.ok){e.onError(V.error);return}switch(V.value.type){case"response":C.send(V.value.message);break}}).catch(V=>{e.onError(Qn(V))})}})},getResourceKey:va,getConsumerId:q=>q.id,disposalDelay:e.disposalDelayMs??100,onConsumerAdded:(q,k)=>{if(t.console.log("[sync]","onConsumerAdded",{ownerId:q.id,isOpen:k.isOpen()}),!k.isOpen())return;const N=qu({storage:a})(q.id,ji.Subscribe);N&&k.send(N)},onConsumerRemoved:(q,k)=>{t.console.log("[sync]","onConsumerRemoved",{ownerId:q.id,isOpen:k.isOpen()});const N=ug(q.id);k.send(N)}});return ue({useOwner:(q,k)=>{if(r){t.console.warn("[sync]","useOwner called on disposed Sync instance",{owner:k});return}t.console.log("[sync]","useOwner",{use:q,owner:k});const N=k.transports??e.transports;if(q)g.addConsumer(k,N);else{const C=g.removeConsumer(k,N);C.ok||t.console.warn("[sync]","Failed to remove consumer",{transports:N,ownerId:k.id,error:C.error})}},applyChanges:q=>{t.console.log("[sync]","applyChanges",{changes:q});let k=t.clock.get();const N=new Map;for(const C of q){const z=D_(t)(k);if(!z.ok)return z;k=z.value;const{ownerId:V=e.appOwner.id,...Z}=C,ge={timestamp:k,change:Z},Ee=N.get(V);Ee?Ee.push(ge):N.set(V,[ge])}for(const[C,z]of N){const V=Fu({...t,storage:a})(C,z);if(!V.ok)return V;const Z=n(C);if(!Z?.writeKey)continue;const ge=cg(t)({id:Z.id,encryptionKey:Z.encryptionKey,writeKey:Z.writeKey},z),Ee=Z.transports??e.transports;for(const Ue of Ee){const Re=va(Ue),Ie=g.getResource(Re);Ie&&Ie.isOpen()&&(t.console.log("[sync]","send",{transportKey:Re,message:ge}),Ie.send(ge))}}return t.clock.save(k)},[Symbol.dispose]:()=>{r||(r=!0,g[Symbol.dispose]())}})},xa=t=>(e=W_(t))=>{let r=e;return{get:()=>r,save:n=>{r=n;const s=t.sqlite.exec(Pe.prepared`
          update evolu_config
          set "clock" = ${Ln(n)};
        `);return s.ok?ue():s}}},Lg=t=>e=>{const r=V_(t)({onStorageError:e.onError,isOwnerWithinQuota:ap}),n=Cg(),s={...r,validateWriteKey:ac,setWriteKey:ac,writeMessages:async(a,h)=>{const g=ws(a),w=await n.withLock(async()=>{const q=t.getSyncOwner(g);if(!q)return ue(!0);const k=[];for(const C of h){const z=yg(t)(C,q.encryptionKey);if(!z.ok)return z;k.push({timestamp:C.timestamp,change:z.value})}const N=t.sqlite.transaction(()=>{let C=t.clock.get();for(const z of k){const V=M_(t)(C,z.timestamp);if(!V.ok)return V;C=V.value}if(Hi(k)){const z=Fu({...t,storage:s})(q.id,k);if(!z.ok)return z}return t.clock.save(C)});return N.ok?ue(!0):N})();return w.ok?(e.onReceive(),ue()):(w.error.type!=="AbortError"&&e.onError(w.error),we({type:"StorageWriteError",ownerId:g}))},readDbChange:(a,h)=>{const g=t.getSyncOwner(ws(a));if(!g)return null;const w=t.sqlite.exec(Pe`
          select "table", "id", "column", "value"
          from evolu_history
          where "ownerId" = ${a} and "timestamp" = ${h}
          union all
          select "table", "id", "column", "value"
          from evolu_message_quarantine
          where "ownerId" = ${a} and "timestamp" = ${h};
        `);if(!w.ok)return e.onError(w.error),null;const{rows:q}=w.value;ro(q,"Every timestamp must have rows");const k=Ji(q),N=vo();let C=!1,z=null;for(const Z of q)switch(Z.column){case"createdAt":C=!0;break;case"updatedAt":C=!1;break;case"isDeleted":cc.is(Z.value)&&(z=wp(Z.value));break;default:N[Z.column]=Z.value}const V={timestamp:ci(h),change:Nu.orThrow({table:k.table,id:ms(k.id),values:N,isInsert:C,isDelete:z})};return Ou(t)(V,g.encryptionKey)}};return ue(s)},va=t=>`${t.type}:${t.url}`,Lu=(t,e)=>{let r=Ol(t.values);return r=Ca(r,[t.isInsert?"createdAt":"updatedAt",e]),t.isDelete!=null&&(r=Ca(r,["isDeleted",bp(t.isDelete)])),r},Fg=t=>e=>{if(e.isDelete){const r=t.sqlite.exec(Pe`
        delete from ${Pe.identifier(e.table)}
        where id = ${e.id};
      `);if(!r.ok)return r}else{const r=t.appOwner.id,n=Lu(e,t.time.nowIso());for(const[s,a]of n){const h=t.sqlite.exec(Pe.prepared`
          insert into ${Pe.identifier(e.table)}
            ("ownerId", "id", ${Pe.identifier(s)})
          values (${r}, ${e.id}, ${a})
          on conflict ("ownerId", "id") do update
            set ${Pe.identifier(s)} = ${a};
        `);if(!h.ok)return h}}return ue()},Fu=t=>(e,r)=>{const n=bs(e),s=og(t)(n,Ln(Ji(r).timestamp));if(!s.ok)return s;let{firstTimestamp:a,lastTimestamp:h}=s.value;for(const{timestamp:g,change:w}of r){const q=Lu(w,B_(g)),k=ps(w.id),N=Ln(g);for(const[V,Z]of q)if(Ru(t)(w.table,V,Z)){const ge=Wu(t)(n,e,w.table,k,w.id,V,Z,N);if(!ge.ok)return ge}else{const ge=t.sqlite.exec(Pe.prepared`
            insert into evolu_message_quarantine
              ("ownerId", "timestamp", "table", "id", "column", "value")
            values
              (
                ${n},
                ${N},
                ${w.table},
                ${k},
                ${V},
                ${Z}
              )
            on conflict do nothing;
          `);if(!ge.ok)return ge}let C;[C,a,h]=H_(N,a,h);const z=t.storage.insertTimestamp(n,N,C);if(!z.ok)return z}return ag(t)(n,1,a,h)},Rg=la.difference(new Set(["ownerId"])),Ru=t=>(e,r,n)=>{const s=Tl(t.dbSchema.tables,e);return s!=null&&(Rg.has(r)||s.has(r))},Wu=t=>(e,r,n,s,a,h,g,w)=>{const q=t.sqlite.exec(Pe.prepared`
      with
        existingTimestamp as (
          select 1
          from evolu_history
          where
            "ownerId" = ${e}
            and "table" = ${n}
            and "id" = ${s}
            and "column" = ${h}
            and "timestamp" >= ${w}
          limit 1
        )
      insert into ${Pe.identifier(n)}
        ("ownerId", "id", ${Pe.identifier(h)})
      select ${r}, ${a}, ${g}
      where not exists (select 1 from existingTimestamp)
      on conflict ("ownerId", "id") do update
        set ${Pe.identifier(h)} = ${g}
        where not exists (select 1 from existingTimestamp);
    `);if(!q.ok)return q;{const k=t.sqlite.exec(Pe.prepared`
        insert into evolu_history
          ("ownerId", "table", "id", "column", "value", "timestamp")
        values
          (
            ${e},
            ${n},
            ${s},
            ${h},
            ${g},
            ${w}
          )
        on conflict do nothing;
      `);if(!k.ok)return k}return ue()},Wg=t=>()=>{const e=t.sqlite.exec(Pe`
      select "ownerId", "timestamp", "table", "id", "column", "value"
      from evolu_message_quarantine;
    `);if(!e.ok)return e;for(const r of e.value.rows){if(!Ru(t)(r.table,r.column,r.value))continue;const n=Wu(t)(r.ownerId,ws(r.ownerId),r.table,r.id,ms(r.id),r.column,r.value,r.timestamp);if(!n.ok)return n;{const s=t.sqlite.exec(Pe`
          delete from evolu_message_quarantine
          where
            "ownerId" = ${r.ownerId}
            and "timestamp" = ${r.timestamp}
            and "table" = ${r.table}
            and "id" = ${r.id}
            and "column" = ${r.column};
        `);if(!s.ok)return s}}return ue()};Bf.orThrow("Evolu");const Dg=t=>xp({init:async(e,r)=>{t.console.enabled=e.config.enableLogging??!1;const n=await Mg(t,e,r);return n.ok?n.value:(r({type:"onError",error:n.error}),null)},handlers:Bg}),Mg=async(t,e,r)=>{const n=await up(t)(e.config.name,{memory:e.config.inMemory??!1,encryptionKey:e.config.encryptionKey??void 0});if(!n.ok)return n;const s={...t,sqlite:n.value};return s.sqlite.transaction(()=>{const a=ca(s)();if(!a.ok)return a;const h="evolu_version"in a.value.tables;let g,w;if(h){const k=s.sqlite.exec(Pe`select protocolVersion from evolu_version limit 1;`);if(!k.ok)return k;const N=s.sqlite.exec(Pe`
        select
          clock,
          appOwnerId,
          appOwnerEncryptionKey,
          appOwnerWriteKey,
          appOwnerMnemonic
        from evolu_config
        limit 1;
      `);if(!N.ok)return N;ro(N.value.rows);const C=Ji(N.value.rows);g={type:"AppOwner",id:C.appOwnerId,encryptionKey:C.appOwnerEncryptionKey,writeKey:C.appOwnerWriteKey,mnemonic:C.appOwnerMnemonic},w=xa(s)(ci(C.clock))}else{g=e.config.externalAppOwner??dc(Ep(t)),w=xa(s)();const k=Du(s)(g,w.get());if(!k.ok)return k}{const k=ua(s)(e.dbSchema,a.value);if(!k.ok)return k}{const k=Ug(s);if(!k.ok)return k}const q=Pg({...s,clock:w,symmetricCrypto:rp(t),timestampConfig:e.config,dbSchema:e.dbSchema})({appOwner:g,transports:e.config.transports,onError:k=>{r({type:"onError",error:k})},onReceive:()=>{r({type:"refreshQueries"})}});if(!q.ok)return q;{const k=Wg({...s,dbSchema:e.dbSchema})();if(!k.ok)return k}return q.value.useOwner(!0,g),ue({...s,getQueryRowsCache:Sg(),postMessage:r,sync:q.value,appOwner:g})})},Du=t=>(e,r)=>{for(const s of[Pe`
        create table evolu_version (
          "protocolVersion" integer not null
        )
        strict;
      `,Pe`
        insert into evolu_version ("protocolVersion")
        values (${Gs});
      `,Pe`
        create table evolu_config (
          "clock" blob not null,
          "appOwnerId" text not null,
          "appOwnerEncryptionKey" blob not null,
          "appOwnerWriteKey" blob not null,
          "appOwnerMnemonic" text
        )
        strict;
      `,Pe`
        insert into evolu_config
          (
            "clock",
            "appOwnerId",
            "appOwnerEncryptionKey",
            "appOwnerWriteKey",
            "appOwnerMnemonic"
          )
        values
          (
            ${Ln(r)},
            ${e.id},
            ${e.encryptionKey},
            ${e.writeKey},
            ${e.mnemonic??null}
          );
      `,Pe`
        create table evolu_history (
          "ownerId" blob not null,
          "table" text not null,
          "id" blob not null,
          "column" text not null,
          "timestamp" blob not null,
          "value" any
        )
        strict;
      `,Pe`
        create index evolu_history_ownerId_timestamp on evolu_history (
          "ownerId",
          "timestamp"
        );
      `,Pe`
        create unique index evolu_history_ownerId_table_id_column_timestampDesc on evolu_history (
          "ownerId",
          "table",
          "id",
          "column",
          "timestamp" desc
        );
      `]){const a=t.sqlite.exec(s);if(!a.ok)return a}const n=Q_(t);return n.ok?ue():n},Ug=t=>{const e=t.sqlite.exec(Pe`
    create table if not exists evolu_message_quarantine (
      "ownerId" blob not null,
      "timestamp" blob not null,
      "table" text not null,
      "id" blob not null,
      "column" text not null,
      "value" any,
      primary key ("ownerId", "timestamp", "table", "id", "column")
    )
    strict;
  `);return e.ok?ue():e},Bg={getAppOwner:t=>()=>{t.postMessage({type:"onGetAppOwner",appOwner:t.appOwner})},mutate:t=>e=>{const r=t.sqlite.transaction(()=>{const n=[];for(const a of e.changes)if(a.table.startsWith("_")){const g=Fg(t)(a);if(!g.ok)return g}else n.push(a);if(to(n)){const a=t.sync.applyChanges(n);if(!a.ok)return a}const s=Iu(t)(e.tabId,e.subscribedQueries);return s.ok?(t.postMessage({type:"onQueryPatches",tabId:e.tabId,queryPatches:s.value,onCompleteIds:e.onCompleteIds}),t.postMessage({type:"refreshQueries",tabId:e.tabId}),ue()):s});if(!r.ok){t.postMessage({type:"onError",error:r.error});return}},query:t=>e=>{const r=Iu(t)(e.tabId,e.queries);if(!r.ok){t.postMessage({type:"onError",error:r.error});return}t.postMessage({type:"onQueryPatches",tabId:e.tabId,queryPatches:r.value,onCompleteIds:[]})},reset:t=>e=>{const r=t.sqlite.transaction(()=>{const n=ca(t)();if(!n.ok)return n;for(const s in n.value.tables){const a=t.sqlite.exec(Pe`
          drop table ${Pe.identifier(s)};
        `);if(!a.ok)return a}if(e.restore){const s=ua(t)(e.restore.dbSchema);if(!s.ok)return s;const a=Op(e.restore.mnemonic),h=dc(a),g=xa(t)();return Du(t)(h,g.get())}return ue()});if(!r.ok){t.postMessage({type:"onError",error:r.error});return}t.postMessage({type:"onReset",onCompleteId:e.onCompleteId,reload:e.reload})},ensureDbSchema:t=>e=>{const r=t.sqlite.transaction(()=>ua(t)(e.dbSchema));if(!r.ok){t.postMessage({type:"onError",error:r.error});return}},export:t=>e=>{const r=t.sqlite.export();if(!r.ok){t.postMessage({type:"onError",error:r.error});return}t.postMessage({type:"onExport",onCompleteId:e.onCompleteId,file:r.value})},useOwner:t=>e=>{t.sync.useOwner(e.use,e.owner)}},$g=()=>({next:()=>Math.random()}),jg=(t,{protocols:e,binaryType:r,onOpen:n,onClose:s,onMessage:a,onError:h,retryOptions:g,WebSocketConstructor:w=globalThis.WebSocket}={})=>{let q=!1;const k=new AbortController,N={retries:rh};let C=null;const z=()=>{C&&(C.onopen=null,C.onclose=null,C.onmessage=null,C.onerror=null,C.readyState!==C.CLOSING&&C.readyState!==C.CLOSED&&C.close(),C=null)};let V=null;return Tg({...N,...g},()=>new Promise(Z=>{V=()=>{Z(ue())},q&&V(),z(),C=new w(t,e),r&&(C.binaryType=r);let ge=!1;C.onopen=()=>{ge=!0,n?.()},C.onerror=Ee=>{const Ue=ge?{type:"WebSocketConnectionError",event:Ee}:{type:"WebSocketConnectError",event:Ee};h?.(Ue),Ue.type==="WebSocketConnectError"&&Z(we(Ue))},C.onclose=Ee=>{s?.(Ee),Z(we({type:"WebSocketConnectionCloseError",event:Ee}))},C.onmessage=Ee=>{a?.(Ee.data)}}))(k).then(Z=>{Z.ok||Z.error.type==="AbortError"||h?.(Z.error)}),{send:Z=>!C||C.readyState===C.CONNECTING?we({type:"WebSocketSendError"}):(C.send(Z),ue()),getReadyState:()=>C?zg[C.readyState]:"connecting",isOpen:()=>C?C.readyState===C.OPEN:!1,[Symbol.dispose](){q||(q=!0,k.abort(),z(),V?.())}}},zg={[WebSocket.CONNECTING]:"connecting",[WebSocket.OPEN]:"open",[WebSocket.CLOSING]:"closing",[WebSocket.CLOSED]:"closed"};var qa=async function(t={}){var e,r=t,n=typeof window=="object",s=typeof WorkerGlobalScope<"u";typeof process=="object"&&process.versions?.node&&process.type!="renderer";const a=globalThis.sqlite3InitModuleState||Object.assign(Object.create(null),{debugModule:()=>{}});delete globalThis.sqlite3InitModuleState,a.debugModule("globalThis.location =",globalThis.location);var h="./this.program",g=(i,o)=>{throw o},w=self.location.href,q="";function k(i){return r.locateFile?r.locateFile(i,q):q+i}var N,C;if(n||s){try{q=new URL(".",w).href}catch{}s&&(C=i=>{var o=new XMLHttpRequest;return o.open("GET",i,!1),o.responseType="arraybuffer",o.send(null),new Uint8Array(o.response)}),N=async i=>{var o=await fetch(i,{credentials:"same-origin"});if(o.ok)return o.arrayBuffer();throw new Error(o.status+" : "+o.url)}}var z=console.log.bind(console),V=console.error.bind(console),Z,ge=!1,Ee,Ue,Re,Ie,ot,at,Ce,$e,Be,Ye=!1;function rt(){var i=Re.buffer;r.HEAP8=Ie=new Int8Array(i),r.HEAP16=at=new Int16Array(i),r.HEAPU8=ot=new Uint8Array(i),r.HEAPU16=new Uint16Array(i),r.HEAP32=Ce=new Int32Array(i),r.HEAPU32=$e=new Uint32Array(i),r.HEAP64=Be=new BigInt64Array(i),r.HEAPU64=new BigUint64Array(i)}function et(){if(r.wasmMemory)Re=r.wasmMemory;else{var i=r.INITIAL_MEMORY||16777216;Re=new WebAssembly.Memory({initial:i/65536,maximum:32768})}rt()}function M(){if(r.preRun)for(typeof r.preRun=="function"&&(r.preRun=[r.preRun]);r.preRun.length;)Xg(r.preRun.shift());Mu(Bu)}function pe(){Ye=!0,!r.noFSInit&&!m.initialized&&m.init(),fi.__wasm_call_ctors(),m.ignorePermissions=!1}function oe(){if(r.postRun)for(typeof r.postRun=="function"&&(r.postRun=[r.postRun]);r.postRun.length;)Gg(r.postRun.shift());Mu(Uu)}var ne=0,se=null;function Oe(i){ne++,r.monitorRunDependencies?.(ne)}function he(i){if(ne--,r.monitorRunDependencies?.(ne),ne==0&&se){var o=se;se=null,o()}}function Se(i){r.onAbort?.(i),i="Aborted("+i+")",V(i),ge=!0,i+=". Build with -sASSERTIONS for more info.";var o=new WebAssembly.RuntimeError(i);throw Ue?.(o),o}var je;function ze(){return r.locateFile?k("sqlite3.wasm"):new URL("/assets/sqlite3-B7imZ2XV.wasm",self.location.href).href}function Et(i){if(i==je&&Z)return new Uint8Array(Z);if(C)return C(i);throw"both async and sync fetching of the wasm failed"}async function Bt(i){if(!Z)try{var o=await N(i);return new Uint8Array(o)}catch{}return Et(i)}async function Gt(i,o){try{var u=await Bt(i),l=await WebAssembly.instantiate(u,o);return l}catch(c){V(`failed to asynchronously prepare wasm: ${c}`),Se(c)}}async function pn(i,o,u){if(!i&&typeof WebAssembly.instantiateStreaming=="function")try{var l=fetch(o,{credentials:"same-origin"}),c=await WebAssembly.instantiateStreaming(l,u);return c}catch(f){V(`wasm streaming compile failed: ${f}`),V("falling back to ArrayBuffer instantiation")}return Gt(o,u)}function mn(){return{env:Yu,wasi_snapshot_preview1:Yu}}async function _n(){function i(f,A){return fi=f.exports,i0(fi),he(),fi}Oe();function o(f){return i(f.instance)}var u=mn();if(r.instantiateWasm)return new Promise((f,A)=>{r.instantiateWasm(u,(O,Y)=>{f(i(O))})});je??=ze();var l=await pn(Z,je,u),c=o(l);return c}class gn{name="ExitStatus";constructor(o){this.message=`Program terminated with exit(${o})`,this.status=o}}var Mu=i=>{for(;i.length>0;)i.shift()(r)},Uu=[],Gg=i=>Uu.push(i),Bu=[],Xg=i=>Bu.push(i),$u=!0,dt={isAbs:i=>i.charAt(0)==="/",splitPath:i=>{var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return o.exec(i).slice(1)},normalizeArray:(i,o)=>{for(var u=0,l=i.length-1;l>=0;l--){var c=i[l];c==="."?i.splice(l,1):c===".."?(i.splice(l,1),u++):u&&(i.splice(l,1),u--)}if(o)for(;u;u--)i.unshift("..");return i},normalize:i=>{var o=dt.isAbs(i),u=i.slice(-1)==="/";return i=dt.normalizeArray(i.split("/").filter(l=>!!l),!o).join("/"),!i&&!o&&(i="."),i&&u&&(i+="/"),(o?"/":"")+i},dirname:i=>{var o=dt.splitPath(i),u=o[0],l=o[1];return!u&&!l?".":(l&&(l=l.slice(0,-1)),u+l)},basename:i=>i&&i.match(/([^\/]+|\/)\/*$/)[1],join:(...i)=>dt.normalize(i.join("/")),join2:(i,o)=>dt.normalize(i+"/"+o)},Yg=()=>i=>crypto.getRandomValues(i),Sa=i=>{(Sa=Yg())(i)},ui={resolve:(...i)=>{for(var o="",u=!1,l=i.length-1;l>=-1&&!u;l--){var c=l>=0?i[l]:m.cwd();if(typeof c!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!c)return"";o=c+"/"+o,u=dt.isAbs(c)}return o=dt.normalizeArray(o.split("/").filter(f=>!!f),!u).join("/"),(u?"/":"")+o||"."},relative:(i,o)=>{i=ui.resolve(i).slice(1),o=ui.resolve(o).slice(1);function u(ee){for(var fe=0;fe<ee.length&&ee[fe]==="";fe++);for(var _e=ee.length-1;_e>=0&&ee[_e]==="";_e--);return fe>_e?[]:ee.slice(fe,_e-fe+1)}for(var l=u(i.split("/")),c=u(o.split("/")),f=Math.min(l.length,c.length),A=f,O=0;O<f;O++)if(l[O]!==c[O]){A=O;break}for(var Y=[],O=A;O<l.length;O++)Y.push("..");return Y=Y.concat(c.slice(A)),Y.join("/")}},ju=new TextDecoder,zi=(i,o=0,u=NaN)=>{for(var l=o+u,c=o;i[c]&&!(c>=l);)++c;return ju.decode(i.buffer?i.subarray(o,c):new Uint8Array(i.slice(o,c)))},ka=[],Zs=i=>{for(var o=0,u=0;u<i.length;++u){var l=i.charCodeAt(u);l<=127?o++:l<=2047?o+=2:l>=55296&&l<=57343?(o+=4,++u):o+=3}return o},zu=(i,o,u,l)=>{if(!(l>0))return 0;for(var c=u,f=u+l-1,A=0;A<i.length;++A){var O=i.codePointAt(A);if(O<=127){if(u>=f)break;o[u++]=O}else if(O<=2047){if(u+1>=f)break;o[u++]=192|O>>6,o[u++]=128|O&63}else if(O<=65535){if(u+2>=f)break;o[u++]=224|O>>12,o[u++]=128|O>>6&63,o[u++]=128|O&63}else{if(u+3>=f)break;o[u++]=240|O>>18,o[u++]=128|O>>12&63,o[u++]=128|O>>6&63,o[u++]=128|O&63,A++}}return o[u]=0,u-c},Ea=(i,o,u)=>{var l=Zs(i)+1,c=new Array(l),f=zu(i,c,0,c.length);return c.length=f,c},Zg=()=>{if(!ka.length){var i=null;if(typeof window<"u"&&typeof window.prompt=="function"&&(i=window.prompt("Input: "),i!==null&&(i+=`
`)),!i)return null;ka=Ea(i)}return ka.shift()},Wn={ttys:[],init(){},shutdown(){},register(i,o){Wn.ttys[i]={input:[],output:[],ops:o},m.registerDevice(i,Wn.stream_ops)},stream_ops:{open(i){var o=Wn.ttys[i.node.rdev];if(!o)throw new m.ErrnoError(43);i.tty=o,i.seekable=!1},close(i){i.tty.ops.fsync(i.tty)},fsync(i){i.tty.ops.fsync(i.tty)},read(i,o,u,l,c){if(!i.tty||!i.tty.ops.get_char)throw new m.ErrnoError(60);for(var f=0,A=0;A<l;A++){var O;try{O=i.tty.ops.get_char(i.tty)}catch{throw new m.ErrnoError(29)}if(O===void 0&&f===0)throw new m.ErrnoError(6);if(O==null)break;f++,o[u+A]=O}return f&&(i.node.atime=Date.now()),f},write(i,o,u,l,c){if(!i.tty||!i.tty.ops.put_char)throw new m.ErrnoError(60);try{for(var f=0;f<l;f++)i.tty.ops.put_char(i.tty,o[u+f])}catch{throw new m.ErrnoError(29)}return l&&(i.node.mtime=i.node.ctime=Date.now()),f}},default_tty_ops:{get_char(i){return Zg()},put_char(i,o){o===null||o===10?(z(zi(i.output)),i.output=[]):o!=0&&i.output.push(o)},fsync(i){i.output?.length>0&&(z(zi(i.output)),i.output=[])},ioctl_tcgets(i){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets(i,o,u){return 0},ioctl_tiocgwinsz(i){return[24,80]}},default_tty1_ops:{put_char(i,o){o===null||o===10?(V(zi(i.output)),i.output=[]):o!=0&&i.output.push(o)},fsync(i){i.output?.length>0&&(V(zi(i.output)),i.output=[])}}},ey=(i,o)=>ot.fill(0,i,i+o),Vu=(i,o)=>Math.ceil(i/o)*o,Qu=i=>{i=Vu(i,65536);var o=Xu(65536,i);return o&&ey(o,i),o},Ke={ops_table:null,mount(i){return Ke.createNode(null,"/",16895,0)},createNode(i,o,u,l){if(m.isBlkdev(u)||m.isFIFO(u))throw new m.ErrnoError(63);Ke.ops_table||={dir:{node:{getattr:Ke.node_ops.getattr,setattr:Ke.node_ops.setattr,lookup:Ke.node_ops.lookup,mknod:Ke.node_ops.mknod,rename:Ke.node_ops.rename,unlink:Ke.node_ops.unlink,rmdir:Ke.node_ops.rmdir,readdir:Ke.node_ops.readdir,symlink:Ke.node_ops.symlink},stream:{llseek:Ke.stream_ops.llseek}},file:{node:{getattr:Ke.node_ops.getattr,setattr:Ke.node_ops.setattr},stream:{llseek:Ke.stream_ops.llseek,read:Ke.stream_ops.read,write:Ke.stream_ops.write,mmap:Ke.stream_ops.mmap,msync:Ke.stream_ops.msync}},link:{node:{getattr:Ke.node_ops.getattr,setattr:Ke.node_ops.setattr,readlink:Ke.node_ops.readlink},stream:{}},chrdev:{node:{getattr:Ke.node_ops.getattr,setattr:Ke.node_ops.setattr},stream:m.chrdev_stream_ops}};var c=m.createNode(i,o,u,l);return m.isDir(c.mode)?(c.node_ops=Ke.ops_table.dir.node,c.stream_ops=Ke.ops_table.dir.stream,c.contents={}):m.isFile(c.mode)?(c.node_ops=Ke.ops_table.file.node,c.stream_ops=Ke.ops_table.file.stream,c.usedBytes=0,c.contents=null):m.isLink(c.mode)?(c.node_ops=Ke.ops_table.link.node,c.stream_ops=Ke.ops_table.link.stream):m.isChrdev(c.mode)&&(c.node_ops=Ke.ops_table.chrdev.node,c.stream_ops=Ke.ops_table.chrdev.stream),c.atime=c.mtime=c.ctime=Date.now(),i&&(i.contents[o]=c,i.atime=i.mtime=i.ctime=c.atime),c},getFileDataAsTypedArray(i){return i.contents?i.contents.subarray?i.contents.subarray(0,i.usedBytes):new Uint8Array(i.contents):new Uint8Array(0)},expandFileStorage(i,o){var u=i.contents?i.contents.length:0;if(!(u>=o)){var l=1024*1024;o=Math.max(o,u*(u<l?2:1.125)>>>0),u!=0&&(o=Math.max(o,256));var c=i.contents;i.contents=new Uint8Array(o),i.usedBytes>0&&i.contents.set(c.subarray(0,i.usedBytes),0)}},resizeFileStorage(i,o){if(i.usedBytes!=o)if(o==0)i.contents=null,i.usedBytes=0;else{var u=i.contents;i.contents=new Uint8Array(o),u&&i.contents.set(u.subarray(0,Math.min(o,i.usedBytes))),i.usedBytes=o}},node_ops:{getattr(i){var o={};return o.dev=m.isChrdev(i.mode)?i.id:1,o.ino=i.id,o.mode=i.mode,o.nlink=1,o.uid=0,o.gid=0,o.rdev=i.rdev,m.isDir(i.mode)?o.size=4096:m.isFile(i.mode)?o.size=i.usedBytes:m.isLink(i.mode)?o.size=i.link.length:o.size=0,o.atime=new Date(i.atime),o.mtime=new Date(i.mtime),o.ctime=new Date(i.ctime),o.blksize=4096,o.blocks=Math.ceil(o.size/o.blksize),o},setattr(i,o){for(const u of["mode","atime","mtime","ctime"])o[u]!=null&&(i[u]=o[u]);o.size!==void 0&&Ke.resizeFileStorage(i,o.size)},lookup(i,o){throw Ke.doesNotExistError},mknod(i,o,u,l){return Ke.createNode(i,o,u,l)},rename(i,o,u){var l;try{l=m.lookupNode(o,u)}catch{}if(l){if(m.isDir(i.mode))for(var c in l.contents)throw new m.ErrnoError(55);m.hashRemoveNode(l)}delete i.parent.contents[i.name],o.contents[u]=i,i.name=u,o.ctime=o.mtime=i.parent.ctime=i.parent.mtime=Date.now()},unlink(i,o){delete i.contents[o],i.ctime=i.mtime=Date.now()},rmdir(i,o){var u=m.lookupNode(i,o);for(var l in u.contents)throw new m.ErrnoError(55);delete i.contents[o],i.ctime=i.mtime=Date.now()},readdir(i){return[".","..",...Object.keys(i.contents)]},symlink(i,o,u){var l=Ke.createNode(i,o,41471,0);return l.link=u,l},readlink(i){if(!m.isLink(i.mode))throw new m.ErrnoError(28);return i.link}},stream_ops:{read(i,o,u,l,c){var f=i.node.contents;if(c>=i.node.usedBytes)return 0;var A=Math.min(i.node.usedBytes-c,l);if(A>8&&f.subarray)o.set(f.subarray(c,c+A),u);else for(var O=0;O<A;O++)o[u+O]=f[c+O];return A},write(i,o,u,l,c,f){if(o.buffer===Ie.buffer&&(f=!1),!l)return 0;var A=i.node;if(A.mtime=A.ctime=Date.now(),o.subarray&&(!A.contents||A.contents.subarray)){if(f)return A.contents=o.subarray(u,u+l),A.usedBytes=l,l;if(A.usedBytes===0&&c===0)return A.contents=o.slice(u,u+l),A.usedBytes=l,l;if(c+l<=A.usedBytes)return A.contents.set(o.subarray(u,u+l),c),l}if(Ke.expandFileStorage(A,c+l),A.contents.subarray&&o.subarray)A.contents.set(o.subarray(u,u+l),c);else for(var O=0;O<l;O++)A.contents[c+O]=o[u+O];return A.usedBytes=Math.max(A.usedBytes,c+l),l},llseek(i,o,u){var l=o;if(u===1?l+=i.position:u===2&&m.isFile(i.node.mode)&&(l+=i.node.usedBytes),l<0)throw new m.ErrnoError(28);return l},mmap(i,o,u,l,c){if(!m.isFile(i.node.mode))throw new m.ErrnoError(43);var f,A,O=i.node.contents;if(!(c&2)&&O&&O.buffer===Ie.buffer)A=!1,f=O.byteOffset;else{if(A=!0,f=Qu(o),!f)throw new m.ErrnoError(48);O&&((u>0||u+o<O.length)&&(O.subarray?O=O.subarray(u,u+o):O=Array.prototype.slice.call(O,u,u+o)),Ie.set(O,f))}return{ptr:f,allocated:A}},msync(i,o,u,l,c){return Ke.stream_ops.write(i,o,0,l,u,!1),0}}},ty=async i=>{var o=await N(i);return new Uint8Array(o)},ry=(...i)=>m.createDataFile(...i),Hu=[],ny=(i,o,u,l)=>{typeof Browser<"u"&&Browser.init();var c=!1;return Hu.forEach(f=>{c||f.canHandle(o)&&(f.handle(i,o,u,l),c=!0)}),c},iy=(i,o,u,l,c,f,A,O,Y,ee)=>{var fe=o?ui.resolve(dt.join2(i,o)):i;function _e(H){function B(ae){ee?.(),O||ry(i,o,ae,l,c,Y),f?.(),he()}ny(H,fe,B,()=>{A?.(),he()})||B(H)}Oe(),typeof u=="string"?ty(u).then(_e,A):_e(u)},sy=i=>{var o={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090},u=o[i];if(typeof u>"u")throw new Error(`Unknown file open mode: ${i}`);return u},Aa=(i,o)=>{var u=0;return i&&(u|=365),o&&(u|=146),u},m={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,readFiles:{},ErrnoError:class{name="ErrnoError";constructor(i){this.errno=i}},FSStream:class{shared={};get object(){return this.node}set object(i){this.node=i}get isRead(){return(this.flags&2097155)!==1}get isWrite(){return(this.flags&2097155)!==0}get isAppend(){return this.flags&1024}get flags(){return this.shared.flags}set flags(i){this.shared.flags=i}get position(){return this.shared.position}set position(i){this.shared.position=i}},FSNode:class{node_ops={};stream_ops={};readMode=365;writeMode=146;mounted=null;constructor(i,o,u,l){i||(i=this),this.parent=i,this.mount=i.mount,this.id=m.nextInode++,this.name=o,this.mode=u,this.rdev=l,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(i){i?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(i){i?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return m.isDir(this.mode)}get isDevice(){return m.isChrdev(this.mode)}},lookupPath(i,o={}){if(!i)throw new m.ErrnoError(44);o.follow_mount??=!0,dt.isAbs(i)||(i=m.cwd()+"/"+i);e:for(var u=0;u<40;u++){for(var l=i.split("/").filter(ee=>!!ee),c=m.root,f="/",A=0;A<l.length;A++){var O=A===l.length-1;if(O&&o.parent)break;if(l[A]!=="."){if(l[A]===".."){if(f=dt.dirname(f),m.isRoot(c)){i=f+"/"+l.slice(A+1).join("/");continue e}else c=c.parent;continue}f=dt.join2(f,l[A]);try{c=m.lookupNode(c,l[A])}catch(ee){if(ee?.errno===44&&O&&o.noent_okay)return{path:f};throw ee}if(m.isMountpoint(c)&&(!O||o.follow_mount)&&(c=c.mounted.root),m.isLink(c.mode)&&(!O||o.follow)){if(!c.node_ops.readlink)throw new m.ErrnoError(52);var Y=c.node_ops.readlink(c);dt.isAbs(Y)||(Y=dt.dirname(f)+"/"+Y),i=Y+"/"+l.slice(A+1).join("/");continue e}}}return{path:f,node:c}}throw new m.ErrnoError(32)},getPath(i){for(var o;;){if(m.isRoot(i)){var u=i.mount.mountpoint;return o?u[u.length-1]!=="/"?`${u}/${o}`:u+o:u}o=o?`${i.name}/${o}`:i.name,i=i.parent}},hashName(i,o){for(var u=0,l=0;l<o.length;l++)u=(u<<5)-u+o.charCodeAt(l)|0;return(i+u>>>0)%m.nameTable.length},hashAddNode(i){var o=m.hashName(i.parent.id,i.name);i.name_next=m.nameTable[o],m.nameTable[o]=i},hashRemoveNode(i){var o=m.hashName(i.parent.id,i.name);if(m.nameTable[o]===i)m.nameTable[o]=i.name_next;else for(var u=m.nameTable[o];u;){if(u.name_next===i){u.name_next=i.name_next;break}u=u.name_next}},lookupNode(i,o){var u=m.mayLookup(i);if(u)throw new m.ErrnoError(u);for(var l=m.hashName(i.id,o),c=m.nameTable[l];c;c=c.name_next){var f=c.name;if(c.parent.id===i.id&&f===o)return c}return m.lookup(i,o)},createNode(i,o,u,l){var c=new m.FSNode(i,o,u,l);return m.hashAddNode(c),c},destroyNode(i){m.hashRemoveNode(i)},isRoot(i){return i===i.parent},isMountpoint(i){return!!i.mounted},isFile(i){return(i&61440)===32768},isDir(i){return(i&61440)===16384},isLink(i){return(i&61440)===40960},isChrdev(i){return(i&61440)===8192},isBlkdev(i){return(i&61440)===24576},isFIFO(i){return(i&61440)===4096},isSocket(i){return(i&49152)===49152},flagsToPermissionString(i){var o=["r","w","rw"][i&3];return i&512&&(o+="w"),o},nodePermissions(i,o){return m.ignorePermissions?0:o.includes("r")&&!(i.mode&292)||o.includes("w")&&!(i.mode&146)||o.includes("x")&&!(i.mode&73)?2:0},mayLookup(i){if(!m.isDir(i.mode))return 54;var o=m.nodePermissions(i,"x");return o||(i.node_ops.lookup?0:2)},mayCreate(i,o){if(!m.isDir(i.mode))return 54;try{var u=m.lookupNode(i,o);return 20}catch{}return m.nodePermissions(i,"wx")},mayDelete(i,o,u){var l;try{l=m.lookupNode(i,o)}catch(f){return f.errno}var c=m.nodePermissions(i,"wx");if(c)return c;if(u){if(!m.isDir(l.mode))return 54;if(m.isRoot(l)||m.getPath(l)===m.cwd())return 10}else if(m.isDir(l.mode))return 31;return 0},mayOpen(i,o){return i?m.isLink(i.mode)?32:m.isDir(i.mode)&&(m.flagsToPermissionString(o)!=="r"||o&576)?31:m.nodePermissions(i,m.flagsToPermissionString(o)):44},checkOpExists(i,o){if(!i)throw new m.ErrnoError(o);return i},MAX_OPEN_FDS:4096,nextfd(){for(var i=0;i<=m.MAX_OPEN_FDS;i++)if(!m.streams[i])return i;throw new m.ErrnoError(33)},getStreamChecked(i){var o=m.getStream(i);if(!o)throw new m.ErrnoError(8);return o},getStream:i=>m.streams[i],createStream(i,o=-1){return i=Object.assign(new m.FSStream,i),o==-1&&(o=m.nextfd()),i.fd=o,m.streams[o]=i,i},closeStream(i){m.streams[i]=null},dupStream(i,o=-1){var u=m.createStream(i,o);return u.stream_ops?.dup?.(u),u},doSetAttr(i,o,u){var l=i?.stream_ops.setattr,c=l?i:o;l??=o.node_ops.setattr,m.checkOpExists(l,63),l(c,u)},chrdev_stream_ops:{open(i){var o=m.getDevice(i.node.rdev);i.stream_ops=o.stream_ops,i.stream_ops.open?.(i)},llseek(){throw new m.ErrnoError(70)}},major:i=>i>>8,minor:i=>i&255,makedev:(i,o)=>i<<8|o,registerDevice(i,o){m.devices[i]={stream_ops:o}},getDevice:i=>m.devices[i],getMounts(i){for(var o=[],u=[i];u.length;){var l=u.pop();o.push(l),u.push(...l.mounts)}return o},syncfs(i,o){typeof i=="function"&&(o=i,i=!1),m.syncFSRequests++,m.syncFSRequests>1&&V(`warning: ${m.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);var u=m.getMounts(m.root.mount),l=0;function c(A){return m.syncFSRequests--,o(A)}function f(A){if(A)return f.errored?void 0:(f.errored=!0,c(A));++l>=u.length&&c(null)}u.forEach(A=>{if(!A.type.syncfs)return f(null);A.type.syncfs(A,i,f)})},mount(i,o,u){var l=u==="/",c=!u,f;if(l&&m.root)throw new m.ErrnoError(10);if(!l&&!c){var A=m.lookupPath(u,{follow_mount:!1});if(u=A.path,f=A.node,m.isMountpoint(f))throw new m.ErrnoError(10);if(!m.isDir(f.mode))throw new m.ErrnoError(54)}var O={type:i,opts:o,mountpoint:u,mounts:[]},Y=i.mount(O);return Y.mount=O,O.root=Y,l?m.root=Y:f&&(f.mounted=O,f.mount&&f.mount.mounts.push(O)),Y},unmount(i){var o=m.lookupPath(i,{follow_mount:!1});if(!m.isMountpoint(o.node))throw new m.ErrnoError(28);var u=o.node,l=u.mounted,c=m.getMounts(l);Object.keys(m.nameTable).forEach(A=>{for(var O=m.nameTable[A];O;){var Y=O.name_next;c.includes(O.mount)&&m.destroyNode(O),O=Y}}),u.mounted=null;var f=u.mount.mounts.indexOf(l);u.mount.mounts.splice(f,1)},lookup(i,o){return i.node_ops.lookup(i,o)},mknod(i,o,u){var l=m.lookupPath(i,{parent:!0}),c=l.node,f=dt.basename(i);if(!f)throw new m.ErrnoError(28);if(f==="."||f==="..")throw new m.ErrnoError(20);var A=m.mayCreate(c,f);if(A)throw new m.ErrnoError(A);if(!c.node_ops.mknod)throw new m.ErrnoError(63);return c.node_ops.mknod(c,f,o,u)},statfs(i){return m.statfsNode(m.lookupPath(i,{follow:!0}).node)},statfsStream(i){return m.statfsNode(i.node)},statfsNode(i){var o={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:m.nextInode,ffree:m.nextInode-1,fsid:42,flags:2,namelen:255};return i.node_ops.statfs&&Object.assign(o,i.node_ops.statfs(i.mount.opts.root)),o},create(i,o=438){return o&=4095,o|=32768,m.mknod(i,o,0)},mkdir(i,o=511){return o&=1023,o|=16384,m.mknod(i,o,0)},mkdirTree(i,o){var u=i.split("/"),l="";for(var c of u)if(c){(l||dt.isAbs(i))&&(l+="/"),l+=c;try{m.mkdir(l,o)}catch(f){if(f.errno!=20)throw f}}},mkdev(i,o,u){return typeof u>"u"&&(u=o,o=438),o|=8192,m.mknod(i,o,u)},symlink(i,o){if(!ui.resolve(i))throw new m.ErrnoError(44);var u=m.lookupPath(o,{parent:!0}),l=u.node;if(!l)throw new m.ErrnoError(44);var c=dt.basename(o),f=m.mayCreate(l,c);if(f)throw new m.ErrnoError(f);if(!l.node_ops.symlink)throw new m.ErrnoError(63);return l.node_ops.symlink(l,c,i)},rename(i,o){var u=dt.dirname(i),l=dt.dirname(o),c=dt.basename(i),f=dt.basename(o),A,O,Y;if(A=m.lookupPath(i,{parent:!0}),O=A.node,A=m.lookupPath(o,{parent:!0}),Y=A.node,!O||!Y)throw new m.ErrnoError(44);if(O.mount!==Y.mount)throw new m.ErrnoError(75);var ee=m.lookupNode(O,c),fe=ui.relative(i,l);if(fe.charAt(0)!==".")throw new m.ErrnoError(28);if(fe=ui.relative(o,u),fe.charAt(0)!==".")throw new m.ErrnoError(55);var _e;try{_e=m.lookupNode(Y,f)}catch{}if(ee!==_e){var H=m.isDir(ee.mode),B=m.mayDelete(O,c,H);if(B)throw new m.ErrnoError(B);if(B=_e?m.mayDelete(Y,f,H):m.mayCreate(Y,f),B)throw new m.ErrnoError(B);if(!O.node_ops.rename)throw new m.ErrnoError(63);if(m.isMountpoint(ee)||_e&&m.isMountpoint(_e))throw new m.ErrnoError(10);if(Y!==O&&(B=m.nodePermissions(O,"w"),B))throw new m.ErrnoError(B);m.hashRemoveNode(ee);try{O.node_ops.rename(ee,Y,f),ee.parent=Y}catch(ae){throw ae}finally{m.hashAddNode(ee)}}},rmdir(i){var o=m.lookupPath(i,{parent:!0}),u=o.node,l=dt.basename(i),c=m.lookupNode(u,l),f=m.mayDelete(u,l,!0);if(f)throw new m.ErrnoError(f);if(!u.node_ops.rmdir)throw new m.ErrnoError(63);if(m.isMountpoint(c))throw new m.ErrnoError(10);u.node_ops.rmdir(u,l),m.destroyNode(c)},readdir(i){var o=m.lookupPath(i,{follow:!0}),u=o.node,l=m.checkOpExists(u.node_ops.readdir,54);return l(u)},unlink(i){var o=m.lookupPath(i,{parent:!0}),u=o.node;if(!u)throw new m.ErrnoError(44);var l=dt.basename(i),c=m.lookupNode(u,l),f=m.mayDelete(u,l,!1);if(f)throw new m.ErrnoError(f);if(!u.node_ops.unlink)throw new m.ErrnoError(63);if(m.isMountpoint(c))throw new m.ErrnoError(10);u.node_ops.unlink(u,l),m.destroyNode(c)},readlink(i){var o=m.lookupPath(i),u=o.node;if(!u)throw new m.ErrnoError(44);if(!u.node_ops.readlink)throw new m.ErrnoError(28);return u.node_ops.readlink(u)},stat(i,o){var u=m.lookupPath(i,{follow:!o}),l=u.node,c=m.checkOpExists(l.node_ops.getattr,63);return c(l)},fstat(i){var o=m.getStreamChecked(i),u=o.node,l=o.stream_ops.getattr,c=l?o:u;return l??=u.node_ops.getattr,m.checkOpExists(l,63),l(c)},lstat(i){return m.stat(i,!0)},doChmod(i,o,u,l){m.doSetAttr(i,o,{mode:u&4095|o.mode&-4096,ctime:Date.now(),dontFollow:l})},chmod(i,o,u){var l;if(typeof i=="string"){var c=m.lookupPath(i,{follow:!u});l=c.node}else l=i;m.doChmod(null,l,o,u)},lchmod(i,o){m.chmod(i,o,!0)},fchmod(i,o){var u=m.getStreamChecked(i);m.doChmod(u,u.node,o,!1)},doChown(i,o,u){m.doSetAttr(i,o,{timestamp:Date.now(),dontFollow:u})},chown(i,o,u,l){var c;if(typeof i=="string"){var f=m.lookupPath(i,{follow:!l});c=f.node}else c=i;m.doChown(null,c,l)},lchown(i,o,u){m.chown(i,o,u,!0)},fchown(i,o,u){var l=m.getStreamChecked(i);m.doChown(l,l.node,!1)},doTruncate(i,o,u){if(m.isDir(o.mode))throw new m.ErrnoError(31);if(!m.isFile(o.mode))throw new m.ErrnoError(28);var l=m.nodePermissions(o,"w");if(l)throw new m.ErrnoError(l);m.doSetAttr(i,o,{size:u,timestamp:Date.now()})},truncate(i,o){if(o<0)throw new m.ErrnoError(28);var u;if(typeof i=="string"){var l=m.lookupPath(i,{follow:!0});u=l.node}else u=i;m.doTruncate(null,u,o)},ftruncate(i,o){var u=m.getStreamChecked(i);if(o<0||(u.flags&2097155)===0)throw new m.ErrnoError(28);m.doTruncate(u,u.node,o)},utime(i,o,u){var l=m.lookupPath(i,{follow:!0}),c=l.node,f=m.checkOpExists(c.node_ops.setattr,63);f(c,{atime:o,mtime:u})},open(i,o,u=438){if(i==="")throw new m.ErrnoError(44);o=typeof o=="string"?sy(o):o,o&64?u=u&4095|32768:u=0;var l,c;if(typeof i=="object")l=i;else{c=i.endsWith("/");var f=m.lookupPath(i,{follow:!(o&131072),noent_okay:!0});l=f.node,i=f.path}var A=!1;if(o&64)if(l){if(o&128)throw new m.ErrnoError(20)}else{if(c)throw new m.ErrnoError(31);l=m.mknod(i,u|511,0),A=!0}if(!l)throw new m.ErrnoError(44);if(m.isChrdev(l.mode)&&(o&=-513),o&65536&&!m.isDir(l.mode))throw new m.ErrnoError(54);if(!A){var O=m.mayOpen(l,o);if(O)throw new m.ErrnoError(O)}o&512&&!A&&m.truncate(l,0),o&=-131713;var Y=m.createStream({node:l,path:m.getPath(l),flags:o,seekable:!0,position:0,stream_ops:l.stream_ops,ungotten:[],error:!1});return Y.stream_ops.open&&Y.stream_ops.open(Y),A&&m.chmod(l,u&511),r.logReadFiles&&!(o&1)&&(i in m.readFiles||(m.readFiles[i]=1)),Y},close(i){if(m.isClosed(i))throw new m.ErrnoError(8);i.getdents&&(i.getdents=null);try{i.stream_ops.close&&i.stream_ops.close(i)}catch(o){throw o}finally{m.closeStream(i.fd)}i.fd=null},isClosed(i){return i.fd===null},llseek(i,o,u){if(m.isClosed(i))throw new m.ErrnoError(8);if(!i.seekable||!i.stream_ops.llseek)throw new m.ErrnoError(70);if(u!=0&&u!=1&&u!=2)throw new m.ErrnoError(28);return i.position=i.stream_ops.llseek(i,o,u),i.ungotten=[],i.position},read(i,o,u,l,c){if(l<0||c<0)throw new m.ErrnoError(28);if(m.isClosed(i))throw new m.ErrnoError(8);if((i.flags&2097155)===1)throw new m.ErrnoError(8);if(m.isDir(i.node.mode))throw new m.ErrnoError(31);if(!i.stream_ops.read)throw new m.ErrnoError(28);var f=typeof c<"u";if(!f)c=i.position;else if(!i.seekable)throw new m.ErrnoError(70);var A=i.stream_ops.read(i,o,u,l,c);return f||(i.position+=A),A},write(i,o,u,l,c,f){if(l<0||c<0)throw new m.ErrnoError(28);if(m.isClosed(i))throw new m.ErrnoError(8);if((i.flags&2097155)===0)throw new m.ErrnoError(8);if(m.isDir(i.node.mode))throw new m.ErrnoError(31);if(!i.stream_ops.write)throw new m.ErrnoError(28);i.seekable&&i.flags&1024&&m.llseek(i,0,2);var A=typeof c<"u";if(!A)c=i.position;else if(!i.seekable)throw new m.ErrnoError(70);var O=i.stream_ops.write(i,o,u,l,c,f);return A||(i.position+=O),O},mmap(i,o,u,l,c){if((l&2)!==0&&(c&2)===0&&(i.flags&2097155)!==2)throw new m.ErrnoError(2);if((i.flags&2097155)===1)throw new m.ErrnoError(2);if(!i.stream_ops.mmap)throw new m.ErrnoError(43);if(!o)throw new m.ErrnoError(28);return i.stream_ops.mmap(i,o,u,l,c)},msync(i,o,u,l,c){return i.stream_ops.msync?i.stream_ops.msync(i,o,u,l,c):0},ioctl(i,o,u){if(!i.stream_ops.ioctl)throw new m.ErrnoError(59);return i.stream_ops.ioctl(i,o,u)},readFile(i,o={}){if(o.flags=o.flags||0,o.encoding=o.encoding||"binary",o.encoding!=="utf8"&&o.encoding!=="binary")throw new Error(`Invalid encoding type "${o.encoding}"`);var u=m.open(i,o.flags),l=m.stat(i),c=l.size,f=new Uint8Array(c);return m.read(u,f,0,c,0),o.encoding==="utf8"&&(f=zi(f)),m.close(u),f},writeFile(i,o,u={}){u.flags=u.flags||577;var l=m.open(i,u.flags,u.mode);if(typeof o=="string"&&(o=new Uint8Array(Ea(o))),ArrayBuffer.isView(o))m.write(l,o,0,o.byteLength,void 0,u.canOwn);else throw new Error("Unsupported data type");m.close(l)},cwd:()=>m.currentPath,chdir(i){var o=m.lookupPath(i,{follow:!0});if(o.node===null)throw new m.ErrnoError(44);if(!m.isDir(o.node.mode))throw new m.ErrnoError(54);var u=m.nodePermissions(o.node,"x");if(u)throw new m.ErrnoError(u);m.currentPath=o.path},createDefaultDirectories(){m.mkdir("/tmp"),m.mkdir("/home"),m.mkdir("/home/web_user")},createDefaultDevices(){m.mkdir("/dev"),m.registerDevice(m.makedev(1,3),{read:()=>0,write:(l,c,f,A,O)=>A,llseek:()=>0}),m.mkdev("/dev/null",m.makedev(1,3)),Wn.register(m.makedev(5,0),Wn.default_tty_ops),Wn.register(m.makedev(6,0),Wn.default_tty1_ops),m.mkdev("/dev/tty",m.makedev(5,0)),m.mkdev("/dev/tty1",m.makedev(6,0));var i=new Uint8Array(1024),o=0,u=()=>(o===0&&(Sa(i),o=i.byteLength),i[--o]);m.createDevice("/dev","random",u),m.createDevice("/dev","urandom",u),m.mkdir("/dev/shm"),m.mkdir("/dev/shm/tmp")},createSpecialDirectories(){m.mkdir("/proc");var i=m.mkdir("/proc/self");m.mkdir("/proc/self/fd"),m.mount({mount(){var o=m.createNode(i,"fd",16895,73);return o.stream_ops={llseek:Ke.stream_ops.llseek},o.node_ops={lookup(u,l){var c=+l,f=m.getStreamChecked(c),A={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>f.path},id:c+1};return A.parent=A,A},readdir(){return Array.from(m.streams.entries()).filter(([u,l])=>l).map(([u,l])=>u.toString())}},o}},{},"/proc/self/fd")},createStandardStreams(i,o,u){i?m.createDevice("/dev","stdin",i):m.symlink("/dev/tty","/dev/stdin"),o?m.createDevice("/dev","stdout",null,o):m.symlink("/dev/tty","/dev/stdout"),u?m.createDevice("/dev","stderr",null,u):m.symlink("/dev/tty1","/dev/stderr"),m.open("/dev/stdin",0),m.open("/dev/stdout",1),m.open("/dev/stderr",1)},staticInit(){m.nameTable=new Array(4096),m.mount(Ke,{},"/"),m.createDefaultDirectories(),m.createDefaultDevices(),m.createSpecialDirectories(),m.filesystems={MEMFS:Ke}},init(i,o,u){m.initialized=!0,i??=r.stdin,o??=r.stdout,u??=r.stderr,m.createStandardStreams(i,o,u)},quit(){m.initialized=!1;for(var i of m.streams)i&&m.close(i)},findObject(i,o){var u=m.analyzePath(i,o);return u.exists?u.object:null},analyzePath(i,o){try{var u=m.lookupPath(i,{follow:!o});i=u.path}catch{}var l={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{var u=m.lookupPath(i,{parent:!0});l.parentExists=!0,l.parentPath=u.path,l.parentObject=u.node,l.name=dt.basename(i),u=m.lookupPath(i,{follow:!o}),l.exists=!0,l.path=u.path,l.object=u.node,l.name=u.node.name,l.isRoot=u.path==="/"}catch(c){l.error=c.errno}return l},createPath(i,o,u,l){i=typeof i=="string"?i:m.getPath(i);for(var c=o.split("/").reverse();c.length;){var f=c.pop();if(f){var A=dt.join2(i,f);try{m.mkdir(A)}catch(O){if(O.errno!=20)throw O}i=A}}return A},createFile(i,o,u,l,c){var f=dt.join2(typeof i=="string"?i:m.getPath(i),o),A=Aa(l,c);return m.create(f,A)},createDataFile(i,o,u,l,c,f){var A=o;i&&(i=typeof i=="string"?i:m.getPath(i),A=o?dt.join2(i,o):i);var O=Aa(l,c),Y=m.create(A,O);if(u){if(typeof u=="string"){for(var ee=new Array(u.length),fe=0,_e=u.length;fe<_e;++fe)ee[fe]=u.charCodeAt(fe);u=ee}m.chmod(Y,O|146);var H=m.open(Y,577);m.write(H,u,0,u.length,0,f),m.close(H),m.chmod(Y,O)}},createDevice(i,o,u,l){var c=dt.join2(typeof i=="string"?i:m.getPath(i),o),f=Aa(!!u,!!l);m.createDevice.major??=64;var A=m.makedev(m.createDevice.major++,0);return m.registerDevice(A,{open(O){O.seekable=!1},close(O){l?.buffer?.length&&l(10)},read(O,Y,ee,fe,_e){for(var H=0,B=0;B<fe;B++){var ae;try{ae=u()}catch{throw new m.ErrnoError(29)}if(ae===void 0&&H===0)throw new m.ErrnoError(6);if(ae==null)break;H++,Y[ee+B]=ae}return H&&(O.node.atime=Date.now()),H},write(O,Y,ee,fe,_e){for(var H=0;H<fe;H++)try{l(Y[ee+H])}catch{throw new m.ErrnoError(29)}return fe&&(O.node.mtime=O.node.ctime=Date.now()),H}}),m.mkdev(c,f,A)},forceLoadFile(i){if(i.isDevice||i.isFolder||i.link||i.contents)return!0;if(typeof XMLHttpRequest<"u")throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");try{i.contents=C(i.url),i.usedBytes=i.contents.length}catch{throw new m.ErrnoError(29)}},createLazyFile(i,o,u,l,c){class f{lengthKnown=!1;chunks=[];get(B){if(!(B>this.length-1||B<0)){var ae=B%this.chunkSize,E=B/this.chunkSize|0;return this.getter(E)[ae]}}setDataGetter(B){this.getter=B}cacheLength(){var B=new XMLHttpRequest;if(B.open("HEAD",u,!1),B.send(null),!(B.status>=200&&B.status<300||B.status===304))throw new Error("Couldn't load "+u+". Status: "+B.status);var ae=Number(B.getResponseHeader("Content-length")),E,T=(E=B.getResponseHeader("Accept-Ranges"))&&E==="bytes",F=(E=B.getResponseHeader("Content-Encoding"))&&E==="gzip",J=1024*1024;T||(J=ae);var K=(te,xe)=>{if(te>xe)throw new Error("invalid range ("+te+", "+xe+") or no bytes requested!");if(xe>ae-1)throw new Error("only "+ae+" bytes available! programmer error!");var y=new XMLHttpRequest;if(y.open("GET",u,!1),ae!==J&&y.setRequestHeader("Range","bytes="+te+"-"+xe),y.responseType="arraybuffer",y.overrideMimeType&&y.overrideMimeType("text/plain; charset=x-user-defined"),y.send(null),!(y.status>=200&&y.status<300||y.status===304))throw new Error("Couldn't load "+u+". Status: "+y.status);return y.response!==void 0?new Uint8Array(y.response||[]):Ea(y.responseText||"")},W=this;W.setDataGetter(te=>{var xe=te*J,y=(te+1)*J-1;if(y=Math.min(y,ae-1),typeof W.chunks[te]>"u"&&(W.chunks[te]=K(xe,y)),typeof W.chunks[te]>"u")throw new Error("doXHR failed!");return W.chunks[te]}),(F||!ae)&&(J=ae=1,ae=this.getter(0).length,J=ae,z("LazyFiles on gzip forces download of the whole file when length is accessed")),this._length=ae,this._chunkSize=J,this.lengthKnown=!0}get length(){return this.lengthKnown||this.cacheLength(),this._length}get chunkSize(){return this.lengthKnown||this.cacheLength(),this._chunkSize}}if(typeof XMLHttpRequest<"u"){if(!s)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var A=new f,O={isDevice:!1,contents:A}}else var O={isDevice:!1,url:u};var Y=m.createFile(i,o,O,l,c);O.contents?Y.contents=O.contents:O.url&&(Y.contents=null,Y.url=O.url),Object.defineProperties(Y,{usedBytes:{get:function(){return this.contents.length}}});var ee={},fe=Object.keys(Y.stream_ops);fe.forEach(H=>{var B=Y.stream_ops[H];ee[H]=(...ae)=>(m.forceLoadFile(Y),B(...ae))});function _e(H,B,ae,E,T){var F=H.node.contents;if(T>=F.length)return 0;var J=Math.min(F.length-T,E);if(F.slice)for(var K=0;K<J;K++)B[ae+K]=F[T+K];else for(var K=0;K<J;K++)B[ae+K]=F.get(T+K);return J}return ee.read=(H,B,ae,E,T)=>(m.forceLoadFile(Y),_e(H,B,ae,E,T)),ee.mmap=(H,B,ae,E,T)=>{m.forceLoadFile(Y);var F=Qu(B);if(!F)throw new m.ErrnoError(48);return _e(H,Ie,F,B,ae),{ptr:F,allocated:!0}},Y.stream_ops=ee,Y}},oy=(i,o)=>{if(!i)return"";for(var u=i+o,l=i;!(l>=u)&&ot[l];)++l;return ju.decode(ot.subarray(i,l))},Ze={DEFAULT_POLLMASK:5,calculateAt(i,o,u){if(dt.isAbs(o))return o;var l;if(i===-100)l=m.cwd();else{var c=Ze.getStreamFromFD(i);l=c.path}if(o.length==0){if(!u)throw new m.ErrnoError(44);return l}return l+"/"+o},writeStat(i,o){Ce[i>>2]=o.dev,Ce[i+4>>2]=o.mode,$e[i+8>>2]=o.nlink,Ce[i+12>>2]=o.uid,Ce[i+16>>2]=o.gid,Ce[i+20>>2]=o.rdev,Be[i+24>>3]=BigInt(o.size),Ce[i+32>>2]=4096,Ce[i+36>>2]=o.blocks;var u=o.atime.getTime(),l=o.mtime.getTime(),c=o.ctime.getTime();return Be[i+40>>3]=BigInt(Math.floor(u/1e3)),$e[i+48>>2]=u%1e3*1e3*1e3,Be[i+56>>3]=BigInt(Math.floor(l/1e3)),$e[i+64>>2]=l%1e3*1e3*1e3,Be[i+72>>3]=BigInt(Math.floor(c/1e3)),$e[i+80>>2]=c%1e3*1e3*1e3,Be[i+88>>3]=BigInt(o.ino),0},writeStatFs(i,o){Ce[i+4>>2]=o.bsize,Ce[i+40>>2]=o.bsize,Ce[i+8>>2]=o.blocks,Ce[i+12>>2]=o.bfree,Ce[i+16>>2]=o.bavail,Ce[i+20>>2]=o.files,Ce[i+24>>2]=o.ffree,Ce[i+28>>2]=o.fsid,Ce[i+44>>2]=o.flags,Ce[i+36>>2]=o.namelen},doMsync(i,o,u,l,c){if(!m.isFile(o.node.mode))throw new m.ErrnoError(43);if(l&2)return 0;var f=ot.slice(i,i+u);m.msync(o,f,c,u,l)},getStreamFromFD(i){var o=m.getStreamChecked(i);return o},varargs:void 0,getStr(i){var o=oy(i);return o}};function ay(i,o){try{return i=Ze.getStr(i),m.chmod(i,o),0}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}function ly(i,o,u,l){try{if(o=Ze.getStr(o),o=Ze.calculateAt(i,o),u&-8)return-28;var c=m.lookupPath(o,{follow:!0}),f=c.node;if(!f)return-44;var A="";return u&4&&(A+="r"),u&2&&(A+="w"),u&1&&(A+="x"),A&&m.nodePermissions(f,A)?-2:0}catch(O){if(typeof m>"u"||O.name!=="ErrnoError")throw O;return-O.errno}}function cy(i,o){try{return m.fchmod(i,o),0}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}function uy(i,o,u){try{return m.fchown(i,o,u),0}catch(l){if(typeof m>"u"||l.name!=="ErrnoError")throw l;return-l.errno}}var eo=()=>{var i=Ce[+Ze.varargs>>2];return Ze.varargs+=4,i},di=eo;function dy(i,o,u){Ze.varargs=u;try{var l=Ze.getStreamFromFD(i);switch(o){case 0:{var c=eo();if(c<0)return-28;for(;m.streams[c];)c++;var f;return f=m.dupStream(l,c),f.fd}case 1:case 2:return 0;case 3:return l.flags;case 4:{var c=eo();return l.flags|=c,0}case 12:{var c=di(),A=0;return at[c+A>>1]=2,0}case 13:case 14:return 0}return-28}catch(O){if(typeof m>"u"||O.name!=="ErrnoError")throw O;return-O.errno}}function fy(i,o){try{return Ze.writeStat(o,m.fstat(i))}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}var hy=9007199254740992,py=-9007199254740992,Vi=i=>i<py||i>hy?NaN:Number(i);function my(i,o){o=Vi(o);try{return isNaN(o)?-61:(m.ftruncate(i,o),0)}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}var Dn=(i,o,u)=>zu(i,ot,o,u);function _y(i,o){try{if(o===0)return-28;var u=m.cwd(),l=Zs(u)+1;return o<l?-68:(Dn(u,i,o),l)}catch(c){if(typeof m>"u"||c.name!=="ErrnoError")throw c;return-c.errno}}function gy(i,o,u){Ze.varargs=u;try{var l=Ze.getStreamFromFD(i);switch(o){case 21509:return l.tty?0:-59;case 21505:{if(!l.tty)return-59;if(l.tty.ops.ioctl_tcgets){var c=l.tty.ops.ioctl_tcgets(l),f=di();Ce[f>>2]=c.c_iflag||0,Ce[f+4>>2]=c.c_oflag||0,Ce[f+8>>2]=c.c_cflag||0,Ce[f+12>>2]=c.c_lflag||0;for(var A=0;A<32;A++)Ie[f+A+17]=c.c_cc[A]||0;return 0}return 0}case 21510:case 21511:case 21512:return l.tty?0:-59;case 21506:case 21507:case 21508:{if(!l.tty)return-59;if(l.tty.ops.ioctl_tcsets){for(var f=di(),O=Ce[f>>2],Y=Ce[f+4>>2],ee=Ce[f+8>>2],fe=Ce[f+12>>2],_e=[],A=0;A<32;A++)_e.push(Ie[f+A+17]);return l.tty.ops.ioctl_tcsets(l.tty,o,{c_iflag:O,c_oflag:Y,c_cflag:ee,c_lflag:fe,c_cc:_e})}return 0}case 21519:{if(!l.tty)return-59;var f=di();return Ce[f>>2]=0,0}case 21520:return l.tty?-28:-59;case 21531:{var f=di();return m.ioctl(l,o,f)}case 21523:{if(!l.tty)return-59;if(l.tty.ops.ioctl_tiocgwinsz){var H=l.tty.ops.ioctl_tiocgwinsz(l.tty),f=di();at[f>>1]=H[0],at[f+2>>1]=H[1]}return 0}case 21524:return l.tty?0:-59;case 21515:return l.tty?0:-59;default:return-28}}catch(B){if(typeof m>"u"||B.name!=="ErrnoError")throw B;return-B.errno}}function yy(i,o){try{return i=Ze.getStr(i),Ze.writeStat(o,m.lstat(i))}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}function by(i,o,u){try{return o=Ze.getStr(o),o=Ze.calculateAt(i,o),m.mkdir(o,u,0),0}catch(l){if(typeof m>"u"||l.name!=="ErrnoError")throw l;return-l.errno}}function wy(i,o,u,l){try{o=Ze.getStr(o);var c=l&256,f=l&4096;return l=l&-6401,o=Ze.calculateAt(i,o,f),Ze.writeStat(u,c?m.lstat(o):m.stat(o))}catch(A){if(typeof m>"u"||A.name!=="ErrnoError")throw A;return-A.errno}}function Ny(i,o,u,l){Ze.varargs=l;try{o=Ze.getStr(o),o=Ze.calculateAt(i,o);var c=l?eo():0;return m.open(o,u,c).fd}catch(f){if(typeof m>"u"||f.name!=="ErrnoError")throw f;return-f.errno}}function xy(i,o,u,l){try{if(o=Ze.getStr(o),o=Ze.calculateAt(i,o),l<=0)return-28;var c=m.readlink(o),f=Math.min(l,Zs(c)),A=Ie[u+f];return Dn(c,u,l+1),Ie[u+f]=A,f}catch(O){if(typeof m>"u"||O.name!=="ErrnoError")throw O;return-O.errno}}function vy(i){try{return i=Ze.getStr(i),m.rmdir(i),0}catch(o){if(typeof m>"u"||o.name!=="ErrnoError")throw o;return-o.errno}}function qy(i,o){try{return i=Ze.getStr(i),Ze.writeStat(o,m.stat(i))}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return-u.errno}}function Sy(i,o,u){try{if(o=Ze.getStr(o),o=Ze.calculateAt(i,o),!u)m.unlink(o);else if(u===512)m.rmdir(o);else return-28;return 0}catch(l){if(typeof m>"u"||l.name!=="ErrnoError")throw l;return-l.errno}}var Ju=i=>$e[i>>2]+Ce[i+4>>2]*4294967296;function ky(i,o,u,l){try{o=Ze.getStr(o),o=Ze.calculateAt(i,o,!0);var c=Date.now(),f,A;if(!u)f=c,A=c;else{var O=Ju(u),Y=Ce[u+8>>2];Y==1073741823?f=c:Y==1073741822?f=null:f=O*1e3+Y/(1e3*1e3),u+=16,O=Ju(u),Y=Ce[u+8>>2],Y==1073741823?A=c:Y==1073741822?A=null:A=O*1e3+Y/(1e3*1e3)}return(A??f)!==null&&m.utime(o,f,A),0}catch(ee){if(typeof m>"u"||ee.name!=="ErrnoError")throw ee;return-ee.errno}}var Ey=()=>Se(""),Ay=i=>i%4===0&&(i%100!==0||i%400===0),Oy=[0,31,60,91,121,152,182,213,244,274,305,335],Ty=[0,31,59,90,120,151,181,212,243,273,304,334],Iy=i=>{var o=Ay(i.getFullYear()),u=o?Oy:Ty,l=u[i.getMonth()]+i.getDate()-1;return l};function Cy(i,o){i=Vi(i);var u=new Date(i*1e3);Ce[o>>2]=u.getSeconds(),Ce[o+4>>2]=u.getMinutes(),Ce[o+8>>2]=u.getHours(),Ce[o+12>>2]=u.getDate(),Ce[o+16>>2]=u.getMonth(),Ce[o+20>>2]=u.getFullYear()-1900,Ce[o+24>>2]=u.getDay();var l=Iy(u)|0;Ce[o+28>>2]=l,Ce[o+36>>2]=-(u.getTimezoneOffset()*60);var c=new Date(u.getFullYear(),0,1),f=new Date(u.getFullYear(),6,1).getTimezoneOffset(),A=c.getTimezoneOffset(),O=(f!=A&&u.getTimezoneOffset()==Math.min(A,f))|0;Ce[o+32>>2]=O}function Py(i,o,u,l,c,f,A){c=Vi(c);try{var O=Ze.getStreamFromFD(l),Y=m.mmap(O,i,c,o,u),ee=Y.ptr;return Ce[f>>2]=Y.allocated,$e[A>>2]=ee,0}catch(fe){if(typeof m>"u"||fe.name!=="ErrnoError")throw fe;return-fe.errno}}function Ly(i,o,u,l,c,f){f=Vi(f);try{var A=Ze.getStreamFromFD(c);u&2&&Ze.doMsync(i,A,o,l,f)}catch(O){if(typeof m>"u"||O.name!=="ErrnoError")throw O;return-O.errno}}var Fy=(i,o,u,l)=>{var c=new Date().getFullYear(),f=new Date(c,0,1),A=new Date(c,6,1),O=f.getTimezoneOffset(),Y=A.getTimezoneOffset(),ee=Math.max(O,Y);$e[i>>2]=ee*60,Ce[o>>2]=+(O!=Y);var fe=B=>{var ae=B>=0?"-":"+",E=Math.abs(B),T=String(Math.floor(E/60)).padStart(2,"0"),F=String(E%60).padStart(2,"0");return`UTC${ae}${T}${F}`},_e=fe(O),H=fe(Y);Y<O?(Dn(_e,u,17),Dn(H,l,17)):(Dn(_e,l,17),Dn(H,u,17))},Ku=()=>performance.now(),Gu=()=>Date.now(),Ry=i=>i>=0&&i<=3;function Wy(i,o,u){if(!Ry(i))return 28;var l;i===0?l=Gu():l=Ku();var c=Math.round(l*1e3*1e3);return Be[u>>3]=BigInt(c),0}var Dy=()=>2147483648,My=i=>{var o=Re.buffer,u=(i-o.byteLength+65535)/65536|0;try{return Re.grow(u),rt(),1}catch{}},Uy=i=>{var o=ot.length;i>>>=0;var u=Dy();if(i>u)return!1;for(var l=1;l<=4;l*=2){var c=o*(1+.2/l);c=Math.min(c,i+100663296);var f=Math.min(u,Vu(Math.max(i,c),65536)),A=My(f);if(A)return!0}return!1},Oa={},By=()=>h||"./this.program",Qi=()=>{if(!Qi.strings){var i=(typeof navigator=="object"&&navigator.language||"C").replace("-","_")+".UTF-8",o={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:i,_:By()};for(var u in Oa)Oa[u]===void 0?delete o[u]:o[u]=Oa[u];var l=[];for(var u in o)l.push(`${u}=${o[u]}`);Qi.strings=l}return Qi.strings},$y=(i,o)=>{var u=0,l=0;for(var c of Qi()){var f=o+u;$e[i+l>>2]=f,u+=Dn(c,f,1/0)+1,l+=4}return 0},jy=(i,o)=>{var u=Qi();$e[i>>2]=u.length;var l=0;for(var c of u)l+=Zs(c)+1;return $e[o>>2]=l,0},zy=0,Vy=()=>$u||zy>0,Qy=i=>{Vy()||(r.onExit?.(i),ge=!0),g(i,new gn(i))},Hy=(i,o)=>{Qy(i)},Jy=Hy;function Ky(i){try{var o=Ze.getStreamFromFD(i);return m.close(o),0}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return u.errno}}function Gy(i,o){try{var u=0,l=0,c=0,f=Ze.getStreamFromFD(i),A=f.tty?2:m.isDir(f.mode)?3:m.isLink(f.mode)?7:4;return Ie[o]=A,at[o+2>>1]=c,Be[o+8>>3]=BigInt(u),Be[o+16>>3]=BigInt(l),0}catch(O){if(typeof m>"u"||O.name!=="ErrnoError")throw O;return O.errno}}var Xy=(i,o,u,l)=>{for(var c=0,f=0;f<u;f++){var A=$e[o>>2],O=$e[o+4>>2];o+=8;var Y=m.read(i,Ie,A,O,l);if(Y<0)return-1;if(c+=Y,Y<O)break}return c};function Yy(i,o,u,l){try{var c=Ze.getStreamFromFD(i),f=Xy(c,o,u);return $e[l>>2]=f,0}catch(A){if(typeof m>"u"||A.name!=="ErrnoError")throw A;return A.errno}}function Zy(i,o,u,l){o=Vi(o);try{if(isNaN(o))return 61;var c=Ze.getStreamFromFD(i);return m.llseek(c,o,u),Be[l>>3]=BigInt(c.position),c.getdents&&o===0&&u===0&&(c.getdents=null),0}catch(f){if(typeof m>"u"||f.name!=="ErrnoError")throw f;return f.errno}}function e0(i){try{var o=Ze.getStreamFromFD(i);return o.stream_ops?.fsync?o.stream_ops.fsync(o):0}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return u.errno}}var t0=(i,o,u,l)=>{for(var c=0,f=0;f<u;f++){var A=$e[o>>2],O=$e[o+4>>2];o+=8;var Y=m.write(i,Ie,A,O,l);if(Y<0)return-1;if(c+=Y,Y<O)break}return c};function r0(i,o,u,l){try{var c=Ze.getStreamFromFD(i),f=t0(c,o,u);return $e[l>>2]=f,0}catch(A){if(typeof m>"u"||A.name!=="ErrnoError")throw A;return A.errno}}function n0(i,o){try{return Sa(ot.subarray(i,i+o)),0}catch(u){if(typeof m>"u"||u.name!=="ErrnoError")throw u;return u.errno}}m.createPreloadedFile=iy,m.staticInit(),Ke.doesNotExistError=new m.ErrnoError(44),Ke.doesNotExistError.stack="<generic error, no stack>",et(),r.noExitRuntime&&($u=r.noExitRuntime),r.preloadPlugins&&(Hu=r.preloadPlugins),r.print&&(z=r.print),r.printErr&&(V=r.printErr),r.wasmBinary&&(Z=r.wasmBinary),r.arguments&&r.arguments,r.thisProgram&&(h=r.thisProgram),r.wasmMemory=Re;var Xu;function i0(i){r._sqlite3_status64=i.sqlite3_status64,r._sqlite3_status=i.sqlite3_status,r._sqlite3_db_status=i.sqlite3_db_status,r._sqlite3_msize=i.sqlite3_msize,r._sqlite3_vfs_find=i.sqlite3_vfs_find,r._sqlite3_initialize=i.sqlite3_initialize,r._sqlite3_malloc=i.sqlite3_malloc,r._sqlite3_free=i.sqlite3_free,r._sqlite3_vfs_register=i.sqlite3_vfs_register,r._sqlite3_randomness=i.sqlite3_randomness,r._sqlite3mc_vfs_create=i.sqlite3mc_vfs_create,r._sqlite3_vfs_unregister=i.sqlite3_vfs_unregister,r._sqlite3_malloc64=i.sqlite3_malloc64,r._sqlite3_realloc=i.sqlite3_realloc,r._sqlite3_realloc64=i.sqlite3_realloc64,r._sqlite3_value_text=i.sqlite3_value_text,r._sqlite3_stricmp=i.sqlite3_stricmp,r._sqlite3_strnicmp=i.sqlite3_strnicmp,r._sqlite3_uri_parameter=i.sqlite3_uri_parameter,r._sqlite3_uri_boolean=i.sqlite3_uri_boolean,r._sqlite3_serialize=i.sqlite3_serialize,r._sqlite3_prepare_v2=i.sqlite3_prepare_v2,r._sqlite3_step=i.sqlite3_step,r._sqlite3_column_int64=i.sqlite3_column_int64,r._sqlite3_reset=i.sqlite3_reset,r._sqlite3_exec=i.sqlite3_exec,r._sqlite3_column_int=i.sqlite3_column_int,r._sqlite3_finalize=i.sqlite3_finalize,r._sqlite3_file_control=i.sqlite3_file_control,r._sqlite3_column_name=i.sqlite3_column_name,r._sqlite3_column_text=i.sqlite3_column_text,r._sqlite3_column_type=i.sqlite3_column_type,r._sqlite3_errmsg=i.sqlite3_errmsg,r._sqlite3_deserialize=i.sqlite3_deserialize,r._sqlite3_clear_bindings=i.sqlite3_clear_bindings,r._sqlite3_value_blob=i.sqlite3_value_blob,r._sqlite3_value_bytes=i.sqlite3_value_bytes,r._sqlite3_value_double=i.sqlite3_value_double,r._sqlite3_value_int=i.sqlite3_value_int,r._sqlite3_value_int64=i.sqlite3_value_int64,r._sqlite3_value_subtype=i.sqlite3_value_subtype,r._sqlite3_value_pointer=i.sqlite3_value_pointer,r._sqlite3_value_type=i.sqlite3_value_type,r._sqlite3_value_nochange=i.sqlite3_value_nochange,r._sqlite3_value_frombind=i.sqlite3_value_frombind,r._sqlite3_value_dup=i.sqlite3_value_dup,r._sqlite3_value_free=i.sqlite3_value_free,r._sqlite3_result_blob=i.sqlite3_result_blob,r._sqlite3_result_error_toobig=i.sqlite3_result_error_toobig,r._sqlite3_result_error_nomem=i.sqlite3_result_error_nomem,r._sqlite3_result_double=i.sqlite3_result_double,r._sqlite3_result_error=i.sqlite3_result_error,r._sqlite3_result_int=i.sqlite3_result_int,r._sqlite3_result_int64=i.sqlite3_result_int64,r._sqlite3_result_null=i.sqlite3_result_null,r._sqlite3_result_pointer=i.sqlite3_result_pointer,r._sqlite3_result_subtype=i.sqlite3_result_subtype,r._sqlite3_result_text=i.sqlite3_result_text,r._sqlite3_result_zeroblob=i.sqlite3_result_zeroblob,r._sqlite3_result_zeroblob64=i.sqlite3_result_zeroblob64,r._sqlite3_result_error_code=i.sqlite3_result_error_code,r._sqlite3_user_data=i.sqlite3_user_data,r._sqlite3_context_db_handle=i.sqlite3_context_db_handle,r._sqlite3_vtab_nochange=i.sqlite3_vtab_nochange,r._sqlite3_vtab_in_first=i.sqlite3_vtab_in_first,r._sqlite3_vtab_in_next=i.sqlite3_vtab_in_next,r._sqlite3_aggregate_context=i.sqlite3_aggregate_context,r._sqlite3_get_auxdata=i.sqlite3_get_auxdata,r._sqlite3_set_auxdata=i.sqlite3_set_auxdata,r._sqlite3_column_count=i.sqlite3_column_count,r._sqlite3_data_count=i.sqlite3_data_count,r._sqlite3_column_blob=i.sqlite3_column_blob,r._sqlite3_column_bytes=i.sqlite3_column_bytes,r._sqlite3_column_double=i.sqlite3_column_double,r._sqlite3_column_value=i.sqlite3_column_value,r._sqlite3_column_decltype=i.sqlite3_column_decltype,r._sqlite3_bind_blob=i.sqlite3_bind_blob,r._sqlite3_bind_double=i.sqlite3_bind_double,r._sqlite3_bind_int=i.sqlite3_bind_int,r._sqlite3_bind_int64=i.sqlite3_bind_int64,r._sqlite3_bind_null=i.sqlite3_bind_null,r._sqlite3_bind_pointer=i.sqlite3_bind_pointer,r._sqlite3_bind_text=i.sqlite3_bind_text,r._sqlite3_bind_parameter_count=i.sqlite3_bind_parameter_count,r._sqlite3_bind_parameter_name=i.sqlite3_bind_parameter_name,r._sqlite3_bind_parameter_index=i.sqlite3_bind_parameter_index,r._sqlite3_db_handle=i.sqlite3_db_handle,r._sqlite3_stmt_readonly=i.sqlite3_stmt_readonly,r._sqlite3_stmt_isexplain=i.sqlite3_stmt_isexplain,r._sqlite3_stmt_explain=i.sqlite3_stmt_explain,r._sqlite3_stmt_busy=i.sqlite3_stmt_busy,r._sqlite3_stmt_status=i.sqlite3_stmt_status,r._sqlite3_sql=i.sqlite3_sql,r._sqlite3_expanded_sql=i.sqlite3_expanded_sql,r._sqlite3_preupdate_old=i.sqlite3_preupdate_old,r._sqlite3_preupdate_count=i.sqlite3_preupdate_count,r._sqlite3_preupdate_depth=i.sqlite3_preupdate_depth,r._sqlite3_preupdate_blobwrite=i.sqlite3_preupdate_blobwrite,r._sqlite3_preupdate_new=i.sqlite3_preupdate_new,r._sqlite3_value_numeric_type=i.sqlite3_value_numeric_type,r._sqlite3_set_authorizer=i.sqlite3_set_authorizer,r._sqlite3_strglob=i.sqlite3_strglob,r._sqlite3_strlike=i.sqlite3_strlike,r._sqlite3_auto_extension=i.sqlite3_auto_extension,r._sqlite3_cancel_auto_extension=i.sqlite3_cancel_auto_extension,r._sqlite3_reset_auto_extension=i.sqlite3_reset_auto_extension,r._sqlite3_prepare_v3=i.sqlite3_prepare_v3,r._sqlite3_create_module=i.sqlite3_create_module,r._sqlite3_create_module_v2=i.sqlite3_create_module_v2,r._sqlite3_drop_modules=i.sqlite3_drop_modules,r._sqlite3_declare_vtab=i.sqlite3_declare_vtab,r._sqlite3_vtab_on_conflict=i.sqlite3_vtab_on_conflict,r._sqlite3_vtab_collation=i.sqlite3_vtab_collation,r._sqlite3_vtab_in=i.sqlite3_vtab_in,r._sqlite3_vtab_rhs_value=i.sqlite3_vtab_rhs_value,r._sqlite3_vtab_distinct=i.sqlite3_vtab_distinct,r._sqlite3_keyword_name=i.sqlite3_keyword_name,r._sqlite3_keyword_count=i.sqlite3_keyword_count,r._sqlite3_keyword_check=i.sqlite3_keyword_check,r._sqlite3_complete=i.sqlite3_complete,r._sqlite3_libversion=i.sqlite3_libversion,r._sqlite3_libversion_number=i.sqlite3_libversion_number,r._sqlite3_shutdown=i.sqlite3_shutdown,r._sqlite3mc_vfs_shutdown=i.sqlite3mc_vfs_shutdown,r._sqlite3_last_insert_rowid=i.sqlite3_last_insert_rowid,r._sqlite3_set_last_insert_rowid=i.sqlite3_set_last_insert_rowid,r._sqlite3_changes64=i.sqlite3_changes64,r._sqlite3_changes=i.sqlite3_changes,r._sqlite3_total_changes64=i.sqlite3_total_changes64,r._sqlite3_total_changes=i.sqlite3_total_changes,r._sqlite3_txn_state=i.sqlite3_txn_state,r._sqlite3_close_v2=i.sqlite3_close_v2,r._sqlite3_busy_handler=i.sqlite3_busy_handler,r._sqlite3_progress_handler=i.sqlite3_progress_handler,r._sqlite3_busy_timeout=i.sqlite3_busy_timeout,r._sqlite3_interrupt=i.sqlite3_interrupt,r._sqlite3_is_interrupted=i.sqlite3_is_interrupted,r._sqlite3_create_function=i.sqlite3_create_function,r._sqlite3_create_function_v2=i.sqlite3_create_function_v2,r._sqlite3_create_window_function=i.sqlite3_create_window_function,r._sqlite3_overload_function=i.sqlite3_overload_function,r._sqlite3_trace_v2=i.sqlite3_trace_v2,r._sqlite3_commit_hook=i.sqlite3_commit_hook,r._sqlite3_update_hook=i.sqlite3_update_hook,r._sqlite3_rollback_hook=i.sqlite3_rollback_hook,r._sqlite3_preupdate_hook=i.sqlite3_preupdate_hook,r._sqlite3_error_offset=i.sqlite3_error_offset,r._sqlite3_errcode=i.sqlite3_errcode,r._sqlite3_extended_errcode=i.sqlite3_extended_errcode,r._sqlite3_errstr=i.sqlite3_errstr,r._sqlite3_limit=i.sqlite3_limit,r._sqlite3_open=i.sqlite3_open,r._sqlite3_open_v2=i.sqlite3_open_v2,r._sqlite3_create_collation=i.sqlite3_create_collation,r._sqlite3_create_collation_v2=i.sqlite3_create_collation_v2,r._sqlite3_collation_needed=i.sqlite3_collation_needed,r._sqlite3_get_autocommit=i.sqlite3_get_autocommit,r._sqlite3_table_column_metadata=i.sqlite3_table_column_metadata,r._sqlite3_extended_result_codes=i.sqlite3_extended_result_codes,r._sqlite3_uri_key=i.sqlite3_uri_key,r._sqlite3_uri_int64=i.sqlite3_uri_int64,r._sqlite3_db_name=i.sqlite3_db_name,r._sqlite3_db_filename=i.sqlite3_db_filename,r._sqlite3_db_readonly=i.sqlite3_db_readonly,r._sqlite3_compileoption_used=i.sqlite3_compileoption_used,r._sqlite3_compileoption_get=i.sqlite3_compileoption_get,r._sqlite3session_diff=i.sqlite3session_diff,r._sqlite3session_attach=i.sqlite3session_attach,r._sqlite3session_create=i.sqlite3session_create,r._sqlite3session_delete=i.sqlite3session_delete,r._sqlite3session_table_filter=i.sqlite3session_table_filter,r._sqlite3session_changeset=i.sqlite3session_changeset,r._sqlite3session_changeset_strm=i.sqlite3session_changeset_strm,r._sqlite3session_patchset_strm=i.sqlite3session_patchset_strm,r._sqlite3session_patchset=i.sqlite3session_patchset,r._sqlite3session_enable=i.sqlite3session_enable,r._sqlite3session_indirect=i.sqlite3session_indirect,r._sqlite3session_isempty=i.sqlite3session_isempty,r._sqlite3session_memory_used=i.sqlite3session_memory_used,r._sqlite3session_object_config=i.sqlite3session_object_config,r._sqlite3session_changeset_size=i.sqlite3session_changeset_size,r._sqlite3changeset_start=i.sqlite3changeset_start,r._sqlite3changeset_start_v2=i.sqlite3changeset_start_v2,r._sqlite3changeset_start_strm=i.sqlite3changeset_start_strm,r._sqlite3changeset_start_v2_strm=i.sqlite3changeset_start_v2_strm,r._sqlite3changeset_next=i.sqlite3changeset_next,r._sqlite3changeset_op=i.sqlite3changeset_op,r._sqlite3changeset_pk=i.sqlite3changeset_pk,r._sqlite3changeset_old=i.sqlite3changeset_old,r._sqlite3changeset_new=i.sqlite3changeset_new,r._sqlite3changeset_conflict=i.sqlite3changeset_conflict,r._sqlite3changeset_fk_conflicts=i.sqlite3changeset_fk_conflicts,r._sqlite3changeset_finalize=i.sqlite3changeset_finalize,r._sqlite3changeset_invert=i.sqlite3changeset_invert,r._sqlite3changeset_invert_strm=i.sqlite3changeset_invert_strm,r._sqlite3changeset_apply_v2=i.sqlite3changeset_apply_v2,r._sqlite3changeset_apply=i.sqlite3changeset_apply,r._sqlite3changeset_apply_v2_strm=i.sqlite3changeset_apply_v2_strm,r._sqlite3changeset_apply_strm=i.sqlite3changeset_apply_strm,r._sqlite3changegroup_new=i.sqlite3changegroup_new,r._sqlite3changegroup_add=i.sqlite3changegroup_add,r._sqlite3changegroup_output=i.sqlite3changegroup_output,r._sqlite3changegroup_add_strm=i.sqlite3changegroup_add_strm,r._sqlite3changegroup_output_strm=i.sqlite3changegroup_output_strm,r._sqlite3changegroup_delete=i.sqlite3changegroup_delete,r._sqlite3changeset_concat=i.sqlite3changeset_concat,r._sqlite3changeset_concat_strm=i.sqlite3changeset_concat_strm,r._sqlite3session_config=i.sqlite3session_config,r._sqlite3_sourceid=i.sqlite3_sourceid,r._sqlite3mc_version=i.sqlite3mc_version,r._sqlite3mc_config=i.sqlite3mc_config,r._sqlite3mc_cipher_count=i.sqlite3mc_cipher_count,r._sqlite3mc_cipher_index=i.sqlite3mc_cipher_index,r._sqlite3mc_cipher_name=i.sqlite3mc_cipher_name,r._sqlite3mc_config_cipher=i.sqlite3mc_config_cipher,r._sqlite3mc_codec_data=i.sqlite3mc_codec_data,r._sqlite3_activate_see=i.sqlite3_activate_see,r._sqlite3_key=i.sqlite3_key,r._sqlite3_key_v2=i.sqlite3_key_v2,r._sqlite3_rekey_v2=i.sqlite3_rekey_v2,r._sqlite3_rekey=i.sqlite3_rekey,r._sqlite3mc_vfs_destroy=i.sqlite3mc_vfs_destroy,r._sqlite3__wasm_pstack_ptr=i.sqlite3__wasm_pstack_ptr,r._sqlite3__wasm_pstack_restore=i.sqlite3__wasm_pstack_restore,r._sqlite3__wasm_pstack_alloc=i.sqlite3__wasm_pstack_alloc,r._sqlite3__wasm_pstack_remaining=i.sqlite3__wasm_pstack_remaining,r._sqlite3__wasm_pstack_quota=i.sqlite3__wasm_pstack_quota,r._sqlite3__wasm_db_error=i.sqlite3__wasm_db_error,r._sqlite3__wasm_test_struct=i.sqlite3__wasm_test_struct,r._sqlite3__wasm_enum_json=i.sqlite3__wasm_enum_json,r._sqlite3__wasm_vfs_unlink=i.sqlite3__wasm_vfs_unlink,r._sqlite3__wasm_db_vfs=i.sqlite3__wasm_db_vfs,r._sqlite3__wasm_db_reset=i.sqlite3__wasm_db_reset,r._sqlite3__wasm_db_export_chunked=i.sqlite3__wasm_db_export_chunked,r._sqlite3__wasm_db_serialize=i.sqlite3__wasm_db_serialize,r._sqlite3__wasm_vfs_create_file=i.sqlite3__wasm_vfs_create_file,r._sqlite3__wasm_posix_create_file=i.sqlite3__wasm_posix_create_file,r._sqlite3__wasm_kvvfsMakeKeyOnPstack=i.sqlite3__wasm_kvvfsMakeKeyOnPstack,r._sqlite3__wasm_kvvfs_methods=i.sqlite3__wasm_kvvfs_methods,r._sqlite3__wasm_vtab_config=i.sqlite3__wasm_vtab_config,r._sqlite3__wasm_db_config_ip=i.sqlite3__wasm_db_config_ip,r._sqlite3__wasm_db_config_pii=i.sqlite3__wasm_db_config_pii,r._sqlite3__wasm_db_config_s=i.sqlite3__wasm_db_config_s,r._sqlite3__wasm_config_i=i.sqlite3__wasm_config_i,r._sqlite3__wasm_config_ii=i.sqlite3__wasm_config_ii,r._sqlite3__wasm_config_j=i.sqlite3__wasm_config_j,r._sqlite3__wasm_qfmt_token=i.sqlite3__wasm_qfmt_token,r._sqlite3__wasm_init_wasmfs=i.sqlite3__wasm_init_wasmfs,r._sqlite3__wasm_test_intptr=i.sqlite3__wasm_test_intptr,r._sqlite3__wasm_test_voidptr=i.sqlite3__wasm_test_voidptr,r._sqlite3__wasm_test_int64_max=i.sqlite3__wasm_test_int64_max,r._sqlite3__wasm_test_int64_min=i.sqlite3__wasm_test_int64_min,r._sqlite3__wasm_test_int64_times2=i.sqlite3__wasm_test_int64_times2,r._sqlite3__wasm_test_int64_minmax=i.sqlite3__wasm_test_int64_minmax,r._sqlite3__wasm_test_int64ptr=i.sqlite3__wasm_test_int64ptr,r._sqlite3__wasm_test_stack_overflow=i.sqlite3__wasm_test_stack_overflow,r._sqlite3__wasm_test_str_hello=i.sqlite3__wasm_test_str_hello,r._sqlite3__wasm_SQLTester_strglob=i.sqlite3__wasm_SQLTester_strglob,r._malloc=i.malloc,r._free=i.free,r._realloc=i.realloc,Xu=i.emscripten_builtin_memalign,i._emscripten_stack_restore,i._emscripten_stack_alloc,i.emscripten_stack_get_current}var Yu={__syscall_chmod:ay,__syscall_faccessat:ly,__syscall_fchmod:cy,__syscall_fchown32:uy,__syscall_fcntl64:dy,__syscall_fstat64:fy,__syscall_ftruncate64:my,__syscall_getcwd:_y,__syscall_ioctl:gy,__syscall_lstat64:yy,__syscall_mkdirat:by,__syscall_newfstatat:wy,__syscall_openat:Ny,__syscall_readlinkat:xy,__syscall_rmdir:vy,__syscall_stat64:qy,__syscall_unlinkat:Sy,__syscall_utimensat:ky,_abort_js:Ey,_localtime_js:Cy,_mmap_js:Py,_munmap_js:Ly,_tzset_js:Fy,clock_time_get:Wy,emscripten_date_now:Gu,emscripten_get_now:Ku,emscripten_resize_heap:Uy,environ_get:$y,environ_sizes_get:jy,exit:Jy,fd_close:Ky,fd_fdstat_get:Gy,fd_read:Yy,fd_seek:Zy,fd_sync:e0,fd_write:r0,memory:Re,random_get:n0},fi=await _n();function Ta(){if(ne>0){se=Ta;return}if(M(),ne>0){se=Ta;return}function i(){r.calledRun=!0,!ge&&(pe(),Ee?.(r),r.onRuntimeInitialized?.(),oe())}r.setStatus?(r.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>r.setStatus(""),1),i()},1)):i()}function s0(){if(r.preInit)for(typeof r.preInit=="function"&&(r.preInit=[r.preInit]);r.preInit.length>0;)r.preInit.shift()()}return s0(),Ta(),r.runSQLite3PostLoadInit=function(i){if(globalThis.sqlite3ApiBootstrap=function o(u=globalThis.sqlite3ApiConfig||o.defaultConfig){if(o.sqlite3)return(o.sqlite3.config||console).warn("sqlite3ApiBootstrap() called multiple times.","Config and external initializers are ignored on calls after the first."),o.sqlite3;const l=Object.assign(Object.create(null),{exports:void 0,memory:void 0,bigIntEnabled:typeof r<"u"&&r.HEAPU64?!0:!!globalThis.BigInt64Array,debug:console.debug.bind(console),warn:console.warn.bind(console),error:console.error.bind(console),log:console.log.bind(console),wasmfsOpfsDir:"/opfs",useStdAlloc:!1},u||{});Object.assign(l,{allocExportName:l.useStdAlloc?"malloc":"sqlite3_malloc",deallocExportName:l.useStdAlloc?"free":"sqlite3_free",reallocExportName:l.useStdAlloc?"realloc":"sqlite3_realloc"},l),["exports","memory","wasmfsOpfsDir"].forEach(d=>{typeof l[d]=="function"&&(l[d]=l[d]())}),delete globalThis.sqlite3ApiConfig,delete o.defaultConfig;const c=Object.create(null),f=Object.create(null),A=d=>c.sqlite3_js_rc_str&&c.sqlite3_js_rc_str(d)||"Unknown result code #"+d,O=d=>typeof d=="number"&&d===(d|0);class Y extends Error{constructor(..._){let b;if(_.length)if(O(_[0]))if(b=_[0],_.length===1)super(A(_[0]));else{const S=A(b);typeof _[1]=="object"?super(S,_[1]):(_[0]=S+":",super(_.join(" ")))}else _.length===2&&typeof _[1]=="object"?super(..._):super(_.join(" "));this.resultCode=b||c.SQLITE_ERROR,this.name="SQLite3Error"}}Y.toss=(...d)=>{throw new Y(...d)};const ee=Y.toss;l.wasmfsOpfsDir&&!/^\/[^/]+$/.test(l.wasmfsOpfsDir)&&ee("config.wasmfsOpfsDir must be falsy or in the form '/dir-name'.");const fe=d=>typeof d!="bigint"&&d===(d|0)&&d<=2147483647&&d>=-2147483648,_e=function d(_){return d._max||(d._max=BigInt("0x7fffffffffffffff"),d._min=~d._max),_>=d._min&&_<=d._max},H=d=>d>=-0x7fffffffn-1n&&d<=0x7fffffffn,B=function d(_){return d._min||(d._min=Number.MIN_SAFE_INTEGER,d._max=Number.MAX_SAFE_INTEGER),_>=d._min&&_<=d._max},ae=d=>d&&d.constructor&&fe(d.constructor.BYTES_PER_ELEMENT)?d:!1,E=typeof SharedArrayBuffer>"u"?function(){}:SharedArrayBuffer,T=d=>d.buffer instanceof E,F=(d,_,b)=>T(d)?d.slice(_,b):d.subarray(_,b),J=d=>d&&(d instanceof Uint8Array||d instanceof Int8Array||d instanceof ArrayBuffer),K=d=>d&&(d instanceof Uint8Array||d instanceof Int8Array||d instanceof ArrayBuffer),W=d=>J(d)||ee("Value is not of a supported TypedArray type."),te=new TextDecoder("utf-8"),xe=function(d,_,b){return te.decode(F(d,_,b))},y=function(d){return K(d)?xe(d instanceof ArrayBuffer?new Uint8Array(d):d):Array.isArray(d)?d.join(""):(f.isPtr(d)&&(d=f.cstrToJs(d)),d)};class x extends Error{constructor(..._){_.length===2&&typeof _[1]=="object"?super(..._):_.length?super(_.join(" ")):super("Allocation failed."),this.resultCode=c.SQLITE_NOMEM,this.name="WasmAllocError"}}x.toss=(...d)=>{throw new x(...d)},Object.assign(c,{sqlite3_bind_blob:void 0,sqlite3_bind_text:void 0,sqlite3_create_function_v2:(d,_,b,S,U,be,Fe,He,Ve)=>{},sqlite3_create_function:(d,_,b,S,U,be,Fe,He)=>{},sqlite3_create_window_function:(d,_,b,S,U,be,Fe,He,Ve,de)=>{},sqlite3_prepare_v3:(d,_,b,S,U,be)=>{},sqlite3_prepare_v2:(d,_,b,S,U)=>{},sqlite3_exec:(d,_,b,S,U)=>{},sqlite3_randomness:(d,_)=>{}});const P={affirmBindableTypedArray:W,flexibleString:y,bigIntFits32:H,bigIntFits64:_e,bigIntFitsDouble:B,isBindableTypedArray:J,isInt32:fe,isSQLableTypedArray:K,isTypedArray:ae,typedArrayToString:xe,isUIThread:()=>globalThis.window===globalThis&&!!globalThis.document,isSharedTypedArray:T,toss:function(...d){throw new Error(d.join(" "))},toss3:ee,typedArrayPart:F,affirmDbHeader:function(d){d instanceof ArrayBuffer&&(d=new Uint8Array(d));const _="SQLite format 3";_.length>d.byteLength&&ee("Input does not contain an SQLite3 database header.");for(let b=0;b<_.length;++b)_.charCodeAt(b)!==d[b]&&ee("Input does not contain an SQLite3 database header.")},affirmIsDb:function(d){d instanceof ArrayBuffer&&(d=new Uint8Array(d));const _=d.byteLength;(_<512||_%512!==0)&&ee("Byte array size",_,"is invalid for an SQLite3 db."),P.affirmDbHeader(d)}};Object.assign(f,{ptrSizeof:l.wasmPtrSizeof||4,ptrIR:l.wasmPtrIR||"i32",bigIntEnabled:!!l.bigIntEnabled,exports:l.exports||ee("Missing API config.exports (WASM module exports)."),memory:l.memory||l.exports.memory||ee("API config object requires a WebAssembly.Memory object","in either config.exports.memory (exported)","or config.memory (imported)."),alloc:void 0,realloc:void 0,dealloc:void 0}),f.allocFromTypedArray=function(d){d instanceof ArrayBuffer&&(d=new Uint8Array(d)),W(d);const _=f.alloc(d.byteLength||1);return f.heapForSize(d.constructor).set(d.byteLength?d:[0],_),_};{const d=l.allocExportName,_=l.deallocExportName,b=l.reallocExportName;for(const S of[d,_,b])f.exports[S]instanceof Function||ee("Missing required exports[",S,"] function.");f.alloc=function S(U){return S.impl(U)||x.toss("Failed to allocate",U," bytes.")},f.alloc.impl=f.exports[d],f.realloc=function S(U,be){const Fe=S.impl(U,be);return be?Fe||x.toss("Failed to reallocate",be," bytes."):0},f.realloc.impl=f.exports[b],f.dealloc=f.exports[_]}f.compileOptionUsed=function d(_){if(arguments.length){if(Array.isArray(_)){const b={};return _.forEach(S=>{b[S]=c.sqlite3_compileoption_used(S)}),b}else if(typeof _=="object")return Object.keys(_).forEach(b=>{_[b]=c.sqlite3_compileoption_used(b)}),_}else{if(d._result)return d._result;d._opt||(d._rx=/^([^=]+)=(.+)/,d._rxInt=/^-?\d+$/,d._opt=function(Fe,He){const Ve=d._rx.exec(Fe);He[0]=Ve?Ve[1]:Fe,He[1]=Ve?d._rxInt.test(Ve[2])?+Ve[2]:Ve[2]:!0});const b={},S=[0,0];let U=0,be;for(;be=c.sqlite3_compileoption_get(U++);)d._opt(be,S),b[S[0]]=S[1];return d._result=b}return typeof _=="string"?!!c.sqlite3_compileoption_used(_):!1},f.pstack=Object.assign(Object.create(null),{restore:f.exports.sqlite3__wasm_pstack_restore,alloc:function(d){return typeof d=="string"&&!(d=f.sizeofIR(d))&&x.toss("Invalid value for pstack.alloc(",arguments[0],")"),f.exports.sqlite3__wasm_pstack_alloc(d)||x.toss("Could not allocate",d,"bytes from the pstack.")},allocChunks:function(d,_){typeof _=="string"&&!(_=f.sizeofIR(_))&&x.toss("Invalid size value for allocChunks(",arguments[1],")");const b=f.pstack.alloc(d*_),S=[];let U=0,be=0;for(;U<d;++U,be+=_)S.push(b+be);return S},allocPtr:(d=1,_=!0)=>d===1?f.pstack.alloc(_?8:f.ptrSizeof):f.pstack.allocChunks(d,_?8:f.ptrSizeof),call:function(d){const _=f.pstack.pointer;try{return d(ce)}finally{f.pstack.restore(_)}}}),Object.defineProperties(f.pstack,{pointer:{configurable:!1,iterable:!0,writeable:!1,get:f.exports.sqlite3__wasm_pstack_ptr},quota:{configurable:!1,iterable:!0,writeable:!1,get:f.exports.sqlite3__wasm_pstack_quota},remaining:{configurable:!1,iterable:!0,writeable:!1,get:f.exports.sqlite3__wasm_pstack_remaining}}),c.sqlite3_randomness=(...d)=>{if(d.length===1&&P.isTypedArray(d[0])&&d[0].BYTES_PER_ELEMENT===1){const _=d[0];if(_.byteLength===0)return f.exports.sqlite3_randomness(0,0),_;const b=f.pstack.pointer;try{let S=_.byteLength,U=0;const be=f.exports.sqlite3_randomness,Fe=f.heap8u(),He=S<512?S:512,Ve=f.pstack.alloc(He);do{const de=S>He?He:S;be(de,Ve),_.set(F(Fe,Ve,Ve+de),U),S-=de,U+=de}while(S>0)}catch(S){console.error("Highly unexpected (and ignored!) exception in sqlite3_randomness():",S)}finally{f.pstack.restore(b)}return _}f.exports.sqlite3_randomness(...d)};let le;if(c.sqlite3_wasmfs_opfs_dir=function(){if(le!==void 0)return le;const d=l.wasmfsOpfsDir;if(!d||!globalThis.FileSystemHandle||!globalThis.FileSystemDirectoryHandle||!globalThis.FileSystemFileHandle)return le="";try{return d&&f.xCallWrapped("sqlite3__wasm_init_wasmfs","i32",["string"],d)===0?le=d:le=""}catch{return le=""}},c.sqlite3_wasmfs_filename_is_persistent=function(d){const _=c.sqlite3_wasmfs_opfs_dir();return _&&d?d.startsWith(_+"/"):!1},c.sqlite3_js_db_uses_vfs=function(d,_,b=0){try{const S=c.sqlite3_vfs_find(_);return S?d?S===c.sqlite3_js_db_vfs(d,b)?S:!1:S===c.sqlite3_vfs_find(0)?S:!1:!1}catch{return!1}},c.sqlite3_js_vfs_list=function(){const d=[];let _=c.sqlite3_vfs_find(0);for(;_;){const b=new c.sqlite3_vfs(_);d.push(f.cstrToJs(b.$zName)),_=b.$pNext,b.dispose()}return d},c.sqlite3_js_db_export=function(d,_=0){d=f.xWrap.testConvertArg("sqlite3*",d),d||ee("Invalid sqlite3* argument."),f.bigIntEnabled||ee("BigInt64 support is not enabled.");const b=f.scopedAllocPush();let S;try{const U=f.scopedAlloc(8+f.ptrSizeof),be=U+8,Fe=_?f.isPtr(_)?_:f.scopedAllocCString(""+_):0;let He=f.exports.sqlite3__wasm_db_serialize(d,Fe,be,U,0);He&&ee("Database serialization failed with code",ce.capi.sqlite3_js_rc_str(He)),S=f.peekPtr(be);const Ve=f.peek(U,"i64");return He=Ve?f.heap8u().slice(S,S+Number(Ve)):new Uint8Array,He}finally{S&&f.exports.sqlite3_free(S),f.scopedAllocPop(b)}},c.sqlite3_js_db_vfs=(d,_=0)=>P.sqlite3__wasm_db_vfs(d,_),c.sqlite3_js_aggregate_context=(d,_)=>c.sqlite3_aggregate_context(d,_)||(_?x.toss("Cannot allocate",_,"bytes for sqlite3_aggregate_context()"):0),c.sqlite3_js_posix_create_file=function(d,_,b){let S;_&&f.isPtr(_)?S=_:_ instanceof ArrayBuffer||_ instanceof Uint8Array?(S=f.allocFromTypedArray(_),(arguments.length<3||!P.isInt32(b)||b<0)&&(b=_.byteLength)):Y.toss("Invalid 2nd argument for sqlite3_js_posix_create_file().");try{(!P.isInt32(b)||b<0)&&Y.toss("Invalid 3rd argument for sqlite3_js_posix_create_file().");const U=P.sqlite3__wasm_posix_create_file(d,S,b);U&&Y.toss("Creation of file failed with sqlite3 result code",c.sqlite3_js_rc_str(U))}finally{f.dealloc(S)}},c.sqlite3_js_vfs_create_file=function(d,_,b,S){l.warn("sqlite3_js_vfs_create_file() is deprecated and","should be avoided because it can lead to C-level crashes.","See its documentation for alternative options.");let U;b?(f.isPtr(b)?U=b:b instanceof ArrayBuffer&&(b=new Uint8Array(b)),b instanceof Uint8Array?(U=f.allocFromTypedArray(b),(arguments.length<4||!P.isInt32(S)||S<0)&&(S=b.byteLength)):Y.toss("Invalid 3rd argument type for sqlite3_js_vfs_create_file().")):U=0,(!P.isInt32(S)||S<0)&&(f.dealloc(U),Y.toss("Invalid 4th argument for sqlite3_js_vfs_create_file()."));try{const be=P.sqlite3__wasm_vfs_create_file(d,_,U,S);be&&Y.toss("Creation of file failed with sqlite3 result code",c.sqlite3_js_rc_str(be))}finally{f.dealloc(U)}},c.sqlite3_js_sql_to_string=d=>{if(typeof d=="string")return d;const _=y(v);return _===v?void 0:_},P.isUIThread()){const d=function(_){const b=Object.create(null);return b.prefix="kvvfs-"+_,b.stores=[],(_==="session"||_==="")&&b.stores.push(globalThis.sessionStorage),(_==="local"||_==="")&&b.stores.push(globalThis.localStorage),b};c.sqlite3_js_kvvfs_clear=function(_=""){let b=0;const S=d(_);return S.stores.forEach(U=>{const be=[];let Fe;for(Fe=0;Fe<U.length;++Fe){const He=U.key(Fe);He.startsWith(S.prefix)&&be.push(He)}be.forEach(He=>U.removeItem(He)),b+=be.length}),b},c.sqlite3_js_kvvfs_size=function(_=""){let b=0;const S=d(_);return S.stores.forEach(U=>{let be;for(be=0;be<U.length;++be){const Fe=U.key(be);Fe.startsWith(S.prefix)&&(b+=Fe.length,b+=U.getItem(Fe).length)}}),b*2}}c.sqlite3_db_config=(function(d,_,...b){switch(_){case c.SQLITE_DBCONFIG_ENABLE_FKEY:case c.SQLITE_DBCONFIG_ENABLE_TRIGGER:case c.SQLITE_DBCONFIG_ENABLE_FTS3_TOKENIZER:case c.SQLITE_DBCONFIG_ENABLE_LOAD_EXTENSION:case c.SQLITE_DBCONFIG_NO_CKPT_ON_CLOSE:case c.SQLITE_DBCONFIG_ENABLE_QPSG:case c.SQLITE_DBCONFIG_TRIGGER_EQP:case c.SQLITE_DBCONFIG_RESET_DATABASE:case c.SQLITE_DBCONFIG_DEFENSIVE:case c.SQLITE_DBCONFIG_WRITABLE_SCHEMA:case c.SQLITE_DBCONFIG_LEGACY_ALTER_TABLE:case c.SQLITE_DBCONFIG_DQS_DML:case c.SQLITE_DBCONFIG_DQS_DDL:case c.SQLITE_DBCONFIG_ENABLE_VIEW:case c.SQLITE_DBCONFIG_LEGACY_FILE_FORMAT:case c.SQLITE_DBCONFIG_TRUSTED_SCHEMA:case c.SQLITE_DBCONFIG_STMT_SCANSTATUS:case c.SQLITE_DBCONFIG_REVERSE_SCANORDER:case c.SQLITE_DBCONFIG_ENABLE_ATTACH_CREATE:case c.SQLITE_DBCONFIG_ENABLE_ATTACH_WRITE:case c.SQLITE_DBCONFIG_ENABLE_COMMENTS:return this.ip||(this.ip=f.xWrap("sqlite3__wasm_db_config_ip","int",["sqlite3*","int","int","*"])),this.ip(d,_,b[0],b[1]||0);case c.SQLITE_DBCONFIG_LOOKASIDE:return this.pii||(this.pii=f.xWrap("sqlite3__wasm_db_config_pii","int",["sqlite3*","int","*","int","int"])),this.pii(d,_,b[0],b[1],b[2]);case c.SQLITE_DBCONFIG_MAINDBNAME:return this.s||(this.s=f.xWrap("sqlite3__wasm_db_config_s","int",["sqlite3*","int","string:static"])),this.s(d,_,b[0]);default:return c.SQLITE_MISUSE}}).bind(Object.create(null)),c.sqlite3_value_to_js=function(d,_=!0){let b;const S=c.sqlite3_value_type(d);switch(S){case c.SQLITE_INTEGER:f.bigIntEnabled?(b=c.sqlite3_value_int64(d),P.bigIntFitsDouble(b)&&(b=Number(b))):b=c.sqlite3_value_double(d);break;case c.SQLITE_FLOAT:b=c.sqlite3_value_double(d);break;case c.SQLITE_TEXT:b=c.sqlite3_value_text(d);break;case c.SQLITE_BLOB:{const U=c.sqlite3_value_bytes(d),be=c.sqlite3_value_blob(d);U&&!be&&ce.WasmAllocError.toss("Cannot allocate memory for blob argument of",U,"byte(s)"),b=U?f.heap8u().slice(be,be+Number(U)):null;break}case c.SQLITE_NULL:b=null;break;default:_&&ee(c.SQLITE_MISMATCH,"Unhandled sqlite3_value_type():",S),b=void 0}return b},c.sqlite3_values_to_js=function(d,_,b=!0){let S;const U=[];for(S=0;S<d;++S)U.push(c.sqlite3_value_to_js(f.peekPtr(_+f.ptrSizeof*S),b));return U},c.sqlite3_result_error_js=function(d,_){_ instanceof x?c.sqlite3_result_error_nomem(d):c.sqlite3_result_error(d,""+_,-1)},c.sqlite3_result_js=function(d,_){if(_ instanceof Error){c.sqlite3_result_error_js(d,_);return}try{switch(typeof _){case"undefined":break;case"boolean":c.sqlite3_result_int(d,_?1:0);break;case"bigint":P.bigIntFits32(_)?c.sqlite3_result_int(d,Number(_)):P.bigIntFitsDouble(_)?c.sqlite3_result_double(d,Number(_)):f.bigIntEnabled?P.bigIntFits64(_)?c.sqlite3_result_int64(d,_):ee("BigInt value",_.toString(),"is too BigInt for int64."):ee("BigInt value",_.toString(),"is too BigInt.");break;case"number":{let b;P.isInt32(_)?b=c.sqlite3_result_int:f.bigIntEnabled&&Number.isInteger(_)&&P.bigIntFits64(BigInt(_))?b=c.sqlite3_result_int64:b=c.sqlite3_result_double,b(d,_);break}case"string":{const[b,S]=f.allocCString(_,!0);c.sqlite3_result_text(d,b,S,c.SQLITE_WASM_DEALLOC);break}case"object":if(_===null){c.sqlite3_result_null(d);break}else if(P.isBindableTypedArray(_)){const b=f.allocFromTypedArray(_);c.sqlite3_result_blob(d,b,_.byteLength,c.SQLITE_WASM_DEALLOC);break}default:ee("Don't not how to handle this UDF result value:",typeof _,_)}}catch(b){c.sqlite3_result_error_js(d,b)}},c.sqlite3_column_js=function(d,_,b=!0){const S=c.sqlite3_column_value(d,_);return S===0?void 0:c.sqlite3_value_to_js(S,b)};const X=(function(d,_,b){b=c[b],this.ptr?f.pokePtr(this.ptr,0):this.ptr=f.allocPtr();const S=b(d,_,this.ptr);if(S)return Y.toss(S,arguments[2]+"() failed with code "+S);const U=f.peekPtr(this.ptr);return U?c.sqlite3_value_to_js(U,!0):void 0}).bind(Object.create(null));c.sqlite3_preupdate_new_js=(d,_)=>X(d,_,"sqlite3_preupdate_new"),c.sqlite3_preupdate_old_js=(d,_)=>X(d,_,"sqlite3_preupdate_old"),c.sqlite3changeset_new_js=(d,_)=>X(d,_,"sqlite3changeset_new"),c.sqlite3changeset_old_js=(d,_)=>X(d,_,"sqlite3changeset_old");const ce={WasmAllocError:x,SQLite3Error:Y,capi:c,util:P,wasm:f,config:l,version:Object.create(null),client:void 0,asyncPostInit:async function d(){if(d.isReady instanceof Promise)return d.isReady;let _=o.initializersAsync;delete o.initializersAsync;const b=async()=>(ce.__isUnderTest||(delete ce.util,delete ce.StructBinder),ce),S=be=>{throw l.error("an async sqlite3 initializer failed:",be),be};if(!_||!_.length)return d.isReady=b().catch(S);_=_.map(be=>be instanceof Function?async Fe=>be(ce):be),_.push(b);let U=Promise.resolve(ce);for(;_.length;)U=U.then(_.shift());return d.isReady=U.catch(S)},scriptInfo:void 0};try{o.initializers.forEach(d=>{d(ce)})}catch(d){throw console.error("sqlite3 bootstrap initializer threw:",d),d}return delete o.initializers,o.sqlite3=ce,ce},globalThis.sqlite3ApiBootstrap.initializers=[],globalThis.sqlite3ApiBootstrap.initializersAsync=[],globalThis.sqlite3ApiBootstrap.defaultConfig=Object.create(null),globalThis.sqlite3ApiBootstrap.sqlite3=void 0,globalThis.WhWasmUtilInstaller=function(o){o.bigIntEnabled===void 0&&(o.bigIntEnabled=!!globalThis.BigInt64Array);const u=(...y)=>{throw new Error(y.join(" "))};o.exports||Object.defineProperty(o,"exports",{enumerable:!0,configurable:!0,get:()=>o.instance&&o.instance.exports});const l=o.pointerIR||"i32",c=o.ptrSizeof=l==="i32"?4:l==="i64"?8:u("Unhandled ptrSizeof:",l),f=Object.create(null);f.heapSize=0,f.memory=null,f.freeFuncIndexes=[],f.scopedAlloc=[],f.utf8Decoder=new TextDecoder,f.utf8Encoder=new TextEncoder("utf-8"),o.sizeofIR=y=>{switch(y){case"i8":return 1;case"i16":return 2;case"i32":case"f32":case"float":return 4;case"i64":case"f64":case"double":return 8;case"*":return c;default:return(""+y).endsWith("*")?c:void 0}};const A=function(){if(!f.memory)f.memory=o.memory instanceof WebAssembly.Memory?o.memory:o.exports.memory;else if(f.heapSize===f.memory.buffer.byteLength)return f;const y=f.memory.buffer;return f.HEAP8=new Int8Array(y),f.HEAP8U=new Uint8Array(y),f.HEAP16=new Int16Array(y),f.HEAP16U=new Uint16Array(y),f.HEAP32=new Int32Array(y),f.HEAP32U=new Uint32Array(y),o.bigIntEnabled&&(f.HEAP64=new BigInt64Array(y),f.HEAP64U=new BigUint64Array(y)),f.HEAP32F=new Float32Array(y),f.HEAP64F=new Float64Array(y),f.heapSize=y.byteLength,f};o.heap8=()=>A().HEAP8,o.heap8u=()=>A().HEAP8U,o.heap16=()=>A().HEAP16,o.heap16u=()=>A().HEAP16U,o.heap32=()=>A().HEAP32,o.heap32u=()=>A().HEAP32U,o.heapForSize=function(y,x=!0){const P=f.memory&&f.heapSize===f.memory.buffer.byteLength?f:A();switch(y){case Int8Array:return P.HEAP8;case Uint8Array:return P.HEAP8U;case Int16Array:return P.HEAP16;case Uint16Array:return P.HEAP16U;case Int32Array:return P.HEAP32;case Uint32Array:return P.HEAP32U;case 8:return x?P.HEAP8U:P.HEAP8;case 16:return x?P.HEAP16U:P.HEAP16;case 32:return x?P.HEAP32U:P.HEAP32;case 64:if(P.HEAP64)return x?P.HEAP64U:P.HEAP64;break;default:if(o.bigIntEnabled){if(y===globalThis.BigUint64Array)return P.HEAP64U;if(y===globalThis.BigInt64Array)return P.HEAP64;break}}u("Invalid heapForSize() size: expecting 8, 16, 32,","or (if BigInt is enabled) 64.")},o.functionTable=function(){return o.exports.__indirect_function_table},o.functionEntry=function(y){const x=o.functionTable();return y<x.length?x.get(y):void 0},o.jsFuncToWasm=function y(x,P){if(y._||(y._={sigTypes:Object.assign(Object.create(null),{i:"i32",p:"i32",P:"i32",s:"i32",j:"i64",f:"f32",d:"f64"}),typeCodes:Object.assign(Object.create(null),{f64:124,f32:125,i64:126,i32:127}),uleb128Encode:function(ce,d,_){_<128?ce[d](_):ce[d](_%128|128,_>>7)},rxJSig:/^(\w)\((\w*)\)$/,sigParams:function(ce){const d=y._.rxJSig.exec(ce);return d?d[2]:ce.substr(1)},letterType:ce=>y._.sigTypes[ce]||u("Invalid signature letter:",ce),pushSigType:(ce,d)=>ce.push(y._.typeCodes[y._.letterType(d)])}),typeof x=="string"){const ce=P;P=x,x=ce}const le=y._.sigParams(P),X=[1,96];y._.uleb128Encode(X,"push",le.length);for(const ce of le)y._.pushSigType(X,ce);return P[0]==="v"?X.push(0):(X.push(1),y._.pushSigType(X,P[0])),y._.uleb128Encode(X,"unshift",X.length),X.unshift(0,97,115,109,1,0,0,0,1),X.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array(X)),{e:{f:x}}).exports.f};const O=function(x,P,le){if(le&&!f.scopedAlloc.length&&u("No scopedAllocPush() scope is active."),typeof x=="string"){const _=P;P=x,x=_}(typeof P!="string"||!(x instanceof Function))&&u("Invalid arguments: expecting (function,signature) or (signature,function).");const X=o.functionTable(),ce=X.length;let d;for(;f.freeFuncIndexes.length&&(d=f.freeFuncIndexes.pop(),X.get(d));){d=null;continue}d||(d=ce,X.grow(1));try{return X.set(d,x),le&&f.scopedAlloc[f.scopedAlloc.length-1].push(d),d}catch(_){if(!(_ instanceof TypeError))throw d===ce&&f.freeFuncIndexes.push(ce),_}try{const _=o.jsFuncToWasm(x,P);X.set(d,_),le&&f.scopedAlloc[f.scopedAlloc.length-1].push(d)}catch(_){throw d===ce&&f.freeFuncIndexes.push(ce),_}return d};o.installFunction=(y,x)=>O(y,x,!1),o.scopedInstallFunction=(y,x)=>O(y,x,!0),o.uninstallFunction=function(y){if(!y&&y!==0)return;const x=f.freeFuncIndexes,P=o.functionTable();x.push(y);const le=P.get(y);return P.set(y,null),le},o.peek=function(x,P="i8"){P.endsWith("*")&&(P=l);const le=f.memory&&f.heapSize===f.memory.buffer.byteLength?f:A(),X=Array.isArray(x)?[]:void 0;let ce;do{switch(X&&(x=arguments[0].shift()),P){case"i1":case"i8":ce=le.HEAP8[x>>0];break;case"i16":ce=le.HEAP16[x>>1];break;case"i32":ce=le.HEAP32[x>>2];break;case"float":case"f32":ce=le.HEAP32F[x>>2];break;case"double":case"f64":ce=Number(le.HEAP64F[x>>3]);break;case"i64":if(o.bigIntEnabled){ce=BigInt(le.HEAP64[x>>3]);break}default:u("Invalid type for peek():",P)}X&&X.push(ce)}while(X&&arguments[0].length);return X||ce},o.poke=function(y,x,P="i8"){P.endsWith("*")&&(P=l);const le=f.memory&&f.heapSize===f.memory.buffer.byteLength?f:A();for(const X of Array.isArray(y)?y:[y])switch(P){case"i1":case"i8":le.HEAP8[X>>0]=x;continue;case"i16":le.HEAP16[X>>1]=x;continue;case"i32":le.HEAP32[X>>2]=x;continue;case"float":case"f32":le.HEAP32F[X>>2]=x;continue;case"double":case"f64":le.HEAP64F[X>>3]=x;continue;case"i64":if(le.HEAP64){le.HEAP64[X>>3]=BigInt(x);continue}default:u("Invalid type for poke(): "+P)}return this},o.peekPtr=(...y)=>o.peek(y.length===1?y[0]:y,l),o.pokePtr=(y,x=0)=>o.poke(y,x,l),o.peek8=(...y)=>o.peek(y.length===1?y[0]:y,"i8"),o.poke8=(y,x)=>o.poke(y,x,"i8"),o.peek16=(...y)=>o.peek(y.length===1?y[0]:y,"i16"),o.poke16=(y,x)=>o.poke(y,x,"i16"),o.peek32=(...y)=>o.peek(y.length===1?y[0]:y,"i32"),o.poke32=(y,x)=>o.poke(y,x,"i32"),o.peek64=(...y)=>o.peek(y.length===1?y[0]:y,"i64"),o.poke64=(y,x)=>o.poke(y,x,"i64"),o.peek32f=(...y)=>o.peek(y.length===1?y[0]:y,"f32"),o.poke32f=(y,x)=>o.poke(y,x,"f32"),o.peek64f=(...y)=>o.peek(y.length===1?y[0]:y,"f64"),o.poke64f=(y,x)=>o.poke(y,x,"f64"),o.getMemValue=o.peek,o.getPtrValue=o.peekPtr,o.setMemValue=o.poke,o.setPtrValue=o.pokePtr,o.isPtr32=y=>typeof y=="number"&&y===(y|0)&&y>=0,o.isPtr=o.isPtr32,o.cstrlen=function(y){if(!y||!o.isPtr(y))return null;const x=A().HEAP8U;let P=y;for(;x[P]!==0;++P);return P-y};const Y=typeof SharedArrayBuffer>"u"?function(){}:SharedArrayBuffer,ee=function(y,x,P){return f.utf8Decoder.decode(y.buffer instanceof Y?y.slice(x,P):y.subarray(x,P))};o.cstrToJs=function(y){const x=o.cstrlen(y);return x?ee(A().HEAP8U,y,y+x):x===null?x:""},o.jstrlen=function(y){if(typeof y!="string")return null;const x=y.length;let P=0;for(let le=0;le<x;++le){let X=y.charCodeAt(le);X>=55296&&X<=57343&&(X=65536+((X&1023)<<10)|y.charCodeAt(++le)&1023),X<=127?++P:X<=2047?P+=2:X<=65535?P+=3:P+=4}return P},o.jstrcpy=function(y,x,P=0,le=-1,X=!0){if((!x||!(x instanceof Int8Array)&&!(x instanceof Uint8Array))&&u("jstrcpy() target must be an Int8Array or Uint8Array."),le<0&&(le=x.length-P),!(le>0)||!(P>=0))return 0;let ce=0,d=y.length;const _=P,b=P+le-(X?1:0);for(;ce<d&&P<b;++ce){let S=y.charCodeAt(ce);if(S>=55296&&S<=57343&&(S=65536+((S&1023)<<10)|y.charCodeAt(++ce)&1023),S<=127){if(P>=b)break;x[P++]=S}else if(S<=2047){if(P+1>=b)break;x[P++]=192|S>>6,x[P++]=128|S&63}else if(S<=65535){if(P+2>=b)break;x[P++]=224|S>>12,x[P++]=128|S>>6&63,x[P++]=128|S&63}else{if(P+3>=b)break;x[P++]=240|S>>18,x[P++]=128|S>>12&63,x[P++]=128|S>>6&63,x[P++]=128|S&63}}return X&&(x[P++]=0),P-_},o.cstrncpy=function(y,x,P){if((!y||!x)&&u("cstrncpy() does not accept NULL strings."),P<0)P=o.cstrlen(strPtr)+1;else if(!(P>0))return 0;const le=o.heap8u();let X=0,ce;for(;X<P&&(ce=le[x+X]);++X)le[y+X]=ce;return X<P&&(le[y+X++]=0),X},o.jstrToUintArray=(y,x=!1)=>f.utf8Encoder.encode(x?y+"\0":y);const fe=(y,x)=>{(!(y.alloc instanceof Function)||!(y.dealloc instanceof Function))&&u("Object is missing alloc() and/or dealloc() function(s)","required by",x+"().")},_e=function(y,x,P,le){if(fe(o,le),typeof y!="string")return null;{const X=f.utf8Encoder.encode(y),ce=P(X.length+1),d=A().HEAP8U;return d.set(X,ce),d[ce+X.length]=0,x?[ce,X.length]:ce}};o.allocCString=(y,x=!1)=>_e(y,x,o.alloc,"allocCString()"),o.scopedAllocPush=function(){fe(o,"scopedAllocPush");const y=[];return f.scopedAlloc.push(y),y},o.scopedAllocPop=function(y){fe(o,"scopedAllocPop");const x=arguments.length?f.scopedAlloc.indexOf(y):f.scopedAlloc.length-1;x<0&&u("Invalid state object for scopedAllocPop()."),arguments.length===0&&(y=f.scopedAlloc[x]),f.scopedAlloc.splice(x,1);for(let P;P=y.pop();)o.functionEntry(P)?o.uninstallFunction(P):o.dealloc(P)},o.scopedAlloc=function(y){f.scopedAlloc.length||u("No scopedAllocPush() scope is active.");const x=o.alloc(y);return f.scopedAlloc[f.scopedAlloc.length-1].push(x),x},Object.defineProperty(o.scopedAlloc,"level",{configurable:!1,enumerable:!1,get:()=>f.scopedAlloc.length,set:()=>u("The 'active' property is read-only.")}),o.scopedAllocCString=(y,x=!1)=>_e(y,x,o.scopedAlloc,"scopedAllocCString()");const H=function(y,x){const P=o[y?"scopedAlloc":"alloc"]((x.length+1)*o.ptrSizeof);let le=0;return x.forEach(X=>{o.pokePtr(P+o.ptrSizeof*le++,o[y?"scopedAllocCString":"allocCString"](""+X))}),o.pokePtr(P+o.ptrSizeof*le,0),P};o.scopedAllocMainArgv=y=>H(!0,y),o.allocMainArgv=y=>H(!1,y),o.cArgvToJs=(y,x)=>{const P=[];for(let le=0;le<y;++le){const X=o.peekPtr(x+o.ptrSizeof*le);P.push(X?o.cstrToJs(X):null)}return P},o.scopedAllocCall=function(y){o.scopedAllocPush();try{return y()}finally{o.scopedAllocPop()}};const B=function(y,x,P){fe(o,P);const le=x?"i64":l;let X=o[P](y*(x?8:c));if(o.poke(X,0,le),y===1)return X;const ce=[X];for(let d=1;d<y;++d)X+=x?8:c,ce[d]=X,o.poke(X,0,le);return ce};o.allocPtr=(y=1,x=!0)=>B(y,x,"alloc"),o.scopedAllocPtr=(y=1,x=!0)=>B(y,x,"scopedAlloc"),o.xGet=function(y){return o.exports[y]||u("Cannot find exported symbol:",y)};const ae=(y,x)=>u(y+"() requires",x,"argument(s).");o.xCall=function(y,...x){const P=y instanceof Function?y:o.xGet(y);return P instanceof Function||u("Exported symbol",y,"is not a function."),P.length!==x.length&&ae(P===y?P.name:y,P.length),arguments.length===2&&Array.isArray(arguments[1])?P.apply(null,arguments[1]):P.apply(null,x)},f.xWrap=Object.create(null),f.xWrap.convert=Object.create(null),f.xWrap.convert.arg=new Map,f.xWrap.convert.result=new Map;const E=f.xWrap.convert.arg,T=f.xWrap.convert.result;o.bigIntEnabled&&E.set("i64",y=>BigInt(y));const F=l==="i32"?y=>y|0:y=>BigInt(y)|BigInt(0);E.set("i32",F).set("i16",y=>(y|0)&65535).set("i8",y=>(y|0)&255).set("f32",y=>Number(y).valueOf()).set("float",E.get("f32")).set("f64",E.get("f32")).set("double",E.get("f64")).set("int",E.get("i32")).set("null",y=>y).set(null,E.get("null")).set("**",F).set("*",F),T.set("*",F).set("pointer",F).set("number",y=>Number(y)).set("void",y=>{}).set("null",y=>y).set(null,T.get("null"));{const y=["i8","i16","i32","int","f32","float","f64","double"];o.bigIntEnabled&&y.push("i64");const x=E.get(l);for(const P of y)E.set(P+"*",x),T.set(P+"*",x),T.set(P,E.get(P)||u("Missing arg converter:",P))}const J=function(y){return typeof y=="string"?o.scopedAllocCString(y):y?F(y):null};E.set("string",J).set("utf8",J).set("pointer",J),T.set("string",y=>o.cstrToJs(y)).set("utf8",T.get("string")).set("string:dealloc",y=>{try{return y?o.cstrToJs(y):null}finally{o.dealloc(y)}}).set("utf8:dealloc",T.get("string:dealloc")).set("json",y=>JSON.parse(o.cstrToJs(y))).set("json:dealloc",y=>{try{return y?JSON.parse(o.cstrToJs(y)):null}finally{o.dealloc(y)}});const K=class{constructor(y){this.name=y.name||"unnamed adapter"}convertArg(y,x,P){u("AbstractArgAdapter must be subclassed.")}};E.FuncPtrAdapter=class $r extends K{constructor(x){super(x),E.FuncPtrAdapter.warnOnUse&&console.warn("xArg.FuncPtrAdapter is an internal-only API","and is not intended to be invoked from","client-level code. Invoked with:",x),this.name=x.name||"unnamed",this.signature=x.signature,x.contextKey instanceof Function&&(this.contextKey=x.contextKey,x.bindScope||(x.bindScope="context")),this.bindScope=x.bindScope||u("FuncPtrAdapter options requires a bindScope (explicit or implied)."),$r.bindScopes.indexOf(x.bindScope)<0&&u("Invalid options.bindScope ("+x.bindMod+") for FuncPtrAdapter. Expecting one of: ("+$r.bindScopes.join(", ")+")"),this.isTransient=this.bindScope==="transient",this.isContext=this.bindScope==="context",this.isPermanent=this.bindScope==="permanent",this.singleton=this.bindScope==="singleton"?[]:void 0,this.callProxy=x.callProxy instanceof Function?x.callProxy:void 0}contextKey(x,P){return this}contextMap(x){const P=this.__cmap||(this.__cmap=new Map);let le=P.get(x);return le===void 0&&P.set(x,le=[]),le}convertArg(x,P,le){let X=this.singleton;if(!X&&this.isContext&&(X=this.contextMap(this.contextKey(P,le))),X&&X[0]===x)return X[1];if(x instanceof Function){this.callProxy&&(x=this.callProxy(x));const ce=O(x,this.signature,this.isTransient);if($r.debugFuncInstall&&$r.debugOut("FuncPtrAdapter installed",this,this.contextKey(P,le),"@"+ce,x),X){if(X[1]){$r.debugFuncInstall&&$r.debugOut("FuncPtrAdapter uninstalling",this,this.contextKey(P,le),"@"+X[1],x);try{f.scopedAlloc[f.scopedAlloc.length-1].push(X[1])}catch{}}X[0]=x,X[1]=ce}return ce}else if(o.isPtr(x)||x===null||x===void 0){if(X&&X[1]&&X[1]!==x){$r.debugFuncInstall&&$r.debugOut("FuncPtrAdapter uninstalling",this,this.contextKey(P,le),"@"+X[1],x);try{f.scopedAlloc[f.scopedAlloc.length-1].push(X[1])}catch{}X[0]=X[1]=x|0}return x||0}else throw new TypeError("Invalid FuncPtrAdapter argument type. Expecting a function pointer or a "+(this.name?this.name+" ":"")+"function matching signature "+this.signature+".")}},E.FuncPtrAdapter.warnOnUse=!1,E.FuncPtrAdapter.debugFuncInstall=!1,E.FuncPtrAdapter.debugOut=console.debug.bind(console),E.FuncPtrAdapter.bindScopes=["transient","context","singleton","permanent"];const W=y=>E.get(y)||u("Argument adapter not found:",y),te=y=>T.get(y)||u("Result adapter not found:",y);f.xWrap.convertArg=(y,...x)=>W(y)(...x),f.xWrap.convertArgNoCheck=(y,...x)=>E.get(y)(...x),f.xWrap.convertResult=(y,x)=>y===null?x:y?te(y)(x):void 0,f.xWrap.convertResultNoCheck=(y,x)=>y===null?x:y?T.get(y)(x):void 0,o.xWrap=function(y,x,...P){arguments.length===3&&Array.isArray(arguments[2])&&(P=arguments[2]),o.isPtr(y)&&(y=o.functionEntry(y)||u("Function pointer not found in WASM function table."));const le=y instanceof Function,X=le?y:o.xGet(y);if(le&&(y=X.name||"unnamed function"),P.length!==X.length&&ae(y,X.length),x===null&&X.length===0)return X;x!=null&&te(x);for(const d of P)d instanceof K?E.set(d,(..._)=>d.convertArg(..._)):W(d);const ce=f.xWrap;return X.length===0?(...d)=>d.length?ae(y,X.length):ce.convertResult(x,X.call(null)):function(...d){d.length!==X.length&&ae(y,X.length);const _=o.scopedAllocPush();try{let b=0;for(;b<d.length;++b)d[b]=ce.convertArgNoCheck(P[b],d[b],d,b);return ce.convertResultNoCheck(x,X.apply(null,d))}finally{o.scopedAllocPop(_)}}};const xe=function(y,x,P,le,X,ce){if(typeof P=="string"){if(x===1)return ce.get(P);if(x===2){if(le)le instanceof Function||u(X,"requires a function argument.");else return ce.delete(P),y;return ce.set(P,le),y}}u("Invalid arguments to",X)};return o.xWrap.resultAdapter=function y(x,P){return xe(y,arguments.length,x,P,"resultAdapter()",T)},o.xWrap.argAdapter=function y(x,P){return xe(y,arguments.length,x,P,"argAdapter()",E)},o.xWrap.FuncPtrAdapter=E.FuncPtrAdapter,o.xCallWrapped=function(y,x,P,...le){return Array.isArray(arguments[3])&&(le=arguments[3]),o.xWrap(y,x,P||[]).apply(null,le||[])},o.xWrap.testConvertArg=f.xWrap.convertArg,o.xWrap.testConvertResult=f.xWrap.convertResult,o},globalThis.WhWasmUtilInstaller.yawl=(function(o){const u=()=>fetch(o.uri,{credentials:"same-origin"}),l=this,c=function(A){if(o.wasmUtilTarget){const O=(...ee)=>{throw new Error(ee.join(" "))},Y=o.wasmUtilTarget;if(Y.module=A.module,Y.instance=A.instance,Y.instance.exports.memory||(Y.memory=o.imports&&o.imports.env&&o.imports.env.memory||O("Missing 'memory' object!")),!Y.alloc&&A.instance.exports.malloc){const ee=A.instance.exports;Y.alloc=function(fe){return ee.malloc(fe)||O("Allocation of",fe,"bytes failed.")},Y.dealloc=function(fe){ee.free(fe)}}l(Y)}return o.onload&&o.onload(A,o),A};return WebAssembly.instantiateStreaming?function(){return WebAssembly.instantiateStreaming(u(),o.imports||{}).then(c)}:function(){return u().then(O=>O.arrayBuffer()).then(O=>WebAssembly.instantiate(O,o.imports||{})).then(c)}}).bind(globalThis.WhWasmUtilInstaller),globalThis.Jaccwabyt=function o(u){const l=(...Q)=>{throw new Error(Q.join(" "))};!(u.heap instanceof WebAssembly.Memory)&&!(u.heap instanceof Function)&&l("config.heap must be WebAssembly.Memory instance or a function."),["alloc","dealloc"].forEach(function(Q){u[Q]instanceof Function||l("Config option '"+Q+"' must be a function.")});const c=o,f=u.heap instanceof Function?u.heap:()=>new Uint8Array(u.heap.buffer),A=u.alloc,O=u.dealloc,Y=u.log||console.log.bind(console),ee=u.memberPrefix||"",fe=u.memberSuffix||"",_e=u.bigIntEnabled===void 0?!!globalThis.BigInt64Array:!!u.bigIntEnabled,H=globalThis.BigInt,B=globalThis.BigInt64Array,ae=u.ptrSizeof||4,E=u.ptrIR||"i32";c.debugFlags||(c.__makeDebugFlags=function(Q=null){Q&&Q.__flags&&(Q=Q.__flags);const ye=function ve(Ae){return arguments.length===0?ve.__flags:(Ae<0?(delete ve.__flags.getter,delete ve.__flags.setter,delete ve.__flags.alloc,delete ve.__flags.dealloc):(ve.__flags.getter=(1&Ae)!==0,ve.__flags.setter=(2&Ae)!==0,ve.__flags.alloc=(4&Ae)!==0,ve.__flags.dealloc=(8&Ae)!==0),ve._flags)};return Object.defineProperty(ye,"__flags",{iterable:!1,writable:!1,value:Object.create(Q)}),Q||ye(0),ye},c.debugFlags=c.__makeDebugFlags());const T=(function(){const Q=new ArrayBuffer(2);return new DataView(Q).setInt16(0,256,!0),new Int16Array(Q)[0]===256})(),F=Q=>Q[1]==="(",J=Q=>Q==="P",K=Q=>F(Q)?"p":Q[0],W=function(Q){switch(K(Q)){case"c":case"C":return"i8";case"i":return"i32";case"p":case"P":case"s":return E;case"j":return"i64";case"f":return"float";case"d":return"double"}l("Unhandled signature IR:",Q)},te=B?()=>!0:()=>l("BigInt64Array is not available."),xe=function(Q){switch(K(Q)){case"p":case"P":case"s":{switch(ae){case 4:return"getInt32";case 8:return te()&&"getBigInt64"}break}case"i":return"getInt32";case"c":return"getInt8";case"C":return"getUint8";case"j":return te()&&"getBigInt64";case"f":return"getFloat32";case"d":return"getFloat64"}l("Unhandled DataView getter for signature:",Q)},y=function(Q){switch(K(Q)){case"p":case"P":case"s":{switch(ae){case 4:return"setInt32";case 8:return te()&&"setBigInt64"}break}case"i":return"setInt32";case"c":return"setInt8";case"C":return"setUint8";case"j":return te()&&"setBigInt64";case"f":return"setFloat32";case"d":return"setFloat64"}l("Unhandled DataView setter for signature:",Q)},x=function(Q){switch(K(Q)){case"i":case"f":case"c":case"C":case"d":return Number;case"j":return te()&&H;case"p":case"P":case"s":switch(ae){case 4:return Number;case 8:return te()&&H}break}l("Unhandled DataView set wrapper for signature:",Q)},P=(Q,ye)=>Q+"::"+ye,le=function(Q,ye){return()=>l(P(Q,ye),"is read-only.")},X=new WeakMap,ce="(pointer-is-external)",d=function(Q,ye,ve){if(ve||(ve=X.get(ye)),ve){if(X.delete(ye),Array.isArray(ye.ondispose)){let Ae;for(;Ae=ye.ondispose.shift();)try{Ae instanceof Function?Ae.call(ye):Ae instanceof Me?Ae.dispose():typeof Ae=="number"&&O(Ae)}catch(tt){console.warn("ondispose() for",Q.structName,"@",ve,"threw. NOT propagating it.",tt)}}else if(ye.ondispose instanceof Function)try{ye.ondispose()}catch(Ae){console.warn("ondispose() for",Q.structName,"@",ve,"threw. NOT propagating it.",Ae)}delete ye.ondispose,Q.debugFlags.__flags.dealloc&&Y("debug.dealloc:",ye[ce]?"EXTERNAL":"",Q.structName,"instance:",Q.structInfo.sizeof,"bytes @"+ve),ye[ce]||O(ve)}},_=Q=>({configurable:!1,writable:!1,iterable:!1,value:Q}),b=function(Q,ye,ve){let Ae=!ve;ve?Object.defineProperty(ye,ce,_(ve)):(ve=A(Q.structInfo.sizeof),ve||l("Allocation of",Q.structName,"structure failed."));try{Q.debugFlags.__flags.alloc&&Y("debug.alloc:",Ae?"":"EXTERNAL",Q.structName,"instance:",Q.structInfo.sizeof,"bytes @"+ve),Ae&&f().fill(0,ve,ve+Q.structInfo.sizeof),X.set(ye,ve)}catch(tt){throw d(Q,ye,ve),tt}},S=function(){const Q=this.pointer;return Q?new Uint8Array(f().slice(Q,Q+this.structInfo.sizeof)):null},be=_(Q=>ee+Q+fe),Fe=function(Q,ye,ve=!0){let Ae=Q.members[ye];if(!Ae&&(ee||fe)){for(const tt of Object.values(Q.members))if(tt.key===ye){Ae=tt;break}!Ae&&ve&&l(P(Q.name,ye),"is not a mapped struct member.")}return Ae},He=function Q(ye,ve,Ae=!1){Q._||(Q._=yt=>yt.replace(/[^vipPsjrdcC]/g,"").replace(/[pPscC]/g,"i"));const tt=Fe(ye.structInfo,ve,!0);return Ae?Q._(tt.signature):tt.signature},Ve={configurable:!1,enumerable:!1,get:function(){return X.get(this)},set:()=>l("Cannot assign the 'pointer' property of a struct.")},de=_(function(){const Q=[];for(const ye of Object.keys(this.structInfo.members))Q.push(this.memberKey(ye));return Q}),I=new TextDecoder("utf-8"),$=new TextEncoder,re=typeof SharedArrayBuffer>"u"?function(){}:SharedArrayBuffer,me=function(Q,ye,ve){return I.decode(Q.buffer instanceof re?Q.slice(ye,ve):Q.subarray(ye,ve))},We=function(Q,ye,ve=!1){const Ae=Fe(Q.structInfo,ye,ve);return Ae&&Ae.signature.length===1&&Ae.signature[0]==="s"?Ae:!1},L=function(Q){Q.signature!=="s"&&l("Invalid member type signature for C-string value:",JSON.stringify(Q))},G=function(ye,ve){const Ae=Fe(ye.structInfo,ve,!0);L(Ae);const tt=ye[Ae.key];if(!tt)return null;let yt=tt;const ft=f();for(;ft[yt]!==0;++yt);return tt===yt?"":me(ft,tt,yt)},ie=function(Q,...ye){Q.ondispose?Array.isArray(Q.ondispose)||(Q.ondispose=[Q.ondispose]):Q.ondispose=[],Q.ondispose.push(...ye)},qe=function(Q){const ye=$.encode(Q),ve=A(ye.length+1);ve||l("Allocation error while duplicating string:",Q);const Ae=f();return Ae.set(ye,ve),Ae[ve+ye.length]=0,ve},Ne=function(Q,ye,ve){const Ae=Fe(Q.structInfo,ye,!0);L(Ae);const tt=qe(ve);return Q[Ae.key]=tt,ie(Q,tt),Q},Me=function(ye,ve){arguments[2]!==_&&l("Do not call the StructType constructor","from client-level code."),Object.defineProperties(this,{structName:_(ye),structInfo:_(ve)})};Me.prototype=Object.create(null,{dispose:_(function(){d(this.constructor,this)}),lookupMember:_(function(Q,ye=!0){return Fe(this.structInfo,Q,ye)}),memberToJsString:_(function(Q){return G(this,Q)}),memberIsString:_(function(Q,ye=!0){return We(this,Q,ye)}),memberKey:be,memberKeys:de,memberSignature:_(function(Q,ye=!1){return He(this,Q,ye)}),memoryDump:_(S),pointer:Ve,setMemberCString:_(function(Q,ye){return Ne(this,Q,ye)})}),Object.assign(Me.prototype,{addOnDispose:function(...Q){return ie(this,...Q),this}}),Object.defineProperties(Me,{allocCString:_(qe),isA:_(Q=>Q instanceof Me),hasExternalPointer:_(Q=>Q instanceof Me&&!!Q[ce]),memberKey:be});const Ge=Q=>Number.isFinite(Q)||Q instanceof(H||Number),Le=function Q(ye,ve,Ae){if(!Q._){Q._={getters:{},setters:{},sw:{}};const Vt=["i","c","C","p","P","s","f","d","v()"];_e&&Vt.push("j"),Vt.forEach(function(Er){Q._.getters[Er]=xe(Er),Q._.setters[Er]=y(Er),Q._.sw[Er]=x(Er)});const o0=/^[ipPsjfdcC]$/,a0=/^[vipPsjfdcC]\([ipPsjfdcC]*\)$/;Q.sigCheck=function(Er,l0,Zu,Ia){Object.prototype.hasOwnProperty.call(Er,Zu)&&l(Er.structName,"already has a property named",Zu+"."),o0.test(Ia)||a0.test(Ia)||l("Malformed signature for",P(Er.structName,l0)+":",Ia)}}const tt=ye.memberKey(ve);Q.sigCheck(ye.prototype,ve,tt,Ae.signature),Ae.key=tt,Ae.name=ve;const yt=K(Ae.signature),ft=P(ye.prototype.structName,tt),pt=ye.prototype.debugFlags.__flags,hi=Object.create(null);hi.configurable=!1,hi.enumerable=!1,hi.get=function(){pt.getter&&Y("debug.getter:",Q._.getters[yt],"for",W(yt),ft,"@",this.pointer,"+",Ae.offset,"sz",Ae.sizeof);let Vt=new DataView(f().buffer,this.pointer+Ae.offset,Ae.sizeof)[Q._.getters[yt]](0,T);return pt.getter&&Y("debug.getter:",ft,"result =",Vt),Vt},Ae.readOnly?hi.set=le(ye.prototype.structName,tt):hi.set=function(Vt){if(pt.setter&&Y("debug.setter:",Q._.setters[yt],"for",W(yt),ft,"@",this.pointer,"+",Ae.offset,"sz",Ae.sizeof,Vt),this.pointer||l("Cannot set struct property on disposed instance."),Vt===null)Vt=0;else for(;!Ge(Vt);){if(J(Ae.signature)&&Vt instanceof Me){Vt=Vt.pointer||0,pt.setter&&Y("debug.setter:",ft,"resolved to",Vt);break}l("Invalid value for pointer-type",ft+".")}new DataView(f().buffer,this.pointer+Ae.offset,Ae.sizeof)[Q._.setters[yt]](0,Q._.sw[yt](Vt),T)},Object.defineProperty(ye.prototype,tt,hi)},Pt=function Q(ye,ve){arguments.length===1?(ve=ye,ye=ve.name):ve.name||(ve.name=ye),ye||l("Struct name is required.");let Ae=!1;Object.keys(ve.members).forEach(ft=>{const pt=ve.members[ft];pt.sizeof?pt.sizeof===1?pt.signature==="c"||pt.signature==="C"||l("Unexpected sizeof==1 member",P(ve.name,ft),"with signature",pt.signature):(pt.sizeof%4!==0&&(console.warn("Invalid struct member description =",pt,"from",ve),l(ye,"member",ft,"sizeof is not aligned. sizeof="+pt.sizeof)),pt.offset%4!==0&&(console.warn("Invalid struct member description =",pt,"from",ve),l(ye,"member",ft,"offset is not aligned. offset="+pt.offset))):l(ye,"member",ft,"is missing sizeof."),(!Ae||Ae.offset<pt.offset)&&(Ae=pt)}),Ae?ve.sizeof<Ae.offset+Ae.sizeof&&l("Invalid struct config:",ye,"max member offset ("+Ae.offset+") ","extends past end of struct (sizeof="+ve.sizeof+")."):l("No member property descriptions found.");const tt=_(c.__makeDebugFlags(Q.debugFlags)),yt=function ft(pt){this instanceof ft?arguments.length?((pt!==(pt|0)||pt<=0)&&l("Invalid pointer value for",ye,"constructor."),b(ft,this,pt)):b(ft,this):l("The",ye,"constructor may only be called via 'new'.")};return Object.defineProperties(yt,{debugFlags:tt,isA:_(ft=>ft instanceof yt),memberKey:be,memberKeys:de,methodInfoForKey:_(function(ft){}),structInfo:_(ve),structName:_(ye)}),yt.prototype=new Me(ye,ve,_),Object.defineProperties(yt.prototype,{debugFlags:tt,constructor:_(yt)}),Object.keys(ve.members).forEach(ft=>Le(yt,ft,ve.members[ft])),yt};return Pt.StructType=Me,Pt.config=u,Pt.allocCString=qe,Pt.debugFlags||(Pt.debugFlags=c.__makeDebugFlags(c.debugFlags)),Pt},globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=(...E)=>{throw new Error(E.join(" "))};o.SQLite3Error.toss;const l=o.capi,c=o.wasm,f=o.util;if(globalThis.WhWasmUtilInstaller(c),delete globalThis.WhWasmUtilInstaller,c.bindingSignatures=[["sqlite3_aggregate_context","void*","sqlite3_context*","int"],["sqlite3_bind_double","int","sqlite3_stmt*","int","f64"],["sqlite3_bind_int","int","sqlite3_stmt*","int","int"],["sqlite3_bind_null",void 0,"sqlite3_stmt*","int"],["sqlite3_bind_parameter_count","int","sqlite3_stmt*"],["sqlite3_bind_parameter_index","int","sqlite3_stmt*","string"],["sqlite3_bind_parameter_name","string","sqlite3_stmt*","int"],["sqlite3_bind_pointer","int","sqlite3_stmt*","int","*","string:static","*"],["sqlite3_busy_handler","int",["sqlite3*",new c.xWrap.FuncPtrAdapter({signature:"i(pi)",contextKey:(E,T)=>E[0]}),"*"]],["sqlite3_busy_timeout","int","sqlite3*","int"],["sqlite3_changes","int","sqlite3*"],["sqlite3_clear_bindings","int","sqlite3_stmt*"],["sqlite3_collation_needed","int","sqlite3*","*","*"],["sqlite3_column_blob","*","sqlite3_stmt*","int"],["sqlite3_column_bytes","int","sqlite3_stmt*","int"],["sqlite3_column_count","int","sqlite3_stmt*"],["sqlite3_column_decltype","string","sqlite3_stmt*","int"],["sqlite3_column_double","f64","sqlite3_stmt*","int"],["sqlite3_column_int","int","sqlite3_stmt*","int"],["sqlite3_column_name","string","sqlite3_stmt*","int"],["sqlite3_column_text","string","sqlite3_stmt*","int"],["sqlite3_column_type","int","sqlite3_stmt*","int"],["sqlite3_column_value","sqlite3_value*","sqlite3_stmt*","int"],["sqlite3_commit_hook","void*",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"sqlite3_commit_hook",signature:"i(p)",contextKey:E=>E[0]}),"*"]],["sqlite3_compileoption_get","string","int"],["sqlite3_compileoption_used","int","string"],["sqlite3_complete","int","string:flexible"],["sqlite3_context_db_handle","sqlite3*","sqlite3_context*"],["sqlite3_data_count","int","sqlite3_stmt*"],["sqlite3_db_filename","string","sqlite3*","string"],["sqlite3_db_handle","sqlite3*","sqlite3_stmt*"],["sqlite3_db_name","string","sqlite3*","int"],["sqlite3_db_readonly","int","sqlite3*","string"],["sqlite3_db_status","int","sqlite3*","int","*","*","int"],["sqlite3_errcode","int","sqlite3*"],["sqlite3_errmsg","string","sqlite3*"],["sqlite3_error_offset","int","sqlite3*"],["sqlite3_errstr","string","int"],["sqlite3_exec","int",["sqlite3*","string:flexible",new c.xWrap.FuncPtrAdapter({signature:"i(pipp)",bindScope:"transient",callProxy:E=>{let T;return(F,J,K,W)=>{try{const te=c.cArgvToJs(J,K);return T||(T=c.cArgvToJs(J,W)),E(te,T)|0}catch(te){return te.resultCode||l.SQLITE_ERROR}}}}),"*","**"]],["sqlite3_expanded_sql","string","sqlite3_stmt*"],["sqlite3_extended_errcode","int","sqlite3*"],["sqlite3_extended_result_codes","int","sqlite3*","int"],["sqlite3_file_control","int","sqlite3*","string","int","*"],["sqlite3_finalize","int","sqlite3_stmt*"],["sqlite3_free",void 0,"*"],["sqlite3_get_autocommit","int","sqlite3*"],["sqlite3_get_auxdata","*","sqlite3_context*","int"],["sqlite3_initialize",void 0],["sqlite3_interrupt",void 0,"sqlite3*"],["sqlite3_is_interrupted","int","sqlite3*"],["sqlite3_keyword_count","int"],["sqlite3_keyword_name","int",["int","**","*"]],["sqlite3_keyword_check","int",["string","int"]],["sqlite3_libversion","string"],["sqlite3_libversion_number","int"],["sqlite3_limit","int",["sqlite3*","int","int"]],["sqlite3_malloc","*","int"],["sqlite3_open","int","string","*"],["sqlite3_open_v2","int","string","*","int","string"],["sqlite3_realloc","*","*","int"],["sqlite3_reset","int","sqlite3_stmt*"],["sqlite3_result_blob",void 0,"sqlite3_context*","*","int","*"],["sqlite3_result_double",void 0,"sqlite3_context*","f64"],["sqlite3_result_error",void 0,"sqlite3_context*","string","int"],["sqlite3_result_error_code",void 0,"sqlite3_context*","int"],["sqlite3_result_error_nomem",void 0,"sqlite3_context*"],["sqlite3_result_error_toobig",void 0,"sqlite3_context*"],["sqlite3_result_int",void 0,"sqlite3_context*","int"],["sqlite3_result_null",void 0,"sqlite3_context*"],["sqlite3_result_pointer",void 0,"sqlite3_context*","*","string:static","*"],["sqlite3_result_subtype",void 0,"sqlite3_value*","int"],["sqlite3_result_text",void 0,"sqlite3_context*","string","int","*"],["sqlite3_result_zeroblob",void 0,"sqlite3_context*","int"],["sqlite3_rollback_hook","void*",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"sqlite3_rollback_hook",signature:"v(p)",contextKey:E=>E[0]}),"*"]],["sqlite3_set_auxdata",void 0,["sqlite3_context*","int","*","*"]],["sqlite3_shutdown",void 0],["sqlite3_sourceid","string"],["sqlite3_sql","string","sqlite3_stmt*"],["sqlite3_status","int","int","*","*","int"],["sqlite3_step","int","sqlite3_stmt*"],["sqlite3_stmt_busy","int","sqlite3_stmt*"],["sqlite3_stmt_readonly","int","sqlite3_stmt*"],["sqlite3_stmt_status","int","sqlite3_stmt*","int","int"],["sqlite3_strglob","int","string","string"],["sqlite3_stricmp","int","string","string"],["sqlite3_strlike","int","string","string","int"],["sqlite3_strnicmp","int","string","string","int"],["sqlite3_table_column_metadata","int","sqlite3*","string","string","string","**","**","*","*","*"],["sqlite3_total_changes","int","sqlite3*"],["sqlite3_trace_v2","int",["sqlite3*","int",new c.xWrap.FuncPtrAdapter({name:"sqlite3_trace_v2::callback",signature:"i(ippp)",contextKey:(E,T)=>E[0]}),"*"]],["sqlite3_txn_state","int",["sqlite3*","string"]],["sqlite3_uri_boolean","int","sqlite3_filename","string","int"],["sqlite3_uri_key","string","sqlite3_filename","int"],["sqlite3_uri_parameter","string","sqlite3_filename","string"],["sqlite3_user_data","void*","sqlite3_context*"],["sqlite3_value_blob","*","sqlite3_value*"],["sqlite3_value_bytes","int","sqlite3_value*"],["sqlite3_value_double","f64","sqlite3_value*"],["sqlite3_value_dup","sqlite3_value*","sqlite3_value*"],["sqlite3_value_free",void 0,"sqlite3_value*"],["sqlite3_value_frombind","int","sqlite3_value*"],["sqlite3_value_int","int","sqlite3_value*"],["sqlite3_value_nochange","int","sqlite3_value*"],["sqlite3_value_numeric_type","int","sqlite3_value*"],["sqlite3_value_pointer","*","sqlite3_value*","string:static"],["sqlite3_value_subtype","int","sqlite3_value*"],["sqlite3_value_text","string","sqlite3_value*"],["sqlite3_value_type","int","sqlite3_value*"],["sqlite3_vfs_find","*","string"],["sqlite3_vfs_register","int","sqlite3_vfs*","int"],["sqlite3_vfs_unregister","int","sqlite3_vfs*"]],c.exports.sqlite3_progress_handler&&c.bindingSignatures.push(["sqlite3_progress_handler",void 0,["sqlite3*","int",new c.xWrap.FuncPtrAdapter({name:"xProgressHandler",signature:"i(p)",bindScope:"context",contextKey:(E,T)=>E[0]}),"*"]]),c.exports.sqlite3_stmt_explain&&c.bindingSignatures.push(["sqlite3_stmt_explain","int","sqlite3_stmt*","int"],["sqlite3_stmt_isexplain","int","sqlite3_stmt*"]),c.exports.sqlite3_set_authorizer&&c.bindingSignatures.push(["sqlite3_set_authorizer","int",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"sqlite3_set_authorizer::xAuth",signature:"i(pissss)",contextKey:(E,T)=>E[0],callProxy:E=>(T,F,J,K,W,te)=>{try{return J=J&&c.cstrToJs(J),K=K&&c.cstrToJs(K),W=W&&c.cstrToJs(W),te=te&&c.cstrToJs(te),E(T,F,J,K,W,te)||0}catch(xe){return xe.resultCode||l.SQLITE_ERROR}}}),"*"]]),c.exports.sqlite3_key_v2 instanceof Function&&c.bindingSignatures.push(["sqlite3_key","int","sqlite3*","string","int"],["sqlite3_key_v2","int","sqlite3*","string","*","int"],["sqlite3_rekey","int","sqlite3*","string","int"],["sqlite3_rekey_v2","int","sqlite3*","string","*","int"],["sqlite3_activate_see",void 0,"string"],["sqlite3mc_cipher_count","int"],["sqlite3mc_cipher_index","int","string"],["sqlite3mc_cipher_name","string","int"],["sqlite3mc_config","int","sqlite3*","string","int"],["sqlite3mc_config_cipher","int","sqlite3*","string","string","int"],["sqlite3mc_codec_data","string","sqlite3*","string","string"],["sqlite3mc_version","string"],["sqlite3mc_vfs_create","int","string","int"],["sqlite3mc_vfs_destroy",void 0,"string"],["sqlite3mc_vfs_shutdown",void 0]),c.bindingSignatures.int64=[["sqlite3_bind_int64","int",["sqlite3_stmt*","int","i64"]],["sqlite3_changes64","i64",["sqlite3*"]],["sqlite3_column_int64","i64",["sqlite3_stmt*","int"]],["sqlite3_deserialize","int","sqlite3*","string","*","i64","i64","int"],["sqlite3_last_insert_rowid","i64",["sqlite3*"]],["sqlite3_malloc64","*","i64"],["sqlite3_msize","i64","*"],["sqlite3_overload_function","int",["sqlite3*","string","int"]],["sqlite3_realloc64","*","*","i64"],["sqlite3_result_int64",void 0,"*","i64"],["sqlite3_result_zeroblob64","int","*","i64"],["sqlite3_serialize","*","sqlite3*","string","*","int"],["sqlite3_set_last_insert_rowid",void 0,["sqlite3*","i64"]],["sqlite3_status64","int","int","*","*","int"],["sqlite3_total_changes64","i64",["sqlite3*"]],["sqlite3_update_hook","*",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"sqlite3_update_hook",signature:"v(iippj)",contextKey:E=>E[0],callProxy:E=>(T,F,J,K,W)=>{E(T,F,c.cstrToJs(J),c.cstrToJs(K),W)}}),"*"]],["sqlite3_uri_int64","i64",["sqlite3_filename","string","i64"]],["sqlite3_value_int64","i64","sqlite3_value*"]],c.bigIntEnabled&&c.exports.sqlite3_declare_vtab&&c.bindingSignatures.int64.push(["sqlite3_create_module","int",["sqlite3*","string","sqlite3_module*","*"]],["sqlite3_create_module_v2","int",["sqlite3*","string","sqlite3_module*","*","*"]],["sqlite3_declare_vtab","int",["sqlite3*","string:flexible"]],["sqlite3_drop_modules","int",["sqlite3*","**"]],["sqlite3_vtab_collation","string","sqlite3_index_info*","int"],["sqlite3_vtab_distinct","int","sqlite3_index_info*"],["sqlite3_vtab_in","int","sqlite3_index_info*","int","int"],["sqlite3_vtab_in_first","int","sqlite3_value*","**"],["sqlite3_vtab_in_next","int","sqlite3_value*","**"],["sqlite3_vtab_nochange","int","sqlite3_context*"],["sqlite3_vtab_on_conflict","int","sqlite3*"],["sqlite3_vtab_rhs_value","int","sqlite3_index_info*","int","**"]),c.bigIntEnabled&&c.exports.sqlite3_preupdate_hook&&c.bindingSignatures.int64.push(["sqlite3_preupdate_blobwrite","int","sqlite3*"],["sqlite3_preupdate_count","int","sqlite3*"],["sqlite3_preupdate_depth","int","sqlite3*"],["sqlite3_preupdate_hook","*",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"sqlite3_preupdate_hook",signature:"v(ppippjj)",contextKey:E=>E[0],callProxy:E=>(T,F,J,K,W,te,xe)=>{E(T,F,J,c.cstrToJs(K),c.cstrToJs(W),te,xe)}}),"*"]],["sqlite3_preupdate_new","int",["sqlite3*","int","**"]],["sqlite3_preupdate_old","int",["sqlite3*","int","**"]]),c.bigIntEnabled&&c.exports.sqlite3changegroup_add&&c.exports.sqlite3session_create&&c.exports.sqlite3_preupdate_hook){const E={signature:"i(ps)",callProxy:T=>(F,J)=>{try{return T(F,c.cstrToJs(J))|0}catch(K){return K.resultCode||l.SQLITE_ERROR}}};c.bindingSignatures.int64.push(["sqlite3changegroup_add","int",["sqlite3_changegroup*","int","void*"]],["sqlite3changegroup_add_strm","int",["sqlite3_changegroup*",new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*"]],["sqlite3changegroup_delete",void 0,["sqlite3_changegroup*"]],["sqlite3changegroup_new","int",["**"]],["sqlite3changegroup_output","int",["sqlite3_changegroup*","int*","**"]],["sqlite3changegroup_output_strm","int",["sqlite3_changegroup*",new c.xWrap.FuncPtrAdapter({name:"xOutput",signature:"i(ppi)",bindScope:"transient"}),"void*"]],["sqlite3changeset_apply","int",["sqlite3*","int","void*",new c.xWrap.FuncPtrAdapter({name:"xFilter",bindScope:"transient",...E}),new c.xWrap.FuncPtrAdapter({name:"xConflict",signature:"i(pip)",bindScope:"transient"}),"void*"]],["sqlite3changeset_apply_strm","int",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*",new c.xWrap.FuncPtrAdapter({name:"xFilter",bindScope:"transient",...E}),new c.xWrap.FuncPtrAdapter({name:"xConflict",signature:"i(pip)",bindScope:"transient"}),"void*"]],["sqlite3changeset_apply_v2","int",["sqlite3*","int","void*",new c.xWrap.FuncPtrAdapter({name:"xFilter",bindScope:"transient",...E}),new c.xWrap.FuncPtrAdapter({name:"xConflict",signature:"i(pip)",bindScope:"transient"}),"void*","**","int*","int"]],["sqlite3changeset_apply_v2_strm","int",["sqlite3*",new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*",new c.xWrap.FuncPtrAdapter({name:"xFilter",bindScope:"transient",...E}),new c.xWrap.FuncPtrAdapter({name:"xConflict",signature:"i(pip)",bindScope:"transient"}),"void*","**","int*","int"]],["sqlite3changeset_concat","int",["int","void*","int","void*","int*","**"]],["sqlite3changeset_concat_strm","int",[new c.xWrap.FuncPtrAdapter({name:"xInputA",signature:"i(ppp)",bindScope:"transient"}),"void*",new c.xWrap.FuncPtrAdapter({name:"xInputB",signature:"i(ppp)",bindScope:"transient"}),"void*",new c.xWrap.FuncPtrAdapter({name:"xOutput",signature:"i(ppi)",bindScope:"transient"}),"void*"]],["sqlite3changeset_conflict","int",["sqlite3_changeset_iter*","int","**"]],["sqlite3changeset_finalize","int",["sqlite3_changeset_iter*"]],["sqlite3changeset_fk_conflicts","int",["sqlite3_changeset_iter*","int*"]],["sqlite3changeset_invert","int",["int","void*","int*","**"]],["sqlite3changeset_invert_strm","int",[new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*",new c.xWrap.FuncPtrAdapter({name:"xOutput",signature:"i(ppi)",bindScope:"transient"}),"void*"]],["sqlite3changeset_new","int",["sqlite3_changeset_iter*","int","**"]],["sqlite3changeset_next","int",["sqlite3_changeset_iter*"]],["sqlite3changeset_old","int",["sqlite3_changeset_iter*","int","**"]],["sqlite3changeset_op","int",["sqlite3_changeset_iter*","**","int*","int*","int*"]],["sqlite3changeset_pk","int",["sqlite3_changeset_iter*","**","int*"]],["sqlite3changeset_start","int",["**","int","*"]],["sqlite3changeset_start_strm","int",["**",new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*"]],["sqlite3changeset_start_v2","int",["**","int","*","int"]],["sqlite3changeset_start_v2_strm","int",["**",new c.xWrap.FuncPtrAdapter({name:"xInput",signature:"i(ppp)",bindScope:"transient"}),"void*","int"]],["sqlite3session_attach","int",["sqlite3_session*","string"]],["sqlite3session_changeset","int",["sqlite3_session*","int*","**"]],["sqlite3session_changeset_size","i64",["sqlite3_session*"]],["sqlite3session_changeset_strm","int",["sqlite3_session*",new c.xWrap.FuncPtrAdapter({name:"xOutput",signature:"i(ppp)",bindScope:"transient"}),"void*"]],["sqlite3session_config","int",["int","void*"]],["sqlite3session_create","int",["sqlite3*","string","**"]],["sqlite3session_diff","int",["sqlite3_session*","string","string","**"]],["sqlite3session_enable","int",["sqlite3_session*","int"]],["sqlite3session_indirect","int",["sqlite3_session*","int"]],["sqlite3session_isempty","int",["sqlite3_session*"]],["sqlite3session_memory_used","i64",["sqlite3_session*"]],["sqlite3session_object_config","int",["sqlite3_session*","int","void*"]],["sqlite3session_patchset","int",["sqlite3_session*","*","**"]],["sqlite3session_patchset_strm","int",["sqlite3_session*",new c.xWrap.FuncPtrAdapter({name:"xOutput",signature:"i(ppp)",bindScope:"transient"}),"void*"]],["sqlite3session_table_filter",void 0,["sqlite3_session*",new c.xWrap.FuncPtrAdapter({name:"xFilter",...E,contextKey:(T,F)=>T[0]}),"*"]])}c.bindingSignatures.wasmInternal=[["sqlite3__wasm_db_reset","int","sqlite3*"],["sqlite3__wasm_db_vfs","sqlite3_vfs*","sqlite3*","string"],["sqlite3__wasm_vfs_create_file","int","sqlite3_vfs*","string","*","int"],["sqlite3__wasm_posix_create_file","int","string","*","int"],["sqlite3__wasm_vfs_unlink","int","sqlite3_vfs*","string"],["sqlite3__wasm_qfmt_token","string:dealloc","string","int"]],o.StructBinder=globalThis.Jaccwabyt({heap:c.heap8u,alloc:c.alloc,dealloc:c.dealloc,bigIntEnabled:c.bigIntEnabled,memberPrefix:"$"}),delete globalThis.Jaccwabyt;{const E=c.xWrap.argAdapter("string");c.xWrap.argAdapter("string:flexible",W=>E(f.flexibleString(W))),c.xWrap.argAdapter("string:static",(function(W){return c.isPtr(W)?W:(W=""+W,this[W]||(this[W]=c.allocCString(W)))}).bind(Object.create(null)));const T=c.xWrap.argAdapter("*"),F=function(){};c.xWrap.argAdapter("sqlite3_filename",T)("sqlite3_context*",T)("sqlite3_value*",T)("void*",T)("sqlite3_changegroup*",T)("sqlite3_changeset_iter*",T)("sqlite3_session*",T)("sqlite3_stmt*",W=>T(W instanceof(o?.oo1?.Stmt||F)?W.pointer:W))("sqlite3*",W=>T(W instanceof(o?.oo1?.DB||F)?W.pointer:W))("sqlite3_vfs*",W=>typeof W=="string"?l.sqlite3_vfs_find(W)||o.SQLite3Error.toss(l.SQLITE_NOTFOUND,"Unknown sqlite3_vfs name:",W):T(W instanceof(l.sqlite3_vfs||F)?W.pointer:W)),c.exports.sqlite3_declare_vtab&&c.xWrap.argAdapter("sqlite3_index_info*",W=>T(W instanceof(l.sqlite3_index_info||F)?W.pointer:W))("sqlite3_module*",W=>T(W instanceof(l.sqlite3_module||F)?W.pointer:W));const J=c.xWrap.resultAdapter("*");c.xWrap.resultAdapter("sqlite3*",J)("sqlite3_context*",J)("sqlite3_stmt*",J)("sqlite3_value*",J)("sqlite3_vfs*",J)("void*",J),c.exports.sqlite3_step.length===0&&(c.xWrap.doArgcCheck=!1,o.config.warn("Disabling sqlite3.wasm.xWrap.doArgcCheck due to environmental quirks."));for(const W of c.bindingSignatures)l[W[0]]=c.xWrap.apply(null,W);for(const W of c.bindingSignatures.wasmInternal)f[W[0]]=c.xWrap.apply(null,W);const K=function(W){return()=>u(W+"() is unavailable due to lack","of BigInt support in this build.")};for(const W of c.bindingSignatures.int64)l[W[0]]=c.bigIntEnabled?c.xWrap.apply(null,W):K(W[0]);if(delete c.bindingSignatures,c.exports.sqlite3__wasm_db_error){const W=c.xWrap("sqlite3__wasm_db_error","int","sqlite3*","int","string");f.sqlite3__wasm_db_error=function(te,xe,y){return xe instanceof o.WasmAllocError?(xe=l.SQLITE_NOMEM,y=0):xe instanceof Error&&(y=y||""+xe,xe=xe.resultCode||l.SQLITE_ERROR),te?W(te,xe,y):xe}}else f.sqlite3__wasm_db_error=function(W,te,xe){return console.warn("sqlite3__wasm_db_error() is not exported.",arguments),te}}{const E=c.xCall("sqlite3__wasm_enum_json");E||u("Maintenance required: increase sqlite3__wasm_enum_json()'s","static buffer size!"),c.ctype=JSON.parse(c.cstrToJs(E));const T=["access","authorizer","blobFinalizers","changeset","config","dataTypes","dbConfig","dbStatus","encodings","fcntl","flock","ioCap","limits","openFlags","prepareFlags","resultCodes","sqlite3Status","stmtStatus","syncFlags","trace","txnState","udfFlags","version"];c.bigIntEnabled&&T.push("serialize","session","vtab");for(const K of T)for(const W of Object.entries(c.ctype[K]))l[W[0]]=W[1];c.functionEntry(l.SQLITE_WASM_DEALLOC)||u("Internal error: cannot resolve exported function","entry SQLITE_WASM_DEALLOC (=="+l.SQLITE_WASM_DEALLOC+").");const F=Object.create(null);for(const K of["resultCodes"])for(const W of Object.entries(c.ctype[K]))F[W[1]]=W[0];l.sqlite3_js_rc_str=K=>F[K];const J=Object.assign(Object.create(null),{WasmTestStruct:!0,sqlite3_kvvfs_methods:!f.isUIThread(),sqlite3_index_info:!c.bigIntEnabled,sqlite3_index_constraint:!c.bigIntEnabled,sqlite3_index_orderby:!c.bigIntEnabled,sqlite3_index_constraint_usage:!c.bigIntEnabled});for(const K of c.ctype.structs)J[K.name]||(l[K.name]=o.StructBinder(K));if(l.sqlite3_index_info){for(const K of["sqlite3_index_constraint","sqlite3_index_orderby","sqlite3_index_constraint_usage"])l.sqlite3_index_info[K]=l[K],delete l[K];l.sqlite3_vtab_config=c.xWrap("sqlite3__wasm_vtab_config","int",["sqlite3*","int","int"])}}const A=(E,T,F)=>f.sqlite3__wasm_db_error(E,l.SQLITE_MISUSE,T+"() requires "+F+" argument"+(F===1?"":"s")+"."),O=E=>f.sqlite3__wasm_db_error(E,l.SQLITE_FORMAT,"SQLITE_UTF8 is the only supported encoding."),Y=E=>c.xWrap.argAdapter("sqlite3*")(E),ee=E=>c.isPtr(E)?c.cstrToJs(E):E,fe=(function(E,T){E=Y(E);let F=this.dbMap.get(E);if(T)!F&&T>0&&this.dbMap.set(E,F=Object.create(null));else return this.dbMap.delete(E),F;return F}).bind(Object.assign(Object.create(null),{dbMap:new Map}));fe.addCollation=function(E,T){const F=fe(E,1);F.collation||(F.collation=new Set),F.collation.add(ee(T).toLowerCase())},fe._addUDF=function(E,T,F,J){T=ee(T).toLowerCase();let K=J.get(T);K||J.set(T,K=new Set),K.add(F<0?-1:F)},fe.addFunction=function(E,T,F){const J=fe(E,1);J.udf||(J.udf=new Map),this._addUDF(E,T,F,J.udf)},c.exports.sqlite3_create_window_function&&(fe.addWindowFunc=function(E,T,F){const J=fe(E,1);J.wudf||(J.wudf=new Map),this._addUDF(E,T,F,J.wudf)}),fe.cleanup=function(E){E=Y(E);const T=[E];for(const K of["sqlite3_busy_handler","sqlite3_commit_hook","sqlite3_preupdate_hook","sqlite3_progress_handler","sqlite3_rollback_hook","sqlite3_set_authorizer","sqlite3_trace_v2","sqlite3_update_hook"]){const W=c.exports[K];if(W){T.length=W.length;try{l[K](...T)}catch(te){o.config.warn("close-time call of",K+"(",T,") threw:",te)}}}const F=fe(E,0);if(!F)return;if(F.collation){for(const K of F.collation)try{l.sqlite3_create_collation_v2(E,K,l.SQLITE_UTF8,0,0,0)}catch{}delete F.collation}let J;for(J=0;J<2;++J){const K=J?F.wudf:F.udf;if(!K)continue;const W=J?l.sqlite3_create_window_function:l.sqlite3_create_function_v2;for(const te of K){const xe=te[0],y=te[1],x=[E,xe,0,l.SQLITE_UTF8,0,0,0,0,0];J&&x.push(0);for(const P of y)try{x[2]=P,W.apply(null,x)}catch{}y.clear()}K.clear()}delete F.udf,delete F.wudf};{const E=c.xWrap("sqlite3_close_v2","int","sqlite3*");l.sqlite3_close_v2=function(T){if(arguments.length!==1)return A(T,"sqlite3_close_v2",1);if(T)try{fe.cleanup(T)}catch{}return E(T)}}if(l.sqlite3session_create){const E=c.xWrap("sqlite3session_delete",void 0,["sqlite3_session*"]);l.sqlite3session_delete=function(T){if(arguments.length!==1)return A(pDb,"sqlite3session_delete",1);T&&l.sqlite3session_table_filter(T,0,0),E(T)}}{const E=(F,J)=>"argv["+J+"]:"+F[0]+":"+c.cstrToJs(F[1]).toLowerCase(),T=c.xWrap("sqlite3_create_collation_v2","int",["sqlite3*","string","int","*",new c.xWrap.FuncPtrAdapter({name:"xCompare",signature:"i(pipip)",contextKey:E}),new c.xWrap.FuncPtrAdapter({name:"xDestroy",signature:"v(p)",contextKey:E})]);l.sqlite3_create_collation_v2=function(F,J,K,W,te,xe){if(arguments.length!==6)return A(F,"sqlite3_create_collation_v2",6);if((K&15)===0)K|=l.SQLITE_UTF8;else if(l.SQLITE_UTF8!==(K&15))return O(F);try{const y=T(F,J,K,W,te,xe);return y===0&&te instanceof Function&&fe.addCollation(F,J),y}catch(y){return f.sqlite3__wasm_db_error(F,y)}},l.sqlite3_create_collation=(F,J,K,W,te)=>arguments.length===5?l.sqlite3_create_collation_v2(F,J,K,W,te,0):A(F,"sqlite3_create_collation",5)}{const E=function(K,W){return K[0]+":"+(K[2]<0?-1:K[2])+":"+W+":"+c.cstrToJs(K[1]).toLowerCase()},T=Object.assign(Object.create(null),{xInverseAndStep:{signature:"v(pip)",contextKey:E,callProxy:K=>(W,te,xe)=>{try{K(W,...l.sqlite3_values_to_js(te,xe))}catch(y){l.sqlite3_result_error_js(W,y)}}},xFinalAndValue:{signature:"v(p)",contextKey:E,callProxy:K=>W=>{try{l.sqlite3_result_js(W,K(W))}catch(te){l.sqlite3_result_error_js(W,te)}}},xFunc:{signature:"v(pip)",contextKey:E,callProxy:K=>(W,te,xe)=>{try{l.sqlite3_result_js(W,K(W,...l.sqlite3_values_to_js(te,xe)))}catch(y){l.sqlite3_result_error_js(W,y)}}},xDestroy:{signature:"v(p)",contextKey:E,callProxy:K=>W=>{try{K(W)}catch(te){console.error("UDF xDestroy method threw:",te)}}}}),F=c.xWrap("sqlite3_create_function_v2","int",["sqlite3*","string","int","int","*",new c.xWrap.FuncPtrAdapter({name:"xFunc",...T.xFunc}),new c.xWrap.FuncPtrAdapter({name:"xStep",...T.xInverseAndStep}),new c.xWrap.FuncPtrAdapter({name:"xFinal",...T.xFinalAndValue}),new c.xWrap.FuncPtrAdapter({name:"xDestroy",...T.xDestroy})]),J=c.exports.sqlite3_create_window_function?c.xWrap("sqlite3_create_window_function","int",["sqlite3*","string","int","int","*",new c.xWrap.FuncPtrAdapter({name:"xStep",...T.xInverseAndStep}),new c.xWrap.FuncPtrAdapter({name:"xFinal",...T.xFinalAndValue}),new c.xWrap.FuncPtrAdapter({name:"xValue",...T.xFinalAndValue}),new c.xWrap.FuncPtrAdapter({name:"xInverse",...T.xInverseAndStep}),new c.xWrap.FuncPtrAdapter({name:"xDestroy",...T.xDestroy})]):void 0;l.sqlite3_create_function_v2=function K(W,te,xe,y,x,P,le,X,ce){if(K.length!==arguments.length)return A(W,"sqlite3_create_function_v2",K.length);if((y&15)===0)y|=l.SQLITE_UTF8;else if(l.SQLITE_UTF8!==(y&15))return O(W);try{const d=F(W,te,xe,y,x,P,le,X,ce);return d===0&&(P instanceof Function||le instanceof Function||X instanceof Function||ce instanceof Function)&&fe.addFunction(W,te,xe),d}catch(d){return console.error("sqlite3_create_function_v2() setup threw:",d),f.sqlite3__wasm_db_error(W,d,"Creation of UDF threw: "+d)}},l.sqlite3_create_function=function K(W,te,xe,y,x,P,le,X){return K.length===arguments.length?l.sqlite3_create_function_v2(W,te,xe,y,x,P,le,X,0):A(W,"sqlite3_create_function",K.length)},J?l.sqlite3_create_window_function=function K(W,te,xe,y,x,P,le,X,ce,d){if(K.length!==arguments.length)return A(W,"sqlite3_create_window_function",K.length);if((y&15)===0)y|=l.SQLITE_UTF8;else if(l.SQLITE_UTF8!==(y&15))return O(W);try{const _=J(W,te,xe,y,x,P,le,X,ce,d);return _===0&&(P instanceof Function||le instanceof Function||X instanceof Function||ce instanceof Function||d instanceof Function)&&fe.addWindowFunc(W,te,xe),_}catch(_){return console.error("sqlite3_create_window_function() setup threw:",_),f.sqlite3__wasm_db_error(W,_,"Creation of UDF threw: "+_)}}:delete l.sqlite3_create_window_function,l.sqlite3_create_function_v2.udfSetResult=l.sqlite3_create_function.udfSetResult=l.sqlite3_result_js,l.sqlite3_create_window_function&&(l.sqlite3_create_window_function.udfSetResult=l.sqlite3_result_js),l.sqlite3_create_function_v2.udfConvertArgs=l.sqlite3_create_function.udfConvertArgs=l.sqlite3_values_to_js,l.sqlite3_create_window_function&&(l.sqlite3_create_window_function.udfConvertArgs=l.sqlite3_values_to_js),l.sqlite3_create_function_v2.udfSetError=l.sqlite3_create_function.udfSetError=l.sqlite3_result_error_js,l.sqlite3_create_window_function&&(l.sqlite3_create_window_function.udfSetError=l.sqlite3_result_error_js)}{const E=(F,J)=>(typeof F=="string"?J=-1:f.isSQLableTypedArray(F)?(J=F.byteLength,F=f.typedArrayToString(F instanceof ArrayBuffer?new Uint8Array(F):F)):Array.isArray(F)&&(F=F.join(""),J=-1),[F,J]),T={basic:c.xWrap("sqlite3_prepare_v3","int",["sqlite3*","string","int","int","**","**"]),full:c.xWrap("sqlite3_prepare_v3","int",["sqlite3*","*","int","int","**","**"])};l.sqlite3_prepare_v3=function F(J,K,W,te,xe,y){if(F.length!==arguments.length)return A(J,"sqlite3_prepare_v3",F.length);const[x,P]=E(K,W);switch(typeof x){case"string":return T.basic(J,x,P,te,xe,null);case"number":return T.full(J,x,P,te,xe,y);default:return f.sqlite3__wasm_db_error(J,l.SQLITE_MISUSE,"Invalid SQL argument type for sqlite3_prepare_v2/v3().")}},l.sqlite3_prepare_v2=function F(J,K,W,te,xe){return F.length===arguments.length?l.sqlite3_prepare_v3(J,K,W,0,te,xe):A(J,"sqlite3_prepare_v2",F.length)}}{const E=c.xWrap("sqlite3_bind_text","int",["sqlite3_stmt*","int","string","int","*"]),T=c.xWrap("sqlite3_bind_blob","int",["sqlite3_stmt*","int","*","int","*"]);l.sqlite3_bind_text=function F(J,K,W,te,xe){if(F.length!==arguments.length)return A(l.sqlite3_db_handle(J),"sqlite3_bind_text",F.length);if(c.isPtr(W)||W===null)return E(J,K,W,te,xe);W instanceof ArrayBuffer?W=new Uint8Array(W):Array.isArray(pMem)&&(W=pMem.join(""));let y,x;try{if(f.isSQLableTypedArray(W))y=c.allocFromTypedArray(W),x=W.byteLength;else if(typeof W=="string")[y,x]=c.allocCString(W);else return f.sqlite3__wasm_db_error(l.sqlite3_db_handle(J),l.SQLITE_MISUSE,"Invalid 3rd argument type for sqlite3_bind_text().");return E(J,K,y,x,l.SQLITE_WASM_DEALLOC)}catch(P){return c.dealloc(y),f.sqlite3__wasm_db_error(l.sqlite3_db_handle(J),P)}},l.sqlite3_bind_blob=function F(J,K,W,te,xe){if(F.length!==arguments.length)return A(l.sqlite3_db_handle(J),"sqlite3_bind_blob",F.length);if(c.isPtr(W)||W===null)return T(J,K,W,te,xe);W instanceof ArrayBuffer?W=new Uint8Array(W):Array.isArray(W)&&(W=W.join(""));let y,x;try{if(f.isBindableTypedArray(W))y=c.allocFromTypedArray(W),x=te>=0?te:W.byteLength;else if(typeof W=="string")[y,x]=c.allocCString(W);else return f.sqlite3__wasm_db_error(l.sqlite3_db_handle(J),l.SQLITE_MISUSE,"Invalid 3rd argument type for sqlite3_bind_blob().");return T(J,K,y,x,l.SQLITE_WASM_DEALLOC)}catch(P){return c.dealloc(y),f.sqlite3__wasm_db_error(l.sqlite3_db_handle(J),P)}}}l.sqlite3_config=function(E,...T){if(arguments.length<2)return l.SQLITE_MISUSE;switch(E){case l.SQLITE_CONFIG_COVERING_INDEX_SCAN:case l.SQLITE_CONFIG_MEMSTATUS:case l.SQLITE_CONFIG_SMALL_MALLOC:case l.SQLITE_CONFIG_SORTERREF_SIZE:case l.SQLITE_CONFIG_STMTJRNL_SPILL:case l.SQLITE_CONFIG_URI:return c.exports.sqlite3__wasm_config_i(E,T[0]);case l.SQLITE_CONFIG_LOOKASIDE:return c.exports.sqlite3__wasm_config_ii(E,T[0],T[1]);case l.SQLITE_CONFIG_MEMDB_MAXSIZE:return c.exports.sqlite3__wasm_config_j(E,T[0]);case l.SQLITE_CONFIG_GETMALLOC:case l.SQLITE_CONFIG_GETMUTEX:case l.SQLITE_CONFIG_GETPCACHE2:case l.SQLITE_CONFIG_GETPCACHE:case l.SQLITE_CONFIG_HEAP:case l.SQLITE_CONFIG_LOG:case l.SQLITE_CONFIG_MALLOC:case l.SQLITE_CONFIG_MMAP_SIZE:case l.SQLITE_CONFIG_MULTITHREAD:case l.SQLITE_CONFIG_MUTEX:case l.SQLITE_CONFIG_PAGECACHE:case l.SQLITE_CONFIG_PCACHE2:case l.SQLITE_CONFIG_PCACHE:case l.SQLITE_CONFIG_PCACHE_HDRSZ:case l.SQLITE_CONFIG_PMASZ:case l.SQLITE_CONFIG_SERIALIZED:case l.SQLITE_CONFIG_SINGLETHREAD:case l.SQLITE_CONFIG_SQLLOG:case l.SQLITE_CONFIG_WIN32_HEAPSIZE:default:return l.SQLITE_NOTFOUND}};{const E=new Set;l.sqlite3_auto_extension=function(T){if(T instanceof Function)T=c.installFunction("i(ppp)",T);else if(arguments.length!==1||!c.isPtr(T))return l.SQLITE_MISUSE;const F=c.exports.sqlite3_auto_extension(T);return T!==arguments[0]&&(F===0?E.add(T):c.uninstallFunction(T)),F},l.sqlite3_cancel_auto_extension=function(T){return!T||arguments.length!==1||!c.isPtr(T)?0:c.exports.sqlite3_cancel_auto_extension(T)},l.sqlite3_reset_auto_extension=function(){c.exports.sqlite3_reset_auto_extension();for(const T of E)c.uninstallFunction(T);E.clear()}}const _e=l.sqlite3_vfs_find("kvvfs");if(_e)if(f.isUIThread()){const E=new l.sqlite3_kvvfs_methods(c.exports.sqlite3__wasm_kvvfs_methods());delete l.sqlite3_kvvfs_methods;const T=c.exports.sqlite3__wasm_kvvfsMakeKeyOnPstack,F=c.pstack,J=W=>c.peek(W)===115?sessionStorage:localStorage,K={xRead:(W,te,xe,y)=>{const x=F.pointer,P=c.scopedAllocPush();try{const le=T(W,te);if(!le)return-3;const X=c.cstrToJs(le),ce=J(W).getItem(X);if(!ce)return-1;const d=ce.length;if(y<=0)return d;if(y===1)return c.poke(xe,0),d;const _=c.scopedAllocCString(ce);return y>d+1&&(y=d+1),c.heap8u().copyWithin(xe,_,_+y-1),c.poke(xe+y-1,0),y-1}catch(le){return console.error("kvstorageRead()",le),-2}finally{F.restore(x),c.scopedAllocPop(P)}},xWrite:(W,te,xe)=>{const y=F.pointer;try{const x=T(W,te);if(!x)return 1;const P=c.cstrToJs(x);return J(W).setItem(P,c.cstrToJs(xe)),0}catch(x){return console.error("kvstorageWrite()",x),l.SQLITE_IOERR}finally{F.restore(y)}},xDelete:(W,te)=>{const xe=F.pointer;try{const y=T(W,te);return y?(J(W).removeItem(c.cstrToJs(y)),0):1}catch(y){return console.error("kvstorageDelete()",y),l.SQLITE_IOERR}finally{F.restore(xe)}}};for(const W of Object.keys(K))E[E.memberKey(W)]=c.installFunction(E.memberSignature(W),K[W])}else l.sqlite3_vfs_unregister(_e);c.xWrap.FuncPtrAdapter.warnOnUse=!0;const H=o.StructBinder,B=function E(T,F,J,K=E.installMethodArgcCheck){if(T instanceof H.StructType?!(J instanceof Function)&&!c.isPtr(J)&&u("Usage error: expecting a Function or WASM pointer to one."):u("Usage error: target object is-not-a StructType."),arguments.length===1)return(y,x)=>E(T,y,x,K);E.argcProxy||(E.argcProxy=function(y,x,P,le){return function(...X){return P.length!==arguments.length&&u("Argument mismatch for",y.structInfo.name+"::"+x+": Native signature is:",le),P.apply(this,X)}},E.removeFuncList=function(){this.ondispose.__removeFuncList&&(this.ondispose.__removeFuncList.forEach((y,x)=>{if(typeof y=="number")try{c.uninstallFunction(y)}catch{}}),delete this.ondispose.__removeFuncList)});const W=T.memberSignature(F);W.length<2&&u("Member",F,"does not have a function pointer signature:",W);const te=T.memberKey(F),xe=K&&!c.isPtr(J)?E.argcProxy(T,te,J,W):J;if(c.isPtr(xe))xe&&!c.functionEntry(xe)&&u("Pointer",xe,"is not a WASM function table entry."),T[te]=xe;else{const y=c.installFunction(xe,T.memberSignature(F,!0));T[te]=y,(!T.ondispose||!T.ondispose.__removeFuncList)&&(T.addOnDispose("ondispose.__removeFuncList handler",E.removeFuncList),T.ondispose.__removeFuncList=[]),T.ondispose.__removeFuncList.push(te,y)}return(y,x)=>E(T,y,x,K)};B.installMethodArgcCheck=!1;const ae=function(E,T,F=B.installMethodArgcCheck){const J=new Map;for(const K of Object.keys(T)){const W=T[K],te=J.get(W);if(te){const xe=E.memberKey(K);E[xe]=E[E.memberKey(te)]}else B(E,K,W,F),J.set(W,K)}return E};H.StructType.prototype.installMethod=function(T,F,J=B.installMethodArgcCheck){return arguments.length<3&&T&&typeof T=="object"?ae(this,...arguments):B(this,...arguments)},H.StructType.prototype.installMethods=function(E,T=B.installMethodArgcCheck){return ae(this,E,T)}}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){o.version={libVersion:"3.50.4",libVersionNumber:3050004,sourceId:"2025-07-30 19:33:53 4d8adfb30e03f9cf27f800a2c1ba3c48fb4ca1b08b0f5ed59a4d5ecbf45e20a3",downloadVersion:3500400}}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=(...d)=>{throw new o.SQLite3Error(...d)},l=o.capi,c=o.wasm,f=o.util,A=new WeakMap,O=new WeakMap,Y=(d,_,b)=>{const S=Object.getOwnPropertyDescriptor(d,_);return S?S.value:b},ee=function(d,_){return _&&(d instanceof E&&(d=d.pointer),u(_,"sqlite3 result code",_+":",d?l.sqlite3_errmsg(d):l.sqlite3_errstr(_))),arguments[0]},fe=c.installFunction("i(ippp)",(function(d,_,b,S){l.SQLITE_TRACE_STMT===d&&console.log("SQL TRACE #"+ ++this.counter+" via sqlite3@"+_+":",c.cstrToJs(S))}).bind({counter:0})),_e=Object.create(null),H=function(d){d instanceof ArrayBuffer&&(d=new Uint8Array(d));const _=[],b="0123456789abcdef";for(const S of d)_.push(b[(S&240)>>4],b[S&15]);return _.join("")},B=function(d,_){if(!l.sqlite3_key_v2)return;let b,S;const U=(_.key?1:0)+(_.hexkey?1:0)+(_.textkey?1:0);if(U)U>1&&u(l.SQLITE_MISUSE,"Only ONE of (key, hexkey, textkey) may be provided.");else return;if(_.key)if(b="key",S=_.key,typeof S=="string"&&(S=new TextEncoder("utf-8").encode(S)),S instanceof ArrayBuffer||S instanceof Uint8Array)S=H(S),b="hexkey";else{u(l.SQLITE_MISUSE,"Invalid value for the 'key' option. Expecting a string,","ArrayBuffer, or Uint8Array.");return}else if(_.textkey)b="textkey",S=_.textkey,S instanceof ArrayBuffer&&(S=new Uint8Array(S)),S instanceof Uint8Array?S=new TextDecoder("utf-8").decode(S):typeof S!="string"&&u(l.SQLITE_MISUSE,"Invalid value for the 'textkey' option. Expecting a string,","ArrayBuffer, or Uint8Array.");else if(_.hexkey)b="hexkey",S=_.hexkey,S instanceof ArrayBuffer||S instanceof Uint8Array?S=H(S):typeof S!="string"&&u(l.SQLITE_MISUSE,"Invalid value for the 'hexkey' option. Expecting a string,","ArrayBuffer, or Uint8Array.");else return;let be;try{return be=d.prepare("PRAGMA "+b+"="+f.sqlite3__wasm_qfmt_token(S,1)),be.step(),!0}finally{be&&be.finalize()}},ae=function d(..._){if(!d._name2vfs){d._name2vfs=Object.create(null);const $=typeof importScripts=="function"?re=>u("The VFS for",re,"is only available in the main window thread."):!1;d._name2vfs[":localStorage:"]={vfs:"kvvfs",filename:$||(()=>"local")},d._name2vfs[":sessionStorage:"]={vfs:"kvvfs",filename:$||(()=>"session")}}const b=d.normalizeArgs(..._);let S=b.filename,U=b.vfs,be=b.flags;(typeof S!="string"&&typeof S!="number"||typeof be!="string"||U&&typeof U!="string"&&typeof U!="number")&&(o.config.error("Invalid DB ctor args",b,arguments),u("Invalid arguments for DB constructor."));let Fe=typeof S=="number"?c.cstrToJs(S):S;const He=d._name2vfs[Fe];He&&(U=He.vfs,S=Fe=He.filename(Fe));let Ve,de=0;be.indexOf("c")>=0&&(de|=l.SQLITE_OPEN_CREATE|l.SQLITE_OPEN_READWRITE),be.indexOf("w")>=0&&(de|=l.SQLITE_OPEN_READWRITE),de===0&&(de|=l.SQLITE_OPEN_READONLY),de|=l.SQLITE_OPEN_EXRESCODE;const I=c.pstack.pointer;try{const $=c.pstack.allocPtr();let re=l.sqlite3_open_v2(S,$,de,U||0);Ve=c.peekPtr($),ee(Ve,re),l.sqlite3_extended_result_codes(Ve,1),be.indexOf("t")>=0&&l.sqlite3_trace_v2(Ve,l.SQLITE_TRACE_STMT,fe,Ve)}catch($){throw Ve&&l.sqlite3_close_v2(Ve),$}finally{c.pstack.restore(I)}this.filename=Fe,A.set(this,Ve),O.set(this,Object.create(null));try{B(this,b);const $=l.sqlite3_js_db_vfs(Ve)||u("Internal error: cannot get VFS for new db handle."),re=_e[$];re&&(re instanceof Function?re(this,o):ee(Ve,l.sqlite3_exec(Ve,re,0,0,0)))}catch($){throw this.close(),$}};ae.setVfsPostOpenCallback=function(d,_){_ instanceof Function||u("dbCtorHelper.setVfsPostOpenCallback() should not be used with a non-function argument.",arguments),_e[d]=_},ae.normalizeArgs=function(d=":memory:",_="c",b=null){const S={};return arguments.length===1&&arguments[0]&&typeof arguments[0]=="object"?(Object.assign(S,arguments[0]),S.flags===void 0&&(S.flags="c"),S.vfs===void 0&&(S.vfs=null),S.filename===void 0&&(S.filename=":memory:")):(S.filename=d,S.flags=_,S.vfs=b),S};const E=function(...d){ae.apply(this,d)};E.dbCtorHelper=ae;const T={null:1,number:2,string:3,boolean:4,blob:5};T.undefined==T.null,c.bigIntEnabled&&(T.bigint=T.number);const F=function(){T!==arguments[2]&&u(l.SQLITE_MISUSE,"Do not call the Stmt constructor directly. Use DB.prepare()."),this.db=arguments[0],A.set(this,arguments[1]),this.parameterCount=l.sqlite3_bind_parameter_count(this.pointer)},J=function(d){return d.pointer||u("DB has been closed."),d},K=function(d,_){return(_!==(_|0)||_<0||_>=d.columnCount)&&u("Column index",_,"is out of range."),d},W=function(d,_){const b=Object.create(null);switch(b.opt=Object.create(null),_.length){case 1:typeof _[0]=="string"||f.isSQLableTypedArray(_[0])||Array.isArray(_[0])?b.sql=_[0]:_[0]&&typeof _[0]=="object"&&(b.opt=_[0],b.sql=b.opt.sql);break;case 2:b.sql=_[0],b.opt=_[1];break;default:u("Invalid argument count for exec().")}b.sql=f.flexibleString(b.sql),typeof b.sql!="string"&&u("Missing SQL argument or unsupported SQL value type.");const S=b.opt;switch(S.returnValue){case"resultRows":S.resultRows||(S.resultRows=[]),b.returnVal=()=>S.resultRows;break;case"saveSql":S.saveSql||(S.saveSql=[]),b.returnVal=()=>S.saveSql;break;case void 0:case"this":b.returnVal=()=>d;break;default:u("Invalid returnValue value:",S.returnValue)}if(!S.callback&&!S.returnValue&&S.rowMode!==void 0&&(S.resultRows||(S.resultRows=[]),b.returnVal=()=>S.resultRows),S.callback||S.resultRows)switch(S.rowMode===void 0?"array":S.rowMode){case"object":b.cbArg=(U,be)=>{be.columnNames||(be.columnNames=U.getColumnNames([]));const Fe=U.get([]),He=Object.create(null);for(const Ve in be.columnNames)He[be.columnNames[Ve]]=Fe[Ve];return He};break;case"array":b.cbArg=U=>U.get([]);break;case"stmt":Array.isArray(S.resultRows)&&u("exec(): invalid rowMode for a resultRows array: must","be one of 'array', 'object',","a result column number, or column name reference."),b.cbArg=U=>U;break;default:if(f.isInt32(S.rowMode)){b.cbArg=U=>U.get(S.rowMode);break}else if(typeof S.rowMode=="string"&&S.rowMode.length>1&&S.rowMode[0]==="$"){const U=S.rowMode.substr(1);b.cbArg=be=>{const Fe=be.get(Object.create(null))[U];return Fe===void 0?u(l.SQLITE_NOTFOUND,"exec(): unknown result column:",U):Fe};break}u("Invalid rowMode:",S.rowMode)}return b},te=(d,_,b,...S)=>{const U=d.prepare(_);try{const be=U.bind(b).step()?U.get(...S):void 0;return U.reset(),be}finally{U.finalize()}},xe=(d,_,b,S)=>d.exec({sql:_,bind:b,rowMode:S,returnValue:"resultRows"});E.checkRc=(d,_)=>ee(d,_),E.prototype={isOpen:function(){return!!this.pointer},affirmOpen:function(){return J(this)},close:function(){if(this.pointer){if(this.onclose&&this.onclose.before instanceof Function)try{this.onclose.before(this)}catch{}const d=this.pointer;if(Object.keys(O.get(this)).forEach((_,b)=>{if(b&&b.pointer)try{b.finalize()}catch{}}),A.delete(this),O.delete(this),l.sqlite3_close_v2(d),this.onclose&&this.onclose.after instanceof Function)try{this.onclose.after(this)}catch{}delete this.filename}},changes:function(d=!1,_=!1){const b=J(this).pointer;return d?_?l.sqlite3_total_changes64(b):l.sqlite3_total_changes(b):_?l.sqlite3_changes64(b):l.sqlite3_changes(b)},dbFilename:function(d="main"){return l.sqlite3_db_filename(J(this).pointer,d)},dbName:function(d=0){return l.sqlite3_db_name(J(this).pointer,d)},dbVfsName:function(d=0){let _;const b=l.sqlite3_js_db_vfs(J(this).pointer,d);if(b){const S=new l.sqlite3_vfs(b);try{_=c.cstrToJs(S.$zName)}finally{S.dispose()}}return _},prepare:function(d){J(this);const _=c.pstack.pointer;let b,S;try{b=c.pstack.alloc(8),E.checkRc(this,l.sqlite3_prepare_v2(this.pointer,d,-1,b,null)),S=c.peekPtr(b)}finally{c.pstack.restore(_)}S||u("Cannot prepare empty SQL.");const U=new F(this,S,T);return O.get(this)[S]=U,U},exec:function(){J(this);const d=W(this,arguments);if(!d.sql)return u("exec() requires an SQL string.");const _=d.opt,b=_.callback,S=Array.isArray(_.resultRows)?_.resultRows:void 0;let U,be=_.bind,Fe=!!(d.cbArg||_.columnNames||S);const He=c.scopedAllocPush(),Ve=Array.isArray(_.saveSql)?_.saveSql:void 0;try{const de=f.isSQLableTypedArray(d.sql);let I=de?d.sql.byteLength:c.jstrlen(d.sql);const $=c.scopedAlloc(2*c.ptrSizeof+(I+1)),re=$+c.ptrSizeof;let me=re+c.ptrSizeof;const We=me+I;for(de?c.heap8().set(d.sql,me):c.jstrcpy(d.sql,c.heap8(),me,I,!1),c.poke(me+I,0);me&&c.peek(me,"i8");){c.pokePtr([$,re],0),E.checkRc(this,l.sqlite3_prepare_v3(this.pointer,me,I,0,$,re));const L=c.peekPtr($);if(me=c.peekPtr(re),I=We-me,!!L){if(Ve&&Ve.push(l.sqlite3_sql(L).trim()),U=new F(this,L,T),be&&U.parameterCount&&(U.bind(be),be=null),Fe&&U.columnCount){let G=Array.isArray(_.columnNames)?0:1;if(Fe=!1,d.cbArg||S){const ie=Object.create(null);for(;U.step();U._lockedByExec=!1){G++===0&&U.getColumnNames(ie.columnNames=_.columnNames||[]),U._lockedByExec=!0;const qe=d.cbArg(U,ie);if(S&&S.push(qe),b&&b.call(_,qe,U)===!1)break}U._lockedByExec=!1}G===0&&U.getColumnNames(_.columnNames)}else U.step();U.reset().finalize(),U=null}}}finally{c.scopedAllocPop(He),U&&(delete U._lockedByExec,U.finalize())}return d.returnVal()},createFunction:function(_,b,S){const U=ie=>ie instanceof Function;switch(arguments.length){case 1:S=_,_=S.name,b=S.xFunc||0;break;case 2:U(b)||(S=b,b=S.xFunc||0);break}S||(S={}),typeof _!="string"&&u("Invalid arguments: missing function name.");let be=S.xStep||0,Fe=S.xFinal||0;const He=S.xValue||0,Ve=S.xInverse||0;let de;U(b)?(de=!1,(U(be)||U(Fe))&&u("Ambiguous arguments: scalar or aggregate?"),be=Fe=null):U(be)?(U(Fe)||u("Missing xFinal() callback for aggregate or window UDF."),b=null):U(Fe)?u("Missing xStep() callback for aggregate or window UDF."):u("Missing function-type properties."),de===!1?(U(He)||U(Ve))&&u("xValue and xInverse are not permitted for non-window UDFs."):U(He)?(U(Ve)||u("xInverse must be provided if xValue is."),de=!0):U(Ve)&&u("xValue must be provided if xInverse is.");const I=S.pApp;I!=null&&(typeof I!="number"||!f.isInt32(I))&&u("Invalid value for pApp property. Must be a legal WASM pointer value.");const $=S.xDestroy||0;$&&!U($)&&u("xDestroy property must be a function.");let re=0;Y(S,"deterministic")&&(re|=l.SQLITE_DETERMINISTIC),Y(S,"directOnly")&&(re|=l.SQLITE_DIRECTONLY),Y(S,"innocuous")&&(re|=l.SQLITE_INNOCUOUS),_=_.toLowerCase();const me=b||be,We=Y(S,"arity"),L=typeof We=="number"?We:me.length?me.length-1:0;let G;return de?G=l.sqlite3_create_window_function(this.pointer,_,L,l.SQLITE_UTF8|re,I||0,be,Fe,He,Ve,$):G=l.sqlite3_create_function_v2(this.pointer,_,L,l.SQLITE_UTF8|re,I||0,b,be,Fe,$),E.checkRc(this,G),this},selectValue:function(d,_,b){return te(this,d,_,0,b)},selectValues:function(d,_,b){const S=this.prepare(d),U=[];try{for(S.bind(_);S.step();)U.push(S.get(0,b));S.reset()}finally{S.finalize()}return U},selectArray:function(d,_){return te(this,d,_,[])},selectObject:function(d,_){return te(this,d,_,{})},selectArrays:function(d,_){return xe(this,d,_,"array")},selectObjects:function(d,_){return xe(this,d,_,"object")},openStatementCount:function(){return this.pointer?Object.keys(O.get(this)).length:0},transaction:function(d){let _="BEGIN";arguments.length>1&&(/[^a-zA-Z]/.test(arguments[0])&&u(l.SQLITE_MISUSE,"Invalid argument for BEGIN qualifier."),_+=" "+arguments[0],d=arguments[1]),J(this).exec(_);try{const b=d(this);return this.exec("COMMIT"),b}catch(b){throw this.exec("ROLLBACK"),b}},savepoint:function(d){J(this).exec("SAVEPOINT oo1");try{const _=d(this);return this.exec("RELEASE oo1"),_}catch(_){throw this.exec("ROLLBACK to SAVEPOINT oo1; RELEASE SAVEPOINT oo1"),_}},checkRc:function(d){return ee(this,d)}};const y=function(d){return d.pointer||u("Stmt has been closed."),d},x=function(d){let _=T[d==null?"null":typeof d];switch(_){case T.boolean:case T.null:case T.number:case T.string:return _;case T.bigint:if(c.bigIntEnabled)return _;default:return f.isBindableTypedArray(d)?T.blob:void 0}},P=function(d){return x(d)||u("Unsupported bind() argument type:",typeof d)},le=function(d,_){const b=typeof _=="number"?_:l.sqlite3_bind_parameter_index(d.pointer,_);return b===0||!f.isInt32(b)?u("Invalid bind() parameter name: "+_):(b<1||b>d.parameterCount)&&u("Bind index",_,"is out of range."),b},X=function(d,_){return d._lockedByExec&&u("Operation is illegal when statement is locked:",_),d},ce=function d(_,b,S,U){X(y(_),"bind()"),d._||(d._tooBigInt=Fe=>u("BigInt value is too big to store without precision loss:",Fe),d._={string:function(Fe,He,Ve,de){const[I,$]=c.allocCString(Ve,!0);return(de?l.sqlite3_bind_blob:l.sqlite3_bind_text)(Fe.pointer,He,I,$,l.SQLITE_WASM_DEALLOC)}}),P(U),b=le(_,b);let be=0;switch(U==null?T.null:S){case T.null:be=l.sqlite3_bind_null(_.pointer,b);break;case T.string:be=d._.string(_,b,U,!1);break;case T.number:{let Fe;f.isInt32(U)?Fe=l.sqlite3_bind_int:typeof U=="bigint"?f.bigIntFits64(U)?c.bigIntEnabled?Fe=l.sqlite3_bind_int64:f.bigIntFitsDouble(U)?(U=Number(U),Fe=l.sqlite3_bind_double):d._tooBigInt(U):d._tooBigInt(U):(U=Number(U),c.bigIntEnabled&&Number.isInteger(U)?Fe=l.sqlite3_bind_int64:Fe=l.sqlite3_bind_double),be=Fe(_.pointer,b,U);break}case T.boolean:be=l.sqlite3_bind_int(_.pointer,b,U?1:0);break;case T.blob:{if(typeof U=="string"){be=d._.string(_,b,U,!0);break}else U instanceof ArrayBuffer?U=new Uint8Array(U):f.isBindableTypedArray(U)||u("Binding a value as a blob requires","that it be a string, Uint8Array, Int8Array, or ArrayBuffer.");const Fe=c.alloc(U.byteLength||1);c.heap8().set(U.byteLength?U:[0],Fe),be=l.sqlite3_bind_blob(_.pointer,b,Fe,U.byteLength,l.SQLITE_WASM_DEALLOC);break}default:o.config.warn("Unsupported bind() argument type:",U),u("Unsupported bind() argument type: "+typeof U)}return be&&E.checkRc(_.db.pointer,be),_._mayGet=!1,_};F.prototype={finalize:function(){if(this.pointer){X(this,"finalize()");const d=l.sqlite3_finalize(this.pointer);return delete O.get(this.db)[this.pointer],A.delete(this),delete this._mayGet,delete this.parameterCount,delete this._lockedByExec,delete this.db,d}},clearBindings:function(){return X(y(this),"clearBindings()"),l.sqlite3_clear_bindings(this.pointer),this._mayGet=!1,this},reset:function(d){X(this,"reset()"),d&&this.clearBindings();const _=l.sqlite3_reset(y(this).pointer);return this._mayGet=!1,ee(this.db,_),this},bind:function(){y(this);let d,_;switch(arguments.length){case 1:d=1,_=arguments[0];break;case 2:d=arguments[0],_=arguments[1];break;default:u("Invalid bind() arguments.")}return _===void 0?this:(this.parameterCount||u("This statement has no bindable parameters."),this._mayGet=!1,_===null?ce(this,d,T.null,_):Array.isArray(_)?(arguments.length!==1&&u("When binding an array, an index argument is not permitted."),_.forEach((b,S)=>ce(this,S+1,P(b),b)),this):(_ instanceof ArrayBuffer&&(_=new Uint8Array(_)),typeof _=="object"&&!f.isBindableTypedArray(_)?(arguments.length!==1&&u("When binding an object, an index argument is not permitted."),Object.keys(_).forEach(b=>ce(this,b,P(_[b]),_[b])),this):ce(this,d,P(_),_)))},bindAsBlob:function(d,_){y(this),arguments.length===1&&(_=d,d=1);const b=P(_);return T.string!==b&&T.blob!==b&&T.null!==b&&u("Invalid value type for bindAsBlob()"),ce(this,d,T.blob,_)},step:function(){X(this,"step()");const d=l.sqlite3_step(y(this).pointer);switch(d){case l.SQLITE_DONE:return this._mayGet=!1;case l.SQLITE_ROW:return this._mayGet=!0;default:this._mayGet=!1,o.config.warn("sqlite3_step() rc=",d,l.sqlite3_js_rc_str(d),"SQL =",l.sqlite3_sql(this.pointer)),E.checkRc(this.db.pointer,d)}},stepReset:function(){return this.step(),this.reset()},stepFinalize:function(){try{const d=this.step();return this.reset(),d}finally{try{this.finalize()}catch{}}},get:function(d,_){if(y(this)._mayGet||u("Stmt.step() has not (recently) returned true."),Array.isArray(d)){let b=0;const S=this.columnCount;for(;b<S;)d[b]=this.get(b++);return d}else if(d&&typeof d=="object"){let b=0;const S=this.columnCount;for(;b<S;)d[l.sqlite3_column_name(this.pointer,b)]=this.get(b++);return d}switch(K(this,d),_===void 0?l.sqlite3_column_type(this.pointer,d):_){case l.SQLITE_NULL:return null;case l.SQLITE_INTEGER:if(c.bigIntEnabled){const b=l.sqlite3_column_int64(this.pointer,d);return b>=Number.MIN_SAFE_INTEGER&&b<=Number.MAX_SAFE_INTEGER?Number(b).valueOf():b}else{const b=l.sqlite3_column_double(this.pointer,d);return(b>Number.MAX_SAFE_INTEGER||b<Number.MIN_SAFE_INTEGER)&&u("Integer is out of range for JS integer range: "+b),f.isInt32(b)?b|0:b}case l.SQLITE_FLOAT:return l.sqlite3_column_double(this.pointer,d);case l.SQLITE_TEXT:return l.sqlite3_column_text(this.pointer,d);case l.SQLITE_BLOB:{const b=l.sqlite3_column_bytes(this.pointer,d),S=l.sqlite3_column_blob(this.pointer,d),U=new Uint8Array(b);return b&&U.set(c.heap8u().slice(S,S+b),0),b&&this.db._blobXfer instanceof Array&&this.db._blobXfer.push(U.buffer),U}default:u("Don't know how to translate","type of result column #"+d+".")}u("Not reached.")},getInt:function(d){return this.get(d,l.SQLITE_INTEGER)},getFloat:function(d){return this.get(d,l.SQLITE_FLOAT)},getString:function(d){return this.get(d,l.SQLITE_TEXT)},getBlob:function(d){return this.get(d,l.SQLITE_BLOB)},getJSON:function(d){const _=this.get(d,l.SQLITE_STRING);return _===null?_:JSON.parse(_)},getColumnName:function(d){return l.sqlite3_column_name(K(y(this),d).pointer,d)},getColumnNames:function(d=[]){K(y(this),0);const _=this.columnCount;for(let b=0;b<_;++b)d.push(l.sqlite3_column_name(this.pointer,b));return d},getParamIndex:function(d){return y(this).parameterCount?l.sqlite3_bind_parameter_index(this.pointer,d):void 0},getParamName:function(d){return y(this).parameterCount?l.sqlite3_bind_parameter_name(this.pointer,d):void 0},isBusy:function(){return l.sqlite3_stmt_busy(y(this))!==0},isReadOnly:function(){return l.sqlite3_stmt_readonly(y(this))!==0}};{const d={enumerable:!0,get:function(){return A.get(this)},set:()=>u("The pointer property is read-only.")};Object.defineProperty(F.prototype,"pointer",d),Object.defineProperty(E.prototype,"pointer",d)}if(Object.defineProperty(F.prototype,"columnCount",{enumerable:!1,get:function(){return l.sqlite3_column_count(this.pointer)},set:()=>u("The columnCount property is read-only.")}),o.oo1={DB:E,Stmt:F},f.isUIThread()){o.oo1.JsStorageDb=function(_="session"){const b=ae.normalizeArgs(...arguments);_=b.filename,_!=="session"&&_!=="local"&&u("JsStorageDb db name must be one of 'session' or 'local'."),b.vfs="kvvfs",ae.call(this,b)};const d=o.oo1.JsStorageDb;d.prototype=Object.create(E.prototype),d.clearStorage=l.sqlite3_js_kvvfs_clear,d.prototype.clearStorage=function(){return d.clearStorage(J(this).filename)},d.storageSize=l.sqlite3_js_kvvfs_size,d.prototype.storageSize=function(){return d.storageSize(J(this).filename)}}}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=o.util;o.initWorker1API=(function(){const l=(...H)=>{throw new Error(H.join(" "))};globalThis.WorkerGlobalScope instanceof Function||l("initWorker1API() must be run from a Worker thread.");const c=this.sqlite3||l("Missing this.sqlite3 object."),f=c.oo1.DB,A=function(H){let B=O.idMap.get(H);return B||(B="db#"+ ++O.idSeq+"@"+H.pointer,O.idMap.set(H,B),B)},O={dbList:[],idSeq:0,idMap:new WeakMap,xfer:[],open:function(H){const B=new f(H);return this.dbs[A(B)]=B,this.dbList.indexOf(B)<0&&this.dbList.push(B),B},close:function(H,B){if(H){delete this.dbs[A(H)];const ae=H.filename,E=u.sqlite3__wasm_db_vfs(H.pointer,0);H.close();const T=this.dbList.indexOf(H);T>=0&&this.dbList.splice(T,1),B&&ae&&E&&u.sqlite3__wasm_vfs_unlink(E,ae)}},post:function(H,B){B&&B.length?(globalThis.postMessage(H,Array.from(B)),B.length=0):globalThis.postMessage(H)},dbs:Object.create(null),getDb:function(H,B=!0){return this.dbs[H]||(B?l("Unknown (or closed) DB ID:",H):void 0)}},Y=function(H=O.dbList[0]){return H&&H.pointer?H:l("DB is not opened.")},ee=function(H,B=!0){const ae=O.getDb(H.dbId,!1)||O.dbList[0];return B?Y(ae):ae},fe=function(){return O.dbList[0]&&A(O.dbList[0])},_e={open:function(H){const B=Object.create(null),ae=H.args||Object.create(null);ae.simulateError&&l("Throwing because of simulateError flag.");const E=Object.create(null);B.vfs=ae.vfs,B.filename=ae.filename||"";const T=O.open(B);return E.filename=T.filename,E.persistent=!!c.capi.sqlite3_js_db_uses_vfs(T.pointer,"opfs"),E.dbId=A(T),E.vfs=T.dbVfsName(),E},close:function(H){const B=ee(H,!1),ae={filename:B&&B.filename};if(B){const E=H.args&&typeof H.args=="object"?!!H.args.unlink:!1;O.close(B,E)}return ae},exec:function(H){const B=typeof H.args=="string"?{sql:H.args}:H.args||Object.create(null);B.rowMode==="stmt"?l("Invalid rowMode for 'exec': stmt mode","does not work in the Worker API."):B.sql||l("'exec' requires input SQL.");const ae=ee(H);(B.callback||Array.isArray(B.resultRows))&&(ae._blobXfer=O.xfer);const E=B.callback;let T=0;const F=!!B.columnNames;typeof E=="string"&&(F||(B.columnNames=[]),B.callback=function(J,K){O.post({type:E,columnNames:B.columnNames,rowNumber:++T,row:J},O.xfer)});try{const J=B.countChanges?ae.changes(!0,B.countChanges===64):void 0;ae.exec(B),J!==void 0&&(B.changeCount=ae.changes(!0,B.countChanges===64)-J);const K=B.lastInsertRowId?c.capi.sqlite3_last_insert_rowid(ae):void 0;K!==void 0&&(B.lastInsertRowId=K),B.callback instanceof Function&&(B.callback=E,O.post({type:E,columnNames:B.columnNames,rowNumber:null,row:void 0}))}finally{delete ae._blobXfer,B.callback&&(B.callback=E)}return B},"config-get":function(){const H=Object.create(null),B=c.config;return["bigIntEnabled"].forEach(function(ae){Object.getOwnPropertyDescriptor(B,ae)&&(H[ae]=B[ae])}),H.version=c.version,H.vfsList=c.capi.sqlite3_js_vfs_list(),H},export:function(H){const B=ee(H),ae={byteArray:c.capi.sqlite3_js_db_export(B.pointer),filename:B.filename,mimetype:"application/x-sqlite3"};return O.xfer.push(ae.byteArray.buffer),ae},toss:function(H){l("Testing worker exception")}};globalThis.onmessage=async function(H){H=H.data;let B,ae=H.dbId,E=H.type;const T=performance.now();try{_e.hasOwnProperty(E)&&_e[E]instanceof Function?B=await _e[E](H):l("Unknown db worker message type:",H.type)}catch(F){E="error",B={operation:H.type,message:F.message,errorClass:F.name,input:H},F.stack&&(B.stack=typeof F.stack=="string"?F.stack.split(/\n\s*/):F.stack)}ae||(ae=B.dbId||fe()),O.post({type:E,dbId:ae,messageId:H.messageId,workerReceivedTime:T,workerRespondTime:performance.now(),departureTime:H.departureTime,result:B},O.xfer)},globalThis.postMessage({type:"sqlite3-api",result:"worker1-ready"})}).bind({sqlite3:o})}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=o.wasm,l=o.capi,c=o.util.toss3,f=Object.create(null);o.vfs=f,l.sqlite3_vfs.prototype.registerVfs=function(A=!1){this instanceof o.capi.sqlite3_vfs||c("Expecting a sqlite3_vfs-type argument.");const O=l.sqlite3_vfs_register(this,A?1:0);return O&&c("sqlite3_vfs_register(",this,") failed with rc",O),this.pointer!==l.sqlite3_vfs_find(this.$zName)&&c("BUG: sqlite3_vfs_find(vfs.$zName) failed for just-installed VFS",this),this},f.installVfs=function(A){let O=0;const Y=["io","vfs"];for(const ee of Y){const fe=A[ee];fe&&(++O,fe.struct.installMethods(fe.methods,!!fe.applyArgcCheck),ee==="vfs"&&(!fe.struct.$zName&&typeof fe.name=="string"&&fe.struct.addOnDispose(fe.struct.$zName=u.allocCString(fe.name)),fe.struct.registerVfs(!!fe.asDefault)))}return O||c("Misuse: installVfs() options object requires at least","one of:",Y),this}}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){if(!o.wasm.exports.sqlite3_declare_vtab)return;const u=o.wasm,l=o.capi,c=o.util.toss3,f=Object.create(null);o.vtab=f;const A=l.sqlite3_index_info;A.prototype.nthConstraint=function(ee,fe=!1){if(ee<0||ee>=this.$nConstraint)return!1;const _e=this.$aConstraint+A.sqlite3_index_constraint.structInfo.sizeof*ee;return fe?_e:new A.sqlite3_index_constraint(_e)},A.prototype.nthConstraintUsage=function(ee,fe=!1){if(ee<0||ee>=this.$nConstraint)return!1;const _e=this.$aConstraintUsage+A.sqlite3_index_constraint_usage.structInfo.sizeof*ee;return fe?_e:new A.sqlite3_index_constraint_usage(_e)},A.prototype.nthOrderBy=function(ee,fe=!1){if(ee<0||ee>=this.$nOrderBy)return!1;const _e=this.$aOrderBy+A.sqlite3_index_orderby.structInfo.sizeof*ee;return fe?_e:new A.sqlite3_index_orderby(_e)};const O=function(ee,fe){return(function(_e,H=!1){if(arguments.length===0&&(_e=new fe),_e instanceof fe)return this.set(_e.pointer,_e),_e;u.isPtr(_e)||o.SQLite3Error.toss("Invalid argument to",ee+"()");let B=this.get(_e);return H&&this.delete(_e),B}).bind(new Map)},Y=function(ee,fe){const _e=O(ee,fe);return Object.assign(Object.create(null),{StructType:fe,create:H=>{const B=_e();return u.pokePtr(H,B.pointer),B},get:H=>_e(H),unget:H=>_e(H,!0),dispose:H=>{const B=_e(H,!0);B&&B.dispose()}})};f.xVtab=Y("xVtab",l.sqlite3_vtab),f.xCursor=Y("xCursor",l.sqlite3_vtab_cursor),f.xIndexInfo=ee=>new l.sqlite3_index_info(ee),f.xError=function ee(fe,_e,H){if(ee.errorReporter instanceof Function)try{ee.errorReporter("sqlite3_module::"+fe+"(): "+_e.message)}catch{}let B;return _e instanceof o.WasmAllocError?B=l.SQLITE_NOMEM:arguments.length>2?B=H:_e instanceof o.SQLite3Error&&(B=_e.resultCode),B||l.SQLITE_ERROR},f.xError.errorReporter=console.error.bind(console),f.xRowid=(ee,fe)=>u.poke(ee,fe,"i64"),f.setupModule=function(ee){let fe=!1;const _e=this instanceof l.sqlite3_module?this:ee.struct||(fe=new l.sqlite3_module);try{const H=ee.methods||c("Missing 'methods' object.");for(const B of Object.entries({xConnect:"xCreate",xDisconnect:"xDestroy"})){const ae=B[0],E=B[1];H[ae]===!0?H[ae]=H[E]:H[E]===!0&&(H[E]=H[ae])}if(ee.catchExceptions){const B=function(T,F){return["xConnect","xCreate"].indexOf(T)>=0?function(J,K,W,te,xe,y){try{return F(...arguments)||0}catch(x){return x instanceof o.WasmAllocError||(u.dealloc(u.peekPtr(y)),u.pokePtr(y,u.allocCString(x.message))),f.xError(T,x)}}:function(...J){try{return F(...J)||0}catch(K){return f.xError(T,K)}}},ae=["xCreate","xConnect","xBestIndex","xDisconnect","xDestroy","xOpen","xClose","xFilter","xNext","xEof","xColumn","xRowid","xUpdate","xBegin","xSync","xCommit","xRollback","xFindFunction","xRename","xSavepoint","xRelease","xRollbackTo","xShadowName"],E=Object.create(null);for(const T of ae){const F=H[T];if(F instanceof Function)T==="xConnect"&&H.xCreate===F?E[T]=H.xCreate:T==="xCreate"&&H.xConnect===F?E[T]=H.xConnect:E[T]=B(T,F);else continue}_e.installMethods(E,!1)}else _e.installMethods(H,!!ee.applyArgcCheck);if(_e.$iVersion===0){let B;typeof ee.iVersion=="number"?B=ee.iVersion:_e.$xShadowName?B=3:_e.$xSavePoint||_e.$xRelease||_e.$xRollbackTo?B=2:B=1,_e.$iVersion=B}}catch(H){throw fe&&fe.dispose(),H}return _e},l.sqlite3_module.prototype.setupModule=function(ee){return f.setupModule.call(this,ee)}}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=function l(c){if(!globalThis.SharedArrayBuffer||!globalThis.Atomics)return Promise.reject(new Error("Cannot install OPFS: Missing SharedArrayBuffer and/or Atomics. The server must emit the COOP/COEP response headers to enable those. See https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep"));if(typeof WorkerGlobalScope>"u")return Promise.reject(new Error("The OPFS sqlite3_vfs cannot run in the main thread because it requires Atomics.wait()."));if(!globalThis.FileSystemHandle||!globalThis.FileSystemDirectoryHandle||!globalThis.FileSystemFileHandle||!globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle||!navigator?.storage?.getDirectory)return Promise.reject(new Error("Missing required OPFS APIs."));(!c||typeof c!="object")&&(c=Object.create(null));const f=new URL(globalThis.location.href).searchParams;return f.has("opfs-disable")?Promise.resolve(o):(c.verbose===void 0&&(c.verbose=f.has("opfs-verbose")?+f.get("opfs-verbose")||2:1),c.sanityChecks===void 0&&(c.sanityChecks=f.has("opfs-sanity-check")),c.proxyUri===void 0&&(c.proxyUri=l.defaultProxyUri),typeof c.proxyUri=="function"&&(c.proxyUri=c.proxyUri()),new Promise(function(O,Y){const ee=[o.config.error,o.config.warn,o.config.log],fe=(L,...G)=>{c.verbose>L&&ee[L]("OPFS syncer:",...G)},_e=(...L)=>fe(2,...L),H=(...L)=>fe(1,...L),B=(...L)=>fe(0,...L),ae=o.util.toss,E=o.capi,T=o.util,F=o.wasm,J=E.sqlite3_vfs,K=E.sqlite3_file,W=E.sqlite3_io_methods,te=Object.create(null),xe=()=>globalThis.FileSystemHandle&&globalThis.FileSystemDirectoryHandle&&globalThis.FileSystemFileHandle&&globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle&&navigator?.storage?.getDirectory;te.metrics={dump:function(){let L,G=0,ie=0,qe=0;for(L in b.opIds){const Ne=S[L];G+=Ne.count,ie+=Ne.time,qe+=Ne.wait,Ne.avgTime=Ne.count&&Ne.time?Ne.time/Ne.count:0,Ne.avgWait=Ne.count&&Ne.wait?Ne.wait/Ne.count:0}o.config.log(globalThis.location.href,"metrics for",globalThis.location.href,":",S,`
Total of`,G,"op(s) for",ie,"ms (incl. "+qe+" ms of waiting on the async side)"),o.config.log("Serialization metrics:",S.s11n),ce.postMessage({type:"opfs-async-metrics"})},reset:function(){let L;const G=qe=>qe.count=qe.time=qe.wait=0;for(L in b.opIds)G(S[L]=Object.create(null));let ie=S.s11n=Object.create(null);ie=ie.serialize=Object.create(null),ie.count=ie.time=0,ie=S.s11n.deserialize=Object.create(null),ie.count=ie.time=0}};const y=new W,x=new J().addOnDispose(()=>y.dispose());let P;const le=L=>(P=!0,x.dispose(),Y(L)),X=()=>(P=!1,O(o)),ce=new Worker(new URL("/assets/sqlite3-opfs-async-proxy-C_otN2ZJ.js",self.location.href));setTimeout(()=>{P===void 0&&le(new Error("Timeout while waiting for OPFS async proxy worker."))},4e3),ce._originalOnError=ce.onerror,ce.onerror=function(L){B("Error initializing OPFS asyncer:",L),le(new Error("Loading OPFS async Worker failed for unknown reasons."))};const d=E.sqlite3_vfs_find(null),_=d?new J(d):null;y.$iVersion=1,x.$iVersion=2,x.$szOsFile=E.sqlite3_file.structInfo.sizeof,x.$mxPathname=1024,x.$zName=F.allocCString("opfs"),x.$xDlOpen=x.$xDlError=x.$xDlSym=x.$xDlClose=null,x.addOnDispose("$zName",x.$zName,"cleanup default VFS wrapper",()=>_?_.dispose():null);const b=Object.create(null);b.verbose=c.verbose,b.littleEndian=(()=>{const L=new ArrayBuffer(2);return new DataView(L).setInt16(0,256,!0),new Int16Array(L)[0]===256})(),b.asyncIdleWaitTime=150,b.asyncS11nExceptions=1,b.fileBufferSize=1024*64,b.sabS11nOffset=b.fileBufferSize,b.sabS11nSize=x.$mxPathname*2,b.sabIO=new SharedArrayBuffer(b.fileBufferSize+b.sabS11nSize),b.opIds=Object.create(null);const S=Object.create(null);{let L=0;b.opIds.whichOp=L++,b.opIds.rc=L++,b.opIds.xAccess=L++,b.opIds.xClose=L++,b.opIds.xDelete=L++,b.opIds.xDeleteNoWait=L++,b.opIds.xFileSize=L++,b.opIds.xLock=L++,b.opIds.xOpen=L++,b.opIds.xRead=L++,b.opIds.xSleep=L++,b.opIds.xSync=L++,b.opIds.xTruncate=L++,b.opIds.xUnlock=L++,b.opIds.xWrite=L++,b.opIds.mkdir=L++,b.opIds["opfs-async-metrics"]=L++,b.opIds["opfs-async-shutdown"]=L++,b.opIds.retry=L++,b.sabOP=new SharedArrayBuffer(L*4),te.metrics.reset()}b.sq3Codes=Object.create(null),["SQLITE_ACCESS_EXISTS","SQLITE_ACCESS_READWRITE","SQLITE_BUSY","SQLITE_CANTOPEN","SQLITE_ERROR","SQLITE_IOERR","SQLITE_IOERR_ACCESS","SQLITE_IOERR_CLOSE","SQLITE_IOERR_DELETE","SQLITE_IOERR_FSYNC","SQLITE_IOERR_LOCK","SQLITE_IOERR_READ","SQLITE_IOERR_SHORT_READ","SQLITE_IOERR_TRUNCATE","SQLITE_IOERR_UNLOCK","SQLITE_IOERR_WRITE","SQLITE_LOCK_EXCLUSIVE","SQLITE_LOCK_NONE","SQLITE_LOCK_PENDING","SQLITE_LOCK_RESERVED","SQLITE_LOCK_SHARED","SQLITE_LOCKED","SQLITE_MISUSE","SQLITE_NOTFOUND","SQLITE_OPEN_CREATE","SQLITE_OPEN_DELETEONCLOSE","SQLITE_OPEN_MAIN_DB","SQLITE_OPEN_READONLY"].forEach(L=>{(b.sq3Codes[L]=E[L])===void 0&&ae("Maintenance required: not found:",L)}),b.opfsFlags=Object.assign(Object.create(null),{OPFS_UNLOCK_ASAP:1,OPFS_UNLINK_BEFORE_OPEN:2,defaultUnlockAsap:!1});const U=(L,...G)=>{const ie=b.opIds[L]||ae("Invalid op ID:",L);b.s11n.serialize(...G),Atomics.store(b.sabOPView,b.opIds.rc,-1),Atomics.store(b.sabOPView,b.opIds.whichOp,ie),Atomics.notify(b.sabOPView,b.opIds.whichOp);const qe=performance.now();for(;Atomics.wait(b.sabOPView,b.opIds.rc,-1)!=="not-equal";);const Ne=Atomics.load(b.sabOPView,b.opIds.rc);if(S[L].wait+=performance.now()-qe,Ne&&b.asyncS11nExceptions){const Me=b.s11n.deserialize();Me&&B(L+"() async error:",...Me)}return Ne};te.debug={asyncShutdown:()=>{H("Shutting down OPFS async listener. The OPFS VFS will no longer work."),U("opfs-async-shutdown")},asyncRestart:()=>{H("Attempting to restart OPFS VFS async listener. Might work, might not."),ce.postMessage({type:"opfs-async-restart"})}};const be=()=>{if(b.s11n)return b.s11n;const L=new TextDecoder,G=new TextEncoder("utf-8"),ie=new Uint8Array(b.sabIO,b.sabS11nOffset,b.sabS11nSize),qe=new DataView(b.sabIO,b.sabS11nOffset,b.sabS11nSize);b.s11n=Object.create(null);const Ne=Object.create(null);Ne.number={id:1,size:8,getter:"getFloat64",setter:"setFloat64"},Ne.bigint={id:2,size:8,getter:"getBigInt64",setter:"setBigInt64"},Ne.boolean={id:3,size:4,getter:"getInt32",setter:"setInt32"},Ne.string={id:4};const Me=Le=>Ne[typeof Le]||ae("Maintenance required: this value type cannot be serialized.",Le),Ge=Le=>{switch(Le){case Ne.number.id:return Ne.number;case Ne.bigint.id:return Ne.bigint;case Ne.boolean.id:return Ne.boolean;case Ne.string.id:return Ne.string;default:ae("Invalid type ID:",Le)}};return b.s11n.deserialize=function(Le=!1){++S.s11n.deserialize.count;const Pt=performance.now(),Q=ie[0],ye=Q?[]:null;if(Q){const ve=[];let Ae=1,tt,yt,ft;for(tt=0;tt<Q;++tt,++Ae)ve.push(Ge(ie[Ae]));for(tt=0;tt<Q;++tt){const pt=ve[tt];pt.getter?(ft=qe[pt.getter](Ae,b.littleEndian),Ae+=pt.size):(yt=qe.getInt32(Ae,b.littleEndian),Ae+=4,ft=L.decode(ie.slice(Ae,Ae+yt)),Ae+=yt),ye.push(ft)}}return Le&&(ie[0]=0),S.s11n.deserialize.time+=performance.now()-Pt,ye},b.s11n.serialize=function(...Le){const Pt=performance.now();if(++S.s11n.serialize.count,Le.length){const Q=[];let ye=0,ve=1;for(ie[0]=Le.length&255;ye<Le.length;++ye,++ve)Q.push(Me(Le[ye])),ie[ve]=Q[ye].id;for(ye=0;ye<Le.length;++ye){const Ae=Q[ye];if(Ae.setter)qe[Ae.setter](ve,Le[ye],b.littleEndian),ve+=Ae.size;else{const tt=G.encode(Le[ye]);qe.setInt32(ve,tt.byteLength,b.littleEndian),ve+=4,ie.set(tt,ve),ve+=tt.byteLength}}}else ie[0]=0;S.s11n.serialize.time+=performance.now()-Pt},b.s11n},Fe=function L(G=16){L._chars||(L._chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789",L._n=L._chars.length);const ie=[];let qe=0;for(;qe<G;++qe){const Ne=Math.random()*(L._n*64)%L._n|0;ie[qe]=L._chars[Ne]}return ie.join("")},He=Object.create(null),Ve=Object.create(null);Ve.op=void 0,Ve.start=void 0;const de=L=>{Ve.start=performance.now(),Ve.op=L,++S[L].count},I=()=>S[Ve.op].time+=performance.now()-Ve.start,$={xCheckReservedLock:function(L,G){return F.poke(G,0,"i32"),0},xClose:function(L){de("xClose");let G=0;const ie=He[L];return ie&&(delete He[L],G=U("xClose",L),ie.sq3File&&ie.sq3File.dispose()),I(),G},xDeviceCharacteristics:function(L){return E.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN},xFileControl:function(L,G,ie){return E.SQLITE_NOTFOUND},xFileSize:function(L,G){de("xFileSize");let ie=U("xFileSize",L);if(ie==0)try{const qe=b.s11n.deserialize()[0];F.poke(G,qe,"i64")}catch(qe){B("Unexpected error reading xFileSize() result:",qe),ie=b.sq3Codes.SQLITE_IOERR}return I(),ie},xLock:function(L,G){de("xLock");const ie=He[L];let qe=0;return ie.lockType?ie.lockType=G:(qe=U("xLock",L,G),qe===0&&(ie.lockType=G)),I(),qe},xRead:function(L,G,ie,qe){de("xRead");const Ne=He[L];let Me;try{Me=U("xRead",L,ie,Number(qe)),(Me===0||E.SQLITE_IOERR_SHORT_READ===Me)&&F.heap8u().set(Ne.sabView.subarray(0,ie),G)}catch(Ge){B("xRead(",arguments,") failed:",Ge,Ne),Me=E.SQLITE_IOERR_READ}return I(),Me},xSync:function(L,G){de("xSync"),++S.xSync.count;const ie=U("xSync",L,G);return I(),ie},xTruncate:function(L,G){de("xTruncate");const ie=U("xTruncate",L,Number(G));return I(),ie},xUnlock:function(L,G){de("xUnlock");const ie=He[L];let qe=0;return E.SQLITE_LOCK_NONE===G&&ie.lockType&&(qe=U("xUnlock",L,G)),qe===0&&(ie.lockType=G),I(),qe},xWrite:function(L,G,ie,qe){de("xWrite");const Ne=He[L];let Me;try{Ne.sabView.set(F.heap8u().subarray(G,G+ie)),Me=U("xWrite",L,ie,Number(qe))}catch(Ge){B("xWrite(",arguments,") failed:",Ge,Ne),Me=E.SQLITE_IOERR_WRITE}return I(),Me}},re={xAccess:function(L,G,ie,qe){de("xAccess");const Ne=U("xAccess",F.cstrToJs(G));return F.poke(qe,Ne?0:1,"i32"),I(),0},xCurrentTime:function(L,G){return F.poke(G,24405875e-1+new Date().getTime()/864e5,"double"),0},xCurrentTimeInt64:function(L,G){return F.poke(G,24405875e-1*864e5+new Date().getTime(),"i64"),0},xDelete:function(L,G,ie){de("xDelete");const qe=U("xDelete",F.cstrToJs(G),ie,!1);return I(),qe},xFullPathname:function(L,G,ie,qe){return F.cstrncpy(qe,G,ie)<ie?0:E.SQLITE_CANTOPEN},xGetLastError:function(L,G,ie){return H("OPFS xGetLastError() has nothing sensible to return."),0},xOpen:function(G,ie,qe,Ne,Me){de("xOpen");let Ge=0;ie===0?ie=Fe():F.isPtr(ie)&&(E.sqlite3_uri_boolean(ie,"opfs-unlock-asap",0)&&(Ge|=b.opfsFlags.OPFS_UNLOCK_ASAP),E.sqlite3_uri_boolean(ie,"delete-before-open",0)&&(Ge|=b.opfsFlags.OPFS_UNLINK_BEFORE_OPEN),ie=F.cstrToJs(ie));const Le=Object.create(null);Le.fid=qe,Le.filename=ie,Le.sab=new SharedArrayBuffer(b.fileBufferSize),Le.flags=Ne,Le.readOnly=!(o.SQLITE_OPEN_CREATE&Ne)&&!!(Ne&E.SQLITE_OPEN_READONLY);const Pt=U("xOpen",qe,ie,Ne,Ge);return Pt||(Le.readOnly&&F.poke(Me,E.SQLITE_OPEN_READONLY,"i32"),He[qe]=Le,Le.sabView=b.sabFileBufView,Le.sq3File=new K(qe),Le.sq3File.$pMethods=y.pointer,Le.lockType=E.SQLITE_LOCK_NONE),I(),Pt}};_&&(x.$xRandomness=_.$xRandomness,x.$xSleep=_.$xSleep),x.$xRandomness||(re.xRandomness=function(L,G,ie){const qe=F.heap8u();let Ne=0;for(;Ne<G;++Ne)qe[ie+Ne]=Math.random()*255e3&255;return Ne}),x.$xSleep||(re.xSleep=function(L,G){return Atomics.wait(b.sabOPView,b.opIds.xSleep,0,G),0}),te.getResolvedPath=function(L,G){const ie=new URL(L,"file://irrelevant").pathname;return G?ie.split("/").filter(qe=>!!qe):ie},te.getDirForFilename=async function(G,ie=!1){const qe=te.getResolvedPath(G,!0),Ne=qe.pop();let Me=te.rootDirectory;for(const Ge of qe)Ge&&(Me=await Me.getDirectoryHandle(Ge,{create:!!ie}));return[Me,Ne]},te.mkdir=async function(L){try{return await te.getDirForFilename(L+"/filepart",!0),!0}catch{return!1}},te.entryExists=async function(L){try{const[G,ie]=await te.getDirForFilename(L);return await G.getFileHandle(ie),!0}catch{return!1}},te.randomFilename=Fe,te.treeList=async function(){const L=async function ie(qe,Ne){Ne.name=qe.name,Ne.dirs=[],Ne.files=[];for await(const Me of qe.values())if(Me.kind==="directory"){const Ge=Object.create(null);Ne.dirs.push(Ge),await ie(Me,Ge)}else Ne.files.push(Me.name)},G=Object.create(null);return await L(te.rootDirectory,G),G},te.rmfr=async function(){const L=te.rootDirectory,G={recurse:!0};for await(const ie of L.values())L.removeEntry(ie.name,G)},te.unlink=async function(L,G=!1,ie=!1){try{const[qe,Ne]=await te.getDirForFilename(L,!1);return await qe.removeEntry(Ne,{recursive:G}),!0}catch(qe){if(ie)throw new Error("unlink(",arguments[0],") failed: "+qe.message,{cause:qe});return!1}},te.traverse=async function(L){const G={recursive:!0,directory:te.rootDirectory};typeof L=="function"&&(L={callback:L}),L=Object.assign(G,L||{}),async function qe(Ne,Me){for await(const Ge of Ne.values()){if(L.callback(Ge,Ne,Me)===!1)return!1;if(L.recursive&&Ge.kind==="directory"&&await qe(Ge,Me+1)===!1)break}}(L.directory,0)};const me=async function(L,G){const[ie,qe]=await te.getDirForFilename(L,!0);let Me=await(await ie.getFileHandle(qe,{create:!0})).createSyncAccessHandle(),Ge=0,Le,Pt=!1;try{for(Me.truncate(0);(Le=await G())!==void 0;)Le instanceof ArrayBuffer&&(Le=new Uint8Array(Le)),Ge===0&&Le.byteLength>=15&&(T.affirmDbHeader(Le),Pt=!0),Me.write(Le,{at:Ge}),Ge+=Le.byteLength;if((Ge<512||Ge%512!==0)&&ae("Input size",Ge,"is not correct for an SQLite database."),!Pt){const Q=new Uint8Array(20);Me.read(Q,{at:0}),T.affirmDbHeader(Q)}return Me.write(new Uint8Array([1,1]),{at:18}),Ge}catch(Q){throw await Me.close(),Me=void 0,await ie.removeEntry(qe).catch(()=>{}),Q}finally{Me&&await Me.close()}};if(te.importDb=async function(L,G){if(G instanceof Function)return me(L,G);G instanceof ArrayBuffer&&(G=new Uint8Array(G)),T.affirmIsDb(G);const ie=G.byteLength,[qe,Ne]=await te.getDirForFilename(L,!0);let Me,Ge=0;try{return Me=await(await qe.getFileHandle(Ne,{create:!0})).createSyncAccessHandle(),Me.truncate(0),Ge=Me.write(G,{at:0}),Ge!=ie&&ae("Expected to write "+ie+" bytes but wrote "+Ge+"."),Me.write(new Uint8Array([1,1]),{at:18}),Ge}catch(Le){throw Me&&(await Me.close(),Me=void 0),await qe.removeEntry(Ne).catch(()=>{}),Le}finally{Me&&await Me.close()}},o.oo1){const L=function(...G){const ie=o.oo1.DB.dbCtorHelper.normalizeArgs(...G);ie.vfs=x.$zName,o.oo1.DB.dbCtorHelper.call(this,ie)};L.prototype=Object.create(o.oo1.DB.prototype),o.oo1.OpfsDb=L,L.importDb=te.importDb,o.oo1.DB.dbCtorHelper.setVfsPostOpenCallback(x.pointer,function(G,ie){ie.capi.sqlite3_busy_timeout(G,1e4)})}const We=function(){const L=F.scopedAllocPush(),G=new K;try{const ie=G.pointer,qe=E.SQLITE_OPEN_CREATE|E.SQLITE_OPEN_READWRITE|E.SQLITE_OPEN_MAIN_DB,Ne=F.scopedAlloc(8),Me="/sanity/check/file"+Fe(8),Ge=F.scopedAllocCString(Me);let Le;if(b.s11n.serialize("This is ä string."),Le=b.s11n.deserialize(),_e("deserialize() says:",Le),Le[0]!=="This is ä string."&&ae("String d13n error."),re.xAccess(x.pointer,Ge,0,Ne),Le=F.peek(Ne,"i32"),_e("xAccess(",Me,") exists ?=",Le),Le=re.xOpen(x.pointer,Ge,ie,qe,Ne),_e("open rc =",Le,"state.sabOPView[xOpen] =",b.sabOPView[b.opIds.xOpen]),Le!==0){B("open failed with code",Le);return}re.xAccess(x.pointer,Ge,0,Ne),Le=F.peek(Ne,"i32"),Le||ae("xAccess() failed to detect file."),Le=$.xSync(G.pointer,0),Le&&ae("sync failed w/ rc",Le),Le=$.xTruncate(G.pointer,1024),Le&&ae("truncate failed w/ rc",Le),F.poke(Ne,0,"i64"),Le=$.xFileSize(G.pointer,Ne),Le&&ae("xFileSize failed w/ rc",Le),_e("xFileSize says:",F.peek(Ne,"i64")),Le=$.xWrite(G.pointer,Ge,10,1),Le&&ae("xWrite() failed!");const Pt=F.scopedAlloc(16);Le=$.xRead(G.pointer,Pt,6,2),F.poke(Pt+6,0);let Q=F.cstrToJs(Pt);_e("xRead() got:",Q),Q!=="sanity"&&ae("Unexpected xRead() value."),re.xSleep&&(_e("xSleep()ing before close()ing..."),re.xSleep(x.pointer,2e3),_e("waking up from xSleep()")),Le=$.xClose(ie),_e("xClose rc =",Le,"sabOPView =",b.sabOPView),_e("Deleting file:",Me),re.xDelete(x.pointer,Ge,4660),re.xAccess(x.pointer,Ge,0,Ne),Le=F.peek(Ne,"i32"),Le&&ae("Expecting 0 from xAccess(",Me,") after xDelete()."),H("End of OPFS sanity checks.")}finally{G.dispose(),F.scopedAllocPop(L)}};ce.onmessage=function({data:L}){switch(L.type){case"opfs-unavailable":le(new Error(L.payload.join(" ")));break;case"opfs-async-loaded":ce.postMessage({type:"opfs-async-init",args:b});break;case"opfs-async-inited":{if(P===!0)break;try{o.vfs.installVfs({io:{struct:y,methods:$},vfs:{struct:x,methods:re}}),b.sabOPView=new Int32Array(b.sabOP),b.sabFileBufView=new Uint8Array(b.sabIO,0,b.fileBufferSize),b.sabS11nView=new Uint8Array(b.sabIO,b.sabS11nOffset,b.sabS11nSize),be(),c.sanityChecks&&(H("Running sanity checks because of opfs-sanity-check URL arg..."),We()),xe()?navigator.storage.getDirectory().then(G=>{ce.onerror=ce._originalOnError,delete ce._originalOnError,o.opfs=te,te.rootDirectory=G,_e("End of OPFS sqlite3_vfs setup.",x),X()}).catch(le):X()}catch(G){B(G),le(G)}break}default:{const G="Unexpected message from the OPFS async worker: "+JSON.stringify(L);B(G),le(new Error(G));break}}}}))};u.defaultProxyUri="sqlite3-opfs-async-proxy.js",globalThis.sqlite3ApiBootstrap.initializersAsync.push(async l=>{try{let c=u.defaultProxyUri;return l.scriptInfo.sqlite3Dir&&(u.defaultProxyUri=l.scriptInfo.sqlite3Dir+c),u().catch(f=>{l.config.warn("Ignoring inability to install OPFS sqlite3_vfs:",f.message)})}catch(c){return l.config.error("installOpfsVfs() exception:",c),Promise.reject(c)}})}),globalThis.sqlite3ApiBootstrap.initializers.push(function(o){const u=o.util.toss,l=o.util.toss3,c=Object.create(null),f=o.capi,A=o.util,O=o.wasm,Y=4096,ee=512,fe=4,_e=8,H=ee+fe,B=ee,ae=H,E=Y,T=f.SQLITE_OPEN_MAIN_DB|f.SQLITE_OPEN_MAIN_JOURNAL|f.SQLITE_OPEN_SUPER_JOURNAL|f.SQLITE_OPEN_WAL,F=f.SQLITE_OPEN_MEMORY,J=".opaque",K=()=>Math.random().toString(36).slice(2),W=new TextDecoder,te=new TextEncoder,xe=Object.assign(Object.create(null),{name:"opfs-sahpool",directory:void 0,initialCapacity:6,clearOnInit:!1,verbosity:2,forceReinitIfPreviouslyFailed:!1}),y=[o.config.error,o.config.warn,o.config.log];o.config.log;const x=o.config.warn;o.config.error;const P=new Map,le=de=>P.get(de),X=(de,I)=>{I?P.set(de,I):P.delete(de)},ce=new Map,d=de=>ce.get(de),_=(de,I)=>{I?ce.set(de,I):ce.delete(de)},b={xCheckReservedLock:function(de,I){const $=d(de);return $.log("xCheckReservedLock"),$.storeErr(),O.poke32(I,1),0},xClose:function(de){const I=d(de);I.storeErr();const $=I.getOFileForS3File(de);if($)try{I.log(`xClose ${$.path}`),I.mapS3FileToOFile(de,!1),$.sah.flush(),$.flags&f.SQLITE_OPEN_DELETEONCLOSE&&I.deletePath($.path)}catch(re){return I.storeErr(re,f.SQLITE_IOERR)}return 0},xDeviceCharacteristics:function(de){return f.SQLITE_IOCAP_UNDELETABLE_WHEN_OPEN},xFileControl:function(de,I,$){return f.SQLITE_NOTFOUND},xFileSize:function(de,I){const $=d(de);$.log("xFileSize");const me=$.getOFileForS3File(de).sah.getSize()-E;return O.poke64(I,BigInt(me)),0},xLock:function(de,I){const $=d(de);$.log(`xLock ${I}`),$.storeErr();const re=$.getOFileForS3File(de);return re.lockType=I,0},xRead:function(de,I,$,re){const me=d(de);me.storeErr();const We=me.getOFileForS3File(de);me.log(`xRead ${We.path} ${$} @ ${re}`);try{const L=We.sah.read(O.heap8u().subarray(I,I+$),{at:E+Number(re)});return L<$?(O.heap8u().fill(0,I+L,I+$),f.SQLITE_IOERR_SHORT_READ):0}catch(L){return me.storeErr(L,f.SQLITE_IOERR)}},xSectorSize:function(de){return Y},xSync:function(de,I){const $=d(de);$.log(`xSync ${I}`),$.storeErr();const re=$.getOFileForS3File(de);try{return re.sah.flush(),0}catch(me){return $.storeErr(me,f.SQLITE_IOERR)}},xTruncate:function(de,I){const $=d(de);$.log(`xTruncate ${I}`),$.storeErr();const re=$.getOFileForS3File(de);try{return re.sah.truncate(E+Number(I)),0}catch(me){return $.storeErr(me,f.SQLITE_IOERR)}},xUnlock:function(de,I){const $=d(de);$.log("xUnlock");const re=$.getOFileForS3File(de);return re.lockType=I,0},xWrite:function(de,I,$,re){const me=d(de);me.storeErr();const We=me.getOFileForS3File(de);me.log(`xWrite ${We.path} ${$} ${re}`);try{const L=We.sah.write(O.heap8u().subarray(I,I+$),{at:E+Number(re)});return $===L?0:u("Unknown write() failure.")}catch(L){return me.storeErr(L,f.SQLITE_IOERR)}}},S=new f.sqlite3_io_methods;S.$iVersion=1,o.vfs.installVfs({io:{struct:S,methods:b}});const U={xAccess:function(de,I,$,re){const me=le(de);me.storeErr();try{const We=me.getPath(I);O.poke32(re,me.hasFilename(We)?1:0)}catch{O.poke32(re,0)}return 0},xCurrentTime:function(de,I){return O.poke(I,24405875e-1+new Date().getTime()/864e5,"double"),0},xCurrentTimeInt64:function(de,I){return O.poke(I,24405875e-1*864e5+new Date().getTime(),"i64"),0},xDelete:function(de,I,$){const re=le(de);re.log(`xDelete ${O.cstrToJs(I)}`),re.storeErr();try{return re.deletePath(re.getPath(I)),0}catch(me){return re.storeErr(me),f.SQLITE_IOERR_DELETE}},xFullPathname:function(de,I,$,re){return O.cstrncpy(re,I,$)<$?0:f.SQLITE_CANTOPEN},xGetLastError:function(de,I,$){const re=le(de),me=re.popErr();if(re.log(`xGetLastError ${I} e =`,me),me){const We=O.scopedAllocPush();try{const[L,G]=O.scopedAllocCString(me.message,!0);O.cstrncpy($,L,I),G>I&&O.poke8($+I-1,0)}catch{return f.SQLITE_NOMEM}finally{O.scopedAllocPop(We)}}return me?me.sqlite3Rc||f.SQLITE_IOERR:0},xOpen:function(I,$,re,me,We){const L=le(I);try{me&=~F,L.log(`xOpen ${O.cstrToJs($)} ${me}`);const G=$&&O.peek8($)?L.getPath($):K();let ie=L.getSAHForPath(G);!ie&&me&f.SQLITE_OPEN_CREATE&&(L.getFileCount()<L.getCapacity()?(ie=L.nextAvailableSAH(),L.setAssociatedPath(ie,G,me)):u("SAH pool is full. Cannot create file",G)),ie||u("file not found:",G);const qe={path:G,flags:me,sah:ie};L.mapS3FileToOFile(re,qe),qe.lockType=f.SQLITE_LOCK_NONE;const Ne=new f.sqlite3_file(re);return Ne.$pMethods=S.pointer,Ne.dispose(),O.poke32(We,me),0}catch(G){return L.storeErr(G),f.SQLITE_CANTOPEN}}},be=function(de){o.capi.sqlite3_vfs_find(de)&&l("VFS name is already registered:",de);const I=new f.sqlite3_vfs,$=f.sqlite3_vfs_find(null),re=$?new f.sqlite3_vfs($):null;return I.$iVersion=2,I.$szOsFile=f.sqlite3_file.structInfo.sizeof,I.$mxPathname=ee,I.addOnDispose(I.$zName=O.allocCString(de),()=>X(I.pointer,0)),re&&(I.$xRandomness=re.$xRandomness,I.$xSleep=re.$xSleep,re.dispose()),!I.$xRandomness&&!U.xRandomness&&(U.xRandomness=function(me,We,L){const G=O.heap8u();let ie=0;for(;ie<We;++ie)G[L+ie]=Math.random()*255e3&255;return ie}),!I.$xSleep&&!U.xSleep&&(U.xSleep=(me,We)=>0),o.vfs.installVfs({vfs:{struct:I,methods:U}}),I};class Fe{vfsDir;#e;#t;#r;#s=new Map;#i=new Map;#o=new Set;#c=new Map;#n=new Uint8Array(H);#l;#a;#u;constructor(I=Object.create(null)){this.#u=I.verbosity??xe.verbosity,this.vfsName=I.name||xe.name,this.#a=be(this.vfsName),X(this.#a.pointer,this),this.vfsDir=I.directory||"."+this.vfsName,this.#l=new DataView(this.#n.buffer,this.#n.byteOffset),this.isReady=this.reset(!!(I.clearOnInit??xe.clearOnInit)).then(()=>{if(this.$error)throw this.$error;return this.getCapacity()?Promise.resolve(void 0):this.addCapacity(I.initialCapacity||xe.initialCapacity)})}#d(I,...$){this.#u>I&&y[I](this.vfsName+":",...$)}log(...I){this.#d(2,...I)}warn(...I){this.#d(1,...I)}error(...I){this.#d(0,...I)}getVfs(){return this.#a}getCapacity(){return this.#s.size}getFileCount(){return this.#i.size}getFileNames(){const I=[];for(const $ of this.#i.keys())I.push($);return I}async addCapacity(I){for(let $=0;$<I;++$){const re=K(),We=await(await this.#t.getFileHandle(re,{create:!0})).createSyncAccessHandle();this.#s.set(We,re),this.setAssociatedPath(We,"",0)}return this.getCapacity()}async reduceCapacity(I){let $=0;for(const re of Array.from(this.#o)){if($===I||this.getFileCount()===this.getCapacity())break;const me=this.#s.get(re);re.close(),await this.#t.removeEntry(me),this.#s.delete(re),this.#o.delete(re),++$}return $}releaseAccessHandles(){for(const I of this.#s.keys())I.close();this.#s.clear(),this.#i.clear(),this.#o.clear()}async acquireAccessHandles(I=!1){const $=[];for await(const[re,me]of this.#t)me.kind==="file"&&$.push([re,me]);return Promise.all($.map(async([re,me])=>{try{const We=await me.createSyncAccessHandle();if(this.#s.set(We,re),I)We.truncate(E),this.setAssociatedPath(We,"",0);else{const L=this.getAssociatedPath(We);L?this.#i.set(L,We):this.#o.add(We)}}catch(We){throw this.storeErr(We),this.releaseAccessHandles(),We}}))}getAssociatedPath(I){I.read(this.#n,{at:0});const $=this.#l.getUint32(B);if(this.#n[0]&&($&f.SQLITE_OPEN_DELETEONCLOSE||($&T)===0))return x(`Removing file with unexpected flags ${$.toString(16)}`,this.#n),this.setAssociatedPath(I,"",0),"";const re=new Uint32Array(_e/4);I.read(re,{at:ae});const me=this.computeDigest(this.#n,$);if(re.every((We,L)=>We===me[L])){const We=this.#n.findIndex(L=>L===0);return We===0&&I.truncate(E),We?W.decode(this.#n.subarray(0,We)):""}else return x("Disassociating file with bad digest."),this.setAssociatedPath(I,"",0),""}setAssociatedPath(I,$,re){const me=te.encodeInto($,this.#n);ee<=me.written+1&&u("Path too long:",$),$&&re&&(re|=F),this.#n.fill(0,me.written,ee),this.#l.setUint32(B,re);const We=this.computeDigest(this.#n,re);I.write(this.#n,{at:0}),I.write(We,{at:ae}),I.flush(),$?(this.#i.set($,I),this.#o.delete(I)):(I.truncate(E),this.#o.add(I))}computeDigest(I,$){if($&F){let re=3735928559,me=1103547991;for(const We of I)re=Math.imul(re^We,2654435761),me=Math.imul(me^We,104729);return new Uint32Array([re>>>0,me>>>0])}else return new Uint32Array([0,0])}async reset(I){await this.isReady;let $=await navigator.storage.getDirectory(),re;for(const me of this.vfsDir.split("/"))me&&(re=$,$=await $.getDirectoryHandle(me,{create:!0}));return this.#e=$,this.#r=re,this.#t=await this.#e.getDirectoryHandle(J,{create:!0}),this.releaseAccessHandles(),this.acquireAccessHandles(I)}getPath(I){return O.isPtr(I)&&(I=O.cstrToJs(I)),(I instanceof URL?I:new URL(I,"file://localhost/")).pathname}deletePath(I){const $=this.#i.get(I);return $&&(this.#i.delete(I),this.setAssociatedPath($,"",0)),!!$}storeErr(I,$){return I&&(I.sqlite3Rc=$||f.SQLITE_IOERR,this.error(I)),this.$error=I,$}popErr(){const I=this.$error;return this.$error=void 0,I}nextAvailableSAH(){const[I]=this.#o.keys();return I}getOFileForS3File(I){return this.#c.get(I)}mapS3FileToOFile(I,$){$?(this.#c.set(I,$),_(I,this)):(this.#c.delete(I),_(I,!1))}hasFilename(I){return this.#i.has(I)}getSAHForPath(I){return this.#i.get(I)}async removeVfs(){if(!this.#a.pointer||!this.#t)return!1;f.sqlite3_vfs_unregister(this.#a.pointer),this.#a.dispose(),delete c[this.vfsName];try{this.releaseAccessHandles(),await this.#e.removeEntry(J,{recursive:!0}),this.#t=void 0,await this.#r.removeEntry(this.#e.name,{recursive:!0}),this.#e=this.#r=void 0}catch(I){o.config.error(this.vfsName,"removeVfs() failed with no recovery strategy:",I)}return!0}pauseVfs(){return this.#c.size>0&&o.SQLite3Error.toss(f.SQLITE_MISUSE,"Cannot pause VFS",this.vfsName,"because it has opened files."),this.#s.size>0&&(f.sqlite3_vfs_unregister(this.vfsName),this.releaseAccessHandles()),this}isPaused(){return this.#s.size===0}async unpauseVfs(){return this.#s.size===0?this.acquireAccessHandles(!1).then(()=>f.sqlite3_vfs_register(this.#a,0),this):this}exportFile(I){const $=this.#i.get(I)||u("File not found:",I),re=$.getSize()-E,me=new Uint8Array(re>0?re:0);if(re>0){const We=$.read(me,{at:E});We!=re&&u("Expected to read "+re+" bytes but read "+We+".")}return me}async importDbChunked(I,$){const re=this.#i.get(I)||this.nextAvailableSAH()||u("No available handles to import to.");re.truncate(0);let me=0,We,L=!1;try{for(;(We=await $())!==void 0;)We instanceof ArrayBuffer&&(We=new Uint8Array(We)),me===0&&We.byteLength>=15&&(A.affirmDbHeader(We),L=!0),re.write(We,{at:E+me}),me+=We.byteLength;if((me<512||me%512!==0)&&u("Input size",me,"is not correct for an SQLite database."),!L){const G=new Uint8Array(20);re.read(G,{at:0}),A.affirmDbHeader(G)}re.write(new Uint8Array([1,1]),{at:E+18})}catch(G){throw this.setAssociatedPath(re,"",0),G}return this.setAssociatedPath(re,I,f.SQLITE_OPEN_MAIN_DB),me}importDb(I,$){if($ instanceof ArrayBuffer)$=new Uint8Array($);else if($ instanceof Function)return this.importDbChunked(I,$);const re=this.#i.get(I)||this.nextAvailableSAH()||u("No available handles to import to."),me=$.byteLength;(me<512||me%512!=0)&&u("Byte array size is invalid for an SQLite db.");const We="SQLite format 3";for(let G=0;G<We.length;++G)We.charCodeAt(G)!==$[G]&&u("Input does not contain an SQLite database header.");const L=re.write($,{at:E});return L!=me?(this.setAssociatedPath(re,"",0),u("Expected to write "+me+" bytes but wrote "+L+".")):(re.write(new Uint8Array([1,1]),{at:E+18}),this.setAssociatedPath(re,I,f.SQLITE_OPEN_MAIN_DB)),L}}class He{#e;constructor(I){this.#e=I,this.vfsName=I.vfsName}async addCapacity(I){return this.#e.addCapacity(I)}async reduceCapacity(I){return this.#e.reduceCapacity(I)}getCapacity(){return this.#e.getCapacity(this.#e)}getFileCount(){return this.#e.getFileCount()}getFileNames(){return this.#e.getFileNames()}async reserveMinimumCapacity(I){const $=this.#e.getCapacity();return $<I?this.#e.addCapacity(I-$):$}exportFile(I){return this.#e.exportFile(I)}importDb(I,$){return this.#e.importDb(I,$)}async wipeFiles(){return this.#e.reset(!0)}unlink(I){return this.#e.deletePath(I)}async removeVfs(){return this.#e.removeVfs()}pauseVfs(){return this.#e.pauseVfs(),this}async unpauseVfs(){return this.#e.unpauseVfs().then(()=>this)}isPaused(){return this.#e.isPaused()}}const Ve=async()=>{const de=await navigator.storage.getDirectory(),I=".opfs-sahpool-sync-check-"+K(),me=(await(await de.getFileHandle(I,{create:!0})).createSyncAccessHandle()).close();return await me,await de.removeEntry(I),me?.then&&u("The local OPFS API is too old for opfs-sahpool:","it has an async FileSystemSyncAccessHandle.close() method."),!0};o.installOpfsSAHPoolVfs=async function(de=Object.create(null)){de=Object.assign(Object.create(null),xe,de||{});const I=de.name;if(de.$testThrowPhase1)throw de.$testThrowPhase1;if(c[I])try{return await c[I]}catch($){if(de.forceReinitIfPreviouslyFailed)delete c[I];else throw $}return!globalThis.FileSystemHandle||!globalThis.FileSystemDirectoryHandle||!globalThis.FileSystemFileHandle||!globalThis.FileSystemFileHandle.prototype.createSyncAccessHandle||!navigator?.storage?.getDirectory?c[I]=Promise.reject(new Error("Missing required OPFS APIs.")):c[I]=Ve().then(async function(){if(de.$testThrowPhase2)throw de.$testThrowPhase2;const $=new Fe(de);return $.isReady.then(async()=>{const re=new He($);if(o.oo1){const me=o.oo1,We=$.getVfs(),L=function(...G){const ie=me.DB.dbCtorHelper.normalizeArgs(...G);ie.vfs=We.$zName,me.DB.dbCtorHelper.call(this,ie)};L.prototype=Object.create(me.DB.prototype),re.OpfsSAHPoolDb=L}return $.log("VFS initialized."),re}).catch(async re=>{throw await $.removeVfs().catch(()=>{}),re})}).catch($=>c[I]=Promise.reject($))}}),typeof r<"u"){const o=Object.assign(Object.create(null),{exports:typeof fi>"u"?r.asm:fi,memory:r.wasmMemory},globalThis.sqlite3ApiConfig||{});globalThis.sqlite3ApiConfig=o;let u;try{u=globalThis.sqlite3ApiBootstrap()}catch(l){throw console.error("sqlite3ApiBootstrap() error:",l),l}finally{delete globalThis.sqlite3ApiBootstrap,delete globalThis.sqlite3ApiConfig}r.sqlite3=u}else console.warn("This is not running in an Emscripten module context, so","globalThis.sqlite3ApiBootstrap() is _not_ being called due to lack","of config info for the WASM environment.","It must be called manually.")},Ye?e=r:e=new Promise((i,o)=>{Ee=i,Ue=o}),e};qa=(function(){const t=qa;if(!t)throw new Error("Expecting globalThis.sqlite3InitModule to be defined by the Emscripten build.");const e=globalThis.sqlite3InitModuleState=Object.assign(Object.create(null),{moduleScript:globalThis?.document?.currentScript,isWorker:typeof WorkerGlobalScope<"u",location:globalThis.location,urlParams:globalThis?.location?.href?new URL(globalThis.location.href).searchParams:new URLSearchParams});if(e.debugModule=e.urlParams.has("sqlite3.debugModule")?(...r)=>console.warn("sqlite3.debugModule:",...r):()=>{},e.urlParams.has("sqlite3.dir"))e.sqlite3Dir=e.urlParams.get("sqlite3.dir")+"/";else if(e.moduleScript){const r=e.moduleScript.src.split("/");r.pop(),e.sqlite3Dir=r.join("/")+"/"}if(globalThis.sqlite3InitModule=function r(...n){return t(...n).then(s=>{s.runSQLite3PostLoadInit(s);const a=s.sqlite3;a.scriptInfo=e,r.__isUnderTest&&(a.__isUnderTest=!0);const h=a.asyncPostInit;return delete a.asyncPostInit,h()}).catch(s=>{throw console.error("Exception loading sqlite3 module:",s),s})},globalThis.sqlite3InitModule.ready=t.ready,globalThis.sqlite3InitModuleState.moduleScript){const r=globalThis.sqlite3InitModuleState;let n=r.moduleScript.src.split("/");n.pop(),r.scriptDir=n.join("/")+"/"}return e.debugModule("sqlite3InitModuleState =",e),globalThis.sqlite3InitModule})();var Vg=qa;globalThis.sqlite3Worker1Promiser=function t(e=t.defaultConfig){if(arguments.length===1&&typeof arguments[0]=="function"){const N=e;e=Object.assign(Object.create(null),t.defaultConfig),e.onready=N}else e=Object.assign(Object.create(null),t.defaultConfig,e);const r=Object.create(null),n=function(){},s=e.onerror||n,a=e.debug||n,h=e.generateMessageId?void 0:Object.create(null),g=e.generateMessageId||function(N){return N.type+"#"+(h[N.type]=(h[N.type]||0)+1)},w=(...N)=>{throw new Error(N.join(" "))};e.worker||(e.worker=t.defaultConfig.worker),typeof e.worker=="function"&&(e.worker=e.worker());let q,k;return e.worker.onmessage=function(N){N=N.data,a("worker1.onmessage",N);let C=r[N.messageId];if(!C){if(N&&N.type==="sqlite3-api"&&N.result==="worker1-ready"){e.onready&&e.onready(k);return}if(C=r[N.type],C&&C.onrow){C.onrow(N);return}e.onunhandled?e.onunhandled(arguments[0]):s("sqlite3Worker1Promiser() unhandled worker message:",N);return}switch(delete r[N.messageId],N.type){case"error":C.reject(N);return;case"open":q||(q=N.dbId);break;case"close":N.dbId===q&&(q=void 0);break}try{C.resolve(N)}catch(z){C.reject(z)}},k=function(){let N;arguments.length===1?N=arguments[0]:arguments.length===2?(N=Object.create(null),N.type=arguments[0],N.args=arguments[1],N.dbId=N.args.dbId):w("Invalid arguments for sqlite3Worker1Promiser()-created factory."),!N.dbId&&N.type!=="open"&&(N.dbId=q),N.messageId=g(N),N.departureTime=performance.now();const C=Object.create(null);C.message=N;let z;N.type==="exec"&&N.args&&(typeof N.args.callback=="function"?(z=N.messageId+":row",C.onrow=N.args.callback,N.args.callback=z,r[z]=C):typeof N.args.callback=="string"&&w("exec callback may not be a string when using the Promise interface."));let V=new Promise(function(Z,ge){C.resolve=Z,C.reject=ge,r[N.messageId]=C,a("Posting",N.type,"message to Worker dbId="+(q||"default")+":",N),e.worker.postMessage(N)});return z&&(V=V.finally(()=>delete r[z])),V}},globalThis.sqlite3Worker1Promiser.defaultConfig={worker:function(){return new Worker(new URL("/assets/sqlite3-worker1-bundler-friendly-CME5Bg3a.js",self.location.href),{type:"module"})},onerror:(...t)=>console.error("worker1 promiser error",...t)},sqlite3Worker1Promiser.v2=(function(t){let e;typeof t=="function"?(e=t,t={}):typeof t?.onready=="function"&&(e=t.onready,delete t.onready);const r=Object.create(null);t=Object.assign(t||Object.create(null),{onready:async function(s){try{e&&await e(s),r.resolve(s)}catch(a){r.reject(a)}}});const n=new Promise(function(s,a){r.resolve=s,r.reject=a});try{this.original(t)}catch(s){r.reject(s)}return n}).bind({original:sqlite3Worker1Promiser}),sqlite3Worker1Promiser.v2,globalThis.sqlite3ApiConfig={warn:t=>{typeof t=="string"&&t.startsWith("Ignoring inability to install OPFS sqlite3_vfs")||console.warn(t)}};const Qg=Vg(),Hg=async(t,e)=>{const r=await Qg;r.capi.sqlite3mc_vfs_create("opfs",1);let n;if(e?.memory)n=new r.oo1.DB(":memory:");else if(e?.encryptionKey){const g=await r.installOpfsSAHPoolVfs({directory:`.${t}`});n=new g.OpfsSAHPoolDb("file:evolu1.db?vfs=multipleciphers-opfs-sahpool"),n.exec(`
      PRAGMA cipher = 'sqlcipher';
      PRAGMA legacy = 4;
      PRAGMA key = "x'${so(e.encryptionKey)}'";
    `)}else{const g=await r.installOpfsSAHPoolVfs({name:t});n=new g.OpfsSAHPoolDb("file:evolu1.db")}let s=!1;const a=fp(g=>n.prepare(g),g=>{g.finalize()});return{exec:(g,w)=>{const q=a.get(g);if(q){if(q.bind(g.parameters),w)return q.stepReset(),{rows:[],changes:n.changes()};const C=[];for(;q.step();)C.push(q.get({}));return q.reset(),{rows:C,changes:0}}const k=n.exec(g.sql,{returnValue:"resultRows",rowMode:"object",bind:g.parameters}),N=n.changes();return{rows:k,changes:N}},export:()=>r.capi.sqlite3_js_db_export(n),[Symbol.dispose]:()=>{s||(s=!0,a[Symbol.dispose](),n.close())}}},Jg=t=>{t.onMessage(e=>{postMessage(e)}),self.onmessage=e=>{t.postMessage(e.data)}},Kg=Dg({console:Wh(),createSqliteDriver:Hg,createWebSocket:jg,random:$g(),randomBytes:ic(),time:Ag()});Jg(Kg)})();
