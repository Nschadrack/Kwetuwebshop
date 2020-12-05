import React from "react";

const CustomerBillingAddress = (props) => {
    return ( 
        <div>
            <div className="content">
                <h6>List of billing addresses I have used</h6>
                <table className="table-content">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Zipcode</th>
                            <th>country</th>
                            <th>City</th>
                            <th>Company</th>
                            <th>Street/house No</th>
                            <th>apartment</th>
                            <th>state</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.billingAddresses !== undefined &&
                        <React.Fragment>
                            {
                                props.billingAddresses.map(address =>
                                    <tr key={address.billing_address_no}>
                                        <td>{address.first_name}</td>
                                        <td>{address.last_name}</td>
                                        <td>{address.email_address}</td>
                                        <td>{address.phone_number}</td>
                                        <td>{address.zip_post_code}</td>
                                        <td>{address.country}</td>
                                        <td>{address.city_town}</td>
                                        <td>{address.company_name}</td>
                                        <td>{address.street_name_house_number}</td>
                                        <td>{address.apartment_name}</td>
                                        <td>{address.state_country}</td>
                                    </tr>
                                    )
                            }
                            <tr>
                                <td colspan="11">
                                    {props.billingAddresses.length === 0 && <p style={{textAlign: "center"}}>You have not yet used any billing address</p>}
                                </td>
                            </tr>
                        </React.Fragment>
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default CustomerBillingAddress;