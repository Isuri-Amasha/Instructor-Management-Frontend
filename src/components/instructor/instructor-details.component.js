import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import InstructorEdit from "./instructor-edit.component";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
export class InstructorDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            instructor: [],
            searchInstructor: "",
            show: false,
            id: '642e81f5a044a1eb984d7bd6',
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
        this.refreshForm();
    }

    onChangeid(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangefullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangenic(e) {
        this.setState({
            nic: e.target.value
        });
    }

    onChangedob(date) {
        this.setState({
            dob: date
        });
    }

    onChangecontactNo(e) {
        this.setState({
            contactNo: e.target.value
        });
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeposition(e) {
        this.setState({
            position: e.target.value
        });
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangecpassword(e) {
        this.setState({
            cpassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const instructor = {
            fullName: this.state.fullName,
            nic: this.state.nic,
            dob: this.state.dob,
            contactNo: this.state.contactNo,
            email: this.state.email,
            address: this.state.address,
            position: this.state.position,
            password: this.state.password,
            cpassword: this.state.cpassword
        }

        console.log(instructor);

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if(!this.state.email || regex.test(this.state.email) === false){
            this.setState({ emailError: "Please Enter a valid email." })
        }
        if (this.state.password != this.state.cpassword) {
            this.setState({ passwordError: "Your Passwords Don't match" })

        } else if (this.state.nic.length < 10 || this.state.nic.length > 12) {
            this.setState({ nicError: "Please Enter a valid NIC Number" })
        } else if (this.state.contactNo.length != 10) {
            this.setState({ contactError: "Please Enter a valid Phone Number" })
        } else {

            axios.put('http://localhost:5000/instructor/' + this.state.id, instructor)
                .then(res => {

                    console.log(res);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Instructor has been Updated!!',
                            background: '#fff',
                            confirmButtonColor: '#0a5bf2',
                            iconColor: '#60e004'
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in Updating!',
                            background: '#fff',
                            confirmButtonColor: '#eb220c',
                            iconColor: '#e00404'
                        })
                    }
                })
        }
        // window.location = '/';
    }

    refreshForm() {
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

