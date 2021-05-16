export class SimpleConstrainedCache {
  __records = new Map<string, any>();
  __maxNumRecords: number;
  __numRecords = 0;

  constructor({ maxNumRecords }: { maxNumRecords: number }) {
    this.__maxNumRecords = maxNumRecords;
  }

  length = () => this.__numRecords;

  has = (key: string) => this.__records.has(key);

  get = (key: string) => this.__records.get(key);

  set = (key: string, value: any) => {
    this.__records.set(key, value);
    this.__numRecords += 1;

    this.__trim();
  };

  /**
   * After each set, we'll make sure to trim up a bit (if needed)
   */
  __trim = () => {
    if (this.__numRecords > this.__maxNumRecords) {
      for (let [key] of this.__records) {
        this.__records.delete(key);
        this.__numRecords -= 1;
        break;
      }
    }
  };
}
