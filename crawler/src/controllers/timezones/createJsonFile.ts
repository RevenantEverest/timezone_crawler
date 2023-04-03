import fs from 'fs';
import { TimezoneData } from '../../types/timezoneData.js';

import { colors, logs } from '../../utils/index.js';

function createJsonFile(timezoneData: TimezoneData[]) {
    fs.writeFile("./output/timezoneData.json", JSON.stringify(timezoneData, null, 4), (err) => {
        if(err) {
            return logs.error({ color: colors.error, type: "WriteFile", message: err.message, err });
        }

        logs.log({ color: colors.success, message: "File Saved!" });
    });
};

export default createJsonFile;