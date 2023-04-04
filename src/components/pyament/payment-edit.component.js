import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import * as Swal from "sweetalert2";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";



export default class EditPayment extends Component {

    
    constructor(props){
        super(props);

        this.state = { 
            id : props.payId,
            bank : '',
            accNumber : '',
            name : '',
            branch : ''
           
            
        }

        this.onChangebank = this.onChangebank.bind(this);
        this.onChangeaccNumber = this.onChangeaccNumber.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangebranch = this.onChangebranch.bind(this);
       

        this.onSubmit = this.onSubmit.bind(this);

        
    }

    componentDidMount() {
        console.log("ID is : "+this.state.id)
        axios.get(`http://localhost:5000/payment/` +this.state.id)
        .then(response => {
            this.setState({
            // id : this.props.id,
            bank : response.data.bank,
            accNumber : response.data.accNumber,
            name : response.data.name,
            branch : response.data.branch
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        }

        handleChange = (e) => {
            e.preventDefault();
    
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        onChangebank(e){
            this.setState({
                bank : e.target.value
            });
        }
    
        onChangeaccNumber(e){
            this.setState({
                accNumber : e.target.value
            });
        }
    
        onChangename(e){
            this.setState({
                name : e.target.value
            });
        }
    
        onChangebranch(e){
            this.setState({
                branch : e.target.value
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
                this.setState({ payment : response.data })
            })
            .catch((error) => {
                console.log(error);
            })
            }

    onSubmit(e){
        e.preventDefault();

        const payment = {
            bank : this.state.bank,
            accNumber : this.state.accNumber,
            name : this.state.name,
            branch : this.state.branch,
            
        }

        console.log(payment);
        

        axios.put('http://localhost:5000/payment/' +this.state.id, payment)
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

        const {bank, accNumber, name,branch} = this.state
        return (
            <div>
                
                <div className = "formdiv">
              
            <h3 className = "billheading">Edit Payment</h3>

            
            <form onSubmit = {this.onSubmit}>

            
                    <div className = "form-group">
                        <label>Bank : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {bank}
                        onChange = {this.onChangebank}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Account Number : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {accNumber}
                        onChange = {this.onChangeaccNumber}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {name}
                        onChange = {this.onChangename}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Branch : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {branch}
                        onChange = {this.onChangebranch}
                        />
                    </div>
                    
                    


                    <div className = "form-group">
                        <input type = "submit" value = "Edit Payment" />
                    </div>
                </form>

               
            </div>
           
                </div>
        )
    }
}