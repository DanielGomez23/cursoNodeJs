import { readFile } from "node:fs/promises"
Promise.all([
    readFile("./readme.md", 'utf-8'),
    readFile("./readme.md", 'utf-8')
]).then(([text, secondText]) => {
    console.log('primer texto:', text)
    console.log('segundo texto:', secondText)
}
);