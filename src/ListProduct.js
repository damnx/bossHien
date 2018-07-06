import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';



class ListProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [

            ],
            isLoading: false
        }
    }

    componentDidMount = () => {
        this.getListProdict();
    }

    getListProdict = () => {
        let data = {};
        this.listProduct(data).then(response => {
            this.setState({
                data: response.data,
                isLoading: false
            })
        }).catch(error => {
            console.log(error)
            // handleException(error).next();
        })
    }

    listProduct = (data) => {
        return axios({
            method: 'get',
            url: "http://5b3f13cac3c3fb0014742871.mockapi.io/list-product",
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
        return (
            <div className='container-hv'>
                <div className='product-dv'>
                    <div>
                        <h2>Danh sách sản phẩm</h2>
                    </div>

                    <div className='home-product-list'>
                        <div>
                            <table id="table-product">
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Mô tả sản phẩm</th>
                                    <th>Giá sản phẩm</th>
                                    <th></th>
                                </tr>
                                <tbody>
                                    {this.renderListProduct()}

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

    renderListProduct = () => {
        let data = this.state.data;
        let row = []
        for (let i = 0; i < data.length; i++) {
            row.push(<tr key={i}>
                <td>
                    <p>{data[i].name}</p>
                </td>
                <td>
                    <p>{data[i].description} </p>
                </td>
                <td>
                    <p>{data[i].price}  ₫</p>
                </td>
                <td>
                    <Link onClick={this.viewDetail} to={'/product/' + data[i].id + '/detail'}>Xem</Link>
                    <span> / </span>
                    <Link to="/cart" onClick={this.addCartProduct}>Đặt hàng</Link>
                </td>
            </tr >)
        }

        return row;
    }

    viewDetail = (id) => {
        let url = '/product/' + id + '/detail'
        // history.push(url)
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

export default ListProduct;