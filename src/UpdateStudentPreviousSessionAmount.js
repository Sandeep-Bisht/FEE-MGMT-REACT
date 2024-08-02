import React from 'react';
// import DataTable from '@bit/adeoy.utils.data-table';
class UpdateStudentPreviousSessionAmount extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            bank:'',
            updateBtn:'',
            admission_no:'',
            session:'2020-2021',
            TotalPreviousBalance:0,
            AllSession:[]
        }
    }
    componentDidMount(){
        this.getSession()
    }
    getSession = () => {
      fetch("http://localhost:4800/getSession"
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
    GetData = (admission_no) => {
      this.setState({TotalPreviousBalance:0,name:'',account_no:''})
        fetch("http://localhost:4800/GetDefaulterMoneySingleStudent"
        , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            admission_no: admission_no,
            session:this.state.session
          })
        })
            .then(res => res.json())
            .then(async(data) => {
                // console.log(data)
                if(data != undefined){
                this.setState({_id:data._id,TotalPreviousBalance:parseInt(data.TotalPreviousBalance)*-1,account_no:data.account_no,name:data.name,})
                }
            })
            .catch(err => console.log(err))
    }
   
    UpdateSpeceficPreviousSessionAmount = () => {
        // if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id', this.state._id)        
        data.append('name', this.state.name)
        data.append('TotalPreviousBalance', parseInt(this.state.TotalPreviousBalance)*-1)
        const url = "http://localhost:4800/UpdateSpeceficPreviousSessionAmount"
        fetch(url, {
                method: 'put',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Updated Successfully") 
                // this.GetData()   
                this.setState({admission_no:'',TotalPreviousBalance:'',account_no:'',name:''})            
            })
            .catch(err => {})
        // }
    }
    render(){
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
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
                            <label> Admission No</label>
                            <input type="text" className="form-control" value={this.state.admission_no} onChange={(e)=>{{this.setState({admission_no:e.target.value.toUpperCase()});this.GetData(e.target.value)}}}/>
                        </div>
                        {/* <div className="col-3 form-group">
                            <label> account_no </label>
                            <input type="text" className="form-control" value={this.state.account_no} onChange={(e)=>{{this.setState({account_no:e.target.value.toUpperCase()})}}} readOnly/>
                        </div> */}
                        <div className="col-3 form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={(e)=>{{this.setState({name:e.target.value.toUpperCase()})}}} readOnly/>
                        </div>
                        <div className="col-3 form-group">
                            <label> Dues(-)/Surplus</label>
                            <input type="text" className="form-control" value={this.state.TotalPreviousBalance} onChange={(e)=>{{this.setState({TotalPreviousBalance:e.target.value})}}}/>
                        </div>
                        <div className="col-12 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" style={{float:"right"}} onClick={()=>{this.UpdateSpeceficPreviousSessionAmount()}}>Update</button>
                        {/* {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.UpdateBankData(e)}>Update</button>
                        :null
                        } */}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default UpdateStudentPreviousSessionAmount;