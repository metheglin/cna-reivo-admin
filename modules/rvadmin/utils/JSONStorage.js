export default class JSONStorage {
  constructor(storeName) {
    this.storeName = storeName
  }

  get() {
    const storedData = localStorage.getItem(this.storeName)
    return storedData ? JSON.parse(storedData) : storedData
  }

  set(data) {
    localStorage.setItem(this.storeName, JSON.stringify(data))
  }

  remove() {
    localStorage.removeItem(this.storeName)
  }
}