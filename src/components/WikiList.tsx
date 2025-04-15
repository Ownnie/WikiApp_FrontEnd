import { useWiki } from '../context/WikiContext';
import WikiCard from './WikiCard';

const WikiList = () => {
  const { getAllLanguages } = useWiki();
  const languages = getAllLanguages();

  return (
    <div className="grid grid-cols-1 gap-4">
      {languages.map((language) => {
        const primeraSeccion = language.Secciones && language.Secciones[0];
        
        const descripcion = primeraSeccion && typeof primeraSeccion.Datos === 'string' ? primeraSeccion.Datos : '';

        return (
          <div key={language.Nombre} className='w-2/3 mx-auto justify-center items-center py-5'>
            <WikiCard
              nombre={language.Nombre}
              imagen={language.img1}
              descripcion={descripcion}
              añoCreacion={language.DatosImportantes.AñoCreacion}
              creador={language.DatosImportantes.Creador}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WikiList;
