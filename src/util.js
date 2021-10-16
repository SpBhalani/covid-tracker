export const sortData = (data) =>{
     const sortedData = data.sort((a,b) => a.cases > b.cases ? -1 : 1);
    return sortedData;
    }