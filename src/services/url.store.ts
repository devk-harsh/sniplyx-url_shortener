class UrlStore {
  private store: Map<string, string>;

  constructor() {
    this.store = new Map<string, string>();
  }

  save(shortCode: string, longUrl: string) {
    this.store.set(shortCode, longUrl);
  }

  get(shortCode: string) {
    return this.store.get(shortCode);
  }

  has(shortCode: string) {
    return this.store.has(shortCode);
  }
}

export default new UrlStore();
