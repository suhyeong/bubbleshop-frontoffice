import "./Carousel.css";
import React, {useEffect, useRef, useState} from "react";
import {CarouselRef} from "antd/es/carousel";
import {LeftOutlined, RightOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Button, Card, Carousel, Grid, Col, Row} from "antd";
const { useBreakpoint } = Grid;

const CarouselComponent = ({
   divideItemCount, minItemCount, items, title
} : {
    divideItemCount: number, // 슬라이드 아이템 나눌 갯수
    minItemCount: number, // 모바일 판단할 수 있는 최소 아이탬 갯수
    items: any[], // 아이템 리스트
    title: string,
}) => {
    const screens = useBreakpoint();
    const [breakpoint, setBreakPoint] = useState<string>('');
    const carouselRef = useRef<CarouselRef>(null);

    const [itemsPerSlide, setItemsPerSlide] = useState<number>(divideItemCount);
    const [groupedItems, setGroupedItems] = useState<any[]>([]);
    const [colSpan, setColSpan] = useState<number>(24 / divideItemCount);

    useEffect(() => {
        const last = Object.entries(screens)
            .filter((screen) => screen[1])
            .pop();
        if (last) setBreakPoint(last[0]);
    }, [screens]);

    useEffect(() => {
        const handleResize = () => {
            if (['xxl', 'xl', 'lg'].includes(breakpoint)) {
                setItemsPerSlide(4);
            } else if (['md'].includes(breakpoint)) {
                setItemsPerSlide(3);
            } else {
                setItemsPerSlide(2);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    useEffect(() => {
        const changeItems = [];
        for (let i = 0; i < items.length; i += itemsPerSlide) {
            changeItems.push(items.slice(i, i + itemsPerSlide));
        }
        setGroupedItems(changeItems);
        setColSpan(24 / itemsPerSlide);
    }, [itemsPerSlide]);

    const handlePrev = () => {
        carouselRef.current?.prev();
    };

    const handleNext = () => {
        carouselRef.current?.next();
    };

    const isMobile = itemsPerSlide === minItemCount;
    const mobileClass = () => {
        return isMobile ? 'mobile' : '';
    }

    return (
        <div className={`carousel-container ${mobileClass()}`}>
            <h1 className="carousel-title">
                {/*<ShoppingOutlined className="carousel-title-icon" />*/}
                {title}
            </h1>

            <div className={`carousel-wrapper ${mobileClass()}`}>
                {/* 이전 버튼 (데스크탑) */}
                {!isMobile && (
                    <Button
                        type="text"
                        icon={<LeftOutlined className="arrow-icon" />}
                        onClick={handlePrev}
                        className="carousel-button carousel-button-prev"
                    />
                )}

                {/* Carousel */}
                <Carousel
                    ref={carouselRef}
                    dots={true}
                    autoplay={false}
                    swipe={true}
                    draggable
                    className="product-carousel"
                >
                    {groupedItems.map((group, index) => (
                        <div key={index}>
                            <Row gutter={[16, 16]}>
                                {group.map((item: any) => (
                                    <Col span={colSpan} key={item.id}>
                                        {/* TODO 컴포넌트 빼기 */}
                                        <Card
                                            hoverable
                                            className="product-card"
                                            cover={
                                                <img
                                                    draggable={false}
                                                    alt={item.title}
                                                    src={item.image}
                                                    className="product-cover-image"
                                                />
                                            }
                                        >
                                            <Card.Meta
                                                title={item.title}
                                                description={item.content}
                                                className="product-meta"
                                            />
                                            <p className="product-price">
                                                {item.price}
                                            </p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Carousel>

                {/* 다음 버튼 (데스크탑) */}
                {!isMobile && (
                    <Button
                        type="text"
                        icon={<RightOutlined className="arrow-icon" />}
                        onClick={handleNext}
                        className="carousel-button carousel-button-next"
                    />
                )}
            </div>

            {/* 모바일 버튼 */}
            {/*{isMobile && (*/}
            {/*    <div className="mobile-buttons">*/}
            {/*        <Button*/}
            {/*            icon={<LeftOutlined />}*/}
            {/*            onClick={handlePrev}*/}
            {/*        >*/}
            {/*            이전*/}
            {/*        </Button>*/}
            {/*        <Button*/}
            {/*            icon={<RightOutlined />}*/}
            {/*            onClick={handleNext}*/}
            {/*        >*/}
            {/*            다음*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default CarouselComponent;