// src/studio-config.ts
import { defineComponents } from "@contentful/experiences-sdk-react";
import RemoteProducts from "@/components/Externalproducts";
import RemoteProductsDefinition from "@/components/Externalproducts/definition.json";

defineComponents([
  {
    component: RemoteProducts,
    options: { wrapComponent: false, wrapContainerWidth: "100%" },
    definition: RemoteProductsDefinition,
  },
]);
