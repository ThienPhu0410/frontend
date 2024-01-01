import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5">
      <Container>
        <div className="footer__top section">
          <Row>
            <Col md={4}>
              <h3>ABOUT US</h3>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">About Us</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Careers</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Terms of Use</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Privacy Policy</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Media Contact</a>
              </div>
            </Col>
            <Col md={4}>
              <h3>CUSTOMER CARE</h3>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Help Center</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="#">Customer Support</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="/policy">Warranty Policy</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="/return-policy">Return Policy</a>
              </div>
              <div className="footer__link">
                <i className="fa fa-long-arrow-alt-right"></i>
                <a href="/shipping-policy">Shipping</a>
              </div>
            </Col>
            <Col md={4}>
              <h3>CONTACT INFORMATION</h3>
              <div className="footer__contact">
                <i className="fa fa-map-marker-alt"></i>
                <a href="#">2 Vo Oanh, Binh Thanh - HCMC</a>
              </div>
              <div className="footer__contact">
                <i className="fa fa-map-marker-alt"></i>
                <a href="/maps">Maps</a>
              </div>
              <div className="footer__contact">
                <i className="fa-regular fa-envelope"></i>
                <a href="mailto:info@cybersoft.edu.vn">uth@edu.vn</a>
              </div>
              <div className="footer__contact">
                <i className="fa-solid fa-phone"></i>
                <a href="tel:0355099011">0355.099.011</a>
              </div>
            </Col>
          </Row>
          <div className="footer__form">
            <form>
              <Row className="form-group form-row">
                <Col className="col-4 col-form-label" htmlFor="emailFooter">
                  Sign up for our Newsletter
                </Col>
                <Col className="col-6">
                  <input
                    type="email"
                    className="form-control"
                    id="emailFooter"
                    placeholder="Enter Email Address ..."
                  />
                </Col>
                <Col className="col-2 text-center">
                  <button className="btn">SUBMIT</button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Container>
      <div className="footer__bottom">
        <div>
          @ {currentYear} Instruction. All rights reserved | Design by <a href="#">Phu </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
