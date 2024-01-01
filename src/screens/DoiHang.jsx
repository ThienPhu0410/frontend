// VanChuyenPage.js
import React from 'react';
import './styles/VanChuyenPage.css';

const VanChuyenPage = () => {
  return (
    <div>
      <section className="news section">
        <div className="heading">
          <h2>SHIPPING POLICY</h2>
          <p></p>
        </div>
        <div className="news__content container">
          <div className="row">
            <div className="col-12">
              <p style={{ fontSize: '18px', textAlign: 'justify', color: 'black' }}>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>1. Shipping Services</span>
                <p>
                  - Currently, buyers can choose from 3 new Shipping Methods: Express - Fast -
                  Economical when purchasing some products on G6 Gear, instead of choosing a fixed
                  Shipping Carrier.
                </p>
                <p>
                  - We provide shipping services to customers worldwide, and we collaborate with reputable
                  shipping partners to ensure that goods are delivered to the correct address and on time.
                </p>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>2. Shipping Fee</span>
                <p>
                  - The shipping fee will be calculated based on the weight and delivery address. You can view
                  the detailed shipping fee during the payment process before confirming the order.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>3. Delivery Time</span>
                <p>
                  The delivery time may vary depending on the delivery address and the shipping service you
                  choose. Detailed information about the estimated delivery time will be provided during the
                  order placement process.
                </p>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>4. Order Tracking</span>
                <p>
                  - All orders will be provided with a tracking code so that you can track the status of your
                  order through the website or application of the shipping carrier.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>5. Delivery Issues</span>
                <p>
                  - In case you encounter issues with the delivery process, please contact our customer service
                  department at [contact information]. We will promptly address any arising issues.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>6. Returns Acceptance</span>
                <p>
                  - If you receive damaged or incorrect goods, please contact us within [number of days] days
                  from the date of receipt for return assistance.
                </p>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>7. International Shipping</span>
                <p>
                  - For international orders, customers are responsible for any costs related to customs and
                  import taxes.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>**Note: </span>
                <p>
                  - G6 Gear reserves the right to adjust the shipping policy without prior notice. Any changes
                  will be updated on our website.
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VanChuyenPage;
