self.onmessage = (e) => {
  if (e.data === "test") {
    self.postMessage("okay")
  } else {
    self.postMessage("unexpected message!")
  }
}
