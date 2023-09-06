import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import Moment from 'moment';
class SessionCreation extends React.Component{
       
constructor(props){
    super(props)
    this.state={
        from:'',
        to:'',
        session_code:'',
        AllSession:[],  
    }
}
componentDidMount(){
    this.getSession()
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
checkValidation = () => {
    if (this.state.from === "") {
        this.setState({fromErrorMessage: "Please Choose Start Date"})
        return false
    }else if (this.state.to === "") {
        this.setState({toErrorMessage: "Please Choose End Date"})
        return false
    }else {
        return true
    }
  }
  deleteSession = (id) => {
    const apiUrl = 'http://144.91.110.221:4800/deleteSession';
    fetch(apiUrl, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method:'delete',  
      body:JSON.stringify({_id:id})
    })
    .then((response) => response.json())
    .then((res) => {
    alert("Session Deleted Successfully")
    this.getSession()
      
    })
  }
submitSessionData = () => {
    if(this.checkValidation()){
    const data = new FormData()
    data.append('from', Moment(this.state.from).format('DD-MM-YYYY'))
    data.append('to', Moment(this.state.to).format('DD-MM-YYYY'))
    data.append('session_code',this.state.session_code)
    data.append('school_id',"100")
    const url = "http://144.91.110.221:4800/StoreSession"
    fetch(url, {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            alert("Session Created Successfully")     
            this.getSession()           
        })
        .then(err => {})
    }
}
setsession_code =async()=>{
    await console.log("wait wait")
    this.setState({session_code:Moment(this.state.from).format("YYYY")+"-"+Moment(this.state.to).format("YYYY")})
}
    render(){
        const data =[];
        {this.state.AllSession.map((item,index)=>{
        data.push( {"sr_no":index+1,"session":item.session_code,"from":item.from,"to":item.to,"action":<button onClick={() => {if(window.confirm('Are You Sure?')){this.deleteSession(item._id)};}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Session", data: "session" },
            { title: "From", data: "from" },
            { title: 'to',data: "to"},
            { title: 'Action',data: "action"},
          ];
        
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-12">
                    <div className="form-row">
                        <div className="col-6 form-group">
                            <label>Session From *</label>
                            <input type="date" className="form-control" onChange={(e)=>{{this.setState({from:e.target.value.toUpperCase(),fromErrorMessage:undefined});this.setsession_code()}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.fromErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Session To *</label>
                            <input type="date" className="form-control" onChange={(e)=>{{this.setState({to:e.target.value.toUpperCase(),toErrorMessage:undefined});this.setsession_code()}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.toErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group sjs-form-group"> 
                            <label>Session code</label>
                            <input type="text" className="form-control" value={this.state.session_code}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.toErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitSessionData()}}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className= "row layoutCard">
                <div className="col-12">
                <DataTable
                data={data}
                columns={columns}
                striped={true}
                hover={true}
                responsive={true}
                onClickRow={click}
                />
                </div>
            </div>
            </>
        )
    }
    
}
export default SessionCreation;