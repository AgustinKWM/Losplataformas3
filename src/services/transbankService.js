import axios from 'axios';

const TRANSBANK_API_URL = process.env.REACT_APP_TRANSBANK_API_URL || 'https://apitransbank-losplataformas.onrender.com';

const transbankApi = axios.create({
  baseURL: TRANSBANK_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_TRANSBANK_API_KEY}`
  }
});

export const createPayment = async (amount, buyOrder, sessionId, returnUrl) => {
  try {
    const response = await transbankApi.post('/create', {
      amount,
      buyOrder,
      sessionId,
      returnUrl
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Payment creation failed');
  }
};

export const confirmPayment = async (token) => {
  try {
    const response = await transbankApi.get(`/commit?token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error confirming payment:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Payment confirmation failed');
  }
};