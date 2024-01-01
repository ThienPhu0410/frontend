import React from 'react';

const CompanyLocationPage = () => {
  return (
    <div>
      <section className="company-location section">
        <div className="heading">
          <h2>Company Location</h2>
          <p></p>
        </div>
        <div className="company-location__content container">
          <div className="row">
            <div className="col-12">
              <div className="company-location__map">
                <iframe
                  title="Ho Chi Minh City University of Transport"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.493708411627!2d106.72492471528762!3d10.822068992267103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f90d173a21%3A0x513b1c35a39e8e7!2zMDIgVsO5byBPYW5oLCBCaeG6p3QgVGjhuqFuaCwgSGFocCwgQsOgIFhDTA!5e0!3m2!1sen!2sau!4v1647086376927!5m2!1sen!2sau"
                  width="100%"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="company-location__address"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyLocationPage;
