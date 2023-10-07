import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";
import $ from 'jquery'; 
var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];
var global_class_name=''
var IdArray=[]
var StudentData=[]
class UpdateReceiptByRange extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          AllClass:[],
          class_name:'9COM',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          StudentStrenght:'',
          defaultFine:'',
          fine_date:'',
          AllSession:[],
          AllSection:[],
          section:'',
          AllSubjects:[],
          subjects:[],
          CheckedValue:false,
          UncheckedValue:false,
          FromReceiptNo:'',
          ToReceiptNo:'',
          receipt_date:'',
          bank:'',
          AllBank:[]

        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      // this.getClass()
      // this.getSection()
      this.getSession()
      this.getBankData()
      // this.getSubjects()
      // this.StudentStrenght()
    }
    getBankData = () => {
      fetch("http://144.91.110.221:4800/getBankData"
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
              console.log(data)
              this.setState({AllBank: data})
              console.log(data)
          })
          .then(err => console.log(err))
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
    // getFine = () => {
    //     fetch("http://144.91.110.221:4800/getFine")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({_id:data[0].id,category: data[0].category,fine_date:data[0].fine_date,defaultFine:data[0].amount})
    //         })
    //         .then(err => console.log(err))
    // }
    SelectSubjects = async(e) => {
      let value = Array.from(e.target.selectedOptions, option => option.value);
      await this.setState({subjects:value})
      console.log(this.state.subjects)
    }

    getSubjects = () => {
      fetch("http://144.91.110.221:4800/getSubjects")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllSubjects: data})
          })
          .then(err => console.log(err))
  }
  GetData=async()=>{
      // this.getSubjects()
    $("#getBtn").text("Please Wait...")
     this.setState({AllStudent:[]})
       fetch("http://144.91.110.221:4800/GetFeeReceiptByRange"
       ,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               session:this.state.session,
               FromReceiptNo: this.state.FromReceiptNo,
               ToReceiptNo: this.state.ToReceiptNo               
           })
       })
       .then((data) => data.json())
       .then(async (data) => {  
        if(data[0] != undefined){
               this.setState({AllStudent:data})
               $("#getBtn").text("Get Data")
        }
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
                 $("#getBtn").text("Get Data")
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
 CheckAll=async()=>{
  IdArray=[]
  StudentData=[]
   this.state.AllStudent.map((item,index)=>{
    if(parseInt(item.receipt_no) >= parseInt(this.state.FromReceiptNo) && parseInt(item.receipt_no) <= parseInt(this.state.ToReceiptNo) ){
    IdArray.push(item._id)
    }
   })
   var AllStudent=this.state.AllStudent
   await this.setState({CheckedValue:true,UncheckedValue:false,AllStudent:[]})
   await this.setState({AllStudent:AllStudent})
   console.log("student data"+JSON.stringify(IdArray))
 }
 UnCheckAll=async()=>{
  StudentData=[]
  IdArray=[]
  var AllStudent=this.state.AllStudent
  await this.setState({UncheckedValue:true,CheckedValue:false,AllStudent:[]})
  await this.setState({AllStudent:AllStudent})
}
//  SelectSubjects = async(e) => {
//   let value = Array.from(e.target.selectedOptions, option => option.value);
//   await this.setState({subjects:value})
//   console.log(this.state.subjects)
//   StudentData.map((item,index)=>{
// item.subjects=JSON.stringify(value)
//   })
// }
 setStudent=(item,e)=>{ 
  if(e.target.checked ==true){
  StudentData.push({"subjects":JSON.stringify(this.state.subjects)})
  IdArray.push(item._id)
  
  this.setState({dummy:true})
}
  if (!e.target.checked) {

    for (var i = 0; i < StudentData.length; i++) {
        // console.log(this.state.AddOn[i].id +"<br>"+ item._id);
        if (StudentData[i].admission_no === item.admission_no) {
          StudentData.splice(i, 1);
        }
    }
    console.log(IdArray.length);
    for (var j = 0; j < IdArray.length; j++) {
      console.log("j  "+item._id);
      if (IdArray[j] === item._id) {
        console.log(" single  " + IdArray[j] +"  id  "+item._id)
        IdArray.splice(j, 1);
      }
  }
}
  console.log("student data"+JSON.stringify(IdArray))

}
UpdateFeeReceiptByRange(item) {
  const data = new FormData()
  data.append('IdArray', JSON.stringify(IdArray))
  data.append('bank',this.state.bank)
  data.append('receipt_date',this.state.receipt_date)
  const url = "http://144.91.110.221:4800/UpdateFeeReceiptByRange"
  fetch(url,
      {
          method: 'PATCH',
          // headers: {
          //   Accept: 'application/json',
          //   'Content-Type': 'application/json'
          // },
          body: data
      })
      .then(res => res.json())
      .then((res) => {
        this.setState({ CheckedValue:false,UncheckedValue:false})
          // this.getSubjects()
          // this.StudentStrenght()
          
          alert("updated Successfully :)")
      })
      .then(err => console.log(err))
}
printDefaulter() {
  window.print();
}    
    render(){
        const data =[];
        // {this.state.AllStudent.map((item,index)=>{
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
                      <select value={this.state.session} className="form-control" onChange={(e)=>{{this.  setState({session:e.target.value.toUpperCase()})}}}> 
                                    <option value="">All Session</option>
                                      {this.state.AllSession.map((item,index)=>{
                                          return(
                                            <option value={item.session_code}>{item.session_code}</option>
                                          )
                                      })}
                      </select> 
                </div>
               
                <div className="col-3 form-group">
                        <label>From *</label>
                        <input type="text" className="form-control"  onChange={(e)=>{this.setState({FromReceiptNo:e.target.value})}}/>
                </div>
                <div className="col-3 form-group">
                        <label>To *</label>
                        <input type="text" className="form-control"  onChange={(e)=>{this.setState({ToReceiptNo:e.target.value})}}/>
                </div>
                <div className="col-3 form-group d-flex align-items-end">
                  <br/>
                  <button className="btn btn-success" id="getBtn" onClick={()=>{this.GetData()}}>Get Data</button>
                </div>
                <div className="col-3">
                    <label>Bank</label>
                    <select  className="form-control" onChange={(e)=>{this.setState({bank:e.target.value.toUpperCase()});}} value={this.state.bank}  >
                                        <option value="">Choose Bank</option>
                                       {this.state.AllBank.map((item,index)=>{
                                           return(
                                            <option value={item.bank}>{item.bank}</option>
                                           )
                                       })}
                    </select> 
                </div>
                <div className="col-4 form-group">
                                    <label id="recpddate">Receipt Date </label>
                                    <input type="date" className="w-100 form-control" value={this.state.receipt_date} onChange={(e)=>{this.setState({receipt_date:e.target.value.toUpperCase()})}} />
                </div>  
                <div className="col-6 form-group">
                  <br/>
                  <button className="btn btn-primary mr-1" onClick={()=>{this.CheckAll()}}>Check All</button>
                  <button className="btn btn-danger mr-1" onClick={()=>{this.UnCheckAll()}}>Uncheck All</button>
                  
                  
                </div>

                <div className="col-6 form-group">
                <br/>
                <button className="btn btn-success mr-1" onClick={()=>{this.UpdateFeeReceiptByRange()}}>Update Data</button>
                </div>
                
              </div>
            <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                  <h4>{this.state.session}</h4>
                </div>
                <div className="col-12 text-center">
                  <h4 className="pb-5">Update Bank Or Date </h4>
                </div>
              <div className="col-12 ">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Receipt No</th>
                            <th scope="col">Select</th>
                            <th scope="col">Admn </th>
                            <th scope="col">Accn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Bank</th>
                            <th scope="col">Transection date</th>
                            <th scope="col">Total Paid</th>
                            
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        <tbody>
                        
                        {
                        this.state.AllStudent.sort((a,b) => parseInt(a.receipt_no) - parseInt(b.receipt_no)).map((item,index)=>{
                          if(parseInt(item.receipt_no) >= parseInt(this.state.FromReceiptNo) && parseInt(item.receipt_no) <= parseInt(this.state.ToReceiptNo) ){
                            return(
                              <tr>
                                <td>{item.receipt_no}</td>
                                <td><input type="checkbox" className="form-control m-0" defaultChecked={this.state.CheckedValue} onChange={(e)=>{this.setStudent(item,e)}}   /></td>
                                <td>{item.admission_no}</td>
                                <td>{item.account_no}</td>
                                <td>{item.name}</td>
                                <td>{item.bank}</td>
                                <td>{Moment(item.receipt_date).format("DD-MM-YYYY")}</td>
                                <td>{item.paid_amount}</td>
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
export default UpdateReceiptByRange;