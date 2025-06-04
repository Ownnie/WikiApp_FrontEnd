import { useWiki } from '../context/WikiContext';
import WikiCard from './WikiCard';

const WikiList = () => {
  const { getAllLanguages, getUltimaEdicion } = useWiki();
  const languages = getAllLanguages();

  return (
    <div className="grid grid-cols-1 gap-4">
      {languages.map((language) => {
        const primeraSeccion = language.secciones && language.secciones[0];

        const descripcion = primeraSeccion && typeof primeraSeccion.datos === 'string' ? primeraSeccion.datos : '';

        return (
          <div key={language.id} className='w-2/3 mx-auto justify-center items-center py-5'>
            <WikiCard
              id={language.id}
              nombre={language.nombre}
              imagen={language.img1}
              descripcion={descripcion}
              añoCreacion={language.anyoCreacion}
              creador={language.creador}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WikiList;
