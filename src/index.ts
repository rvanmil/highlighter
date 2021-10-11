export interface HighlightedStringPart {
	value: string
	isHighlighted: boolean
	color?: string
}

export const highlightString = (input: string) => {
	const preTagRegex = /<highlight color="(#[a-z0-9]{6})">/
	const postTag = '</highlight>'
	const splitByPreTag = input.split(preTagRegex)
	const firstValue = splitByPreTag.shift()
	const parts: HighlightedStringPart[] = []
	if (firstValue) {
		parts.push({ value: firstValue, isHighlighted: false })
	}
	let color
	splitByPreTag.forEach((split) => {
		const splitByPostTag = split.split(postTag)
		if (
			splitByPostTag.length === 1 &&
			splitByPostTag[0].match(/^#[a-z0-9]{6}$/)
		) {
			color = splitByPostTag[0]
		} else {
			if (splitByPostTag.length === 1) {
				parts.push({
					value: splitByPostTag[0],
					isHighlighted: Boolean(color),
					color
				})
			} else if (splitByPostTag.length > 1) {
				splitByPostTag.forEach((splitByPostTagPart, index) => {
					if (index === 0) {
						parts.push({
							value: splitByPostTagPart,
							isHighlighted: true,
							color
						})
					} else if (splitByPostTagPart !== '') {
						parts.push({
							value: splitByPostTagPart,
							isHighlighted: false
						})
					}
				})
			}
		}
	})
	console.log({ parts })
	return parts
}

const testStrings = [
	'Exercitation ipsum ad non laboris <highlight color="#ff00bb">velit</highlight> esse duis nostrud culpa <highlight color="#55aa33">sunt <highlight color="#cc77dd">adipisicing</highlight></highlight>.',
	'<highlight color="#abcdef">Eu</highlight> officia cupidatat dolore nostrud elit laboris <highlight color="#001122">excepteur</highlight> <highlight color="#ffddaa">Lorem</highlight> excepteur adipisicing quis quis et laboris.'
]

testStrings.forEach((testString) => highlightString(testString))
