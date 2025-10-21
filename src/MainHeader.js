import "./Main.css";
import { Col, Row, Input, Typography } from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons'
import {useState} from "react";

const { Link } = Typography;

function MainHeader() {
    const [cartCount, setCartCount] = useState(0);

    const getCardCount = () => {
        if(cartCount > 0)
            return `${process.env.PUBLIC_URL}/main-full-cart.png`;
        else return `${process.env.PUBLIC_URL}/main-cart.png`;
    }

    const onClickSearchBtn = () => {
    }

    return (
        <div className='main-header-div'>
            <div className='main-header-row'>
                <Row>
                    <Col className='main-header-col' xs={6} sm={5} md={4} lg={4} xl={2} />
                    <Col className='main-header-col-pc' xs={0} sm={0} md={20} lg={20} xl={22}>
                        <div className='main-header-col-pc-search'>
                            <Input name={'search-keyword'}/>
                            <SearchOutlined onClick={onClickSearchBtn} style={{fontSize: '20px'}} />
                        </div>
                        <div className='main-header-col-pc-menu'>
                            <Link className='main-header-col-pc-menu-link' href="/join">회원가입</Link>
                            <Link className='main-header-col-pc-menu-link' href="/login">로그인</Link>
                            <Link className='main-header-col-pc-menu-link' href="/mypage">마이페이지</Link>
                            <Link className='main-header-col-pc-menu-link' href="https://ant.design">고객센터</Link>
                            <Link className='main-header-col-pc-menu-cart' href="https://ant.design">
                                <img src={getCardCount()} style={{width: '24px', height: '24px'}} alt={'cart'}/>
                            </Link>
                        </div>
                    </Col>
                    <Col className='main-header-col-mb' xs={18} sm={19} md={0} lg={0} xl={0} />
                </Row>
            </div>
        </div>
    );
}

export default MainHeader;