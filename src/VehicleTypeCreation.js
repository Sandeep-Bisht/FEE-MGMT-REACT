import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class VehicleTypeCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            vehicle_type:'',
            AllVehicleType:[],
            updateBtn:'',
        }
    }
    componentDidMount(){
        this.getVehicleType()
    }
    getVehicleType = () => {
        fetch("http://144.91.110.221:4800/getVehicleType")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllVehicleType: data})
            })
            .catch(err => console.log(err))
        }
    editVehicleTypeObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let vehicle_type = obj.vehicle_type
        this.setState({_id,vehicle_type})
    }
    updateVehicleTypeData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('vehicle_type',this.state.vehicle_type)
        const url="http://144.91.110.221:4800/updateVehicleType"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Vehicle Type updated successfully !');
               this.getVehicleType()
                })            
          .catch(err => console.log(err))
              }
      }
      deleteVehicleType = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteVehicleType';
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
        alert("Vehicle Type Deleted Successfully")
        this.getVehicleType()
          
        })
        .catch(err => console.log(err))
      }
      checkValidation = () => {
        if (this.state.vehicle_type === "") {
            this.setState({Vehicle_typeErrorMessage: "Please Enter Vehicle Type"})
            return false
        }else {
            return true
        }
      }
    submitVehicleTypeData = () => {
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('vehicle_type', this.state.vehicle_type)
        const url = "http://144.91.110.221:4800/StoreVehicleType"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Vehicle Type Created Successfully") 
                this.getVehicleType()               
            })
            .catch(err => console.log(err))
        }
    }
    render(){
        const data =[];
        {this.state.AllVehicleType.map((item,index)=>{
        data.push( {"sr_no":index+1,"vehicle_type":item.vehicle_type,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editVehicleTypeObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteVehicleType(item._id)}className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Vehicle Type", data: "vehicle_type" },
            { title: "Action", data: "action" },
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
                            <label>Vehicle Type *</label>
                            <input type="text" className="form-control" value={this.state.vehicle_type} onChange={(e)=>{{this.setState({vehicle_type:e.target.value.toUpperCase(),Vehicle_typeErrorMessage:undefined})}}}/>
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.Vehicle_typeErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group d-flex align-items-end">
                         <label> </label>
                         <button className="btn btn-info" onClick={()=>{this.submitVehicleTypeData()}}>Save</button>
                        {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3" type="submit" onClick={(e) => this.updateVehicleTypeData(e)}>Update</button>
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
export default VehicleTypeCreation;