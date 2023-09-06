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
class FeesBackup extends React.Component{
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
          // var security_deposit=0
          // data.map((item,index)=>{
          //         if(item.security_fee != '0' )
          //         {
          //         security_deposit= item.security_fee
          //         }
          //  })  
          //  if(item.student.tc_status=='1'){
          //   await this.getTransferCertificate(item,security_deposit)
          //  }
             if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){

               StudentWithFees.push({"take_computer":item.student.take_computer,"is_teacher_ward":item.student.is_teacher_ward,"fee_concession":item.student.fee_concession,'parent_mobile':item.student.parent_mobile,"parent_phone":item.student.parent_phone,"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,'StudentFees':data,"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
               this.setState({StudentWithFees:StudentWithFees})
   }
           
         }else{
           $('#getBtn').text("Get Data")
           if( !JSON.stringify(StudentWithFees).includes(item.admission_no+item.account_no+item.class_name)){

             StudentWithFees.push({"take_computer":item.student.take_computer,"is_teacher_ward":item.student.is_teacher_ward,"fee_concession":item.student.fee_concession,'parent_mobile':item.student.parent_mobile,"parent_phone":item.student.parent_phone,"is_full_free_ship":item.student.is_full_free_ship,"name":item.student.name,"admission_no":admission_no,"account_no":item.account_no,"security_no":item.student.security_no,"doa":Moment(item.student.date_of_admission).format("DD-MM-YYYY"),"father_name":item.student.father_name,"mother_name":item.student.mother_name,"StudentFees":[],"unique_key":item.admission_no+item.account_no+item.class_name,"refund":0,"tc_no":'',"cheque_no":'',cheque_date:''})
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
                  <h4 className="pb-5">Fees Backup ({this.state.class_name} - {this.state.section != '' ? this.state.section :"ALL"})</h4>
                </div>
              <div className="col-12 ">
                        {this.state.StudentWithFees.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((el,ind)=>{
                            return(
                              <div class="row">
                                <div class="col-12">
                              <div className="row">
                                  <div className="col-12 text-center pb-3">
                                  <h3 className="m-0">ST. JUDES'S SCHOOL ( <select value={this.state.session} className="receiptSession" onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()})}}}> 
                               <option value="">All Session</option>
                                {this.state.AllSession.map((item,index)=>{
                                    return(
                                      <option value={item.session_code}>{item.session_code}</option>
                                    )
                                })}cf
                             </select> )</h3>
                                  {el.StudentFees.map((item,index)=>{
                                      // if(item.security_fee !='0' ){
                                          // if(item.prospectus_fee !='0' || item.registration_fee !='0'  || item.admission_fee !='0'  || item.security_fee !='0' ){
                                          return(
                                              <div>
                                              {item.security_fee != '0' ? 
                                               <h4 className="w-100"> Security Dep-{item.security_fee}</h4>
                                              :null}
                                              </div>
                                          )
                                      // }
                                  })
                                  
                              }
                                      {el.is_teacher_ward=='true'? 
                                      <h4 className="w-100"> Security Dep- 0</h4>
                                      :null}
                                      {/* <p>WEST CANAL ROAD P.O MAJRA, DEHRADUN</p>
                                      <p>0135-2640930,0135-2642828,FAX:0135-2644353</p> */}
                                  </div>
                                  <div className="col-5">
                                      <strong>Admn No - </strong> {el.admission_no} <span> / <strong>{el.account_no}</strong></span><br/>
                                      <label> Student Name  - </label> {el.name}<br/>
                                  </div>
                                  <div className="col-4">
                                  <label> Class/Section   - </label> {this.state.class_name}-{this.state.section}<br/>
                                      <label> Parents Name   - </label> {el.mother_name} / {el.father_name}<br/>
                                  </div>
                                  <div className="col-3">
                                  <label> Mo.  - </label> {el.parent_mobile}<br/>{el.parent_phone}<br/>
                                         {/* { 
                                          previouspaidamount =0,
                                          previousannualamount=0,
                                          previousmonthlyamount=0,
                                          previousgrandTotal=0,
                                          previousfine=0,
                                          nothing = ""
                                          } */}
                                  </div>
                              </div>
                              {this.state.tc_status == 1 ? 
                                  <table class="table table-bordered">
                                      <tr className="bg-danger text-white">
                                          <th >Given Tc</th>
                                          <td width="2%">:</td>
                                          <td>{this.state.tc_status == 1 ? "YES" :"NO"}</td>
                                          <th >Tc No</th>
                                          <td width="2%">:</td>
                                          <td>{this.state.tc_no}</td>
  
                                          <th >Left On</th>
                                          <td width="2%">:</td>
                                          <td>{this.state.left_on}</td>
  
                                          <th >Security Amount</th>
                                          <td width="2%">:</td>
                                          <td>{this.state.security_deposit}</td>
                                  </tr>
                                  </table>
                                  :null}    
                              <table class="table print_table">
                                  <thead class="thead-light">
                                  <tr>
                                      <th >Take Computer : {el.take_computer == "true" ? "YES" : "NO"}</th>
                                      <th >Fee Concession : {el.fee_concession}</th>
                                      </tr>
                                  </thead>
                              </table>    
                          <table class="table print_table">
                          <thead class="thead-light">
                              <tr>
                              <th scope="col">RECEIPT DATE</th>
                              <th scope="col">MONTH</th>
                              <th scope="col">BANK</th>
                              <th scope="col">R.NO</th>
                              <th scope="col">ONETIME </th>
                              <th scope="col">ANNUAL</th>
                              <th scope="col">MONTHLY</th>
                              <th scope="col">FINE</th>
                              <th scope="col">PAID</th>
                              <th scope="col">DUES</th>
                              <th scope="col">SURPLUS</th>
                              </tr>
                          </thead>
                          <tbody>
                              {el.StudentFees.map((item,index)=>{
                              // {JSON.parse(item.paid_fees).map((e,i)=>{
                              //         if(e.fee_sub_category =="TUITION FEE"){
                              //             SubtractTuitionFee = e.amount
                              //         }
                              // })}
                              if(item.session==this.state.session){
                                  return(
                                              <tr>
                                                  <td>{Moment(item.receipt_date).format('DD/MM/YYYY')}</td>
                                                  <td>{item.paid_month=='1' ? "Jan"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='2' ? "Feb"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='3' ? "Mar"+"-"+Moment(item.last_fee_date).format('YYYY')  : item.paid_month=='4' ? "Apr"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='5' ? "May"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='6' ? "Jun"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='7' ? "July"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='8' ? "Aug"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='9' ? "Sept"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='10' ? "Oct"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='11' ? "Nov"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='12' ? "Dec"+"-"+Moment(item.last_fee_date).format('YYYY'):null}</td>
                                                  <td>{item.bank}</td>
                                                  <td>{item.receipt_no}</td>
                                                  <td>{item.total_one_time_fee}</td>
                                                  <td>{item.total_annual_fee}</td>                                            
                                                  <td>{parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) > 0 ? parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) : 0}</td>
                                                  <td>{item.fine}</td>
                                                  {/* <td>{item.grand_total}</td> */}
                                                  <td>{item.paid_amount}</td>
                                                  <td>   
                                                  {parseInt(item.balance) < 0 ? item.balance : "0"}
                                                  </td>
                                                  <td>{parseInt(item.balance) > 0 ? item.balance : "0"}</td>
                                              </tr>
                                  )
                              }
                              if(this.state.session==""){
                                  return(
                                              <tr>
                                                  <td>{Moment(item.receipt_date).format('DD/MM/YYYY')}</td>
                                                  <td>{item.paid_month=='1' ? "Jan"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='2' ? "Feb"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='3' ? "Mar"+"-"+Moment(item.last_fee_date).format('YYYY')  : item.paid_month=='4' ? "Apr"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='5' ? "May"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='6' ? "Jun"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='7' ? "July"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='8' ? "Aug"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='9' ? "Sept"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='10' ? "Oct"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='11' ? "Nov"+"-"+Moment(item.last_fee_date).format('YYYY') : item.paid_month=='12' ? "Dec"+"-"+Moment(item.last_fee_date).format('YYYY'):null}</td>
                                                  <td>{item.bank}</td>
                                                  <td>{item.receipt_no}</td>
                                                  <td>{item.total_one_time_fee}</td>
                                                  <td>{item.total_annual_fee}</td>                                            
                                                  <td>{parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) > 0 ? parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)) : 0}</td>
                                                  <td>{item.fine}</td>
                                                  {/* <td>{item.grand_total}</td> */}
                                                  <td>{item.paid_amount}</td>
                                                  <td>   
                                                  {parseInt(item.balance) < 0 ? item.balance : "0"}
                                                  </td>
                                                  <td>{parseInt(item.balance) > 0 ? item.balance : "0"}</td>
                                              </tr>
                                  )
                              }
                              })}
                              {/* {el.StudentFees.map((item,index)=>{
                                   if(item.session==this.state.session){
                                previouspaidamount  = parseInt(previouspaidamount)+parseInt(item.paid_amount)+parseInt(item.fine)
                              //   alert(previouspaidamount)
                                previousannualamount =parseInt(previousannualamount) +parseInt(item.total_annual_fee)
                                var a 
                                if((parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance))) > 0){
                                  a=(parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)))
                                }else{
                                    a=0
                                }
                                previousmonthlyamount=parseInt(previousmonthlyamount)+a
                                previousgrandTotal= parseInt(previousgrandTotal)+parseInt(item.grand_total)
                                previousfine = parseInt(previousfine)+parseInt(item.fine)
                              }
                              })} */}
  
                               {/* {el.StudentFees.map((item,index)=>{
                                   if(this.state.session==""){
                                previouspaidamount  = parseInt(previouspaidamount)+parseInt(item.paid_amount)+parseInt(item.fine)
                              //   alert(previouspaidamount)
                                previousannualamount =parseInt(previousannualamount) +parseInt(item.total_annual_fee)
                                var a 
                                if((parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance))) > 0){
                                  a=(parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)))
                                }else{
                                    a=0
                                }
                                previousmonthlyamount=parseInt(previousmonthlyamount)+a
                                previousgrandTotal=parseInt(previousgrandTotal)+parseInt(item.grand_total)
                                previousfine =parseInt(previousfine)+parseInt(item.fine)
                              }
                              })} */}
                              
                              {/* <td><strong>GRAND_TOTAL</strong></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><strong>{previousannualamount}</strong></td>
                              <td><strong>{previousmonthlyamount}</strong></td>
                              <td><strong>{previousfine}</strong></td>
                              <td><strong>{parseInt(previouspaidamount)}</strong></td> */}
{/*   
                              {el.StudentFees.map((item,index)=>{
                                  if(index == el.StudentFees.length-1){
                                      if(parseInt(item.balance) <= 0 ){
                                          return(<td><strong>{parseInt(item.balance)}</strong></td>)
                                      }else{
                                          return(<td><strong>0</strong></td>) 
                                      }
                                  }
                              })
                              }
                                  {el.StudentFees.map((item,index)=>{
                                  if(index ==el.StudentFees.length-1){
                                      
                                      if(parseInt(item.balance) >=0 ){
                                          return(<td><strong>{parseInt(item.balance)}</strong></td>)
                                      }else{
                                          return(<td><strong>0</strong></td>) 
                                      }
                                  }
                              })
                          } */}
  
                              {/* {previouspaidamount-previousgrandTotal < 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>}
  
                              {previouspaidamount-previousgrandTotal  >= 0 ? <td><strong>{previouspaidamount-previousgrandTotal}</strong></td> : <td></td>} */}
                             
                          </tbody>
                      </table>
                          </div>
                          </div>
                            )
                        })
                        }                      
                      {/* :
                      <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                    } */}
              </div>
            </div>
            </>
        )
    }
    
}
export default FeesBackup;