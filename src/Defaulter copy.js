import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";
var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''
var count=0

class Defaulter extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllDefaulter:[],
          AllClass:[],
          class_name:'',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          DefaulterByMonth:'',
          defaultFine:'',
          fine_date:'',
          AllSession:[],
          AllSection:[],
          section:''
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getClass()
      this.getFine()
      this.getSession()
      this.getSection()
    }
    // getFeeReceipt = () => {
    //   fetch("http://144:91:110:210:4800/getFeeReceipt")
    //       .then(res => res.json())
    //       .then(data => {
    //           console.log(data)
    //           this.setState({AllDefaulter:data})
    //       })
    //       .then(err => console.log(err))
    // }
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
    getFine = () => {
        fetch("http://144:91:110:210:4800/getFine")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({_id:data[0].id,category: data[0].category,fine_date:data[0].fine_date,defaultFine:data[0].amount})
            })
            .then(err => console.log(err))
    }
    getSection = () => {
      fetch("http://144:91:110:210:4800/getSection"
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
          .then(err => console.log(err))
  }
    DefaulterByMonth=async()=>{
     this.setState({AllDefaulter:[]})
      await console.log(this.state.DefaulterByMonth)
       fetch("http://144:91:110:210:4800/DefaulterByMonth"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               DefaulterByMonth: this.state.DefaulterByMonth,
               class_name:this.state.class_name,
               section:this.state.section
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
               this.setState({AllDefaulter:data})
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
               }
       })
    }
    getClass = () => {
      fetch("http://144:91:110:210:4800/getClass")
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
     fetch("http://144:91:110:210:4800/FeesClasswise"
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
//  setDefaulterList =async()=>{
//   this.state.AllDefaulter.map((item,index)=>{
//     await console.log("wair")
//     var dateStart = Moment(this.state.last_fees_date).add(1,'month');
//     var dateEnd = Moment(this.state.receipt_date)
//     while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
//         if(shortmonths.includes('3')==true)
//         {   
//             break ;
//         }
//        months.push(dateStart.format('YYYY-MM-DD'));
//        fromtomonths.push(dateStart.format('M'));
//        shortmonths.push(dateStart.format('M'));
//        dateStart.add(1,'month');
//     }
//   }
//  }
printDefaulter() {
  window.print();
}    
    render(){
      count =0
        const data =[];
        // {this.state.AllDefaulter.map((item,index)=>{
        //   data.push( {"sr_no":index+1,"name":item.name,"admission_no":item.admission_no,
        //   "account_no":item.account_no,"class_name":item.class_name+"-"+item.section,"dues":item.balance})
        // })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: 'Admission No',data: "admission_no"},
            { title: 'Account No',data: "account_no"},
            { title: 'Name',data: "name"},
            { title: 'Class',data: "class_name"},
            { title: 'Dues ',data: "dues"},
          ];
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
              <div className= "row layoutCard">
                <div className="col-3 form-group">
                      <label>Session</label>
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">All Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
                <div className="col-3 form-group">
                  <label>Date</label>
                  <input type="date" className="form-control" value={this.state.DefaulterByMonth} onChange={(e)=>{this.setState({DefaulterByMonth:e.target.value})}} />
                </div>
                <div className="col-3 form-group">
                <label>Select Class</label>
                <select className="form-control" onChange={(e)=>{this.setState({class_name:e.target.value.toUpperCase()})}}>
                           <option value="">All</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                            })}
                </select>
                </div>
                <div className="col-3 form-group">
                            <label>Section *</label>
                           <select className="form-control" onChange={(e)=>{this.setState({section:e.target.value.toUpperCase()})}}>
                             <option value="">Select Section</option>
                             {this.state.AllSection.map((item,index)=>{
                                 if(this.state.class_name == item.class_name.toUpperCase()){
                                 return(
                                    <option value={item.section}>{item.section}</option>
                                 )
                                 }
                             })}
                           </select>
                        </div>
                
                <div className="col-3 form-group">
                  <button className="btn btn-success" onClick={()=>{this.DefaulterByMonth()}}>Get Defaulter</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                </div>
              </div>
            <div className= "row printCard">
              <div className="col-12 printDefaulter">
                <h3 className="text-center">DEFAULTER LIST OF {this.state.class_name} ({ Moment(this.state.DefaulterByMonth).format("MM-YYYY")})</h3>
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sr No</th>
                            <th scope="col">Admn No</th>
                            <th scope="col">Account no</th>
                            <th scope="col">Student</th>
                            <th scope="col">Class</th>
                            <th scope="col">One Time</th>
                            <th scope="col">Annual</th>
                            <th scope="col">Monthly</th>
                            <th scope="col">Fine</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.AllDefaulter.map((item,index)=>{
                                var shortmonths= new Array();
                                var finemonths=0
                                var finemonthscount 
                                var dateStart = Moment(item.last_fee_date)
                                var dateEnd = Moment(this.state.DefaulterByMonth)
                                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M') ) {
                                  dateStart.add(1,'month');
                                  shortmonths.push(dateStart.format('M'));
                                  
                                }
                             var annual_fees = 0;
                             var Monthly = 0;
                             finemonthscount = shortmonths.length-1


                             
                            //  calculation
                            {shortmonths.map((i,ind)=>{
                              if(item.fees){
                                 JSON.parse(item.fees).map((itemm,index)=>{
                             
                              if(itemm.fee_category=="ANNUAL"){
                                  if(i==itemm.month){
                                    // testing condition
                                    if(itemm.month =="4" && this.state.session=="2021-2022"){
                                    annual_fees =parseInt(annual_fees)+525
                                    }else{
                                      annual_fees =parseInt(annual_fees)+parseInt(itemm.amount)
                                    }
                                    //end testing condition
                              }
                            }
                            })
                          }
                          if(item.fees){
                            JSON.parse(item.fees).map((itemm,index)=>{
                              if(itemm.fee_category=="MONTHLY"){
                                  if(itemm.fee_sub_category=="TUITION FEE"){
                                    if(parseInt(item.fee_concession) != 100){
                                    if(parseInt(item.fee_concession) > 0){
                                    Monthly =parseInt(itemm.amount)*(shortmonths.length-1)
                                    Monthly = (Monthly *parseInt(item.fee_concession))/100-parseInt(item.balance)
                                    }else if(parseInt(item.fee_concession) ==""){
                                      Monthly =parseInt(itemm.amount)*(shortmonths.length-1)-parseInt(item.balance)
                                    }else{
                                      Monthly =parseInt(itemm.amount)*(shortmonths.length-1)-parseInt(item.balance)
                                    }
                                  }else{
                                    Monthly=0
                                  }
                          }    
                        }
                            })
                          }
                          })
                      }
                      if(Monthly+annual_fees >0){
                        count=count+1
                          return(
                            <tr>
                              <th scope="row">{count}</th>
                              <td>{item.admission_no}</td>
                              <td>{item.account_no}</td>
                              <td>{item.name}</td>
                              <td>{item.class_name}-{item.section}</td>
                              <td style={{textAlign:"right"}}>0</td>
                            
                              <td style={{textAlign:"right"}}>{annual_fees}</td>
                              <td style={{textAlign:"right"}}>{Monthly}</td>
                         <td style={{textAlign:"right"}}>{shortmonths.length-1 > 1 || parseInt(Moment(this.state.DefaulterByMonth).format('D')) > parseInt(this.state.fine_date) ? 
                         finemonths = finemonthscount*parseInt(this.state.defaultFine)
                         :
                         "0"
                         }</td>
                             
                             <td>  {annual_fees+Monthly+finemonths}</td>
                            </tr>
                          )
                        }
                        })
                      }
                        </tbody>
                      </table>
              </div>
            </div>
            </>
        )
    }
    
}
export default Defaulter;