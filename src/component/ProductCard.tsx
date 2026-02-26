import "./ProductCard.css";
import {Card} from "antd";
import React, {useEffect, useState} from "react";
import {CarouselItem, TagItem} from "../common/commonInterface";
import ProductTag from "./ProductTag";
import {
    IssuesCloseOutlined, WarningOutlined, WarningTwoTone
} from '@ant-design/icons'

const ProductCard = ({ item } : { item : CarouselItem }) => {
    const [ productTags, setProductTags ] = useState<TagItem[] | undefined>(undefined);
    const [ finalPrice, setFinalPrice ] = useState<number>(item.price);
    const [ orderDeadlineDayCount, setOrderDeadlineDayCount] = useState<number>(Number.MIN_VALUE);

    useEffect(() => {
        if (item.features) {
            setProductTags(item.features);
        }
        if (item.discount && item.discount > 0) {
            setFinalPrice(item.price - (item.price * (item.discount / 100)));
        }
        if (item.content) {
            const now = new Date();
            // yyyy-MM-dd HH:mm:ss 포맷에서 yyy-MM-dd 까지 split
            const deadlineDay = new Date(item.content.split(" ")[0] + " 00:00:00");
            const diff = deadlineDay.getTime() - now.getTime();
            setOrderDeadlineDayCount(Math.ceil(diff / (1000 * 60 * 60 * 24)));
        }
    }, [item.features, item.discount, item.price, item.content]);

    const getDeadlineDate = (date: string) => {
        return date.split(" ")[0].substring(5).replace("-", "/");
    }

    const getDeadlineDDay = () => {
        if (item.content) {
            if (orderDeadlineDayCount > 1) {
                return (
                    <span className="product-deadline-span countdown">
                        D-{orderDeadlineDayCount} ({getDeadlineDate(item.content)} 자정 마감)
                    </span>
                );
            } else if (orderDeadlineDayCount === 1) {
                return (
                    <span className="product-deadline-span today">
                        <WarningTwoTone twoToneColor="#67abce" /> 오늘 자정 마감 ({getDeadlineDate(item.content)})
                    </span>
                );
            } else {
                return (<span className="product-deadline-span closed">예약 마감</span>);
            }
        }
    }

    return (
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
            {
                productTags && (
                    <div className="product-tag">
                        <ProductTag tags={productTags} />
                    </div>
                )
            }
            <Card.Meta
                title={item.title}
                className="product-meta"
            />
            {
                getDeadlineDDay()
            }
            <p className="product-price">
                {
                    (item.discount && item.discount > 0) ?
                        (<><span className="product-origin-price">{item.price}원</span> <span className="product-final-price">{finalPrice}원</span></>)
                        :
                        (<span className="product-final-price">{item.price}원</span>)
                }
            </p>
        </Card>
    );
}

export default ProductCard;