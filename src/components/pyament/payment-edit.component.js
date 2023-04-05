import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import * as Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"

export default class EditPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.payId,
            bank: '',
            accNumber: '',
            name: '',
            branch: ''
        }

        this.onChangebank = this.onChangebank.bind(this);
        this.onChangeaccNumber = this.onChangeaccNumber.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangebranch = this.onChangebranch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log("ID is : " + this.state.id)
        axios.get(`http://localhost:5000/payment/` + this.state.id)
            .then(response => {
                this.setState({
                    // id : this.props.id,
                    bank: response.data.bank,
                    accNumber: response.data.accNumber,
                    name: response.data.name,
                    branch: response.data.branch
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangebank(e) {
        this.setState({
            bank: e.target.value
        });
    }

    onChangeaccNumber(e) {
        this.setState({
            accNumber: e.target.value
        });
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangebranch(e) {
        this.setState({
            branch: e.target.value
        });
    }

    // handleChange = (event) => {
    //     event.preventDefault();

    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // }

    refreshTable() {
        axios.get('http://localhost:5000/payment/')
            .then(response => {
                this.setState({ payment: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const payment = {
            bank: this.state.bank,
            accNumber: this.state.accNumber,
            name: this.state.name,
            branch: this.state.branch,
        }

        console.log(payment);

        axios.put('http://localhost:5000/payment/' + this.state.id, payment)
            .then(res => {

                console.log(res);

                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Payment has been Updated!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })
        // window.location = '/';
    }

    render() {
        const { bank, accNumber, name, branch } = this.state
        return (
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start px-10">
                                    <div className="formdiv">
                                        <form className='' onSubmit={this.onSubmit}>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Bank :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={bank}
                                                        onChange={this.onChangebank}
                                                    /><p />
                                                </div>

                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Account Number :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={accNumber}
                                                        onChange={this.onChangeaccNumber}
                                                    />
                                                    <p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Name :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={name}
                                                        onChange={this.onChangename}
                                                    /><p />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Branch :
                                                </label>
                                                <textarea type="text"
                                                    required
                                                    className="form-control"
                                                    value={branch}
                                                    onChange={this.onChangebranch}
                                                /><p />
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Payment" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}