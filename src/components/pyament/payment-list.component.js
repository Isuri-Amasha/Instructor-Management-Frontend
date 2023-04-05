import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import PaymentEdit from "./payment-edit.component";

const Payment = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
        <td className='px-6 py-4 text-base font-medium text-blue-950'>{props.payment.bank}</td>
        <td className='px-6 py-4'>{props.payment.accNumber}</td>
        <td className='px-6 py-4'>{props.payment.name}</td>
        <td className='px-6 py-4'>{props.payment.branch}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdatePayment(props.payment._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                            </svg>
                        </div>
                        <div class="">
                            Update
                        </div>
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deletePayment(props.payment._id) }}>
                        <div class="">
                            <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div class="">
                            Delete
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class PaymentList extends Component {

    constructor(props) {
        super(props);

        this.deletePayment = this.deletePayment.bind(this);
        this.gotoUpdatePayment = this.gotoUpdatePayment.bind(this);

        this.state = {
            payment: [],
            searchPayment: "",
            show: false
        };
    }


    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/payment/')
            .then(response => {
                this.setState({ payment: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoUpdatePayment = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshTable();
    }

    // deletePayment(id){
    //     axios.delete('http://localhost:5000/payment/' +id)
    //     .then(res => console.log(res.data));
    //     this.setState({
    //         payment : this.state.payment.filter(el => el._id !== id)
    //     })
    // }

    deletePayment(id) {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this record!",
            background: '#fff',
            confirmButtonColor: '#454545',
            iconColor: '#ffc200',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    axios.delete('http://localhost:5000/payment/' + id).then(response => {
                        console.log(response.data)
                        this.refreshTable();
                    })

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: "User has been deleted!!",
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })
                }
            });
    }

    paymentList() {
        return this.state.payment.map(currentpayment => {
            return <Payment payment={currentpayment} deletePayment={this.deletePayment} gotoUpdatePayment={this.gotoUpdatePayment} key={currentpayment._id} />;
        })
    }

    searchPaymentList() {
        return this.state.payment.map((currentpayment) => {
            if (
                this.state.searchPayment ==
                currentpayment.bank
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4 text-base font-medium text-blue-950'>{currentpayment.bank}</td>
                        <td className='px-6 py-4'>{currentpayment.accNumber}</td>
                        <td className='px-6 py-4'>{currentpayment.name}</td>
                        <td className='px-6 py-4'>{currentpayment.branch}</td>
                        <td className='px-6 py-4'>
                            <div class="flex justify-center">

                                <div class="">
                                    {
                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200'
                                            onClick={() => { this.gotoUpdatePayment(currentpayment._id) }}>
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Update
                                            </div>
                                        </button>
                                    }
                                </div>
                                {"  "}
                                <div class="">
                                    {
                                        <button
                                            className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200'
                                            onClick={() => {
                                                Swal.fire({
                                                    icon: 'warning',
                                                    title: 'Are you sure?',
                                                    text: "Once deleted, you will not be able to recover this record!",
                                                    background: '#fff',
                                                    confirmButtonColor: '#454545',
                                                    iconColor: '#ffc200',
                                                    showCancelButton: true,
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Delete'
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete.isConfirmed) {
                                                            axios.delete('http://localhost:5000/payment/' + currentpayment._id).then(response => {
                                                                console.log(response.data)
                                                                this.refreshTable();
                                                            })
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Successful',
                                                                text: "User has been deleted!!",
                                                                background: '#fff',
                                                                confirmButtonColor: '#333533',
                                                                iconColor: '#60e004'
                                                            })
                                                        }
                                                    });
                                            }}
                                        >
                                            Delete
                                        </button>
                                    }
                                </div>
                            </div>
                        </td>
                    </tr>
                );
            }
        });
    }


    exportPayment = () => {
        console.log("Export PDF")
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Payment List Report ";
        const headers = [["Bank Name", "Account Number", "Account Name", "Branch"]];
        const pay = this.state.payment.map(
            Payment => [
                Payment.bank,
                Payment.accNumber,
                Payment.name,
                Payment.branch,
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: pay
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Payment-list.pdf")
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className='mt-2 mb-4'>
                                    <tr>
                                        <th className='drop-shadow-md'>
                                            <p className='text-3xl uppercase'>Payment Details</p>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/creatPayment"}>
                                                        <div class="flex">
                                                            <div class="">
                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                                                </svg>
                                                            </div>
                                                            <div class="">
                                                                Add Payment Details
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </button>
                                                <button class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportPayment()}>
                                                    <div class="">
                                                        <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                        </svg>
                                                    </div>
                                                    <div class="">
                                                        Download Report Here
                                                    </div>
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="border-2 border-blue-700 font-semibold form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Instructor NIC"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchPayment: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead">Bank</th>
                                            <th className="p-2 tbhead">Account Number</th>
                                            <th className="p-2 tbhead">Name</th>
                                            <th className="p-2 tbhead">Branch</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.searchPayment == "" ? this.paymentList() : this.searchPaymentList()}
                                    </tbody>
                                </table>
                            </div>


                        </div>

                        {/*--------------------------Model Box to Edit Conference--------------------------*/}

                        <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"xl"}>
                            <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                <Modal.Title className='items-center'>
                                    <p className='font-semibold text-black uppercase '>
                                        Payment Details Update
                                    </p>
                                </Modal.Title>
                            </Modal.Header >
                            <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                <PaymentEdit payId={this.state.id} key={this.state.id} close={this.closeModalBox} />

                            </Modal.Body>
                        </Modal>

                        {/*----------------------------------------------------*/}

                    </div>
                </div>
            </div>
        )
    }
}

