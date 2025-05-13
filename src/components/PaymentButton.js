import React, { useState } from 'react';
import { createPayment } from '../services/transbankService';

const PaymentButton = ({ amount, orderId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sessionId = `user_${orderId}`; // ID único de sesión
      const returnUrl = `${window.location.origin}/payment-result`;
      
      const paymentData = await createPayment(
        amount,
        orderId,
        sessionId,
        returnUrl
      );
      
      // Redirigir a Webpay
      window.location.href = paymentData.url;
      
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handlePayment} 
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Pagar con Webpay'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PaymentButton;