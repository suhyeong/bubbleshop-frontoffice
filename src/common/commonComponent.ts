import {Modal} from "antd";

const errorModalWithActionClick = (message: string, onClickAction: Function) => {
    return Modal.error({
        // centered: true,
        mask: false,
        title: 'ERROR',
        content: message,
        style: { whiteSpace: 'pre-line' },
        okText: "확인",
        onOk: () => onClickAction
    });
}

const errorModalWithActionClickAndCountdown = (message: string, count: number, onClickAction: Function) => {
    let seconds = count;
    const instance = errorModalWithActionClick(message, onClickAction);

    const timer = setInterval(() => {
        seconds -= 1;
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        instance.destroy();
    }, seconds * 1000);
}

export { errorModalWithActionClick, errorModalWithActionClickAndCountdown };