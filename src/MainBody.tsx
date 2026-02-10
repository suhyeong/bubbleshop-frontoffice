import "./Main.css";
import React from 'react';
import CarouselComponent from "./component/CarouselComponent";

const MainBody = () => {
    // TODO
    const products = [
        { id: 1, title: '노트북', content: '고성능 게이밍 노트북', price: '1,500,000원', image: 'https://picsum.photos/300/200?random=1' },
        { id: 2, title: '키보드', content: '기계식 키보드', price: '150,000원', image: 'https://picsum.photos/300/200?random=2' },
        { id: 3, title: '마우스', content: '무선 게이밍 마우스', price: '80,000원', image: 'https://picsum.photos/300/200?random=3' },
        { id: 4, title: '모니터', content: '27인치 4K 모니터', price: '500,000원', image: 'https://picsum.photos/300/200?random=4' },
        { id: 5, title: '헤드셋', content: '노이즈 캔슬링 헤드셋', price: '200,000원', image: 'https://picsum.photos/300/200?random=5' },
        { id: 6, title: '웹캠', content: 'FHD 웹캠', price: '100,000원', image: 'https://picsum.photos/300/200?random=6' },
        { id: 7, title: '스피커', content: '블루투스 스피커', price: '120,000원', image: 'https://picsum.photos/300/200?random=7' },
        { id: 8, title: '마이크', content: 'USB 콘덴서 마이크', price: '150,000원', image: 'https://picsum.photos/300/200?random=8' },
        { id: 9, title: 'SSD', content: '1TB NVMe SSD', price: '180,000원', image: 'https://picsum.photos/300/200?random=9' },
        { id: 10, title: 'RAM', content: '32GB DDR4 메모리', price: '120,000원', image: 'https://picsum.photos/300/200?random=10' },
        { id: 11, title: '그래픽카드', content: 'RTX 4070 GPU', price: '900,000원', image: 'https://picsum.photos/300/200?random=11' },
        { id: 12, title: '케이스', content: 'ATX 미들타워', price: '80,000원', image: 'https://picsum.photos/300/200?random=12' },
    ];

    return (
        <div className="main-body-div">
            <CarouselComponent divideItemCount={4} minItemCount={2} items={products} title={"추천 상품"} />
        </div>
    );
};

export default MainBody;