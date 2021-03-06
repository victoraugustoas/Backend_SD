const schedule = require('node-schedule')

module.exports = (app) => {
    /*
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week(0 - 7)(0 or 7 is Sun)
    │    │    │    │    └───── month(1 - 12)
    │    │    │    └────────── day of month(1 - 31)
    │    │    └─────────────── hour(0 - 23)
    │    └──────────────────── minute(0 - 59)
    └───────────────────────── second(0 - 59, OPTIONAL) 
    */
    let updateAvg = schedule.scheduleJob(`${process.env.SCHEDULE_JOBS_MINUTE}    ${process.env.SCHEDULE_JOBS_HOUR}    *    *    *`, () => {
        app.meal.updateAvg()
    })

}
