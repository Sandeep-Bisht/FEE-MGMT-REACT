import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class HouseCreation extends React.Component{
    constructor (props){
        super(props)
        this.state={
            _id:'',
           house_name:'',
           color:'',
           AllHouse:[],
           updateBtn:false
        }

    }
    componentDidMount(){
    this.getHouse()
    }
    getHouse = () => {
        fetch("http://144:91:110:210:4800/getHouse")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllHouse: data})
            })
            .catch(err => console.log(err))
        }
    editHouseObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let house_name = obj.house_name
        let color = obj.color
        this.setState({_id,house_name,color})
    }
    updateHouseData =()=>{
        // if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('house_name', this.state.house_name)
        data.append('color', this.state.color)
        const url="http://144:91:110:210:4800/updateHouse"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
            alert('House updated successfully !');
            this.getHouse()
                })            
                .catch(err => console.log(err))
                //   }
      }
      deleteHouse = (id) => {
        const apiUrl = 'http://144:91:110:210:4800/deleteHouse';
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
        alert("House Deleted Successfully")
        this.getHouse()
        })
        .catch(err => console.log(err))
      }
    submitHouseData = () => {
        const data = new FormData()
        data.append('house_name', this.state.house_name)
        data.append('color', this.state.color)
        const url = "http://144:91:110:210:4800/StoreHouse"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("House Created Successfully")    
                this.getHouse()              
            })
            .catch(err => console.log(err))
        }
    render(){
        const data =[];
        {this.state.AllHouse.map((item,index)=>{
        data.push( {"sr_no":index+1,"house_name":item.house_name,"color":item.color,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editHouseObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteHouse(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "House Name", data: "house_name" },
            { title: "Color", data: "color" },
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
                            <label>House *</label>
                            <input type="text" className="form-control" value={this.state.house_name} onChange={(e)=>{{this.setState({house_name:e.target.value.toUpperCase()})}}}/>
                        </div>
                        <div className="col-6 form-group">
                            <label>Color *</label>
                            <select className="form-control" value={this.state.color} onChange={(e)=>{{this.setState({color:e.target.value})}}}>
                                <option value="" className="bg-success text-white">Select Color</option>
                                <option value="GREEN" className="bg-success text-white">GREEN</option>
                                <option value="BLUE" style={{backgroundColor:'blue'}} className="text-white">BLUE</option>
                                <option value="RED" className="bg-danger text-white">RED</option>
                                <option value="YELLOW" style={{backgroundColor:'yellow'}}>YELLOW</option>
                            </select>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitHouseData()}}>Save</button>
                         {this.state.updateBtn ?
                        <button className="btn btn-secondary ml-3 mt-5" type="submit" onClick={(e) => this.updateHouseData(e)}>Update</button>
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
export default HouseCreation;