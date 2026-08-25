# Documentación de código frontend, backend y CSS

## 1. ¿Cómo se documenta el código frontend?

El frontend es la parte de la aplicación que se ejecuta en el navegador y con la que interactúa el usuario. Normalmente incluye HTML, CSS y JavaScript, además de frameworks como React, Vue o Angular.

Una buena documentación frontend debe explicar:

- Qué hace cada componente, página o módulo.
- Qué propiedades recibe un componente y qué datos devuelve.
- Cómo funcionan los estados, eventos y formularios.
- Qué rutas, servicios o endpoints utiliza.
- Cómo instalar, ejecutar y probar la aplicación.
- Qué decisiones de accesibilidad y diseño deben mantenerse.

### Técnicas habituales

**README:** describe la instalación, los comandos principales, la estructura del proyecto y las variables de entorno necesarias.

**Comentarios junto al código:** se usan para explicar decisiones o comportamientos que no son evidentes, no para repetir lo que el código ya expresa.

**JSDoc o TSDoc:** documenta funciones, componentes, parámetros y valores de retorno. Los editores pueden mostrar esta información mediante IntelliSense.

```js
/**
 * Filtra los productos disponibles por categoría.
 * @param {Array} products Lista de productos.
 * @param {string} category Categoría que se desea buscar.
 * @returns {Array} Productos que pertenecen a la categoría.
 */
function filterProducts(products, category) {
  return products.filter((product) => product.category === category);
}
```

**Documentación de componentes:** en React se pueden documentar las props, los estados importantes y los eventos de cada componente. Storybook también permite mostrar componentes de forma aislada y registrar sus variantes.

**Documentación de APIs:** aunque el endpoint pertenezca al backend, el frontend debe registrar qué método HTTP utiliza, qué parámetros envía y qué respuesta espera. OpenAPI/Swagger es una opción habitual para contratos de API.

## 2. Diferencia entre documentar frontend y backend

| Aspecto | Frontend | Backend |
|---|---|---|
| Ejecución | Navegador o aplicación cliente | Servidor |
| Usuario principal | Personas que usan la interfaz y desarrolladores frontend | Desarrolladores, operadores y mantenedores del sistema |
| Se documenta | Componentes, pantallas, navegación, estados, estilos, accesibilidad y eventos | Servicios, reglas de negocio, modelos, base de datos, autenticación, errores y rendimiento |
| Contratos | Props, eventos y respuestas que consume | Endpoints, parámetros, respuestas, códigos HTTP y validaciones |
| Herramientas frecuentes | JSDoc/TSDoc, Storybook, README y OpenAPI | OpenAPI/Swagger, JSDoc/TSDoc, diagramas, migraciones y README |
| Riesgos importantes | Accesibilidad, compatibilidad, experiencia de usuario y estado visual | Seguridad, permisos, integridad de datos, disponibilidad y escalabilidad |

Ambos lados deben documentar los contratos que comparten. Por ejemplo, si el backend cambia el nombre de un campo de una respuesta JSON, la documentación de la API debe actualizarse y el frontend debe adaptar su consumo.

## 3. ¿Cómo se documenta el código JavaScript?

JavaScript se documenta principalmente con comentarios claros, JSDoc y un README que explique el propósito del proyecto y sus comandos. La documentación debe concentrarse en el comportamiento público de funciones, clases y módulos.

Conviene documentar:

- El propósito de una función o módulo.
- Los parámetros, sus tipos y restricciones.
- El valor que devuelve una función.
- Los errores o excepciones que puede producir.
- Los efectos secundarios, como modificar el DOM, realizar una petición o cambiar un estado.
- Las dependencias y los formatos de datos utilizados.

### Ejemplo con JSDoc

```js
/**
 * Calcula el precio final aplicando un descuento.
 * @param {number} price Precio original, mayor o igual que cero.
 * @param {number} discount Porcentaje de descuento entre 0 y 100.
 * @returns {number} Precio final.
 * @throws {RangeError} Si el precio o el descuento no son válidos.
 */
function calculateFinalPrice(price, discount) {
  if (price < 0 || discount < 0 || discount > 100) {
    throw new RangeError('Los valores no son válidos');
  }

  return price - price * (discount / 100);
}
```

Los comentarios deben explicar el motivo de una decisión cuando no sea evidente. No es útil escribir comentarios que solo repitan una instrucción, como `// suma uno` encima de `counter += 1`. También es importante actualizar la documentación cuando cambia el comportamiento del código.

## 4. ¿Cómo se documenta el código React específicamente?

En React se documentan los componentes, sus props, el estado, los eventos, los hooks, los contextos y las decisiones de composición. Cada componente debería dejar claro qué recibe, qué muestra y cómo se comporta ante las interacciones del usuario.

Se recomienda incluir:

- Propósito y responsabilidad del componente.
- Props obligatorias y opcionales, con sus tipos y valores por defecto.
- Eventos que emite, como `onSubmit` o `onChange`.
- Estados de carga, error, vacío y éxito.
- Efectos secundarios y dependencias importantes de los hooks.
- Requisitos de accesibilidad y comportamiento responsive.
- Ejemplos de uso y variantes visuales.

### Ejemplo con JSDoc

```jsx
/**
 * Muestra un botón que indica si una tarea está completada.
 * @param {{ label: string, completed: boolean, onToggle: () => void }} props
 * @returns {JSX.Element}
 */
function TaskButton({ label, completed, onToggle }) {
  return (
    <button type="button" onClick={onToggle} aria-pressed={completed}>
      {completed ? `Completada: ${label}` : `Pendiente: ${label}`}
    </button>
  );
}
```

Además de JSDoc, TypeScript o PropTypes pueden hacer explícito el contrato de las props. Storybook permite documentar componentes de manera interactiva, mostrando estados como cargando, deshabilitado o con error. En componentes complejos también conviene explicar por qué existe un estado o un `useEffect`, especialmente cuando hay peticiones, suscripciones o sincronización con datos externos.

## 5. ¿Cómo se documenta el código CSS?

La documentación CSS debe permitir entender cómo se organizan los estilos y qué reglas deben seguirse. Debe cubrir:

- Estructura de carpetas y orden de carga de los archivos.
- Convención para nombrar clases, por ejemplo BEM (`.card__title--featured`).
- Variables de color, tipografía, espaciado y tamaños.
- Puntos de ruptura y comportamiento responsive.
- Estados de los elementos: `hover`, `focus`, `disabled` y `active`.
- Reglas de accesibilidad, especialmente contraste y foco visible.
- Componentes reutilizables y excepciones justificadas.

### Comentarios CSS

Los comentarios sirven para dividir secciones o explicar una decisión no obvia:

```css
/* Tokens de diseño compartidos por todos los componentes. */
:root {
  --color-primary: #135d66;
  --space-md: 1rem;
}

/* El foco debe permanecer visible para navegación con teclado. */
.button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

No conviene comentar cada propiedad de una regla, porque eso duplica el código y dificulta su mantenimiento.

### Recomendaciones

1. Mantener una guía de estilos con ejemplos visuales de botones, formularios, tablas y mensajes.
2. Centralizar los valores repetidos mediante variables CSS o tokens de diseño.
3. Explicar las convenciones de nombres y la especificidad permitida.
4. Documentar excepciones cuando una regla necesita mayor especificidad o un valor poco habitual.
5. Probar y documentar los estados responsive y de accesibilidad.
6. Mantener la documentación actualizada junto con los cambios de estilos.

## Resumen

La documentación frontend explica la interfaz, los componentes y la interacción del usuario. JavaScript se documenta mediante contratos claros para funciones y módulos, mientras que React añade la documentación de props, estado, hooks y variantes de componentes. La documentación backend explica los servicios, la lógica de negocio, los datos y la seguridad. La documentación CSS explica la organización visual, las convenciones, los tokens de diseño y los estados de los elementos. En todos los casos debe ser concreta, mantenerse cerca del código y actualizarse cuando cambia su comportamiento.
