import type { Elements } from "@kontent-ai/delivery-sdk";
import type { ProductStatus } from "$lib/models";

export type Coffee = {
  id: string;
  codename: string;
  price: number | null;
  name: string;
  imageLink: string;
  productStatus: Elements.TaxonomyElement<ProductStatus>;
  urlPattern: string;
  farm: string;
  variety: string;
  processing: string;
  altitude: string;
}