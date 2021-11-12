import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import $ from 'jquery';
class ClassCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            class_name:'',
            actual_class:'',
            description:'',
            AllClass:[],
            updateBtn:false,
            AllSession:[],
            session:localStorage.getItem('SessionAccess'),
        }
    }
    componentDidMount(){
        this.getClass()
        this.getSession()
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
          // session: this.state.session,
        })
      })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllClass: data})
            })
            .then(err => console.log(err))
    }
    checkValidation = () => {
        if (this.state.class_name === "") {
            this.setState({class_nameErrorMessage: "Please Enter Class Name"})
            return false
        }else if (this.state.actual_class === "") {
            this.setState({actual_classErrorMessage: "Please Select Actual Class"})
            return false
        } else {
            return true
        }
      }
    editClassObject = (obj) => {
        $("html").scrollTop(0);
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let class_name = obj.class_name
        let actual_class = obj.actual_class
        let description = obj.description
        this.setState({_id,class_name,actual_class,description})
    }
    updateCategoryData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('class_name', this.state.class_name)
        data.append('actual_class', this.state.actual_class)
        data.append('description',this.state.description)
        data.append('session', this.state.session)
        data.append('school_id', "100")
        const url="http://144.91.110.221:4800/updateClass"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Class updated successfully !');
               this.getClass()
                })            
                .then(err=>console.log(err))
              }
      }
      deleteClass = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteClass';
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
        alert("Class Deleted Successfully")
        this.getClass()
          
        })
        
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
    submitClassData = async() => {
        await console.log("wait")
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('class_name', this.state.class_name)
        data.append('actual_class', this.state.actual_class)
        data.append('description', this.state.description)
        // data.append('session', this.state.session)
        data.append('school_id', "100")
        const url = "http://144.91.110.221:4800/StoreClass"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Class Created Successfully")    
                this.getClass()            
            }).catch(err =>{
            });
        }
            
    }
    render(){
        const data =[];
        {this.state.AllClass.map((item,index)=>{
        data.push( {"sr_no":index+1,"class_name":item.class_name,"actual_class":item.actual_class,"description":item.description,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editClassObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteClass(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Class Name", data: "class_name" },
            { title: 'Actual Class',data: "actual_class"},
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
                    {/* <div className="col-2 form-group">
                            <label>Session *</label>
                           <select className="form-control" value={this.state.session} onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getClass()}}>
                               <option value="">Select Session</option>
                              {this.state.AllSession.map((item,index)=>{
                                  return(
                                    <option value={item.session_code}>{item.session_code}</option>
                                  )
                              })}
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sessionErrorMessage}</span>
                </div> */}
                        <div className="col-3 form-group">
                            <label>Class  *</label>
                            <input type="text" value={this.state.class_name} className="form-control" onChange={(e)=>{{this.setState({class_name:e.target.value.toUpperCase(),class_nameErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.class_nameErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Actual Class</label>
                           <select className="form-control" value={this.state.actual_class} onChange={(e)=>{{this.setState({actual_class:e.target.value.toUpperCase(),actual_classErrorMessage:undefined})}}}>
                               <option value="">Select Class</option>
                               <option value="PLAY GROUP">PLAY GROUP</option>
                               <option value="NURSERY">NURSERY</option>
                               <option value="KG">KG</option>
                               <option value="1">1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                               <option value="4">4</option>
                               <option value="5">5</option>
                               <option value="6">6</option>
                               <option value="7">7</option>
                               <option value="8">8</option>
                               <option value="9">9</option>
                               <option value="10">10</option>
                               <option value="11">11</option>
                               <option value="12">12</option>
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.actual_classErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Description *</label>
                            <textarea className="form-control" value={this.state.description} onChange={(e)=>{{this.setState({description:e.target.value.toUpperCase()})}}}></textarea>
                        </div>
                        <div className="col-3 form-group">
                         <label> </label>
                         <button className="btn btn-success mt-5" onClick={()=>{this.submitClassData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateCategoryData(e)}>Update</button>
                        :null
                    }
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className= "row layoutCard">
                <div className="col-12">
                     <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Class</th>
                        <th scope="col">Actual Class</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.AllClass.map((item,index)=>{
                        return(
                        <tr>
                        <td>{index+1}</td>
                        <th >{item.class_name}</th>
                        <td>{item.actual_class}</td>
                        <td>{item.description}</td>
                        <td><button className="btn btn-secondary mr-2" onClick={() => this.editClassObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteClass(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                        </tr>
                        )
                    })}
                        
                    </tbody>
                </table>
                {/* <DataTable
                data={data}
                columns={columns}
                striped={true}
                hover={true}
                responsive={true}
                onClickRow={click}
                /> */}
                </div>
            </div>
            </>
        )
    }
    
}
export default ClassCreation;