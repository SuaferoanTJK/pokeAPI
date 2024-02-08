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
            abilities: data.abilities.map(item => item.ability.name),
            baseXp: data.base_experience,
            height: data.height,
            stats: data.stats.map(item => ({name: item.stat.name, value: item.base_stat })),
            type: data.types.map(item => item.type.name),
            weight: data.weight,
            sprite: data.sprites.other.home.front_default
        }       
        alertContainer.innerHTML = '';
        pokemonContainer.innerHTML = `
            <div class="d-flex flex-column gap-2">
                <img width="300" src='${pokemonData.sprite}' alt="pokemon_sprite"/>
            </div>
        `;
        console.log({data, pokemonData});
    })
    .catch(() => {
        pokemonContainer.innerHTML = ''
        alertContainer.innerHTML = '<div class="alert alert-info mt-4" role="alert">No ha seleccionado un pokemon, por favor seleccione alguno de los pokemons disponibles</div>'
    })
}