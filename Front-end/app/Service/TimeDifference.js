const timeDifference = (previous) => {
    const moment = require('moment')

    let pDate = moment(previous)
    let asOfDate = moment(new Date())
    var diff = asOfDate.diff(pDate);
    if (diff < 24 * 60 * 60 * 1000) {// less than 24 diff
       if (diff < 60 * 60 * 1000) {
          previous = 'less than 1 hour ago'
          previous = moment(diff).format("mm") + " minutes ago"
          previous = previous.charAt(0) == '0' ? previous.substring(1) : previous
       }
       else {
          previous = moment(diff).format("hh") + " hours ago"
          previous = previous.charAt(0) == '0' ? previous.substring(1) : previous
       }
    } else {
       previous = moment(previous).format("MMM Do") 
    }
    return previous
}

export { timeDifference }
