import type { Elements } from "@kontent-ai/delivery-sdk";

export type FactAboutUs = {
  id: string;
  title: string;
  imageUrl: string;
  description: Elements.RichTextElement;
};
