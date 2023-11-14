import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
var tuitionFee=0;

var previouspaidamount =0
var previousmonthlyamount=0
var previousannualamount=0
var previousoneTimeamount=0
var previousgrandTotal=0
var previousfine=0
var previousBalance=0
var previousmonthlyamountText=''
class FeeCertificate extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            AllVehicleType:[],
            updateBtn:'',
            date_of_tc:'',
            date_of_application:'',
            left_on:'',
            admission_no:'',
            name:'',
            account_no:'',
            parents:'',
            class_name:'',
            section:'',
            category:'',
            nationality:'',
            date_of_admission:'',
            dob:'',
            house:'',
            address:'',
            security_deposit:'',
            return_mode:'',
            bank:'',
            tc_no:'',
            cheque_no:'',
            reason:'',
            working_days:'',
            present_days:'',
            is_promoted:'',
            promoted_in:'',
            result:'',
            last_school:'',
            result_remark:'',
            concession:'',
            concession_remark:'',
            games_remark:'',
            other_remark:'',
            conduct:'',
            Allfees:[],

            AllOldFees:[],
            session:localStorage.getItem('SessionAccess'),
            AllSession:[]
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getSession()
      
    }
    getSession = () => {
      fetch("http://144:91:110:210:4800/getSession"
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
    searchByAdmission_no_with_session = async() => {
      previouspaidamount =0
      previousmonthlyamount=0
      previousannualamount=0
      previousoneTimeamount=0
      previousBalance=0
      previousgrandTotal=0
      previousfine=0
      previousmonthlyamountText=''
      this.setState({name:'',account_no:'',class_name:'',section:'',parents:'',fee_concession:'',last_fees_date:''})
        await console.log("wait wait")
        fetch("http://144:91:110:210:4800/singlestudentdata_with_session"
        ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admission_no: this.state.admission_no,
          session: this.state.session,
          school_id:"UT015",
        })
      })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data[0] !=undefined){
                this.setState({name:data[0].student.name,account_no:data[0].account_no,admission_no:data[0].admission_no,class_name:data[0].class_name,section:data[0].section,parents:data[0].student.father_name+" / "+data[0].student.mother_name,fee_concession:data[0].student.fee_concession})
                this.SearchOldfee() 
              }
            })
            .then(err => console.log(err))
    }
    SearchOldfee= async()=>{
      this.setState({AllOldFees:[]})
      console.log("checking response SearchOldfee")
      await  console.log("wait wait")
      const admission_no = this.state.admission_no.toUpperCase()
      fetch("http://144:91:110:210:4800/SearchOldfee"
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
              this.setState({AllOldFees: data}) 
          }else{
        
             
              if(this.state.AllStudent[0] != undefined)
              {   
                  this.setState({last_fees_date:this.state.paid_upto_month,last_session:this.state.studentSession})
              }
          }
          // this.setState({account_no:data[0].account_no,father_name:data[0].father_name,mother_name:data[0].mother_name,father_occu:data[0].father_occu,father_designation:data[0].father_designation,father_annual_income:data[0].father_annual_income,mother_occu:data[0].mother_occu,mother_designation:data[0].mother_designation,mother_annual_income:data[0].mother_annual_income,parent_address:data[0].parent_address,parent_mobile:data[0].parent_mobile,gaurdian_name:data[0].gaurdian_name,gaurdian_address:data[0].gaurdian_address,gaurdian_mobile:data[0].gaurdian_mobile,gaurdian_annual_income:data[0].gaurdian_annual_income,gaurdian_occu:data[0].gaurdian_occu,gaurdian_designation:data[0].gaurdian_designation})
      })

  }
  //   FeesClasswise=(class_names,sections)=>{    
  //     console.log("checking response FeesClasswise")
  //     const currentMonth =  Moment().format('MM')       
  //      fetch("http://144:91:110:210:4800/FeesClasswise"
  //      ,{
  //          method: 'POST',
  //          headers: {
  //              Accept: 'application/json',
  //              'Content-Type': 'application/json'
  //          },
  //          body: JSON.stringify({
  //              class_name: class_names,
  //              section: sections,
  //              session:this.state.session,
  //          })
  //      })
  //      .then((data) => data.json())
  //      .then(async (data) => {  
  //         await console.log( 'Class Wise'+data )  
  //          if(data[0] !=undefined){
  //              this.setState({Allfees:JSON.parse(data[0].fees)})

  //      }
  //      })
  //  }
    PrintTc() {
        window.print();
      } 
      textAmount(){

       

   
        let date =previousmonthlyamount+previousannualamount
        let myDiv 
    
        let oneToTwenty = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
        'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        let tenth = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    
        if(date.toString().length > 7) return myDiv.innerHTML = 'overlimit' ;
        console.log(date);
        //let num = ('0000000000'+ date).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      let num = ('0000000'+ date).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
        console.log(num);
        if(!num) return;
    
        let outputText = num[1] != 0 ? (oneToTwenty[Number(num[1])] || `${tenth[num[1][0]]} ${oneToTwenty[num[1][1]]}` )+' million ' : ''; 
      
        outputText +=num[2] != 0 ? (oneToTwenty[Number(num[2])] || `${tenth[num[2][0]]} ${oneToTwenty[num[2][1]]}` )+'hundred ' : ''; 
        outputText +=num[3] != 0 ? (oneToTwenty[Number(num[3])] || `${tenth[num[3][0]]} ${oneToTwenty[num[3][1]]}`)+' thousand ' : ''; 
        outputText +=num[4] != 0 ? (oneToTwenty[Number(num[4])] || `${tenth[num[4][0]]} ${oneToTwenty[num[4][1]]}`) +'hundred ': ''; 
        outputText +=num[5] != 0 ? (oneToTwenty[Number(num[5])] || `${tenth[num[5][0]]} ${oneToTwenty[num[5][1]]} `) : ''; 
    
        previousmonthlyamountText = outputText;
      }
    render(){
        const data =[];
        {this.state.AllVehicleType.map((item,index)=>{
        data.push( {"sr_no":index+1,"vehicle_type":item.vehicle_type,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleTypeObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteVehicleType(item._id)}className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Vehicle Type", data: "vehicle_type" },
            { title: "Action", data: "action" },
          ];
          const click = (row) => {
            console.log(row);
          };

        


 previouspaidamount =0
 previousmonthlyamount=0
 previousannualamount=0
 previousoneTimeamount=0
 previousBalance=0
 previousgrandTotal=0
 previousfine=0
 previousmonthlyamountText=''
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                    <div className="col-4 form-group">
                      <label>Session</label>
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">Select Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
                        <div className="col-4 form-group">
                            <label>Admission No</label>
                            <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.searchByAdmission_no_with_session()}}}/>
                        </div>
                        <div className="col-2 form-group d-flex align-items-end">
                            <br/>
                            <button className="btn btn-info" onClick={()=>{this.PrintTc()}}>PRINT</button>
                        </div>
                        {/* <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{}}>Save</button>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className= "row printFeeCertificate bg-white">
            <div className="text-center w-100"><img src={require("./images/logo.png").default} className="certificate-logo" /></div>
                <div className="col-12 text-center">
                <h3>CONSTANCIA SCHOOL (UT056)</h3>
                <h4 className="pt-2"><strong><i>[Affilated to Council for the Indian School Certificate Examinations(CISCE), New Delhi<br/>
                vide letter No. UP-212/2000 dated 13 oct 2000]</i></strong>
                </h4>
                <h4 className="pt-2" style={{fontWeight:"unset"}}>WEST CANAL ROAD, P.O MAJRA, DEHRADUN<br/>
                0135-2640930,0135-262828,FAX:0135-2644353</h4>
                </div>
                <div className="col-12 text-center">
                {/* <img src={require('./images/logo.png').default} style={{height:"90px"}}/> */}
                <h3 className="pt-4 pb-4"><u>FEE CERTIFICATE</u></h3>
                </div>
                <div className="col-12 pt-5">
                <p>Its is certified that Mr./Ms. {this.state.parents} has /had paid the amount as shown below towards Tuition fee/other charges in respect of his /her wards(s) studying in this school for the period from 01/Apr/{this.state.session.split("-")[0]} to 31/Mar/{this.state.session.split("-")[1]} (Academic/Financial year ):</p>
                <p className="text-center">
                  Admission No. <strong>{this.state.admission_no}</strong>      Account No. <strong>{this.state.account_no}</strong>
                </p>
               <div className="row FeeCertificateTableRow" >
                 <div className="col-12 FeeCertificateTableRowDiv">
                      <div className="row">
                        <div className="col-3">
                          <strong>Name of the ward(s)</strong>
                        </div>
                        <div className="col-2">
                        <strong>Presesnt Class</strong>
                        </div>
                        <div className="col-2">
                        <strong>Fee Details</strong>
                        </div>
                        <div className="col-2">
                        <strong>Concession%</strong>
                        </div>
                        <div className="col-3">
                        <strong>Remarks</strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          {this.state.name}
                        </div>
                        <div className="col-2">
                        {this.state.class_name}
                        </div>
                        <div className="col-2" style={{textAlign:"end"}}>
                        <strong>
                         </strong>
                        </div>
                        <div className="col-2" style={{textAlign:"end"}}>
                        <strong>{this.state.fee_concession}</strong>
                        </div>
                        <div className="col-3">
                        <strong></strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <strong>1. TUITION FEE</strong>
                        </div>
                        <div className="col-2">
                        <strong></strong>
                        </div>
                        <div className="col-2" style={{textAlign:"end"}}>
                        <strong>

                        {this.state.AllOldFees.map((item,index)=>{
                          var balance =0
                              if(item.session==this.state.session && Moment(item.receipt_date).isAfter(this.state.session.split("-")[0]+'-03-31', 'days') && Moment(item.receipt_date).isBefore(this.state.session.split("-")[1]+'-04-01', 'days')){
                                // var balance =parseInt(item.balance)

                              previouspaidamount  = parseInt(previouspaidamount)+parseInt(item.paid_amount)+parseInt(item.fine)
                              //   alert(previouspaidamount)
                              // alert(previouspaidamount)
                              previousannualamount =parseInt(previousannualamount) 
                              previousannualamount =parseInt(previousannualamount) +parseInt(item.total_annual_fee)

                              previousoneTimeamount =parseInt(previousoneTimeamount) 
                              previousoneTimeamount =parseInt(previousoneTimeamount) +parseInt(item.total_one_time_fee)
                              
                              // previousBalance =parseInt(previousBalance) 
                              // previousBalance =parseInt(previousBalance) +parseInt(item.balance)
                              // =
                              
                              if( previouspaidamount - previousannualamount - previousoneTimeamount > 0){
                                previousmonthlyamount= previouspaidamount - previousannualamount - previousoneTimeamount 
                              }else{
                                previousmonthlyamount = (previouspaidamount - previousannualamount - previousoneTimeamount) * (-1)
                              }
                              //   if(previousannualamount)
                              // previousmonthlyamount=parseInt(previousmonthlyamount)+a

                              // var a 
                              // if((parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance))) > 0){
                              //   a=(parseInt(item.paid_amount)-(parseInt(item.total_one_time_fee)+parseInt(item.total_annual_fee)+parseInt(item.balance)))
                              // }else{
                              //     a=0
                              // }
                              // previousmonthlyamount=parseInt(previousmonthlyamount)+a
                              // previousgrandTotal= parseInt(previousgrandTotal)+parseInt(item.grand_total)
                              // previousfine = parseInt(previousfine)+parseInt(item.fine)


                              if(previousmonthlyamount >0){
                                this.textAmount()
                              }
                            }
                            })}
                         {previousmonthlyamount}</strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-3">
                        
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <strong>2. COMPUTER FEE</strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-2" style={{textAlign:"end"}}>
                        <strong>0</strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-3">
                        
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5">
                          <strong>3. ANNUAL FEE</strong><br/>
                          <p>(Prize Dev / Development / Magazine / Sports / Exam / Diary etc.)</p>
                        </div>
                        
                        <div className="col-2" style={{textAlign:"end"}}>
                        <strong>{previousannualamount}</strong>
                        </div>
                        <div className="col-2">
                        <strong></strong>
                        </div>
                        <div className="col-3">
                        <strong></strong>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <strong>4.</strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-2">
                        <strong></strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-3">
                        
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <strong>5. </strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-2">
                        <strong></strong>
                        </div>
                        <div className="col-2">
                        
                        </div>
                        <div className="col-3">
                        
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <strong>Total Amount       {previousmonthlyamount+previousannualamount}</strong>
                        </div>
                      </div>
                      
                  </div>
               </div>
               <div className="row">
                <div className="col-12">
                  <h4 className="pl-5">
                    
                    (Rupees <span style={{textTransform: 'capitalize'}}>{ previousmonthlyamountText} Only)</span></h4><br/><br/>
                  <h4 className="pl-5">Station : Dehradun</h4><br/><br/>
                  <h4 className="pl-5">Dated : <span  style={{float:"right"}} className="pr-5">(Principal)</span></h4><br/><br/>
                </div>
               </div>
              </div>
            </div>
            </>
        )
    }
}
export default FeeCertificate;