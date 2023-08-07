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
var loop_i =0;
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
          FromAdmissionNo:'11268',
          ToAdmissionNo:'11368',
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getClass()
      this.getSection()
      this.getSession()
      // this.StudentStrenghtt()
      this.StudentStrenght()
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
            school_id: "100",
            session:this.state.session,
          })
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSection: data})
          })
          .then(err => console.log(err))
  }
    getSession = () => {
      fetch("http://144.91.110.221:4800/getSession"
      ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            school_id: "100"
          })
        })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSession: data})
          })
          .then(err => console.log(err))
  }

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
            StudentWithFees.push({"is_full_free_ship":item.is_full_free_ship,"name":item.name,"name":item.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.security_no,"doa":Moment(item.date_of_admission).format("DD-MM-YYYY"),"father_name":item.father_name,"mother_name":item.mother_name,'security_deposit':security_deposit,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":data.security_deposit,"tc_no":data.tc_no,"cheque_no":data.cheque_no,cheque_date:data.date_of_tc})
            this.setState({StudentWithFees:StudentWithFees})
          }
        }
        else{
          if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){
            StudentWithFees.push({"is_full_free_ship":item.is_full_free_ship,"name":item.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.security_no,"doa":Moment(item.date_of_admission).format("DD-MM-YYYY"),"father_name":item.father_name,"mother_name":item.mother_name,"security_deposit":0,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
            this.setState({StudentWithFees:StudentWithFees})
          }
        }
    })
    return true;
}

    StudentStrenght=async()=>{
      loop_i=0
    $('#getBtn').text("Please Wait...")
     this.setState({StudentWithFees:[]})
     StudentWithFees=[]
       fetch("http://144.91.110.221:4800/StudentStrenghtForSecurityByRange"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               class_name: this.state.class_name,
               section:this.state.section,
               from:this.state.FromAdmissionNo,
               to:this.state.ToAdmissionNo
           })
       })
       .then((StudentWithFees) => StudentWithFees.json())
       .then(async (StudentWithFees) => {  
        if(StudentWithFees[0] != undefined){
              // data.map((item,index)=>{
              //   this.SearchOldfeeSecurityRegisterAll(item)
              // })
              // this.myLoop(data)
              this.setState({StudentWithFees:StudentWithFees})
        }
               if(StudentWithFees[0] == undefined){
                 alert("No Result Found")
               }
       })
    }
    myLoop=(data)=> {            
      //  create a loop function
      var time = 0
      if(loop_i%800 == 0 && loop_i != 0){
        time=20000
        // alert("time Change "+time)
      }
      setTimeout(()=> {   //  call a 3s setTimeout when the loop is called
        //  your code here
            console.log("length "+data.length)               //  increment the counter
        if (loop_i < data.length) { 
         
          console.log('hello loop i '+loop_i); 
          // console.log('hello  '+JSON.stringify(data[loop_i])); 
          this.SearchOldfeeSecurityRegisterAll(data[loop_i])    //  if the counter < data.length, call the loop function
          console.log('hello search old fees');
          loop_i++;
          this.myLoop(data)
                  //  ..  again which will trigger another    
        }     
                 //  ..  setTimeout()
                 
      }, time)
    }
    SearchOldfeeSecurityRegisterAll= async(item)=>{
      this.setState({StudentWithFees:[]})
     console.log("checking response SearchOldfeeSecurityRegisterAll")
     await  console.log("wait wait")
     const admission_no = item.admission_no
     fetch("http://144.91.110.221:4800/SearchOldfeeSecurityRegisterAll"
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
           if(item.tc_status=='1'){
            await this.getTransferCertificate(item,security_deposit)
           }
           else{
             if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){

               StudentWithFees.push({"is_full_free_ship":item.is_full_free_ship,"name":item.name,"name":item.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.security_no,"doa":Moment(item.date_of_admission).format("DD-MM-YYYY"),"father_name":item.father_name,"mother_name":item.mother_name,'security_deposit':security_deposit,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
               this.setState({StudentWithFees:StudentWithFees})
   }
           } 
         }else{
           $('#getBtn').text("Get Data")
           if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){
             StudentWithFees.push({"is_full_free_ship":item.is_full_free_ship,"name":item.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.security_no,"doa":Moment(item.date_of_admission).format("DD-MM-YYYY"),"father_name":item.father_name,"mother_name":item.mother_name,"security_deposit":0,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
             this.setState({StudentWithFees:StudentWithFees})
            }
         }
     })
 }
    getClass = () => {
      fetch("http://144.91.110.221:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .then(err => console.log(err))
   }
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
     })
 }
printDefaulter() {
  window.print();
}    
    render(){      
      
      const csvData = [
        ["ADMISSSION NO", "ACCOUNT NO", "SD NO." ,"DOA" , "STUDENT" ,"PARENTS","SEC. DEPOSIT","REFUND","TC NO.","CHEQUENO","CHEQUEDATE"],
      ];


      {this.state.StudentWithFees.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
        return(
          csvData.push( [item.admission_no,item.account_no,item.security_no,item.doa,item.name,item.father_name+" / "+item.mother_name,item.security_deposit,item.refund,item.tc_no,item.cheque_no,item.cheque_date])
        )
     
    })
    }
        return(
            <>
              <div className= "row layoutCard">
                {/* <div className="col-3 form-group">
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
                </div> */}
                 <div className="col-3 form-group">
                    <label>From</label>
                    <input type="text" className="form-control" value={this.state.FromAdmissionNo}  onChange={(e)=>{this.setState({FromAdmissionNo:e.target.value})}} />
                  </div>
                  <div className="col-3 form-group">
                    <label>To</label>
                    <input type="text" className="form-control" value={this.state.ToAdmissionNo}  onChange={(e)=>{this.setState({ToAdmissionNo:e.target.value})}} />
                  </div>
                  <div className="col-3 form-group">
                  <br/>
                    <button className="btn btn-success" onClick={(e)=>{this.StudentStrenght()}}>Get Data</button>
                  </div>
                <div className="col-3 form-group">
                  <br/>
                  {/* <button className="btn btn-primary mr-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button> */}
                  {/* <button className="btn btn-success" id="getBtn" onClick={()=>{this.StudentStrenght()}}>Get Data</button> */}
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                  <button className="btn btn-primary ml-1"><CSVLink filename={"SecurityRegister(All).csv"} data={csvData}>CSV</CSVLink></button>
                </div>
              </div>
            <div className= "row printCard printDefaulter">
                {/* <div className="col-12 text-center">
                  <h4>{this.state.session}</h4>
                </div> */}
                <div className="col-12 text-center">
                  <h4 className="pb-5">SECURITY REGISTER BY RANGE</h4>
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
                                <td>{Moment(item.doa).format("DD-MM-YYYY")}</td>
                                <td>{item.name}</td>
                                <td>{item.father_name} / <br/>{item.mother_name}</td>
                                <td>{item.security_deposit}</td>
                                <td>{item.refund !="" ? item.refund :0}</td>
                                <td>{item.tc_no}</td>
                                <td className="text-danger">{item.cheque_no}</td>
                                <td>{item.cheque_date?Moment(item.cheque_date).format("DD-MM-YYYY"):null}</td>
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