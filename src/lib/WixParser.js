// import tag from 'html-tag';

function tag(el, text) {
    return `<${el}>${text}</${el}>`
}

function createHeading(level, nodes) {
    return tag(`h${level}`, nodes[0].textData.text)
}

function decorateText(textData) {
    if (!textData.decorations.length) return textData.text;
    textData.decorations.forEach(decoration => {
        if (decoration.type === 'ITALIC')
            return textData.text = tag('em', textData.text);
        else if (decoration.type === 'BOLD')
            return textData.text = tag('strong', textData.text);
        else if (decoration.type === 'UNDERLINE');
        return textData.text = tag('u', textData.text)
    });
    return textData.text.trim();
}

function createParagraph(nodes) {
    let paragraph = nodes
        .map(({ textData }) => decorateText(textData))
        .filter(text => text.trim().length ? text : '');
    paragraph.toString();
    if (paragraph.length > 1) paragraph = paragraph.join('');
    return tag('p', paragraph);
}

function createList(nodes) {
    let list = [];
    nodes.forEach(listItem => {
        list.push(tag('li', listItem.nodes[0].nodes[0].textData.text));
    });
    list.toString();
    return list.join('');
}

function createUnorderedList(nodes) {
    let listItems = createList(nodes);
    return tag('ul', listItems)
}

function createOrderedList(nodes) {
    let listItems = createList(nodes);
    return tag('ol', listItems);
}



const WixParser = {
    parseContent({ nodes }) {
        let document = [];
        nodes.forEach(node => {
            if (node.type === 'HEADING') {
                let { headingData, nodes } = node;
                document.push(createHeading(headingData.level, nodes));
            }
            else if (node.type === 'PARAGRAPH') {
                document.push(createParagraph(node.nodes));
            }
            else if (node.type === 'BULLETED_LIST') {
                document.push(createUnorderedList(node.nodes));
            }
            else if (node.type === 'ORDERED_LIST') {
                document.push(createOrderedList(node.nodes));
            }
        });
        document.toString();
        return document.join('');
    }
}

export default WixParser;