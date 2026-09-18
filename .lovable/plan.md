# Cálculos astrológicos reais no Astro-Tools

Hoje o Astro-Tools gera posições planetárias fictícias a partir de um "hash" dos dados do formulário (`computeChart` em `src/routes/astro-tools.tsx`), e Dashas/Gunas vêm de dados fixos em `src/data/mockData.ts`. A proposta substitui isso por efemérides astronômicas reais, no padrão Astro-Seek / Astro.com.

## O que muda para quem usa

- Campo de cidade vira uma busca real, com sugestões: ao escolher a cidade, latitude, longitude e fuso horário são preenchidos automaticamente (inclusive horário de verão histórico correto — ex.: São Paulo em 1994).
- Mapa natal com posições verdadeiras de Sol, Lua, Mercúrio a Plutão, Nodos Lunares e Quíron, com grau, minuto, signo, casa e movimento retrógrado.
- Ascendente, Meio-do-Céu e cúspides das 12 casas calculados de verdade, com escolha de sistema de casas (Placidus, Whole Sign, Koch, Igual).
- Zodíaco Tropical ou Sideral com ayanamsa selecionável (Lahiri padrão, mais Raman e Krishnamurti).
- Tabela de aspectos reais entre os planetas, com orbes configuráveis.
- Sinastria passa a comparar dois mapas calculados de verdade; os 36 Gunas (Ashtakoota) passam a ser derivados das Nakshatras reais da Lua de cada pessoa.
- Vimshottari Dasha calculada a partir da posição exata da Lua no momento do nascimento, com Mahadasha e Antardasha datadas.
- Mapa dracônico derivado do mapa real (rotação pelo Nodo Norte).
- Possibilidade de salvar o mapa calculado no Banco de Mapas.

## Como será feito

Motor de cálculo em função de servidor (`createServerFn`), não no navegador, para manter o bundle leve e o resultado idêntico entre SSR e cliente.

- Efemérides: biblioteca `astronomia` (VSOP87/ELP, JavaScript puro, compatível com o runtime de borda). Precisão na ordem de segundos de arco — equivalente ao que sites populares exibem em grau/minuto. Sem binários nativos (Swiss Ephemeris nativo não roda neste ambiente).
- Geocodificação: API pública Open-Meteo Geocoding (sem chave) para cidade → lat/lon/país; fuso horário via `tz-lookup` (lat/lon → IANA) e conversão de hora local para UTC com as regras históricas do `Intl.DateTimeFormat`.
- Novos módulos: `src/lib/astro/ephemeris.ts` (posições planetárias, nodos, retrogradação), `src/lib/astro/houses.ts` (ASC/MC e cúspides por sistema), `src/lib/astro/ayanamsa.ts`, `src/lib/astro/aspects.ts`, `src/lib/astro/vedic.ts` (Nakshatra, Vimshottari, Ashtakoota), `src/lib/astro/time.ts` (Julian Day, fuso).
- Server functions em `src/lib/astro/chart.functions.ts`: `calculateChart`, `searchPlace`, `calculateSynastry`.
- `src/types/astrology.ts` ganha campos reais (longitude decimal, velocidade, cúspides, ASC/MC, aspectos, dados de nascimento).
- `ChartWheel` passa a desenhar cúspides reais e linhas de aspecto, em vez de 12 divisões fixas.
- `src/routes/astro-tools.tsx` troca `computeChart` por `useMutation` sobre a server function, com estados de carregamento e erro; Dashas e Gunas deixam de ler `mockData`.
- Validação de entrada com Zod; testes de conferência comparando algumas datas conhecidas com valores publicados (tolerância de 1 minuto de arco) em `src/lib/astro/__tests__`.

## Fora do escopo desta etapa

- Trânsitos, progressões, revolução solar e retornos.
- Persistência dos mapas em banco de dados (o Banco de Mapas segue com dados locais até habilitarmos backend).
- Divisionais védicos além do D1 (D9 Navamsa pode entrar numa etapa seguinte).
