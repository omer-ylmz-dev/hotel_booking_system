interface TotalPriceCalculationProps {
  grandTotal: number;
}

export default function TotalPriceCalculation({ grandTotal }: TotalPriceCalculationProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h2 className="text-xl font-bold">3. Total Price Calculation</h2>
        <p className="text-xs text-gray-500 mt-1">
          Total = sum of (hotel price + selected meal prices) for each day.
        </p>
      </div>
      <div className="text-center sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto">
        <p className="text-xs text-gray-400 uppercase tracking-widest">Grand Total</p>
        <p className="text-4xl font-black text-red-500 mt-1">${grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
