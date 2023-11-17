import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import $ from 'jquery'; 
import { CSVLink, CSVDownload } from "react-csv";

var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''

var StudentWithFees=[]
class SecurityRegisterReport extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          StudentWithFees:[],
          AllClass:[],
          class_name:'1',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          StudentStrenghtt:'',
          defaultFine:'',
          fine_date:'',
          AllSession:[],
          AllSection:[],
          section:'',
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getClass()
      this.getSection()
      this.getSession()
      // this.StudentStrenghtt()
    }
    getSection = () => {
      fetch("http://144.91.110.221:4800/getSection"
          ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            school_id: "UT015",
            session:this.state.session,
          })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSection: data})
          })
          .catch((error)=>{
            console.log(error)
          })  }
    getSession = () => {
      fetch("http://144.91.110.221:4800/getSession"
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
          .catch((error)=>{
            console.log(error)
          })  }

  getTransferCertificate= async (item,security_deposit)=>{    
    await console.log("wait")
    console.log("checking response search by addmission no")
    const admission_no = item.admission_no
    if(admission_no =='0'){
         return false;
    }
    fetch("http://144.91.110.221:4800/getTransferCertificate"
    ,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      admission_no: admission_no,
    })
  })
    .then(res => res.json())
    .then(async (data) => {  
        if(data !=undefined){
          if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){
            StudentWithFees.push({"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,'security_deposit':security_deposit,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":data.security_deposit,"tc_no":data.tc_no,"cheque_no":data.cheque_no,cheque_date:data.date_of_tc})
            this.setState({StudentWithFees:StudentWithFees})
          }
        }
        else{
          if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){
            StudentWithFees.push({"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,"security_deposit":0,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
            this.setState({StudentWithFees:StudentWithFees})
          }
        }
    }).catch((error)=>{
      console.log(error)
    })
    return true;
}
    StudentStrenght=async()=>{
      $('#getBtn').text("Please Wait...")
     this.setState({StudentWithFees:[]})
     StudentWithFees=[]
       fetch("http://144.91.110.221:4800/StudentStrenght"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               class_name: this.state.class_name,
               section:this.state.section
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
        if(data[0] != undefined){

              data.map((item,index)=>{
                this.SearchOldfee(item)
              })
        }
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
               }
       }).catch((error)=>{
        console.log(error)
      })
    }

    SearchOldfee= async(item)=>{
      this.setState({StudentWithFees:[]})
     console.log("checking response SearchOldfee")
     await  console.log("wait wait")
     const admission_no = item.admission_no
     fetch("http://144.91.110.221:4800/SearchOldfee"
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
          $('#getBtn').text("Get Data")
          var security_deposit=0
          data.map((item,index)=>{
                  if(item.security_fee != '0' )
                  {
                  security_deposit= item.security_fee
                  }
           })  
           if(item.student.tc_status=='1'){
            await this.getTransferCertificate(item,security_deposit)
           }
           else{
             if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){

               StudentWithFees.push({"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,'security_deposit':security_deposit,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
               this.setState({StudentWithFees:StudentWithFees})
   }
           } 
         }else{
           $('#getBtn').text("Get Data")
           if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){

             StudentWithFees.push({"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,"security_deposit":0,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
             this.setState({StudentWithFees:StudentWithFees})
 }
             
         }
     }).catch((error)=>{
      console.log(error)
    })
 }
    getClass = () => {
      fetch("http://144.91.110.221:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .catch((error)=>{
            console.log(error)
          })   }
   getFeesOfStudent=(class_name)=>{ 
    global_class_name =  class_name
    console.log("checking response FeesClasswise")
    const currentMonth =  Moment().format('MM')       
     fetch("http://144.91.110.221:4800/FeesClasswise"
     ,{
         method: 'POST',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             class_name: class_name,
             session:this.state.session,
         })
     })
     .then((data) => data.json())
     .then(async (data) => {  
        await console.log( 'Class Wise'+data )  
         if(data[0] !=undefined){
             this.setState({Allfees:JSON.parse(data[0].fees)})
            //  console.log("done")
     }
     }).catch((error)=>{
      console.log(error)
    })
 }
printDefaulter() {
  window.print();
}    
    render(){
      // StudentWithFees=[]
        // const data =[];
        //   const columns = [
        //     { title: "SR NO", data: "sr_no" },
        //     { title: 'Admission No',data: "admission_no"},
        //     { title: 'Account No',data: "account_no"},
        //     { title: 'Name',data: "name"},
        //     { title: 'Class',data: "class_name"},
        //     { title: 'Dues ',data: "dues"},
        //   ];
        //   const click = (row) => {
        //     console.log(row);
        //   };
        //   const csvData = [
        //     ["ADMISSION NO","ACCOUNT NO","SECURITY NO","STUDENT","CLASS NAME","HOUSE","GENDER","DOA","DOB","FATHER NAME","MOTHER NAME","ADDRESS","MOBILE","PHONE","FEE CONCESSION"]
        //   ];
        //   {this.state.AllStudent.map((item,ind)=>{
        //     var concession 
        //     if(item.student.fee_concession ==""){
        //       concession =0
        //     }else{
        //       concession=item.student.fee_concession
        //     }
        //     csvData.push( [item.admission_no,item.account_no,item.student.security_no,item.student.name,item.class_name+"-"+item.section,item.student.house,item.student.sex,item.student.date_of_admission,item.student.dob,item.student.father_name,item.student.mother_name,item.student.parent_address,item.student.parent_mobile,item.student.parent_phone,concession])
        //   // })}
        //   })
        //   }
        return(
            <>
              <div className= "row layoutCard">
                <div className="col-3 form-group">
                      <label>Session</label>
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.  setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">All Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
               
                <div className="col-2 form-group">
                <label>Select Class</label>
                <select className="form-control"  value={this.state.class_name} onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase()})}}>
                           <option value="">All</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                            })}
                </select>
                </div>
                <div className="col-2 form-group">
                  <label>Section</label>
                  <select className="form-control" onChange={(e)=>{this.setState({section:e.target.value.toUpperCase(),sectionErrorMessage:undefined})}}>
                             <option value="">All</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.class_name == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                  </select>
                </div>
                <div className="col-4 form-group d-flex align-items-end">
                  <br/>
                  {/* <button className="btn btn-primary mr-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button> */}
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.StudentStrenght()}}>Get Data</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                </div>
              </div>
            <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                  <h4>{this.state.session}</h4>
                </div>
                <div className="col-12 text-center">
                  <h4 className="pb-5">SECURITY REGISTER ({this.state.class_name} - {this.state.section != '' ? this.state.section :"ALL"})</h4>
                </div>
              <div className="col-12 ">
                         {this.state.StudentWithFees != "" ?
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SNO</th>
                            <th scope="col">ADMNO</th>
                            <th scope="col">A/C NO</th>
                            <th scope="col">SD NO.</th>
                            <th scope="col">DOA</th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th scope="col">SEC.DEPOSIT</th>
                            <th scope="col">REFUND</th>
                            <th scope="col">TC_NO</th>
                            <th scope="col">CHEQUENO</th>
                            <th scope="col">CHEQUEDATE</th>
                          </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.StudentWithFees.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
                            return(
                              <tr>
                                <td>{index+1}</td>
                                <td>{item.admission_no}</td>
                                <td>{item.account_no}</td>
                                <td className="text-danger">{item.security_no == '0' ? "":item.security_no }</td>
                                <td>{item.doa}</td>
                                <td>{item.name}</td>
                                <td>{item.father_name} / <br/>{item.mother_name}</td>
                                <td>{item.security_deposit}</td>
                                <td>{item.refund !="" ? item.refund :0}</td>
                                <td>{item.tc_no}</td>
                                <td className="text-danger">{item.cheque_no}</td>
                                <td>{item.cheque_date}</td>
                              </tr>
                            )
                        })
                        }
                      
                         
                        </tbody>
                      </table>
                      :
                      <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                    }
              </div>
            </div>
            </>
        )
    }
    
}
export default SecurityRegisterReport;