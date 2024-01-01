import React from 'react';

const WarrantyPage = () => {
  return (
    <div>
      {/* HEAD */}
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Warranty Policy</title>

        {/* BS4 CSS */}
       
     
        {/* MAIN CSS */}
        <link rel="stylesheet" href="./css/warranty.css" />
      </head>

      {/* BODY */}
      <body>
        {/* NEWS */}
        <section className="news section">
          <div className="heading">
            <h2>WARRANTY POLICY</h2>
            <p></p>
          </div>
          <div className="news__content container">
            <div className="row">
              <div className="col-12">
                <p style={{ fontSize: '18px', textAlign: 'justify', color: 'black' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '22px' }}>I. General Regulations</span>
                  <p> - For Products provided by the Seller on the G6 Gear Platform: </p>
                  <p> - The Seller is responsible for accepting warranty of the Product for the Customer as stated in the warranty certificate in case the Product is eligible for warranty.</p>
                  <p> - Customers should keep the warranty certificate and have the right to go to the place where the Product is provided for warranty or request home maintenance for fixed-location Products.</p>
                  <p> - Customers have the right to complain to the Seller if the Seller refuses to warranty or maintain the Product while it is still within the warranty and maintenance period stated on the warranty certificate.</p>
                  <p> - When conducting a transaction to purchase a Product on the G6 Gear Platform, Customers need to understand the applicable warranty policy for the Product from the relevant Seller. G6 Gear recommends that Customers check the warranty and maintenance policies for the intended purchase. G6 Gear is not the primary responsible party for Product warranty by Sellers on the G6 Gear Platform. In case Customers need support or have complaints, G6 Gear's customer service department will receive information and communicate with the Seller. G6 Gear will make efforts to assist Customers within its capabilities so that the Product of the Seller is warranted according to the manufacturer's policy.</p>
                  <p> - For electronic voucher codes, the warranty/return policy (if any) is clearly specified on each electronic voucher code, and it will be the responsibility of the Seller to implement it.</p>
                  <span style={{ fontWeight: 'bold', fontSize: '22px' }}>II. Warranty Conditions</span>
                  <p> 1. The Product is warranted for free if the Product meets the following conditions:</p>
                  <p> - The Product has technical defects due to the manufacturer.</p>
                  <p> - Still holds the purchase invoice at G6 Gear.</p>
                  <p> - The warranty certificate provides full information: machine type, serial number, manufacturing date, user's name, address, purchase date (for Products not subject to electronic warranty).</p>
                  <p> - The warranty seal (and the warranty seal) of the manufacturer, Seller on the Product is still intact.</p>
                  <p> 2. Cases not covered by warranty or incur warranty fees:</p>
                  <p> - The serial number, model of the Product does not match the warranty certificate.</p>
                  <p> - Customers intervene to repair the Product themselves or repair it at unauthorized maintenance centers by the manufacturer, Seller.</p>
                  <p> - The Product is damaged due to user error, and the damage does not fall within the warranty scope of the manufacturer, Seller.</p>
                  
          
                </p>
                {/* ... (more content) ... */}
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Libraries */}
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
          integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        ></script>
        {/* BS4 JS */}
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossOrigin="anonymous"
        ></script>
      </body>
    </div>
  );
};

export default WarrantyPage;
