import { Header } from "./components/Header";
import { ContenedorPPI } from "./components/ContenedorPPI";
import { BotonEstado } from "./components/BotonEstado";

function App() {
  // Datos basados en tu diagrama ER
  const misEntidades = [
    { nombre: "Juan Andres Usuga", desc: "Almacena credenciales y roles", campos: 5 },
    { nombre: "Creador", desc: "Inventario general del sistema", campos: 8 },
    { nombre: "Programacion de las ventas", desc: "Registro de transacciones", campos: 4 }
  ];

  return (
    <main>
      <Header titulo="Mi Proyecto Pedagógico (PPI)" grupo="11A" />
      <BotonEstado texto="Dona y Viste" activo={true} />
      <ContenedorPPI entidades={misEntidades} />
    </main>
  );
}

export default App;
