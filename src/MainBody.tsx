import "./Main.css";
import React, {useEffect, useState} from 'react';
import CarouselComponent from "./component/CarouselComponent";
import {CAROUSEL_COMPONENT_TYPE, MAIN_PRODUCT_TYPE, PRODUCT_TAG_ITEM_COLOR} from "./common/commonConst";
import {CarouselItem, GetMainProduct, TagItem} from "./common/commonInterface";
import api from "./common/commonApi";

const MainBody = () => {
    const [ newProducts, setNewProducts ] = useState<CarouselItem[] | undefined>(undefined);
    const [ orderCloseProducts, setOrderCloseProducts ] = useState<CarouselItem[] | undefined>(undefined);

    const divideItemCount = 4;
    const minItemCount = 2;

    useEffect(() => {
        // Product API Call
        const getMainProductList = async (mainType: string) => {
            return api.get(`/product-proxy/product/v1/products?mainType=${mainType}`)
                .then(response => {
                    const result: GetMainProduct[] = response.data.list;
                    return makeProductListToCarouselItem(result);
                })
                .catch(error => {
                    console.log('메인 상품 조회 에러, ' + error);
                });
        }

        const fetchProducts = async () => {
            const [newPrd, reserveClosePrd] =
                await Promise.all([getMainProductList(MAIN_PRODUCT_TYPE.NEW),
                    getMainProductList(MAIN_PRODUCT_TYPE.RESERVE_CLOSE)]);

            if (newPrd) setNewProducts(newPrd);
            if (reserveClosePrd) setOrderCloseProducts(reserveClosePrd);
        }

        void fetchProducts();
    }, []);

    const makeProductListToCarouselItem = (result: GetMainProduct[]) => {
        return result.map((item) => {
            return {
                id: item.productCode,
                title: item.productName,
                content: item.orderDeadlineDate,
                price: item.price,
                discount: item.discountRate,
                image: item.image.fullUrl,
                features: item.features && item.features.map((feature) => {
                    const tagItem = PRODUCT_TAG_ITEM_COLOR.find((tag) => tag.id === feature.code);
                    return {
                        id: feature.code,
                        name: feature.desc,
                        color: tagItem?.color
                    } as TagItem;
                })
            } as CarouselItem;
        });
    }

    return (
        <div className="main-body-div">
            {
                newProducts && newProducts.length > 0 && <CarouselComponent divideItemCount={divideItemCount} minItemCount={minItemCount} items={newProducts} title={"신상품"}
                                   carouselInnerType={CAROUSEL_COMPONENT_TYPE.PRODUCT} carouselAutoPlay={false} carouselAutoPlaySpeed={6000}/>
            }
            {
                orderCloseProducts && orderCloseProducts.length > 0 && <CarouselComponent divideItemCount={divideItemCount} minItemCount={minItemCount} items={orderCloseProducts} title={"예약 마감 임박"}
                                                  carouselInnerType={CAROUSEL_COMPONENT_TYPE.PRODUCT} carouselAutoPlay carouselAutoPlaySpeed={6000}/>
            }
        </div>
    );
};

export default MainBody;