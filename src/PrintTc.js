import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class PrintTc extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            AllVehicleType:[],
            updateBtn:'',

            session:localStorage.getItem('SessionAccess'),
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
        }
    }
    getCertificateDetails = async() => {
      this.setState({name:'',account_no:'',class_name:'',section:'',parents:'',fee_concession:'',left_on:'',dob:'',date_of_admission:''})
        await console.log("wait wait")
        fetch("http://144.91.110.221:4800/getTransferCertificate"
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
                this.setState({result_remark:data.result_remark,name:data.name,admission_no:data.admission_no,class_name:data.class_name,section:data.section,left_on:data.left_on,parents:data.student.father_name+" / "+data.student.mother_name,dob:data.dob,date_of_tc:data.date_of_tc,date_of_admission:data.student.date_of_admission})
               
                
                  let date = Moment(this.state.dob).format("DD")
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
              
                  var new_date = outputText;


                  let year = Moment(this.state.dob).format("YYYY")
                  let myDivv 
              
                  let oneToTwentyy = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
                  'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
                  let tenthh = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
              
                  if(year.toString().length > 7) return myDivv.innerHTML = 'overlimit' ;
                  console.log(year);
                  //let num = ('0000000000'+ year).slice(-10).match(/^(\d{1})(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                let numm = ('0000000'+ year).slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/);
                  console.log(numm);
                  if(!numm) return;
              
                  let outputYear = numm[1] != 0 ? (oneToTwentyy[Number(numm[1])] || `${tenthh[numm[1][0]]} ${oneToTwentyy[numm[1][1]]}` )+' million ' : ''; 
                
                  outputYear +=numm[2] != 0 ? (oneToTwentyy[Number(numm[2])] || `${tenthh[numm[2][0]]} ${oneToTwentyy[numm[2][1]]}` )+'hundred ' : ''; 
                  outputYear +=numm[3] != 0 ? (oneToTwentyy[Number(numm[3])] || `${tenthh[numm[3][0]]} ${oneToTwentyy[numm[3][1]]}`)+' thousand ' : ''; 
                  outputYear +=numm[4] != 0 ? (oneToTwentyy[Number(numm[4])] || `${tenthh[numm[4][0]]} ${oneToTwentyy[numm[4][1]]}`) +'hundred ': ''; 
                  outputYear +=numm[5] != 0 ? (oneToTwentyy[Number(numm[5])] || `${tenthh[numm[5][0]]} ${oneToTwentyy[num[5][1]]} `) : ''; 
              
                  var new_year = outputYear;
                this.setState({newDOB:new_date+""+Moment(this.state.dob).format("MMMM")+" "+new_year})
                this.searchByAdmission_no()
                
            })
            .then(err => console.log(err))
    }
      PrintTc() {
        window.print();
      } 
      searchByAdmission_no= async (e)=>{        
        this.setState({sex:''})
        await console.log("wait")
        console.log("checking response search by addmission no")
        const admission_no = this.state.admission_no
        if(admission_no =='0'){
             return false;
        }
        fetch("http://144.91.110.221:4800/singlestudentdata"
            ,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                session: this.state.session,
                admission_no: admission_no,
                school_id:"100",
              })
            })
        .then((data) => data.json())
        .then(async (data) => {  
            if(data[0] !=undefined){
                this.setState({sex:data[0].student.sex})
            }
            else{
                this.setState({sex:''})
            }
        })
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
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-4 form-group">
                            <label>Admission No</label>
                            <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.getCertificateDetails()}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Left On</label>
                            <input type="date" className="form-control" value={this.state.left_on} onChange={(e)=>{{this.setState({left_on:e.target.value.toUpperCase()});}}}/>
                        </div>
                        <div className="col-4 form-group">
                            <label>Result Remark</label>
                            <input type="text" className="form-control" value={this.state.result_remark} onChange={(e)=>{{this.setState({result_remark:e.target.value.toUpperCase()});}}}/>
                        </div>
                        <div className="col-2 form-group">
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

            <div className= "row printTc bg-white" style={{textAlign:"justify"}}>
                <div className="col-12 pb-5" style={{textAlign:"end"}}>
                <h2>Admission No. {this.state.admission_no}</h2>
                </div>
                <div className="col-12">
                <p>This is to certify that<strong> {this.state.name} </strong>
                {this.state.sex =="MALE" ? "son" :"daughter" } of <strong>{this.state.parents} </strong>
                 was admitted into this school on <strong> {Moment(this.state.date_of_admission).format("DD-MM-YYYY")} </strong> 
                on a transfer certificate from <strong> </strong>
                and left on <strong> {Moment(this.state.left_on).format("DD-MM-YYYY")}</strong> with a <strong>GOOD </strong>character.</p><br/>
                
                <p> {this.state.sex =="MALE" ? "He" :"She" }  was then studying in the (*) <strong> {this.state.class_name}-{this.state.section} </strong>
                class of the (+) <strong>ICSE</strong> stream, School year being from(*)  APR to (*) MAR.</p><br/>

                <p>All sums due (#) to the school on {this.state.sex =="MALE" ? "His" :"Her" } account have been remmitted or satisfactorily arranged for. </p><br/>

                <p>{this.state.sex =="MALE" ? "His" :"Her" } date of birth, according to the admission Register of the School is
                <p>(in figures) <strong> {Moment(this.state.dob).format("DD-MM-YYYY")}</strong> (in words) <strong style={{textTransform:"capitalize"}}>{this.state.newDOB} </strong>.</p>                
                {/* (this following additional information must be supplied if scholor left at the school year) */}
                </p>
                <br/>
                <p>Promotion has been ($) <strong> {this.state.result_remark != '' ? this.state.result_remark.toUpperCase() : "GRANTED"} .</strong></p>
                </div>
                </div>
         
            </>
        )
    }
}
export default PrintTc;