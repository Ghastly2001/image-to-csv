import { Parser } from "json2csv";
import fs from "fs";

var info = [
  {
    "S. No.": "1",
    "Product Name": "SKU1",
    "Input Image Urls":
      "https://www.public-image-url1.jpg,https://www.public-image-url2.jpg,https://www.public-image-url3.jpg",
  },
  {
    "S. No.": "2",
    "Product Name": "SKU2",
    "Input Image Urls":
      "https://www.public-image-url1.jpg,https://www.public-image-url2.jpg,https://www.public-image-url3.jpg",
  },
];

const json2csvParser = new Parser();
const csv = json2csvParser.parse(info);

fs.writeFile("data.csv", csv, (err) => {
  if (err) throw err;
  console.log("file saved");
});
