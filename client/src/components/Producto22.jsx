import React, { useState, useEffect } from 'react';

const priceTable = {
  '5x5': [20.0, 12.4, 10.0, 9.0, 8.0, 6.8, 5.4],
  '7.5x7.5': [24.0, 14.9, 12.0, 10.8, 9.6, 8.2, 6.5],
  '10x10': [27.0, 16.7, 13.5, 12.2, 10.8, 9.2, 7.3],
};

const quantityIndexes = [25, 50, 100, 200, 300, 500, 1000];

const discountTable = {
  '5x5': [0, 38, 50, 55, 60, 66, 73],
  '7.5x7.5': [0, 38, 50, 55, 60, 66, 73],
  '10x10': [0, 38, 50, 55, 60, 66, 73],
};

export default function Producto22() {
  const [size, setSize] = useState('5x5');
  const [quantity, setQuantity] = useState(25);
  const [unitPrice, setUnitPrice] = useState(20.0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const sizeIndex = quantityIndexes.indexOf(quantity);
    const newUnitPrice = priceTable[size][sizeIndex];
    const newDiscount = discountTable[size][sizeIndex];
    setUnitPrice(newUnitPrice);
    setDiscount(newDiscount);
  }, [size, quantity]);

  const baseUnitPrice = priceTable[size][0];

  return (
    <div>
      <h2>Price Calculator</h2>

      <div>
        <label>
          Select Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="5x5">5x5</option>
            <option value="7.5x7.5">7.5x7.5</option>
            <option value="10x10">10x10</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Select Quantity:
          <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}>
            {quantityIndexes.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p>Unit Price: ${unitPrice.toFixed(2)}</p>
        <p>Total Price: ${(unitPrice * quantity).toFixed(2)}</p>
        <p>Percentage: {discount}% discount</p>
      </div>
    </div>
  );
}
