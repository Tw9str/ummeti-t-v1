import Item from './Item';
import Summary from './Summary';
export default function Items({
  items,
  headers,
  removeAction,
  approveAction,
  ToggleItemMainAction,
}) {
  return (
    <section className="py-8 relative">
      <div className="max-w-6xl">
        <h2 className="text-center text-gray-900 mb-8 text-3xl font-bold font-manrope leading-normal">
          {headers?.[0]}
        </h2>
        <div className="w-full flex-col justify-start items-start gap-5 inline-flex border border-gray-200 rounded-2xl lg:p-5 p-4">
          <ul className="w-full px-6 pb-4 border-b border-gray-200 justify-start items-center md:gap-8 gap-0 md:grid grid-cols-12 hidden">
            {headers?.[1] && (
              <li className="lg:col-span-4 md:col-span-5 col-span-12 text-gray-900 text-xl font-medium leading-8">
                {headers?.[1]}
              </li>
            )}
            <div
              className={`lg:col-span-8 md:col-span-7 col-span-12 w-full flex justify-start items-center gap-8`}
            >
              {headers?.[2] && (
                <li className="col-span-2 w-full text-center text-gray-900 text-xl font-medium leading-8">
                  {headers?.[2]}
                </li>
              )}
              {headers?.[3] && (
                <li className="col-span-2 w-full text-center text-gray-900 text-xl font-medium leading-8">
                  {headers?.[3]}
                </li>
              )}
              {headers?.[4] && (
                <li className="col-span-2 w-full text-center text-gray-900 text-xl font-medium leading-8">
                  {headers?.[4]}
                </li>
              )}
              <li className="col-span-2 w-full text-center text-gray-900 text-xl font-medium leading-8"></li>
            </div>
          </ul>
          <div className="w-full flex flex-col gap-5">
            {items?.map((item) => (
              <Item
                key={item.id}
                item={item}
                removeAction={removeAction}
                approveAction={approveAction}
                ToggleItemMainAction={ToggleItemMainAction}
              />
            ))}
          </div>
        </div>
        <Summary items={items} />
      </div>
    </section>
  );
}
