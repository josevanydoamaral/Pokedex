import {IPokemonRepository} from "../../../../shared/repositories/contracts/IPokemonRepository";
import {SearchPokemonUsecase} from "./SearchPokemonUsecase";
import {Pokemon} from "../../../../shared/models/Pokemon";


describe("SearchPokemonUsecase", () => {
    const mockRepository: IPokemonRepository = { findPokemon: jest.fn() }

    const sut = new SearchPokemonUsecase(mockRepository);

    beforeEach(() => {
        jest.resetAllMocks();
    })

    it("Deve receber uma mensagem de erro: 'Campo vazio' e não deve chamar o repositório", async () => {
        // ARRANGE - Preparar os dados
        const searchTerm = "     "

        // ACT - executar a ação

        const result = await sut.execute(searchTerm);

        // ASSERT - Fazer as verificações

        expect(result.success).toBe(false);

        expect(mockRepository.findPokemon).not.toHaveBeenCalled();

        if (!result.success) {
            expect(result.errorMessage).toBe("Campo vazio.");
        }

    })

    it("Deve retornar null e a mensagem de erro deve ser: 'Pokemon não encontrado'", async () => {
        // ARRANGE - Preparar os dados
        const searchTerm = "Josevany";

        jest.mocked(mockRepository.findPokemon).mockResolvedValue(null)

        // ACT - Executar a ação
        const result = await sut.execute(searchTerm);

        // ASSERT - Fazer as verificações

        expect(result.success).toBe(false);
        expect(mockRepository.findPokemon).toHaveBeenCalledTimes(1)

        if (!result.success) {
            expect(result.errorMessage).toBe("Pokemon não encontrado.");
        }
    });

    it("Deve retornar success false com erro: 'Erro de rede.'", async () => {
        // ARRANGE - Preparar os dados

        const searchTerm = "pikachu"

        jest.mocked(mockRepository.findPokemon).mockRejectedValue(new Error("Erro de rede."));

        // ACT - Executar a ação
        const result = await sut.execute(searchTerm);

        // ASSERT - Fazer as verificações
        expect(result.success).toBe(false);
        expect(mockRepository.findPokemon).toHaveBeenCalledTimes(1);

        if (!result.success) {
            expect(result.errorMessage).toBe('Erro de rede.')
        }
    })

    it("Deve retornar success true e um objeto do tipo Pokemon", async () => {
        // ARRANGE - Preparar os dados

        const searchTerm = "pikachu"

        const poke = {
            id: 25,
            name: "Pokemon",
            weight: 60,
            height: 4,
            kinds: ['electric'],
            spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ix/scarlet-violet/25.png'
        } as Pokemon

        jest.mocked(mockRepository.findPokemon).mockResolvedValue(poke);

        // ACT - Executar a ação
        const result = await sut.execute(searchTerm);

        // ASSERT - Fazer as verificações

        expect(result.success).toBe(true);
        expect(mockRepository.findPokemon).toHaveBeenCalledTimes(1);

        if (result.success) {
            expect(result.result).toStrictEqual(poke);
        }
    })
})