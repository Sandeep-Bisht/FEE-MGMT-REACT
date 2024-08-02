import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class SubjectCreation extends React.Component{constructor (props){
    super(props)
    this.state={
        _id:'',
        class_name:'',
        subject:'',
        subject_code:'',
        board_code:'',
        order_no:'',
        description:'',
        AllClass:[],
        AllSession:[],
        AllSubjects:[],
        updateBtn:false,
        session:localStorage.getItem('SessionAccess'),
    }

}
componentDidMount(){
    this.getSession()
    this.getClass()
    this.getSubjects()
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
getSection = () => {
    fetch("http://localhost:4800/getSection"
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
getClass = async() => {
    this.getSubjects()
    await console.log("wait wait")
    fetch("http://localhost:4800/getClass"
    ,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      school_id: "UT015",
      session: this.state.session,
    })
  })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({AllClass: data})
            this.getSection()
        })
        .catch(err => console.log(err))
    }
getSubjects = async(e) => {
  await console.log("wait")
  fetch("http://localhost:4800/getSubjects")
      .then(res => res.json())
      .then(data => {
          console.log(data)
          this.setState({AllSubjects: data})
      })
      .catch(err => console.log(err))
    }
editSubjectObject = (obj) => {
    this.setState({updateBtn:true})
    let _id   =   obj._id
    let class_name = obj.class_name
    let subject = obj.subject
    let subject_code = obj.subject_code
    let board_code = obj.board_code
    let order_no = obj.order_no
    let description = obj.description
    this.setState({_id,class_name,subject,subject_code,board_code,order_no,description})
}
updateSubjectData =()=>{
    if (this.checkValidation()) {
    const data = new FormData()
    data.append('_id',this.state._id)
    data.append('class_name', this.state.class_name)
    data.append('subject', this.state.subject)
    data.append('subject_code', this.state.subject_code)
    data.append('board_code', this.state.board_code)
    data.append('order_no', this.state.order_no)
    data.append('description', this.state.description)
    data.append('session', this.state.session)
    data.append('school_id', "UT015")
    const url="http://localhost:4800/updateSubject"
            fetch(url,
                {
                method:'put',
                body:data
            })
            .then(res => res.json())              
            .then((res)=>{  
        alert('Subject updated successfully !');
        this.getSubjects()
            })            
            .catch(err => console.log(err))
        }
  }
  deleteSubject = (id) => {
    const apiUrl = 'http://localhost:4800/deleteSubject';
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
    alert("Vehicle Deleted Successfully")
    this.getSubjects()
    })
    .catch(err => console.log(err))
  }
  checkValidation = () => {
    if (this.state.class_name === "") {
        this.setState({class_nameErrorMessage: "Please Select Class Name"})
        return false
    }else if (this.state.subject === "") {
        this.setState({subjectErrorMessage: "Please Enter Subject Name"})
        return false
    }else if (this.state.subject_code === "") {
        this.setState({subject_codeErrorMessage: "Please Enter Subject Code"})
        return false
    }else {
        return true
    }
  }
submitSubjectData = () => {
    if (this.checkValidation()) {
    const data = new FormData()
    data.append('class_name', this.state.class_name)
    data.append('subject', this.state.subject)
    data.append('subject_code', this.state.subject_code)
    data.append('board_code', this.state.board_code)
    data.append('order_no', this.state.order_no)
    data.append('description', this.state.description)
    data.append('session', this.state.session)
    data.append('school_id', "UT015")
    const url = "http://localhost:4800/StoreSubject"
    fetch(url, {
            method: 'post',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            alert("Subject Created Successfully")  
            this.getSubjects()                
        })
        .catch(err => console.log(err))
    }
}
    render(){
        const data =[];
        {this.state.AllSubjects.map((item,index)=>{
        data.push( {"sr_no":index+1,"class_name":item.class_name,"subject":item.subject,"subject_code":item.subject_code,"board_code":item.board_code,"order_no":item.order_no,"description":item.description,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editSubjectObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteSubject(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Class Name", data: "class_name" },
            { title: 'Subject',data: "subject"},
            { title: 'Subject Code',data: "subject_code"},
            { title: 'Board Code',data: "board_code"},
            { title: 'Order No',data: "order_no"},
            { title: 'Description',data: "description"},
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
                        {/* <div className="col-6 form-group">
                                <label>Session *</label>
                            <select className="form-control" onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getClass()}}>
                                <option value="">Select Session</option>
                                {this.state.AllSession.map((item,index)=>{
                                    return(
                                        <option value={item.session_code}>{item.session_code}</option>
                                    )
                                })}
                            </select>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
                        </div> */}
                        <div className="col-6 form-group">
                            <label>Class *</label>
                           <select className="form-control" value={this.state.class_name} onChange={(e)=>{{this.setState({class_name:e.target.value.toUpperCase(),class_nameErrorMessage:undefined})}}}>
                           <option value="">Select Class</option>
                           {this.state.AllClass.map((item,index)=>{
                                 return(
                                    <option value={item.class_name}>{item.class_name}</option>
                                 )
                             })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Subject *</label>
                            <input type="text" value={this.state.subject} className="form-control" onChange={(e)=>{{this.setState({subject:e.target.value.toUpperCase(),subjectErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.subjectErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Subject Code*</label>
                            <input type="text" value={this.state.subject_code} className="form-control" onChange={(e)=>{{this.setState({subject_code:e.target.value.toUpperCase(),subject_codeErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.subject_codeErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Board Code</label>
                            <input type="text" value={this.state.board_code} className="form-control" onChange={(e)=>{{this.setState({board_code:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-6 form-group">
                            <label>Order No </label>
                            <input type="text" value={this.state.order_no} className="form-control" onChange={(e)=>{{this.setState({order_no:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-6 form-group">
                            <label>Description </label>
                            <textarea className="form-control" value={this.state.description} onChange={(e)=>{{this.setState({description:e.target.value.toUpperCase()})}}}></textarea>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitSubjectData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateSubjectData(e)}>Update</button>
                        :null
                        }
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
export default SubjectCreation;