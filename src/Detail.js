import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
        }
    }


    componentDidMount() {
        this.getDetailProduct();
    }

    getDetailProduct = () => {
        let data = {
            id: this.props.match.params.product_id
        };
        this.detailProduct(data).then(response => {
            this.setState({
                data: response.data,

            })
        }).catch(error => {
            console.log(error)
            // handleException(error).next();
        })
    }

    detailProduct = (data) => {
        return axios({
            method: 'get',
            url: "http://5b3f13cac3c3fb0014742871.mockapi.io/detail-product/" + data.id,
            headers: {
                'Accept': 'application/json',
                // "Authorization": "Bearer " + data.access_token
            }
        })
    }

    addCart = (data) => {
        return axios({
            method: 'post',
            url: "http://5b3f13cac3c3fb0014742871.mockapi.io/add-cart",
            headers: {
                'Accept': 'application/json',
                // "Authorization": "Bearer " + data.access_token
            },
            data: {
                ...data.inputs
            }
        })
    }

    render() {
        let data = this.state.data;
        return (
            <div className='container-hv'>
                <div className='product-dv'>
                    <div>
                        <h2>Chi tiết sản phẩm</h2>
                    </div>
                    <div className='home-product-list'>
                        <div type="flex" justify="center" align="top">
                            <table id="ttable-product">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>Tên Sản Phẩm : {data ? data.name : ''}</p>
                                            <p>Mô tả : {data ? data.description : ''}</p>
                                            <p>Giá tiền : {data ? data.price : ''}</p>
                                            <Link to="/cart" onClick={this.addCartProduct}>Đặt hàng</Link>
                                        </td>
                                    </tr>
                                    {/* {this.renderListProduct()} */}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    addCartProduct = () => {
        let product = {
            "id": "2",
            "name": "name 1",
            "description": "description 1",
            "number": 63
        }

        let data = {
            inputs: product
        }

        this.addCart(data).then(res => {
            this.success()
        }).catch(e => {
            console.log(e)
        })
    }

    success = () => {
        alert("Thêm sản phẩm vào giỏ hàng thành công !");
    };
}

export default Detail;