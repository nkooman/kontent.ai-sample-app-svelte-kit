import type { Brewer } from "$lib/mapping/models/brewer";
import type { Metadata } from "$lib/mapping/models/metadata";
import type { Elements } from "@kontent-ai/delivery-sdk";

export type BrewerDetail = {
  id: string;
  brewer: Brewer & {
    longDescription: Elements.RichTextElement;
  };
  metadata: Metadata;
}