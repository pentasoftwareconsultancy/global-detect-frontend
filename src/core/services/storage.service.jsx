class StorageService {
  static setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getData(key) {
    const val = localStorage.getItem(key);
    if (!val) return null;
    try {
      return JSON.parse(val);
    } catch {
      return null;
    }
  }

  static clear() {
    localStorage.clear();
  }
}

export default StorageService;