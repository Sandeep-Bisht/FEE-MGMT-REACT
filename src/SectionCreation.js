import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
import { timers } from 'jquery';
class SectionCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            class_name:'',
            section:'',
            description:'',
            AllSection:[],
            AllClass:[],
            AllSession:[],
            updateBtn:false,
            session:localStorage.getItem('SessionAccess'),
        }
    }
    componentDidMount(){
        this.getSection()
        this.getClass()
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
          session: this.state.session,
        })
      })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllClass: data})
                this.getSection()
            })
            .then(err => console.log(err))
    }
 
    editSectionObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let class_name = obj.class_name
        let section = obj.section
        let description = obj.description
        this.setState({_id,class_name,section,description})
    }
    updateSectionData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('class_name', this.state.class_name)
        data.append('section', this.state.section)
        data.append('description',this.state.description)
        // data.append('session', this.state.session)
        data.append('school_id', "100")
        const url="http://144.91.110.221:4800/updateSection"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Class updated successfully !');
               this.getSection()
                })            
                .then(err=>console.log(err))
              }
      }
      deleteSe = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteSection';
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
        alert("Section Deleted Successfully")
        this.getSection()
          
        })
        
      }
      checkValidation = () => {
        if (this.state.class_name === "") {
            this.setState({class_nameErrorMessage: "Please Enter Class Name"})
            return false
        }else if (this.state.section === "") {
            this.setState({sectionErrorMessage: "Please Enter Section Name"})
            return false
        } else {
            return true
        }
      }
    submitSectionData = () => {
        if (this.checkDuplicateSection()) {
            if (this.checkValidation()) {
        const data = new FormData()
        data.append('class_name', this.state.class_name)
        data.append('section', this.state.section)
        data.append('description', this.state.description)
        // data.append('session', this.state.session)
        data.append('school_id', "100")
        const url = "http://144.91.110.221:4800/StoreSection"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Section Created Successfully")   
                this.getSection()             
            })
            .then(err => {})
            }
        }
    }
    checkDuplicateSection =()=>{
        var check ="valid"
        this.state.AllSection.map((item,index)=>{
            if(this.state.section.toUpperCase() ==item.section && this.state.class_name.toUpperCase() ==item.class_name){
                
               check ="not valid"
            }
        })
        if(check=="valid"){
            return true
        }
        if(check == "not valid"){
            this.setState({DuplicateSectionErrorMessage: "Section Already Exist For Class "+this.state.class_name})
            return false
        }
        
    }
    render(){
        const data =[];
        {this.state.AllSection.map((item,index)=>{
          var status ="ACTIVE"
          if(item.description =="DEACTIVE"){
          status ="DEACTIVE"
          }
        data.push( {"sr_no":index+1,"class_name":item.class_name,"section":item.section,"status":status,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editSectionObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick={() => {if(window.confirm('Are You Sure?')){this.deleteSe(item._id)};}} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Class Name", data: "class_name" },
            { title: 'Section',data: "section"},
            { title: 'Status',data: "status"},
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
                           <select className="form-control" onChange={(e)=>{this.setState({session:e.target.value.toUpperCase(),sessionErrorMessage:undefined});this.getClass();}}>
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
                            <label>Section  *</label>
                            <input type="text" className="form-control" value={this.state.section} onChange={(e)=>{{this.setState({section:e.target.value.toUpperCase(),DuplicateSectionErrorMessage:undefined,sectionErrorMessage:undefined})}}}/>
                            <span className="text-danger" style={{fontSize:'14px',fontWeight:600}}>{this.state.DuplicateSectionErrorMessage}</span>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.sectionErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Satus </label>
                            <select className="form-control" value={this.state.description} onChange={(e)=>{{this.setState({description:e.target.value.toUpperCase(),class_nameErrorMessage:undefined})}}}>
                           <option value="">ACTIVE</option>
                           <option value="DEACTIVE">DEACTIVE</option>
                           
                           </select>
                        </div>
                        
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-success mt-5" onClick={()=>{this.submitSectionData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateSectionData(e)}>Update</button>
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
export default SectionCreation;