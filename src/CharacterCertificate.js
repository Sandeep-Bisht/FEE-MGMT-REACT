import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class CharacterCertificate extends React.Component{
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

            character:'',
            AllClass:[],
        }
    }
    componentDidMount(){
      this.getClass()
  }
    getClass = async() => {
      await console.log("wait wait")
      fetch("http://144.91.110.221:4800/getClass"
      ,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        school_id: "100",
        session: this.state.session,
      })
    })
          .then(res => res.json())
          .then(data => {              
              this.setState({AllClass: data})
          })
          .then(err => console.log(err))
  }
    searchByAdmission_no_with_session = async() => {
        this.setState({name:'',account_no:'',class_name:'',section:'',parents:'',fee_concession:'',left_on:'',dob:'',date_of_admission:'',father_name:'',mother_name:'',sex:''})
          await console.log("wait wait")
          fetch("http://144.91.110.221:4800/singlestudentdata"
          ,{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            admission_no: this.state.admission_no,
            session: this.state.session,
            school_id:"100",
          })
        })
              .then(res => res.json())
              .then(data => {
                  console.log(data)
                  if(data[0] !=undefined){
                  this.setState({name:data[0].student.name,account_no:data[0].account_no,admission_no:data[0].admission_no,class_name:data[0].class_name,section:data[0].section,father_name:data[0].student.father_name,mother_name:data[0].student.mother_name,fee_concession:data[0].student.fee_concession,dob:data[0].student.dob,date_of_admission:data[0].student.date_of_admission,studentSession:data[0].session,sex:data[0].student.sex})
                  this.FeesClasswise(data[0].class_name,data[0].section); 
                  
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

                }
              })
              .then(err => console.log(err))
      }
      FeesClasswise=(class_names,sections)=>{    
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
                 class_name: class_names,
                 section: sections,
                 session:this.state.session,
             })
         })
         .then((data) => data.json())
         .then(async (data) => {  
            await console.log( 'Class Wise'+data )  
             if(data[0] !=undefined){
                 this.setState({Allfees:JSON.parse(data[0].fees)})
  
         }
         })
     }

    
    PrintTc() {
        window.print();
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
                        <div className="col-5 form-group">
                            <label>Admission No</label>
                            <input type="text" placeholder="Enter Admission No" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.searchByAdmission_no_with_session()}}}/>
                        </div>
                        <div className="col-3 form-group">
                            <label>Choose Type</label>
                           <select className="form-control" onChange={(e)=>{this.setState({character:e.target.value.toUpperCase()})}}>
                           <option value="">Simple</option>
                           <option value="Activity">Activity</option>
                           <option value="Prefect">Prefect</option>
                           <option value="Captain">School Captain</option>
                           <option value="Sports' Captain">School Sports' Captain</option>
                           </select>
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
            <div className= "row CharactertCertificate bg-white m-0 " style={{paddingTop:'250px'}}>
                
                <div className="col-12 ">
                <div className="text-center w-100"><img src={require("./images/logo.png").default} className="certificate-logo" /></div>
                <h6>{this.state.admission_no}<span style={{float:'right'}}>{Moment().format("MMMM/YYYY")}</span></h6>
                <h5 className="text-center"><u  style={{paddingLeft:'75px'}}>CHARACTER CERTIFICATE</u></h5>
                </div>
                <div className="col-12 pt-5">
                  <p>This is to certify that <strong></strong> <strong>{this.state.name}</strong> {this.state.sex =="MALE" ? "son" :"daughter" } of <strong>Mr. {this.state.father_name}</strong> & <strong>Mrs. {this.state.mother_name}</strong> was a bonafide student of this School in Class <strong>{this.state.class_name}</strong> during the academic session <strong>{this.state.studentSession}</strong>. {this.state.sex =="MALE" ? "He" :"She" } appeared in the <strong>ISC(YEAR-12)</strong> Examinations conducted by the Council for the Indian School Certificate Examinations, New Delhi in  <strong>March {this.state.studentSession != undefined ? this.state.studentSession.split("-")[1]:null}</strong> and passed.</p><br/>
                  {this.state.character !='' ? 

                  <p>During his stay in the School, he took keen interest in Extra and Co-curricular activities. {this.state.sex =="MALE" ? "He" :"She" } also took an active part in all games at School Level. He proved to be a hard working and diligent student.</p> 
                  :null}<br/>
                  {this.state.character !='' ?
                  <p>In recognition of his leadership qualities, he was appointed <span style={{textTransform:"lowercase"}}><strong>{this.state.character}</strong></span> of the institution during the Academic Session <strong>{this.state.studentSession}</strong></p>:null}<br/>
                 
                  <p>A very well behave {this.state.sex =="MALE" ? "boy" :"girl" }, who bears a good moral character and whose conduct has been very good in all respects.</p><br/>
                  <p>I wish him all success in the future.</p><br/><br/>

                  <h5>(Mrs. V.R Gardner)</h5><br/><br/>
                </div>
                </div>
            </>
        )
    }
}
export default CharacterCertificate;