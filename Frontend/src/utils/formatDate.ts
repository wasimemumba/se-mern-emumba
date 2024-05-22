function formatDate(date :number) {
    // Create a new Date object from the timestamp
    const newDate = new Date(date);

    // Extract day, month, and year
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = newDate.getFullYear();

    // Pad day and month with leading zeros if needed
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Return the formatted date string
    return formattedMonth + '/' + formattedDay + '/' + year;
}

export default formatDate;

