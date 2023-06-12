import { scrape } from "./src/crawler.js";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import * as fs from 'fs';

export const main = async (id) => {

    console.log(chalk.cyanBright(`Running for videoId: ${id}`));

    try {
        const returnedViews = await scrape(id);
        fs.appendFileSync('./res.txt', returnedViews + '\n', 'ascii');
        console.log(chalk.magenta(`Views of the video are : ${returnedViews}, writing file...`))
    }
    catch (error) {
        const errorMsg = chalk.red(error.message)
        console.log(errorMsg);
    }

    return
}


const data = fs.readFileSync('./id.txt', 'ascii');
const dataArr = data.split("\n");


let i = 0;
const mainWithdelay = async() => {
    if(i === dataArr.length){
        return
    }
    await main(dataArr[i]);

    i+=1;
    return mainWithdelay()
}

mainWithdelay()