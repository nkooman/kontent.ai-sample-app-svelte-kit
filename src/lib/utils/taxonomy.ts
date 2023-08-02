import type { IContentItem, IContentItemElements } from '@kontent-ai/delivery-sdk';

export const matchesTaxonomy = (item: IContentItem, filter: string[], elementName: string): boolean => {
  if (filter.length === 0) {
    return true;
  }
  const codenames = item.elements[elementName].value.map((x: IContentItemElements) => x.codename);
  return codenames.some((x: string) => filter.includes(x));
};
