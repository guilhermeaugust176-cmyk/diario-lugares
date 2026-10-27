📖 Diário de Lugares - Mobile SENAI Agudos

Aplicativo desenvolvido para a disciplina de Programação para Dispositivos Móveis no SENAI Agudos, sob orientação do professor Rodolfo Oliveira.

O projeto consiste em um Diário de Lugares construído com React Native, TypeScript e Expo, aplicando recursos nativos do dispositivo (Câmera e GPS), persistência de dados local com AsyncStorage e boas práticas de arquitetura.

🎯 Canvas do Projeto (Regras de Negócio)

Tema: Diário de Lugares (Tema 1).

Campos do Registro: Título, Anotações, Foto (Câmera), Coordenadas (Latitude e Longitude) e Data de Criação.

Regra de Aceite / Validação:

Título é de preenchimento obrigatório.

O registro deve possuir obrigatoriamente pelo menos uma Foto OU a Localização via GPS.

Persistência: Utilização de AsyncStorage encapsulado com o Padrão Repository sob a chave @diario-de-lugares:places.

Timeout de Hardware: Tratamento de timeout de 20 segundos na busca por sinal GPS para evitar bloqueio de interface.

🛠️ Tecnologias e Pacotes Utilizados

Framework: React Native com Expo (v58)

Linguagem: TypeScript

Câmera: expo-camera

Geolocalização: expo-location

Armazenamento Local: @react-native-async-storage/async-storage

📂 Arquitetura do Projeto

O código foi organizado seguindo a separação clara de responsabilidades:

diario-lugares/
├── src/
│   ├── types/
│   │   └── index.ts               # Interface e contrato de dados (Place, NewPlace)
│   ├── hooks/
│   │   └── useCurrentLocation.ts   # Custom Hook para gerenciamento e timeout do GPS
│   ├── repositories/
│   │   └── PlaceRepository.ts     # Camada de persistência (AsyncStorage + Validações)
│   └── components/
│       ├── PlaceForm.tsx          # Interface e captura da Câmera e GPS
│       └── PlaceList.tsx          # Renderização dos cartões guardados
├── App.tsx                        # Componente principal (Tela única rolável)
├── app.json                       # Configurações do Expo e permissões nativas
└── package.json                   # Dependências do projeto


🚀 Como Executar o Projeto

Pré-requisitos

Node.js instalado.

Android Studio (com emulador configurado) ou aplicativo Expo Go em dispositivo móvel.

Passos

Clone este repositório:

git clone https://github.com/guilhermeaugust176-cmyk/diario-lugares.git
cd diario-lugares


Instale as dependências:

npm install


Inicie o servidor de desenvolvimento do Expo:

npx expo start


Executando:

Emulador Android Studio: Pressione a tecla a no terminal com o emulador aberto.

Celular Físico: Escaneie o QR Code exibido no terminal utilizando o aplicativo Expo Go.

👤 Autor

Desenvolvido por Guilherme

Curso Técnico em Desenvolvimento de Sistemas — SENAI Agudos / 2026.
