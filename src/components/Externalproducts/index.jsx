import { useState, useEffect } from "react";

function RemoteProducts({ max, sortBy: sortByProp = "popularity" }) {
  const maxItems = max ? (max == "unlimited" ? 1000 : parseInt(max)) : 1000;
  const [products, setProducts] = useState([]);
  const [slicedProducts, setSlicedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(
    sortByProp.toLowerCase().replace(" ", "_")
  );

  useEffect(() => {
    const fetchProperties = async () => {
      const allProducts = await fetch(
        `https://mock-fashion-api.vercel.app/api/fashion`
      ).then((response) => response.json());
      setProducts(allProducts);
      setSlicedProducts(allProducts.slice(0, maxItems));
      setLoading(false);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    setSlicedProducts(products.slice(0, maxItems));
  }, [maxItems]);

  useEffect(() => {
    Sort();
  }, [sortByProp]);

  function oneWeekAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }

  function Sort() {
    if (products.length < 0) return;
    const sorter = sortByProp.toLowerCase().replace(" ", "_");
    // setSortBy(sorter);
    if (sorter == "cheapest") {
      setSlicedProducts(
        products.sort((a, b) => a.price - b.price).slice(0, maxItems)
      );
    } else if (sorter == "oldest") {
      setSlicedProducts(
        products
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .slice(0, maxItems)
      );
    } else if (sorter == "newest") {
      setSlicedProducts(
        products
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, maxItems)
      );
    } else if (sorter == "popularity") {
      setSlicedProducts(
        products.sort((a, b) => b.rating - a.rating).slice(0, maxItems)
      );
    } else {
      setSlicedProducts(products.slice(0, maxItems));
    }
  }

  // Render based on the states
  if (loading) return <div>Loading products...</div>;

  return (
    <div className="flex flex-col w-full max-w-none">
      <div
        className="grid grid-cols-1 gap-y-4 sm:grid-cols-2  sm:gap-y-10 lg:grid-cols-3 data-[products=1]:lg:grid-cols-1 data-[products=2]:lg:grid-cols-2"
        data-products={Math.min(3, maxItems)}
      >
        {slicedProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden bg-white"
            >
              <div className="w-full bg-gray-200 sm:aspect-none group-hover:opacity-75 h-[720px]">
                <img
                  src={product?.image_url || "https://picsum.photos/500/500"}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900 flex gap-2 items-baseline">
                  {product.name}

                  {new Date(product.created_at) > oneWeekAgo() && (
                    <span className="inline-flex items-center rounded-md bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <span>&euro; {product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RemoteProducts;
