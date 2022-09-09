export const createQueryWhereFromObject = (obj) => {
    let equalArray = Object.keys(obj).map(key => `${key}=?`);
    let queryString = `WHERE ${equalArray.join(' AND ')}`;
    let values = Object.entries(obj).map(item => item[1]);

    return [
        queryString,
        values
    ]
}
