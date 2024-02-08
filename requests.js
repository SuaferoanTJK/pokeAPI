const pokeApiEndpoint = "https://pokeapi.co/api/v2/pokemon/"

const getPokemon = () => {
    const selectedInput = document.getElementById("select_input");
    const alertContainer = document.getElementById("alert_container");
    const pokemonContainer = document.getElementById("pokemon_container");
    pokemonContainer.innerHTML = '<div class="w-100 d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>'
    
    const pokemonPk = Number(selectedInput.value);
    fetch(`${pokeApiEndpoint}${pokemonPk}/`)
    .then(res => {        
        if(res.ok) return res.json()
    })
    .then(data => {
        const pokemonData = {
            abilities: data.abilities.map(item => item.ability.name).join(", "),
            baseXp: data.base_experience,
            height: data.height,
            name: data.name,
            stats: data.stats.map(item => ({name: item.stat.name, value: item.base_stat })),
            type: data.types.map(item => item.type.name).join(", "),
            weight: data.weight,
            sprite: data.sprites.other.home.front_default
        }       
        alertContainer.innerHTML = '';
        pokemonContainer.innerHTML = `
            <div class="card" style="width: 100%;">
                <div class="w-100 d-flex align-items-center p-3">
                    <div class="w-50 d-flex justify-content-center">
                        <img height="auto" src='${pokemonData.sprite}' alt="pokemon_sprite"/>
                    </div>
                    <div class="w-50 d-flex flex-column">
                        <h3 class="card-title">${pokemonData.name}</h3>
                        <p class="card-text fw-bold m-0 p-0">Habilidades: <span class="fw-normal">${pokemonData.abilities}</span></p>
                        <p class="card-text fw-bold m-0 p-0">Experiencia base: <span class="fw-normal">${pokemonData.baseXp}</span></p>
                        <p class="card-text fw-bold m-0 p-0">Altura: <span class="fw-normal">${pokemonData.height}</span></p>
                        <p class="card-text fw-bold m-0 p-0">Tipo: <span class="fw-normal">${pokemonData.type}</span></p>
                        <p class="card-text fw-bold m-0 p-0 mb-3">Peso: <span class="fw-normal">${pokemonData.weight}</span></p>
                    </div>
                </div>
            </div>
        `;
        console.log({data, pokemonData});
    })
    .catch(() => {
        pokemonContainer.innerHTML = ''
        alertContainer.innerHTML = '<div class="alert alert-info mt-4" role="alert">No ha seleccionado un pokemon, por favor seleccione alguno de los pokemons disponibles</div>'
    })
}