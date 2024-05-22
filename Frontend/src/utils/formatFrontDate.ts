
function formatDate(inputDate : string) {

    if(inputDate === null || inputDate === undefined || inputDate === '') return ('');

    const parts = inputDate.split('-');
    const year = parseInt(parts[0]);
    const month =parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // Create a new Date object using the parsed year, month, and day
    const date = new Date(year, month - 1, day);

    // Get the month and day with leading zeros if needed
    const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const formattedDay = ('0' + date.getDate()).slice(-2);

    // Construct the formatted date string
    const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;

    return formattedDate;
}


export default formatDate;