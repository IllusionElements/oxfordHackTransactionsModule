export class List<V = any> extends Map<number, V> {
  add(value) {
    if(value === undefined || value === null) {
      return;
    }

    const index = this.size
    super.set(index, value)
  }

  @alias('add')
  set = (value) => this.add(value)

  remove = (index: number) => this.delete(index)
}