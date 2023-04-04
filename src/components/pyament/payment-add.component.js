import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";

// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export class CreatePayment extends Component {

    
    constructor(props){
        super(props);

        this.onChangebank = this.onChangebank.bind(this);
        this.onChangeaccNumber = this.onChangeaccNumber.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangebranch = this.onChangebranch.bind(this);
       

        this.onSubmit = this.onSubmit.bind(this);
       

        this.state = {
            bank : '',
            accNumber : '',
            name : '',
            branch : ''
           
            
        }
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

    onSubmit(e){
        e.preventDefault();

        const payments = {
            bank : this.state.bank,
            accNumber : this.state.accNumber,
            name : this.state.name,
            branch : this.state.branch,
            
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
            accNumber : '',
            name : '',
            branch: ''
            
        })
    }

    

    render() {
        return (
        <div>
            
            <h3 >Add Payment Details</h3>
        
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Bank Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.bank}
                        onChange = {this.onChangebank}
                        />
                       
                    </div>

                    <div className = "form-group">
                        <label>Account Number : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.accNumber}
                        onChange = {this.onChangeaccNumber}
                        />
                    
                       
                    </div>

                    <div className = "form-group">
                        <label>Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.name}
                        onChange = {this.onChangename}
                        />
                      
                    </div>

                    <div className = "form-group">
                        <label>Branch : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.branch}
                        onChange = {this.onChangebranch}
                        />
                      
                    </div>

                    

                    <div className = "form-group">
                        <input type = "submit" value = "Add Payment"  />
                    </div>

                  

                </form>


</div>

            

                

                
        )
    }
}