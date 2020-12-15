import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../asset/css/App.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class DeviceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      isLoaded: false,
      data:[]
    };
  }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({
    //       isLoaded: true,
    //       data: json,
    //     });
    //   });

    fetch("https://localhost:44308/Api/DeviceDetail/desc",{
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Token: localStorage.getItem('tok'),
        id:localStorage.getItem('device_id')
      }),
    }).then((res)=>res.json())
      .then((result)=>{
        var ds=[];
        console.log([result]);
       // for(var i of result){
          ds.push({name:result.name,id:result.id,family:result.family,model:result.model})
        //}

        console.log(ds);
        localStorage.setItem("device_details",JSON.stringify(ds))

        this.setState({
                isLoaded: true,
                 data: ds,
              });

      })
  }

  render() {
    var { isLoaded, data } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <b>Loading....</b>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <div className="pageheading-device">
            <h2>Device Details</h2>
          </div>
          <div className="device-details">
            <br />
            <br />
            <br />

            { 
            data.map((item)=>(

fetch("https://localhost:44308/Api/Channel/ch",{ 
  method: "post",
headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
body: JSON.stringify({
  Token: localStorage.getItem('tok'),
  id:item.id
}),}).then((res)=>res.json())
     .then((result)=>{
       console.log(result);
        var c=[];
        var t=[]//
        for (var i of result.channels){
          if(i.customProperties!=undefined ){
            c.push(i.name);
            t.push(i.tag);//

          }
        }
        //console.log(c);
        //console.log(t)
        localStorage.setItem('ch',JSON.stringify(c))
        localStorage.setItem('tg',JSON.stringify(t))//

      }),

      

     

 <table border="1">
<div key={item.id}>
{JSON.parse(localStorage.getItem("ch")).map((it)=>
  <tr>
   
    <td>{it}</td>
   
  </tr>
            )
},
{JSON.parse(localStorage.getItem("tg")).map((t)=>
  <tr>
   
    <td>{t}</td>
   
  </tr>
            )
},
</div>
</table> 
            ))}

            {data.map((item) => (


              <div key={item.id}>
                <Card>
                  <CardBody className="card-box">
                    <CardTitle>
                      <b>{item.name}</b>
                    </CardTitle>
                    <CardText> Device id : {item.id}</CardText>
                    <br />
                    <br />
                    <CardText> Device Name : {item.name}</CardText>
                    <br />
                    <br />
                    <CardText> family : {item.family}</CardText>
                    <br />
                    <br />
                    <CardText> Model : {item.model}</CardText>
                    <br />
                    <br />
                    {/* <CardText> Company : {item.company.name}</CardText> */}
                    <br />

                    <br />
                    <br />
                  </CardBody>
                </Card>{" "}
                <br />
              </div>
            ))}
          </div>
          {/* <div className="sidebar-device">
            <br></br>
            <br></br>
            {data.map((item) => (
              <div key={item.id}>
                <center>
                  <br />
                  <Link to="/Devicedetails">
                    {" "}
                    <Button className="device-button" variant="primary">
                      Device {item.id} View Details
                    </Button>
                  </Link>
                </center>
              </div>
            ))}
          </div> */}

          <Footer />
        </div>
      );
    }
  }
}

export default DeviceDetails;
