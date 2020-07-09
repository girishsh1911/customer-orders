import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import './OrderDetails.css';
import ErrorPage from '../ErrorPage/ErrorPage';

class OrderDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: [],
            filterDetails: [],
            pincode: [],
            date: null,
            item: null
        }
    }

    fileHandler(data, fileInfo) {
        this.setState({ details: data })
    }

    pincodeHandler = event => {
        this.setState({ pincode: event.target.value })
    }

    dateHandler = event => {
        this.setState({ date: event.target.value })
    }

    itemSearchHandler = event => {
        this.setState({ item: event.target.value })
    }

    dateButtonuttonHandler = () => {
        let allDetails = [...this.state.details]
        let dateOrders = allDetails.filter(order => {
            return order.orderdate == this.state.date && order.deliverypincode == this.state.pincode
        })
        this.setState({ filterDetails: dateOrders })
    }

    ordersButtonHandler = () => {
        let orderDetails = [...this.state.details]
        this.setState({ filterDetails: orderDetails })
    }

    itemButtonHandler = () => {
        let allDetails = [...this.state.details];
        let itemOrders = allDetails.filter(item => {
            return item.items.includes(this.state.item)
        })
        this.setState({ filterDetails: itemOrders })
    }

    itemHandler(item) {
        let result = item.split(';')
        result.pop();
        return (
            <div>
                {result.map((res, index) => {
                    let eachItem = res.split(':')
                    let num = 1
                    return (
                        <div key={index}>
                            {eachItem[0] + '-' + eachItem[1]}
                        </div>);
                })}
            </div>

        );
    }

    render() {
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header =>
                header
                    .toLowerCase()
                    .replace(/\W/g, '_')
        }
        return (
            <div>
                <CSVReader
                    onFileLoaded={this.fileHandler.bind(this)}
                    cssClass="csv-reader-input"
                    label="Please Select the csv file and click on View All Orders to view Customer Orders"
                    parserOptions={papaparseOptions}
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />
                <div className='block'>
                    <button onClick={this.ordersButtonHandler}>View All Orders</button>
                    Pin Code:
                    <input type='text' onChange={this.pincodeHandler} />
                    Date:
                    <input type='text' onChange={this.dateHandler} />
                    <button onClick={this.dateButtonuttonHandler}>SUBMIT</button>
                    Item:
                    <input type='text' onChange={this.itemSearchHandler} />
                    <button onClick={this.itemButtonHandler}>SEARCH</button>
                </div>
                {this.state.details ? this.handler() : null}
            </div>
        );
    }

    handler() {
        return (
            <div className='container'>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Cust Id</th>
                            <th>Pin Code</th>
                            <th>Order Date</th>
                            <th>Items</th>
                        </tr>
                    </thead>
                    {this.state.filterDetails.length > 0 ? this.state.filterDetails.map((detail, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{detail.orderid}</td>
                                    <td>{detail.customerid}</td>
                                    <td>{detail.deliverypincode}</td>
                                    <td>{detail.orderdate}</td>
                                    <td>
                                        {this.itemHandler(detail.items)}
                                    </td>
                                </tr>
                            </tbody>
                        );
                    }) : <ErrorPage />}
                </table>
            </div>
        );
    }
}

export default OrderDetails;