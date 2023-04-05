import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup } from "react-bootstrap";
// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export class CreateInstructor extends Component {

    constructor(props) {
        super(props);
        this.onChangefullName = this.onChangefullName.bind(this);
        this.onChangenic = this.onChangenic.bind(this);
        this.onChangedob = this.onChangedob.bind(this);
        this.onChangecontactNo = this.onChangecontactNo.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangeposition = this.onChangeposition.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangecpassword = this.onChangecpassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullName: '',
            nic: '',
            dob: new Date(),
            contactNo: '',
            email: '',
            address: '',
            position: '',
            password: '',
            cpassword: ''
        }
    }

    onChangefullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangenic(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onChangedob(date) {
        this.setState({
            dob: date
        });
    }

    onChangecontactNo(e) {
        this.setState({
            contactNo: e.target.value
        });
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeposition(e) {
        this.setState({
            position: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangecpassword(e) {
        this.setState({
            cpassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const instructor = {
            fullName: this.state.fullName,
            nic: this.state.nic,
            dob: this.state.dob,
            contactNo: this.state.contactNo,
            email: this.state.email,
            address: this.state.address,
            position: this.state.position,
            password: this.state.password,
            cpassword: this.state.cpassword
        }

        console.log(instructor);

        if (this.state.password != this.state.cpassword) {
            this.setState({ passwordError: "Your Passwords Don't match" })

        } else if (this.state.nic.length < 10 || this.state.nic.length > 12) {
            this.setState({ nicError: "Please Enter a valid NIC Number" })
        } else if (this.state.contactNo.length != 10) {
            this.setState({ contactError: "Please Enter a valid Phone Number" })
        }

        else {

            axios.post('http://localhost:5000/instructor/', instructor)
                // .then(res => console.log("success")).catch(err=>console.log(err));

                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Instructor has been added!!',
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
                }).catch(err => console.log(err))

        }
        // window.location = '/';
        // }
    }

    clearData = () => {
        this.setState({
            fullName: '',
            nic: '',
            dob: '',
            contactNo: '',
            email: '',
            address: '',
            position: '',
            password: '',
            cpassword: ''
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
                                                Add Instructor
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Full Name :
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder='Johnny'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.fullName}
                                                        onChange={this.onChangefullName}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        NIC :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='National ID number'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.nic}
                                                        onChange={this.onChangenic}
                                                    />
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white' >
                                                        Date Of Birth :
                                                    </label>
                                                    <div>
                                                        <DatePicker
                                                            className=''
                                                            selected={this.state.dob}
                                                            onChange={this.onChangedob}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Contact Number :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        placeholder='0771556154'
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.contactNo}
                                                        onChange={this.onChangecontactNo}
                                                    />
                                                    <p className="validateMsg">{this.state.contactError}</p>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Email :
                                                </label>
                                                <input type="text"
                                                    required
                                                    placeholder='example@example.com'
                                                    class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.email}
                                                    onChange={this.onChangeemail}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label for="large-input" className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Address :
                                                </label>
                                                <input type="text"
                                                    required
                                                    placeholder='43, Wilson St.Joliet, IL 60435'
                                                    class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.address}
                                                    onChange={this.onChangeaddress}
                                                />
                                            </div>

                                            <div className="form-group ">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Position :
                                                </label>
                                                <input type="text"
                                                    required
                                                    class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.position}
                                                    onChange={this.onChangeposition}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Password :
                                                </label>
                                                <input type="password"
                                                    required
                                                    class=" mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.password}
                                                    onChange={this.onChangepassword}
                                                />

                                            </div>

                                            <div className="form-group">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    Confirm Passowrd :
                                                </label>
                                                <input type="password"
                                                    required
                                                    class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.cpassword}
                                                    onChange={this.onChangecpassword}
                                                />
                                                <p className="validateMsg">{this.state.passwordError}</p>
                                            </div><p />

                                            <div className="m-5 text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Instructor" />
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