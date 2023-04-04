import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import {InstructorList} from './components/instructor/instructor-list.component'
import {CreateInstructor} from './components/instructor/instructor-add.component'
import EditInstructor from './components/instructor/instructor-edit.component'

import {PaymentList} from './components/pyament/payment-list.component'
import {CreatePayment} from './components/pyament/payment-add.component'
import EditPayment from './components/pyament/payment-edit.component'

import {FeedbackList} from './components/feedback/feedback-list.component'
import {CreateFeedback} from './components/feedback/feedback-add.component'

import {InstructorDetails} from './components/instructor/instructor-details.component'
function App() {
  return (

    <div>
      <Navbar />
      <Router>
        <Routes>

        <Route exact path = "/instructor" element = {<InstructorList/>}/>
        <Route exact path = "/creatInstructor" element = {<CreateInstructor/>}/>
        <Route exact path = "/editInstructor/:id" element = {EditInstructor}/>

        <Route exact path = "/payment" element = {<PaymentList/>}/>
        <Route exact path = "/creatPayment" element = {<CreatePayment/>}/>
        <Route exact path = "/editPayment/:id" element = {EditPayment}/>

        <Route exact path = "/feedback" element = {<FeedbackList/>}/>
        <Route exact path = "/creatfeedback" element = {<CreateFeedback/>}/>


        <Route exact path = "/idetails/:id" element = {<InstructorDetails/>}/>


        </Routes>
      </Router>

    </div>
  );

}

export default App;
