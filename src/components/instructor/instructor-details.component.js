import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import InstructorEdit from "./instructor-edit.component";
import DatePicker from 'react-datepicker';
export class InstructorDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            instructor: [],
            searchInstructor: "",
            show: false,
            id: '642db3fbde2b3695a517c14e',
            fullName: '',
            nic: '',
            dob: new Date(),
            contactNo: '',
            email: '',
            address: '',
            position: '',
            password: '',
            cpassword: ''
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable() {
        axios.get('http://localhost:5000/instructor/' + this.state.id)

            .then(response => {
                this.setState({
                    // id : this.props.id,
                    fullName: response.data.fullName,
                    nic: response.data.nic,
                    dob: new Date(response.data.dob),
                    contactNo: response.data.contactNo,
                    email: response.data.email,
                    address: response.data.address,
                    position: response.data.position,
                    password: response.data.password,
                    cpassword: response.data.cpassword
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
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
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
        console.log("Exporting PDF")
        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Instructor List Report ";
        const headers = [["Full Name", "NIC", "Date Of Birth", "Contact Number", "Email", "Address", "Position", "Password", "Confirm Password"]];
        const inst = this.state.instructor.map(
            Instructor => [
                Instructor.fullName,
                Instructor.nic,
                Instructor.dob.substring(0, 10),
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
            body: inst
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Instructor-list.pdf")
    }

    render() {

        const { fullName, nic, dob, contactNo, email, address, position, password, cpassword } = this.state
        return (
            <div >
                <div className="flex flex-col px-5">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className='items-center overflow-hidden'>
                                <div className=''>
                                    <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                        <div className="formdiv">
                                            <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                                <p className='text-4xl font-semibold text-center text-black uppercase billheading'>Instructor Details</p>

                                                <div class="grid grid-cols-1 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Full Name :
                                                        </label>
                                                        <input type="text"
                                                            // required
                                                            className="form-control"
                                                            value={fullName}
                                                            onChange={this.onChangefullName}
                                                        /><p />
                                                    </div>

                                                </div>
                                                <div class="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            NIC :
                                                        </label>
                                                        <input type="text"
                                                            required
                                                            className="form-control"
                                                            value={nic}
                                                            onChange={this.onChangenic}
                                                        />
                                                        <p />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Date of birth :
                                                        </label>
                                                        <DatePicker
                                                            type="date"
                                                            className="text-lg text-gray-900'"
                                                            selected={dob}
                                                            onChange={this.onChangedob}
                                                        /><p />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Contact Number :
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={contactNo}
                                                        onChange={this.onChangecontactNo}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Email :
                                                    </label>
                                                    <input type="email"
                                                        required
                                                        className="form-control"
                                                        value={email}
                                                        onChange={this.onChangeemail}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">
                                                        Address :
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        value={address}
                                                        onChange={this.onChangeaddress}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">
                                                        Position :
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        value={position}
                                                        onChange={this.onChangeposition}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">
                                                        Passowrd :
                                                    </label>
                                                    <input
                                                        type="password"
                                                        required
                                                        className="form-control"
                                                        value={password}
                                                        onChange={this.onChangepassword}
                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">
                                                        Confirm Passowrd :
                                                    </label>
                                                    <input
                                                        type="password"
                                                        required
                                                        className="form-control"
                                                        value={cpassword}
                                                        onChange={this.onChangecpassword}
                                                    /><p />
                                                </div>
                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Instructor" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                {/* <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Instructor Details Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <InstructorEdit classId={this.state.id} key={this.state.id} close={this.closeModalBox} />

                    </Modal.Body>
                </Modal> */}

                {/*----------------------------------------------------*/}

            </div>
        )
    }
}

