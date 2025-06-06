# react-useful-hooks

Uma coleção de React hooks reutilizáveis, práticos e enxutos. Ideal para quem busca abstrações simples para tarefas comuns em projetos com React.

## 📦 Instalação

```bash
npm install react-useful-hooks
# ou
yarn add react-useful-hooks
```

## 🧠 Hooks Disponíveis

### `useEventListener`

Um hook poderoso e flexível para adicionar/remover event listeners em elementos DOM ou referências do React (`ref`).

#### ✔️ Recursos:

* Suporte a múltiplos targets (elementos ou refs)
* Suporte a múltiplos eventos
* Limpável automaticamente com o ciclo de vida do React

#### 🔤 Uso

```tsx
import { useRef } from 'react';
import { useEventListener } from 'react-useful-hooks';

function Example() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener({
    ref: buttonRef,
    type: 'click',
    callback: () => {
      alert('Botão clicado!');
    },
  });

  return <button ref={buttonRef}>Clique em mim</button>;
}
```

#### 🎯 Tipagem avançada

Você pode utilizar tipos personalizados para eventos:

```ts
useEventListener<HTMLElement, { myCustomEvent: CustomEvent<string> }>({
  target: document.getElementById('myElement'),
  type: 'myCustomEvent',
  callback: (e) => {
    console.log(e.detail); // string
  },
});
```

---
<!--
## 📚 Em breve

* `useInterval`
* `useTimeout`
* `useIsomorphicLayoutEffect`
* e outros hooks úteis...

---
-->

## 🔧 Contribuindo

Sinta-se à vontade para abrir issues ou PRs com sugestões de novos hooks ou melhorias nos existentes.
