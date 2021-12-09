import React from 'react';
import DataTable from '@bit/adeoy.utils.data-table';
class ParentCreation extends React.Component{
    constructor (props){
        super(props)
        this.state={
           account_no:'',
           father_name:'',
           mother_name:'',
           father_occu:'',
           father_designation:'',
           father_annual_income:'',
           mother_occu:'',
           mother_designation:'',
           mother_annual_income:'',
           parent_address:'',
           parent_city:'',
           parent_state:'',
           parent_country:'',
           parent_phone:'',
           parent_mobile:'',

           gaurdian_name:'',
           gaurdian_occu:'',
           gaurdian_designation:'',
           gaurdian_annual_income:'',
           gaurdian_address:'',
           gaurdian_city:'',
           gaurdian_state:'',
           gaurdian_country:'',
           gaurdian_phone:'',
           gaurdian_mobile:'',
           image:'',

           AllStudent:[],
        }
    }
    componentDidMount(){
        this.getStudent()
    }
    getStudent = () => {
        fetch("http://144.91.110.221:4800/getStudent")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({AllStudent: data})
            })
            .then(err => console.log(err))
    }
    // getParent = () => {
    //     fetch("http://144.91.110.221:4800/getParent")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //             this.setState({AllParent: data})
    //         })
    //         .then(err => console.log(err))
    // }
//     submitParentData = () => {
//         const data = new FormData()
//         data.append('account_no', this.state.account_no)
//         data.append('father_name', this.state.father_name)
//         data.append('mother_name', this.state.mother_name)
//         data.append('father_occu', this.state.father_occu)
//         data.append('father_designation', this.state.father_designation)
//         data.append('father_annual_income', this.state.father_annual_income)
//         data.append('mother_occu', this.state.mother_occu)
//         data.append('mother_designation', this.state.mother_designation)
//         data.append('mother_annual_income', this.state.mother_annual_income)
//         data.append('parent_address', this.state.parent_address)
//         data.append('parent_city', this.state.parent_city)
//         data.append('parent_state', this.state.parent_state)
//         data.append('parent_country', this.state.parent_country)
//         data.append('parent_phone', this.state.parent_phone)
//         data.append('parent_mobile', this.state.parent_mobile)

//         data.append('gaurdian_name', this.state.gaurdian_name)
//         data.append('gaurdian_occu', this.state.gaurdian_occu)
//         data.append('gaurdian_designation', this.state.gaurdian_designation)
//         data.append('gaurdian_annual_income', this.state.gaurdian_annual_income)
//         data.append('gaurdian_address', this.state.gaurdian_address)
//         data.append('gaurdian_city', this.state.gaurdian_city)
//         data.append('gaurdian_state', this.state.gaurdian_state)
//         data.append('gaurdian_country', this.state.gaurdian_country)
//         data.append('gaurdian_phone', this.state.gaurdian_phone)
//         data.append('gaurdian_mobile', this.state.gaurdian_mobile)

//         data.append('image', this.state.image)
//         const url = "http://144.91.110.221:4800/StoreParent"
//         fetch(url, {
//                 method: 'post',
//                 body: data
//             })
//             .then(res => res.json())
//             .then(data => {
//                 alert("Parent Created Successfully")  
//                 this.getParent()                
//             })
//             .then(err => {})
// }
    render(){
        const data =[];
        {this.state.AllStudent.map((item,index)=>{
        data.push( {"sr_no":index+1,"account_no":item.account_no,"student_name":item.name,"father_name":item.father_name,"mother_name":item.mother_name,"gaurdian_name":item.gaurdian_name,"parent_mobile":item.parent_mobile,"gaurdian_mobile":item.gaurdian_mobile,"class":item.class_name,"section":item.section})
        })}
          const columns = [
            { title: "SR NO", data: "sr_no" },
            { title: 'Account No', data: "account_no"},
            { title: 'Student Name', data: "student_name"},
            { title: "Father Name", data: "father_name" },
            { title: "Mother Name", data: "mother_name" },
            { title: 'Gaurdian Name',data: "gaurdian_name"},
            { title: "Parent Mobile No", data: "parent_mobile" },
            { title: "Gaurdian Mobile No", data: "gaurdian_mobile" },
          ];
        
          const click = (row) => {
            console.log(row);
          };
        return(
            <>
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
export default ParentCreation;