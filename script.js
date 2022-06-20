window.onload = init

import {
	Base,
	People,
	Planets,
	Films,
	Species,
	Vehicle,
	Starships,
} from "./class.js"

const BASE_URL = "https://swapi.py4e.com/api/"
const table = document.querySelector("#list")
let currentCollectionData = null
let detailsData = null
const paginationButtons = document.querySelector("#pagination")
let tdDetailsSection = document.querySelector(".details")
let closeButton = document.querySelector(".close")
const cancelButton = document.querySelector(".cancel")
const confirmButton = document.querySelector(".confirm")
let tableExsist = 0
let actualPageNumber = 1

/////  FUNCTIONS  ////////////////////////////////////////////

async function getData(URL) {
	const response = await fetch(URL)
	return await response.json()
}
const onclickRefreshFunction = () => {
	window.location.reload()
}
async function fetchCollection(collectionName) {
	const response = await fetch(`${BASE_URL}${collectionName}`)
	currentCollectionData = await response.json()
}
function closeDetails() {
	let tr = this.parentNode.parentNode.parentNode
	let td = this.parentNode.parentNode
	tr.removeChild(td)
}
function openDialogue() {
	tdDetailsSection.removeChild(this)
	const closeDiv = document.createElement("div")
	const cancelButton = document.createElement("button")
	const confirmButton = document.createElement("button")
	const inquiry = document.createElement("span")
	inquiry.classList.add("span")
	cancelButton.classList.add("cancel")
	confirmButton.classList.add("confirm")
	cancelButton.onclick = backToPrevious
	confirmButton.onclick = closeDetails
	inquiry.innerHTML = "Are you sure?"
	cancelButton.innerHTML = "NO"
	confirmButton.innerHTML = "YES"
	closeDiv.appendChild(inquiry)
	closeDiv.appendChild(cancelButton)
	closeDiv.appendChild(confirmButton)
	tdDetailsSection.prepend(closeDiv)
}
function backToPrevious() {
	tdDetailsSection.removeChild(this.parentNode)
	closeButton = document.createElement("button")
	closeButton.onclick = openDialogue
	tdDetailsSection.classList.add("details")
	closeButton.classList.add("close")
	closeButton.innerHTML = "CLOSE"
	tdDetailsSection.prepend(closeButton)
}
async function fetchDetails(URL) {
	const response = await fetch(URL)
	detailsData = await response.json()
	return detailsData
}
async function fetchPreviousPage() {
	console.log("Tu powinna się wyświetlić poprzednia strona")
}
async function fetchNextPage() {
	const response = await fetch(currentCollectionData.next)
	currentCollectionData = await response.json()
	let numberOfPage = document.querySelector(".numberOfPage")

	let string = currentCollectionData.next
	actualPageNumber = Math.floor(string.charAt(string.length - 1)) - 1
	numberOfPage.innerHTML=`Page ${actualPageNumber}`
	console.log(
		"Tu powinna się wyświetlić następna strona, aktualna to =",
		actualPageNumber
	)
}
const pagination = () => {
	const previousButton = document.createElement("button")
	let numberOfPage = document.createElement("span")
	const nextButton = document.createElement("button")
	let pageNumber = Math.ceil(currentCollectionData.count / 10)
	previousButton.innerHTML = "PREVIOUS"
	numberOfPage.innerHTML = `Page ${actualPageNumber} of ${pageNumber}`
	nextButton.innerHTML = "NEXT"
	previousButton.classList.add("nextAndPrevious")
	numberOfPage.classList.add("numberOfPage")
	nextButton.classList.add("nextAndPrevious")
	previousButton.onclick = fetchPreviousPage
	nextButton.onclick = fetchNextPage
	paginationButtons.appendChild(previousButton)
	paginationButtons.appendChild(numberOfPage)
	paginationButtons.appendChild(nextButton)
}
function clearSection(firstElement, secondEement) {
	if (tableExsist === 1) {
		tableExsist = 0
		firstElement.innerHTML = ""
		secondEement.innerHTML = ""
	}
	tableExsist++
}
const mainButtons = (data, onclickFunction, onclickRefreshFunction) => {
	let buttons = document.querySelector("#buttons")
	Object.keys(data).map(key => {
		let button = document.createElement("button")
		buttons.appendChild(button)
		button.innerHTML = key.toUpperCase()
		button.onclick = onclickFunction
		button.classList = "mainButtons"
	})
	const homeButton = document.createElement("button")
	homeButton.innerHTML = "REFRESH!"
	buttons.appendChild(homeButton)
	homeButton.onclick = onclickRefreshFunction
	homeButton.classList = "refreshButton"
}
const resultsSection = (tr, data) => {
	const thResults = document.createElement("th")
	thResults.innerHTML = `${data} RESULTS`
	tr.appendChild(thResults)
	thResults.classList.add("result")
}
const idSection = tr => {
	const thID = document.createElement("th")
	thID.innerHTML = "ID"
	tr.appendChild(thID)
}
const getNewKeys = objectWithPrimaryKeys => {
	let primaryKeys = Object.keys(objectWithPrimaryKeys)
	let cutOutKeys = primaryKeys.splice(1, 2)
	primaryKeys.push(cutOutKeys)
	return primaryKeys.flat()
}
const dateTransform = dateForm => {
	let input = new Date(dateForm)
	let day = input.getDate()
	let month = input.getMonth() + 1
	let year = input.getFullYear()
	return `${day} / ${month} / ${year}`
}
const createdSection = (tr, newDate) => {
	const tdCreated = document.createElement("td")
	tdCreated.innerHTML = newDate
	tr.appendChild(tdCreated)
}
const actionSection = table => {
	const thAction = document.createElement("th")
	thAction.innerHTML = "ACTION"
	table.appendChild(thAction)
	thAction.classList.add("tableAction")
}
const buttonsRemoveAndDetails = (table, handleButtonDetails) => {
	const tdButtonDetails = document.createElement("button")
	const tdButtonRemove = document.createElement("button")
	tdButtonDetails.innerHTML = `<img class="delete" src="./images/details.png">`
	tdButtonRemove.innerHTML = `<img class="delete" src="./images/delete.png">`
	tdButtonDetails.onclick = handleButtonDetails
	tdButtonRemove.onclick = deleteThisRow
	tdButtonDetails.classList.add("detailsButton")
	tdButtonRemove.classList.add("removeButton")
	table.appendChild(tdButtonDetails)
	table.appendChild(tdButtonRemove)
}
function rowDelete() {
	let table = this.parentNode.parentNode.parentNode.parentNode
	let tr = this.parentNode.parentNode.parentNode
	table.removeChild(tr)
}
function closeDeleteDialogue() {
	let tr = this.parentNode.parentNode.parentNode
	let td = this.parentNode.parentNode
	tr.removeChild(td)
}
function deleteThisRow() {
	const td = this.parentNode
	const dialogue = document.createElement("td")
	const choice = document.createElement("tr")
	const confirmOrCancel = document.createElement("tr")
	const inquiryDelete = document.createElement("span")
	const cancelDelete = document.createElement("button")
	const confirmlDelete = document.createElement("button")
	inquiryDelete.innerHTML = "Do you really want to delete this row?"
	cancelDelete.innerHTML = "NO"
	confirmlDelete.innerHTML = "YES"
	confirmlDelete.onclick = rowDelete
	cancelDelete.onclick = closeDeleteDialogue
	dialogue.classList.add("dialogue")
	cancelDelete.classList.add("cancelDelete")
	confirmlDelete.classList.add("confirmDelete")
	inquiryDelete.classList.add("spanDelete")
	choice.appendChild(inquiryDelete)
	choice.appendChild(cancelDelete)
	choice.appendChild(confirmlDelete)
	dialogue.appendChild(confirmOrCancel)
	dialogue.appendChild(choice)
	td.appendChild(dialogue)
}

async function init() {
	const data = await getData(BASE_URL)

	async function handleButtonClick() {
		const collectionName = this.textContent.toLowerCase()
		await fetchCollection(collectionName)

		clearSection(table, paginationButtons)

		/////   INSTANCES   ///////////////////////////////////////
		const peopleInstances = () =>
			currentCollectionData.results.map(
				({ name, url, created, birth_year, gender, height, mass }) =>
					new People(name, url, created, birth_year, gender, height, mass)
			)
		const planetsInstances = () =>
			currentCollectionData.results.map(
				({ name, url, created, climate, gravity, population, terrain }) =>
					new Planets(name, url, created, climate, gravity, population, terrain)
			)
		const filmsInstances = () =>
			currentCollectionData.results.map(
				({
					producer,
					url,
					created,
					director,
					episode_id,
					release_date,
					title,
				}) =>
					new Films(
						producer,
						url,
						created,
						director,
						episode_id,
						release_date,
						title
					)
			)
		const vehiclesInstances = () =>
			currentCollectionData.results.map(
				({
					name,
					url,
					created,
					cost_in_credits,
					model,
					max_atmosphering_speed,
					manufacturer,
				}) =>
					new Vehicle(
						name,
						url,
						created,
						cost_in_credits,
						model,
						max_atmosphering_speed,
						manufacturer
					)
			)
		const speciesInstances = () =>
			currentCollectionData.results.map(
				({
					name,
					url,
					created,
					classification,
					designation,
					homeworld,
					language,
				}) =>
					new Species(
						name,
						url,
						created,
						classification,
						designation,
						homeworld,
						language
					)
			)
		const starshipsInstances = () =>
			currentCollectionData.results.map(
				({
					name,
					url,
					created,
					cost_in_credits,
					length,
					max_atmosphering_speed,
					model,
				}) =>
					new Starships(
						name,
						url,
						created,
						cost_in_credits,
						length,
						max_atmosphering_speed,
						model
					)
			)
		const tableData = instances => {
			const trResults = document.createElement("tr")
			const trHeader = document.createElement("tr")
			const newKeys = getNewKeys(instances[1])
			resultsSection(trResults, currentCollectionData.count)
			idSection(trHeader)

			for (let i = 0; i < newKeys.length; i++) {
				const th = document.createElement("th")
				th.innerHTML = newKeys[i].toUpperCase()
				trHeader.appendChild(th)
			}
			table.appendChild(trResults)
			table.appendChild(trHeader)

			instances.forEach((objectInstances, index) => {
				const tableRow = document.createElement("tr")
				const newDate = dateTransform(objectInstances[newKeys[6]])
				const tdNumb = document.createElement("td")
				tdNumb.innerHTML = index + 1
				tableRow.appendChild(tdNumb)

				for (let i = 0; i < newKeys.length - 1; i++) {
					const td = document.createElement("td")
					td.innerHTML = objectInstances[newKeys[i]]
					tableRow.appendChild(td)
				}
				createdSection(tableRow, newDate)

				async function handleButtonDetails() {
					let URL_DETAILS = objectInstances.url
					await fetchDetails(URL_DETAILS)
					tdDetailsSection = document.createElement("td")
					closeButton = document.createElement("button")
					tdDetailsSection.classList.add("details")
					closeButton.classList.add("close")
					closeButton.innerHTML = "CLOSE"
					closeButton.onclick = openDialogue
					tableRow.appendChild(tdDetailsSection)
					tdDetailsSection.appendChild(closeButton)
					Object.entries(detailsData).map(([key, value]) => {
						const trDetails = document.createElement("tr")
						trDetails.innerHTML = `- ${key} : ${value}`
						tdDetailsSection.appendChild(trDetails)
					})
				}
				buttonsRemoveAndDetails(tableRow, handleButtonDetails)
				table.appendChild(tableRow)
			})
			actionSection(trHeader)
		}
		if (collectionName === "people") {
			console.log("peopleInstances", peopleInstances())
			tableData(peopleInstances())
		} else if (collectionName === "planets") {
			console.log("planetsInstances", planetsInstances())
			tableData(planetsInstances())
		} else if (collectionName === "films") {
			console.log("filmsInstances", filmsInstances())
			tableData(filmsInstances())
		} else if (collectionName === "vehicles") {
			console.log("vehiclesInstances", vehiclesInstances())
			tableData(vehiclesInstances())
		} else if (collectionName === "species") {
			console.log("speciesInstances", speciesInstances())
			tableData(speciesInstances())
		} else {
			console.log("starshipsInstances", starshipsInstances())
			tableData(starshipsInstances())
		}
		pagination()
	}
	mainButtons(data, handleButtonClick, onclickRefreshFunction)
	console.log("loaded", data)
}
