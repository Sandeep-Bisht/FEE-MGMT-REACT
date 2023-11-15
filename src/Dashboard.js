import React from 'react';
import './Style.css';
import { Chart } from "react-google-charts";
import moment from 'moment';
var paidamountbydate=0
var paidamountbydate_sbi=0
var paidamountbydate_pnb=0
let ActiveSection =0
class Dashboard extends React.Component{
  constructor (props){
    super(props)
    this.state={
      AllClass:'',
      AllSection:'',
      AllStudentcount:'',
      Bank:'',
      VoucherDate:moment().format("YYYY-MM-DD"),
      // VoucherDate:"2021-04-16",
      voucher_by_date:[],
      voucher_by_date_pnb:[],
      voucher_by_date_sbi:[],
      SuspiciousVoucherByDate:'',
      session:localStorage.getItem('SessionAccess'),
    }
  }
  componentDidMount(){
    // this.getClass()
    this.getSection()
    this.getStudent()
    this.SuspiciousVoucherByDate()
    this.VoucherByDate()
    this.VoucherByDate_pnb()
    this.VoucherByDate_sbi()
  }
  VoucherByDate = async () => {
    paidamountbydate=0
    await console.log("wait")
    this.setState({ voucher_by_date: [] })
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        console.log("data ki length "+data.lenght)
        console.log("data "+data)
        this.setState({ voucher_by_date: data })
      }).catch((error)=>console.log(error))
  }
  VoucherByDate_pnb = async () => {
    paidamountbydate_pnb=0
    await console.log("wait")
    this.setState({ voucher_by_date_pnb: [] })
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: "PNB",
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ voucher_by_date_pnb: data})
      })
      .catch((error)=>console.log(error))
  }
  VoucherByDate_sbi = async () => {
    paidamountbydate_sbi=0
    await console.log("wait")
    this.setState({ voucher_by_date_sbi: [] })
    await console.log("wait")
    fetch("http://144.91.110.221:4800/VoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: "SBI",
          VoucherDate: this.state.VoucherDate
        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ voucher_by_date_sbi: data })
      }).catch((error)=>console.log(error))
  }
  SuspiciousVoucherByDate = async () => {

    await console.log("wait")
    this.setState({ SuspiciousVoucherByDate: 0 })
    fetch("http://144.91.110.221:4800/SuspiciousVoucherByDate"
      , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Bank: this.state.Bank,
          VoucherDate: this.state.VoucherDate

        })
      })
      .then((data) => data.json())
      .then(async (data) => {
        this.setState({ SuspiciousVoucherByDate: data.length })
       
      }).catch((error)=>console.log(error))
  }
  getClass = () => {
    fetch("http://144.91.110.221:4800/getClass")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({AllClass: data.length})
        })
        .then(err => console.log(err))
  }
  getSection = () => {
    ActiveSection=0
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
            data.map((item,index)=>{
              if(item.description ==""){
              ActiveSection= ActiveSection+1
              }
            })
            this.setState({AllSection:ActiveSection})
        })
        .catch(err => console.log(err))
}
  getStudent = () => {
    fetch("http://144.91.110.221:4800/getStudentCount"
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
            this.setState({AllStudentcount: data.count})
            
        })
        .catch(err => console.log(err))
  }
    render(){
 paidamountbydate=0
 paidamountbydate_sbi=0
 paidamountbydate_pnb=0
//  ActiveSection=0
        return(
            <>
                <div className="row mt-5">
                    <div className="col-lg-3 col-md-12">
                        <div className="dashboard-card">
                            <h4> Total Students <span><img src={require('./images/TotalStudents.png').default} style={{height:"43px"}}/></span></h4>
                            <h3>{this.state.AllStudentcount}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="dashboard-card">
                            <h4> Total Employes <span><img src={require('./images/TotalEmployes.png').default} style={{height:"43px"}}/></span></h4>
                            <h3>0</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="dashboard-card">
                            <h4> Total Class<span><img src={require('./images/TotalCourse.png').default} style={{height:"43px"}}/></span></h4>
                            <h3>{this.state.AllClass}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="dashboard-card">
                            <h4> Total Section<span><img src={require('./images/TotalBatch.png').default} style={{height:"43px"}}/></span></h4>
                            <h3>{ActiveSection}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 pt-5">
                        <div className="dashboard-card">
                            <h4> All Collection</h4>
                            {this.state.voucher_by_date.map((item, index) => {
              paidamountbydate = parseInt(paidamountbydate) + parseInt(item.paid_amount)
            })}
                            <h3>{paidamountbydate}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 pt-5">
                        <div className="dashboard-card">
                            <h4>PNB Collection</h4>
                            {this.state.voucher_by_date_pnb.map((item, index) => {
              paidamountbydate_pnb = parseInt(paidamountbydate_pnb) + parseInt(item.paid_amount)
            })}
                            <h3>{paidamountbydate_pnb}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 pt-5">
                        <div className="dashboard-card">
                            <h4> SBI Collection</h4>
                            {this.state.voucher_by_date_sbi.map((item, index) => {
              paidamountbydate_sbi = parseInt(paidamountbydate_sbi) + parseInt(item.paid_amount)
            })}
                            <h3>{paidamountbydate_sbi}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 pt-5">
                        <div className="dashboard-card">
                            <h4> Suspicious (Count)</h4>
                            <h3>{this.state.SuspiciousVoucherByDate}</h3>
                        </div>
                    </div>
                    
                </div>
                <div className="row layoutCard  p-0" style={{margin:"75px 0px"}}>
                <div className="col-lg-12 col-md-12">
                  <h3>RECENT 5 VOUCHER'S</h3>
                </div>
                  <div className="col-lg-12 col-md-12">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Mode</th>
                        <th scope="col">Admission no</th>
                        <th scope="col">Addmission Fees</th>
                        <th scope="col">Registration Fees</th>
                        <th scope="col">ANNUAL / TERMS Fees</th>
                        <th scope="col">Examination Fees</th>
                        <th scope="col">Total Paid Fees</th>
                        <th scope="col">Fine</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.voucher_by_date.reverse().map((item,index)=>{
                        if(index <5){
                          return(
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{item.payment_mode}</td>
                            <td>{item.admission_no}</td>
                            <td>{item.admission_fee}</td>
                            <td>{item.registration_fee}</td>
                            <td>{item.annual_terms_fee}</td>
                            <td>{item.examination_fee}</td>
                            <td>{item.paid_fees}</td>
                            <td>{item.fine}</td>
                            <td>{item.paid_amount}</td>
                          </tr>  
                          )
                        }
                      })}                
                    </tbody>
                  </table>
                  </div>
                </div>
                <div className="row chartRow">
    <div className="col-lg-6 col-md-12">
        <div className={"my-pretty-chart-container"}>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['x', 'Students'],
                    [0, 0],
                    [1, 10],
                    [2, 23],
                    [3, 17],
                    [4, 18],
                    [5, 9],
                    [6, 11],
                    [7, 27],
                    [8, 33],
                    [9, 40],
                    [10, 32],
                    [11, 35],
                ]}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Popularity',
                    },
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    </div>
    <div className="col-lg-6 col-md-12">
    <Chart
        width={'100%'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
            ['Task', 'Hours per Day'],
            ['SBI', paidamountbydate_sbi],
            ['PNB', paidamountbydate_pnb],
        ]}
        options={{
            title: 'Today Transaction By Bank',
        }}
        rootProps={{ 'data-testid': '3' }}
    />
</div>


</div>

            </>
        )
    }
}
export default Dashboard;