const articleData = [];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const hours = [
  { 13: 1 },
  { 14: 2 },
  { 15: 3 },
  { 16: 4 },
  { 17: 5 },
  { 18: 6 },
  { 19: 7 },
  { 20: 8 },
  { 21: 9 },
  { 22: 10 },
  { 23: 11 },
  { 24: 12 },
];
class Article {
  constructor(
    idName,
    title,
    author,
    link,
    imgSrc,
    description,
    source,
    date,
    time,
    category
  ) {
    this.idName = idName;
    this.title = title;
    this.author = author;
    this.link = link;
    this.imgSrc = imgSrc;
    this.description = description;
    this.source = source;
    this.date = date;
    this.time = time;
    this.category = category;
  }
}
