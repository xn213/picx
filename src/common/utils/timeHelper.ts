export default class TimeHelper {
  private static zerofill(n: number) {
    return n < 10 ? `0${n}` : n
  }

  static getYyyyMmDd(now: number = Date.now()) {
    const _now: Date = new Date(now)
    const yyyy = _now.getFullYear()
    const MM = _now.getMonth() + 1
    const DD = _now.getDate()
    return `${yyyy}${this.zerofill(MM)}${this.zerofill(DD)}`
  }

  static formatTimestamp(now: number = Date.now()) {
    const _now: Date = new Date(now)
    const YYYY = _now.getFullYear()
    const MM = _now.getMonth() + 1
    const DD = _now.getDate()
    const hh = _now.getHours()
    const mm = _now.getMinutes()
    const ss = _now.getSeconds()
    return `${YYYY}-${this.zerofill(MM)}-${this.zerofill(DD)} ${this.zerofill(
      hh
    )}:${this.zerofill(mm)}:${this.zerofill(ss)}`
  }
}
