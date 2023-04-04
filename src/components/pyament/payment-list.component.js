import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import * as Swal from "sweetalert2";
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";
import PaymentEdit from "./payment-edit.component";

const Payment = props => (
    <tr>
       
        <td>{props.payment.bank}</td>
        <td>{props.payment.accNumber}</td>
        <td>{props.payment.name}</td>
        <td>{props.payment.branch}</td>
       
        <td>
            {/* <button ><Link to = {"/editInstructor/"+props.instructor._id } >Edit</Link></button> */}
            <button  onClick ={() => {props.gotoUpdatePayment(props.payment._id)}  }>
                {/* <Link to = {"/editInstructor/"+props.instructor._id} classId={props.instructor._id}> */}
                {/* <InstructorEdit classId={props.instructor._id} key={props.instructor._id} /> */}
                    Update
                    {/* </Link> */}
                    </button>
            <button  onClick ={() => {props.deletePayment(props.payment._id)}}>Delete</button>
            
                                                        
                                                  
        </td>
    </tr>
)

export class PaymentList extends Component {

    constructor(props){
        super(props);

        this.deletePayment = this.deletePayment.bind(this);
        this.gotoUpdatePayment = this.gotoUpdatePayment.bind(this);

        this.state = {payment : [],
            searchPayment : "",
        show:false};
    }


    componentDidMount() {
        this.refreshTable();
        }

        refreshTable() {
            axios.get('http://localhost:5000/payment/')
            .then(response => {
                this.setState({ payment : response.data })
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
                console.log("LIst id is :" +id);
            }

             //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }

        // deletePayment(id){
        //     axios.delete('http://localhost:5000/payment/' +id)
        //     .then(res => console.log(res.data));
        //     this.setState({
        //         payment : this.state.payment.filter(el => el._id !== id)
        //     })
        // }

         deletePayment(id){
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



        paymentList(){
            return this.state.payment.map(currentpayment => {
                return <Payment payment = {currentpayment} deletePayment = {this.deletePayment} gotoUpdatePayment = {this.gotoUpdatePayment} key = {currentpayment._id}/>;
            })
        }

    
        searchPaymentList(){

            return this.state.payment.map((currentpayment) => {
                if (
                    this.state.searchPayment ==
                    currentpayment.bank
                ){
                    return (
                        <tr>
                       
                        <td style={{ width: "10%" }}>{currentpayment.bank}</td>
                        <td style={{ width: "10%" }}>{currentpayment.accNumber}</td>
                        <td style={{ width: "10%" }}>{currentpayment.name}</td>
                        <td style={{ width: "10%" }}>{currentpayment.branch}</td>
                     
                        
                        
                        <td style={{ width: "20%" }}>
                            {
                            <button  onClick ={() => {this.gotoUpdatePayment(currentpayment._id)}  }>
                                Edit
                              
                            </button>
                            }
                            {"  "}
                            {
                            <button
                                
                                onClick={() => {
                                  //Delete the selected record
                                // axios
                                //     .delete(
                                //     "http://localhost:5000/payment/" + currentpayment._id
                                //     )
                                //     .then(() => {
                                //     alert("Delete Success");
                                //       //Get data again after delete
                                //     axios
                                //         .get("http://localhost:5000/payment")
                                //         .then((res) => {
                                //         console.log(res.data);
                                //         this.setState({
                                //             payment: res.data,
                                //         });
                                //         })
                                //         .catch((err) => console.log(err));
                                //     })
                                //     .catch((err) => {
                                //     alert(err);
                                //     });

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
                        </td>
                        </tr>
                    );
                }
            });
        }


        exportPayment = () => {
            console.log( "Export PDF" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "landscape"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Payment List Report ";
            const headers = [["Bank Name","Account Number","Account Name","Branch"]];
    
            const pay = this.state.payment.map(
                Payment=>[
                    Payment.bank,
                    Payment.accNumber,
                    Payment.name,
                    Payment.branch,
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:pay
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "Payment-list.pdf" )
        }


    render() {
        return (
            <div >
            <div>
            
            
                <table >
                    <tr>
                        <th><h3>Payment Details</h3></th>
                        <td><button ><Link to = {"/creatPayment" }>Add Payment Details</Link></button>
                        <button onClick={() => this.exportPayment()}>Download Report Here
                       
                        </button></td>
                    </tr>

                    <div >
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Bank Name"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchPayment: e.target.value
                        });
                    }}
                    />
            </div>
                </table>
            
            
                
                <table class="table table-bordered">
                <thead >
                    <tr>
                        
                        <th className = "tbhead">Bank</th>
                        <th className = "tbhead">Account Number</th>
                        <th className = "tbhead">Name</th>
                        <th className = "tbhead">Branch</th>
                       
                        
                        
                        
                    </tr>
                </thead>
                <tbody>
                    { this.state.searchPayment == "" ? this.paymentList() : this.searchPaymentList() }
                </tbody>
            </table>
           
           
        </div>

          {/*--------------------------Model Box to Edit Conference--------------------------*/}

        <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Payment Details Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <PaymentEdit payId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                        
                    </Modal.Body>
                </Modal>

                  {/*----------------------------------------------------*/}

        </div>
        )
    }
}

