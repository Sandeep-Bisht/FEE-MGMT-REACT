import React from 'react';
import ModalImage from "react-modal-image";
import DataTable from '@bit/adeoy.utils.data-table';
import { Link } from "react-router-dom";
import Moment from 'moment';
import $ from 'jquery'; 

class StudentDisplay extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            session:localStorage.getItem('SessionAccess'),
            date_of_admission:'',
            parent:'',
            admission_no:'',
            security_no:'',
            old_admission_no:'',
            aadhar_no:'',
            class_name:'',
            section:'',
            subjects:[],
            is_start_from_first_class:false,
            last_class:'',
            category:'',
            house:'',
            name:'',
            sex:'',
            dob:'',
            nationality:'',
            last_school:'',
            changebalance:'',
            fee_concession:'',
            bus_fare_concession:'',
            vehicle_no:'',
            is_teacher_ward:false,
            paid_upto_month:'',
            paid_upto_year:'',
            last_school_performance:'',
            is_full_free_ship:false,
            avail_transport:false,
            take_computer:false,
            no_exempt_security_deposit:false,
            ncc:false,
            no_exempt_registration:false,
            no_exempt_admission:false,
            is_repeater:false,
            other_details:'',
            misc_details:'',
   
            account_no:'',
            father_name:'',
            mother_name:'',
            father_occu:'',
            father_designation:'',
            father_annual_income:'',
            mother_occu:'',
            mother_designation:'',
            mother_annual_income:'',
            parent_address:'',
            parent_per_address:'',
            parent_city:'',
            parent_state:'',
            parent_country:'',
            parent_phone:'',
            parent_mobile:'',            
   
            gaurdian_name:'',
            gaurdian_occu:'',
            gaurdian_designation:'',
            gaurdian_annual_income:'',
            gaurdian_address:'',
            gaurdian_city:'',
            gaurdian_state:'',
            gaurdian_country:'',
            gaurdian_phone:'',
            gaurdian_mobile:'',
            religion:'',

            image:'',
            image2:'',
            image3:'',
            image4:'',
   
            AllSession:[],
            AllParent:[],
            AllClass:[],
            AllSection:[],
            AllCategory:[],
            AllHouse:[],
            AllStudent:[],
            SingleParent:[],
            AllSubjects:[],

            due:'',
            surplus:'',
            last_fees_date:'',
            AllOldFees:[],
            balance:'',
            AllSibling:[],
            tc_no:'',
            tc_status:'',
            security_deposit:'',
            cheque_no:'',
            left_on:'',
            serverpagi:1,
            servercontentsize:20,
            PaginationCount:[]
        }
    }
    componentDidMount=()=>{
        // this.getStudent()
        const admission_no=localStorage.getItem('StudentDisplay')
       this.searchByAdmission_no(admission_no)
       this.getSession()
    }
   
    PaginationCall=async(e) => {
      let arr=[]
      for(let i=1 ; i<=Math.ceil(localStorage.getItem("AllStudentcount")/this.state.servercontentsize); i++){
        arr.push(i)
        
      }
      
      await this.setState({PaginationCount:arr})

    };
    ServerPagination = async(e) => {
      await this.setState({ serverpagi: e.target.value });
     
     
      await this.getStudent()
    };
    RangeContentSize = async(e) => {
      await this.setState({ servercontentsize: e.target.value });
     
      await this.setState({serverpagi:1})
      await this.getStudent()
    };
   PageIncreament=async()=>{
   
     await this.setState({serverpagi:parseInt(this.state.serverpagi)+1})
   
    await this.getStudent()
     
    
   }
   
   PageDecreament=async()=>{
    if(this.state.serverpagi>1)
    {
   await this.setState({serverpagi:parseInt(this.state.serverpagi)-1})
    
   await this.getStudent()
    }
    else{
      alert("no previous page")
    }
  }

  // GetAllStudentCount Api
  getStudentCount = () => {
    fetch("http://144.91.210.221:4800/getStudentCount"
        , {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            session: this.state.session,
            school_id: "UT015"
          })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({AllStudentcount: data.count})
            localStorage.setItem("AllStudentcount", this.state.AllStudentcount);
        })
        .then(err => console.log(err))
  }
  // End GetAllStudentCount Api

    getSession = () => {
      fetch("http://144.91.210.221:4800/getSession"
      ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            school_id: "UT015"
          })
        })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSession: data})
          })
          .then(err => console.log(err))
  }
    getStudent = () => {
      fetch("http://144.91.210.221:4800/getStudent"
          , {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
              body: JSON.stringify({
              session: this.state.session,
              school_id: "UT015",
              page_no:this.state.serverpagi,
              page_content_size:this.state.servercontentsize
            })
          })
          .then(res => res.json())
          .then(data => {
              this.setState({AllStudent: data})
              this.getStudentCount();
              this.PaginationCall();
          })
          .then(err => console.log(err))
    }
    getCertificateDetails = async() => {
      await console.log("wait wait")
      fetch("http://144.91.210.221:4800/getTransferCertificate"
      ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admission_no: this.state.admission_no,
      })
    })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({left_on:data.left_on,date_of_tc:data.date_of_tc,cheque_no:data.cheque_no,security_deposit:data.security_deposit,tc_no:data.tc_no})
              // alert(data.security_deposit)
              
          })
          .then(err => console.log(err))
  }
    // DisplayStudentObject = (obj) => {
    //     let _id   =   obj._id
    //     let session = obj.session
    //     let date_of_admission =obj.date_of_admission
    //     let parent= obj.parent
    //     let admission_no=obj.admission_no
    //     let security_no = obj.security_no
    //     let old_admission_no=obj.old_admission_no
    //     let aadhar_no = obj.aadhar_no
    //     let class_name = obj.class_name
    //     let section = obj.section
    //     let subjects = obj.subjects
    //     let is_start_from_first_class = obj.is_start_from_first_class
    //     let last_class = obj.last_class
    //     let category = obj.category
    //     let house = obj.house
    //     let name = obj.name
    //     let sex = obj.sex
    //     let dob = obj.dob
    //     let nationality = obj.nationality
    //     let last_school = obj.last_school
    //     let balance = obj.balance
    //     let fee_concession = obj.fee_concession
    //     let bus_fare_concession = obj.bus_fare_concession
    //     let vehicle_no = obj.vehicle_no
    //     let is_teacher_ward = obj.is_teacher_ward
    //     let paid_upto_month = obj.paid_upto_month
    //     let paid_upto_year = obj.paid_upto_year
    //     let last_school_performance = obj.last_school_performance
    //     let is_full_free_ship = obj.is_full_free_ship
    //     let avail_transport = obj.avail_transport
    //     let take_computer = obj.take_computer
    //     let no_exempt_security_deposit = obj.no_exempt_security_deposit
    //     let ncc = obj.ncc
    //     let no_exempt_registration = obj.no_exempt_registration
    //     let no_exempt_admission = obj.no_exempt_admission
    //     let is_repeater = obj.is_repeater
    //     let other_details = obj.other_details
    //     let misc_details = obj.misc_details

    //     let account_no = obj.account_no
    //     let father_name = obj.father_name
    //     let mother_name = obj.mother_name
    //     let father_occu = obj.father_occu
    //     let father_designation = obj.father_designation
    //     let father_annual_income = obj.father_annual_income
    //     let mother_occu = obj.mother_occu
    //     let mother_designation = obj.mother_designation
    //     let mother_annual_income = obj.mother_annual_income
    //     let parent_address = obj.parent_address
    //     let parent_per_address = obj.parent_per_address
    //     let parent_city = obj.parent_city
    //     let parent_state = obj.parent_state
    //     let parent_country = obj.parent_country
    //     let parent_phone = obj.parent_phone
    //     let parent_mobile = obj.parent_mobile

    //     let gaurdian_name = obj.gaurdian_name
    //     let gaurdian_occu = obj.gaurdian_occu
    //     let gaurdian_designation = obj.gaurdian_designation
    //     let gaurdian_annual_income = obj.gaurdian_annual_income
    //     let gaurdian_address = obj.gaurdian_address
    //     let gaurdian_city = obj.gaurdian_city
    //     let gaurdian_state = obj.gaurdian_state
    //     let gaurdian_country = obj.gaurdian_country
    //     let gaurdian_phone = obj.gaurdian_phone
    //     let gaurdian_mobile = obj.gaurdian_mobile
    //     let image= obj.image

        

    //     this.setState({image,_id,session,date_of_admission,parent,admission_no,security_no,old_admission_no,aadhar_no,class_name,section,subjects,is_start_from_first_class,last_class,category,house,name,sex,dob,nationality,last_school,balance,fee_concession,bus_fare_concession,vehicle_no,is_teacher_ward,paid_upto_month,paid_upto_year,last_school_performance,is_full_free_ship,avail_transport,take_computer,no_exempt_security_deposit,ncc,no_exempt_registration,no_exempt_admission,is_repeater,other_details,misc_details,account_no,father_name,mother_name,father_occu,father_designation,father_annual_income,mother_occu,mother_designation,mother_annual_income,parent_address,parent_per_address,parent_city,parent_state,parent_country,parent_phone,parent_mobile,gaurdian_name,gaurdian_occu,gaurdian_designation,gaurdian_annual_income,gaurdian_address,gaurdian_city,gaurdian_state,gaurdian_country,gaurdian_phone,gaurdian_mobile})
    // }
    searchByAdmission_no= async (e)=>{
     
      await console.log("wait")
      console.log("checking response search by addmission no")
      const admission_no = e
      if(admission_no =='0'){
           return false;
      }
      fetch("http://144.91.210.221:4800/singlestudentdata"
      ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: this.state.session,
          admission_no: admission_no,
          school_id:"UT015",
        })
      })
      .then((data) => data.json())
      .then(async (data) => {  
          if(data[0] !=undefined){            
            var subjects
            if(data[0].student.subjects !="" && data[0].student.subjects !=undefined && data[0].student.subjects !='"undefined"'){
              subjects= JSON.parse(data[0].student.subjects)
            }else{
              subjects=[]
            }
              this.setState({image:data[0].student.image,image2:data[0].student.image2,image3:data[0].student.image3,image4:data[0].student.image4,date_of_admission:data[0].student.date_of_admission,admission_no:data[0].admission_no,security_no:data[0].student.security_no,old_admission_no:data[0].student.old_admission_no,aadhar_no:data[0].student.aadhar_no,class_name:data[0].class_name,section:data[0].section,subjects:subjects,is_start_from_first_class:data[0].is_start_from_first_class,last_class:data[0].student.last_class,category:data[0].category,house:data[0].student.house,name:data[0].student.name,sex:data[0].student.sex,dob:data[0].student.dob,nationality:data[0].student.nationality,last_school:data[0].student.last_school,fee_concession:data[0].student.fee_concession,bus_fare:data[0].student.bus_fare_concession,is_teacher_ward:data[0].student.is_teacher_ward,last_school_performance:data[0].student.last_school_performance,is_full_free_ship:data[0].student.is_full_free_ship,avail_transport:data[0].student.avail_transport,take_computer:data[0].student.take_computer,no_exempt_security_deposit:data[0].student.no_exempt_security_deposit,ncc:data[0].student.ncc,no_exempt_registration:data[0].student.no_exempt_registration,no_exempt_admission:data[0].student.no_exempt_admission,is_repeater:data[0].student.is_repeater,other_details:data[0].student.other_details,misc_details:data[0].student.misc_details,account_no:data[0].account_no,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,father_occu:data[0].student.father_occu,father_designation:data[0].student.father_designation,father_annual_income:data[0].student.father_annual_income,mother_occu:data[0].student.mother_occu,mother_designation:data[0].student.mother_designation,mother_annual_income:data[0].student.mother_annual_income,parent_address:data[0].student.parent_address,parent_city:data[0].student.parent_city,parent_state:data[0].student.parent_state,parent_country:data[0].student.parent_country,
                parent_per_address:data[0].student.parent_per_address,parent_per_city:data[0].student.parent_per_city,parent_per_state:data[0].student.parent_per_state,parent_per_country:data[0].student.parent_per_country
                ,parent_phone:data[0].student.parent_phone,parent_mobile:data[0].student.parent_mobile,gaurdian_name:data[0].student.gaurdian_name,gaurdian_occu:data[0].student.gaurdian_occu,gaurdian_designation:data[0].student.gaurdian_designation,gaurdian_annual_income:data[0].student.gaurdian_annual_income,gaurdian_address:data[0].student.gaurdian_address,gaurdian_city:data[0].student.gaurdian_city,gaurdian_state:data[0].student.gaurdian_state,gaurdian_country:data[0].student.gaurdian_country,gaurdian_phone:data[0].student.phone,gaurdian_mobile:data[0].student.gaurdian_mobile,roll_no:data[0].student.roll_no,board_roll_no:data[0].student.board_roll_no,reg_no:data[0].student.reg_no,paid_upto_month:data[0].student.paid_upto_month,religion:data[0].student.religion,tc_status:data[0].student.tc_status})
                if(data[0].student.tc_status==1){
                  this.getCertificateDetails()
                }
              // alert(data[0].student.image)
              // if(parseInt(data[0].balance) >0  ){
              //     this.setState({surplus:data[0].balance})
              // }else if(parseInt(data[0].balance) <0 ){
              //     this.setState({due:data[0].balance})
              // }
              this.SearchOldfee(e)
              this.viewParent(data[0].account_no)
          }
          else{
            this.setState({image:'',image2:'',image3:'',image4:'',date_of_admission:'',parent:'',security_no:'',old_admission_no:'',aadhar_no:'',class_name:'',section:'',subjects:[],is_start_from_first_class:'',last_class:'',category:'',house:'',name:'',sex:'',dob:'',nationality:'',last_school:'',balance:'',fee_concession:'',bus_fare_concession:'',vehicle_no:'',is_teacher_ward:'',paid_upto_month:'',paid_upto_year:'',last_school_performance:'',is_full_free_ship:'',avail_transport:'',take_computer:'',no_exempt_security_deposit:'',ncc:'',no_exempt_registration:'',no_exempt_admission:'',is_repeater:'',other_details:'',misc_details:'',account_no:'',father_name:'',mother_name:'',father_occu:'',father_designation:'',father_annual_income:'',mother_occu:'',mother_designation:'',mother_annual_income:'',parent_address:'',parent_city:'',parent_state:'',parent_country:''
            ,parent_per_address:'',parent_per_city:'',parent_per_state:'',parent_per_country:''
            ,parent_phone:'',parent_mobile:'',gaurdian_name:'',gaurdian_occu:'',gaurdian_designation:'',gaurdian_annual_income:'',gaurdian_address:'',gaurdian_city:'',gaurdian_state:'',gaurdian_country:'',gaurdian_phone:'',gaurdian_mobile:'',religion:'', tc_no:'',
            tc_status:'',
            security_deposit:'',
            left_on:'',
            cheque_no:''
          })
          }
      })
  }
  SearchOldfee= async(e)=>{
    this.setState({AllOldFees:[]})
    console.log("checking response SearchOldfee")
    await  console.log("wait wait")
    const admission_no = e
    if(admission_no =='0'){
         return false;
    }
    fetch("http://144.91.210.221:4800/SearchOldfee"
    ,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            admission_no: admission_no
        })
    })
    .then((data) => data.json())
    .then(async (data) => {  
        console.log( 'single parent'+data )  
        if(data[0] !=undefined){
            this.setState({AllOldFees: data,last_fees_date:data[data.length-1].last_fee_date,balance:data[data.length-1].balance}) 
            
            if(parseInt(data[data.length-1].balance) >0  ){
                this.setState({surplus:data[data.length-1].balance})
            }else if(parseInt(data[data.length-1].balance) <0 ){
                this.setState({due:data[data.length-1].balance})
            }
        }else{
      
           
            if(this.state.AllStudent[0] != undefined)
            {   
                this.setState({last_fees_date:this.state.paid_upto_month})
              
            }
        }
        // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
    })
  
}
viewParent= async(e)=>{
  await console.log("wait wait")
  console.log("checking response SearchOldfee")
    await  console.log("wait wait")
    const account_no = e
    if(account_no =='0'){
         return false;
    }
  fetch("http://144.91.210.221:4800/singleparentdata"
  , {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          session:this.state.session,
          account_no: account_no
      })
  })
  .then((data) => data.json())
  .then(async (data) => {  
      this.setState({AllSibling:data})
  })
}
    handleFocusInput (e){
      e.target.select(); 
    }
    PrintStudentDislay() {
      $('.printStudentSlip').hide()
      window.print();
      $('.printStudentSlip').show()
    }
    printStudentSlip() {
      $('.printStudentDisplay').hide()
      $('.student-profile').hide()
    
      $('.navbar').hide()
      window.print();
      $('.printStudentDisplay').show()
      $('.student-profile').show()
    
      $('.navbar').show()
    }
    render(){
      const data =[];
      {this.state.AllStudent.map((item,index)=>{
      data.push({"admission_no":parseInt(item.admission_no),"account_no":parseInt(item.account_no),"student_name":item.student.name,"class_section":item.class_name+"-"+item.section,"parent_name":item.student.mother_name+"/"+item.student.father_name,"gaurdian_name":item.gaurdian_name,"mobile":item.student.parent_mobile+","+item.student.parent_phone,"address":item.parent_address,'action': <button type="button" className="btn btn-info" onClick={() => this.searchByAdmission_no(item.admission_no)} data-dismiss="modal">Get Details</button>})})}
        const columns = [
          { title: "Admn No", data: "admission_no" },
          { title: "Ac No", data: "account_no" },
          { title: "St. Name", data: "student_name" },
          { title: "Class", data: "class_section" },
          { title: "Parent Name", data: "parent_name"},
          { title: "Gaurdian Name", data: "gaurdian_name"},
          { title: "Mobile", data: "mobile"},
          { title: "Address", data: "address"},
          { title: "Action", data: "action"},
        ];
        return(
            <>
             {/* Modal All student */}
             <div id="AllModalStudent" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content" style={{width:'100%'}}>
                        <div class="modal-header p-3">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="row">
                            <div className="col-12">                     
                        <div class="modal-header">
                            <h4 class="modal-title">Student Details </h4>
                            
                        </div>
                         
                        <div class="server-filter-div modal-header">
                        <div className="col-9">
                        {this.state.serverpagi==1?
                            <button onClick={()=>this.PageDecreament()} className="btn btn-danger" disabled >Prev</button>:
                            <button onClick={()=>this.PageDecreament()} className="btn btn-danger">Prev</button>
                            }
                            {this.state.AllStudent.length == this.state.servercontentsize?
                            <span className="ml-5"><b>
                            <select onChange={(e)=>this.ServerPagination(e)} value={this.state.serverpagi} style={{border:'0px', outline:'0px'}}>
                            {this.state.PaginationCount.map((item,ind)=>(

                                <option  value={item}>{item}</option>
                            ))}
                            </select>
                            </b> ({this.state.servercontentsize})</span>:
                            <span  className="ml-5"><b>Loading...</b></span>
                            }
                         

                           
                              
                            {this.state.serverpagi==Math.ceil(localStorage.getItem("AllStudentcount")/this.state.servercontentsize)?
                            <button onClick={()=>this.PageIncreament() } className="btn btn-danger ml-5" disabled>Next</button>:
                            <button onClick={()=>this.PageIncreament() } className="btn btn-danger ml-5">Next</button>}
                          </div>
                            <div className="col-3 d-flex justify-content-center align-items-center">
                            <span className="mr-2"><b>Load</b></span>
                                <select onChange={(e)=>this.RangeContentSize(e)} value={this.state.servercontentsize} className="form-control">
                                  <option value={20}>20</option>
                                  <option value={50}>50</option>
                                  <option value={100}>100</option>
                                  <option  value={250}>250</option>
                                  <option value={500}>500</option>
                                  <option value={localStorage.getItem("AllStudentcount")}>ALL</option>
                                </select>
                              <span className="ml-2"><b>Entries</b></span>
                             </div>
                           
                        </div>
                        <div class="modal-body">
                        {this.state.AllStudent !=""?
                       
                     
                        <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                      
                    />
                    :
                    <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                  }
                        </div>
                        </div>
                     </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end all modal student */}
            {/* <!-- Student Profile --> */}
  <div class="student-profile py-4">
    <div class="row">
      {/* <div class="col-lg-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <p class="mb-0"><strong class="pr-1">Admission No:</strong><input type="text" onChange={(e)=>{this.searchByAdmission_no(e)}} defaultValue={this.state.admission_no} /></p>
            <p class="mb-0"><strong class="pr-1">Class:</strong>{this.state.class_name}</p>
            <p class="mb-0"><strong class="pr-1">Date Of Birth:</strong>{this.state.dob}</p>
          </div>
          <div class="card-header bg-transparent text-center">
            <img class="profile_img" src="https://placeimg.com/640/480/arch/any" alt="" />
            <h3>{this.state.name}</h3>
          </div>
        </div>
      </div> */}
      <div class="col-lg-12  printStudentDisplay">
        <div class="card shadow-sm">
          <div class="card-header bg-transparent border-0">
            <h3 class="mb-0 text-center "><Link to="/FeeReceipt" style={{float:"left"}} className="btn btn-secondary btn-sm mr-3 pl-4 pr-4"><i class="fas fa-arrow-left"></i>Back</Link><button style={{float:"left"}} className="btn btn-info btn-sm mr-3 pl-4 pr-4" onClick={()=>{this.PrintStudentDislay()}}>Print</button><button style={{float:"left"}} className="btn btn-info btn-sm mr-3 pl-4 pr-4" onClick={()=>{this.printStudentSlip()}}>Print Slip</button>STUDENT INFORMATION</h3>
          </div>
          <div class="card-body pt-0">
          <table class="table table-bordered">
              <tr>
                <th >Security Dep</th>
                <td width="2%">:</td>
                <td>
                {this.state.AllOldFees.map((item,index)=>{
                                    // if(item.security_fee !='0' ){
                                        // if(item.prospectus_fee !='0' || item.registration_fee !='0'  || item.admission_fee !='0'  || item.security_fee !='0' ){
                                        return(
                                            <div>
                                            {item.security_fee != '0' ? 
                                             <h5 className="w-100"> {item.security_fee}</h5>
                                            :null}
                                            </div>
                                        )
                                    // }
                                })
                            }
              </td>
              <th >Dues</th>
                <td width="2%">:</td>
                <td>{this.state.due}</td>

                <th >Surplus</th>
                <td width="2%">:</td>
                <td>{this.state.surplus}</td>

                <th >PaidUpto</th>
                <td width="2%">:</td>
                <td>{Moment(this.state.last_fees_date).format("M")=='1' ? "Jan " : Moment(this.state.last_fees_date).format("M")=='2' ? "Feb " : Moment(this.state.last_fees_date).format("M")=='3' ? "Mar "  : Moment(this.state.last_fees_date).format("M")=='4' ? "Apr " : Moment(this.state.last_fees_date).format("M")=='5' ? "May " : Moment(this.state.last_fees_date).format("M")=='6' ? "Jun " : Moment(this.state.last_fees_date).format("M")=='7' ? "July " : Moment(this.state.last_fees_date).format("M")=='8' ? "Aug " : Moment(this.state.last_fees_date).format("M")=='9' ? "Sept " : Moment(this.state.last_fees_date).format("M")=='10' ? "Oct " : Moment(this.state.last_fees_date).format("M")=='11' ? "Nov " : Moment(this.state.last_fees_date).format("M")=='12' ? "Dec ":null}</td>
          </tr>
          </table>
          {this.state.tc_status == 1 ? 
          <table class="table table-bordered">
              <tr className="bg-danger text-white">
                <th >Tc No</th>
                <td width="2%">:</td>
                <td>{this.state.tc_no}</td>

                <th >Left On</th>
                <td width="2%">:</td>
                <td>{this.state.left_on}</td>

                <th >Security Amount</th>
                <td width="2%">:</td>
                <td>{this.state.security_deposit}</td>
                <th >Cheque No</th>
                <td width="2%">:</td>
                <td>{this.state.cheque_no}</td>
          </tr>
          </table>
          :null}
          </div>
          <div class="card-body pt-0">
            <table class="table table-bordered">
            <tr>
                <th width="30%">Session</th>
                <td width="2%">:</td>
                <td>   <select className="" value={this.state.session} onChange={(e)=>{this.setState({session:e.target.value.toUpperCase()})}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                    )
                              })}
                           </select></td>
              </tr>
              <tr>
                <th >Admn/Acc Number</th>
                <td width="2%">:</td>
                <td><input type="text" value={this.state.admission_no} onFocus={(e)=>{this.handleFocusInput(e)}}  onChange={(e)=>{this.setState({admission_no:e.target.value})}} onKeyPress={(e)=>{if(e.key=="Enter"){this.searchByAdmission_no(e.target.value)}}} />  / {this.state.account_no}<button type="button" onClick={()=>{this.getStudent()}} class="btn btn-success btn-sm ml-2" data-toggle="modal" data-target="#AllModalStudent">...</button>
                <strong>   Sibling : </strong>
                
                {this.state.AllSibling[1] != undefined ? "YES => " : "NO  "}

                {/* <strong >   Sibling Admission No  : </strong> */}
                
               
                {this.state.AllSibling.map((item,index)=>{
                  if(this.state.admission_no != item.admission_no){
                  return(
                    item.admission_no+" , "
                  )
                }
                })}
                
              
                </td>
              </tr>
              <tr>
                <th width="30%">Student Name</th>
                <td width="2%">:</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <th width="30%">Date of Admission</th>
                <td width="2%">:</td>
                <td>{this.state.date_of_admission}</td>
              </tr>
              
              <tr>
                <th width="30%">Date of Birth</th>
                <td width="2%">:</td>
                <td>{this.state.dob}</td>
              </tr>
              <tr>
                <th width="30%">Class/Section</th>
                <td width="2%">:</td>
                <td>{this.state.class_name}-{this.state.section}</td>
              </tr>
              <tr>
                <th width="30%">House</th>
                <td width="2%">:</td>
                <td>{this.state.house=="GARDNER" ? <button className="btn btn-success">{this.state.house}</button> : this.state.house=="HOWARD" ? <button className="btn btn-primary">{this.state.house}</button> : this.state.house=="KHANNA" ? <button className="btn btn-danger">{this.state.house}</button> : this.state.house=="LYONS" ? <button className="btn " style={{backgroundColor:"yellow"}}>{this.state.house}</button> :null }</td>
              </tr>
              <tr>
                <th width="30%">Security No</th>
                <td width="2%">:</td>
                <td>{this.state.security_no}</td>
              </tr>
              <tr>
                <th width="30%">Religion</th>
                <td width="2%">:</td>
                <td>{this.state.religion}</td>
              </tr>
              <tr>
                <th width="30%">Parents Name	</th>
                <td width="2%">:</td>
                <td><strong>Mother Name :  </strong>{this.state.mother_name}   /  <strong>Father Name :  </strong>{this.state.father_name}</td>
              </tr>
              <tr>
                <th width="30%">Gaurdian Name	</th>
                <td width="2%">:</td>
                <td>{this.state.gaurdian_name}</td>
              </tr>
              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>{this.state.sex}</td>
              </tr>
              <tr>
                <th width="30%">Mobile Number</th>
                <td width="2%">:</td>
                <td>{this.state.parent_mobile},{this.state.parent_phone}</td>
              </tr>
              <tr>
                <th width="30%">Present Address</th>
                <td width="2%">:</td>
                <td>{this.state.parent_address}  {this.state.parent_city} , {this.state.parent_state} , {this.state.parent_country}</td>
              </tr>
              <tr>
                <th width="30%">Permanent Address</th>
                <td width="2%">:</td>
                <td>{this.state.parent_per_address}  {this.state.parent_per_city} , {this.state.parent_per_state} , {this.state.parent_per_country}</td>
              </tr>
              <tr>
                <th width="30%">Subjects</th>
                <td width="2%">:</td>
                <td>{ this.state.subjects.map((el,index)=>{
                  return(
                    el+","
                  )
                })}</td>
              </tr>
              <tr>
                <th scope="row">Last Class</th>
                <td width="2%">:</td>
                <td>{this.state.last_class}</td>
              </tr>
              <tr>
                <th scope="row">Last School</th>
                <td width="2%">:</td>
                <td>{this.state.last_school}</td>
              </tr>
              <tr>
                <th scope="row">Last School Performance</th>
                <td width="2%">:</td>
                <td>{this.state.last_school_performance}</td>
              </tr>
              </table>
              <table class="table table-bordered">
                <tr>
                  <th scope="row">Avail Transport</th>
                  <td width="2%">:</td>
                  <td>{this.state.avail_transport =="true" ? "YES" :"NO"}</td>
                  
                  <th scope="row">Take Computer</th>
                  <td width="2%">:</td>
                  <td>{this.state.take_computer =="true" ? "YES" :"NO"}</td>

                  <th scope="row">Teacher Ward</th>
                  <td width="2%">:</td>
                  <td>{this.state.is_teacher_ward =="true" ? "YES" :"NO"}</td>
                  <th scope="row">Fee Concession</th>
                  <td width="2%">:</td>
                  <th>{this.state.fee_concession }%</th>
                </tr>
                <tr>
                 
                  <th scope="row">Aadhar No</th>
                  <td width="2%">:</td>
                  <td>{this.state.aadhar_no}</td>
                  <th scope="row">Class Roll No</th>
                  <td width="2%">:</td>
                  <td>{this.state.roll_no}</td>
                  <th scope="row">Board Roll No</th>
                  <td width="2%">:</td>
                  <td>{this.state.board_roll_no}</td>
                  <th scope="row">Registration Number</th>
                  <td width="2%">:</td>
                  <td>{this.state.reg_no}</td>
                </tr>
                <tr>
                 <th scope="row">Other Details</th>
                 <td width="2%">:</td>
                 <td>{this.state.other_details}</td>
                
                 <th scope="row">Misc Ddetails</th>
                 <td width="2%">:</td>
                 <td>{this.state.misc_details}</td>
               </tr>
              </table>
          </div>
        </div>
      </div>
      <div class="col-lg-12 ">
        <div class="card shadow-sm ">
         
          <div class="card-body">
          <div class="row">
            <div class="col-lg-3">
            <ModalImage
            small={this.state.image !=undefined ?"http://144.91.210.221:4800/" + this.state.image:"http://144.91.210.221:4800/public/admission/" + this.state.admission_no+".jpg"}
            medium={this.state.image !=undefined ?"http://144.91.210.221:4800/" + this.state.image:"http://144.91.210.221:4800/public/admission/" + this.state.admission_no+".jpg"}
            large={this.state.image !=undefined ?"http://144.91.210.221:4800/" + this.state.image:"http://144.91.210.221:4800/public/admission/" + this.state.admission_no+".jpg"}
            alt={this.state.image}
            />;
            </div>
            <div class="col-lg-3">
            <ModalImage
            small={"http://144.91.210.221:4800/" + this.state.image2}
            medium={"http://144.91.210.221:4800/" + this.state.image2}
            large={"http://144.91.210.221:4800/" + this.state.image2}
            alt={this.state.image2}
           />;
            </div>
            <div class="col-lg-3">
            <ModalImage
            small={"http://144.91.210.221:4800/" + this.state.image3}
            medium={"http://144.91.210.221:4800/" + this.state.image3}
            large={"http://144.91.210.221:4800/" + this.state.image3}
            alt={this.state.image3}
           />;
            </div>
            <div class="col-lg-3">
            <ModalImage
            small={"http://144.91.210.221:4800/" + this.state.image4}
            medium={"http://144.91.210.221:4800/" + this.state.image4}
            large={"http://144.91.210.221:4800/" + this.state.image4}
            alt={this.state.image4}
           />;
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
</div>
<div className= "row bg-white printStudentSlip p-5">
                <div className="col-12 text-center">
                  <h3>  CONSTANCIA SCHOOL</h3>
                  <h6>WEST CANAL ROAD, P.O MAJRA DEHRADUN<br/>
                  0135-2640930,0135-2642828,FAX:0135-2644353
                  </h6>
                  <p className="pt-3"><strong><u> ADMISSION SLIP</u></strong></p>
                </div>
                <div className="col-6 text-center"> <p><strong>ADMISSION NO : {this.state.admission_no}</strong></p></div>
                <div className="col-6 text-center"><p><strong>ACCOUNT NO : {this.state.account_no}</strong></p></div>

                <div className="col-4 " > 
                <p>Name : <strong>{this.state.name}</strong></p>
                <p>Father Name : {this.state.father_name} </p>
                <p>Mother Name : {this.state.mother_name}</p>
                
                </div>
                <div className="col-4 " style={{padding:"0px 60px"}}> 
                <p>Gender : {this.state.sex}</p>
                <p><strong>Class/Section :{this.state.class_name}/{this.state.section} </strong></p>
                <p>Category : </p>
                
                </div>
                <div className="col-4 "> 
                <p>DOB : {Moment(this.state.dob).format("DD/MM/YYYY")}   DOA : {Moment(this.state.date_of_admission).format("DD/MM/YYYY")}</p>
                <p>House : {this.state.house}</p>
                </div>
                <div className="col-12 " > 
                <p>Address Name : {this.state.parent_address}</p>
                <p>Contact No's : {this.state.parent_mobile} , {this.state.parent_phone} </p>
                </div>
                <div className="col-6 text-center" > 
                <p>(Signature of Accountant)</p>
                </div>
                <div className="col-6 text-center" > 
                <p>(Signature of the Principal)</p>
                </div>
            </div>
            </>
        )
    }
}
export default StudentDisplay;