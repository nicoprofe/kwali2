import React, { useState, useEffect } from 'react';

const priceTable = {
  '5x5': [16.0, 9.6, 6.6, 5.9, 5.3, 4.8, 4.3],
  '7.5x7.5': [20.0, 12.0, 8.2, 7.4, 6.6, 6.0, 5.4],
  '10x10': [23.0, 13.8, 9.4, 8.5, 7.6, 6.9, 6.2],
};

const quantityIndexes = [25, 50, 100, 200, 300, 500, 1000];

export default function PriceCalculator() {
  const [size, setSize] = useState('5x5');
  const [quantity, setQuantity] = useState(25);
  const [unitPrice, setUnitPrice] = useState(16.0);

  useEffect(() => {
    const sizeIndex = quantityIndexes.indexOf(quantity);
    const newUnitPrice = priceTable[size][sizeIndex];
    setUnitPrice(newUnitPrice);
  }, [size, quantity]);

  const baseUnitPrice = priceTable[size][0];
  const discountPercentage = ((baseUnitPrice - unitPrice) / baseUnitPrice) * 100;

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
        <p>Percentage: {discountPercentage.toFixed(0)}% discount</p>
      </div>
    </div>
  );
}
