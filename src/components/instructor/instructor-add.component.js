import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";

// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export class CreateInstructor extends Component {

    
    constructor(props){
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
            fullName : '',
            nic : '',
            dob : new Date(),
            contactNo : '',
            email : '',
            address : '',
            position : '',
            password : '',
            cpassword : ''
           
            
        }
    }

    onChangefullName(e){
        this.setState({
            fullName : e.target.value
        });
    }

    onChangenic(e){
        this.setState({
            nic : e.target.value
        });
    }

    onChangedob(date){
        this.setState({
            dob : date
        });
    }

    onChangecontactNo(e){
        this.setState({
            contactNo : e.target.value
        });
    }

    onChangeemail(e){
        this.setState({
            email : e.target.value
        });
    }

    onChangeaddress(e){
        this.setState({
            address : e.target.value
        });
    }

    onChangeposition(e){
        this.setState({
            position : e.target.value
        });
    }

    onChangepassword(e){
        this.setState({
            password : e.target.value
        });
    }

    onChangecpassword(e){
        this.setState({
            cpassword : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const instructor = {
            fullName : this.state.fullName,
            nic : this.state.nic,
            dob : this.state.dob,
            contactNo : this.state.contactNo,
            email : this.state.email,
            address : this.state.address,
            position : this.state.position,
            password : this.state.password,
            cpassword : this.state.cpassword
        }

        console.log(instructor);

        if (this.state.password != this.state.cpassword){
            this.setState({passwordError : "Your Passwords Don't match"})
            
        }else if (this.state.nic.length <10 || this.state.nic.length >12){
            this.setState({nicError : "Please Enter a valid NIC Number"})
        }else if(this.state.contactNo.length != 10){
            this.setState({contactError : "Please Enter a valid Phone Number"})
        }
        
        else{

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
        }).catch(err=>console.log(err))

        }
        
        
        

        // window.location = '/';
        // }
        
        
    }

    clearData = () => {
        this.setState({
           
            fullName: '',
            nic : '',
            dob : '',
            contactNo: '',
            email: '',
            address: '',
            position: '',
            password : '',
            cpassword:''
            
        })
    }

    

    render() {
        return (
        <div>
            
            <h3 >Add Instructor</h3>
        
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Full Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.fullName}
                        onChange = {this.onChangefullName}
                        />
                       
                    </div>

                    <div className = "form-group">
                        <label>NIC : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.nic}
                        onChange = {this.onChangenic}
                        />
                        <p className = "validateMsg">{this.state.nicError}</p>
                       
                    </div>

                    <div className = "form-group">
                        <label>Date Of Birth : </label>
                        {/* <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.dob}
                        onChange = {this.onChangedob}
                        /> */}
                        <div>
                            <DatePicker
                            selected = {this.state.dob}
                            onChange = {this.onChangedob}
                            />
                        </div>
                       
                    </div>

                    <div className = "form-group">
                        <label>Contact Number : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.contactNo}
                        onChange = {this.onChangecontactNo}
                        />
                        <p className = "validateMsg">{this.state.contactError}</p>
                    </div>

                    <div className = "form-group">
                        <label>Email : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.email}
                        onChange = {this.onChangeemail}
                        />
                      
                    </div>

                    <div className = "form-group">
                        <label>Address : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.address}
                        onChange = {this.onChangeaddress}
                        />
                        
                    </div>

                    <div className = "form-group">
                        <label>Position : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.position}
                        onChange = {this.onChangeposition}
                        />
                        
                    </div>

                    <div className = "form-group">
                        <label>Password : </label>
                        <input type = "password"
                        required
                        className = "form-control"
                        value = {this.state.password}
                        onChange = {this.onChangepassword}
                        />
                      
                    </div>

                    <div className = "form-group">
                        <label>Confirm Passowrd : </label>
                        <input type = "password"
                        required
                        className = "form-control"
                        value = {this.state.cpassword}
                        onChange = {this.onChangecpassword}
                        />
                        <p className = "validateMsg">{this.state.passwordError}</p>
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Add Instructor"  />
                    </div>

                  

                </form>


</div>

            

                

                
        )
    }
}