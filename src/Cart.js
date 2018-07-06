import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.getListCart();
    }

    listCart = (data) => {
        return axios({
            method: 'get',
            url: "http://5b3f13cac3c3fb0014742871.mockapi.io/list-cart",
            headers: {
                'Accept': 'application/json',
                // "Authorization": "Bearer " + data.access_token
            }
        })
    }

    getListCart = () => {
        let data = {};
        this.listCart(data).then(response => {
            this.setState({
                data: response.data,
                isLoading: false
            })
        }).catch(error => {
            console.log(error)
            // handleException(error).next();
        })
    }

    render() {
        let data = [];
        return (
            <div className='container-hv'>
                <div className='product-dv'>
                    <div>
                        <h2>Danh sách giỏ hàng</h2>
                    </div>

                    <div className='home-product-list'>
                        <div type="flex" justify="center" align="top">
                            <table id="table-product">
                                <tbody>
                                    {this.renderListCart()}
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div>
                            <button onClick={this.onClick} type="primary">Tiến hành đặt hàng</button >
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    renderListCart = () => {
        let data = this.state.data;
        let row = []
        for (let i = 0; i < data.length; i++) {
            row.push(<tr key={i}>
                <td>
                    <p>Tên sản phẩm: {data[i].name}</p>
                    <p>Mô tả sản phẩm: {data[i].description} </p>
                    <p>Số lượng: {data[i].number}</p>
                </td>
            </tr>)
        }

        return row;
    }

    onClick = () => {
        this.success();
    }

    success = () => {
        alert("Đặt hàng thành công !");
    };
}


export default Cart;