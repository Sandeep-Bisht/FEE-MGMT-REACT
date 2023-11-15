import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class FeeWaiverCategory extends React.Component{
    constructor (props){
        super(props)
        this.state={
         category:'',
         AllWaiverCategory:[],
        }
    }
    componentDidMount(){
        this.getWaiverCategory()
      }
      getWaiverCategory = () => {
        fetch("http://144:91:110:210:4800/getWaiverCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllWaiverCategory: data})
            })
            .then(err => console.log(err))
    }
    submitWaiverCategoryData = () => {
        const data = new FormData()
        data.append('category', this.state.category)
        const url = "http://144:91:110:210:4800/StoreWaiverCategory"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Fee Waiver Category Created Successfully")     
                this.getWaiverCategory()           
            })
            .then(err => {})
}
    render(){
        const data =[];
        {this.state.AllWaiverCategory.map((item,index)=>{
        data.push( {"sr_no":index+1,"category":item.category})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Category", data: "category" },
          ];
        
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
            <div className="row layoutCard">
                <div className="col-6">
                    <div className="form-row">
                        <div className="col-12 form-group">
                            <label>Waiver Category *</label>
                          <input type="text" className="form-control" onChange={(e)=>{{this.setState({category:e.target.value.toUpperCase()})}}} />
                        </div>
                        
                        <div className="col-12 form-group">
                         <label> </label>
                         <button className="btn btn-info " onClick={()=>{this.submitWaiverCategoryData()}}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
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
export default FeeWaiverCategory;