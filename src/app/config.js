import {
  defineComponents,
  defineDesignTokens,
} from "@contentful/experiences-sdk-react";

import ExternalProducts from "@/components/externalproducts";

const components = [
  {
    component: ExternalProducts,
    options: { wrapComponent: false, wrapContainerWidth: "100%" },
    definition: {
      id: "externalproducts",
      name: "External products",
      thumbnailUrl: "https://cdn-icons-png.flaticon.com/128/2357/2357063.png",
      category: "Components",
      builtInStyles: [],
      variables: {
        products: {
          displayName: "Products",
          type: "Array",
        },
      },
    },
  },
];

const tokens = {};

defineComponents(components);
defineDesignTokens(tokens);
