// DoiTraHangPage.js
import React from 'react';

const ReturnPolicyPage = () => {
  return (
    <div>
      {/* NEWS */}
      <section className="news section">
        <div className="heading">
          <h2>RETURN POLICY</h2>
          <p></p>
        </div>
        <div className="news__content container">
          <div className="row">
            <div className="col-12">
              <p style={{ fontSize: '18px', textAlign: 'justify', color: 'black' }}>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>1. General Regulations:</span>
                <p>
                  - G6 Gear is committed to providing high-quality products and the best service to its customers.
                </p>
                <p>
                  - In case you are not satisfied with the purchased product, you have the right to exchange or
                  receive a refund under the following conditions.
                </p>
                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>2. Return Period:</span>
                <p>
                  - You may request a return within [number of days] days from the date of receiving the product.
                </p>
                <p>- After this period, G6 Gear will not accept any return requests.</p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>3. Return Conditions:</span>
                <p>- The product must be in a new and unused condition.</p>
                <p>
                  - You need to keep the purchase invoice or order confirmation to prove the purchase.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>4. Return Fee:</span>
                <p>
                  - If the reason for return is G6 Gear's fault (e.g., product damaged during shipping), we will
                  take responsibility and reimburse any related fees.
                </p>
                <p>
                  - If the reason for return is not G6 Gear's fault, you may have to bear shipping and/or handling
                  fees.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>5. Refund Method:</span>
                <p>
                  - Refunds will be processed through the original payment method within [number of days] business
                  days from the date of receiving the returned product.
                </p>

                <span style={{ fontWeight: 'bold', fontSize: '22px' }}>6. Return Procedure:</span>
                <p>
                  - To request a return, please contact our customer service department at [contact information].
                </p>
                <p>
                  - G6 Gear will assist you in the return process and provide detailed instructions.
                </p>
                Note:
                <p>
                  - G6 Gear reserves the right to adjust the return policy without prior notice. Any changes will be
                  updated on our website.
                </p>
                <p>
                  We hope that this return policy will provide the best shopping experience for you. Thank you for
                  choosing G6 Gear.
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
};

export default ReturnPolicyPage;
