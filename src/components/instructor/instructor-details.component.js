import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable';
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";
import InstructorEdit from "./instructor-edit.component";
import DatePicker from 'react-datepicker';

// const Instructor = props => (
//     <tr>
       
//         <td>{props.instructor.fullName}</td>
//         <td>{props.instructor.nic}</td>
//         <td>{props.instructor.dob.substring(0,10)}</td>
//         <td>{props.instructor.contactNo}</td>
//         <td>{props.instructor.email}</td>
//         <td>{props.instructor.address}</td>
//         <td>{props.instructor.position}</td>
//         <td>{props.instructor.password}</td>
//         <td>{props.instructor.cpassword}</td>
       
//         <td>
//             {/* <button ><Link to = {"/editInstructor/"+props.instructor._id } >Edit</Link></button> */}
//             <button  onClick ={() => {props.gotoUpdateInstructor(props.instructor._id)}  }>
//                 {/* <Link to = {"/editInstructor/"+props.instructor._id} classId={props.instructor._id}> */}
//                 {/* <InstructorEdit classId={props.instructor._id} key={props.instructor._id} /> */}
//                     Update
//                     {/* </Link> */}
//                     </button>
//             <button  onClick ={() => {props.deleteInstructor(props.instructor._id)}}>Delete</button>
            
                                                        
                                                  
//         </td>
//     </tr>
// )

export class InstructorDetails extends Component {

    constructor(props){
        super(props);

        // this.deleteInstructor = this.deleteInstructor.bind(this);
        // this.gotoUpdateInstructor = this.gotoUpdateInstructor.bind(this);

        this.state = {instructor : [],
            searchInstructor : "",
        show:false,
        id: '642af3b0c4fecdbaa4cbb5eb',
        fullName : '',
        nic : '',
        dob : new Date(),
        contactNo : '',
        email : '',
        address : '',
        position : '',
        password : '',
        cpassword : ''};
    }


    componentDidMount() {
        this.refreshTable();
        }

        refreshTable() {
            axios.get('http://localhost:5000/instructor/'+this.state.id)
            
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
                cpassword : response.data.cpassword
            })
            console.log(this.state.id)
            })
            .catch((error) => {
                console.log(error);
            })
            }
    
            gotoUpdateInstructor = (id) => {
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

        // deleteInstructor(id){
        //     axios.delete('http://localhost:5000/instructor/' +id)
        //     .then(res => console.log(res.data));
        //     this.setState({
        //         instructor : this.state.instructor.filter(el => el._id !== id)
        //     })
        // }

        // instructorList(){
        //     return this.state.instructor.map(currentinstructor => {
        //         return <Instructor instructor = {currentinstructor} deleteInstructor = {this.deleteInstructor} gotoUpdateInstructor = {this.gotoUpdateInstructor} key = {currentinstructor._id}/>;
        //     })
        // }

    
        // searchInstructorList(){

        //     return this.state.instructor.map((currentinstructor) => {
        //         if (
        //             this.state.searchInstructor ==
        //             currentinstructor.nic
        //         ){
        //             return (
        //                 <tr>
                       
        //                 <td style={{ width: "10%" }}>{currentinstructor.fullName}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.nic}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.dob}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.contactNo}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.email}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.address}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.position}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.password}</td>
        //                 <td style={{ width: "10%" }}>{currentinstructor.cpassword}</td>
                        
                        
        //                 <td style={{ width: "20%" }}>
        //                     {
        //                     <button  onClick ={() => {this.gotoUpdateInstructor(currentinstructor._id)}  }>
                                
        //                         Edit
                                
        //                     </button>
        //                     }
        //                     {"  "}
        //                     {
        //                     <button
                                
        //                         onClick={() => {
        //                           //Delete the selected record
        //                         axios
        //                             .delete(
        //                             "http://localhost:5000/instructor/" + currentinstructor._id
        //                             )
        //                             .then(() => {
        //                             alert("Delete Success");
        //                               //Get data again after delete
        //                             axios
        //                                 .get("http://localhost:5000/instructor")
        //                                 .then((res) => {
        //                                 console.log(res.data);
        //                                 this.setState({
        //                                     instructor: res.data,
        //                                 });
        //                                 })
        //                                 .catch((err) => console.log(err));
        //                             })
        //                             .catch((err) => {
        //                             alert(err);
        //                             });
        //                         }}
        //                     >
        //                         Delete
        //                     </button>
        //                     }
        //                 </td>
        //                 </tr>
        //             );
        //         }
        //     });
        // }


        exportInstructor = () => {
            console.log( "Exporting PDF" )
    
    
            const unit = "pt";
            const size = "A3"; 
            const orientation = "landscape"; 
            const marginLeft = 40;
            const doc = new jsPDF( orientation, unit, size );
    
            const title = "Instructor List Report ";
            const headers = [["Full Name","NIC","Date Of Birth","Contact Number","Email","Address","Position","Password","Confirm Password"]];
    
            const inst = this.state.instructor.map(
                Instructor=>[
                    Instructor.fullName,
                    Instructor.nic,
                    Instructor.dob.substring(0,10),
                    Instructor.contactNo,
                    Instructor.email,
                    Instructor.address,
                    Instructor.position,
                    Instructor.password,
                    Instructor.cpassword,
                ]
            );
    
            let content = {
                startY: 50,
                head: headers,
                body:inst
            };
            doc.setFontSize( 20 );
            doc.text( title, marginLeft, 40 );
            require('jspdf-autotable');
            doc.autoTable( content );
            doc.save( "Instructor-list.pdf" )
        }


    render() {

        const {fullName, nic, dob,contactNo, email, address, position, password, cpassword} = this.state
        return (
            <div >
            <div>
            
            
                <table >
                    <tr>
                        <th><h3>Instructor Details</h3></th>
                        <td><button ><Link to = {"/creatInstructor" }>Add Instructor</Link></button>
                        <button onClick={() => this.exportInstructor()}>
                       
                        Download Report Here</button></td>
                    </tr>

                    <div >
                    <input style={{ width: "250px", marginTop:"10px"}}
                    class="form-control"
                    type="text"
                    placeholder="Search by Instructor NIC"
                    aria-label="Search"
                    onChange={(e) => {
                        this.setState({
                        searchInstructor: e.target.value
                        });
                    }}
                    />
            </div>
                </table>
            
            
                
                <h3 className = "billheading">Instructor Details</h3>

            
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
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {password}
                        onChange = {this.onChangepassword}
                        />
                    </div>
                    
                    <div className = "form-group">
                        <label>Confirm Passowrd : </label>
                        <input type = "text"
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

          {/*--------------------------Model Box to Edit Conference--------------------------*/}

        <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Instructor Details Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <InstructorEdit classId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                        
                    </Modal.Body>
                </Modal>

                  {/*----------------------------------------------------*/}

        </div>
        )
    }
}

