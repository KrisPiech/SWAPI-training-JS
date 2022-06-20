export class Base {
	constructor(name, url, created) {
		this.name = name
		this.url = url
		this.created = created
	}
}
export class People extends Base {
	constructor(name, url, created, birth_year, gender, height, mass) {
		super(name, url, created)
		this.birth_year = birth_year
		this.gender = gender
		this.height = height
		this.mass = mass
	}
}
export class Planets extends Base {
	constructor(name, url, created, climate, gravity, population, terrain) {
		super(name, url, created)
		this.climate = climate
		this.gravity = gravity
		this.population = population
		this.terrain = terrain
	}
}
export class Films {
	constructor(
		producer,
		url,
		created,
		director,
		episode_id,
		release_date,
		title
	) {
		this.producer = producer
		this.url = url
		this.created = created
		this.director = director
		this.episode_id = episode_id
		this.release_date = release_date
		this.title = title
	}
}
export class Species extends Base {
	constructor(
		name,
		url,
		created,
		classification,
		designation,
		homeworld,
		language
	) {
		super(name, url, created)
		this.classification = classification
		this.designation = designation
		this.homeworld = homeworld
		this.language = language
	}
}
export class Vehicle extends Base {
	constructor(
		name,
		url,
		created,
		cost_in_credits,
		model,
		max_atmosphering_speed,
		manufacturer
	) {
		super(name, url, created)
		this.cost_in_credits = cost_in_credits
		this.model = model
		this.max_atmosphering_speed = max_atmosphering_speed
		this.manufacturer = manufacturer
	}
}
export class Starships extends Base {
	constructor(
		name,
		url,
		created,
		cost_in_credits,
		length,
		max_atmosphering_speed,
		model
	) {
		super(name, url, created)
		this.cost_in_credits = cost_in_credits
		this.length = length
		this.max_atmosphering_speed = max_atmosphering_speed
		this.model = model
	}
}
