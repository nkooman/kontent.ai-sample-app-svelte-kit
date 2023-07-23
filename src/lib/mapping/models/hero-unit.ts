import type { Elements } from "@kontent-ai/delivery-sdk";

export type HeroUnit = {
  id: string;
  title: string;
  marketingMessage: Elements.RichTextElement;
  backgroundImage: string | undefined;
};
