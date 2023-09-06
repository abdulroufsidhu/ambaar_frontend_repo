import { DateTime, Settings, Zone } from "luxon";
export class MyClock {
  static locality = () => {
    console.log("locality", Settings.defaultZone.name)
    return (Settings.defaultZone as Zone).name as string
  }

  static toLocal = (date: Date) => DateTime.fromJSDate(date).setZone(this.locality()).toJSDate()
  // static toLocal = (date: Date) => {
  //   const d = DateTime.fromJSDate(date)
  //   d.setZone(this.locality())
  //   d.toJSDate()
  //   date.toLocaleDateString(
  //     this.locality(),
  //     {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //       hour: 'numeric',
  //       minute: 'numeric',
  //       second: 'numeric',
  //       timeZoneName: 'short'
  //     }
  //   );
  // }

  static fromDateString = (dateString: string) => new Date(dateString);

}