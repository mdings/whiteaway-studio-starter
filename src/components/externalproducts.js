import commerceTools from "./commercetools.json";

export default function ExternalProducts({ products }) {
  return (
    products && (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {products.map((productId) => {
          const product = commerceTools.find((p) => p.productId === productId);
          return (
            product && (
              <div
                key={product.productId}
                className="flex flex-col justify-between border border-gray-200 rounded-md h-full p-4 gap-4"
              >
                <div className="w-full h-64 flex items-center justify-center bg-white flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col flex-grow mt-4">
                  <span className="font-bold max-w-sm">{product.title}</span>
                  <span className="text-sm text-gray-500">
                    €
                    {product.price.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            )
          );
        })}
      </div>
    )
  );
}
