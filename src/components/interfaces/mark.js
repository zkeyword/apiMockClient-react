import { ReactMdeCommands } from 'react-mde'
import {
    insertText
} from './ReactMdeTextHelper'

// function getSurroundingWord(text, position) {
//     if (!text) throw Error('Argument \'text\' should be truthy')

//     const isWordDelimiter = c => c === ' ' || c.charCodeAt(0) === 10

//     // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
//     let leftIndex = 0
//     // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
//     let rightIndex = text.length

//     // iterate to the left
//     for (let i = position; i - 1 > -1; i--) {
//         if (isWordDelimiter(text[i - 1])) {
//             leftIndex = i
//             break
//         }
//     }

//     // iterate to the right
//     for (let i = position; i < text.length; i++) {
//         if (isWordDelimiter(text[i])) {
//             rightIndex = i
//             break
//         }
//     }

//     return {
//         word: text.slice(leftIndex, rightIndex),
//         position: [leftIndex, rightIndex]
//     }
// }
let commands = ReactMdeCommands.getDefaultCommands()

let arr = [
    {
        type: 'button',
        icon: 'string',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, '"string": "★★★★★"', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'array',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, '"array": [{ "name": "Hello"}]', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
        // execute: function (text, selection) {
        //     if (text && text.length && selection[0] === selection[1]) {
        //         // the user is pointing to a word
        //         selection = getSurroundingWord(text, selection[0]).position
        //     }
        //     // the user is selecting a word section
        //     var { newText, insertionLength } = insertText(text, '"array": [{ "name": "Hello"}]', selection[0])
        //     // newText = insertText(newText, '31', selection[1] + insertionLength).newText
        //     return {
        //         text: newText,
        //         selection: [selection[0] + insertionLength, selection[1] + insertionLength]
        //     }
        //     // return makeHeader(text, selection, '#456')
        // }
    }, {
        type: 'button',
        icon: 'number',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, '"number": 201', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'object',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, '"object": {"310000": "上海市", "320000": "江苏省"}', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'boolean',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, '"boolean": false', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'image',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, "Random.image('200x100', '#894FC4', '#FFF', 'png', '!')", selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'date',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, "Random.date('yyyy - MM - dd')", selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }, {
        type: 'button',
        icon: 'clear',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { insertionLength } = insertText(text, selection[0])
            return {
                text: '',
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }
]
let arr2 = [
    {
        type: 'button',
        icon: 'post',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, 'post', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    },
    {
        type: 'input',
        icon: 'get',
        tooltip: 'Add bold text',
        execute: function (text, selection) {
            var { newText, insertionLength } = insertText(text, 'get', selection[0])
            return {
                text: newText,
                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
            }
        }
    }
]
commands.splice(0, 3, arr)
commands.push(arr2)
export default { commands }
