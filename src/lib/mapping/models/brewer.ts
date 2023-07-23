import type { Elements } from "@kontent-ai/delivery-sdk";
import type { ProductStatus } from "$lib/models";

export type Brewer = {
  id: string;
  codename: string;
  price: number | null;
  name: string;
  imageLink: string;
  productStatus: Elements.TaxonomyElement<ProductStatus>;
  urlPattern: string;
  manufacturer: string;
}