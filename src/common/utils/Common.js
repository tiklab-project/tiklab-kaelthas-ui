
/**
 * 获取时间段
 */
const getCurrentTimeQua = (data) => {
    if (data){
       return  getTimeQuantum(data)
    }else {
        //获取当天的开始时间和结束时间
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let nowVar = ("'" + year + '-' + month + '-' + day + "'");


        return [nowVar.substring(1, nowVar.length - 1)+" 00:00:00",nowVar.substring(1, nowVar.length - 1) + " 24:00:00"]
    }

}

/**
 * 获取一个时间点的前后半个小时
 */
const getTimeQuantum = (data) => {
    const exampleTime = new Date(data);
    const thirtyMinutesBefore = new Date(exampleTime.getTime() - 30 * 60 * 1000);
    const thirtyMinutesAfter = new Date(exampleTime.getTime() + 30 * 60 * 1000);

    return [formatDate(thirtyMinutesBefore),formatDate(thirtyMinutesAfter)]
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export {getCurrentTimeQua,getTimeQuantum}
