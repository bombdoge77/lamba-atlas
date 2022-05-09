var params = {
	text : '',
	category : ''
}

export function getSearchParams() {
	return params
}

export function setText(text) {
	params.text = text
	console.log(params)
}

export function setCategory(category) {
	params.category = category
}