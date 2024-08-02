import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class CategoryCreation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            _id:'',
            category:'',
            description:'',
            AllCategory:[],
            updateBtn:false
        }
    }
    componentDidMount=()=>{
        this.getCategory()
    }
    getCategory = () => {
        fetch("http://144.91.110.221:4800/getCastCategory")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllCategory: data})
            })
            .catch(err => console.log(err))
        }
    editCategoryObject = (obj) => {
        this.setState({updateBtn:true})
        let _id   =   obj._id
        let category = obj.category
        let description = obj.description
        this.setState({_id,category,description})
    }
    updateCategoryData =()=>{
        if (this.checkValidation()) {
        const data = new FormData()
        data.append('_id',this.state._id)
        data.append('category', this.state.category)
        data.append('description',this.state.description)
        const url="http://144.91.110.221:4800/updateCategory"
                fetch(url,
                    {
                    method:'put',
                    body:data
                })
                .then(res => res.json())              
                .then((res)=>{  
               alert('Category updated successfully !');
               this.getCategory()
                })            
                .catch(err => console.log(err))
            }
      }
      deleteCategory = (id) => {
        const apiUrl = 'http://144.91.110.221:4800/deleteCategory';
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
        alert("Category Deleted Successfully")
        this.getCategory()
        })
        .catch(err => console.log(err))
        
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
        const url = "http://144.91.110.221:4800/StoreCategory"
        fetch(url, {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                alert("Category Created Successfully") 
                this.getCategory()               
            })
            .catch(err => console.log(err))
        }
    }
    
    render(){
        const data =[];
        {this.state.AllCategory.map((item,index)=>{
        data.push( {"sr_no":index+1,"category":item.category,"description":item.description,"action":<td><button className="btn btn-secondary mr-2" onClick={() => this.editCategoryObject(item)}><i class="fas fa-pencil-alt"></i></button><button onClick = { () => this.deleteCategory(item._id)} className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button></td>})})}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: "Category", data: "category" },
            { title: "Descrition", data: "description" },
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
                            <label>Category *</label>
                            <input type="text" className="form-control" value={this.state.category} onChange={(e)=>{{this.setState({category:e.target.value.toUpperCase(),CategoryErrorMessage:undefined})}}} />
                            <span className="errorMessage" style={{fontSize:'14px',fontWeight:600}}>{this.state.CategoryErrorMessage}</span>
                       </div>
                        <div className="col-6 form-group">
                            <label>Description </label>
                            <textarea className="form-control" value={this.state.description} onChange={(e)=>{{this.setState({description:e.target.value.toUpperCase()})}}}></textarea>
                        </div>
                        <div className="col-6 form-group">
                         <label> </label>
                         <button className="btn btn-success mt-5" onClick={()=>{this.submitCategoryData()}}>Save</button>
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
export default CategoryCreation;