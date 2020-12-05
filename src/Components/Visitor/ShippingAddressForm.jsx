import React from 'react'
import AllCountries from './AllCountries'


const ShippingAddressForm = (props) => {
    return ( 
        <React.Fragment>
            <input type="text" name="billing_first_name" placeholder="Enter your first name" required  autoComplete="off" onChange={props.handleShippingFirsName} defaultValue={props.activeShippingAddress.firstName}/>
            <input type="text" name="billing_last_name" placeholder="Enter your last name" required  autoComplete="off" onChange={props.handleShippingLastName} defaultValue={props.activeShippingAddress.lastName}/> 
            <input type="text" name="billing_company_name" placeholder="Enter your company name(optional)"  autoComplete="off" onChange={props.handleShippingCompany} defaultValue={props.activeShippingAddress.company}/> 
            <AllCountries onDefault="Rwanda" onHandleChangeOnCountry={props.handleShippingCountry} defaultValue={props.activeShippingAddress.firstName}/>
            <input type="text" name="billing_house_street_name" placeholder="Enter house number and street name" required  autoComplete="off" onChange={props.handleShippingHouseStreet} defaultValue={props.activeShippingAddress.houseStreetName}/> 
            <input type="text" name="billing_apartment_name" placeholder="Enter apartment, suite, unit etc.(optional)"  autoComplete="off" onChange={props.handleShippingApartment} defaultValue={props.activeShippingAddress.apartment}/> 
            <input type="text" name="billing_town_city" placeholder="Enter town/city" required  autoComplete="off" onChange={props.handleShippingTownCity} defaultValue={props.activeShippingAddress.townCity}/> 
            <input type="text" name="billing_state_country" placeholder="Enter state/country" required  autoComplete="off" onChange={props.handleShippingStateCountry} defaultValue={props.activeShippingAddress.stateCountry}/> 
            <input type="text" name="billing_postcode_zip" placeholder="Enter postcode/zipcode" required  autoComplete="off" onChange={props.handleShippingPostCode} defaultValue={props.activeShippingAddress.postCode}/> 
            <input type="text" name="billing_phone_number" placeholder="Enter your phone number with country code" required  autoComplete="off" min="13" max="13" onChange={props.handleShippingPhoneNumber} defaultValue={props.activeShippingAddress.phoneNumber}/> 
            <input type="text" name="billing_email_address" placeholder="Enter your email address" required  autoComplete="off" onChange={props.handleShippingEmailAddress} defaultValue={props.activeShippingAddress.emailAddress}/> 
        </React.Fragment>
     );
}
 
export default ShippingAddressForm;