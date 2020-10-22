/* global fdkAac */
/* eslint-env worker */

self.fdkAacWasm = './aac-enc.wasm'

importScripts('./fdk-aac.umd.js')

self.onmessage = (event) => {
  const data = event.data;
  const udata = new Uint8Array(data);
  console.log(data, udata);
  fdkAac(udata, function (err, aac) {
    if (err) {
      return console.error(err);
    }
    const file = ('File' in self)
      ? new File([aac.buffer], 'test.aac', { type: 'audio/aac' })
      : new Blob([aac.buffer], { type: 'audio/aac' })
    self.postMessage(URL.createObjectURL(file))
  })
  // fetch(data)
  //   .then((response) => {
  //     return response.arrayBuffer();
  //   })
  //   .then((wav) => {
  //     console.log("wav", wav, new Uint8Array(wav))
  //     fdkAac(new Uint8Array(wav), function (err, aac) {
  //       if (err) return console.error(err);
  //       const file = ('File' in self)
  //         ? new File([aac.buffer], 'test.aac', { type: 'audio/aac' })
  //         : new Blob([aac.buffer], { type: 'audio/aac' })
  //       self.postMessage(URL.createObjectURL(file))
  //     })
  //   })
}
