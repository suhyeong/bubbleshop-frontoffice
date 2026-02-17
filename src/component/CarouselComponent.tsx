import "./Carousel.css";
import React, {useEffect, useRef, useState} from "react";
import {CarouselRef} from "antd/es/carousel";
import {LeftOutlined, RightOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Button, Card, Carousel, Grid, Col, Row} from "antd";
import ProductCard from "./ProductCard";
import {CAROUSEL_COMPONENT_TYPE} from "../common/commonConst";
import {CarouselItem} from "../common/commonInterface";
const { useBreakpoint } = Grid;

const CarouselComponent = (
    {
        divideItemCount,
        minItemCount,
        items,
        title,
        carouselInnerType,
        carouselAutoPlay = false,
        carouselAutoPlaySpeed,
} : {
    divideItemCount: number, // 슬라이드 아이템 나눌 갯수
    minItemCount: number, // 모바일 판단할 수 있는 최소 아이탬 갯수
    items: CarouselItem[], // 아이템 리스트
    title: string,
    carouselInnerType: string, // 슬라이드 컴포넌트 내부 타입
    carouselAutoPlay?: boolean,
    carouselAutoPlaySpeed?: number | undefined,
}) => {
    const screens = useBreakpoint();
    const [breakpoint, setBreakPoint] = useState<string>('');
    const carouselRef = useRef<CarouselRef>(null);

    const [itemsPerSlide, setItemsPerSlide] = useState<number>(divideItemCount);
    const [groupedItems, setGroupedItems] = useState<CarouselItem[][]>([]);
    const [colSpan, setColSpan] = useState<number>(24 / divideItemCount);

    useEffect(() => {
        const last = Object.entries(screens)
            .filter((screen) => screen[1])
            .pop();
        if (last) setBreakPoint(last[0]);
    }, [screens]);

    useEffect(() => {
        const handleResize = () => {
            if (['xxl', 'xl'].includes(breakpoint)) {
                setItemsPerSlide(4);
            } else if (['lg', 'md'].includes(breakpoint)) {
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
        const changeItems: CarouselItem[][] = [];
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

    const getCarouselInnerComponentType = (item: any) => {
        if (CAROUSEL_COMPONENT_TYPE.PRODUCT === carouselInnerType)
            return <ProductCard item={item} />
        else return undefined;
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
                    autoplay={carouselAutoPlay}
                    autoplaySpeed={carouselAutoPlaySpeed}
                    swipe={true}
                    draggable
                    className="carousel-body"
                    key={itemsPerSlide}
                >
                    {groupedItems.map((group, index) => (
                        <div key={index}>
                            <Row gutter={[16, 16]}>
                                {group.map((item: CarouselItem) => (
                                    <Col span={colSpan} key={item.id}>
                                        {
                                            getCarouselInnerComponentType(item)
                                        }
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