export const getDay = (pDateObj) => {
    var ISODate = pDateObj.toISOString();
    var date = ISODate.split('T');
    date = date[0];
    var splitDate = date.split('-');
    return splitDate[2];
}

export const getMonth = (pDateObj) => {
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return MONTH_NAMES[pDateObj.getMonth()];
}

export const getYear = (pDateObj) => {
    var ISODate = pDateObj.toISOString();
    var date = ISODate.split('T');
    date = date[0];
    var splitDate = date.split('-');
    return splitDate[0];
}