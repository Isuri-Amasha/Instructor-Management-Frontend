import React, {Component} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import * as Swal from "sweetalert2";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";



export default class EditInstructor extends Component {

    
    constructor(props){
        super(props);

        this.state = {
            id: props.classId,
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

        this.onChangeid = this.onChangeid.bind(this);
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

        
    }

    componentDidMount() {
        console.log("ID is : "+this.state.id)
        axios.get(`http://localhost:5000/instructor/` +this.state.id)
        .then(response => {
            this.setState({
            // id : this.props.id,
            fullName : response.data.fullName,
            nic : response.data.nic,
            dob : new Date(response.data.dob),
            contactNo : response.data.contactNo,
            email : response.data.email,
            address : response.data.address,
            position : response.data.position,
            password : response.data.password,
            cpassword : response.data.cpassword,
           
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

        onChangeid(e){
            this.setState({
                id : e.target.value
            });
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

        // handleChange = (event) => {
        //     event.preventDefault();
    
        //     this.setState({
        //         [event.target.name]: event.target.value
        //     })
        // }

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
        }else{

        axios.put('http://localhost:5000/instructor/' +this.state.id, instructor)
        .then(res => {
            
            console.log(res);

            if (res.status === 200) {
                
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
        })
        
        }
        // window.location = '/';
    }

    render() {

        const {fullName, nic, dob,contactNo, email, address, position, password, cpassword} = this.state
        return (
            <div>
                
                <div className = "formdiv">
              
            <h3 className = "billheading">Edit Instructor</h3>

            
            <form onSubmit = {this.onSubmit}>

            
                    <div className = "form-group">
                        <label>Full Name : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {fullName}
                        onChange = {this.onChangefullName}
                        />
                    </div>

                    <div className = "form-group">
                        <label>NIC : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {nic}
                        onChange = {this.onChangenic}
                        />
                    </div>

                    <div className = "form-group">
                        <label>DOB : </label>
                        <div>
                            <DatePicker
                            selected = {this.state.dob}
                            onChange = {this.onChangedob}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <label>Contact : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {contactNo}
                        onChange = {this.onChangecontactNo}
                        />
                    </div>

                    <div className = "form-group">
                        <label>Email : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {email}
                        onChange = {this.onChangeemail}
                        />
                    </div>
                    
                    <div className = "form-group">
                        <label>Address : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {address}
                        onChange = {this.onChangeaddress}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Position : </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {position}
                        onChange = {this.onChangeposition}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Passowrd : </label>
                        <input type = "password"
                        required
                        className = "form-control"
                        value = {password}
                        onChange = {this.onChangepassword}
                        />
                    </div>
                    
                    <div className = "form-group">
                        <label>Confirm Passowrd : </label>
                        <input type = "password"
                        required
                        className = "form-control"
                        value = {cpassword}
                        onChange = {this.onChangecpassword}
                        />
                    </div>


                    <div className = "form-group">
                        <input type = "submit" value = "Edit Instructor" />
                    </div>
                </form>

               
            </div>
           
                </div>
        )
    }
}