import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import Switch from "react-switch";
import { CSVLink, CSVDownload } from "react-csv";

var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''

class ListOfStruckOff extends React.Component{
    constructor(props){
        super(props)
        this.state={
          AllStudent:[],
          AllClass:[],
          class_name:'',
          session:localStorage.getItem('SessionAccess'),
          Allfees:[],
          StudentStrenght:'',
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
    StudentStrenght=async()=>{
     this.setState({AllStudent:[]})
       fetch("http://144.91.110.221:4800/SosStudentList"
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
               this.setState({AllStudent:data})
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
               }
       })
    }
    updateStruckOff =async(item)=>{
        await console.log("wait wait")
        fetch("http://144.91.110.221:4800/RecoverFromTc"
        ,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: this.state.session,
          admission_no:item.admission_no,
          account_no:item.account_no,
          student_id:item.student._id,
          academic_id:item.academic_id,
          tc_status:'0',
          _id:item._id
        })
      })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert("Recover Sucessfully !")
                this.StudentStrenght()
            })
            .then(err => console.log(err))
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
          const csvData = [
            ["ADMISSION NO","ACCOUNT NO","SECURITY NO","STUDENT","CLASS NAME","HOUSE","GENDER","DOA","DOB","FATHER NAME","MOTHER NAME","ADDRESS","MOBILE","PHONE","FEE CONCESSION"]
          ];
          {this.state.AllStudent.map((item,ind)=>{
            var concession 
            if(item.student.fee_concession ==""){
              concession =0
            }else{
              concession=item.student.fee_concession
            }
            csvData.push( [item.admission_no,item.account_no,item.student.security_no,item.student.name,item.class_name+"-"+item.section,item.student.house,item.student.sex,item.student.date_of_admission,item.student.dob,item.student.father_name,item.student.mother_name,item.student.parent_address,item.student.parent_mobile,item.student.parent_phone,concession])
          // })}
          })
          }
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
                  <button className="btn btn-primary mr-1"><CSVLink filename={"StudentData.csv"} data={csvData}>CSV</CSVLink></button>
                  <button className="btn btn-success" onClick={()=>{this.StudentStrenght()}}>Get Students</button>
                  <button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button>
                </div>
              </div>
            <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                  <h4>{this.state.session}</h4>
                </div>
                <div className="col-12 text-center">
                  <h4 className="pb-5">StruckOff Students List</h4>
                </div>
              <div className="col-12 ">
                        <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                         />
                         {this.state.AllStudent != "" ?
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">SrNo</th>
                            <th scope="col"> Admn </th>
                            <th scope="col"> Accn </th>
                            <th scope="col">Student</th>
                            <th scope="col">Parents</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Gen </th>
                            <th scope="col">Class</th>
                            <th scope="col">DOA</th>
                            <th scope="col">DOB</th>
                            <th scope="col">Reason of StruckOff</th>
                            <th scope="col">Action</th>
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.AllStudent.sort((a,b) => parseInt(a.admission_no) - parseInt(b.admission_no)).map((item,index)=>{
                            return(
                              <tr>
                                <td>{index+1}</td>
                                <td>{item.admission_no}</td>
                                <td>{item.account_no}</td>
                                <td>{item.student.name}</td>
                                <td>{item.student.father_name} / <br/>{item.student.mother_name}</td>
                                <td>{item.student.parent_mobile}</td>
                                <td style={{width:'1ch'}}> {item.student.sex.slice(0,1)}</td>
                                <td>{item.class_name}-{item.section}</td>
                                <td>{Moment(item.student.date_of_admission).format("DD-MM-YY")}</td>
                                <td>{Moment(item.student.dob).format("DD-MM-YY")}</td>
                                <td>{item.reason}</td>
                                <td><button className="btn btn-success mr-2" onClick={() => {if(window.confirm('Are You Sure?')){this.updateStruckOff(item)};}}><i class="fas fa-user-slash"></i></button></td>
                                {/* <td>{item.student.parent_address}</td> */}
                              </tr>
                            )
                         
                        })
                        }
                      
                         
                        </tbody>
                      </table>
                      :
                      null
                      // <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                    }
              </div>
            </div>
            </>
        )
    }
    
}
export default ListOfStruckOff;