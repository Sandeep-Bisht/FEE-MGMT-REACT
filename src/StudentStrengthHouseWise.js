import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";
var global_class_name =''
var Boy =0
var Girl =0

class StudentStrengthHouseWise extends React.Component{
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
          AllHouse:[],
          section:'',
        }
    }
    componentDidMount(){
      // this.getFeeReceipt()
      this.getHouse()
      this.getClass()
      this.getSection()
      this.getSession()
      this.StudentStrenght()
    }
    getHouse = () => {
      fetch("http://144.91.110.221:4800/getHouse")
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({AllHouse: data})
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
            ["ADMISSION NO","ACCOUNT NO","SECURITY NO","STUDENT","CLASS NAME","HOUSE","GENDER","DOA","DOB","FATHER NAME","MOTHER NAME","ADDRESS","MOBILE","FEE CONCESSION"]
          ];
          {this.state.AllStudent.map((item,ind)=>{
            csvData.push( [item.admission_no,item.account_no,item.student.security_no,item.student.name,item.class_name+"-"+item.section,item.student.house,item.student.gender,item.student.date_of_admission,item.student.dob,item.student.father_name,item.student.mother_name,item.student.parent_address,item.student.parent_mobile+item.student.parent_phone,item.student.fee_concession])
          // })}
          })
          }        
      Boy =0
       Girl =0
        return(
            <>
            <div className= "row printCard printDefaulter">
                <div className="col-12 text-center">
                  <h4 className="w-100" style={{position:"relative"}}>{this.state.session} <span style={{float:"right"}}><button className="btn btn-info ml-1" onClick={()=>{this.printDefaulter()}}>print</button></span></h4>
                </div>
                <div className="col-12 text-center">
                  <h4>TOTAL STRENGTH (HOUSE WISE)</h4>
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
                            <th scope="col">House</th>
                            <th scope="col">BOYS</th>
                            <th scope="col">GIRLS</th>
                            <th scope="col">TOTAL</th>                            
                            {/* <th scope="col">Address</th> */}
                          </tr>
                        </thead>                                                        
                        {this.state.AllSection.map((itemm,indexx)=>{
                         var GARDNER =0
                         var LYONS =0
                         var KHANNA =0
                         var HOWARD =0
                         var G_boy =0
                         var G_girl  =0
                         var L_boy =0
                         var L_girl  =0
                         var K_boy =0
                         var K_girl  =0
                         var H_boy =0
                         var H_girl  =0
                        this.state.AllStudent.map((item,index)=>{
                         if(itemm.class_name==item.class_name && itemm.section==item.section ){
                          if(item.student.house =="GARDNER" ){
                            GARDNER=GARDNER+1
                              if(item.student.sex=="MALE"){
                                G_boy=G_boy+1
                              }else{
                                G_girl =G_girl+1
                              }
                           }else if(item.student.house =="LYONS"){
                            LYONS = LYONS+1
                            if(item.student.sex=="MALE"){
                              L_boy=L_boy+1
                            }else{
                              L_girl =L_girl+1
                            }
                           }else if(item.student.house =="KHANNA"){
                            KHANNA = KHANNA+1
                            if(item.student.sex=="MALE"){
                              K_boy=K_boy+1
                            }else{
                              K_girl =K_girl+1
                            }
                           }else if(item.student.house =="HOWARD"){
                            HOWARD = HOWARD+1
                            if(item.student.sex=="MALE"){
                              H_boy=H_boy+1
                            }else{
                              H_girl =H_girl+1
                            }
                           }
                          }
                        })
                        if(GARDNER+LYONS+KHANNA+HOWARD > 0){
                        return(
                          <tbody> 
                            <tr>
                            <td colspan="20" className="text-center p-2"><h6>{itemm.class_name} / {itemm.section}</h6></td>
                            </tr>
                            <tr>
                            <td>GARDNER</td>  <td>{G_boy}</td>   <td>{G_girl}</td> <td>{GARDNER}</td> 
                            </tr>
                            <td>LYONS</td>   <td>{L_boy}</td>   <td>{L_girl}</td> <td>{LYONS}</td>
                            <tr>
                            <td>KHANNA</td> <td>{K_boy}</td>  <td>{K_girl}</td> <td>{KHANNA}</td>
                            </tr>
                            <td>HOWARD</td> <td>{H_boy}</td>  <td>{H_girl}</td>  <td>{HOWARD}</td>
                            <tr>
                            <td><strong>TOTAL</strong></td><td><strong>{G_boy+L_boy+K_boy+H_boy}</strong></td><td><strong>{G_girl+L_girl+K_girl+H_girl}</strong></td><td><strong>{GARDNER+LYONS+KHANNA+HOWARD}</strong></td>
                            </tr>
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                      </tbody>
                          )
                        }
                      })
                    }
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
                       
                      <tbody>

                      {
                           this.state.AllHouse.map((itemm,indexx)=>{
                            var house=0
                            var Male=0
                            var Female=0
                         this.state.AllStudent.map((item,index)=>{
                           
                          if(item.student.house == itemm.house_name){
                            house=house+1
                          }
                          if(item.student.sex=="MALE" && item.student.house == itemm.house_name){
                            Male=Male+1
                          }else if(item.student.sex=="FEMALE" && item.student.house == itemm.house_name){
                            Female=Female+1
                          }
                      })
                      return(
                              <tr>
                              <td><button className="btn btn-md text-white" style={{backgroundColor:itemm.color}}>{itemm.house_name}</button></td>
                              <td>{Male}</td>
                              <td>{Female}</td>
                              <td> {house}</td>
                              
                               </tr>
                      )
                  })
                }


                      {
                         this.state.AllStudent.map((item,index)=>{
                        if(item.student.sex =="MALE"){
                          Boy= Boy+1
                        }else{
                          Girl = Girl+1
                        }
                        
                       
                       })}
                         <tr>
                            <th>Total</th>
                            <th>{Boy}</th>
                            <th>{Girl}</th>
                            <th>{Boy+Girl}</th>
                          </tr>
                         
                      </tbody>
                      </table>
              </div>
            </div>
            </>
        )
    }
    
}
export default StudentStrengthHouseWise;