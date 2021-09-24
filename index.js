const fs = require("fs");
const path = require("path");
const commandLineArgs = require("command-line-args");

const filename = "data.json";
const filepath = `${path.resolve(".")}/${filename}`;

let content;
try {
  content = fs.readFileSync(filepath, "utf-8");
} catch (error) {
  content = [];
}

const items = JSON.parse(content);
const params = [
  {
    name: "item",
    alias: "i",
    type: String,
  },
  {
    name: "completed",
    alias: "c",
    type: Boolean,
  },  {
    name: "date",
    alias: "d",
    type: String,
  },
];
const options = commandLineArgs(params);
const { item = "", completed = false, date = "" } = options;

if (item) {
  items.push({ item, completed, date });
  fs.writeFileSync(filepath, JSON.stringify(items, null, 2));
}

console.log(items);

for (let index = 0; index < items.length; index++) {
  const element = items[index];
  const checked = element.completed ? "[✓]" : "[ ]";
  const duedate = element.date ? new Date(element.date) : "";
  const name = element.item;

  console.log(`${index}. ${checked} ${name} [${duedate}]`);

}