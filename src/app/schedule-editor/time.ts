export class Time {
  static hourMinutesToMinutes(hours: number, minutes: number): number {
    return hours * 60 + minutes;
  }

  static minutesToHourMinutes(minutes: number): { hours: number, minutes: number } {
    // Calculate hours and remaining minutes
    let hours = Math.floor(minutes / 60)%24;
    let remainingMinutes = minutes % 60;


    // Return the result
    return { hours, minutes: remainingMinutes };
  }

}
