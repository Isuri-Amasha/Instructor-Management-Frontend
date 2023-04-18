import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";

// import { CardContent } from '@material-ui/core';
// import { Card } from '@material-ui/core';
//import './home.css'

export default class EditFeedback extends Component {

    
    constructor(props){
        super(props);

        this.onChangefeedback = this.onChangefeedback.bind(this);
        this.onChangeinstructor = this.onChangeinstructor.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
       

        this.state = {
            id:props.feedId,
            feedback : '',
            instructors : [],
            instructor : ''
           
            
        }
    }

    componentDidMount() {
        console.log("ID is : " + this.state.id)
        axios.get(`http://localhost:5000/feedback/` + this.state.id)
            .then(response => {
                this.setState({
                    // id : this.props.id,
                    feedback: response.data.feedback,
                    instructor: response.data.instructor,
                    
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

       

            axios.put('http://localhost:5000/feedback/' + this.state.id, feedback)
        // .then(res => console.log("success")).catch(err=>console.log(err));

        .then(res => {
            
            console.log(res);

            if (res.status === 200) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: 'Feedback has been updated!!',
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.clearData();
                

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error in updating!',
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
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
        const { feedback, instructor } = this.state
        return (
        
            
            <div className="flex flex-col px-5">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start px-10">
                                    <div className="formdiv">
        
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Feedback </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {feedback}
                        onChange = {this.onChangefeedback}
                        />
                       <p/>
                    </div>

                    <div className = "form-group">
                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Instructor </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {instructor}
                        onChange = {this.onChangeinstructor}
                        />


                        <p/>
                       
                    </div>

                    

                    <div className="text-center align-middle form-group">
                        <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Feedback" />
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