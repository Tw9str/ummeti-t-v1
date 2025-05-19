export default function Summary({ items }) {
  const totalRaised = items?.length
    ? items
        .map((item) => item.raised)
        .reduce((acc, current) => acc + current, 0)
    : 0;
  const totalGoal = items?.length
    ? items.map((item) => item.goal).reduce((acc, current) => acc + current, 0)
    : 0;
  const progress =
    totalGoal > 0 ? ((totalRaised / totalGoal) * 100).toFixed(1) : 0;

  const formatCurrency = (amount) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="mt-8 w-full lg:p-5 p-4 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-5 flex">
      <div className="w-full px-5 pb-6 border-b border-gray-100 justify-start items-center md:gap-8 gap-0 md:grid grid-cols-12">
        <div className="lg:col-span-4 md:col-span-5 col-span-12 text-gray-900 text-xl font-medium leading-8">
          <div className="text-center md:w-fit">
            <span className="block text-sm font-normal text-gray-600">
              Total
            </span>
            <span>{items?.length || ''}</span>
          </div>
        </div>
        {items?.[0]?.goal && (
          <ul
            className="lg:col-span-8 md:col-span-7 col-span-12 w-full flex flex-col md:flex-row justify-center items-center gap-8 py-4"
            aria-label="Fundraising Summary"
          >
            <li className="flex-1 text-center text-gray-900 text-xl font-medium leading-8"></li>
            <li className="flex-1 text-center text-gray-900 text-xl font-medium leading-8">
              <span className="block text-sm font-normal text-gray-600">
                Raised
              </span>
              {formatCurrency(totalRaised)}
            </li>
            <li className="flex-1 text-center text-gray-900 text-xl font-medium leading-8">
              <span className="block text-sm font-normal text-gray-600">
                Goal
              </span>
              {formatCurrency(totalGoal)}
            </li>
            <li className="flex-1 text-center text-gray-900 text-xl font-medium leading-8">
              <span className="block text-sm font-normal text-gray-600">
                Progress
              </span>
              {progress}%
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
