export interface HighlightedStringPart {
	value: string
	color?: string
}

export const highlightString = (input: string) => {
	const preTagRegex = /<highlight color="(#[a-z0-9]{6})">/
	const postTag = '</highlight>'
	const stringParts = input.split(/(<highlight color="#[a-z0-9]{6}">|<\/highlight>)/)
	const colorStack: string[] = []
	const parts = stringParts.reduce<HighlightedStringPart[]>((acc, stringPart) => {
		const preTagRegexResult = preTagRegex.exec(stringPart)
		if (preTagRegexResult) {
			// Pretag, update color stack
			const color = preTagRegexResult[1] || '#ffffff'
			colorStack.push(color)
		} else if (stringPart === postTag) {
			// Posttag, update color stack
			colorStack.pop()
		} else if (stringPart !== '') {
			// Not a pre- or posttag, but a value to be returned
			const color = colorStack[colorStack.length - 1]
			acc.push({
				value: stringPart,
				...(color && { color }) // Only add color prop when it's not undefined
			})
		}
		return acc
	}, [])
	console.log(parts)
}

const testStrings = [
	'Exercitation ipsum ad non laboris <highlight color="#ff00bb">velit</highlight> esse duis nostrud culpa <highlight color="#55aa33">sunt <highlight color="#cc77dd">adipisicing</highlight></highlight>.',
	'<highlight color="#abcdef">Eu</highlight> officia cupidatat dolore nostrud elit laboris <highlight color="#001122">excepteur</highlight> <highlight color="#ffddaa">Lorem</highlight> excepteur adipisicing quis quis et laboris.',
	'Officia <highlight color="#ff0000"><highlight color="#ff0010">cup</highlight><highlight color="#ff0020">idatat</highlight></highlight> dolore nostrud elit laboris.',
	'Aanbrengen van een <highlight color="#ff11ff"><highlight color="#ff12ff">weg</highlight><highlight color="#ff13ff"><highlight color="#ff14ff">fun</highlight>dering</highlight></highlight> van ongebonden steenmengsel.'
]

testStrings.forEach((testString) => highlightString(testString))
