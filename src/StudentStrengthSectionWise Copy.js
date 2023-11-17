import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";

var paidamountbydate=0
var paidamountbyclass=0
var defaulterList =[];

var global_class_name=''
var Mmale =0
var Ffemale =0
class StudentStrengthSectionWise extends React.Component{
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
          .catch(err => console.log(err))
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
          .catch(err => console.log(err))
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
               this.setState({AllStudent:data})
            //    this.setBalance()
               if(data[0] == undefined){
                 alert("No Result Found")
               }
       })
       .catch(err => console.log(err))
    }
    getClass = () => {
      fetch("http://144.91.110.221:4800/getClass")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllClass: data})
          })
          .catch(err => console.log(err))
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
     .catch(err => console.log(err))
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
            ["ADMISSION NO","ACCOUNT NO","SECURITY NO","STUDENT","CLASS NAME","HOUSE","GENDER","DOA","DOB","FATHER NAME","MOTHER NAME","ADDRESS","MOBILE","FEE CONCESSION"]
          ];
          {this.state.AllStudent.map((item,ind)=>{
            csvData.push( [item.admission_no,item.account_no,item.student.security_no,item.student.name,item.class_name+"-"+item.section,item.student.house,item.student.gender,item.student.date_of_admission,item.student.dob,item.student.father_name,item.student.mother_name,item.student.parent_address,item.student.parent_mobile+item.student.parent_phone,item.student.fee_concession])
          // })}
          })
          }
          Mmale=0
          Ffemale=0
        return(
            <>
            <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                <h4 className="w-100" style={{position:"relative"}}>{this.state.session} <span style={{float:"right"}}><button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button></span></h4>
                </div>
                <div className="col-12 text-center">
                  <h4>TOTAL STRENGTH (SECTION WISE)</h4>
                </div>
              <div className="col-12 ">
                        {/* <DataTable
                        data={data}
                        columns={columns}
                        striped={true}
                        hover={true}
                        responsive={true}
                         /> */}
                         {this.state.AllStudent != "" ?
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Class</th>
                            <th scope="col">Section</th>
                            <th scope="col">boys</th>
                            <th scope="col">girls</th>
                            <th scope="col">total</th>

                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>
                        <tbody>
                         {
                         this.state.AllStudent.map((item,index)=>{
                          if(item.class_name == "PRE-NUR" && item.section ==''){
                            if(item.student.sex =="MALE"){
                              Mmale=Mmale+1
                             }else if(item.student.sex =="FEMALE"){
                              Ffemale = Ffemale+1
                             }
                            
                          }
                          // if(itemm.class_name==item.class_name ){
                          //   if(item.student.sex =="MALE"){
                          //    TotalMale=TotalMale+1
                          //   }else if(item.student.sex =="FEMALE"){
                          //    TotalFemale = TotalFemale+1
                          //   }
                          // }else{
                          //   TotalMale = 0
                          //   TotalFemale = 0
                          // }
                      })
                    }
                              <tr>
                              <td>PRE-NUR</td>
                              <td></td>
                              <td> {Mmale}</td>
                              <td>{Ffemale}</td>
                              <td>{Mmale+Ffemale}</td>
                              </tr>


                        {this.state.AllSection.map((itemm,indexx)=>{
                          var Male =0
                          var Female =0
                          // var PreviousClass =itemm.class_name
                          // var TotalMale =0
                          // var TotalFemale =0
                        this.state.AllStudent.map((item,index)=>{
                         if(itemm.class_name==item.class_name && itemm.section==item.section ){
                           if(item.student.sex =="MALE"){
                            Male=Male+1
                           }else if(item.student.sex =="FEMALE"){
                            Female = Female+1
                           }
                          }
                          // if(itemm.class_name==item.class_name ){
                          //   if(item.student.sex =="MALE"){
                          //    TotalMale=TotalMale+1
                          //   }else if(item.student.sex =="FEMALE"){
                          //    TotalFemale = TotalFemale+1
                          //   }
                          // }else{
                          //   TotalMale = 0
                          //   TotalFemale = 0
                          // }
                        })
                        if(Male+Female > 0){
                        return(
                        <tr>
                        <td>{itemm.class_name}</td>
                        <td>{itemm.section}</td>
                        <td> {Male}</td>
                        <td>{Female}</td>
                        <td>{Male+Female}</td>
                        {/* <td>{TotalMale}</td>
                        <td>{TotalFemale}</td> */}
                      </tr>
                          )
                        }
                      })
                    }
                      
                         
                        </tbody>
                      </table>
                      :
                      <lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_uilaciwr.json"  background="transparent"  speed="1"  style={{width: "300px", height: "300px",margin:"auto"}}  loop  autoplay></lottie-player>
                    }
                      <div className= "row ">
                        <div className="col-12 text-center">
                          <h4 className="text-center">TOTAL</h4>
                        </div>
                      </div>
                      <table class="table table-striped">
                        <thead>
                       
                          <tr>
                          <th>Class</th>
                          <th>Boys</th>
                          <th>Female</th>
                          <th>Total</th>
                          </tr>
                        </thead>
                      <tbody>
                      {this.state.AllClass.map((itemm,indexx)=>{
                         var Male =0
                         var Female =0
                         this.state.AllStudent.map((item,index)=>{
                         if(itemm.class_name==item.class_name ){
                           if(item.student.sex =="MALE"){
                            Male=Male+1
                           }else if(item.student.sex =="FEMALE"){
                            Female = Female+1
                           }
                          }
                        })
                        return(
                          <tr>
                            <td>{itemm.class_name}</td>
                            <td>{Male}</td>
                            <td>{Female}</td>
                            <td>{Male+Female}</td>
                          </tr>
                        )
                        })}
                        
                      </tbody>
                      </table>
              </div>
            </div>
            </>
        )
    }
    
}
export default StudentStrengthSectionWise;