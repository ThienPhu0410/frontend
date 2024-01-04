// ShippingScreen.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import './styles/ShippingScreen.css';
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sample data for country and city lists
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
    'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Côte d’Ivoire', 'Croatia',
    'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
    'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
    'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North',
    'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (Burma)', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea',
    'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South',
    'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
    'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    // Add more countries as needed
  ];
    
  const cityData = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
    UK: ['London', 'Manchester', 'Birmingham'],
    Germany: ['Berlin', 'Munich', 'Hamburg'],
    France: ['Paris', 'Marseille', 'Lyon'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto'],
    Vietnam: [
      'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Bien Hoa',
      'Hue', 'Nha Trang', 'Vung Tau', 'Buon Ma Thuot', 'Qui Nhon', 'Long Xuyen',
      'Thanh Hoa', 'Ha Long', 'Phan Thiet', 'Cam Ranh', 'Bac Lieu', 'Yen Bai', 'Dong Hoi',
      'Thai Nguyen', 'Vinh', 'Rach Gia', 'Tuy Hoa', 'Sa Dec', 'Tam Ky', 'Cao Lanh', 'Tra Vinh',
      'Soc Trang', 'Bac Giang', 'Ha Tinh', 'Bac Ninh', 'Quang Ngai', 'Dien Bien Phu', 'Dong Ha',
      'Vinh Long', 'Son La', 'Dak Nong', 'Kon Tum', 'Lai Chau', 'Hoa Binh', 'Tuyen Quang'
    ],    
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    Brazil: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia'],
    China: ['Beijing', 'Shanghai', 'Guangzhou'],
    Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
    SouthAfrica: ['Johannesburg', 'Cape Town', 'Durban'],
    Mexico: ['Mexico City', 'Guadalajara', 'Monterrey'],
        Argentina: ['Buenos Aires', 'Cordoba', 'Rosario'],
    Italy: ['Rome', 'Milan', 'Naples'],
    Spain: ['Madrid', 'Barcelona', 'Valencia'],
    SouthKorea: ['Seoul', 'Busan', 'Incheon'],
    Turkey: ['Istanbul', 'Ankara', 'Izmir'],
    Egypt: ['Cairo', 'Alexandria', 'Giza'],
    Nigeria: ['Lagos', 'Kano', 'Ibadan'],
    // Add more countries and cities as needed
  };
  

  useEffect(() => {
    setCities(cityData[country] || []);
  }, [country]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="shipping-title">Shipping</h1>
      <Form className="shipping-form" onSubmit={submitHandler}>
        <Form.Group as={Row} className='my-2' controlId='address'>
          <Form.Label column sm="3">Address</Form.Label>
          <Col sm="9">
            <Form.Control
              type='text'
              placeholder='Enter your address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='my-2' controlId='country'>
          <Form.Label column sm="3">Country</Form.Label>
          <Col sm="9">
            <Form.Control
              as="select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled>Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='my-2' controlId='city'>
          <Form.Label column sm="3">City</Form.Label>
          <Col sm="9">
            <Form.Control
              as="select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="" disabled>Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='my-2' controlId='postalCode'>
          <Form.Label column sm="3">Postal Code</Form.Label>
          <Col sm="9">
            <Form.Control
              type='text'
              placeholder='Enter your postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
