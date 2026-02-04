import "./Main.css";
import { Col, Row, Typography } from 'antd';
import {
    InfoCircleOutlined
} from '@ant-design/icons'

const { Text, Link } = Typography;

function MainFooter() {

    return (
        <footer className='main-footer-div'>
            <div>
                <Row className='main-footer-pc-row'>
                    <Col className='main-footer-col-pc' xs={0} sm={0} md={18} lg={17} xl={17}>
                        <div className='main-footer-col-pc-info'>
                            <div className='info-div'>
                                <Text className='info-name'>Company </Text><Text className='info-value'>버블샵</Text>
                                <Text className='info-name'>Owner </Text><Text className='info-value'>이수형</Text>
                                <Text className='info-name'>Address </Text><Text className='info-value'>경기도 용인시 수지구 신봉1로 27 505동 704호</Text>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>Business License </Text><Text className='info-business-license'>203-4092-10293</Text>
                                <InfoCircleOutlined style={{marginLeft: '3px', marginRight: '10px'}}/>
                                <Text className='info-name'>Online Business License </Text><Text className='info-value'>203-4092-10293</Text>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>E-Mail </Text><Text className='info-value'>bubbleshop@naver.com</Text>
                                <Text className='info-name'>X </Text><Text className='info-value'>@bubble._.shop</Text>
                            </div>
                            <div className='info-copyright-div'>
                                <Text className='info-copyright'>Copy right © bubbleshop All Rights Reserved. Icons by <Link href='icons8.com' style={{textDecorationLine: "underline"}}>Icons8</Link></Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={6} lg={5} xl={5}>
                        <div className='main-footer-col-pc-menu'>
                            <div><Link className='menu-value-bold'>HOME</Link></div>
                            <div><Link className='menu-value'>회사소개</Link></div>
                            <div><Link className='menu-value'>이용안내</Link></div>
                            <div><Link className='menu-value-bold'>개인정보취급방침</Link></div>
                            <div><Link className='menu-value'>이용약관</Link></div>
                        </div>
                    </Col>
                </Row>
                <Row className='main-footer-mb-row'>
                    <Col className='main-footer-col-mb-menu' xs={24} sm={24} md={0} lg={0} xl={0}>
                        <div className='menu-link-div'>
                            <div><Link className='menu-value-bold'>HOME</Link></div>
                            <div><Link className='menu-value'>회사소개</Link></div>
                            <div><Link className='menu-value'>이용안내</Link></div>
                            <div><Link className='menu-value-bold'>개인정보취급방침</Link></div>
                            <div><Link className='menu-value'>이용약관</Link></div>
                        </div>
                    </Col>
                    <Col className='main-footer-col-mb-info' xs={24} sm={24} md={0} lg={0} xl={0}>
                        <div className='main-footer-col-mb-info-div'>
                            <div className='info-div'>
                                <Text className='info-name'>Company </Text><Text className='info-value'>버블샵</Text>
                                <Text className='info-name'>Owner </Text><Text className='info-value'>이수형</Text>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>Address </Text><Text className='info-value'>경기도 용인시 수지구 신봉1로 27 505동 704호</Text>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>Business License </Text><Text className='info-business-license'>203-4092-10293</Text>
                                <InfoCircleOutlined style={{marginLeft: '5px', marginRight: '20px'}}/>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>Online Business License </Text><Text className='info-value'>203-4092-10293</Text>
                            </div>
                            <div className='info-div'>
                                <Text className='info-name'>E-Mail </Text><Text className='info-value'>bubbleshop@naver.com</Text>
                                <Text className='info-name'>X </Text><Text className='info-value'>@bubble._.shop</Text>
                            </div>
                            <div className='info-copyright-div'>
                                <Text className='info-copyright'>Copy right © bubbleshop All Rights Reserved. Icons by <Link href='icons8.com' style={{textDecorationLine: "underline"}}>Icons8</Link></Text>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
}

export default MainFooter;