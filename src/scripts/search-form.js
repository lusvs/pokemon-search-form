const form = document.getElementById('pokemon-form')
const input = document.getElementById('pokemon-name')
const infoContainer = document.getElementById('pokemon-info')

async function getPokemon(event) {
    event.preventDefault()

    const pokemonName = input.value.trim().toLowerCase() //trim() Tira os espaços | toLowerCase() Deixa a letra minuscula
    input.value = '' //Faz a barra ficar vazia dps da pesquisa

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if(!response.ok){
            throw new Error("Pokemon not found!")
        }

        const pokemon = await response.json() //Organiza o JS

        infoContainer.innerHTML =`
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p><strong>Height: </strong>${pokemon.height / 10} m</p>
                <p><strong>Weight: </strong>${pokemon.weight / 10} kg</p>
                <p><strong>Types: </strong>${pokemon.types.map(type => type.type.name).join(', ')}</p> 
        `
    } catch (error){
        console.error('Error', error)
        infoContainer.innerHTML =`
        <p>Erro: Pokemon not found, try again in a few minutes...</p>
        `
    }
}

form.addEventListener('submit', getPokemon)