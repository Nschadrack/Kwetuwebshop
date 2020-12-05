import React from 'react'
import AllCountries from './AllCountries'


const AddressForm = (props) => {
    return ( 
        <React.Fragment>
            <input type="text" name="billing_first_name" placeholder="Enter your first name" required  autoComplete="off" onChange={props.handleBillingFirsName} defaultValue={props.activeBillingAddress.firstName}/>
            <input type="text" name="billing_last_name" placeholder="Enter your last name" required  autoComplete="off" onChange={props.handleBillingLastName} defaultValue={props.activeBillingAddress.lastName}/> 
            <input type="text" name="billing_company_name" placeholder="Enter your company name(optional)"  autoComplete="off" onChange={props.handleBillingCompany} defaultValue={props.activeBillingAddress.company}/> 
            <AllCountries onDefault="Rwanda" onHandleChangeOnCountry={props.handleBillingCountry} defaultValue={props.activeBillingAddress.firstName}/>
            <input type="text" name="billing_house_street_name" placeholder="Enter house number and street name" required  autoComplete="off" onChange={props.handleBillingHouseStreet} defaultValue={props.activeBillingAddress.houseStreetName}/> 
            <input type="text" name="billing_apartment_name" placeholder="Enter apartment, suite, unit etc.(optional)"  autoComplete="off" onChange={props.handleBillingApartment} defaultValue={props.activeBillingAddress.apartment}/> 
            <input type="text" name="billing_town_city" placeholder="Enter town/city" required  autoComplete="off" onChange={props.handleBillingTownCity} defaultValue={props.activeBillingAddress.townCity}/> 
            <input type="text" name="billing_state_country" placeholder="Enter state/country" required  autoComplete="off" onChange={props.handleBillingStateCountry} defaultValue={props.activeBillingAddress.stateCountry}/> 
            <input type="text" name="billing_postcode_zip" placeholder="Enter postcode/zipcode" required  autoComplete="off" onChange={props.handleBillingPostCode} defaultValue={props.activeBillingAddress.postCode}/> 
            <input type="text" name="billing_phone_number" placeholder="Enter your phone number with country code" required  autoComplete="off" min="13" max="13" onChange={props.handleBillingPhoneNumber} defaultValue={props.activeBillingAddress.phoneNumber}/> 
            <input type="text" name="billing_email_address" placeholder="Enter your email address" required  autoComplete="off" onChange={props.handleBillingEmailAddress} defaultValue={props.activeBillingAddress.emailAddress}/> 
        </React.Fragment>
     );
}
 
export default AddressForm;