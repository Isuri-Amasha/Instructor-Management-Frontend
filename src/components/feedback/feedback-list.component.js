import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";


const Feedback = props => (
    <tr>
       
        <td>{props.feedback.feedback}</td>
        <td>{props.feedback.instructor}</td>
     
       
        {/* <td>
            
            <button  onClick ={() => {props.gotoUpdateInstructor(props.instructor._id)}  }>
               
                    Update
                   
                    </button>
            <button  onClick ={() => {props.deleteInstructor(props.instructor._id)}}>Delete</button>
            
                                                        
                                                  
        </td> */}
    </tr>
)

export class FeedbackList extends Component {

    constructor(props){
        super(props);

        // this.deleteInstructor = this.deleteInstructor.bind(this);
        // this.gotoUpdateInstructor = this.gotoUpdateInstructor.bind(this);

        this.state = {feedback : [], instructor : [],
            searchFeedback : ""};
    }


    componentDidMount() {
        this.getInstructors();
        this.refreshTable();
        }

        refreshTable() {
            axios.get('http://localhost:5000/feedback/')
            .then(response => {
                this.setState({ feedback : response.data })
            })
            .catch((error) => {
                console.log(error);
            })
            }
    
            // gotoUpdateInstructor = (id) => {
            //     this.setState({
            //         id: id,
            //         show: true
                    
            //     })
            //     console.log("LIst id is :" +id);
            // }

             //Modal box
    // 

    getInstructors(){
        axios.get('http://localhost:5000/instructor/')
        .then(response => {
            this.setState({ instructor : response.data })
        })
        .catch((error) => {
            console.log(error);
        })
        

    }

        feedbackList(){
            return this.state.feedback.map(currentfeedback => {
                return <Feedback feedback = {currentfeedback} />;
            })
        }

    
        searchFeedbackList(){

            return this.state.feedback.map((currentfeedback) => {
                if (
                    this.state.searchFeedback ==
                    currentfeedback.instructor
                ){
                    return (
                        <tr>
                       
                        <td style={{ width: "10%" }}>{currentfeedback.feedback}</td>
                        <td style={{ width: "10%" }}>{currentfeedback.instructor}</td>
                       
                        </tr>
                    );
                }
            });
        }


        exportFeedback = () => {
            console.log( "Exporting PDF" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "landscape"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Feedback List Report ";
            const headers = [["Feedback","Instructor"]];
    
            const fed = this.state.feedback.map(
                Feedback=>[
                    Feedback.feedback,
                    Feedback.instructor,
                   
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:fed
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "Feedback-list.pdf" )
        }


    render() {
        return (
            <div >
            <div>
            
            
                <table >
                    <tr>
                        <th><h3>Feedback Details</h3></th>
                        <td><button ><Link to = {"/creatFeedback" }>Add Feedback</Link></button>
                        <button onClick={() => this.exportFeedback()}>
                       
                        Download Report Here</button></td>
                    </tr>

                    <div >
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Instructor Name"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchFeedback: e.target.value
                        });
                    }}
                    />
            </div>
                </table>
            
            
                
                <table class="table table-bordered">
                <thead >
                    <tr>
                        
                        <th className = "tbhead">Feedback</th>
                        <th className = "tbhead">Instructor Name</th>
                       
                        
                        
                        
                    </tr>
                </thead>
                <tbody>
                    { this.state.searchFeedback == "" ? this.feedbackList() : this.searchFeedbackList() }
                </tbody>
            </table>
           
           
        </div>

          {/*--------------------------Model Box to Edit Conference--------------------------*/}

       

                  {/*----------------------------------------------------*/}

        </div>
        )
    }
}

