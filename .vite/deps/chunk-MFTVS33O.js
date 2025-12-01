import {
  __export
} from "./chunk-G3PMV62Z.js";

// node_modules/@evolu/common/dist/src/Array.js
var isNonEmptyArray = (array2) => array2.length > 0;
var isNonEmptyReadonlyArray = (array2) => array2.length > 0;
var appendToArray = (array2, item) => [...array2, item];
var prependToArray = (array2, item) => [item, ...array2];
function mapArray(array2, mapper) {
  return array2.map(mapper);
}
function filterArray(array2, predicate) {
  return array2.filter(predicate);
}
function dedupeArray(array2, by) {
  if (by == null) {
    return Array.from(new Set(array2));
  }
  const seen = /* @__PURE__ */ new Set();
  return array2.filter((item) => {
    const key = by(item);
    if (seen.has(key))
      return false;
    seen.add(key);
    return true;
  });
}
function partitionArray(array2, predicate) {
  const trueArray = [];
  const falseArray = [];
  for (let i = 0; i < array2.length; i++) {
    if (predicate(array2[i], i)) {
      trueArray.push(array2[i]);
    } else {
      falseArray.push(array2[i]);
    }
  }
  return [trueArray, falseArray];
}
var firstInArray = (array2) => array2[0];
var lastInArray = (array2) => array2[array2.length - 1];
var shiftArray = (array2) => array2.shift();
var popArray = (array2) => array2.pop();

// node_modules/@evolu/common/dist/src/Assert.js
var assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};
var assertNonEmptyArray = (arr, message = "Expected a non-empty array.") => {
  assert(arr.length > 0, message);
};
var assertNonEmptyReadonlyArray = (arr, message = "Expected a non-empty readonly array.") => {
  assert(arr.length > 0, message);
};

// node_modules/@evolu/common/dist/src/BigInt.js
var incrementBigInt = (n) => n + 1n;
var decrementBigInt = (n) => n - 1n;
var clampBigInt = (min2, max2) => (n) => n < min2 ? min2 : n > max2 ? max2 : n;
var isBetweenBigInt = (min2, max2) => (value) => value >= min2 && value <= max2;

// node_modules/@noble/ciphers/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abool(b) {
  if (typeof b !== "boolean")
    throw new Error(`boolean expected, not ${b}`);
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(value, length2, title = "") {
  const bytes = isBytes(value);
  const len = value?.length;
  const needsLen = length2 !== void 0;
  if (!bytes || needsLen && len !== length2) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length2}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out, void 0, "output");
  const min2 = instance.outputLen;
  if (out.length < min2) {
    throw new Error("digestInto() expects output buffer of length at least " + min2);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
var isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var hasHexBuiltin = (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes) {
  abytes(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex2 = "";
  for (let i = 0; i < bytes.length; i++) {
    hex2 += hexes[bytes[i]];
  }
  return hex2;
}
var asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex2) {
  if (typeof hex2 !== "string")
    throw new Error("hex string expected, got " + typeof hex2);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex2);
  const hl = hex2.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array2 = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex2.charCodeAt(hi));
    const n2 = asciiToBase16(hex2.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex2[hi] + hex2[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array2[ai] = n1 * 16 + n2;
  }
  return array2;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function bytesToUtf8(bytes) {
  return new TextDecoder().decode(bytes);
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
function checkOpts(defaults, opts) {
  if (opts == null || typeof opts !== "object")
    throw new Error("options must be defined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
var wrapCipher = (params, constructor) => {
  function wrappedCipher(key, ...args) {
    abytes(key, void 0, "key");
    if (!isLE)
      throw new Error("Non little-endian hardware is not yet supported");
    if (params.nonceLength !== void 0) {
      const nonce = args[0];
      abytes(nonce, params.varSizeNonce ? void 0 : params.nonceLength, "nonce");
    }
    const tagl = params.tagLength;
    if (tagl && args[1] !== void 0)
      abytes(args[1], void 0, "AAD");
    const cipher = constructor(key, ...args);
    const checkOutput = (fnLength, output) => {
      if (output !== void 0) {
        if (fnLength !== 2)
          throw new Error("cipher output not supported");
        abytes(output, void 0, "output");
      }
    };
    let called = false;
    const wrCipher = {
      encrypt(data, output) {
        if (called)
          throw new Error("cannot encrypt() twice with same key + nonce");
        called = true;
        abytes(data);
        checkOutput(cipher.encrypt.length, output);
        return cipher.encrypt(data, output);
      },
      decrypt(data, output) {
        abytes(data);
        if (tagl && data.length < tagl)
          throw new Error('"ciphertext" expected length bigger than tagLength=' + tagl);
        checkOutput(cipher.decrypt.length, output);
        return cipher.decrypt(data, output);
      }
    };
    return wrCipher;
  }
  Object.assign(wrappedCipher, params);
  return wrappedCipher;
};
function getOutput(expectedLength, out, onlyAligned = true) {
  if (out === void 0)
    return new Uint8Array(expectedLength);
  if (out.length !== expectedLength)
    throw new Error('"output" expected Uint8Array of length ' + expectedLength + ", got: " + out.length);
  if (onlyAligned && !isAligned32(out))
    throw new Error("invalid output, must be aligned");
  return out;
}
function u64Lengths(dataLength, aadLength, isLE3) {
  abool(isLE3);
  const num = new Uint8Array(16);
  const view = createView(num);
  view.setBigUint64(0, BigInt(aadLength), isLE3);
  view.setBigUint64(8, BigInt(dataLength), isLE3);
  return num;
}
function isAligned32(bytes) {
  return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
function randomBytes(bytesLength = 32) {
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  if (typeof cr?.getRandomValues !== "function")
    throw new Error("crypto.getRandomValues must be defined");
  return cr.getRandomValues(new Uint8Array(bytesLength));
}

// node_modules/@noble/hashes/utils.js
function isBytes2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber2(n, title = "") {
  if (!Number.isSafeInteger(n) || n < 0) {
    const prefix = title && `"${title}" `;
    throw new Error(`${prefix}expected integer >= 0, got ${n}`);
  }
}
function abytes2(value, length2, title = "") {
  const bytes = isBytes2(value);
  const len = value?.length;
  const needsLen = length2 !== void 0;
  if (!bytes || needsLen && len !== length2) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length2}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash must wrapped by utils.createHasher");
  anumber2(h.outputLen);
  anumber2(h.blockLen);
}
function aexists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput2(out, instance) {
  abytes2(out, void 0, "digestInto() output");
  const min2 = instance.outputLen;
  if (out.length < min2) {
    throw new Error('"digestInto() output" expected to be of length >=' + min2);
  }
}
function clean2(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView2(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
  return word << shift | word >>> 32 - shift >>> 0;
}
var isLE2 = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var hasHexBuiltin2 = (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
var hexes2 = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function createHasher(hashCons, info = {}) {
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
function randomBytes2(bytesLength = 32) {
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  if (typeof cr?.getRandomValues !== "function")
    throw new Error("crypto.getRandomValues must be defined");
  return cr.getRandomValues(new Uint8Array(bytesLength));
}
var oidNist = (suffix) => ({
  oid: Uint8Array.from([6, 9, 96, 134, 72, 1, 101, 3, 4, 2, suffix])
});

// node_modules/@noble/hashes/_md.js
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class {
  blockLen;
  outputLen;
  padOffset;
  isLE;
  // For partial updates less than block size
  buffer;
  view;
  finished = false;
  length = 0;
  pos = 0;
  destroyed = false;
  constructor(blockLen, outputLen, padOffset, isLE3) {
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE3;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView2(this.buffer);
  }
  update(data) {
    aexists2(this);
    abytes2(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView2 = createView2(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView2, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists2(this);
    aoutput2(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE3 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean2(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    view.setBigUint64(blockLen - 8, BigInt(this.length * 8), isLE3);
    this.process(view, 0);
    const oview = createView2(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen must be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE3);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to ||= new this.constructor();
    to.set(...this.get());
    const { blockLen, buffer, length: length2, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length2;
    to.pos = pos;
    if (length2 % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA224_IV = Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
var SHA384_IV = Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
var SHA512_IV = Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/@noble/hashes/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/@noble/hashes/sha2.js
var SHA256_K = Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = new Uint32Array(64);
var SHA2_32B = class extends HashMD {
  constructor(outputLen) {
    super(64, outputLen, 8, false);
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean2(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var _SHA256 = class extends SHA2_32B {
  // We cannot use array here since array allows indexing by variable
  // which means optimizer/compiler cannot use registers.
  A = SHA256_IV[0] | 0;
  B = SHA256_IV[1] | 0;
  C = SHA256_IV[2] | 0;
  D = SHA256_IV[3] | 0;
  E = SHA256_IV[4] | 0;
  F = SHA256_IV[5] | 0;
  G = SHA256_IV[6] | 0;
  H = SHA256_IV[7] | 0;
  constructor() {
    super(32);
  }
};
var _SHA224 = class extends SHA2_32B {
  A = SHA224_IV[0] | 0;
  B = SHA224_IV[1] | 0;
  C = SHA224_IV[2] | 0;
  D = SHA224_IV[3] | 0;
  E = SHA224_IV[4] | 0;
  F = SHA224_IV[5] | 0;
  G = SHA224_IV[6] | 0;
  H = SHA224_IV[7] | 0;
  constructor() {
    super(28);
  }
};
var K512 = (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_Kh = (() => K512[0])();
var SHA512_Kl = (() => K512[1])();
var SHA512_W_H = new Uint32Array(80);
var SHA512_W_L = new Uint32Array(80);
var SHA2_64B = class extends HashMD {
  constructor(outputLen) {
    super(128, outputLen, 16, false);
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean2(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean2(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var _SHA512 = class extends SHA2_64B {
  Ah = SHA512_IV[0] | 0;
  Al = SHA512_IV[1] | 0;
  Bh = SHA512_IV[2] | 0;
  Bl = SHA512_IV[3] | 0;
  Ch = SHA512_IV[4] | 0;
  Cl = SHA512_IV[5] | 0;
  Dh = SHA512_IV[6] | 0;
  Dl = SHA512_IV[7] | 0;
  Eh = SHA512_IV[8] | 0;
  El = SHA512_IV[9] | 0;
  Fh = SHA512_IV[10] | 0;
  Fl = SHA512_IV[11] | 0;
  Gh = SHA512_IV[12] | 0;
  Gl = SHA512_IV[13] | 0;
  Hh = SHA512_IV[14] | 0;
  Hl = SHA512_IV[15] | 0;
  constructor() {
    super(64);
  }
};
var _SHA384 = class extends SHA2_64B {
  Ah = SHA384_IV[0] | 0;
  Al = SHA384_IV[1] | 0;
  Bh = SHA384_IV[2] | 0;
  Bl = SHA384_IV[3] | 0;
  Ch = SHA384_IV[4] | 0;
  Cl = SHA384_IV[5] | 0;
  Dh = SHA384_IV[6] | 0;
  Dl = SHA384_IV[7] | 0;
  Eh = SHA384_IV[8] | 0;
  El = SHA384_IV[9] | 0;
  Fh = SHA384_IV[10] | 0;
  Fl = SHA384_IV[11] | 0;
  Gh = SHA384_IV[12] | 0;
  Gl = SHA384_IV[13] | 0;
  Hh = SHA384_IV[14] | 0;
  Hl = SHA384_IV[15] | 0;
  constructor() {
    super(48);
  }
};
var T224_IV = Uint32Array.from([
  2352822216,
  424955298,
  1944164710,
  2312950998,
  502970286,
  855612546,
  1738396948,
  1479516111,
  258812777,
  2077511080,
  2011393907,
  79989058,
  1067287976,
  1780299464,
  286451373,
  2446758561
]);
var T256_IV = Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var _SHA512_224 = class extends SHA2_64B {
  Ah = T224_IV[0] | 0;
  Al = T224_IV[1] | 0;
  Bh = T224_IV[2] | 0;
  Bl = T224_IV[3] | 0;
  Ch = T224_IV[4] | 0;
  Cl = T224_IV[5] | 0;
  Dh = T224_IV[6] | 0;
  Dl = T224_IV[7] | 0;
  Eh = T224_IV[8] | 0;
  El = T224_IV[9] | 0;
  Fh = T224_IV[10] | 0;
  Fl = T224_IV[11] | 0;
  Gh = T224_IV[12] | 0;
  Gl = T224_IV[13] | 0;
  Hh = T224_IV[14] | 0;
  Hl = T224_IV[15] | 0;
  constructor() {
    super(28);
  }
};
var _SHA512_256 = class extends SHA2_64B {
  Ah = T256_IV[0] | 0;
  Al = T256_IV[1] | 0;
  Bh = T256_IV[2] | 0;
  Bl = T256_IV[3] | 0;
  Ch = T256_IV[4] | 0;
  Cl = T256_IV[5] | 0;
  Dh = T256_IV[6] | 0;
  Dl = T256_IV[7] | 0;
  Eh = T256_IV[8] | 0;
  El = T256_IV[9] | 0;
  Fh = T256_IV[10] | 0;
  Fl = T256_IV[11] | 0;
  Gh = T256_IV[12] | 0;
  Gl = T256_IV[13] | 0;
  Hh = T256_IV[14] | 0;
  Hl = T256_IV[15] | 0;
  constructor() {
    super(32);
  }
};
var sha256 = createHasher(
  () => new _SHA256(),
  oidNist(1)
);
var sha224 = createHasher(
  () => new _SHA224(),
  oidNist(4)
);
var sha512 = createHasher(
  () => new _SHA512(),
  oidNist(3)
);
var sha384 = createHasher(
  () => new _SHA384(),
  oidNist(2)
);
var sha512_256 = createHasher(
  () => new _SHA512_256(),
  oidNist(6)
);
var sha512_224 = createHasher(
  () => new _SHA512_224(),
  oidNist(5)
);

// node_modules/@noble/hashes/hmac.js
var _HMAC = class {
  oHash;
  iHash;
  blockLen;
  outputLen;
  finished = false;
  destroyed = false;
  constructor(hash, key) {
    ahash(hash);
    abytes2(key, void 0, "key");
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean2(pad);
  }
  update(buf) {
    aexists2(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists2(this);
    abytes2(out, this.outputLen, "output");
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to ||= Object.create(Object.getPrototypeOf(this), {});
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new _HMAC(hash, key).update(message).digest();
hmac.create = (hash, key) => new _HMAC(hash, key);

// node_modules/@noble/hashes/webcrypto.js
function _subtle() {
  const cr = typeof globalThis === "object" ? globalThis.crypto : null;
  const sb = cr?.subtle;
  if (typeof sb === "object" && sb != null)
    return sb;
  throw new Error("crypto.subtle must be defined");
}
function createWebHash(name, blockLen, outputLen) {
  const hashC = async (msg) => {
    abytes2(msg);
    const crypto2 = _subtle();
    return new Uint8Array(await crypto2.digest(name, msg));
  };
  hashC.webCryptoName = name;
  hashC.outputLen = outputLen;
  hashC.blockLen = blockLen;
  hashC.create = () => {
    throw new Error("not implemented");
  };
  return hashC;
}
function ahashWeb(hash) {
  ahash(hash);
  if (typeof hash.webCryptoName !== "string")
    throw new Error("non-web hash");
}
var sha2562 = createWebHash("SHA-256", 64, 32);
var sha3842 = createWebHash("SHA-384", 128, 48);
var sha5122 = createWebHash("SHA-512", 128, 64);
var hmac2 = (() => {
  const hmac_ = async (hash, key, message) => {
    const crypto2 = _subtle();
    abytes2(key, void 0, "key");
    abytes2(message, void 0, "message");
    ahashWeb(hash);
    const wkey = await crypto2.importKey("raw", key, { name: "HMAC", hash: hash.webCryptoName }, false, ["sign"]);
    return new Uint8Array(await crypto2.sign("HMAC", wkey, message));
  };
  hmac_.create = (_hash, _key) => {
    throw new Error("not implemented");
  };
  return hmac_;
})();

// node_modules/@scure/base/index.js
function isBytes3(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes3(b) {
  if (!isBytes3(b))
    throw new Error("Uint8Array expected");
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new Error("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber3(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
function chain(...args) {
  const id2 = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode2 = args.map((x) => x.encode).reduceRight(wrap, id2);
  const decode2 = args.map((x) => x.decode).reduce(wrap, id2);
  return { encode: encode2, decode: decode2 };
}
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i) => [l, i]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i) => {
        if (!Number.isSafeInteger(i) || i < 0 || i >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
        return lettersA[i];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i = indexes.get(letter);
        if (i === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i;
      });
    }
  };
}
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from) => {
      astrArr("join.decode", from);
      return from.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
function padding(bits, chr = "=") {
  anumber3(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
function normalize(fn) {
  afn(fn);
  return { encode: (from) => from, decode: (to) => fn(to) };
}
function convertRadix(data, from, to) {
  if (from < 2)
    throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
  if (to < 2)
    throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d) => {
    anumber3(d);
    if (d < 0 || d >= from)
      throw new Error(`invalid integer: ${d}`);
    return d;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i = pos; i < dlen; i++) {
      const digit = digits[i];
      const fromCarry = from * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to;
      carry = digitBase % to;
      const rounded = Math.floor(div);
      digits[i] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
    res.push(0);
  return res.reverse();
}
var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
var radix2carry = (from, to) => from + (to - gcd(from, to));
var powers = (() => {
  let res = [];
  for (let i = 0; i < 40; i++)
    res.push(2 ** i);
  return res;
})();
function convertRadix2(data, from, to, padding2) {
  aArr(data);
  if (from <= 0 || from > 32)
    throw new Error(`convertRadix2: wrong from=${from}`);
  if (to <= 0 || to > 32)
    throw new Error(`convertRadix2: wrong to=${to}`);
  if (radix2carry(from, to) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
  }
  let carry = 0;
  let pos = 0;
  const max2 = powers[from];
  const mask = powers[to] - 1;
  const res = [];
  for (const n of data) {
    anumber3(n);
    if (n >= max2)
      throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
    carry = carry << from | n;
    if (pos + from > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
    pos += from;
    for (; pos >= to; pos -= to)
      res.push((carry >> pos - to & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to - pos & mask;
  if (!padding2 && pos >= from)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
function radix(num) {
  anumber3(num);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes3(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num, _256));
    }
  };
}
function radix2(bits, revPadding = false) {
  anumber3(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes3(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
function checksum(len, fn) {
  anumber3(len);
  afn(fn);
  return {
    encode(data) {
      if (!isBytes3(data))
        throw new Error("checksum.encode: input should be Uint8Array");
      const sum = fn(data).slice(0, len);
      const res = new Uint8Array(data.length + len);
      res.set(data);
      res.set(sum, data.length);
      return res;
    },
    decode(data) {
      if (!isBytes3(data))
        throw new Error("checksum.decode: input should be Uint8Array");
      const payload = data.slice(0, -len);
      const oldChecksum = data.slice(-len);
      const newChecksum = fn(payload).slice(0, len);
      for (let i = 0; i < len; i++)
        if (newChecksum[i] !== oldChecksum[i])
          throw new Error("Invalid checksum");
      return payload;
    }
  };
}
var utils = {
  alphabet,
  chain,
  checksum,
  convertRadix,
  convertRadix2,
  radix,
  radix2,
  join,
  padding
};
var base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
var base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
var base32nopad = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), join(""));
var base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
var base32hexnopad = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), join(""));
var base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
var hasBase64Builtin = (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
var decodeBase64Builtin = (s, isUrl) => {
  astr("base64", s);
  const re = isUrl ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/;
  const alphabet2 = isUrl ? "base64url" : "base64";
  if (s.length > 0 && !re.test(s))
    throw new Error("invalid base64");
  return Uint8Array.fromBase64(s, { alphabet: alphabet2, lastChunkHandling: "strict" });
};
var base64 = hasBase64Builtin ? {
  encode(b) {
    abytes3(b);
    return b.toBase64();
  },
  decode(s) {
    return decodeBase64Builtin(s, false);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
var base64nopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), join(""));
var base64url = hasBase64Builtin ? {
  encode(b) {
    abytes3(b);
    return b.toBase64({ alphabet: "base64url" });
  },
  decode(s) {
    return decodeBase64Builtin(s, true);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
var base64urlnopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), join(""));
var genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
var base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
var base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
var BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
    if ((b >> i & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i = 0; i < len; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i = 0; i < len; i++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i = 0; i < 6; i++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
}
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = radix2(5);
  const fromWords = _words.decode;
  const toWords = _words.encode;
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode2(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (isBytes3(words))
      words = Array.from(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
  }
  function decode2(str, limit = 90) {
    astr("bech32.decode input", str);
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered && str !== str.toUpperCase())
      throw new Error(`String must be lowercase or uppercase`);
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`Letter "1" must be present between prefix and data only`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const words = BECH_ALPHABET.decode(data).slice(0, -6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode2);
  function decodeToBytes(str) {
    const { prefix, words } = decode2(str, false);
    return { prefix, words, bytes: fromWords(words) };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode2(prefix, toWords(bytes));
  }
  return {
    encode: encode2,
    decode: decode2,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
var bech32 = genBech32("bech32");
var bech32m = genBech32("bech32m");
var hasHexBuiltin3 = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
var hexBuiltin = {
  encode(data) {
    abytes3(data);
    return data.toHex();
  },
  decode(s) {
    astr("hex", s);
    return Uint8Array.fromHex(s);
  }
};
var hex = hasHexBuiltin3 ? hexBuiltin : chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
  if (typeof s !== "string" || s.length % 2 !== 0)
    throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
  return s.toLowerCase();
}));

// node_modules/@scure/bip39/index.js
var isJapanese = (wordlist2) => wordlist2[0] === "あいこくしん";
function nfkd(str) {
  if (typeof str !== "string")
    throw new TypeError("invalid mnemonic type: " + typeof str);
  return str.normalize("NFKD");
}
function normalize2(str) {
  const norm = nfkd(str);
  const words = norm.split(" ");
  if (![12, 15, 18, 21, 24].includes(words.length))
    throw new Error("Invalid mnemonic");
  return { nfkd: norm, words };
}
function aentropy(ent) {
  abytes2(ent);
  if (![16, 20, 24, 28, 32].includes(ent.length))
    throw new Error("invalid entropy length");
}
var calcChecksum = (entropy) => {
  const bitsLeft = 8 - entropy.length / 4;
  return new Uint8Array([sha256(entropy)[0] >> bitsLeft << bitsLeft]);
};
function getCoder(wordlist2) {
  if (!Array.isArray(wordlist2) || wordlist2.length !== 2048 || typeof wordlist2[0] !== "string")
    throw new Error("Wordlist: expected array of 2048 strings");
  wordlist2.forEach((i) => {
    if (typeof i !== "string")
      throw new Error("wordlist: non-string element: " + i);
  });
  return utils.chain(utils.checksum(1, calcChecksum), utils.radix2(11, true), utils.alphabet(wordlist2));
}
function mnemonicToEntropy(mnemonic, wordlist2) {
  const { words } = normalize2(mnemonic);
  const entropy = getCoder(wordlist2).decode(words);
  aentropy(entropy);
  return entropy;
}
function entropyToMnemonic(entropy, wordlist2) {
  aentropy(entropy);
  const words = getCoder(wordlist2).encode(entropy);
  return words.join(isJapanese(wordlist2) ? "　" : " ");
}
function validateMnemonic(mnemonic, wordlist2) {
  try {
    mnemonicToEntropy(mnemonic, wordlist2);
  } catch (e) {
    return false;
  }
  return true;
}

// node_modules/@scure/bip39/wordlists/english.js
var wordlist = `abandon
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
zoo`.split("\n");

// node_modules/msgpackr/unpack.js
var decoder;
try {
  decoder = new TextDecoder();
} catch (error) {
}
var src;
var srcEnd;
var position = 0;
var EMPTY_ARRAY = [];
var strings = EMPTY_ARRAY;
var stringPosition = 0;
var currentUnpackr = {};
var currentStructures;
var srcString;
var srcStringStart = 0;
var srcStringEnd = 0;
var bundledStrings;
var referenceMap;
var currentExtensions = [];
var dataView;
var defaultOptions = {
  useRecords: false,
  mapsAsObjects: true
};
var C1Type = class {
};
var C1 = new C1Type();
C1.name = "MessagePack 0xC1";
var sequentialMode = false;
var inlineObjectReadThreshold = 2;
var readStruct;
var onLoadedStructures;
var onSaveState;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold = Infinity;
}
var Unpackr = class _Unpackr {
  constructor(options) {
    if (options) {
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.sequential && options.trusted !== false) {
        options.trusted = true;
        if (!options.structures && options.useRecords != false) {
          options.structures = [];
          if (!options.maxSharedStructures)
            options.maxSharedStructures = 0;
        }
      }
      if (options.structures)
        options.structures.sharedLength = options.structures.length;
      else if (options.getStructures) {
        (options.structures = []).uninitialized = true;
        options.structures.sharedLength = 0;
      }
      if (options.int64AsNumber) {
        options.int64AsType = "number";
      }
    }
    Object.assign(this, options);
  }
  unpack(source, options) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.unpack(source, options) : _Unpackr.prototype.unpack.call(defaultOptions, source, options);
      });
    }
    if (!source.buffer && source.constructor === ArrayBuffer)
      source = typeof Buffer !== "undefined" ? Buffer.from(source) : new Uint8Array(source);
    if (typeof options === "object") {
      srcEnd = options.end || source.length;
      position = options.start || 0;
    } else {
      position = 0;
      srcEnd = options > -1 ? options : source.length;
    }
    stringPosition = 0;
    srcStringEnd = 0;
    srcString = null;
    strings = EMPTY_ARRAY;
    bundledStrings = null;
    src = source;
    try {
      dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof _Unpackr) {
      currentUnpackr = this;
      if (this.structures) {
        currentStructures = this.structures;
        return checkedRead(options);
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentUnpackr = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
    }
    return checkedRead(options);
  }
  unpackMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      sequentialMode = true;
      let size = source.length;
      let value = this ? this.unpack(source, size) : defaultUnpackr.unpack(source, size);
      if (forEach) {
        if (forEach(value, lastPosition, position) === false) return;
        while (position < size) {
          lastPosition = position;
          if (forEach(checkedRead(), lastPosition, position) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position < size) {
          lastPosition = position;
          values.push(checkedRead());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
      throw error;
    } finally {
      sequentialMode = false;
      clearSource();
    }
  }
  _mergeStructures(loadedStructures, existingStructures) {
    if (onLoadedStructures)
      loadedStructures = onLoadedStructures.call(this, loadedStructures);
    loadedStructures = loadedStructures || [];
    if (Object.isFrozen(loadedStructures))
      loadedStructures = loadedStructures.map((structure) => structure.slice(0));
    for (let i = 0, l = loadedStructures.length; i < l; i++) {
      let structure = loadedStructures[i];
      if (structure) {
        structure.isShared = true;
        if (i >= 32)
          structure.highByte = i - 32 >> 5;
      }
    }
    loadedStructures.sharedLength = loadedStructures.length;
    for (let id2 in existingStructures || []) {
      if (id2 >= 0) {
        let structure = loadedStructures[id2];
        let existing = existingStructures[id2];
        if (existing) {
          if (structure)
            (loadedStructures.restoreStructures || (loadedStructures.restoreStructures = []))[id2] = structure;
          loadedStructures[id2] = existing;
        }
      }
    }
    return this.structures = loadedStructures;
  }
  decode(source, options) {
    return this.unpack(source, options);
  }
};
function checkedRead(options) {
  try {
    if (!currentUnpackr.trusted && !sequentialMode) {
      let sharedLength = currentStructures.sharedLength || 0;
      if (sharedLength < currentStructures.length)
        currentStructures.length = sharedLength;
    }
    let result;
    if (currentUnpackr.randomAccessStructure && src[position] < 64 && src[position] >= 32 && readStruct) {
      result = readStruct(src, position, srcEnd, currentUnpackr);
      src = null;
      if (!(options && options.lazy) && result)
        result = result.toJSON();
      position = srcEnd;
    } else
      result = read();
    if (bundledStrings) {
      position = bundledStrings.postBundlePosition;
      bundledStrings = null;
    }
    if (sequentialMode)
      currentStructures.restoreStructures = null;
    if (position == srcEnd) {
      if (currentStructures && currentStructures.restoreStructures)
        restoreStructures();
      currentStructures = null;
      src = null;
      if (referenceMap)
        referenceMap = null;
    } else if (position > srcEnd) {
      throw new Error("Unexpected end of MessagePack data");
    } else if (!sequentialMode) {
      let jsonView;
      try {
        jsonView = JSON.stringify(result, (_, value) => typeof value === "bigint" ? `${value}n` : value).slice(0, 100);
      } catch (error) {
        jsonView = "(JSON view not available " + error + ")";
      }
      throw new Error("Data read, but end of buffer not reached " + jsonView);
    }
    return result;
  } catch (error) {
    if (currentStructures && currentStructures.restoreStructures)
      restoreStructures();
    clearSource();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer") || position > srcEnd) {
      error.incomplete = true;
    }
    throw error;
  }
}
function restoreStructures() {
  for (let id2 in currentStructures.restoreStructures) {
    currentStructures[id2] = currentStructures.restoreStructures[id2];
  }
  currentStructures.restoreStructures = null;
}
function read() {
  let token = src[position++];
  if (token < 160) {
    if (token < 128) {
      if (token < 64)
        return token;
      else {
        let structure = currentStructures[token & 63] || currentUnpackr.getStructures && loadStructures()[token & 63];
        if (structure) {
          if (!structure.read) {
            structure.read = createStructureReader(structure, token & 63);
          }
          return structure.read();
        } else
          return token;
      }
    } else if (token < 144) {
      token -= 128;
      if (currentUnpackr.mapsAsObjects) {
        let object2 = {};
        for (let i = 0; i < token; i++) {
          let key = readKey();
          if (key === "__proto__")
            key = "__proto_";
          object2[key] = read();
        }
        return object2;
      } else {
        let map = /* @__PURE__ */ new Map();
        for (let i = 0; i < token; i++) {
          map.set(read(), read());
        }
        return map;
      }
    } else {
      token -= 144;
      let array2 = new Array(token);
      for (let i = 0; i < token; i++) {
        array2[i] = read();
      }
      if (currentUnpackr.freezeData)
        return Object.freeze(array2);
      return array2;
    }
  } else if (token < 192) {
    let length2 = token - 160;
    if (srcStringEnd >= position) {
      return srcString.slice(position - srcStringStart, (position += length2) - srcStringStart);
    }
    if (srcStringEnd == 0 && srcEnd < 140) {
      let string = length2 < 16 ? shortStringInJS(length2) : longStringInJS(length2);
      if (string != null)
        return string;
    }
    return readFixedString(length2);
  } else {
    let value;
    switch (token) {
      case 192:
        return null;
      case 193:
        if (bundledStrings) {
          value = read();
          if (value > 0)
            return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value);
          else
            return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 -= value);
        }
        return C1;
      // "never-used", return special object to denote that
      case 194:
        return false;
      case 195:
        return true;
      case 196:
        value = src[position++];
        if (value === void 0)
          throw new Error("Unexpected end of buffer");
        return readBin(value);
      case 197:
        value = dataView.getUint16(position);
        position += 2;
        return readBin(value);
      case 198:
        value = dataView.getUint32(position);
        position += 4;
        return readBin(value);
      case 199:
        return readExt(src[position++]);
      case 200:
        value = dataView.getUint16(position);
        position += 2;
        return readExt(value);
      case 201:
        value = dataView.getUint32(position);
        position += 4;
        return readExt(value);
      case 202:
        value = dataView.getFloat32(position);
        if (currentUnpackr.useFloat32 > 2) {
          let multiplier = mult10[(src[position] & 127) << 1 | src[position + 1] >> 7];
          position += 4;
          return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
        }
        position += 4;
        return value;
      case 203:
        value = dataView.getFloat64(position);
        position += 8;
        return value;
      // uint handlers
      case 204:
        return src[position++];
      case 205:
        value = dataView.getUint16(position);
        position += 2;
        return value;
      case 206:
        value = dataView.getUint32(position);
        position += 4;
        return value;
      case 207:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getUint32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigUint64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigUint64(position);
          if (value <= BigInt(2) << BigInt(52)) value = Number(value);
        } else
          value = dataView.getBigUint64(position);
        position += 8;
        return value;
      // int handlers
      case 208:
        return dataView.getInt8(position++);
      case 209:
        value = dataView.getInt16(position);
        position += 2;
        return value;
      case 210:
        value = dataView.getInt32(position);
        position += 4;
        return value;
      case 211:
        if (currentUnpackr.int64AsType === "number") {
          value = dataView.getInt32(position) * 4294967296;
          value += dataView.getUint32(position + 4);
        } else if (currentUnpackr.int64AsType === "string") {
          value = dataView.getBigInt64(position).toString();
        } else if (currentUnpackr.int64AsType === "auto") {
          value = dataView.getBigInt64(position);
          if (value >= BigInt(-2) << BigInt(52) && value <= BigInt(2) << BigInt(52)) value = Number(value);
        } else
          value = dataView.getBigInt64(position);
        position += 8;
        return value;
      case 212:
        value = src[position++];
        if (value == 114) {
          return recordDefinition(src[position++] & 63);
        } else {
          let extension = currentExtensions[value];
          if (extension) {
            if (extension.read) {
              position++;
              return extension.read(read());
            } else if (extension.noBuffer) {
              position++;
              return extension();
            } else
              return extension(src.subarray(position, ++position));
          } else
            throw new Error("Unknown extension " + value);
        }
      case 213:
        value = src[position];
        if (value == 114) {
          position++;
          return recordDefinition(src[position++] & 63, src[position++]);
        } else
          return readExt(2);
      case 214:
        return readExt(4);
      case 215:
        return readExt(8);
      case 216:
        return readExt(16);
      case 217:
        value = src[position++];
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString8(value);
      case 218:
        value = dataView.getUint16(position);
        position += 2;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString16(value);
      case 219:
        value = dataView.getUint32(position);
        position += 4;
        if (srcStringEnd >= position) {
          return srcString.slice(position - srcStringStart, (position += value) - srcStringStart);
        }
        return readString32(value);
      case 220:
        value = dataView.getUint16(position);
        position += 2;
        return readArray(value);
      case 221:
        value = dataView.getUint32(position);
        position += 4;
        return readArray(value);
      case 222:
        value = dataView.getUint16(position);
        position += 2;
        return readMap(value);
      case 223:
        value = dataView.getUint32(position);
        position += 4;
        return readMap(value);
      default:
        if (token >= 224)
          return token - 256;
        if (token === void 0) {
          let error = new Error("Unexpected end of MessagePack data");
          error.incomplete = true;
          throw error;
        }
        throw new Error("Unknown MessagePack token " + token);
    }
  }
}
var validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader(structure, firstId) {
  function readObject() {
    if (readObject.count++ > inlineObjectReadThreshold) {
      let readObject2 = structure.read = new Function("r", "return function(){return " + (currentUnpackr.freezeData ? "Object.freeze" : "") + "({" + structure.map((key) => key === "__proto__" ? "__proto_:r()" : validName.test(key) ? key + ":r()" : "[" + JSON.stringify(key) + "]:r()").join(",") + "})}")(read);
      if (structure.highByte === 0)
        structure.read = createSecondByteReader(firstId, structure.read);
      return readObject2();
    }
    let object2 = {};
    for (let i = 0, l = structure.length; i < l; i++) {
      let key = structure[i];
      if (key === "__proto__")
        key = "__proto_";
      object2[key] = read();
    }
    if (currentUnpackr.freezeData)
      return Object.freeze(object2);
    return object2;
  }
  readObject.count = 0;
  if (structure.highByte === 0) {
    return createSecondByteReader(firstId, readObject);
  }
  return readObject;
}
var createSecondByteReader = (firstId, read0) => {
  return function() {
    let highByte = src[position++];
    if (highByte === 0)
      return read0();
    let id2 = firstId < 32 ? -(firstId + (highByte << 5)) : firstId + (highByte << 5);
    let structure = currentStructures[id2] || loadStructures()[id2];
    if (!structure) {
      throw new Error("Record id is not defined for " + id2);
    }
    if (!structure.read)
      structure.read = createStructureReader(structure, firstId);
    return structure.read();
  };
};
function loadStructures() {
  let loadedStructures = saveState(() => {
    src = null;
    return currentUnpackr.getStructures();
  });
  return currentStructures = currentUnpackr._mergeStructures(loadedStructures, currentStructures);
}
var readFixedString = readStringJS;
var readString8 = readStringJS;
var readString16 = readStringJS;
var readString32 = readStringJS;
function readStringJS(length2) {
  let result;
  if (length2 < 16) {
    if (result = shortStringInJS(length2))
      return result;
  }
  if (length2 > 64 && decoder)
    return decoder.decode(src.subarray(position, position += length2));
  const end = position + length2;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
function readArray(length2) {
  let array2 = new Array(length2);
  for (let i = 0; i < length2; i++) {
    array2[i] = read();
  }
  if (currentUnpackr.freezeData)
    return Object.freeze(array2);
  return array2;
}
function readMap(length2) {
  if (currentUnpackr.mapsAsObjects) {
    let object2 = {};
    for (let i = 0; i < length2; i++) {
      let key = readKey();
      if (key === "__proto__")
        key = "__proto_";
      object2[key] = read();
    }
    return object2;
  } else {
    let map = /* @__PURE__ */ new Map();
    for (let i = 0; i < length2; i++) {
      map.set(read(), read());
    }
    return map;
  }
}
var fromCharCode = String.fromCharCode;
function longStringInJS(length2) {
  let start = position;
  let bytes = new Array(length2);
  for (let i = 0; i < length2; i++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length2) {
  if (length2 < 4) {
    if (length2 < 2) {
      if (length2 === 0)
        return "";
      else {
        let a = src[position++];
        if ((a & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a);
      }
    } else {
      let a = src[position++];
      let b = src[position++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length2 < 3)
        return fromCharCode(a, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b, c);
    }
  } else {
    let a = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length2 < 6) {
      if (length2 === 4)
        return fromCharCode(a, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b, c, d, e);
      }
    } else if (length2 < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length2 < 7)
        return fromCharCode(a, b, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b, c, d, e, f, g);
    } else {
      let e = src[position++];
      let f = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length2 < 10) {
        if (length2 === 8)
          return fromCharCode(a, b, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i);
        }
      } else if (length2 < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length2 < 11)
          return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src[position++];
        let j = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length2 < 14) {
          if (length2 === 12)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length2 < 15)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readOnlyJSString() {
  let token = src[position++];
  let length2;
  if (token < 192) {
    length2 = token - 160;
  } else {
    switch (token) {
      case 217:
        length2 = src[position++];
        break;
      case 218:
        length2 = dataView.getUint16(position);
        position += 2;
        break;
      case 219:
        length2 = dataView.getUint32(position);
        position += 4;
        break;
      default:
        throw new Error("Expected string");
    }
  }
  return readStringJS(length2);
}
function readBin(length2) {
  return currentUnpackr.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(src, position, position += length2)
  ) : src.subarray(position, position += length2);
}
function readExt(length2) {
  let type = src[position++];
  if (currentExtensions[type]) {
    let end;
    return currentExtensions[type](src.subarray(position, end = position += length2), (readPosition) => {
      position = readPosition;
      try {
        return read();
      } finally {
        position = end;
      }
    });
  } else
    throw new Error("Unknown extension type " + type);
}
var keyCache = new Array(4096);
function readKey() {
  let length2 = src[position++];
  if (length2 >= 160 && length2 < 192) {
    length2 = length2 - 160;
    if (srcStringEnd >= position)
      return srcString.slice(position - srcStringStart, (position += length2) - srcStringStart);
    else if (!(srcStringEnd == 0 && srcEnd < 180))
      return readFixedString(length2);
  } else {
    position--;
    return asSafeString(read());
  }
  let key = (length2 << 5 ^ (length2 > 1 ? dataView.getUint16(position) : length2 > 0 ? src[position] : 0)) & 4095;
  let entry = keyCache[key];
  let checkPosition = position;
  let end = position + length2 - 3;
  let chunk;
  let i = 0;
  if (entry && entry.bytes == length2) {
    while (checkPosition < end) {
      chunk = dataView.getUint32(checkPosition);
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
      checkPosition += 4;
    }
    end += 3;
    while (checkPosition < end) {
      chunk = src[checkPosition++];
      if (chunk != entry[i++]) {
        checkPosition = 1879048192;
        break;
      }
    }
    if (checkPosition === end) {
      position = checkPosition;
      return entry.string;
    }
    end -= 3;
    checkPosition = position;
  }
  entry = [];
  keyCache[key] = entry;
  entry.bytes = length2;
  while (checkPosition < end) {
    chunk = dataView.getUint32(checkPosition);
    entry.push(chunk);
    checkPosition += 4;
  }
  end += 3;
  while (checkPosition < end) {
    chunk = src[checkPosition++];
    entry.push(chunk);
  }
  let string = length2 < 16 ? shortStringInJS(length2) : longStringInJS(length2);
  if (string != null)
    return entry.string = string;
  return entry.string = readFixedString(length2);
}
function asSafeString(property) {
  if (typeof property === "string") return property;
  if (typeof property === "number" || typeof property === "boolean" || typeof property === "bigint") return property.toString();
  if (property == null) return property + "";
  if (currentUnpackr.allowArraysInMapKeys && Array.isArray(property) && property.flat().every((item) => ["string", "number", "boolean", "bigint"].includes(typeof item))) {
    return property.flat().toString();
  }
  throw new Error(`Invalid property type for record: ${typeof property}`);
}
var recordDefinition = (id2, highByte) => {
  let structure = read().map(asSafeString);
  let firstByte = id2;
  if (highByte !== void 0) {
    id2 = id2 < 32 ? -((highByte << 5) + id2) : (highByte << 5) + id2;
    structure.highByte = highByte;
  }
  let existingStructure = currentStructures[id2];
  if (existingStructure && (existingStructure.isShared || sequentialMode)) {
    (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id2] = existingStructure;
  }
  currentStructures[id2] = structure;
  structure.read = createStructureReader(structure, firstByte);
  return structure.read();
};
currentExtensions[0] = () => {
};
currentExtensions[0].noBuffer = true;
currentExtensions[66] = (data) => {
  let headLength = data.byteLength % 8 || 8;
  let head = BigInt(data[0] & 128 ? data[0] - 256 : data[0]);
  for (let i = 1; i < headLength; i++) {
    head <<= BigInt(8);
    head += BigInt(data[i]);
  }
  if (data.byteLength !== headLength) {
    let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    let decode2 = (start, end) => {
      let length2 = end - start;
      if (length2 <= 40) {
        let out = view.getBigUint64(start);
        for (let i = start + 8; i < end; i += 8) {
          out <<= BigInt(64n);
          out |= view.getBigUint64(i);
        }
        return out;
      }
      let middle = start + (length2 >> 4 << 3);
      let left = decode2(start, middle);
      let right = decode2(middle, end);
      return left << BigInt((end - middle) * 8) | right;
    };
    head = head << BigInt((view.byteLength - headLength) * 8) | decode2(headLength, view.byteLength);
  }
  return head;
};
var errors = {
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  AggregateError: typeof AggregateError === "function" ? AggregateError : null
};
currentExtensions[101] = () => {
  let data = read();
  if (!errors[data[0]]) {
    let error = Error(data[1], { cause: data[2] });
    error.name = data[0];
    return error;
  }
  return errors[data[0]](data[1], { cause: data[2] });
};
currentExtensions[105] = (data) => {
  if (currentUnpackr.structuredClone === false) throw new Error("Structured clone extension is disabled");
  let id2 = dataView.getUint32(position - 4);
  if (!referenceMap)
    referenceMap = /* @__PURE__ */ new Map();
  let token = src[position];
  let target2;
  if (token >= 144 && token < 160 || token == 220 || token == 221)
    target2 = [];
  else if (token >= 128 && token < 144 || token == 222 || token == 223)
    target2 = /* @__PURE__ */ new Map();
  else if ((token >= 199 && token <= 201 || token >= 212 && token <= 216) && src[position + 1] === 115)
    target2 = /* @__PURE__ */ new Set();
  else
    target2 = {};
  let refEntry = { target: target2 };
  referenceMap.set(id2, refEntry);
  let targetProperties = read();
  if (!refEntry.used) {
    return refEntry.target = targetProperties;
  } else {
    Object.assign(target2, targetProperties);
  }
  if (target2 instanceof Map)
    for (let [k, v] of targetProperties.entries()) target2.set(k, v);
  if (target2 instanceof Set)
    for (let i of Array.from(targetProperties)) target2.add(i);
  return target2;
};
currentExtensions[112] = (data) => {
  if (currentUnpackr.structuredClone === false) throw new Error("Structured clone extension is disabled");
  let id2 = dataView.getUint32(position - 4);
  let refEntry = referenceMap.get(id2);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions[115] = () => new Set(read());
var typedArrays = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map((type) => type + "Array");
var glbl = typeof globalThis === "object" ? globalThis : window;
currentExtensions[116] = (data) => {
  let typeCode = data[0];
  let buffer = Uint8Array.prototype.slice.call(data, 1).buffer;
  let typedArrayName = typedArrays[typeCode];
  if (!typedArrayName) {
    if (typeCode === 16) return buffer;
    if (typeCode === 17) return new DataView(buffer);
    throw new Error("Could not find typed array for code " + typeCode);
  }
  return new glbl[typedArrayName](buffer);
};
currentExtensions[120] = () => {
  let data = read();
  return new RegExp(data[0], data[1]);
};
var TEMP_BUNDLE = [];
currentExtensions[98] = (data) => {
  let dataSize = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
  let dataPosition = position;
  position += dataSize - data.length;
  bundledStrings = TEMP_BUNDLE;
  bundledStrings = [readOnlyJSString(), readOnlyJSString()];
  bundledStrings.position0 = 0;
  bundledStrings.position1 = 0;
  bundledStrings.postBundlePosition = position;
  position = dataPosition;
  return read();
};
currentExtensions[255] = (data) => {
  if (data.length == 4)
    return new Date((data[0] * 16777216 + (data[1] << 16) + (data[2] << 8) + data[3]) * 1e3);
  else if (data.length == 8)
    return new Date(
      ((data[0] << 22) + (data[1] << 14) + (data[2] << 6) + (data[3] >> 2)) / 1e6 + ((data[3] & 3) * 4294967296 + data[4] * 16777216 + (data[5] << 16) + (data[6] << 8) + data[7]) * 1e3
    );
  else if (data.length == 12)
    return new Date(
      ((data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3]) / 1e6 + ((data[4] & 128 ? -281474976710656 : 0) + data[6] * 1099511627776 + data[7] * 4294967296 + data[8] * 16777216 + (data[9] << 16) + (data[10] << 8) + data[11]) * 1e3
    );
  else
    return /* @__PURE__ */ new Date("invalid");
};
function saveState(callback) {
  if (onSaveState)
    onSaveState();
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedStructuresContents = currentStructures.slice(0, currentStructures.length);
  let savedPackr = currentUnpackr;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentStructures.splice(0, currentStructures.length, ...savedStructuresContents);
  currentUnpackr = savedPackr;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
var mult10 = new Array(147);
for (let i = 0; i < 256; i++) {
  mult10[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
}
var defaultUnpackr = new Unpackr({ useRecords: false });
var unpack = defaultUnpackr.unpack;
var unpackMultiple = defaultUnpackr.unpackMultiple;
var decode = defaultUnpackr.unpack;
var FLOAT32_OPTIONS = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};
var f32Array = new Float32Array(1);
var u8Array = new Uint8Array(f32Array.buffer, 0, 4);

// node_modules/msgpackr/pack.js
var textEncoder;
try {
  textEncoder = new TextEncoder();
} catch (error) {
}
var extensions;
var extensionClasses;
var hasNodeBuffer = typeof Buffer !== "undefined";
var ByteArrayAllocate = hasNodeBuffer ? function(length2) {
  return Buffer.allocUnsafeSlow(length2);
} : Uint8Array;
var ByteArray = hasNodeBuffer ? Buffer : Uint8Array;
var MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
var target;
var keysTarget;
var targetView;
var position2 = 0;
var safeEnd;
var bundledStrings2 = null;
var writeStructSlots;
var MAX_BUNDLE_SIZE = 21760;
var hasNonLatin = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL = Symbol("record-id");
var Packr = class extends Unpackr {
  constructor(options) {
    super(options);
    this.offset = 0;
    let typeBuffer;
    let start;
    let hasSharedUpdate;
    let structures;
    let referenceMap2;
    let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position3) {
      return target.utf8Write(string, position3, target.byteLength - position3);
    } : textEncoder && textEncoder.encodeInto ? function(string, position3) {
      return textEncoder.encodeInto(string, target.subarray(position3)).written;
    } : false;
    let packr2 = this;
    if (!options)
      options = {};
    let isSequential = options && options.sequential;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 32 : 0;
    if (maxSharedStructures > 8160)
      throw new Error("Maximum maxSharedStructure is 8160");
    if (options.structuredClone && options.moreTypes == void 0) {
      this.moreTypes = true;
    }
    let maxOwnStructures = options.maxOwnStructures;
    if (maxOwnStructures == null)
      maxOwnStructures = hasSharedStructures ? 32 : 64;
    if (!this.structures && options.useRecords != false)
      this.structures = [];
    let useTwoByteRecords = maxSharedStructures > 32 || maxOwnStructures + maxSharedStructures > 64;
    let sharedLimitId = maxSharedStructures + 64;
    let maxStructureId = maxSharedStructures + maxOwnStructures + 64;
    if (maxStructureId > 8256) {
      throw new Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.pack = this.encode = function(value, encodeOptions) {
      if (!target) {
        target = new ByteArrayAllocate(8192);
        targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, 8192));
        position2 = 0;
      }
      safeEnd = target.length - 10;
      if (safeEnd - position2 < 2048) {
        target = new ByteArrayAllocate(target.length);
        targetView = target.dataView || (target.dataView = new DataView(target.buffer, 0, target.length));
        safeEnd = target.length - 10;
        position2 = 0;
      } else
        position2 = position2 + 7 & 2147483640;
      start = position2;
      if (encodeOptions & RESERVE_START_SPACE) position2 += encodeOptions & 255;
      referenceMap2 = packr2.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (packr2.bundleStrings && typeof value !== "string") {
        bundledStrings2 = [];
        bundledStrings2.size = Infinity;
      } else
        bundledStrings2 = null;
      structures = packr2.structures;
      if (structures) {
        if (structures.uninitialized)
          structures = packr2._mergeStructures(packr2.getStructures());
        let sharedLength = structures.sharedLength || 0;
        if (sharedLength > maxSharedStructures) {
          throw new Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + structures.sharedLength);
        }
        if (!structures.transitions) {
          structures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < sharedLength; i++) {
            let keys = structures[i];
            if (!keys)
              continue;
            let nextTransition, transition = structures.transitions;
            for (let j = 0, l = keys.length; j < l; j++) {
              let key = keys[j];
              nextTransition = transition[key];
              if (!nextTransition) {
                nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL] = i + 64;
          }
          this.lastNamedStructuresLength = sharedLength;
        }
        if (!isSequential) {
          structures.nextId = sharedLength + 64;
        }
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      let encodingError;
      try {
        if (packr2.randomAccessStructure && value && value.constructor && value.constructor === Object)
          writeStruct(value);
        else
          pack2(value);
        let lastBundle = bundledStrings2;
        if (bundledStrings2)
          writeBundles(start, pack2, 0);
        if (referenceMap2 && referenceMap2.idsToInsert) {
          let idsToInsert = referenceMap2.idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1);
          let i = idsToInsert.length;
          let incrementPosition = -1;
          while (lastBundle && i > 0) {
            let insertionPoint = idsToInsert[--i].offset + start;
            if (insertionPoint < lastBundle.stringsPosition + start && incrementPosition === -1)
              incrementPosition = 0;
            if (insertionPoint > lastBundle.position + start) {
              if (incrementPosition >= 0)
                incrementPosition += 6;
            } else {
              if (incrementPosition >= 0) {
                targetView.setUint32(
                  lastBundle.position + start,
                  targetView.getUint32(lastBundle.position + start) + incrementPosition
                );
                incrementPosition = -1;
              }
              lastBundle = lastBundle.previous;
              i++;
            }
          }
          if (incrementPosition >= 0 && lastBundle) {
            targetView.setUint32(
              lastBundle.position + start,
              targetView.getUint32(lastBundle.position + start) + incrementPosition
            );
          }
          position2 += idsToInsert.length * 6;
          if (position2 > safeEnd)
            makeRoom(position2);
          packr2.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), idsToInsert);
          referenceMap2 = null;
          return serialized;
        }
        packr2.offset = position2;
        if (encodeOptions & REUSE_BUFFER_MODE) {
          target.start = start;
          target.end = position2;
          return target;
        }
        return target.subarray(start, position2);
      } catch (error) {
        encodingError = error;
        throw error;
      } finally {
        if (structures) {
          resetStructures();
          if (hasSharedUpdate && packr2.saveStructures) {
            let sharedLength = structures.sharedLength || 0;
            let returnBuffer = target.subarray(start, position2);
            let newSharedData = prepareStructures(structures, packr2);
            if (!encodingError) {
              if (packr2.saveStructures(newSharedData, newSharedData.isCompatible) === false) {
                return packr2.pack(value, encodeOptions);
              }
              packr2.lastNamedStructuresLength = sharedLength;
              if (target.length > 1073741824) target = null;
              return returnBuffer;
            }
          }
        }
        if (target.length > 1073741824) target = null;
        if (encodeOptions & RESET_BUFFER_MODE)
          position2 = start;
      }
    };
    const resetStructures = () => {
      if (serializationsSinceTransitionRebuild < 10)
        serializationsSinceTransitionRebuild++;
      let sharedLength = structures.sharedLength || 0;
      if (structures.length > sharedLength && !isSequential)
        structures.length = sharedLength;
      if (transitionsCount > 1e4) {
        structures.transitions = null;
        serializationsSinceTransitionRebuild = 0;
        transitionsCount = 0;
        if (recordIdsToRemove.length > 0)
          recordIdsToRemove = [];
      } else if (recordIdsToRemove.length > 0 && !isSequential) {
        for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
          recordIdsToRemove[i][RECORD_SYMBOL] = 0;
        }
        recordIdsToRemove = [];
      }
    };
    const packArray = (value) => {
      var length2 = value.length;
      if (length2 < 16) {
        target[position2++] = 144 | length2;
      } else if (length2 < 65536) {
        target[position2++] = 220;
        target[position2++] = length2 >> 8;
        target[position2++] = length2 & 255;
      } else {
        target[position2++] = 221;
        targetView.setUint32(position2, length2);
        position2 += 4;
      }
      for (let i = 0; i < length2; i++) {
        pack2(value[i]);
      }
    };
    const pack2 = (value) => {
      if (position2 > safeEnd)
        target = makeRoom(position2);
      var type = typeof value;
      var length2;
      if (type === "string") {
        let strLength = value.length;
        if (bundledStrings2 && strLength >= 4 && strLength < 4096) {
          if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
            let extStart;
            let maxBytes2 = (bundledStrings2[0] ? bundledStrings2[0].length * 3 + bundledStrings2[1].length : 0) + 10;
            if (position2 + maxBytes2 > safeEnd)
              target = makeRoom(position2 + maxBytes2);
            let lastBundle;
            if (bundledStrings2.position) {
              lastBundle = bundledStrings2;
              target[position2] = 200;
              position2 += 3;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
              writeBundles(start, pack2, 0);
              targetView.setUint16(extStart + start - 3, position2 - start - extStart);
            } else {
              target[position2++] = 214;
              target[position2++] = 98;
              extStart = position2 - start;
              position2 += 4;
            }
            bundledStrings2 = ["", ""];
            bundledStrings2.previous = lastBundle;
            bundledStrings2.size = 0;
            bundledStrings2.position = extStart;
          }
          let twoByte = hasNonLatin.test(value);
          bundledStrings2[twoByte ? 0 : 1] += value;
          target[position2++] = 193;
          pack2(twoByte ? -strLength : strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position2 + maxBytes > safeEnd)
          target = makeRoom(position2 + maxBytes);
        if (strLength < 64 || !encodeUtf8) {
          let i, c1, c2, strPosition = position2 + headerSize;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target[strPosition++] = c1;
            } else if (c1 < 2048) {
              target[strPosition++] = c1 >> 6 | 192;
              target[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target[strPosition++] = c1 >> 18 | 240;
              target[strPosition++] = c1 >> 12 & 63 | 128;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            } else {
              target[strPosition++] = c1 >> 12 | 224;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            }
          }
          length2 = strPosition - position2 - headerSize;
        } else {
          length2 = encodeUtf8(value, position2 + headerSize);
        }
        if (length2 < 32) {
          target[position2++] = 160 | length2;
        } else if (length2 < 256) {
          if (headerSize < 2) {
            target.copyWithin(position2 + 2, position2 + 1, position2 + 1 + length2);
          }
          target[position2++] = 217;
          target[position2++] = length2;
        } else if (length2 < 65536) {
          if (headerSize < 3) {
            target.copyWithin(position2 + 3, position2 + 2, position2 + 2 + length2);
          }
          target[position2++] = 218;
          target[position2++] = length2 >> 8;
          target[position2++] = length2 & 255;
        } else {
          if (headerSize < 5) {
            target.copyWithin(position2 + 5, position2 + 3, position2 + 3 + length2);
          }
          target[position2++] = 219;
          targetView.setUint32(position2, length2);
          position2 += 4;
        }
        position2 += length2;
      } else if (type === "number") {
        if (value >>> 0 === value) {
          if (value < 32 || value < 128 && this.useRecords === false || value < 64 && !this.randomAccessStructure) {
            target[position2++] = value;
          } else if (value < 256) {
            target[position2++] = 204;
            target[position2++] = value;
          } else if (value < 65536) {
            target[position2++] = 205;
            target[position2++] = value >> 8;
            target[position2++] = value & 255;
          } else {
            target[position2++] = 206;
            targetView.setUint32(position2, value);
            position2 += 4;
          }
        } else if (value >> 0 === value) {
          if (value >= -32) {
            target[position2++] = 256 + value;
          } else if (value >= -128) {
            target[position2++] = 208;
            target[position2++] = value + 256;
          } else if (value >= -32768) {
            target[position2++] = 209;
            targetView.setInt16(position2, value);
            position2 += 2;
          } else {
            target[position2++] = 210;
            targetView.setInt32(position2, value);
            position2 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target[position2++] = 202;
            targetView.setFloat32(position2, value);
            let xShifted;
            if (useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (xShifted = value * mult10[(target[position2] & 127) << 1 | target[position2 + 1] >> 7]) >> 0 === xShifted) {
              position2 += 4;
              return;
            } else
              position2--;
          }
          target[position2++] = 203;
          targetView.setFloat64(position2, value);
          position2 += 8;
        }
      } else if (type === "object" || type === "function") {
        if (!value)
          target[position2++] = 192;
        else {
          if (referenceMap2) {
            let referee = referenceMap2.get(value);
            if (referee) {
              if (!referee.id) {
                let idsToInsert = referenceMap2.idsToInsert || (referenceMap2.idsToInsert = []);
                referee.id = idsToInsert.push(referee);
              }
              target[position2++] = 214;
              target[position2++] = 112;
              targetView.setUint32(position2, referee.id);
              position2 += 4;
              return;
            } else
              referenceMap2.set(value, { offset: position2 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value);
          } else if (constructor === Array) {
            packArray(value);
          } else if (constructor === Map) {
            if (this.mapAsEmptyObject) target[position2++] = 128;
            else {
              length2 = value.size;
              if (length2 < 16) {
                target[position2++] = 128 | length2;
              } else if (length2 < 65536) {
                target[position2++] = 222;
                target[position2++] = length2 >> 8;
                target[position2++] = length2 & 255;
              } else {
                target[position2++] = 223;
                targetView.setUint32(position2, length2);
                position2 += 4;
              }
              for (let [key, entryValue] of value) {
                pack2(key);
                pack2(entryValue);
              }
            }
          } else {
            for (let i = 0, l = extensions.length; i < l; i++) {
              let extensionClass = extensionClasses[i];
              if (value instanceof extensionClass) {
                let extension = extensions[i];
                if (extension.write) {
                  if (extension.type) {
                    target[position2++] = 212;
                    target[position2++] = extension.type;
                    target[position2++] = 0;
                  }
                  let writeResult = extension.write.call(this, value);
                  if (writeResult === value) {
                    if (Array.isArray(value)) {
                      packArray(value);
                    } else {
                      writeObject(value);
                    }
                  } else {
                    pack2(writeResult);
                  }
                  return;
                }
                let currentTarget = target;
                let currentTargetView = targetView;
                let currentPosition = position2;
                target = null;
                let result;
                try {
                  result = extension.pack.call(this, value, (size) => {
                    target = currentTarget;
                    currentTarget = null;
                    position2 += size;
                    if (position2 > safeEnd)
                      makeRoom(position2);
                    return {
                      target,
                      targetView,
                      position: position2 - size
                    };
                  }, pack2);
                } finally {
                  if (currentTarget) {
                    target = currentTarget;
                    targetView = currentTargetView;
                    position2 = currentPosition;
                    safeEnd = target.length - 10;
                  }
                }
                if (result) {
                  if (result.length + position2 > safeEnd)
                    makeRoom(result.length + position2);
                  position2 = writeExtensionData(result, target, position2, extension.type);
                }
                return;
              }
            }
            if (Array.isArray(value)) {
              packArray(value);
            } else {
              if (value.toJSON) {
                const json2 = value.toJSON();
                if (json2 !== value)
                  return pack2(json2);
              }
              if (type === "function")
                return pack2(this.writeFunction && this.writeFunction(value));
              writeObject(value);
            }
          }
        }
      } else if (type === "boolean") {
        target[position2++] = value ? 195 : 194;
      } else if (type === "bigint") {
        if (value < 9223372036854776e3 && value >= -9223372036854776e3) {
          target[position2++] = 211;
          targetView.setBigInt64(position2, value);
        } else if (value < 18446744073709552e3 && value > 0) {
          target[position2++] = 207;
          targetView.setBigUint64(position2, value);
        } else {
          if (this.largeBigIntToFloat) {
            target[position2++] = 203;
            targetView.setFloat64(position2, Number(value));
          } else if (this.largeBigIntToString) {
            return pack2(value.toString());
          } else if (this.useBigIntExtension || this.moreTypes) {
            let empty = value < 0 ? BigInt(-1) : BigInt(0);
            let array2;
            if (value >> BigInt(65536) === empty) {
              let mask = BigInt(18446744073709552e3) - BigInt(1);
              let chunks = [];
              while (true) {
                chunks.push(value & mask);
                if (value >> BigInt(63) === empty) break;
                value >>= BigInt(64);
              }
              array2 = new Uint8Array(new BigUint64Array(chunks).buffer);
              array2.reverse();
            } else {
              let invert = value < 0;
              let string = (invert ? ~value : value).toString(16);
              if (string.length % 2) {
                string = "0" + string;
              } else if (parseInt(string.charAt(0), 16) >= 8) {
                string = "00" + string;
              }
              if (hasNodeBuffer) {
                array2 = Buffer.from(string, "hex");
              } else {
                array2 = new Uint8Array(string.length / 2);
                for (let i = 0; i < array2.length; i++) {
                  array2[i] = parseInt(string.slice(i * 2, i * 2 + 2), 16);
                }
              }
              if (invert) {
                for (let i = 0; i < array2.length; i++) array2[i] = ~array2[i];
              }
            }
            if (array2.length + position2 > safeEnd)
              makeRoom(array2.length + position2);
            position2 = writeExtensionData(array2, target, position2, 66);
            return;
          } else {
            throw new RangeError(value + " was too large to fit in MessagePack 64-bit integer format, use useBigIntExtension, or set largeBigIntToFloat to convert to float-64, or set largeBigIntToString to convert to string");
          }
        }
        position2 += 8;
      } else if (type === "undefined") {
        if (this.encodeUndefinedAsNil)
          target[position2++] = 192;
        else {
          target[position2++] = 212;
          target[position2++] = 0;
          target[position2++] = 0;
        }
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writePlainObject = this.variableMapSize || this.coercibleKeyAsNumber || this.skipValues ? (object2) => {
      let keys;
      if (this.skipValues) {
        keys = [];
        for (let key2 in object2) {
          if ((typeof object2.hasOwnProperty !== "function" || object2.hasOwnProperty(key2)) && !this.skipValues.includes(object2[key2]))
            keys.push(key2);
        }
      } else {
        keys = Object.keys(object2);
      }
      let length2 = keys.length;
      if (length2 < 16) {
        target[position2++] = 128 | length2;
      } else if (length2 < 65536) {
        target[position2++] = 222;
        target[position2++] = length2 >> 8;
        target[position2++] = length2 & 255;
      } else {
        target[position2++] = 223;
        targetView.setUint32(position2, length2);
        position2 += 4;
      }
      let key;
      if (this.coercibleKeyAsNumber) {
        for (let i = 0; i < length2; i++) {
          key = keys[i];
          let num = Number(key);
          pack2(isNaN(num) ? key : num);
          pack2(object2[key]);
        }
      } else {
        for (let i = 0; i < length2; i++) {
          pack2(key = keys[i]);
          pack2(object2[key]);
        }
      }
    } : (object2) => {
      target[position2++] = 222;
      let objectOffset = position2 - start;
      position2 += 2;
      let size = 0;
      for (let key in object2) {
        if (typeof object2.hasOwnProperty !== "function" || object2.hasOwnProperty(key)) {
          pack2(key);
          pack2(object2[key]);
          size++;
        }
      }
      if (size > 65535) {
        throw new Error('Object is too large to serialize with fast 16-bit map size, use the "variableMapSize" option to serialize this object');
      }
      target[objectOffset++ + start] = size >> 8;
      target[objectOffset + start] = size & 255;
    };
    const writeRecord = this.useRecords === false ? writePlainObject : options.progressiveRecords && !useTwoByteRecords ? (
      // this is about 2% faster for highly stable structures, since it only requires one for-in loop (but much more expensive when new structure needs to be written)
      (object2) => {
        let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
        let objectOffset = position2++ - start;
        let wroteKeys;
        for (let key in object2) {
          if (typeof object2.hasOwnProperty !== "function" || object2.hasOwnProperty(key)) {
            nextTransition = transition[key];
            if (nextTransition)
              transition = nextTransition;
            else {
              let keys = Object.keys(object2);
              let lastTransition = transition;
              transition = structures.transitions;
              let newTransitions = 0;
              for (let i = 0, l = keys.length; i < l; i++) {
                let key2 = keys[i];
                nextTransition = transition[key2];
                if (!nextTransition) {
                  nextTransition = transition[key2] = /* @__PURE__ */ Object.create(null);
                  newTransitions++;
                }
                transition = nextTransition;
              }
              if (objectOffset + start + 1 == position2) {
                position2--;
                newRecord(transition, keys, newTransitions);
              } else
                insertNewRecord(transition, keys, objectOffset, newTransitions);
              wroteKeys = true;
              transition = lastTransition[key];
            }
            pack2(object2[key]);
          }
        }
        if (!wroteKeys) {
          let recordId = transition[RECORD_SYMBOL];
          if (recordId)
            target[objectOffset + start] = recordId;
          else
            insertNewRecord(transition, Object.keys(object2), objectOffset, 0);
        }
      }
    ) : (object2) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      for (let key in object2) if (typeof object2.hasOwnProperty !== "function" || object2.hasOwnProperty(key)) {
        nextTransition = transition[key];
        if (!nextTransition) {
          nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
          newTransitions++;
        }
        transition = nextTransition;
      }
      let recordId = transition[RECORD_SYMBOL];
      if (recordId) {
        if (recordId >= 96 && useTwoByteRecords) {
          target[position2++] = ((recordId -= 96) & 31) + 96;
          target[position2++] = recordId >> 5;
        } else
          target[position2++] = recordId;
      } else {
        newRecord(transition, transition.__keys__ || Object.keys(object2), newTransitions);
      }
      for (let key in object2)
        if (typeof object2.hasOwnProperty !== "function" || object2.hasOwnProperty(key)) {
          pack2(object2[key]);
        }
    };
    const checkUseRecords = typeof this.useRecords == "function" && this.useRecords;
    const writeObject = checkUseRecords ? (object2) => {
      checkUseRecords(object2) ? writeRecord(object2) : writePlainObject(object2);
    } : writeRecord;
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE)
          throw new Error("Packed buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate(newSize);
      targetView = newBuffer.dataView || (newBuffer.dataView = new DataView(newBuffer.buffer, 0, newSize));
      end = Math.min(end, target.length);
      if (target.copy)
        target.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target.slice(start, end));
      position2 -= start;
      start = 0;
      safeEnd = newBuffer.length - 10;
      return target = newBuffer;
    };
    const newRecord = (transition, keys, newTransitions) => {
      let recordId = structures.nextId;
      if (!recordId)
        recordId = 64;
      if (recordId < sharedLimitId && this.shouldShareStructure && !this.shouldShareStructure(keys)) {
        recordId = structures.nextOwnId;
        if (!(recordId < maxStructureId))
          recordId = sharedLimitId;
        structures.nextOwnId = recordId + 1;
      } else {
        if (recordId >= maxStructureId)
          recordId = sharedLimitId;
        structures.nextId = recordId + 1;
      }
      let highByte = keys.highByte = recordId >= 96 && useTwoByteRecords ? recordId - 96 >> 5 : -1;
      transition[RECORD_SYMBOL] = recordId;
      transition.__keys__ = keys;
      structures[recordId - 64] = keys;
      if (recordId < sharedLimitId) {
        keys.isShared = true;
        structures.sharedLength = recordId - 63;
        hasSharedUpdate = true;
        if (highByte >= 0) {
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = recordId;
        }
      } else {
        if (highByte >= 0) {
          target[position2++] = 213;
          target[position2++] = 114;
          target[position2++] = (recordId & 31) + 96;
          target[position2++] = highByte;
        } else {
          target[position2++] = 212;
          target[position2++] = 114;
          target[position2++] = recordId;
        }
        if (newTransitions)
          transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
        if (recordIdsToRemove.length >= maxOwnStructures)
          recordIdsToRemove.shift()[RECORD_SYMBOL] = 0;
        recordIdsToRemove.push(transition);
        pack2(keys);
      }
    };
    const insertNewRecord = (transition, keys, insertionOffset, newTransitions) => {
      let mainTarget = target;
      let mainPosition = position2;
      let mainSafeEnd = safeEnd;
      let mainStart = start;
      target = keysTarget;
      position2 = 0;
      start = 0;
      if (!target)
        keysTarget = target = new ByteArrayAllocate(8192);
      safeEnd = target.length - 10;
      newRecord(transition, keys, newTransitions);
      keysTarget = target;
      let keysPosition = position2;
      target = mainTarget;
      position2 = mainPosition;
      safeEnd = mainSafeEnd;
      start = mainStart;
      if (keysPosition > 1) {
        let newEnd = position2 + keysPosition - 1;
        if (newEnd > safeEnd)
          makeRoom(newEnd);
        let insertionPosition = insertionOffset + start;
        target.copyWithin(insertionPosition + keysPosition, insertionPosition + 1, position2);
        target.set(keysTarget.slice(0, keysPosition), insertionPosition);
        position2 = newEnd;
      } else {
        target[insertionOffset + start] = keysTarget[0];
      }
    };
    const writeStruct = (object2) => {
      let newPosition = writeStructSlots(object2, target, start, position2, structures, makeRoom, (value, newPosition2, notifySharedUpdate) => {
        if (notifySharedUpdate)
          return hasSharedUpdate = true;
        position2 = newPosition2;
        let startTarget = target;
        pack2(value);
        resetStructures();
        if (startTarget !== target) {
          return { position: position2, targetView, target };
        }
        return position2;
      }, this);
      if (newPosition === 0)
        return writeObject(object2);
      position2 = newPosition;
    };
  }
  useBuffer(buffer) {
    target = buffer;
    target.dataView || (target.dataView = new DataView(target.buffer, target.byteOffset, target.byteLength));
    targetView = target.dataView;
    position2 = 0;
  }
  set position(value) {
    position2 = value;
  }
  get position() {
    return position2;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.typedStructs)
      this.typedStructs = [];
  }
};
extensionClasses = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, DataView, C1Type];
extensions = [{
  pack(date, allocateForWrite, pack2) {
    let seconds = date.getTime() / 1e3;
    if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(6);
      target2[position3++] = 214;
      target2[position3++] = 255;
      targetView2.setUint32(position3, seconds);
    } else if (seconds > 0 && seconds < 4294967296) {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(10);
      target2[position3++] = 215;
      target2[position3++] = 255;
      targetView2.setUint32(position3, date.getMilliseconds() * 4e6 + (seconds / 1e3 / 4294967296 >> 0));
      targetView2.setUint32(position3 + 4, seconds);
    } else if (isNaN(seconds)) {
      if (this.onInvalidDate) {
        allocateForWrite(0);
        return pack2(this.onInvalidDate());
      }
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(3);
      target2[position3++] = 212;
      target2[position3++] = 255;
      target2[position3++] = 255;
    } else {
      let { target: target2, targetView: targetView2, position: position3 } = allocateForWrite(15);
      target2[position3++] = 199;
      target2[position3++] = 12;
      target2[position3++] = 255;
      targetView2.setUint32(position3, date.getMilliseconds() * 1e6);
      targetView2.setBigInt64(position3 + 4, BigInt(Math.floor(seconds)));
    }
  }
}, {
  pack(set2, allocateForWrite, pack2) {
    if (this.setAsEmptyObject) {
      allocateForWrite(0);
      return pack2({});
    }
    let array2 = Array.from(set2);
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 115;
      target2[position3++] = 0;
    }
    pack2(array2);
  }
}, {
  pack(error, allocateForWrite, pack2) {
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 101;
      target2[position3++] = 0;
    }
    pack2([error.name, error.message, error.cause]);
  }
}, {
  pack(regex2, allocateForWrite, pack2) {
    let { target: target2, position: position3 } = allocateForWrite(this.moreTypes ? 3 : 0);
    if (this.moreTypes) {
      target2[position3++] = 212;
      target2[position3++] = 120;
      target2[position3++] = 0;
    }
    pack2([regex2.source, regex2.flags]);
  }
}, {
  pack(arrayBuffer, allocateForWrite) {
    if (this.moreTypes)
      writeExtBuffer(arrayBuffer, 16, allocateForWrite);
    else
      writeBuffer(hasNodeBuffer ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer), allocateForWrite);
  }
}, {
  pack(typedArray, allocateForWrite) {
    let constructor = typedArray.constructor;
    if (constructor !== ByteArray && this.moreTypes)
      writeExtBuffer(typedArray, typedArrays.indexOf(constructor.name), allocateForWrite);
    else
      writeBuffer(typedArray, allocateForWrite);
  }
}, {
  pack(arrayBuffer, allocateForWrite) {
    if (this.moreTypes)
      writeExtBuffer(arrayBuffer, 17, allocateForWrite);
    else
      writeBuffer(hasNodeBuffer ? Buffer.from(arrayBuffer) : new Uint8Array(arrayBuffer), allocateForWrite);
  }
}, {
  pack(c1, allocateForWrite) {
    let { target: target2, position: position3 } = allocateForWrite(1);
    target2[position3] = 193;
  }
}];
function writeExtBuffer(typedArray, type, allocateForWrite, encode2) {
  let length2 = typedArray.byteLength;
  if (length2 + 1 < 256) {
    var { target: target2, position: position3 } = allocateForWrite(4 + length2);
    target2[position3++] = 199;
    target2[position3++] = length2 + 1;
  } else if (length2 + 1 < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(5 + length2);
    target2[position3++] = 200;
    target2[position3++] = length2 + 1 >> 8;
    target2[position3++] = length2 + 1 & 255;
  } else {
    var { target: target2, position: position3, targetView: targetView2 } = allocateForWrite(7 + length2);
    target2[position3++] = 201;
    targetView2.setUint32(position3, length2 + 1);
    position3 += 4;
  }
  target2[position3++] = 116;
  target2[position3++] = type;
  if (!typedArray.buffer) typedArray = new Uint8Array(typedArray);
  target2.set(new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength), position3);
}
function writeBuffer(buffer, allocateForWrite) {
  let length2 = buffer.byteLength;
  var target2, position3;
  if (length2 < 256) {
    var { target: target2, position: position3 } = allocateForWrite(length2 + 2);
    target2[position3++] = 196;
    target2[position3++] = length2;
  } else if (length2 < 65536) {
    var { target: target2, position: position3 } = allocateForWrite(length2 + 3);
    target2[position3++] = 197;
    target2[position3++] = length2 >> 8;
    target2[position3++] = length2 & 255;
  } else {
    var { target: target2, position: position3, targetView: targetView2 } = allocateForWrite(length2 + 5);
    target2[position3++] = 198;
    targetView2.setUint32(position3, length2);
    position3 += 4;
  }
  target2.set(buffer, position3);
}
function writeExtensionData(result, target2, position3, type) {
  let length2 = result.length;
  switch (length2) {
    case 1:
      target2[position3++] = 212;
      break;
    case 2:
      target2[position3++] = 213;
      break;
    case 4:
      target2[position3++] = 214;
      break;
    case 8:
      target2[position3++] = 215;
      break;
    case 16:
      target2[position3++] = 216;
      break;
    default:
      if (length2 < 256) {
        target2[position3++] = 199;
        target2[position3++] = length2;
      } else if (length2 < 65536) {
        target2[position3++] = 200;
        target2[position3++] = length2 >> 8;
        target2[position3++] = length2 & 255;
      } else {
        target2[position3++] = 201;
        target2[position3++] = length2 >> 24;
        target2[position3++] = length2 >> 16 & 255;
        target2[position3++] = length2 >> 8 & 255;
        target2[position3++] = length2 & 255;
      }
  }
  target2[position3++] = type;
  target2.set(result, position3);
  position3 += length2;
  return position3;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 6;
  let lastEnd = serialized.length - distanceToMove;
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    let id2 = nextId.id;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 6;
    let position3 = offset + distanceToMove;
    serialized[position3++] = 214;
    serialized[position3++] = 105;
    serialized[position3++] = id2 >> 24;
    serialized[position3++] = id2 >> 16 & 255;
    serialized[position3++] = id2 >> 8 & 255;
    serialized[position3++] = id2 & 255;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, pack2, incrementPosition) {
  if (bundledStrings2.length > 0) {
    targetView.setUint32(bundledStrings2.position + start, position2 + incrementPosition - bundledStrings2.position - start);
    bundledStrings2.stringsPosition = position2 - start;
    let writeStrings = bundledStrings2;
    bundledStrings2 = null;
    pack2(writeStrings[0]);
    pack2(writeStrings[1]);
  }
}
function prepareStructures(structures, packr2) {
  structures.isCompatible = (existingStructures) => {
    let compatible = !existingStructures || (packr2.lastNamedStructuresLength || 0) === existingStructures.length;
    if (!compatible)
      packr2._mergeStructures(existingStructures);
    return compatible;
  };
  return structures;
}
var defaultPackr = new Packr({ useRecords: false });
var pack = defaultPackr.pack;
var encode = defaultPackr.pack;
var { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS;
var REUSE_BUFFER_MODE = 512;
var RESET_BUFFER_MODE = 1024;
var RESERVE_START_SPACE = 2048;

// node_modules/@evolu/common/dist/src/Object.js
var isPlainObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
var objectToEntries = (record2) => Object.entries(record2);
var mapObject = (record2, fn) => Object.fromEntries(Object.entries(record2).map(([key, value]) => [
  key,
  fn(value, key)
]));
var excludeProp = (obj, prop, condition) => {
  if (condition) {
    return { ...obj };
  }
  const { [prop]: _, ...rest } = obj;
  return rest;
};
var createRecord = () => /* @__PURE__ */ Object.create(null);
var getProperty = (record2, key) => key in record2 ? record2[key] : void 0;

// node_modules/@evolu/common/dist/src/Platform.js
var isReactNative = typeof navigator !== "undefined" && "product" in navigator && // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
navigator.product === "ReactNative";
var hasNodeBuffer2 = !isReactNative && typeof globalThis.Buffer !== "undefined";

// node_modules/@evolu/common/dist/src/Result.js
function ok(value = void 0) {
  return { ok: true, value };
}
var err = (error) => ({ ok: false, error });
var getOrThrow = (result) => {
  if (result.ok) {
    return result.value;
  } else {
    throw new Error("getOrThrow", { cause: result.error });
  }
};
var getOrNull = (result) => result.ok ? result.value : null;
var trySync = (fn, mapError) => {
  try {
    return ok(fn());
  } catch (error) {
    return err(mapError(error));
  }
};
var tryAsync = async (promiseFn, mapError) => promiseFn().then((value) => ok(value), (error) => err(mapError(error)));

// node_modules/@evolu/common/dist/src/String.js
var safelyStringifyUnknownValue = (value) => {
  if (value === null)
    return "null";
  if (value === void 0)
    return "undefined";
  if (typeof value === "string")
    return `"${value}"`;
  try {
    return JSON.stringify(value);
  } catch {
    return globalThis.String(value);
  }
};

// node_modules/@evolu/common/dist/src/Type.js
var EvoluTypeSymbol = Symbol("evolu.Type");
var isType = (value) => typeof value === "object" && value !== null && EvoluTypeSymbol in value;
var createType = (name, definition) => ({
  ...definition,
  name,
  is: (value) => definition.fromUnknown(value).ok,
  from: definition.fromUnknown,
  orThrow: (value) => getOrThrow(definition.fromUnknown(value)),
  orNull: (value) => getOrNull(definition.fromUnknown(value)),
  [EvoluTypeSymbol]: true,
  Type: void 0,
  Input: void 0,
  Error: void 0,
  Parent: void 0,
  ParentError: void 0,
  Errors: void 0,
  "~standard": {
    version: 1,
    vendor: "evolu",
    validate: (value) => {
      const result = definition.fromUnknown(value);
      if (result.ok) {
        return { value: result.value };
      }
      cachedStandardSchemaFormatTypeError ??= createFormatTypeError();
      return {
        issues: typeErrorToStandardSchemaIssues(result.error, cachedStandardSchemaFormatTypeError)
      };
    },
    types: {
      input: void 0,
      output: void 0
    }
  }
});
var createTypeErrorFormatter = (format) => (error) => format({ ...error, value: safelyStringifyUnknownValue(error.value) });
var base = (name, fromUnknown) => createType(name, {
  fromUnknown,
  fromParent: ok
  // `fromParent` relies on types, so it can't fail for the Base Type
});
var createBaseTypeErrorFormatter = () => createTypeErrorFormatter((error) => `A value ${error.value} is not a ${error.type.toLowerCase()}.`);
var Unknown = base("Unknown", ok);
var String2 = base("String", (value) => typeof value === "string" ? ok(value) : err({ type: "String", value }));
var formatStringError = createBaseTypeErrorFormatter();
var Number2 = base("Number", (value) => typeof value === "number" ? ok(value) : err({ type: "Number", value }));
var formatNumberError = createBaseTypeErrorFormatter();
var BigInt2 = base("BigInt", (value) => typeof value === "bigint" ? ok(value) : err({ type: "BigInt", value }));
var formatBigIntError = createBaseTypeErrorFormatter();
var Boolean2 = base("Boolean", (value) => typeof value === "boolean" ? ok(value) : err({ type: "Boolean", value }));
var formatBooleanError = createBaseTypeErrorFormatter();
var Undefined = base("Undefined", (value) => value === void 0 ? ok(value) : err({ type: "Undefined", value }));
var formatUndefinedError = createBaseTypeErrorFormatter();
var Null = base("Null", (value) => value === null ? ok(value) : err({ type: "Null", value }));
var formatNullError = createBaseTypeErrorFormatter();
var Function2 = base("Function", (value) => typeof value === "function" ? ok(value) : err({ type: "Function", value }));
var formatFunctionError = createBaseTypeErrorFormatter();
var Uint8Array2 = base("Uint8Array", (value) => value instanceof globalThis.Uint8Array ? ok(value) : err({ type: "Uint8Array", value }));
var formatUint8ArrayError = createBaseTypeErrorFormatter();
var instanceOf = (ctor) => ({
  ...base("InstanceOf", (value) => value instanceof ctor ? ok(value) : err({ type: "InstanceOf", value, ctor: ctor.name })),
  ctor
});
var formatInstanceOfError = createTypeErrorFormatter((error) => `The value ${error.value} is not an instance of ${error.ctor}.`);
var Date2 = instanceOf(globalThis.Date);
var EvoluType = base("EvoluType", (value) => isType(value) ? ok(value) : err({
  type: "EvoluType",
  value
}));
var formatIsTypeError = createTypeErrorFormatter((error) => `Value ${error.value} is not a valid Evolu Type.`);
function brand(name, parent, refine) {
  const fromUnknown = refine ? (value) => {
    const parentResult = parent.fromUnknown(value);
    if (!parentResult.ok)
      return parentResult;
    return refine(parentResult.value);
  } : (value) => {
    const parentResult = parent.fromUnknown(value);
    if (!parentResult.ok)
      return err({
        type: name,
        value,
        parentError: parentResult.error
      });
    return ok(parentResult.value);
  };
  return {
    ...createType("Brand", {
      fromUnknown,
      fromParent: refine ?? ok
    }),
    brand: name,
    parentType: parent
  };
}
var CurrencyCode = brand("CurrencyCode", String2, (value) => /^[A-Z]{3}$/.test(value) ? ok(value) : err({ type: "CurrencyCode", value }));
var formatCurrencyCodeError = createTypeErrorFormatter((error) => `Invalid currency code: ${error.value}.`);
var DateIso = brand("DateIso", String2, (value) => {
  if (value.length !== 24) {
    return err({ type: "DateIso", value });
  }
  const parsed = globalThis.Date.parse(value);
  if (isNaN(parsed)) {
    return err({ type: "DateIso", value });
  }
  const roundTrip = new globalThis.Date(parsed).toISOString();
  if (roundTrip !== value) {
    return err({ type: "DateIso", value });
  }
  return ok(value);
});
var formatDateIsoError = createTypeErrorFormatter((error) => `The value ${error.value} is not a valid ISO 8601 date string.`);
var dateToDateIso = (value) => DateIso.fromParent(value.toISOString());
var dateIsoToDate = (value) => new globalThis.Date(value);
var trimmed = (parent) => brand("Trimmed", parent, (value) => value.trim().length === value.length ? ok(value) : err({ type: "Trimmed", value }));
var formatTrimmedError = createTypeErrorFormatter((error) => `The value ${error.value} must be trimmed.`);
var TrimmedString = trimmed(String2);
var trim = (value) => value.trim();
var minLength = (min2) => (parent) => brand(`MinLength${min2}`, parent, (value) => value.length >= min2 ? ok(value) : err({ type: "MinLength", value, min: min2 }));
var formatMinLengthError = createTypeErrorFormatter((error) => `The value ${error.value} does not meet the minimum length of ${error.min}.`);
var maxLength = (max2) => (parent) => brand(`MaxLength${max2}`, parent, (value) => value.length <= max2 ? ok(value) : err({ type: "MaxLength", value, max: max2 }));
var formatMaxLengthError = createTypeErrorFormatter((error) => `The value ${error.value} exceeds the maximum length of ${error.max}.`);
var length = (exact) => (parent) => brand(`Length${exact}`, parent, (value) => value.length === exact ? ok(value) : err({ type: "Length", value, exact }));
var formatLengthError = createTypeErrorFormatter((error) => `The value ${error.value} does not have the required length of ${error.exact}.`);
var NonEmptyString = minLength(1)(String2);
var String100 = maxLength(100)(String2);
var String1000 = maxLength(1e3)(String2);
var NonEmptyString100 = minLength(1)(String100);
var NonEmptyString1000 = minLength(1)(String1000);
var NonEmptyTrimmedString = minLength(1)(TrimmedString);
var TrimmedString100 = maxLength(100)(TrimmedString);
var TrimmedString1000 = maxLength(1e3)(TrimmedString);
var NonEmptyTrimmedString100 = minLength(1)(TrimmedString100);
var NonEmptyTrimmedString1000 = minLength(1)(TrimmedString1000);
var Mnemonic = brand("Mnemonic", NonEmptyTrimmedString, (value) => validateMnemonic(value, wordlist) ? ok(value) : err({ type: "Mnemonic", value }));
var formatMnemonicError = createTypeErrorFormatter((error) => `Invalid BIP39 mnemonic: ${error.value}.`);
var regex = (name, pattern) => {
  const clonedPattern = new RegExp(pattern.source, pattern.flags);
  return (parent) => brand(name, parent, (value) => {
    clonedPattern.lastIndex = 0;
    return clonedPattern.test(value) ? ok(value) : err({ type: "Regex", name, value, pattern });
  });
};
var formatRegexError = createTypeErrorFormatter((error) => `The value ${error.value} does not match the pattern for ${error.name}: ${error.pattern}.`);
var UrlSafeString = regex("UrlSafeString", /^[A-Za-z0-9_-]+$/)(String2);
var Base64Url = brand("Base64Url", String2, (value) => {
  let roundTrip;
  try {
    roundTrip = uint8ArrayToBase64Url(base64UrlToUint8Array(value));
  } catch {
  }
  return roundTrip === value ? ok(value) : err({ type: "Base64Url", value });
});
var formatBase64UrlError = createTypeErrorFormatter((error) => `The value ${error.value} is not a valid Base64Url string.`);
var base64UrlOptions = { alphabet: "base64url", omitPadding: true };
var uint8ArrayToBase64Url = hasNodeBuffer2 ? (bytes) => globalThis.Buffer.from(bytes).toString("base64url") : (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof globalThis.Uint8Array.prototype?.toBase64 !== "undefined" ? (bytes) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    bytes.toBase64(base64UrlOptions)
  ) : (bytes) => {
    const binaryString = Array.from(bytes, (byte) => globalThis.String.fromCodePoint(byte)).join("");
    const base642 = globalThis.btoa(binaryString);
    return base642.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
);
var base64UrlToUint8Array = hasNodeBuffer2 ? (str) => {
  const nodeBuffer = globalThis.Buffer.from(str, "base64url");
  return new globalThis.Uint8Array(nodeBuffer);
} : (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof globalThis.Uint8Array?.fromBase64 !== "undefined" ? (str) => (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    globalThis.Uint8Array.fromBase64(str, base64UrlOptions)
  ) : (str) => {
    let base642 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base642.length % 4 !== 0) {
      base642 += "=";
    }
    const binaryString = globalThis.atob(base642);
    return globalThis.Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  }
);
var SimpleName = brand("SimpleName", UrlSafeString, (value) => value.length >= 1 && value.length <= 64 ? ok(value) : err({ type: "SimpleName", value }));
var SimplePassword = brand("SimplePassword", minLength(8)(maxLength(64)(TrimmedString)));
var formatSimplePasswordError = (formatTypeError) => createTypeErrorFormatter((error) => `Invalid password: ${formatTypeError(error.parentError)}`);
var Id = brand("Id", String2, (value) => value.length === 22 && Base64Url.fromParent(value).ok ? ok(value) : err({ type: "Id", value }));
var formatIdError = createTypeErrorFormatter((error) => `The value ${error.value} is not a valid Id.`);
var createId = (deps) => {
  const id2 = uint8ArrayToBase64Url(deps.randomBytes.create(16));
  return id2;
};
var createIdFromString = (value) => {
  const hash = sha256(utf8ToBytes(value));
  const id2 = idBytesToId(hash.slice(0, 16));
  return id2;
};
var createIdAsUuidv7 = (deps) => {
  const id2 = deps.randomBytes.create(16);
  const timestamp = globalThis.BigInt(deps.time.now());
  id2[0] = globalThis.Number(timestamp >> 40n & 0xffn);
  id2[1] = globalThis.Number(timestamp >> 32n & 0xffn);
  id2[2] = globalThis.Number(timestamp >> 24n & 0xffn);
  id2[3] = globalThis.Number(timestamp >> 16n & 0xffn);
  id2[4] = globalThis.Number(timestamp >> 8n & 0xffn);
  id2[5] = globalThis.Number(timestamp & 0xffn);
  id2[6] = id2[6] & 15 | 112;
  id2[8] = id2[8] & 63 | 128;
  return id2;
};
var id = (table) => {
  const fromUnknown = (value) => {
    const parentResult = String2.fromUnknown(value);
    if (!parentResult.ok)
      return parentResult;
    return fromParent(parentResult.value);
  };
  const fromParent = (value) => {
    const idResult = Id.fromParent(value);
    if (!idResult.ok) {
      return err({ type: "TableId", value, table });
    }
    return ok(idResult.value);
  };
  return {
    ...createType("Id", { fromUnknown, fromParent }),
    table
  };
};
var formatTableIdError = createTypeErrorFormatter((error) => `Invalid Id for table ${error.table}: ${error.value}.`);
var IdBytes = brand("IdBytes", length(16)(Uint8Array2));
var idBytesTypeValueLength = 16;
var idToIdBytes = (id2) => (
  // Id is Base64Url (validated by Id.from), cast is safe
  base64UrlToUint8Array(id2)
);
var idBytesToId = (idBytes) => (
  // Base64Url encoding of 16 bytes always produces valid Id (22 chars)
  uint8ArrayToBase64Url(idBytes)
);
var positive = (parent) => brand("Positive", parent, (value) => value > 0 ? ok(value) : err({ type: "Positive", value }));
var formatPositiveError = createTypeErrorFormatter((error) => `The value ${error.value} must be positive (> 0).`);
var negative = (parent) => brand("Negative", parent, (value) => value < 0 ? ok(value) : err({ type: "Negative", value }));
var formatNegativeError = createTypeErrorFormatter((error) => `The value ${error.value} must be negative (< 0).`);
var nonPositive = (parent) => brand("NonPositive", parent, (value) => value <= 0 ? ok(value) : err({ type: "NonPositive", value }));
var formatNonPositiveError = createTypeErrorFormatter((error) => `The value ${error.value} must be non-positive (≤ 0).`);
var nonNegative = (parent) => brand("NonNegative", parent, (value) => value >= 0 ? ok(value) : err({ type: "NonNegative", value }));
var formatNonNegativeError = createTypeErrorFormatter((error) => `The value ${error.value} must be non-negative (≥ 0).`);
var NonNegativeNumber = nonNegative(Number2);
var PositiveNumber = positive(NonNegativeNumber);
var NonPositiveNumber = nonPositive(Number2);
var NegativeNumber = negative(NonPositiveNumber);
var int = (parent) => brand("Int", parent, (value) => globalThis.Number.isSafeInteger(value) ? ok(value) : err({ type: "Int", value }));
var formatIntError = createTypeErrorFormatter((error) => `The value ${error.value} must be an integer.`);
var Int = int(Number2);
var NonNegativeInt = nonNegative(Int);
var PositiveInt = positive(NonNegativeInt);
var maxPositiveInt = PositiveInt.orThrow(globalThis.Number.MAX_SAFE_INTEGER);
var NonPositiveInt = nonPositive(Int);
var NegativeInt = negative(NonPositiveInt);
var greaterThan = (min2) => (parent) => brand(`GreaterThan${min2}`, parent, (value) => value > min2 ? ok(value) : err({ type: "GreaterThan", value, min: min2 }));
var formatGreaterThanError = createTypeErrorFormatter((error) => `The value ${error.value} is not > ${error.min}.`);
var lessThan = (max2) => (parent) => brand(`LessThan${max2}`, parent, (value) => value < max2 ? ok(value) : err({ type: "LessThan", value, max: max2 }));
var formatLessThanError = createTypeErrorFormatter((error) => `The value ${error.value} is not < ${error.max}.`);
var greaterThanOrEqualTo = (min2) => (parent) => brand(`GreaterThanOrEqualTo${min2}`, parent, (value) => value >= min2 ? ok(value) : err({ type: "GreaterThanOrEqualTo", value, min: min2 }));
var formatGreaterThanOrEqualToError = createTypeErrorFormatter((error) => `The value ${error.value} is not >= ${error.min}.`);
var lessThanOrEqualTo = (max2) => (parent) => brand(`LessThanOrEqualTo${max2}`, parent, (value) => value <= max2 ? ok(value) : err({ type: "LessThanOrEqualTo", value, max: max2 }));
var formatLessThanOrEqualToError = createTypeErrorFormatter((error) => `The value ${error.value} is not <= ${error.max}.`);
var nonNaN = (parent) => brand("NonNaN", parent, (value) => !globalThis.Number.isNaN(value) ? ok(value) : err({ type: "NonNaN", value }));
var formatNonNaNError = createTypeErrorFormatter(() => `The value must not be NaN.`);
var NonNaNNumber = nonNaN(Number2);
var finite = (parent) => brand("Finite", parent, (value) => globalThis.Number.isFinite(value) ? ok(value) : err({ type: "Finite", value }));
var formatFiniteError = createTypeErrorFormatter((error) => `The value ${error.value} must be finite.`);
var FiniteNumber = finite(Number2);
var multipleOf = (divisor) => (parent) => brand(`MultipleOf${divisor}`, parent, (value) => value % divisor === 0 ? ok(value) : err({ type: "MultipleOf", value, divisor }));
var formatMultipleOfError = createTypeErrorFormatter((error) => `The value ${error.value} is not a multiple of ${error.divisor}.`);
var between = (min2, max2) => (parent) => brand(`Between${min2}-${max2}`, parent, (value) => value >= min2 && value <= max2 ? ok(value) : err({ type: "Between", value, min: min2, max: max2 }));
var formatBetweenError = createTypeErrorFormatter((error) => `The value ${error.value} is not between ${error.min} and ${error.max}, inclusive.`);
var literal = (expected) => {
  const fromUnknown = (value) => value === expected ? ok(expected) : err({ type: "Literal", value, expected });
  return {
    ...createType("Literal", {
      fromUnknown,
      fromParent: ok
    }),
    expected
  };
};
var formatLiteralError = createTypeErrorFormatter((error) => `The value ${error.value} is not strictly equal to the expected literal: ${globalThis.String(error.expected)}.`);
var array = (element) => {
  const fromUnknown = (value) => {
    if (!Array.isArray(value)) {
      return err({
        type: "Array",
        value,
        reason: { kind: "NotArray" }
      });
    }
    const result = [];
    for (let i = 0; i < value.length; i++) {
      const elementResult = element.fromUnknown(value[i]);
      if (!elementResult.ok) {
        return err({
          type: "Array",
          value,
          reason: {
            kind: "Element",
            index: i,
            error: elementResult.error
          }
        });
      }
      result.push(elementResult.value);
    }
    return ok(result);
  };
  const fromParent = (value) => {
    const result = [];
    for (let i = 0; i < value.length; i++) {
      const elementResult = element.fromParent(value[i]);
      if (!elementResult.ok) {
        return err({
          type: "Array",
          value,
          reason: {
            kind: "Element",
            index: i,
            error: elementResult.error
          }
        });
      }
      result.push(elementResult.value);
    }
    return ok(result);
  };
  return {
    ...createType("Array", { fromUnknown, fromParent }),
    element
  };
};
var formatArrayError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "NotArray":
      return `Expected an array but received ${error.value}.`;
    case "Element":
      return `Invalid element at index ${error.reason.index}: ${formatTypeError(error.reason.error)}`;
  }
});
var set = (element) => {
  const fromUnknown = (value) => {
    if (!(value instanceof globalThis.Set)) {
      return err({
        type: "Set",
        value,
        reason: { kind: "NotSet" }
      });
    }
    let index = 0;
    for (const item of value) {
      const elementResult = element.fromUnknown(item);
      if (!elementResult.ok) {
        return err({
          type: "Set",
          value,
          reason: {
            kind: "Element",
            index,
            error: elementResult.error
          }
        });
      }
      index++;
    }
    return ok(value);
  };
  const fromParent = (value) => {
    let index = 0;
    for (const item of value) {
      const elementResult = element.fromParent(item);
      if (!elementResult.ok) {
        return err({
          type: "Set",
          value,
          reason: {
            kind: "Element",
            index,
            error: elementResult.error
          }
        });
      }
      index++;
    }
    return ok(value);
  };
  return {
    ...createType("Set", { fromUnknown, fromParent }),
    element
  };
};
var formatSetError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "NotSet":
      return `Expected a Set but received ${error.value}.`;
    case "Element":
      return `Invalid element at index ${error.reason.index}: ${formatTypeError(error.reason.error)}`;
  }
});
var record = (keyType, valueType) => {
  const fromUnknown = (value) => {
    if (!isPlainObject(value)) {
      return err({
        type: "Record",
        value,
        reason: { kind: "NotRecord" }
      });
    }
    const result = {};
    for (const [rawKey, rawValue] of Object.entries(value)) {
      const keyResult = keyType.fromUnknown(rawKey);
      if (!keyResult.ok) {
        return err({
          type: "Record",
          value,
          reason: { kind: "Key", key: rawKey, error: keyResult.error }
        });
      }
      const valueResult = valueType.fromUnknown(rawValue);
      if (!valueResult.ok) {
        return err({
          type: "Record",
          value,
          reason: {
            kind: "Value",
            key: rawKey,
            error: valueResult.error
          }
        });
      }
      result[keyResult.value] = valueResult.value;
    }
    return ok(result);
  };
  const fromParent = (value) => {
    const result = {};
    for (const [rawKey, rawValue] of Object.entries(value)) {
      const keyResult = keyType.fromParent(rawKey);
      if (!keyResult.ok) {
        return err({
          type: "Record",
          value,
          reason: {
            kind: "Key",
            key: rawKey,
            error: keyResult.error
          }
        });
      }
      const valueResult = valueType.fromParent(rawValue);
      if (!valueResult.ok) {
        return err({
          type: "Record",
          value,
          reason: {
            kind: "Value",
            key: keyResult.value,
            error: valueResult.error
          }
        });
      }
      result[keyResult.value] = valueResult.value;
    }
    return ok(result);
  };
  return {
    ...createType("Record", {
      fromUnknown,
      fromParent
    }),
    key: keyType,
    value: valueType
  };
};
var formatRecordError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "NotRecord":
      return `Expected a record (plain object) but received ${error.value}.`;
    case "Key":
      return `Invalid key ${error.reason.key}: ${formatTypeError(error.reason.error)}`;
    case "Value":
      return `Invalid value for key ${error.reason.key}: ${formatTypeError(error.reason.error)}`;
  }
});
function object(props, record2) {
  const propKeys = Object.keys(props);
  const fromUnknown = (value) => {
    if (!isPlainObject(value)) {
      return err({
        type: record2 ? "ObjectWithRecord" : "Object",
        value,
        reason: { kind: "NotObject" }
      });
    }
    const errors2 = {};
    const result = {};
    for (const key of propKeys) {
      if (!(key in value) && isOptionalType(props[key])) {
        continue;
      }
      const propResult = props[key].fromUnknown(value[key]);
      if (!propResult.ok) {
        errors2[key] = propResult.error;
      } else {
        result[key] = propResult.value;
      }
    }
    const extraKeys = Object.keys(value).filter((key) => !propKeys.includes(key));
    if (record2) {
      for (const key of extraKeys) {
        const keyResult = record2.key.fromUnknown(key);
        if (!keyResult.ok) {
          return err({
            type: "ObjectWithRecord",
            value,
            reason: {
              kind: "IndexKey",
              key,
              error: keyResult.error
            }
          });
        }
        const valueResult = record2.value.fromUnknown(value[key]);
        if (!valueResult.ok) {
          return err({
            type: "ObjectWithRecord",
            value,
            reason: {
              kind: "IndexValue",
              key,
              error: valueResult.error
            }
          });
        }
        result[keyResult.value] = valueResult.value;
      }
    } else if (extraKeys.length > 0) {
      return err({
        type: "Object",
        value,
        reason: { kind: "ExtraKeys", extraKeys }
      });
    }
    if (Object.keys(errors2).length > 0) {
      return err({
        type: record2 ? "ObjectWithRecord" : "Object",
        value,
        reason: { kind: "Props", errors: errors2 }
      });
    }
    return ok(result);
  };
  const fromParent = (value) => {
    const errors2 = {};
    const result = {};
    for (const key of propKeys) {
      if (!(key in value) && isOptionalType(props[key])) {
        continue;
      }
      const propResult = props[key].fromParent(value[key]);
      if (!propResult.ok) {
        errors2[key] = propResult.error;
      } else {
        result[key] = propResult.value;
      }
    }
    if (record2) {
      for (const [key, val] of Object.entries(value)) {
        if (!propKeys.includes(key)) {
          const keyResult = record2.key.fromParent(key);
          if (!keyResult.ok) {
            return err({
              type: "ObjectWithRecord",
              value,
              reason: { kind: "IndexKey", key, error: keyResult.error }
            });
          }
          const valueResult = record2.value.fromParent(val);
          if (!valueResult.ok) {
            return err({
              type: "ObjectWithRecord",
              value,
              reason: { kind: "IndexValue", key, error: valueResult.error }
            });
          }
          result[keyResult.value] = valueResult.value;
        }
      }
    }
    if (Object.keys(errors2).length > 0) {
      return err({
        type: record2 ? "ObjectWithRecord" : "Object",
        value,
        reason: { kind: "Props", errors: errors2 }
      });
    }
    return ok(result);
  };
  return {
    ...createType(record2 ? "ObjectWithRecord" : "Object", {
      fromUnknown,
      fromParent
    }),
    props,
    ...record2 ? { record: record2 } : {}
  };
}
var formatObjectError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "NotObject":
      return `Expected a plain object but received ${error.value}`;
    case "ExtraKeys":
      return `Unexpected extra keys: ${error.reason.extraKeys.join(", ")}`;
    case "Props": {
      const formattedErrors = Object.entries(error.reason.errors).filter(([, error2]) => error2 !== void 0).map(([key, error2]) => `- ${key}: ${formatTypeError(error2)}`).join("\n");
      return `Invalid object properties:
${formattedErrors}`;
    }
  }
});
var formatObjectWithRecordError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "NotObject":
      return `Expected an object, but received ${error.value}.`;
    case "Props":
      return formatObjectError(formatTypeError)({
        type: "Object",
        value: error.value,
        reason: { kind: "Props", errors: error.reason.errors }
      });
    case "IndexKey":
      return `Invalid index key ${error.reason.key}: ${formatTypeError(error.reason.error)}`;
    case "IndexValue":
      return `Invalid value at index key ${error.reason.key}: ${formatTypeError(error.reason.error)}`;
  }
});
function union(...args) {
  const members = args.map((arg) => isType(arg) ? arg : literal(arg));
  const fromUnknown = (value) => {
    const errors2 = [];
    for (const member of members) {
      const result = member.fromUnknown(value);
      if (result.ok)
        return result;
      errors2.push(result.error);
    }
    return err({
      type: "Union",
      value,
      errors: errors2
    });
  };
  return {
    ...createType("Union", {
      fromUnknown,
      fromParent: fromUnknown
    }),
    members
  };
}
var formatUnionError = (formatTypeError) => createTypeErrorFormatter((error) => {
  const formattedErrors = error.errors.map((e, i) => `  ${i + 1}. ${formatTypeError(e)}`).join("\n");
  return `Value ${error.value} does not match any member of the union.
Errors:
${formattedErrors}`;
});
var isUnionType = (t) => t.name === "Union" && Array.isArray(t.members);
var recursive = (create) => {
  let type;
  return {
    name: "Recursive",
    from: (value) => {
      type ??= create();
      return type.from(value);
    },
    fromUnknown: (value) => {
      type ??= create();
      return type.fromUnknown(value);
    },
    fromParent: (value) => {
      type ??= create();
      return type.fromParent(value);
    },
    is: (value) => {
      type ??= create();
      return type.is(value);
    },
    [EvoluTypeSymbol]: true,
    getParentType: () => {
      type ??= create();
      return type;
    }
  };
};
var nullOr = (type) => union(Null, type);
var undefinedOr = (type) => union(Undefined, type);
var nullishOr = (type) => union(Undefined, Null, type);
var tuple = (...elements) => {
  const fromUnknown = (value) => {
    if (!Array.isArray(value) || value.length !== elements.length) {
      return err({
        type: "Tuple",
        value,
        reason: { kind: "InvalidLength", expected: elements.length }
      });
    }
    const result = [];
    for (let i = 0; i < elements.length; i++) {
      const elementResult = elements[i].fromUnknown(value[i]);
      if (!elementResult.ok) {
        return err({
          type: "Tuple",
          value,
          reason: {
            kind: "Element",
            index: i,
            error: elementResult.error
          }
        });
      }
      result[i] = elementResult.value;
    }
    return ok(result);
  };
  const fromParent = (value) => {
    if (!Array.isArray(value) || value.length !== elements.length) {
      return err({
        type: "Tuple",
        value,
        reason: { kind: "InvalidLength", expected: elements.length }
      });
    }
    const result = [];
    for (let i = 0; i < elements.length; i++) {
      const elementResult = elements[i].fromParent(value[i]);
      if (!elementResult.ok) {
        return err({
          type: "Tuple",
          value,
          reason: {
            kind: "Element",
            index: i,
            error: elementResult.error
          }
        });
      }
      result.push(elementResult.value);
    }
    return ok(result);
  };
  return {
    ...createType("Tuple", {
      fromUnknown,
      fromParent
    }),
    elements
  };
};
var formatTupleError = (formatTypeError) => createTypeErrorFormatter((error) => {
  switch (error.reason.kind) {
    case "InvalidLength":
      return `Expected a tuple of length ${error.reason.expected}, but received ${error.value}.`;
    case "Element":
      return `Invalid element at index ${error.reason.index}:
  ${formatTypeError(error.reason.error)}`;
  }
});
var Int64 = brand("Int64", BigInt2, (value) => value >= -9223372036854775808n && value <= 9223372036854775807n ? ok(value) : err({ type: "Int64", value }));
var formatInt64Error = createTypeErrorFormatter((error) => `The value ${error.value} is not a valid 64-bit signed integer (Int64).`);
var Int64String = brand("Int64", NonEmptyTrimmedString, (value) => trySync(() => {
  const maybeInt = globalThis.BigInt(value);
  Int64.orThrow(maybeInt);
  return value;
}, () => ({ type: "Int64String", value })));
var formatInt64StringError = createTypeErrorFormatter((error) => `The value ${error.value} is not a valid Int64 string.`);
var JsonValue = recursive(() => union(String2, FiniteNumber, Boolean2, Null, JsonArray, JsonObject));
var JsonArray = array(JsonValue);
var JsonObject = record(String2, JsonValue);
var parseJson = (value) => trySync(() => JSON.parse(value), (error) => ({
  type: `Json`,
  value,
  message: globalThis.String(error)
}));
var Json = brand("Json", String2, (value) => {
  const result = parseJson(value);
  if (!result.ok)
    return result;
  return ok(value);
});
var formatJsonError = createTypeErrorFormatter((error) => `Invalid JSON: ${error.value}. Error: ${error.message}`);
var jsonValueToJson = (value) => JSON.stringify(value);
var jsonToJsonValue = (value) => JSON.parse(value);
var json = (type, name) => {
  const BrandedJsonType = brand(name, String2, (value) => {
    const parseResult = parseJson(value);
    if (!parseResult.ok)
      return parseResult;
    const validationResult = type.fromUnknown(parseResult.value);
    if (!validationResult.ok)
      return validationResult;
    return ok(value);
  });
  return [
    BrandedJsonType,
    jsonValueToJson,
    jsonToJsonValue
  ];
};
var optional = (type) => ({
  ...createType("Optional", {
    fromUnknown: type.fromUnknown,
    fromParent: type.fromParent
  }),
  parent: type
});
var isOptionalType = (x) => typeof x === "object" && x != null && "name" in x && x.name === "Optional";
var partial = (props) => {
  const optionalProps = {};
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      optionalProps[key] = optional(props[key]);
    }
  }
  return object(optionalProps);
};
var nullableToOptional = (props) => {
  const transformedProps = {};
  for (const key in props) {
    const type = props[key];
    if (isUnionType(type)) {
      const hasNull = type.members.some((m) => m === Null);
      if (hasNull) {
        transformedProps[key] = optional(type);
        continue;
      }
    }
    transformedProps[key] = type;
  }
  return object(transformedProps);
};
function omit(objectType, ...keys) {
  const newProps = {};
  for (const key in objectType.props) {
    if (!keys.includes(key)) {
      newProps[key] = objectType.props[key];
    }
  }
  return object(newProps);
}
var maxMutationSize = 655360;
var validMutationSize = (type) => brand("ValidMutationSize", type, (value) => pack(value).byteLength <= maxMutationSize ? ok(value) : err({ type: "ValidMutationSize", value }));
var formatValidMutationSizeError = createTypeErrorFormatter((error) => `The mutation size exceeds the maximum limit of ${maxMutationSize} bytes. The provided mutation has a size of ${pack(error.value).byteLength} bytes.`);
var createFormatTypeError = (extraFormatter) => {
  const formatTypeError = (error) => {
    const extraMessage = extraFormatter?.(error);
    if (extraMessage != null)
      return extraMessage;
    error = error;
    switch (error.type) {
      case "String":
        return formatStringError(error);
      case "Number":
        return formatNumberError(error);
      case "BigInt":
        return formatBigIntError(error);
      case "Boolean":
        return formatBooleanError(error);
      case "Undefined":
        return formatUndefinedError(error);
      case "Null":
        return formatNullError(error);
      case "Function":
        return formatFunctionError(error);
      case "Uint8Array":
        return formatUint8ArrayError(error);
      case "InstanceOf":
        return formatInstanceOfError(error);
      case "EvoluType":
        return formatIsTypeError(error);
      case "CurrencyCode":
        return formatCurrencyCodeError(error);
      case "DateIso":
        return formatDateIsoError(error);
      case "Trimmed":
        return formatTrimmedError(error);
      case "MinLength":
        return formatMinLengthError(error);
      case "MaxLength":
        return formatMaxLengthError(error);
      case "Length":
        return formatLengthError(error);
      case "Mnemonic":
        return formatMnemonicError(error);
      case "Regex":
        return formatRegexError(error);
      case "Id":
        return formatIdError(error);
      case "TableId":
        return formatTableIdError(error);
      case "Positive":
        return formatPositiveError(error);
      case "Negative":
        return formatNegativeError(error);
      case "NonPositive":
        return formatNonPositiveError(error);
      case "NonNegative":
        return formatNonNegativeError(error);
      case "Int":
        return formatIntError(error);
      case "GreaterThan":
        return formatGreaterThanError(error);
      case "LessThan":
        return formatLessThanError(error);
      case "GreaterThanOrEqualTo":
        return formatGreaterThanOrEqualToError(error);
      case "LessThanOrEqualTo":
        return formatLessThanOrEqualToError(error);
      case "NonNaN":
        return formatNonNaNError(error);
      case "Finite":
        return formatFiniteError(error);
      case "MultipleOf":
        return formatMultipleOfError(error);
      case "Between":
        return formatBetweenError(error);
      case "Literal":
        return formatLiteralError(error);
      case "Int64":
        return formatInt64Error(error);
      case "Int64String":
        return formatInt64StringError(error);
      case "Json":
        return formatJsonError(error);
      case "ValidMutationSize":
        return formatValidMutationSizeError(error);
      // Composite Types
      case "SimplePassword":
        return formatSimplePasswordError(formatTypeError)(error);
      case "Array":
        return formatArrayError(formatTypeError)(error);
      case "Set":
        return formatSetError(formatTypeError)(error);
      case "Record":
        return formatRecordError(formatTypeError)(error);
      case "Object":
        return formatObjectError(formatTypeError)(error);
      case "ObjectWithRecord":
        return formatObjectWithRecordError(formatTypeError)(error);
      case "Union":
        return formatUnionError(formatTypeError)(error);
      case "Tuple":
        return formatTupleError(formatTypeError)(error);
      default: {
        const unknownError = error;
        return `A value ${safelyStringifyUnknownValue(unknownError.value)} is not valid for type ${unknownError.type}.`;
      }
    }
  };
  return formatTypeError;
};
var typeErrorToStandardSchemaIssues = (error, formatTypeError, path = []) => {
  if (error.type === "Array") {
    const arrayError = error;
    if (arrayError.reason.kind === "NotArray") {
      return [{ message: formatTypeError(error), path }];
    }
    return typeErrorToStandardSchemaIssues(arrayError.reason.error, formatTypeError, [...path, arrayError.reason.index]);
  }
  if (error.type === "Set") {
    const setError = error;
    if (setError.reason.kind === "NotSet") {
      return [{ message: formatTypeError(error), path }];
    }
    return typeErrorToStandardSchemaIssues(setError.reason.error, formatTypeError, [...path, setError.reason.index]);
  }
  if (error.type === "Object") {
    const objectError = error;
    if (objectError.reason.kind === "NotObject" || objectError.reason.kind === "ExtraKeys") {
      return [{ message: formatTypeError(error), path }];
    }
    const issues = [];
    for (const [key, propError] of Object.entries(objectError.reason.errors)) {
      issues.push(...typeErrorToStandardSchemaIssues(propError, formatTypeError, [...path, key]));
    }
    return issues;
  }
  if (error.type === "ObjectWithRecord") {
    const objectWithRecordError = error;
    if (objectWithRecordError.reason.kind === "NotObject") {
      return [{ message: formatTypeError(error), path }];
    }
    if (objectWithRecordError.reason.kind === "IndexKey" || objectWithRecordError.reason.kind === "IndexValue") {
      return typeErrorToStandardSchemaIssues(objectWithRecordError.reason.error, formatTypeError, [...path, objectWithRecordError.reason.key]);
    }
    const issues = [];
    for (const [key, propError] of Object.entries(objectWithRecordError.reason.errors)) {
      issues.push(...typeErrorToStandardSchemaIssues(propError, formatTypeError, [...path, key]));
    }
    return issues;
  }
  if (error.type === "Record") {
    const recordError = error;
    if (recordError.reason.kind === "NotRecord") {
      return [{ message: formatTypeError(error), path }];
    }
    return typeErrorToStandardSchemaIssues(recordError.reason.error, formatTypeError, [...path, recordError.reason.key]);
  }
  if (error.type === "Tuple") {
    const tupleError = error;
    if (tupleError.reason.kind === "InvalidLength") {
      return [{ message: formatTypeError(error), path }];
    }
    return typeErrorToStandardSchemaIssues(tupleError.reason.error, formatTypeError, [...path, tupleError.reason.index]);
  }
  if (error.type === "Union") {
    const unionError = error;
    return unionError.errors.flatMap((err2) => typeErrorToStandardSchemaIssues(err2, formatTypeError, path));
  }
  if (error.type === "Brand") {
    const brandError = error;
    if ("parentError" in brandError) {
      return typeErrorToStandardSchemaIssues(brandError.parentError, formatTypeError, path);
    }
    return [{ message: formatTypeError(error), path }];
  }
  return [{ message: formatTypeError(error), path }];
};
var cachedStandardSchemaFormatTypeError;

// node_modules/@evolu/common/dist/src/Buffer.js
var BufferError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
var createBuffer = (arrayLike) => {
  let value = arrayLike ? new globalThis.Uint8Array(arrayLike) : new globalThis.Uint8Array(512);
  let length2 = NonNegativeInt.orThrow(arrayLike ? arrayLike.length : 0);
  const buffer = {
    getCapacity: () => NonNegativeInt.orThrow(value.length),
    getLength: () => length2,
    extend: (arg) => {
      const targetSize = length2 + arg.length;
      if (value.length < targetSize) {
        const oldValue = value;
        const newCapacity = Math.max(value.length * 2, targetSize);
        value = new globalThis.Uint8Array(newCapacity);
        value.set(oldValue);
      }
      value.set(arg, length2);
      length2 = NonNegativeInt.orThrow(length2 + arg.length);
    },
    shift: () => {
      if (length2 === 0) {
        throw new BufferError("Buffer parse ended prematurely");
      }
      const first = value[0];
      value = value.subarray(1);
      length2--;
      return NonNegativeInt.orThrow(first);
    },
    shiftN: (n) => {
      if (length2 < n) {
        throw new BufferError("Buffer parse ended prematurely");
      }
      const subarray = value.subarray(0, n);
      value = value.subarray(n);
      length2 = NonNegativeInt.orThrow(length2 - n);
      return subarray;
    },
    truncate: (newLength) => {
      if (newLength > length2) {
        throw new BufferError("Cannot truncate to a length greater than current");
      }
      length2 = newLength;
    },
    reset: () => {
      length2 = NonNegativeInt.orThrow(0);
    },
    unwrap: () => value.subarray(0, length2)
  };
  return buffer;
};

// node_modules/@evolu/common/dist/src/Cache.js
var createLruCache = (capacity) => {
  const internalMap = /* @__PURE__ */ new Map();
  return {
    has: (key) => internalMap.has(key),
    get: (key) => {
      const value = internalMap.get(key);
      if (value === void 0)
        return void 0;
      internalMap.delete(key);
      internalMap.set(key, value);
      return value;
    },
    set: (key, val) => {
      if (internalMap.has(key)) {
        internalMap.delete(key);
      } else if (internalMap.size === capacity) {
        const firstKey = internalMap.keys().next().value;
        internalMap.delete(firstKey);
      }
      internalMap.set(key, val);
    },
    delete: (key) => {
      internalMap.delete(key);
    },
    map: internalMap
  };
};

// node_modules/@evolu/common/dist/src/Callbacks.js
var createCallbacks = (deps) => {
  const callbackMap = /* @__PURE__ */ new Map();
  return {
    register: (callback) => {
      const id2 = createId(deps);
      callbackMap.set(id2, callback);
      return id2;
    },
    execute: (id2, ...args) => {
      const callback = callbackMap.get(id2);
      if (!callback)
        return;
      callbackMap.delete(id2);
      if (args.length === 0) {
        callback();
      } else {
        callback(args[0]);
      }
    }
  };
};

// node_modules/@evolu/common/dist/src/Console.js
var createConsole = (config = {}) => {
  const instance = {
    enabled: config.enableLogging ?? false,
    log: (...args) => {
      if (instance.enabled)
        console.log(...args);
    },
    info: (...args) => {
      if (instance.enabled)
        console.info(...args);
    },
    warn: (...args) => {
      if (instance.enabled)
        console.warn(...args);
    },
    error: (...args) => {
      console.error(...args);
    },
    debug: (...args) => {
      if (instance.enabled)
        console.debug(...args);
    },
    time: (label) => {
      if (instance.enabled)
        console.time(label);
    },
    timeLog: (label, ...data) => {
      if (instance.enabled)
        console.timeLog(label, ...data);
    },
    timeEnd: (label) => {
      if (instance.enabled)
        console.timeEnd(label);
    },
    dir: (object2, options) => {
      if (instance.enabled)
        console.dir(object2, options);
    },
    table: (tabularData, properties) => {
      if (instance.enabled)
        console.table(tabularData, properties);
    },
    count: (label) => {
      if (instance.enabled)
        console.count(label);
    },
    countReset: (label) => {
      if (instance.enabled)
        console.countReset(label);
    },
    assert: (value, message, ...optionalParams) => {
      if (instance.enabled)
        console.assert(value, message, ...optionalParams);
    },
    trace: (message, ...optionalParams) => {
      if (instance.enabled)
        console.trace(message, ...optionalParams);
    }
  };
  return instance;
};
var createConsoleWithTime = (config = { timestampType: "relative" }) => {
  const console2 = createConsole(config);
  const startTime = performance.now();
  const getTimestamp = () => {
    if (config.timestampType === "relative") {
      const elapsed = (performance.now() - startTime) / 1e3;
      if (elapsed < 60) {
        return `+${elapsed.toFixed(3)}s`;
      } else if (elapsed < 3600) {
        const minutes = Math.floor(elapsed / 60);
        const seconds = (elapsed % 60).toFixed(3);
        return `+${minutes}m${seconds}s`;
      } else {
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor(elapsed % 3600 / 60);
        const seconds = (elapsed % 3600 % 60).toFixed(3);
        return `+${hours}h${minutes}m${seconds}s`;
      }
    } else {
      const now = /* @__PURE__ */ new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
  };
  const withTimestamp = (fn) => (...args) => {
    fn(`[${getTimestamp()}]`, ...args);
  };
  console2.log = withTimestamp(console2.log);
  console2.info = withTimestamp(console2.info);
  console2.warn = withTimestamp(console2.warn);
  console2.error = withTimestamp(console2.error);
  console2.debug = withTimestamp(console2.debug);
  console2.trace = withTimestamp(console2.trace);
  return console2;
};

// node_modules/@noble/ciphers/_arx.js
var encodeStr = (str) => Uint8Array.from(str.split(""), (c) => c.charCodeAt(0));
var sigma16 = encodeStr("expand 16-byte k");
var sigma32 = encodeStr("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
function rotl2(a, b) {
  return a << b | a >>> 32 - b;
}
function isAligned322(b) {
  return b.byteOffset % 4 === 0;
}
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = Uint32Array.of();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u32(block);
  const isAligned = isAligned322(data) && isAligned322(output);
  const d32 = isAligned ? u32(data) : U32_EMPTY;
  const o32 = isAligned ? u32(output) : U32_EMPTY;
  for (let pos = 0; pos < len; counter++) {
    core(sigma, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j = 0, posj; j < BLOCK_LEN32; j++) {
        posj = pos32 + j;
        o32[posj] = d32[posj] ^ b32[j];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j = 0, posj; j < take; j++) {
      posj = pos + j;
      output[posj] = data[posj] ^ block[j];
    }
    pos += take;
  }
}
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  anumber(counterLength);
  anumber(rounds);
  abool(counterRight);
  abool(allowShortKeys);
  return (key, nonce, data, output, counter = 0) => {
    abytes(key, void 0, "key");
    abytes(nonce, void 0, "nonce");
    abytes(data, void 0, "data");
    const len = data.length;
    if (output === void 0)
      output = new Uint8Array(len);
    abytes(output, void 0, "output");
    anumber(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (output.length < len)
      throw new Error(`arx: output (${output.length}) is shorter than data (${len})`);
    const toClean = [];
    let l = key.length;
    let k;
    let sigma;
    if (l === 32) {
      toClean.push(k = copyBytes(key));
      sigma = sigma32_32;
    } else if (l === 16 && allowShortKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k);
    } else {
      abytes(key, 32, "arx key");
      throw new Error("invalid key size");
    }
    if (!isAligned322(nonce))
      toClean.push(nonce = copyBytes(nonce));
    const k32 = u32(k);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error(`arx: extended nonce must be 24 bytes`);
      extendNonceFn(sigma, k32, u32(nonce.subarray(0, 16)), k32);
      nonce = nonce.subarray(16);
    }
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc;
      toClean.push(nonce);
    }
    const n32 = u32(nonce);
    runCipher(core, sigma, k32, n32, data, output, counter, rounds);
    clean(...toClean);
    return output;
  };
}
var _XorStreamPRG = class __XorStreamPRG {
  blockLen;
  keyLen;
  nonceLen;
  state;
  buf;
  key;
  nonce;
  pos;
  ctr;
  cipher;
  constructor(cipher, blockLen, keyLen, nonceLen, seed) {
    this.cipher = cipher;
    this.blockLen = blockLen;
    this.keyLen = keyLen;
    this.nonceLen = nonceLen;
    this.state = new Uint8Array(this.keyLen + this.nonceLen);
    this.reseed(seed);
    this.ctr = 0;
    this.pos = this.blockLen;
    this.buf = new Uint8Array(this.blockLen);
    this.key = this.state.subarray(0, this.keyLen);
    this.nonce = this.state.subarray(this.keyLen);
  }
  reseed(seed) {
    abytes(seed);
    if (!seed || seed.length === 0)
      throw new Error("entropy required");
    for (let i = 0; i < seed.length; i++)
      this.state[i % this.state.length] ^= seed[i];
    this.ctr = 0;
    this.pos = this.blockLen;
  }
  addEntropy(seed) {
    this.state.set(this.randomBytes(this.state.length));
    this.reseed(seed);
  }
  randomBytes(len) {
    anumber(len);
    if (len === 0)
      return new Uint8Array(0);
    const out = new Uint8Array(len);
    let outPos = 0;
    if (this.pos < this.blockLen) {
      const take = Math.min(len, this.blockLen - this.pos);
      out.set(this.buf.subarray(this.pos, this.pos + take), 0);
      this.pos += take;
      outPos += take;
      if (outPos === len)
        return out;
    }
    const blocks = Math.floor((len - outPos) / this.blockLen);
    if (blocks > 0) {
      const blockBytes = blocks * this.blockLen;
      const b = out.subarray(outPos, outPos + blockBytes);
      this.cipher(this.key, this.nonce, b, b, this.ctr);
      this.ctr += blocks;
      outPos += blockBytes;
    }
    const left = len - outPos;
    if (left > 0) {
      this.buf.fill(0);
      this.cipher(this.key, this.nonce, this.buf, this.buf, this.ctr++);
      out.set(this.buf.subarray(0, left), outPos);
      this.pos = left;
    }
    return out;
  }
  clone() {
    return new __XorStreamPRG(this.cipher, this.blockLen, this.keyLen, this.nonceLen, this.randomBytes(this.state.length));
  }
  clean() {
    this.pos = 0;
    this.ctr = 0;
    this.buf.fill(0);
    this.state.fill(0);
  }
};
var createPRG = (cipher, blockLen, keyLen, nonceLen) => {
  return (seed = randomBytes(32)) => new _XorStreamPRG(cipher, blockLen, keyLen, nonceLen, seed);
};

// node_modules/@noble/ciphers/_poly1305.js
function u8to16(a, i) {
  return a[i++] & 255 | (a[i++] & 255) << 8;
}
var Poly1305 = class {
  blockLen = 16;
  outputLen = 16;
  buffer = new Uint8Array(16);
  r = new Uint16Array(10);
  // Allocating 1 array with .subarray() here is slower than 3
  h = new Uint16Array(10);
  pad = new Uint16Array(8);
  pos = 0;
  finished = false;
  // Can be speed-up using BigUint64Array, at the cost of complexity
  constructor(key) {
    key = copyBytes(abytes(key, 32, "key"));
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i = 0; i < 8; i++)
      this.pad[i] = u8to16(key, 16 + 2 * i);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h, r } = this;
    const r0 = r[0];
    const r1 = r[1];
    const r2 = r[2];
    const r3 = r[3];
    const r4 = r[4];
    const r5 = r[5];
    const r6 = r[6];
    const r7 = r[7];
    const r8 = r[8];
    const r9 = r[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h[0] + (t0 & 8191);
    let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h[5] + (t4 >>> 1 & 8191);
    let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h[9] + (t7 >>> 5 | hibit);
    let c = 0;
    let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
    c = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
    c += d0 >>> 13;
    d0 &= 8191;
    let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
    c = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
    c += d1 >>> 13;
    d1 &= 8191;
    let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
    c = d2 >>> 13;
    d2 &= 8191;
    d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
    c += d2 >>> 13;
    d2 &= 8191;
    let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
    c = d3 >>> 13;
    d3 &= 8191;
    d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c += d3 >>> 13;
    d3 &= 8191;
    let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
    c = d4 >>> 13;
    d4 &= 8191;
    d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c += d4 >>> 13;
    d4 &= 8191;
    let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
    c = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c += d5 >>> 13;
    d5 &= 8191;
    let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
    c = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c += d6 >>> 13;
    d6 &= 8191;
    let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
    c = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c += d7 >>> 13;
    d7 &= 8191;
    let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
    c = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c += d8 >>> 13;
    d8 &= 8191;
    let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
    c = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
    c += d9 >>> 13;
    d9 &= 8191;
    c = (c << 2) + c | 0;
    c = c + d0 | 0;
    d0 = c & 8191;
    c = c >>> 13;
    d1 += c;
    h[0] = d0;
    h[1] = d1;
    h[2] = d2;
    h[3] = d3;
    h[4] = d4;
    h[5] = d5;
    h[6] = d6;
    h[7] = d7;
    h[8] = d8;
    h[9] = d9;
  }
  finalize() {
    const { h, pad } = this;
    const g = new Uint16Array(10);
    let c = h[1] >>> 13;
    h[1] &= 8191;
    for (let i = 2; i < 10; i++) {
      h[i] += c;
      c = h[i] >>> 13;
      h[i] &= 8191;
    }
    h[0] += c * 5;
    c = h[0] >>> 13;
    h[0] &= 8191;
    h[1] += c;
    c = h[1] >>> 13;
    h[1] &= 8191;
    h[2] += c;
    g[0] = h[0] + 5;
    c = g[0] >>> 13;
    g[0] &= 8191;
    for (let i = 1; i < 10; i++) {
      g[i] = h[i] + c;
      c = g[i] >>> 13;
      g[i] &= 8191;
    }
    g[9] -= 1 << 13;
    let mask = (c ^ 1) - 1;
    for (let i = 0; i < 10; i++)
      g[i] &= mask;
    mask = ~mask;
    for (let i = 0; i < 10; i++)
      h[i] = h[i] & mask | g[i];
    h[0] = (h[0] | h[1] << 13) & 65535;
    h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
    h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
    h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
    h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
    h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
    h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
    h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
    let f = h[0] + pad[0];
    h[0] = f & 65535;
    for (let i = 1; i < 8; i++) {
      f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
      h[i] = f & 65535;
    }
    clean(g);
  }
  update(data) {
    aexists(this);
    abytes(data);
    data = copyBytes(data);
    const { buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    clean(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, h } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i = 0; i < 8; i++) {
      out[opos++] = h[i] >>> 0;
      out[opos++] = h[i] >>> 8;
    }
    return out;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key).update(msg).digest();
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
var poly1305 = (() => wrapConstructorWithKey((key) => new Poly1305(key)))();

// node_modules/@noble/ciphers/chacha.js
var ctmp = new Uint32Array(16);
function chachaCore(s, k, n, out, cnt, rounds = 20) {
  let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r = 0; r < rounds; r += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
function hchacha(s, k, i, out) {
  let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
  for (let r = 0; r < 20; r += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl2(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl2(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl2(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl2(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl2(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl2(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl2(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl2(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl2(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl2(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl2(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl2(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl2(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl2(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl2(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl2(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = x00;
  out[oi++] = x01;
  out[oi++] = x02;
  out[oi++] = x03;
  out[oi++] = x12;
  out[oi++] = x13;
  out[oi++] = x14;
  out[oi++] = x15;
}
var chacha20orig = createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  allowShortKeys: true
});
var chacha20 = createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  allowShortKeys: false
});
var xchacha20 = createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  extendNonceFn: hchacha,
  allowShortKeys: false
});
var chacha8 = createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  rounds: 8
});
var chacha12 = createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  rounds: 12
});
var ZEROS16 = new Uint8Array(16);
var updatePadded = (h, msg) => {
  h.update(msg);
  const leftover = msg.length % 16;
  if (leftover)
    h.update(ZEROS16.subarray(leftover));
};
var ZEROS32 = new Uint8Array(32);
function computeTag(fn, key, nonce, ciphertext, AAD) {
  if (AAD !== void 0)
    abytes(AAD, void 0, "AAD");
  const authKey = fn(key, nonce, ZEROS32);
  const lengths = u64Lengths(ciphertext.length, AAD ? AAD.length : 0, true);
  const h = poly1305.create(authKey);
  if (AAD)
    updatePadded(h, AAD);
  updatePadded(h, ciphertext);
  h.update(lengths);
  const res = h.digest();
  clean(authKey, lengths);
  return res;
}
var _poly1305_aead = (xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  return {
    encrypt(plaintext, output) {
      const plength = plaintext.length;
      output = getOutput(plength + tagLength, output, false);
      output.set(plaintext);
      const oPlain = output.subarray(0, -tagLength);
      xorStream(key, nonce, oPlain, oPlain, 1);
      const tag = computeTag(xorStream, key, nonce, oPlain, AAD);
      output.set(tag, plength);
      clean(tag);
      return output;
    },
    decrypt(ciphertext, output) {
      output = getOutput(ciphertext.length - tagLength, output, false);
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes(passedTag, tag))
        throw new Error("invalid tag");
      output.set(ciphertext.subarray(0, -tagLength));
      xorStream(key, nonce, output, output, 1);
      clean(tag);
      return output;
    }
  };
};
var chacha20poly1305 = wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
var xchacha20poly1305 = wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));
var rngChacha20 = createPRG(chacha20orig, 64, 32, 8);
var rngChacha8 = createPRG(chacha8, 64, 32, 12);

// node_modules/@evolu/common/dist/src/Crypto.js
var Entropy = brand("Entropy", Uint8Array2);
var Entropy16 = length(16)(Entropy);
var Entropy32 = length(32)(Entropy);
var Entropy64 = length(64)(Entropy);
var createRandomBytes = () => ({
  create: randomBytes2
});
var createSlip21 = (seed, path) => {
  let currentNode = hmac(sha512, utf8ToBytes2("Symmetric key seed"), seed);
  for (const element of path) {
    const label = typeof element === "number" ? element.toString() : element;
    currentNode = deriveSlip21Node(label, currentNode);
  }
  return currentNode.slice(32, 64);
};
var deriveSlip21Node = (label, parentNode) => {
  const labelBytes = utf8ToBytes2(label);
  const message = new globalThis.Uint8Array(labelBytes.byteLength + 1);
  message[0] = 0;
  message.set(labelBytes, 1);
  return hmac(sha512, parentNode.slice(0, 32), message);
};
var EncryptionKey = brand("EncryptionKey", Entropy32);
var createSymmetricCrypto = (deps) => {
  const nonceLength = NonNegativeInt.orThrow(24);
  const symmetricCrypto = {
    nonceLength,
    encrypt: (plaintext, encryptionKey) => {
      const nonce = deps.randomBytes.create(nonceLength);
      const ciphertext = xchacha20poly1305(encryptionKey, nonce).encrypt(plaintext);
      return { nonce, ciphertext };
    },
    decrypt: (ciphertext, encryptionKey, nonce) => trySync(() => xchacha20poly1305(encryptionKey, nonce).decrypt(ciphertext), (error) => ({
      type: "SymmetricCryptoDecryptError",
      error
    }))
  };
  return symmetricCrypto;
};
var createPadmePaddedLength = (length2) => {
  if (length2 <= 0)
    return NonNegativeInt.orThrow(0);
  const e = 31 - Math.clz32(length2 >>> 0);
  const s = 32 - Math.clz32(e >>> 0);
  const z = Math.max(0, e - s);
  const mask = (1 << z) - 1;
  return NonNegativeInt.orThrow(length2 + mask & ~mask);
};
var createPadmePadding = (length2) => {
  const paddedLength = createPadmePaddedLength(length2);
  const paddingLength = NonNegativeInt.orThrow(paddedLength - length2);
  return new globalThis.Uint8Array(paddingLength);
};

// node_modules/@evolu/common/dist/src/Eq.js
var eqStrict = (x, y) => x === y;
var eqString = eqStrict;
var eqNumber = eqStrict;
var eqBigInt = eqStrict;
var eqBoolean = eqStrict;
var eqUndefined = eqStrict;
var eqNull = eqStrict;
var eqFromOrder = (order) => (x, y) => order(x, y) === 0;
var createEqArrayLike = (item) => (x, y) => {
  if (x === y)
    return true;
  if (x.length !== y.length)
    return false;
  for (let i = 0; i < x.length; i++) {
    if (!item(x[i], y[i]))
      return false;
  }
  return true;
};
var eqArrayNumber = createEqArrayLike(eqNumber);
var createEqObject = (eqs) => (x, y) => {
  if (x === y)
    return true;
  for (const key in eqs) {
    if (!eqs[key](x[key], y[key])) {
      return false;
    }
  }
  return true;
};
var eqJsonValue = (a, b) => {
  const stack = [[a, b]];
  const seen = /* @__PURE__ */ new WeakMap();
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (x === y)
      continue;
    const typeX = typeof x;
    const typeY = typeof y;
    if (typeX !== typeY || x === null || y === null)
      return false;
    if (typeX === "number" && isNaN(x) && isNaN(y)) {
      continue;
    }
    if (typeX === "object") {
      const isArrayX = Array.isArray(x);
      const isArrayY = Array.isArray(y);
      if (isArrayX !== isArrayY)
        return false;
      const xObj = x;
      const yObj = y;
      if (seen.has(xObj)) {
        const ySet = seen.get(xObj);
        if (ySet.has(yObj)) {
          continue;
        }
        ySet.add(yObj);
      } else {
        const ySet = /* @__PURE__ */ new WeakSet();
        ySet.add(yObj);
        seen.set(xObj, ySet);
      }
      if (isArrayX && isArrayY) {
        const xArr = x;
        const yArr = y;
        if (xArr.length !== yArr.length)
          return false;
        for (let i = 0; i < xArr.length; i++) {
          stack.push([xArr[i], yArr[i]]);
        }
      } else {
        const xObjTyped = x;
        const yObjTyped = y;
        const xKeys = Object.keys(xObjTyped);
        const yKeys = Object.keys(yObjTyped);
        if (xKeys.length !== yKeys.length)
          return false;
        const yKeySet = new Set(yKeys);
        for (const key of xKeys) {
          if (!yKeySet.has(key))
            return false;
          stack.push([xObjTyped[key], yObjTyped[key]]);
        }
      }
    } else {
      return false;
    }
  }
  return true;
};
var eqJsonValueInput = (a, b) => eqJsonValue(a, b);

// node_modules/@evolu/common/dist/src/Error.js
var createTransferableError = (error) => {
  const convertError = (err2) => {
    const transferableError = Object.getOwnPropertyNames(err2).reduce((acc, key) => {
      const value = err2[key];
      if (key === "cause" && value instanceof Error) {
        acc[key] = convertError(value);
      } else if (typeof value !== "function") {
        acc[key] = value;
      }
      return acc;
    }, {});
    return transferableError;
  };
  if (error instanceof Error) {
    return {
      type: "TransferableError",
      error: convertError(error)
    };
  }
  try {
    return {
      type: "TransferableError",
      error: structuredClone(error)
    };
  } catch {
    try {
      return {
        type: "TransferableError",
        error: String(error)
        // Attempt to convert to a string
      };
    } catch {
      return {
        type: "TransferableError",
        error: "[Unserializable Object]"
      };
    }
  }
};

// node_modules/@evolu/common/dist/src/Function.js
var exhaustiveCheck = (value) => {
  throw new Error(`exhaustiveCheck unhandled case: ${JSON.stringify(value)}`);
};
var identity = (a) => a;
function readonly(value) {
  return value;
}
var constVoid = () => void 0;
var constUndefined = () => void 0;
var constNull = () => null;
var constTrue = () => true;
var constFalse = () => false;

// node_modules/@noble/hashes/legacy.js
var SHA1_IV = Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = new Uint32Array(80);
var _SHA1 = class extends HashMD {
  A = SHA1_IV[0] | 0;
  B = SHA1_IV[1] | 0;
  C = SHA1_IV[2] | 0;
  D = SHA1_IV[3] | 0;
  E = SHA1_IV[4] | 0;
  constructor() {
    super(64, 20, 8, false);
  }
  get() {
    const { A, B, C, D, E } = this;
    return [A, B, C, D, E];
  }
  set(A, B, C, D, E) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA1_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 80; i++)
      SHA1_W[i] = rotl(SHA1_W[i - 3] ^ SHA1_W[i - 8] ^ SHA1_W[i - 14] ^ SHA1_W[i - 16], 1);
    let { A, B, C, D, E } = this;
    for (let i = 0; i < 80; i++) {
      let F, K2;
      if (i < 20) {
        F = Chi(B, C, D);
        K2 = 1518500249;
      } else if (i < 40) {
        F = B ^ C ^ D;
        K2 = 1859775393;
      } else if (i < 60) {
        F = Maj(B, C, D);
        K2 = 2400959708;
      } else {
        F = B ^ C ^ D;
        K2 = 3395469782;
      }
      const T = rotl(A, 5) + F + E + K2 + SHA1_W[i] | 0;
      E = D;
      D = C;
      C = rotl(B, 30);
      B = A;
      A = T;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    this.set(A, B, C, D, E);
  }
  roundClean() {
    clean2(SHA1_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var sha1 = createHasher(() => new _SHA1());
var p32 = Math.pow(2, 32);
var K = Array.from({ length: 64 }, (_, i) => Math.floor(p32 * Math.abs(Math.sin(i + 1))));
var MD5_IV = SHA1_IV.slice(0, 4);
var MD5_W = new Uint32Array(16);
var _MD5 = class extends HashMD {
  A = MD5_IV[0] | 0;
  B = MD5_IV[1] | 0;
  C = MD5_IV[2] | 0;
  D = MD5_IV[3] | 0;
  constructor() {
    super(64, 16, 8, true);
  }
  get() {
    const { A, B, C, D } = this;
    return [A, B, C, D];
  }
  set(A, B, C, D) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      MD5_W[i] = view.getUint32(offset, true);
    let { A, B, C, D } = this;
    for (let i = 0; i < 64; i++) {
      let F, g, s;
      if (i < 16) {
        F = Chi(B, C, D);
        g = i;
        s = [7, 12, 17, 22];
      } else if (i < 32) {
        F = Chi(D, B, C);
        g = (5 * i + 1) % 16;
        s = [5, 9, 14, 20];
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
        s = [4, 11, 16, 23];
      } else {
        F = C ^ (B | ~D);
        g = 7 * i % 16;
        s = [6, 10, 15, 21];
      }
      F = F + A + K[i] + MD5_W[g];
      A = D;
      D = C;
      C = B;
      B = B + rotl(F, s[i % 4]);
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    this.set(A, B, C, D);
  }
  roundClean() {
    clean2(MD5_W);
  }
  destroy() {
    this.set(0, 0, 0, 0);
    clean2(this.buffer);
  }
};
var md5 = createHasher(() => new _MD5());
var Rho160 = Uint8Array.from([
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8
]);
var Id160 = (() => Uint8Array.from(new Array(16).fill(0).map((_, i) => i)))();
var Pi160 = (() => Id160.map((i) => (9 * i + 5) % 16))();
var idxLR = (() => {
  const L = [Id160];
  const R = [Pi160];
  const res = [L, R];
  for (let i = 0; i < 4; i++)
    for (let j of res)
      j.push(j[i].map((k) => Rho160[k]));
  return res;
})();
var idxL = (() => idxLR[0])();
var idxR = (() => idxLR[1])();
var shifts160 = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i) => Uint8Array.from(i));
var shiftsL160 = idxL.map((idx, i) => idx.map((j) => shifts160[i][j]));
var shiftsR160 = idxR.map((idx, i) => idx.map((j) => shifts160[i][j]));
var Kl160 = Uint32Array.from([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr160 = Uint32Array.from([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function ripemd_f(group, x, y, z) {
  if (group === 0)
    return x ^ y ^ z;
  if (group === 1)
    return x & y | ~x & z;
  if (group === 2)
    return (x | ~y) ^ z;
  if (group === 3)
    return x & z | y & ~z;
  return x ^ (y | ~z);
}
var BUF_160 = new Uint32Array(16);
var _RIPEMD160 = class extends HashMD {
  h0 = 1732584193 | 0;
  h1 = 4023233417 | 0;
  h2 = 2562383102 | 0;
  h3 = 271733878 | 0;
  h4 = 3285377520 | 0;
  constructor() {
    super(64, 20, 8, true);
  }
  get() {
    const { h0, h1, h2, h3, h4 } = this;
    return [h0, h1, h2, h3, h4];
  }
  set(h0, h1, h2, h3, h4) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h2 | 0;
    this.h3 = h3 | 0;
    this.h4 = h4 | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      BUF_160[i] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar = al, bl = this.h1 | 0, br = bl, cl = this.h2 | 0, cr = cl, dl = this.h3 | 0, dr = dl, el = this.h4 | 0, er = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl160[group], hbr = Kr160[group];
      const rl = idxL[group], rr = idxR[group];
      const sl = shiftsL160[group], sr = shiftsR160[group];
      for (let i = 0; i < 16; i++) {
        const tl = rotl(al + ripemd_f(group, bl, cl, dl) + BUF_160[rl[i]] + hbl, sl[i]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i = 0; i < 16; i++) {
        const tr = rotl(ar + ripemd_f(rGroup, br, cr, dr) + BUF_160[rr[i]] + hbr, sr[i]) + er | 0;
        ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr;
      }
    }
    this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
  }
  roundClean() {
    clean2(BUF_160);
  }
  destroy() {
    this.destroyed = true;
    clean2(this.buffer);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = createHasher(() => new _RIPEMD160());

// node_modules/@evolu/common/dist/src/Identicon.js
var createIdenticon = (id2, style = "github") => {
  const bytes = idToIdBytes(id2);
  switch (style) {
    case "github": {
      const hashedBytes = md5(bytes);
      const map = (value, inMin, inMax, outMin, outMax) => (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      const h = (hashedBytes[12] & 15) << 8 | hashedBytes[13];
      const hue = map(h, 0, 4095, 0, 360);
      const saturation = 65 - map(hashedBytes[14], 0, 255, 0, 20);
      const lightness = 75 - map(hashedBytes[15], 0, 255, 0, 20);
      const fgColor = `hsl(${hue},${saturation}%,${lightness}%)`;
      const bgColor = `hsl(${hue},${saturation}%,90%)`;
      let rects = `<rect width="5" height="5" fill="${bgColor}"/>`;
      let nibbleIndex = 0;
      for (let x = 2; x >= 0; x--) {
        for (let y = 0; y < 5; y++) {
          const byte = hashedBytes[Math.floor(nibbleIndex / 2)];
          const nibble = nibbleIndex % 2 === 0 ? byte >> 4 : byte & 15;
          const paint = nibble % 2 === 0;
          nibbleIndex++;
          if (paint) {
            rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fgColor}"/>`;
            const mx = 4 - x;
            if (mx !== x) {
              rects += `<rect x="${mx}" y="${y}" width="1" height="1" fill="${fgColor}"/>`;
            }
          }
        }
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 5" shape-rendering="crispEdges">${rects}</svg>`;
    }
    case "quadrant": {
      const toHex = (b) => b.toString(16).padStart(2, "0");
      let rects = "";
      for (let i = 0; i < 4; i++) {
        const x = i % 2;
        const y = Math.floor(i / 2);
        const r = bytes[i * 3];
        const g = bytes[i * 3 + 1];
        const b = bytes[i * 3 + 2];
        const color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>`;
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2">${rects}</svg>`;
    }
    case "gradient": {
      const toHex = (b) => b.toString(16).padStart(2, "0");
      const color1 = `#${toHex(bytes[0])}${toHex(bytes[1])}${toHex(bytes[2])}`;
      const color2 = `#${toHex(bytes[3])}${toHex(bytes[4])}${toHex(bytes[5])}`;
      const color3 = `#${toHex(bytes[6])}${toHex(bytes[7])}${toHex(bytes[8])}`;
      let defs = "";
      let shapes = "";
      defs += `<linearGradient id="grad1-${id2}" x1="0%" y1="0%" x2="0%" y2="100%">`;
      defs += `<stop offset="0%" style="stop-color:${color1};stop-opacity:1" />`;
      defs += `<stop offset="100%" style="stop-color:${color2};stop-opacity:1" />`;
      defs += `</linearGradient>`;
      defs += `<linearGradient id="grad2-${id2}" x1="0%" y1="0%" x2="0%" y2="100%">`;
      defs += `<stop offset="0%" style="stop-color:${color2};stop-opacity:1" />`;
      defs += `<stop offset="100%" style="stop-color:${color3};stop-opacity:1" />`;
      defs += `</linearGradient>`;
      shapes += `<rect width="100" height="100" fill="url(#grad1-${id2})"/>`;
      const stripeWidth = 15 + bytes[9] / 255 * 20;
      const angle = 30 + bytes[10] / 255 * 60;
      shapes += `<rect x="20" y="-50" width="${stripeWidth}" height="200" fill="url(#grad2-${id2})" transform="rotate(${angle} 50 50)" opacity="0.7"/>`;
      shapes += `<rect x="60" y="-50" width="${stripeWidth}" height="200" fill="url(#grad2-${id2})" transform="rotate(${angle} 50 50)" opacity="0.5"/>`;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>${defs}</defs>${shapes}</svg>`;
    }
    case "sutnar": {
      const hue = bytes[0] / 255 * 360;
      const saturation = 50 + bytes[1] / 255 * 30;
      const lightness = 50 + bytes[2] / 255 * 20;
      const toHsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;
      const color1 = toHsl(hue, saturation, lightness);
      const color2 = toHsl((hue + 120) % 360, saturation, lightness);
      const color3 = toHsl((hue + 240) % 360, saturation, lightness);
      const color4 = toHsl(hue, saturation * 0.3, lightness * 0.5);
      const color5 = toHsl(hue, saturation * 0.5, Math.min(lightness * 1.3, 90));
      const palette = [color1, color2, color3, color4, color5];
      const variant = bytes[3] % 3;
      let shapes = "";
      shapes += `<rect width="100" height="100" fill="${toHsl(hue, 10, 95)}"/>`;
      if (variant === 0) {
        const circleColor = palette[bytes[4] % palette.length];
        const barColor = palette[(bytes[4] + 1) % palette.length];
        shapes += `<circle cx="30" cy="50" r="22" fill="${circleColor}"/>`;
        shapes += `<rect x="60" y="40" width="35" height="20" fill="${barColor}"/>`;
      } else if (variant === 1) {
        const barColor = palette[bytes[5] % palette.length];
        const circleColor = palette[(bytes[5] + 1) % palette.length];
        shapes += `<rect x="15" y="10" width="18" height="80" fill="${barColor}"/>`;
        shapes += `<circle cx="70" cy="50" r="15" fill="${circleColor}"/>`;
      } else {
        const squareColor = palette[bytes[6] % palette.length];
        const circleColor = palette[(bytes[6] + 1) % palette.length];
        shapes += `<rect x="20" y="20" width="30" height="30" fill="${squareColor}"/>`;
        shapes += `<circle cx="70" cy="70" r="18" fill="${circleColor}"/>`;
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${shapes}</svg>`;
    }
  }
};

// node_modules/@evolu/common/dist/src/Instances.js
var createInstances = () => {
  const instances = /* @__PURE__ */ new Map();
  return {
    ensure: (key, create, onCacheHit) => {
      let instance = instances.get(key);
      if (instance == null) {
        instance = create();
        instances.set(key, instance);
      } else if (onCacheHit) {
        onCacheHit(instance);
      }
      return instance;
    },
    get: (key) => instances.get(key) ?? null,
    has: (key) => instances.has(key),
    delete: (key) => {
      const instance = instances.get(key);
      if (instance == null)
        return false;
      instances.delete(key);
      instance[Symbol.dispose]();
      return true;
    },
    [Symbol.dispose]: () => {
      const errors2 = [];
      for (const instance of instances.values()) {
        try {
          instance[Symbol.dispose]();
        } catch (error) {
          errors2.push(error);
        }
      }
      instances.clear();
      if (errors2.length === 1)
        throw errors2[0];
      if (errors2.length > 1) {
        throw new AggregateError(errors2, "Multiple disposal errors occurred");
      }
    }
  };
};

// node_modules/@evolu/common/dist/src/Sqlite.js
var SqliteValue = union(Null, String2, Number2, Uint8Array2);
var eqSqliteValue = (x, y) => {
  if (x instanceof globalThis.Uint8Array && y instanceof globalThis.Uint8Array) {
    return eqArrayNumber(x, y);
  }
  return x === y;
};
var createSqlite = (deps) => async (name, options) => tryAsync(async () => {
  const driver = await deps.createSqliteDriver(name, options);
  let isDisposed = false;
  const doRollback = () => trySync(() => {
    deps.console?.log("[sql] rollback");
    driver.exec(sql`rollback;`, true);
  }, createSqliteError);
  const sqlite = {
    exec: (query) => trySync(() => {
      deps.console?.log("[sql]", { query });
      const result = maybeLogSqliteQueryExecutionTime(query, () => driver.exec(query, isSqlMutation(query.sql)));
      deps.console?.log("[sql]", { result });
      return result;
    }, (error) => ({
      type: "SqliteError",
      error: createTransferableError(error)
    })),
    transaction: (callback) => {
      const transactionResult = trySync(() => {
        deps.console?.log("[sql] begin");
        driver.exec(sql`begin;`, true);
        const result = callback();
        if (!result.ok)
          return result;
        deps.console?.log("[sql] commit");
        driver.exec(sql`commit;`, true);
        return result;
      }, createSqliteError);
      if (!transactionResult.ok) {
        const rollback = doRollback();
        if (!rollback.ok) {
          deps.console?.log("[sql] rollback failed", rollback.error);
          return err({
            type: "SqliteError",
            error: transactionResult.error.error,
            rollbackError: rollback.error.error
          });
        }
        return transactionResult;
      }
      if (!transactionResult.value.ok) {
        const rollback = doRollback();
        if (!rollback.ok) {
          deps.console?.log("[sql] rollback failed", rollback.error);
          return err({
            type: "SqliteError",
            error: createTransferableError(transactionResult.value.error),
            rollbackError: rollback.error.error
          });
        }
        return transactionResult.value;
      }
      return ok(transactionResult.value.value);
    },
    export: () => trySync(() => {
      return driver.export();
    }, (error) => ({
      type: "SqliteError",
      error: createTransferableError(error)
    })),
    [Symbol.dispose]: () => {
      if (isDisposed)
        return;
      isDisposed = true;
      driver[Symbol.dispose]();
    }
  };
  return sqlite;
}, createSqliteError);
var createSqliteError = (error) => ({
  type: "SqliteError",
  error: createTransferableError(error)
});
var maybeLogSqliteQueryExecutionTime = (query, callback) => {
  if (!query.options?.logQueryExecutionTime) {
    return callback();
  }
  const start = performance.now();
  const result = callback();
  const elapsed = performance.now() - start;
  console.log(`SqliteQueryExecutionTime: ${elapsed.toString()}ms`, query);
  return result;
};
var createPreparedStatementsCache = (factory, disposeFn) => {
  let isDisposed = false;
  const cache = /* @__PURE__ */ new Map();
  return {
    get: (query, alwaysPrepare) => {
      if (alwaysPrepare !== true && !query.options?.prepare)
        return null;
      let statement = cache.get(query.sql);
      if (!statement) {
        statement = factory(query.sql);
        cache.set(query.sql, statement);
      }
      return statement;
    },
    [Symbol.dispose]: () => {
      if (isDisposed)
        return;
      isDisposed = true;
      cache.forEach(disposeFn);
      cache.clear();
    }
  };
};
var sql = (strings2, ...parameters) => {
  let sql4 = "";
  const values = [];
  for (let i = 0; i < strings2.length; i++) {
    sql4 += strings2[i];
    if (i < parameters.length) {
      const param = parameters[i];
      if (typeof param === "object" && param != null && "type" in param) {
        sql4 += param.sql;
      } else {
        sql4 += "?";
        values.push(param);
      }
    }
  }
  return { sql: sql4, parameters: values };
};
sql.identifier = (identifier) => ({
  type: "SqlIdentifier",
  // From Kysely
  sql: `"${identifier.replace(/"/g, '""')}"`
});
sql.raw = (raw) => ({ type: "RawSql", sql: raw });
sql.prepared = (strings2, ...parameters) => {
  const query = sql(strings2, ...parameters);
  return { ...query, options: { prepare: true } };
};
var isSqlMutation = (sql4) => {
  const cached = isSqlMutationCache.get(sql4);
  if (cached !== void 0)
    return cached;
  const result = isSqlMutationRegEx.test(removeSqlComments(sql4));
  isSqlMutationCache.set(sql4, result);
  return result;
};
var isSqlMutationCache = createLruCache(PositiveInt.orThrow(1e4));
var isSqlMutationRegEx = new RegExp(`\\b(${[
  "alter",
  "create",
  "delete",
  "drop",
  "insert",
  "replace",
  "update",
  "begin",
  "commit",
  "rollback",
  "pragma",
  "vacuum"
].join("|")})\\b`, "i");
var removeSqlComments = (sql4) => {
  if (!sql4.includes("--"))
    return sql4;
  let result = "";
  let i = 0;
  while (i < sql4.length) {
    if (i < sql4.length - 1 && sql4[i] === "-" && sql4[i + 1] === "-") {
      i += 2;
      while (i < sql4.length && sql4[i] !== "\n") {
        i++;
      }
      if (i < sql4.length && sql4[i] === "\n") {
        result += "\n";
        i++;
      }
    } else {
      result += sql4[i];
      i++;
    }
  }
  return result;
};
var explainSqliteQueryPlan = (deps) => (query) => {
  const result = deps.sqlite.exec({
    ...query,
    sql: `EXPLAIN QUERY PLAN ${query.sql}`
  });
  if (!result.ok)
    return result;
  console.log("[explainSqliteQueryPlan]", query);
  console.log(drawSqliteQueryPlan(result.value.rows));
  return ok();
};
var drawSqliteQueryPlan = (rows) => rows.map((row) => {
  let parentId = row.parent;
  let indent = 0;
  do {
    const parent = rows.find((r) => r.id === parentId);
    if (!parent)
      break;
    parentId = parent.parent;
    indent++;
  } while (true);
  return `${"  ".repeat(indent)}${row.detail}`;
}).join("\n");
var SqliteBoolean = union(0, 1);
var sqliteTrue = 1;
var sqliteFalse = 0;
var booleanToSqliteBoolean = (value) => value ? sqliteTrue : sqliteFalse;
var sqliteBooleanToBoolean = (value) => value === sqliteTrue;

// node_modules/@evolu/common/dist/src/Store.js
var createStore = (initialState, eq = eqStrict) => {
  const listeners = /* @__PURE__ */ new Set();
  let currentState = initialState;
  const updateState = (newState) => {
    if (eq(newState, currentState))
      return;
    currentState = newState;
    listeners.forEach((listener) => {
      listener();
    });
  };
  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    get: () => currentState,
    set: (state) => {
      updateState(state);
    },
    modify: (updater) => {
      updateState(updater(currentState));
    }
  };
};

// node_modules/@evolu/common/dist/src/Worker.js
var createInitializedWorker = ({ init, onMessage }) => {
  let onMessageCallback = null;
  let deps = null;
  const pendingMessages = [];
  let initializing = false;
  const postMessage = (msg) => {
    assert(onMessageCallback != null, "The onMessage wasn't set");
    onMessageCallback(msg);
  };
  const postMessageTransferableError = (error) => {
    postMessage({
      type: "onError",
      error: createTransferableError(error)
    });
  };
  const withErrorReporting = (handler) => (...args) => {
    try {
      handler(...args);
    } catch (error) {
      postMessageTransferableError(error);
    }
  };
  const worker = {
    postMessage: (message) => {
      if (message.type !== "init") {
        if (!deps) {
          pendingMessages.push(message);
        } else {
          withErrorReporting(onMessage(deps))(message);
        }
        return;
      }
      if (initializing)
        return;
      initializing = true;
      init(message, postMessage, withErrorReporting).then((_deps) => {
        if (_deps == null)
          return;
        deps = _deps;
        for (const message2 of pendingMessages) {
          withErrorReporting(onMessage(deps))(message2);
        }
        pendingMessages.length = 0;
      }).catch(postMessageTransferableError);
    },
    onMessage: (callback) => {
      onMessageCallback = callback;
    }
  };
  return worker;
};
var createInitializedWorkerWithHandlers = ({ init, handlers }) => createInitializedWorker({
  init,
  onMessage: (deps) => (message) => {
    const messageType = message.type;
    const handler = handlers[messageType];
    handler(deps)(message);
  }
});

// node_modules/@evolu/common/dist/src/local-first/Owner.js
var OwnerId = brand("OwnerId", Id);
var OwnerIdBytes = brand("OwnerIdBytes", IdBytes);
var ownerIdToOwnerIdBytes = (ownerId) => idToIdBytes(ownerId);
var ownerIdBytesToOwnerId = (ownerIdBytes) => idBytesToId(ownerIdBytes);
var ownerWriteKeyLength = NonNegativeInt.orThrow(16);
var OwnerEncryptionKey = brand("OwnerEncryptionKey", EncryptionKey);
var OwnerWriteKey = brand("OwnerWriteKey", Entropy16);
var createOwnerWriteKey = (deps) => deps.randomBytes.create(16);
var OwnerSecret = brand("OwnerSecret", Entropy32);
var createOwnerSecret = (deps) => deps.randomBytes.create(32);
var ownerSecretToMnemonic = (secret) => entropyToMnemonic(secret, wordlist);
var mnemonicToOwnerSecret = (mnemonic) => mnemonicToEntropy(mnemonic, wordlist);
var createOwner = (secret) => ({
  id: ownerIdBytesToOwnerId(OwnerIdBytes.orThrow(createSlip21(secret, ["Evolu", "OwnerIdBytes"]).slice(0, 16))),
  encryptionKey: OwnerEncryptionKey.orThrow(createSlip21(secret, ["Evolu", "OwnerEncryptionKey"])),
  writeKey: OwnerWriteKey.orThrow(createSlip21(secret, ["Evolu", "OwnerWriteKey"]).slice(0, 16))
});
var createAppOwner = (secret) => ({
  ...createOwner(secret),
  type: "AppOwner",
  mnemonic: ownerSecretToMnemonic(secret)
});
var createShardOwner = (secret) => {
  return {
    ...createOwner(secret),
    type: "ShardOwner"
  };
};
var deriveShardOwner = (owner, path) => {
  const secret = createSlip21(owner.encryptionKey, path);
  return {
    ...createOwner(secret),
    type: "ShardOwner"
  };
};
var createSharedOwner = (secret) => ({
  ...createOwner(secret),
  type: "SharedOwner"
});
var createSharedReadonlyOwner = (sharedOwner) => ({
  type: "SharedReadonlyOwner",
  id: sharedOwner.id,
  encryptionKey: sharedOwner.encryptionKey
});
var createOwnerWebSocketTransport = (config) => ({
  type: "WebSocket",
  url: `${config.url}?ownerId=${config.ownerId}`
});
var parseOwnerIdFromOwnerWebSocketTransportUrl = (url) => getOrNull(OwnerId.fromUnknown(url.split("=")[1]));

// node_modules/@evolu/common/dist/src/Number.js
var increment = (n) => n + 1;
var decrement = (n) => n - 1;
var clamp = (min2, max2) => (n) => Math.min(Math.max(n, min2), max2);
var isBetween = (min2, max2) => (value) => value >= min2 && value <= max2;
var min = (...values) => values.reduce((a, b) => a < b ? a : b);
var max = (...values) => values.reduce((a, b) => a > b ? a : b);
var computeBalancedBuckets = (numberOfItems, numberOfBuckets = PositiveInt.orThrow(16), minNumberOfItemsPerBucket = PositiveInt.orThrow(2)) => {
  const minRequiredItems = numberOfBuckets * minNumberOfItemsPerBucket;
  if (numberOfItems < minRequiredItems)
    return err(PositiveInt.orThrow(minRequiredItems));
  const indexes = [];
  const itemsPerBucket = Math.floor(numberOfItems / numberOfBuckets);
  const extraItems = numberOfItems % numberOfBuckets;
  let bucketBoundary = 0;
  for (let i = 0; i < numberOfBuckets; i++) {
    const hasExtraItem = i < extraItems;
    const itemsInThisBucket = itemsPerBucket + (hasExtraItem ? 1 : 0);
    bucketBoundary += itemsInThisBucket;
    indexes.push(PositiveInt.orThrow(bucketBoundary));
  }
  assertNonEmptyReadonlyArray(indexes);
  return ok(indexes);
};

// node_modules/@evolu/common/dist/src/local-first/Schema.js
import * as Kysely from "kysely";
var evoluSchemaToDbSchema = (schema, indexesConfig) => {
  const tables = mapObject(schema, (table) => new Set(Object.keys(table).filter((k) => k !== "id")));
  const indexes = indexesConfig ? indexesConfig(createIndex).map((index) => ({
    name: index.toOperationNode().name.name,
    sql: index.compile().sql
  })) : [];
  return { tables, indexes };
};
var SystemColumns = object({
  createdAt: DateIso,
  updatedAt: DateIso,
  isDeleted: nullOr(SqliteBoolean),
  ownerId: OwnerId
});
var systemColumns = readonly(new Set(Object.keys(SystemColumns.props)));
var systemColumnsWithId = readonly([...systemColumns, "id"]);
var insertable = (props) => {
  const optionalNullable = nullableToOptional(props);
  const withoutId = omit(optionalNullable, "id");
  return validMutationSize(withoutId);
};
var updateable = (props) => {
  const propsWithIsDeleted = { ...props, isDeleted: SqliteBoolean };
  const updateableProps = mapObject(propsWithIsDeleted, (value, key) => key === "id" ? value : optional(value));
  return validMutationSize(object(updateableProps));
};
var upsertable = (props) => {
  const propsWithDefaults = {
    ...props,
    isDeleted: optional(SqliteBoolean)
  };
  return validMutationSize(nullableToOptional(propsWithDefaults));
};
var DbIndex = object({ name: String2, sql: String2 });
var DbSchema = object({
  tables: record(String2, set(String2)),
  indexes: array(DbIndex)
});
var kysely = new Kysely.Kysely({
  dialect: {
    createAdapter: () => new Kysely.SqliteAdapter(),
    createDriver: () => new Kysely.DummyDriver(),
    createIntrospector() {
      throw new Error("Not implemeneted");
    },
    createQueryCompiler: () => new Kysely.SqliteQueryCompiler()
  }
});
var createIndex = kysely.schema.createIndex.bind(kysely.schema);

// node_modules/@evolu/common/dist/src/Order.js
var createOrder = (isLessThan) => (x, y) => x === y ? 0 : isLessThan(x, y) ? -1 : 1;
var reverseOrder = (order) => (a, b) => order(b, a);
var orderString = createOrder((a, b) => a < b);
var orderNumber = createOrder((a, b) => a < b);
var orderBigInt = createOrder((a, b) => a < b);
var orderUint8Array = (a, b) => {
  if (a.byteLength > b.byteLength)
    return 1;
  if (a.byteLength < b.byteLength)
    return -1;
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i])
      return -1;
    if (a[i] > b[i])
      return 1;
  }
  return 0;
};

// node_modules/@evolu/common/dist/src/local-first/Timestamp.js
var Millis = brand("Millis", lessThanOrEqualTo(281474976710655 - 1)(NonNegativeInt));
var maxMillis = 281474976710655 - 1;
var Counter = brand("Counter", lessThanOrEqualTo(65535)(NonNegativeInt));
var NodeId = regex("NodeId", /^[a-f0-9]{16}$/)(String2);
var Timestamp = object({
  millis: Millis,
  counter: Counter,
  nodeId: NodeId
});
var eqTimestamp = createEqObject({
  millis: eqNumber,
  counter: eqNumber,
  nodeId: eqString
});
var TimestampBytes = brand("TimestampBytes", Uint8Array2);
var timestampBytesLength = NonNegativeInt.orThrow(16);
var timestampToTimestampBytes = (timestamp) => {
  const { millis, counter, nodeId } = timestamp;
  const value = new globalThis.Uint8Array(16);
  const millisBigInt = BigInt(millis);
  value[0] = Number(millisBigInt >> 40n & 0xffn);
  value[1] = Number(millisBigInt >> 32n & 0xffn);
  value[2] = Number(millisBigInt >> 24n & 0xffn);
  value[3] = Number(millisBigInt >> 16n & 0xffn);
  value[4] = Number(millisBigInt >> 8n & 0xffn);
  value[5] = Number(millisBigInt & 0xffn);
  value[6] = counter >> 8 & 255;
  value[7] = counter & 255;
  for (let i = 0; i < 8; i++) {
    const byte = parseInt(nodeId.slice(i * 2, i * 2 + 2), 16);
    value[8 + i] = byte;
  }
  return value;
};
var timestampBytesToTimestamp = (timestamp) => {
  const millis = BigInt(timestamp[0]) << 40n | BigInt(timestamp[1]) << 32n | BigInt(timestamp[2]) << 24n | BigInt(timestamp[3]) << 16n | BigInt(timestamp[4]) << 8n | BigInt(timestamp[5]);
  const counter = timestamp[6] << 8 | timestamp[7];
  let nodeId = "";
  for (let i = 8; i < 16; i++) {
    nodeId += timestamp[i].toString(16).padStart(2, "0");
  }
  return { millis: Number(millis), counter, nodeId };
};

// node_modules/@evolu/common/dist/src/local-first/Storage.js
var fingerprintSize = NonNegativeInt.orThrow(12);
var zeroFingerprint = new Uint8Array(fingerprintSize);
var InfiniteUpperBound = Symbol("InfiniteUpperBound");
var DbChangeValues = record(String2, SqliteValue);
var ValidDbChangeValues = brand("ValidDbChangeValues", DbChangeValues, (value) => {
  const invalidColumns = systemColumnsWithId.filter((key) => key in value);
  if (invalidColumns.length > 0)
    return err({
      type: "ValidDbChangeValues",
      value,
      invalidColumns
    });
  return ok(value);
});
var DbChange = object({
  table: String2,
  id: Id,
  values: ValidDbChangeValues,
  isInsert: Boolean2,
  isDelete: nullOr(Boolean2)
});

// node_modules/@evolu/common/dist/src/local-first/Protocol.js
var packr = new Packr({ variableMapSize: true, useRecords: false });
var minProtocolMessageMaxSize = 1e6;
var maxProtocolMessageMaxSize = 1e8;
var ProtocolMessageMaxSize = between(minProtocolMessageMaxSize, maxProtocolMessageMaxSize)(Int);
var ProtocolMessageRangesMaxSize = between(3e3, 1e5)(Int);
var protocolVersion = NonNegativeInt.orThrow(1);
var ProtocolValueType = {
  // 0-19 small ints
  // SQLite types
  String: NonNegativeInt.orThrow(20),
  Number: NonNegativeInt.orThrow(21),
  Null: NonNegativeInt.orThrow(22),
  Bytes: NonNegativeInt.orThrow(23),
  // We can add more types for other DBs or anything else later.
  // Optimized types
  NonNegativeInt: NonNegativeInt.orThrow(30),
  // String optimizations
  EmptyString: NonNegativeInt.orThrow(31),
  // 1 byte vs 2 bytes (50% reduction)
  Base64Url: NonNegativeInt.orThrow(32),
  Id: NonNegativeInt.orThrow(33),
  Json: NonNegativeInt.orThrow(34),
  // new Date().toISOString()   - 24 bytes
  // encoded with fixed length  - 8 bytes
  // encode as NonNegativeInt   - 6 bytes (additional 25% reduction)
  DateIsoWithNonNegativeTime: NonNegativeInt.orThrow(35),
  DateIsoWithNegativeTime: NonNegativeInt.orThrow(36)
  // 9 bytes
  // TODO: Operations (from 40)
  // Increment, Decrement, Patch, whatever.
};

// node_modules/@evolu/common/dist/src/local-first/Query.js
var serializeQuery = (query) => {
  const params = query.parameters.map((v) => v instanceof Uint8Array ? ["b", bytesToHex(v)] : ["j", v]);
  const options = query.options ? objectToEntries(query.options).toSorted(([a], [b]) => a.localeCompare(b)) : [];
  return JSON.stringify([query.sql, params, options]);
};
var emptyRows = [];
var createSubscribedQueries = (rowsStore) => {
  const subscribedQueryMap = /* @__PURE__ */ new Map();
  const subscribedQueries = {
    subscribe: (query) => (listener) => {
      subscribedQueryMap.set(query, (subscribedQueryMap.get(query) ?? 0) + 1);
      const unsubscribe = rowsStore.subscribe(listener);
      return () => {
        const count = subscribedQueryMap.get(query);
        if (count != null && count > 1) {
          subscribedQueryMap.set(query, count - 1);
        } else {
          subscribedQueryMap.delete(query);
        }
        unsubscribe();
      };
    },
    get: () => [...subscribedQueryMap.keys()],
    has: (query) => subscribedQueryMap.has(query)
  };
  return subscribedQueries;
};
var applyPatches = (patches, current) => patches.reduce((next, patch) => {
  switch (patch.op) {
    case "replaceAll":
      return parseSqliteJsonArray(patch.value);
    case "replaceAt": {
      const parsedRow = parseSqliteJsonArray([patch.value])[0];
      return next.toSpliced(patch.index, 1, parsedRow);
    }
  }
}, current);
var kyselyJsonIdentifier = createId({
  randomBytes: createRandomBytes()
});
var parseSqliteJsonArray = (arr) => {
  const result = new Array(arr.length);
  for (let i = 0; i < arr.length; ++i) {
    result[i] = parse(arr[i]);
  }
  return result;
};
var parse = (obj) => {
  if (String2.is(obj) && obj.startsWith(kyselyJsonIdentifier)) {
    return JSON.parse(obj.slice(kyselyJsonIdentifier.length));
  }
  if (Array.isArray(obj)) {
    return parseSqliteJsonArray(obj);
  }
  if (isPlainObject(obj)) {
    return parseObject(obj);
  }
  return obj;
};
var parseObject = (obj) => {
  const result = createRecord();
  for (const key in obj) {
    result[key] = parse(obj[key]);
  }
  return result;
};

// node_modules/@evolu/common/dist/src/Resources.js
var createResources = (config) => {
  let isDisposed = false;
  const resourcesMap = /* @__PURE__ */ new Map();
  const consumerCounts = /* @__PURE__ */ new Map();
  const consumers = /* @__PURE__ */ new Map();
  const disposalTimeouts = /* @__PURE__ */ new Map();
  const disposalDelay = config.disposalDelay ?? 100;
  const ensureResource = (resourceConfig) => {
    const key = config.getResourceKey(resourceConfig);
    const timeout2 = disposalTimeouts.get(key);
    if (timeout2) {
      clearTimeout(timeout2);
      disposalTimeouts.delete(key);
    }
    if (!resourcesMap.has(key)) {
      const resource = config.createResource(resourceConfig);
      resourcesMap.set(key, resource);
    }
  };
  const scheduleDisposal = (key) => {
    const timeout2 = setTimeout(() => {
      const resource = resourcesMap.get(key);
      if (resource) {
        resource[Symbol.dispose]();
        resourcesMap.delete(key);
      }
      disposalTimeouts.delete(key);
    }, disposalDelay);
    disposalTimeouts.set(key, timeout2);
  };
  const resources = {
    addConsumer: (consumer, resourceConfigs) => {
      if (isDisposed)
        return;
      const consumerId = config.getConsumerId(consumer);
      consumers.set(consumerId, consumer);
      for (const resourceConfig of resourceConfigs) {
        ensureResource(resourceConfig);
        const resourceKey = config.getResourceKey(resourceConfig);
        let counts = consumerCounts.get(resourceKey);
        if (!counts) {
          counts = /* @__PURE__ */ new Map();
          consumerCounts.set(resourceKey, counts);
        }
        const currentCount = counts.get(consumerId) ?? 0;
        const newCount = currentCount + 1;
        counts.set(consumerId, PositiveInt.orThrow(newCount));
        if (currentCount === 0 && config.onConsumerAdded) {
          const resource = resourcesMap.get(resourceKey);
          if (resource) {
            config.onConsumerAdded(consumer, resource, resourceKey);
          }
        }
      }
    },
    removeConsumer: (consumer, resourceConfigs) => {
      if (isDisposed)
        return ok();
      const consumerId = config.getConsumerId(consumer);
      for (const resourceConfig of resourceConfigs) {
        const key = config.getResourceKey(resourceConfig);
        const counts = consumerCounts.get(key);
        if (!counts) {
          return err({ type: "ResourceNotFoundError", resourceKey: key });
        }
        const currentCount = counts.get(consumerId);
        if (currentCount == null) {
          return err({
            type: "ConsumerNotFoundError",
            consumerId,
            resourceKey: key
          });
        }
        if (currentCount === 1) {
          counts.delete(consumerId);
          if (config.onConsumerRemoved) {
            const resource = resourcesMap.get(key);
            if (resource) {
              config.onConsumerRemoved(consumer, resource, key);
            }
          }
          if (counts.size === 0) {
            consumerCounts.delete(key);
            scheduleDisposal(key);
          }
        } else {
          counts.set(consumerId, PositiveInt.orThrow(currentCount - 1));
        }
      }
      if (!resources.hasConsumerAnyResource(consumer)) {
        consumers.delete(consumerId);
      }
      return ok();
    },
    getResource: (key) => {
      if (isDisposed)
        return null;
      return resourcesMap.get(key) ?? null;
    },
    getConsumersForResource: (key) => {
      if (isDisposed)
        return [];
      const counts = consumerCounts.get(key);
      return counts ? Array.from(counts.keys()) : [];
    },
    hasConsumerAnyResource: (consumer) => {
      if (isDisposed)
        return false;
      const consumerId = config.getConsumerId(consumer);
      return Array.from(consumerCounts.values()).some((counts) => counts.has(consumerId));
    },
    getConsumer: (consumerId) => {
      if (isDisposed)
        return null;
      const consumer = consumers.get(consumerId);
      if (!consumer)
        return null;
      if (!resources.hasConsumerAnyResource(consumer)) {
        return null;
      }
      return consumer;
    },
    [Symbol.dispose]: () => {
      if (isDisposed)
        return;
      isDisposed = true;
      for (const timeout2 of disposalTimeouts.values()) {
        clearTimeout(timeout2);
      }
      disposalTimeouts.clear();
      for (const resource of resourcesMap.values()) {
        resource[Symbol.dispose]();
      }
      resourcesMap.clear();
      consumerCounts.clear();
      consumers.clear();
    }
  };
  return resources;
};

// node_modules/@evolu/common/dist/src/Time.js
var createTime = () => {
  const time = {
    now: () => {
      const iso = time.nowIso();
      return new globalThis.Date(iso).getTime();
    },
    nowIso: () => {
      const iso = new globalThis.Date().toISOString();
      assert(DateIso.is(iso), "System clock returned invalid ISO date");
      return iso;
    }
  };
  return time;
};
var createTestTime = () => {
  let now = 0;
  const time = {
    now: () => {
      const current = now;
      queueMicrotask(() => {
        now++;
      });
      return current;
    },
    nowIso: () => DateIso.orThrow(new globalThis.Date(time.now()).toISOString())
  };
  return time;
};
var durationToNonNegativeInt = (duration) => {
  if (typeof duration === "number") {
    return duration;
  }
  const units = {
    ms: 1,
    s: 1e3,
    m: 6e4,
    h: 36e5,
    d: 864e5
    // 24 * 60 * 60 * 1000
  };
  let total = 0;
  let i = 0;
  while (i < duration.length) {
    while (i < duration.length && duration[i] === " ") {
      i++;
    }
    if (i >= duration.length)
      break;
    let numStr = "";
    while (i < duration.length && duration[i] >= "0" && duration[i] <= "9") {
      numStr += duration[i];
      i++;
    }
    if (numStr === "")
      break;
    let unit = "";
    if (i < duration.length) {
      if (duration[i] === "m" && i + 1 < duration.length && duration[i + 1] === "s") {
        unit = "ms";
        i += 2;
      } else if (duration[i] === "s" || duration[i] === "m" || duration[i] === "h" || duration[i] === "d") {
        unit = duration[i];
        i++;
      }
    }
    if (unit === "")
      break;
    const value = parseInt(numStr, 10);
    total += value * units[unit];
  }
  return NonNegativeInt.orThrow(total);
};

// node_modules/@evolu/common/dist/src/Task.js
var isAbortError = (error) => typeof error === "object" && error !== null && error.type === "AbortError";
if (typeof AbortSignal.any !== "function") {
  AbortSignal.any = function(signals) {
    const controller = new AbortController();
    const onAbort = (event) => {
      controller.abort(event.target.reason);
      cleanup();
    };
    const cleanup = () => {
      for (const s of signals)
        s.removeEventListener("abort", onAbort);
    };
    for (const s of signals) {
      if (s.aborted) {
        controller.abort(s.reason);
        return controller.signal;
      }
      s.addEventListener("abort", onAbort);
    }
    return controller.signal;
  };
}
var combineSignal = (context, internalSignal) => context?.signal ? AbortSignal.any([context.signal, internalSignal]) : internalSignal;
var toTask = (fn) => (
  // Note: Not using async to avoid Promise wrapper overhead in fast path
  ((context) => {
    const signal = context?.signal;
    if (!signal) {
      return fn(context);
    }
    if (signal.aborted) {
      return Promise.resolve(err({ type: "AbortError", reason: signal.reason }));
    }
    const { promise: abortPromise, resolve: resolveAbort } = Promise.withResolvers();
    const handleAbort = () => {
      resolveAbort(err({ type: "AbortError", reason: signal.reason }));
    };
    signal.addEventListener("abort", handleAbort, { once: true });
    return Promise.race([
      abortPromise,
      fn(context).then((result) => {
        signal.removeEventListener("abort", handleAbort);
        return result;
      })
    ]);
  })
);
if (typeof AbortSignal.timeout !== "function") {
  AbortSignal.timeout = function(ms) {
    const controller = new AbortController();
    const id2 = setTimeout(() => {
      controller.abort();
    }, ms);
    controller.signal.addEventListener("abort", () => {
      clearTimeout(id2);
    });
    return controller.signal;
  };
}
var wait = (duration) => toTask((context) => new Promise((resolve) => {
  const ms = durationToNonNegativeInt(duration);
  const timeoutSignal = AbortSignal.timeout(ms);
  const signal = combineSignal(context, timeoutSignal);
  signal.addEventListener("abort", () => {
    resolve(ok());
  }, { once: true });
}));
var timeout = (duration, task) => toTask(async (context) => {
  const timeoutMs = durationToNonNegativeInt(duration);
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal = combineSignal(context, timeoutSignal);
  const result = await task({ signal });
  if (timeoutSignal.aborted) {
    return err({ type: "TimeoutError", timeoutMs });
  }
  return result;
});
var retry = ({ retries, initialDelay = "1s", maxDelay = "30s", factor = 2, jitter = 0.5, retryable = (error) => !isAbortError(error), onRetry }, task) => toTask(async (context) => {
  const initialDelayMs = durationToNonNegativeInt(initialDelay);
  const maxDelayMs = durationToNonNegativeInt(maxDelay);
  const maxRetries = PositiveInt.orThrow(retries);
  let attempt = 0;
  while (true) {
    const result = await task(context);
    if (result.ok) {
      return result;
    }
    if (isAbortError(result.error)) {
      return err(result.error);
    }
    attempt += 1;
    if (attempt > maxRetries || !retryable(result.error)) {
      return err({
        type: "RetryError",
        cause: result.error,
        attempts: attempt
      });
    }
    const exponentialDelay = initialDelayMs * Math.pow(factor, attempt - 1);
    const cappedDelay = Math.min(exponentialDelay, maxDelayMs);
    const randomFactor = 1 - jitter + Math.random() * jitter * 2;
    const delay = Math.floor(cappedDelay * randomFactor);
    if (onRetry) {
      onRetry(result.error, attempt, delay);
    }
    {
      const result2 = await wait(NonNegativeInt.orThrow(delay))(context);
      if (!result2.ok) {
        return result2;
      }
    }
  }
});
var createSemaphore = (maxConcurrent) => {
  let isDisposed = false;
  let availablePermits = maxConcurrent;
  const waitingQueue = [];
  const semaphoreController = new AbortController();
  const acquire = () => {
    if (availablePermits > 0) {
      availablePermits--;
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      waitingQueue.push(resolve);
    });
  };
  const release = () => {
    if (isNonEmptyArray(waitingQueue)) {
      shiftArray(waitingQueue)();
    } else {
      availablePermits++;
    }
  };
  return {
    withPermit: (task) => toTask(async (context) => {
      await acquire();
      if (isDisposed) {
        return err({
          type: "AbortError",
          reason: "Semaphore disposed"
        });
      }
      const signal = combineSignal(context, semaphoreController.signal);
      const result = await task({ signal });
      release();
      return result;
    }),
    [Symbol.dispose]: () => {
      if (isDisposed)
        return;
      isDisposed = true;
      semaphoreController.abort("Semaphore disposed");
      while (isNonEmptyArray(waitingQueue)) {
        shiftArray(waitingQueue)();
      }
    }
  };
};
var createMutex = () => {
  const mutex = createSemaphore(PositiveInt.orThrow(1));
  return {
    withLock: mutex.withPermit,
    [Symbol.dispose]: mutex[Symbol.dispose]
  };
};
var requestIdleTask = (task) => toTask(async (context) => new Promise((resolve) => {
  idleCallback(() => {
    void task(context).then(resolve);
  });
}));
var idleCallback = typeof globalThis.requestIdleCallback === "function" ? globalThis.requestIdleCallback : (callback) => setTimeout(callback, 0);
var isAsync = (value) => (
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof value?.then === "function"
);

// node_modules/@evolu/common/dist/src/local-first/Sync.js
var systemColumnsWithoutOwnerId = systemColumns.difference(/* @__PURE__ */ new Set(["ownerId"]));
var initialSyncState = { type: "SyncStateInitial" };

// node_modules/@evolu/common/dist/src/local-first/Db.js
var defaultDbConfig = {
  name: SimpleName.orThrow("Evolu"),
  transports: [{ type: "WebSocket", url: "wss://free.evoluhq.com" }],
  maxDrift: 5 * 60 * 1e3,
  enableLogging: false
};

// node_modules/@evolu/common/dist/src/local-first/Evolu.js
var evoluInstances = createInstances();
var tabId = null;
var createEvolu = (deps) => (schema, config) => evoluInstances.ensure(config?.name ?? defaultDbConfig.name, () => createEvoluInstance(deps)(schema, config), (evolu) => {
  evolu.ensureSchema(schema);
});
var createEvoluInstance = (deps) => (schema, config) => {
  deps.console.enabled = config?.enableLogging ?? false;
  const { indexes, reloadUrl = "/", ...partialDbConfig } = config ?? {};
  const dbConfig = { ...defaultDbConfig, ...partialDbConfig };
  deps.console.log("[evolu]", "createEvoluInstance", {
    name: dbConfig.name
  });
  const errorStore = createStore(null);
  const rowsStore = createStore(/* @__PURE__ */ new Map());
  const { promise: appOwner, resolve: resolveAppOwner } = Promise.withResolvers();
  if (config?.externalAppOwner) {
    resolveAppOwner(config.externalAppOwner);
  }
  const _syncStore = createStore(initialSyncState);
  const subscribedQueries = createSubscribedQueries(rowsStore);
  const loadingPromises = createLoadingPromises(subscribedQueries);
  const onCompleteCallbacks = createCallbacks(deps);
  const exportCallbacks = createCallbacks(deps);
  const dbWorker = deps.createDbWorker(dbConfig.name);
  const getTabId = () => {
    tabId ??= createId(deps);
    return tabId;
  };
  dbWorker.onMessage((message) => {
    switch (message.type) {
      case "onError": {
        errorStore.set(message.error);
        break;
      }
      case "onGetAppOwner": {
        resolveAppOwner(message.appOwner);
        break;
      }
      case "onQueryPatches": {
        if (message.tabId !== getTabId())
          return;
        const state = rowsStore.get();
        const nextState = new Map([
          ...state,
          ...message.queryPatches.map(({ query, patches }) => [
            query,
            applyPatches(patches, state.get(query) ?? emptyRows)
          ])
        ]);
        for (const { query } of message.queryPatches) {
          loadingPromises.resolve(query, nextState.get(query) ?? emptyRows);
        }
        if (deps.flushSync && message.onCompleteIds.length > 0) {
          deps.flushSync(() => {
            rowsStore.set(nextState);
          });
        } else {
          rowsStore.set(nextState);
        }
        for (const id2 of message.onCompleteIds) {
          onCompleteCallbacks.execute(id2);
        }
        break;
      }
      case "refreshQueries": {
        if (message.tabId && message.tabId === getTabId())
          return;
        const loadingPromisesQueries = loadingPromises.getQueries();
        loadingPromises.releaseUnsubscribedOnMutation();
        const queries = dedupeArray([
          ...loadingPromisesQueries,
          ...subscribedQueries.get()
        ]);
        if (isNonEmptyReadonlyArray(queries)) {
          dbWorker.postMessage({ type: "query", tabId: getTabId(), queries });
        }
        break;
      }
      case "onReset": {
        if (message.reload) {
          deps.reloadApp(reloadUrl);
        } else {
          onCompleteCallbacks.execute(message.onCompleteId);
        }
        break;
      }
      case "onExport": {
        exportCallbacks.execute(message.onCompleteId, message.file);
        break;
      }
      default:
        exhaustiveCheck(message);
    }
  });
  const dbSchema = evoluSchemaToDbSchema(schema, indexes);
  const mutationTypesCache = /* @__PURE__ */ new Map();
  const getMutationType = (table, kind) => {
    let types = mutationTypesCache.get(kind);
    if (!types) {
      types = /* @__PURE__ */ new Map();
      mutationTypesCache.set(kind, types);
    }
    let type = types.get(table);
    if (!type) {
      type = { insert: insertable, update: updateable, upsert: upsertable }[kind](schema[table]);
      types.set(table, type);
    }
    return type;
  };
  dbWorker.postMessage({ type: "init", config: dbConfig, dbSchema });
  dbWorker.postMessage({ type: "getAppOwner" });
  const loadQueryMicrotaskQueue = [];
  const mutateMicrotaskQueue = [];
  const useOwnerMicrotaskQueue = [];
  const createMutation = (kind) => (table, props, options) => {
    const result = getMutationType(table, kind).fromUnknown(props);
    const id2 = kind === "insert" ? createId(deps) : props.id;
    if (options?.onlyValidate !== true) {
      if (!result.ok) {
        mutateMicrotaskQueue.push([null, void 0]);
      } else {
        const { id: _, isDeleted, ...values } = result.value;
        const dbChange = {
          table,
          id: id2,
          values,
          isInsert: kind === "insert" || kind === "upsert",
          isDelete: SqliteBoolean.is(isDeleted) ? sqliteBooleanToBoolean(isDeleted) : null
        };
        assert(DbChange.is(dbChange), `Invalid DbChange for table '${table}': Please check schema type errors.`);
        mutateMicrotaskQueue.push([
          { ...dbChange, ownerId: options?.ownerId },
          options?.onComplete
        ]);
      }
      if (mutateMicrotaskQueue.length === 1) {
        queueMicrotask(processMutationQueue);
      }
    }
    if (result.ok)
      return ok({ id: id2 });
    return err(result.error);
  };
  const processMutationQueue = () => {
    const changes = [];
    const onCompletes = [];
    for (const [change, onComplete] of mutateMicrotaskQueue) {
      if (change !== null)
        changes.push(change);
      if (onComplete)
        onCompletes.push(onComplete);
    }
    const queueLength = mutateMicrotaskQueue.length;
    mutateMicrotaskQueue.length = 0;
    if (changes.length !== queueLength) {
      return;
    }
    const onCompleteIds = onCompletes.map(onCompleteCallbacks.register);
    loadingPromises.releaseUnsubscribedOnMutation();
    if (!isNonEmptyArray(changes))
      return;
    dbWorker.postMessage({
      type: "mutate",
      tabId: getTabId(),
      changes,
      onCompleteIds,
      subscribedQueries: subscribedQueries.get()
    });
  };
  const evolu = {
    subscribeError: errorStore.subscribe,
    getError: errorStore.get,
    createQuery,
    loadQuery: (query) => {
      const { promise, isNew } = loadingPromises.get(query);
      if (isNew) {
        loadQueryMicrotaskQueue.push(query);
        if (loadQueryMicrotaskQueue.length === 1) {
          queueMicrotask(() => {
            const queries = dedupeArray(loadQueryMicrotaskQueue);
            loadQueryMicrotaskQueue.length = 0;
            assertNonEmptyReadonlyArray(queries);
            deps.console.log("[evolu]", "loadQuery", { queries });
            dbWorker.postMessage({
              type: "query",
              tabId: getTabId(),
              queries
            });
          });
        }
      }
      return promise;
    },
    loadQueries: (queries) => queries.map(evolu.loadQuery),
    subscribeQuery: (query) => (listener) => {
      let previousRows = null;
      const unsubscribe = subscribedQueries.subscribe(query)(() => {
        const rows = evolu.getQueryRows(query);
        if (previousRows === rows)
          return;
        previousRows = rows;
        listener();
      });
      return () => {
        previousRows = null;
        unsubscribe();
      };
    },
    getQueryRows: (query) => rowsStore.get().get(query) ?? emptyRows,
    appOwner,
    // TODO: Update it for the owner-api
    // subscribeSyncState: syncStore.subscribe,
    // getSyncState: syncStore.get,
    insert: createMutation("insert"),
    update: createMutation("update"),
    upsert: createMutation("upsert"),
    resetAppOwner: (options) => {
      const { promise, resolve } = Promise.withResolvers();
      const onCompleteId = onCompleteCallbacks.register(resolve);
      dbWorker.postMessage({
        type: "reset",
        onCompleteId,
        reload: options?.reload ?? true
      });
      return promise;
    },
    restoreAppOwner: (mnemonic, options) => {
      const { promise, resolve } = Promise.withResolvers();
      const onCompleteId = onCompleteCallbacks.register(resolve);
      dbWorker.postMessage({
        type: "reset",
        onCompleteId,
        reload: options?.reload ?? true,
        restore: { mnemonic, dbSchema }
      });
      return promise;
    },
    reloadApp: () => {
      deps.reloadApp(reloadUrl);
    },
    ensureSchema: (schema2) => {
      mutationTypesCache.clear();
      const dbSchema2 = evoluSchemaToDbSchema(schema2);
      dbWorker.postMessage({ type: "ensureDbSchema", dbSchema: dbSchema2 });
    },
    exportDatabase: () => {
      const { promise, resolve } = Promise.withResolvers();
      const onCompleteId = exportCallbacks.register(resolve);
      dbWorker.postMessage({ type: "export", onCompleteId });
      return promise;
    },
    useOwner: (owner) => {
      const scheduleOwnerQueueProcessing = () => {
        if (useOwnerMicrotaskQueue.length !== 1)
          return;
        queueMicrotask(() => {
          const queue = [...useOwnerMicrotaskQueue];
          useOwnerMicrotaskQueue.length = 0;
          const result = [];
          const skipIndices = /* @__PURE__ */ new Set();
          for (let i = 0; i < queue.length; i++) {
            if (skipIndices.has(i))
              continue;
            const [currentOwner, currentUse, currentOwnerSerialized] = queue[i];
            for (let j = i + 1; j < queue.length; j++) {
              if (skipIndices.has(j))
                continue;
              const [, otherUse, otherOwnerSerialized] = queue[j];
              if (currentUse !== otherUse && eqArrayNumber(currentOwnerSerialized, otherOwnerSerialized)) {
                skipIndices.add(i).add(j);
                break;
              }
            }
            if (!skipIndices.has(i)) {
              result.push([currentOwner, currentUse, currentOwnerSerialized]);
            }
          }
          for (const [owner2, use] of result) {
            dbWorker.postMessage({ type: "useOwner", owner: owner2, use });
          }
        });
      };
      useOwnerMicrotaskQueue.push([owner, true, pack(owner)]);
      scheduleOwnerQueueProcessing();
      const unuse = () => {
        useOwnerMicrotaskQueue.push([owner, false, pack(owner)]);
        scheduleOwnerQueueProcessing();
      };
      return unuse;
    },
    /** Disposal is not implemented yet. */
    [Symbol.dispose]: () => {
      throw new Error("Evolu instance disposal is not yet implemented");
    }
  };
  return evolu;
};
var createQuery = (queryCallback, options) => {
  const compiledQuery = queryCallback(kysely).compile();
  if (isSqlMutation(compiledQuery.sql))
    throw new Error("SQL mutation (INSERT, UPDATE, DELETE, etc.) isn't allowed in the Evolu `createQuery` function. Kysely suggests it because there is no read-only Kysely yet, and removing such an API is not possible. For mutations, use Evolu Mutation API.");
  return serializeQuery({
    sql: compiledQuery.sql,
    parameters: compiledQuery.parameters,
    ...options && { options }
  });
};
var createLoadingPromises = (subscribedQueries) => {
  const loadingPromiseMap = /* @__PURE__ */ new Map();
  return {
    get: (query) => {
      let loadingPromise = loadingPromiseMap.get(query);
      const isNew = !loadingPromise;
      if (!loadingPromise) {
        const { promise, resolve } = Promise.withResolvers();
        loadingPromise = { resolve, promise, releaseOnResolve: false };
        loadingPromiseMap.set(query, loadingPromise);
      }
      return {
        promise: loadingPromise.promise,
        isNew
      };
    },
    resolve: (query, rows) => {
      const loadingPromise = loadingPromiseMap.get(query);
      if (!loadingPromise)
        return;
      if (loadingPromise.promise.status !== "fulfilled") {
        loadingPromise.resolve(rows);
      } else {
        loadingPromise.promise = Promise.resolve(rows);
      }
      void Object.assign(loadingPromise.promise, {
        status: "fulfilled",
        value: rows
      });
      if (loadingPromise.releaseOnResolve) {
        loadingPromiseMap.delete(query);
      }
    },
    releaseUnsubscribedOnMutation: () => {
      [...loadingPromiseMap.entries()].filter(([query]) => !subscribedQueries.has(query)).forEach(([query, loadingPromise]) => {
        if (loadingPromise.promise.status === "fulfilled") {
          loadingPromiseMap.delete(query);
        } else {
          loadingPromise.releaseOnResolve = true;
        }
      });
    },
    getQueries: () => Array.from(loadingPromiseMap.keys())
  };
};

// node_modules/@evolu/common/dist/src/local-first/LocalAuth.js
var createLocalAuth = (deps) => {
  const setLastOwnerId = async (id2, options) => {
    await deps.secureStorage.setItem(localAuthMetakeyLastOwner, id2, {
      ...buildAuthOptions(options),
      accessControl: "none"
    });
  };
  const getLastOwnerId = async (options) => {
    const item = await deps.secureStorage.getItem(localAuthMetakeyLastOwner, {
      ...buildAuthOptions(options),
      accessControl: "none"
    });
    return item?.value;
  };
  const getOwnerNames = async (options) => {
    const item = await deps.secureStorage.getItem(localAuthMetakeyOwnerNames, {
      ...buildAuthOptions(options),
      accessControl: "none"
    });
    let names = {};
    if (item?.value) {
      names = JSON.parse(item.value);
    }
    return names;
  };
  const setOwnerName = async (id2, username, options) => {
    const names = await getOwnerNames(options);
    names[id2] = username;
    await deps.secureStorage.setItem(localAuthMetakeyOwnerNames, JSON.stringify(names), {
      ...buildAuthOptions(options),
      accessControl: "none"
    });
  };
  const deleteOwnerName = async (id2, options) => {
    const { [id2]: _, ...names } = await getOwnerNames(options);
    await deps.secureStorage.setItem(localAuthMetakeyOwnerNames, JSON.stringify(names), {
      ...buildAuthOptions(options),
      accessControl: "none"
    });
  };
  const getOwnerIds = async (options) => {
    const items = await deps.secureStorage.getAllItems({
      ...buildAuthOptions(options),
      includeValues: false
    });
    return items.filter(Boolean).filter((i) => i.key !== localAuthMetakeyLastOwner && i.key !== localAuthMetakeyOwnerNames).map((i) => i.key);
  };
  const clearAuthStore = (options) => deps.secureStorage.clearService(buildAuthOptions(options));
  const buildAuthOptions = (options, username) => {
    const newOptions = {
      ...localAuthDefaultOptions,
      ...username && { webAuthnUsername: username },
      ...options
    };
    return {
      ...newOptions,
      authenticationPrompt: {
        title: replaceMessageTokens(newOptions.authenticationPrompt?.title ?? "", username),
        cancel: replaceMessageTokens(newOptions.authenticationPrompt?.cancel ?? "", username),
        subtitle: replaceMessageTokens(newOptions.authenticationPrompt?.subtitle ?? "", username),
        description: replaceMessageTokens(newOptions.authenticationPrompt?.description ?? "", username)
      }
    };
  };
  const replaceMessageTokens = (text, username) => {
    if (!username)
      return text;
    return text.replace("|USERNAME|", username);
  };
  return {
    login: async (ownerId, options) => {
      const names = await getOwnerNames(options);
      const username = names[ownerId] ?? "";
      await setLastOwnerId(ownerId, options);
      return { owner: void 0, username };
    },
    register: async (username, options) => {
      const owner = createAppOwner(options?.mnemonic ? mnemonicToOwnerSecret(options.mnemonic) : createOwnerSecret(deps));
      await Promise.all([
        // setOwnerItem
        deps.secureStorage.setItem(owner.id, JSON.stringify({ owner }), buildAuthOptions(options, username)),
        setOwnerName(owner.id, username, options),
        setLastOwnerId(owner.id, options)
      ]);
      return { owner, username };
    },
    unregister: async (ownerId, options) => {
      await Promise.all([
        // deleteOwnerItem
        deps.secureStorage.deleteItem(ownerId, buildAuthOptions(options)),
        deleteOwnerName(ownerId, options)
      ]);
      const lastOwnerId = await getLastOwnerId(options);
      if (lastOwnerId === ownerId) {
        const ids = await getOwnerIds(options);
        if (ids.length > 0) {
          await setLastOwnerId(ids[0], options);
        }
      }
    },
    getOwner: async (options) => {
      const ownerId = await getLastOwnerId(options);
      if (!ownerId)
        return null;
      const names = await getOwnerNames(options);
      const username = names[ownerId] ?? "";
      const account = await deps.secureStorage.getItem(ownerId, buildAuthOptions(options, username));
      if (!account?.value)
        return null;
      const result = JSON.parse(account.value);
      const writeKey = OwnerWriteKey.orThrow(new Uint8Array(Object.values(result.owner.writeKey)));
      const encryptionKey = OwnerEncryptionKey.orThrow(new Uint8Array(Object.values(result.owner.encryptionKey)));
      const owner = { ...result.owner, writeKey, encryptionKey };
      await setLastOwnerId(ownerId, options);
      return { owner, username };
    },
    getProfiles: async (options) => {
      const [ids, names] = await Promise.all([
        getOwnerIds(options),
        getOwnerNames(options)
      ]);
      return ids.map((ownerId) => ({
        ownerId,
        username: names[ownerId] ?? ""
      }));
    },
    clearAll: async (options) => {
      await clearAuthStore(options);
    }
  };
};
var localAuth_Namespace = "evolu";
var localAuthDefaultOptions = {
  service: localAuth_Namespace,
  keychainGroup: localAuth_Namespace,
  androidBiometricsStrongOnly: true,
  iosSynchronizable: true,
  webAuthnUsername: "Evolu User",
  authenticationPrompt: {
    title: "Authenticate as |USERNAME|"
  }
};
var localAuthMetakeyLastOwner = "_last_owner";
var localAuthMetakeyOwnerNames = "_owner_names";

// node_modules/@evolu/common/dist/src/local-first/PublicKysely.js
var PublicKysely_exports = {};
__export(PublicKysely_exports, {
  getJsonObjectArgs: () => getJsonObjectArgs,
  jsonArrayFrom: () => jsonArrayFrom,
  jsonBuildObject: () => jsonBuildObject,
  jsonObjectFrom: () => jsonObjectFrom,
  sql: () => sql3
});
import { AliasNode, ColumnNode, ExpressionWrapper, IdentifierNode, ReferenceNode, sql as sql2, TableNode, ValueNode } from "kysely";
import { sql as sql3 } from "kysely";
function jsonArrayFrom(expr) {
  return sql2`(select ${sql2.lit(kyselyJsonIdentifier)} || coalesce(json_group_array(json_object(${sql2.join(getSqliteJsonObjectArgs(expr.toOperationNode(), "agg"))})), '[]') from ${expr} as agg)`;
}
function jsonObjectFrom(expr) {
  return sql2`(select ${sql2.lit(kyselyJsonIdentifier)} || json_object(${sql2.join(getSqliteJsonObjectArgs(expr.toOperationNode(), "obj"))}) from ${expr} as obj)`;
}
function jsonBuildObject(obj) {
  return sql2`${sql2.lit(kyselyJsonIdentifier)} || json_object(${sql2.join(Object.keys(obj).flatMap((k) => [sql2.lit(k), obj[k]]))})`;
}
function getSqliteJsonObjectArgs(node, table) {
  try {
    return getJsonObjectArgs(node, table);
  } catch {
    throw new Error("SQLite jsonArrayFrom and jsonObjectFrom functions can only handle explicit selections due to limitations of the json_object function. selectAll() is not allowed in the subquery.");
  }
}
function getJsonObjectArgs(node, table) {
  const args = [];
  for (const { selection: s } of node.selections ?? []) {
    if (ReferenceNode.is(s) && ColumnNode.is(s.column)) {
      args.push(colName(s.column.column.name), colRef(table, s.column.column.name));
    } else if (ColumnNode.is(s)) {
      args.push(colName(s.column.name), colRef(table, s.column.name));
    } else if (AliasNode.is(s) && IdentifierNode.is(s.alias)) {
      args.push(colName(s.alias.name), colRef(table, s.alias.name));
    } else {
      throw new Error(`can't extract column names from the select query node`);
    }
  }
  return args;
}
function colName(col) {
  return new ExpressionWrapper(ValueNode.createImmediate(col));
}
function colRef(table, col) {
  return new ExpressionWrapper(ReferenceNode.create(ColumnNode.create(col), TableNode.create(table)));
}

// node_modules/random/dist/index.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var RNG = class {
};
var FunctionRNG = class _FunctionRNG extends RNG {
  constructor(rngFn) {
    var _a;
    super();
    __publicField(this, "_name");
    __publicField(this, "_rngFn");
    this._name = (_a = rngFn.name) != null ? _a : "function";
    this._rngFn = rngFn;
  }
  get name() {
    return this._name;
  }
  next() {
    return this._rngFn();
  }
  clone() {
    return new _FunctionRNG(this._rngFn);
  }
};
function createRNG(seedOrRNG) {
  switch (typeof seedOrRNG) {
    case "object":
      if (seedOrRNG instanceof RNG) {
        return seedOrRNG;
      }
      break;
    case "function":
      return new FunctionRNG(seedOrRNG);
    default:
      return new ARC4RNG(seedOrRNG);
  }
  throw new Error(`invalid RNG seed or instance "${seedOrRNG}"`);
}
function mixKey(seed, key) {
  var _a;
  const seedStr = `${seed}`;
  let smear = 0;
  let j = 0;
  while (j < seedStr.length) {
    key[255 & j] = 255 & (smear ^= ((_a = key[255 & j]) != null ? _a : 0) * 19) + seedStr.charCodeAt(j++);
  }
  if (!key.length) {
    return [0];
  }
  return key;
}
function shuffleInPlace(gen, array2) {
  for (let i = array2.length - 1; i > 0; i -= 1) {
    const j = Math.floor(gen.next() * (i + 1));
    const tmp = array2[i];
    array2[i] = array2[j];
    array2[j] = tmp;
  }
}
function sparseFisherYates(gen, array2, k) {
  var _a, _b;
  const H = /* @__PURE__ */ new Map();
  const lastIndex = array2.length - 1;
  const result = Array.from({ length: k });
  for (let i = 0; i < k; i++) {
    const remaining = lastIndex - i + 1;
    const r = Math.floor(gen.next() * remaining);
    result[i] = array2[(_a = H.get(r)) != null ? _a : r];
    H.set(r, (_b = H.get(lastIndex - i)) != null ? _b : lastIndex - i);
  }
  return result;
}
var _arc4_startdenom = 281474976710656;
var _arc4_significance = 4503599627370496;
var _arc4_overflow = 9007199254740992;
var ARC4RNG = class _ARC4RNG extends RNG {
  constructor(seed = crypto.randomUUID()) {
    super();
    __publicField(this, "_seed");
    __publicField(this, "i");
    __publicField(this, "j");
    __publicField(this, "S");
    this._seed = seed;
    const key = mixKey(seed, []);
    const S = [];
    const keylen = key.length;
    this.i = 0;
    this.j = 0;
    this.S = S;
    let i = 0;
    while (i <= 255) {
      S[i] = i++;
    }
    for (let i2 = 0, j = 0; i2 <= 255; i2++) {
      const t = S[i2];
      j = 255 & j + key[i2 % keylen] + t;
      S[i2] = S[j];
      S[j] = t;
    }
    this.g(256);
  }
  get name() {
    return "arc4";
  }
  next() {
    let n = this.g(6);
    let d = _arc4_startdenom;
    let x = 0;
    while (n < _arc4_significance) {
      n = (n + x) * 256;
      d *= 256;
      x = this.g(1);
    }
    while (n >= _arc4_overflow) {
      n /= 2;
      d /= 2;
      x >>>= 1;
    }
    return (n + x) / d;
  }
  g(count) {
    const { S } = this;
    let { i, j } = this;
    let r = 0;
    while (count--) {
      i = 255 & i + 1;
      const t = S[i];
      S[j] = t;
      j = 255 & j + t;
      S[i] = S[j];
      r = r * 256 + S[255 & S[i] + t];
    }
    this.i = i;
    this.j = j;
    return r;
  }
  clone() {
    return new _ARC4RNG(this._seed);
  }
};
var MathRandomRNG = class _MathRandomRNG extends RNG {
  get name() {
    return "Math.random";
  }
  next() {
    return Math.random();
  }
  clone() {
    return new _MathRandomRNG();
  }
};
function numberValidator(num) {
  return new NumberValidator(num);
}
var NumberValidator = class {
  constructor(num) {
    __publicField(this, "n");
    __publicField(this, "isInt", () => {
      if (Number.isInteger(this.n)) {
        return this;
      }
      throw new Error(`Expected number to be an integer, got ${this.n}`);
    });
    __publicField(this, "isPositive", () => {
      if (this.n > 0) {
        return this;
      }
      throw new Error(`Expected number to be positive, got ${this.n}`);
    });
    __publicField(this, "lessThan", (v) => {
      if (this.n < v) {
        return this;
      }
      throw new Error(`Expected number to be less than ${v}, got ${this.n}`);
    });
    __publicField(this, "lessThanOrEqual", (v) => {
      if (this.n <= v) {
        return this;
      }
      throw new Error(
        `Expected number to be less than or equal to ${v}, got ${this.n}`
      );
    });
    __publicField(this, "greaterThanOrEqual", (v) => {
      if (this.n >= v) {
        return this;
      }
      throw new Error(
        `Expected number to be greater than or equal to ${v}, got ${this.n}`
      );
    });
    __publicField(this, "greaterThan", (v) => {
      if (this.n > v) {
        return this;
      }
      throw new Error(`Expected number to be greater than ${v}, got ${this.n}`);
    });
    this.n = num;
  }
};
function bates(random, n = 1) {
  numberValidator(n).isInt().isPositive();
  const irwinHall2 = random.irwinHall(n);
  return () => {
    return irwinHall2() / n;
  };
}
function bernoulli(random, p = 0.5) {
  numberValidator(p).greaterThanOrEqual(0).lessThanOrEqual(1);
  return () => {
    return Math.min(1, Math.floor(random.next() + p));
  };
}
function binomial(random, n = 1, p = 0.5) {
  numberValidator(n).isInt().isPositive();
  numberValidator(p).greaterThanOrEqual(0).lessThan(1);
  return () => {
    let i = 0;
    let x = 0;
    while (i++ < n) {
      if (random.next() < p) {
        x++;
      }
    }
    return x;
  };
}
function exponential(random, lambda = 1) {
  numberValidator(lambda).isPositive();
  return () => {
    return -Math.log(1 - random.next()) / lambda;
  };
}
function geometric(random, p = 0.5) {
  numberValidator(p).greaterThan(0).lessThan(1);
  const invLogP = 1 / Math.log(1 - p);
  return () => {
    return Math.floor(1 + Math.log(random.next()) * invLogP);
  };
}
function irwinHall(random, n = 1) {
  numberValidator(n).isInt().greaterThanOrEqual(0);
  return () => {
    let sum = 0;
    for (let i = 0; i < n; ++i) {
      sum += random.next();
    }
    return sum;
  };
}
function logNormal(random, mu = 0, sigma = 1) {
  const normal2 = random.normal(mu, sigma);
  return () => {
    return Math.exp(normal2());
  };
}
function normal(random, mu = 0, sigma = 1) {
  return () => {
    let x, y, r;
    do {
      x = random.next() * 2 - 1;
      y = random.next() * 2 - 1;
      r = x * x + y * y;
    } while (!r || r > 1);
    return mu + sigma * y * Math.sqrt(-2 * Math.log(r) / r);
  };
}
function pareto(random, alpha = 1) {
  numberValidator(alpha).greaterThanOrEqual(0);
  const invAlpha = 1 / alpha;
  return () => {
    return 1 / Math.pow(1 - random.next(), invAlpha);
  };
}
var logFactorialTable = [
  0,
  0,
  0.6931471805599453,
  1.791759469228055,
  3.1780538303479458,
  4.787491742782046,
  6.579251212010101,
  8.525161361065415,
  10.60460290274525,
  12.801827480081469
];
var logFactorial = (k) => {
  return logFactorialTable[k];
};
var logSqrt2PI = 0.9189385332046727;
function poisson(random, lambda = 1) {
  numberValidator(lambda).isPositive();
  if (lambda < 10) {
    const expMean = Math.exp(-lambda);
    return () => {
      let p = expMean;
      let x = 0;
      let u = random.next();
      while (u > p) {
        u = u - p;
        p = lambda * p / ++x;
      }
      return x;
    };
  } else {
    const smu = Math.sqrt(lambda);
    const b = 0.931 + 2.53 * smu;
    const a = -0.059 + 0.02483 * b;
    const invAlpha = 1.1239 + 1.1328 / (b - 3.4);
    const vR = 0.9277 - 3.6224 / (b - 2);
    return () => {
      var _a;
      while (true) {
        let u;
        let v = random.next();
        if (v <= 0.86 * vR) {
          u = v / vR - 0.43;
          return Math.floor(
            (2 * a / (0.5 - Math.abs(u)) + b) * u + lambda + 0.445
          );
        }
        if (v >= vR) {
          u = random.next() - 0.5;
        } else {
          u = v / vR - 0.93;
          u = (u < 0 ? -0.5 : 0.5) - u;
          v = random.next() * vR;
        }
        const us = 0.5 - Math.abs(u);
        if (us < 0.013 && v > us) {
          continue;
        }
        const k = Math.floor((2 * a / us + b) * u + lambda + 0.445);
        v = v * invAlpha / (a / (us * us) + b);
        if (k >= 10) {
          const t = (k + 0.5) * Math.log(lambda / k) - lambda - logSqrt2PI + k - (1 / 12 - (1 / 360 - 1 / (1260 * k * k)) / (k * k)) / k;
          if (Math.log(v * smu) <= t) {
            return k;
          }
        } else if (k >= 0) {
          const f = (_a = logFactorial(k)) != null ? _a : 0;
          if (Math.log(v) <= k * Math.log(lambda) - lambda - f) {
            return k;
          }
        }
      }
    };
  }
}
function uniform(random, min2 = 0, max2 = 1) {
  return () => {
    return random.next() * (max2 - min2) + min2;
  };
}
function uniformBoolean(random) {
  return () => {
    return random.next() >= 0.5;
  };
}
function uniformInt(random, min2 = 0, max2 = 1) {
  if (max2 === void 0) {
    max2 = min2 === void 0 ? 1 : min2;
    min2 = 0;
  }
  numberValidator(min2).isInt();
  numberValidator(max2).isInt();
  return () => {
    return Math.floor(random.next() * (max2 - min2 + 1) + min2);
  };
}
function weibull(random, lambda, k) {
  numberValidator(lambda).greaterThan(0);
  numberValidator(k).greaterThan(0);
  return () => {
    const u = 1 - random.next();
    return lambda * Math.pow(-Math.log(u), 1 / k);
  };
}
var Random = class _Random {
  constructor(seedOrRNG = new MathRandomRNG()) {
    __publicField(this, "_rng");
    __publicField(this, "_cache", {});
    this._rng = createRNG(seedOrRNG);
  }
  /**
   * @member {RNG} rng - Underlying pseudo-random number generator.
   */
  get rng() {
    return this._rng;
  }
  /**
   * Creates a new `Random` instance, optionally specifying parameters to
   * set a new seed.
   */
  clone(seedOrRNG = this.rng.clone()) {
    return new _Random(seedOrRNG);
  }
  /**
   * Sets the underlying pseudorandom number generator.
   *
   * @example
   * ```ts
   * import random from 'random'
   *
   * random.use('example-seed')
   * // or
   * random.use(Math.random)
   * ```
   */
  use(seedOrRNG) {
    this._rng = createRNG(seedOrRNG);
    this._cache = {};
  }
  // --------------------------------------------------------------------------
  // Uniform utility functions
  // --------------------------------------------------------------------------
  /**
   * Convenience wrapper around `this.rng.next()`
   *
   * Returns a floating point number in [0, 1).
   *
   * @return {number}
   */
  next() {
    return this._rng.next();
  }
  /**
   * Samples a uniform random floating point number, optionally specifying
   * lower and upper bounds.
   *
   * Convenience wrapper around `random.uniform()`
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   */
  float(min2, max2) {
    return this.uniform(min2, max2)();
  }
  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  int(min2, max2) {
    return this.uniformInt(min2, max2)();
  }
  /**
   * Samples a uniform random integer, optionally specifying lower and upper
   * bounds.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @alias `random.int`
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  integer(min2, max2) {
    return this.uniformInt(min2, max2)();
  }
  /**
   * Samples a uniform random boolean value.
   *
   * Convenience wrapper around `random.uniformBoolean()`
   *
   * @alias `random.boolean`
   */
  bool() {
    return this.uniformBoolean()();
  }
  /**
   * Samples a uniform random boolean value.
   *
   * Convenience wrapper around `random.uniformBoolean()`
   */
  boolean() {
    return this.uniformBoolean()();
  }
  /**
   * Returns an item chosen uniformly at random from the given array.
   *
   * Convenience wrapper around `random.uniformInt()`
   *
   * @param {Array<T>} [array] - Input array
   */
  choice(array2) {
    if (!Array.isArray(array2)) {
      throw new TypeError(
        `Random.choice expected input to be an array, got ${typeof array2}`
      );
    }
    const length2 = array2.length;
    if (length2 > 0) {
      const index = this.uniformInt(0, length2 - 1)();
      return array2[index];
    } else {
      return void 0;
    }
  }
  /**
   * Returns a random subset of k items from the given array (without replacement).
   *
   * @param {Array<T>} [array] - Input array
   */
  sample(array2, k) {
    if (!Array.isArray(array2)) {
      throw new TypeError(
        `Random.sample expected input to be an array, got ${typeof array2}`
      );
    }
    if (k < 0 || k > array2.length) {
      throw new Error(
        `Random.sample: k must be between 0 and array.length (${array2.length}), got ${k}`
      );
    }
    return sparseFisherYates(this.rng, array2, k);
  }
  /**
   * Generates a thunk which returns samples of size k from the given array.
   *
   * This is for convenience only; there is no gain in efficiency.
   *
   * @param {Array<T>} [array] - Input array
   */
  sampler(array2, k) {
    if (!Array.isArray(array2)) {
      throw new TypeError(
        `Random.sampler expected input to be an array, got ${typeof array2}`
      );
    }
    if (k < 0 || k > array2.length) {
      throw new Error(
        `Random.sampler: k must be between 0 and array.length (${array2.length}), got ${k}`
      );
    }
    const gen = this.rng;
    return () => {
      return sparseFisherYates(gen, array2, k);
    };
  }
  /**
   * Returns a shuffled copy of the given array.
   *
   * @param {Array<T>} [array] - Input array
   */
  shuffle(array2) {
    if (!Array.isArray(array2)) {
      throw new TypeError(
        `Random.shuffle expected input to be an array, got ${typeof array2}`
      );
    }
    const copy = [...array2];
    shuffleInPlace(this.rng, copy);
    return copy;
  }
  /**
   * Generates a thunk which returns shuffled copies of the given array.
   *
   * @param {Array<T>} [array] - Input array
   */
  shuffler(array2) {
    if (!Array.isArray(array2)) {
      throw new TypeError(
        `Random.shuffler expected input to be an array, got ${typeof array2}`
      );
    }
    const gen = this.rng;
    const copy = [...array2];
    return () => {
      shuffleInPlace(gen, copy);
      return [...copy];
    };
  }
  // --------------------------------------------------------------------------
  // Uniform distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Continuous uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_(continuous)).
   *
   * @param {number} [min=0] - Lower bound (float, inclusive)
   * @param {number} [max=1] - Upper bound (float, exclusive)
   */
  uniform(min2, max2) {
    return this._memoize("uniform", uniform, min2, max2);
  }
  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution).
   *
   * @param {number} [min=0] - Lower bound (integer, inclusive)
   * @param {number} [max=1] - Upper bound (integer, inclusive)
   */
  uniformInt(min2, max2) {
    return this._memoize("uniformInt", uniformInt, min2, max2);
  }
  /**
   * Generates a [Discrete uniform distribution](https://en.wikipedia.org/wiki/Discrete_uniform_distribution),
   * with two possible outcomes, `true` or `false.
   *
   * This method is analogous to flipping a coin.
   */
  uniformBoolean() {
    return this._memoize("uniformBoolean", uniformBoolean);
  }
  // --------------------------------------------------------------------------
  // Normal distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
   *
   * @param {number} [mu=0] - Mean
   * @param {number} [sigma=1] - Standard deviation
   */
  normal(mu, sigma) {
    return normal(this, mu, sigma);
  }
  /**
   * Generates a [Log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution).
   *
   * @param {number} [mu=0] - Mean of underlying normal distribution
   * @param {number} [sigma=1] - Standard deviation of underlying normal distribution
   */
  logNormal(mu, sigma) {
    return logNormal(this, mu, sigma);
  }
  // --------------------------------------------------------------------------
  // Bernoulli distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  bernoulli(p) {
    return bernoulli(this, p);
  }
  /**
   * Generates a [Binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution).
   *
   * @param {number} [n=1] - Number of trials.
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  binomial(n, p) {
    return binomial(this, n, p);
  }
  /**
   * Generates a [Geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution).
   *
   * @param {number} [p=0.5] - Success probability of each trial.
   */
  geometric(p) {
    return geometric(this, p);
  }
  // --------------------------------------------------------------------------
  // Poisson distributions
  // --------------------------------------------------------------------------
  /**
   * Generates a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution).
   *
   * @param {number} [lambda=1] - Mean (lambda > 0)
   */
  poisson(lambda) {
    return poisson(this, lambda);
  }
  /**
   * Generates an [Exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
   *
   * @param {number} [lambda=1] - Inverse mean (lambda > 0)
   */
  exponential(lambda) {
    return exponential(this, lambda);
  }
  // --------------------------------------------------------------------------
  // Misc distributions
  // --------------------------------------------------------------------------
  /**
   * Generates an [Irwin Hall distribution](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution).
   *
   * @param {number} [n=1] - Number of uniform samples to sum (n >= 0)
   */
  irwinHall(n) {
    return irwinHall(this, n);
  }
  /**
   * Generates a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution).
   *
   * @param {number} [n=1] - Number of uniform samples to average (n >= 1)
   */
  bates(n) {
    return bates(this, n);
  }
  /**
   * Generates a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution).
   *
   * @param {number} [alpha=1] - Alpha
   */
  pareto(alpha) {
    return pareto(this, alpha);
  }
  /**
   * Generates a [Weibull distribution](https://en.wikipedia.org/wiki/Weibull_distribution).
   *
   * @param {number} [lambda] - Lambda, the scale parameter
   * @param {number} [k] - k, the shape parameter
   */
  weibull(lambda, k) {
    return weibull(this, lambda, k);
  }
  // --------------------------------------------------------------------------
  // Internal
  // --------------------------------------------------------------------------
  /**
   * Memoizes distributions to ensure they're only created when necessary.
   *
   * Returns a thunk which that returns independent, identically distributed
   * samples from the specified distribution.
   *
   * @internal
   *
   * @param {string} label - Name of distribution
   * @param {function} getter - Function which generates a new distribution
   * @param {...*} args - Distribution-specific arguments
   */
  _memoize(label, getter, ...args) {
    const key = `${args.join(";")}`;
    let value = this._cache[label];
    if (value === void 0 || value.key !== key) {
      value = {
        key,
        distribution: getter(this, ...args)
      };
      this._cache[label] = value;
    }
    return value.distribution;
  }
};
var random_default = new Random();

// node_modules/@evolu/common/dist/src/Random.js
var createRandom = () => ({
  next: () => Math.random()
});
var createRandomWithSeed = (seed) => {
  const random = new Random(seed);
  return {
    next: () => random.next()
  };
};
var createRandomLib = () => new Random();
var createRandomLibWithSeed = (seed) => ({
  random: new Random(seed)
});

// node_modules/@evolu/common/dist/src/Redacted.js
var createRedacted = (value) => {
  const redacted = Object.create(proto);
  registry.set(redacted, value);
  return redacted;
};
var proto = {
  toString: () => redactedString,
  toJSON: () => redactedString,
  [Symbol.for("nodejs.util.inspect.custom")]: () => redactedString,
  [Symbol.dispose]() {
    registry.delete(this);
  }
};
var redactedString = "<redacted>";
var registry = /* @__PURE__ */ new WeakMap();
var revealRedacted = (redacted) => {
  assert(registry.has(redacted), "Redacted value was not in registry");
  return registry.get(redacted);
};
var isRedacted = (value) => typeof value === "object" && value !== null && Object.getPrototypeOf(value) === proto;
var createEqRedacted = (eq) => (x, y) => eq(revealRedacted(x), revealRedacted(y));

// node_modules/@evolu/common/dist/src/Ref.js
var createRef = (initialState) => {
  let currentState = initialState;
  return {
    get: () => currentState,
    set: (state) => {
      currentState = state;
    },
    modify: (updater) => {
      currentState = updater(currentState);
    }
  };
};

// node_modules/@evolu/common/dist/src/Relation.js
var createRelation = () => {
  const aToB = /* @__PURE__ */ new Map();
  const bToA = /* @__PURE__ */ new Map();
  let sizeInternal = 0;
  const relation = {
    add(a, b) {
      let bSet = aToB.get(a);
      if (bSet?.has(b))
        return false;
      if (!bSet) {
        bSet = /* @__PURE__ */ new Set();
        aToB.set(a, bSet);
      }
      bSet.add(b);
      let aSet = bToA.get(b);
      if (!aSet) {
        aSet = /* @__PURE__ */ new Set();
        bToA.set(b, aSet);
      }
      aSet.add(a);
      sizeInternal++;
      return true;
    },
    remove(a, b) {
      const bSet = aToB.get(a);
      if (!bSet?.has(b))
        return false;
      bSet.delete(b);
      if (bSet.size === 0) {
        aToB.delete(a);
      }
      const aSet = bToA.get(b);
      assert(aSet, "Relation mapping inconsistency");
      aSet.delete(a);
      if (aSet.size === 0) {
        bToA.delete(b);
      }
      sizeInternal--;
      return true;
    },
    getB(a) {
      return aToB.get(a);
    },
    getA(b) {
      return bToA.get(b);
    },
    forEach(callback) {
      for (const [a, bSet] of aToB) {
        for (const b of bSet)
          callback(a, b);
      }
    },
    [Symbol.iterator]() {
      const iterator = function* () {
        for (const [a, bSet] of aToB) {
          for (const b of bSet) {
            yield [a, b];
          }
        }
      };
      return iterator();
    },
    has(a, b) {
      const bSet = aToB.get(a);
      return bSet?.has(b) ?? false;
    },
    hasA(a) {
      return aToB.has(a);
    },
    hasB(b) {
      return bToA.has(b);
    },
    deleteA(a) {
      const bSet = aToB.get(a);
      if (!bSet)
        return false;
      const removed = bSet.size;
      for (const b of bSet) {
        const aSet = bToA.get(b);
        if (aSet) {
          aSet.delete(a);
          if (aSet.size === 0) {
            bToA.delete(b);
          }
        }
      }
      aToB.delete(a);
      sizeInternal -= removed;
      return true;
    },
    deleteB(b) {
      const aSet = bToA.get(b);
      if (!aSet)
        return false;
      const removed = aSet.size;
      for (const a of aSet) {
        const bSet = aToB.get(a);
        if (bSet) {
          bSet.delete(b);
          if (bSet.size === 0) {
            aToB.delete(a);
          }
        }
      }
      bToA.delete(b);
      sizeInternal -= removed;
      return true;
    },
    clear() {
      aToB.clear();
      bToA.clear();
      sizeInternal = 0;
    },
    aCount() {
      return aToB.size;
    },
    bCount() {
      return bToA.size;
    },
    size() {
      return sizeInternal;
    }
  };
  return relation;
};

// node_modules/@evolu/common/dist/src/WebSocket.js
var createWebSocket = (url, { protocols, binaryType, onOpen, onClose, onMessage, onError, retryOptions, WebSocketConstructor = globalThis.WebSocket } = {}) => {
  let isDisposed = false;
  const reconnectController = new AbortController();
  const defaultRetryOptions = {
    retries: maxPositiveInt
    // Practically infinite retries
  };
  let socket = null;
  const disposeSocket = () => {
    if (!socket)
      return;
    socket.onopen = null;
    socket.onclose = null;
    socket.onmessage = null;
    socket.onerror = null;
    if (socket.readyState !== socket.CLOSING && socket.readyState !== socket.CLOSED) {
      socket.close();
    }
    socket = null;
  };
  let disposePromise = null;
  void retry({
    ...defaultRetryOptions,
    ...retryOptions
  }, () => new Promise((resolve) => {
    disposePromise = () => {
      resolve(ok());
    };
    if (isDisposed)
      disposePromise();
    disposeSocket();
    socket = new WebSocketConstructor(url, protocols);
    if (binaryType)
      socket.binaryType = binaryType;
    let isOpen = false;
    socket.onopen = () => {
      isOpen = true;
      onOpen?.();
    };
    socket.onerror = (event) => {
      const error = isOpen ? { type: "WebSocketConnectionError", event } : { type: "WebSocketConnectError", event };
      onError?.(error);
      if (error.type === "WebSocketConnectError") {
        resolve(err(error));
      }
    };
    socket.onclose = (event) => {
      onClose?.(event);
      resolve(err({ type: "WebSocketConnectionCloseError", event }));
    };
    socket.onmessage = (event) => {
      onMessage?.(event.data);
    };
  }))(reconnectController).then((result) => {
    if (result.ok || result.error.type === "AbortError")
      return;
    onError?.(result.error);
  });
  return {
    send: (data) => {
      if (!socket || socket.readyState === socket.CONNECTING) {
        return err({ type: "WebSocketSendError" });
      }
      socket.send(data);
      return ok();
    },
    getReadyState: () => socket ? nativeToStringState[socket.readyState] : "connecting",
    isOpen: () => socket ? socket.readyState === socket.OPEN : false,
    [Symbol.dispose]() {
      if (isDisposed)
        return;
      isDisposed = true;
      reconnectController.abort();
      disposeSocket();
      disposePromise?.();
    }
  };
};
var nativeToStringState = {
  [WebSocket.CONNECTING]: "connecting",
  [WebSocket.OPEN]: "open",
  [WebSocket.CLOSING]: "closing",
  [WebSocket.CLOSED]: "closed"
};

export {
  isNonEmptyArray,
  isNonEmptyReadonlyArray,
  appendToArray,
  prependToArray,
  mapArray,
  filterArray,
  dedupeArray,
  partitionArray,
  firstInArray,
  lastInArray,
  shiftArray,
  popArray,
  assert,
  assertNonEmptyArray,
  assertNonEmptyReadonlyArray,
  incrementBigInt,
  decrementBigInt,
  clampBigInt,
  isBetweenBigInt,
  bytesToHex,
  hexToBytes,
  utf8ToBytes,
  bytesToUtf8,
  concatBytes,
  isPlainObject,
  objectToEntries,
  mapObject,
  excludeProp,
  createRecord,
  getProperty,
  isReactNative,
  hasNodeBuffer2 as hasNodeBuffer,
  ok,
  err,
  getOrThrow,
  getOrNull,
  trySync,
  tryAsync,
  safelyStringifyUnknownValue,
  isType,
  createTypeErrorFormatter,
  base,
  createBaseTypeErrorFormatter,
  Unknown,
  String2 as String,
  formatStringError,
  Number2 as Number,
  formatNumberError,
  BigInt2 as BigInt,
  formatBigIntError,
  Boolean2 as Boolean,
  formatBooleanError,
  Undefined,
  formatUndefinedError,
  Null,
  formatNullError,
  Function2 as Function,
  formatFunctionError,
  Uint8Array2 as Uint8Array,
  formatUint8ArrayError,
  instanceOf,
  formatInstanceOfError,
  Date2 as Date,
  EvoluType,
  formatIsTypeError,
  brand,
  CurrencyCode,
  formatCurrencyCodeError,
  DateIso,
  formatDateIsoError,
  dateToDateIso,
  dateIsoToDate,
  trimmed,
  formatTrimmedError,
  TrimmedString,
  trim,
  minLength,
  formatMinLengthError,
  maxLength,
  formatMaxLengthError,
  length,
  formatLengthError,
  NonEmptyString,
  String100,
  String1000,
  NonEmptyString100,
  NonEmptyString1000,
  NonEmptyTrimmedString,
  TrimmedString100,
  TrimmedString1000,
  NonEmptyTrimmedString100,
  NonEmptyTrimmedString1000,
  Mnemonic,
  formatMnemonicError,
  regex,
  formatRegexError,
  UrlSafeString,
  Base64Url,
  formatBase64UrlError,
  uint8ArrayToBase64Url,
  base64UrlToUint8Array,
  SimpleName,
  SimplePassword,
  formatSimplePasswordError,
  Id,
  formatIdError,
  createId,
  createIdFromString,
  createIdAsUuidv7,
  id,
  formatTableIdError,
  IdBytes,
  idBytesTypeValueLength,
  idToIdBytes,
  idBytesToId,
  positive,
  formatPositiveError,
  negative,
  formatNegativeError,
  nonPositive,
  formatNonPositiveError,
  nonNegative,
  formatNonNegativeError,
  NonNegativeNumber,
  PositiveNumber,
  NonPositiveNumber,
  NegativeNumber,
  int,
  formatIntError,
  Int,
  NonNegativeInt,
  PositiveInt,
  maxPositiveInt,
  NonPositiveInt,
  NegativeInt,
  greaterThan,
  formatGreaterThanError,
  lessThan,
  formatLessThanError,
  greaterThanOrEqualTo,
  formatGreaterThanOrEqualToError,
  lessThanOrEqualTo,
  formatLessThanOrEqualToError,
  nonNaN,
  formatNonNaNError,
  NonNaNNumber,
  finite,
  formatFiniteError,
  FiniteNumber,
  multipleOf,
  formatMultipleOfError,
  between,
  formatBetweenError,
  literal,
  formatLiteralError,
  array,
  formatArrayError,
  set,
  formatSetError,
  record,
  formatRecordError,
  object,
  formatObjectError,
  formatObjectWithRecordError,
  union,
  formatUnionError,
  isUnionType,
  recursive,
  nullOr,
  undefinedOr,
  nullishOr,
  tuple,
  formatTupleError,
  Int64,
  formatInt64Error,
  Int64String,
  formatInt64StringError,
  JsonValue,
  JsonArray,
  JsonObject,
  parseJson,
  Json,
  formatJsonError,
  jsonValueToJson,
  jsonToJsonValue,
  json,
  optional,
  isOptionalType,
  partial,
  nullableToOptional,
  omit,
  maxMutationSize,
  validMutationSize,
  formatValidMutationSizeError,
  createFormatTypeError,
  typeErrorToStandardSchemaIssues,
  BufferError,
  createBuffer,
  createLruCache,
  createCallbacks,
  createConsole,
  createConsoleWithTime,
  Entropy16,
  Entropy32,
  Entropy64,
  createRandomBytes,
  createSlip21,
  deriveSlip21Node,
  EncryptionKey,
  createSymmetricCrypto,
  createPadmePaddedLength,
  createPadmePadding,
  eqStrict,
  eqString,
  eqNumber,
  eqBigInt,
  eqBoolean,
  eqUndefined,
  eqNull,
  eqFromOrder,
  createEqArrayLike,
  eqArrayNumber,
  createEqObject,
  eqJsonValue,
  eqJsonValueInput,
  createTransferableError,
  exhaustiveCheck,
  identity,
  readonly,
  constVoid,
  constUndefined,
  constNull,
  constTrue,
  constFalse,
  createIdenticon,
  createInstances,
  SqliteValue,
  eqSqliteValue,
  createSqlite,
  createPreparedStatementsCache,
  sql,
  isSqlMutation,
  explainSqliteQueryPlan,
  SqliteBoolean,
  sqliteTrue,
  sqliteFalse,
  booleanToSqliteBoolean,
  sqliteBooleanToBoolean,
  createStore,
  createInitializedWorker,
  createInitializedWorkerWithHandlers,
  OwnerId,
  OwnerIdBytes,
  ownerIdToOwnerIdBytes,
  ownerIdBytesToOwnerId,
  ownerWriteKeyLength,
  OwnerEncryptionKey,
  OwnerWriteKey,
  createOwnerWriteKey,
  OwnerSecret,
  createOwnerSecret,
  ownerSecretToMnemonic,
  mnemonicToOwnerSecret,
  createAppOwner,
  createShardOwner,
  deriveShardOwner,
  createSharedOwner,
  createSharedReadonlyOwner,
  createOwnerWebSocketTransport,
  parseOwnerIdFromOwnerWebSocketTransportUrl,
  increment,
  decrement,
  clamp,
  isBetween,
  min,
  max,
  computeBalancedBuckets,
  createOrder,
  reverseOrder,
  orderString,
  orderNumber,
  orderBigInt,
  orderUint8Array,
  Timestamp,
  timestampToTimestampBytes,
  timestampBytesToTimestamp,
  emptyRows,
  createResources,
  createTime,
  createTestTime,
  durationToNonNegativeInt,
  toTask,
  wait,
  timeout,
  retry,
  createSemaphore,
  createMutex,
  requestIdleTask,
  isAsync,
  createEvolu,
  createLocalAuth,
  localAuth_Namespace,
  localAuthDefaultOptions,
  PublicKysely_exports,
  createRandom,
  createRandomWithSeed,
  createRandomLib,
  createRandomLibWithSeed,
  createRedacted,
  revealRedacted,
  isRedacted,
  createEqRedacted,
  createRef,
  createRelation,
  createWebSocket
};
//# sourceMappingURL=chunk-MFTVS33O.js.map
