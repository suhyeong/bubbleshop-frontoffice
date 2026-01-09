import {Modal} from "antd";

const errorModalWithActionClick = (message, onClickAction) => {
    Modal.error({
        // centered: true,
        mask: false,
        title: 'ERROR',
        content: message,
        style: { whiteSpace: 'pre-line' },
        okText: "확인",
        onOk: onClickAction
    });
}

export { errorModalWithActionClick };