import * as cheerio from 'cheerio';

import { TimezoneDataParse, TimezoneData } from '../../types/timezoneData.js';

function parse(html: string) {
    const $ = cheerio.load(html);
    const tableCells = $(".wikitable>tbody").children("tr").children();

    const timezoneData = [];
    let temp: TimezoneDataParse = {};

    let counter = -1;

    for(let i = 0; i < tableCells.length; i++) {
        counter++;
        const cell = tableCells[i].children[0];
        let data = "";

        if(cell.type === "text") {
            data = cell.data;
        }

        if(cell.type === "tag") {
            data = cell.attribs.title;
        }

        switch(counter) {
            case 0:
                temp.abbreviation = data;
                break;
            case 1:
                temp.name = data;
                break;
            case 2:
                temp.utcOffset = data.split("UTC")[1].replace("−", "-");
                counter = -1;
                timezoneData.push(temp);
                temp = {};
                break;
        }
    };

    return timezoneData as TimezoneData[];
};

export default parse;