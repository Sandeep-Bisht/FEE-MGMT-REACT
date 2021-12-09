import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class FeeCategory extends React.Component{
    constructor(props){
        super(props)
        this.state={
            category:'',
            description:'',
            AllCategory:[]
        }
    }
    componentDidMount(){
      this.getFeeCategory()
    }
    checkValidation = () => {
        if (this.state.category === "") {
            this.setState({CategoryErrorMessage: "Please Enter Category Name"})
            return false
        }else {
            return true
        }
      }
    submitCategoryData = () => {
        if (this.checkValidation()) {
            const data = new FormData()
            data.append('category', this.state.category)
            data.append('description', this.state.description)
            const url = "http://144.91.110.221:4800/StoreFeeCatogory"
            fetch(url, {
                    method: 'post',
                    body: data
                })
                .then(res => res.json())
                .then(data => {
                    alert("Category Created Successfully")      
                    this.getFeeCategory()            
                })
                .then(err => {})
        }
    }
    getFeeCategory = () => {
        fetch("http://144.91.110.221:4800/getCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllCategory: data})
            })
            .then(err => console.log(err))
    }
    render(){
        const data =[];
        {this.state.AllCategory.map((item,index)=>{
        data.push( {"sr_no":index+1,"category":item.category,"description":item.description})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Category", data: "category" },
            { title: 'Description',data: "description"},
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
                            <label>Fee Category *</label>
                            <input type="text" onChange={(e)=>{{this.setState({category:e.target.value.toUpperCase(),CategoryErrorMessage:undefined})}}} className="form-control" />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.CategoryErrorMessage}</span>
                        </div>
                        <div className="col-6 form-group">
                            <label>Description</label>
                           <textarea className="form-control" onChange={(e)=>{{this.setState({description:e.target.value.toUpperCase()})}}} ></textarea>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-info mt-5" onClick={()=>{this.submitCategoryData()}}>Save</button>
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
export default FeeCategory;