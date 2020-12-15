import React, { Component } from "react";
import "../asset/css/App.css";
import Select from "react-select";
import opt from "../constant/ConstantOptions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Setting the state to the selectedOption fetched from local storage
      selectedOption: JSON.parse(localStorage.getItem("selectedOption")),
    };
  }

  handleChange = (selectedOption) => {
    var sr = [];

    localStorage.setItem(
      //Setting the selected option onchange of location dropdown
      "selectedOption",
      JSON.stringify(selectedOption.value)
    );
    for (var i of JSON.parse(localStorage.getItem("sites")).sites) {
      //Function to display sites based on selected location
      if (selectedOption.value === i.name) {
        for (var j of i.sites) {
          if (
            j.custom_attributes != undefined &&
            j.custom_attributes.WAS_Entity_Type === "site"
          ) {
            sr.push({name:j.name,id:j.id});
          }
        }
      }
    }
     // console.log(sr);
    localStorage.setItem("loc_sites", JSON.stringify(sr));

    this.setState({ selectedOption });
    window.location.reload();
  };

  render() {
    //const { selectedOption } = this.state;

    return (
      <div>
        <div className="pageheading">
          <h2>Overview Dashboard</h2>
        </div>

        <div>
          <p style={{ color: "white", fontWeight: "bold", padding: "10px" }}>
            Organisation Name
          </p>
          <input
            className="organisation"
            type="text"
            placeholder="Organisation name"
            name="US Stell"
            value={localStorage.getItem("org_name")}
            readOnly
          />

          <p style={{ color: "white", fontWeight: "bold", padding: "10px" }}>
            Locations
          </p>
          <Select
            //  value={selectedOption}
            onChange={this.handleChange}
            options={opt}
            defaultInputValue={JSON.parse(
              localStorage.getItem("selectedOption")
            )}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
