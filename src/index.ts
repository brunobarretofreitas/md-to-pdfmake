import marked from 'marked';

import {
  Content,
  ContentOrderedList,
  ContentText,
  ContentUnorderedList,
} from 'pdfmake/interfaces';

export const toPdfMakeObject = (md: string): Content[] => {
  function buildText(text: string, options = {}): ContentText {
    return { text, ...options };
  }

  function buildParagraph(element: Element): ContentText | Content[] {
    return buildText(element.textContent || '');
  }

  function buildH1(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildH2(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildH3(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildH4(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildH5(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildH6(element: Element): ContentText {
    return buildText(element.textContent || '');
  }

  function buildListItem(element: Element): ContentText | Content[] {
    if (Array.from(element.children).length) {
      return Array.from(element.children).map(child => buildContent(child));
    }

    return buildText(element.textContent || '');
  }

  function buildUnorderedList(element: Element): ContentUnorderedList {
    return {
      ul: Array.from(element.children).map(child => buildContent(child)),
    };
  }

  function buildOrderedList(element: Element): ContentOrderedList {
    return {
      ol: Array.from(element.children).map(child => buildContent(child)),
    };
  }

  function buildMethod(htmlTagName: string): (element: Element) => Content {
    const notFoundBuildMethod = () => [] as Content;
    return (
      {
        P: buildParagraph,
        UL: buildUnorderedList,
        LI: buildListItem,
        OL: buildOrderedList,
        H1: buildH1,
        H2: buildH2,
        H3: buildH3,
        H4: buildH4,
        H5: buildH5,
        H6: buildH6,
      }[htmlTagName] || notFoundBuildMethod
    );
  }

  function buildContent(element: Element): Content {
    return buildMethod(element.tagName)(element);
  }

  function htmlElements(): Element[] {
    return Array.from(
      new DOMParser().parseFromString(marked(md), 'text/html').body.children
    );
  }

  return htmlElements().map(element => buildContent(element));
};
