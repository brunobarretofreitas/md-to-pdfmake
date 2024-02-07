global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import marked from 'marked';
import { JSDOM } from 'jsdom';

import {
  Content,
  ContentOrderedList,
  ContentText,
  ContentUnorderedList,
} from 'pdfmake/interfaces';
import { Style } from './types';

export const toPdfMakeObject = (md: string, style: Style = {}): Content[] => {
  function buildText(text: string | null, options = {}): ContentText {
    return { text: text || '', ...options };
  }

  function buildItalics(element: Element): ContentText {
    if (element.childElementCount && element.children[0].tagName == 'STRONG') {
      return buildText(element.textContent, {
        bold: true,
        italics: true,
      });
    }
    return buildText(element.textContent, { italics: true });
  }

  function buildBold(element: Element): ContentText {
    if (element.childElementCount && element.children[0].tagName == 'EM') {
      return buildText(element.textContent, {
        bold: true,
        italics: true,
      });
    }
    return buildText(element.textContent, { bold: true });
  }

  function buildAnchor(element: Element): ContentText {
    return buildText(element.textContent, {
      link: (<HTMLAnchorElement>element).href,
    });
  }

  function buildParagraph(element: Element): ContentText | Content[] {
    if (element.childElementCount) {
      return {
        text: Array.from(element.childNodes).map(element => {
          if ((<Element>element).tagName === undefined) {
            return buildText(element.textContent);
          }

          return buildContent(<Element>element);
        }),
        ...(style.p || {}),
      };
    }
    return buildText(element.textContent, style.p || {});
  }

  function buildH1(element: Element): ContentText {
    return buildText(element.textContent, style.h1 || {});
  }

  function buildH2(element: Element): ContentText {
    return buildText(element.textContent, style.h2 || {});
  }

  function buildH3(element: Element): ContentText {
    return buildText(element.textContent, style.h3 || {});
  }

  function buildH4(element: Element): ContentText {
    return buildText(element.textContent, style.h4 || {});
  }

  function buildH5(element: Element): ContentText {
    return buildText(element.textContent, style.h5 || {});
  }

  function buildH6(element: Element): ContentText {
    return buildText(element.textContent, style.h6 || {});
  }

  function buildListItem(element: Element): ContentText | Content[] {
    if (element.childElementCount) {
      return Array.from(element.children).map(child => buildContent(child));
    }

    return buildText(element.textContent, style.li || {});
  }

  function buildUnorderedList(element: Element): ContentUnorderedList {
    return {
      ul: Array.from(element.children).map(child => buildContent(child)),
      ...style.ul,
    };
  }

  function buildOrderedList(element: Element): ContentOrderedList {
    return {
      ol: Array.from(element.children).map(child => buildContent(child)),
      ...style.ol,
    };
  }

  function buildMethod(
    htmlTagName: string
  ): (element: Element) => Content | Content[] {
    const notFoundBuildMethod = () => [] as Content;
    const buildMethodMap: {
      [key: string]: (element: Element) => Content | Content[];
    } = {
      A: buildAnchor,
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
      STRONG: buildBold,
      EM: buildItalics,
    };
    return buildMethodMap[htmlTagName] || notFoundBuildMethod;
  }

  function buildContent(element: Element): Content {
    return buildMethod(element.tagName)(element);
  }

  function htmlElements(): Element[] {
    return Array.from(new JSDOM(marked(md)).window.document.body.children);
  }

  return htmlElements().map(element => buildContent(element));
};
