const worker = new Worker('worker.js')

worker.onmessage = (event) => {
  const url = event.data
  document.body.innerHTML += `<audio src="${url}" controls></audio>`
}

worker.postMessage('../test.wav')