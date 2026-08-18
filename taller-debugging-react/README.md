# Taller de Debugging en React - Resolucion

Este documento contiene la solucion de los cinco bugs del taller. Las correcciones se aplican sobre `src/App.jsx`; el CSS original puede conservarse en `src/App.css`.

## Bug 1: `undefined.toUpperCase()`

**Comportamiento:** la aplicacion queda en blanco y la consola muestra un error similar a:

```text
Cannot read properties of undefined (reading 'toUpperCase')
```

**Diagnostico:** la tarea con `id: 4` no tiene la propiedad `categoria`. Por eso `tarea.categoria` vale `undefined` y no puede ejecutar `toUpperCase()`.

El log que confirma la causa es:

```jsx
console.log('tarea:', tarea);
```

**Correccion:** todos los objetos de tarea deben tener una categoria valida. Tambien se puede usar un valor por defecto para que el componente sea resistente a datos incompletos.

```jsx
const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'general', completada: false },
];
```

Y al mostrarla:

```jsx
<span className="categoria">
  {(tarea.categoria || 'general').toUpperCase()}
</span>
```

## Bug 2: efecto infinito

**Comportamiento:** la consola imprime el mensaje continuamente.

**Diagnostico:** el `useEffect` no tiene arreglo de dependencias. Se ejecuta despues de cada render y `setContador` provoca otro render, creando un ciclo.

**Correccion:** como este mensaje solo se necesita al montar el componente, el efecto debe tener `[]` como segundo argumento:

```jsx
useEffect(() => {
  console.log('App montada');
}, []);
```

En esta solucion se elimina `contador`, porque no aporta comportamiento a la interfaz. Si se necesitara reaccionar a cambios del contador, la dependencia seria `[contador]`, pero nunca se debe actualizar esa misma dependencia sin una condicion de salida.

## Bug 3: comparar booleanos con strings

**Comportamiento:** los filtros `Pendientes` y `Completadas` muestran una lista vacia.

**Diagnostico:** `completada` contiene booleanos (`true` o `false`), pero el codigo los compara con strings (`'true'` o `'false'`). El log lo muestra:

```jsx
console.log(typeof tarea.completada, tarea.completada);
```

En JavaScript, `true === 'true'` es `false` porque tienen tipos diferentes.

**Correccion:** comparar directamente con booleanos:

```jsx
if (filtro === 'completadas') return tarea.completada === true;
if (filtro === 'pendientes') return tarea.completada === false;
```

Tambien seria valido escribir `return tarea.completada` para completadas y `return !tarea.completada` para pendientes.

## Bug 4: mutacion del estado

**Comportamiento:** `tareas.length` cambia en la consola, pero la nueva tarea no aparece inmediatamente.

**Diagnostico:** `push()` modifica el arreglo original. Luego `setTareas(tareas)` recibe exactamente la misma referencia, y React puede considerar que el estado no cambio.

Los logs utiles son:

```jsx
console.log('tareas antes:', tareas.length);
tareas.push(nuevaTarea);
console.log('tareas despues:', tareas.length);
```

**Correccion:** crear un arreglo nuevo y actualizar el estado con ese arreglo:

```jsx
function agregarTarea(texto) {
  const textoLimpio = texto.trim();
  if (!textoLimpio) return;

  const nuevaTarea = {
    id: Date.now(),
    texto: textoLimpio,
    categoria: 'general',
    completada: false,
  };

  setTareas((tareasActuales) => [...tareasActuales, nuevaTarea]);
}
```

La forma funcional evita usar una copia potencialmente antigua de `tareas` si hay varias actualizaciones consecutivas.

## Bug 5: error asincrono no controlado

**Comportamiento:** algunas veces el perfil queda en `Cargando perfil...` y la consola muestra `No se pudo cargar el usuario`.

**Diagnostico:** el error ocurre dentro de `setTimeout`. Un `try/catch` colocado alrededor de la llamada a `setTimeout` no atraparia ese error, porque el callback se ejecuta despues. Ademas, no existe un estado para representar el fallo.

**Correccion:** capturar el fallo dentro del callback, registrar el error con `console.error` y actualizar un estado visible. Tambien se limpia el temporizador si el componente se desmonta:

```jsx
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      const exito = Math.random() > 0.5;

      try {
        if (!exito) {
          throw new Error('No se pudo cargar el usuario');
        }

        setUsuario({ nombre: 'Estudiante React' });
      } catch (errorObteniendoUsuario) {
        console.error('Error al cargar el perfil:', errorObteniendoUsuario);
        setError('No se pudo cargar el perfil. Intenta nuevamente.');
      }
    }, 1000);

    return () => clearTimeout(temporizador);
  }, []);

  if (error) return <p className="perfil">{error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}
```

## Codigo final de `src/App.jsx`

```jsx
import { useEffect, useState } from 'react';
import './App.css';

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'general', completada: false },
];

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    console.log('App montada');
  }, []);

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'completadas') return tarea.completada === true;
    if (filtro === 'pendientes') return tarea.completada === false;
    return true;
  });

  function agregarTarea(texto) {
    const textoLimpio = texto.trim();
    if (!textoLimpio) return;

    const nuevaTarea = {
      id: Date.now(),
      texto: textoLimpio,
      categoria: 'general',
      completada: false,
    };

    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea]);
  }

  function completarTarea(id) {
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: true } : tarea
      )
    );
  }

  return (
    <div className="app">
      <h1>Mis Tareas</h1>

      <div className="filtros">
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
        <button onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>

      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <span>{tarea.texto}</span>
            <span className="categoria">
              {(tarea.categoria || 'general').toUpperCase()}
            </span>
            <button onClick={() => completarTarea(tarea.id)}>✔</button>
          </li>
        ))}
      </ul>

      <AgregarTarea onAgregar={agregarTarea} />
      <PerfilUsuario />
    </div>
  );
}

function AgregarTarea({ onAgregar }) {
  const [texto, setTexto] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    onAgregar(texto);
    setTexto('');
  }

  return (
    <form onSubmit={manejarEnvio} className="form-agregar">
      <input
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      const exito = Math.random() > 0.5;

      try {
        if (!exito) {
          throw new Error('No se pudo cargar el usuario');
        }

        setUsuario({ nombre: 'Estudiante React' });
      } catch (errorObteniendoUsuario) {
        console.error('Error al cargar el perfil:', errorObteniendoUsuario);
        setError('No se pudo cargar el perfil. Intenta nuevamente.');
      }
    }, 1000);

    return () => clearTimeout(temporizador);
  }, []);

  if (error) return <p className="perfil">{error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}

export default App;
```

## Breakpoints y entrega

Un `console.log` muestra datos en momentos concretos y deja la ejecucion continuar. Un breakpoint pausa la ejecucion y permite inspeccionar el estado de variables, el call stack y el flujo paso a paso. Conviene usar logs para observar eventos repetidos o historicos, y breakpoints para entender una decision puntual.

Para el entregable, documentar cada bug con:

1. El comportamiento o mensaje observado.
2. El `console.log` utilizado.
3. La linea corregida.
4. Una explicacion breve de la causa.

En **Sources**, colocar un breakpoint dentro de `completarTarea`, pulsar el boton de una tarea y revisar `id`, `tareasActuales` y la siguiente linea de ejecucion.
