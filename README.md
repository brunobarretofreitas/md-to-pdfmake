# md-to-pdfmake

[![Build Status](https://app.travis-ci.com/brunobarretofreitas/md-to-pdfmake.svg?branch=master)](https://app.travis-ci.com/brunobarretofreitas/md-to-pdfmake)
[![Npm package version](https://badgen.net/npm/v/md-to-pdfmake)](https://npmjs.com/package/md-to-pdfmake)

Parser of markdown text to [pdfmake](https://github.com/bpampuch/pdfmake) object.

## Example:
#### Mardown Text
```markdown
Hello World !

**That's a bold text**
***That's a italic text***

# That's a big text !

- Item 1
- Item 2
```

#### Parsed pdfmake object
```javascript
[
  {text: "Hello World"},
  {text: [{ text: "That's a bold text", bold: true }]},
  {text: [{ text: "That's a italic text", italics: true }]},
  {text: "That's a big text"},
  {
    ul: [
      {text: 'Item 1'},
      {text: 'Item 2'}
    ]
  }
]
```

## Supported elements
- Paragraph
- Ordered List
- Unordered List
- Headings (h1, h2, h3, h4, h5, h6)
- Strong
- Italic
