import React from "react";

const ApplianceTable = props => {
  var count = 1;
  var trKey = 1;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tag</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.appliances.length > 0 ? (
          props.appliances.map(appliance => (
            <tr key={appliance.td}>
              <td key={trKey++}>{count++}</td>
              <td key={trKey++}>{appliance.tag}</td>
              <td key={trKey++}>{appliance.type}</td>
              <td key={trKey++}>
                <button
                  key={trKey++}
                  onClick={event => {
                    event.preventDefault();
                    props.deleteAppliance(appliance.td);
                  }}
                  className="btn btn-secondary"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr key={trKey++}>
            <td key={trKey++}>No Appliance</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ApplianceTable;
