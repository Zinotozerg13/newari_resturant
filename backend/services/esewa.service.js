const axios = require('axios');

const ESewaConfig = {
  merchantCode: 'YOUR_ESEWA_MERCHANT_CODE', // replace with your eSewa merchant code
  successUrl: 'http://localhost:3000/payment/success', // redirect after payment success
  failureUrl: 'http://localhost:3000/payment/failure', // redirect after payment failure
};

const createPaymentUrl = (amount, orderId) => {
  return `https://uat.esewa.com.np/epay/main?amt=${amount}&pdc=0&psc=0&txAmt=0&tAmt=${amount}&scd=${ESewaConfig.merchantCode}&pid=${orderId}&su=${ESewaConfig.successUrl}&fu=${ESewaConfig.failureUrl}`;
};

const verifyPayment = async (paymentDetails) => {
  try {
    const response = await axios.post('https://uat.esewa.com.np/epay/transrec', null, {
      params: {
        amt: paymentDetails.amount,
        scd: ESewaConfig.merchantCode,
        pid: paymentDetails.orderId,
        rid: paymentDetails.refId,
      },
    });
    return response.data.includes('Success'); // returns true if payment successful
  } catch (error) {
    console.error('eSewa verification error:', error);
    return false;
  }
};

module.exports = { createPaymentUrl, verifyPayment };
