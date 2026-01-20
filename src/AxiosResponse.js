
const getResult = (response, message) => {
    if(response !== undefined) {
        // status 가 200 OK 인 경우
        if(response.status === 200) {
            alert(message);
        } else {
            // status 가 200 OK 가 아닌 경우
            let resultCode = response.headers['resultcode'];
            let resultMessage = message;
            if(response.headers['resultmessage']) {
                resultMessage = decodeUTF8String(response.headers['resultmessage']);
            }
            //console.log(resultMessage);
            if(resultMessage === null || resultMessage === undefined)
                resultMessage = message;

            let finMessage = `${resultMessage} (에러코드 ${resultCode})`;
            alert(finMessage);
        }
    } else {
        //response 가 undefined 일 경우
        alert(message);
    }
}

const getErrorMessage = (response, message) => {
    if(response !== undefined) {
        let resultCode = response.headers['resultcode'];
        let resultMessage = message;
        if(response.headers['resultmessage']) {
            resultMessage = decodeUTF8String(response.headers['resultmessage']);
        }
        //console.log(resultMessage);
        if(resultMessage === null || resultMessage === undefined)
            resultMessage = message;

        return `${resultMessage} (에러코드 ${resultCode})`;
    } else {
        //response 가 undefined 일 경우
        return message;
    }
}

function decodeUTF8String(encodedStr) {
    try {
        return decodeURIComponent(encodedStr.replace(/\+/g, ' '));
    } catch (e) {
        console.error('Error decoding UTF-8 string:', e);
        return null;
    }
}

export { getResult, getErrorMessage };