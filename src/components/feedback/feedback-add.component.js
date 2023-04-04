import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";

// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export class CreateFeedback extends Component {

    
    constructor(props){
        super(props);

        this.onChangefeedback = this.onChangefeedback.bind(this);
       
        this.onChangeinstructor = this.onChangeinstructor.bind(this);
       

        this.onSubmit = this.onSubmit.bind(this);
       

        this.state = {
            feedback : '',
            instructors : [],
            instructor : ''
           
            
        }
    }

    getInstructors(){
        axios.get('http://localhost:5000/instructor/')
        .then(response => {
            this.setState({ instructors : response.data });
            console.log("List Of Instructors are" +response.data);
        })
        .catch((error) => {
            console.log(error);
        })
        

    }

    onChangefeedback(e){
        this.setState({
            feedback : e.target.value
        });
    }

    onChangeinstructor(e){
        this.setState({
            instructor : e.target.value
        });
    }

   

    

    onSubmit(e){
        e.preventDefault();

        const feedback = {
            feedback : this.state.feedback,
            instructor : this.state.instructor
        }

        console.log(feedback);

       

            axios.post('http://localhost:5000/feedback/', feedback)
        // .then(res => console.log("success")).catch(err=>console.log(err));

        .then(res => {
            
            console.log(res);

            if (res.status === 200) {
                this.clearData();
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Feedback has been added!!',
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

        
        
        
        

        // window.location = '/';
        // }
        
        
    }

    

    clearData = () => {
        this.setState({
           
            feedback: '',
            instructors : [],
            instructor : ''
            
        })
    }

    

    render() {
        return (
        <div>
            
            <h3 >Add Feedbacks</h3>
        
                <Form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <Form.Label>Feedback : </Form.Label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.feedback}
                        onChange = {this.onChangefeedback}
                        />
                       
                    </div>

                    <div className = "form-group">
                        <Form.Label>Instructor : </Form.Label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.instructor}
                        onChange = {this.onChangeinstructor}
                        />


                        
                       
                    </div>

                    

                    <div className = "form-group">
                        <input type = "submit" value = "Add Feedback"  />
                    </div>

                  

                </Form>


</div>

            

                

                
        )
    }
}