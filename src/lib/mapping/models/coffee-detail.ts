import type { Elements } from "@kontent-ai/delivery-sdk";
import type { Coffee } from "$lib/mapping/models/coffee";
import type { Metadata } from "$lib/mapping/models/metadata";

export type CoffeeDetail = {
  id: string;
  coffee: Coffee & {
    longDescription: Elements.RichTextElement;
  },
  metadata: Metadata;
}