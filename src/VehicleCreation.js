import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class VehicleCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            vehicle_no:'',
            root:'',
            root_description:'',
            driver_name:'',
            contact_no:'',
            owner_address:'',
            AllVehicle:[],
            AllVehicleType:[],
            updateBtn:false
        }
    
    }
    componentDidMount(){
        this.getVehicle()
        this.getVehicleType()
    }
    getVehicle = () => {
        fetch("http://144.91.110.221:4800/getVehicle")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllVehicle: data})
            })
            .then(err => console.log(err))
    }
    getVehicleType = () => {
        fetch("http://144.91.110.221:4800/getVehicleType")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllVehicleType: data})
            })
            .then(err => console.log(err))
    }
    editVehicleObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let vehicle_type = obj.vehicle_type
        let vehicle_no = obj.vehicle_no
        let root = obj.root
        let root_description = obj.root_description
        let driver_name = obj.driver_name
        let contact_no = obj.contact_no
        let owner_address= obj.owner_address
        this.setState({_id,vehicle_type,vehicle_no,root,root_description,driver_name,contact_no,owner_address})
    }
    updateVehicleData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('vehicle_type',this.state.vehicle_type)
        data.append('vehicle_no', this.state.vehicle_no)
        data.append('root', this.state.root)
        data.append('root_description', this.state.root_description)
        data.append('driver_name', this.state.driver_name)
        data.append('contact_no', this.state.contact_no)
        data.append('owner_address', this.state.owner_address)
        const url="http://144.91.110.221:4800/updateVehicle"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Vehicle updated successfully !');
               this.getVehicle()
                })            
                .then(err=>console.log(err))
              }
      }
      deleteVehicleType = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteVehicle';
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
        this.getVehicle()
          
        })
        
      }
      checkValidation = () => {
        if (this.state.vehicle_type === "") {
            this.setState({Vehicle_typeErrorMessage: "Please Select Vehicle Type"})
            return false
        }else if (this.state.vehicle_no === "") {
            this.setState({vehicle_noErrorMessage: "Please Enter Vehicle Number"})
            return false
        }else if (this.state.root === "") {
            this.setState({rootErrorMessage: "Please Enter Root"})
            return false
        }
        else if (this.state.driver_name === "") {
            this.setState({driver_nameErrorMessage: "Please Enter Driver Name"})
            return false
        }
        else if (this.state.contact_no === "") {
            this.setState({contact_noErrorMessage: "Please Enter Contact Number"})
            return false
        } else if (this.state.owner_address === "") {
            this.setState({owner_addressErrorMessage: "Please Enter Owner Address"})
            return false
        }
        else {
            return true
        }
      }
    submitVehicleData = () => {
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('vehicle_type', this.state.vehicle_type)
        data.append('vehicle_no', this.state.vehicle_no)
        data.append('root', this.state.root)
        data.append('root_description', this.state.root_description)
        data.append('driver_name', this.state.driver_name)
        data.append('contact_no', this.state.contact_no)
        data.append('owner_address', this.state.owner_address)
        const url = "http://144.91.110.221:4800/StoreVehicle"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Vehicle Created Successfully") 
                this.getVehicle()               
            })
            .then(err => {})
        }
    }
    render(){
        const data =[];
        {this.state.AllVehicle.map((item,index)=>{
        data.push( {"sr_no":index+1,"vehicle_type":item.vehicle_type,"vehicle_no":item.vehicle_no,"root":item.root,"root_description":item.root_description,"driver_name":item.driver_name,"contact_no":item.contact_no,"owner_address":item.owner_address,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteVehicleType(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Vehicle Type", data: "vehicle_type" },
            { title: 'Vehicle No',data: "vehicle_no"},
            { title: 'Root',data: "root"},
            { title: 'Root Description',data: "root_description"},
            { title: 'Driver Name',data: "driver_name"},
            { title: 'Contact No',data: "contact_no"},
            { title: 'Owner Address',data: "owner_address"},
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
                    <div className="col-3 form-group">
                            <label>Vehicle Type *</label>
                           <select className="form-control" value={this.state.vehicle_type} onChange={(e)=>{{this.setState({vehicle_type:e.target.value.toUpperCase(),Vehicle_typeErrorMessage:undefined})}}}>
                               <option value="">Select Vehicle</option>
                             {this.state.AllVehicleType.map((item,index)=>{
                                 return(
                                    <option value={item.vehicle_type}>{item.vehicle_type}</option>
                                 )
                             })}
                        
                           </select>
                           <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.Vehicle_typeErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Vehicle No  *</label>
                            <input type="text" value={this.state.vehicle_no} className="form-control" onChange={(e)=>{{this.setState({vehicle_no:e.target.value.toUpperCase(),vehicle_noErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.vehicle_noErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Root  *</label>
                            <input type="text"value={this.state.root} className="form-control" onChange={(e)=>{{this.setState({root:e.target.value.toUpperCase(),rootErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.rootErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Root Description</label>
                            <input type="text" value={this.state.root_description} className="form-control" onChange={(e)=>{{this.setState({root_description:e.target.value.toUpperCase()})}}} />
                        </div>
                        <div className="col-3 form-group">
                            <label>Driver Name  *</label>
                            <input type="text" value={this.state.driver_name} className="form-control" onChange={(e)=>{{this.setState({driver_name:e.target.value.toUpperCase(),driver_nameErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.driver_nameErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Cntact No  *</label>
                            <input type="text" value={this.state.contact_no} className="form-control" onChange={(e)=>{{this.setState({contact_no:e.target.value.toUpperCase(),contact_noErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.contact_noErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                            <label>Owner Address  *</label>
                            <input type="text" value={this.state.owner_address} className="form-control" onChange={(e)=>{{this.setState({owner_address:e.target.value.toUpperCase(),owner_addressErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.owner_addressErrorMessage}</span>
                        </div>
                        <div className="col-3 form-group">
                         <label> </label>
                         <button className="btn btn-success mt-5" onClick={()=>{this.submitVehicleData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateVehicleData(e)}>Update</button>
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
export default VehicleCreation;