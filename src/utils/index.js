import { is, isEmpty, isNil } from 'ramda'

function renderAttributes(attributes) {
  if (isNil(attributes)) {
    return ''
  } else {
    return Object.keys(attributes).map(attribute => ({
      key: attribute,
      value: attributes[attribute],
    })).map(({ key, value }) =>
      ` ${key}="${value}"`
    ).join('')
  }
}

function renderTag({
  name,
  attributes = {},
  childNodes,
}) {
  const xml = renderXml(childNodes)
  if (isEmpty(xml)) {
    return `<${name}${renderAttributes(attributes)} />`
  } else {
    return `<${name}${renderAttributes(attributes)}>${xml}</${name}>`
  }
}

function renderXml(source) {
  if (is(Number, source)) {
    return source
  } else if (isNil(source) || isEmpty(source)) {
    return ''
  } else if (is(String, source)) {
    return source
  } else if (is(Array) && source.length) {
    return source.map(renderXml).join('')
  } else if (is(Object, source)) {
    if (source.toXmlStructure) {
      return renderXml(source.toXmlStructure())
    } if (source.name) {
      return renderTag(source)
    } else {
      return `${Object.keys(source).map(tag => 
        `${renderTag({
            name: tag,
            ...source[tag],
        })}`
      ).join('')}`
    }
  } else {
    return ''
  }
}

/**
 * @param {string} xml 
 * @see https://gist.github.com/sente/1083506/d2834134cd070dbcc08bf42ee27dabb746a1c54d
 */
function formatXml(xml) {
  var formatted = '';
  var reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  var pad = 0;
  xml.split('\r\n').map(node => {
      var indent = 0;
      if (node.match( /.+<\/\w[^>]*>$/ )) {
          indent = 0;
      } else if (node.match( /^<\/\w/ )) {
          if (pad != 0) {
              pad -= 1;
          }
      } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
          indent = 1;
      } else {
          indent = 0;
      }

      var padding = '';
      for (var i = 0; i < pad; i++) {
          padding += '  ';
      }

      formatted += padding + node + '\r\n';
      pad += indent;
  });

  return formatted;
}

export {
  renderXml,
  formatXml,
}
