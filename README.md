# Pokédex Offline — POC

App React Native (Expo + TypeScript) que permite pesquisar Pokémon na PokéAPI, guardar favoritos com foto capturada, e continuar a aceder a esses favoritos sem internet.

## Instalação e execução

```bash
npm install
npx expo start
```

Abrir no dispositivo/emulador a partir do menu do Expo (Android/iOS). Funcionalidades de câmara e ficheiros exigem um dispositivo físico ou emulador com câmara configurada — não funcionam totalmente no Expo Go web.

Correr testes unitários:
```bash
npx jest
```

## Bibliotecas principais

- `expo` — runtime e ferramentas de build
- `expo-image-picker` — captura de foto via câmara nativa
- `expo-file-system` (API `Directory`/`File`) — persistência do ficheiro de imagem
- `@react-native-async-storage/async-storage` — persistência dos metadados dos favoritos
- `@react-navigation/native` + `@react-navigation/native-stack` (Static API) — navegação entre ecrãs
- `react-native-safe-area-context` — tratamento de safe area em diferentes dispositivos
- `jest` — testes unitários

## Decisões técnicas

**Arquitetura em camadas (MVVM):** Model → Repository (contrato em `contracts/` + implementação) → UseCase → ViewModel → View. Cada camada só conhece a de baixo através de uma interface, nunca da implementação concreta.

**Feature-first:** duas features de domínio de dados — `pokemon/` (dados remotos, só leitura da PokéAPI) e `photo-record/` (dados locais, AsyncStorage + FileSystem). Uma feature `home/` de composição junta ViewModels das duas para o ecrã inicial, sem lógica de domínio própria.

**Favoritar = persistir:** o modelo não tem estado "guardado mas não favorito" — criar um registo assume sempre `isFavorite: true`. Consequência: remover um favorito é sempre uma operação de exclusão completa (metadados + ficheiro de imagem), com confirmação, nunca um simples toggle de flag.

**Duplicados:** guardar um Pokémon já favoritado atualiza o registo existente (por `pokemon.id`) em vez de criar um segundo.

**Offline-first:** a PokéAPI é só leitura e só usada quando há conexão; a lista de favoritos é sempre lida do AsyncStorage, nunca da API. Erros de rede ou 404 nunca apagam dados locais já guardados.

**Sincronização:** disparo manual (botão), não automático. Percorre só os favoritos já guardados e atualiza os campos vindos do servidor (nome, tipos, sprite, altura, peso) — nunca `isFavorite` nem `capturedPhotoUri`, que são exclusivamente locais. Estados: `pending → syncing → synced`, com `error` em caso de falha e proteção contra duplo disparo simultâneo.

**Tratamento de erros no repositório:** falha de infraestrutura (rede, servidor) propaga por `throw`; ausência de dado esperado devolve `null`/`[]`. Value objects (como o array `kinds`) validados/tipados na fronteira com a API, não confiados cegamente.

## Limitações conhecidas

- Sem paginação na lista de favoritos (carrega tudo de uma vez).
- Mensagens de erro/sucesso ainda não centralizadas num componente único (toast) — usam `Alert.alert`/texto inline por ecrã.
- Sincronização só manual, sem disparo automático ao reconectar.
- Sem SQLite — persistência local via AsyncStorage (chave-valor), adequado à escala de uma POC mas não otimizado para grandes volumes de registos.
- Sem testes de integração end-to-end; cobertura atual é unitária (use cases e repositório).
