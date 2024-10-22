import moment from "moment";
import "moment/dist/locale/es";

export function formatDate(date, format = "YYYY-MM-DD", initialFormart) {
  return moment(date, initialFormart || null).format(format);
}

export function formatUtcDate(date, format = "YYYY-MM-DD", initialFormart) {
  return moment.utc(date, initialFormart || null).format(format);
}
