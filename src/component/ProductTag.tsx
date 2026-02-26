import React from 'react';
import { Flex, Tag } from 'antd';
import {TagItem} from "../common/commonInterface";

const ProductTag = ({ tags } : { tags: TagItem[] }) => {

    return (
        <Flex gap="small" align="center" wrap>
            {tags.map((tag: TagItem, index) => (
                <Tag key={index} color={tag.color ?? 'default'} variant="filled">
                    {tag.name}
                </Tag>
            ))}
        </Flex>
    );
}

export default ProductTag;