import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { confirmPayment } from '../services/transbankService';

const PaymentResult = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token_ws');
    
    if (token) {
      const confirm = async () => {
        try {
          const result = await confirmPayment(token);
          setPaymentStatus(result.status);
        } catch (error) {
          setPaymentStatus('error');
        } finally {
          setIsLoading(false);
        }
      };
      
      confirm();
    } else {
      setIsLoading(false);
      setPaymentStatus('canceled');
    }
  }, [location]);

  if (isLoading) return <div>Verificando pago...</div>;

  return (
    <div className="payment-result">
      {paymentStatus === 'approved' && (
        <div className="success">
          <h2>¡Pago exitoso!</h2>
          <p>Tu transacción se ha completado correctamente.</p>
        </div>
      )}
      
      {paymentStatus === 'error' && (
        <div className="error">
          <h2>Error en el pago</h2>
          <p>Ocurrió un problema al procesar tu pago.</p>
        </div>
      )}
      
      {paymentStatus === 'canceled' && (
        <div className="warning">
          <h2>Pago cancelado</h2>
          <p>El pago no se completó.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;