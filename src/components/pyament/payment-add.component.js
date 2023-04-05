import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"

// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export class CreatePayment extends Component {
    constructor(props) {
        super(props);
        this.onChangebank = this.onChangebank.bind(this);
        this.onChangeaccNumber = this.onChangeaccNumber.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangebranch = this.onChangebranch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            bank: '',
            accNumber: '',
            name: '',
            branch: ''
        }
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

    onSubmit(e) {
        e.preventDefault();

        const payments = {
            bank: this.state.bank,
            accNumber: this.state.accNumber,
            name: this.state.name,
            branch: this.state.branch,
        }

        console.log(payments);

        axios.post('http://localhost:5000/payment/', payments)
            // .then(res => console.log("success")).catch(err=>console.log(err));
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Payment has been added!!',
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
        // }
    }

    clearData = () => {
        this.setState({
            bank: '',
            accNumber: '',
            name: '',
            branch: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-10">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">

                                    <form className='px-12 py-3 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="mt-3">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Add Payment Details
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Bank Name :
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder='Bank Name'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.bank}
                                                        onChange={this.onChangebank}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Account Number :
                                                    </label>
                                                    <input type="number"
                                                        required
                                                        placeholder='Bank account number'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.accNumber}
                                                        onChange={this.onChangeaccNumber}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div className="form-group">
                                                    <label for="large-input" className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Name :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='Acc holder name'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.name}
                                                        onChange={this.onChangename}
                                                    />
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Branch :
                                                </label>
                                                <input type="text"
                                                    required
                                                    placeholder='Branch'
                                                    class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.branch}
                                                    onChange={this.onChangebranch}
                                                />
                                            </div>

                                            <div className="m-5 text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Create Payment" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}